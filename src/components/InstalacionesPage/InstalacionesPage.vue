<template>
  <div class="page-layout instalaciones-view">
    <HeaderAnth
      :searchQuery="searchQuery"
      :isAuthenticated="isAuthenticated"
      @buscar="buscarMedicos"
      @cerrar-sesion="cerrarSesion"
    />

    <section class="instalaciones-hero">
      <div class="instalaciones-hero-content">
        <p class="hero-kicker">Recorrido Institucional</p>
        <h1 class="hero-title">Nuestras Instalaciones</h1>
        <p class="hero-subtitle">
          Conoce los espacios modernos y equipados con los que Clínica Arboleda garantiza atención médica
          de alta calidad en un entorno seguro y confortable.
        </p>
      </div>
    </section>

    <div class="content-container instalaciones-content">
      <section class="areas-grid-section">
        <div class="areas-grid">
          <article v-for="area in areasHospital" :key="area.id" class="area-card">
            <div class="area-media">
              <img
                :src="area.imagen"
                :alt="area.nombre"
                class="area-img"
                loading="lazy"
              />
            </div>
            <div class="area-card-body">
              <h3>{{ area.nombre }}</h3>
              <p>{{ area.descripcion }}</p>
              <div class="area-meta">
                <span class="meta-item">Capacidad: {{ area.capacidad }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>

    <FooterAnth />
  </div>
</template>

<script src="./InstalacionesPage.js"></script>
<style src="./InstalacionesPage.css"></style>



