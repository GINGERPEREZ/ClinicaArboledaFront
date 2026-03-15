export default {
  name: 'InstalacionesSection',
  data() {
    return {
      instalaciones: [
        {
          nombre: 'Quirófanos',
          imagen: '/Instalaciones/Quirofano1.jpg'
        },
        {
          nombre: 'Área de Ginecología',
          imagen: '/Instalaciones/Ginecologia.webp'
        },
        {
          nombre: 'Habitaciones',
          imagen: '/Instalaciones/Habitacion1.jpg'
        },
        {
          nombre: 'Sala de Espera',
          imagen: '/Instalaciones/SalaEspera.jpg'
        },
        {
          nombre: 'Equipos Médicos',
          imagen: '/Instalaciones/Equipos.jpg'
        },
        {
          nombre: 'Hospitalización',
          imagen: '/Instalaciones/Hospitalizacion.webp'
        }
      ]
    };
  },
  methods: {
    handleImageError(event) {
      // Imagen de respaldo si no se encuentra la imagen
      event.target.src = '/Banners/Banner1.jpg';
    }
  }
};
