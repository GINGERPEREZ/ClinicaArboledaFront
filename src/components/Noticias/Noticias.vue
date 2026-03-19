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

        <div class="noticias-grid">
          <article v-for="item in noticias" :key="item.id" class="noticia-card">
            <div class="noticia-image-wrapper">
              <img :src="item.imagen" :alt="item.titulo" class="noticia-image" />
            </div>

            <div class="noticia-body">
              <p class="noticia-meta">{{ item.autor }} | {{ item.fecha }}</p>
              <h2 class="noticia-card-title">{{ item.titulo }}</h2>
              <p class="noticia-card-text">{{ item.resumen }}</p>
              <a href="#" class="noticia-readmore" @click.prevent>Leer mas</a>
            </div>
          </article>
        </div>
      </section>
    </main>

    <FooterAnth />
  </div>
</template>

<script src="./Noticias.js"></script>
<style src="./Noticias.css"></style>