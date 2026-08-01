import { describe, it, expect } from 'vitest';
import {
  esVacio,
  requerido,
  longitudEntre,
  soloLetras,
  soloDigitos,
  sinCaracteresDeControl,
  contienePalabras,
  normalizarEspacios,
  normalizarTelefonoEc,
  esCedulaEcuatoriana,
  esPasaporte,
  esDocumentoIdentidad,
  esTelefonoEcuador,
  esCelularEcuador,
  aFormatoInternacionalEc,
  esEmail,
} from '@/utils/validators';

/**
 * Construye una cédula válida a partir de sus 9 primeros dígitos, calculando
 * el verificador con módulo 10. Evita hardcodear cédulas de personas reales.
 */
function conVerificador(nueveDigitos) {
  const suma = nueveDigitos.split('').reduce((acumulado, caracter, indice) => {
    const producto = Number(caracter) * (indice % 2 === 0 ? 2 : 1);
    return acumulado + (producto > 9 ? producto - 9 : producto);
  }, 0);
  return nueveDigitos + String((10 - (suma % 10)) % 10);
}

describe('helpers de tipo', () => {
  it('trata null, undefined y espacios como vacío', () => {
    expect(esVacio(null)).toBe(true);
    expect(esVacio(undefined)).toBe(true);
    expect(esVacio('   ')).toBe(true);
    expect(esVacio('a')).toBe(false);
    expect(requerido('a')).toBe(true);
    expect(requerido('')).toBe(false);
  });

  it('mide la longitud sin contar espacios de los extremos', () => {
    expect(longitudEntre('  abc  ', 3, 5)).toBe(true);
    expect(longitudEntre('ab', 3, 5)).toBe(false);
    expect(longitudEntre('abcdef', 3, 5)).toBe(false);
    expect(longitudEntre(null, 0, 5)).toBe(true);
  });

  it('acepta letras del español y rechaza dígitos o símbolos', () => {
    expect(soloLetras('María Pérez Loor')).toBe(true);
    expect(soloLetras('Muñoz D’Angelo')).toBe(true);
    expect(soloLetras('Pérez-Loor')).toBe(true);
    expect(soloLetras('Juan 123')).toBe(false);
    expect(soloLetras('Juan@')).toBe(false);
    expect(soloLetras(123)).toBe(false);
  });

  it('distingue dígitos de otros caracteres', () => {
    expect(soloDigitos('1312345678')).toBe(true);
    expect(soloDigitos('131234567a')).toBe(false);
    expect(soloDigitos('')).toBe(false);
    expect(soloDigitos(1312345678)).toBe(false);
  });

  it('permite saltos de línea pero bloquea caracteres de control', () => {
    expect(sinCaracteresDeControl('Dolor de cabeza')).toBe(true);
    expect(sinCaracteresDeControl('linea1\nlinea2')).toBe(true);
    expect(sinCaracteresDeControl('mal\u0000dato')).toBe(false);
    expect(sinCaracteresDeControl('mal\u001Bdato')).toBe(false);
    expect(sinCaracteresDeControl('tab\u0009aqui')).toBe(false);
  });

  it('cuenta solo palabras de 2 o más caracteres', () => {
    expect(contienePalabras('Ana Pérez', 2)).toBe(true);
    expect(contienePalabras('svhzdhv', 2)).toBe(false);
    expect(contienePalabras('Ana P', 2)).toBe(false);
    expect(contienePalabras('  Ana   Pérez  ', 2)).toBe(true);
  });
});

describe('normalizarEspacios', () => {
  it('colapsa espacios internos y recorta los extremos', () => {
    expect(normalizarEspacios('  Ana   María   Pérez ')).toBe('Ana María Pérez');
    expect(normalizarEspacios(null)).toBe('');
  });
});

describe('normalizarTelefonoEc', () => {
  it('descarta separadores', () => {
    expect(normalizarTelefonoEc('099 123-4567')).toBe('0991234567');
    expect(normalizarTelefonoEc('(05) 234 5678')).toBe('052345678');
  });

  it('convierte el prefijo internacional a formato local', () => {
    expect(normalizarTelefonoEc('+593991234567')).toBe('0991234567');
    expect(normalizarTelefonoEc('593991234567')).toBe('0991234567');
  });

  it('agrega el cero inicial cuando el usuario lo omite', () => {
    expect(normalizarTelefonoEc('991234567')).toBe('0991234567');
  });

  it('devuelve cadena vacía si no hay dígitos', () => {
    expect(normalizarTelefonoEc('vzdsjvj')).toBe('');
    expect(normalizarTelefonoEc(null)).toBe('');
  });
});

