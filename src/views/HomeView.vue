<template>
  <NavBar />
  <section id="sobre-mi" class="home-section home-section--ink py-3 py-md-4 sobre-mi-section">
    <img
      class="sobre-mi-watermark"
      :src="sobreMiLogoSrc"
      alt=""
      aria-hidden="true"
      decoding="async"
    >
    <div class="container sobre-mi d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 gap-md-4">
      <div
        ref="sobreMiFotoShellRef"
        class="sobre-mi-foto-shell"
        :class="{ 'sobre-mi-foto-shell--in-view': sobreMiFotoInView }"
      >
        <div class="sobre-mi-foto">
          <img
            class="sobre-mi-foto__img"
            :src="sobreMiFotoSrc"
            alt="Avatar Flores Eternamente Bellas"
            width="400"
            height="400"
            loading="lazy"
            decoding="async"
          >
        </div>
      </div>
      <div class="sobre-mi-texto">
        <p class="mb-1 mb-md-2">
          Es tiempo de <span class="sobre-mi-vino-mayus">APRENDER</span>, es tiempo de
          <span class="sobre-mi-vino-mayus">COMPARTIR</span>, es tiempo de
          <span class="sobre-mi-vino-mayus">DISFRUTAR</span>.
        </p>
        <p class="mb-0">
          Bienvenido al Mundo de Vinóloga...el mundo de los "<span class="sobre-mi-vino-mayus">VINOS CON CUENTO</span>"...
        </p>
      </div>
    </div>
    <div class="container sobre-mi-actions text-center mt-2">
      <a href="#" class="btn-top btn-top--scroll-circle" title="Volver al inicio" aria-label="Volver al inicio">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
        </svg>
      </a>
    </div>
  </section>

  <section id="flores" class="home-section home-section--slate home-section--madre pt-4 pt-md-5 pb-2 pb-md-3">
    <div class="container text-center packs-header">
      <h3 class="mb-4 fw-bold">Catálogo de Flores</h3>
    </div>
    <div
      class="packs-carousel-outer d-flex align-items-center gap-2 gap-sm-3 px-2 px-sm-3"
      @mouseenter="pauseFloresCarousel"
      @mouseleave="resumeFloresCarousel"
      @touchstart.passive="onFloresCarouselTouchStart"
      @touchend.passive="onFloresCarouselTouchEnd"
      @focusin="pauseFloresCarousel"
      @focusout="onFloresCarouselFocusOut"
    >
      <button
        type="button"
        class="packs-carousel-arrow packs-carousel-arrow--prev"
        aria-label="Ver packs anteriores"
        @click="scrollFloresCarousel(-1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
      <div
        ref="floresCarouselRef"
        class="packs-carousel-wrap flex-grow-1 min-w-0"
        tabindex="0"
        role="region"
        aria-label="Carrusel de flores, desplazamiento horizontal"
      >
        <div class="packs-carousel-inner">
          <div
            v-for="(flor, idx) in floresLoop"
            :key="`flor-${flor.id}-${idx}`"
            class="packs-carousel-slide"
          >
            <CardComponent
              :wine-id="flor.id"
              title=""
              :descripcion="flor.texto"
              :image="catalogoImagePath(flor)"
              :price="flor.price"
              :precio-especial="flor.precioEspecial"
              :agotado="Boolean(flor.agotado)"
              :ultima-unidad="Boolean(flor.ultimaUnidad)"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        class="packs-carousel-arrow packs-carousel-arrow--next"
        aria-label="Ver packs siguientes"
        @click="scrollFloresCarousel(1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </div>
    <div class="container packs-scroll-to-flores text-end mt-2">
      <a
        href="#sobre-mi"
        class="packs-scroll-to-flores-link d-inline-flex align-items-center text-decoration-none"
        title="Volver a las flores"
      >
        <span class="packs-scroll-to-flores-text">Volver arriba</span>
        <span class="btn-top btn-top--scroll-circle flex-shrink-0" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
          </svg>
        </span>
      </a>
    </div>
  </section>

  <section id="ramos" class="home-section home-section--slate pt-4 pt-md-5 pb-2 pb-md-3">
    <div class="container text-center packs-header">
      <h3 class="mb-4 fw-bold">Ideas de Ramos</h3>
    </div>
    <div
      class="packs-carousel-outer d-flex align-items-center gap-2 gap-sm-3 px-2 px-sm-3"
      @mouseenter="pauseRamosCarousel"
      @mouseleave="resumeRamosCarousel"
      @touchstart.passive="onRamosCarouselTouchStart"
      @touchend.passive="onRamosCarouselTouchEnd"
      @focusin="pauseRamosCarousel"
      @focusout="onRamosCarouselFocusOut"
    >
      <button
        type="button"
        class="packs-carousel-arrow packs-carousel-arrow--prev"
        aria-label="Ver ramos anteriores"
        @click="scrollRamosCarousel(-1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
      <div
        ref="ramosCarouselRef"
        class="packs-carousel-wrap flex-grow-1 min-w-0"
        tabindex="0"
        role="region"
        aria-label="Carrusel de ramos, desplazamiento horizontal"
      >
        <div class="packs-carousel-inner">
          <div
            v-for="(ramo, idx) in ramosLoop"
            :key="`ramo-${ramo.id}-${idx}`"
            class="packs-carousel-slide"
          >
            <CardComponent
              :wine-id="ramo.id"
              :title="catalogoNombre(ramo)"
              title-align="center"
              :descripcion="ramo.texto"
              :image="catalogoImagePath(ramo)"
              :price="ramo.price"
              :precio-especial="ramo.precioEspecial"
              :agotado="Boolean(ramo.agotado)"
              :ultima-unidad="Boolean(ramo.ultimaUnidad)"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        class="packs-carousel-arrow packs-carousel-arrow--next"
        aria-label="Ver ramos siguientes"
        @click="scrollRamosCarousel(1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </div>
    <div class="container packs-scroll-to-flores text-end mt-2">
      <a
        href="#flores"
        class="packs-scroll-to-flores-link d-inline-flex align-items-center text-decoration-none"
        title="Ir al catálogo de flores"
      >
        <span class="packs-scroll-to-flores-text">Ver flores</span>
        <span class="btn-top btn-top--scroll-circle flex-shrink-0" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
          </svg>
        </span>
      </a>
    </div>
  </section>

  <section id="accesorios" class="home-section home-section--slate home-section--madre pt-4 pt-md-5 pb-2 pb-md-3">
    <div class="container text-center packs-header">
      <h3 class="mb-4 fw-bold">Accesorios</h3>
    </div>
    <div
      class="packs-carousel-outer d-flex align-items-center gap-2 gap-sm-3 px-2 px-sm-3"
      @mouseenter="pauseAccesoriosCarousel"
      @mouseleave="resumeAccesoriosCarousel"
      @touchstart.passive="onAccesoriosCarouselTouchStart"
      @touchend.passive="onAccesoriosCarouselTouchEnd"
      @focusin="pauseAccesoriosCarousel"
      @focusout="onAccesoriosCarouselFocusOut"
    >
      <button
        type="button"
        class="packs-carousel-arrow packs-carousel-arrow--prev"
        aria-label="Ver accesorios anteriores"
        @click="scrollAccesoriosCarousel(-1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
      <div
        ref="accesoriosCarouselRef"
        class="packs-carousel-wrap flex-grow-1 min-w-0"
        tabindex="0"
        role="region"
        aria-label="Carrusel de accesorios, desplazamiento horizontal"
      >
        <div class="packs-carousel-inner">
          <div
            v-for="(accesorio, idx) in accesoriosLoop"
            :key="`accesorio-${accesorio.id}-${idx}`"
            class="packs-carousel-slide"
          >
            <CardComponent
              :wine-id="accesorio.id"
              :title="catalogoNombre(accesorio)"
              title-align="center"
              :descripcion="accesorio.texto"
              :image="catalogoImagePath(accesorio)"
              :price="accesorio.price"
              :precio-especial="accesorio.precioEspecial"
              :agotado="Boolean(accesorio.agotado)"
              :ultima-unidad="Boolean(accesorio.ultimaUnidad)"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        class="packs-carousel-arrow packs-carousel-arrow--next"
        aria-label="Ver accesorios siguientes"
        @click="scrollAccesoriosCarousel(1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </div>
    <div class="container packs-scroll-to-flores text-end mt-2">
      <a
        href="#ramos"
        class="packs-scroll-to-flores-link d-inline-flex align-items-center text-decoration-none"
        title="Ir a ideas de ramos"
      >
        <span class="packs-scroll-to-flores-text">Ver ramos</span>
        <span class="btn-top btn-top--scroll-circle flex-shrink-0" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
          </svg>
        </span>
      </a>
    </div>
  </section>

  <div class="prefooter-pitch prefooter-pitch--dark">
    <div class="container text-center">
      <span class="prefooter-line">Pregunta por colores disponibles</span>
      <span class="prefooter-sep" aria-hidden="true">·</span>

      <span class="prefooter-line">Consulta valor de despacho a tu comuna</span>
    </div>
  </div>

  <div id="contacto" class="contacto-wrap">
    <FooterComponent />
  </div>

