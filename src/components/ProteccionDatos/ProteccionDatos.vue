<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="proteccion-datos-container">
    <HeaderAnth />

    <div class="proteccion-datos-content">
      <section class="proteccion-datos-hero">
        <div class="hero-overlay">
          <h1 class="hero-title">Protección de Datos Personales</h1>
          <p class="hero-subtitle">
            Compromiso institucional con la confidencialidad, el uso responsable y la seguridad de la información de nuestros pacientes.
          </p>
        </div>
      </section>

      <section class="proteccion-datos-info">
        <div class="info-container">
          <h2 class="section-title">Alcance y Uso de esta Web</h2>
          <p class="section-description">
            Esta pagina web esta orientada a personas naturales o juridicas con residencia en Ecuador, o que acceden desde Ecuador,
            para brindar informacion general sobre servicios hospitalarios, canales de contacto y atencion en salud de Clinica Arboleda.
          </p>
        </div>
      </section>

      <section class="proteccion-datos-section proteccion-datos-disposiciones">
        <div class="proteccion-datos-wrapper">
          <div class="section-header">
            <div class="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            </div>
            <h2 class="section-title">Disposiciones Generales</h2>
            <p class="section-subtitle">Aplicables a los usuarios de nuestros medios digitales</p>
          </div>

          <div class="content-card">
            <ol class="disposiciones-list">
              <li>
                La informacion contenida en esta direccion electronica y en sus paginas anexas o conexas, incluidos ciertos servicios de orientacion,
                atencion y contacto hospitalario, esta destinada a su uso por personas naturales, sociedades, personas juridicas u otras entidades
                con residencia en Ecuador o que accedan desde Ecuador. Clinica Arboleda declina responsabilidad por accesos desde jurisdicciones donde
                el contenido o uso de esta web pudiera contravenir normativa local. Determinados servicios podrian no estar disponibles en todas las
                jurisdicciones o para todas las personas, por lo que la Clinica podra restringir o rechazar accesos que no cumplan los requisitos aplicables.
              </li>
              <li>
                Al acceder a esta direccion electronica y a cualquiera de sus paginas anexas o conexas, usted adquiere la calidad de usuario y acepta
                las estipulaciones aqui contenidas, asi como las condiciones de tratamiento de datos personales aplicables conforme a la normativa vigente
                en Ecuador, incluida la Ley Organica de Proteccion de Datos Personales.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section class="proteccion-datos-section proteccion-datos-aclaracion">
        <div class="proteccion-datos-wrapper">
          <div class="section-header">
            <div class="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8h.01"></path>
                <path d="M11 12h2v4h-2"></path>
              </svg>
            </div>
            <h2 class="section-title">Aclaracion</h2>
            <p class="section-subtitle">Naturaleza informativa del contenido publicado</p>
          </div>

          <div class="content-card">
            <p class="aclaracion-text">
              Esta pagina electronica no reemplaza la consulta medica profesional, el diagnostico clinico, la indicacion terapeutica ni el criterio de especialistas
              de salud. Tampoco constituye asesoramiento legal, tributario o de otra naturaleza tecnica.
            </p>
            <p class="aclaracion-text">
              La informacion publicada tiene caracter general e informativo y no debe utilizarse como unico fundamento para decisiones clinicas o personales.
              Para decisiones relacionadas con su estado de salud, tratamiento o historia clinica, debe solicitarse atencion profesional personalizada y especializada.
            </p>
          </div>
        </div>
      </section>

      <section class="proteccion-datos-cta">
        <div class="cta-container">
          <h2 class="cta-title">Tus datos y tu salud son prioridad</h2>
          <p class="cta-description">
            Si tienes dudas sobre el tratamiento de tus datos personales, contactanos y te guiaremos en el ejercicio de tus derechos.
          </p>
          <button class="cta-button" @click="irAContacto">
            Contactar a un asesor
          </button>
        </div>
      </section>

      <section class="descarga-politica-section">
        <div class="descarga-politica-box">
          <h3>Descargar Politica de Proteccion de Datos Personales.</h3>
          <p>
            Para descargar las politicas de cookies,
            <a href="#cookies">de clic aqui</a>
          </p>
        </div>
      </section>

      <section class="legal-links-section">
        <span id="terminos" class="legal-anchor"></span>
        <span id="panel-cookies" class="legal-anchor"></span>
        <div class="legal-links-row">
          <a href="#terminos">Terminos y Condiciones de Uso</a>
          <span>|</span>
          <a id="cookies" href="#cookies">Politica de Cookies</a>
          <span>|</span>
          <a href="/proteccion-datos">Ley de Proteccion de Datos Personales</a>
          <span>|</span>
          <a href="#panel-cookies">Panel Cookies</a>
        </div>
      </section>
    </div>

    <FooterAnth />
  </div>
</template>

<script src="./ProteccionDatos.js"></script>
<style src="./ProteccionDatos.css"></style>
