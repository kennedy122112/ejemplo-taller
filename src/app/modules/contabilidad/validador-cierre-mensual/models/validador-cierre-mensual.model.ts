/**
 * Proceso de ejemplo del taller: «Validador de datos cierre contable mensual de prueba».
 *
 * A diferencia de «Registro de cuentas bancarias», este proceso es de solo consulta: no hay solicitud ni
 * aprobador — un motor externo (el validador) corre cada cierre mensual y publica una constancia con el
 * resultado (Procesado o Fallido). La pantalla solo lista esas constancias.
 */

export type EstadoValidadorCierreMensual = 'Procesado' | 'Fallido';

export const CODIGO_DOCUMENTO = 'CDCCM';
export const NOMBRE_DOCUMENTO = 'Constancia de datos cierre contable mensual';

/** Una constancia publicada por el motor de validación. */
export interface ValidadorCierreMensualDocumento {
  id: string;
  /** VSCCM-CDCCM-0001-2026-UE-ER */
  numero: string;
  /** Fecha de registro (yyyy-mm-dd). */
  fecha: string;
  estado: EstadoValidadorCierreMensual;
  entidad: string;
}

export function numeroValidadorCierreMensual(correlativo: number, anio: number): string {
  return `VSCCM-CDCCM-${String(correlativo).padStart(4, '0')}-${anio}-UE-ER`;
}
