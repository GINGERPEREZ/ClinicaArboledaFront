/**
 * Primitivas de validación y normalización.
 *
 * Funciones puras, sin dependencias de Vue ni del DOM: reciben un valor y
 * devuelven un booleano (validadores) o un valor limpio (normalizadores).
 * Se pueden reutilizar desde cualquier componente o probar de forma aislada.
 */

// Letras del español + espacios + apóstrofes y guiones (Ana María, D'Angelo, Pérez-Loor)
const RE_SOLO_LETRAS = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s'’-]+$/;
const RE_SOLO_DIGITOS = /^\d+$/;
const RE_PASAPORTE = /^[A-Z0-9]{6,15}$/;
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
// Caracteres de control invisibles (se permiten \n y \r en textos multilínea)
// eslint-disable-next-line no-control-regex
const RE_CARACTERES_CONTROL = new RegExp('[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]');

/** Provincias válidas del Ecuador: 01-24 y 30 (ciudadanos registrados en el exterior). */
const PROVINCIAS_VALIDAS = new Set([...Array.from({ length: 24 }, (_, i) => i + 1), 30]);

/* ------------------------------------------------------------------ *
 * Helpers de tipo
 * ------------------------------------------------------------------ */

export const esTexto = (valor) => typeof valor === 'string';

/** `true` cuando el valor no aporta información (null, undefined o solo espacios). */
export const esVacio = (valor) => valor === null || valor === undefined || String(valor).trim() === '';

export const requerido = (valor) => !esVacio(valor);

/** Longitud del valor ya recortado, para que los espacios no cuenten como contenido. */
export const longitudEntre = (valor, min, max) => {
  const largo = String(valor ?? '').trim().length;
  return largo >= min && largo <= max;
};

export const soloLetras = (valor) => esTexto(valor) && RE_SOLO_LETRAS.test(valor.trim());

export const soloDigitos = (valor) => esTexto(valor) && RE_SOLO_DIGITOS.test(valor.trim());

export const sinCaracteresDeControl = (valor) => !RE_CARACTERES_CONTROL.test(String(valor ?? ''));

/** Exige al menos `minimo` palabras de 2+ caracteres (p. ej. nombre y apellido). */
export const contienePalabras = (valor, minimo) =>
  String(valor ?? '').trim().split(/\s+/).filter((palabra) => palabra.length >= 2).length >= minimo;

// La 'y' cuenta como vocal: evita marcar Bryan, Krystel o Guaywas.
const VOCALES = new Set('AEIOUYÁÉÍÓÚÜ');
// Los nombres reales del Ecuador no pasan de 3 consonantes seguidas; se deja
// margen hasta 4 para respetar apellidos extranjeros (Schmidt, Strzelecki).
const MAX_CONSONANTES_SEGUIDAS = 4;

/**
 * Heurística contra el tecleo al azar ("jnrvwiuu ifwniufnizuf").
 *
 * NO comprueba que el nombre exista —eso es imposible en el frontend y todo
 * intento termina rechazando nombres legítimos—; solo descarta cadenas
 * impronunciables. La identidad real la ancla la cédula, que sí tiene checksum.
 *
 * Rechaza: palabras de 3+ letras sin ninguna vocal, y rachas de más de
 * MAX_CONSONANTES_SEGUIDAS consonantes.
 */
export function esPronunciable(valor) {
  const palabras = String(valor ?? '')
    .toUpperCase()
    .split(/[^A-ZÑÁÉÍÓÚÜ]+/)
    .filter(Boolean);

  if (palabras.length === 0) return false;

  return palabras.every((palabra) => {
    // 'Ng' y otras abreviaturas cortas quedan fuera de la regla de vocales.
    if (palabra.length >= 3 && ![...palabra].some((letra) => VOCALES.has(letra))) {
      return false;
    }

    let racha = 0;
    for (const letra of palabra) {
      racha = VOCALES.has(letra) ? 0 : racha + 1;
      if (racha > MAX_CONSONANTES_SEGUIDAS) return false;
    }
    return true;
  });
}

