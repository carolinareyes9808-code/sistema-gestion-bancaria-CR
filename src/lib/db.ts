import { promises as fs } from 'fs';
import path from 'path';
import { InfoInstitucional, MensajeContacto, ProductoFinanciero } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

async function leerArchivo<T>(nombreArchivo: string, defaultVal: T): Promise<T> {
  const rutaCompleta = path.join(DATA_DIR, nombreArchivo);
  try {
    const data = await fs.readFile(rutaCompleta, 'utf-8');
    return JSON.parse(data) as T;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // Si el archivo no existe, lo creamos con el valor por defecto
      await escribirArchivo(nombreArchivo, defaultVal);
      return defaultVal;
    }
    console.error(`Error al leer el archivo ${nombreArchivo}:`, error);
    return defaultVal;
  }
}

async function escribirArchivo<T>(nombreArchivo: string, datos: T): Promise<boolean> {
  const rutaCompleta = path.join(DATA_DIR, nombreArchivo);
  try {
    // Asegurar que el directorio data exista
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(rutaCompleta, JSON.stringify(datos, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error al escribir en el archivo ${nombreArchivo}:`, error);
    return false;
  }
}

// Métodos de acceso para Información Institucional
export async function getInfoInstitucional(): Promise<InfoInstitucional> {
  return leerArchivo<InfoInstitucional>('institucional.json', {
    nombreEntidad: 'Banco Financiero - Sistema Integrado',
    lema: 'Soluciones financieras claras, oportunas y a tu alcance',
    bienvenida: 'Bienvenido al Sistema Integrado de Atención y Simulación Financiera.',
    subtitulo: 'Consulte nuestros productos y realice simulaciones de manera rápida y sencilla.',
    direccion: 'Cra. 5 # 14 - 32, Sector Centro, La Dorada, Caldas',
    telefono: '(+57) 606 857 2020 / 01 8000 912 345',
    correo: 'atencion@entidadfinanciera.com.co',
    horario: 'Lunes a Viernes: 8:00 a.m. a 4:00 p.m. | Sábados: 9:00 a.m. a 1:00 p.m.',
    canalesAtencion: []
  });
}

// Métodos de acceso para Catálogo de Productos
export async function getProductos(): Promise<ProductoFinanciero[]> {
  return leerArchivo<ProductoFinanciero[]>('productos.json', []);
}

export async function getProductoPorId(id: string): Promise<ProductoFinanciero | undefined> {
  const productos = await getProductos();
  return productos.find(p => p.id === id);
}

// Métodos de acceso para Mensajes de Contacto (Persistencia)
export async function getMensajesContacto(): Promise<MensajeContacto[]> {
  return leerArchivo<MensajeContacto[]>('contactos.json', []);
}

export async function guardarMensajeContacto(nuevoMensaje: Omit<MensajeContacto, 'id' | 'fecha'>): Promise<{ success: boolean; data?: MensajeContacto; error?: string }> {
  try {
    const mensajes = await getMensajesContacto();
    const item: MensajeContacto = {
      id: `msg-${Date.now()}`,
      nombre: nuevoMensaje.nombre.trim(),
      correo: nuevoMensaje.correo.trim().toLowerCase(),
      mensaje: nuevoMensaje.mensaje.trim(),
      fecha: new Date().toISOString(),
      estado: 'Pendiente'
    };
    mensajes.unshift(item); // Insertar al inicio para mostrar los más recientes
    const guardado = await escribirArchivo('contactos.json', mensajes);
    if (!guardado) {
      return { success: false, error: 'No se pudo guardar el mensaje en el archivo plano.' };
    }
    return { success: true, data: item };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Error inesperado al persistir el mensaje.' };
  }
}
