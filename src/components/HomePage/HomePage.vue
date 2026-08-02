<template>
  <div>
    <!-- Encabezado -->
    <HeaderAnth
      :isAuthenticated="isAuthenticated"
      @cerrar-sesion="cerrarSesion"
    />

    <!-- Hero Section con Carrusel -->
    <HomeBannerCarousel />


    <!-- Contenido principal -->
    <div class="home-container">


      <section class="home-stats-section" aria-label="Indicadores de confianza">
        <div class="home-stat-item">
          <strong>22</strong>
          <span>Especialistas</span>
        </div>
        <div class="home-stat-item">
          <strong>8200+</strong>
          <span>Clientes Felices</span>
        </div>
        <div class="home-stat-item">
          <strong>100%</strong>
          <span>Satisfacción</span>
        </div>
      </section>

      <!-- Especialidades médicas -->
      <section class="especialidades-section">
        <div class="especialidades-shell">
          <div class="especialidades-header">
            <button
              class="especialidades-arrow"
              type="button"
              aria-label="Ver especialidades anteriores"
              @click="$refs.especialidadesCarrusel.scrollBy({ left: -$refs.especialidadesCarrusel.clientWidth, behavior: 'smooth' })"
            >
              ‹
            </button>

            <h2 class="section-title">Especialidades Médicas</h2>

            <button
              class="especialidades-arrow"
              type="button"
              aria-label="Ver más especialidades"
              @click="$refs.especialidadesCarrusel.scrollBy({ left: $refs.especialidadesCarrusel.clientWidth, behavior: 'smooth' })"
            >
              ›
            </button>
          </div>

          <div ref="especialidadesCarrusel" class="especialidades-carousel">
          <router-link
            v-for="(especialidad, index) in especialidadesMedicas"
            :key="especialidad.id"
            class="categoria-card especialidad-card-animated"
            :style="{ '--card-index': index }"
            :to="{ path: '/agendamiento-citas', query: { especialidad: especialidad.nombre } }"
          >
            <div class="categoria-icon">
              <img :src="especialidad.icon" :alt="especialidad.nombre" class="categoria-icon-img" />
            </div>
            <h3>{{ especialidad.nombre }}</h3>
            <p class="categoria-stats">{{ especialidad.medicos }} médicos</p>
          </router-link>
          </div>
        </div>
      </section>

      <!-- Noticias y Servicios Destacados -->
      <section class="home-editorial-section">
        <div v-if="noticiasPreview.length" class="editorial-news-layout">
          <article class="editorial-news-copy">
            <p class="editorial-kicker">Últimas novedades</p>
            <h2>{{ noticiasPreview[noticiaActivaIndex].titulo }}</h2>
            <p>{{ noticiasPreview[noticiaActivaIndex].resumen }}</p>
            <div class="editorial-actions">
              <button class="btn-ver-noticias primary" @click="$router.push('/noticias')">Ver todas las noticias →</button>
            </div>
          </article>

          <div class="editorial-news-visual">
            <img
              class="editorial-news-image"
              :src="noticiasPreview[noticiaActivaIndex].imagen"
              :alt="noticiasPreview[noticiaActivaIndex].titulo"
            />
            <button class="news-carousel-arrow prev" type="button" aria-label="Novedad anterior" @click="prevNoticia">‹</button>
            <button class="news-carousel-arrow next" type="button" aria-label="Siguiente novedad" @click="nextNoticia">›</button>
          </div>
        </div>

        <div class="editorial-services-header">
          <div>
            <h2>Servicios destacados</h2>
            <p>Conoce algunos de los servicios médicos que Clínica Arboleda pone a tu disposición.</p>
          </div>
        </div>

        <div class="editorial-services-grid">
          <article
            v-for="servicio in serviciosDestacados"
            :key="servicio.id"
            class="editorial-service-card"
          >
            <div class="editorial-service-image">
              <img :src="servicio.imagen" :alt="servicio.nombre" />
            </div>
            <div class="editorial-service-body">
              <h3>{{ servicio.nombre }}</h3>
              <p>{{ servicio.descripcion }}</p>
            </div>
          </article>
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

      <!-- Instalaciones -->
      <InstalacionesSection :embedded="true" />
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


