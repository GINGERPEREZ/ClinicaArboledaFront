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
              <button class="action-button btn-pacientes" @click="goToLogin">
                <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Pacientes
              </button>
              <button class="action-button btn-medicos" @click="goToRegister">
                <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Médicos
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
                    <li><a href="/convenios">Convenios</a></li>
                  </ul>
                </div>
              </transition>
            </li>
            <li><a href="/equipo-medico">Nuestro Equipo Médico</a></li>
            <li 
              class="dropdown-menu"
              @mouseenter="showServiciosMenu = true"
              @mouseleave="showServiciosMenu = false"
            >
              <a href="#" @click.prevent>Servicios Virtuales</a>
              <transition name="dropdown-fade">
                <div v-if="showServiciosMenu" class="dropdown-wrapper">
                  <ul class="dropdown-content">
                    <li><a href="/agendamiento-citas">Agendamiento de Citas</a></li>
                    <li><a href="/chatbot">Chatbot</a></li>
                  </ul>
                </div>
              </transition>
            </li>
            <li><a href="/noticias">Noticias</a></li>
          </ul>
        </nav>

      </header>
    </transition>
  </template>
  <script src="./HeaderAnth.js"></script>
  <style src="./HeaderAnth.css"></style> 