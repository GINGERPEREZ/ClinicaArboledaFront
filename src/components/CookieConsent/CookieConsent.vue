<template>
  <transition name="cookie-slide">
    <div v-if="isVisible" class="cookie-banner" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <p class="cookie-text">
        Utilizamos cookies para mejorar la experiencia de usuario.
        ¿Aceptas o rechazas el uso de cookies?
        <router-link class="cookie-link" to="/proteccion-datos">Politicas de Cookies</router-link>
      </p>

      <div class="cookie-actions">
        <button class="cookie-btn cookie-btn-accept" type="button" @click="setConsent('accepted')">
          Aceptar
        </button>
        <button class="cookie-btn cookie-btn-reject" type="button" @click="setConsent('rejected')">
          Rechazar
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
const COOKIE_CONSENT_KEY = 'cookie_consent_status';

export default {
  name: 'CookieConsent',
  data() {
    return {
      isVisible: false,
    };
  },
  mounted() {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    this.isVisible = !savedConsent;
  },
  methods: {
    setConsent(status) {
      localStorage.setItem(COOKIE_CONSENT_KEY, status);
      this.isVisible = false;
    },
  },
};
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 20px;
  background: linear-gradient(90deg, #0e4f4a 0%, #1f5f5b 55%, #2e7f78 100%);
  border-top: 2px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 -6px 22px rgba(12, 55, 52, 0.25);
}

.cookie-text {
  margin: 0;
  color: #eaf7f6;
  font-size: 0.98rem;
  line-height: 1.4;
}

.cookie-link {
  margin-left: 4px;
  color: #bff3ee;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.cookie-link:hover {
  color: #ffffff;
}

.cookie-actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.cookie-btn {
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 7px;
  padding: 8px 16px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}

.cookie-btn:hover {
  transform: translateY(-1px);
}

.cookie-btn-accept {
  background: #d8f4f1;
  color: #0f4a45;
}

.cookie-btn-accept:hover {
  background: #ffffff;
}

.cookie-btn-reject {
  background: transparent;
  color: #f1fffd;
}

.cookie-btn-reject:hover {
  background: rgba(255, 255, 255, 0.15);
}

.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.cookie-slide-enter-from,
.cookie-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .cookie-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 14px;
  }

  .cookie-text {
    font-size: 0.9rem;
  }

  .cookie-actions {
    width: 100%;
  }

  .cookie-btn {
    flex: 1;
    text-align: center;
  }
}
</style>
