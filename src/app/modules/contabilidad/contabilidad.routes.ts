import { Routes } from '@angular/router';

/** Procesos del módulo de contabilidad. Por ahora, el validador de datos cierre contable mensual de prueba (solo consulta). */
export const CONTABILIDAD_ROUTES: Routes = [
  {
    path: 'procesos/validador-cierre-mensual',
    loadComponent: () =>
      import('./validador-cierre-mensual/pages/documents/validador-cierre-mensual-documents.component').then(
        (m) => m.ValidadorCierreMensualDocumentsComponent,
      ),
  },
];
