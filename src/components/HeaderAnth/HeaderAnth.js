export default {
    name: "HeaderAnth",
    props: {
      isAuthenticated: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        isVisible: false, // Control de visibilidad para animación
        isScrolled: false, // Control de transparencia del header
        showProductsMenu: false, // Control del menú desplegable de productos
        showHospitalMenu: false, // Control del menú Hospital
        showServiciosMenu: false, // Control del menú Servicios
        cantidadCarrito: 0, // Cantidad de productos en el carrito
        isAdmin: false,
        isVendedor: false,
        currentLogo: '/Logos/Logo1.png', // Logo actual según color de énfasis
      };
    },
    computed: {
      isHomePage() {
        // Detectar si estamos en la página de inicio
        return this.$route.path === '/' || this.$route.path === '/home';
      }
    },
    watch: {
      '$route'() {
        // Actualizar el estado del scroll cuando cambia la ruta
        this.handleScroll();
      }
    },
    mounted() {
      // Iniciar la animación tras montar el componente
      setTimeout(() => {
        this.isVisible = true;
      }, 100);
      // Cargar cantidad del carrito
      this.actualizarCantidadCarrito();
      // Verificar rol del usuario
      this.checkUserRole();
      // Determinar el logo según el color de énfasis
      this.updateLogoBasedOnTheme();
      // Establecer estado inicial del header según la página actual
      this.handleScroll();
      // Agregar listener de scroll para header transparente
      window.addEventListener('scroll', this.handleScroll);
      // Escuchar cambios en los colores de énfasis
      window.addEventListener('storage', this.handleStorageChange);
      window.addEventListener('colors-updated', this.handleColorsUpdated);
    },
    beforeUnmount() {
      // Limpiar listener de scroll
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('storage', this.handleStorageChange);
      window.removeEventListener('colors-updated', this.handleColorsUpdated);
    },
    //metodos llamados para navegacion y busqueda
  methods: {
      handleScroll() {
        // Detectar si el usuario ha bajado más de 50px
        // Solo aplicar lógica de scroll en la página de inicio
        if (this.isHomePage) {
          this.isScrolled = window.scrollY > 50;
        } else {
          // En otras páginas, siempre mostrar el header sólido
          this.isScrolled = true;
        }
      },
      cerrarSesion() {
        this.$emit("cerrar-sesion");
      },
      goToLogin() {
        this.$router.push("/login");
      },
      goToRegister() {
        this.$router.push("/registro");
      },
      goToCategorias() {
        // Funcionalidad de categorías deshabilitada
        console.log('Categorías deshabilitadas');
      },
      goToCarrito() {
        this.$router.push("/carrito");
      },
      goToPerfil() {
        this.$router.push("/perfil");
      },
      goToAdminPanel() {
        this.$router.push("/admin/panel");
      },
      goToPanelVendedores() {
        this.$router.push("/panel-vendedores");
      },
      checkUserRole() {
        const role = localStorage.getItem('user_rol');
        this.isAdmin = role === 'administrador';
        this.isVendedor = role === 'vendedor';
      },
      actualizarCantidadCarrito() {
        const carrito = localStorage.getItem("carrito");
        if (carrito) {
          const productos = JSON.parse(carrito);
          this.cantidadCarrito = productos.reduce((total, item) => total + item.cantidad, 0);
        }
      },
      updateLogoBasedOnTheme() {
        // Obtener colores de énfasis desde localStorage o CSS
        try {
          const siteColors = localStorage.getItem('site_colors');
          if (siteColors) {
            const colors = JSON.parse(siteColors);
            const primaryColor = colors.primary || '#e74c3c';
            // Determinar si el color es claro u oscuro
            const brightness = this.getColorBrightness(primaryColor);
            // Si el color es oscuro, usar Logo2, si es claro usar Logo1
            this.currentLogo = brightness < 128 ? '/Logos/Logo2.png' : '/Logos/Logo1.png';
          } else {
            // Color por defecto
            this.currentLogo = '/Logos/Logo1.png';
          }
        } catch (error) {
          console.log('Error al cargar logo:', error);
          this.currentLogo = '/Logos/Logo1.png';
        }
      },
      getColorBrightness(hexColor) {
        // Convertir hex a RGB y calcular brillo
        const hex = hexColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        // Fórmula de brillo percibido
        return (r * 299 + g * 587 + b * 114) / 1000;
      },
      handleStorageChange(event) {
        // Actualizar logo cuando cambien los colores
        if (event.key === 'site_colors') {
          this.updateLogoBasedOnTheme();
        }
      },
      handleColorsUpdated() {
        // Actualizar logo cuando se dispare el evento de colores actualizados
        this.updateLogoBasedOnTheme();
      },
    },
  };