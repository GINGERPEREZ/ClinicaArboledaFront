import { describe, it, expect } from 'vitest';
import { validarFormulario, sanitizarFormulario } from '@/utils/formValidation';
import {
  ESQUEMA_PACIENTE,
  SANITIZADORES_PACIENTE,
  NORMALIZADORES_PACIENTE,
  LIMITES,
} from '@/components/AgendamientoCitas/pacienteSchema';

/** Datos mínimos válidos; cada prueba sobrescribe solo el campo que le interesa. */
const pacienteValido = () => ({
  nombre: 'María Pérez Loor',
  cedula: '1312345679',
  telefono: '0991234567',
  email: '',
  motivo: '',
});

const validar = (parcial = {}) => validarFormulario({ ...pacienteValido(), ...parcial }, ESQUEMA_PACIENTE);

describe('ESQUEMA_PACIENTE', () => {
  it('acepta un paciente con los datos obligatorios correctos', () => {
    expect(validar().esValido).toBe(true);
  });

  it('rechaza el formulario que motivó estas validaciones', () => {
    // Datos exactos capturados del bug: texto arbitrario en todos los campos.
    const { esValido, errores } = validar({
      nombre: 'svhzdhv',
      cedula: 'zvzcv',
      telefono: 'vzdsjvj',
      motivo: 'zvjzj',
    });

    expect(esValido).toBe(false);
    expect(errores).toHaveProperty('nombre');
    expect(errores).toHaveProperty('cedula');
    expect(errores).toHaveProperty('telefono');
  });

  describe('nombre', () => {
    it('es obligatorio', () => {
      expect(validar({ nombre: '' }).errores.nombre).toBe('El nombre completo es obligatorio.');
      expect(validar({ nombre: '   ' }).errores.nombre).toBe('El nombre completo es obligatorio.');
    });

    it('rechaza dígitos y símbolos', () => {
      expect(validar({ nombre: 'Ana 123' }).errores.nombre).toMatch(/solo puede contener letras/);
    });

    it('exige nombre y apellido', () => {
      expect(validar({ nombre: 'Ana' }).errores.nombre).toBe('Ingresa al menos un nombre y un apellido.');
    });

    it('rechaza tecleo al azar aunque sean solo letras', () => {
      // Caso reportado: pasaba todas las reglas de formato por ser
      // letras + dos palabras, pero es impronunciable.
      expect(validar({ nombre: 'jnrvwiuu ifwniufnizuf' }).errores.nombre).toBe(
        'El nombre no parece válido. Revisa que esté bien escrito.'
      );
    });

    it('sigue aceptando nombres reales', () => {
      expect(validar({ nombre: 'María Pérez Loor' }).esValido).toBe(true);
      expect(validar({ nombre: 'Schmidt Zambrano' }).esValido).toBe(true);
      expect(validar({ nombre: 'Ana Muñoz' }).esValido).toBe(true);
    });

    it('respeta el límite de longitud', () => {
      expect(validar({ nombre: 'ab' }).errores.nombre).toMatch(/entre 3 y/);
      expect(validar({ nombre: 'A'.repeat(LIMITES.nombre + 1) }).errores.nombre).toMatch(/entre 3 y/);
    });
  });

  describe('cedula', () => {
    it('es obligatoria', () => {
      expect(validar({ cedula: '' }).errores.cedula).toBe('La cédula o pasaporte es obligatoria.');
    });

    it('da un mensaje específico cuando parece cédula pero el verificador falla', () => {
      expect(validar({ cedula: '1234567890' }).errores.cedula).toMatch(/Verifica los 10 dígitos/);
    });

    it('acepta un pasaporte válido', () => {
      expect(validar({ cedula: 'AB123456' }).esValido).toBe(true);
    });

    it('rechaza texto arbitrario', () => {
      expect(validar({ cedula: 'zvzcv' }).errores.cedula).toMatch(/cédula de 10 dígitos o un pasaporte/);
    });
  });

  describe('telefono', () => {
    it('es obligatorio', () => {
      expect(validar({ telefono: '' }).errores.telefono).toBe('El teléfono es obligatorio.');
    });

    it('rechaza caracteres no numéricos', () => {
      expect(validar({ telefono: '099abc4567' }).errores.telefono).toBe('El teléfono solo puede contener números.');
    });

    it('rechaza números con formato inválido', () => {
      expect(validar({ telefono: '12345' }).errores.telefono).toMatch(/celular \(09XXXXXXXX\)/);
    });

    it('acepta celular y fijo', () => {
      expect(validar({ telefono: '0991234567' }).esValido).toBe(true);
      expect(validar({ telefono: '052345678' }).esValido).toBe(true);
    });
  });

  describe('email (opcional)', () => {
    it('permite dejarlo vacío', () => {
      expect(validar({ email: '' }).esValido).toBe(true);
    });

    it('exige formato válido si se llena', () => {
      expect(validar({ email: 'ana@' }).errores.email).toMatch(/correo electrónico válido/);
      expect(validar({ email: 'ana@clinica.com' }).esValido).toBe(true);
    });
  });

  describe('motivo (opcional)', () => {
    it('permite dejarlo vacío', () => {
      expect(validar({ motivo: '' }).esValido).toBe(true);
    });

    it('exige un mínimo útil si se llena', () => {
      expect(validar({ motivo: 'abc' }).errores.motivo).toMatch(/entre 5 y/);
      expect(validar({ motivo: 'Dolor de cabeza persistente' }).esValido).toBe(true);
    });

    it('rechaza textos que superan el límite', () => {
      expect(validar({ motivo: 'a'.repeat(LIMITES.motivo + 1) }).errores.motivo).toMatch(/entre 5 y/);
    });
  });
});

