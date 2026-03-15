<template>
  <div class="page-layout">
    <!-- Header -->
    <HeaderAnth
      :searchQuery="searchQuery"
      :isAuthenticated="isAuthenticated"
      @buscar="buscarMedicos"
      @cerrar-sesion="cerrarSesion"
    />

    <!-- Contenido Principal -->
    <div class="content-container">
      <!-- Título Principal -->
      <div class="page-header">
        <h1 class="page-title">Nuestra Historia</h1>
        <p class="page-subtitle">
          Más de 4 años comprometidos con la salud de nuestra comunidad
        </p>
      </div>
      <!-- Historia Principal -->
      <section class="section-card">
        <div class="section-content historia-content">
          <div class="founding-info">
            <div class="date-badge">
              <span class="date-day">16</span>
              <span class="date-month">Junio</span>
              <span class="date-year">2020</span>
            </div>
            <h2 class="section-title">Nuestros Inicios</h2>
          </div>

          <p>
            Fundada el <strong>16 de junio de 2020</strong>, Clínica Arboleda nació inicialmente como un centro 
            médico ambulatorio. A raíz del contexto sanitario mundial, sus fundadores reorientaron su visión hacia 
            el sector salud, respondiendo a la creciente necesidad de servicios médicos de calidad en la comunidad.
          </p>

          <p>
            Desde sus inicios, la institución ha evolucionado significativamente. Lo que comenzó como una iniciativa 
            impulsada por un grupo de accionistas en su mayoría médicos junto a <strong>Guillermo Arboleda</strong> y 
            <strong>Marina Andrade</strong>, hoy se consolida como un centro de atención integral comprometido con el 
            bienestar de la población y la excelencia operativa.
          </p>
        </div>
      </section>

      <!-- Crecimiento y Desarrollo -->
      <section class="section-card card-highlight">
        <h2 class="section-title">Crecimiento y Desarrollo</h2>
        <div class="section-content">
          <p>
            Actualmente, Clínica Arboleda cuenta con <strong>más de 20 especialidades médicas</strong>, entre las 
            más demandadas: traumatología, fisioterapia, ginecología, neonatología, psicología y psiquiatría. 
            En 2025 se incorporó el área de neonatología, fortaleciendo su compromiso con la atención desde el 
            nacimiento y ampliando su cobertura a todas las etapas del ciclo de vida.
          </p>
        </div>
      </section>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" aria-hidden="true">CL</div>
          <div class="stat-number">71</div>
          <div class="stat-label">Colaboradores</div>
          <p class="stat-description">Personal administrativo y médico/asistencial</p>
        </div>

        <div class="stat-card">
          <div class="stat-icon" aria-hidden="true">ES</div>
          <div class="stat-number">20+</div>
          <div class="stat-label">Especialidades Médicas</div>
          <p class="stat-description">Servicios especializados de salud</p>
        </div>

        <div class="stat-card">
          <div class="stat-icon" aria-hidden="true">AL</div>
          <div class="stat-number">15+</div>
          <div class="stat-label">Aseguradoras Privadas</div>
          <p class="stat-description">Convenios activos para tu comodidad</p>
        </div>

        <div class="stat-card">
          <div class="stat-icon" aria-hidden="true">CM</div>
          <div class="stat-number">100%</div>
          <div class="stat-label">Compromiso</div>
          <p class="stat-description">Con la salud de la comunidad</p>
        </div>
      </div>

      <!-- Nuestro Equipo -->
      <section class="section-card">
        <h2 class="section-title">Nuestro Equipo</h2>
        <div class="section-content">
          <p>
            Nuestro equipo está conformado por <strong>71 colaboradores</strong> entre personal administrativo y 
            médico/asistencial, quienes trabajan con un enfoque humano, ético y profesional. Atendemos a pacientes 
            desde recién nacidos hasta adultos mayores, principalmente de la ciudad de Manta.
          </p>
        </div>
      </section>

      <!-- Convenios -->
      <section class="section-card card-highlight">
        <h2 class="section-title">Convenios y Alianzas</h2>
        <div class="section-content">
          <p>
            Clínica Arboleda mantiene convenios con redes de salud públicas y privadas, incluyendo más de 
            <strong>15 aseguradoras privadas</strong>, así como entidades públicas como:
          </p>
          <div class="convenios-list">
            <div class="convenio-badge">MSP</div>
            <div class="convenio-badge">ISSFA</div>
            <div class="convenio-badge">ISSPOL</div>
            <div class="convenio-badge">SPPAT</div>
          </div>
          <p>
            Esto nos permite formar parte activa del sistema de salud y brindar atención accesible y articulada 
            a una amplia población.
          </p>
        </div>
      </section>

      <!-- Compromiso -->
      <section class="section-card commitment-section">
        <div class="section-content text-center">
          <p class="commitment-kicker">Principios Institucionales</p>
          <h2 class="section-title">Nuestro Compromiso</h2>
          <p class="commitment-text">
            En Clínica Arboleda trabajamos para ofrecer un servicio integral, humanizado y de alta calidad, 
            comprometidos con la salud y el bienestar de nuestra comunidad.
          </p>
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
  name: 'HistoriaClinica',
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

<style src="./HistoriaClinica.css"></style>
