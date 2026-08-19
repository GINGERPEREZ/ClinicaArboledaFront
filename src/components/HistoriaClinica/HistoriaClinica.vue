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
        <h1 class="page-title">Más de 5 años cuidando <span>la salud de tu familia</span></h1>
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
        <p class="timeline-subtitle">
          Cinco etapas que resumen cómo hemos crecido junto a nuestros pacientes.
        </p>

        <!-- Pestañas accesibles: rol tablist, un solo foco y flechas del teclado -->
        <div
          class="timeline-tabs"
          role="tablist"
          aria-label="Etapas de nuestra historia"
          @keydown="moverEtapa"
        >
          <button
            v-for="etapa in etapas"
            :key="etapa.id"
            type="button"
            role="tab"
            :id="'tab-' + etapa.id"
            :aria-selected="etapaActiva === etapa.id ? 'true' : 'false'"
            :aria-controls="'panel-' + etapa.id"
            :tabindex="etapaActiva === etapa.id ? 0 : -1"
            :class="['timeline-tab', { active: etapaActiva === etapa.id }]"
            @click="etapaActiva = etapa.id"
          >
            <span class="timeline-tab-num" aria-hidden="true">{{ etapa.numero }}</span>
            <span class="timeline-tab-text">{{ etapa.etiqueta }}</span>
          </button>
        </div>

        <transition name="etapa" mode="out-in">
          <div
            v-if="etapaSeleccionada"
            :key="etapaSeleccionada.id"
            class="timeline-feature"
            role="tabpanel"
            :id="'panel-' + etapaSeleccionada.id"
            :aria-labelledby="'tab-' + etapaSeleccionada.id"
          >
            <img
              class="timeline-image"
              :src="etapaSeleccionada.imagen"
              :alt="etapaSeleccionada.titulo"
              loading="lazy"
            />

            <div class="timeline-copy">
              <span class="timeline-year">
                Etapa {{ etapaSeleccionada.numero }} &middot; {{ etapaSeleccionada.etiqueta }}
              </span>
              <h3 class="timeline-feature-title">{{ etapaSeleccionada.titulo }}</h3>
              <p class="timeline-feature-text">{{ etapaSeleccionada.texto }}</p>
            </div>
          </div>
        </transition>
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
      stats: [
        { value: '+5', label: 'Años de Trayectoria' },
        { value: '+45K', label: 'Pacientes Atendidos' },
        { value: '+15', label: 'Especialidades' },
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
      // Las etapas sustituyen a los antiguos hitos por año: la clínica tiene
      // 5 años de trayectoria, así que se narra por fases y no por fechas.
      etapaActiva: 'inicios',
      etapas: [
        {
          id: 'inicios',
          numero: 1,
          etiqueta: 'Los Inicios',
          titulo: 'Apertura y Atención Ambulatoria',
          texto: 'Iniciamos nuestras actividades brindando consultas médicas y atención ambulatoria personalizada, sentando las bases de nuestro compromiso con la comunidad.',
          imagen: '/InstalacionesPage/Historia.jpg',
        },
        {
          id: 'alianzas',
          numero: 2,
          etiqueta: 'Alianzas',
          titulo: 'Integración de Convenios Médicos',
          texto: 'Expandimos la accesibilidad a nuestros servicios formalizando acuerdos con las principales aseguradoras y empresas de medicina prepagada del país.',
          imagen: '/Instalaciones/SalaEspera.jpg',
        },
        {
          id: 'continuidad',
          numero: 3,
          etiqueta: 'Continuidad',
          titulo: 'Servicio de Emergencias 24/7',
          texto: 'Dimos el paso hacia la atención continua ininterrumpida los 365 días del año, con personal médico y de enfermería de guardia permanente.',
          imagen: '/InstalacionesPage/Emergencia.jpg',
        },
        {
          id: 'crecimiento',
          numero: 4,
          etiqueta: 'Crecimiento',
          titulo: 'Expansión Hospitalaria y Quirófanos',
          texto: 'Inauguramos modernas salas de hospitalización y quirófanos totalmente equipados para cirugías programadas y de emergencia.',
          imagen: '/Instalaciones/opt/Quirofano1.jpg',
        },
        {
          id: 'vanguardia',
          numero: 5,
          etiqueta: 'Vanguardia',
          titulo: 'Unidades Críticas y Servicios Especiales',
          texto: 'Incorporamos soporte vital avanzado (UCI y Neonatología), ambulancia propia medicalizada y terapia en cámara hiperbárica.',
          imagen: '/InstalacionesPage/Infraestructura.jpg',
        },
      ],
    };
  },
  computed: {
    etapaSeleccionada() {
      return this.etapas.find((etapa) => etapa.id === this.etapaActiva) || this.etapas[0];
    },
  },
  mounted() {
    this.isAuthenticated = !!localStorage.getItem('access_token');
  },
  methods: {
    // Flechas para moverse entre pestanas, como pide el patron tablist.
    moverEtapa(evento) {
      const pasos = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      const paso = pasos[evento.key];
      if (!paso) return;
      evento.preventDefault();
      const actual = this.etapas.findIndex((etapa) => etapa.id === this.etapaActiva);
      const destino = (actual + paso + this.etapas.length) % this.etapas.length;
      this.etapaActiva = this.etapas[destino].id;
      const lista = evento.currentTarget;
      this.$nextTick(() => {
        const botones = lista.querySelectorAll('.timeline-tab');
        if (botones[destino]) botones[destino].focus();
      });
    },
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



