<template>
  <section class="hero-carousel" aria-label="Banner principal">
    <div class="hero-slides">
      <div
        v-for="(image, index) in bannerImages"
        :key="image"
        class="hero-slide"
        :class="[{ active: activeSlide === index }, `hero-slide-${index}`]"
        :style="{
          backgroundImage: `url(${image})`,
          backgroundPosition: bannerPositions[index] || 'center center',
          backgroundSize: bannerSizes[index] || 'cover'
        }"
      ></div>
    </div>

    <div class="hero-overlay">
      <div class="hero-content-main">
        <h1 class="hero-main-title">{{ activeSlideData.titulo }}<br><span class="highlight">{{ activeSlideData.titulo_highlight }}</span></h1>
        <p class="hero-main-subtitle">{{ activeSlideData.subtitulo }}</p>
        <div class="hero-main-actions">
          <button class="hero-cta-primary" type="button" @click="$router.push('/equipo-medico')">Conoce Nuestro Equipo Medico <span>→</span></button>
        </div>
      </div>
    </div>

    <button class="hero-arrow left" @click="prevSlide" aria-label="Banner anterior">&#10094;</button>
    <button class="hero-arrow right" @click="nextSlide" aria-label="Siguiente banner">&#10095;</button>

    <div class="hero-dots">
      <button
        v-for="(image, index) in bannerImages"
        :key="`dot-${image}`"
        class="hero-dot"
        :class="{ active: activeSlide === index }"
        @click="setSlide(index)"
        :aria-label="`Ir al banner ${index + 1}`"
      ></button>
    </div>
  </section>
</template>

<script>
import { loadCarouselSlides } from '@/utils/contentStore';

export default {
  name: 'HomeBannerCarousel',
  data() {
    return {
      bannerSlides: loadCarouselSlides(),
      bannerPositions: [
        'center 12%',
        'center 42%',
        'center 28%'
      ],
      bannerSizes: [
        'cover',
        'cover',
        'cover'
      ],
      activeSlide: 0,
      intervalId: null
    };
  },
  computed: {
    bannerImages() {
      return this.bannerSlides.map((slide) => slide.imagen);
    },
    activeSlideData() {
      const slide = this.bannerSlides[this.activeSlide];
      return slide || { titulo: '', titulo_highlight: '', subtitulo: '' };
    }
  },
  mounted() {
    this.startAutoPlay();
  },
  beforeUnmount() {
    this.stopAutoPlay();
  },
  methods: {
    startAutoPlay() {
      if (this.bannerSlides.length <= 1) {
        return;
      }
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, 5500);
    },
    stopAutoPlay() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    },
    nextSlide() {
      if (!this.bannerSlides.length) return;
      this.activeSlide = (this.activeSlide + 1) % this.bannerSlides.length;
    },
    prevSlide() {
      if (!this.bannerSlides.length) return;
      this.activeSlide = (this.activeSlide - 1 + this.bannerSlides.length) % this.bannerSlides.length;
    },
    setSlide(index) {
      this.activeSlide = index;
    }
  }
};
</script>

<style scoped>
.hero-carousel {
  position: relative;
  min-height: 520px;
  overflow: hidden;
}

.hero-slides,
.hero-slide {
  position: absolute;
  inset: 0;
}

.hero-slide {
  opacity: 0;
    transform: none;
    transition: opacity 0.8s ease;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: scroll;
    backface-visibility: hidden;
    will-change: opacity;
  }

  .hero-slide::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(18, 56, 52, 0.62) 0%, rgba(18, 56, 52, 0.32) 45%, rgba(18, 56, 52, 0.22) 100%);
  }

  .hero-slide.active {
    opacity: 1;
}

.hero-content-main {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 56px;
}

.hero-main-title {
  margin: 0;
  color: #ffffff;
  font-size: clamp(2rem, 4vw, 3.3rem);
  line-height: 1.08;
  font-weight: 700;
}

.highlight {
  color: #82c8c1;
}

.hero-main-subtitle {
  margin: 18px 0 0;
  color: rgba(255, 255, 255, 0.92);
  max-width: 560px;
  font-size: 1.1rem;
  line-height: 1.6;
}

.hero-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  border: none;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.22);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.hero-arrow.left {
  left: 18px;
}

.hero-arrow.right {
  right: 18px;
}

.hero-arrow:hover {
  background: rgba(255, 255, 255, 0.35);
}

