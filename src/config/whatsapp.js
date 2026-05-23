/**
 * WhatsApp del catálogo (tarjetas, footer y consultas).
 * Solo dígitos: código de país + número. Ej. Chile: 56912345678
 */
export const WHATSAPP_CATALOGO_DIGITS = '56964856456'

/** Alias legacy — mismo número que el catálogo */
export const WHATSAPP_NUMBER_DIGITS = WHATSAPP_CATALOGO_DIGITS

const WHATSAPP_CATALOGO_PREFILL_TEXT =
  'Hola! Vi tu link en el catálogo de Flores Eternamente Bellas y me gustaría más información.'

const PUBLIC_SITE_FROM_ENV = process.env.VUE_APP_PUBLIC_SITE_URL || ''

function publicSiteUrlFromEnv() {
  return PUBLIC_SITE_FROM_ENV
}

function catalogoDigitsOnly() {
  return String(WHATSAPP_CATALOGO_DIGITS || '').replace(/\D/g, '')
}

/** Mismo teléfono del catálogo en footer, ramos y accesorios */
function digitsOnly() {
  return catalogoDigitsOnly()
}

function normalizeHttpsRoot(url) {
  const u = String(url || '')
    .trim()
    .replace(/\/+$/, '')
  if (!u) return ''
  return u.replace(/^http:\/\//i, 'https://')
}

function getShareBaseOrigin() {
  let origin = normalizeHttpsRoot(publicSiteUrlFromEnv())
  if (origin) return origin

  if (typeof window !== 'undefined' && window.location?.origin) {
    const o = window.location.origin.replace(/\/+$/, '')
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(o)) return ''
    return normalizeHttpsRoot(o)
  }

  return ''
}

const WHATSAPP_PREVIEW_CACHE_BUSTER = 'v=1'

function withCacheBuster(url) {
  const u = String(url || '').trim()
  if (!u) return ''
  if (u.includes(WHATSAPP_PREVIEW_CACHE_BUSTER)) return u
  return u.includes('?') ? `${u}&${WHATSAPP_PREVIEW_CACHE_BUSTER}` : `${u}?${WHATSAPP_PREVIEW_CACHE_BUSTER}`
}

/** Slug de página share: flor-3, ramo-1, accesorio-4 */
export function sharePageSlug(catalogoTipo, itemId) {
  const tipo = String(catalogoTipo || '').trim().toLowerCase()
  const id = String(itemId || '').trim()
  if (!id || !['flor', 'ramo', 'accesorio'].includes(tipo)) return ''
  return `${tipo}-${id}`
}

/** URL pública de share/*.html para vista previa OG en WhatsApp */
function resolveSharePageUrlForWhatsApp({ catalogoTipo, itemId }) {
  const slug = sharePageSlug(catalogoTipo, itemId)
  if (!slug) return ''
  const base = getShareBaseOrigin()
  if (!base || !/^https:\/\//i.test(base)) return ''
  return `${base}/share/${slug}.html`
}

function prependWhatsAppPreviewUrl(parts, previewUrl) {
  if (!previewUrl || !/^https:\/\//i.test(previewUrl)) return
  parts.unshift(withCacheBuster(previewUrl))
  parts.push('')
}

function priceForWhatsAppMessage(price) {
  if (!price || typeof price !== 'string') return ''
  return price.trim().replace(/\$/g, '').replace(/\s+/g, ' ').trim()
}

const WHATSAPP_INTRO_BY_TIPO = {
  flor: 'Quiero esta flor',
  ramo: 'Quiero este ramo',
  accesorio: 'Quiero este accesorio',
}

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

export function getWhatsAppFooterUrl() {
  const digits = digitsOnly()
  if (!digits) return '#'
  const text = 'Hola! Quiero hacer un pedido desde el catálogo de Flores Eternamente Bellas...'
  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(text)}`
}

export function isWhatsAppCatalogoConfigured() {
  return catalogoDigitsOnly().length > 0
}

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

export function getWhatsAppFlowerUrl(flower) {
  const digits = catalogoDigitsOnly()
  if (!digits) return '#'

  const nombre = typeof flower?.nombre === 'string' ? flower.nombre.trim() : ''
  const precio = typeof flower?.precio === 'string' ? flower.precio.trim() : ''
  const precioTxt = priceForWhatsAppMessage(precio)
  const previewUrl = resolveSharePageUrlForWhatsApp({
    catalogoTipo: flower?.catalogoTipo || 'flor',
    itemId: flower?.itemId,
  })

  const parts = ['Quiero esta flor']
  if (nombre) parts.push(nombre)
  if (precioTxt) parts.push(`Precio (CLP): ${precioTxt}`)
  parts.push('')

  prependWhatsAppPreviewUrl(parts, previewUrl)

  const text = parts.join('\n').trimEnd()
  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(text)}`
}

/**
 * Ramos y accesorios: mensaje según tipo + imagen pública del JSON.
 */
export function getWhatsAppPackUrl(pack) {
  const digits = digitsOnly()
  if (!digits) return '#'

  const title = typeof pack?.title === 'string' ? pack.title.trim() : ''
  const tipo = typeof pack?.catalogoTipo === 'string' ? pack.catalogoTipo.trim() : 'ramo'
  const price = typeof pack?.price === 'string' ? pack.price.trim() : ''
  const precioEspecial =
    typeof pack?.precioEspecial === 'string' ? pack.precioEspecial.trim() : ''
  const previewUrl = resolveSharePageUrlForWhatsApp({
    catalogoTipo: tipo,
    itemId: pack?.itemId,
  })

  const intro = WHATSAPP_INTRO_BY_TIPO[tipo] || 'Quiero consultar por'
  const parts = [intro]
  if (title) parts.push(title)
  parts.push('')

  prependWhatsAppPreviewUrl(parts, previewUrl)

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

export function getWhatsAppConsultaUrl(item) {
  const digits = catalogoDigitsOnly()
  if (!digits) return '#'

  const nombre = typeof item?.nombre === 'string' ? item.nombre.trim() : ''
  const previewUrl = resolveSharePageUrlForWhatsApp({
    catalogoTipo: item?.catalogoTipo || 'accesorio',
    itemId: item?.itemId,
  })

  const parts = []
  if (nombre) parts.push(nombre)
  parts.push('Consulta')

  prependWhatsAppPreviewUrl(parts, previewUrl)

  const text = parts.join('\n').trimEnd()
  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(text)}`
}

export function isWhatsAppConfigured() {
  return digitsOnly().length > 0
}
