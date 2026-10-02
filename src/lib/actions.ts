'use server';

import { guardarMensajeContacto } from './db';
import { revalidatePath } from 'next/cache';

export interface FormContactoState {
  success: boolean;
  message: string;
  errors?: {
    nombre?: string;
    correo?: string;
    mensaje?: string;
  };
}

export async function enviarMensajeAction(
  prevState: FormContactoState | null,
  formData: FormData
): Promise<FormContactoState> {
  const nombre = formData.get('nombre')?.toString() || '';
  const correo = formData.get('correo')?.toString() || '';
  const mensaje = formData.get('mensaje')?.toString() || '';

  const errors: { nombre?: string; correo?: string; mensaje?: string } = {};

  if (!nombre.trim() || nombre.trim().length < 3) {
    errors.nombre = 'Por favor ingrese un nombre válido (mínimo 3 caracteres).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correo.trim() || !emailRegex.test(correo.trim())) {
    errors.correo = 'Por favor ingrese un correo electrónico válido.';
  }

  if (!mensaje.trim() || mensaje.trim().length < 10) {
    errors.mensaje = 'El mensaje debe contener al menos 10 caracteres explicativos.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Existen errores en los datos ingresados. Verifique los campos obligatorios.',
      errors,
    };
  }

  const resultado = await guardarMensajeContacto({
    nombre,
    correo,
    mensaje,
  });

  if (!resultado.success) {
    return {
      success: false,
      message: resultado.error || 'Ocurrió un error al registrar el mensaje.',
    };
  }

  revalidatePath('/contacto');

  return {
    success: true,
    message: 'Su mensaje ha sido enviado exitosamente. Un asesor financiero se pondrá en contacto pronto.',
  };
}
