import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { ADMISSION_EMAIL, construirResumenCita, crearEnlaceCorreoCita, enviarResumenCita } from './appointmentEmail';

beforeEach(() => {
  vi.stubGlobal('window', { location: { href: '' } });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

it('builds the admission email summary without external configuration', () => {
  const body = construirResumenCita({
    paciente: 'Carlos Mendoza',
    identificacion: '1314859620',
    telefono: '+593 99 123 4567',
    correo: 'carlos@example.com',
    especialidad: 'Cardiología',
    medico: 'Dr. Alejandro Morales',
    horario_principal: '20 de agosto de 2026 - 10:30',
    horario_alternativo: '21 de agosto de 2026 - 16:00',
    motivo: 'Chequeo preventivo',
  });

  expect(body).toContain('Nueva solicitud de cita desde la página web');
  expect(body).toContain('Paciente: Carlos Mendoza');
  expect(body).toContain('Identificación / Cédula: 1314859620');
  expect(body).toContain('Motivo de consulta: Chequeo preventivo');
  expect(body).toContain('La cita aún no está confirmada');
});

it('creates a mailto link addressed to admission', () => {
  const link = crearEnlaceCorreoCita({ paciente: 'Paciente Prueba' });

  expect(link).toContain(`mailto:${ADMISSION_EMAIL}`);
  expect(decodeURIComponent(link)).toContain('Solicitud de cita - Paciente Prueba');
});

it('opens the prepared email from the browser', () => {
  enviarResumenCita({ paciente: 'Paciente Prueba' });

  expect(window.location.href).toContain(`mailto:${ADMISSION_EMAIL}`);
});
