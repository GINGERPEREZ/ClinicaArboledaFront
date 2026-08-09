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
        { nombre: 'Artroscopia', imagen: '/Instalaciones/opt/Artroscopia1.jpg' },
        { nombre: 'Área de Ginecología', imagen: '/Instalaciones/opt/Ginecologia2.jpg' },
        { nombre: 'Área de Operaciones', imagen: '/Instalaciones/opt/Operaciones1.jpg' },
        { nombre: 'Área de visitas', imagen: '/Instalaciones/opt/Visitas1.jpg' },
        { nombre: 'Camillas', imagen: '/Instalaciones/opt/Recuperacion1.jpg' },
        { nombre: 'Equipo Quirúrgico', imagen: '/Instalaciones/opt/Quirurgico1.jpg' },
        { nombre: 'Equipos Médicos', imagen: '/Instalaciones/opt/Equipos1.jpg' },
        { nombre: 'Fluoroscopia', imagen: '/Instalaciones/opt/Fluoroscopia1.jpg' },
        { nombre: 'Habitaciones', imagen: '/Instalaciones/opt/Habitacion1.jpg' },
        { nombre: 'Hospitalización', imagen: '/Instalaciones/opt/Habitacion2.jpg' },
        { nombre: 'Quirófanos', imagen: '/Instalaciones/opt/Quirofano1.jpg' },
        { nombre: 'Sala de Espera', imagen: '/Instalaciones/opt/SalaEspera.jpg' }
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
      }, 5500);
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


