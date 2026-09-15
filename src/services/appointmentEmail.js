const ADMISSION_EMAIL = 'Admision@clinicaarboleda.ec';

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

export function crearEnlaceCorreoCita(params) {
  const subject = `Solicitud de cita - ${limpiar(params.paciente)}`;
  const body = construirResumenCita(params);
  return `mailto:${ADMISSION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function enviarResumenCita(params) {
  window.location.href = crearEnlaceCorreoCita(params);
}

export { ADMISSION_EMAIL };
