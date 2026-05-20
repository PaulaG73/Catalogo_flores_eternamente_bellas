/** Solo dígitos: código de país + número (sin + ni espacios). Ej. Chile: 56912345678 */
export const WHATSAPP_NUMBER_DIGITS = '56996450950'

/**
 * WhatsApp catálogo / flores (sección sobre mí). Distinto al número principal de packs y pie de página.
 * Solo dígitos: código de país + número.
 */
export const WHATSAPP_CATALOGO_DIGITS = '56964856456'

/** Texto inicial del chat al abrir el enlace de catálogo (api.whatsapp.com). */
const WHATSAPP_CATALOGO_PREFILL_TEXT =
  'Hola! Vi tu link en el catálogo de Vinóloga y necesito información sobre las Flores eternamente bellas'

/**
 * URL pública del sitio (.env.development / .env.production).
 * Referencia literal a `process.env.VUE_APP_PUBLIC_SITE_URL` para que @vue/cli-service la sustituya.
 */
const PUBLIC_SITE_FROM_ENV = process.env.VUE_APP_PUBLIC_SITE_URL || ''

/**
 * Si el .env no llega al bundle en dev, el enlace a la foto no puede quedar vacío.
 * Cambia esto si despliegas en otro dominio (o define siempre VUE_APP_PUBLIC_SITE_URL).
 */
const WHATSAPP_FALLBACK_SITE_ORIGIN = 'https://catalogomadre.netlify.app'

function publicSiteUrlFromEnv() {
  return PUBLIC_SITE_FROM_ENV
}

function digitsOnly() {
  return WHATSAPP_NUMBER_DIGITS.replace(/\D/g, '')
}

function normalizeHttpsRoot(url) {
  const u = String(url || '')
    .trim()
    .replace(/\/+$/, '')
  if (!u) return ''
  return u.replace(/^http:\/\//i, 'https://')
}

/**
 * Origen público para enlaces en WhatsApp: env, luego fallback fijo, luego origin (no localhost).
 */
function getShareBaseOrigin() {
  let origin = normalizeHttpsRoot(publicSiteUrlFromEnv())
  if (!origin) origin = normalizeHttpsRoot(WHATSAPP_FALLBACK_SITE_ORIGIN)
  if (origin) return origin

  if (typeof window !== 'undefined' && window.location?.origin) {
    const o = window.location.origin.replace(/\/+$/, '')
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(o)) return ''
    return normalizeHttpsRoot(o)
  }

  return ''
}

const OG_PAGE_SUFFIX = '.html'

/**
 * Nombre de archivo en `public/`: `og-{id en minúsculas}.html` (Netlify/Linux distinguen mayúsculas; si no coincide, cae el SPA y WhatsApp muestra el og:image del index: logo).
 */
function packOgPagePath(packId) {
  const id = typeof packId === 'string' ? packId.trim() : ''
  if (!id) return ''
  return `og-${id.toLowerCase()}${OG_PAGE_SUFFIX}`
}

/**
 * Slug de página OG solo para ids simbólicos (legacy).
 * Los ids numéricos del catálogo actual no se mapean aquí: WhatsApp usa la URL directa de `image`
 * del JSON y así la vista prevía coincide con cada vino.
 */
const OG_SLUG_BY_PACK_ID = {
  alchemysta: 'alchemysta',
  'mujer-andina': 'mujer-andina',
  rose: 'rose',
  owm: 'owm',
  algorta: 'algorta',
  rockstar: 'tripack-rockstars',
  'tripack-rockstars': 'tripack-rockstars',
  sensaciones: 'sensaciones',
  maiporigen: 'maiporigen',
  'algorta-grand-reserve': 'algorta-grand-reserve',
  coleccionalgorta: 'coleccionalgorta',
  innovacion: 'innovacion',
}

function ogSlugFromPackId(packId) {
  const id = typeof packId === 'string' ? packId.trim().toLowerCase() : ''
  if (!id) return ''
  return OG_SLUG_BY_PACK_ID[id] || ''
}

/** Fuerza recarga de preview en WhatsApp (caché agresiva). */
const WHATSAPP_PREVIEW_CACHE_BUSTER = 'v=7'

function withCacheBuster(url) {
  const u = String(url || '').trim()
  if (!u) return ''
  if (u.includes(WHATSAPP_PREVIEW_CACHE_BUSTER)) return u
  return u.includes('?') ? `${u}&${WHATSAPP_PREVIEW_CACHE_BUSTER}` : `${u}?${WHATSAPP_PREVIEW_CACHE_BUSTER}`
}

/**
 * URL para vista previa en WhatsApp: HTML con og:image (no el .jpg directo).
 */
function resolvePackPreviewUrlForWhatsApp(packId, imagePath) {
  const base = getShareBaseOrigin()
  if (!base) return resolvePackImageUrlForWhatsApp(imagePath)
  const slug = ogSlugFromPackId(packId)
  if (slug) {
    const page = packOgPagePath(slug)
    return withCacheBuster(`${base}/${page}`)
  }
  return withCacheBuster(resolvePackImageUrlForWhatsApp(imagePath))
}

/**
 * URL absoluta de un asset en `public/` para compartir por WhatsApp (solo HTTPS y dominio público).
 */
