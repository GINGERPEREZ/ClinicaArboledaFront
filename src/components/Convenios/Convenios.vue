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
                <div v-if="sistema.logo" class="card-logo-wrapper">
                  <img :src="sistema.logo" :alt="`Logo de ${sistema.nombre}`" class="card-logo" />
                </div>
                <div v-else class="card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 class="card-title">{{ sistema.nombre }}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Seguros Privados -->
      <section class="convenios-section convenios-privados-section">
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
          <div
            ref="segurosSlider"
            class="seguros-slider"
            aria-label="Carrusel de seguros privados"
            @mouseenter="pausarAutoSlide"
            @mouseleave="reanudarAutoSlide"
            @touchstart="pausarAutoSlide"
            @touchend="reanudarAutoSlide"
          >
            <div class="convenios-grid convenios-grid-slider">
              <div 
                v-for="seguro in segurosPrivadosCarrusel" 
                :key="seguro.id"
                :class="['convenio-card', { 'convenio-card-placeholder': seguro.placeholder }]"
              >
                <div class="card-header">
                  <div v-if="seguro.logo" class="card-logo-wrapper">
                    <img :src="seguro.logo" :alt="`Logo de ${seguro.nombre}`" class="card-logo" />
                  </div>
                  <div v-else class="card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h3 class="card-title">{{ seguro.nombre }}</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="seguros-privados-cta">
            <a
              :href="whatsappSegurosLink"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-whatsapp-seguros"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              Contáctanos por WhatsApp
            </a>
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



