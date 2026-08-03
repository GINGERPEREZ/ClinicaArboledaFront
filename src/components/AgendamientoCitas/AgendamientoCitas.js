import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';
import { validarFormulario, sanitizarFormulario } from '@/utils/formValidation';
import { aFormatoInternacionalEc, esCelularEcuador } from '@/utils/validators';
import {
  ESQUEMA_PACIENTE,
  SANITIZADORES_PACIENTE,
  NORMALIZADORES_PACIENTE,
  LIMITES,
} from './pacienteSchema';

/**
 * Índices del asistente. Deben coincidir con el orden del array `steps`.
 * Se nombran para que ningún salto quede como número suelto en el código.
 */
const PASO_ESPECIALIDAD = 0;
const PASO_MEDICO = 1;
const PASO_FECHA_HORA = 2;
const PASO_DATOS = 3;
const PASO_CONFIRMACION = 4;

const crearDatosPaciente = () => ({
  nombre: '',
  cedula: '',
  telefono: '',
  email: '',
  motivo: '',
});

export default {
  name: 'AgendamientoCitas',
  components: {
    HeaderAnth,
    FooterAnth,
  },
  data() {
    return {
      currentStep: PASO_ESPECIALIDAD,
      citaConfirmada: false,
      steps: ['Especialidad', 'Médico', 'Fecha y Hora', 'Datos', 'Confirmar'],
      selectedEspecialidad: null,
      selectedMedico: null,
      selectedDate: '',
      selectedTime: '',
      patientData: crearDatosPaciente(),
      // Un campo solo muestra su error después de que el usuario lo tocó o
      // intentó avanzar: evita marcar en rojo un formulario recién abierto.
      camposTocados: {},
      limites: LIMITES,
      especialidades: [
        { id: 1, nombre: 'Medicina Crítica', icon: '💓' },
        { id: 2, nombre: 'Ortopedia y Traumatología', icon: '🧍' },
        { id: 3, nombre: 'Neumonología', icon: '🫁' },
        { id: 4, nombre: 'Gastroenterología', icon: '🌐' },
        { id: 5, nombre: 'Cirugía General', icon: '🖊️' },
        { id: 6, nombre: 'Pediatría', icon: '🧸' },
        { id: 7, nombre: 'Cirugía Pediátrica', icon: '👶' },
        { id: 8, nombre: 'Anestesiología y Reanimación', icon: '💉' },
        { id: 9, nombre: 'Ginecología y Obstetricia', icon: '🤰' },
        { id: 10, nombre: 'Medicina Interna', icon: '🩺' },
        { id: 11, nombre: 'Psiquiatría', icon: '🧠' },
        { id: 12, nombre: 'Imagenología', icon: '💪' },
        { id: 13, nombre: 'Cardiología', icon: '💙' },
        { id: 14, nombre: 'Angiología y Cirugía Vascular', icon: '🦵' },
        { id: 15, nombre: 'Cirugía Oncológica', icon: '⚙️' },
        { id: 16, nombre: 'Neurología', icon: '👤' },
        { id: 17, nombre: 'Nefrología', icon: '🔬' },
      ],
      medicos: [
        { id: 1, nombre: 'VICTOR MANUEL ARIAS LOOR', iniciales: 'VA', especialidadId: 1, especialidad: 'Medicina Crítica', horario: 'Lunes a viernes, 08:00 - 16:00' },
        { id: 2, nombre: 'LUIS ALFREDO MOREIRA FRANCO', iniciales: 'LM', especialidadId: 1, especialidad: 'Medicina Crítica', horario: 'Lunes a viernes, 08:00 - 16:00' },
        { id: 3, nombre: 'SILVIA MARIA ROSERO PACHAY', iniciales: 'SR', especialidadId: 1, especialidad: 'Medicina Crítica', horario: 'Lunes a viernes, 08:00 - 16:00' },
        { id: 4, nombre: 'LAURA ALEXANDRA CEDEÑO SANCHEZ', iniciales: 'LC', especialidadId: 1, especialidad: 'Medicina Crítica', horario: 'Lunes a viernes, 08:00 - 16:00' },
        { id: 5, nombre: 'CRISTINA ANNABEL MONTESDEOCA MONTESDEOCA', iniciales: 'CM', especialidadId: 1, especialidad: 'Medicina Crítica', horario: 'Lunes a viernes, 08:00 - 16:00' },
        { id: 6, nombre: 'JOSELIO SANTOS ANDRADE', iniciales: 'JA', especialidadId: 2, especialidad: 'Ortopedia y Traumatología', horario: 'Lunes, miércoles y viernes, 09:00 - 13:00' },
        { id: 7, nombre: 'JUAN FRANCISCO TAMAYO PROAÑO', iniciales: 'JT', especialidadId: 2, especialidad: 'Ortopedia y Traumatología', horario: 'Lunes, miércoles y viernes, 09:00 - 13:00' },
        { id: 8, nombre: 'MARLON ANTONIO MUENTES AYALA', iniciales: 'MM', especialidadId: 2, especialidad: 'Ortopedia y Traumatología', horario: 'Lunes, miércoles y viernes, 09:00 - 13:00' },
        { id: 9, nombre: 'KARLA MARIA JOZA AGUAYO', iniciales: 'KJ', especialidadId: 3, especialidad: 'Neumonología', horario: 'Martes y jueves, 10:00 - 14:00' },
        { id: 10, nombre: 'CINDY MICHELLE CEDEÑO CALERO', iniciales: 'CC', especialidadId: 4, especialidad: 'Gastroenterología', horario: 'Lunes a jueves, 08:30 - 12:30' },
        { id: 11, nombre: 'ALEXANDER RODRIGUEZ HERNANDEZ', iniciales: 'AR', especialidadId: 5, especialidad: 'Cirugía General', horario: 'Lunes a viernes, 15:00 - 18:00' },
        { id: 12, nombre: 'MARIA FERNANDA SANTOS COBEÑA', iniciales: 'MS', especialidadId: 5, especialidad: 'Cirugía General', horario: 'Lunes a viernes, 15:00 - 18:00' },
        { id: 13, nombre: 'MARIANGEL DOLORES CEDEÑO VIVAS', iniciales: 'MC', especialidadId: 6, especialidad: 'Pediatría', horario: 'Lunes a sábado, 08:00 - 13:00' },
        { id: 14, nombre: 'TERESA MARIBEL RIZO DELGADO', iniciales: 'TR', especialidadId: 6, especialidad: 'Pediatría', horario: 'Lunes a sábado, 08:00 - 13:00' },
        { id: 15, nombre: 'HUMBERTO EDISON CORRAL VERA', iniciales: 'HC', especialidadId: 6, especialidad: 'Pediatría', horario: 'Lunes a sábado, 08:00 - 13:00' },
        { id: 16, nombre: 'LUIS GUILLERMO MENDOZA', iniciales: 'LM', especialidadId: 7, especialidad: 'Cirugía Pediátrica', horario: 'Martes y jueves, 14:00 - 17:00' },
        { id: 17, nombre: 'GAUDENCIO RAMOS SALAS', iniciales: 'GR', especialidadId: 8, especialidad: 'Anestesiología y Reanimación', horario: 'Lunes a viernes, previa cita' },
        { id: 18, nombre: 'SUSANA ISABEL GARCIA SILVA', iniciales: 'SG', especialidadId: 8, especialidad: 'Anestesiología y Reanimación', horario: 'Lunes a viernes, previa cita' },
        { id: 19, nombre: 'MAYLIE DIAZ SANCHEZ', iniciales: 'MD', especialidadId: 8, especialidad: 'Anestesiología y Reanimación', horario: 'Lunes a viernes, previa cita' },
        { id: 20, nombre: 'EDISON ANDRES BORJA BASTIDAS', iniciales: 'EB', especialidadId: 8, especialidad: 'Anestesiología y Reanimación', horario: 'Lunes a viernes, previa cita' },
        { id: 21, nombre: 'MARIA FERNANDA ZAMBRANO LOOR', iniciales: 'MZ', especialidadId: 9, especialidad: 'Ginecología y Obstetricia', horario: 'Lunes a viernes, 09:00 - 17:00' },
        { id: 22, nombre: 'GABRIEL FERNANDO LOPEZ ESPINOZA', iniciales: 'GL', especialidadId: 9, especialidad: 'Ginecología y Obstetricia', horario: 'Lunes a viernes, 09:00 - 17:00' },
        { id: 23, nombre: 'RICHARD ZAMBRANO', iniciales: 'RZ', especialidadId: 10, especialidad: 'Medicina Interna', horario: 'Lunes a viernes, previa cita' },
        { id: 24, nombre: 'DIANA VANESSA QUIJIJE VALENCIA', iniciales: 'DQ', especialidadId: 11, especialidad: 'Psiquiatría', horario: 'Lunes a viernes, previa cita' },
        { id: 25, nombre: 'MARIUXI ARACELY ZAMBRANO NAVIA', iniciales: 'MZ', especialidadId: 12, especialidad: 'Imagenología', horario: 'Lunes a viernes, previa cita' },
        { id: 26, nombre: 'JOSE ANDRES CEDEÑO VALDIVIEZO', iniciales: 'JC', especialidadId: 13, especialidad: 'Cardiología', horario: 'Lunes a viernes, previa cita' },
        { id: 27, nombre: 'DARWIN KELVIN LEON FRANCO', iniciales: 'DL', especialidadId: 14, especialidad: 'Angiología y Cirugía Vascular', horario: 'Lunes a viernes, previa cita' },
        { id: 28, nombre: 'SEGUNDO STALIN MORAN MERCHAN', iniciales: 'SM', especialidadId: 13, especialidad: 'Cardiología', horario: 'Lunes a viernes, previa cita' },
        { id: 29, nombre: 'MARIA DE LOS ANGELES MONTOYA GALEA', iniciales: 'MM', especialidadId: 15, especialidad: 'Cirugía Oncológica', horario: 'Lunes a viernes, previa cita' },
        { id: 30, nombre: 'CARLOS LEONIDAS MORALES NARANJO', iniciales: 'CM', especialidadId: 16, especialidad: 'Neurología', horario: 'Lunes a viernes, previa cita' },
        { id: 31, nombre: 'JAMES JOHANN MUÑOZ ZAMBRANO', iniciales: 'JM', especialidadId: 17, especialidad: 'Nefrología', horario: 'Lunes a viernes, previa cita' },
      ],
      turnosDisponibles: [],
    };
  },
  computed: {
    medicosDisponibles() {
      if (!this.selectedEspecialidad) return [];
      return this.medicos.filter(m => m.especialidadId === this.selectedEspecialidad.id);
    },

    /**
     * Errores derivados del estado actual del formulario.
     * Es la única fuente de verdad: no se guarda una copia mutable en `data`,
     * así nunca queda desincronizada con `patientData`.
     */
    erroresPaciente() {
      return validarFormulario(this.patientData, ESQUEMA_PACIENTE).errores;
    },
    datosPacienteValidos() {
      return Object.keys(this.erroresPaciente).length === 0;
    },
    canProceed() {
      switch (this.currentStep) {
        case PASO_ESPECIALIDAD: return !!this.selectedEspecialidad;
        case PASO_MEDICO: return !!this.selectedMedico;
        case PASO_FECHA_HORA: return !!this.selectedDate && !!this.selectedTime;
        case PASO_DATOS: return this.datosPacienteValidos;
        case PASO_CONFIRMACION: return this.datosPacienteValidos;
        default: return false;
      }
    },
  },
  mounted() {
    this.aplicarSeleccionDesdeRuta();
    window.scrollTo(0, 0);
  },
  methods: {

    normalizarTextoBusqueda(valor) {
      return String(valor || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    },
    buscarEspecialidadPorNombre(nombre) {
      const nombreNormalizado = this.normalizarTextoBusqueda(nombre);
      const aliasEspecialidades = {
        neumologia: 'neumonologia',
      };
      const nombreComparable = aliasEspecialidades[nombreNormalizado] || nombreNormalizado;

      return this.especialidades.find((e) => (
        this.normalizarTextoBusqueda(e.nombre) === nombreComparable
      )) || null;
    },

    /**
     * Preselecciona especialidad y médico a partir de la query string
     * (`/agendamiento-citas?especialidad=X&medico=Y`), como al llegar desde la
     * tarjeta de una especialidad o de un médico.
     */
    aplicarSeleccionDesdeRuta() {
      const { especialidad: especialidadParam, medico: medicoParam } = this.$route.query;

      const medico = medicoParam
        ? this.medicos.find((m) => m.nombre === medicoParam)
        : null;

      // El médico manda sobre el parámetro de especialidad: su `especialidadId`
      // es la fuente de verdad y evita una combinación incoherente si ambos
      // parámetros se contradicen.
      if (medico) {
        this.selectedMedico = medico;
        this.selectedEspecialidad =
          this.especialidades.find((e) => e.id === medico.especialidadId) || null;
        return;
      }

      if (especialidadParam) {
        this.selectedEspecialidad = this.buscarEspecialidadPorNombre(especialidadParam);
        if (this.selectedEspecialidad) {
          this.currentStep = PASO_MEDICO;
        }
      }
    },
    selectEspecialidad(esp) {
      // Volver a pulsar la especialidad ya elegida no debe descartar el médico
      // preseleccionado desde la tarjeta: solo un cambio real limpia lo de abajo.
      if (this.selectedEspecialidad?.id === esp.id) return;

      this.selectedEspecialidad = esp;
      this.selectedMedico = null;
      this.selectedDate = '';
      this.selectedTime = '';
    },
    selectMedico(med) {
      if (this.selectedMedico?.id === med.id) return;

      this.selectedMedico = med;
      this.selectedDate = '';
      this.selectedTime = '';
      this.generateTurnosDisponibles();
    },
    selectTurno(turno) {
      this.selectedDate = turno.fecha;
      this.selectedTime = turno.hora;
    },
    generateTurnosDisponibles() {
      const horasBase = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
      const turnos = [];
      const cursor = new Date();
      cursor.setDate(cursor.getDate() + 1);

      while (turnos.length < 15) {
        const diaSemana = cursor.getDay();
        if (diaSemana !== 0) {
          const fecha = this.toDateInputValue(cursor);
          const offset = (this.selectedMedico?.id || 0) % 4;
          horasBase.slice(offset, offset + 5).forEach((hora) => {
            turnos.push({
              id: `${fecha}-${hora}`,
              fecha,
              hora,
            });
          });
        }
        cursor.setDate(cursor.getDate() + 1);
      }

      this.turnosDisponibles = turnos.slice(0, 15);
    },
    toDateInputValue(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    formatDayLabel(dateStr) {
      if (!dateStr) return '';
      const [year, month, day] = dateStr.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'long' });
    },
    /* -------------------------------------------------------------- *
     * Validación de los datos del paciente
     * -------------------------------------------------------------- */

    /**
     * Limpia el valor mientras el usuario escribe, descartando lo que nunca
     * podría ser válido (dígitos en el nombre, letras en el teléfono).
     */
    onCampoInput(campo) {
      const sanitizar = SANITIZADORES_PACIENTE[campo];
      if (sanitizar) {
        this.patientData[campo] = sanitizar(this.patientData[campo]);
      }
    },

    /** Al salir del campo se habilita la muestra de su error, si lo tiene. */
    onCampoBlur(campo) {
      this.camposTocados[campo] = true;
    },

    /** Mensaje a renderizar para un campo: vacío mientras no se haya tocado. */
    errorDe(campo) {
      return this.camposTocados[campo] ? this.erroresPaciente[campo] || '' : '';
    },

    /** Fuerza la visibilidad de todos los errores (al intentar avanzar). */
    revelarErrores() {
      this.camposTocados = Object.keys(ESQUEMA_PACIENTE).reduce(
        (tocados, campo) => ({ ...tocados, [campo]: true }),
        {}
      );
    },

    /** Lleva el foco al primer campo inválido para que el usuario no lo busque. */
    enfocarPrimerCampoInvalido() {
      this.$nextTick(() => {
        const campo = this.$el?.querySelector('.input-error');
        campo?.focus();
      });
    },

    /* -------------------------------------------------------------- *
     * Navegación
     * -------------------------------------------------------------- */

    nextStep() {
      if (this.currentStep === PASO_DATOS && !this.datosPacienteValidos) {
        this.revelarErrores();
        this.enfocarPrimerCampoInvalido();
        return;
      }

      if (this.canProceed && this.currentStep < PASO_CONFIRMACION) {
        this.currentStep++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    prevStep() {
      if (this.currentStep > PASO_ESPECIALIDAD) {
        this.currentStep--;
      }
    },
    goToStep(idx) {
      if (idx < this.currentStep) {
        this.currentStep = idx;
      }
    },
    confirmarCita() {
      // Normalización final (trim, espacios colapsados, prefijo +593 resuelto).
      this.patientData = sanitizarFormulario(this.patientData, NORMALIZADORES_PACIENTE);

      // Revalidar antes de actuar: el usuario pudo llegar aquí y luego retroceder
      // a editar los datos, o pegar contenido que esquive el sanitizado.
      if (!this.datosPacienteValidos) {
        this.revelarErrores();
        this.currentStep = PASO_DATOS;
        this.enfocarPrimerCampoInvalido();
        return;
      }

      // WhatsApp solo tiene sentido sobre un celular; un fijo no recibe el mensaje.
      if (esCelularEcuador(this.patientData.telefono)) {
        const numeroWhatsApp = aFormatoInternacionalEc(this.patientData.telefono);
        const mensaje = this.construirMensajeConfirmacion();
        window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`, '_blank');
      }

      this.citaConfirmada = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    construirMensajeConfirmacion() {
      const linea = (label, value) => `• ${label}: ${value || '-'}`;
      return [
        `Hola ${this.patientData.nombre || 'paciente'},`,
        'Tu cita ha sido confirmada en Clínica Arboleda. Aquí están los detalles:',
        '',
        linea('Especialidad', this.selectedEspecialidad?.nombre),
        linea('Médico', this.selectedMedico?.nombre),
        linea('Fecha', this.formatDate(this.selectedDate)),
        linea('Hora', this.selectedTime),
        linea('Paciente', this.patientData.nombre),
        linea('Cédula', this.patientData.cedula),
        linea('Teléfono', this.patientData.telefono),
        this.patientData.motivo ? linea('Motivo', this.patientData.motivo) : '',
        '',
        '¡Te esperamos!',
      ].filter(Boolean).join('\n');
    },
    imprimirComprobante() {
      window.print();
    },
    nuevaCita() {
      this.currentStep = PASO_ESPECIALIDAD;
      this.citaConfirmada = false;
      this.selectedEspecialidad = null;
      this.selectedMedico = null;
      this.selectedDate = '';
      this.selectedTime = '';
      this.patientData = crearDatosPaciente();
      this.camposTocados = {};
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const [year, month, day] = dateStr.split('-');
      const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
    },
  },
};


