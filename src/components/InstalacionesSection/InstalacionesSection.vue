<template>
  <section class="instalaciones-section" :class="{ embedded }">
    <div class="instalaciones-container">
      <p class="instalaciones-subtitle">Nuestras</p>
      <h2 class="instalaciones-title">Instalaciones</h2>
      <p class="instalaciones-description">
        Contamos con instalaciones modernas y equipadas con tecnología de vanguardia 
        para brindarte la mejor atención médica en un ambiente cómodo y seguro.
      </p>
      
      <div class="instalaciones-grid">
        <div 
          v-for="(instalacion, index) in instalaciones" 
          :key="index" 
          class="instalacion-card"
        >
          <div class="instalacion-image-wrapper">
            <img 
              :src="instalacion.imagen" 
              :alt="instalacion.nombre"
              class="instalacion-image"
              @error="handleImageError"
            />
            <div class="instalacion-overlay">
              <h3 class="instalacion-nombre">{{ instalacion.nombre }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="./InstalacionesSection.js"></script>
<style src="./InstalacionesSection.css"></style>
