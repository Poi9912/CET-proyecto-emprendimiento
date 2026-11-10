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

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [
    { id: 1, name: "La quesuda", category: "Arepas", description: "Arepa rellena con doble queso mozzarella.", price: 10.99, quantity: 2, stock: 15, image: "images/arepa1.jpg" },
    { id: 2, name: "La campesina", category: "Arepas", description: "Rellena de pollo desmechado y queso mozzarella.", price: 10.99, quantity: 1, stock: 8, image: "images/arepa2.jpg" },
    { id: 6, name: "Jugo de guayaba", category: "Bebidas", description: "En envase 250ml, fresco y natural.", price: 10.99, quantity: 1, stock: 20, image: "images/juice.jpg" }
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
      <p style="font-size: 0.8rem; color: #828282;">${p.category}</p>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <span class="product-price">$${p.price.toFixed(2)}</span>
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
    <div style="display: flex; gap: 40px; align-items: flex-start; width: 100%; flex-wrap: wrap;">
      <img src="${product.image}" alt="${product.name}" style="width: 450px; height: 400px;">
      <div style="display: flex; flex-direction: column; gap: 20px; flex: 1; min-width: 280px; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 10px var(--shadow-color);">
        <h1 style="color: var(--text-title-color); font-size: 2.5rem;">${product.name}</h1>
        <span style="font-size: 1.8rem; font-weight: bold; color: var(--text-title-color);">$${product.price.toFixed(2)}</span>
        <p style="font-size: 1.1rem;">${product.description}</p>
        <button onclick="addToCart(${product.id})" class="btn btn-black" style="width: 100%;">Añadir al carrito</button>
      </div>
    </div>
    
    <div class="main-section" style="margin-top: 40px;">
      <h2 style="color: var(--text-title-color); font-size: 1.8rem;">Related products</h2>
      <div class="products-grid">
        ${products.slice(0, 6).map(p => `
          <div class="product-card" style="width: calc(33.333% - 20px);">
            <img src="${p.image}" alt="${p.name}" style="height: 150px;">
            <h3>Product</h3>
            <p>${p.description}</p>
            <span class="product-price">$${p.price.toFixed(2)}</span>
            <div class="product-actions">
              <a href="detalles-producto.html?id=${p.id}" class="btn btn-white" style="width:100%;">Ver producto</a>
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
      <div style="display: flex; align-items: center; justify-content: space-between; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px var(--shadow-color); flex-wrap: wrap; gap: 15px; margin-bottom: 20px;">
        <img src="${item.image}" alt="${item.name}" style="width: 90px; height: 90px;">
        <div style="flex: 2; min-width: 200px;">
          <span style="font-size: 0.8rem; color: #828282;">${item.category}</span>
          <h3 style="color: var(--text-title-color);">${item.name}</h3>
          <p style="font-size: 0.9rem;">${item.description}</p>
          <p style="font-size: 0.85rem; color: #000; font-weight: bold; margin-top: 5px;">$${item.price.toFixed(2)} / unidad</p>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
          <div style="display: flex; align-items: center; gap: 10px; border: 1px solid #ccc; border-radius: 6px; padding: 5px 10px;">
            <button onclick="changeQuantity(${item.id}, -1)" style="background: none; border: none; cursor: pointer; font-size: 1rem; font-weight: bold;">-</button>
            <span style="font-weight: bold;">${item.quantity}</span>
            <button onclick="changeQuantity(${item.id}, 1)" style="background: none; border: none; cursor: pointer; font-size: 1rem; font-weight: bold;">+</button>
          </div>
          <span style="font-size: 0.8rem; color: #828282;">${item.quantity} unidades</span>
        </div>
        <div style="text-align: right; min-width: 100px;">
          <span style="font-weight: bold; font-size: 1.2rem; color: var(--text-title-color);">$${itemTotal.toFixed(2)}</span>
          <div><button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #828282; cursor: pointer; font-size: 0.8rem; text-decoration: underline; margin-top: 5px;">Eliminar</button></div>
        </div>
      </div>
    `;
  }).join('');

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