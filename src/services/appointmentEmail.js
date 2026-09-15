const ADMISSION_EMAIL = 'cmanosalvas@outlook.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${ADMISSION_EMAIL}`;

const limpiar = (value) => String(value || '').trim() || 'No registrado';

export function construirResumenCita(params) {
  return [
    'Nueva solicitud de cita desde la página web de Clínica Arboleda.',
    '',
    'DATOS DEL PACIENTE',
    `Paciente: ${limpiar(params.paciente)}`,
    `Identificación / Cédula: ${limpiar(params.identificacion)}`,
    `Teléfono / WhatsApp: ${limpiar(params.telefono)}`,
    `Correo electrónico: ${limpiar(params.correo)}`,
    '',
    'DATOS DE LA CITA SOLICITADA',
    `Especialidad: ${limpiar(params.especialidad)}`,
    `Médico: ${limpiar(params.medico)}`,
    `Opción principal: ${limpiar(params.horario_principal)}`,
    `Opción alternativa: ${limpiar(params.horario_alternativo)}`,
    `Motivo de consulta: ${limpiar(params.motivo)}`,
    '',
    'NOTA PARA ADMISIÓN',
    'La cita aún no está confirmada. Por favor contactar al paciente para confirmar disponibilidad o proponer otro horario.',
  ].join('\n');
}

export function crearPayloadCorreoCita(params) {
  return {
    _subject: `Solicitud de cita - ${limpiar(params.paciente)}`,
    _template: 'table',
    _captcha: 'false',
    _honey: '',
    name: limpiar(params.paciente),
    email: limpiar(params.correo),
    telefono: limpiar(params.telefono),
    identificacion: limpiar(params.identificacion),
    especialidad: limpiar(params.especialidad),
    medico: limpiar(params.medico),
    opcion_principal: limpiar(params.horario_principal),
    opcion_alternativa: limpiar(params.horario_alternativo),
    motivo: limpiar(params.motivo),
    message: construirResumenCita(params),
  };
}

export async function enviarResumenCita(params) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(crearPayloadCorreoCita(params)),
    });

    if (!response.ok) throw new Error('formsubmit-error');
  } catch {
    throw new Error('No pudimos enviar la solicitud. Revisa tu conexión e inténtalo nuevamente.');
  } finally {
    clearTimeout(timeout);
  }
}

export { ADMISSION_EMAIL, FORMSUBMIT_ENDPOINT };
