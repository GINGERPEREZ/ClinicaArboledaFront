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
            Canal formal para ejercer tus derechos de Acceso, Rectificacion, Eliminacion, Oposicion,
            Portabilidad o Suspension de tus datos de acuerdo a la LOPDP.
          </p>
        </div>
      </section>

      <section class="arco-form-section">
        <div class="arco-shell">
          <div class="arco-form-card">
            <div class="arco-form-top">
              <div class="arco-form-top-copy">
                <strong>Prefieres presentar tu solicitud de forma fisica o presencial en la clinica?</strong>
                <span>Tambien puedes descargar el formato oficial en PDF.</span>
              </div>
              <a class="arco-download" :href="pdfUrl" download>
                Descargar Formato Fisico (PDF)
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
                    <span>Ejerce directamente tus derechos sobre datos personales o medicos.</span>
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
                    <span>Tipo y Numero de Identificacion *</span>
                    <input v-model.trim="formulario.identificacion" type="text" placeholder="Cedula, DNI o Pasaporte" />
                  </label>
                  <label>
                    <span>Correo Electronico de Notificacion *</span>
                    <input v-model.trim="formulario.correo" type="email" placeholder="ejemplo@correo.com" />
                  </label>
                  <label>
                    <span>Telefono de Contacto (WhatsApp/Movil) *</span>
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
                  <span>Descripcion detallada y fundamentacion de la solicitud *</span>
                  <textarea
                    v-model.trim="formulario.descripcion"
                    rows="5"
                    placeholder="Describe con claridad y precision la informacion o historial al que te refieres, el motivo de tu solicitud o los datos especificos a corregir."
                  ></textarea>
                </label>
              </section>

              <section class="arco-block">
                <h2>3. Documentos Adjuntos de Identificacion y Respaldo</h2>

                <label class="field-full">
                  <span>Copia de Cedula de Identidad / Pasaporte (Anverso y Reverso) *</span>
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
                    Plazo legal de respuesta: Conforme al Art. 47 de la LOPDP, Clinica Arboleda S.A. tramitara y
                    notificara la contestacion formal motivada en un plazo maximo de quince (15) dias habiles posteriores a la recepcion completa de esta solicitud.
                  </p>
                </div>

                <label class="checkbox-line">
                  <input v-model="formulario.declaracion" type="checkbox" />
                  <span>
                    Declaro bajo juramento que los datos ingresados y la documentacion adjunta son legitimos y veraces,
                    autorizando su verificacion para atender esta solicitud formal de privacidad.
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
