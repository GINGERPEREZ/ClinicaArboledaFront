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
        { id: 1, nombre: 'Medicina General', icon: '🩺' },
        { id: 2, nombre: 'Traumatología', icon: '🦴' },
        { id: 3, nombre: 'Ginecología', icon: '👩‍⚕️' },
        { id: 4, nombre: 'Pediatría', icon: '👶' },
        { id: 5, nombre: 'Cardiología', icon: '❤️' },
        { id: 6, nombre: 'Dermatología', icon: '🧴' },
        { id: 7, nombre: 'Oftalmología', icon: '👁️' },
        { id: 8, nombre: 'Psicología', icon: '🧠' },
        { id: 9, nombre: 'Fisioterapia', icon: '🏃' },
        { id: 10, nombre: 'Neonatología', icon: '🍼' },
        { id: 11, nombre: 'Psiquiatría', icon: '💬' },
        { id: 12, nombre: 'Neurología', icon: '⚡' },
      ],
      medicos: [
        { id: 1, nombre: 'Dra. María López', iniciales: 'ML', especialidadId: 1, especialidad: 'Medicina General', horario: 'Lun - Vie: 8:00 - 16:00' },
        { id: 2, nombre: 'Dr. Carlos Mendoza', iniciales: 'CM', especialidadId: 1, especialidad: 'Medicina General', horario: 'Lun - Vie: 10:00 - 18:00' },
        { id: 3, nombre: 'Dr. Andrés Vega', iniciales: 'AV', especialidadId: 2, especialidad: 'Traumatología', horario: 'Lun - Mié: 8:00 - 14:00' },
        { id: 4, nombre: 'Dra. Patricia Ramos', iniciales: 'PR', especialidadId: 3, especialidad: 'Ginecología', horario: 'Mar - Jue: 9:00 - 17:00' },
        { id: 5, nombre: 'Dr. Luis Herrera', iniciales: 'LH', especialidadId: 4, especialidad: 'Pediatría', horario: 'Lun - Vie: 8:00 - 14:00' },
        { id: 6, nombre: 'Dra. Ana Castillo', iniciales: 'AC', especialidadId: 5, especialidad: 'Cardiología', horario: 'Lun - Vie: 9:00 - 15:00' },
        { id: 7, nombre: 'Dr. Roberto Navas', iniciales: 'RN', especialidadId: 6, especialidad: 'Dermatología', horario: 'Mié - Vie: 10:00 - 16:00' },
        { id: 8, nombre: 'Dra. Laura Cedeño', iniciales: 'LC', especialidadId: 7, especialidad: 'Oftalmología', horario: 'Lun - Jue: 8:00 - 14:00' },
        { id: 9, nombre: 'Dra. Sofía Intriago', iniciales: 'SI', especialidadId: 8, especialidad: 'Psicología', horario: 'Lun - Vie: 9:00 - 17:00' },
        { id: 10, nombre: 'Dr. Diego Zambrano', iniciales: 'DZ', especialidadId: 9, especialidad: 'Fisioterapia', horario: 'Lun - Vie: 7:00 - 15:00' },
        { id: 11, nombre: 'Dra. Gabriela Moreira', iniciales: 'GM', especialidadId: 10, especialidad: 'Neonatología', horario: 'Mar - Sáb: 8:00 - 14:00' },
        { id: 12, nombre: 'Dr. Fernando Quiroz', iniciales: 'FQ', especialidadId: 11, especialidad: 'Psiquiatría', horario: 'Lun - Mié: 10:00 - 16:00' },
        { id: 13, nombre: 'Dra. Valeria Ponce', iniciales: 'VP', especialidadId: 12, especialidad: 'Neurología', horario: 'Jue - Sáb: 9:00 - 15:00' },
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
    window.scrollTo(0, 0);
  },
  methods: {
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
