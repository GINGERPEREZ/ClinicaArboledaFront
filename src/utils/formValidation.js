/**
 * Motor de validación declarativo.
 *
 * Un esquema es un objeto `{ campo: Regla[] }`, donde cada regla es
 * `{ validar(valor, datos) => boolean, mensaje: string }`.
 *
 * Las reglas se evalúan en orden y se detiene en la primera que falla, de modo
 * que el usuario ve un único mensaje por campo: el más específico que aplica.
 *
 * @typedef {{ validar: (valor: any, datos: object) => boolean, mensaje: string }} Regla
 */

import { esVacio } from './validators';

/**
 * Envuelve un validador para que solo se aplique si el campo tiene contenido.
 * Sirve para campos opcionales que, si se llenan, deben tener formato válido.
 *
 * @param {(valor: any, datos: object) => boolean} validar
 * @returns {(valor: any, datos: object) => boolean}
 */
export const opcional = (validar) => (valor, datos) => esVacio(valor) || validar(valor, datos);

/**
 * Valida un único campo contra su lista de reglas.
 *
 * @param {any} valor
 * @param {Regla[]} reglas
 * @param {object} [datos] formulario completo, para reglas que dependen de otros campos
 * @returns {string|null} mensaje del primer error, o `null` si el campo es válido
 */
export function validarCampo(valor, reglas = [], datos = {}) {
  for (const regla of reglas) {
    if (!regla.validar(valor, datos)) return regla.mensaje;
  }
  return null;
}

/**
 * Valida el formulario completo contra el esquema.
 *
 * @param {object} datos
 * @param {Record<string, Regla[]>} esquema
 * @returns {{ errores: Record<string, string>, esValido: boolean }}
 */
export function validarFormulario(datos, esquema) {
  const errores = {};

  for (const [campo, reglas] of Object.entries(esquema)) {
    const error = validarCampo(datos[campo], reglas, datos);
    if (error) errores[campo] = error;
  }

  return { errores, esValido: Object.keys(errores).length === 0 };
}

/**
 * Aplica los sanitizadores del esquema y devuelve una copia limpia de los datos.
 * Los campos sin sanitizador se copian tal cual.
 *
 * @param {object} datos
 * @param {Record<string, (valor: any) => any>} sanitizadores
 * @returns {object}
 */
export function sanitizarFormulario(datos, sanitizadores = {}) {
  return Object.fromEntries(
    Object.entries(datos).map(([campo, valor]) => [
      campo,
      typeof sanitizadores[campo] === 'function' ? sanitizadores[campo](valor) : valor,
    ])
  );
}


