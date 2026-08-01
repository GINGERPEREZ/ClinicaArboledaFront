<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="noticias-page-container">
    <HeaderAnth :isAuthenticated="isAuthenticated" @cerrar-sesion="cerrarSesion" />

    <main class="noticias-page-content">
      <section class="noticias-section">
        <div class="noticias-header">
          <p class="noticias-kicker">Noticias</p>
          <h1 class="noticias-title">Nuestras Ultimas Novedades</h1>
          <p class="noticias-description">
            Informate sobre avances, servicios y novedades de Clinica Arboleda.
          </p>
        </div>

        <div class="noticias-slider-outer">
          <div class="noticias-slider-wrapper" ref="sliderWrapper">
            <div class="noticias-slider-track" :style="trackStyle">
              <article
                v-for="(item, idx) in loopedNoticias"
                :key="`${item.id}-${idx}`"
                class="noticia-card"
                :style="{ width: cardWidth + 'px' }"
              >
                <div class="noticia-card-inner">
                  <div class="noticia-image-wrapper">
                    <img :src="item.imagen" :alt="item.titulo" class="noticia-image" />
                  </div>
                  <div class="noticia-body">
                    <p class="noticia-meta">{{ item.autor }} | {{ item.fecha }}</p>
                    <h2 class="noticia-card-title">{{ item.titulo }}</h2>
                    <p class="noticia-card-text">{{ item.resumen }}</p>
                    <a href="#" class="noticia-readmore" @click.prevent>Leer mas →</a>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div class="noticias-dots">
            <span
              v-for="i in noticias.length"
              :key="i"
              :class="['dot', { active: (currentIndex % noticias.length) === i - 1 }]"
              @click="goToSlide(i - 1)"
            ></span>
          </div>
        </div>
      </section>
    </main>

    <FooterAnth />
  </div>
</template>

<script src="./Noticias.js"></script>
<style src="./Noticias.css"></style>