function resolvePackImageUrlForWhatsApp(assetPath) {
  if (!assetPath || typeof assetPath !== 'string') return ''
  const trimmed = assetPath.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return normalizeHttpsRoot(trimmed)

  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  const base = getShareBaseOrigin()
  if (!base) return ''
  return `${base}${path}`
}

/** Precio sin símbolo $ (en WhatsApp el $ puede truncar el resto del mensaje prefijado). */
function priceForWhatsAppMessage(price) {
  if (!price || typeof price !== 'string') return ''
  return price.trim().replace(/\$/g, '').replace(/\s+/g, ' ').trim()
}

/**
 * URL absoluta HTTPS de un asset en `public/` (p. ej. `/img/pack.jpg`).
 * En el navegador usa `location.origin`; sin `window` usa env.
 */
export function resolvePublicAssetUrl(assetPath) {
  if (!assetPath || typeof assetPath !== 'string') return ''
  const trimmed = assetPath.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return normalizeHttpsRoot(trimmed)

  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`

  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}${path}`
  }

  const site = normalizeHttpsRoot(PUBLIC_SITE_FROM_ENV)
  if (site) return `${site}${path}`

  return path
}

export function getWhatsAppUrl() {
  const digits = digitsOnly()
  if (!digits) return '#'
  return `https://wa.me/${digits}`
}

/**
 * WhatsApp desde el pie: un solo texto (api.whatsapp.com evita rarezas con wa.me + borradores viejos).
 */
export function getWhatsAppFooterUrl() {
  const digits = digitsOnly()
  if (!digits) return '#'
  const text = 'Hola Vinóloga, quiero hacer un pedido de vinos...'
  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(text)}`
}

function catalogoDigitsOnly() {
  return String(WHATSAPP_CATALOGO_DIGITS || '').replace(/\D/g, '')
}

export function isWhatsAppCatalogoConfigured() {
  return catalogoDigitsOnly().length > 0
}

/**
 * WhatsApp desde «Solicita tu catálogo de flores, aquí»: número {@link WHATSAPP_CATALOGO_DIGITS},
 * texto prefijado y enlace a página OG estática (vista previa con imagen del poema / flores).
 */
export function getWhatsAppCatalogoUrl() {
  const digits = catalogoDigitsOnly()
  if (!digits) return '#'
  const base = getShareBaseOrigin()
  let body = WHATSAPP_CATALOGO_PREFILL_TEXT
  if (base && /^https:\/\//i.test(base)) {
    const previewUrl = withCacheBuster(`${base}/og-sobre-mi.html`)
    body = `${previewUrl}\n\n${WHATSAPP_CATALOGO_PREFILL_TEXT}`
  }
  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(body)}`
}

/**
 * WhatsApp para flores individuales (modal de "Sobre mí"):
 * mensaje "Quiero esta flor" + nombre + precio + imagen pública.
 * @param {{ nombre?: string, precio?: string, src?: string }} flower
 */
export function getWhatsAppFlowerUrl(flower) {
  const digits = catalogoDigitsOnly()
  if (!digits) return '#'

  const nombre = typeof flower?.nombre === 'string' ? flower.nombre.trim() : ''
  const precio = typeof flower?.precio === 'string' ? flower.precio.trim() : ''
  const imageUrl = resolvePackImageUrlForWhatsApp(flower?.src || '')
  const precioTxt = priceForWhatsAppMessage(precio)

  const parts = ['Quiero esta flor']
  if (nombre) parts.push(nombre)
  if (precioTxt) parts.push(`Precio (CLP): ${precioTxt}`)
  parts.push('')

  if (imageUrl && /^https:\/\//i.test(imageUrl)) {
    parts.unshift(withCacheBuster(imageUrl))
    parts.push('')
  }

  const text = parts.join('\n').trimEnd()
  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(text)}`
}

/**
 * Enlace api.whatsapp.com: «¿Vamos con este vino?» + datos + vista previa (imagen o página OG) + precio.
 * @param {{ title?: string, valle?: string, price?: string, precioEspecial?: string, image?: string, packId?: string }} pack
 */
export function getWhatsAppPackUrl(pack) {
  const digits = digitsOnly()
  if (!digits) return '#'

  const title = typeof pack?.title === 'string' ? pack.title.trim() : ''
  const valle = typeof pack?.valle === 'string' ? pack.valle.trim() : ''
  const price = typeof pack?.price === 'string' ? pack.price.trim() : ''
  const precioEspecial =
    typeof pack?.precioEspecial === 'string' ? pack.precioEspecial.trim() : ''
  const previewUrl = resolvePackPreviewUrlForWhatsApp(pack?.packId, pack?.image || '')

  const parts = ['Quiero este vino']
  if (title) parts.push(title)
  if (valle) parts.push(valle)
  parts.push('')

  if (previewUrl && /^https:\/\//i.test(previewUrl)) {
    parts.push(previewUrl)
    parts.push('')
  }

  const espTxt = priceForWhatsAppMessage(precioEspecial)
  const refTxt = priceForWhatsAppMessage(price)
  if (espTxt) {
    parts.push(`Precio especial (CLP): ${espTxt}`)
    if (refTxt) parts.push(`Precio referencia (CLP): ${refTxt}`)
  } else if (refTxt) {
    parts.push(`Precio (CLP): ${refTxt}`)
  }

  const text = parts.join('\n').trimEnd()
  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(text)}`
}

export function isWhatsAppConfigured() {
  return digitsOnly().length > 0
}
