<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="proteccion-datos-container">
    <HeaderAnth />

    <main class="proteccion-datos-content">
      <section class="privacy-hero">
        <div class="privacy-shell">
          <span class="privacy-badge">Centro de Privacidad Clínica Arboleda</span>
          <h1 class="privacy-title">
            Protección de Datos, <span>Cookies y Términos de Uso</span>
          </h1>
          <p class="privacy-description">
            En este espacio reunimos la información esencial sobre el tratamiento de datos personales, uso de cookies
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
              <h2>Información legal centralizada</h2>
              <p>
                Las opciones Protección de Datos Personales, Política de Cookies y Términos y Condiciones de Uso
                ahora dirigen a esta misma página para que el paciente encuentre todo en un solo lugar.
              </p>
            </div>

            <div class="privacy-nav-actions">
              <button type="button" class="secondary-link" @click="irASeccion('proteccion')">
                Ver protección de datos
              </button>
              <button type="button" class="secondary-link" @click="irASeccion('cookies')">
                Ver cookies
              </button>
              <button type="button" class="secondary-link" @click="irASeccion('terminos')">
                Ver términos
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="proteccion" class="privacy-section">
        <div class="privacy-shell">
          <div class="section-head">
            <span class="section-kicker">1. Protección de Datos Personales</span>
            <h2>Compromiso institucional con la confidencialidad y el uso responsable de la información</h2>
          </div>

          <div class="content-panel">
            <div class="info-grid">
              <article class="info-card">
                <h3>Alcance</h3>
                <p>
                  Esta web está orientada a personas naturales o jurídicas con residencia en Ecuador, o que acceden
                  desde Ecuador, para brindar información general sobre servicios hospitalarios y canales de contacto.
                </p>
              </article>
              <article class="info-card">
                <h3>Base legal</h3>
                <p>
                  El tratamiento de datos se realiza conforme a la Ley Orgánica de Protección de Datos Personales y a
                  las obligaciones asistenciales, administrativas y de atención al paciente aplicables.
                </p>
              </article>
              <article class="info-card">
                <h3>Finalidad</h3>
                <p>
                  Los datos personales se usan para gestionar consultas, coordinar servicios médicos, responder
                  solicitudes y mantener la seguridad operativa de nuestros canales institucionales.
                </p>
              </article>
            </div>

            <div class="text-block">
              <h3>Disposiciones generales</h3>
              <ol>
                <li>
                  Al acceder a esta web, el usuario acepta las condiciones aquí contenidas y reconoce que el uso del
                  sitio puede estar sujeto a validaciones, restricciones y controles de seguridad.
                </li>
                <li>
                  La información publicada no reemplaza la consulta médica profesional, el diagnóstico clínico ni la
                  orientación legal especializada.
                </li>
                <li>
                  El titular puede ejercer sus derechos de acceso, rectificación, eliminación, oposición, portabilidad
                  y suspensión del tratamiento a través del canal ARCO y del correo institucional de privacidad.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section id="cookies" class="privacy-section privacy-section-alt">
        <div class="privacy-shell">
          <div class="section-head">
            <span class="section-kicker">2. Política de Cookies</span>
            <h2>Uso de cookies y tecnologías similares en nuestros canales digitales</h2>
          </div>

          <div class="content-panel">
            <div class="info-grid">
              <article class="info-card">
                <h3>Cookies necesarias</h3>
                <p>
                  Son indispensables para el funcionamiento del sitio, la navegación, la seguridad de sesión y la
                  prestación de funciones esenciales.
                </p>
              </article>
              <article class="info-card">
                <h3>Cookies analíticas</h3>
                <p>
                  Permiten analizar patrones de uso para mejorar el rendimiento, el contenido y la experiencia general
                  del paciente dentro del sitio.
                </p>
              </article>
              <article class="info-card">
                <h3>Cookies de preferencias</h3>
                <p>
                  Ayudan a recordar configuraciones del usuario y a ofrecer una navegación más personalizada cuando el
                  paciente regresa al sitio.
                </p>
              </article>
            </div>

            <div class="text-block">
              <h3>Control y gestión</h3>
              <p>
                El usuario puede aceptar, rechazar o eliminar cookies desde la configuración de su navegador. La
                desactivación de determinadas cookies puede afectar la disponibilidad de algunas funciones del sitio.
              </p>
              <ul>
                <li>Google Chrome: Configuración, Privacidad y seguridad, Cookies y otros datos de sitios.</li>
                <li>Mozilla Firefox: Ajustes, Privacidad y seguridad, Cookies y datos del sitio.</li>
                <li>Microsoft Edge: Configuración, Privacidad, búsqueda y servicios, Cookies.</li>
                <li>Safari: Preferencias, Privacidad, Gestionar datos del sitio web.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="terminos" class="privacy-section">
        <div class="privacy-shell">
          <div class="section-head">
            <span class="section-kicker">3. Términos y Condiciones de Uso</span>
            <h2>Condiciones generales aplicables al uso de la plataforma</h2>
          </div>

          <div class="content-panel">
            <div class="text-block">
              <h3>Condiciones esenciales</h3>
              <ul>
                <li>El contenido del sitio tiene fines informativos y de orientación institucional.</li>
                <li>La clínica puede actualizar servicios, textos, funcionalidades y avisos legales sin previo aviso.</li>
                <li>El usuario se compromete a proporcionar información veraz en formularios y canales de contacto.</li>
                <li>No se permite el uso del sitio para fines ilícitos, fraudulentos o que afecten su seguridad.</li>
                <li>La coordinación final de citas, disponibilidad y horarios está sujeta a validación de la clínica.</li>
              </ul>
            </div>

            <div class="info-grid single-row">
              <article class="info-card">
                <h3>Propiedad del contenido</h3>
                <p>
                  Los textos, logotipos, imágenes, marcas y recursos institucionales pertenecen a Clínica Arboleda o a
                  sus respectivos titulares y no pueden reutilizarse sin autorización.
                </p>
              </article>
              <article class="info-card">
                <h3>Canales oficiales</h3>
                <p>
                  Las respuestas oficiales sobre privacidad y derechos del titular se emiten únicamente a través de
                  nuestros formularios, correo institucional y canales validados por la clínica.
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
              <h2>¿Necesitas ejercer un derecho o contactar con el responsable?</h2>
              <p>
                Puedes abrir el formulario ARCO o escribir directamente al canal institucional de protección de datos.
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
