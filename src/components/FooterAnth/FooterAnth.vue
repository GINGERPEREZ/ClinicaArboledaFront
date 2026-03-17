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
        <li><a href="/contacto">Contacto</a></li>
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
      <div class="footer-column">
      <h4>Políticas y Condiciones</h4>
      <ul>
        <li><a href="/proteccion-datos">Protección de datos</a></li>
      </ul>
      </div>
    </div>
    </div>

    <div class="footer-bottom">
    <div class="footer-bottom-left">
      <span>&copy; 2026 Clínica Arboleda. Todos los derechos reservados.</span>
    </div>
    <div class="footer-bottom-right"></div>
    </div>
  </footer>
  </template>

<script src="./FooterAnth.js"></script>
<style src="./FooterAnth.css"></style>