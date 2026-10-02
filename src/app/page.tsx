import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Calculator, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Users, 
  CheckCircle2, 
  Landmark,
  FileSpreadsheet
} from 'lucide-react';
import { getInfoInstitucional, getProductos } from '@/lib/db';

export default async function HomePage() {
  const [info, productos] = await Promise.all([
    getInfoInstitucional(),
    getProductos(),
  ]);

  return (
    <div className="flex flex-col w-full">
      {/* PANTALLA 1: HERO & BANNER PRINCIPAL SEGÚN EV9 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-bank-950 to-slate-900 text-white py-16 lg:py-24 border-b border-slate-800">
        {/* Glow accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-bank-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Banner text content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bank-800/80 border border-bank-600/40 text-bank-200 text-xs font-medium">
                <Landmark className="w-3.5 h-3.5 text-bank-400" />
                <span>{info.nombreEntidad}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {info.bienvenida}
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
                {info.subtitulo}
              </p>

              {/* Action Button strictly according to EV9: [CONOCER NUESTROS PRODUCTOS] */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/productos"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-bank-600 hover:bg-bank-500 text-white font-semibold text-base shadow-lg shadow-bank-900/40 hover:shadow-bank-600/30 hover:-translate-y-0.5 transition-all group"
                >
                  <span>CONOCER NUESTROS PRODUCTOS</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/simulador-credito"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-medium text-base hover:-translate-y-0.5 transition-all"
                >
                  <Calculator className="w-5 h-5 text-bank-400" />
                  <span>Simular Crédito</span>
                </Link>
              </div>

              {/* Key Trust badges */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cálculos Inmediatos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Amortización Francesa</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Tasas Estandarizadas</span>
                </div>
              </div>
            </div>

            {/* Quick access interactive card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="border-b border-slate-700/80 pb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-bank-400" />
                    Accesos Rápidos del Sistema
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Seleccione la herramienta de consulta o simulación que requiere:
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/simulador-credito"
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 hover:bg-slate-700/50 border border-slate-700/50 group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-bank-900/80 text-bank-400 group-hover:bg-bank-600 group-hover:text-white transition-colors">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-bank-300 transition-colors">
                          Simulador de Crédito
                        </h4>
                        <p className="text-xs text-slate-400">
                          Vivienda, Libre Inversión y Vehículo con amortización
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    href="/simulador-cdt"
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 hover:bg-slate-700/50 border border-slate-700/50 group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-emerald-950/80 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                          Simulador de CDT
                        </h4>
                        <p className="text-xs text-slate-400">
                          Estime la rentabilidad y el valor final de su inversión
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    href="/productos"
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 hover:bg-slate-700/50 border border-slate-700/50 group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-purple-950/80 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Landmark className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                          Portafolio Completo
                        </h4>
                        <p className="text-xs text-slate-400">
                          Consulte 5 productos financieros disponibles
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BENEFICIOS Y PROPÓSITO DEL SISTEMA (SEGÚN EV9) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-bank-600">
              Estandarización y Calidad en la Atención
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Beneficios del Sistema de Información
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Diseñado para unificar la labor de los asesores financieros y brindar respuestas transparentes a nuestros clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-bank-100 text-bank-700 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Reducción de Tiempos</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Permite a los asesores y clientes consultar datos de forma rápida y unificada, disminuyendo esperas en la sucursal.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Cero Errores Manuales</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cálculos automatizados bajo normas financieras estrictas que eliminan discrepancias en tasas y cuotas proyectadas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Confianza y Transparencia</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Información clara de plazos, costos y rentabilidad que fortalece la toma de decisiones informadas por parte del cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISTA PREVIA DEL PORTAFOLIO */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-bank-700">
                Portafolio Institucional
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Líneas de Crédito, Ahorro e Inversión
              </h2>
            </div>
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-bank-700 hover:text-bank-800"
            >
              <span>Ver todos los 5 productos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.slice(0, 3).map((prod) => (
              <div 
                key={prod.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-bank-50 text-bank-800 border border-bank-100 mb-4">
                    {prod.categoria}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {prod.nombre}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                    {prod.descripcion}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Tasa ref: <strong className="text-slate-800">{prod.tasaReferenciaMes}% MV</strong>
                  </span>
                  <Link
                    href={`/productos#${prod.id}`}
                    className="text-xs font-semibold text-bank-700 hover:text-bank-900"
                  >
                    [Más información]
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
