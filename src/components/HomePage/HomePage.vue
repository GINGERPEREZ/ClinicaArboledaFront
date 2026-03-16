<template>
  <div>
    <!-- Encabezado -->
    <HeaderAnth
      :isAuthenticated="isAuthenticated"
      @cerrar-sesion="cerrarSesion"
    />

    <!-- Hero Section con Imagen de Fondo -->
    <section class="hero-main" :style="{ backgroundImage: `url(${heroBackgroundImage})` }">
      <div class="hero-overlay">
        <div class="hero-content-main">
          <h1 class="hero-main-title">Amor desde<br>el <span class="highlight">primer latido.</span></h1>
          <p class="hero-main-subtitle">Cuidamos de tu salud y la de tu familia con los mejores especialistas</p>
        </div>
      </div>
    </section>

    <!-- Nuestro Equipo Medico (full width, fuera del container) -->
    <section class="equipo-medico-cta-section">
      <div class="equipo-medico-cta-box">
        <div class="equipo-medico-cta-content">
          <p class="equipo-medico-cta-kicker">Atencion con especialistas de confianza</p>
          <h2>Conoce Nuestro <strong>Equipo Medico</strong></h2>
          <p>
            Descubre el perfil de nuestros profesionales y encuentra la especialidad ideal para ti.
          </p>
        </div>
        <button class="btn-equipo-medico" @click="$router.push('/equipo-medico')">
          Ir a Equipo Medico
        </button>
      </div>
    </section>

    <!-- Contenido principal -->
    <div class="home-container">

      <!-- Especialidades médicas -->
      <section class="categorias-section">
        <h2 class="section-title">Especialidades Médicas</h2>
        <div class="categorias-grid">
          <div
            v-for="especialidad in especialidadesMedicas"
            :key="especialidad.id"
            class="categoria-card"
            @click="filtrarPorEspecialidad(especialidad.nombre)"
          >
            <div class="categoria-icon" v-html="especialidad.icon"></div>
            <h3>{{ especialidad.nombre }}</h3>
            <p class="categoria-stats">{{ especialidad.medicos }} médicos</p>
          </div>
        </div>
      </section>

      <!-- Tarjeta de Convenios -->
      <section class="convenios-section">
        <div class="convenios-card" @click="$router.push('/convenios')">
          <div class="convenios-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h2 class="convenios-title">Convenios y Alianzas</h2>
          <p class="convenios-description">
            Mantenemos acuerdos con las principales compañías de seguros privados y sistemas públicos de salud, 
            facilitando el acceso a nuestros servicios médicos de calidad.
          </p>
          <button class="btn-convenios">Ver más →</button>
        </div>
      </section>

    <!-- Lista de Médicos/Doctores -->
<div class="product-grid">
  <div
    v-for="medico in productosMostrados"
    :key="medico.codigo"
    class="product-card medico-card"
    @click="verDetalle(medico.codigo)"
  >
    <!-- Contenedor de imagen -->
    <div class="product-image-wrapper medico-image-wrapper">
      <img
        :src="medico.imagen_url || '/placeholder_doctor.jpg'"
        :alt="medico.producto"
        @error="handleImageError"
        loading="lazy"
      />
    </div>
    <!-- Información del médico -->
    <div class="product-info medico-info">
      <h3 class="product-title medico-nombre">{{ medico.producto }}</h3>
      <p class="medico-especialidad">{{ medico.categoria || 'Medicina General' }}</p>
      <!-- Botón agendar cita -->
      <button 
        v-if="isAuthenticated"
        @click.stop="agendarCita(medico)" 
        class="btn-add-cart btn-agendar"
      >
        AGENDAR CITA
      </button>
      <button 
        v-else
        @click.stop="redirigirLogin"
        class="btn-add-cart btn-agendar"
      >
        INICIAR SESIÓN
      </button>
    </div>
  </div>
</div>
      <!-- Botón para cargar más médicos -->
      <button
        v-if="productosMostrados.length < productos.length && searchQuery.trim() === ''"
        @click="cargarMasProductos"
        class="cargar-mas"
      >
        Ver más médicos
      </button>
      <!-- Mensaje de No Resultados -->
      <div v-if="productosMostrados.length === 0 && searchQuery.trim() !== ''">
        <p>No se encontraron médicos que coincidan con "{{ searchQuery }}".</p>
      </div>

      <!-- Servicios Destacados -->
      <section class="servicios-destacados">
        <p class="section-subtitle">Conoce nuestros</p>
        <h2 class="section-title">Servicios destacados</h2>
        <div class="servicios-grid">
          <div class="servicio-card" v-for="servicio in serviciosDestacados" :key="servicio.id">
            <div class="servicio-imagen">
              <img :src="servicio.imagen" :alt="servicio.nombre" />
            </div>
            <h3>{{ servicio.nombre }}</h3>
            <p>{{ servicio.descripcion }}</p>
          </div>
        </div>
      </section>
    </div>

    <!-- Instalaciones -->
    <InstalacionesSection />

    <!-- Indicadores NPS -->
    <div class="content-container">
      <section class="indicadores-section">
        <h2 class="section-title-nps">Indicadores</h2>
        <p class="nps-subtitle">NPS {{ indicadoresNPS.fecha }}</p>
        <div class="indicadores-grid">
          <!-- Indicador Satisfacción -->
          <div class="indicador-card indicador-satisfaccion">
            <div class="indicador-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <div class="indicador-porcentaje">{{ indicadoresNPS.satisfaccion.porcentaje }}%</div>
            <div class="indicador-label">{{ indicadoresNPS.satisfaccion.label }}</div>
          </div>
          
          <!-- Indicador Recomendación -->
          <div class="indicador-card indicador-recomendacion">
            <div class="indicador-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 15h8"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <div class="indicador-porcentaje">{{ indicadoresNPS.recomendacion.porcentaje }}%</div>
            <div class="indicador-label">{{ indicadoresNPS.recomendacion.label }}</div>
          </div>
          
          <!-- Indicador Detractores -->
          <div class="indicador-card indicador-detractores">
            <div class="indicador-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <div class="indicador-porcentaje">{{ indicadoresNPS.detractores.porcentaje }}%</div>
            <div class="indicador-label">{{ indicadoresNPS.detractores.label }}</div>
          </div>
        </div>
        <div class="nps-footer">
          <button class="btn-conoce-mas">Conoce más indicadores</button>
        </div>
      </section>
    </div>

    <!-- Pie de página -->
    <FooterAnth />
    <!-- Mapa de ubicación -->
  </div>
</template>

<script src="./HomePage.js"></script>
<style src="./HomePage.css"></style>