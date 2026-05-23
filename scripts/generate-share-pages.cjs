/**
 * Genera public/share/{flor|ramo|accesorio}-{id}.html con Open Graph absoluto
 * para vista previa en WhatsApp al pedir desde una tarjeta.
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const shareDir = path.join(root, 'public', 'share')

const SITE_ORIGIN = (
  process.env.VUE_APP_PUBLIC_SITE_URL || 'https://catalogofloreseternamentebellas.netlify.app'
)
  .trim()
  .replace(/\/+$/, '')
  .replace(/^http:\/\//i, 'https://')

const CATALOGS = [
  { file: 'catalogoFlores.json', tipo: 'flor' },
  { file: 'catalogoRamos.json', tipo: 'ramo' },
  { file: 'catalogoAccesorios.json', tipo: 'accesorio' },
]

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function catalogoImagePath(item) {
  const raw = item?.image || item?.img || ''
  if (typeof raw !== 'string' || !raw.trim()) return ''
  const p = raw.trim()
  if (p.startsWith('/')) return p
  if (p.startsWith('img/')) return `/${p}`
  return `/img/${p}`
}

function catalogoNombre(item) {
  if (typeof item?.nombre === 'string' && item.nombre.trim()) return item.nombre.trim()
  const imgPath = catalogoImagePath(item)
  if (!imgPath) return 'Flores Eternamente Bellas'
  const file = imgPath.split('/').pop() || ''
  return file.replace(/\.[^.]+$/i, '').replace(/_/g, ' ')
}

function ogDescription(item) {
  const precio = typeof item?.price === 'string' ? item.price.trim() : ''
  const texto = typeof item?.texto === 'string' ? item.texto.trim() : ''
  if (precio && texto) {
    const corto = texto.length > 120 ? `${texto.slice(0, 117)}…` : texto
    return `${corto} — ${precio}`
  }
  if (precio) return `Catálogo Flores Eternamente Bellas — ${precio}`
  if (texto) return texto.length > 160 ? `${texto.slice(0, 157)}…` : texto
  return 'Catálogo de flores, ramos y accesorios. Pedidos por WhatsApp.'
}

function renderSharePage({ tipo, item, pageUrl, imageUrl }) {
  const title = catalogoNombre(item)
  const description = ogDescription(item)
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)} — Flores Eternamente Bellas</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:site_name" content="Flores Eternamente Bellas">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_CL">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(pageUrl)}">
  <meta property="og:image" content="${escapeHtml(imageUrl)}">
  <meta property="og:image:alt" content="${escapeHtml(title)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}">
  <meta http-equiv="refresh" content="0; url=/">
  <script>window.location.replace('/');</script>
</head>
<body>
  <p><a href="/">Ir al catálogo — ${escapeHtml(title)}</a></p>
</body>
</html>
`
}

function main() {
  if (!SITE_ORIGIN.startsWith('https://')) {
    console.error('VUE_APP_PUBLIC_SITE_URL debe ser HTTPS:', SITE_ORIGIN)
    process.exit(1)
  }

  fs.mkdirSync(shareDir, { recursive: true })

  const written = []

  for (const { file, tipo } of CATALOGS) {
    const jsonPath = path.join(root, 'src', 'data', file)
    const items = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    if (!Array.isArray(items)) continue

    for (const item of items) {
      const id = String(item?.id ?? '').trim()
      if (!id) continue

      const imgPath = catalogoImagePath(item)
      if (!imgPath) {
        console.warn(`omitido ${tipo}-${id}: sin imagen`)
        continue
      }

      const slug = `${tipo}-${id}`
      const pageUrl = `${SITE_ORIGIN}/share/${slug}.html`
      const imageUrl = `${SITE_ORIGIN}${imgPath}`
      const html = renderSharePage({ tipo, item, pageUrl, imageUrl })
      const outPath = path.join(shareDir, `${slug}.html`)
      fs.writeFileSync(outPath, html, 'utf8')
      written.push(slug)
    }
  }

  const ogPath = path.join(root, 'public', 'og-sobre-mi.html')
  const ogPageUrl = `${SITE_ORIGIN}/og-sobre-mi.html`
  const ogImageUrl = `${SITE_ORIGIN}/img/Logo.JPG`
  const ogHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Flores Eternamente Bellas</title>
  <meta property="og:site_name" content="Flores Eternamente Bellas">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_CL">
  <meta property="og:title" content="Flores Eternamente Bellas">
  <meta property="og:description" content="Catálogo de flores, ramos y accesorios. Pedidos por WhatsApp.">
  <meta property="og:url" content="${ogPageUrl}">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:image:alt" content="Flores Eternamente Bellas — logo en colores">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Flores Eternamente Bellas">
  <meta name="twitter:description" content="Catálogo de flores, ramos y accesorios.">
  <meta name="twitter:image" content="${ogImageUrl}">
  <meta http-equiv="refresh" content="0; url=/">
  <script>window.location.replace('/');</script>
</head>
<body>
  <p><a href="/">Ir al catálogo</a></p>
</body>
</html>
`
  fs.writeFileSync(ogPath, ogHtml, 'utf8')

  console.log(`Share pages (${SITE_ORIGIN}): ${written.length} archivos en public/share/`)
  console.log('Actualizado: public/og-sobre-mi.html (OG absoluto)')
}

main()