</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import NavBar from '../components/NavBar'
import FooterComponent from '../components/FooterComponent.vue'
import CardComponent from '../components/CardComponent.vue'
import catalogoFlores from '../data/catalogoFlores.json'
import catalogoRamos from '../data/catalogoRamos.json'
import catalogoAccesorios from '../data/catalogoAccesorios.json'
import { catalogoImagePath, catalogoNombre } from '../utils/catalogo'

const sobreMiFotoSrc = '/img/Avatar.jpg'
const sobreMiLogoSrc = '/img/Logo.JPG'

/** Dos series iguales para bucle de scroll sin salto visible. */
function catalogoLoop(items) {
  return items.length > 1 ? [...items, ...items] : items
}

const floresLoop = computed(() => catalogoLoop(catalogoFlores))
const ramosLoop = computed(() => catalogoLoop(catalogoRamos))
const accesoriosLoop = computed(() => catalogoLoop(catalogoAccesorios))

const floresCarouselRef = ref(null)
const ramosCarouselRef = ref(null)
const accesoriosCarouselRef = ref(null)
const sobreMiFotoShellRef = ref(null)
const sobreMiFotoInView = ref(false)
const floresCarouselPaused = ref(false)
const ramosCarouselPaused = ref(false)
const accesoriosCarouselPaused = ref(false)
const reduceMotion = ref(false)

