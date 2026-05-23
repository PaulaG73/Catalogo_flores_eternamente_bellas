# Flores Eternamente Bellas

Catálogo web responsive para **flores**, **ramos** y **accesorios**, hechos con limpiapipas, con pedidos y consultas por **WhatsApp**. Pensado para compartir un enlace único con clientes y mostrar productos con precios en pesos chilenos (CLP).

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
cp .env.example .env.production
```

En ambos archivos (sin barra final al final de la URL):

```env
VUE_APP_PUBLIC_SITE_URL=https://catalogofloreseternamentebellas.netlify.app
```

> Los archivos `.env.*` no se suben a Git (están en `.gitignore`). Tras cambiar `.env`, reinicia `npm run serve`.

### Variables en Netlify (panel)

Vue solo lee `VUE_APP_*` **al hacer el build**. En Netlify debes definir la variable **antes** de desplegar (o volver a desplegar después de añadirla).

1. Entra a [app.netlify.com](https://app.netlify.com) y abre el sitio **catalogofloreseternamentebellas**.
2. **Site configuration** → **Environment variables** (o **Build & deploy** → **Environment**).
3. **Add a variable** / **Add environment variable**:
   - **Key:** `VUE_APP_PUBLIC_SITE_URL`
   - **Value:** `https://catalogofloreseternamentebellas.netlify.app` (tu URL pública, **sin** `/` al final)
   - **Scopes:** marca **Production** (y **Deploy previews** si quieres previews con WhatsApp correcto).
4. **Save**.
5. **Deploys** → **Trigger deploy** → **Deploy site** (rebuild obligatorio: un deploy antiguo no incluye la variable).

**Alternativa en el repo:** el archivo `netlify.toml` ya declara la misma variable para el build. Si haces push de ese archivo, Netlify la aplica sola; el panel sirve para cambiarla sin commitear o si prefieres configurar solo desde la web.

| Key | Value (ejemplo) |
|-----|-----------------|
| `VUE_APP_PUBLIC_SITE_URL` | `https://catalogofloreseternamentebellas.netlify.app` |

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
| `npm run generate-share` | Genera `public/share/*.html` (Open Graph para WhatsApp) |
| `npm run optimize-pack-og` | Optimiza imágenes para vistas previa al compartir |

---

## Estructura del proyecto

```
├── public/
│   ├── img/                 # Fotografías de productos y logo
│   ├── index.html           # Meta OG y carga de fuentes
│   ├── _redirects           # SPA (Netlify y similares)
│   ├── share/               # Páginas OG por producto (npm run generate-share)
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
npm run build
```

En **Netlify**, no hace falta subir `.env.production`: usa la variable del panel o `netlify.toml` (ver sección anterior).

La carpeta `dist/` es estática. El archivo `public/_redirects` redirige rutas al `index.html` (SPA) y preserva `/img/*`.

**Build en Netlify (resumen):** comando `npm run build`, carpeta publicada `dist/` (ya en `netlify.toml`).

---

## Personalización de marca

- **Colores** — Variables en `src/styles/theme.css` (`--feb-acento`, `--feb-profundo`, fondos de sección, etc.).
- **Tipografía** — `--feb-font-marca` en `src/styles/typography.css`.
- **Logo** — `public/img/Logo.JPG` (footer y vista previa al compartir el catálogo); `logo_sin_fondo.png` en la sección Sobre mí.

---

## Licencia y uso

Proyecto privado (`"private": true` en `package.json`). Todos los derechos del contenido (textos, imágenes y marca **Flores Eternamente Bellas**) pertenecen a sus titulares. No redistribuir sin autorización.

---

## Contacto

Consultas y pedidos vía WhatsApp configurado en el catálogo en vivo.
