import type {
  DocumentsRecordsColumn,
  DocumentsRecordsConfig,
  DocumentsRecordsFilterOption,
  DocumentsRecordsMenuOption,
} from '../../../../shared/types/documents-records.types';
import { buildProcessBreadcrumbs } from '../../../../shared/utils/breadcrumbs.util';
import { NOMBRE_DOCUMENTO } from '../models/validador-cierre-mensual.model';
import { PROCESS_ID, PROCESS_ROUTE } from './validador-cierre-mensual.rutas';

/**
 * Configuración de «Documentos y registros» del validador de datos cierre contable mensual de prueba. La pantalla
 * completa la pinta `siaf-documents-records-page` en `modoConsulta`: sin «Crear documento» ni acciones de
 * verificar/aprobar — las constancias las publica el motor de validación, no un creador.
 */

const documentColumns: DocumentsRecordsColumn[] = [
  { key: 'document', label: 'Documento', visibility: 'visible', group: 'default', widthClass: 'w-[380px]', kind: 'document-link' },
  { key: 'number', label: 'Número', visibility: 'visible', group: 'default', widthClass: 'w-[280px]' },
  { key: 'actionType', label: 'Tipo de acción', visibility: 'visible', group: 'default', widthClass: 'w-[160px]' },
  { key: 'status', label: 'Estado', visibility: 'visible', group: 'default', widthClass: 'w-[150px]', kind: 'flow-status' },
  { key: 'system', label: 'Sistema', visibility: 'visible', group: 'default', widthClass: 'w-[180px]' },
  { key: 'date', label: 'Fecha de registro', visibility: 'visible', group: 'default', widthClass: 'w-[170px]' },
  { key: 'entity', label: 'Entidad', visibility: 'visible', group: 'default', widthClass: 'w-[320px]' },
];

const fieldsMenuOptions: DocumentsRecordsMenuOption[] = [
  { label: 'Documento' },
  { label: 'Número' },
  { label: 'Estado' },
  { label: 'Fecha de registro', hasChildren: true },
  { label: 'Entidad' },
];

const filterCampoOptions: DocumentsRecordsFilterOption[] = [
  { label: 'Documento', value: 'document' },
  { label: 'Número', value: 'number' },
  { label: 'Estado', value: 'status' },
  { label: 'Fecha', value: 'date' },
  { label: 'Entidad', value: 'entity' },
];

const filterValorOptions: DocumentsRecordsFilterOption[] = [
  { label: 'Procesado', value: 'Procesado' },
  { label: 'Fallido', value: 'Fallido' },
];

export const VALIDADOR_CIERRE_MENSUAL_DOCUMENTS_CONFIG: DocumentsRecordsConfig = {
  modoConsulta: true,
  // Sin cuenta ni asiento detrás de cada constancia: no hay nada que listar en Registros.
  recordsTabDisabled: true,
  title: 'validador de datos cierre contable mensual de prueba',
  processId: PROCESS_ID,
  // Sin pantalla de detalle propia: el nombre del documento vuelve al catálogo, como en el resto de
  // procesos de solo consulta del taller — el historial se ve con el botón «Historial de documento».
  defaultRequestRoute: PROCESS_ROUTE,
  createDocumentOptions: [],
  breadcrumbs: buildProcessBreadcrumbs(PROCESS_ID, PROCESS_ROUTE),
  documentRows: [],
  recordRows: [],
  documentColumns,
  recordColumns: [],
  documentTableMinWidthClass: 'min-w-[1700px]',
  recordTableMinWidthClass: 'min-w-[0px]',
  recordTrackKey: 'id',
  recordHistoryDocumentLabel: NOMBRE_DOCUMENTO,
  statusFilterOptions: ['Procesado', 'Fallido'],
  actionTypeFilterOptions: ['Creación'],
  filterCampoOptions,
  filterValorOptions,
  fieldsMenuOptions,
};
