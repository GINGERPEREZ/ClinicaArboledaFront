<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="cookies-container">
    <HeaderAnth />

    <div class="cookies-content">
      <!-- Encabezado -->
      <section class="cookies-intro">
        <div class="content-container">
          <div class="page-header">
            <h1 class="page-title">POLÍTICA DE COOKIES</h1>
            <p class="page-description">
              Información sobre cómo utilizamos las cookies y tecnologías similares en nuestro sitio web para mejorar tu experiencia.
            </p>
          </div>
        </div>
      </section>

      <!-- Qué son las cookies -->
      <section class="cookies-info">
        <div class="info-container">
          <h2 class="section-title">¿Qué son las Cookies?</h2>
          <p class="section-description">
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web.
            Nos permiten recordar tus preferencias, analizar el uso del sitio y ofrecerte una experiencia personalizada.
            Al continuar navegando, aceptas el uso de cookies conforme a esta política.
          </p>
        </div>
      </section>

      <!-- Tipos de cookies -->
      <section class="cookies-section cookies-tipos">
        <div class="cookies-wrapper">
          <div class="section-header">
            <div class="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8h.01"></path>
                <path d="M11 12h2v4h-2"></path>
              </svg>
            </div>
            <h2 class="section-title">Tipos de Cookies que Utilizamos</h2>
            <p class="section-subtitle">Clasificación según su finalidad y duración</p>
          </div>

          <div class="cookies-grid">
            <div class="cookie-card">
              <div class="cookie-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 class="cookie-card-title">Cookies Estrictamente Necesarias</h3>
              <p class="cookie-card-text">
                Son imprescindibles para el funcionamiento del sitio. Permiten navegar y usar funciones básicas como el inicio de sesión y el carrito de compras. No pueden desactivarse.
              </p>
              <span class="cookie-badge badge-necessary">Siempre activas</span>
            </div>

            <div class="cookie-card">
              <div class="cookie-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 class="cookie-card-title">Cookies Analíticas</h3>
              <p class="cookie-card-text">
                Nos ayudan a entender cómo interactúan los visitantes con el sitio, recopilando información de manera anónima. Usamos esta información para mejorar el contenido y la navegación.
              </p>
              <span class="cookie-badge badge-optional">Opcionales</span>
            </div>

            <div class="cookie-card">
              <div class="cookie-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 class="cookie-card-title">Cookies de Preferencias</h3>
              <p class="cookie-card-text">
                Permiten recordar información que cambia el comportamiento o aspecto del sitio, como el idioma preferido o la región en la que te encuentras.
              </p>
              <span class="cookie-badge badge-optional">Opcionales</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Control de cookies -->
      <section class="cookies-section cookies-control">
        <div class="cookies-wrapper">
          <div class="section-header">
            <div class="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"></path>
              </svg>
            </div>
            <h2 class="section-title">Cómo Controlar las Cookies</h2>
            <p class="section-subtitle">Gestiona tus preferencias en cualquier momento</p>
          </div>

          <div class="content-card">
            <p class="card-text">
              Puedes configurar tu navegador para que bloquee o elimine las cookies. Ten en cuenta que deshabilitar ciertas cookies puede afectar el funcionamiento del sitio.
            </p>
            <ul class="cookies-list">
              <li>
                <strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios.
              </li>
              <li>
                <strong>Mozilla Firefox:</strong> Ajustes → Privacidad y seguridad → Cookies y datos del sitio.
              </li>
              <li>
                <strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos del sitio web.
              </li>
              <li>
                <strong>Microsoft Edge:</strong> Configuración → Privacidad, búsqueda y servicios → Cookies.
              </li>
            </ul>
            <p class="card-text" style="margin-top: 16px;">
              También puedes utilizar herramientas de opt-out de terceros como
              <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" class="inline-link">Your Online Choices</a>
              para gestionar las cookies de publicidad basadas en intereses.
            </p>
          </div>
        </div>
      </section>

      <!-- Vigencia y contacto -->
      <section class="cookies-section cookies-vigencia">
        <div class="cookies-wrapper">
          <div class="section-header">
            <div class="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h2 class="section-title">Vigencia y Actualización</h2>
            <p class="section-subtitle">Esta política puede actualizarse periódicamente</p>
          </div>

          <div class="content-card">
            <p class="card-text">
              Esta Política de Cookies fue actualizada por última vez el <strong>23 de marzo de 2026</strong>.
              Clínica Arboleda se reserva el derecho de modificarla en cualquier momento para adaptarse a nuevos requisitos
              legales o cambios en los servicios ofrecidos. Te recomendamos revisarla periódicamente.
            </p>
            <p class="card-text" style="margin-top: 16px;">
              Para cualquier consulta sobre el uso de cookies, puedes contactarnos en
              <a href="mailto:info@clinicaarboleda.com" class="inline-link">info@clinicaarboleda.com</a>
              o llamarnos al <a href="tel:+593995111622" class="inline-link">0995 111 622</a>.
            </p>
          </div>
        </div>
      </section>
    </div>

    <FooterAnth />
  </div>
</template>

<script src="./PoliticaCookies.js"></script>
<style src="./PoliticaCookies.css"></style>



