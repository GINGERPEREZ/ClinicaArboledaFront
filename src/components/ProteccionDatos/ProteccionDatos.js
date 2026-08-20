import { nextTick } from 'vue';
import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';

export default {
  name: 'ProteccionDatos',
  components: {
    HeaderAnth,
    FooterAnth,
  },
  props: {
    currentSection: {
      type: String,
      default: 'proteccion',
    },
  },
  data() {
    return {
      correoDpo: 'protecciondedatos@clinicaarboleda.ec',
      accesosLegales: [
        {
          id: 'proteccion',
          titulo: 'Protección de Datos',
          resumen: 'Tratamiento, finalidad y base legal.',
        },
        {
          id: 'cookies',
          titulo: 'Política de Cookies',
          resumen: 'Uso de cookies y gestión de preferencias.',
        },
        {
          id: 'terminos',
          titulo: 'Términos de Uso',
          resumen: 'Condiciones generales de la plataforma.',
        },
      ],
    };
  },
  mounted() {
    this.scrollToCurrentSection();
  },
  watch: {
    currentSection() {
      this.scrollToCurrentSection();
    },
  },
  methods: {
    scrollToCurrentSection() {
      nextTick(() => {
        const section = document.getElementById(this.currentSection);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    },
    irASeccion(sectionId) {
      const targetRoute = {
        proteccion: '/proteccion-datos',
        cookies: '/politica-cookies',
        terminos: '/terminos-condiciones',
      }[sectionId] || '/proteccion-datos';

      this.$router.push(targetRoute);
    },
    irADerechosArco() {
      this.$router.push('/derechos-arco');
    },
    abrirCorreoDpo() {
      window.location.href = `mailto:${this.correoDpo}?subject=${encodeURIComponent('Consulta sobre protección de datos')}`;
    },
  },
};
