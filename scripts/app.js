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

    // Evento para el botón de checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', checkout);
    }

    // Eventos para los botones de combos en tienda.html
    document.querySelectorAll('.btn-add-combo').forEach(button => {
      button.addEventListener('click', () => {
        const id = parseInt(button.id);
        addToCart(id);
      });
    });
  } catch (error) {
    console.error('Error loading products:', error);
  }
});

function formatCOP(price){
  const rounded = Math.round(Number(price) || 0);
  return `$${rounded.toLocaleString('es-CO')}`;
}
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [
    { id: 1, name: "La quesuda", category: "Arepas", description: "Arepa rellena con doble queso mozzarella.", price: 10990, quantity: 2, stock: 15, image: "images/arepa1.jpg" },
    { id: 2, name: "La campesina", category: "Arepas", description: "Rellena de pollo desmechado y queso mozzarella.", price: 12099, quantity: 1, stock: 8, image: "images/arepa2.jpg" },
    { id: 6, name: "Jugo de guayaba", category: "Bebidas", description: "En envase 250ml, fresco y natural.", price: 10000, quantity: 1, stock: 20, image: "images/juice.jpg" }
  ];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, quantity = 1) {
  const products = window.appProducts || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = getCart();
  const existingItem = cart.find(item => item.id === productId);
  
  const currentQtyInCart = existingItem ? existingItem.quantity : 0;
  if (currentQtyInCart + quantity > product.stock) {
    alert(`Lo sentimos, solo hay ${product.stock} unidades disponibles.`);
    return;
  }

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ 
      id: product.id, 
      name: product.name, 
      category: product.category,
      description: product.description,
      price: product.price, 
      image: product.image, 
      quantity: quantity, 
      stock: product.stock 
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
  const featured = products.slice(0, 3);
  container.innerHTML = featured.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="product-actions">
        <a href="detalles-producto.html?id=${p.id}" class="btn btn-white">Ver producto</a>
        <button class="btn btn-black btn-add-cart" id="${p.id}">Añadir al carrito</button>
      </div>
    </div>
  `).join('');
  container.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => addToCart(parseInt(btn.id)));
  });
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
      <span class="product-price">${formatCOP(p.price)}</span>
      <div class="product-actions">
        <a href="detalles-producto.html?id=${p.id}" class="btn btn-white">Ver producto</a>
        <button class="btn btn-black btn-add-cart" id="${p.id}">Añadir al carrito</button>
      </div>
    </div>
  `).join('');
  container.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => addToCart(parseInt(btn.id)));
  });
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
        <span class="product-detail-price">$${product.price.toFixed(2)}</span>
        <p class="product-detail-desc">${product.description}</p>
        <button class="btn btn-black btn-full btn-add-cart" id="${product.id}">Añadir al carrito</button>
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
  container.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => addToCart(parseInt(btn.id)));
  });
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
    if (totalAmountEl) totalAmountEl.textContent = '$0.00';
    return;
  }

  let total = 0;
  let totalUnits = 0;

  container.innerHTML = cart.map(item => {
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
          <p class="cart-item-unit-price">$${item.price.toFixed(2)} / unidad</p>
        </div>
        <div class="cart-item-controls">
          <div class="qty-selector">
            <button class="qty-btn" id="${item.id}" data-delta="-1">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" id="${item.id}" data-delta="1">+</button>
          </div>
          <span class="product-category">${item.quantity} unidades</span>
        </div>
        <div class="cart-item-total">
          <span>$${itemTotal.toFixed(2)}</span>
          <div><button class="btn-remove" id="${item.id}">Eliminar</button></div>
        </div>
      </div>
    `;
  }).join('');
  container.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => changeQuantity(parseInt(btn.id), parseInt(btn.dataset.delta)));
  });
  container.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(parseInt(btn.id)));
  });

  if (subtotalEl) subtotalEl.textContent = cart.length;
  if (totalUnitsEl) totalUnitsEl.textContent = `${totalUnits} unidades`;
  if (totalAmountEl) totalAmountEl.textContent = `$${total.toFixed(2)}`;
}

function changeQuantity(productId, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  const newQty = item.quantity + delta;
  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }

  if (newQty > item.stock) {
    alert(`Solo hay ${item.stock} unidades disponibles.`);
    return;
  }

  item.quantity = newQty;
  saveCart(cart);
  renderCart(window.appProducts);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
  renderCart(window.appProducts);
}
function checkout() {
  const cart = getCart();
  if (!cart.length || cart.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  alert('¡Pedido realizado con éxito!');
  saveCart([]);
  renderCart(window.appProducts);
}

function mostrarSabores(p) {
  if (!Array.isArray(p.sabores) || p.sabores.length === 0) return "";
  const lista = p.sabores
    .map((s) => `<li>${s}</li>`)
    .join("");

  return `
    <div style="margin: 6px 0; font-size: 0.85rem;">
      <strong>Sabores:</strong>
      <ul style="margin: 4px 0 0 18px; padding: 0;">
        ${lista}
      </ul>
    </div>`;
}