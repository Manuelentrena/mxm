# Manuel ♥ Mishelle

Sitio conmemorativo hecho a mano con [Astro](https://astro.build): una portada con foto, contador de días juntos y línea de tiempo, más un muro de fotos.

Sitio: [manuelentrena.github.io/mxm](https://manuelentrena.github.io/mxm/)

## Funcionalidad

- Home `/`: foto de portada, decoración dibujada a mano, contador de días juntos, línea de tiempo, pie de página.
- Muro de fotos `/photos`: reúne las fotos de `src/content/timeline/*.md`.
- Vista previa (lightbox): las fotos se pueden ampliar con clic, cierran con clic afuera o `Esc`.
- Navegación móvil con menú hamburguesa.
- Transiciones de página con `ClientRouter` de Astro, precargando imágenes de la página destino.
- Fotos servidas desde Cloudinary (`src/site.config.ts` → `cloudinaryUrl`), con `srcset` responsive.
- Fuente cursiva (`Laura Cursive`) subseteada a WOFF2 para peso mínimo.

## Desarrollo

```bash
npm install
npm run dev
```

Comandos disponibles:

```bash
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run preview   # sirve el build localmente
npm run check     # chequeo de tipos de Astro
```

Requiere Node.js `>=22.12.0`.

## Actualizar contenido

Cada entrada de la línea de tiempo es un archivo en:

```text
src/content/timeline/
```

Para agregar una: copiá `src/content/timeline/_template.md.example`, renombralo a `NN-fecha.md` y completá el frontmatter:

```yaml
---
order: 23
date: 2026.07.20
title: Un día especial
images:
  - https://res.cloudinary.com/<cloud>/image/upload/v<version>/MxM/<archivo>.webp
alt: Breve descripción de la foto
side: right
tilt: tilt-right-soft
---

Acá va la historia de ese día.
```

- `order`: orden de aparición (menor = más adelante en la línea de tiempo).
- `date`: fecha mostrada en la página.
- `title`: título, también se usa en el muro de fotos.
- `images`: una o más URLs de Cloudinary (array).
- `alt`: descripción de la foto para accesibilidad.
- `side`: posición de la tarjeta (`left` o `right`).
- `tilt`: inclinación de la polaroid (`tilt-left`, `tilt-left-soft`, `tilt-right`, `tilt-right-soft`).

El muro de fotos no necesita mantenimiento aparte: toma `images`, `date`, `title` y `alt` de cada entrada del timeline.

## Configuración del sitio

`src/site.config.ts` centraliza:

- `copyright`: texto del pie de página.
- `heroMedia`: foto e info de portada del home.
- `relationship.startDate`: fecha de inicio para el contador de días.
- `cloudinaryUrl()`: helper para construir URLs de Cloudinary con transformaciones (`w_`, `f_auto`, `q_auto`).

`site` y `base` (URL final y subruta de despliegue) están en `astro.config.mjs`.

## Estructura

```text
src/
  components/        Componentes de página
  content/timeline/  Contenido de la línea de tiempo (Markdown)
  content.config.ts  Schema del content collection
  layouts/           Layout base HTML
  pages/             Rutas
  styles/            Estilos globales
  site.config.ts     Configuración del sitio

public/
  assets/illustrations/  Ilustraciones dibujadas a mano
  fonts/                  Fuente Laura Cursive (WOFF2 subseteado)
```

Las fotos no viven en el repo: se alojan en Cloudinary y se referencian por URL desde el frontmatter.

## Despliegue

El sitio se publica en GitHub Pages vía GitHub Actions (`.github/workflows/deploy.yml`): cada push a `main` compila con `npm run build` y publica `dist/`.
