import React from 'react';
import Link from 'next/link';
import { ArrowLeft, PhoneCall } from 'lucide-react';
import { getInfoInstitucional, getMensajesContacto } from '@/lib/db';
import { ContactoClient } from '@/components/modules/ContactoClient';

export const metadata = {
  title: 'Contacto y Canales de Atención | Sistema de Gestión Bancaria',
  description: 'Canales oficiales de atención, horarios y formulario de contacto para clientes y asesores.',
};

export default async function ContactoPage() {
  const [info, mensajesPrevios] = await Promise.all([
    getInfoInstitucional(),
    getMensajesContacto(),
  ]);

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
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Canales de Atención & Contacto
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Presenta dirección, teléfono, correo electrónico, horario de atención y formulario de contacto.
            </p>
          </div>
        </div>
      </div>

      {/* Renderizado de la Pantalla 5 (Contacto) */}
      <ContactoClient info={info} mensajesPrevios={mensajesPrevios} />
    </div>
  );
}
