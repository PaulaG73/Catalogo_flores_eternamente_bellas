<template>
    <footer class="footer py-2 py-md-4 mt-auto footer-feb">
      <div class="container footer-layout d-flex align-items-center flex-wrap gap-2">
  
        <!-- Botón volver al inicio (izquierda, ancho fijo) -->
        <div class="footer-side">
          <span class="footer-home-wrap">
            <button
              type="button"
              class="footer-home-btn footer-action-btn"
              aria-label="Volver al inicio, ir a la barra de navegación"
              @click="irAlInicio"
            >
              <svg
                class="footer-action-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"
                />
              </svg>
            </button>
            <span class="footer-home-tooltip" role="tooltip" aria-hidden="true">Volver al inicio</span>
          </span>
        </div>
  
        <!-- Iconos sociales + copyright (centro) -->
        <div class="flex-grow-1 d-flex flex-column align-items-center gap-2">
          <div class="d-flex align-items-center gap-3">
  
            <!-- WhatsApp -->
            <span class="footer-wa-wrap">
              <a
                class="btn btn-whatsapp rounded-circle p-2 footer-action-btn shadow-sm"
                :href="whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                :aria-disabled="!whatsappReady"
                :class="{ 'opacity-50': !whatsappReady }"
                :title="whatsappReady ? undefined : 'Configura WHATSAPP_CATALOGO_DIGITS en src/config/whatsapp.js'"
                aria-label="Haz un pedido a tu medida por WhatsApp"
              >
                <svg class="footer-action-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <span class="footer-wa-tooltip" role="tooltip" aria-hidden="true">Haz aquí un pedido a tu medida</span>
            </span>
  
          </div>
          <p class="mb-0 footer-copy">
            <span class="footer-copy-lead">Derechos reservados &copy; 2026</span>
            <span class="footer-copy-brand">Flores Eternamente Bellas</span>
          </p>
        </div>
  
        <!-- Logo marca (derecha) -->
        <div class="footer-side footer-side--logo d-flex justify-content-end">
          <div class="footer-logo-shell">
            <img
              class="footer-logo-img"
              src="/img/Logo.JPG"
              alt="Logo Flores Eternamente Bellas"
              width="72"
              height="72"
              loading="lazy"
              decoding="async"
            >
          </div>
        </div>
  
      </div>
    </footer>
  </template>
  
  <script setup>
  import { computed, nextTick } from 'vue'
  import { useRouter } from 'vue-router'
  import { getWhatsAppFooterUrl, isWhatsAppConfigured } from '@/config/whatsapp'

  const whatsappReady = computed(() => isWhatsAppConfigured())

  const whatsappUrl = computed(() => getWhatsAppFooterUrl())
  
  const router = useRouter()
  
  async function irAlInicio() {
    if (router.currentRoute.value.name !== 'home') {
      await router.push({ name: 'home' })
      await nextTick()
      await nextTick()
    }
    const nav = document.getElementById('navbar-principal')
    if (nav) {
      nav.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  </script>
  
  <style scoped>
  .footer-feb {
    background-color: var(--feb-superficie-oscura) !important;
    border-top: none !important;
    box-shadow: none;
  }
  
  .footer {
    color: rgba(255, 255, 255, 0.9);
  }
  
  .footer-home-btn {
    width: clamp(2.5rem, 8vw, 2.85rem);
    height: clamp(2.5rem, 8vw, 2.85rem);
    padding: 0;
    border: none;
    border-radius: 50%;
    background-color: var(--feb-btn-scroll-bg);
    box-shadow: var(--feb-btn-scroll-shadow);
    color: var(--feb-btn-scroll-color);
    transition:
      background-color 0.2s ease,
      transform 0.15s ease,
      box-shadow 0.2s ease;
  }

  .footer-home-btn .footer-action-icon {
    width: 22px;
    height: 22px;
  }

  .footer-home-btn:hover {
    background-color: var(--feb-btn-scroll-bg-hover);
    box-shadow: var(--feb-btn-scroll-shadow-hover);
    color: var(--feb-btn-scroll-color);
  }

  .footer-home-btn:active {
    transform: scale(0.96);
  }

  .footer-home-btn:focus-visible {
    outline: 2px solid rgba(var(--feb-avatar-fondo-rgb), 0.85);
    outline-offset: 3px;
  }
  
  .footer-home-wrap {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
  }
  
  .footer-home-tooltip {
    position: absolute;
    left: calc(100% + 10px);
    top: 50%;
    translate: -6px -50%;
    padding: 0.45rem 0.85rem;
    background: #fff;
    color: var(--feb-profundo, #3a0f18);
    font-size: 0.8125rem;
    font-weight: 700;
    line-height: 1.25;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.75rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22);
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    z-index: 20;
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease,
      translate 0.2s ease;
  }
  
  .footer-home-tooltip::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 100%;
    translate: 2px -50%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 7px 8px 7px 0;
    border-color: transparent #fff transparent transparent;
    filter: drop-shadow(-2px 0 3px rgba(0, 0, 0, 0.12));
  }
  
  .footer-home-wrap:hover .footer-home-tooltip,
  .footer-home-wrap:focus-within .footer-home-tooltip {
    opacity: 1;
    visibility: visible;
    translate: 0 -50%;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .footer-home-tooltip {
      transition: none;
      translate: 0 -50%;
    }
  }
  
  .footer-action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
  
  .footer-wa-wrap {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
  }

  .footer-wa-wrap .footer-wa-tooltip {
    white-space: normal;
    max-width: 12.5rem;
  }
  
  .footer-action-icon {
    flex-shrink: 0;
  }
  
  .footer-layout {
    width: 100%;
    min-width: 0;
  }

  .footer-copy {
    font-size: clamp(0.68rem, 2.4vw, 0.85rem);
    text-align: center;
    line-height: 1.35;
    overflow-wrap: break-word;
    hyphens: auto;
    max-width: 100%;
    padding-inline: 0.25rem;
  }

  .footer-copy-lead::after {
    content: ' ';
  }

  .footer-layout > .flex-grow-1 {
    min-width: 0;
    flex: 1 1 12rem;
  }
  
  .footer-side {
    flex: 0 0 auto;
    flex-shrink: 0;
  }

  .footer-side:first-child {
    min-width: clamp(2.5rem, 8vw, 2.85rem);
  }

  .footer-side--logo {
    min-width: clamp(2.5rem, 8vw, 2.85rem);
    justify-content: flex-end;
  }

  .footer-logo-shell {
    --footer-logo-size: clamp(52px, 11vw, 72px);
    width: var(--footer-logo-size);
    height: var(--footer-logo-size);
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow:
      0 0 0 2px rgba(255, 255, 255, 0.14),
      0 4px 14px rgba(0, 0, 0, 0.35);
  }

  .footer-logo-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media (max-width: 575.98px) {
    .footer-layout {
      gap: 0.4rem 0.35rem;
      padding-block: 0.15rem;
    }

    .footer-copy {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      font-size: clamp(0.62rem, 2.85vw, 0.78rem);
    }

    .footer-copy-lead::after {
      content: none;
    }

    .footer-copy-brand {
      display: block;
      white-space: nowrap;
      font-size: clamp(0.64rem, 2.9vw, 0.8rem);
      letter-spacing: 0.02em;
    }

    .footer-logo-shell {
      --footer-logo-size: clamp(44px, 12vw, 56px);
    }

    .footer-home-btn {
      width: 2.35rem;
      height: 2.35rem;
    }
  }

  @media (max-width: 359.98px) {
    .footer-copy {
      font-size: 0.58rem;
      letter-spacing: 0.01em;
    }

    .footer-logo-shell {
      --footer-logo-size: 40px;
    }
  }
  </style>
  