import apiClient from '@/services/api';
import { getImageUrl } from '@/config/api';
import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";
import FooterAnth from "../FooterAnth/FooterAnth.vue";
import InstalacionesSection from "../InstalacionesSection/InstalacionesSection.vue";
import HomeBannerCarousel from "./HomeBannerCarousel.vue";
import { loadNoticias } from '@/utils/contentStore';

export default {
  name: "HomePage",
  components: {
    HeaderAnth,
    FooterAnth,
    InstalacionesSection,
    HomeBannerCarousel,
  },
  data() {
    return {
      productos: [],
      productosMostrados: [],
      searchQuery: "",
      isAuthenticated: false,
      limiteProductos: 10,
      selectedPriceRange: "",
      totalMedicos: 418,
      noticiaActivaIndex: 0,
      noticiaCarouselTimer: null,

      // Noticias recientes para preview en home
      noticiasPreview: loadNoticias().slice(0, 3),
      
      // Especialidades médicas - Sincronizadas con EquipoMedico
      especialidadesMedicas: [
        { id: 1,  nombre: 'Medicina Crítica',              icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="19" height="12.5" rx="2"/><path d="M6 10.2h2.6l1.5-3.1 2.2 6.2 1.5-3.1H18"/><path d="M12 16.5V20"/><path d="M8.5 20h7"/></svg>`, medicos: 5 },
        { id: 2,  nombre: 'Ortopedia y Traumatología',     icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6.9" cy="14.6" r="2.1"/><circle cx="9.3" cy="17" r="2.1"/><circle cx="17.1" cy="9.4" r="2.1"/><circle cx="14.7" cy="7" r="2.1"/><path d="M9.1 14.9 11.3 12.7"/><path d="M12.9 11.1 15.1 8.9"/><path d="m11.3 12.7 1.1-.1-.6-1 1.1-.5"/></svg>`, medicos: 3 },
        { id: 3,  nombre: 'Neumología',                    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5v9"/><path d="M9.5 6.5h5"/><path d="M12 12.5c0-1.7-1.1-3.2-2.7-3.8-1.5-.6-3.2 0-3.9 1.5-1.1 2.3-1.4 5.1-.8 7.6.3 1.3 1.7 2.1 3 1.7 1.9-.5 3.3-2.2 3.4-4.2z"/><path d="M12 12.5c0-1.7 1.1-3.2 2.7-3.8 1.5-.6 3.2 0 3.9 1.5 1.1 2.3 1.4 5.1.8 7.6-.3 1.3-1.7 2.1-3 1.7-1.9-.5-3.3-2.2-3.4-4.2z"/></svg>`, medicos: 1 },
        { id: 4,  nombre: 'Gastroenterología',             icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.8 3.5h3.4"/><path d="M8.5 3.5v2.6c-2.6 1-4.3 3.5-4.3 6.4 0 3.6 2.9 6.5 6.5 6.5 2.6 0 4.6-1.6 4.6-3.9 0-2-1.3-3.2-3-4-1.5-.7-2.3-1.4-2.3-2.9V3.5"/><path d="m15.2 14.8 2.9 1.3"/></svg>`,  medicos: 1 },
        { id: 5,  nombre: 'Cirugía General',               icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3c-3 .3-5.7 1.6-7.8 3.7l-2.6 2.6 4.1 4.1 2.6-2.6C19.4 8.7 20.7 6 21 3z"/><path d="M10.6 9.3 3.9 16a2.1 2.1 0 0 0 0 3l1.1 1.1a2.1 2.1 0 0 0 3 0l6.7-6.7"/><path d="m7.6 12.3 1.6 1.6"/><path d="m5.6 14.3 1.6 1.6"/></svg>`,  medicos: 2 },
        { id: 6,  nombre: 'Pediatría',                     icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.6" cy="5.6" r="2.7"/><path d="M3.4 21v-6.4a4.2 4.2 0 0 1 8.4 0V21"/><circle cx="16.8" cy="10.4" r="2.2"/><path d="M13.4 21v-4.8a3.4 3.4 0 0 1 6.8 0V21"/></svg>`, medicos: 3 },
        { id: 7,  nombre: 'Cirugía Pediátrica',            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21.6 2.4c-2.3.3-4.4 1.3-6 2.9l-2 2 3.1 3.1 2-2c1.6-1.6 2.6-3.7 2.9-6z"/><path d="M13.9 10 4.4 19.5"/><path d="m7.2 16.7 1.5 1.5"/><path d="m9.1 14.8 1.5 1.5"/><path d="M2.9 2.9 18.4 16.4"/><path d="M2.9 2.9 16.4 18.4"/></svg>`, medicos: 1 },
        { id: 8,  nombre: 'Anestesiología y Reanimación',  icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>`, medicos: 4 },
        { id: 9,  nombre: 'Ginecología y Obstetricia',     icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 8.5c0 2.6 1 4.2 2.1 5.2.8.7 1.4 1.6 1.4 2.7v4.1"/><path d="M15.5 8.5c0 2.6-1 4.2-2.1 5.2"/><path d="M8.5 8.5c-.5-1.6-1.9-2.6-3.4-2.6"/><path d="M15.5 8.5c.5-1.6 1.9-2.6 3.4-2.6"/><ellipse cx="3.6" cy="5.7" rx="1.7" ry="1.3"/><ellipse cx="20.4" cy="5.7" rx="1.7" ry="1.3"/><path d="M9.8 20.5h4.4"/></svg>`,  medicos: 2 },
        { id: 10, nombre: 'Medicina Interna',              icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 3H4a1.5 1.5 0 0 0-1.5 1.5v4.7a5.5 5.5 0 0 0 11 0V4.5A1.5 1.5 0 0 0 12 3h-.5"/><path d="M8 14.7v1.6a5 5 0 0 0 10 0v-3.4"/><circle cx="18" cy="10.5" r="2.3"/></svg>`, medicos: 1 },
        { id: 11, nombre: 'Psiquiatría',                   icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16.2 20.8v-2.3c0-.6.3-1.1.8-1.5A7.4 7.4 0 0 0 12 3.6 7.4 7.4 0 0 0 4.6 11c0 1-.3 1.6-.9 2.2l-.6.7c-.5.5-.2 1.3.4 1.4l1.6.3v2.5a2.7 2.7 0 0 0 2.7 2.7z"/><path d="M12 16.2c-2.1-1.5-3.4-2.7-3.4-4.3 0-1.3 1-2.3 2.3-2.3.5 0 1 .2 1.4.6"/><path d="M12 16.2c2.1-1.5 3.4-2.7 3.4-4.3 0-1.3-1-2.3-2.3-2.3-.5 0-1 .2-1.4.6"/></svg>`, medicos: 1 },
        { id: 12, nombre: 'Imagenología',                  icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.4" r="2.2"/><path d="M6.6 21v-8.4A5.4 5.4 0 0 1 12 7.2a5.4 5.4 0 0 1 5.4 5.4V21"/><path d="M12 10.4v8.2"/><path d="M9.5 12.6h5"/><path d="M9 15.1h6"/><path d="M9.5 17.6h5"/></svg>`, medicos: 1 },
        { id: 13, nombre: 'Cardiología',                   icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.7C7.4 16.9 3.8 14 3.8 10.1A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 8.2 2.5c0 3.9-3.6 6.8-8.2 10.6z"/><path d="M6.2 11.9h2.4l1.3-2.4 2 4.5 1.3-2.7h3.5"/></svg>`, medicos: 2 },
        { id: 14, nombre: 'Angiología y Cirugía Vascular', icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.6"/><circle cx="10.3" cy="10.5" r="1.25"/><circle cx="13.8" cy="12.1" r="1.25"/><circle cx="10.9" cy="14" r="1.25"/></svg>`, medicos: 1 },
        { id: 15, nombre: 'Cirugía Oncológica',            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10.5a4 4 0 1 1 4 0"/><path d="M10 10.5 14.6 20"/><path d="M14 10.5 9.4 20"/></svg>`, medicos: 1 },
        { id: 16, nombre: 'Neurología',                    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16.2 20.8v-2.3c0-.6.3-1.1.8-1.5A7.4 7.4 0 0 0 12 3.6 7.4 7.4 0 0 0 4.6 11c0 1-.3 1.6-.9 2.2l-.6.7c-.5.5-.2 1.3.4 1.4l1.6.3v2.5a2.7 2.7 0 0 0 2.7 2.7z"/><path d="M12 8.2v6.4"/><path d="M12 8.2a2.6 2.6 0 0 0-4.3 1.4 2.1 2.1 0 0 0 .3 3.4 2.3 2.3 0 0 0 4 1.6"/><path d="M12 8.2a2.6 2.6 0 0 1 4.3 1.4 2.1 2.1 0 0 1-.3 3.4 2.3 2.3 0 0 1-4 1.6"/></svg>`, medicos: 1 },
        { id: 17, nombre: 'Nefrología',                    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8.6 4.5C6 4.5 4 7.7 4 11.8s2 7.3 4.6 7.3c1.3 0 2-.9 2-2.1 0-1.6-1.2-2.5-1.2-4.1s1.2-2.4 1.2-4c0-1.3-.7-2.1-2-2.1z"/><path d="M15.4 4.5c2.6 0 4.6 3.2 4.6 7.3s-2 7.3-4.6 7.3c-1.3 0-2-.9-2-2.1 0-1.6 1.2-2.5 1.2-4.1s-1.2-2.4-1.2-4c0-1.3.7-2.1 2-2.1z"/></svg>`, medicos: 1 },
      ],

      // Servicios destacados
      serviciosDestacados: [
        {
          id: 1,
          nombre: 'Hospitalización',
          descripcion: 'Contamos con habitaciones cómodas y seguras equipadas con tecnología médica de última generación para tu recuperación.',
          imagen: '/Servicios/Hospitalizacion.jpg'
        },
        {
          id: 2,
          nombre: 'Óptica',
          descripcion: 'Servicio integral de salud visual con los mejores especialistas y equipos de diagnóstico para cuidar tu visión.',
          imagen: '/Servicios/Optica1.jpg'
        },
        {
          id: 3,
          nombre: 'Pediatría',
          descripcion: 'Atención especializada para el cuidado y desarrollo de tus hijos, con un equipo médico dedicado exclusivamente a los más pequeños.',
          imagen: '/Servicios/Pediatrico2.jpg'
        },
        {
          id: 4,
          nombre: 'Imagenología',
          descripcion: 'Realizamos estudios diagnósticos por imagen con equipos modernos y personal capacitado para una atención precisa y oportuna.',
          imagen: '/Servicios/Imagenologia1.jpg'
        }
      ],

      // Médicos destacados para mostrar en tarjetas
      medicosDestacados: [
        {
          id: 1,
          nombre: 'ROCIO DE LOS ANGELES GALARZA MOSCOSO',
          especialidad: 'MEDICINA INTERNA / CUIDADOS INTENSIVOS / SOPORTE METABÓLICO Y TERAPIA NUTRICIONAL',
          imagen: '/Productos/placeholder_product.png',
          telefono: '+593-99-999-9999'
        },
        {
          id: 2,
          nombre: 'ROCIO DE LAS MERCEDES YEROVI SANTOS',
          especialidad: 'CUIDADOS INTENSIVOS PEDIÁTRICOS / PEDIATRÍA',
          imagen: '/Productos/placeholder_product.png',
          telefono: '+593-99-999-9999'
        },
        {
          id: 3,
          nombre: 'JOSE ANTONIO DAZA MERIZALDE',
          especialidad: 'CIRUGÍA PEDIÁTRICA',
          imagen: '/Productos/placeholder_product.png',
          telefono: '+593-99-999-9999'
        },
        {
          id: 4,
          nombre: 'JOSE GONZALO ROMERO MOLINA',
          especialidad: 'DERMATOLOGÍA',
          imagen: '/Productos/placeholder_product.png',
          telefono: '+593-99-999-9999'
        }
      ],

      // Indicadores destacados
      indicadoresResumen: [
        { valor: '22', label: 'Especialistas' },
        { valor: '8200+', label: 'Clientes Felices' },
        { valor: '12', label: 'Camas' },
        { valor: '100%', label: 'Satisfacción' }
      ],
      
      // Mapeo de especialidades (para compatibilidad)
      categoriaMapping: {
        'Cardiología': ['Cardiólogo'],
        'Pediatría': ['Pediatra'],
        'Traumatología': ['Traumatólogo'],
        'Ginecología': ['Ginecólogo'],
        'Neurología': ['Neurólogo'],
        'Dermatología': ['Dermatólogo'],
      },
    };
  },
  async created() {
    this.isAuthenticated = !!localStorage.getItem("access_token");

    try {
      // Cargar Productos (Médicos)
      const productosResponse = await apiClient.get('/tienda/productos');
      // La API devuelve { data: [...], total, page, limit, totalPages }
      const productosArray = productosResponse.data.data || productosResponse.data;
      this.productos = productosArray.map((producto) => {
        // Obtener la ruta de la imagen (principal o primera disponible)
        let rutaImagen = '/Productos/placeholder-product.png';
        if (producto.productImages?.length > 0) {
          const imagenPrincipal = producto.productImages.find(img => img.es_principal);
          rutaImagen = imagenPrincipal?.ruta_imagen || producto.productImages[0].ruta_imagen;
        } else if (producto.media?.length > 0) {
          rutaImagen = producto.media[0].url;
        } else if (producto.imagen_url) {
          rutaImagen = producto.imagen_url;
        }
        
        return {
          ...producto,
          imagen_url: getImageUrl(rutaImagen)
        };
      });
      
      console.log('Total de productos cargados:', this.productos.length);
      console.log('Ejemplo de producto:', this.productos[0]);
      
      // Debug: Ver categorías únicas
      const categoriasUnicas = [...new Set(this.productos.map(p => p.categoria).filter(Boolean))];
      console.log('Categorías únicas encontradas:', categoriasUnicas);
      
      // Procesar la búsqueda inicial DESPUÉS de cargar productos (si existe)
      const search = this.$route.query.search;
      if (search) {
        this.searchQuery = search;
        this.buscarProductos(search);
      } else {
        this.cargarMasProductos();
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  },
  mounted() {
    this.iniciarCarruselNoticias();
  },
  beforeUnmount() {
    this.detenerCarruselNoticias();
  },
  computed: {
    // Orden alfabetico por nombre. Se ordena aqui y no en el array de datos
    // para no tocar los ids, que se usan como :key.
    // localeCompare con 'es' hace que las tildes no alteren el orden
    // (Cardiologia antes que Cirugia, Neumologia antes que Neurologia).
    especialidadesOrdenadas() {
      return [...this.especialidadesMedicas].sort((a, b) =>
        a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
      );
    },
    productosDestacados() {
      if (!this.productos || this.productos.length === 0) return [];

      const destacados = this.productos.filter((p) => p.destacado);
      const base = destacados.length > 0 ? destacados : this.productos;

      // Tomamos los primeros 8 para la grilla de destacados
      return base.slice(0, 8);
    },
  },
  methods: {
    iniciarCarruselNoticias() {
      this.detenerCarruselNoticias();
      if (this.noticiasPreview.length <= 1) return;
      this.noticiaCarouselTimer = window.setInterval(() => {
        this.nextNoticia(false);
      }, 5000);
    },
    detenerCarruselNoticias() {
      if (this.noticiaCarouselTimer) {
        window.clearInterval(this.noticiaCarouselTimer);
        this.noticiaCarouselTimer = null;
      }
    },
    seleccionarNoticia(index) {
      this.noticiaActivaIndex = index;
      this.iniciarCarruselNoticias();
    },
    nextNoticia(reiniciar = true) {
      if (!this.noticiasPreview.length) return;
      this.noticiaActivaIndex = (this.noticiaActivaIndex + 1) % this.noticiasPreview.length;
      if (reiniciar) this.iniciarCarruselNoticias();
    },
    prevNoticia() {
      if (!this.noticiasPreview.length) return;
      this.noticiaActivaIndex = (this.noticiaActivaIndex - 1 + this.noticiasPreview.length) % this.noticiasPreview.length;
      this.iniciarCarruselNoticias();
    },
    irAEquipoMedico(especialidad) {
      this.$router.push({
        path: '/equipo-medico',
        query: { especialidad: especialidad.nombre },
      });
    },
    aplicarFiltros() {
      const query = this.searchQuery.trim().toLowerCase();

      let lista = [...this.productos];

      // Filtrado por rango de precio
      if (this.selectedPriceRange) {
        lista = lista.filter((producto) => {
          const precio = Number(producto.costoTotal ?? 0);
          if (this.selectedPriceRange === "low") {
            return precio < 100;
          }
          if (this.selectedPriceRange === "mid") {
            return precio >= 101 && precio <= 399;
          }
          if (this.selectedPriceRange === "high") {
            return precio >= 400;
          }
          return true;
        });
      }

      // Filtrado por texto
      if (query !== "") {
        lista = lista.filter(
          (producto) => {
            const nombre = (producto.producto || "").toLowerCase();
            const marca = (producto.marca || "").toLowerCase();
            const medida = (producto.medida || "").toLowerCase();
            const almacen = (producto.almacen || "").toLowerCase();
            const codigo = String(producto.codigo || "").toLowerCase();
            
            return nombre.includes(query) ||
                   marca.includes(query) ||
                   medida.includes(query) ||
                   almacen.includes(query) ||
                   codigo.includes(query);
          }
        );
      }

      if (query !== "" || this.selectedPriceRange) {
        // Cuando hay filtros activos, mostramos toda la lista filtrada
        this.productosMostrados = lista;
      } else {
        // Sin filtros, aplicamos paginación básica
        this.productosMostrados = lista.slice(0, this.limiteProductos);
      }
    },
    cargarMasProductos() {
      if (this.searchQuery.trim() !== "" || this.selectedPriceRange) return;

      const siguienteBloque = this.productos.slice(
        this.productosMostrados.length,
        this.productosMostrados.length + this.limiteProductos
      );

      this.productosMostrados = [...this.productosMostrados, ...siguienteBloque];
    },
    verDetalle(codigo) {
      // Funcionalidad de detalle de producto deshabilitada
      console.log('Ver detalle deshabilitado para código:', codigo);
    },
    handleImageError(event) {
      // Prevenir loop infinito: solo cambiar si no es ya el placeholder
      if (!event.target.dataset.fallback) {
        event.target.dataset.fallback = 'true';
        event.target.src = '/placeholder_product.jpg';
      }
    },
    buscarProductos(query) {
      this.buscarMedicos(query);
    },
    buscarMedicos(query) {
      this.searchQuery = (query || '').trim();
      this.aplicarFiltros();
      // Scroll al inicio para ver los resultados
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    cambiarRangoPrecio(rango) {
      this.selectedPriceRange = rango;
      this.aplicarFiltros();
    },
    cerrarSesion() {
      localStorage.removeItem("access_token");
      this.isAuthenticated = false;
      this.$router.replace("/login");
    },
    redirigirLogin() {
      this.$router.push("/login");
    },
    navegarACategoria(nombreCategoria) {
      // Navegar a la página de productos por categoría
      this.$router.push({ 
        name: 'ProductosPorCategoria', 
        params: { categoria: nombreCategoria } 
      });
    },
    agregarAlCarrito(producto) {
      if (!producto) return;

      // Obtener carrito del localStorage
      let carrito = [];
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
      }

      // Verificar si el producto ya está en el carrito
      const productoExistente = carrito.find(p => p.codigo === producto.codigo);
      
      if (productoExistente) {
        // Aumentar cantidad
        productoExistente.cantidad++;
        alert('Cantidad actualizada en el carrito');
      } else {
        // Agregar nuevo producto
        carrito.push({
          codigo: producto.codigo,
          producto: producto.producto,
          marca: producto.marca,
          costoTotal: producto.costoTotal,
          cantidad: 1,
          imagen_url: producto.imagen_url,
          medida: producto.medida
        });
        alert('Producto agregado al carrito');
      }

      // Guardar en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
    },
    filtrarPorCategoria(nombreCategoria) {
      this.filtrarPorEspecialidad(nombreCategoria);
    },
    filtrarPorEspecialidad(nombreEspecialidad) {
      // Convertir el nombre de especialidad a slug (minúsculas sin espacios)
      const especialidadSlug = nombreEspecialidad.toLowerCase().replace(/\s+/g, '-');
      
      // Navegar a la página de médicos por especialidad
      this.$router.push({ 
        path: '/productos', 
        query: { especialidad: especialidadSlug } 
      });
    },
    agendarCita(medico) {
      if (!medico) return;
      // Por ahora mostrar alerta, luego se puede implementar un modal de citas
      alert(`Agendar cita con: ${medico.producto}`);
    },
    getProductosPorCategoria(nombreCategoria) {
      // Intentar encontrar productos cuya marca coincida (insensible a mayúsculas)
      let productosFiltrados = this.productos.filter((producto) =>
        producto.marca?.toLowerCase() === nombreCategoria.toLowerCase()
      );

      // Si no hay coincidencia exacta, probar coincidencia parcial en la marca
      if (productosFiltrados.length === 0) {
        productosFiltrados = this.productos.filter((producto) =>
          producto.marca?.toLowerCase().includes(nombreCategoria.toLowerCase())
        );
      }

      // Si aún así no hay productos para esa marca, usamos un fallback
      if (productosFiltrados.length === 0) {
        productosFiltrados = this.productos.slice(0, 6);
      }

      // Agregar ventas "simuladas" y ranking para mostrar como más vendidos
      productosFiltrados = productosFiltrados.map((producto, index) => ({
        ...producto,
        ventas: Math.floor(Math.random() * 500) + 100,
        ranking: index + 1,
      }));

      // Ordenar por ventas y tomar los top 3 para la tarjeta
      return productosFiltrados
        .sort((a, b) => b.ventas - a.ventas)
        .slice(0, 3);
    },
    
    // Métodos para médicos destacados
    verPerfilMedico(medico) {
      // Navegar al detalle del médico (si existe en productos)
      const medicoEncontrado = this.productos.find(p => 
        p.producto?.toLowerCase().includes(medico.nombre.toLowerCase())
      );
      if (medicoEncontrado) {
        this.verDetalle(medicoEncontrado.codigo);
      } else {
        alert(`Ver perfil de ${medico.nombre}`);
      }
    },
    
    llamarMedico(medico) {
      // Abrir el teléfono del sistema con el número del médico
      if (medico.telefono) {
        window.location.href = `tel:${medico.telefono}`;
      } else {
        alert('Número de teléfono no disponible');
      }
    },
    
    teleConsulta(medico) {
      alert(`Iniciar teleconsulta con ${medico.nombre}`);
    },
  },
};


