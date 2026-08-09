<template>
  <section class="instalaciones-section" :class="{ embedded }">
    <div class="instalaciones-container">
      <h2 class="instalaciones-title">Conoce nuestras instalaciones</h2>
      <p class="instalaciones-description">
        Contamos con instalaciones modernas y equipadas con tecnología de vanguardia
        para brindarte la mejor atención médica en un ambiente cómodo y seguro.
      </p>

      <div class="instalaciones-carousel-shell">
        <button
          class="instalaciones-carousel-arrow prev"
          type="button"
          aria-label="Ver instalaciones anteriores"
          @click="cambiarPagina(-1)"
        >
          ‹
        </button>

        <div class="instalaciones-pages">
          <div
            v-for="(grupo, grupoIndex) in gruposInstalaciones"
            :key="grupoIndex"
            :class="['instalaciones-page', { active: grupoIndex === paginaActiva }]"
          >
            <article
              v-for="(instalacion, index) in grupo"
              :key="instalacion.nombre + index"
              class="instalacion-card"
            >
              <div class="instalacion-image-wrapper">
                <img
                  :src="instalacion.imagen"
                  :alt="instalacion.nombre"
                  class="instalacion-image"
                  loading="lazy"
                  decoding="async"
                  @error="handleImageError"
                />
                <div class="instalacion-overlay">
                  <h3 class="instalacion-nombre">{{ instalacion.nombre }}</h3>
                </div>
              </div>
            </article>
          </div>
        </div>

        <button
          class="instalaciones-carousel-arrow next"
          type="button"
          aria-label="Ver más instalaciones"
          @click="cambiarPagina(1)"
        >
          ›
        </button>

        <div class="instalaciones-dots" aria-label="Grupos de instalaciones">
          <button
            v-for="(grupo, index) in gruposInstalaciones"
            :key="index"
            type="button"
            :class="['instalaciones-dot', { active: index === paginaActiva }]"
            :aria-label="'Ver grupo ' + (index + 1)"
            @click="irAPagina(index)"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="./InstalacionesSection.js"></script>
<style src="./InstalacionesSection.css"></style>