/* ------------------------------------------------------------------ *
 * Normalizadores
 * ------------------------------------------------------------------ */

/** Colapsa espacios internos y recorta los extremos. */
export const normalizarEspacios = (valor) => String(valor ?? '').replace(/\s+/g, ' ').trim();

/**
 * Lleva un teléfono ecuatoriano a formato local (0XXXXXXXX[X]).
 * Acepta +593 / 593 y separadores (espacios, guiones, paréntesis).
 * @returns {string} solo dígitos en formato local; '' si la entrada estaba vacía.
 */
export function normalizarTelefonoEc(valor) {
  let digitos = String(valor ?? '').replace(/\D/g, '');

  // Prefijo internacional: 593987654321 -> 0987654321
  if (digitos.startsWith('593')) {
    digitos = '0' + digitos.slice(3);
  }
  // El usuario omitió el 0 inicial: 987654321 -> 0987654321
  if (digitos.length === 9 && digitos.startsWith('9')) {
    digitos = '0' + digitos;
  }

  return digitos;
}

/* ------------------------------------------------------------------ *
 * Validadores de dominio
 * ------------------------------------------------------------------ */

/**
 * Valida una cédula ecuatoriana con el algoritmo oficial de módulo 10.
 *
 * Reglas: 10 dígitos, provincia 01-24 o 30, tercer dígito 0-5 (persona natural)
 * y dígito verificador coherente con los 9 primeros.
 */
export function esCedulaEcuatoriana(valor) {
  const cedula = String(valor ?? '').trim();

  if (!RE_SOLO_DIGITOS.test(cedula) || cedula.length !== 10) return false;

  const provincia = Number(cedula.slice(0, 2));
  if (!PROVINCIAS_VALIDAS.has(provincia)) return false;

  const tercerDigito = Number(cedula[2]);
  if (tercerDigito > 5) return false;

  // Coeficientes 2,1,2,1... sobre los 9 primeros dígitos.
  const suma = cedula
    .slice(0, 9)
    .split('')
    .reduce((acumulado, caracter, indice) => {
      const producto = Number(caracter) * (indice % 2 === 0 ? 2 : 1);
      return acumulado + (producto > 9 ? producto - 9 : producto);
    }, 0);

  const verificador = (10 - (suma % 10)) % 10;
  return verificador === Number(cedula[9]);
}

/** Pasaporte: 6 a 15 caracteres alfanuméricos, con al menos una letra. */
export function esPasaporte(valor) {
  const pasaporte = String(valor ?? '').trim().toUpperCase();
  return RE_PASAPORTE.test(pasaporte) && /[A-Z]/.test(pasaporte);
}

/** Documento de identidad aceptado: cédula ecuatoriana o pasaporte. */
export const esDocumentoIdentidad = (valor) => esCedulaEcuatoriana(valor) || esPasaporte(valor);

/**
 * Teléfono ecuatoriano válido: celular (09 + 8 dígitos) o fijo (0[2-7] + 7 dígitos).
 * Normaliza antes de comparar, así que acepta +593 y separadores.
 */
export function esTelefonoEcuador(valor) {
  const numero = normalizarTelefonoEc(valor);
  return /^09\d{8}$/.test(numero) || /^0[2-7]\d{7}$/.test(numero);
}

/** Celular: obligatorio cuando el número se usará para enviar WhatsApp. */
export const esCelularEcuador = (valor) => /^09\d{8}$/.test(normalizarTelefonoEc(valor));

/** Convierte un teléfono ecuatoriano a formato internacional sin '+' (para wa.me). */
export function aFormatoInternacionalEc(valor) {
  const local = normalizarTelefonoEc(valor);
  return esTelefonoEcuador(local) ? '593' + local.slice(1) : '';
}

export const esEmail = (valor) => esTexto(valor) && RE_EMAIL.test(valor.trim());
