import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';
import { loadNoticias } from '@/utils/contentStore';

export default {
  name: 'NoticiasPage',
  components: {
    HeaderAnth,
    FooterAnth
  },
  data() {
    return {
      isAuthenticated: false,
      currentIndex: 0,
      isTransitioning: true,
      cardWidth: 0,
      slideInterval: null,
      noticias: loadNoticias()
    };
  },
  computed: {
    loopedNoticias() {
      return [...this.noticias, ...this.noticias];
    },
    trackStyle() {
      return {
        transform: `translateX(-${this.currentIndex * this.cardWidth}px)`,
        transition: this.isTransitioning ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
      };
    }
  },
  methods: {
    computeCardWidth() {
      const wrapper = this.$refs.sliderWrapper;
      if (!wrapper) return;
      const w = wrapper.offsetWidth;
      if (w < 600) {
        this.cardWidth = w;
      } else if (w < 960) {
        this.cardWidth = w / 2;
      } else {
        this.cardWidth = w / 3;
      }
    },
    startAutoSlide() {
      this.slideInterval = setInterval(this.nextSlide, 6500);
    },
    nextSlide() {
      this.isTransitioning = true;
      this.currentIndex++;
      if (this.currentIndex >= this.noticias.length) {
        setTimeout(() => {
          this.isTransitioning = false;
          this.currentIndex = 0;
          this.$nextTick(() => {
            this.isTransitioning = true;
          });
        }, 650);
      }
    },
    goToSlide(index) {
      clearInterval(this.slideInterval);
      this.isTransitioning = true;
      this.currentIndex = index;
      this.startAutoSlide();
    },
    cerrarSesion() {
      localStorage.removeItem('access_token');
      this.isAuthenticated = false;
      this.$router.replace('/login');
    }
  },
  mounted() {
    this.isAuthenticated = !!localStorage.getItem('access_token');
    this.$nextTick(() => {
      this.computeCardWidth();
    });
    this.startAutoSlide();
    window.addEventListener('resize', this.computeCardWidth);
    window.scrollTo(0, 0);
  },
  beforeUnmount() {
    clearInterval(this.slideInterval);
    window.removeEventListener('resize', this.computeCardWidth);
  }
};