describe('SANITIZADORES_PACIENTE', () => {
  const sanitizar = (datos) => sanitizarFormulario(datos, SANITIZADORES_PACIENTE);

  it('descarta dígitos y símbolos del nombre mientras se escribe', () => {
    expect(sanitizar({ nombre: 'Ana123 Pérez!' }).nombre).toBe('Ana Pérez');
  });

  it('deja la cédula en mayúsculas y solo alfanumérica', () => {
    expect(sanitizar({ cedula: '13-1234.567 9' }).cedula).toBe('1312345679');
    expect(sanitizar({ cedula: 'ab123456' }).cedula).toBe('AB123456');
  });

  it('deja solo dígitos en el teléfono', () => {
    expect(sanitizar({ telefono: '+593 (99) 123-4567' }).telefono).toBe('593991234567');
  });

  it('quita espacios y baja a minúsculas el correo', () => {
    expect(sanitizar({ email: '  Ana@Clinica.COM ' }).email).toBe('ana@clinica.com');
  });

  it('recorta cada campo a su límite máximo', () => {
    expect(sanitizar({ nombre: 'A'.repeat(200) }).nombre).toHaveLength(LIMITES.nombre);
    expect(sanitizar({ cedula: '1'.repeat(200) }).cedula).toHaveLength(LIMITES.cedula);
    expect(sanitizar({ motivo: 'x'.repeat(500) }).motivo).toHaveLength(LIMITES.motivo);
  });
});

describe('NORMALIZADORES_PACIENTE', () => {
  it('deja los datos listos para enviar', () => {
    const salida = sanitizarFormulario(
      {
        nombre: '  Ana   María   Pérez  ',
        cedula: ' ab123456 ',
        telefono: '+593 99 123 4567',
        email: '  Ana@Clinica.com ',
        motivo: '  Dolor de cabeza  ',
      },
      NORMALIZADORES_PACIENTE
    );

    expect(salida).toEqual({
      nombre: 'Ana María Pérez',
      cedula: 'AB123456',
      telefono: '0991234567',
      email: 'ana@clinica.com',
      motivo: 'Dolor de cabeza',
    });
  });

  it('produce datos que siguen pasando el esquema', () => {
    const salida = sanitizarFormulario(
      { ...pacienteValido(), nombre: '  María   Pérez  ', telefono: '+593991234567' },
      NORMALIZADORES_PACIENTE
    );
    expect(validarFormulario(salida, ESQUEMA_PACIENTE).esValido).toBe(true);
  });
});
