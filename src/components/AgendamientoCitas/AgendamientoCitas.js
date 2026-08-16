import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';
import { validarFormulario, sanitizarFormulario } from '@/utils/formValidation';
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

const crearConsents = () => ({
  privacidad: false,
  recordatorios: false,
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
      specialtySearch: '',
      specialtyFilter: 'todas',
      doctorSearch: '',
      selectedEspecialidad: null,
      selectedMedico: null,
      selectedSlots: [],
      activeSlotTarget: 0,
      selectedCalendarDate: '',
      patientData: crearDatosPaciente(),
      consents: crearConsents(),
      // Un campo solo muestra su error después de que el usuario lo tocó o
      // intentó avanzar: evita marcar en rojo un formulario recién abierto.
      camposTocados: {},
      limites: LIMITES,
      especialidades: [
        { id: 1, nombre: 'Medicina Crítica', categoria: 'clinicas', destacada: false, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-5 4 10 2-5h6"/><path d="M12 21C7 17 4 14 4 10a4 4 0 0 1 7-2.6A4 4 0 0 1 18 10c0 4-3 7-6 11z"/></svg>` },
        { id: 2, nombre: 'Ortopedia y Traumatología', categoria: 'clinicas', destacada: true, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v18"/><path d="M15 3v18"/><path d="M7 7h10"/><path d="M7 17h10"/><path d="M5 12h14"/></svg>` },
        { id: 3, nombre: 'Neumonología', categoria: 'clinicas', destacada: false, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16"/><path d="M12 10c-2-3-5-4-7-1-1 2-1 8 2 10 2 1 4-1 5-4"/><path d="M12 10c2-3 5-4 7-1 1 2 1 8-2 10-2 1-4-1-5-4"/></svg>` },
        { id: 4, nombre: 'Gastroenterología', categoria: 'clinicas', destacada: false, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3c4 2 7 5 6 9-.8 3-3.2 4-5.5 4"/><path d="M9 21c5-1 8-4 8-9 0-4-3-7-7-9"/><path d="M7 8c2 1 3 3 2 5"/></svg>` },
        { id: 5, nombre: 'Cirugía General', categoria: 'cirugias', destacada: true, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20 20 4"/><path d="M14 4h6v6"/><path d="M4 16l4 4"/></svg>` },
        { id: 6, nombre: 'Pediatría', categoria: 'clinicas', destacada: true, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3"/><path d="M6 21c1-4 3-6 6-6s5 2 6 6"/><path d="M8 11c-2 1-3 2-3 4"/><path d="M16 11c2 1 3 2 3 4"/></svg>` },
        { id: 7, nombre: 'Cirugía Pediátrica', categoria: 'cirugias', destacada: false, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3"/><path d="M6 21c1-4 3-6 6-6s5 2 6 6"/><path d="M4 5h5"/><path d="M6.5 2.5v5"/></svg>` },
        { id: 8, nombre: 'Anestesiología y Reanimación', categoria: 'clinicas', destacada: false, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h6l6 6-9 9-6-6 3-9z"/><path d="M14 7 7 14"/><path d="m17 10 3 3"/></svg>` },
        { id: 9, nombre: 'Ginecología y Obstetricia', categoria: 'clinicas', destacada: true, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M12 12v9"/><path d="M8 17h8"/></svg>` },
        { id: 10, nombre: 'Medicina Interna', categoria: 'clinicas', destacada: true, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v7a4 4 0 0 0 8 0V3"/><path d="M12 14v4a3 3 0 0 0 6 0v-2"/><circle cx="18" cy="14" r="2"/></svg>` },
        { id: 11, nombre: 'Psiquiatría', categoria: 'clinicas', destacada: false, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M8 14c-2-1-3-3-3-6a7 7 0 0 1 14 0c0 3-1 5-3 6"/><path d="M9 10c1-2 5-2 6 0"/></svg>` },
        { id: 12, nombre: 'Imagenología', categoria: 'clinicas', destacada: false, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>` },
        { id: 13, nombre: 'Cardiología', categoria: 'clinicas', destacada: true, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-5 4 10 2-5h6"/><path d="M19 6c-2-2-5-1-7 2-2-3-5-4-7-2"/></svg>` },
        { id: 14, nombre: 'Angiología y Cirugía Vascular', categoria: 'cirugias', destacada: false, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M12 8c-3 0-5 2-5 5"/><path d="M12 8c3 0 5 2 5 5"/><path d="M12 14c-2 0-3 1-3 3"/><path d="M12 14c2 0 3 1 3 3"/></svg>` },
        { id: 15, nombre: 'Cirugía Oncológica', categoria: 'cirugias', destacada: false, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/><path d="m5 5 2 2"/><path d="m17 17 2 2"/><path d="m19 5-2 2"/><path d="m7 17-2 2"/></svg>` },
        { id: 16, nombre: 'Neurología', categoria: 'clinicas', destacada: true, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v1a3 3 0 0 0 5 2"/><path d="M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 0 6v1a3 3 0 0 1-5 2"/><path d="M12 5v14"/></svg>` },
        { id: 17, nombre: 'Nefrología', categoria: 'clinicas', destacada: false, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4c-4 2-5 8-2 12 2 3 5 1 5-2V8c0-3-1-5-3-4z"/><path d="M15 4c4 2 5 8 2 12-2 3-5 1-5-2V8c0-3 1-5 3-4z"/></svg>` },
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
    filtrosEspecialidad() {
      return [
        { id: 'todas', label: 'Todas' },
        { id: 'destacadas', label: 'Más consultadas' },
        { id: 'clinicas', label: 'Clínicas' },
        { id: 'cirugias', label: 'Cirugías' },
      ];
    },
    especialidadesFiltradas() {
      const busqueda = this.normalizarTextoBusqueda(this.specialtySearch);

      return this.especialidades.filter((especialidad) => {
        const coincideBusqueda = !busqueda || this.normalizarTextoBusqueda(especialidad.nombre).includes(busqueda);

        let coincideFiltro = true;
        if (this.specialtyFilter === 'destacadas') coincideFiltro = !!especialidad.destacada;
        if (this.specialtyFilter === 'clinicas') coincideFiltro = especialidad.categoria === 'clinicas';
        if (this.specialtyFilter === 'cirugias') coincideFiltro = especialidad.categoria === 'cirugias';

        return coincideBusqueda && coincideFiltro;
      });
    },
    medicosDisponibles() {
      if (!this.selectedEspecialidad) return [];
      return this.medicos.filter(m => m.especialidadId === this.selectedEspecialidad.id);
    },
    medicosFiltrados() {
      const busqueda = this.normalizarTextoBusqueda(this.doctorSearch);
      if (!busqueda) return this.medicosDisponibles;

      return this.medicosDisponibles.filter((medico) => {
        const nombre = this.normalizarTextoBusqueda(medico.nombre);
        const especialidad = this.normalizarTextoBusqueda(medico.especialidad);
        const consultorio = this.normalizarTextoBusqueda(this.consultorioDe(medico));
        return nombre.includes(busqueda) || especialidad.includes(busqueda) || consultorio.includes(busqueda);
      });
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
        case PASO_FECHA_HORA: return this.selectedSlots.length >= 1;
        case PASO_DATOS: return this.datosPacienteValidos && this.consents.privacidad;
        case PASO_CONFIRMACION: return this.datosPacienteValidos;
        default: return false;
      }
    },
    slotPrincipal() {
      return this.selectedSlots[0] || null;
    },
    slotAlternativo() {
      return this.selectedSlots[1] || null;
    },
    fechasDisponibles() {
      return [...new Set(this.turnosDisponibles.map((turno) => turno.fecha))];
    },
    fechaCalendarioActiva() {
      return this.selectedCalendarDate || this.fechasDisponibles[0] || '';
    },
    turnosDelDia() {
      return this.turnosDisponibles.filter((turno) => turno.fecha === this.fechaCalendarioActiva);
    },
    turnosManana() {
      return this.turnosDelDia.filter((turno) => Number(turno.hora.split(':')[0]) < 12);
    },
    turnosTarde() {
      return this.turnosDelDia.filter((turno) => Number(turno.hora.split(':')[0]) >= 12);
    },
    mesCalendarioLabel() {
      if (!this.fechasDisponibles.length) return '';
      const [year, month] = this.fechasDisponibles[0].split('-').map(Number);
      const date = new Date(year, month - 1, 1);
      const label = date.toLocaleDateString('es-EC', { month: 'long', year: 'numeric' });
      return label.charAt(0).toUpperCase() + label.slice(1);
    },
    diasCalendario() {
      if (!this.fechasDisponibles.length) return [];
      const firstDate = this.parseDateString(this.fechasDisponibles[0]);
      const lastDate = this.parseDateString(this.fechasDisponibles[this.fechasDisponibles.length - 1]);
      const monthStart = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
      const monthEnd = new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, 0);
      const dias = [];
      const primerDiaSemana = (monthStart.getDay() + 6) % 7;

      for (let index = 0; index < primerDiaSemana; index++) {
        dias.push({
          fecha: `blank-start-${index}`,
          dia: '',
          disponible: false,
          pasada: false,
          vacio: true,
        });
      }

      for (let day = 1; day <= monthEnd.getDate(); day++) {
        const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), day);
        const fecha = this.toDateInputValue(date);
        dias.push({
          fecha,
          dia: day,
          disponible: this.fechasDisponibles.includes(fecha),
          pasada: fecha < this.fechasDisponibles[0],
          vacio: false,
        });
      }

      return dias;
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
        // Si venimos con médico preseleccionado desde otra página,
        // generamos los turnos disponibles pero mantenemos al usuario
        // en el primer paso. Así la especialidad y el médico aparecen
        // resaltados y el usuario elige la fecha/horario manualmente.
        this.generateTurnosDisponibles();
        this.currentStep = PASO_ESPECIALIDAD;
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
      if (this.selectedEspecialidad?.id !== esp.id) {
        this.selectedEspecialidad = esp;
        this.doctorSearch = '';
        this.selectedMedico = null;
        this.selectedSlots = [];
        this.activeSlotTarget = 0;
        this.selectedCalendarDate = '';
      }

      // Elegir especialidad ya avanza: el paso tiene una sola decisión, asi
      // que pedir además "Siguiente" es un clic de más. El avance va fuera
      // del if para que volver atrás y repulsar la misma tambien avance.
      this.irAPaso(PASO_MEDICO);
    },
    setSpecialtyFilter(filterId) {
      this.specialtyFilter = filterId;
    },
    consultorioDe() {
      return 'Consultorio 00';
    },
    selectMedico(med) {
      if (this.selectedMedico?.id !== med.id) {
        this.selectedMedico = med;
        this.selectedSlots = [];
        this.activeSlotTarget = 0;
        this.generateTurnosDisponibles();
      }

      this.irAPaso(PASO_FECHA_HORA);
    },
    selectTurno(turno) {
      const indiceExistente = this.selectedSlots.findIndex((slot) => slot.id === turno.id);

      if (indiceExistente >= 0) {
        this.selectedSlots.splice(indiceExistente, 1, null);
        while (this.selectedSlots.length && !this.selectedSlots[this.selectedSlots.length - 1]) {
          this.selectedSlots.pop();
        }
        this.activeSlotTarget = indiceExistente;
        return;
      }

      const targetIndex = this.selectedSlots[0]
        ? (this.activeSlotTarget === 1 ? 1 : this.selectedSlots[1] ? 1 : 1)
        : 0;

      this.selectedSlots.splice(targetIndex, 1, turno);
      this.activeSlotTarget = targetIndex === 0 ? 1 : 0;
    },
    slotSeleccionado(turno) {
      return this.selectedSlots.findIndex((slot) => slot.id === turno.id);
    },
    setActiveSlotTarget(index) {
      this.activeSlotTarget = index;
    },
    seleccionarFechaCalendario(fecha) {
      if (!this.fechasDisponibles.includes(fecha)) return;
      this.selectedCalendarDate = fecha;
    },
    generateTurnosDisponibles() {
      const horasBase = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00'];
      const turnos = [];
      const cursor = new Date();
      cursor.setDate(cursor.getDate() + 1);

      while (turnos.length < 30) {
        const diaSemana = cursor.getDay();
        if (diaSemana !== 0) {
          const fecha = this.toDateInputValue(cursor);
          const offset = (this.selectedMedico?.id || 0) % 2;
          const horasDelDia = horasBase.filter((_, index) => index % 2 === offset || index < 5);

          horasDelDia.forEach((hora) => {
            turnos.push({
              id: `${fecha}-${hora}`,
              fecha,
              hora,
            });
          });
        }
        cursor.setDate(cursor.getDate() + 1);
      }

      this.turnosDisponibles = turnos.slice(0, 30);
      this.selectedSlots = [];
      this.activeSlotTarget = 0;
      this.selectedCalendarDate = this.turnosDisponibles[0]?.fecha || '';
    },
    toDateInputValue(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    parseDateString(dateStr) {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day);
    },
    formatDayLabel(dateStr) {
      if (!dateStr) return '';
      const date = this.parseDateString(dateStr);
      return date.toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'long' });
    },
    formatShortDayLabel(dateStr) {
      if (!dateStr) return '';
      const date = this.parseDateString(dateStr);
      return date.toLocaleDateString('es-EC', { weekday: 'short', day: 'numeric', month: 'short' });
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

    // Único punto que cambia de paso hacia delante, para que el scroll al
    // inicio sea siempre el mismo venga de "Siguiente" o de un autoavance.
    irAPaso(paso) {
      this.currentStep = paso;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    nextStep() {
      if (this.currentStep === PASO_DATOS && !this.datosPacienteValidos) {
        this.revelarErrores();
        this.enfocarPrimerCampoInvalido();
        return;
      }

      if (this.canProceed && this.currentStep < PASO_CONFIRMACION) {
        this.irAPaso(this.currentStep + 1);
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
        linea('Opción principal', this.formatearTurno(this.slotPrincipal)),
        this.slotAlternativo ? linea('Opción alternativa', this.formatearTurno(this.slotAlternativo)) : '',
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
      this.doctorSearch = '';
      this.selectedMedico = null;
      this.selectedSlots = [];
      this.activeSlotTarget = 0;
      this.patientData = crearDatosPaciente();
      this.consents = crearConsents();
      this.camposTocados = {};
    },
    formatearTurno(turno) {
      if (!turno) return '';
      return `${this.formatDate(turno.fecha)} - ${turno.hora}`;
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const [year, month, day] = dateStr.split('-');
      const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
    },
  },
};


