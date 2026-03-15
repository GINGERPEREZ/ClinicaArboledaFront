<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="servicios-virtuales-container">
    <HeaderAnth />
    
    <div class="servicios-content">
      <!-- Hero Section -->
      <section class="servicios-hero">
        <div class="hero-overlay">
          <div class="hero-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <h1 class="hero-title">Servicios Virtuales</h1>
          <p class="hero-subtitle">
            Accede a nuestros servicios de salud de forma remota, cómoda y segura
          </p>
        </div>
      </section>

      <!-- Descripción -->
      <section class="servicios-intro">
        <div class="intro-container">
          <h2 class="intro-title">Atención médica desde cualquier lugar</h2>
          <p class="intro-description">
            En Clínica Metropolitana transformamos la forma en que accedes a los servicios de salud. 
            Con nuestras herramientas digitales, puedes agendar citas médicas y recibir atención 
            personalizada sin necesidad de desplazarte.
          </p>
        </div>
      </section>

      <!-- Servicios disponibles -->
      <section class="servicios-grid-section">
        <div class="services-wrapper">
          <h2 class="section-title">Nuestros Servicios Digitales</h2>
          
          <div class="services-grid">
            <!-- Agendamiento de Citas -->
            <div class="service-card service-citas">
              <div class="card-icon-wrapper">
                <div class="card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                    <path d="M8 14h.01"></path>
                    <path d="M12 14h.01"></path>
                    <path d="M16 14h.01"></path>
                    <path d="M8 18h.01"></path>
                    <path d="M12 18h.01"></path>
                  </svg>
                </div>
              </div>
              <div class="card-content">
                <h3 class="card-title">Agendamiento de Citas</h3>
                <p class="card-description">
                  Reserva tu consulta médica en línea de forma rápida y sencilla. 
                  Elige tu especialista, fecha y horario preferido.
                </p>
                <ul class="card-features">
                  <li>Disponibilidad en tiempo real</li>
                  <li>Confirmación inmediata</li>
                  <li>Recordatorios automáticos</li>
                  <li>Reprogramación fácil</li>
                </ul>
                <button class="service-button btn-primary" @click="irAgendamiento">
                  <span>Agendar Cita Médica</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Chatbot Asesor Virtual -->
            <div class="service-card service-chatbot">
              <div class="card-badge">Próximamente</div>
              <div class="card-icon-wrapper">
                <div class="card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <circle cx="9" cy="10" r="1"></circle>
                    <circle cx="12" cy="10" r="1"></circle>
                    <circle cx="15" cy="10" r="1"></circle>
                  </svg>
                </div>
              </div>
              <div class="card-content">
                <h3 class="card-title">Asesor Virtual Inteligente</h3>
                <p class="card-description">
                  Chatea con nuestro asistente virtual disponible 24/7 para resolver 
                  tus dudas médicas y orientarte sobre nuestros servicios.
                </p>
                <ul class="card-features">
                  <li>Atención inmediata</li>
                  <li>Disponible 24/7</li>
                  <li>Orientación médica básica</li>
                  <li>Información sobre servicios</li>
                </ul>
                <button class="service-button btn-secondary" @click="abrirChatbot" disabled>
                  <span>Iniciar Chat con Asesor</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Beneficios -->
      <section class="beneficios-section">
        <div class="beneficios-container">
          <h2 class="section-title">¿Por qué usar nuestros servicios virtuales?</h2>
          <div class="beneficios-grid">
            <div class="beneficio-item">
              <div class="beneficio-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h4>Ahorro de Tiempo</h4>
              <p>Evita desplazamientos y largas esperas</p>
            </div>
            <div class="beneficio-item">
              <div class="beneficio-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h4>Seguridad</h4>
              <p>Tus datos protegidos y confidenciales</p>
            </div>
            <div class="beneficio-item">
              <div class="beneficio-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h4>Comodidad</h4>
              <p>Accede desde cualquier lugar</p>
            </div>
            <div class="beneficio-item">
              <div class="beneficio-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h4>Atención Rápida</h4>
              <p>Respuestas y consultas inmediatas</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Final -->
      <section class="cta-section">
        <div class="cta-content">
          <h2 class="cta-title">¿Listo para experimentar la salud digital?</h2>
          <p class="cta-description">
            Únete a miles de pacientes que ya confían en nuestros servicios virtuales
          </p>
          <button class="cta-button" @click="irAgendamiento">
            Comienza Ahora
          </button>
        </div>
      </section>
    </div>

    <FooterAnth />
  </div>
</template>

<script src="./ServiciosVirtuales.js"></script>
<style src="./ServiciosVirtuales.css"></style>
