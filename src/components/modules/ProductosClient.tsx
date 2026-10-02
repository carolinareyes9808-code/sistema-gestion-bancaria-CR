'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ProductoFinanciero 
} from '@/types';
import { formatCOP, formatPorcentaje } from '@/lib/formulas';
import { 
  Home, 
  Wallet, 
  Car, 
  TrendingUp, 
  PiggyBank, 
  Info, 
  X, 
  CheckCircle, 
  ArrowRight, 
  Calculator, 
  FileText,
  BadgePercent
} from 'lucide-react';

interface Props {
  productos: ProductoFinanciero[];
}

export function ProductosClient({ productos }: Props) {
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductoFinanciero | null>(null);

  // Helper para renderizar iconos según el tipo de producto
  const renderIcono = (icono: string) => {
    switch (icono) {
      case 'Home':
        return <Home className="w-5 h-5 text-blue-600" />;
      case 'Wallet':
        return <Wallet className="w-5 h-5 text-emerald-600" />;
      case 'Car':
        return <Car className="w-5 h-5 text-indigo-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-amber-600" />;
      case 'PiggyBank':
      default:
        return <PiggyBank className="w-5 h-5 text-rose-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Vista Principal: Tabla interactiva idéntica al prototipo EV9 y tarjetas responsive */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-bank-400" />
            <span className="font-bold text-sm tracking-wider uppercase">
              Catálogo Oficial de Productos Financieros
            </span>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
            {productos.length} Productos Disponibles
          </span>
        </div>

        {/* Tabla responsive según Prototipo EV9 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="tabla-productos">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
                <th className="py-4 px-6">PRODUCTOS FINANCIEROS</th>
                <th className="py-4 px-6">Descripción / Acción</th>
                <th className="py-4 px-6 text-right">Tasa Referencial</th>
                <th className="py-4 px-6 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {productos.map((prod) => (
                <tr 
                  key={prod.id} 
                  id={prod.id}
                  className="hover:bg-bank-50/40 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all border border-slate-200">
                        {renderIcono(prod.icono)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          {prod.nombre}
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                          Categoría: {prod.categoria}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-slate-700">
                    <p className="font-medium text-slate-800">
                      {prod.descripcion}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {prod.descripcionLarga}
                    </p>
                  </td>

                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="font-semibold text-slate-900">
                      {formatPorcentaje(prod.tasaReferenciaMes)} MV
                    </div>
                    <div className="text-xs text-slate-500">
                      {formatPorcentaje(prod.tasaReferenciaAnual)} EA
                    </div>
                  </td>

                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <button
                      onClick={() => setProductoSeleccionado(prod)}
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-bank-700 bg-bank-50 hover:bg-bank-100 hover:text-bank-800 border border-bank-200 transition-all shadow-xs"
                      aria-label={`Ver más información de ${prod.nombre}`}
                    >
                      <span>[Más información]</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETALLADO DE INFORMACIÓN AL HACER CLIC EN [Más información] */}
      {productoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-titulo"
          >
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                  {renderIcono(productoSeleccionado.icono)}
                </div>
                <div>
                  <h3 id="modal-titulo" className="text-lg font-bold">
                    {productoSeleccionado.nombre}
                  </h3>
                  <span className="text-xs text-slate-400">
                    Ficha Técnica y Condiciones Comerciales
                  </span>
                </div>
              </div>
              <button
                onClick={() => setProductoSeleccionado(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
              {/* Descripción */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <h4 className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-bank-600" />
                  Descripción General
                </h4>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {productoSeleccionado.descripcionLarga}
                </p>
              </div>

              {/* Parámetros Financieros */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium block">Tasa de Interés</span>
                  <div className="font-bold text-bank-700 text-base mt-1">
                    {formatPorcentaje(productoSeleccionado.tasaReferenciaMes)} MV
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {formatPorcentaje(productoSeleccionado.tasaReferenciaAnual)} EA
                  </span>
                </div>

                {productoSeleccionado.plazoMaxMeses > 0 && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 font-medium block">Plazos Permitidos</span>
                    <div className="font-bold text-slate-900 text-sm mt-1">
                      {productoSeleccionado.plazoMinMeses} a {productoSeleccionado.plazoMaxMeses} meses
                    </div>
                    <span className="text-[11px] text-slate-400">Amortización mensual</span>
                  </div>
                )}

                {productoSeleccionado.montoMinimo > 0 && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="text-xs text-slate-500 font-medium block">Montos</span>
                    <div className="font-bold text-slate-900 text-xs mt-1">
                      Desde {formatCOP(productoSeleccionado.montoMinimo)}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Hasta {formatCOP(productoSeleccionado.montoMaximo)}
                    </span>
                  </div>
                )}
              </div>

              {/* Beneficios */}
              <div>
                <h4 className="font-bold text-slate-900 mb-2.5 text-xs uppercase tracking-wider">
                  Principales Beneficios
                </h4>
                <ul className="space-y-2">
                  {productoSeleccionado.beneficios.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requisitos */}
              <div>
                <h4 className="font-bold text-slate-900 mb-2.5 text-xs uppercase tracking-wider">
                  Requisitos Básicos
                </h4>
                <ul className="space-y-2">
                  {productoSeleccionado.requisitos.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer with Direct Simulation Action */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 text-center sm:text-left">
                Información institucional referencial
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setProductoSeleccionado(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100"
                >
                  Cerrar
                </button>

                {productoSeleccionado.permiteSimulacion ? (
                  <Link
                    href={productoSeleccionado.rutaSimulador}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-bank-600 hover:bg-bank-700 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Ir al Simulador</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <Link
                    href="/contacto"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-bank-600 hover:bg-bank-700 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <span>Solicitar Asesoría</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