/** Píxeles por frame (~60 fps); ~0.3 ≈ 18 px/s */
const SCROLL_STEP = 0.32

/** Ancho del hueco del carrusel (sustituye cqi sin container-type, evita avisos del validador CSS) */
const PACKS_CAROUSEL_IW = '--packs-carousel-iw'

let rafId = 0
let syncCarouselRaf = null
let carouselResizeObserver = null
let sobreMiFotoObserver = null

const floresCarouselTimers = { touch: null, focus: null, arrow: null }
const ramosCarouselTimers = { touch: null, focus: null, arrow: null }
const accesoriosCarouselTimers = { touch: null, focus: null, arrow: null }

const catalogoCarouselRefs = [floresCarouselRef, ramosCarouselRef, accesoriosCarouselRef]

function syncCarouselInlineSize(carouselRef) {
  const el = carouselRef.value
  if (!el) return
  const w = el.clientWidth
  if (w > 0) el.style.setProperty(PACKS_CAROUSEL_IW, `${w}px`)
}

function syncAllCarouselsInlineSize() {
  for (const carouselRef of catalogoCarouselRefs) {
    syncCarouselInlineSize(carouselRef)
  }
}

function scheduleSyncCarouselInlineSize() {
  if (syncCarouselRaf != null) return
  syncCarouselRaf = requestAnimationFrame(() => {
    syncCarouselRaf = null
    syncAllCarouselsInlineSize()
  })
}

