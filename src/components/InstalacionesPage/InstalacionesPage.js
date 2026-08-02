import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';

export default {
  name: 'InstalacionesPage',
  components: {
    HeaderAnth,
    FooterAnth,
  },
  data() {
    return {
      searchQuery: '',
      isAuthenticated: false,
      areasHospital: [
        {
          id: 1,
          nombre: 'Quirófanos',
          descripcion: 'Contamos con quirófanos completamente equipados con tecnología de última generación, diseñados para garantizar las condiciones de esterilidad y precisión que exigen los procedimientos quirúrgicos más complejos.',
          capacidad: '6 salas',
          imagen: '/Instalaciones/Quirofano1.jpg',
        },
        {
          id: 2,
          nombre: 'Área de Ginecología',
          descripcion: 'Espacio especializado para la atención integral de la salud femenina, desde controles de rutina hasta procedimientos especializados, con equipamiento moderno y un equipo humano altamente capacitado.',
          capacidad: '8 consultorios',
          imagen: '/Instalaciones/Ginecologia.webp',
        },
        {
          id: 3,
          nombre: 'Habitaciones',
          descripcion: 'Habitaciones individuales diseñadas para brindar comodidad y privacidad durante la recuperación del paciente, con monitoreo permanente y atención personalizada las 24 horas del día.',
          capacidad: '32 habitaciones',
          imagen: '/Instalaciones/Habitacion1.jpg',
        },
        {
          id: 4,
          nombre: 'Sala de Espera',
          descripcion: 'Área de recepción y espera cómoda y climatizada, pensada para que los pacientes y sus acompañantes se sientan tranquilos y bien atendidos desde el primer momento de su visita.',
          capacidad: '40 personas',
          imagen: '/Instalaciones/SalaEspera.jpg',
        },
        {
          id: 5,
          nombre: 'Equipos Médicos',
          descripcion: 'Disponemos de un amplio parque tecnológico con equipos de diagnóstico de vanguardia, que permiten a nuestros especialistas obtener resultados precisos y tomar decisiones clínicas oportunas.',
          capacidad: '4 módulos',
          imagen: '/Instalaciones/Equipos.jpg',
        },
        {
          id: 6,
          nombre: 'Hospitalización',
          descripcion: 'Piso de hospitalización con camas regulables, sistema de llamado de enfermería y acceso a servicios de soporte nutricional, para asegurar una recuperación segura y confortable.',
          capacidad: '48 camas',
          imagen: '/Instalaciones/Hospitalizacion.webp',
        },
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
  },
};


