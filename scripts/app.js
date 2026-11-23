document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('scripts/products.json');
    const products = await response.json();
    window.appProducts = products;
    
    updateCartCount();
    
    if (document.getElementById('home-products')) renderHomeProducts(products);
    if (document.getElementById('catalog-grid')) renderCatalog(products);
    if (document.getElementById('product-details')) renderDetails(products);
    if (document.getElementById('cart-items-container')) renderCart(products);
  } catch (error) {
    console.error('Error loading products:', error);
  }
});

function formatCOP(price){
  const rounded = Math.round(Number(price) || 0);
  return `$${rounded.toLocaleString('es-CO')}`;
}

function obtenerPrecioBase(p) {
  if (p.price !== undefined && p.price !== null) {
    return formatCOP(p.price);
  }
  if (Array.isArray(p.sabores) && p.sabores.length > 0 && typeof p.sabores[0] === 'object') {
    const precios = p.sabores.map(s => Number(s.price) || 0);
    const minimo = Math.min(...precios);
    return `Desde ${formatCOP(minimo)}`;
  }
  return '$0';
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, quantity = 1) {
  const products = window.appProducts || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

const selectEl = document.getElementById(`sabor-${productId}`);
  let precioFinal = Number(product.price) || 0;
  let saborElegido = null;

  if (selectEl) {
    saborElegido = selectEl.value;
    if (!saborElegido) {
      alert('Por favor, selecciona un sabor antes de añadir al carrito.');
      return;
    }

  const opcion = selectEl.options[selectEl.selectedIndex];
  const precioOpcion = opcion.getAttribute('data-precio');
  if (precioOpcion) {
    precioFinal = Number(precioOpcion);
  }
  }
  const cartItemId = saborElegido ? `${product.id}-${saborElegido}` : `${product.id}`;
  const finalName = saborElegido ? `${product.name} (${saborElegido})` : product.name;
  const maxStock = product.stock || 99;

  let cart = getCart();
  const existingItem = cart.find(item => (item.cartItemId || `${item.id}`) === cartItemId);
  
  const currentQtyInCart = existingItem ? existingItem.quantity : 0;
  if (currentQtyInCart + quantity > maxStock) {
    alert(`Lo sentimos, solo hay ${maxStock} unidades disponibles.`);
    return;
  }

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ 
      cartItemId: cartItemId,
      id: product.id, 
      name: finalName, 
      category: product.category,
      description: product.description,
      price: precioFinal, 
      image: product.image, 
      quantity: quantity, 
      stock: maxStock 
    });
  }

  saveCart(cart);
  alert('¡Producto agregado al carrito exitosamente!');
}

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = totalItems;
}

function renderHomeProducts(products) {
  const container = document.getElementById('home-products');
  const featured = products.filter(p => [1, 2, 13].includes(p.id));
  container.innerHTML = featured.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="product-actions">
        <a href="detalles-producto.html?id=${p.id}" class="btn btn-white">Ver producto</a>
        <button onclick="addToCart(${p.id})" class="btn btn-black">Añadir al carrito</button>
      </div>
    </div>
  `).join('');
}

function renderCatalog(products) {
  const container = document.getElementById('catalog-grid');
  const countEl = document.getElementById('product-count');
  if (countEl) countEl.textContent = `${products.length} productos`;

  container.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <p class="product-category">${p.category}</p>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      ${mostrarSabores(p)}
      <span class="product-price">${obtenerPrecioBase(p)}</span>
      <div class="product-actions">
        <a href="detalles-producto.html?id=${p.id}" class="btn btn-white">Ver producto</a>
        <button onclick="addToCart(${p.id})" class="btn btn-black">Añadir al carrito</button>
      </div>
    </div>
  `).join('');
}

