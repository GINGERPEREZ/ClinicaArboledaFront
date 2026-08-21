<template>
  <div class="page-layout equipo-medico-view">
    <!-- Header -->
    <HeaderAnth
      :searchQuery="searchQuery"
      :isAuthenticated="isAuthenticated"
      @buscar="buscarMedicos"
      @cerrar-sesion="cerrarSesion"
    />

    <!-- Contenido Principal -->
    <div class="content-container">
      <!-- Título y Descripción -->
      <div class="page-header">
        <h1 class="page-title">NUESTRO STAFF MÉDICO</h1>
        <p class="page-description">
          Conoce a nuestro equipo de especialistas comprometidos con tu salud y bienestar.
        </p>
      </div>

      <!-- Sección de Búsqueda -->
      <div v-if="!especialidadDesdeHome" class="search-section">
        <div class="search-controls">
          <div class="search-field">
            <select 
              v-model="especialidadSeleccionada"
              class="search-select"
            >
              <option value="" disabled>POR ESPECIALIDAD</option>
              <option value="todos">Todas las especialidades</option>
              <option 
                v-for="especialidad in especialidades" 
                :key="especialidad"
                :value="especialidad"
              >
                {{ especialidad }}
              </option>
            </select>
          </div>
          
          <div class="search-field">
            <input 
              v-model="nombreBusqueda"
              type="text"
              class="search-input"
              placeholder="POR NOMBRE"
            />
          </div>
          
          <button 
            class="search-button"
            @click="buscarMedico"
          >
            Buscar
          </button>
        </div>
      </div>

      <div v-if="especialidadDesdeHome" class="especialidad-activa-section">
        <span>Especialidad seleccionada</span>
        <strong>{{ especialidadSeleccionada }}</strong>
        <button type="button" @click="limpiarEspecialidadDesdeHome">Ver todas las especialidades</button>
      </div>

      <!-- Grid de Médicos -->
      <div v-if="medicosFiltrados.length > 0" class="medicos-grid" key="medicos-grid">
        <div 
          v-for="medico in medicosFiltrados" 
          :key="medico.id"
          class="medico-card"
        >
          <div class="medico-card-header">
            <div class="medico-icon">
              <img
                :src="getSpecialtyIcon(medico.especialidad)"
                :alt="medico.especialidad"
                class="specialty-icon"
                @error="handleIconError"
              />
            </div>
            <h3 class="medico-nombre">{{ medico.nombre }}</h3>
          </div>
          <div class="medico-especialidad-badge">{{ medico.especialidad }}</div>
          <div class="medico-horario-atencion">
            <span class="horario-label">Horario de atención</span>
            <span>{{ getHorarioAtencion(medico) }}</span>
          </div>
          <button class="medico-agendar-btn" type="button" @click="agendarCita(medico)">
            Agendar cita
          </button>
        </div>
      </div>

      <!-- Mensaje cuando no hay resultados -->
      <div v-if="medicosFiltrados.length === 0" class="no-results">
        <p>No se encontraron médicos con los criterios de búsqueda especificados.</p>
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
  name: 'EquipoMedico',
  components: {
    HeaderAnth,
    FooterAnth,
  },
  data() {
    return {
      searchQuery: '',
      isAuthenticated: false,
      especialidadSeleccionada: '',
      especialidadDesdeHome: false,
      nombreBusqueda: '',
      medicos: [
        { id: 1, nombre: 'VICTOR MANUEL ARIAS LOOR', especialidad: 'Medicina Crítica' },
        { id: 2, nombre: 'LUIS ALFREDO MOREIRA FRANCO', especialidad: 'Medicina Crítica' },
        { id: 3, nombre: 'SILVIA MARIA ROSERO PACHAY', especialidad: 'Medicina Crítica' },
        { id: 4, nombre: 'LAURA ALEXANDRA CEDEÑO SANCHEZ', especialidad: 'Medicina Crítica' },
        { id: 5, nombre: 'CRISTINA ANNABEL MONTESDEOCA MONTESDEOCA', especialidad: 'Medicina Crítica' },
        { id: 6, nombre: 'JOSELIO SANTOS ANDRADE', especialidad: 'Ortopedia y Traumatología' },
        { id: 7, nombre: 'JUAN FRANCISCO TAMAYO PROAÑO', especialidad: 'Ortopedia y Traumatología' },
        { id: 8, nombre: 'MARLON ANTONIO MUENTES AYALA', especialidad: 'Ortopedia y Traumatología' },
        { id: 9, nombre: 'ALEXANDER RODRIGUEZ HERNANDEZ', especialidad: 'Cirugía General' },
        { id: 10, nombre: 'MARIA FERNANDA SANTOS COBEÑA', especialidad: 'Cirugía General' },
        { id: 11, nombre: 'MARIANGEL DOLORES CEDEÑO VIVAS', especialidad: 'Pediatría y Neonatología' },
        { id: 12, nombre: 'TERESA MARIBEL RIZO DELGADO', especialidad: 'Pediatría y Neonatología' },
        { id: 13, nombre: 'HUMBERTO EDISON CORRAL VERA', especialidad: 'Pediatría y Neonatología' },
        { id: 14, nombre: 'LUIS GUILLERMO MENDOZA', especialidad: 'Cirugía Pediátrica' },
        { id: 15, nombre: 'GAUDENCIO RAMOS SALAS', especialidad: 'Anestesiología y Reanimación' },
        { id: 16, nombre: 'SUSANA ISABEL GARCIA SILVA', especialidad: 'Anestesiología y Reanimación' },
        { id: 17, nombre: 'EDISON ANDRES BORJA BASTIDAS', especialidad: 'Anestesiología y Reanimación' },
        { id: 18, nombre: 'MARIA FERNANDA ZAMBRANO LOOR', especialidad: 'Ginecología y Obstetricia' },
        { id: 19, nombre: 'RICHARD ZAMBRANO', especialidad: 'Medicina Interna' },
        { id: 20, nombre: 'SEGUNDO STALIN MORAN MERCHAN', especialidad: 'Cardiología' },
        { id: 21, nombre: 'MARIA DE LOS ANGELES MONTOYA GALEA', especialidad: 'Cirugía Oncológica' },
        { id: 22, nombre: 'DARWIN KELVIN LEON FRANCO', especialidad: 'Angiología y Cirugía Vascular' },
        { id: 23, nombre: 'EDWIN JOSE LOOR SANCHEZ', especialidad: 'Ginecología y Obstetricia' },
        { id: 24, nombre: 'JIMMY ALFREDO CANTOS ESTRADA', especialidad: 'Ginecología y Obstetricia' },
        { id: 25, nombre: 'JUAN CARLOS PARRAGA SAN CLEMENTE', especialidad: 'Endocrinología Pediátrica' },
        { id: 26, nombre: 'VICTOR OLMEDO BARCIA TOMALA', especialidad: 'Cardiología' },
        { id: 27, nombre: 'JULIO EDUARDO FLORES PALOMINO', especialidad: 'Otorrinolaringología' },
        { id: 28, nombre: 'JOSE MIGUEL PARRAGA', especialidad: 'Urología' },
        { id: 29, nombre: 'EVELYN CAROLINA MONTALVAN ALAVA', especialidad: 'Urología' },
        { id: 30, nombre: 'JENNIFER ADRIANA GUERRERO CENTENO', especialidad: 'Dermatología' },
        { id: 31, nombre: 'SHIRLEY JANINE ESPINAL RIVERA', especialidad: 'Dermatología Pediátrica' },
        { id: 32, nombre: 'ALEJANDRO PATRICIO ROCANO GAMBOA', especialidad: 'Coloproctología' },
        { id: 33, nombre: 'CHRYSTIAMS NICOLAS DELGADO UNDA', especialidad: 'Fisioterapia' },
        { id: 34, nombre: 'JUAN VACAS MOREIRA', especialidad: 'Fisiatría' },
        { id: 35, nombre: 'GEANELLA KATHERINE BARCIA', especialidad: 'Odontología y Endodoncista' },
        { id: 36, nombre: 'HILDA YAJAIRA GONZALEZ ARTEAGA', especialidad: 'Cardiología Pediátrica' },
        { id: 37, nombre: 'RUTH MARIA ECHEVERRIA MACIAS', especialidad: 'Gastroenterología' },
        { id: 38, nombre: 'DANIEL GREGORIO SOLORZANO ANDRADE', especialidad: 'Nutrición' },
        { id: 39, nombre: 'SUSANA PATRICIA MACIAS INTRIAGO', especialidad: 'Hematología' },
      ],
    };
  },
  computed: {
    especialidades() {
      const especialidadesUnicas = [...new Set(this.medicos.map(m => m.especialidad))];
      return especialidadesUnicas.sort();
    },
    medicosFiltrados() {
      let resultados = this.medicos;
      
      if (this.especialidadSeleccionada && this.especialidadSeleccionada !== 'todos') {
        resultados = resultados.filter(m => m.especialidad === this.especialidadSeleccionada);
      }
      
      if (this.nombreBusqueda.trim()) {
        const busqueda = this.nombreBusqueda.toLowerCase();
        resultados = resultados.filter(m => 
          m.nombre.toLowerCase().includes(busqueda)
        );
      }
      
      return resultados;
    },
  },
  mounted() {
    this.isAuthenticated = !!localStorage.getItem('access_token');
    this.aplicarEspecialidadDesdeRuta();
  },
  watch: {
    '$route.query.especialidad'() {
      this.aplicarEspecialidadDesdeRuta();
    },
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
    buscarMedico() {
      const grid = document.querySelector('.medicos-grid');
      if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    getSpecialtyIcon(especialidad) {
      const iconMap = {
        'Medicina Crítica':              'https://cdn-icons-png.flaticon.com/128/4331/4331766.png',
        'Ortopedia y Traumatología':     'https://cdn-icons-png.flaticon.com/128/3103/3103961.png',
        'Neumología':                    'https://cdn-icons-png.flaticon.com/128/4811/4811081.png',
        'Neumonología':                  'https://cdn-icons-png.flaticon.com/128/4811/4811081.png',
        'Gastroenterología':             'https://cdn-icons-png.flaticon.com/128/387/387626.png',
        'Cirugía General':               'https://cdn-icons-png.flaticon.com/128/139/139269.png',
        'Pediatría':                     'https://cdn-icons-png.flaticon.com/128/6558/6558482.png',
        'Pediatría y Neonatología':      'https://cdn-icons-png.flaticon.com/128/6558/6558482.png',
        'Cirugía Pediátrica':            'https://cdn-icons-png.flaticon.com/128/2885/2885141.png',
        'Anestesiología y Reanimación':  'https://cdn-icons-png.flaticon.com/128/1021/1021562.png',
        'Ginecología y Obstetricia':     'https://cdn-icons-png.flaticon.com/128/941/941497.png',
        'Medicina Interna':              'https://cdn-icons-png.flaticon.com/128/12436/12436264.png',
        'Psiquiatría':                   'https://cdn-icons-png.flaticon.com/128/2013/2013188.png',
        'Imagenología':                  'https://cdn-icons-png.flaticon.com/128/2044/2044715.png',
        'Cardiología':                   'https://cdn-icons-png.flaticon.com/128/8358/8358611.png',
        'Angiología y Cirugía Vascular': 'https://cdn-icons-png.flaticon.com/128/1364/1364702.png',
        'Cirugía Oncológica':            'https://cdn-icons-png.flaticon.com/128/8684/8684535.png',
        'Neurología':                    'https://cdn-icons-png.flaticon.com/128/1753/1753205.png',
        'Nefrología':                    'https://cdn-icons-png.flaticon.com/128/2204/2204369.png',
        'Endocrinología Pediátrica':     'https://cdn-icons-png.flaticon.com/128/6558/6558482.png',
        'Otorrinolaringología':          'https://cdn-icons-png.flaticon.com/128/4811/4811081.png',
        'Urología':                      'https://cdn-icons-png.flaticon.com/128/2204/2204369.png',
        'Dermatología':                  'https://cdn-icons-png.flaticon.com/128/4807/4807695.png',
        'Dermatología Pediátrica':       'https://cdn-icons-png.flaticon.com/128/4807/4807695.png',
        'Coloproctología':               'https://cdn-icons-png.flaticon.com/128/387/387626.png',
        'Fisioterapia':                  'https://cdn-icons-png.flaticon.com/128/3103/3103961.png',
        'Fisiatría':                     'https://cdn-icons-png.flaticon.com/128/3103/3103961.png',
        'Odontología y Endodoncista':    'https://cdn-icons-png.flaticon.com/128/4807/4807695.png',
        'Cardiología Pediátrica':        'https://cdn-icons-png.flaticon.com/128/8358/8358611.png',
        'Nutrición':                     'https://cdn-icons-png.flaticon.com/128/387/387626.png',
        'Hematología':                   'https://cdn-icons-png.flaticon.com/128/4331/4331766.png',
      };
      return iconMap[especialidad] || 'https://cdn-icons-png.flaticon.com/128/4807/4807695.png';
    },

    aplicarEspecialidadDesdeRuta() {
      const especialidad = this.$route.query.especialidad;
      if (especialidad && this.especialidades.includes(especialidad)) {
        this.especialidadSeleccionada = especialidad;
        this.especialidadDesdeHome = true;
        this.nombreBusqueda = '';
      } else {
        this.especialidadDesdeHome = false;
      }
    },
    limpiarEspecialidadDesdeHome() {
      this.especialidadDesdeHome = false;
      this.especialidadSeleccionada = 'todos';
      this.$router.replace({ path: '/equipo-medico' });
    },
    getHorarioAtencion() {
      return 'Lunes a viernes, 08:00 - 17:00';
    },
    agendarCita(medico) {
      this.$router.push({
        path: '/agendamiento-citas',
        query: {
          especialidad: medico.especialidad,
          medico: medico.nombre,
        },
      });
    },
    handleIconError(e) {
      e.target.src = 'https://cdn-icons-png.flaticon.com/128/4807/4807695.png';
    },
  },
};
</script>

<style src="./EquipoMedico.css"></style>



