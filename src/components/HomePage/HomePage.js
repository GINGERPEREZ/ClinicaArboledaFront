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
      
      // Especialidades médicas - Sincronizadas con EquipoMedico
      especialidadesMedicas: [
        { 
          id: 1, 
          nombre: 'Medicina Crítica', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3z"></path><path d="M12 8v8M8 12h8"></path></svg>', 
          medicos: 5 
        },
        { 
          id: 2, 
          nombre: 'Ortopedia y Traumatología', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 4a3 3 0 0 0-3 3v4H9V7a3 3 0 0 0-6 0v13h6v-6h6v6h6V7a3 3 0 0 0-3-3z"></path></svg>', 
          medicos: 3 
        },
        { 
          id: 3, 
          nombre: 'Neumonología', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11c0-3.5-3-6-6-6v16c3 0 6-2.5 6-6zm0 0c1.5-1 3.5-1 6 0m0 0c0 3.5 3 6 6 6V5c-3 0-6 2.5-6 6z"></path></svg>', 
          medicos: 1 
        },
        { 
          id: 4, 
          nombre: 'Gastroenterología', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2h8v7a4 4 0 0 1-8 0V2z"></path><path d="M12 9v13"></path></svg>', 
          medicos: 1 
        },
        { 
          id: 5, 
          nombre: 'Cirugía General', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>', 
          medicos: 2 
        },
        { 
          id: 6, 
          nombre: 'Pediatría', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 1 0-16 0"></path></svg>', 
          medicos: 3 
        },
        { 
          id: 7, 
          nombre: 'Cirugía Pediátrica', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>', 
          medicos: 1 
        },
        { 
          id: 8, 
          nombre: 'Anestesiología y Reanimación', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path></svg>', 
          medicos: 4 
        },
        { 
          id: 9, 
          nombre: 'Ginecología y Obstetricia', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>', 
          medicos: 2 
        },
        { 
          id: 10, 
          nombre: 'Medicina Interna', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>', 
          medicos: 1 
        },
        { 
          id: 11, 
          nombre: 'Psiquiatría', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path><path d="M8 10h.01M16 10h.01M9 16s1 2 3 2 3-2 3-2"></path></svg>', 
          medicos: 1 
        },
        { 
          id: 12, 
          nombre: 'Imagenología', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>', 
          medicos: 1 
        },
        { 
          id: 13, 
          nombre: 'Cardiología', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>', 
          medicos: 2 
        },
        { 
          id: 14, 
          nombre: 'Angiología y Cirugía Vascular', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>', 
          medicos: 1 
        },
        { 
          id: 15, 
          nombre: 'Cirugía Oncológica', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>', 
          medicos: 1 
        },
        { 
          id: 16, 
          nombre: 'Neurología', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>', 
          medicos: 1 
        },
        { 
          id: 17, 
          nombre: 'Nefrología', 
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>', 
          medicos: 1 
        },
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

      // Indicadores NPS (Net Promoter Score)
      indicadoresNPS: {
        fecha: 'Diciembre 2025',
        satisfaccion: {
          porcentaje: 87.80,
          label: 'Índice Satisfacción'
        },
        recomendacion: {
          porcentaje: 90.60,
          label: 'Índice Recomendación'
        },
        detractores: {
          porcentaje: 2.20,
          label: 'Detractores'
        }
      },
      
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
