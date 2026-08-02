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
        <article v-if="noticiasPreview.length" class="home-featured-news">
          <div class="home-section-label">
            <span class="home-section-icon">▣</span>
            <span>Últimas novedades</span>
          </div>

          <div class="featured-news-card">
            <button class="news-carousel-arrow prev" type="button" aria-label="Novedad anterior" @click="prevNoticia">‹</button>
            <article
              v-for="(item, index) in noticiasPreview"
              :key="item.id"
              :class="['featured-news-slide', { active: index === noticiaActivaIndex }]"
            >
              <div class="featured-news-image">
                <img :src="item.imagen" :alt="item.titulo" />
              </div>
              <div class="featured-news-body">
                <p class="featured-news-meta">{{ item.autor }} | {{ item.fecha }}</p>
                <h2>{{ item.titulo }}</h2>
                <p>{{ item.resumen }}</p>
                <button class="btn-ver-noticias" @click="$router.push('/noticias')">Ver novedades →</button>
              </div>
            </article>
            <button class="news-carousel-arrow next" type="button" aria-label="Siguiente novedad" @click="nextNoticia">›</button>
          </div>

          <div class="news-carousel-dots" aria-label="Novedades disponibles">
            <button
              v-for="(item, index) in noticiasPreview"
              :key="item.id"
              type="button"
              :class="['news-carousel-dot', { active: index === noticiaActivaIndex }]"
              :aria-label="'Ver novedad ' + (index + 1)"
              @click="seleccionarNoticia(index)"
            ></button>
          </div>
        </article>

        <aside class="home-featured-services">
          <div class="home-section-label">
            <span class="home-section-icon">✚</span>
            <span>Servicios destacados</span>
          </div>

          <div class="featured-services-list">
            <article
              v-for="servicio in serviciosDestacados"
              :key="servicio.id"
              class="featured-service-item"
            >
              <div class="featured-service-image">
                <img :src="servicio.imagen" :alt="servicio.nombre" />
              </div>
              <div class="featured-service-copy">
                <h3>{{ servicio.nombre }}</h3>
                <p>{{ servicio.descripcion }}</p>
              </div>
            </article>
          </div>
        </aside>
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


