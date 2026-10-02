import React from 'react';
import Link from 'next/link';
import { Landmark, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { getInfoInstitucional } from '@/lib/db';

export async function Footer() {
  const info = await getInfoInstitucional();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Institutional Intro */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-bank-600 flex items-center justify-center text-white">
                <Landmark className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                {info.nombreEntidad}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {info.bienvenida} {info.subtitulo}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700/80 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Simuladores Financieros Homologados</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Navegación
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-white transition-colors">
                  Portafolio de Productos
                </Link>
              </li>
              <li>
                <Link href="/simulador-credito" className="hover:text-white transition-colors">
                  Simulador de Crédito
                </Link>
              </li>
              <li>
                <Link href="/simulador-cdt" className="hover:text-white transition-colors">
                  Simulador de CDT
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Contacto y Asesoría
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Attention */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Canales de Atención
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-bank-400 shrink-0 mt-0.5" />
                <span>{info.direccion}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-bank-400 shrink-0" />
                <span>{info.telefono}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-bank-400 shrink-0" />
                <span>{info.correo}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-bank-400 shrink-0 mt-0.5" />
                <span>{info.horario}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Academic EV9 Context */}
          <div className="space-y-3 bg-slate-800/40 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
              Ficha Técnica del Sistema
            </h3>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p><strong className="text-slate-300">Proyecto:</strong> EV9 – Planeación y Diseño de SI</p>
              <p><strong className="text-slate-300">Programa:</strong> Gestión Bancaria y Entidades Financieras</p>
              <p><strong className="text-slate-300">Aprendiz:</strong> Diana Carolina Reyes Peña</p>
              <p><strong className="text-slate-300">SENA:</strong> Centro Pecuario y Agroempresarial</p>
              <p><strong className="text-slate-300">Competencia:</strong> 210601012</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} {info.nombreEntidad}. Desarrollado con Next.js & Tailwind CSS.
          </p>
          <p className="text-slate-400 text-center sm:text-right">
            Esta primera versión es de consulta y simulación informativa.
          </p>
        </div>
      </div>
    </footer>
  );
}