function createCarouselControls(carouselRef, pausedRef, timers) {
  function pause() {
    pausedRef.value = true
  }

  function resume() {
    pausedRef.value = false
  }

  function onTouchStart() {
    pause()
    if (timers.touch) {
      clearTimeout(timers.touch)
      timers.touch = null
    }
  }

  function onTouchEnd() {
    if (timers.touch) clearTimeout(timers.touch)
    timers.touch = setTimeout(() => {
      pausedRef.value = false
      timers.touch = null
    }, 2400)
  }

  function onFocusOut(ev) {
    const outer = ev.currentTarget
    const next = ev.relatedTarget
    if (next && outer.contains(next)) return
    if (timers.focus) clearTimeout(timers.focus)
    timers.focus = setTimeout(() => {
      pausedRef.value = false
      timers.focus = null
    }, 400)
  }

  function scroll(direction) {
    const el = carouselRef.value
    if (!el) return
    pause()
    if (timers.arrow) clearTimeout(timers.arrow)

    const inner = el.querySelector('.packs-carousel-inner')
    const firstSlide = inner?.querySelector('.packs-carousel-slide')
    let delta = el.clientWidth * direction
    if (inner && firstSlide) {
      const gapPx = parseFloat(getComputedStyle(inner).gap) || 0
      const slideW = firstSlide.offsetWidth
      const threeCols = window.matchMedia('(min-width: 768px)').matches
      if (!threeCols) delta = (slideW + gapPx) * direction
    }

    el.scrollBy({
      left: delta,
      behavior: reduceMotion.value ? 'auto' : 'smooth',
    })
    timers.arrow = setTimeout(() => {
      pausedRef.value = false
      timers.arrow = null
    }, 3200)
  }

  function tickStep() {
    const el = carouselRef.value
    if (!el || pausedRef.value || reduceMotion.value) return
    const half = el.scrollWidth / 2
    if (half > 1) {
      el.scrollLeft += SCROLL_STEP
      if (el.scrollLeft >= half) el.scrollLeft -= half
    }
  }

  function clearTimers() {
    if (timers.touch) clearTimeout(timers.touch)
    if (timers.focus) clearTimeout(timers.focus)
    if (timers.arrow) clearTimeout(timers.arrow)
  }

  return { pause, resume, onTouchStart, onTouchEnd, onFocusOut, scroll, tickStep, clearTimers }
}

const floresCarousel = createCarouselControls(
  floresCarouselRef,
  floresCarouselPaused,
  floresCarouselTimers,
)
const ramosCarousel = createCarouselControls(
  ramosCarouselRef,
  ramosCarouselPaused,
  ramosCarouselTimers,
)
const accesoriosCarousel = createCarouselControls(
  accesoriosCarouselRef,
  accesoriosCarouselPaused,
  accesoriosCarouselTimers,
)

const pauseFloresCarousel = floresCarousel.pause
const resumeFloresCarousel = floresCarousel.resume
const onFloresCarouselTouchStart = floresCarousel.onTouchStart
const onFloresCarouselTouchEnd = floresCarousel.onTouchEnd
const onFloresCarouselFocusOut = floresCarousel.onFocusOut
const scrollFloresCarousel = floresCarousel.scroll

const pauseRamosCarousel = ramosCarousel.pause
const resumeRamosCarousel = ramosCarousel.resume
const onRamosCarouselTouchStart = ramosCarousel.onTouchStart
const onRamosCarouselTouchEnd = ramosCarousel.onTouchEnd
const onRamosCarouselFocusOut = ramosCarousel.onFocusOut
const scrollRamosCarousel = ramosCarousel.scroll

