import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';

export default {
  name: 'SobreNosotros',
  components: {
    HeaderAnth,
    FooterAnth
  },
  methods: {
    contactar() {
      // Navegar a la pagina de instalaciones
      this.$router.push('/instalaciones');
    }
  }
};
