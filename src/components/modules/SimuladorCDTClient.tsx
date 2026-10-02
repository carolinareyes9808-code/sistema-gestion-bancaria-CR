'use client';

import React, { useState, useEffect } from 'react';
import { ResultadoCDT } from '@/types';
import { calcularCDT, formatCOP, formatPorcentaje } from '@/lib/formulas';
import { 
  TrendingUp, 
  AlertCircle, 
  DollarSign, 
  Clock, 
  Percent, 
  Info, 
  ShieldCheck, 
  PiggyBank,
  CheckCircle2
} from 'lucide-react';

export function SimuladorCDTClient() {
  // Entradas según prototipo EV9
  const [valorInversion, setValorInversion] = useState<string>('10000000');
  const [tiempoMeses, setTiempoMeses] = useState<string>('12');
  const [tasaRentabilidadAnual, setTasaRentabilidadAnual] = useState<string>('10.50');

  // Estados de resultado y validación
  const [resultado, setResultado] = useState<ResultadoCDT | null>(null);
  const [errores, setErrores] = useState<string[]>([]);

  // Presets para agilidad operativa de asesores
  const aplicarPreset = (meses: number, tasa: number) => {
    setTiempoMeses(meses.toString());
    setTasaRentabilidadAnual(tasa.toString());
    setErrores([]);
  };

  const handleCalcular = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosErrores: string[] = [];

    const valorNum = parseFloat(valorInversion.replace(/[^\d.-]/g, ''));
    const tiempoNum = parseInt(tiempoMeses, 10);
    const tasaNum = parseFloat(tasaRentabilidadAnual);

    if (isNaN(valorNum) || valorNum <= 0) {
      nuevosErrores.push('Por favor ingrese un valor de inversión válido (mayor a $0).');
    }

    if (isNaN(tiempoNum) || tiempoNum < 1) {
      nuevosErrores.push('El tiempo de inversión debe ser de al menos 1 mes.');
    }

    if (isNaN(tasaNum) || tasaNum < 0) {
      nuevosErrores.push('La tasa de rentabilidad debe ser un número válido positivo.');
    }

    if (nuevosErrores.length > 0) {
      setErrores(nuevosErrores);
      setResultado(null);
      return;
    }

    setErrores([]);
    try {
      const res = calcularCDT({
        valorInversion: valorNum,
        tiempoMeses: tiempoNum,
        tasaRentabilidadAnual: tasaNum,
      });
      setResultado(res);
    } catch (err: any) {
      setErrores([err.message || 'Error al calcular la rentabilidad del CDT.']);
    }
  };

  // Cálculo inicial al montar
  useEffect(() => {
    try {
      const res = calcularCDT({
        valorInversion: 10000000,
        tiempoMeses: 12,
        tasaRentabilidadAnual: 10.5,
      });
      setResultado(res);
    } catch {
      // no-op
    }
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* FORMULARIO PANTALLA 4: SIMULADOR DE CDT SEGÚN EV9 */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm tracking-wider uppercase">
              Parámetros de Inversión CDT
            </span>
          </div>
          <span className="text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-full font-medium">
            Tasa Fija Garantizada
          </span>
        </div>

        <form onSubmit={handleCalcular} className="p-6 space-y-5">
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

          {/* Campo 1: Valor de la inversión ($) */}
          <div>
            <label htmlFor="valorInversion" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Valor de la inversión ($)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 font-bold">
                $
              </span>
              <input
                id="valorInversion"
                type="number"
                min="500000"
                step="100000"
                value={valorInversion}
                onChange={(e) => setValorInversion(e.target.value)}
                placeholder="Ej. 10000000"
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-xs"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Apertura mínima recomendada: $500.000 COP
            </p>
          </div>

          {/* Campo 2: Tiempo de inversión (meses) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="tiempoMeses" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Tiempo de inversión (meses)
              </label>
              <span className="text-[11px] text-slate-500">Plazos sugeridos:</span>
            </div>
            
            {/* Presets rápidos */}
            <div className="grid grid-cols-4 gap-1.5 mb-2.5">
              {[
                { meses: 3, tasa: 9.50 },
                { meses: 6, tasa: 10.00 },
                { meses: 12, tasa: 10.50 },
                { meses: 24, tasa: 11.20 },
              ].map((p) => (
                <button
                  key={p.meses}
                  type="button"
                  onClick={() => aplicarPreset(p.meses, p.tasa)}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                    tiempoMeses === p.meses.toString()
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {p.meses}m ({p.tasa}%)
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                id="tiempoMeses"
                type="number"
                min="1"
                max="60"
                value={tiempoMeses}
                onChange={(e) => setTiempoMeses(e.target.value)}
                placeholder="Ej. 12"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-xs"
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold text-slate-400">
                meses
              </span>
            </div>
          </div>

          {/* Campo 3: Tasa de rentabilidad (%) */}
          <div>
            <label htmlFor="tasaRentabilidad" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Tasa de rentabilidad (% Efectiva Anual)
            </label>
            <div className="relative">
              <input
                id="tasaRentabilidad"
                type="number"
                step="0.01"
                min="0.1"
                max="30"
                value={tasaRentabilidadAnual}
                onChange={(e) => setTasaRentabilidadAnual(e.target.value)}
                placeholder="Ej. 10.50"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-xs"
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold text-slate-400">
                % E.A.
              </span>
            </div>
          </div>

          {/* Botón de Acción según EV9: [CALCULAR] */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide uppercase shadow-md shadow-emerald-900/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>CALCULAR</span>
            </button>
          </div>
        </form>
      </div>

      {/* SECCIÓN RESULTADO SEGÚN EV9 */}
      <div className="lg:col-span-7 space-y-6">
        {resultado ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
            {/* Cabecera del Resultado */}
            <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white px-6 py-5 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                  Proyección de Inversión
                </span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">
                  Resultado de la Simulación de CDT
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-700 text-xs font-medium text-emerald-300">
                Plazo: {resultado.tiempoMeses} meses
              </span>
            </div>

            {/* Muestra Destacada 1: Rentabilidad estimada según prototipo EV9 */}
            <div className="p-6 border-b border-slate-200 bg-emerald-50/50">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                Rentabilidad estimada:
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 tracking-tight">
                  +{formatCOP(resultado.rentabilidadEstimada)}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  (Rendimiento bruto pactado)
                </span>
              </div>
            </div>

            {/* Muestra Destacada 2: Valor final estimado según prototipo EV9 */}
            <div className="p-6 border-b border-slate-200 bg-slate-50">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Valor final estimado:
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {formatCOP(resultado.valorFinalEstimado)}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  (Capital inicial + Rendimientos)
                </span>
              </div>
            </div>

            {/* Desglose técnico de la liquidación */}
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-b border-slate-100 text-sm">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium block">Capital Invertido</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">
                  {formatCOP(resultado.valorInversion)}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium block">Tasa Fija (E.A.)</span>
                <div className="font-bold text-emerald-700 text-sm mt-0.5">
                  {formatPorcentaje(resultado.tasaRentabilidadAnual)} EA
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium block">Retención en la Fuente (4%)</span>
                <div className="font-bold text-rose-700 text-sm mt-0.5">
                  -{formatCOP(resultado.retencionFuenteEstimada)}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-semibold">Valor Neto a Recibir Estimado:</span>
                  <span className="font-bold text-slate-900 text-base">
                    {formatCOP(resultado.valorNetoFinal)}
                  </span>
                </div>
              </div>
            </div>

            {/* NOTA OBLIGATORIA DEL DOCUMENTO EV9 */}
            <div className="p-6 bg-slate-100/90 border-t border-slate-200 flex items-start gap-3 text-xs text-slate-700">
              <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">
                  {resultado.notaLegal}
                </p>
                <p className="text-slate-500 mt-0.5">
                  La retención en la fuente se liquida sobre los intereses generados según la normativa tributaria colombiana aplicable al momento del pago.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
            <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">Ingrese los datos y haga clic en [CALCULAR]</p>
            <p className="text-xs text-slate-400 mt-1">Los rendimientos estimados aparecerán en esta sección.</p>
          </div>
        )}
      </div>
    </div>
  );
}
