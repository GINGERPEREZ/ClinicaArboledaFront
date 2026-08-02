<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="contacto-page-container">
    <HeaderAnth />

    <main class="contacto-page-content">
      <section class="contacto-hero">
        <div class="contacto-hero-content">
          <h1>Contacto</h1>
          <p>Un asesor de Clinica Arboleda se comunicara contigo lo antes posible.</p>
        </div>
      </section>

      <section class="contacto-form-section">
        <div class="contacto-form-card">
          <h2 class="contacto-form-title">Formulario de contacto</h2>
          <p class="contacto-form-subtitle">Completa tus datos y te ayudaremos con tu solicitud.</p>

          <form @submit.prevent="enviarContacto" class="contacto-form">
            <div class="form-group">
              <label for="nombre">Nombre completo *</label>
              <input
                id="nombre"
                v-model="formularioContacto.nombre"
                type="text"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div class="form-group">
              <label for="email">Correo electronico</label>
              <input
                id="email"
                v-model="formularioContacto.email"
                type="email"
                placeholder="tu@email.com"
              />
            </div>

            <div class="form-group">
              <label for="telefono">Telefono *</label>
              <input
                id="telefono"
                v-model="formularioContacto.telefono"
                type="tel"
                placeholder="0999999999"
                required
              />
            </div>

            <div class="form-group">
              <label for="asunto">Asunto</label>
              <select id="asunto" v-model="formularioContacto.asunto">
                <option value="cita">Agendar cita medica</option>
                <option value="consulta">Consulta general</option>
                <option value="informacion">Solicitar informacion</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div class="form-group">
              <label for="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                v-model="formularioContacto.mensaje"
                rows="4"
                placeholder="Escribe tu mensaje aqui..."
              ></textarea>
            </div>

            <p class="disclaimer-text">
              Al enviar este formulario, aceptas que tus datos personales sean procesados conforme a la Ley Organica de Proteccion de Datos Personales vigente. Tus datos seran utilizados unicamente para gestionar tu consulta y no seran compartidos con terceros.
            </p>

            <div class="consentimiento-group">
              <label class="consentimiento-label" for="consentimiento-datos">
                <input
                  id="consentimiento-datos"
                  v-model="formularioContacto.aceptaTratamientoDatos"
                  type="checkbox"
                  required
                />
                <span>
                 Autorizo el tratamiento de mis datos personales conforme a la Politica  de Proteccion de Datos Personales de la Clinica para la gestion de mi solicitud.
                </span>
              </label>
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