describe('esCedulaEcuatoriana', () => {
  it('acepta una cédula con dígito verificador correcto', () => {
    expect(esCedulaEcuatoriana(conVerificador('131234567'))).toBe(true);
    expect(esCedulaEcuatoriana(conVerificador('170123456'))).toBe(true);
  });

  it('rechaza un dígito verificador incorrecto', () => {
    const valida = conVerificador('131234567');
    const alterada = valida.slice(0, 9) + ((Number(valida[9]) + 1) % 10);
    expect(esCedulaEcuatoriana(alterada)).toBe(false);
  });

  it('rechaza provincias fuera de 01-24 y 30', () => {
    expect(esCedulaEcuatoriana(conVerificador('991234567'))).toBe(false);
    expect(esCedulaEcuatoriana(conVerificador('001234567'))).toBe(false);
    expect(esCedulaEcuatoriana(conVerificador('251234567'))).toBe(false);
  });

  it('acepta la provincia 30 (registrados en el exterior)', () => {
    expect(esCedulaEcuatoriana(conVerificador('301234567'))).toBe(true);
  });

  it('rechaza un tercer dígito mayor a 5 (no es persona natural)', () => {
    expect(esCedulaEcuatoriana(conVerificador('136234567'))).toBe(false);
    expect(esCedulaEcuatoriana(conVerificador('139234567'))).toBe(false);
  });

  it('rechaza longitudes distintas de 10 y valores no numéricos', () => {
    expect(esCedulaEcuatoriana('131234567')).toBe(false);
    expect(esCedulaEcuatoriana('13123456789')).toBe(false);
    expect(esCedulaEcuatoriana('13123456AB')).toBe(false);
    expect(esCedulaEcuatoriana('zvzcv')).toBe(false);
    expect(esCedulaEcuatoriana('')).toBe(false);
    expect(esCedulaEcuatoriana(null)).toBe(false);
  });
});

describe('esPasaporte', () => {
  it('acepta alfanuméricos de 6 a 15 con al menos una letra', () => {
    expect(esPasaporte('AB123456')).toBe(true);
    expect(esPasaporte('ab123456')).toBe(true);
    expect(esPasaporte('A12345')).toBe(true);
  });

  it('rechaza cadenas cortas, largas, solo numéricas o con símbolos', () => {
    expect(esPasaporte('AB12')).toBe(false);
    expect(esPasaporte('A1234567890123456')).toBe(false);
    expect(esPasaporte('12345678')).toBe(false);
    expect(esPasaporte('AB-123456')).toBe(false);
  });
});

describe('esDocumentoIdentidad', () => {
  it('acepta cédula válida o pasaporte válido', () => {
    expect(esDocumentoIdentidad(conVerificador('131234567'))).toBe(true);
    expect(esDocumentoIdentidad('AB123456')).toBe(true);
  });

  it('rechaza un número de 10 dígitos que no es cédula válida', () => {
    expect(esDocumentoIdentidad('1234567890')).toBe(false);
  });

  it('rechaza texto arbitrario', () => {
    expect(esDocumentoIdentidad('zvzcv')).toBe(false);
    expect(esDocumentoIdentidad('')).toBe(false);
  });
});

describe('esTelefonoEcuador', () => {
  it('acepta celulares y fijos válidos', () => {
    expect(esTelefonoEcuador('0991234567')).toBe(true);
    expect(esTelefonoEcuador('+593 99 123 4567')).toBe(true);
    expect(esTelefonoEcuador('991234567')).toBe(true);
    expect(esTelefonoEcuador('052345678')).toBe(true);
  });

  it('rechaza longitudes incorrectas y prefijos inválidos', () => {
    expect(esTelefonoEcuador('12345')).toBe(false);
    expect(esTelefonoEcuador('09912345678')).toBe(false);
    expect(esTelefonoEcuador('012345678')).toBe(false);
    expect(esTelefonoEcuador('082345678')).toBe(false);
    expect(esTelefonoEcuador('vzdsjvj')).toBe(false);
  });

  it('distingue celular de fijo', () => {
    expect(esCelularEcuador('0991234567')).toBe(true);
    expect(esCelularEcuador('052345678')).toBe(false);
  });
});

describe('aFormatoInternacionalEc', () => {
  it('convierte números válidos a formato wa.me', () => {
    expect(aFormatoInternacionalEc('0991234567')).toBe('593991234567');
    expect(aFormatoInternacionalEc('+593 99 123 4567')).toBe('593991234567');
  });

  it('devuelve cadena vacía si el número no es válido', () => {
    expect(aFormatoInternacionalEc('12345')).toBe('');
    expect(aFormatoInternacionalEc('vzdsjvj')).toBe('');
  });
});

describe('esEmail', () => {
  it('acepta direcciones con dominio y TLD', () => {
    expect(esEmail('ana@clinica.com')).toBe(true);
    expect(esEmail('ana.perez+cita@clinica.com.ec')).toBe(true);
  });

  it('rechaza direcciones incompletas o con espacios', () => {
    expect(esEmail('ana@')).toBe(false);
    expect(esEmail('ana.com')).toBe(false);
    expect(esEmail('ana@clinica')).toBe(false);
    expect(esEmail('ana perez@clinica.com')).toBe(false);
    expect(esEmail(null)).toBe(false);
  });
});
