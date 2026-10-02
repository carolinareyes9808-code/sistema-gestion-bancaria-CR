import React from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { SimuladorCDTClient } from '@/components/modules/SimuladorCDTClient';

export const metadata = {
  title: 'Simulador de CDT | Sistema de Gestión Bancaria',
  description: 'Estime la rentabilidad y el valor final de su inversión en Certificados de Depósito a Término.',
};

export default function SimuladorCDTPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 w-full">
      {/* Header institucional de la pantalla */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-bank-600 mb-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Simulador de CDT
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Estima la rentabilidad y el valor final de una inversión a término fijo con tasas preferenciales.
            </p>
          </div>
        </div>
      </div>

      {/* Renderizado de la Pantalla 4 (Simulador de CDT) */}
      <SimuladorCDTClient />
    </div>
  );
}
