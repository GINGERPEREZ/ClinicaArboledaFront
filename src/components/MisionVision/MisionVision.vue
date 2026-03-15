<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="sobrenosotros-container">
    <HeaderAnth />
    
    <div class="sobrenosotros-content">
      <!-- Hero Section -->
      <section class="sobrenosotros-hero">
        <div class="hero-overlay">
          <h1 class="hero-title">Sobre Nosotros</h1>
          <p class="hero-subtitle">
            Comprometidos con la excelencia en salud y el bienestar de nuestros pacientes
          </p>
        </div>
      </section>

      <!-- Información general -->
      <section class="sobrenosotros-info">
        <div class="info-container">
          <h2 class="section-title">Nuestra Identidad</h2>
          <p class="section-description">
            En Clínica Arboleda trabajamos día a día para ser líderes en servicios de salud especializados, 
            cumpliendo los más altos estándares de calidad con calidez humana en cada atención.
          </p>
        </div>
      </section>

      <!-- Misión -->
      <section class="sobrenosotros-section sobrenosotros-mision">
        <div class="sobrenosotros-wrapper">
          <div class="section-header">
            <div class="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h2 class="section-title">Nuestra Misión</h2>
            <p class="section-subtitle">La razón de ser de Clínica Arboleda</p>
          </div>
          
          <div class="content-card">
            <div class="card-body-mision">
              <p class="mission-vision-text">
                Somos una corporación médica vanguardista que ofrece servicios especializados de salud, 
                asegurando a la comunidad un tratamiento oportuno y eficaz, cumpliendo estándares de 
                calidad con calidez en su atención.
              </p>
              <div class="valores-section">
                <h3 class="valores-title">Nuestros Valores</h3>
                <ul class="valores-list">
                  <li>Excelencia en la atención médica</li>
                  <li>Calidez humana en cada interacción</li>
                  <li>Compromiso con la comunidad</li>
                  <li>Innovación y vanguardia tecnológica</li>
                  <li>Ética y profesionalismo</li>
                  <li>Seguridad del paciente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Visión -->
      <section class="sobrenosotros-section sobrenosotros-vision">
        <div class="sobrenosotros-wrapper">
          <div class="section-header">
            <div class="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M2 12h20"></path>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <h2 class="section-title">Nuestra Visión</h2>
            <p class="section-subtitle">Hacia dónde nos dirigimos</p>
          </div>
          
          <div class="content-card">
            <div class="card-body-mision">
              <p class="mission-vision-text">
                Ser líderes en innovación y transformación en servicios de salud, convirtiéndonos en un 
                complejo hospitalario con reconocimiento nacional, basados en atención profesional 
                humanizada en busca del bienestar de los pacientes y la comunidad.
              </p>
              <div class="valores-section">
                <h3 class="valores-title">Nuestros Objetivos</h3>
                <ul class="valores-list">
                  <li>Consolidarnos como referente nacional en salud</li>
                  <li>Implementar tecnología de vanguardia</li>
                  <li>Ampliar nuestra cobertura de especialidades</li>
                  <li>Fortalecer alianzas estratégicas</li>
                  <li>Mejorar continuamente nuestros procesos</li>
                  <li>Formar profesionales de excelencia</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="sobrenosotros-cta">
        <div class="cta-container">
          <h2 class="cta-title">¿Quieres conocer más sobre nosotros?</h2>
          <p class="cta-description">
            Visita nuestras instalaciones y conoce de primera mano nuestro compromiso con tu salud
          </p>
          <button class="cta-button" @click="contactar">
            Visítanos
          </button>
        </div>
      </section>
    </div>

    <FooterAnth />
  </div>
</template>

<script src="./MisionVision.js"></script>
<style src="./MisionVision.css"></style>
