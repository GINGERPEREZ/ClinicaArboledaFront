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
      currentIndex: 0,
      isTransitioning: true,
      cardWidth: 0,
      slideInterval: null,
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
        },
        {
          id: 4,
          autor: 'Admin',
          fecha: '12 / 03 / 2026',
          titulo: 'Quirofanos con nueva tecnologia',
          resumen: 'Nuestros quirofanos cuentan con equipamiento de ultima generacion para procedimientos mas seguros.',
          imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Quirofano1.jpg'
        },
        {
          id: 5,
          autor: 'Admin',
          fecha: '14 / 03 / 2026',
          titulo: 'Habitaciones con mayor confort',
          resumen: 'Remodelacion de habitaciones para una estancia mas comoda y tranquila para los pacientes.',
          imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Habitacion1.jpg'
        },
        {
          id: 6,
          autor: 'Admin',
          fecha: '16 / 03 / 2026',
          titulo: 'Atencion pediatrica de calidad',
          resumen: 'Nuestro equipo pediatrico brinda atencion especializada y humana a los mas pequenos.',
          imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Pediatrico2.jpg'
        },
        {
          id: 7,
          autor: 'Admin',
          fecha: '18 / 03 / 2026',
          titulo: 'Sala de espera remodelada',
          resumen: 'Espacios de espera mas amplios y confortables para nuestros pacientes y sus familias.',
          imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/SalaEspera.jpg'
        },
        {
          id: 8,
          autor: 'Admin',
          fecha: '20 / 03 / 2026',
          titulo: 'Expansion del area de hospitalizacion',
          resumen: 'Nuevas camas y areas equipadas para brindar atencion integral a pacientes internados.',
          imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Hospitalizacion.jpg'
        },
        {
          id: 9,
          autor: 'Admin',
          fecha: '22 / 03 / 2026',
          titulo: 'Protocolo de higiene reforzado',
          resumen: 'Nuevos protocolos de aseo y desinfeccion para garantizar mayor seguridad en las instalaciones.',
          imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Aseo.jpg'
        }
      ]
    };
  },
  computed: {
    loopedNoticias() {
      return [...this.noticias, ...this.noticias];
    },
    trackStyle() {
      return {
        transform: `translateX(-${this.currentIndex * this.cardWidth}px)`,
        transition: this.isTransitioning ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
      };
    }
  },
  methods: {
    computeCardWidth() {
      const wrapper = this.$refs.sliderWrapper;
      if (!wrapper) return;
      const w = wrapper.offsetWidth;
      if (w < 600) {
        this.cardWidth = w;
      } else if (w < 960) {
        this.cardWidth = w / 2;
      } else {
        this.cardWidth = w / 3;
      }
    },
    startAutoSlide() {
      this.slideInterval = setInterval(this.nextSlide, 3000);
    },
    nextSlide() {
      this.isTransitioning = true;
      this.currentIndex++;
      if (this.currentIndex >= this.noticias.length) {
        setTimeout(() => {
          this.isTransitioning = false;
          this.currentIndex = 0;
          this.$nextTick(() => {
            this.isTransitioning = true;
          });
        }, 650);
      }
    },
    goToSlide(index) {
      clearInterval(this.slideInterval);
      this.isTransitioning = true;
      this.currentIndex = index;
      this.startAutoSlide();
    },
    cerrarSesion() {
      localStorage.removeItem('access_token');
      this.isAuthenticated = false;
      this.$router.replace('/login');
    }
  },
  mounted() {
    this.isAuthenticated = !!localStorage.getItem('access_token');
    this.$nextTick(() => {
      this.computeCardWidth();
    });
    this.startAutoSlide();
    window.addEventListener('resize', this.computeCardWidth);
    window.scrollTo(0, 0);
  },
  beforeUnmount() {
    clearInterval(this.slideInterval);
    window.removeEventListener('resize', this.computeCardWidth);
  }
};