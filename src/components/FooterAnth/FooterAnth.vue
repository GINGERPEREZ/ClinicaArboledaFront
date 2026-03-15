<template>
  <footer class="footer-container">
    <div class="footer-main">
    <div class="footer-brand" id="redes-sociales">
      <div class="footer-logo">
        <img src="/Logos/Logo1.png" alt="Clínica Arboleda" class="footer-logo-image" />
      </div>
      <p class="footer-tagline">
        Tu clínica de confianza con los mejores especialistas comprometidos con tu salud y bienestar.
      </p>
      <div class="footer-social-row">
        <a
          v-for="red in redesSociales"
          :key="red.nombre"
          :href="red.url"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
        >
          <div v-html="red.icon" class="social-icon-svg"></div>
        </a>
      </div>
    </div>

    <div class="footer-columns">
      <div class="footer-column">
      <h4>Servicios</h4>
      <ul>
        <li><a href="/productos">Nuestros Médicos</a></li>
        <li><a href="/promociones">Servicios Virtuales</a></li>
      </ul>
      </div>
      <div class="footer-column">
      <h4>Pacientes</h4>
      <ul>
        <li><a href="/faq">Preguntas Frecuentes</a></li>
        <li><a href="#" @click.prevent="abrirModalContacto">Contacto</a></li>
      </ul>
      </div>
      <div class="footer-column">
      <h4>Hospital</h4>
      <ul>
        <li><a href="/mision-vision">Sobre Nosotros</a></li>
        <li><a href="/mision-vision">Misión y Visión</a></li>
        <li><a href="/instalaciones">Instalaciones</a></li>
      </ul>
      </div>
    </div>
    </div>

    <div class="footer-bottom">
    <div class="footer-bottom-left">
      <span>&copy; 2026 Clínica Arboleda. Todos los derechos reservados.</span>
    </div>
    <div class="footer-bottom-right">
      <button class="btn-proteccion-datos" @click="goToProteccionDatos">Protección de datos</button>
    </div>
    </div>

    <!-- Modal de Contacto -->
    <transition name="modal-fade">
      <div v-if="mostrarModalContacto" class="modal-overlay" @click="cerrarModalContacto">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="cerrarModalContacto">&times;</button>
          <h2 class="modal-title">Contáctanos</h2>
          <p class="modal-subtitle">Un asesor se comunicará contigo lo antes posible</p>
          
          <form @submit.prevent="enviarContacto" class="contact-form">
            <div class="form-group">
              <label for="nombre">Nombre completo *</label>
              <input 
                type="text" 
                id="nombre" 
                v-model="formularioContacto.nombre" 
                required 
                placeholder="Tu nombre"
              />
            </div>

            <div class="form-group">
              <label for="email">Correo electrónico</label>
              <input 
                type="email" 
                id="email" 
                v-model="formularioContacto.email" 
                placeholder="tu@email.com"
              />
            </div>

            <div class="form-group">
              <label for="telefono">Teléfono *</label>
              <input 
                type="tel" 
                id="telefono" 
                v-model="formularioContacto.telefono" 
                required 
                placeholder="0999999999"
              />
            </div>

            <div class="form-group">
              <label for="asunto">Asunto</label>
              <select id="asunto" v-model="formularioContacto.asunto">
                <option value="cita">Agendar cita médica</option>
                <option value="consulta">Consulta general</option>
                <option value="informacion">Solicitar información</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div class="form-group">
              <label for="mensaje">Mensaje</label>
              <textarea 
                id="mensaje" 
                v-model="formularioContacto.mensaje" 
                rows="3"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>

            <p class="disclaimer-text">
              Al enviar este formulario, aceptas que tus datos personales sean procesados conforme a la Ley Orgánica de Protección de Datos Personales vigente. Tus datos serán utilizados únicamente para gestionar tu consulta y no serán compartidos con terceros.
            </p>

            <button type="submit" class="btn-submit" :disabled="enviandoContacto">
              {{ enviandoContacto ? 'Enviando...' : 'Enviar solicitud' }}
            </button>
          </form>
        </div>
      </div>
    </transition>
  </footer>
  </template>

<script src="./FooterAnth.js"></script>
<style src="./FooterAnth.css"></style>