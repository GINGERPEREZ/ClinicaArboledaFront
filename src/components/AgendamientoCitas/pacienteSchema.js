/**
 * Esquema de validación de los datos del paciente (paso 4 del agendamiento).
 *
 * Cada campo declara sus reglas en orden de especificidad creciente:
 * primero obligatoriedad, luego tipo/longitud y al final el formato de dominio.
 * Así el mensaje que ve el usuario siempre es el más útil para corregir.
 */

import { opcional } from '@/utils/formValidation';
import {
  requerido,
  longitudEntre,
  soloLetras,
  soloDigitos,
  contienePalabras,
  esPronunciable,
  sinCaracteresDeControl,
  esCedulaEcuatoriana,
  esDocumentoIdentidad,
  esTelefonoEcuador,
  esEmail,
  normalizarEspacios,
  normalizarTelefonoEc,
} from '@/utils/validators';

/** Un documento de 10 dígitos solo puede ser cédula: no lo tratamos como pasaporte. */
const pareceCedula = (valor) => soloDigitos(valor) && String(valor).trim().length === 10;

export const LIMITES = {
  nombre: 80,
  cedula: 15,
  telefono: 15,
  email: 100,
  motivo: 300,
};

export const ESQUEMA_PACIENTE = {
  nombre: [
    { validar: requerido, mensaje: 'El nombre completo es obligatorio.' },
    {
      validar: (valor) => longitudEntre(valor, 3, LIMITES.nombre),
      mensaje: `El nombre debe tener entre 3 y ${LIMITES.nombre} caracteres.`,
    },
    {
      validar: soloLetras,
      mensaje: 'El nombre solo puede contener letras, espacios, apóstrofes y guiones.',
    },
    {
      validar: (valor) => contienePalabras(valor, 2),
      mensaje: 'Ingresa al menos un nombre y un apellido.',
    },
    {
      // Ultima regla: es la mas heuristica, asi que solo se aplica cuando todo
      // lo demas ya paso. Ver esPronunciable() sobre sus limites.
      validar: esPronunciable,
      mensaje: 'El nombre no parece válido. Revisa que esté bien escrito.',
    },
  ],

  cedula: [
    { validar: requerido, mensaje: 'La cédula o pasaporte es obligatoria.' },
    {
      // Mensaje específico cuando es evidente que intentó escribir una cédula.
      validar: (valor) => !pareceCedula(valor) || esCedulaEcuatoriana(valor),
      mensaje: 'La cédula ingresada no es válida. Verifica los 10 dígitos.',
    },
    {
      validar: esDocumentoIdentidad,
      mensaje: 'Ingresa una cédula de 10 dígitos o un pasaporte de 6 a 15 caracteres.',
    },
  ],

  telefono: [
    { validar: requerido, mensaje: 'El teléfono es obligatorio.' },
    { validar: soloDigitos, mensaje: 'El teléfono solo puede contener números.' },
    {
      validar: esTelefonoEcuador,
      mensaje: 'Ingresa un celular (09XXXXXXXX) o un teléfono fijo (0XXXXXXXX) válido.',
    },
  ],

  // Opcional: solo se exige formato cuando el usuario escribe algo.
  email: [
    {
      // Solo el tope: de la longitud mínima ya se encarga el formato.
      validar: opcional((valor) => longitudEntre(valor, 1, LIMITES.email)),
      mensaje: `El correo no puede superar los ${LIMITES.email} caracteres.`,
    },
    { validar: opcional(esEmail), mensaje: 'Ingresa un correo electrónico válido (ej: nombre@dominio.com).' },
  ],

  motivo: [
    {
      validar: opcional((valor) => longitudEntre(valor, 5, LIMITES.motivo)),
      mensaje: `El motivo debe tener entre 5 y ${LIMITES.motivo} caracteres.`,
    },
    { validar: sinCaracteresDeControl, mensaje: 'El motivo contiene caracteres no permitidos.' },
  ],
};

/**
 * Sanitizadores que se aplican mientras el usuario escribe.
 *
 * Descartan lo que nunca podría ser válido (letras en el teléfono, dígitos en el
 * nombre) en vez de dejar que el usuario complete el campo y luego reprobarlo.
 * No recortan espacios finales para no interrumpir la escritura.
 */
export const SANITIZADORES_PACIENTE = {
  nombre: (valor) =>
    String(valor ?? '')
      .replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s'’-]/g, '')
      .replace(/\s{2,}/g, ' ')
      .slice(0, LIMITES.nombre),

  cedula: (valor) =>
    String(valor ?? '')
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, LIMITES.cedula),

  // Solo dígitos mientras escribe; el prefijo +593 se resuelve al normalizar.
  telefono: (valor) => String(valor ?? '').replace(/\D/g, '').slice(0, LIMITES.telefono),

  email: (valor) => String(valor ?? '').replace(/\s/g, '').toLowerCase().slice(0, LIMITES.email),

  motivo: (valor) => String(valor ?? '').slice(0, LIMITES.motivo),
};

/** Normalización final, aplicada una sola vez antes de enviar la cita. */
export const NORMALIZADORES_PACIENTE = {
  nombre: normalizarEspacios,
  cedula: (valor) => String(valor ?? '').trim().toUpperCase(),
  telefono: normalizarTelefonoEc,
  email: (valor) => String(valor ?? '').trim().toLowerCase(),
  motivo: (valor) => String(valor ?? '').trim(),
};


