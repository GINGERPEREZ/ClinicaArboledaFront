import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';

const DERECHOS_DISPONIBLES = [
  '1. Derecho de Acceso (Art. 13 LOPDP) — Conocer que datos personales o medicos existen',
  '2. Derecho de Rectificacion y Actualizacion (Art. 14 LOPDP) — Modificar datos erroneos',
  '3. Derecho de Eliminacion / Supresion (Art. 15 LOPDP) — Dar de baja datos no asistenciales',
  '4. Derecho de Oposicion (Art. 16 LOPDP) — Oponerme al tratamiento para ciertos fines',
  '5. Derecho a la Portabilidad (Art. 17 LOPDP) — Solicitar copia en formato interoperable',
  '6. Derecho a la Suspension del Tratamiento (Art. 19 LOPDP) — Detener temporalmente el uso',
];

export default {
  name: 'DerechosARCO',
  components: {
    HeaderAnth,
    FooterAnth,
  },
  data() {
    return {
      pdfUrl: '/documentos/Formato_Fisico_ARCO_Logo_Grande_Clinica_Arboleda.pdf',
      correoDpo: 'protecciondedatos@clinicarboleda.com',
      derechosDisponibles: DERECHOS_DISPONIBLES,
      error: '',
      formulario: {
        calidadSolicitante: 'titular',
        nombre: '',
        identificacion: '',
        correo: '',
        telefono: '',
        derecho: '',
        descripcion: '',
        identificacionArchivo: null,
        respaldoArchivo: null,
        declaracion: false,
      },
    };
  },
  methods: {
    registrarArchivo(event, campo) {
      const [archivo] = event.target.files || [];
      if (campo === 'identificacion') {
        this.formulario.identificacionArchivo = archivo || null;
      }
      if (campo === 'respaldo') {
        this.formulario.respaldoArchivo = archivo || null;
      }
    },
    nombreArchivo(campo) {
      const archivo = campo === 'identificacion'
        ? this.formulario.identificacionArchivo
        : this.formulario.respaldoArchivo;

      return archivo ? archivo.name : 'No seleccionado';
    },
    volverAPrivacidad() {
      this.$router.push('/proteccion-datos');
    },
    enviarSolicitud() {
      const {
        nombre,
        identificacion,
        correo,
        telefono,
        derecho,
        descripcion,
        identificacionArchivo,
        respaldoArchivo,
        declaracion,
        calidadSolicitante,
      } = this.formulario;

      if (!nombre || !identificacion || !correo || !telefono || !derecho || !descripcion || !identificacionArchivo || !declaracion) {
        this.error = 'Completa los campos obligatorios, adjunta tu identificacion y acepta la declaracion para continuar.';
        return;
      }

      this.error = '';

      const cuerpo = [
        'Solicitud de ejercicio de derechos ARCO',
        '',
        `Calidad del solicitante: ${calidadSolicitante === 'titular' ? 'Titular de los datos' : 'Representante legal / apoderado'}`,
        `Nombre del titular: ${nombre}`,
        `Identificacion: ${identificacion}`,
        `Correo de notificacion: ${correo}`,
        `Telefono: ${telefono}`,
        `Derecho solicitado: ${derecho}`,
        '',
        'Descripcion de la solicitud:',
        descripcion,
        '',
        `Archivo principal adjunto por el solicitante: ${identificacionArchivo.name}`,
        `Archivo adicional declarado: ${respaldoArchivo ? respaldoArchivo.name : 'No aplica'}`,
        '',
        'Nota: Los archivos deben adjuntarse manualmente al correo antes de enviarlo.',
      ].join('\n');

      window.location.href = `mailto:${this.correoDpo}?subject=${encodeURIComponent('Solicitud de ejercicio de derechos ARCO')}&body=${encodeURIComponent(cuerpo)}`;
    },
  },
};
