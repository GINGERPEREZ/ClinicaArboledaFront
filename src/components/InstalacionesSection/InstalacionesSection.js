export default {
  name: 'InstalacionesSection',
  props: {
    embedded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      carruselTimer: null,
      paginaActiva: 0,
      instalaciones: [
        { nombre: 'Quirófanos', imagen: '/Instalaciones/Quirofano1.jpg' },
        { nombre: 'Equipo Quirúrgico', imagen: '/Instalaciones/Quirurgico.jpeg' },
        { nombre: 'Artroscopia', imagen: '/Instalaciones/Artroscopia.jpeg' },
        { nombre: 'Fluoroscopia', imagen: '/Instalaciones/Fluoroscopia.jpeg' },
        { nombre: 'Habitaciones', imagen: '/Instalaciones/Habitacion1.jpg' },
        { nombre: 'Camillas', imagen: '/Instalaciones/Recuperacion.jpeg' },
        { nombre: 'Hospitalización', imagen: '/Instalaciones/Habitacion.jpeg' },
        { nombre: 'Área de visitas', imagen: '/Instalaciones/Visitas.jpeg' },
        { nombre: 'Sala de Espera', imagen: '/Instalaciones/SalaEspera.jpg' },
        { nombre: 'Equipos Médicos', imagen: '/Instalaciones/Equipos.jpg' },
        { nombre: 'Área de Ginecología', imagen: '/Instalaciones/Ginecologia.jpg' },
        { nombre: 'Área de Operaciones', imagen: '/Instalaciones/Operaciones.jpeg' }
      ]
    };
  },
  computed: {
    gruposInstalaciones() {
      const grupos = [];
      for (let i = 0; i < this.instalaciones.length; i += 4) {
        grupos.push(this.instalaciones.slice(i, i + 4));
      }
      return grupos;
    }
  },
  mounted() {
    this.iniciarAutoplay();
  },
  beforeUnmount() {
    this.detenerAutoplay();
  },
  methods: {
    iniciarAutoplay() {
      this.detenerAutoplay();
      this.carruselTimer = window.setInterval(() => {
        this.cambiarPagina(1, false);
      }, 4500);
    },
    detenerAutoplay() {
      if (this.carruselTimer) {
        window.clearInterval(this.carruselTimer);
        this.carruselTimer = null;
      }
    },
    cambiarPagina(direccion, reiniciar = true) {
      if (!this.gruposInstalaciones.length) return;

      this.paginaActiva = (
        this.paginaActiva + direccion + this.gruposInstalaciones.length
      ) % this.gruposInstalaciones.length;

      if (reiniciar) this.iniciarAutoplay();
    },
    irAPagina(index) {
      this.paginaActiva = index;
      this.iniciarAutoplay();
    },
    handleImageError(event) {
      event.target.src = '/Banners/Banner1.jpg';
    }
  }
};


