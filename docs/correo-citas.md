# Correo de solicitudes de cita

La web prepara un correo dirigido a `Admision@clinicaarboleda.ec` usando `mailto:`. No requiere backend, base de datos, EmailJS ni cuentas externas.

## Como funciona

1. El paciente completa especialidad, medico, fechas y datos de contacto.
2. Al confirmar, el navegador abre el correo predeterminado del dispositivo.
3. El mensaje ya viene dirigido a admision, con asunto y resumen de la solicitud.
4. El paciente debe enviar ese correo desde su app de correo.
5. Admision recibe el resumen y contacta al paciente para confirmar o proponer otro horario.

## Datos incluidos

```text
Paciente
Identificacion / Cedula
Telefono / WhatsApp
Correo electronico
Especialidad
Medico
Opcion principal
Opcion alternativa
Motivo de consulta
```

## Limitacion importante

Esta solucion depende de que el dispositivo del paciente tenga una aplicacion de correo configurada y de que el paciente pulse enviar en esa aplicacion. Para envio automatico sin intervencion del paciente, si se necesitara un servicio externo de correo o un backend.
