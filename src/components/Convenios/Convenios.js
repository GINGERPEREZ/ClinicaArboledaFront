import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';

export default {
  name: 'ConveniosPage',
  components: {
    HeaderAnth,
    FooterAnth
  },
  data() {
    return {
      segurosPrivados: [
        {
          id: 1,
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
          id: 2,
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
          id: 3,
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
      // Scroll al footer donde está el formulario de contacto
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
      
      // Esperar a que llegue al footer y abrir el modal
      setTimeout(() => {
        const footerAnth = this.$parent.$refs?.footerAnth || 
                         document.querySelector('footer');
        if (footerAnth) {
          // Buscar y hacer click en el botón de contacto del footer
          const contactBtn = document.querySelector('[href="#"][onclick*="contacto"], a[href="#"]:contains("Contacto")');
          if (contactBtn) {
            contactBtn.click();
          }
        }
      }, 1000);
    }
  },
  mounted() {
    // Scroll al inicio cuando se carga el componente
    window.scrollTo(0, 0);
  }
};