.hero-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  gap: 8px;
}

.hero-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.45);
  cursor: pointer;
}

.hero-dot.active {
  background: #ffffff;
}

@media (max-width: 768px) {
  .hero-carousel,
  .hero-overlay {
    min-height: 420px;
  }

  .hero-content-main {
    padding: 0 22px;
  }

  .hero-arrow {
    width: 36px;
    height: 36px;
  }

  .hero-arrow.left {
    left: 10px;
  }

  .hero-arrow.right {
    right: 10px;
  }
}


/* Ajuste superior tipo referencia: imagen clara y paleta azul */
.hero-carousel {
  min-height: 560px;
  background: #ffffff;
}

.hero-slide {
  background-position: center right;
  filter: saturate(0.98) contrast(0.96) brightness(1.08);
}

.hero-slide::after {
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.96) 0%, rgba(232, 251, 252, 0.82) 34%, rgba(232, 251, 252, 0.34) 62%, rgba(232, 251, 252, 0.08) 100%);
}

.hero-overlay {
  min-height: 560px;
}

.hero-content-main {
  padding: 92px 56px 56px;
}

.hero-main-title {
  color: #123f3c;
  font-size: clamp(2.4rem, 4.4vw, 4.05rem);
  font-weight: 800;
  letter-spacing: 0;
  max-width: 560px;
}

.highlight {
  color: #42a8a1;
}

.hero-main-subtitle {
  color: #123f3c;
  max-width: 520px;
  font-size: 1.08rem;
  font-weight: 500;
}

.hero-arrow {
  background: rgba(255, 255, 255, 0.92);
  color: #42a8a1;
  border: 1px solid #e6f5f4;
  box-shadow: 0 10px 24px rgba(66, 168, 161, 0.18);
}

.hero-arrow:hover {
  background: #42a8a1;
  color: #ffffff;
}

.hero-dot {
  background: rgba(66, 168, 161, 0.28);
}

.hero-dot.active {
  background: #42a8a1;
}

@media (max-width: 768px) {
  .hero-carousel,
  .hero-overlay {
    min-height: 460px;
  }

  .hero-content-main {
    padding: 96px 26px 42px;
  }
}



/* Correccion home superior segun referencia */
.hero-carousel {
  min-height: 560px;
  background: #ffffff;
  margin-top: 0;
}

.hero-slide {
  background-position: center right;
  filter: saturate(0.88) contrast(0.94) brightness(1.1);
}

.hero-slide::after {
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 27%, rgba(232, 251, 252, 0.55) 48%, rgba(232, 251, 252, 0.16) 72%, rgba(255, 255, 255, 0.02) 100%);
}

.hero-overlay {
  min-height: 560px;
  align-items: center;
}

.hero-content-main {
  max-width: 1180px;
  padding: 118px 56px 54px;
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  margin: 0 0 16px;
  padding: 7px 14px;
  border-radius: 999px;
  background: #e6f5f4;
  color: #42a8a1;
  font-size: 0.82rem;
  font-weight: 800;
}

.hero-main-title {
  color: #123f3c;
  font-size: clamp(2.4rem, 4.6vw, 4rem);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: 0;
  max-width: 560px;
}

.highlight {
  color: #42a8a1;
}

.hero-main-subtitle {
  color: #123f3c;
  max-width: 500px;
  margin-top: 18px;
  font-size: 1rem;
  line-height: 1.65;
  font-weight: 500;
}

.hero-main-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 26px;
}

