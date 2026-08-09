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
        <div class="home-stat-item color-medicos">
          <div class="home-stat-icon" aria-hidden="true">
            <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
              <path d="M7 23c0-4.4 3.6-8 8-8s8 3.6 8 8" />
              <path d="M10.5 17.5c1.2-1.4 3-2.3 5.5-2.3s4.3.9 5.5 2.3" />
            </svg>
          </div>
          <strong>20</strong>
          <span>Profesionales Médicos</span>
        </div>
        <div class="home-stat-item color-satisfaccion">
          <div class="home-stat-icon" aria-hidden="true">
            <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 4.5v19" />
              <path d="M4.5 12.5h19" />
              <path d="M8.5 8.5l11 11" />
              <path d="M8.5 19.5l11-11" />
            </svg>
          </div>
          <strong>4.8</strong>
          <span>Satisfacción</span>
        </div>
        <div class="home-stat-item color-pacientes">
          <div class="home-stat-icon" aria-hidden="true">
            <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 10h14" />
              <path d="M7 14h14" />
              <path d="M7 18h14" />
              <path d="M9 6a2 2 0 1 1 4 0" />
              <path d="M16 6a2 2 0 1 1 4 0" />
            </svg>
          </div>
          <strong>1.000</strong>
          <span>Pacientes atendidos al mes</span>
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
            v-for="(especialidad, index) in especialidadesOrdenadas"
            :key="especialidad.id"
            class="categoria-card especialidad-card-animated"
            :style="{ '--card-index': index }"
            :to="{ path: '/agendamiento-citas', query: { especialidad: especialidad.nombre } }"
          >
            <div class="categoria-icon">
              <span class="categoria-icon-svg" v-html="especialidad.icon"></span>
            </div>
            <h3>{{ especialidad.nombre }}</h3>
            <p class="categoria-stats">
              <span class="categoria-stats-badge">
                {{ especialidad.medicos }} {{ especialidad.medicos === 1 ? 'médico' : 'médicos' }}
              </span>
            </p>
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
              <button class="btn-ver-noticias primary" @click="$router.push('/noticias')">Ver noticia</button>
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
              <img :src="servicio.imagen" :alt="servicio.nombre" loading="lazy" decoding="async" />
            </div>
            <div class="editorial-service-body">
              <h3>{{ servicio.nombre }}</h3>
              <p>{{ servicio.descripcion }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="home-convenios-section">
        <div class="home-convenios-header">
          <div>
            <h2>Convenios públicos y privados</h2>
            <p>Conoce las entidades con las que trabajamos para ofrecerte atención médica dentro de nuestra red de convenios.</p>
          </div>
        </div>
        <div class="home-convenios-slider-wrapper">
          <div
            ref="conveniosSlider"
            class="home-convenios-slider"
            :class="{ dragging: conveniosDragging }"
            @pointerdown="iniciarArrastreConvenios"
            @pointermove="moverArrastreConvenios"
            @pointerup="finalizarArrastreConvenios"
            @pointercancel="finalizarArrastreConvenios"
            @pointerleave="finalizarArrastreConvenios"
          >
            <div
              v-for="(convenio, index) in conveniosLogosInfinite"
              :key="convenio.id + '-' + index"
              class="convenio-logo-item"
            >
              <img :src="convenio.logo" :alt="convenio.nombre" loading="lazy" decoding="async" draggable="false" />
            </div>
          </div>
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


