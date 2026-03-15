<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="convenios-container">
    <HeaderAnth />
    
    <div class="convenios-content">
      <!-- Hero Section -->
      <section class="convenios-hero">
        <div class="hero-overlay">
          <h1 class="hero-title">Convenios y Alianzas</h1>
          <p class="hero-subtitle">
            Trabajamos con las principales aseguradoras y sistemas de salud para brindarte el mejor servicio
          </p>
        </div>
      </section>

      <!-- Información general -->
      <section class="convenios-info">
        <div class="info-container">
          <h2 class="section-title">Nuestras Alianzas Estratégicas</h2>
          <p class="section-description">
            En Clínica Metropolitana mantenemos acuerdos con las principales compañías de seguros privados 
            y sistemas públicos de salud, facilitando el acceso a nuestros servicios médicos de calidad.
          </p>
        </div>
      </section>

      <!-- Sistemas Públicos -->
      <section class="convenios-section convenios-publicos">
        <div class="convenios-wrapper">
          <div class="section-header">
            <div class="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h2 class="section-title">Sistemas Públicos</h2>
            <p class="section-subtitle">Convenios con instituciones de salud pública</p>
          </div>
          
          <div class="convenios-grid">
            <div 
              v-for="sistema in sistemasPublicos" 
              :key="sistema.id"
              class="convenio-card"
            >
              <div class="card-header">
                <div class="card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 class="card-title">{{ sistema.nombre }}</h3>
              </div>
              <div class="card-body">
                <p class="card-description">{{ sistema.descripcion }}</p>
                <div class="card-coberturas">
                  <p class="coberturas-title">Servicios disponibles:</p>
                  <ul class="coberturas-list">
                    <li v-for="(servicio, index) in sistema.servicios" :key="index">
                      {{ servicio }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Seguros Privados -->
      <section class="convenios-section">
        <div class="convenios-wrapper">
          <div class="section-header">
            <div class="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h2 class="section-title">Seguros Privados</h2>
            <p class="section-subtitle">Cobertura con las principales aseguradoras del país</p>
          </div>
          
          <div class="convenios-grid">
            <div 
              v-for="seguro in segurosPrivados" 
              :key="seguro.id"
              class="convenio-card"
            >
              <div class="card-header">
                <div class="card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 class="card-title">{{ seguro.nombre }}</h3>
              </div>
              <div class="card-body">
                <p class="card-description">{{ seguro.descripcion }}</p>
                <div class="card-coberturas">
                  <p class="coberturas-title">Coberturas:</p>
                  <ul class="coberturas-list">
                    <li v-for="(cobertura, index) in seguro.coberturas" :key="index">
                      {{ cobertura }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="convenios-cta">
        <div class="cta-container">
          <h2 class="cta-title">¿Tienes dudas sobre tu cobertura?</h2>
          <p class="cta-description">
            Nuestro equipo está listo para ayudarte a verificar tu cobertura y resolver todas tus consultas
          </p>
          <button class="cta-button" @click="contactar">
            Contactar con nosotros
          </button>
        </div>
      </section>
    </div>

    <FooterAnth />
  </div>
</template>

<script src="./Convenios.js"></script>
<style src="./Convenios.css"></style>
