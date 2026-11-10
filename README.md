# Arepas mi Tierrita - Pautas de Diseño y Arquitectura Frontend

Este proyecto corresponde a la implementación web del emprendimiento **Arepas mi Tierrita**, construido estrictamente con HTML5, CSS3 y JavaScript nativo (Vanilla JS), estructurado modularmente y simulando un backend mediante archivos JSON y almacenamiento local (`LocalStorage`).

---

## 📁 Estructura del Directorio

```text
├── src/
│   ├── images/                 # Contiene imágenes y recursos visuales
│   ├── scripts/
│   │   ├── app.js              # Lógica JS, simulación de API y LocalStorage
│   │   └── products.json       # Datos y control de stock disponible
│   ├── styles/
│   │   └── main.css            # Estilos centralizados y variables CSS
│   ├── index.html              # Página de inicio
│   ├── tienda.html             # Página de tiendas y puntos de venta
│   ├── catalogo.html           # Catálogo completo
│   ├── detalles-producto.html  # Vista detallada de producto individual
│   ├── carrito.html            # Carrito de compras con LocalStorage y stock
│   └── sobre-nosotros.html     # Información institucional
└── README.md
```

## 🎨 Guía de Estilos y Clases CSS

Todas las reglas de diseño, variables de color y espaciados se encuentran centralizadas en src/styles/main.css.

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
| header, main, footer | Padding lateral: 40px | Aplicado globalmente en todas las páginas estructurales. |
| header | margin-top: 40px, margin-bottom: 80px | Cabecera principal compartida, alineada con `space-between`. |
| main | margin-bottom: 80px, gap: 80px | Contenedor principal flexible vertical con separación estricta entre secciones. |
| footer | margin-bottom: 40px | Pie de página institucional y créditos del proyecto. |
| `.main-section` | gap: 40px | Secciones internas del `main` organizadas en columna mediante Flexbox. |
| `.hero-section` | Padding interno: 80px 20px | Secciones de banner principal con imagen de fondo y títulos destacados. |
| `img` | Sombra inferior: 0 6px 12px `rgba(0, 0, 0, 0.15)` | Aplicado a todas las imágenes del sitio para dar relieve sobre el fondo `#FFD3DD`. |
| `.btn` | Padding interno: 12px 24px, Sombra: 0 4px 8px | Botones interactivos con `cursor: pointer`. |
| `.products-grid` | gap: 30px | Contenedor flexible de tarjetas de productos en catálogo e inicio. |
| `.product-card` | Padding interno: 20px, Gap interno: 15px | Tarjetas individuales de productos con imagen, título, precio y botones de acción. |
| `.cart-container` | gap: 40px | Contenedor flex en la vista de carrito separando la lista de productos y el resumen de compra. |
| `.cart-summary` | Padding interno: 30px, Gap: 20px | Tarjeta lateral contenedora del subtotal, total a pagar y botón de pago. |


## ⚙️ Funcionalidad y Lógica JavaScript

1. Simulación de API: Los datos de los productos y su stock disponible se cargan asíncronamente mediante fetch desde src/scripts/products.json.
2. Control de Stock y Carrito: Al añadir productos al carrito mediante la función addToCart(), el sistema valida en tiempo real las unidades disponibles en el stock del producto (products.json) y almacena los datos utilizando LocalStorage.
3. Gestión Dinámica: El carrito calcula automáticamente subtotales, permite modificar cantidades respetando límites de stock y eliminar elementos con persistencia local.

## 💻 ¿Cómo subir tu código?

La rama `main` se encuentra protegida, deberás de hacer una rama desde la cual vas a trabajar y crear un pull request con los ajustes por hacer, serán aprobados por el líder técnico del proyecto, se recomienda nombrarla bajo el formato `feat/funcion-agregada`, por ejemplo, para agregar nuevos productos a la simulación de la base de datos la rama se puede llamar `feat/nuevo-producto`.