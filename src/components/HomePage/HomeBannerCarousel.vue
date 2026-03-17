<template>
  <section class="hero-carousel" aria-label="Banner principal">
    <div class="hero-slides">
      <div
        v-for="(image, index) in bannerImages"
        :key="image"
        class="hero-slide"
        :class="{ active: activeSlide === index }"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
    </div>

    <div class="hero-overlay">
      <div class="hero-content-main">
        <h1 class="hero-main-title">Amor desde<br>el <span class="highlight">primer latido.</span></h1>
        <p class="hero-main-subtitle">Cuidamos de tu salud y la de tu familia con los mejores especialistas</p>
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
import { homeBannerImages } from './homeBannerImages';

export default {
  name: 'HomeBannerCarousel',
  data() {
    return {
      bannerImages: homeBannerImages,
      activeSlide: 0,
      intervalId: null
    };
  },
  mounted() {
    this.startAutoPlay();
  },
  beforeUnmount() {
    this.stopAutoPlay();
  },
  methods: {
    startAutoPlay() {
      if (this.bannerImages.length <= 1) {
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
      this.activeSlide = (this.activeSlide + 1) % this.bannerImages.length;
    },
    prevSlide() {
      this.activeSlide = (this.activeSlide - 1 + this.bannerImages.length) % this.bannerImages.length;
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
  transform: scale(1.02);
  transition: opacity 0.8s ease, transform 0.8s ease;
  background-size: cover;
  background-position: center;
}

.hero-slide::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(18, 56, 52, 0.62) 0%, rgba(18, 56, 52, 0.32) 45%, rgba(18, 56, 52, 0.22) 100%);
}

.hero-slide.active {
  opacity: 1;
  transform: scale(1);
}

.hero-overlay {
  position: relative;
  z-index: 2;
  min-height: 520px;
  display: flex;
  align-items: center;
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
</style>
