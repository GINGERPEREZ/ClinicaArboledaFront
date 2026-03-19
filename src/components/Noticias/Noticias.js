import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';

export default {
  name: 'NoticiasPage',
  components: {
    HeaderAnth,
    FooterAnth
  },
  data() {
    return {
      isAuthenticated: false,
      noticias: [
        {
          id: 1,
          autor: 'Admin',
          fecha: '01 / 03 / 2026',
          titulo: 'Prevencion y bienestar familiar',
          resumen: 'Recomendaciones para fortalecer habitos de salud y prevencion en toda la familia.',
          imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/1.jpg'
        },
        {
          id: 2,
          autor: 'Admin',
          fecha: '05 / 03 / 2026',
          titulo: 'Nuevas areas de atencion',
          resumen: 'Conoce los espacios renovados para consultas y procedimientos con mayor comodidad.',
          imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Ginecologia.jpg'
        },
        {
          id: 3,
          autor: 'Admin',
          fecha: '10 / 03 / 2026',
          titulo: 'Avances en tecnologia medica',
          resumen: 'Equipamiento y tecnologia de apoyo para diagnosticos mas precisos y oportunos.',
          imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Equipos.jpg'
        }
      ]
    };
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem('access_token');
      this.isAuthenticated = false;
      this.$router.replace('/login');
    }
  },
  created() {
    this.isAuthenticated = !!localStorage.getItem('access_token');
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};