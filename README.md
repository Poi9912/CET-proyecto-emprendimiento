# Mozzarepas - Pautas de Diseño y Arquitectura Frontend

Este proyecto corresponde a la implementación web del emprendimiento **Mozzarepas**, construido estrictamente con HTML5, CSS3 y JavaScript nativo (Vanilla JS), estructurado modularmente y simulando un backend mediante archivos JSON y almacenamiento local (`LocalStorage`).

---

## 📁 Estructura del Directorio

```text
├── img/                    # Imágenes de productos, combos y bebidas (26 archivos .jpg)
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
├── opinion.html            # Formulario de opiniones y comentarios de clientes
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
| `.section-row` | Hereda `gap: 40px` | Modificador de `.main-section` para alinear contenido en fila (`index.html`, `sobre-nosotros.html` y `opinion.html`). |
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
| `.opinion-section` | `gap: 60px`, `max-width: 1100px`, `margin: 0 auto` | Contenedor principal en fila (`align-items: stretch`) que organiza la columna informativa y el formulario en `opinion.html`. |
| `.opinion-content`, `.opinion-intro`, `.opinion-note` | `gap: 40px` / `gap: 18px` / `padding-top: 20px`, `gap: 8px` | Columna izquierda en `opinion.html`; agrupa el encabezado (`.opinion-title`, `.opinion-subtitle`, `.opinion-text`) y la nota de cierre con borde superior. |
| `.opinion-form`, `.formulario-opinion`, `.form-group` | Padding: `32px`, `gap: 18px` / `gap: 6px` | Tarjeta blanca del formulario en `opinion.html`; incluye `.opinion-form-header`, `.titulo-opinion` y textos guía (`.opinion-indicators`). |
| `.etiqueta`, `.required-mark`, `.campo-texto`, `.comentario`, `.opinion-btn` | Padding campos: `12px 14px`, botón: `14px`, `min-height: 120px` (`textarea`) | Etiquetas, asteriscos rojos de campos obligatorios (`#d32f2f`), entradas de texto, área de comentarios (`resize: vertical`) y botón de envío en `opinion.html`. |
| `.product-detail-view`, `.product-detail-info` | `gap: 40px` / Padding: `40px`, `gap: 20px` | Vista detallada de producto generada dinámicamente por `app.js` en `detalles-producto.html`. |
| `.cart-layout`, `.cart-list-container` | `gap: 40px` | Contenedor flex en `carrito.html` que separa la lista de ítems del resumen lateral. |
| `.cart-summary` | Padding: `30px`, `gap: 20px` | Tarjeta lateral del resumen de compra (`.cart-summary-row`, `.cart-summary-total`, `.btn-checkout`) en `carrito.html`. |
| `.cart-item` | Padding: `20px`, `gap: 15px`, `margin-bottom: 20px` | Fila dinámica por producto en `carrito.html` renderizada por `app.js` (incluye `.qty-selector`, `.qty-btn` y `.btn-remove`). |


## ⚙️ Funcionalidad y Lógica JavaScript

1. **Simulación de API y Renderizado Dinámico:** Los productos y su stock se cargan asíncronamente mediante `fetch` desde `scripts/products.json`. Según la vista activa, `app.js` renderiza los destacados (`index.html` y `tienda.html`), el catálogo completo (`catalogo.html`), el detalle individual leyendo el parámetro `?id=` de la URL (`detalles-producto.html`) y el carrito (`carrito.html`).
2. **Selector de Sabores y Precios en Tiempo Real:** Los productos con variantes (`sabores`) generan un selector dinámico (`mostrarSabores()`), muestran precios base con `obtenerPrecioBase()` (`Desde $...`) y actualizan el precio en pantalla mediante `actualizarPrecioOpcion()`, todo formateado en pesos colombianos con `formatCOP()`.
3. **Control de Stock, Combos y Carrito:** `addToCart()` valida la selección de sabor cuando aplica, comprueba el stock disponible, diferencia variantes mediante un `cartItemId` compuesto (`id-sabor`) y persiste los datos en `LocalStorage`, sincronizando el contador global (`#cart-count`) y los botones de combos (`.btn-add-combo`).
4. **Gestión del Carrito y Checkout Simulado:** Permite modificar cantidades respetando el stock máximo, eliminar ítems, recalcular totales automáticamente y finalizar el pedido con `checkout()`, limpiando el carrito tras la confirmación.
5. **Formulario de Opiniones (`opinion.html`):** Intercepta el envío del formulario (`#opinion-form`) para evitar recargas o errores en entorno estático, confirma la recepción al usuario y limpia los campos.

## 💻 ¿Cómo subir tu código?

La rama `main` se encuentra protegida, deberás de hacer una rama desde la cual vas a trabajar y crear un pull request con los ajustes por hacer, serán aprobados por el líder técnico del proyecto, se recomienda nombrarla bajo el formato `feat/funcion-agregada`, por ejemplo, para agregar nuevos productos a la simulación de la base de datos la rama se puede llamar `feat/nuevo-producto`.