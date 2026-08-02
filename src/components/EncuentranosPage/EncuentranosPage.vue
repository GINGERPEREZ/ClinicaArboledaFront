<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="encuentranos-container">
    <HeaderAnth />

    <div class="encuentranos-content">
      <!-- Hero Section -->
      <section class="encuentranos-hero">
        <div class="hero-overlay">
          <h1 class="hero-title">Encuéntranos</h1>
          <p class="hero-subtitle">
            Estamos aquí para atenderte. Visítanos, llámanos o escríbenos.
          </p>
        </div>
      </section>

      <!-- Dirección y Teléfono -->
      <section class="encuentranos-section encuentranos-info-section">
        <div class="encuentranos-wrapper">
          <div class="section-header">
            <div class="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h2 class="section-title">Información de Contacto</h2>
            <p class="section-subtitle">Encuéntranos en nuestra sede principal</p>
          </div>

          <div class="info-cards-grid">
            <!-- Dirección -->
            <div class="info-card">
              <div class="info-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 class="info-card-title">Dirección</h3>
              <p class="info-card-text">Calle 17, entre Av. 37 y 38</p>
              <p class="info-card-sub">Manta 130213, Ecuador</p>
            </div>

            <!-- Teléfono -->
            <div class="info-card">
              <div class="info-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.56 16z"></path>
                </svg>
              </div>
              <h3 class="info-card-title">Teléfono</h3>
              <a href="tel:+593995111622" class="info-card-link">0995 111 622</a>
              <p class="info-card-sub">Lun – Sáb: 7:00 am – 7:00 pm</p>
            </div>

            <!-- Correo -->
            <div class="info-card">
              <div class="info-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3 class="info-card-title">Correo Electrónico</h3>
              <a href="mailto:info@clinicaarboleda.com" class="info-card-link">info@clinicaarboleda.com</a>
              <p class="info-card-sub">Respondemos en menos de 24 horas</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Google Maps -->
      <section class="encuentranos-section encuentranos-mapa-section">
        <div class="encuentranos-wrapper">
          <div class="section-header">
            <div class="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
            </div>
            <h2 class="section-title">Cómo Llegar</h2>
            <p class="section-subtitle">Ubícanos fácilmente en el mapa</p>
          </div>

          <div class="mapa-wrapper">
            <iframe
              title="Ubicación Clínica Arboleda"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.193487343828!2d-80.74324282503478!3d-0.9538775990369077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902be1e795c7deff%3A0x938f8fd77be297e3!2sCl%C3%ADnica%20Arboleda%20Manta!5e1!3m2!1ses-419!2sec!4v1774243940982!5m2!1ses-419!2sec"
              width="100%"
              height="450"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div class="mapa-footer">
            <a
              href="https://maps.google.com/?q=Clinica+Arboleda+Manta"
              target="_blank"
              rel="noopener noreferrer"
              class="mapa-cta"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </section>
    </div>

    <FooterAnth />
  </div>
</template>

<script src="./EncuentranosPage.js"></script>
<style src="./EncuentranosPage.css"></style>



