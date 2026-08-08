<template>
    <transition name="fade">
      <header v-show="true" v-bind:class="{ 'fade-in': isVisible, 'scrolled': isScrolled, 'is-home': isHomePage }" class="header">
        <div class="main-header">
          <!-- Logo -->
          <div class="logo">
            <a href="/" class="logo-link">
              <img :src="currentLogo" alt="Logo Clínica Arboleda" class="logo-image" />
            </a>
          </div>
  
          <!-- Acciones de usuario -->
          <div class="user-actions">
            <template v-if="!isAuthenticated">
              <button class="action-button btn-medicos" @click="goToAgendarCita">
                <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 7V3h8v4"/><path d="M6 9h12v10H6z"/><path d="M9 13h6"/><path d="M12 10v6"/></svg>
                Agendar cita
              </button>
            </template>
            <template v-else>
              <button 
                class="action-button perfil-button" 
                @click="goToPerfil"
                title="Mi Perfil"
              >
                Mi Perfil
              </button>
              <button 
                v-if="isAdmin || isVendedor" 
                class="action-button pedidos-button" 
                @click="goToPanelVendedores"
                title="Panel de Citas"
              >
                Citas
              </button>
              <button 
                v-if="isAdmin || isVendedor" 
                class="action-button admin-button" 
                @click="goToAdminPanel"
                title="Panel de Administración"
              >
                Panel Admin
              </button>
              <button class="action-button" @click="cerrarSesion">Cerrar Sesión</button>
            </template>
          </div>

          <!-- Botón hamburguesa: el CSS solo lo muestra en móvil -->
          <button
            class="menu-toggle"
            :class="{ 'is-open': isMenuOpen }"
            type="button"
            aria-controls="menu-movil"
            :aria-expanded="isMenuOpen ? 'true' : 'false'"
            :aria-label="isMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
            @click="alternarMenu"
          >
            <span class="menu-toggle-bar"></span>
            <span class="menu-toggle-bar"></span>
            <span class="menu-toggle-bar"></span>
          </button>
        </div>
  
        <!-- Menú de navegación -->
        <nav class="main-menu">
          <ul>
            <li><a href="/home">Inicio</a></li>
            <li 
              class="dropdown-menu"
              @mouseenter="showHospitalMenu = true"
              @mouseleave="showHospitalMenu = false"
            >
              <a href="#" @click.prevent>Hospital</a>
              <transition name="dropdown-fade">
                <div v-if="showHospitalMenu" class="dropdown-wrapper">
                  <ul class="dropdown-content">
                    <li><a href="/mision-vision">Sobre Nosotros</a></li>
                    <li><a href="/historia">Historia</a></li>
                    <li><a href="/instalaciones">Instalaciones</a></li>
                  </ul>
                </div>
              </transition>
            </li>
            <li><a href="/equipo-medico">Nuestro Equipo Médico</a></li>
            <li><a href="/convenios">Convenios</a></li>
            <li><a href="/noticias">Noticias</a></li>
          </ul>
        </nav>

        <!-- ===== Navegación móvil: overlay + drawer ===== -->
        <transition name="drawer-fade">
          <div v-if="isMenuOpen" class="drawer-overlay" @click="cerrarMenu"></div>
        </transition>

        <transition name="drawer-slide">
          <nav v-if="isMenuOpen" id="menu-movil" class="mobile-drawer" aria-label="Menú principal">
            <div class="mobile-drawer-top">
              <span class="mobile-drawer-title">Menú</span>
              <button
                class="mobile-drawer-close"
                type="button"
                aria-label="Cerrar menú"
                @click="cerrarMenu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <ul class="mobile-drawer-list">
              <li v-for="enlace in enlacesNavegacion" :key="enlace.texto">
                <a
                  v-if="enlace.ruta"
                  :href="enlace.ruta"
                  class="mobile-drawer-link"
                  @click="cerrarMenu"
                >{{ enlace.texto }}</a>

                <template v-else>
                  <span class="mobile-drawer-group">{{ enlace.texto }}</span>
                  <ul class="mobile-drawer-sublist">
                    <li v-for="hijo in enlace.hijos" :key="hijo.ruta">
                      <a
                        :href="hijo.ruta"
                        class="mobile-drawer-link mobile-drawer-sublink"
                        @click="cerrarMenu"
                      >{{ hijo.texto }}</a>
                    </li>
                  </ul>
                </template>
              </li>
            </ul>

            <!-- Los accesos de usuario se mudan aquí para liberar la barra superior -->
            <div class="mobile-drawer-actions">
              <template v-if="!isAuthenticated">
                <button class="mobile-drawer-btn is-primary" type="button" @click="irDesdeMenu('/agendamiento-citas')">Agendar cita</button>
              </template>
              <template v-else>
                <button class="mobile-drawer-btn" type="button" @click="irDesdeMenu('/perfil')">Mi Perfil</button>
                <button v-if="isAdmin || isVendedor" class="mobile-drawer-btn" type="button" @click="irDesdeMenu('/panel-vendedores')">Citas</button>
                <button v-if="isAdmin || isVendedor" class="mobile-drawer-btn" type="button" @click="irDesdeMenu('/admin/panel')">Panel Admin</button>
                <button class="mobile-drawer-btn" type="button" @click="cerrarSesionDesdeMenu">Cerrar Sesión</button>
              </template>
            </div>
          </nav>
        </transition>

      </header>
    </transition>
  </template>
  <script src="./HeaderAnth.js"></script>
  <style src="./HeaderAnth.css"></style> 


