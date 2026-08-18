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

    <div class="hero-overlay"></div>

    <div class="hero-content-main" :key="activeSlide">
      <h1 class="hero-main-title">
        {{ activeSlideData.titulo }}<br>
        <span class="highlight">{{ activeSlideData.titulo_highlight }}</span>
      </h1>
      <p class="hero-main-subtitle">{{ activeSlideData.subtitulo }}</p>
      <div class="hero-main-actions">
        <button class="hero-cta-primary" type="button" @click="$router.push(activeSlideData.cta_enlace || '/equipo-medico')">
          {{ activeSlideData.cta_texto || 'Conoce Nuestro Equipo Medico' }} <span>→</span>
        </button>
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
        'center 28%',
        'center center'
      ],
      bannerSizes: [
        'cover',
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
      if (this.bannerSlides.length <= 1) return;
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
/* ── Base carousel ── */
.hero-carousel {
  position: relative;
  min-height: 820px;
  overflow: hidden;
  background: #123f3c;
}

.hero-slides {
  position: absolute;
  inset: 0;
}

.hero-slide {
  position: absolute;
  inset: -20px;
  opacity: 0;
  transition: opacity 0.8s ease, filter 0.8s ease;
  background-repeat: no-repeat;
  backface-visibility: hidden;
  /* Focal Point: radial mask que difumina bordes y centra la atencion */
  -webkit-mask-image: radial-gradient(ellipse 85% 80% at 55% 45%, black 40%, transparent 100%);
  mask-image: radial-gradient(ellipse 85% 80% at 55% 45%, black 40%, transparent 100%);
  /* Background Blur en slides inactivos */
  filter: blur(6px) brightness(0.85);
}

.hero-slide.active {
  opacity: 1;
  filter: blur(0px) brightness(1);
  animation-duration: 8s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

/* Ken Burns Effect: zoom suave + pan que le da vida cinematica */
@keyframes kenBurns {
  0% {
    transform: scale(1) translate(0, 0);
  }
  50% {
    transform: scale(1.08) translate(-1%, -0.5%);
  }
  100% {
    transform: scale(1.04) translate(0.5%, 0.3%);
  }
}

@keyframes kenBurns2 {
  0% {
    transform: scale(1.05) translate(1%, 0);
  }
  50% {
    transform: scale(1) translate(-0.5%, 0.8%);
  }
  100% {
    transform: scale(1.08) translate(0%, -0.3%);
  }
}

@keyframes kenBurns3 {
  0% {
    transform: scale(1) translate(0.5%, -0.5%);
  }
  50% {
    transform: scale(1.06) translate(-0.8%, 0.5%);
  }
  100% {
    transform: scale(1.02) translate(0.3%, -0.2%);
  }
}

@keyframes kenBurns4 {
  0% {
    transform: scale(1.03) translate(-0.5%, 0.3%);
  }
  50% {
    transform: scale(1) translate(0.8%, -0.6%);
  }
  100% {
    transform: scale(1.07) translate(-0.2%, 0.4%);
  }
}

.hero-slide-0.active { animation-name: kenBurns; }
.hero-slide-1.active { animation-name: kenBurns2; }
.hero-slide-2.active { animation-name: kenBurns3; }
.hero-slide-3.active { animation-name: kenBurns4; }

/* ── Vignette + gradient overlay (multi-capa para profundidad) ── */
.hero-slide::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    /* Capa 1: vignette radial oscuro en bordes */
    radial-gradient(ellipse at 60% 50%, transparent 0%, transparent 20%, rgba(10, 40, 38, 0.15) 50%, rgba(10, 40, 38, 0.35) 80%, rgba(8, 30, 28, 0.5) 100%),
    /* Capa 2: gradient lateral izquierdo para texto legible */
    linear-gradient(90deg, rgba(10, 40, 38, 0.45) 0%, rgba(10, 40, 38, 0.2) 30%, rgba(10, 40, 38, 0.05) 55%, transparent 75%),
    /* Capa 3: gradient inferior para dots y navegacion */
    linear-gradient(0deg, rgba(8, 25, 23, 0.45) 0%, rgba(8, 25, 23, 0.1) 25%, transparent 45%),
    /* Capa 4: sutil tinte color corporativo */
    linear-gradient(135deg, rgba(18, 63, 60, 0.08) 0%, transparent 60%);
  pointer-events: none;
}

/* ── Static overlay ── */
.hero-overlay {
  position: absolute;
  inset: 0;
  min-height: 820px;
  z-index: 1;
}

/* ── Text content ── */
.hero-content-main {
  position: relative;
  z-index: 2;
  max-width: 1180px;
  width: 100%;
  margin: 0 auto;
  padding: 150px 56px 90px;
  animation: heroTextIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes heroTextIn {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-main-title {
  margin: 0;
  color: #ffffff;
  font-size: clamp(2.4rem, 4.6vw, 4rem);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.01em;
  max-width: 580px;
  min-height: 3.2em;
  text-shadow:
    0 2px 8px rgba(18, 63, 60, 0.25),
    0 4px 24px rgba(18, 63, 60, 0.15);
}

.highlight {
  color: #82c8c1;
  text-shadow:
    0 1px 4px rgba(18, 63, 60, 0.20),
    0 2px 12px rgba(66, 168, 161, 0.18);
}

.hero-main-subtitle {
  margin: 18px 0 0;
  color: rgba(255, 255, 255, 0.92);
  max-width: 520px;
  font-size: 1.08rem;
  line-height: 1.65;
  font-weight: 500;
  text-shadow: 0 1px 6px rgba(18, 63, 60, 0.18);
}

.hero-main-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 26px;
}

.hero-cta-primary {
  min-height: 44px;
  padding: 0 24px;
  border-radius: 5px;
  border: 0;
  font-weight: 800;
  cursor: pointer;
  background: #42a8a1;
  color: #ffffff;
  box-shadow: 0 10px 24px rgba(11, 131, 176, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.hero-cta-primary:hover {
  background: #123f3c;
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(18, 63, 60, 0.30);
}

/* ── Arrows ── */
.hero-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  color: #42a8a1;
  border: 1px solid #e6f5f4;
  box-shadow: 0 10px 24px rgba(66, 168, 161, 0.12);
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 18px;
}

.hero-arrow.left {
  left: 18px;
}

.hero-arrow.right {
  right: 18px;
}

.hero-arrow:hover {
  background: #42a8a1;
  color: #ffffff;
  border-color: #42a8a1;
  transform: translateY(-50%) scale(1.08);
}

/* ── Dots ── */
.hero-dots {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  gap: 10px;
}

.hero-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.40);
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero-dot.active {
  background: #ffffff;
  transform: scale(1.3);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .hero-carousel,
  .hero-overlay {
    min-height: 540px;
  }

  .hero-content-main {
    padding: 118px 24px 42px;
  }

  .hero-main-actions {
    flex-direction: column;
    align-items: flex-start;
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

  .hero-slide {
    background-position: 58% center !important;
    -webkit-mask-image: radial-gradient(ellipse 90% 75% at 58% 45%, black 35%, transparent 100%);
    mask-image: radial-gradient(ellipse 90% 75% at 58% 45%, black 35%, transparent 100%);
  }
}
</style>
