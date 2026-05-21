/** Flags de ordenación (activar cuando se usen precio especial / agotados en catálogo) */
export const CATALOGO_SORT_FLAGS = {
  /** Si true, ordenar por `precioEspecial` en lugar de `price` cuando exista */
  usarPrecioEspecial: false,
  /** Si true, productos con `agotado: true` van al final del carrusel */
  agotadosAlFinal: false,
}

/** Ruta pública de imagen desde `image` o `img` del JSON */
export function catalogoImagePath(item) {
  const raw = item?.image || item?.img || ''
  if (typeof raw !== 'string' || !raw.trim()) return ''
  const path = raw.trim()
  if (path.startsWith('/')) return path
  if (path.startsWith('img/')) return `/${path}`
  return `/img/${path}`
}

/** Título desde `nombre` o desde el nombre del archivo de imagen */
export function catalogoNombre(item) {
  if (typeof item?.nombre === 'string' && item.nombre.trim()) return item.nombre.trim()
  const path = catalogoImagePath(item)
  if (!path) return ''
  const file = path.split('/').pop() || ''
  return file.replace(/\.[^.]+$/i, '').replace(/_/g, ' ')
}

/** Convierte "$6.000" (u otro formato con dígitos) a entero CLP para comparar */
export function parsePrecioChileno(valor) {
  if (valor == null) return null
  const str = String(valor).trim()
  if (!str) return null
  const digits = str.replace(/[^\d]/g, '')
  if (!digits) return null
  const n = Number.parseInt(digits, 10)
  return Number.isFinite(n) ? n : null
}

/** Accesorio Pinches: siempre primero en su carrusel */
export function esPinches(item) {
  const nombre = catalogoNombre(item).toLocaleLowerCase('es')
  if (nombre === 'pinches') return true
  return /pinches/i.test(catalogoImagePath(item))
}

/**
 * Precio numérico para ordenar (menor → mayor).
 * Sin precio parseable → al final (Infinity).
 */
export function catalogoPrecioOrden(item, flags = CATALOGO_SORT_FLAGS) {
  // Futuro: precio tachado / especial
  if (flags.usarPrecioEspecial) {
    const especial = parsePrecioChileno(item?.precioEspecial)
    if (especial != null) return especial
  }

  if (Array.isArray(item?.precios) && item.precios.length > 0) {
    const valores = item.precios
      .map((tier) => parsePrecioChileno(tier?.valor))
      .filter((n) => n != null)
    if (valores.length > 0) return Math.min(...valores)
  }

  const desdePrice = parsePrecioChileno(item?.price)
  if (desdePrice != null) return desdePrice

  return Number.POSITIVE_INFINITY
}

function compararCatalogo(a, b, flags) {
  // Futuro: agotados al final
  if (flags.agotadosAlFinal) {
    const agotadoA = Boolean(a?.agotado)
    const agotadoB = Boolean(b?.agotado)
    if (agotadoA !== agotadoB) return agotadoA ? 1 : -1
  }

  const diff = catalogoPrecioOrden(a, flags) - catalogoPrecioOrden(b, flags)
  if (diff !== 0) return diff

  return catalogoNombre(a).localeCompare(catalogoNombre(b), 'es', { sensitivity: 'base' })
}

function ordenarLista(items, flags) {
  return [...items].sort((a, b) => compararCatalogo(a, b, flags))
}

/**
 * Orden de carrusel: precio ascendente, luego nombre (es).
 * @param {object[]} items
 * @param {{ pinchesPrimero?: boolean, flags?: Partial<typeof CATALOGO_SORT_FLAGS> }} [options]
 */
export function ordenarCatalogo(items, options = {}) {
  if (!Array.isArray(items) || items.length === 0) return []

  const flags = { ...CATALOGO_SORT_FLAGS, ...options.flags }
  const { pinchesPrimero = false } = options

  if (pinchesPrimero) {
    const pinches = items.filter(esPinches)
    const resto = items.filter((item) => !esPinches(item))
    return [...pinches, ...ordenarLista(resto, flags)]
  }

  return ordenarLista(items, flags)
}
