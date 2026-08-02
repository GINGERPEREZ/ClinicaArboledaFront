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
      <div class="footer-contact-info">
        <p class="footer-contact-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          Calle 17, entre Av. 37 y 38, Manta 130213
        </p>
        <p class="footer-contact-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.56 16z"></path>
          </svg>
          <a href="tel:+593995111622" class="footer-contact-link">0995 111 622</a>
        </p>
      </div>
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
      <h4>Atención</h4>
      <ul>
        <li><a href="/faq">Preguntas Frecuentes</a></li>
        <li><a href="/contacto">Contacto</a></li>
        <li><a href="/encuentranos">Encuéntranos</a></li>
      </ul>
      </div>
      <div class="footer-column">
      <h4>Políticas y Condiciones</h4>
      <ul>
        <li><a href="/proteccion-datos">Protección de datos</a></li>
        <li><a href="/politica-cookies">Política de Cookies</a></li>
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

    <div class="footer-attribution">
      Icons by <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer">Flaticon</a>
    </div>
  </footer>
  </template>

<script src="./FooterAnth.js"></script>
<style src="./FooterAnth.css"></style>


