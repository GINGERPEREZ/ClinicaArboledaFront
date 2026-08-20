export default {
  name: 'WhatsAppWidget',
  data() {
    return {
      // wa.me exige solo digitos: codigo de pais + numero, sin + ni espacios.
      // +593 939073995 -> 593939073995
      phoneNumber: '593939073995',
      defaultMessage: 'Hola, quisiera información sobre los servicios de Clínica Arboleda.',
      showMessage: false
    };
  },
  computed: {
    whatsappLink() {
      const encodedMessage = encodeURIComponent(this.defaultMessage);
      return `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
    }
  },
  mounted() {
    // Mostrar mensaje de bienvenida después de 3 segundos
    setTimeout(() => {
      this.showMessage = true;
      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        this.showMessage = false;
      }, 5000);
    }, 3000);
  }
};


