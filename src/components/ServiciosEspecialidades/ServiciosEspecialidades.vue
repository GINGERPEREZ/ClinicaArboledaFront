<template>
  <div class="page-layout">
    <!-- Header -->
    <HeaderAnth
      :searchQuery="searchQuery"
      :isAuthenticated="isAuthenticated"
      @buscar="buscarMedicos"
      @cerrar-sesion="cerrarSesion"
    />

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Servicios y Especialidades</h1>
        <p class="hero-subtitle">
          Atención médica integral con tecnología de punta y profesionales especializados
        </p>
      </div>
    </section>

    <!-- Contenido Principal -->
    <div class="content-container">
      <!-- Pestañas -->
      <div class="tabs-section">
        <button 
          :class="['tab-btn', { active: tabActiva === 'servicios' }]"
          @click="cambiarTab('servicios')"
        >
          <span class="tab-icon">🏥</span>
          <span class="tab-text">Servicios Médicos</span>
        </button>
        <button 
          :class="['tab-btn', { active: tabActiva === 'especialidades' }]"
          @click="cambiarTab('especialidades')"
        >
          <span class="tab-icon">👨‍⚕️</span>
          <span class="tab-text">Especialidades</span>
        </button>
      </div>

      <!-- Servicios Médicos -->
      <div v-if="tabActiva === 'servicios'" class="tab-content">
        <div class="intro-section">
          <h2 class="section-title">Servicios Médicos Disponibles</h2>
          <p class="section-description">
            En Clínica Arboleda contamos con una amplia gama de servicios médicos equipados con 
            tecnología de última generación para brindarte la mejor atención.
          </p>
        </div>

        <div class="servicios-grid">
          <div 
            v-for="servicio in servicios" 
            :key="servicio.id"
            class="servicio-card"
          >
            <div class="servicio-icon">{{ servicio.icono }}</div>
            <h3 class="servicio-nombre">{{ servicio.nombre }}</h3>
            <div v-if="servicio.destacado" class="badge-destacado">Destacado</div>
          </div>
        </div>
      </div>

      <!-- Especialidades Médicas -->
      <div v-if="tabActiva === 'especialidades'" class="tab-content">
        <div class="intro-section">
          <h2 class="section-title">Especialidades Médicas / Consultas</h2>
          <p class="section-description">
            Más de 20 especialidades médicas con profesionales altamente calificados 
            para cuidar de tu salud y la de tu familia.
          </p>
        </div>

        <div class="especialidades-grid">
          <div 
            v-for="especialidad in especialidades" 
            :key="especialidad.id"
            class="especialidad-card"
          >
            <div class="especialidad-icon">{{ especialidad.icono }}</div>
            <h3 class="especialidad-nombre">{{ especialidad.nombre }}</h3>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="cta-section">
        <h2 class="cta-title">¿Necesitas agendar una cita?</h2>
        <p class="cta-text">Contáctanos y con gusto te atenderemos</p>
        <button class="cta-button" @click="goToContact">
          Contáctanos
        </button>
      </div>
    </div>

    <!-- Footer -->
    <FooterAnth />
  </div>
</template>

<script>
import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';

export default {
  name: 'ServiciosEspecialidades',
  components: {
    HeaderAnth,
    FooterAnth,
  },
  data() {
    return {
      searchQuery: '',
      isAuthenticated: false,
      tabActiva: 'servicios',
      servicios: [
        { id: 1, nombre: 'Ambulancia', icono: '🚑', destacado: false },
        { id: 2, nombre: 'Consultas externas', icono: '🏥', destacado: false },
        { id: 3, nombre: 'Laboratorio', icono: '🔬', destacado: false },
        { id: 4, nombre: 'Ecografía', icono: '📡', destacado: false },
        { id: 5, nombre: 'Radiografía', icono: '🩻', destacado: false },
        { id: 6, nombre: 'Tomografía', icono: '💿', destacado: false },
        { id: 7, nombre: 'Emergencia 24/7', icono: '🚨', destacado: true },
        { id: 8, nombre: 'Quirófano', icono: '🏥', destacado: false },
        { id: 9, nombre: 'Unidad de cuidados intensivos', icono: '⚕️', destacado: true },
        { id: 10, nombre: 'Neonatología', icono: '👶', destacado: true },
        { id: 11, nombre: 'Hospitalización', icono: '🛏️', destacado: false },
        { id: 12, nombre: 'Fisioterapia', icono: '🤸', destacado: false },
        { id: 13, nombre: 'Cámara Hiperbárica', icono: '💨', destacado: true },
      ],
      especialidades: [
        { id: 1, nombre: 'Cardiología', icono: '❤️' },
        { id: 2, nombre: 'Cardiología pediátrica', icono: '💙' },
        { id: 3, nombre: 'Cirugía general', icono: '🔪' },
        { id: 4, nombre: 'Cirugía pediátrica', icono: '👶' },
        { id: 5, nombre: 'Cirugía vascular', icono: '🩸' },
        { id: 6, nombre: 'Coloproctología', icono: '🏥' },
        { id: 7, nombre: 'Dermatología', icono: '🧴' },
        { id: 8, nombre: 'Endocrinología pediátrica', icono: '⚕️' },
        { id: 9, nombre: 'Fisioterapia', icono: '🤸' },
        { id: 10, nombre: 'Gastroenterología', icono: '🫁' },
        { id: 11, nombre: 'Ginecología', icono: '👩‍⚕️' },
        { id: 12, nombre: 'Hematología (adultos)', icono: '🩸' },
        { id: 13, nombre: 'Medicina general', icono: '🏥' },
        { id: 14, nombre: 'Medicina interna', icono: '⚕️' },
        { id: 15, nombre: 'Nutrición', icono: '🥗' },
        { id: 16, nombre: 'Odontología', icono: '🦷' },
        { id: 17, nombre: 'Otorrinolaringología', icono: '👂' },
        { id: 18, nombre: 'Pediatría', icono: '👶' },
        { id: 19, nombre: 'Psicología', icono: '🧠' },
        { id: 20, nombre: 'Traumatología', icono: '🦴' },
        { id: 21, nombre: 'Urología', icono: '⚕️' },
      ],
    };
  },
  mounted() {
    this.isAuthenticated = !!localStorage.getItem('access_token');
  },
  methods: {
    buscarMedicos(query) {
      this.searchQuery = query;
      this.$router.push({ path: '/productos', query: { search: query } });
    },
    cerrarSesion() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_rol');
      this.isAuthenticated = false;
      this.$router.push('/login');
    },
    cambiarTab(tab) {
      this.tabActiva = tab;
    },
    goToContact() {
      this.$router.push('/instalaciones');
    },
  },
};
</script>

<style src="./ServiciosEspecialidades.css"></style>
