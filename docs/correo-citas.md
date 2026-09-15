# Correo de solicitudes de cita

La web envia automaticamente el resumen de la solicitud usando FormSubmit AJAX. No abre Outlook ni otra aplicacion de correo del paciente.

## Correo temporal de pruebas

Destino actual: `cmanosalvas@outlook.com`

Cuando terminen las pruebas, cambiar el destinatario a `Admision@clinicaarboleda.ec` en `src/services/appointmentEmail.js`.

## Activacion inicial

FormSubmit puede pedir una confirmacion la primera vez que se usa un correo destinatario. Si llega un correo de activacion a `cmanosalvas@outlook.com`, hay que aceptarlo para que las solicitudes empiecen a entregarse.

## Datos enviados

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

Esta solucion no guarda citas en una base de datos ni confirma disponibilidad medica. Solo envia el resumen al correo configurado para que admision contacte al paciente.
