import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator } from 'lucide-react';
import { SimuladorCreditoClient } from '@/components/modules/SimuladorCreditoClient';

export const metadata = {
  title: 'Simulador de Crédito | Sistema de Gestión Bancaria',
  description: 'Simule su crédito de vivienda, libre inversión o vehículo y consulte la proyección de cuotas.',
};

export default function SimuladorCreditoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 w-full">
      {/* Header de la Pantalla 3 */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-bank-600 mb-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-bank-100 text-bank-700 flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Simulador de Crédito
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Calcula un valor aproximado de la cuota de un crédito con base en los datos ingresados.
            </p>
          </div>
        </div>
      </div>

      {/* Renderizado del Simulador dentro de Suspense */}
      <Suspense fallback={
        <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
          Cargando simulador de crédito...
        </div>
      }>
        <SimuladorCreditoClient />
      </Suspense>
    </div>
  );
}
