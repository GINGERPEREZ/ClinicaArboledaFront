import apiClient from '@/services/api';
import { getImageUrl } from '@/config/api';
import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";
import FooterAnth from "../FooterAnth/FooterAnth.vue";
import InstalacionesSection from "../InstalacionesSection/InstalacionesSection.vue";
import HomeBannerCarousel from "./HomeBannerCarousel.vue";

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
      noticiasPreview: [
        {
          id: 1,
          autor: 'Admin',
          fecha: '01 / 03 / 2026',
          titulo: 'Prevencion y bienestar familiar',
          resumen: 'Recomendaciones para fortalecer habitos de salud y prevencion en toda la familia.',
          imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/1.jpg'
        },
        {
          id: 2,
          autor: 'Admin',
          fecha: '05 / 03 / 2026',
          titulo: 'Nuevas areas de atencion',
          resumen: 'Conoce los espacios renovados para consultas y procedimientos con mayor comodidad.',
          imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Ginecologia.jpg'
        },
        {
          id: 3,
          autor: 'Admin',
          fecha: '10 / 03 / 2026',
          titulo: 'Avances en tecnologia medica',
          resumen: 'Equipamiento y tecnologia de apoyo para diagnosticos mas precisos y oportunos.',
          imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Equipos.jpg'
        }
      ],
      
      // Especialidades médicas - Sincronizadas con EquipoMedico
      especialidadesMedicas: [
        { id: 1,  nombre: 'Medicina Crítica',              icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-5 4 10 2-5h6"/><path d="M12 21C7 17 4 14 4 10a4 4 0 0 1 7-2.6A4 4 0 0 1 18 10c0 4-3 7-6 11z"/></svg>`, medicos: 5 },
        { id: 2,  nombre: 'Ortopedia y Traumatología',     icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v18"/><path d="M15 3v18"/><path d="M7 7h10"/><path d="M7 17h10"/><path d="M5 12h14"/></svg>`, medicos: 3 },
        { id: 3,  nombre: 'Neumología',                    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16"/><path d="M12 10c-2-3-5-4-7-1-1 2-1 8 2 10 2 1 4-1 5-4"/><path d="M12 10c2-3 5-4 7-1 1 2 1 8-2 10-2 1-4-1-5-4"/></svg>`, medicos: 1 },
        { id: 4,  nombre: 'Gastroenterología',             icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3c4 2 7 5 6 9-.8 3-3.2 4-5.5 4"/><path d="M9 21c5-1 8-4 8-9 0-4-3-7-7-9"/><path d="M7 8c2 1 3 3 2 5"/></svg>`,  medicos: 1 },
        { id: 5,  nombre: 'Cirugía General',               icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20 20 4"/><path d="M14 4h6v6"/><path d="M4 16l4 4"/></svg>`,  medicos: 2 },
        { id: 6,  nombre: 'Pediatría',                     icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3"/><path d="M6 21c1-4 3-6 6-6s5 2 6 6"/><path d="M8 11c-2 1-3 2-3 4"/><path d="M16 11c2 1 3 2 3 4"/></svg>`, medicos: 3 },
        { id: 7,  nombre: 'Cirugía Pediátrica',            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3"/><path d="M6 21c1-4 3-6 6-6s5 2 6 6"/><path d="M4 5h5"/><path d="M6.5 2.5v5"/></svg>`, medicos: 1 },
        { id: 8,  nombre: 'Anestesiología y Reanimación',  icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h6l6 6-9 9-6-6 3-9z"/><path d="M14 7 7 14"/><path d="m17 10 3 3"/></svg>`, medicos: 4 },
        { id: 9,  nombre: 'Ginecología y Obstetricia',     icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M12 12v9"/><path d="M8 17h8"/></svg>`,  medicos: 2 },
        { id: 10, nombre: 'Medicina Interna',              icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v7a4 4 0 0 0 8 0V3"/><path d="M12 14v4a3 3 0 0 0 6 0v-2"/><circle cx="18" cy="14" r="2"/></svg>`, medicos: 1 },
        { id: 11, nombre: 'Psiquiatría',                   icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M8 14c-2-1-3-3-3-6a7 7 0 0 1 14 0c0 3-1 5-3 6"/><path d="M9 10c1-2 5-2 6 0"/></svg>`, medicos: 1 },
        { id: 12, nombre: 'Imagenología',                  icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>`, medicos: 1 },
        { id: 13, nombre: 'Cardiología',                   icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-5 4 10 2-5h6"/><path d="M19 6c-2-2-5-1-7 2-2-3-5-4-7-2"/></svg>`, medicos: 2 },
        { id: 14, nombre: 'Angiología y Cirugía Vascular', icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M12 8c-3 0-5 2-5 5"/><path d="M12 8c3 0 5 2 5 5"/><path d="M12 14c-2 0-3 1-3 3"/><path d="M12 14c2 0 3 1 3 3"/></svg>`, medicos: 1 },
        { id: 15, nombre: 'Cirugía Oncológica',            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/><path d="m5 5 2 2"/><path d="m17 17 2 2"/><path d="m19 5-2 2"/><path d="m7 17-2 2"/></svg>`, medicos: 1 },
        { id: 16, nombre: 'Neurología',                    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v1a3 3 0 0 0 5 2"/><path d="M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 0 6v1a3 3 0 0 1-5 2"/><path d="M12 5v14"/></svg>`, medicos: 1 },
        { id: 17, nombre: 'Nefrología',                    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4c-4 2-5 8-2 12 2 3 5 1 5-2V8c0-3-1-5-3-4z"/><path d="M15 4c4 2 5 8 2 12-2 3-5 1-5-2V8c0-3 1-5 3-4z"/></svg>`, medicos: 1 },
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


