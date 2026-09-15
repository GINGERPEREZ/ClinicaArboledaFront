import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import {
  ADMISSION_EMAIL,
  FORMSUBMIT_ENDPOINT,
  construirResumenCita,
  crearPayloadCorreoCita,
  enviarResumenCita,
} from './appointmentEmail';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
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

it('creates the automatic email payload addressed by the provider endpoint', () => {
  const payload = crearPayloadCorreoCita({
    paciente: 'Paciente Prueba',
    correo: 'paciente@example.com',
  });

  expect(FORMSUBMIT_ENDPOINT).toContain(ADMISSION_EMAIL);
  expect(payload._subject).toBe('Solicitud de cita - Paciente Prueba');
  expect(payload.email).toBe('paciente@example.com');
});

it('sends the summary without opening the email client', async () => {
  fetch.mockResolvedValue({ ok: true });

  await expect(enviarResumenCita({ paciente: 'Paciente Prueba' })).resolves.toBeUndefined();

  expect(fetch).toHaveBeenCalledWith(
    FORMSUBMIT_ENDPOINT,
    expect.objectContaining({
      method: 'POST',
      body: expect.stringContaining('Paciente Prueba'),
    })
  );
});

it('does not report success when the provider rejects the request', async () => {
  fetch.mockResolvedValue({ ok: false });

  await expect(enviarResumenCita({ paciente: 'Paciente Prueba' })).rejects.toThrow('No pudimos enviar');
});
