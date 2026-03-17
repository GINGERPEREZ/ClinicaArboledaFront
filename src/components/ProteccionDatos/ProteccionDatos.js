import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';

export default {
  name: 'ProteccionDatos',
  components: {
    HeaderAnth,
    FooterAnth
  },
  methods: {
    irAContacto() {
      this.$router.push('/contacto');
    }
  }
};
