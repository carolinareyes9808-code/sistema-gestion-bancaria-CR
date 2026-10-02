import React from 'react';
import { getProductos } from '@/lib/db';
import { ProductosClient } from '@/components/modules/ProductosClient';
import { Briefcase, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Productos Financieros | Sistema de Gestión Bancaria',
  description: 'Consulte el portafolio de créditos, CDT y cuentas de ahorros disponibles.',
};

export default async function ProductosPage() {
  const productos = await getProductos();

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
          <div className="w-10 h-10 rounded-xl bg-bank-100 text-bank-700 flex items-center justify-center font-bold">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Portafolio de Productos Financieros
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Consulte los productos y servicios disponibles con sus respectivas tasas y condiciones.
            </p>
          </div>
        </div>
      </div>

      {/* Renderizado de la Pantalla 2 (Productos Financieros) */}
      <ProductosClient productos={productos} />
    </div>
  );
}
