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
          :style="{ objectPosition: imageObjectPositionTrim }"
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
        </div>
        <div class="card-meta flex-grow-1 text-start min-w-0">
          <div v-if="descripcionTrim" class="card-meta-row">
            <p class="card-descripcion">{{ descripcionTrim }}</p>
            <span
              v-if="mostrarBotonColores"
              class="card-colores-wrap"
              :class="{ 'card-colores-wrap--show': coloresTooltipVisible }"
            >
              <button
                type="button"
                class="card-colores-oval-btn"
                aria-label="Ver opciones de colores aquí"
                @click="onColoresBtnClick"
                @focus="coloresTooltipVisible = true"
                @blur="onColoresBtnBlur"
              >
                colores
              </button>
              <span class="card-colores-tooltip" role="tooltip" aria-hidden="true">
                Ver opciones de colores aquí
              </span>
            </span>
          </div>
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
            <template v-else-if="preciosLista.length">
              <ul class="card-precios-list list-unstyled mb-0 w-100">
                <li
                  v-for="(tier, tierIdx) in preciosLista"
                  :key="`precio-${tierIdx}`"
                  class="card-precio-tier"
                >
                  <span class="card-precio-tier__etiqueta">{{ tier.etiqueta }}</span>
                  <span class="card-precio-tier__valor fw-bold text-success">{{ tier.valor }}</span>
                </li>
              </ul>
            </template>
            <template v-else-if="priceTrim">
              <p class="card-price mb-0 fw-bold text-success">{{ priceTrim }}</p>
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

    <Teleport to="body">
      <div
        v-if="popupColoresAbierto"
        class="card-color-popup-backdrop"
        role="presentation"
        @click="cerrarPopupColores"
      >
        <div
          class="card-color-popup"
          role="dialog"
          aria-modal="true"
          aria-labelledby="card-color-popup-title"
          @click.stop
        >
          <button
            type="button"
            class="card-color-popup__cerrar"
            aria-label="Cerrar"
            @click="cerrarPopupColores"
          >
            &times;
          </button>
          <h6 id="card-color-popup-title" class="card-color-popup__titulo">
            Significado según color
          </h6>
          <ul class="card-color-popup__lista list-unstyled mb-0">
            <li
              v-for="(item, itemIdx) in significadoColoresLista"
              :key="`color-sign-${itemIdx}`"
              class="card-color-popup__item"
            >
              <span class="card-color-popup__color">{{ item.color }}:</span>
              {{ item.significado }}
            </li>
          </ul>
        </div>
      </div>
    </Teleport>
  </template>
  
  <script setup>
  import { computed, onUnmounted, ref, watch } from 'vue'
  import {
    getWhatsAppConsultaUrl,
    getWhatsAppFlowerUrl,
    getWhatsAppPackUrl,
    isWhatsAppConfigured,
  } from '@/config/whatsapp'
  import { catalogoNombre } from '../utils/catalogo'

  const props = defineProps({
    itemId: {
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
    significadoColores: {
      type: Array,
      default: () => [],
    },
    image: {
      type: String,
      required: true,
    },
    /** Anclaje CSS opcional, p. ej. "center top" — ver `object-position` */
    imageObjectPosition: {
      type: String,
      default: 'center center',
    },
    price: {
      type: String,
      default: '',
    },
    precios: {
      type: Array,
      default: () => [],
    },
    whatsappConsulta: {
      type: Boolean,
      default: false,
    },
    /** flor | ramo | accesorio — texto del tooltip de WhatsApp */
    catalogoTipo: {
      type: String,
      default: 'ramo',
      validator: (v) => ['flor', 'ramo', 'accesorio'].includes(v),
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

  const imageObjectPositionTrim = computed(() => {
    const pos = typeof props.imageObjectPosition === 'string' ? props.imageObjectPosition.trim() : ''
    return pos || 'center center'
  })

  const significadoColoresLista = computed(() => {
    if (!Array.isArray(props.significadoColores)) return []
    return props.significadoColores
      .map((item) => {
        const color = typeof item?.color === 'string' ? item.color.trim() : ''
        const significado =
          typeof item?.significado === 'string' ? item.significado.trim() : ''
        if (!color || !significado) return null
        return { color, significado }
      })
      .filter(Boolean)
  })

  const mostrarBotonColores = computed(
    () => significadoColoresLista.value.length > 0,
  )

  const popupColoresAbierto = ref(false)
  const coloresTooltipVisible = ref(false)

  function abrirPopupColores() {
    popupColoresAbierto.value = true
  }

  function onColoresBtnClick() {
    coloresTooltipVisible.value = true
    abrirPopupColores()
  }

  function onColoresBtnBlur() {
    if (!popupColoresAbierto.value) {
      coloresTooltipVisible.value = false
    }
  }

  function cerrarPopupColores() {
    popupColoresAbierto.value = false
    coloresTooltipVisible.value = false
  }

  function onPopupColoresKeydown(e) {
    if (e.key === 'Escape') cerrarPopupColores()
  }

  watch(popupColoresAbierto, (abierto) => {
    if (typeof document === 'undefined') return
    if (abierto) {
      document.addEventListener('keydown', onPopupColoresKeydown)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', onPopupColoresKeydown)
      document.body.style.overflow = ''
    }
  })

  onUnmounted(() => {
    if (typeof document === 'undefined') return
    document.removeEventListener('keydown', onPopupColoresKeydown)
    document.body.style.overflow = ''
  })

  const titleTrim = computed(() =>
    typeof props.title === 'string' ? props.title.trim() : '',
  )

  const nombreCatalogo = computed(() =>
    catalogoNombre({ nombre: props.title, image: props.image }),
  )

  const whatsappUrl = computed(() => {
    if (props.whatsappConsulta) {
      return getWhatsAppConsultaUrl({
        nombre: nombreCatalogo.value,
        catalogoTipo: props.catalogoTipo,
        itemId: props.itemId,
      })
    }
    if (props.catalogoTipo === 'flor') {
      return getWhatsAppFlowerUrl({
        nombre: nombreCatalogo.value,
        precio: priceTrim.value,
        catalogoTipo: props.catalogoTipo,
        itemId: props.itemId,
      })
    }
    return getWhatsAppPackUrl({
      title: props.title,
      catalogoTipo: props.catalogoTipo,
      itemId: props.itemId,
      price: priceTrim.value,
      precioEspecial: precioEspecialTrim.value,
      image: props.image,
    })
  })

  const imageAlt = computed(() => nombreCatalogo.value || 'Producto del catálogo')

  const priceTrim = computed(() =>
    typeof props.price === 'string' ? props.price.trim() : '',
  )

  const preciosLista = computed(() => {
    if (!Array.isArray(props.precios)) return []
    return props.precios
      .map((tier) => {
        const etiqueta = typeof tier?.etiqueta === 'string' ? tier.etiqueta.trim() : ''
        const valor = typeof tier?.valor === 'string' ? tier.valor.trim() : ''
        if (!etiqueta || !valor) return null
        return { etiqueta, valor }
      })
      .filter(Boolean)
  })

  const tienePrecioEspecial = computed(() => precioEspecialTrim.value.length > 0)

  const whatsappReady = computed(() => isWhatsAppConfigured())

  const whatsappEnabled = computed(() => whatsappReady.value && !props.agotado)

  const waTooltipText = computed(() => {
    if (props.agotado) return 'Producto agotado'
    const porTipo = {
      flor: 'Pide esta flor aquí...',
      ramo: 'Pide este ramo aquí...',
      accesorio: 'Pide este accesorio aquí...',
    }
    return porTipo[props.catalogoTipo] || porTipo.ramo
  })

  const whatsappLinkAriaLabel = computed(() => {
    if (props.agotado) return `${nombreCatalogo.value}, agotado`
    const articulo = {
      flor: 'esta flor',
      ramo: 'este ramo',
      accesorio: 'este accesorio',
    }[props.catalogoTipo] || 'este producto'
    return `Pedir ${articulo} por WhatsApp`
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
    min-width: 0;
    max-width: 100%;
    border-radius: 1.1rem;
    overflow: visible;
    --bs-card-inner-border-radius: calc(1.1rem - 1px);
    border: 1px solid rgba(var(--feb-rosa-ballet-rgb), 0.5) !important;
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
      0 0 0 1px rgba(var(--feb-leche-rgb), 0.35) inset,
      0 -2px 20px rgba(var(--feb-rosa-sorbete-rgb), 0.12) inset;
    transition:
      transform 0.28s ease,
      box-shadow 0.28s ease,
      border-color 0.28s ease;
  }

  .card-pack:hover {
    transform: translateY(-3px);
    border-color: rgba(var(--feb-rosa-sorbete-rgb), 0.65) !important;
    box-shadow:
      0 20px 38px rgba(42, 32, 38, 0.28),
      0 0 0 1px rgba(var(--feb-pastel-nube-rgb), 0.5) inset,
      0 0 24px rgba(var(--feb-rosa-melocoton-rgb), 0.18);
  }

  .card-pack--agotado:hover {
    transform: translateY(-1px);
    border-color: rgba(var(--feb-rosa-ballet-rgb), 0.45) !important;
    box-shadow:
      0 14px 28px rgba(42, 32, 38, 0.22),
      0 0 0 1px rgba(var(--feb-leche-rgb), 0.35) inset,
      0 -2px 20px rgba(var(--feb-rosa-sorbete-rgb), 0.1) inset;
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
    color: var(--feb-texto-claro);
    text-shadow: 0 1px 2px rgba(var(--feb-profundo-rgb), 0.45);
    text-align: left;
    line-height: 1.15;
    background-image: var(--feb-btn-carousel-fill);
    border: 1px solid rgba(255, 236, 245, 0.42);
    box-shadow:
      0 2px 14px rgba(var(--feb-acento-rgb), 0.34),
      0 0 20px rgba(var(--feb-rosa-sorbete-rgb), 0.22),
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
    .card-pack {
      height: auto !important;
    }

    .card-pack-body {
      padding: 0.55rem 0.58rem 0.6rem;
      flex: 0 0 auto;
    }

    .card-mainline {
      flex-shrink: 0;
    }

    .card-title {
      font-size: clamp(0.9rem, 4.2vw, 1.02rem);
      line-height: 1.25;
    }

    .card-meta {
      flex: 0 1 auto;
    }

    .card-descripcion {
      font-size: clamp(0.66rem, 3.2vw, 0.74rem);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
    }

    .card-wa-btn {
      width: 2.35rem;
      height: 2.35rem;
    }
  }

  @media (min-width: 576px) and (max-width: 991.98px) {
    .card-pack {
      height: auto !important;
    }

    .card-pack-body {
      flex: 0 0 auto;
    }

    .card-mainline {
      flex-shrink: 0;
    }

    .card-title {
      font-size: clamp(0.88rem, 2.1vw, 1rem);
      line-height: 1.25;
    }

    .card-meta {
      flex: 0 1 auto;
    }

    .card-descripcion {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      overflow: hidden;
    }
  }
  
  /* Salto solo entre palabras; sin guiones ni cortes arbitrarios */
  .card-pack .card-title,
  .card-pack .card-descripcion,
  .card-pack .card-price,
  .card-pack .card-price-ref,
  .card-pack .card-price-kicker,
  .card-pack .card-price-special,
  .card-pack .card-precio-tier,
  .card-pack .card-precio-tier__etiqueta,
  .card-pack .card-precio-tier__valor,
  .card-pack .card-agotado-badge,
  .card-pack .card-ultima-unidad-chip {
    overflow-wrap: normal;
    word-break: normal;
    hyphens: none;
    -webkit-hyphens: none;
    -ms-hyphens: none;
  }

  .card-mainline {
    margin-bottom: 0.15rem;
    min-width: 0;
    max-width: 100%;
  }
  
  .card-title {
    font-size: clamp(0.86rem, 2.3vw, 1.02rem);
    line-height: 1.2;
    font-weight: 700;
    color: #2f1d22;
    width: 100%;
  }

  .card-mainline.text-center .card-title {
    text-align: center;
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
    border-top: 1px solid rgba(var(--feb-acento-rgb), 0.12);
  }

  .card-meta-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.42rem;
    padding-left: 0.38rem;
    border-left: 2px solid rgba(var(--feb-acento-rgb), 0.42);
    min-width: 0;
    overflow: visible;
  }

  .card-descripcion {
    margin: 0;
    font-size: clamp(0.68rem, 1.48vw, 0.76rem);
    line-height: 1.45;
    font-weight: 500;
    letter-spacing: 0.015em;
    color: #231e22;
    text-align: left;
    white-space: pre-line;
  }

  .card-colores-wrap {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    z-index: 1;
  }

  .card-colores-wrap:hover,
  .card-colores-wrap:focus-within {
    z-index: 6;
  }

  .card-colores-wrap .card-colores-tooltip {
    white-space: normal;
    max-width: min(14rem, 72vw);
  }

  .card-colores-oval-btn {
    display: inline-block;
    margin: 0;
    padding: 0.22rem 0.85rem;
    border: 1.5px solid var(--feb-acento);
    border-radius: 999px;
    background: rgba(var(--feb-acento-rgb), 0.08);
    font-size: clamp(0.62rem, 1.35vw, 0.7rem);
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: lowercase;
    color: var(--feb-acento);
    line-height: 1.3;
    cursor: pointer;
    transition:
      background 0.15s ease,
      color 0.15s ease,
      border-color 0.15s ease;
  }

  .card-colores-oval-btn:hover {
    background: var(--feb-acento);
    color: #fff;
    border-color: var(--feb-acento);
  }

  .card-colores-oval-btn:focus-visible {
    outline: 2px solid rgba(var(--feb-acento-rgb), 0.65);
    outline-offset: 2px;
  }

  .card-color-popup-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1080;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: rgba(20, 14, 18, 0.55);
  }

  .card-color-popup {
    position: relative;
    width: min(100%, 22rem);
    max-height: min(85vh, 32rem);
    overflow: auto;
    padding: 1.1rem 1.15rem 1rem;
    border-radius: 0.85rem;
    background: #fff;
    color: var(--feb-profundo);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.28);
  }

  .card-color-popup__cerrar {
    position: absolute;
    top: 0.35rem;
    right: 0.45rem;
    border: none;
    background: transparent;
    font-size: 1.5rem;
    line-height: 1;
    color: var(--feb-profundo);
    cursor: pointer;
    padding: 0.15rem 0.35rem;
  }

  .card-color-popup__titulo {
    margin: 0 1.5rem 0.65rem 0;
    font-size: 0.95rem;
    font-weight: 800;
    color: var(--feb-acento);
  }

  .card-color-popup__lista {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .card-color-popup__item {
    font-size: 0.82rem;
    line-height: 1.45;
    text-align: left;
  }

  .card-color-popup__color {
    font-weight: 800;
    color: var(--feb-acento);
  }

  .card-divider-wrap {
    display: flex;
    align-items: center;
  }
  
  .card-divider {
    border-color: rgba(var(--feb-acento-rgb), 0.24);
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
    min-width: 0;
    max-width: 100%;
  }

  .card-price-stack {
    min-width: 0;
    max-width: 100%;
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
    color: rgba(var(--feb-acento-rgb), 0.85);
    line-height: 1.2;
  }

  .card-price-special {
    font-size: clamp(1rem, 2.35vw, 1.12rem);
    line-height: 1.15;
    letter-spacing: 0.02em;
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
    background: var(--feb-acento);
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
    font-weight: 700;
  }

  .card-precios-list {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: baseline;
    gap: 0.15rem 0.3rem;
    text-align: center;
    max-width: 100%;
  }

  .card-precio-tier {
    display: inline-flex;
    flex: 0 0 auto;
    flex-wrap: nowrap;
    align-items: baseline;
    justify-content: center;
    gap: 0.12rem 0.18rem;
    font-size: clamp(0.62rem, 1.45vw, 0.74rem);
    line-height: 1.2;
    white-space: nowrap;
  }

  .card-precio-tier:not(:last-child)::after {
    content: '·';
    margin-inline: 0.12rem 0.02rem;
    font-weight: 700;
    color: rgba(var(--feb-acento-rgb), 0.5);
  }

  .card-precio-tier__etiqueta {
    font-weight: 600;
    color: #302a2e;
    flex: none;
    text-align: inherit;
  }

  .card-precio-tier__valor {
    font-size: clamp(0.66rem, 1.55vw, 0.8rem);
    letter-spacing: 0.01em;
  }

  @media (max-width: 575.98px) {
    .card-precios-list {
      gap: 0.1rem 0.22rem;
    }

    .card-precio-tier {
      font-size: clamp(0.54rem, 2.35vw, 0.66rem);
    }

    .card-precio-tier__valor {
      font-size: clamp(0.58rem, 2.45vw, 0.68rem);
    }
  }

  .card-price-footer:has(.card-precios-list) {
    min-height: auto;
    padding-bottom: 0.35rem;
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
  