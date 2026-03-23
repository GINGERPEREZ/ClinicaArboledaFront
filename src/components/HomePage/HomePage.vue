<template>
  <div>
    <!-- Encabezado -->
    <HeaderAnth
      :isAuthenticated="isAuthenticated"
      @cerrar-sesion="cerrarSesion"
    />

    <!-- Hero Section con Carrusel -->
    <HomeBannerCarousel />

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
          >
            <div class="categoria-icon" v-html="especialidad.icon"></div>
            <h3>{{ especialidad.nombre }}</h3>
            <p class="categoria-stats">{{ especialidad.medicos }} médicos</p>
          </div>
        </div>
      </section>

      <!-- Noticias Recientes (preview) -->
      <section class="noticias-preview-section">
        <p class="noticias-preview-kicker">Noticias</p>
        <h2 class="noticias-preview-title">Nuestras Últimas Novedades</h2>
        <p class="noticias-preview-description">
          Infórmate sobre avances, servicios y novedades de Clínica Arboleda.
        </p>
        <div class="noticias-preview-grid">
          <article v-for="item in noticiasPreview" :key="item.id" class="noticia-preview-card">
            <div class="noticia-preview-image-wrapper">
              <img :src="item.imagen" :alt="item.titulo" class="noticia-preview-image" />
            </div>
            <div class="noticia-preview-body">
              <p class="noticia-preview-meta">{{ item.autor }} | {{ item.fecha }}</p>
              <h3 class="noticia-preview-card-title">{{ item.titulo }}</h3>
              <p class="noticia-preview-card-text">{{ item.resumen }}</p>
            </div>
          </article>
        </div>
        <button class="btn-ver-noticias" @click="$router.push('/noticias')">Ver todas las noticias →</button>
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
        <h2 class="section-title">Servicios Médicos Destacados</h2>
        <div class="servicios-grid">
          <div class="servicio-card" v-for="servicio in serviciosDestacados" :key="servicio.id">
            <div class="servicio-imagen">
              <img :src="servicio.imagen" :alt="servicio.nombre" />
            </div>
            <h3>{{ servicio.nombre }}</h3>
            <p>{{ servicio.descripcion }}</p>
          </div>
        </div>

        <InstalacionesSection :embedded="true" />
      </section>
    </div>

    <!-- Indicadores -->
    <div class="content-container">
      <section class="indicadores-section">
        <div class="indicadores-grid">
          <div v-for="item in indicadoresResumen" :key="item.label" class="indicador-card">
            <div class="indicador-porcentaje">{{ item.valor }}</div>
            <div class="indicador-label">{{ item.label }}</div>
          </div>
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