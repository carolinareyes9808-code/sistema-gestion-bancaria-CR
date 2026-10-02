'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { TipoCredito, ResultadoCredito } from '@/types';
import { calcularCredito, formatCOP, formatPorcentaje } from '@/lib/formulas';
import { 
  Calculator, 
  AlertCircle, 
  DollarSign, 
  Calendar, 
  Percent, 
  Building2, 
  CheckCircle2, 
  Table as TableIcon,
  RefreshCw,
  Info
} from 'lucide-react';

const TASAS_SUGERIDAS: Record<TipoCredito, { mes: number; minMeses: number; maxMeses: number; minMonto: number }> = {
  'Vivienda': { mes: 1.15, minMeses: 60, maxMeses: 240, minMonto: 20000000 },
  'Libre inversión': { mes: 1.65, minMeses: 12, maxMeses: 60, minMonto: 1000000 },
  'Vehículo': { mes: 1.35, minMeses: 12, maxMeses: 72, minMonto: 10000000 },
};

export function SimuladorCreditoClient() {
  const searchParams = useSearchParams();
  const tipoParam = searchParams.get('tipo') as TipoCredito | null;

  // Estados de entrada según el prototipo EV9
  const [tipoCredito, setTipoCredito] = useState<TipoCredito>(
    tipoParam && ['Vivienda', 'Libre inversión', 'Vehículo'].includes(tipoParam) 
      ? tipoParam 
      : 'Libre inversión'
  );
  const [valorCredito, setValorCredito] = useState<string>('20000000');
  const [plazoMeses, setPlazoMeses] = useState<string>('36');
  const [tasaInteresMes, setTasaInteresMes] = useState<string>('1.65');

  // Estados de resultados y errores
  const [resultado, setResultado] = useState<ResultadoCredito | null>(null);
  const [errores, setErrores] = useState<string[]>([]);
  const [mostrarTabla, setMostrarTabla] = useState<boolean>(false);

  // Actualizar tasa por defecto al cambiar el tipo de crédito
  const handleCambioTipo = (nuevoTipo: TipoCredito) => {
    setTipoCredito(nuevoTipo);
    setTasaInteresMes(TASAS_SUGERIDAS[nuevoTipo].mes.toString());
    setErrores([]);
  };

  // Validación y cálculo
  const handleSimular = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosErrores: string[] = [];

    const valorNum = parseFloat(valorCredito.replace(/[^\d.-]/g, ''));
    const plazoNum = parseInt(plazoMeses, 10);
    const tasaNum = parseFloat(tasaInteresMes);

    if (isNaN(valorNum) || valorNum <= 0) {
      nuevosErrores.push('Por favor ingrese un valor de crédito válido mayor a cero.');
    }

    if (isNaN(plazoNum) || plazoNum <= 0) {
      nuevosErrores.push('Por favor ingrese un plazo en meses válido (mínimo 1 mes).');
    }

    if (isNaN(tasaNum) || tasaNum < 0) {
      nuevosErrores.push('Por favor ingrese una tasa de interés válida (0% o superior).');
    }

    if (nuevosErrores.length > 0) {
      setErrores(nuevosErrores);
      setResultado(null);
      return;
    }

    setErrores([]);
    try {
      const res = calcularCredito({
        valorCredito: valorNum,
        plazoMeses: plazoNum,
        tasaInteresMes: tasaNum,
        tipoCredito,
      });
      setResultado(res);
    } catch (err: any) {
      setErrores([err.message || 'Error al realizar el cálculo del crédito.']);
    }
  };

  // Simulación inicial al cargar para experiencia fluida
  useEffect(() => {
    try {
      const res = calcularCredito({
        valorCredito: 20000000,
        plazoMeses: 36,
        tasaInteresMes: 1.65,
        tipoCredito: 'Libre inversión',
      });
      setResultado(res);
    } catch {
      // no-op
    }
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* FORMULARIO PANTALLA 3: SIMULADOR DE CRÉDITO SEGÚN EV9 */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-bank-400" />
            <span className="font-bold text-sm tracking-wider uppercase">
              Parámetros de Simulación
            </span>
          </div>
          <span className="text-[11px] bg-bank-800 text-bank-200 px-2.5 py-0.5 rounded-full font-medium">
            Sistema Francés
          </span>
        </div>

        <form onSubmit={handleSimular} className="p-6 space-y-5">
          {/* Mensajes de Validación / Error */}
          {errores.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-rose-900">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Datos requeridos o inválidos:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 pl-1">
                {errores.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Campo 1: Tipo de Crédito */}
          <div>
            <label htmlFor="tipoCredito" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Tipo de crédito
            </label>
            <div className="relative">
              <select
                id="tipoCredito"
                value={tipoCredito}
                onChange={(e) => handleCambioTipo(e.target.value as TipoCredito)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-bank-500 focus:border-bank-500 outline-none transition-all cursor-pointer shadow-xs"
              >
                <option value="Vivienda">Vivienda (Tasas desde 1.15% MV)</option>
                <option value="Libre inversión">Libre inversión (Tasas desde 1.65% MV)</option>
                <option value="Vehículo">Vehículo (Tasas desde 1.35% MV)</option>
              </select>
            </div>
          </div>

          {/* Campo 2: Valor del crédito ($) */}
          <div>
            <label htmlFor="valorCredito" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Valor del crédito ($)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 font-bold">
                $
              </span>
              <input
                id="valorCredito"
                type="number"
                min="100000"
                step="50000"
                value={valorCredito}
                onChange={(e) => setValorCredito(e.target.value)}
                placeholder="Ej. 20000000"
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-bank-500 focus:border-bank-500 outline-none transition-all shadow-xs"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Valor expresado en Pesos Colombianos (COP)
            </p>
          </div>

          {/* Campo 3: Plazo (meses) */}
          <div>
            <label htmlFor="plazoMeses" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Plazo (meses)
            </label>
            <div className="relative">
              <input
                id="plazoMeses"
                type="number"
                min="1"
                max="360"
                value={plazoMeses}
                onChange={(e) => setPlazoMeses(e.target.value)}
                placeholder="Ej. 36"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-bank-500 focus:border-bank-500 outline-none transition-all shadow-xs"
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold text-slate-400">
                meses
              </span>
            </div>
          </div>

          {/* Campo 4: Tasa de interés (%) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="tasaInteresMes" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Tasa de interés (% Mes Vencido)
              </label>
              <button
                type="button"
                onClick={() => setTasaInteresMes(TASAS_SUGERIDAS[tipoCredito].mes.toString())}
                className="text-[11px] text-bank-600 hover:text-bank-700 font-semibold"
              >
                Restablecer sugerida ({TASAS_SUGERIDAS[tipoCredito].mes}%)
              </button>
            </div>
            <div className="relative">
              <input
                id="tasaInteresMes"
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={tasaInteresMes}
                onChange={(e) => setTasaInteresMes(e.target.value)}
                placeholder="Ej. 1.65"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-bank-500 focus:border-bank-500 outline-none transition-all shadow-xs"
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold text-slate-400">
                % MV
              </span>
            </div>
          </div>

          {/* Botón de Acción según EV9: [SIMULAR] */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-bank-600 hover:bg-bank-700 text-white font-bold text-sm tracking-wide uppercase shadow-md shadow-bank-900/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <Calculator className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>SIMULAR</span>
            </button>
          </div>
        </form>
      </div>

      {/* SECCIÓN RESULTADO SEGÚN EV9 */}
      <div className="lg:col-span-7 space-y-6">
        {resultado ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
            {/* Cabecera del Resultado */}
            <div className="bg-gradient-to-r from-bank-900 to-slate-900 text-white px-6 py-5 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-bank-300 font-semibold">
                  Resumen de Condiciones
                </span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">
                  Resultado de la Simulación
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-bank-800 border border-bank-700 text-xs font-medium text-bank-200">
                Crédito de {resultado.tipoCredito}
              </span>
            </div>

            {/* Muestra Destacada: Cuota mensual aproximada según prototipo EV9 */}
            <div className="p-6 border-b border-slate-200 bg-bank-50/50">
              <span className="text-xs font-bold text-bank-900 uppercase tracking-wider block">
                Cuota mensual aproximada:
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-bank-700 tracking-tight">
                  {formatCOP(resultado.cuotaMensual)}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  / mes (cuota fija)
                </span>
              </div>
            </div>

            {/* Desglose de Condiciones */}
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-b border-slate-100 text-sm">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium block">Valor Solicitado</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">
                  {formatCOP(resultado.valorCredito)}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium block">Plazo de Financiación</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">
                  {resultado.plazoMeses} meses
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium block">Tasa Aplicada</span>
                <div className="font-bold text-bank-700 text-sm mt-0.5">
                  {formatPorcentaje(resultado.tasaInteresMes)} MV
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium block">Total Intereses</span>
                <div className="font-bold text-amber-700 text-sm mt-0.5">
                  {formatCOP(resultado.totalIntereses)}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-2">
                <span className="text-[11px] text-slate-500 font-medium block">Total a Pagar Estimado</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">
                  {formatCOP(resultado.totalPagar)}
                </div>
              </div>
            </div>

            {/* NOTA OBLIGATORIA DEL DOCUMENTO EV9 */}
            <div className="p-6 bg-amber-50/70 border-b border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-950">
                  {resultado.notaLegal}
                </p>
                <p className="text-amber-800/90 mt-0.5">
                  El valor final dependerá del análisis de riesgo crediticio, seguros asociados y tarifas vigentes a la fecha del desembolso.
                </p>
              </div>
            </div>

            {/* TABLA DE AMORTIZACIÓN (Requerimiento EV9: Simulaciones de créditos y tablas de amortización) */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TableIcon className="w-4 h-4 text-bank-600" />
                  <h4 className="font-bold text-slate-900 text-sm">
                    Tabla de Amortización Mensual
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setMostrarTabla(!mostrarTabla)}
                  className="text-xs font-semibold text-bank-600 hover:text-bank-800 underline"
                >
                  {mostrarTabla ? 'Ocultar tabla detallada' : `Ver tabla completa (${resultado.tablaAmortizacion.length} cuotas)`}
                </button>
              </div>

              {mostrarTabla ? (
                <div className="overflow-x-auto max-h-80 border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left">
                    <thead className="sticky top-0 bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase">
                      <tr>
                        <th className="py-2.5 px-3 text-center">Mes</th>
                        <th className="py-2.5 px-3 text-right">Cuota Fija</th>
                        <th className="py-2.5 px-3 text-right">Abono Capital</th>
                        <th className="py-2.5 px-3 text-right">Intereses</th>
                        <th className="py-2.5 px-3 text-right">Saldo Restante</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {resultado.tablaAmortizacion.map((fila) => (
                        <tr key={fila.mes} className="hover:bg-slate-50">
                          <td className="py-2 px-3 text-center text-slate-500">{fila.mes}</td>
                          <td className="py-2 px-3 text-right font-bold text-slate-900">{formatCOP(fila.cuota)}</td>
                          <td className="py-2 px-3 text-right text-emerald-700 font-semibold">{formatCOP(fila.capital)}</td>
                          <td className="py-2 px-3 text-right text-amber-700">{formatCOP(fila.interes)}</td>
                          <td className="py-2 px-3 text-right text-slate-600">{formatCOP(fila.saldo)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  Despliegue la tabla para observar la amortización mes a mes con desglose entre abono a capital, intereses y saldo residual.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
            <Calculator className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">Ingrese los datos y haga clic en [SIMULAR]</p>
            <p className="text-xs text-slate-400 mt-1">Los resultados aproximados se presentarán en esta área.</p>
          </div>
        )}
      </div>
    </div>
  );
}
