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
            <div class="specialty-panel">
              <h2 class="form-step-title specialty-title">Selecciona una Especialidad</h2>
              <p class="form-step-desc specialty-desc">Elige el área médica en la que deseas recibir atención</p>

              <div class="specialty-search-wrap">
                <svg class="specialty-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="7"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  v-model="specialtySearch"
                  class="specialty-search-input"
                  type="text"
                  placeholder="Buscar especialidad (ej. Cardiología, Pediatría...)"
                />
              </div>

              <div class="specialty-filters">
                <button
                  v-for="filter in filtrosEspecialidad"
                  :key="filter.id"
                  type="button"
                  :class="['specialty-filter-chip', { active: specialtyFilter === filter.id }]"
                  @click="setSpecialtyFilter(filter.id)"
                >
                  {{ filter.label }}
                </button>
              </div>

              <div class="especialidades-grid specialty-grid-enhanced">
              <button
                v-for="esp in especialidadesFiltradas"
                :key="esp.id"
                :class="['especialidad-card', { selected: selectedEspecialidad?.id === esp.id }]"
                @click="selectEspecialidad(esp)"
              >
                <img :src="esp.icon" class="especialidad-icon-img" alt="" loading="lazy" />
                <span class="especialidad-name">{{ esp.nombre }}</span>
              </button>
              </div>

              <p v-if="!especialidadesFiltradas.length" class="specialty-empty-state">
                No encontramos especialidades con ese criterio.
              </p>
            </div>
          </div>

          <!-- Paso 2: Médico -->
          <div v-if="currentStep === 1" class="form-step" key="step-1">
            <div class="doctor-panel">
              <div class="selected-specialty-pill">
                <span class="selected-specialty-icon">🩺</span>
                <span>Especialidad: {{ selectedEspecialidad?.nombre }}</span>
              </div>

              <h2 class="form-step-title doctor-title">Elige a tu Profesional</h2>
              <p class="form-step-desc doctor-desc">Puedes seleccionar un especialista específico buscando por nombre o consultorio.</p>

              <div class="doctor-search-wrap">
                <svg class="doctor-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="7"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  v-model="doctorSearch"
                  class="doctor-search-input"
                  type="text"
                  placeholder="Buscar por nombre del médico o consultorio..."
                />
              </div>

              <div class="medicos-grid doctor-grid-enhanced">
              <button
                v-for="med in medicosFiltrados"
                :key="med.id"
                :class="['medico-card', { selected: selectedMedico?.id === med.id }]"
                @click="selectMedico(med)"
              >
                <div class="medico-avatar doctor-avatar-emoji">
                  <img :src="selectedEspecialidad?.icon" class="especialidad-icon-img doctor-specialty-icon" alt="" loading="lazy" />
                </div>
                <div class="medico-info">
                  <h4 class="medico-name">{{ med.nombre }}</h4>
                  <p class="medico-especialidad">{{ med.especialidad }}</p>
                  <div class="doctor-location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10z"></path>
                      <circle cx="12" cy="11" r="2"></circle>
                    </svg>
                    {{ consultorioDe(med) }}
                  </div>
                </div>
              </button>
              </div>

              <p v-if="!medicosFiltrados.length" class="doctor-empty-state">
                No encontramos profesionales con ese criterio.
              </p>
            </div>
          </div>

          <!-- Paso 3: Fecha y Hora -->
          <div v-if="currentStep === 2" class="form-step" key="step-2">
            <h2 class="form-step-title">Selecciona Fecha y Hora</h2>
            <p class="form-step-desc">Elige tu opción prioritaria y una alternativa en caso de imprevistos de agenda.</p>

            <div class="selected-medico-pill">
              <span class="selected-medico-dot">👨‍⚕️</span>
              <span>{{ selectedMedico?.nombre }} • {{ selectedMedico?.especialidad }}</span>
            </div>

            <div class="selection-summary">
              <button
                type="button"
                :class="['selection-chip', 'selection-chip-primary', { active: activeSlotTarget === 0 }]"
                @click="setActiveSlotTarget(0)"
              >
                <span class="selection-chip-label">Opción principal (requerida)</span>
                <strong>{{ slotPrincipal ? formatShortDayLabel(slotPrincipal.fecha) + ' - ' + slotPrincipal.hora : 'Aún no seleccionada' }}</strong>
              </button>
              <button
                type="button"
                :class="['selection-chip', 'selection-chip-alt', { active: activeSlotTarget === 1 }]"
                @click="setActiveSlotTarget(1)"
              >
                <span class="selection-chip-label">Segunda opción (recomendada)</span>
                <strong>{{ slotAlternativo ? formatShortDayLabel(slotAlternativo.fecha) + ' - ' + slotAlternativo.hora : 'Opcional, recomendada' }}</strong>
              </button>
            </div>

            <div class="schedule-layout">
              <div class="calendar-card">
                <div class="calendar-header">
                  <button class="calendar-arrow" type="button" disabled>&lt;</button>
                  <strong>{{ mesCalendarioLabel }}</strong>
                  <button class="calendar-arrow" type="button" disabled>&gt;</button>
                </div>

                <div class="calendar-weekdays">
                  <span>Lun</span>
                  <span>Mar</span>
                  <span>Mié</span>
                  <span>Jue</span>
                  <span>Vie</span>
                  <span>Sáb</span>
                  <span>Dom</span>
                </div>

                <div class="calendar-grid">
                  <button
                    v-for="dia in diasCalendario"
                    :key="dia.fecha"
                    type="button"
                    :disabled="!dia.disponible"
                    :class="[
                      'calendar-day',
                      {
                        muted: dia.pasada,
                        active: fechaCalendarioActiva === dia.fecha,
                        available: dia.disponible,
                        empty: dia.vacio,
                      }
                    ]"
                    @click="seleccionarFechaCalendario(dia.fecha)"
                  >
                    {{ dia.dia }}
                  </button>
                </div>
              </div>

              <div class="slots-panel">
                <div class="slots-group">
                  <h3 class="slots-group-title">Mañana</h3>
                  <div class="slots-row" role="group" aria-label="Horarios de la mañana">
                    <button
                      v-for="turno in turnosManana"
                      :key="turno.id"
                      type="button"
                      :class="[
                        'time-option',
                        {
                          'selected-primary': slotSeleccionado(turno) === 0,
                          'selected-alt': slotSeleccionado(turno) === 1,
                        }
                      ]"
                      @click="selectTurno(turno)"
                    >
                      {{ turno.hora }}
                    </button>
                  </div>
                </div>

                <div class="slots-group">
                  <h3 class="slots-group-title">Tarde</h3>
                  <div class="slots-row" role="group" aria-label="Horarios de la tarde">
                    <button
                      v-for="turno in turnosTarde"
                      :key="turno.id"
                      type="button"
                      :class="[
                        'time-option',
                        {
                          'selected-primary': slotSeleccionado(turno) === 0,
                          'selected-alt': slotSeleccionado(turno) === 1,
                        }
                      ]"
                      @click="selectTurno(turno)"
                    >
                      {{ turno.hora }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p class="selection-note">La fecha y hora definitivas serán coordinadas y confirmadas por Clínica Arboleda.</p>
          </div>

          <!-- Paso 4: Datos del paciente -->
          <div v-if="currentStep === 3" class="form-step patient-sheet-step" key="step-3">
            <h2 class="form-step-title">Datos del Paciente</h2>
            <p class="form-step-desc">Completa tu información para que podamos revisar tu solicitud y contactarte con la confirmación</p>

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

              <div class="privacy-card">
                <h3 class="privacy-title">Información básica sobre protección de datos personales</h3>
                <p><strong>Responsable:</strong> Centro Médico Arboleda S.A.</p>
                <p><strong>Finalidad:</strong> Gestionar tu solicitud de cita médica y coordinar su confirmación asistencial.</p>
                <p><strong>Base legal:</strong> Ejecución de medidas precontractuales y consentimiento para datos sensibles de salud.</p>
                <p><strong>Destinatarios:</strong> Personal asistencial directo y entidades aseguradoras cuando corresponda.</p>
                <p><strong>Derechos:</strong> Puedes ejercer acceso, rectificación, eliminación y oposición escribiendo a protecciondedatos@clinicaarboleda.ec.</p>
                <p>Consulta el detalle completo en nuestra Política de Privacidad Integral.</p>
              </div>

              <label class="consent-option">
                <input v-model="consents.privacidad" type="checkbox" />
                <span>He leído y acepto la Política de Privacidad y autorizo el tratamiento de mis datos personales, incluidos los de salud, para gestionar y confirmar esta solicitud de cita médica.</span>
              </label>

              <label class="consent-option">
                <input v-model="consents.recordatorios" type="checkbox" />
                <span>Autorizo el envío de recordatorios preventivos de salud, campañas y novedades de servicios médicos por parte de Clínica Arboleda.</span>
              </label>
            </form>
            </div>
          </div>

          <!-- Paso 5: Confirmación -->
          <div v-if="currentStep === 4 && !citaConfirmada" class="form-step" key="step-4">
            <div class="summary-header">
              <h2 class="form-step-title">Resumen de tu solicitud</h2>
              <p class="form-step-desc">Por favor, revisa que todos los datos sean correctos antes de confirmar.</p>
            </div>

            <div class="confirmation-card summary-card">
              <div class="doctor-card">
                <div class="doctor-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 2v2"></path><path d="M5 2v2"></path><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"></path><path d="M8 15a6 6 0 0 0 12 0v-3"></path><circle cx="20" cy="10" r="2"></circle>
                  </svg>
                </div>
                <div class="doctor-info">
                  <h3 class="doctor-name">{{ selectedMedico?.nombre }}</h3>
                  <span class="doctor-specialty">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="m9 12 2 2 4-4"></path>
                    </svg>
                    {{ selectedEspecialidad?.nombre }}
                  </span>
                  <p class="doctor-location">Sede Principal — {{ consultorioDe(selectedMedico) }}</p>
                </div>
              </div>

              <div class="summary-section">
                <div class="section-label">Horarios solicitados</div>
                <div class="dates-container">
                  <div class="date-card date-card-primary">
                    <div class="date-badge">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                      </svg>
                      Opción Principal
                    </div>
                    <div class="date-card-content">
                      <div class="schedule-row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path>
                        </svg>
                        <span>{{ formatearDiaLargo(slotPrincipal.fecha) }}</span>
                      </div>
                      <div class="schedule-row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>{{ formatearHora12(slotPrincipal.hora) }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="date-card date-card-secondary">
                    <div class="date-badge">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="M12 11v6"></path><path d="M9 14h6"></path>
                      </svg>
                      Opción Alternativa
                    </div>
                    <div class="date-card-content">
                      <template v-if="slotAlternativo">
                        <div class="schedule-row">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path>
                          </svg>
                          <span>{{ formatearDiaLargo(slotAlternativo.fecha) }}</span>
                        </div>
                        <div class="schedule-row">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>{{ formatearHora12(slotAlternativo.hora) }}</span>
                        </div>
                      </template>
                      <div v-else class="schedule-row schedule-row-empty">No registrada</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="summary-section">
                <div class="section-label">Información del Paciente</div>
                <div class="patient-details-box">
                  <div class="patient-grid">
                    <div class="patient-field">
                      <span class="field-title">Paciente</span>
                      <span class="field-value">{{ patientData.nombre }}</span>
                    </div>
                    <div class="patient-field">
                      <span class="field-title">Cédula / Pasaporte</span>
                      <span class="field-value">{{ patientData.cedula }}</span>
                    </div>
                    <div class="patient-field">
                      <span class="field-title">Teléfono</span>
                      <span class="field-value">{{ patientData.telefono }}</span>
                    </div>
                    <div class="patient-field">
                      <span class="field-title">Correo electrónico</span>
                      <span class="field-value">{{ patientData.email || 'No registrado' }}</span>
                    </div>
                    <div v-if="patientData.motivo" class="patient-field field-full">
                      <span class="field-title">Motivo de consulta</span>
                      <span class="field-value">{{ patientData.motivo }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="info-alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path>
                </svg>
                <p>Nuestro equipo coordinará con la agenda médica y te confirmará la cita definitiva vía <strong>WhatsApp y correo electrónico</strong> en un lapso menor a 2 horas.</p>
              </div>

              <div class="actions-container">
                <button class="btn-summary-confirm" type="button" @click="confirmarCita">
                  <span>Confirmar y Enviar Solicitud</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
                <button class="btn-summary-back" type="button" @click="prevStep">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                  <span>Modificar datos o fechas</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Success -->
          <div v-if="citaConfirmada" class="form-step success-step" key="step-success">
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
                Tu solicitud fue registrada correctamente. Conserva este comprobante mientras nuestro equipo valida la disponibilidad y te confirma la cita definitiva.
              </p>

              <!-- Sin print-hidden: al imprimir el comprobante, la advertencia
                   de que la cita aun no esta confirmada es lo primero que el
                   paciente necesita leer. -->
              <div class="pending-confirmation-alert" role="status">
                <p>
                  <strong>Importante:</strong> las fechas y horas seleccionadas están pendientes de
                  confirmación por parte de la Clínica. Se estarán contactando con usted.
                </p>
              </div>

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
                  <span>Opción principal</span>
                  <strong>{{ formatearTurno(slotPrincipal) }}</strong>
                </div>
                <div class="receipt-row">
                  <span>Opción alternativa</span>
                  <strong>{{ slotAlternativo ? formatearTurno(slotAlternativo) : 'No registrada' }}</strong>
                </div>
                <div class="receipt-row receipt-row-full">
                  <span>Motivo de consulta</span>
                  <strong>{{ patientData.motivo || 'No registrado' }}</strong>
                </div>
              </div>

              <p class="receipt-note">
                Nos comunicaremos contigo por WhatsApp o correo electrónico para indicarte la fecha y hora confirmadas por la clínica.
              </p>
              <div class="success-actions print-hidden">
                <button class="btn-secondary" @click="imprimirComprobante">Imprimir comprobante</button>
                <button class="btn-primary" @click="nuevaCita">Agendar otra cita</button>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div v-if="!citaConfirmada && currentStep !== 4" class="form-navigation">
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
              ✓ Confirmar y enviar solicitud
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



