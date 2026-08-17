<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="arco-container">
    <HeaderAnth />

    <main class="arco-content">
      <section class="arco-hero">
        <div class="arco-shell">
          <span class="arco-badge">Canal Oficial de Derechos ARCO+ (Ecuador)</span>
          <h1>Solicitud de Ejercicio de <span>Derechos del Titular</span></h1>
          <p>
            Canal formal para ejercer tus derechos de Acceso, Rectificación, Eliminación, Oposición,
            Portabilidad o Suspensión de tus datos de acuerdo con la LOPDP.
          </p>
        </div>
      </section>

      <section class="arco-form-section">
        <div class="arco-shell">
          <div class="arco-form-card">
            <div class="arco-form-top">
              <div class="arco-form-top-copy">
                <strong>¿Prefieres presentar tu solicitud de forma física o presencial en la clínica?</strong>
                <span>También puedes descargar el formato oficial en PDF.</span>
              </div>
              <a class="arco-download" :href="pdfUrl" download>
                Descargar Formato Físico (PDF)
              </a>
            </div>

            <form class="arco-form" @submit.prevent="enviarSolicitud" novalidate>
              <section class="arco-block">
                <h2>1. Calidad del Solicitante</h2>

                <div class="solicitante-grid">
                  <button
                    type="button"
                    class="solicitante-option"
                    :class="{ active: formulario.calidadSolicitante === 'titular' }"
                    @click="formulario.calidadSolicitante = 'titular'"
                  >
                    <strong>Titular de los Datos</strong>
                    <span>Ejerce directamente tus derechos sobre datos personales o médicos.</span>
                  </button>

                  <button
                    type="button"
                    class="solicitante-option"
                    :class="{ active: formulario.calidadSolicitante === 'representante' }"
                    @click="formulario.calidadSolicitante = 'representante'"
                  >
                    <strong>Representante Legal / Apoderado</strong>
                    <span>Para uso debidamente autorizado en nombre del titular.</span>
                  </button>
                </div>

                <div class="form-grid">
                  <label>
                    <span>Nombres y Apellidos del Titular *</span>
                    <input v-model.trim="formulario.nombre" type="text" placeholder="Ej. Carlos Eduardo Mendoza" />
                  </label>
                  <label>
                    <span>Tipo y Número de Identificación *</span>
                    <input v-model.trim="formulario.identificacion" type="text" placeholder="Cédula, DNI o Pasaporte" />
                  </label>
                  <label>
                    <span>Correo Electrónico de Notificación *</span>
                    <input v-model.trim="formulario.correo" type="email" placeholder="ejemplo@correo.com" />
                  </label>
                  <label>
                    <span>Teléfono de Contacto (WhatsApp/Móvil) *</span>
                    <input v-model.trim="formulario.telefono" type="text" placeholder="0991234567" />
                  </label>
                </div>
              </section>

              <section class="arco-block">
                <h2>2. Derecho que Solicita Ejercer</h2>

                <label class="field-full">
                  <span>Selecciona el Derecho Principal a ejercer *</span>
                  <select v-model="formulario.derecho">
                    <option value="">-- Selecciona el tipo de derecho --</option>
                    <option v-for="opcion in derechosDisponibles" :key="opcion" :value="opcion">
                      {{ opcion }}
                    </option>
                  </select>
                </label>

                <label class="field-full">
                  <span>Descripción detallada y fundamentación de la solicitud *</span>
                  <textarea
                    v-model.trim="formulario.descripcion"
                    rows="5"
                    placeholder="Describe con claridad y precisión la información o historial al que te refieres, el motivo de tu solicitud o los datos específicos a corregir."
                  ></textarea>
                </label>
              </section>

              <section class="arco-block">
                <h2>3. Documentos Adjuntos de Identificación y Respaldo</h2>

                <label class="field-full">
                  <span>Copia de Cédula de Identidad / Pasaporte (Anverso y Reverso) *</span>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" @change="registrarArchivo($event, 'identificacion')" />
                </label>

                <label class="field-full">
                  <span>Documento de respaldo adicional (Opcional)</span>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" @change="registrarArchivo($event, 'respaldo')" />
                </label>

                <div class="file-summary">
                  <p><strong>Archivo principal:</strong> {{ nombreArchivo('identificacion') }}</p>
                  <p><strong>Archivo adicional:</strong> {{ nombreArchivo('respaldo') }}</p>
                </div>

                <div class="arco-note">
                  <p>
                    Plazo legal de respuesta: Conforme al Art. 47 de la LOPDP, Clínica Arboleda S.A. tramitará y
                    notificará la contestación formal motivada en un plazo máximo de quince (15) días hábiles posteriores a la recepción completa de esta solicitud.
                  </p>
                </div>

                <label class="checkbox-line">
                  <input v-model="formulario.declaracion" type="checkbox" />
                  <span>
                    Declaro bajo juramento que los datos ingresados y la documentación adjunta son legítimos y veraces,
                    autorizando su verificación para atender esta solicitud formal de privacidad.
                  </span>
                </label>
              </section>

              <p v-if="error" class="form-error">{{ error }}</p>

              <div class="arco-actions">
                <button type="button" class="back-link" @click="volverAPrivacidad">
                  Volver al Centro de Privacidad
                </button>
                <button type="submit" class="submit-button">
                  Enviar Solicitud ARCO
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>

    <FooterAnth />
  </div>
</template>

<script src="./DerechosARCO.js"></script>
<style src="./DerechosARCO.css"></style>
