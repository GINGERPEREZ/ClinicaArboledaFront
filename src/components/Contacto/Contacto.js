import apiClient from '@/services/api';
import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';

// Letras con tildes, enies, espacios, guiones y apostrofes.
const RE_NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/;
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
// Ecuador: celular 09XXXXXXXX (10 digitos) o convencional 0[2-7]XXXXXXX (9).
const RE_TELEFONO = /^(09\d{8}|0[2-7]\d{7})$/;

const ASUNTOS_VALIDOS = ['cita', 'informacion', 'otro'];

const LIMITES = {
  nombreMin: 3,
  nombreMax: 80,
  emailMax: 120,
  mensajeMin: 10,
  mensajeMax: 500
};

// Quita separadores y admite el prefijo internacional +593.
const normalizarTelefono = (valor) =>
  String(valor || '')
    .replace(/[\s()-]/g, '')
    .replace(/^\+?593/, '0');

const formularioVacio = () => ({
  nombre: '',
  email: '',
  telefono: '',
  asunto: 'cita',
  mensaje: '',
  aceptaTratamientoDatos: false
});

export default {
  name: 'ContactoPage',
  components: {
    HeaderAnth,
    FooterAnth
  },
  data() {
    return {
      enviandoContacto: false,
      errores: {},
      formularioContacto: formularioVacio()
    };
  },
  computed: {
    caracteresMensaje() {
      return this.formularioContacto.mensaje.trim().length;
    }
  },
  methods: {
    // Devuelve un objeto con un mensaje por cada campo invalido.
    // Vacio significa que el formulario se puede enviar.
    validarFormulario() {
      const f = this.formularioContacto;
      const errores = {};

      const nombre = f.nombre.trim();
      if (!nombre) {
        errores.nombre = 'Ingresa tu nombre completo.';
      } else if (nombre.length < LIMITES.nombreMin) {
        errores.nombre = `El nombre debe tener al menos ${LIMITES.nombreMin} caracteres.`;
      } else if (nombre.length > LIMITES.nombreMax) {
        errores.nombre = `El nombre no puede superar los ${LIMITES.nombreMax} caracteres.`;
      } else if (!RE_NOMBRE.test(nombre)) {
        errores.nombre = 'El nombre solo admite letras, espacios, guiones y apostrofes.';
      }

      // El correo es opcional, pero si se escribe debe ser valido.
      const email = f.email.trim();
      if (email && !RE_EMAIL.test(email)) {
        errores.email = 'Ingresa un correo valido, por ejemplo nombre@dominio.com.';
      } else if (email.length > LIMITES.emailMax) {
        errores.email = `El correo no puede superar los ${LIMITES.emailMax} caracteres.`;
      }

      const telefono = normalizarTelefono(f.telefono);
      if (!telefono) {
        errores.telefono = 'Ingresa un numero de telefono.';
      } else if (!/^\d+$/.test(telefono)) {
        errores.telefono = 'El telefono solo admite numeros.';
      } else if (!RE_TELEFONO.test(telefono)) {
        errores.telefono =
          'Ingresa un telefono valido: celular 09XXXXXXXX o convencional 0XXXXXXXX.';
      }

      if (!ASUNTOS_VALIDOS.includes(f.asunto)) {
        errores.asunto = 'Selecciona un asunto de la lista.';
      }

      const mensaje = f.mensaje.trim();
      if (!mensaje) {
        errores.mensaje = 'Escribe tu mensaje.';
      } else if (mensaje.length < LIMITES.mensajeMin) {
        errores.mensaje = `El mensaje debe tener al menos ${LIMITES.mensajeMin} caracteres.`;
      } else if (mensaje.length > LIMITES.mensajeMax) {
        errores.mensaje = `El mensaje no puede superar los ${LIMITES.mensajeMax} caracteres.`;
      }

      if (!f.aceptaTratamientoDatos) {
        errores.aceptaTratamientoDatos =
          'Debes autorizar el tratamiento de tus datos para continuar.';
      }

      return errores;
    },

    // Valida un solo campo, al salir de el, sin ensuciar el resto.
    validarCampo(campo) {
      const errores = this.validarFormulario();
      const siguiente = { ...this.errores };
      if (errores[campo]) {
        siguiente[campo] = errores[campo];
      } else {
        delete siguiente[campo];
      }
      this.errores = siguiente;
    },

    // Al escribir se limpia el error del campo, para no insistir mientras corrige.
    limpiarError(campo) {
      if (!this.errores[campo]) return;
      const siguiente = { ...this.errores };
      delete siguiente[campo];
      this.errores = siguiente;
    },

    enfocarPrimerError() {
      const orden = ['nombre', 'email', 'telefono', 'asunto', 'mensaje', 'aceptaTratamientoDatos'];
      const campo = orden.find((c) => this.errores[c]);
      if (!campo) return;
      const id = campo === 'aceptaTratamientoDatos' ? 'consentimiento-datos' : campo;
      this.$nextTick(() => {
        const el = document.getElementById(id);
        if (el) el.focus();
      });
    },

    async enviarContacto() {
      this.errores = this.validarFormulario();
      if (Object.keys(this.errores).length > 0) {
        this.enfocarPrimerError();
        return;
      }

      this.enviandoContacto = true;
      try {
        // Se envian los valores ya normalizados, no los del input en crudo.
        await apiClient.post('/contacto', {
          nombre: this.formularioContacto.nombre.trim(),
          email: this.formularioContacto.email.trim(),
          telefono: normalizarTelefono(this.formularioContacto.telefono),
          asunto: this.formularioContacto.asunto,
          mensaje: this.formularioContacto.mensaje.trim(),
          aceptaTratamientoDatos: this.formularioContacto.aceptaTratamientoDatos
        });
        alert('Gracias por contactarnos. Un asesor se comunicara contigo pronto.');
        this.formularioContacto = formularioVacio();
        this.errores = {};
      } catch (error) {
        console.error('Error al enviar contacto:', error);
        alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
      } finally {
        this.enviandoContacto = false;
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
