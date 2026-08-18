import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';
import { loadNoticias } from '@/utils/contentStore';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default {
  name: 'NoticiasPage',
  components: {
    HeaderAnth,
    FooterAnth,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      isAuthenticated: false,
      noticias: loadNoticias(),
      swiperModules: [Autoplay, Pagination],
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 6500,
          disableOnInteraction: false
        },
        pagination: {
          clickable: true
        },
        breakpoints: {
          600: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          960: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        }
      }
    };
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem('access_token');
      this.isAuthenticated = false;
      this.$router.replace('/login');
    }
  },
  mounted() {
    this.isAuthenticated = !!localStorage.getItem('access_token');
    window.scrollTo(0, 0);
  }
};
