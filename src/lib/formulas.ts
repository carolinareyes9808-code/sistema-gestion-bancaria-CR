import { FilaAmortizacion, ResultadoCDT, ResultadoCredito, SimulacionCDTInput, SimulacionCreditoInput } from '@/types';

/**
 * Formatea un número como moneda colombiana (COP)
 */
export function formatCOP(valor: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(Math.round(valor));
}

/**
 * Formatea porcentaje
 */
export function formatPorcentaje(valor: number): string {
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor) + '%';
}

/**
 * Cálculo de crédito mediante el sistema de amortización francés (cuota fija mensual)
 * Según requerimiento de la EV9: cuota mensual aproximada, resumen y tabla de amortización.
 */
export function calcularCredito(input: SimulacionCreditoInput): ResultadoCredito {
  const { valorCredito, plazoMeses, tasaInteresMes, tipoCredito } = input;

  if (valorCredito <= 0 || plazoMeses <= 0) {
    throw new Error('El valor del crédito y el plazo deben ser mayores a cero.');
  }

  const i = tasaInteresMes / 100;
  let cuotaMensual = 0;

  if (i === 0) {
    cuotaMensual = valorCredito / plazoMeses;
  } else {
    // Fórmula de amortización francesa: C = P * [ i*(1+i)^n ] / [ (1+i)^n - 1 ]
    cuotaMensual = valorCredito * ((i * Math.pow(1 + i, plazoMeses)) / (Math.pow(1 + i, plazoMeses) - 1));
  }

  // Generación detallada de la tabla de amortización
  let saldo = valorCredito;
  const tablaAmortizacion: FilaAmortizacion[] = [];
  let sumaIntereses = 0;

  for (let mes = 1; mes <= plazoMeses; mes++) {
    const interes = saldo * i;
    sumaIntereses += interes;
    let capital = cuotaMensual - interes;

    // En el último mes ajustamos por redondeos infinitesimales
    if (mes === plazoMeses || capital > saldo) {
      capital = saldo;
      saldo = 0;
    } else {
      saldo -= capital;
    }

    tablaAmortizacion.push({
      mes,
      cuota: Math.round(cuotaMensual),
      capital: Math.round(capital),
      interes: Math.round(interes),
      saldo: Math.max(0, Math.round(saldo)),
    });
  }

  const totalPagar = Math.round(cuotaMensual * plazoMeses);
  const totalIntereses = Math.round(totalPagar - valorCredito);

  return {
    cuotaMensual: Math.round(cuotaMensual),
    totalPagar,
    totalIntereses,
    valorCredito,
    plazoMeses,
    tasaInteresMes,
    tipoCredito,
    tablaAmortizacion,
    notaLegal: 'Nota: La simulación es informativa y no constituye una aprobación del crédito.',
  };
}

/**
 * Cálculo de rendimiento de CDT (Certificado de Depósito a Término)
 * Según requerimiento de la EV9: rentabilidad estimada y valor final estimado.
 */
export function calcularCDT(input: SimulacionCDTInput): ResultadoCDT {
  const { valorInversion, tiempoMeses, tasaRentabilidadAnual } = input;

  if (valorInversion <= 0 || tiempoMeses <= 0) {
    throw new Error('El valor de la inversión y el tiempo deben ser mayores a cero.');
  }

  // Tasa Efectiva Anual convertida al periodo en meses
  const tasaDecimal = tasaRentabilidadAnual / 100;
  const factorPeriodo = tiempoMeses / 12;

  // Valor final con capitalización compuesta sobre la tasa efectiva anual: VF = P * (1 + EA)^(meses/12)
  const valorFinalEstimado = valorInversion * Math.pow(1 + tasaDecimal, factorPeriodo);
  const rentabilidadEstimada = valorFinalEstimado - valorInversion;

  // Retención en la fuente sobre rendimientos financieros (4% en Colombia)
  const retencionFuenteEstimada = rentabilidadEstimada * 0.04;
  const valorNetoFinal = valorInversion + (rentabilidadEstimada - retencionFuenteEstimada);

  return {
    valorInversion,
    tiempoMeses,
    tasaRentabilidadAnual,
    rentabilidadEstimada: Math.round(rentabilidadEstimada),
    valorFinalEstimado: Math.round(valorFinalEstimado),
    retencionFuenteEstimada: Math.round(retencionFuenteEstimada),
    valorNetoFinal: Math.round(valorNetoFinal),
    notaLegal: 'Nota: Los resultados son aproximados y dependen de las condiciones vigentes.',
  };
}
