<template>
    <div
      class="card card-pack h-100 d-flex flex-column shadow-sm border-success"
      :class="{ 'card-pack--agotado': agotado }"
    >
      <div
        class="card-img-wrap card-img-wrap--pack flex-shrink-0"
        :class="{ 'card-img-wrap--agotado': agotado }"
      >
        <img
          :src="image"
          class="card-img-top"
          :class="{ 'card-img-top--agotado': agotado }"
          :alt="imageAlt"
          loading="lazy"
        >
        <span
          v-if="agotado"
          class="card-agotado-badge"
          aria-hidden="true"
        >Agotado</span>
        <div
          v-if="ultimaUnidadVisible"
          class="card-ultima-unidad-overlay"
          role="status"
        >
          <span class="card-ultima-unidad-chip">Última unidad</span>
        </div>
      </div>
      <div class="card-body card-pack-body d-flex flex-column flex-grow-1">
        <div
          class="card-mainline flex-shrink-0 w-100"
          :class="titleAlign === 'center' ? 'text-center' : 'text-start'"
        >
          <h6 v-if="titleTrim" class="card-title fw-bold mb-0">{{ titleTrim }}</h6>
          <p
            v-if="winery"
            class="card-winery mb-0 fw-bold"
            :class="{ 'card-winery--ft-split': wineryFtSplit }"
          >
            <template v-if="wineryFtSplit">
              <span class="card-winery-upper">{{ wineryFtSplit.before }}</span><span class="card-winery-ft"> ft. </span><span class="card-winery-upper">{{ wineryFtSplit.after }}</span>
            </template>
            <template v-else>{{ winery }}</template>
          </p>
        </div>
        <div class="card-meta flex-grow-1 text-start min-w-0">
          <div v-if="descripcionTrim" class="card-meta-row">
            <p class="card-descripcion">{{ descripcionTrim }}</p>
          </div>
          <template v-else>
            <div v-if="cepa" class="card-meta-row">
              <span class="card-meta-label">Cepa</span>
              <p class="card-cepa">{{ cepa }}</p>
            </div>
            <div v-if="valle" class="card-meta-row">
              <span class="card-meta-label">Valle</span>
              <p class="card-valle">{{ valle }}</p>
            </div>
          </template>
        </div>
        <div class="card-divider-wrap">
          <hr class="card-divider flex-shrink-0">
        </div>
        <div class="card-price-footer flex-shrink-0">
          <div class="card-price-stack text-center w-100">
            <template v-if="tienePrecioEspecial">
              <p class="card-price-ref mb-1">
                <del :aria-label="`Precio anterior ${price}`">{{ price }}</del>
              </p>
              <p class="card-price-kicker mb-1">Precio especial</p>
              <p class="card-price-special mb-0 fw-bold text-success">{{ precioEspecialTrim }}</p>
            </template>
            <template v-else>
              <p class="card-price mb-0 fw-bold text-success">{{ price }}</p>
            </template>
          </div>
        </div>
        <div class="card-wa-footer flex-shrink-0">
          <span class="card-wa-wrap">
            <a
              class="btn btn-whatsapp rounded-circle card-wa-btn shadow-sm"
              :href="whatsappEnabled ? whatsappUrl : '#'"
              :target="whatsappEnabled ? '_blank' : undefined"
              rel="noopener noreferrer"
              :aria-disabled="!whatsappEnabled"
              :class="{
                'opacity-50': !whatsappEnabled,
                'pointer-events-none': !whatsappEnabled,
              }"
              :aria-label="whatsappLinkAriaLabel"
              @click="onWaCardClick"
            >
              <svg
                class="card-wa-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <span class="card-wa-tooltip" role="tooltip" aria-hidden="true">{{ waTooltipText }}</span>
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { getWhatsAppFlowerUrl, getWhatsAppPackUrl, isWhatsAppConfigured } from '@/config/whatsapp'
  import { catalogoNombre } from '../utils/catalogo'

  const props = defineProps({
    wineId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    titleAlign: {
      type: String,
      default: 'start',
      validator: (v) => ['start', 'center'].includes(v),
    },
    descripcion: {
      type: String,
      default: '',
    },
    valle: {
      type: String,
      default: '',
    },
    winery: {
      type: String,
      default: '',
    },
    cepa: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    precioEspecial: {
      type: String,
      default: '',
    },
    agotado: {
      type: Boolean,
      default: false,
    },
    ultimaUnidad: {
      type: Boolean,
      default: false,
    },
  })

  const ultimaUnidadVisible = computed(
    () => props.ultimaUnidad && !props.agotado,
  )

  const precioEspecialTrim = computed(() =>
    typeof props.precioEspecial === 'string' ? props.precioEspecial.trim() : '',
  )

  const descripcionTrim = computed(() =>
    typeof props.descripcion === 'string' ? props.descripcion.trim() : '',
  )

  const titleTrim = computed(() =>
    typeof props.title === 'string' ? props.title.trim() : '',
  )

  const esFlor = computed(() => descripcionTrim.value.length > 0)

  const nombreCatalogo = computed(() =>
    catalogoNombre({ nombre: props.title, image: props.image }),
  )

  const imageAlt = computed(() => {
    if (props.winery) return `${nombreCatalogo.value}. ${props.winery}`
    return nombreCatalogo.value
  })

  const tienePrecioEspecial = computed(() => precioEspecialTrim.value.length > 0)

  /** Id 10: mostrar «ft.» en minúsculas (el uppercase del bloque lo convertiría en FT.) */
  const wineryFtSplit = computed(() => {
    if (props.wineId !== '10') return null
    const m = props.winery.match(/^(.+?)\s+ft\.\s+(.+)$/i)
    if (!m) return null
    return { before: m[1].toUpperCase(), after: m[2].toUpperCase() }
  })

  const whatsappUrl = computed(() => {
    if (esFlor.value) {
      return getWhatsAppFlowerUrl({
        nombre: nombreCatalogo.value,
        precio: props.price,
        src: props.image,
      })
    }
    return getWhatsAppPackUrl({
      packId: props.wineId,
      title: props.title,
      valle: props.valle,
      price: props.price,
      precioEspecial: precioEspecialTrim.value,
      image: props.image,
    })
  })
  const whatsappReady = computed(() => isWhatsAppConfigured())

  const whatsappEnabled = computed(() => whatsappReady.value && !props.agotado)

  const waTooltipText = computed(() => {
    if (props.agotado) return 'Producto agotado'
    return esFlor.value ? 'Pide esta flor aquí...' : 'Pide este vino aquí...'
  })

  const whatsappLinkAriaLabel = computed(() => {
    if (props.agotado) return `${nombreCatalogo.value}, agotado`
    return `Pedir ${nombreCatalogo.value} por WhatsApp`
  })

  let lastWaOpenMs = 0
  function onWaCardClick(e) {
    if (!whatsappEnabled.value) {
      e.preventDefault()
      return
    }
    const now = Date.now()
    if (now - lastWaOpenMs < 2000) {
      e.preventDefault()
      return
    }
    lastWaOpenMs = now
  }
  
  </script>
  
  <style scoped>
  .card-pack {
    min-height: 0;
    border-radius: 1.1rem;
    overflow: visible;
    --bs-card-inner-border-radius: calc(1.1rem - 1px);
    border: 1px solid rgba(var(--vin-rosa-ballet-rgb), 0.5) !important;
    background:
      linear-gradient(
        185deg,
        rgba(255, 253, 255, 0.99) 0%,
        rgba(255, 246, 249, 0.98) 45%,
        rgba(252, 232, 241, 0.96) 78%,
        rgba(248, 218, 232, 0.94) 100%
      );
    box-shadow:
      0 14px 32px rgba(42, 32, 38, 0.26),
      0 0 0 1px rgba(var(--vin-leche-rgb), 0.35) inset,
      0 -2px 20px rgba(var(--vin-rosa-sorbete-rgb), 0.12) inset;
    transition:
      transform 0.28s ease,
      box-shadow 0.28s ease,
      border-color 0.28s ease;
  }

  .card-pack:hover {
    transform: translateY(-3px);
    border-color: rgba(var(--vin-rosa-sorbete-rgb), 0.65) !important;
    box-shadow:
      0 20px 38px rgba(42, 32, 38, 0.28),
      0 0 0 1px rgba(var(--vin-pastel-nube-rgb), 0.5) inset,
      0 0 24px rgba(var(--vin-rosa-melocoton-rgb), 0.18);
  }

  .card-pack--agotado:hover {
    transform: translateY(-1px);
    border-color: rgba(var(--vin-rosa-ballet-rgb), 0.45) !important;
    box-shadow:
      0 14px 28px rgba(42, 32, 38, 0.22),
      0 0 0 1px rgba(var(--vin-leche-rgb), 0.35) inset,
      0 -2px 20px rgba(var(--vin-rosa-sorbete-rgb), 0.1) inset;
  }
  
  .card-pack-body {
    flex: 1 1 auto;
    min-height: 0;
    padding: 0.62rem 0.68rem 0.66rem;
    display: grid !important;
    grid-template-rows: auto 1fr auto auto;
    row-gap: 0.35rem;
  }
  
  .card-img-wrap {
    width: 100%;
    aspect-ratio: 4 / 5.65;
    overflow: hidden;
    background: linear-gradient(165deg, #ffffff 0%, #fff8fb 55%, #fff2f7 100%);
    border-radius: 1.1rem 1.1rem 0 0;
  }

  .card-img-wrap--pack {
    position: relative;
  }

  .card-img-top {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    transition: transform 0.45s ease;
  }

  .card-pack:hover .card-img-top {
    transform: scale(1.03);
  }

  .card-pack--agotado:hover .card-img-top--agotado {
    transform: none;
  }

  .card-img-top--agotado {
    filter: grayscale(1);
    opacity: 0.88;
  }

  /*
   * Sobre la foto: pegado al lado izquierdo para no tapar la botella (suelen ir centradas / algo a la derecha).
   */
  .card-ultima-unidad-overlay {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
    box-sizing: border-box;
    max-width: min(72%, 11.5rem);
    padding: 0.38rem 0.42rem 0.42rem 0.38rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    pointer-events: none;
  }

  .card-ultima-unidad-chip {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    max-width: 100%;
    padding: 0.38rem 0.72rem;
    border-radius: 0.48rem;
    font-size: clamp(0.56rem, 1.35vw, 0.7rem);
    font-weight: 800;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    color: var(--vin-texto-claro);
    text-shadow: 0 1px 2px rgba(var(--vin-profundo-rgb), 0.45);
    text-align: left;
    line-height: 1.15;
    background-image: var(--vin-btn-carousel-fill);
    border: 1px solid rgba(255, 236, 245, 0.42);
    box-shadow:
      0 2px 14px rgba(var(--vin-acento-rgb), 0.34),
      0 0 20px rgba(var(--vin-rosa-sorbete-rgb), 0.22),
      0 1px 0 rgba(255, 255, 255, 0.2) inset;
  }

  @media (max-width: 575.98px) {
    .card-ultima-unidad-overlay {
      max-width: min(78%, 10.5rem);
      padding: 0.32rem 0.32rem 0.36rem 0.32rem;
    }

    .card-ultima-unidad-chip {
      padding: 0.3rem 0.44rem;
      letter-spacing: 0.065em;
      font-size: clamp(0.52rem, 3.1vw, 0.62rem);
    }
  }

  @media (max-width: 359.98px) {
    .card-ultima-unidad-chip {
      letter-spacing: 0.055em;
      padding: 0.28rem 0.36rem;
      font-size: clamp(0.48rem, 3.35vw, 0.56rem);
    }
  }

  .card-agotado-badge {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    padding: 0.42rem 0.85rem;
    border-radius: 999px;
    font-size: clamp(0.72rem, 2vw, 0.88rem);
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #fff;
    background: rgba(42, 32, 38, 0.82);
    border: 1px solid rgba(255, 255, 255, 0.35);
    box-shadow: 0 8px 22px rgba(8, 5, 9, 0.35);
    pointer-events: none;
  }
  
  @media (max-width: 575.98px) {
    .card-img-wrap {
      aspect-ratio: unset;
      height: min(72vw, 340px);
    }
  }
  
  .card-mainline {
    margin-bottom: 0.15rem;
  }
  
  .card-title {
    overflow-wrap: break-word;
    font-size: clamp(0.86rem, 2.3vw, 1.02rem);
    line-height: 1.2;
    font-weight: 700;
    color: #2f1d22;
    width: 100%;
  }

  .card-mainline.text-center .card-title {
    text-align: center;
  }

  .card-winery {
    margin-top: 0.22rem;
    font-size: clamp(0.68rem, 1.62vw, 0.79rem);
    line-height: 1.35;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-style: italic;
    color: rgba(var(--vin-acento-rgb), 0.72);
  }

  .card-winery--ft-split {
    text-transform: none;
  }

  .card-winery-upper {
    text-transform: uppercase;
  }

  .card-winery-ft {
    text-transform: lowercase;
    font-style: italic;
  }

  .card-meta {
    min-height: 0;
    min-width: 0;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 0.38rem;
    padding-top: 0.28rem;
    margin-top: 0.1rem;
    border-top: 1px solid rgba(var(--vin-acento-rgb), 0.12);
  }

  .card-meta-row {
    padding-left: 0.38rem;
    border-left: 2px solid rgba(var(--vin-acento-rgb), 0.42);
    min-width: 0;
  }

  .card-meta-label {
    display: block;
    font-size: clamp(0.48rem, 1.05vw, 0.54rem);
    font-weight: 800;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: rgba(var(--vin-acento-rgb), 0.88);
    margin-bottom: 0.14rem;
    line-height: 1;
  }

  /*
   * Por debajo del título del vino (~1.02rem) y un pelín sobre la viña en peso,
   * sin igualar su tamaño visual.
   */
  .card-cepa,
  .card-descripcion {
    margin: 0;
    font-size: clamp(0.68rem, 1.48vw, 0.76rem);
    line-height: 1.3;
    font-weight: 700;
    letter-spacing: 0.015em;
    color: #231e22;
    overflow-wrap: break-word;
  }

  .card-descripcion {
    font-weight: 500;
    line-height: 1.45;
    text-align: justify;
    text-justify: inter-word;
    hyphens: auto;
  }

  .card-valle {
    margin: 0;
    font-size: clamp(0.635rem, 1.32vw, 0.7rem);
    line-height: 1.32;
    font-weight: 600;
    letter-spacing: 0.012em;
    color: #302a2e;
    overflow-wrap: break-word;
  }

  .card-divider-wrap {
    display: flex;
    align-items: center;
  }
  
  .card-divider {
    border-color: rgba(var(--vin-acento-rgb), 0.24);
    opacity: 1;
    margin: 0;
    width: 100%;
  }
  
  .card-price-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 2.1rem;
    box-sizing: border-box;
    padding-top: 0.25rem;
    padding-bottom: 0.15rem;
  }

  .card-price-footer:has(.card-price-special) {
    min-height: auto;
  }

  .card-price-kicker {
    margin: 0;
    font-size: clamp(0.58rem, 1.35vw, 0.66rem);
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(var(--vin-acento-rgb), 0.85);
    line-height: 1.2;
  }

  .card-price-special {
    font-size: clamp(1rem, 2.35vw, 1.12rem);
    line-height: 1.15;
    letter-spacing: 0.02em;
    overflow-wrap: break-word;
  }

  /* Precio referencia en negro; la raya del tachado usa el acento (como el precio especial) */
  .card-price-ref {
    font-size: clamp(0.72rem, 1.55vw, 0.82rem);
    line-height: 1.2;
    color: #141014;
    font-weight: 700;
  }

  .card-price-ref del {
    position: relative;
    display: inline-block;
    color: #141014;
    text-decoration: none;
  }

  /* Tachado oblicuo (barra rotada; mismo color que precio especial) */
  .card-price-ref del::after {
    content: '';
    position: absolute;
    left: -8%;
    right: -8%;
    top: 50%;
    height: 2px;
    margin-top: -1px;
    background: var(--vin-acento);
    transform: rotate(-15deg);
    transform-origin: center center;
    pointer-events: none;
    border-radius: 999px;
    opacity: 0.95;
  }

  .card-price {
    font-size: clamp(0.9rem, 2.1vw, 1rem);
    line-height: 1.2;
    letter-spacing: 0.02em;
    overflow-wrap: break-word;
    font-weight: 700;
  }

  .card-wa-footer {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.25rem;
    padding-bottom: 0.2rem;
  }

  .card-wa-footer:hover,
  .card-wa-footer:focus-within {
    z-index: 5;
  }

  .card-wa-wrap {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
  }

  .card-wa-btn {
    width: 2.2rem;
    height: 2.2rem;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    flex-shrink: 0;
  }

  .card-wa-icon {
    flex-shrink: 0;
  }

  </style>
  