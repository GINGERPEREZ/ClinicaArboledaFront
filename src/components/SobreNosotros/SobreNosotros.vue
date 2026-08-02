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
        <h1 class="hero-title">Sobre Nosotros</h1>
        <p class="hero-subtitle">
          Conoce más sobre Clínica Arboleda
        </p>
      </div>
    </section>

    <!-- Sección Principal con Texto e Imágenes -->
    <div class="content-container">
      <!-- Grid Principal con Texto + Fotos -->
      <section class="about-grid-section">
        <div class="text-content">
          <h2 class="about-title">
            Somos un Grupo Hospitalario que brinda servicios médicos y diagnóstico, 
            apoyado en equipos con tecnología de vanguardia.
          </h2>
          <p class="about-description">
            Fundada el 16 de junio de 2020, Clínica Arboleda nació inicialmente como un centro 
            médico ambulatorio. Desde sus inicios, la institución ha evolucionado significativamente, 
            consolidándose como un centro de atención integral comprometido con el bienestar de la 
            población y la excelencia operativa.
          </p>
          <p class="about-description">
            Actualmente contamos con más de 20 especialidades médicas y un equipo de 71 colaboradores 
            entre personal administrativo y médico/asistencial, quienes trabajan con un enfoque humano, 
            ético y profesional.
          </p>
        </div>

        <div class="photo-grid">
          <div class="photo-item photo-large">
            <img src="/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Quirofano1.jpg" alt="Quirófano" />
          </div>
          <div class="photo-item">
            <img src="/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Equipos.jpg" alt="Equipos médicos" />
          </div>
          <div class="photo-item">
            <img src="/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/1.jpg" alt="Personal médico" />
          </div>
        </div>
      </section>

      <!-- Sección con Fotos + Texto Invertido -->
      <section class="about-grid-section reverse">
        <div class="photo-grid">
          <div class="photo-item">
            <img src="/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Hospitalizacion.jpg" alt="Hospitalización" />
          </div>
          <div class="photo-item photo-large">
            <img src="/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/SalaEspera.jpg" alt="Sala de espera" />
          </div>
          <div class="photo-item">
            <img src="/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/6.jpg" alt="Instalaciones" />
          </div>
        </div>

        <div class="text-content">
          <h2 class="about-title">
            Ofrecemos atención de calidad con calidez, profesionalismo, experiencia y seguridad.
          </h2>
          <p class="about-description">
            Nuestro compromiso es brindar servicios especializados de salud, asegurando a la comunidad 
            un tratamiento oportuno y eficaz, cumpliendo estándares de calidad con calidez en su atención.
          </p>
          <p class="about-description">
            Contamos con convenios con redes de salud públicas y privadas, incluyendo más de 15 aseguradoras 
            privadas, así como entidades públicas como MSP, ISSFA, ISSPOL y SPPAT.
          </p>
        </div>
      </section>

      <!-- Galería de Instalaciones -->
      <section class="facilities-section">
        <h2 class="section-title">Nuestras Instalaciones</h2>
        <div class="facilities-grid">
          <div class="facility-card">
            <img src="/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Habitacion1.jpg" alt="Habitación" />
            <div class="facility-overlay">
              <h3>Habitaciones</h3>
            </div>
          </div>
          <div class="facility-card">
            <img src="/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Quirofano2.jpg" alt="Quirófano" />
            <div class="facility-overlay">
              <h3>Quirófanos</h3>
            </div>
          </div>
          <div class="facility-card">
            <img src="/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Ginecologia.jpg" alt="Ginecología" />
            <div class="facility-overlay">
              <h3>Ginecología</h3>
            </div>
          </div>
          <div class="facility-card">
            <img src="/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/11.jpg" alt="Área de atención" />
            <div class="facility-overlay">
              <h3>Áreas de Atención</h3>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <FooterAnth />
  </div>
</template>

<script>
import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';

export default {
  name: 'SobreNosotros',
  components: {
    HeaderAnth,
    FooterAnth,
  },
  data() {
    return {
      searchQuery: '',
      isAuthenticated: false,
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
  },
};
</script>

<style src="./SobreNosotros.css"></style>



