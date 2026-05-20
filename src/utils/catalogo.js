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
