import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';

export default {
  name: 'AgendamientoCitas',
  components: {
    HeaderAnth,
    FooterAnth,
  },
  data() {
    return {
      currentStep: 0,
      citaConfirmada: false,
      steps: ['Especialidad', 'Médico', 'Fecha y Hora', 'Datos', 'Confirmar'],
      selectedEspecialidad: null,
      selectedMedico: null,
      selectedDate: '',
      selectedTime: '',
      patientData: {
        nombre: '',
        cedula: '',
        telefono: '',
        email: '',
        motivo: '',
      },
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
      timeSlots: [],
    };
  },
  computed: {
    medicosDisponibles() {
      if (!this.selectedEspecialidad) return [];
      return this.medicos.filter(m => m.especialidadId === this.selectedEspecialidad.id);
    },
    minDate() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    },
    maxDate() {
      const max = new Date();
      max.setDate(max.getDate() + 60);
      return max.toISOString().split('T')[0];
    },
    canProceed() {
      switch (this.currentStep) {
        case 0: return !!this.selectedEspecialidad;
        case 1: return !!this.selectedMedico;
        case 2: return !!this.selectedDate && !!this.selectedTime;
        case 3: return this.patientData.nombre.trim() !== '' && this.patientData.cedula.trim() !== '' && this.patientData.telefono.trim() !== '';
        case 4: return true;
        default: return false;
      }
    },
  },
  mounted() {
    this.aplicarSeleccionDesdeRuta();
    window.scrollTo(0, 0);
  },
  methods: {

    aplicarSeleccionDesdeRuta() {
      const especialidadParam = this.$route.query.especialidad;
      const medicoParam = this.$route.query.medico;

      if (especialidadParam) {
        const especialidad = this.especialidades.find(e => e.nombre === especialidadParam);
        if (especialidad) {
          this.selectedEspecialidad = especialidad;
        }
      }

      if (medicoParam) {
        const medico = this.medicos.find(m => m.nombre === medicoParam);
        if (medico) {
          this.selectedMedico = medico;
          this.selectedEspecialidad = this.especialidades.find(e => e.id === medico.especialidadId) || this.selectedEspecialidad;
          this.currentStep = 2;
          this.generateTimeSlots();
          return;
        }
      }

      if (this.selectedEspecialidad) {
        this.currentStep = 1;
      }
    },
    selectEspecialidad(esp) {
      this.selectedEspecialidad = esp;
      this.selectedMedico = null;
      this.selectedDate = '';
      this.selectedTime = '';
    },
    selectMedico(med) {
      this.selectedMedico = med;
      this.selectedDate = '';
      this.selectedTime = '';
    },
    selectTime(slot) {
      this.selectedTime = slot;
    },
    onDateChange() {
      this.selectedTime = '';
      this.generateTimeSlots();
    },
    generateTimeSlots() {
      const slots = [];
      const startHour = 8;
      const endHour = 17;
      for (let h = startHour; h < endHour; h++) {
        slots.push(`${String(h).padStart(2, '0')}:00`);
        slots.push(`${String(h).padStart(2, '0')}:30`);
      }
      this.timeSlots = slots;
    },
    nextStep() {
      if (this.canProceed && this.currentStep < 4) {
        this.currentStep++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    goToStep(idx) {
      if (idx < this.currentStep) {
        this.currentStep = idx;
      }
    },
    confirmarCita() {
      this.citaConfirmada = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    nuevaCita() {
      this.currentStep = 0;
      this.citaConfirmada = false;
      this.selectedEspecialidad = null;
      this.selectedMedico = null;
      this.selectedDate = '';
      this.selectedTime = '';
      this.patientData = { nombre: '', cedula: '', telefono: '', email: '', motivo: '' };
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const [year, month, day] = dateStr.split('-');
      const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
    },
  },
};
