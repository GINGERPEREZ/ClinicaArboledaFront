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
        { id: 1,  nombre: 'Medicina Crítica',              icon: 'https://cdn-icons-png.flaticon.com/128/4331/4331766.png', medicos: 5 },
        { id: 2,  nombre: 'Ortopedia y Traumatología',     icon: 'https://cdn-icons-png.flaticon.com/128/3103/3103961.png', medicos: 3 },
        { id: 3,  nombre: 'Neumología',                    icon: 'https://cdn-icons-png.flaticon.com/128/4811/4811081.png', medicos: 1 },
        { id: 4,  nombre: 'Gastroenterología',             icon: 'https://cdn-icons-png.flaticon.com/128/387/387626.png',  medicos: 1 },
        { id: 5,  nombre: 'Cirugía General',               icon: 'https://cdn-icons-png.flaticon.com/128/139/139269.png',  medicos: 2 },
        { id: 6,  nombre: 'Pediatría',                     icon: 'https://cdn-icons-png.flaticon.com/128/6558/6558482.png', medicos: 3 },
        { id: 7,  nombre: 'Cirugía Pediátrica',            icon: 'https://cdn-icons-png.flaticon.com/128/2885/2885141.png', medicos: 1 },
        { id: 8,  nombre: 'Anestesiología y Reanimación',  icon: 'https://cdn-icons-png.flaticon.com/128/1021/1021562.png', medicos: 4 },
        { id: 9,  nombre: 'Ginecología y Obstetricia',     icon: 'https://cdn-icons-png.flaticon.com/128/941/941497.png',  medicos: 2 },
        { id: 10, nombre: 'Medicina Interna',              icon: 'https://cdn-icons-png.flaticon.com/128/12436/12436264.png', medicos: 1 },
        { id: 11, nombre: 'Psiquiatría',                   icon: 'https://cdn-icons-png.flaticon.com/128/2013/2013188.png', medicos: 1 },
        { id: 12, nombre: 'Imagenología',                  icon: 'https://cdn-icons-png.flaticon.com/128/2044/2044715.png', medicos: 1 },
        { id: 13, nombre: 'Cardiología',                   icon: 'https://cdn-icons-png.flaticon.com/128/8358/8358611.png', medicos: 2 },
        { id: 14, nombre: 'Angiología y Cirugía Vascular', icon: 'https://cdn-icons-png.flaticon.com/128/1364/1364702.png', medicos: 1 },
        { id: 15, nombre: 'Cirugía Oncológica',            icon: 'https://cdn-icons-png.flaticon.com/128/8684/8684535.png', medicos: 1 },
        { id: 16, nombre: 'Neurología',                    icon: 'https://cdn-icons-png.flaticon.com/128/1753/1753205.png', medicos: 1 },
        { id: 17, nombre: 'Nefrología',                    icon: 'https://cdn-icons-png.flaticon.com/128/2204/2204369.png', medicos: 1 },
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
