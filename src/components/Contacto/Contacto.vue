<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="contacto-page-container">
    <HeaderAnth />

    <main class="contacto-page-content">
      <section class="contacto-hero">
        <div class="contacto-hero-content">
          <h1>Contacto</h1>
          <p>Un asesor de Clínica Arboleda se comunicará contigo lo antes posible.</p>
        </div>
      </section>

      <section class="contacto-form-section">
        <div class="contacto-form-card">
          <h2 class="contacto-form-title">Formulario de contacto</h2>
          <p class="contacto-form-subtitle">Completa tus datos y te ayudaremos con tu solicitud.</p>

          <!-- novalidate: la validacion la hace el componente, para que los
               mensajes salgan en linea, en espaniol y con el mismo criterio -->
          <form @submit.prevent="enviarContacto" class="contacto-form" novalidate>
            <div class="form-group">
              <label for="nombre">Nombre completo *</label>
              <input
                id="nombre"
                v-model="formularioContacto.nombre"
                type="text"
                placeholder="Tu nombre"
                maxlength="80"
                required
                :class="{ 'campo-invalido': errores.nombre }"
                :aria-invalid="errores.nombre ? 'true' : 'false'"
                aria-describedby="error-nombre"
                @blur="validarCampo('nombre')"
                @input="limpiarError('nombre')"
              />
              <p id="error-nombre" class="form-error" role="alert">
                {{ errores.nombre }}
              </p>
            </div>

            <div class="form-group">
              <label for="email">Correo electrónico</label>
              <input
                id="email"
                v-model="formularioContacto.email"
                type="email"
                placeholder="tu@email.com"
                maxlength="120"
                :class="{ 'campo-invalido': errores.email }"
                :aria-invalid="errores.email ? 'true' : 'false'"
                aria-describedby="error-email"
                @blur="validarCampo('email')"
                @input="limpiarError('email')"
              />
              <p id="error-email" class="form-error" role="alert">
                {{ errores.email }}
              </p>
            </div>

            <div class="form-group">
              <label for="telefono">Teléfono *</label>
              <input
                id="telefono"
                v-model="formularioContacto.telefono"
                type="tel"
                placeholder="0999999999"
                maxlength="20"
                required
                :class="{ 'campo-invalido': errores.telefono }"
                :aria-invalid="errores.telefono ? 'true' : 'false'"
                aria-describedby="error-telefono"
                @blur="validarCampo('telefono')"
                @input="limpiarError('telefono')"
              />
              <p id="error-telefono" class="form-error" role="alert">
                {{ errores.telefono }}
              </p>
            </div>

            <div class="form-group">
              <label for="asunto">Asunto *</label>
              <select
                id="asunto"
                v-model="formularioContacto.asunto"
                required
                :class="{ 'campo-invalido': errores.asunto }"
                :aria-invalid="errores.asunto ? 'true' : 'false'"
                aria-describedby="error-asunto"
                @change="validarCampo('asunto')"
              >
                <option value="cita">Agendar cita médica</option>
                <option value="informacion">Solicitar información</option>
                <option value="otro">Otro</option>
              </select>
              <p id="error-asunto" class="form-error" role="alert">
                {{ errores.asunto }}
              </p>
            </div>

            <div class="form-group">
              <label for="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                v-model="formularioContacto.mensaje"
                rows="4"
                placeholder="Escribe tu mensaje aquí..."
                maxlength="500"
                required
                :class="{ 'campo-invalido': errores.mensaje }"
                :aria-invalid="errores.mensaje ? 'true' : 'false'"
                aria-describedby="error-mensaje contador-mensaje"
                @blur="validarCampo('mensaje')"
                @input="limpiarError('mensaje')"
              ></textarea>
              <p id="contador-mensaje" class="form-contador">{{ caracteresMensaje }} / 500</p>
              <p id="error-mensaje" class="form-error" role="alert">
                {{ errores.mensaje }}
              </p>
            </div>

            <p class="disclaimer-text">
              Al enviar este formulario, aceptas que tus datos personales sean procesados conforme a la Ley Orgánica de Protección de Datos Personales vigente. Tus datos serán utilizados únicamente para gestionar tu consulta y no serán compartidos con terceros.
            </p>

            <div class="consentimiento-group">
              <label class="consentimiento-label" for="consentimiento-datos">
                <input
                  id="consentimiento-datos"
                  v-model="formularioContacto.aceptaTratamientoDatos"
                  type="checkbox"
                  required
                  :aria-invalid="errores.aceptaTratamientoDatos ? 'true' : 'false'"
                  aria-describedby="error-consentimiento"
                  @change="validarCampo('aceptaTratamientoDatos')"
                />
                <span>
                 Autorizo el tratamiento de mis datos personales conforme a la Política de Protección de Datos Personales de la Clínica para la gestión de mi solicitud.
                </span>
              </label>
              <p id="error-consentimiento" class="form-error" role="alert">
                {{ errores.aceptaTratamientoDatos }}
              </p>
            </div>

            <button type="submit" class="btn-submit" :disabled="enviandoContacto">
              {{ enviandoContacto ? 'Enviando...' : 'Enviar solicitud' }}
            </button>
          </form>
        </div>
      </section>
    </main>

    <FooterAnth />
  </div>
</template>

<script src="./Contacto.js"></script>
<style src="./Contacto.css"></style>



