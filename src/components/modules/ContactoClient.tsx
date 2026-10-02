'use client';

import React, { useState } from 'react';
import { InfoInstitucional, MensajeContacto } from '@/types';
import { enviarMensajeAction, FormContactoState } from '@/lib/actions';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  MessageSquare,
  Inbox,
  ShieldCheck
} from 'lucide-react';

interface Props {
  info: InfoInstitucional;
  mensajesPrevios: MensajeContacto[];
}

export function ContactoClient({ info, mensajesPrevios }: Props) {
  const [formState, setFormState] = useState<FormContactoState | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mensajesLocales, setMensajesLocales] = useState<MensajeContacto[]>(mensajesPrevios);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('correo', correo);
    formData.append('mensaje', mensaje);

    try {
      const res = await enviarMensajeAction(formState, formData);
      setFormState(res);

      if (res.success) {
        // Limpiar formulario al tener éxito
        setMensajesLocales((prev) => [
          {
            id: `msg-${Date.now()}`,
            nombre: nombre.trim(),
            correo: correo.trim().toLowerCase(),
            mensaje: mensaje.trim(),
            fecha: new Date().toISOString(),
            estado: 'Pendiente',
          },
          ...prev,
        ]);
        setNombre('');
        setCorreo('');
        setMensaje('');
      }
    } catch (err: any) {
      setFormState({
        success: false,
        message: err.message || 'Error de conexión al procesar el mensaje.',
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* BLOQUE IZQUIERDO: INFORMACIÓN INSTITUCIONAL DE CONTACTO (SEGÚN EV9) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-bank-400" />
              <span className="font-bold text-sm tracking-wider uppercase">
                Canales Oficiales
              </span>
            </div>
            <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700">
              Atención Presencial & Telefónica
            </span>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                {info.nombreEntidad}
              </h3>
              <p className="text-xs text-slate-500">
                Puntos de atención y soporte para clientes y asesores financieros.
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              {/* Dirección */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <MapPin className="w-5 h-5 text-bank-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Dirección:
                  </span>
                  <p className="font-semibold text-slate-900 mt-0.5">
                    {info.direccion}
                  </p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <Phone className="w-5 h-5 text-bank-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Teléfono:
                  </span>
                  <p className="font-semibold text-slate-900 mt-0.5">
                    {info.telefono}
                  </p>
                </div>
              </div>

              {/* Correo Electrónico */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <Mail className="w-5 h-5 text-bank-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Correo electrónico:
                  </span>
                  <p className="font-semibold text-slate-900 mt-0.5">
                    {info.correo}
                  </p>
                </div>
              </div>

              {/* Horario de Atención */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <Clock className="w-5 h-5 text-bank-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Horario de atención:
                  </span>
                  <p className="font-semibold text-slate-900 mt-0.5">
                    {info.horario}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-bank-50/70 border border-bank-100 flex items-center gap-2.5 text-xs text-bank-800">
              <ShieldCheck className="w-4 h-4 text-bank-600 shrink-0" />
              <span>Sus consultas y datos serán tratados conforme a la política de protección de datos.</span>
            </div>
          </div>
        </div>

        {/* BLOQUE DERECHO: FORMULARIO DE CONTACTO (SEGÚN EV9) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-bank-400" />
              <span className="font-bold text-sm tracking-wider uppercase">
                FORMULARIO DE CONTACTO
              </span>
            </div>
            <span className="text-[11px] bg-bank-800 text-bank-200 px-2.5 py-0.5 rounded-full font-medium">
              Persistencia Local JSON
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Notificaciones de éxito o error */}
            {formState && (
              <div 
                className={`p-4 rounded-xl text-xs flex items-start gap-3 animate-fadeIn ${
                  formState.success
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border border-rose-200 text-rose-900'
                }`}
              >
                {formState.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold">{formState.message}</p>
                  {formState.errors && (
                    <ul className="mt-1 list-disc list-inside space-y-0.5">
                      {Object.values(formState.errors).map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* Campo 1: Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Nombre:
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ingrese su nombre completo"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-bank-500 focus:border-bank-500 outline-none transition-all shadow-xs"
                  required
                />
              </div>
              {formState?.errors?.nombre && (
                <p className="text-xs text-rose-600 mt-1">{formState.errors.nombre}</p>
              )}
            </div>

            {/* Campo 2: Correo */}
            <div>
              <label htmlFor="correo" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Correo:
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-bank-500 focus:border-bank-500 outline-none transition-all shadow-xs"
                  required
                />
              </div>
              {formState?.errors?.correo && (
                <p className="text-xs text-rose-600 mt-1">{formState.errors.correo}</p>
              )}
            </div>

            {/* Campo 3: Mensaje */}
            <div>
              <label htmlFor="mensaje" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Mensaje:
              </label>
              <div className="relative">
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Escriba aquí los detalles de su consulta sobre créditos, tasas o productos..."
                  className="w-full p-4 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-bank-500 focus:border-bank-500 outline-none transition-all resize-y shadow-xs"
                  required
                />
              </div>
              {formState?.errors?.mensaje && (
                <p className="text-xs text-rose-600 mt-1">{formState.errors.mensaje}</p>
              )}
            </div>

            {/* Botón según prototipo EV9: [ENVIAR MENSAJE] */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={enviando}
                className="w-full py-3.5 px-6 rounded-xl bg-bank-600 hover:bg-bank-700 text-white font-bold text-sm tracking-wide uppercase shadow-md shadow-bank-900/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{enviando ? 'GUARDANDO MENSAJE...' : 'ENVIAR MENSAJE'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* REGISTRO DE MENSAJES PERSISTIDOS EN EL ARCHIVO PLANO contactos.json (Rol Administrador / Asesor) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inbox className="w-4 h-4 text-slate-700" />
            <span className="font-bold text-xs uppercase tracking-wider text-slate-800">
              Bandeja de Mensajes Registrados (Persistencia en /src/data/contactos.json)
            </span>
          </div>
          <span className="text-xs text-slate-500">
            Total: {mensajesLocales.length} solicitudes
          </span>
        </div>

        <div className="p-6">
          {mensajesLocales.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">
              No hay mensajes registrados aún en el archivo plano local.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mensajesLocales.map((m) => (
                <div 
                  key={m.id} 
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{m.nombre}</span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(m.fecha).toLocaleString('es-CO')}
                    </span>
                  </div>
                  <div className="text-bank-700 font-medium">{m.correo}</div>
                  <p className="text-slate-600 bg-white p-2.5 rounded-lg border border-slate-100 italic">
                    &ldquo;{m.mensaje}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