const pauseAccesoriosCarousel = accesoriosCarousel.pause
const resumeAccesoriosCarousel = accesoriosCarousel.resume
const onAccesoriosCarouselTouchStart = accesoriosCarousel.onTouchStart
const onAccesoriosCarouselTouchEnd = accesoriosCarousel.onTouchEnd
const onAccesoriosCarouselFocusOut = accesoriosCarousel.onFocusOut
const scrollAccesoriosCarousel = accesoriosCarousel.scroll

function tick() {
  floresCarousel.tickStep()
  ramosCarousel.tickStep()
  accesoriosCarousel.tickStep()
  rafId = requestAnimationFrame(tick)
}

function setupSobreMiFotoReveal() {
  if (reduceMotion.value) {
    sobreMiFotoInView.value = true
    return
  }
  const shell = sobreMiFotoShellRef.value
  if (!shell) {
    sobreMiFotoInView.value = true
    return
  }
  if (typeof IntersectionObserver === 'undefined') {
    sobreMiFotoInView.value = true
    return
  }
  sobreMiFotoObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          sobreMiFotoInView.value = true
          sobreMiFotoObserver?.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.22, rootMargin: '0px 0px -8% 0px' },
  )
  sobreMiFotoObserver.observe(shell)
}

onMounted(async () => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  setupSobreMiFotoReveal()
  syncAllCarouselsInlineSize()
  await nextTick()
  syncAllCarouselsInlineSize()
  if (typeof ResizeObserver !== 'undefined') {
    carouselResizeObserver = new ResizeObserver(() => scheduleSyncCarouselInlineSize())
    for (const carouselRef of catalogoCarouselRefs) {
      const el = carouselRef.value
      if (el) carouselResizeObserver.observe(el)
    }
  }
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  sobreMiFotoObserver?.disconnect()
  sobreMiFotoObserver = null
  if (syncCarouselRaf != null) {
    cancelAnimationFrame(syncCarouselRaf)
    syncCarouselRaf = null
  }
  carouselResizeObserver?.disconnect()
  carouselResizeObserver = null
  cancelAnimationFrame(rafId)
  floresCarousel.clearTimers()
  ramosCarousel.clearTimers()
  accesoriosCarousel.clearTimers()
})

</script>

<style scoped>
.home-section,
.home-section--ink,
.home-section--slate,
.home-section--madre {
  color: var(--vin-texto-sobre-logo);
  background-color: var(--vin-logo-fondo-color);
  background-image: var(--vin-logo-fondo-gradient);
  background-repeat: no-repeat;
  background-size: cover;
}

.packs-header {
  position: relative;
  padding-bottom: 0.75rem;
}

.home-divider {
  max-width: min(100%, 960px);
  margin-left: auto;
  margin-right: auto;
  opacity: 0.35;
}

/* Misma base que el footer: evita cualquier rendija entre prefooter y pie */
.contacto-wrap {
  margin: 0;
  padding: 0;
  background-color: var(--vin-superficie-oscura);
}

.prefooter-pitch {
  padding-top: 0.85rem;
  padding-bottom: 1.35rem;
  margin-bottom: 0;
}

.prefooter-pitch .container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  row-gap: 0.45rem;
  column-gap: 0.25rem;
}

/* Mismo fondo y ribete que la navbar (.bg-vin-negro + .nav-vino) */
.prefooter-pitch--dark {
  width: 100%;
  margin-inline: 0;
  background-color: var(--vin-negro-marca);
  background-image: none;
  border-top: 1px solid var(--vin-borde-sutil);
  border-bottom: none;
  box-shadow: 0 1px 0 0 rgba(var(--vin-pastel-polvo-rgb), 0.45);
}

.prefooter-line {
  font-size: clamp(0.84rem, 2.25vw, 1rem);
  line-height: 1.55;
  font-weight: 500;
  letter-spacing: 0.025em;
  color: var(--vin-texto-claro);
}