.hero-cta-primary,
.hero-cta-secondary {
  min-height: 44px;
  padding: 0 24px;
  border-radius: 5px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.hero-cta-primary {
  border: 0;
  background: #42a8a1;
  color: #ffffff;
  box-shadow: 0 10px 24px rgba(11, 131, 176, 0.25);
}

.hero-cta-primary:hover {
  background: #123f3c;
  transform: translateY(-2px);
}

.hero-cta-secondary {
  border: 1px solid #e6f5f4;
  background: #ffffff;
  color: #123f3c;
  box-shadow: 0 10px 22px rgba(66, 168, 161, 0.1);
}

.hero-cta-secondary:hover {
  background: #ffffff;
  transform: translateY(-2px);
}

.hero-arrow {
  background: rgba(255, 255, 255, 0.86);
  color: #42a8a1;
  border: 1px solid #e6f5f4;
  box-shadow: 0 10px 24px rgba(66, 168, 161, 0.12);
}

.hero-arrow:hover {
  background: #42a8a1;
  color: #ffffff;
}

.hero-dot {
  background: rgba(66, 168, 161, 0.26);
}

.hero-dot.active {
  background: #42a8a1;
}

@media (max-width: 768px) {
  .hero-carousel,
  .hero-overlay {
    min-height: 500px;
  }

  .hero-content-main {
    padding: 118px 24px 42px;
  }

  .hero-main-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}



/* Compactar hero al quitar CTA duplicado */
.hero-carousel {
  min-height: 470px;
}

.hero-overlay {
  min-height: 470px;
}

.hero-content-main {
  padding-top: 92px;
  padding-bottom: 44px;
}

.hero-slide {
  background-position: 62% center;
}

@media (max-width: 768px) {
  .hero-carousel,
  .hero-overlay {
    min-height: 430px;
  }
}



/* Mostrar imagen completa del hero */
.hero-carousel {
  min-height: 520px;
  background: linear-gradient(90deg, #ffffff 0%, #ffffff 100%);
}

.hero-overlay {
  min-height: 520px;
}

.hero-slide {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right center;
  filter: saturate(0.95) contrast(0.98) brightness(1.04);
}

.hero-slide::after {
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(232, 251, 252, 0.34) 48%, rgba(255, 255, 255, 0.02) 100%);
}

.hero-content-main {
  padding-top: 96px;
  padding-bottom: 48px;
}

@media (max-width: 768px) {
  .hero-carousel,
  .hero-overlay {
    min-height: 500px;
  }

  .hero-slide {
    background-size: cover;
    background-position: 58% center;
  }
}



/* Foto del hero tipo ejemplo: cubierta completa con overlay azul */
.hero-carousel {
  min-height: 640px;
  background: #123f3c;
}

.hero-overlay {
  min-height: 640px;
}

.hero-slide {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  filter: saturate(1.06) contrast(1.05) brightness(1.03);
}

.hero-slide::after {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(11, 131, 176, 0.16) 52%, rgba(18, 63, 60, 0.28) 100%),
    linear-gradient(90deg, rgba(18, 63, 60, 0.46) 0%, rgba(11, 131, 176, 0.22) 42%, rgba(232, 251, 252, 0.04) 100%);
}

.hero-main-title,
.highlight,
.hero-main-subtitle {
  color: #ffffff;
}

.hero-kicker {
  background: rgba(232, 251, 252, 0.88);
  color: #42a8a1;
}

.hero-dot {
  background: rgba(255, 255, 255, 0.6);
}

.hero-dot.active {
  background: #ffffff;
}

@media (max-width: 768px) {
  .hero-carousel,
  .hero-overlay {
    min-height: 540px;
  }

  .hero-slide {
    background-position: 58% center;
  }
}



/* Hero mas alto para mostrar rostros de la foto */
.hero-carousel {
  min-height: 720px;
}

.hero-overlay {
  min-height: 720px;
}

.hero-slide {
  background-position: center 34%;
}

.hero-content-main {
  padding-top: 128px;
  padding-bottom: 70px;
}

@media (max-width: 768px) {
  .hero-carousel,
  .hero-overlay {
    min-height: 600px;
  }

  .hero-slide {
    background-position: 58% 32%;
  }
}



/* Hero mas grande y encuadre para rostros */
.hero-carousel {
  min-height: 820px;
}

.hero-overlay {
  min-height: 820px;
}

.hero-slide {
  background-position: center 12%;
}

.hero-content-main {
  padding-top: 150px;
  padding-bottom: 90px;
}

@media (max-width: 768px) {
  .hero-carousel,
  .hero-overlay {
    min-height: 660px;
  }

  .hero-slide {
    background-position: 56% 12%;
  }
}



/* Fondo para banners verticales que usan contain */
.hero-slide {
  background-color: #123f3c;
}






/* Hero mas ancho hacia abajo sin mover metricas manualmente */
.hero-carousel {
  min-height: 1020px;
}

.hero-overlay {
  min-height: 1020px;
  background: transparent;
}

.hero-content-main {
  padding-top: 170px;
  padding-bottom: 180px;
}

@media (max-width: 768px) {
  .hero-carousel,
  .hero-overlay {
    min-height: 780px;
  }
}

</style>



