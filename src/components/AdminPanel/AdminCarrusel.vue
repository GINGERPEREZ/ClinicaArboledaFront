<template>
  <div class="admin-content-tab">
    <h2>Gestión del Carrusel del Inicio</h2>
    <p class="tab-description">
      Edita las fotos de pantalla completa y el texto que muestra cada diapositiva del carrusel principal de la página de inicio.
      Los cambios se guardan en este navegador y se reflejan al instante en la página.
    </p>

    <div class="form-section">
      <h3>{{ editingSlide ? 'Editar Diapositiva' : 'Nueva Diapositiva' }}</h3>
      <form @submit.prevent="submitSlide" class="content-form">
        <div class="form-group">
          <label>Imagen de la Diapositiva:</label>
          <div class="image-input-row">
            <input type="text" v-model="slideForm.imagen" placeholder="Ruta o URL de la imagen" />
            <label class="upload-btn">
              Subir imagen
              <input type="file" accept="image/*" @change="onFileSelected" hidden />
            </label>
          </div>
          <div v-if="slideForm.imagen" class="image-preview">
            <img :src="slideForm.imagen" alt="Vista previa" @error="handlePreviewError" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Título:</label>
            <input type="text" v-model="slideForm.titulo" placeholder="Ej: Amor desde el" required />
          </div>
          <div class="form-group">
            <label>Título Resaltado:</label>
            <input type="text" v-model="slideForm.titulo_highlight" placeholder="Ej: primer latido." />
          </div>
        </div>

        <div class="form-group">
          <label>Subtítulo:</label>
          <textarea v-model="slideForm.subtitulo" rows="3" placeholder="Texto descriptivo de la diapositiva"></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            {{ editingSlide ? 'Actualizar' : 'Agregar' }} Diapositiva
          </button>
          <button
            v-if="editingSlide"
            type="button"
            class="btn btn-secondary"
            @click="cancelEdit"
          >
            Cancelar
          </button>
        </div>

        <div v-if="message" :class="['message', messageType]">
          {{ message }}
        </div>
      </form>
    </div>

    <div class="content-list">
      <h3>Diapositivas del Carrusel</h3>
      <p v-if="slides.length === 0" class="empty-list">No hay diapositivas. Agrega una para mostrar el carrusel.</p>
      <div v-for="(slide, index) in slides" :key="slide.id" class="content-card">
        <div class="content-card-image">
          <img :src="slide.imagen" :alt="slide.titulo" @error="handleCardImageError" />
        </div>
        <div class="content-card-info">
          <h4>{{ slide.titulo }} <span v-if="slide.titulo_highlight" class="card-highlight">{{ slide.titulo_highlight }}</span></h4>
          <p>{{ slide.subtitulo }}</p>
        </div>
        <div class="content-card-actions">
          <button class="btn-icon" title="Subir" :disabled="index === 0" @click="moveSlide(index, -1)">⬆️</button>
          <button class="btn-icon" title="Bajar" :disabled="index === slides.length - 1" @click="moveSlide(index, 1)">⬇️</button>
          <button class="btn-icon" title="Editar" @click="editSlide(slide)">✏️</button>
          <button class="btn-icon" title="Eliminar" @click="deleteSlide(slide.id)">🗑️</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  loadCarouselSlides,
  saveCarouselSlides
} from '@/utils/contentStore';
import { fileToResizedDataUrl } from '@/utils/imageHelper';

let nextId = Date.now();

export default {
  name: 'AdminCarrusel',
  data() {
    return {
      slides: [],
      editingSlide: null,
      slideForm: {
        imagen: '',
        titulo: '',
        titulo_highlight: '',
        subtitulo: ''
      },
      message: '',
      messageType: ''
    };
  },
  mounted() {
    this.slides = loadCarouselSlides();
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0];
      if (!file) return;
      fileToResizedDataUrl(file)
        .then((dataUrl) => {
          this.slideForm.imagen = dataUrl;
          this.showMessage('Imagen cargada correctamente', 'success');
        })
        .catch((error) => {
          console.error('Error al cargar imagen:', error);
          this.showMessage('No se pudo cargar la imagen', 'error');
        });
      event.target.value = '';
    },
    submitSlide() {
      if (this.editingSlide) {
        const slide = this.slides.find((s) => s.id === this.editingSlide.id);
        if (slide) {
          Object.assign(slide, { ...this.slideForm });
        }
        this.showMessage('Diapositiva actualizada correctamente', 'success');
      } else {
        this.slides.push({
          id: nextId++,
          ...this.slideForm
        });
        this.showMessage('Diapositiva agregada correctamente', 'success');
      }
      this.persist();
      this.cancelEdit();
    },
    editSlide(slide) {
      this.editingSlide = slide;
      this.slideForm = {
        imagen: slide.imagen,
        titulo: slide.titulo,
        titulo_highlight: slide.titulo_highlight || '',
        subtitulo: slide.subtitulo || ''
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    cancelEdit() {
      this.editingSlide = null;
      this.slideForm = {
        imagen: '',
        titulo: '',
        titulo_highlight: '',
        subtitulo: ''
      };
    },
    deleteSlide(id) {
      if (!confirm('¿Está seguro de eliminar esta diapositiva?')) return;
      this.slides = this.slides.filter((s) => s.id !== id);
      this.persist();
      this.showMessage('Diapositiva eliminada', 'success');
      if (this.editingSlide && this.editingSlide.id === id) {
        this.cancelEdit();
      }
    },
    moveSlide(index, delta) {
      const target = index + delta;
      if (target < 0 || target >= this.slides.length) return;
      const [item] = this.slides.splice(index, 1);
      this.slides.splice(target, 0, item);
      this.persist();
      this.showMessage('Orden actualizado', 'success');
    },
    persist() {
      saveCarouselSlides(this.slides);
    },
    showMessage(message, type) {
      this.message = message;
      this.messageType = type;
      setTimeout(() => {
        this.message = '';
      }, 3000);
    },
    handlePreviewError(event) {
      if (!event.target.dataset.fallback) {
        event.target.dataset.fallback = 'true';
        event.target.src = '/Banners/Banner1.jpg';
      }
    },
    handleCardImageError(event) {
      if (!event.target.dataset.fallback) {
        event.target.dataset.fallback = 'true';
        event.target.src = '/Banners/Banner1.jpg';
      }
    }
  }
};
</script>

<style scoped src="./AdminContenido.css"></style>
