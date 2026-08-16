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
      correoDpo: 'protecciondedatos@clinicarboleda.com',
      accesosLegales: [
        {
          id: 'proteccion',
          titulo: 'Proteccion de Datos',
          resumen: 'Tratamiento, finalidad y base legal.',
        },
        {
          id: 'cookies',
          titulo: 'Politica de Cookies',
          resumen: 'Uso de cookies y gestion de preferencias.',
        },
        {
          id: 'terminos',
          titulo: 'Terminos de Uso',
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
      window.location.href = `mailto:${this.correoDpo}?subject=Consulta%20sobre%20proteccion%20de%20datos`;
    },
  },
};
