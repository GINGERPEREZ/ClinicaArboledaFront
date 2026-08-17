<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="proteccion-datos-container">
    <HeaderAnth />

    <main class="proteccion-datos-content">
      <section class="privacy-hero">
        <div class="privacy-shell">
          <span class="privacy-badge">Centro de Privacidad Clinica Arboleda</span>
          <h1 class="privacy-title">
            Proteccion de Datos, <span>Cookies y Terminos de Uso</span>
          </h1>
          <p class="privacy-description">
            En este espacio reunimos la informacion esencial sobre el tratamiento de datos personales, uso de cookies
            y condiciones generales aplicables a los usuarios de nuestros canales digitales.
          </p>

          <div class="privacy-shortcuts">
            <a
              v-for="atajo in accesosLegales"
              :key="atajo.id"
              class="privacy-shortcut"
              :class="{ 'is-active': currentSection === atajo.id }"
              :href="`#${atajo.id}`"
            >
              <strong>{{ atajo.titulo }}</strong>
              <span>{{ atajo.resumen }}</span>
            </a>
          </div>
        </div>
      </section>

      <section class="privacy-nav-section">
        <div class="privacy-shell">
          <div class="privacy-nav-card">
            <div class="privacy-nav-copy">
              <h2>Informacion legal centralizada</h2>
              <p>
                Las opciones Proteccion de Datos Personales, Politica de Cookies y Terminos y Condiciones de Uso
                ahora dirigen a esta misma page para que el paciente encuentre todo en un solo lugar.
              </p>
            </div>

            <div class="privacy-nav-actions">
              <button type="button" class="secondary-link" @click="irASeccion('proteccion')">
                Ver proteccion de datos
              </button>
              <button type="button" class="secondary-link" @click="irASeccion('cookies')">
                Ver cookies
              </button>
              <button type="button" class="secondary-link" @click="irASeccion('terminos')">
                Ver terminos
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="proteccion" class="privacy-section">
        <div class="privacy-shell">
          <div class="section-head">
            <span class="section-kicker">1. Proteccion de Datos Personales</span>
            <h2>Compromiso institucional con la confidencialidad y el uso responsable de la informacion</h2>
          </div>

          <div class="content-panel">
            <div class="info-grid">
              <article class="info-card">
                <h3>Alcance</h3>
                <p>
                  Esta web esta orientada a personas naturales o juridicas con residencia en Ecuador, o que acceden
                  desde Ecuador, para brindar informacion general sobre servicios hospitalarios y canales de contacto.
                </p>
              </article>
              <article class="info-card">
                <h3>Base legal</h3>
                <p>
                  El tratamiento de datos se realiza conforme a la Ley Organica de Proteccion de Datos Personales y a
                  las obligaciones asistenciales, administrativas y de atencion al paciente aplicables.
                </p>
              </article>
              <article class="info-card">
                <h3>Finalidad</h3>
                <p>
                  Los datos personales se usan para gestionar consultas, coordinar servicios medicos, responder
                  solicitudes y mantener la seguridad operativa de nuestros canales institucionales.
                </p>
              </article>
            </div>

            <div class="text-block">
              <h3>Disposiciones generales</h3>
              <ol>
                <li>
                  Al acceder a esta web, el usuario acepta las condiciones aqui contenidas y reconoce que el uso del
                  sitio puede estar sujeto a validaciones, restricciones y controles de seguridad.
                </li>
                <li>
                  La informacion publicada no reemplaza la consulta medica profesional, el diagnostico clinico ni la
                  orientacion legal especializada.
                </li>
                <li>
                  El titular puede ejercer sus derechos de acceso, rectificacion, eliminacion, oposicion, portabilidad
                  y suspension del tratamiento a traves del canal ARCO y del correo institucional de privacidad.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section id="cookies" class="privacy-section privacy-section-alt">
        <div class="privacy-shell">
          <div class="section-head">
            <span class="section-kicker">2. Politica de Cookies</span>
            <h2>Uso de cookies y tecnologias similares en nuestros canales digitales</h2>
          </div>

          <div class="content-panel">
            <div class="info-grid">
              <article class="info-card">
                <h3>Cookies necesarias</h3>
                <p>
                  Son indispensables para el funcionamiento del sitio, la navegacion, la seguridad de sesion y la
                  prestacion de funciones esenciales.
                </p>
              </article>
              <article class="info-card">
                <h3>Cookies analiticas</h3>
                <p>
                  Permiten analizar patrones de uso para mejorar el rendimiento, el contenido y la experiencia general
                  del paciente dentro del sitio.
                </p>
              </article>
              <article class="info-card">
                <h3>Cookies de preferencias</h3>
                <p>
                  Ayudan a recordar configuraciones del usuario y a ofrecer una navegacion mas personalizada cuando el
                  paciente regresa al sitio.
                </p>
              </article>
            </div>

            <div class="text-block">
              <h3>Control y gestion</h3>
              <p>
                El usuario puede aceptar, rechazar o eliminar cookies desde la configuracion de su navegador. La
                desactivacion de determinadas cookies puede afectar la disponibilidad de algunas funciones del sitio.
              </p>
              <ul>
                <li>Google Chrome: Configuracion, Privacidad y seguridad, Cookies y otros datos de sitios.</li>
                <li>Mozilla Firefox: Ajustes, Privacidad y seguridad, Cookies y datos del sitio.</li>
                <li>Microsoft Edge: Configuracion, Privacidad, busqueda y servicios, Cookies.</li>
                <li>Safari: Preferencias, Privacidad, Gestionar datos del sitio web.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="terminos" class="privacy-section">
        <div class="privacy-shell">
          <div class="section-head">
            <span class="section-kicker">3. Terminos y Condiciones de Uso</span>
            <h2>Condiciones generales aplicables al uso de la plataforma</h2>
          </div>

          <div class="content-panel">
            <div class="text-block">
              <h3>Condiciones esenciales</h3>
              <ul>
                <li>El contenido del sitio tiene fines informativos y de orientacion institucional.</li>
                <li>La clinica puede actualizar servicios, textos, funcionalidades y avisos legales sin previo aviso.</li>
                <li>El usuario se compromete a proporcionar informacion veraz en formularios y canales de contacto.</li>
                <li>No se permite el uso del sitio para fines ilicitos, fraudulentos o que afecten su seguridad.</li>
                <li>La coordinacion final de citas, disponibilidad y horarios esta sujeta a validacion de la clinica.</li>
              </ul>
            </div>

            <div class="info-grid single-row">
              <article class="info-card">
                <h3>Propiedad del contenido</h3>
                <p>
                  Los textos, logotipos, imagenes, marcas y recursos institucionales pertenecen a Clinica Arboleda o a
                  sus respectivos titulares y no pueden reutilizarse sin autorizacion.
                </p>
              </article>
              <article class="info-card">
                <h3>Canales oficiales</h3>
                <p>
                  Las respuestas oficiales sobre privacidad y derechos del titular se emiten unicamente a traves de
                  nuestros formularios, correo institucional y canales validados por la clinica.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="privacy-cta">
        <div class="privacy-shell">
          <div class="cta-card">
            <div>
              <h2>Necesitas ejercer un derecho o contactar al responsable?</h2>
              <p>
                Puedes abrir el formulario ARCO o escribir directamente al canal institucional de proteccion de datos.
              </p>
            </div>

            <div class="cta-actions">
              <button type="button" class="primary-link" @click="irADerechosArco">
                Ir a Derechos ARCO
              </button>
              <button type="button" class="secondary-link" @click="abrirCorreoDpo">
                Contacto del DPO
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <FooterAnth />
  </div>
</template>

<script src="./ProteccionDatos.js"></script>
<style src="./ProteccionDatos.css"></style>