.prefooter-sep {
  color: var(--vin-btn-scroll-bg);
  text-shadow: none;
  font-weight: 800;
  font-size: 1.65em;
  line-height: 1;
  padding-inline: 0.32rem;
  user-select: none;
}

/* Móvil: una línea por texto, sin separadores */
@media (max-width: 575.98px) {
  .prefooter-pitch .container {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    row-gap: 0.45rem;
    column-gap: 0;
  }

  .prefooter-sep {
    display: none;
  }
}

.home-section h3 {
  font-size: clamp(1rem, 2.6vw, 1.35rem);
  letter-spacing: 0.08em;
  display: inline-block;
  padding: 0.2em 0.85em;
  margin-bottom: 0.4rem;
  color: var(--vin-titulo-seccion-color);
  text-shadow: none;
}

.home-section h3::selection {
  background: rgba(var(--vin-pastel-polvo-rgb), 0.85);
  color: var(--vin-profundo);
}

#flores .packs-scroll-to-flores-link {
  gap: clamp(0.45rem, 2vw, 0.85rem);
  color: var(--vin-texto-sobre-logo);
  font-weight: 600;
  font-size: clamp(0.96rem, 2.4vw, 1.12rem);
  letter-spacing: 0.01em;
  text-shadow: none;
}

#flores .packs-scroll-to-flores {
  display: flex;
  justify-content: flex-end;
}

#flores .packs-scroll-to-flores-link:hover {
  color: var(--vin-acento);
}

#flores .packs-scroll-to-flores-link:hover .packs-scroll-to-flores-text,
#flores .packs-scroll-to-flores-link:focus-visible .packs-scroll-to-flores-text {
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

#flores .packs-scroll-to-flores-link:focus-visible {
  outline: 2px solid rgba(var(--vin-rosa-sorbete-rgb), 0.6);
  outline-offset: 4px;
  border-radius: 0.35rem;
}

#sobre-mi.sobre-mi-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  min-height: clamp(22rem, 52vh, 36rem);
}

#sobre-mi .sobre-mi-watermark {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.03);
  transform-origin: center;
  pointer-events: none;
  opacity: 0.22;
  mix-blend-mode: multiply;
  filter: contrast(1.12) saturate(1.05);
  user-select: none;
}

#sobre-mi .container.sobre-mi,
#sobre-mi .sobre-mi-actions {
  position: relative;
  z-index: 1;
  max-width: min(100%, 52rem);
  margin-inline: auto;
  background: transparent;
}

#sobre-mi .sobre-mi-foto-shell {
  --foto-tam: 184px;
  flex: 0 0 auto;
  width: var(--foto-tam);
  height: var(--foto-tam);
  margin-inline: auto;
  position: relative;
  opacity: 0;
  transform: scale(0.96) translateY(14px);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

#sobre-mi .sobre-mi-foto-shell--in-view {
  opacity: 1;
  transform: scale(1) translateY(0);
}

#sobre-mi .sobre-mi-foto {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  overflow: hidden;
  background: transparent;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.22);
}

@media (min-width: 768px) {
  #sobre-mi .sobre-mi-foto-shell {
    --foto-tam: 216px;
    margin-inline: auto;
  }
}

.sobre-mi-foto__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

@media (prefers-reduced-motion: reduce) {
  #sobre-mi .sobre-mi-foto-shell {
    opacity: 1;
    transform: none;
    transition: none;
  }

  #sobre-mi .sobre-mi-watermark {
    transform: none;
    mix-blend-mode: multiply;
    opacity: 0.16;
    filter: none;
  }
}

#sobre-mi .sobre-mi-texto {
  flex: 0 1 auto;
  min-width: 0;
  max-width: min(100%, 36rem);
  margin-inline: auto;
  text-align: center;
  line-height: 1.78;
  font-size: clamp(0.96rem, 2vw, 1.16rem);
  font-weight: 500;
  color: var(--vin-texto-sobre-logo);
  text-shadow: none;
  background: transparent;
}

#sobre-mi .sobre-mi-texto p {
  background: transparent;
}

