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
      conveniosDragging: false,
      conveniosTimer: null,
      arrastreX: 0,
      arrastreScroll: 0,
      statsObserver: null,
      statsRafId: null,
      statsIniciados: false,
      statsAnimados: {
        medicos: 0,
        satisfaccion: 0,
        pacientes: 0,
        aseguradoras: 0,
      },

      // Noticias recientes para preview en home
      noticiasPreview: loadNoticias().slice(0, 3),
      
      // Especialidades médicas - Sincronizadas con EquipoMedico
      especialidadesMedicas: [
        { id: 1,  nombre: 'Medicina Crítica',              icon: '/IC-Especialidades/IC_medicina-critica.png', medicos: 5 },
        { id: 2,  nombre: 'Ortopedia y Traumatología',     icon: '/IC-Especialidades/IC_ortopedia.png', medicos: 3 },
        { id: 3,  nombre: 'Neumología',                    icon: '/IC-Especialidades/IC_neumonologia.png', medicos: 1 },
        { id: 4,  nombre: 'Gastroenterología',             icon: '/IC-Especialidades/IC_gastroenterologia.png', medicos: 1 },
        { id: 5,  nombre: 'Cirugía General',               icon: '/IC-Especialidades/IC_cirugia-general.png', medicos: 2 },
        { id: 6,  nombre: 'Pediatría',                     icon: '/IC-Especialidades/IC_pediatria.png', medicos: 3 },
        { id: 7,  nombre: 'Cirugía Pediátrica',            icon: '/IC-Especialidades/IC_cirugia-pediatrica.png', medicos: 1 },
        { id: 8,  nombre: 'Anestesiología y Reanimación',  icon: '/IC-Especialidades/IC_anestesiologia.png', medicos: 4 },
        { id: 9,  nombre: 'Ginecología y Obstetricia',     icon: '/IC-Especialidades/IC_ginecologia.png', medicos: 2 },
        { id: 10, nombre: 'Medicina Interna',              icon: '/IC-Especialidades/IC_medicina-interna.png', medicos: 1 },
        { id: 11, nombre: 'Psiquiatría',                   icon: '/IC-Especialidades/IC_psiquiatria.png', medicos: 1 },
        { id: 12, nombre: 'Imagenología',                  icon: '/IC-Especialidades/IC_imagenologia.png', medicos: 1 },
        { id: 13, nombre: 'Cardiología',                   icon: '/IC-Especialidades/IC_cardiologia.png', medicos: 2 },
        { id: 14, nombre: 'Angiología y Cirugía Vascular', icon: '/IC-Especialidades/IC_angiologia.png', medicos: 1 },
        { id: 15, nombre: 'Cirugía Oncológica',            icon: '/IC-Especialidades/IC_cirugia-oncologica.png', medicos: 1 },
        { id: 16, nombre: 'Neurología',                    icon: '/IC-Especialidades/IC_neurologia.png', medicos: 1 },
        { id: 17, nombre: 'Nefrología',                    icon: '/IC-Especialidades/IC_nefrologia.png', medicos: 1 },
      ],

      // Convenios públicos y privados
      conveniosLogos: [
        { id: 'publico-1', nombre: 'ISSFA', logo: '/Logos/Convenios/ISSFA.jpg' },
        { id: 'publico-2', nombre: 'ISSPOL', logo: '/Logos/Convenios/ISSPOL.png' },
        { id: 'publico-3', nombre: 'Ministerio de Salud Pública', logo: '/Logos/Convenios/MSP.png' },
        { id: 'privado-1', nombre: 'AIG Metropolitana', logo: '/Logos/Convenios/AIG.jpg' },
        { id: 'privado-2', nombre: 'Aseguradora del Sur', logo: '/Logos/Convenios/aseguradoradelsur.jpg' },
        { id: 'privado-3', nombre: 'Asisken', logo: '/Logos/Convenios/asisken.jpg' },
        { id: 'privado-4', nombre: 'BMI Seguros', logo: '/Logos/Convenios/BMI.png' },
        { id: 'privado-5', nombre: 'Chubb Seguros', logo: '/Logos/Convenios/chubb.png' },
        { id: 'privado-6', nombre: 'Confiamed', logo: '/Logos/Convenios/Confiamed.jpg' },
        { id: 'privado-7', nombre: 'Ecuasanitas', logo: '/Logos/Convenios/ecuasanitas.png' },
        { id: 'privado-8', nombre: 'Equivida', logo: '/Logos/Convenios/equivida.png' },
        { id: 'privado-9', nombre: 'Latina Seguros', logo: '/Logos/Convenios/Latina.jpg' },
        { id: 'privado-10', nombre: 'Liberty Seguros', logo: '/Logos/Convenios/liberty.png' },
        { id: 'privado-11', nombre: 'Mapfre', logo: '/Logos/Convenios/mapfre.svg' },
        { id: 'privado-12', nombre: 'Oriente Seguros', logo: '/Logos/Convenios/oriente.png' },
        { id: 'privado-13', nombre: 'Saludsa', logo: '/Logos/Convenios/saludsa.png' },
        { id: 'privado-14', nombre: 'Seguros Equinoccial', logo: '/Logos/Convenios/Equinoccial.png' },
        { id: 'privado-15', nombre: 'Seguros Sucre', logo: '/Logos/Convenios/SegurosSucre.avif' },
        { id: 'privado-16', nombre: 'Zurich Seguros', logo: '/Logos/Convenios/zurich.png' },
      ],

      // Servicios destacados
      serviciosDestacados: [
        {
          id: 1,
          nombre: 'Hospitalización',
          descripcion: 'Contamos con habitaciones cómodas y seguras equipadas con tecnología médica de última generación para tu recuperación.',
          imagen: '/Servicios/opt/Hospitalizacion.jpg'
        },
        {
          id: 2,
          nombre: 'Óptica',
          descripcion: 'Servicio integral de salud visual con los mejores especialistas y equipos de diagnóstico para cuidar tu visión.',
          imagen: '/Servicios/opt/Optica1.jpg'
        },
        {
          id: 3,
          nombre: 'Pediatría',
          descripcion: 'Atención especializada para el cuidado y desarrollo de tus hijos, con un equipo médico dedicado exclusivamente a los más pequeños.',
          imagen: '/Servicios/opt/Pediatrico2.jpg'
        },
        {
          id: 4,
          nombre: 'Imagenología',
          descripcion: 'Realizamos estudios diagnósticos por imagen con equipos modernos y personal capacitado para una atención precisa y oportuna.',
          imagen: '/Servicios/opt/Imagenologia1.jpg'
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
        { valor: '20+', label: 'Profesionales Médicos' },
        { valor: '4.8*', label: 'Satisfacción' },
        { valor: '1.000+', label: 'Pacientes atendidos al mes' },
        { valor: '19', label: 'Aseguradoras aliadas' }
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
    this.$nextTick(() => {
      this.centrarCarruselConvenios();
      const slider = this.$refs.conveniosSlider;
      if (slider) {
        slider.addEventListener('scroll', this.ajustarLoopConvenios);
      }
      window.addEventListener('resize', this.centrarCarruselConvenios);
      this.iniciarAutoplayConvenios();
      this.configurarObserverIndicadores();
    });
  },
  beforeUnmount() {
    this.detenerCarruselNoticias();
    this.detenerAutoplayConvenios();
    if (this.statsObserver) {
      this.statsObserver.disconnect();
      this.statsObserver = null;
    }
    if (this.statsRafId) {
      cancelAnimationFrame(this.statsRafId);
      this.statsRafId = null;
    }
    const slider = this.$refs.conveniosSlider;
    if (slider) {
      slider.removeEventListener('scroll', this.ajustarLoopConvenios);
    }
    window.removeEventListener('resize', this.centrarCarruselConvenios);
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
    // Triplicamos los logos para lograr un carrusel infinito al arrastrar
    conveniosLogosInfinite() {
      return [...this.conveniosLogos, ...this.conveniosLogos, ...this.conveniosLogos];
    },
    totalAseguradoras() {
      return this.conveniosLogos.length;
    },
    medicosTexto() {
      return Math.round(this.statsAnimados.medicos) + '+';
    },
    satisfaccionTexto() {
      return this.statsAnimados.satisfaccion.toFixed(1) + '+';
    },
    pacientesTexto() {
      return Math.round(this.statsAnimados.pacientes).toLocaleString('es-EC') + '+';
    },
    aseguradorasTexto() {
      return String(Math.round(this.statsAnimados.aseguradoras));
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
      }, 5500);
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
    configurarObserverIndicadores() {
      const stats = this.$refs.statsSection;
      if (!stats) return;
      if (!('IntersectionObserver' in window)) {
        this.statsAnimados = { medicos: 20, satisfaccion: 4.8, pacientes: 1000, aseguradoras: 19 };
        return;
      }
      this.statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.statsIniciados) {
            this.statsIniciados = true;
            this.animarIndicadores();
            this.statsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.35 });
      this.statsObserver.observe(stats);
    },
    animarIndicadores() {
      const duracion = 2000;
      const inicio = performance.now();
      const finales = { medicos: 20, satisfaccion: 4.8, pacientes: 1000, aseguradoras: 19 };
      const paso = (ahora) => {
        const progreso = Math.min((ahora - inicio) / duracion, 1);
        const easing = 1 - Math.pow(1 - progreso, 3);
        this.statsAnimados.medicos = finales.medicos * easing;
        this.statsAnimados.satisfaccion = finales.satisfaccion * easing;
        this.statsAnimados.pacientes = finales.pacientes * easing;
        this.statsAnimados.aseguradoras = finales.aseguradoras * easing;
        if (progreso < 1) {
          this.statsRafId = requestAnimationFrame(paso);
        }
      };
      this.statsRafId = requestAnimationFrame(paso);
    },
    iniciarAutoplayConvenios() {
      this.detenerAutoplayConvenios();
      if (this.conveniosLogos.length <= 1) return;
      this.conveniosTimer = window.setInterval(() => {
        this.avanzarConvenios();
      }, 3500);
    },
    detenerAutoplayConvenios() {
      if (this.conveniosTimer) {
        window.clearInterval(this.conveniosTimer);
        this.conveniosTimer = null;
      }
    },
    avanzarConvenios() {
      const slider = this.$refs.conveniosSlider;
      if (!slider || this.conveniosDragging) return;
      if (slider.clientWidth >= slider.scrollWidth) return;
      const copia = slider.scrollWidth / 3;
      if (copia <= 0) return;
      const item = slider.querySelector('.convenio-logo-item');
      if (!item) return;
      const step = item.getBoundingClientRect().width + 22;

      let base = slider.scrollLeft;
      if (base >= copia * 2) {
        this.saltarPosicionConvenios(slider, copia);
        base = copia;
      }

      const destino = base + step;
      if (destino >= copia * 2) {
        this.saltarPosicionConvenios(slider, copia);
        slider.scrollTo({ left: copia + (destino - copia * 2), behavior: 'smooth' });
      } else {
        slider.scrollTo({ left: destino, behavior: 'smooth' });
      }
    },
    saltarPosicionConvenios(slider, posicion) {
      const previo = slider.style.scrollBehavior;
      slider.style.scrollBehavior = 'auto';
      slider.scrollLeft = posicion;
      slider.style.scrollBehavior = previo;
    },
    iniciarArrastreConvenios(event) {
      const slider = this.$refs.conveniosSlider;
      if (!slider) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;

      this.detenerAutoplayConvenios();
      this.conveniosDragging = true;
      this.arrastreX = event.clientX;
      this.arrastreScroll = slider.scrollLeft;
      slider.style.scrollBehavior = 'auto';
      try {
        slider.setPointerCapture(event.pointerId);
      } catch (error) {
        // El puntero puede no ser capturable en algunos navegadores
      }
      event.preventDefault();
    },
    moverArrastreConvenios(event) {
      if (!this.conveniosDragging) return;
      const slider = this.$refs.conveniosSlider;
      if (!slider) return;
      const delta = event.clientX - this.arrastreX;
      slider.scrollLeft = this.arrastreScroll - delta;
    },
    finalizarArrastreConvenios() {
      if (!this.conveniosDragging) return;
      this.conveniosDragging = false;
      const slider = this.$refs.conveniosSlider;
      if (slider) {
        slider.style.scrollBehavior = '';
      }
      this.ajustarLoopConvenios();
      this.iniciarAutoplayConvenios();
    },
    ajustarLoopConvenios() {
      const slider = this.$refs.conveniosSlider;
      if (!slider) return;
      const copia = slider.scrollWidth / 3;
      if (copia <= 0 || slider.clientWidth >= slider.scrollWidth) return;

      if (slider.scrollLeft < copia) {
        this.saltarPosicionConvenios(slider, slider.scrollLeft + copia);
      } else if (slider.scrollLeft >= copia * 2) {
        this.saltarPosicionConvenios(slider, slider.scrollLeft - copia);
      }
    },
    centrarCarruselConvenios() {
      const slider = this.$refs.conveniosSlider;
      if (!slider) return;
      const copia = slider.scrollWidth / 3;
      if (copia <= 0) return;
      this.saltarPosicionConvenios(slider, copia);
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


