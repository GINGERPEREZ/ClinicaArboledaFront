import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';

export default {
  name: 'ConveniosPage',
  components: {
    HeaderAnth,
    FooterAnth
  },
  computed: {
    segurosPrivadosCarrusel() {
      return [...this.segurosPrivados];
    }
  },
  data() {
    return {
      autoSlideInterval: null,
      segurosPrivados: [
        {
          id: 1,
          nombre: 'Asisken',
          logo: '/Logos/Convenios/asisken.jpg',
          descripcion: 'Soluciones de salud personalizadas para empresas y personas naturales.',
          coberturas: [
            'Medicina preventiva',
            'Consultas especializadas',
            'Exámenes de laboratorio',
            'Asistencia domiciliaria'
          ]
        },
        {
          id: 2,
          nombre: 'Confiamed',
          logo: '/Logos/Convenios/Confiamed.jpg',
          descripcion: 'Enfoque en medicina preventiva y atención integral familiar.',
          coberturas: [
            'Chequeos preventivos',
            'Medicina familiar',
            'Especialidades médicas',
            'Servicios de diagnóstico'
          ]
        },
        {
          id: 3,
          nombre: 'Ecuasanitas',
          logo: '/Logos/Convenios/ecuasanitas.png',
          descripcion: 'Atención médica integral con enfoque en calidad y bienestar familiar.',
          coberturas: [
            'Consultas con especialistas',
            'Maternidad y neonatología',
            'Odontología básica',
            'Chequeos preventivos'
          ]
        },
        {
          id: 4,
          nombre: 'Humana',
          logo: '/Logos/Convenios/humana.jpg',
          descripcion: 'Planes de salud con cobertura integral y atención personalizada.',
          coberturas: [
            'Consultas médicas',
            'Atención especializada',
            'Exámenes diagnósticos',
            'Medicina preventiva'
          ]
        },
        {
          id: 5,
          nombre: 'Latina Seguros',
          logo: '/Logos/Convenios/Latina.jpg',
          descripcion: 'Amplia red de cobertura con planes flexibles para toda la familia.',
          coberturas: [
            'Atención ambulatoria',
            'Procedimientos quirúrgicos',
            'Medicina preventiva',
            'Chequeos médicos anuales'
          ]
        },
        {
          id: 6,
          nombre: 'Medec',
          logo: '/Logos/Convenios/medec.jpg',
          descripcion: 'Servicios médicos con estándares de calidad y atención integral.',
          coberturas: [
            'Consultas médicas generales',
            'Especialidades médicas',
            'Procedimientos quirúrgicos',
            'Atención de urgencias'
          ]
        },
        {
          id: 7,
          nombre: 'Medi',
          logo: '/Logos/Convenios/medi.png',
          descripcion: 'Cobertura médica con amplia red de profesionales y servicios.',
          coberturas: [
            'Medicina general',
            'Atención especializada',
            'Exámenes de laboratorio',
            'Hospitalización'
          ]
        },
        {
          id: 8,
          nombre: 'Mediken',
          logo: '/Logos/Convenios/mediken.jpg',
          descripcion: 'Soluciones de salud con enfoque en bienestar y prevención.',
          coberturas: [
            'Chequeos preventivos',
            'Consultas especializadas',
            'Tratamientos médicos',
            'Asistencia domiciliaria'
          ]
        },
        {
          id: 9,
          nombre: 'Pan American Life de Ecuador ',
          logo: '/Logos/Convenios/PAL.png',
          descripcion: 'Planes de atención médica con cobertura integral.',
          coberturas: [
            'Atención ambulatoria',
            'Cirugías programadas',
            'Medicina preventiva',
            'Atención de emergencias'
          ]
        },
        {
          id: 10,
          nombre: 'Plan Vital',
          logo: '/Logos/Convenios/Plan-vital.png',
          descripcion: 'Planes de salud y vida con cobertura flexible para cada necesidad.',
          coberturas: [
            'Consultas médicas',
            'Procedimientos quirúrgicos',
            'Diagnóstico por imagen',
            'Rehabilitación'
          ]
        },
        {
          id: 11,
          nombre: 'Privilegio',
          logo: '/Logos/Convenios/privilegio.png',
          descripcion: 'Seguros de salud con planes personalizados y atención de calidad.',
          coberturas: [
            'Atención médica integral',
            'Especialidades médicas',
            'Hospitalización',
            'Atención de urgencias'
          ]
        },
        {
          id: 12,
          nombre: 'Proassis Life',
          logo: '/Logos/Convenios/proassislife.jpg',
          descripcion: 'Planes de asistencia médica con amplia cobertura nacional.',
          coberturas: [
            'Consultas médicas generales y especializadas',
            'Exámenes diagnósticos',
            'Cirugías',
            'Medicina preventiva'
          ]
        },
        {
          id: 13,
          nombre: 'Saludsa',
          logo: '/Logos/Convenios/saludsa.png',
          descripcion: 'Planes de medicina prepagada con acceso a la mejor red médica del país.',
          coberturas: [
            'Atención médica integral',
            'Especialidades pediátricas',
            'Maternidad',
            'Cirugías electivas'
          ]
        },
        {
          id: 14,
          nombre: 'Sweaden',
          logo: '/Logos/Convenios/sweaden.png',
          descripcion: 'Cobertura médica con respaldo internacional y atención personalizada.',
          coberturas: [
            'Hospitalización y cirugía',
            'Emergencias médicas',
            'Medicamentos especializados',
            'Atención ambulatoria'
          ]
        },
        {
          id: 15,
          nombre: 'Vida Buena',
          logo: '/Logos/Convenios/vida buena.jpg',
          descripcion: 'Planes de salud enfocados en el bienestar y la calidad de vida.',
          coberturas: [
            'Consultas médicas',
            'Atención preventiva',
            'Tratamientos especializados',
            'Chequeos médicos anuales'
          ]
        }
      ],
      sistemasPublicos: [
        {
          id: 1,
          nombre: 'ISSFA - Seguro Social de las Fuerzas Armadas',
          logo: '/Logos/Convenios/ISSFA.jpg',
          descripcion: 'Cobertura integral para miembros activos y en retiro de las FF.AA.',
          servicios: [
            'Atención médica general',
            'Especialidades médicas',
            'Procedimientos quirúrgicos',
            'Atención de urgencias',
            'Rehabilitación'
          ]
        },
        {
          id: 2,
          nombre: 'ISSPOL - Instituto de Seguridad Social de la Policía',
          logo: '/Logos/Convenios/ISSPOL.png',
          descripcion: 'Servicios médicos para personal policial y sus familias.',
          servicios: [
            'Consultas especializadas',
            'Exámenes diagnósticos',
            'Tratamientos médicos',
            'Cirugías',
            'Atención de emergencia'
          ]
        },
        {
          id: 3,
          nombre: 'Ministerio de Salud Pública',
          logo: '/Logos/Convenios/MSP.png',
          descripcion: 'Convenio para derivación de pacientes y atención especializada.',
          servicios: [
            'Atención de casos especiales',
            'Cirugías de alta complejidad',
            'Diagnóstico especializado',
            'Tratamientos oncológicos',
            'Cuidados intensivos'
          ]
        }
      ]
    };
  },
  methods: {
    contactar() {
      this.$router.push('/contacto');
    },
    iniciarAutoSlide() {
      const slider = this.$refs.segurosSlider;
      if (!slider || this.autoSlideInterval) {
        return;
      }

      this.autoSlideInterval = window.setInterval(() => {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (maxScroll <= 0) {
          return;
        }

        const firstCard = slider.querySelector('.convenio-card');
        const step = firstCard ? (firstCard.offsetWidth + 18) : 300;

        if (slider.scrollLeft + step >= maxScroll) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: step, behavior: 'smooth' });
        }
      }, 3000);
    },
    pausarAutoSlide() {
      if (this.autoSlideInterval) {
        window.clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
      }
    },
    reanudarAutoSlide() {
      this.iniciarAutoSlide();
    }
  },
  mounted() {
    // Scroll al inicio cuando se carga el componente
    window.scrollTo(0, 0);

    this.$nextTick(() => {
      this.iniciarAutoSlide();
    });
  },
  beforeUnmount() {
    this.pausarAutoSlide();
  }
};


