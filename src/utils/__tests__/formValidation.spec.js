import { describe, it, expect } from 'vitest';
import { opcional, validarCampo, validarFormulario, sanitizarFormulario } from '@/utils/formValidation';
import { requerido, esEmail } from '@/utils/validators';

const reglaNoVacio = { validar: requerido, mensaje: 'obligatorio' };
const reglaMinimo3 = { validar: (valor) => String(valor).length >= 3, mensaje: 'muy corto' };

describe('opcional', () => {
  it('deja pasar valores vacíos sin evaluar el validador interno', () => {
    const validar = opcional(esEmail);
    expect(validar('')).toBe(true);
    expect(validar('   ')).toBe(true);
    expect(validar(null)).toBe(true);
  });

  it('aplica el validador cuando el campo tiene contenido', () => {
    const validar = opcional(esEmail);
    expect(validar('ana@clinica.com')).toBe(true);
    expect(validar('ana@')).toBe(false);
  });
});

describe('validarCampo', () => {
  it('devuelve null cuando todas las reglas pasan', () => {
    expect(validarCampo('hola', [reglaNoVacio, reglaMinimo3])).toBeNull();
  });

  it('se detiene en la primera regla que falla', () => {
    // Ambas reglas fallarían: debe ganar la primera, que es la más específica.
    expect(validarCampo('', [reglaNoVacio, reglaMinimo3])).toBe('obligatorio');
    expect(validarCampo('ab', [reglaNoVacio, reglaMinimo3])).toBe('muy corto');
  });

  it('trata un campo sin reglas como válido', () => {
    expect(validarCampo('lo que sea')).toBeNull();
    expect(validarCampo('lo que sea', [])).toBeNull();
  });

  it('expone el formulario completo a las reglas que dependen de otros campos', () => {
    const reglaCruzada = {
      validar: (valor, datos) => valor === datos.password,
      mensaje: 'las contraseñas no coinciden',
    };
    expect(validarCampo('abc', [reglaCruzada], { password: 'abc' })).toBeNull();
    expect(validarCampo('abc', [reglaCruzada], { password: 'xyz' })).toBe('las contraseñas no coinciden');
  });
});

describe('validarFormulario', () => {
  const esquema = { nombre: [reglaNoVacio], alias: [reglaMinimo3] };

  it('reporta esValido cuando no hay errores', () => {
    const resultado = validarFormulario({ nombre: 'Ana', alias: 'anita' }, esquema);
    expect(resultado.esValido).toBe(true);
    expect(resultado.errores).toEqual({});
  });

  it('acumula un error por campo inválido', () => {
    const resultado = validarFormulario({ nombre: '', alias: 'ab' }, esquema);
    expect(resultado.esValido).toBe(false);
    expect(resultado.errores).toEqual({ nombre: 'obligatorio', alias: 'muy corto' });
  });

  it('ignora los campos del objeto que no están en el esquema', () => {
    const resultado = validarFormulario({ nombre: 'Ana', alias: 'anita', extra: '' }, esquema);
    expect(resultado.esValido).toBe(true);
    expect(resultado.errores).not.toHaveProperty('extra');
  });
});

describe('sanitizarFormulario', () => {
  it('aplica cada sanitizador a su campo', () => {
    const salida = sanitizarFormulario(
      { nombre: '  Ana  ', telefono: '099-123-4567' },
      { nombre: (v) => v.trim(), telefono: (v) => v.replace(/\D/g, '') }
    );
    expect(salida).toEqual({ nombre: 'Ana', telefono: '0991234567' });
  });

  it('copia sin tocar los campos sin sanitizador', () => {
    const salida = sanitizarFormulario({ a: ' x ', b: ' y ' }, { a: (v) => v.trim() });
    expect(salida).toEqual({ a: 'x', b: ' y ' });
  });

  it('no muta el objeto original', () => {
    const original = { nombre: '  Ana  ' };
    const salida = sanitizarFormulario(original, { nombre: (v) => v.trim() });
    expect(original.nombre).toBe('  Ana  ');
    expect(salida).not.toBe(original);
  });
});
