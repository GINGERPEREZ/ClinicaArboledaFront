import { createRouter, createWebHistory } from 'vue-router';
import SesionUsuario from '../components/SesionUsuario/SesionUsuario.vue';
import RegistroUsuario from '../components/RegistroUsuario/RegistroUsuario.vue';
import Home from '../components/HomePage/HomePage.vue';
import CarouselBanner from '../components/CarouselBanner/CarouselBanner.vue';
// Dashboard, AdminPanel y NotificationsPanel usan lazy loading para optimizar carga inicial
// PanelVendedores usa lazy loading para optimizar carga inicial

import RedesSociales from '../components/RedesSociales/RedesSociales.vue';
import CarritoCompras from '../components/CarritoCompras/CarritoCompras.vue';
import PerfilUsuario from '../components/PerfilUsuario/PerfilUsuario.vue';
import OlvidePassword from '../components/OlvidePassword.vue';
import RestablecerPassword from '../components/RestablecerPassword.vue';
import InstalacionesPage from '../components/InstalacionesPage/InstalacionesPage.vue';
import MisionVision from '../components/MisionVision/MisionVision.vue';
import ConveniosPage from '../components/Convenios/Convenios.vue';
import ServiciosVirtuales from '../components/ServiciosVirtuales/ServiciosVirtuales.vue';
import HistoriaClinica from '../components/HistoriaClinica/HistoriaClinica.vue';
import EquipoMedico from '../components/EquipoMedico/EquipoMedico.vue';
import ServiciosEspecialidades from '../components/ServiciosEspecialidades/ServiciosEspecialidades.vue';
import SobreNosotros from '../components/SobreNosotros/SobreNosotros.vue';


const routes = [
  { path: '/', redirect: '/home' },
  { 
    path: '/login', 
    component: SesionUsuario,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem('access_token');
      if (isAuthenticated) {
        next('/home');
      } else {
        next();
      }
    }
  },
  { 
    path: '/registro', 
    component: RegistroUsuario,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem('access_token');
      if (isAuthenticated) {
        next('/home');
      } else {
        next();
      }
    }
  },
  { 
    path: '/olvide-password', 
    component: OlvidePassword,
    name: 'OlvidePassword',
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem('access_token');
      if (isAuthenticated) {
        next('/home');
      } else {
        next();
      }
    }
  },
  { 
    path: '/restablecer-password', 
    component: RestablecerPassword,
    name: 'RestablecerPassword',
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem('access_token');
      if (isAuthenticated) {
        next('/home');
      } else {
        next();
      }
    }
  },
  { 
    path: '/home', 
    component: Home, 
    name: 'HomePage' // Se añade el nombre a la ruta
  },
  {
    path: '/redes-sociales',
    component: RedesSociales,
    name: 'RedesSociales'
  },
  {
    path: '/carousel-banner',
    component: CarouselBanner,
    name: 'CarouselBanner'  
  },
  {
    path: "/carrito",
    name: "CarritoCompras",
    component: CarritoCompras,
  },
  {
    path: "/mision-vision",
    name: "MisionVision",
    component: MisionVision,
  },
  {
    path: "/convenios",
    name: "ConveniosPage",
    component: ConveniosPage,
  },
  {
    path: "/promociones",
    name: "ServiciosVirtuales",
    component: ServiciosVirtuales,
  },
  {
    path: "/historia",
    name: "HistoriaClinica",
    component: HistoriaClinica,
  },
  {
    path: "/equipo-medico",
    name: "EquipoMedico",
    component: EquipoMedico,
  },
  {
    path: "/servicios-especialidades",
    name: "ServiciosEspecialidades",
    component: ServiciosEspecialidades,
  },
  {
    path: "/sobre-nosotros",
    name: "SobreNosotros",
    component: SobreNosotros,
  },
  {
    path: '/perfil',
    name: 'PerfilUsuario',
    component: PerfilUsuario,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem('access_token');
      if (isAuthenticated) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import(/* webpackChunkName: "admin-dashboard" */ '../components/Dashboard/DashboardMain.vue'),
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem('access_token');
      const userRol = localStorage.getItem('user_rol');
      
      if (!isAuthenticated) {
        next('/login');
      } else if (userRol !== 'administrador') {
        next('/home');
      } else {
        next();
      }
    }
  },
  {
    path: '/instalaciones',
    name: 'InstalacionesPage',
    component: InstalacionesPage
  },
  {
    path: '/encuentranos',
    redirect: '/instalaciones'
  },
  {
    path: '/admin/panel',
    name: 'AdminPanel',
    component: () => import(/* webpackChunkName: "admin-panel" */ '../components/AdminPanel/AdminPanel.vue'),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('user_rol');
      if (token && (role === 'administrador' || role === 'vendedor')) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/admin/notifications',
    name: 'NotificationsPanel',
    component: () => import(/* webpackChunkName: "notifications-panel" */ '../components/NotificationsPanel/NotificationsPanel.vue'),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('user_rol');
      if (token && (role === 'administrador' || role === 'vendedor')) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/panel-vendedores',
    name: 'PanelVendedores',
    component: () => import(/* webpackChunkName: "panel-vendedores" */ '../components/PanelVendedores/PanelVendedores.vue'),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('user_rol');
      if (token && (role === 'administrador' || role === 'vendedor')) {
        next();
      } else {
        next('/login');
      }
    }
  }


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Manejo de errores globales de navegación
router.onError((error) => {
  console.error('Router error:', error);
});

export default router;
