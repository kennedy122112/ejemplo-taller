import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { APP_CONFIG } from '../../../../core/config/app.config';
import { ValidadorCierreMensualDocumento } from '../models/validador-cierre-mensual.model';

/**
 * Endpoint propio del proceso de ejemplo. En el taller lo responde el backend simulado
 * (`src/app/mock/mock-backend.interceptor.ts`); con un backend real sería la misma URL.
 */
@Injectable({ providedIn: 'root' })
export class ValidadorCierreMensualApiService {
  private readonly http = inject(HttpClient);
  private readonly base = APP_CONFIG.api.baseUrl;

  /** Constancias publicadas por el motor de validación, más recientes primero. */
  listarDocumentos(): Observable<ValidadorCierreMensualDocumento[]> {
    return this.http.get<ValidadorCierreMensualDocumento[]>(`${this.base}/cierre-contable/validador-mensual`);
  }
}
