# Flores Eternamente Bellas

Catálogo web responsive para **flores de goma eva**, **ramos** y **accesorios**, con pedidos y consultas por **WhatsApp**. Pensado para compartir un enlace único con clientes y mostrar productos con precios en pesos chilenos (CLP).

---

## Características

- **Inicio / Sobre mí** — Presentación de la marca con logo como timbre de agua y avatar.
- **Catálogo de flores** — Carrusel horizontal con fichas por producto (imagen, descripción simbólica, precio).
- **Ramos y accesorios** — Misma experiencia de tarjeta y navegación por secciones.
- **Significado por color** — En flores seleccionadas, la palabra *color* en la descripción o el botón *colores* abre un popup con el simbolismo por tono.
- **WhatsApp integrado** — Botón en cada tarjeta y en el pie de página; mensaje prellenado y vista previa al compartir el sitio (Open Graph).
- **Diseño adaptable** — Bootstrap 5, paleta de marca personalizada y tipografía **Comic Neue** / Comic Sans en todo el sitio.
- **Estados de producto** — Soporte en datos para `agotado`, `ultimaUnidad`, `precioEspecial` y listas de precios por cantidad (accesorios).

---

## Stack tecnológico

| Área | Tecnología |
|------|------------|
| Framework | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) |
| UI | [Bootstrap 5](https://getbootstrap.com/) |
| Enrutamiento / estado | Vue Router 4, Vuex 4 |
| Build | Vue CLI 5 |
| Tipografía | [@fontsource/comic-neue](https://fontsource.org/fonts/comic-neue) |
| Imágenes OG (opcional) | [sharp](https://sharp.pixelplumbing.com/) (`npm run optimize-pack-og`) |

---

## Requisitos

- **Node.js** 16 o superior (recomendado 18 LTS)
- **npm** 8+

---

## Instalación y desarrollo

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd Catalogo_flores_eternamente_bellas

# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:8080)
npm run serve
```

### Variables de entorno

Copia el ejemplo y configura la URL pública del sitio (necesaria para enlaces de WhatsApp y metaetiquetas al compartir):

```bash
cp .env.example .env.development
```

En `.env.development` y `.env.production`:

```env
VUE_APP_PUBLIC_SITE_URL=https://tu-dominio.ejemplo
```

> Sin barra final. En local, usa la misma URL de staging/producción si quieres probar el botón WhatsApp de las tarjetas (WhatsApp no abre `localhost`).

### Número de WhatsApp

Edita el teléfono en:

`src/config/whatsapp.js`

```js
export const WHATSAPP_CATALOGO_DIGITS = '569XXXXXXXX'
```

Solo dígitos: código de país + número (ej. Chile: `569…`).

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run serve` | Desarrollo con recarga en caliente |
| `npm run build` | Build de producción en `dist/` |
| `npm run lint` | ESLint (Vue 3) |
| `npm run optimize-pack-og` | Optimiza imágenes para vistas previa al compartir |

---

## Estructura del proyecto

```
├── public/
│   ├── img/                 # Fotografías de productos y logo
│   ├── index.html           # Meta OG y carga de fuentes
│   ├── _redirects           # SPA (Netlify y similares)
│   └── og-sobre-mi.html     # Vista previa sección Sobre mí
├── src/
│   ├── components/
│   │   ├── CardComponent.vue    # Tarjeta de producto + popup colores
│   │   ├── NavBar.vue
│   │   └── FooterComponent.vue
│   ├── config/
│   │   └── whatsapp.js          # Número y URLs wa.me
│   ├── data/
│   │   ├── catalogoFlores.json
│   │   ├── catalogoRamos.json
│   │   └── catalogoAccesorios.json
│   ├── styles/
│   │   ├── theme.css            # Paleta y variables CSS
│   │   ├── typography.css       # Comic Neue / marca
│   │   └── responsive.css
│   ├── utils/
│   │   └── catalogo.js          # Rutas de imagen, orden, precios CLP
│   └── views/
│       └── HomeView.vue           # Página principal (SPA)
├── .env.example
├── vue.config.js
└── package.json
```

---

## Catálogo (datos JSON)

Los productos no requieren backend: se definen en JSON y se muestran en carruseles.

### Flores (`catalogoFlores.json`)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único |
| `texto` | string | Descripción (incluir la palabra *color* si usas popup por enlace) |
| `image` | string | Ruta bajo `/img/` (ej. `/img/rosa.jpg`) |
| `price` | string | Precio visible (ej. `"$8.000"`) |
| `significadoColores` | array | Opcional. `{ "color", "significado" }` para el popup |
| `botonColores` | boolean | Opcional. Muestra botón ovalado *colores* al final del texto |
| `agotado` | boolean | Opcional |
| `ultimaUnidad` | boolean | Opcional |
| `precioEspecial` | string | Opcional |

### Ramos (`catalogoRamos.json`)

Incluye `nombre` además de `texto`, `image` y `price`.

### Accesorios (`catalogoAccesorios.json`)

Puede usar `precios` con etiquetas por cantidad:

```json
"precios": [
  { "etiqueta": "2 flores", "valor": "$3.000" },
  { "etiqueta": "3 flores", "valor": "$4.500" }
]
```

### Añadir o editar un producto

1. Coloca la imagen en `public/img/` (nombre en minúsculas y guiones bajos recomendado).
2. Añade o actualiza la entrada en el JSON correspondiente.
3. Recarga el servidor de desarrollo.

El orden en carrusel se calcula en `src/utils/catalogo.js` (por precio ascendente; Pinches primero en accesorios).

---

## Despliegue

```bash
# Definir URL pública antes del build
# .env.production → VUE_APP_PUBLIC_SITE_URL=https://...

npm run build
```

La carpeta `dist/` es estática. El archivo `public/_redirects` redirige rutas al `index.html` (SPA) y preserva `/img/*`.

Plataformas habituales: **Netlify**, **Vercel**, **GitHub Pages** (con `publicPath` acorde), o cualquier hosting de archivos estáticos con HTTPS.

---

## Personalización de marca

- **Colores** — Variables en `src/styles/theme.css` (`--feb-acento`, `--feb-profundo`, fondos de sección, etc.).
- **Tipografía** — `--feb-font-marca` en `src/styles/typography.css`.
- **Logo** — `public/img/logo_sin_fondo.png` (Sobre mí y Open Graph).

---

## Licencia y uso

Proyecto privado (`"private": true` en `package.json`). Todos los derechos del contenido (textos, imágenes y marca **Flores Eternamente Bellas**) pertenecen a sus titulares. No redistribuir sin autorización.

---

## Contacto

Consultas y pedidos vía WhatsApp configurado en el catálogo en vivo.
