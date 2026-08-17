<template>
  <div class="page-layout historia-page">
    <HeaderAnth
      :searchQuery="searchQuery"
      :isAuthenticated="isAuthenticated"
      @buscar="buscarMedicos"
      @cerrar-sesion="cerrarSesion"
    />

    <!-- El hero va fuera de .content-container para que la banda verde ocupe
         todo el ancho, como en el centro de privacidad y el formulario ARCO. -->
    <section class="history-hero">
      <div class="history-hero-inner">
        <span class="history-kicker">Compromiso y crecimiento sostenido</span>
        <h1 class="page-title">Más de 20 años cuidando <span>la salud de tu familia</span></h1>
        <p class="page-subtitle">
          Conoce nuestra trayectoria, valores y evolución como un centro de salud
          moderno al servicio de Manta y su comunidad.
        </p>
      </div>
    </section>

    <div class="content-container">
      <section class="history-stats">
        <article v-for="stat in stats" :key="stat.label" class="history-stat-card">
          <strong class="history-stat-number">{{ stat.value }}</strong>
          <span class="history-stat-label">{{ stat.label }}</span>
        </article>
      </section>

      <section class="pillars-grid">
        <article v-for="pillar in pillars" :key="pillar.title" class="pillar-card">
          <div class="pillar-icon" aria-hidden="true">{{ pillar.icon }}</div>
          <h2 class="pillar-title">{{ pillar.title }}</h2>
          <p class="pillar-text">{{ pillar.text }}</p>
        </article>
      </section>

      <section class="timeline-section">
        <h2 class="timeline-title">Hitos que Marcaron Nuestra Historia</h2>

        <div class="timeline-tabs">
          <button
            v-for="milestone in milestones"
            :key="milestone.year"
            type="button"
            :class="['timeline-tab', { active: selectedMilestoneYear === milestone.year }]"
            @click="selectedMilestoneYear = milestone.year"
          >
            {{ milestone.year }}
          </button>
        </div>

        <div v-if="selectedMilestone" class="timeline-feature">
          <img
            class="timeline-image"
            :src="selectedMilestone.image"
            :alt="selectedMilestone.title"
          />

          <div class="timeline-copy">
            <span class="timeline-year">{{ selectedMilestone.year }}</span>
            <h3 class="timeline-feature-title">{{ selectedMilestone.title }}</h3>
            <p class="timeline-feature-text">{{ selectedMilestone.text }}</p>
          </div>
        </div>
      </section>

      <section class="history-cta">
        <h2 class="history-cta-title">¿Necesitas atención médica especializada?</h2>
        <p class="history-cta-text">
          Nuestro equipo está listo para brindarte una atención cercana, moderna y confiable.
        </p>
        <router-link class="history-cta-button" to="/agendamiento-citas">
          Agendar una cita ahora
        </router-link>
      </section>
    </div>

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
      selectedMilestoneYear: '2004',
      stats: [
        { value: '+20', label: 'Años de Trayectoria' },
        { value: '+45K', label: 'Pacientes Atendidos' },
        { value: '+30', label: 'Especialidades' },
        { value: '98%', label: 'Satisfacción de Atención' },
      ],
      pillars: [
        {
          icon: '🤍',
          title: 'Atención Humana',
          text: 'Cuidamos a cada paciente con cercanía, respeto y acompañamiento profesional.',
        },
        {
          icon: '🧪',
          title: 'Tecnología Médica',
          text: 'Invertimos en infraestructura y equipamiento para diagnósticos más ágiles y precisos.',
        },
        {
          icon: '🛡️',
          title: 'Excelencia y Ética',
          text: 'Nos guía una cultura de calidad clínica, responsabilidad y mejora continua.',
        },
      ],
      milestones: [
        {
          year: '2004',
          title: 'Apertura del Primer Consultorio',
          text: 'Iniciamos nuestra historia con un primer espacio de atención, enfocado en medicina integral y servicio humano a la comunidad.',
          image: '/InstalacionesPage/ConsultaExterna.jpg',
        },
        {
          year: '2012',
          title: 'Expansión de Servicios Especializados',
          text: 'Ampliamos nuestras áreas médicas con nuevas especialidades y una atención más completa para pacientes de todas las edades.',
          image: '/Instalaciones/Ginecologia.jpg',
        },
        {
          year: '2020',
          title: 'Fortalecimiento Institucional',
          text: 'Reforzamos procesos asistenciales y administrativos para responder a nuevos retos en salud con mayor capacidad operativa.',
          image: '/Instalaciones/Equipos.jpg',
        },
        {
          year: '2025',
          title: 'Innovación y Crecimiento Clínico',
          text: 'Seguimos consolidando tecnología, cobertura y equipo humano para ofrecer una experiencia médica moderna y segura.',
          image: '/InstalacionesPage/Hospitalizacion.jpg',
        },
      ],
    };
  },
  computed: {
    selectedMilestone() {
      return this.milestones.find((milestone) => milestone.year === this.selectedMilestoneYear) || this.milestones[0];
    },
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



