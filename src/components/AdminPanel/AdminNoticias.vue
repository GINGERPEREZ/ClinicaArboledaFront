<template>
  <div class="admin-content-tab">
    <h2>Gestión de Noticias</h2>
    <p class="tab-description">
      Agrega, edita o elimina las noticias que aparecen en la sección de noticias y en la vista previa de la página de inicio.
      Los cambios se guardan en este navegador y se reflejan al instante.
    </p>

    <div class="form-section">
      <h3>{{ editingNoticia ? 'Editar Noticia' : 'Nueva Noticia' }}</h3>
      <form @submit.prevent="submitNoticia" class="content-form">
        <div class="form-group">
          <label>Imagen de la Noticia:</label>
          <div class="image-input-row">
            <input type="text" v-model="noticiaForm.imagen" placeholder="Ruta o URL de la imagen" />
            <label class="upload-btn">
              Subir imagen
              <input type="file" accept="image/*" @change="onFileSelected" hidden />
            </label>
          </div>
          <div v-if="noticiaForm.imagen" class="image-preview">
            <img :src="noticiaForm.imagen" alt="Vista previa" @error="handlePreviewError" />
          </div>
        </div>

        <div class="form-group">
          <label>Título:</label>
          <input type="text" v-model="noticiaForm.titulo" required />
        </div>

        <div class="form-group">
          <label>Resumen:</label>
          <textarea v-model="noticiaForm.resumen" rows="3" required></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Autor:</label>
            <input type="text" v-model="noticiaForm.autor" />
          </div>
          <div class="form-group">
            <label>Fecha:</label>
            <input type="date" v-model="noticiaForm.fechaInput" />
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            {{ editingNoticia ? 'Actualizar' : 'Agregar' }} Noticia
          </button>
          <button
            v-if="editingNoticia"
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
      <h3>Noticias Publicadas</h3>
      <p v-if="noticias.length === 0" class="empty-list">No hay noticias. Agrega la primera.</p>
      <div v-for="noticia in noticias" :key="noticia.id" class="content-card">
        <div class="content-card-image">
          <img :src="noticia.imagen" :alt="noticia.titulo" @error="handleCardImageError" />
        </div>
        <div class="content-card-info">
          <h4>{{ noticia.titulo }}</h4>
          <p class="card-meta">{{ noticia.autor }} | {{ noticia.fecha }}</p>
          <p>{{ noticia.resumen }}</p>
        </div>
        <div class="content-card-actions">
          <button class="btn-icon" title="Editar" @click="editNoticia(noticia)">✏️</button>
          <button class="btn-icon" title="Eliminar" @click="deleteNoticia(noticia.id)">🗑️</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  loadNoticias,
  saveNoticias
} from '@/utils/contentStore';
import { fileToResizedDataUrl } from '@/utils/imageHelper';

let nextId = Date.now();

function toDateInputValue(fechaStr) {
  const match = String(fechaStr || '').match(/(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})/);
  if (match) {
    return `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`;
  }
  return '';
}

function toDisplayDate(dateInput) {
  if (!dateInput) return '';
  const [year, month, day] = String(dateInput).split('-');
  if (!year || !month || !day) return '';
  return `${day} / ${month} / ${year}`;
}

export default {
  name: 'AdminNoticias',
  data() {
    return {
      noticias: [],
      editingNoticia: null,
      noticiaForm: {
        imagen: '',
        titulo: '',
        resumen: '',
        autor: '',
        fechaInput: ''
      },
      message: '',
      messageType: ''
    };
  },
  mounted() {
    this.noticias = loadNoticias();
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0];
      if (!file) return;
      fileToResizedDataUrl(file)
        .then((dataUrl) => {
          this.noticiaForm.imagen = dataUrl;
          this.showMessage('Imagen cargada correctamente', 'success');
        })
        .catch((error) => {
          console.error('Error al cargar imagen:', error);
          this.showMessage('No se pudo cargar la imagen', 'error');
        });
      event.target.value = '';
    },
    submitNoticia() {
      const fecha = toDisplayDate(this.noticiaForm.fechaInput);
      const data = {
        imagen: this.noticiaForm.imagen,
        titulo: this.noticiaForm.titulo,
        resumen: this.noticiaForm.resumen,
        autor: this.noticiaForm.autor || 'Admin',
        fecha: fecha || toDisplayDate(new Date().toISOString().split('T')[0])
      };

      if (this.editingNoticia) {
        const noticia = this.noticias.find((n) => n.id === this.editingNoticia.id);
        if (noticia) {
          Object.assign(noticia, { ...data });
        }
        this.showMessage('Noticia actualizada correctamente', 'success');
      } else {
        this.noticias.push({
          id: nextId++,
          ...data
        });
        this.showMessage('Noticia agregada correctamente', 'success');
      }
      this.persist();
      this.cancelEdit();
    },
    editNoticia(noticia) {
      this.editingNoticia = noticia;
      this.noticiaForm = {
        imagen: noticia.imagen,
        titulo: noticia.titulo,
        resumen: noticia.resumen,
        autor: noticia.autor,
        fechaInput: toDateInputValue(noticia.fecha)
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    cancelEdit() {
      this.editingNoticia = null;
      this.noticiaForm = {
        imagen: '',
        titulo: '',
        resumen: '',
        autor: '',
        fechaInput: ''
      };
    },
    deleteNoticia(id) {
      if (!confirm('¿Está seguro de eliminar esta noticia?')) return;
      this.noticias = this.noticias.filter((n) => n.id !== id);
      this.persist();
      this.showMessage('Noticia eliminada', 'success');
      if (this.editingNoticia && this.editingNoticia.id === id) {
        this.cancelEdit();
      }
    },
    persist() {
      saveNoticias(this.noticias);
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
