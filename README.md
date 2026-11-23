# Mozzarepas - Pautas de Diseño y Arquitectura Frontend

Este proyecto corresponde a la implementación web del emprendimiento **Mozzarepas**, construido estrictamente con HTML5, CSS3 y JavaScript nativo (Vanilla JS), estructurado modularmente y simulando un backend mediante archivos JSON y almacenamiento local (`LocalStorage`).

---

## 📁 Estructura del Directorio

```text
├── images/                 # Contiene imágenes y recursos visuales
├── scripts/
│   ├── app.js              # Lógica JS, simulación de API y LocalStorage
│   └── products.json       # Datos y control de stock disponible
├── styles/
│   └── main.css            # Estilos centralizados y variables CSS
├── index.html              # Página de inicio
├── tienda.html             # Página principal de tienda
├── catalogo.html           # Catálogo completo
├── detalles-producto.html  # Vista detallada de producto individual
├── carrito.html            # Carrito de compras con LocalStorage y stock
├── sobre-nosotros.html     # Información institucional
└── README.md
```

## 🎨 Guía de Estilos y Clases CSS

Todas las reglas de diseño, variables de color y espaciados se encuentran centralizadas en styles/main.css.

Paleta de Colores (Variables CSS):

- **--bg-color (#FFF3DD):** Color de fondo estándar de la aplicación.
- **--text-title-color (#000000):** Títulos, textos en negrilla y precios destacados.
- **--text-body-color (#828282):** Párrafos de contenido y textos descriptivos secundarios.
- **--btn-bg-black / --btn-text-black:** Botones de fondo negro con texto blanco.
- **--btn-bg-white / --btn-text-white:** Botones de fondo blanco con texto negro y borde sutil.
- **--shadow-color (rgba(0, 0, 0, 0.15)):** Sombra estándar aplicada a tarjetas, contenedores flotantes e imágenes.

Clases CSS, Espaciados y Zonas de Aplicación:

| Nombre de Clase / Selector | Margins / Paddings / Gaps | Zonas de Aplicación / Descripción |
| :--- | :--- | :--- |
| `header, main, footer` | Padding lateral: `40px` | Aplicado globalmente en todas las páginas estructurales. |
| `header` | `margin-top: 40px`, `margin-bottom: 80px` | Cabecera principal compartida, alineada con `space-between`. |
| `main` | `margin-bottom: 80px`, `gap: 80px` | Contenedor principal flexible vertical con separación estricta entre secciones. |
| `footer` | `margin-bottom: 40px`, `padding-top: 40px`, `gap: 40px` | Pie de página institucional y créditos del proyecto. |
| `.page-title`, `.section-title`, `.section-title-lg` | Tamaños de fuente (`2.5rem`, `1.8rem`, `2rem`) | Estandarización tipográfica de encabezados principales y de sección en todas las vistas. |
| `.header-tagline` | Sin espaciado adicional | Subtítulo central en la barra de navegación de `carrito.html`. |
| `.main-section` | `gap: 40px` | Secciones internas del `main` organizadas en columna mediante Flexbox. |
| `.section-row` | Hereda `gap: 40px` | Modificador de `.main-section` para alinear contenido en fila (`index.html` y `sobre-nosotros.html`). |
| `.combo-card` | Padding: `30px`, `gap: 30px` | Tarjeta blanca en fila para combos destacados en `tienda.html` (acompañada de `.combo-info`, `.combo-actions`, `.combo-img-left` y `.combo-img-right`). |
| `.hero-section` | Padding interno: `80px 40px`, `min-height: 350px` | Banner principal centrado con imagen de fondo (`tienda.html`). |
| `.hero-left` | Padding interno: `60px`, `min-height: 450px` | Modificador de `.hero-section` alineado a la izquierda para `index.html`. |
| `img` | Sombra inferior: `0 6px 12px rgba(0, 0, 0, 0.15)` | Aplicado a todas las imágenes del sitio para dar relieve sobre el fondo `#FFF3DD`. |
| `.btn`, `.btn-black`, `.btn-white` | Padding: `12px 24px`, Sombra: `0 4px 8px` | Botones interactivos base y variantes de color; en `.nav-links .btn` se ajusta a `padding: 8px 16px`. |
| `.btn-full` | `width: 100%` | Modificador de ancho completo para botones en `carrito.html` y `detalles-producto.html`. |
| `.products-grid` | `gap: 30px` | Contenedor flexible de tarjetas de productos en catálogo, inicio y tienda. |
| `.related-grid` | Hereda `gap: 30px` | Modificador de `.products-grid` que reduce la altura de imagen a `150px` en productos relacionados (`app.js`). |
| `.product-card` | Padding interno: `20px`, `gap: 15px` | Tarjetas individuales de producto; incluye `.product-category`, `.product-price` y `.product-actions`. |
| `.moments-content`, `.moments-list` | `gap: 20px` / `gap: 15px` | Distribución de textos e imagen (`.moments-img-wrapper`) de la sección de combos en `index.html`. |
| `.catalog-header`, `.catalog-meta` | `gap: 10px` / `margin-top: -20px` | Encabezado y barra de conteo de productos en `catalogo.html`. |
| `.about-section`, `.about-content` | `gap: 25px` | Estructura de Misión, Visión e imagen institucional (`.about-img-wrapper`) en `sobre-nosotros.html`. |
| `.values-section`, `.values-list` | `margin-top: 40px`, `gap: 30px` | Sección centrada de valores corporativos en `sobre-nosotros.html`. |
| `.product-detail-view`, `.product-detail-info` | `gap: 40px` / Padding: `40px`, `gap: 20px` | Vista detallada de producto generada dinámicamente por `app.js` en `detalles-producto.html`. |
| `.cart-layout`, `.cart-list-container` | `gap: 40px` | Contenedor flex en `carrito.html` que separa la lista de ítems del resumen lateral. |
| `.cart-summary` | Padding: `30px`, `gap: 20px` | Tarjeta lateral del resumen de compra (`.cart-summary-row`, `.cart-summary-total`, `.btn-checkout`) en `carrito.html`. |
| `.cart-item` | Padding: `20px`, `gap: 15px`, `margin-bottom: 20px` | Fila dinámica por producto en `carrito.html` renderizada por `app.js` (incluye `.qty-selector`, `.qty-btn` y `.btn-remove`). |


## ⚙️ Funcionalidad y Lógica JavaScript

1. Simulación de API: Los datos de los productos y su stock disponible se cargan asíncronamente mediante fetch desde src/scripts/products.json.
2. Control de Stock y Carrito: Al añadir productos al carrito mediante la función addToCart(), el sistema valida en tiempo real las unidades disponibles en el stock del producto (products.json) y almacena los datos utilizando LocalStorage.
3. Gestión Dinámica: El carrito calcula automáticamente subtotales, permite modificar cantidades respetando límites de stock y eliminar elementos con persistencia local.

## 💻 ¿Cómo subir tu código?

La rama `main` se encuentra protegida, deberás de hacer una rama desde la cual vas a trabajar y crear un pull request con los ajustes por hacer, serán aprobados por el líder técnico del proyecto, se recomienda nombrarla bajo el formato `feat/funcion-agregada`, por ejemplo, para agregar nuevos productos a la simulación de la base de datos la rama se puede llamar `feat/nuevo-producto`.