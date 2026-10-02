export type TipoCredito = 'Vivienda' | 'Libre inversión' | 'Vehículo';

export interface ProductoFinanciero {
  id: string;
  nombre: string;
  categoria: 'Crédito' | 'Inversión' | 'Ahorro';
  tipo: TipoCredito | 'CDT' | 'Ahorros';
  descripcion: string;
  descripcionLarga: string;
  tasaReferenciaMes: number; // Porcentaje mensual ej. 1.15
  tasaReferenciaAnual: number; // Porcentaje efectivo anual ej. 14.7
  plazoMinMeses: number;
  plazoMaxMeses: number;
  montoMinimo: number;
  montoMaximo: number;
  beneficios: string[];
  requisitos: string[];
  icono: string;
  permiteSimulacion: boolean;
  rutaSimulador: string;
}

export interface InfoInstitucional {
  nombreEntidad: string;
  lema: string;
  bienvenida: string;
  subtitulo: string;
  direccion: string;
  telefono: string;
  correo: string;
  horario: string;
  canalesAtencion: {
    tipo: string;
    detalle: string;
  }[];
}

export interface MensajeContacto {
  id: string;
  nombre: string;
  correo: string;
  mensaje: string;
  fecha: string;
  estado?: 'Pendiente' | 'Atendido';
}

export interface SimulacionCreditoInput {
  valorCredito: number;
  plazoMeses: number;
  tasaInteresMes: number;
  tipoCredito: TipoCredito;
}

export interface FilaAmortizacion {
  mes: number;
  cuota: number;
  capital: number;
  interes: number;
  saldo: number;
}

export interface ResultadoCredito {
  cuotaMensual: number;
  totalPagar: number;
  totalIntereses: number;
  valorCredito: number;
  plazoMeses: number;
  tasaInteresMes: number;
  tipoCredito: TipoCredito;
  tablaAmortizacion: FilaAmortizacion[];
  notaLegal: string;
}

export interface SimulacionCDTInput {
  valorInversion: number;
  tiempoMeses: number;
  tasaRentabilidadAnual: number;
}

export interface ResultadoCDT {
  valorInversion: number;
  tiempoMeses: number;
  tasaRentabilidadAnual: number;
  rentabilidadEstimada: number;
  valorFinalEstimado: number;
  retencionFuenteEstimada: number;
  valorNetoFinal: number;
  notaLegal: string;
}
