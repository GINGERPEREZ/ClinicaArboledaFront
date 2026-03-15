import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';

export default {
  name: 'ServiciosVirtuales',
  components: {
    HeaderAnth,
    FooterAnth
  },
  methods: {
    irAgendamiento() {
      // Redirigir a la página de agendamiento de citas
      // Asumiendo que existe una ruta /login para pacientes que luego lleva al agendamiento
      this.$router.push('/login');
    },
    abrirChatbot() {
      // Función preparada para cuando se implemente el chatbot
      // Por ahora está deshabilitado (disabled en el botón)
      console.log('Chatbot próximamente disponible');
      
      // Cuando esté listo, aquí se podría:
      // 1. Abrir un modal con el chatbot
      // 2. Redirigir a una página de chat
      // 3. Inicializar un widget de chat
      
      // Ejemplo de implementación futura:
      // this.$router.push('/chatbot');
      // o
      // window.openChatbotWidget();
    }
  },
  mounted() {
    // Scroll al inicio cuando se carga el componente
    window.scrollTo(0, 0);
  }
};