#sobre-mi .sobre-mi-vino-mayus {
  color: var(--vin-acento);
  font-weight: 800;
  letter-spacing: 0.045em;
  text-shadow: none;
}

.highlight {
  color: var(--vin-acento);
  font-style: italic;
  font-weight: bold;
}

.frase-final {
  font-style: italic;
  animation: colorPulse 3s ease-in-out infinite;
}

@keyframes colorPulse {
  0% {
    color: var(--vin-texto-sobre-logo-muted);
  }
  50% {
    color: var(--vin-acento);
  }
  100% {
    color: var(--vin-texto-sobre-logo-muted);
  }
}

.btn-top {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.btn-top--scroll-circle {
  width: clamp(2.35rem, 7vw, 2.65rem);
  height: clamp(2.35rem, 7vw, 2.65rem);
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: var(--vin-btn-scroll-bg);
  box-shadow: var(--vin-btn-scroll-shadow);
  color: var(--vin-btn-scroll-color) !important;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.btn-top--scroll-circle:hover {
  background-color: var(--vin-btn-scroll-bg-hover);
  box-shadow: var(--vin-btn-scroll-shadow-hover);
  color: var(--vin-btn-scroll-color) !important;
}

.btn-top--scroll-circle:active {
  transform: scale(0.96);
}

.btn-top--scroll-circle:focus-visible {
  outline: 2px solid rgba(var(--vin-avatar-fondo-rgb), 0.85);
  outline-offset: 3px;
}

.btn-top--scroll-circle svg {
  flex-shrink: 0;
}

.packs-carousel-outer {
  max-width: 100%;
  min-height: 0;
}

.packs-carousel-arrow {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(2.5rem, 8vw, 2.85rem);
  height: clamp(2.5rem, 8vw, 2.85rem);
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: var(--vin-btn-scroll-bg);
  color: var(--vin-btn-scroll-color);
  box-shadow: var(--vin-btn-scroll-shadow);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.packs-carousel-arrow:hover {
  background-color: var(--vin-btn-scroll-bg-hover);
  box-shadow: var(--vin-btn-scroll-shadow-hover);
}

.packs-carousel-arrow:active {
  transform: scale(0.96);
}

.packs-carousel-arrow:focus-visible {
  outline: 2px solid rgba(var(--vin-avatar-fondo-rgb), 0.85);
  outline-offset: 3px;
}

.packs-carousel-wrap {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--vin-rosa-ballet-rgb), 0.42) transparent;
  padding-block: 0.25rem 0.75rem;
  outline: none;
}

.packs-carousel-wrap:focus-visible {
  box-shadow: 0 0 0 2px rgba(var(--vin-acento-rgb), 0.35);
  border-radius: 0.35rem;
}

.packs-carousel-wrap::-webkit-scrollbar {
  height: 6px;
}

.packs-carousel-wrap::-webkit-scrollbar-thumb {
  background: linear-gradient(
    180deg,
    rgba(var(--vin-pastel-nube-rgb), 0.65),
    rgba(var(--vin-rosa-sorbete-rgb), 0.55)
  );
  border-radius: 4px;
}

.packs-carousel-inner {
  --packs-gap: clamp(0.75rem, 2vw, 1.15rem);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: var(--packs-gap);
  width: max-content;
  min-height: 100%;
}

/*
 * Siempre tarjetas enteras en el viewport: 1 columna en móvil, 3 en md+.
 * --packs-carousel-iw = ancho del área scroll (ResizeObserver).
 */
.packs-carousel-slide {
  flex: 0 0 auto;
  box-sizing: border-box;
  scroll-snap-align: start;
  scroll-snap-stop: normal;
  min-height: 0;
  width: var(--packs-carousel-iw, 100%);
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .packs-carousel-slide {
    width: calc((var(--packs-carousel-iw, 100%) - 2 * var(--packs-gap)) / 3);
  }
}

.packs-carousel-slide > * {
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  align-self: stretch;
}
</style>