import apiClient from '@/services/api';
import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';

export default {
  name: 'ContactoPage',
  components: {
    HeaderAnth,
    FooterAnth
  },
  data() {
    return {
      enviandoContacto: false,
      formularioContacto: {
        nombre: '',
        email: '',
        telefono: '',
        asunto: 'cita',
        mensaje: '',
        aceptaTratamientoDatos: false
      }
    };
  },
  methods: {
    async enviarContacto() {
      if (!this.formularioContacto.aceptaTratamientoDatos) {
        alert('Debes aceptar el tratamiento de datos personales para continuar.');
        return;
      }

      this.enviandoContacto = true;
      try {
        await apiClient.post('/contacto', this.formularioContacto);
        alert('Gracias por contactarnos. Un asesor se comunicara contigo pronto.');
        this.formularioContacto = {
          nombre: '',
          email: '',
          telefono: '',
          asunto: 'cita',
          mensaje: '',
          aceptaTratamientoDatos: false
        };
      } catch (error) {
        console.error('Error al enviar contacto:', error);
        alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
      } finally {
        this.enviandoContacto = false;
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};


