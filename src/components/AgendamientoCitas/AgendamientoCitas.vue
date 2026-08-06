<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="agendamiento-container">
    <HeaderAnth />

    <div class="agendamiento-content">
      <!-- Hero -->
      <section class="agendamiento-hero">
        <div class="hero-overlay">
          <div class="hero-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h1 class="hero-title">Agenda tu Cita Médica</h1>
          <p class="hero-subtitle">Reserva tu consulta de forma rápida y sencilla con nuestros especialistas</p>
        </div>
      </section>

      <!-- Stepper -->
      <section v-if="!citaConfirmada" class="agendamiento-stepper-section">
        <div class="stepper-wrapper">
          <div class="stepper">
            <div
              v-for="(step, idx) in steps"
              :key="idx"
              :class="['step', { active: currentStep === idx, completed: currentStep > idx }]"
              @click="goToStep(idx)"
            >
              <div class="step-circle">
                <svg v-if="currentStep > idx" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span v-else>{{ idx + 1 }}</span>
              </div>
              <span class="step-label">{{ step }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Form Area -->
      <section :class="['agendamiento-form-section', { 'success-section': citaConfirmada }]">
        <div class="form-wrapper">

          <!-- Paso 1: Especialidad -->
          <div v-if="currentStep === 0" class="form-step" key="step-0">
            <h2 class="form-step-title">Selecciona una Especialidad</h2>
            <p class="form-step-desc">Elige la especialidad médica para tu consulta</p>

            <div class="especialidades-grid">
              <button
                v-for="esp in especialidades"
                :key="esp.id"
                :class="['especialidad-card', { selected: selectedEspecialidad?.id === esp.id }]"
                @click="selectEspecialidad(esp)"
              >
                <span class="especialidad-icon" v-html="esp.icon"></span>
                <span class="especialidad-name">{{ esp.nombre }}</span>
              </button>
            </div>
          </div>

          <!-- Paso 2: Médico -->
          <div v-if="currentStep === 1" class="form-step" key="step-1">
            <h2 class="form-step-title">Elige tu Médico</h2>
            <p class="form-step-desc">Médicos disponibles en {{ selectedEspecialidad?.nombre }}</p>

            <div class="medicos-grid">
              <button
                v-for="med in medicosDisponibles"
                :key="med.id"
                :class="['medico-card', { selected: selectedMedico?.id === med.id }]"
                @click="selectMedico(med)"
              >
                <div class="medico-avatar">{{ med.iniciales }}</div>
                <div class="medico-info">
                  <h4 class="medico-name">{{ med.nombre }}</h4>
                  <p class="medico-especialidad">{{ med.especialidad }}</p>
                  <div class="medico-horario">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {{ med.horario }}
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Paso 3: Fecha y Hora -->
          <div v-if="currentStep === 2" class="form-step" key="step-2">
            <h2 class="form-step-title">Selecciona Fecha y Hora</h2>
            <p class="form-step-desc">Horarios disponibles con {{ selectedMedico?.nombre }}</p>

            <div class="turnos-grid" role="group" aria-label="Horarios disponibles">
              <button
                v-for="turno in turnosDisponibles"
                :key="turno.id"
                :class="['turno-card', { selected: selectedDate === turno.fecha && selectedTime === turno.hora }]"
                @click="selectTurno(turno)"
              >
                <span class="turno-fecha">{{ formatDayLabel(turno.fecha) }}</span>
                <span class="turno-hora">{{ turno.hora }}</span>
              </button>
            </div>
          </div>

          <!-- Paso 4: Datos del paciente -->
          <div v-if="currentStep === 3" class="form-step patient-sheet-step" key="step-3">
            <h2 class="form-step-title">Datos del Paciente</h2>
            <p class="form-step-desc">Completa tu información para solicitar la cita</p>

            <div class="patient-sheet">
              <form class="patient-form" novalidate @submit.prevent="nextStep">
              <div class="form-row">
                <div class="form-group">
                  <label class="field-label" for="paciente-nombre">Nombre completo *</label>
                  <input
                    id="paciente-nombre"
                    type="text"
                    v-model="patientData.nombre"
                    :class="['form-input', { 'input-error': errorDe('nombre') }]"
                    :maxlength="limites.nombre"
                    :aria-invalid="!!errorDe('nombre')"
                    :aria-describedby="errorDe('nombre') ? 'error-nombre' : null"
                    autocomplete="name"
                    placeholder="Ej: María Pérez Loor"
                    @input="onCampoInput('nombre')"
                    @blur="onCampoBlur('nombre')"
                  />
                  <span v-if="errorDe('nombre')" id="error-nombre" class="field-error" role="alert">{{ errorDe('nombre') }}</span>
                </div>

                <div class="form-group">
                  <label class="field-label" for="paciente-cedula">Cédula / Pasaporte *</label>
                  <input
                    id="paciente-cedula"
                    type="text"
                    v-model="patientData.cedula"
                    :class="['form-input', { 'input-error': errorDe('cedula') }]"
                    :maxlength="limites.cedula"
                    :aria-invalid="!!errorDe('cedula')"
                    :aria-describedby="errorDe('cedula') ? 'error-cedula' : null"
                    inputmode="numeric"
                    autocomplete="off"
                    placeholder="Ej: 1312345678"
                    @input="onCampoInput('cedula')"
                    @blur="onCampoBlur('cedula')"
                  />
                  <span v-if="errorDe('cedula')" id="error-cedula" class="field-error" role="alert">{{ errorDe('cedula') }}</span>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="field-label" for="paciente-telefono">Teléfono *</label>
                  <input
                    id="paciente-telefono"
                    type="tel"
                    v-model="patientData.telefono"
                    :class="['form-input', { 'input-error': errorDe('telefono') }]"
                    :maxlength="limites.telefono"
                    :aria-invalid="!!errorDe('telefono')"
                    :aria-describedby="errorDe('telefono') ? 'error-telefono' : null"
                    inputmode="numeric"
                    autocomplete="tel"
                    placeholder="Ej: 0991234567"
                    @input="onCampoInput('telefono')"
                    @blur="onCampoBlur('telefono')"
                  />
                  <span v-if="errorDe('telefono')" id="error-telefono" class="field-error" role="alert">{{ errorDe('telefono') }}</span>
                  <span v-else class="field-hint">La clínica usará este número para contactarte y confirmar la disponibilidad.</span>
                </div>

                <div class="form-group">
                  <label class="field-label" for="paciente-email">Correo electrónico <span class="field-optional">(opcional)</span></label>
                  <input
                    id="paciente-email"
                    type="email"
                    v-model="patientData.email"
                    :class="['form-input', { 'input-error': errorDe('email') }]"
                    :maxlength="limites.email"
                    :aria-invalid="!!errorDe('email')"
                    :aria-describedby="errorDe('email') ? 'error-email' : null"
                    inputmode="email"
                    autocomplete="email"
                    placeholder="tucorreo@ejemplo.com"
                    @input="onCampoInput('email')"
                    @blur="onCampoBlur('email')"
                  />
                  <span v-if="errorDe('email')" id="error-email" class="field-error" role="alert">{{ errorDe('email') }}</span>
                </div>
              </div>

              <div class="form-group">
                <label class="field-label" for="paciente-motivo">Motivo de la consulta <span class="field-optional">(opcional)</span></label>
                <textarea
                  id="paciente-motivo"
                  v-model="patientData.motivo"
                  :class="['form-textarea', { 'input-error': errorDe('motivo') }]"
                  :maxlength="limites.motivo"
                  :aria-invalid="!!errorDe('motivo')"
                  :aria-describedby="errorDe('motivo') ? 'error-motivo' : null"
                  rows="3"
                  placeholder="Describe brevemente el motivo de tu consulta..."
                  @input="onCampoInput('motivo')"
                  @blur="onCampoBlur('motivo')"
                ></textarea>
                <div class="field-footer">
                  <span v-if="errorDe('motivo')" id="error-motivo" class="field-error" role="alert">{{ errorDe('motivo') }}</span>
                  <span class="field-counter">{{ patientData.motivo.length }} / {{ limites.motivo }}</span>
                </div>
              </div>
            </form>
            </div>
          </div>

          <!-- Paso 5: Confirmación -->
          <div v-if="currentStep === 4 && !citaConfirmada" class="form-step" key="step-4">
            <h2 class="form-step-title">Solicita tu cita</h2>
            <p class="form-step-desc">Revisa los datos antes de enviar la solicitud</p>

            <div class="confirmation-card">
              <div class="confirmation-header">
                <div class="confirmation-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <h3>Resumen de tu solicitud</h3>
              </div>

              <!-- Los datos van agrupados y en rejilla, con la etiqueta encima
                   del valor: en filas a lo ancho la etiqueta y el dato quedaban
                   en extremos opuestos de la tarjeta y costaba relacionarlos. -->
              <div class="confirmation-details">
                <section class="resumen-bloque">
                  <h4 class="resumen-bloque-titulo">La cita</h4>
                  <dl class="resumen-grid">
                    <div class="resumen-item">
                      <dt>Especialidad</dt>
                      <dd>{{ selectedEspecialidad?.nombre }}</dd>
                    </div>
                    <div class="resumen-item">
                      <dt>Médico</dt>
                      <dd>{{ selectedMedico?.nombre }}</dd>
                    </div>
                    <div class="resumen-item">
                      <dt>Fecha</dt>
                      <dd>{{ formatDate(selectedDate) }}</dd>
                    </div>
                    <div class="resumen-item">
                      <dt>Hora</dt>
                      <dd>{{ selectedTime }}</dd>
                    </div>
                  </dl>
                </section>

                <section class="resumen-bloque">
                  <h4 class="resumen-bloque-titulo">El paciente</h4>
                  <dl class="resumen-grid">
                    <div class="resumen-item">
                      <dt>Nombre</dt>
                      <dd>{{ patientData.nombre }}</dd>
                    </div>
                    <div class="resumen-item">
                      <dt>Cédula</dt>
                      <dd>{{ patientData.cedula }}</dd>
                    </div>
                    <div class="resumen-item">
                      <dt>Teléfono</dt>
                      <dd>{{ patientData.telefono }}</dd>
                    </div>
                    <div v-if="patientData.email" class="resumen-item">
                      <dt>Correo</dt>
                      <dd>{{ patientData.email }}</dd>
                    </div>
                  </dl>
                </section>

                <section v-if="patientData.motivo" class="resumen-bloque">
                  <h4 class="resumen-bloque-titulo">Motivo de la consulta</h4>
                  <p class="resumen-motivo">{{ patientData.motivo }}</p>
                </section>
              </div>
            </div>
          </div>

          <!-- Success -->
          <div v-if="citaConfirmada" class="form-step success-step" key="step-success">
            <div class="pending-confirmation-alert print-hidden">
              Importante: la fecha y hora seleccionadas están pendientes de confirmación por parte de la Clínica.
            </div>

            <div class="success-card appointment-receipt" id="comprobante-cita">
              <div class="success-icon-wrapper print-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <div class="receipt-header">
                <img src="/Logos/Logo1.png" alt="Clínica Arboleda" class="receipt-logo" />
                <div>
                  <p class="receipt-kicker">Comprobante de solicitud de cita médica</p>
                  <h2 class="success-title">Solicitud de cita recibida</h2>
                </div>
              </div>

              <p class="success-desc">
                Tu solicitud fue registrada correctamente. Conserva este comprobante con los datos enviados.
              </p>

              <div class="receipt-details">
                <div class="receipt-row">
                  <span>Paciente</span>
                  <strong>{{ patientData.nombre }}</strong>
                </div>
                <div class="receipt-row">
                  <span>Cédula / Pasaporte</span>
                  <strong>{{ patientData.cedula }}</strong>
                </div>
                <div class="receipt-row">
                  <span>Teléfono</span>
                  <strong>{{ patientData.telefono }}</strong>
                </div>
                <div class="receipt-row">
                  <span>Correo electrónico</span>
                  <strong>{{ patientData.email || 'No registrado' }}</strong>
                </div>
                <div class="receipt-row">
                  <span>Especialidad</span>
                  <strong>{{ selectedEspecialidad?.nombre }}</strong>
                </div>
                <div class="receipt-row">
                  <span>Médico</span>
                  <strong>{{ selectedMedico?.nombre }}</strong>
                </div>
                <div class="receipt-row">
                  <span>Fecha</span>
                  <strong>{{ formatDate(selectedDate) }}</strong>
                </div>
                <div class="receipt-row">
                  <span>Hora</span>
                  <strong>{{ selectedTime }}</strong>
                </div>
                <div class="receipt-row receipt-row-full">
                  <span>Motivo de consulta</span>
                  <strong>{{ patientData.motivo || 'No registrado' }}</strong>
                </div>
              </div>

              <p class="receipt-note">
                Nos comunicaremos contigo para confirmar la Cita.
              </p>

              <div class="success-actions print-hidden">
                <button class="btn-secondary" @click="imprimirComprobante">Imprimir comprobante</button>
                <button class="btn-primary" @click="nuevaCita">Agendar otra cita</button>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div v-if="!citaConfirmada" class="form-navigation">
            <button
              class="btn-secondary"
              :disabled="currentStep === 0"
              @click="prevStep"
            >
              ← Anterior
            </button>
            <button
              v-if="currentStep < 4"
              class="btn-primary"
              :disabled="!canProceed"
              @click="nextStep"
            >
              Siguiente →
            </button>
            <button
              v-else
              class="btn-confirm"
              :disabled="!canProceed"
              @click="confirmarCita"
            >
              ✓ Enviar solicitud
            </button>
          </div>

        </div>
      </section>
    </div>

    <FooterAnth />
  </div>
</template>

<script src="./AgendamientoCitas.js"></script>
<style src="./AgendamientoCitas.css"></style>



