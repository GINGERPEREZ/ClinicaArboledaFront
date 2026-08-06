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
          nombre: 'AIG Metropolitana',
          logo: '/Logos/Convenios/AIG.jpg',
          descripcion: 'Líder en seguros de salud con cobertura nacional e internacional.',
          coberturas: [
            'Consultas médicas',
            'Cirugías y procedimientos',
            'Cuidados intensivos',
            'Medicamentos especializados'
          ]
        },
        {
          id: 2,
          nombre: 'Aseguradora del Sur',
          logo: '/Logos/Convenios/aseguradoradelsur.jpg',
          descripcion: 'Amplia red de atención con cobertura en todo el territorio nacional.',
          coberturas: [
            'Consultas médicas generales',
            'Atención de emergencias',
            'Hospitalización',
            'Medicamentos básicos'
          ]
        },
        {
          id: 3,
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
          id: 4,
          nombre: 'BMI Seguros',
          logo: '/Logos/Convenios/BMI.png',
          descripcion: 'Planes corporativos e individuales con amplia cobertura médica.',
          coberturas: [
            'Medicina general',
            'Atención especializada',
            'Hospitalización programada',
            'Servicios de emergencia'
          ]
        },
        {
          id: 5,
          nombre: 'Chubb Seguros',
          logo: '/Logos/Convenios/chubb.png',
          descripcion: 'Cobertura internacional con estándares de calidad reconocidos globalmente.',
          coberturas: [
            'Hospitalización y cirugía',
            'Urgencias médicas',
            'Reembolsos médicos',
            'Segunda opinión médica'
          ]
        },
        {
          id: 6,
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
          id: 7,
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
          id: 8,
          nombre: 'Equivida',
          logo: '/Logos/Convenios/equivida.png',
          descripcion: 'Planes de salud y vida con cobertura flexible para cada necesidad.',
          coberturas: [
            'Atención ambulatoria',
            'Procedimientos quirúrgicos',
            'Diagnóstico por imagen',
            'Rehabilitación'
          ]
        },
        {
          id: 9,
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
          id: 10,
          nombre: 'Liberty Seguros',
          logo: '/Logos/Convenios/liberty.png',
          descripcion: 'Respaldo de una aseguradora global con presencia local y cercana.',
          coberturas: [
            'Emergencias 24/7',
            'Hospitalización',
            'Cirugías programadas',
            'Medicina general'
          ]
        },
        {
          id: 11,
          nombre: 'Mapfre',
          logo: '/Logos/Convenios/mapfre.svg',
          descripcion: 'Grupo asegurador internacional con sólida presencia en Ecuador.',
          coberturas: [
            'Consultas médicas',
            'Tratamientos oncológicos',
            'Cuidados intensivos',
            'Cobertura internacional'
          ]
        },
        {
          id: 12,
          nombre: 'Oriente Seguros',
          logo: '/Logos/Convenios/oriente.png',
          descripcion: 'Soluciones de salud accesibles con cobertura regional y nacional.',
          coberturas: [
            'Medicina preventiva',
            'Hospitalización básica',
            'Urgencias médicas',
            'Exámenes de rutina'
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
          nombre: 'Seguros Equinoccial',
          logo: '/Logos/Convenios/Equinoccial.png',
          descripcion: 'Cobertura integral con una de las aseguradoras más reconocidas del país.',
          coberturas: [
            'Consultas médicas generales y especializadas',
            'Exámenes de laboratorio e imagen',
            'Hospitalización y cirugías',
            'Emergencias 24/7'
          ]
        },
        {
          id: 15,
          nombre: 'Seguros Sucre',
          logo: '/Logos/Convenios/SegurosSucre.avif',
          descripcion: 'Soluciones de salud personalizadas con excelente servicio al cliente.',
          coberturas: [
            'Consultas con especialistas',
            'Tratamientos médicos',
            'Estudios diagnósticos',
            'Atención de urgencias'
          ]
        },
        {
          id: 16,
          nombre: 'Zurich Seguros',
          logo: '/Logos/Convenios/zurich.png',
          descripcion: 'Cobertura de salud con respaldo internacional y atención personalizada.',
          coberturas: [
            'Hospitalización y cirugía',
            'Emergencias médicas',
            'Medicamentos especializados',
            'Atención ambulatoria'
          ]
        }
      ],
      sistemasPublicos: [
        {
          id: 1,
          nombre: 'IESS - Instituto Ecuatoriano de Seguridad Social',
          logo: '/Logos/Convenios/IESS.png',
          descripcion: 'Atención médica para afiliados y beneficiarios del seguro social.',
          servicios: [
            'Consulta externa',
            'Hospitalización',
            'Cirugía programada',
            'Emergencias',
            'Medicina preventiva'
          ]
        },
        {
          id: 2,
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
          id: 3,
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
          id: 4,
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


