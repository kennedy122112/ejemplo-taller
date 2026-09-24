import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';

import { DocumentHistoryRow } from '../../../../../shared/components/document-history-panel/document-history-panel.component';
import { DocumentsRecordsPageComponent } from '../../../../../shared/components/documents-records-page/documents-records-page.component';
import type { DocumentsRecordsConfig, DocumentsRecordsRow } from '../../../../../shared/types/documents-records.types';
import { ValidadorCierreMensualApiService } from '../../api/validador-cierre-mensual-api.service';
import { VALIDADOR_CIERRE_MENSUAL_DOCUMENTS_CONFIG } from '../../config/validador-cierre-mensual-documents.config';
import { NOMBRE_DOCUMENTO, ValidadorCierreMensualDocumento } from '../../models/validador-cierre-mensual.model';

const COMENTARIO_POR_ESTADO: Record<string, string> = {
  Procesado: 'La validación no encontró inconsistencias en el período.',
  Fallido: 'La validación encontró inconsistencias entre el mayor y el diario del período.',
};

/**
 * «Documentos y registros» del validador de datos cierre contable mensual de prueba. Toda la pantalla la arma
 * `siaf-documents-records-page` en `modoConsulta`: esta página solo carga las constancias publicadas por el
 * motor de validación y arma el historial de cada una a mano (no hay solicitud de por medio).
 */
@Component({
  selector: 'siaf-validador-cierre-mensual-documents',
  standalone: true,
  imports: [DocumentsRecordsPageComponent],
  template: `
    <siaf-documents-records-page [config]="pageConfig()" [loading]="cargando()" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidadorCierreMensualDocumentsComponent implements OnInit {
  private readonly api = inject(ValidadorCierreMensualApiService);

  private readonly documentos = signal<ValidadorCierreMensualDocumento[]>([]);
  readonly cargando = signal(true);

  ngOnInit(): void {
    this.api.listarDocumentos().subscribe({
      next: (documentos) => { this.documentos.set(documentos); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  readonly pageConfig = computed((): DocumentsRecordsConfig => {
    const documentRows: DocumentsRecordsRow[] = this.documentos().map((d) => ({
      document: NOMBRE_DOCUMENTO,
      documentId: d.id,
      number: d.numero,
      actionType: 'Creación',
      status: d.estado,
      system: 'Contabilidad',
      date: d.fecha.split('-').reverse().join('/'),
      entity: d.entidad,
    }));

    return {
      ...VALIDADOR_CIERRE_MENSUAL_DOCUMENTS_CONFIG,
      documentRows,
      buildDocumentHistory: (row) => buildHistorial(row),
    };
  });
}

/** Historial pre-resuelto: no hay solicitud de workflow detrás, así que no se consulta la API de solicitudes. */
function buildHistorial(row: DocumentsRecordsRow): { staticRows: DocumentHistoryRow[] } {
  const numero = String(row['number'] ?? '');
  const fecha = String(row['date'] ?? '');
  const estado = String(row['status'] ?? 'Procesado');

  const staticRows: DocumentHistoryRow[] = [
    { usuario: 'Motor de validación', rol: 'Sistema', fecha, hora: '06:00', estado: 'Registrado', comentario: `Solicitud de validación ${numero} recibida.` },
    { usuario: 'Motor de validación', rol: 'Sistema', fecha, hora: '06:05', estado, comentario: COMENTARIO_POR_ESTADO[estado] ?? '' },
  ];

  return { staticRows };
}