function renderDetails(products) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id')) || 1;
  const product = products.find(p => p.id === id) || products[0];

  const container = document.getElementById('product-details');
  container.innerHTML = `
    <div class="product-detail-view">
      <img src="${product.image}" alt="${product.name}" class="product-detail-img">
      <div class="product-detail-info">
        <h1>${product.name}</h1>
        <span class="product-detail-price">${obtenerPrecioBase(product)}</span>
        <p class="product-detail-desc">${product.description}</p>
        ${mostrarSabores(product)}
        <button onclick="addToCart(${product.id})" class="btn btn-black btn-full">Añadir al carrito</button>
      </div>
    </div>
    
    <div class="main-section">
      <h2>Productos relacionados</h2>
      <div class="products-grid related-grid">
        ${products.slice(0, 6).map(p => `
          <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <span class="product-price">${formatCOP(p.price)}</span>
            <div class="product-actions">
              <a href="detalles-producto.html?id=${p.id}" class="btn btn-white btn-full">Ver producto</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderCart(products) {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal-count');
  const totalUnitsEl = document.getElementById('cart-total-units');
  const totalAmountEl = document.getElementById('cart-total-amount');
  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = '<p>Tu carrito está vacío.</p>';
    if (subtotalEl) subtotalEl.textContent = '0';
    if (totalUnitsEl) totalUnitsEl.textContent = '0 unidades';
    if (totalAmountEl) totalAmountEl.textContent = '$0';
    return;
  }

  let total = 0;
  let totalUnits = 0;

  container.innerHTML = cart.map(item => {
    const itemKey = item.cartItemId || `${item.id}`;
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    totalUnits += item.quantity;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <span class="product-category">${item.category}</span>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p class="cart-item-unit-price">${formatCOP(item.price)} / unidad</p>
        </div>
        <div class="cart-item-controls">
          <div class="qty-selector">
            <button onclick="changeQuantity('${itemKey}', -1)" class="qty-btn">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity('${itemKey}', 1)" class="qty-btn">+</button>
          </div>
          <span class="product-category">${item.quantity} unidades</span>
        </div>
        <div class="cart-item-total">
          <span>${formatCOP(itemTotal)}</span>
          <div><button onclick="removeFromCart('${itemKey}')" class="btn-remove">Eliminar</button></div>
        </div>
      </div>
    `;
  }).join('');

  if (subtotalEl) subtotalEl.textContent = cart.length;
  if (totalUnitsEl) totalUnitsEl.textContent = `${totalUnits} unidades`;
  if (totalAmountEl) totalAmountEl.textContent = formatCOP(total);
}

function changeQuantity(cartItemId, delta) {
  let cart = getCart();
  const item = cart.find(i => (i.cartItemId || `${i.id}`) === cartItemId);
  if (!item) return;

  const newQty = item.quantity + delta;
  if (newQty <= 0) {
    removeFromCart(cartItemId);
    return;
  }

  const maxStock = item.stock || 99;
  if (newQty > maxStock) {
    alert(`Solo hay ${maxStock} unidades disponibles.`);
    return;
  }

  item.quantity = newQty;
  saveCart(cart);
  renderCart(window.appProducts);
}

function removeFromCart(cartItemId) {
  let cart = getCart();
  cart = cart.filter(i => (i.cartItemId || `${i.id}`) !== cartItemId);
  saveCart(cart);
  renderCart(window.appProducts);
}

function mostrarSabores(p) {
  if (!Array.isArray(p.sabores) || p.sabores.length === 0) return "";
  
  const opciones = p.sabores.map((s) => {
    if (typeof s === 'object') {
      return `<option value="${s.name}" data-precio="${s.price}">${s.name} - ${formatCOP(s.price)}</option>`;
    }
    return `<option value="${s}">${s}</option>`;
  }).join("");

  return `
    <div class="sabor-selector-container">
      <label for="sabor-${p.id}" class="sabor-label">Elige tu opción:</label>
      <select id="sabor-${p.id}" class="sabor-select" onchange="actualizarPrecioOpcion(${p.id}, this)">
        <option value="" disabled selected>-- Selecciona una opción --</option>
        ${opciones}
      </select>
    </div>
  `;
}

function actualizarPrecioOpcion(productId, selectEl) {
  const opcion = selectEl.options[selectEl.selectedIndex];
  const nuevoPrecio = opcion.getAttribute('data-precio');
  
  if (nuevoPrecio) {
    const card = selectEl.closest('.product-card, .product-detail-info');
    const priceEl = card ? card.querySelector('.product-price, .product-detail-price') : null;
    if (priceEl) priceEl.textContent = formatCOP(nuevoPrecio);
  }
}
