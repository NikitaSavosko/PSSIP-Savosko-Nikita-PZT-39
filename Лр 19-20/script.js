let cart = [];

// Загрузка каталога товаров
async function loadCatalog() {
  const response = await fetch('products.json');
  const products = await response.json();
  const catalogDiv = document.getElementById('catalog');
  catalogDiv.innerHTML = '';

  products.forEach(product => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><b>${product.price} руб.</b></p>
      <button onclick="addToCart(${product.id})">Добавить в корзину</button>
    `;
    catalogDiv.appendChild(div);
  });
}

// Добавление товара в корзину
function addToCart(id) {
  fetch('products.json')
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id === id);
      if (product) {
        cart.push(product);
        updateCart();
      }
    });
}

// Обновление отображения корзины
function updateCart() {
  const cartDiv = document.getElementById('cart-container');
  cartDiv.innerHTML = '';
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>${item.name} - ${item.price} руб. <button onclick="removeFromCart(${index})">Удалить</button></p>
    `;
    cartDiv.appendChild(div);
  });
}

// Удаление товара из корзины
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Cookie Functions
function saveCookie() {
  const name = encodeURIComponent(document.getElementById('name').value);
  const email = encodeURIComponent(document.getElementById('email').value);
  const dob = encodeURIComponent(document.getElementById('dob').value);
  const birthplace = encodeURIComponent(document.getElementById('birthplace').value);
  const hobby = encodeURIComponent(document.getElementById('hobby').value);

  document.cookie = `name=${name}; max-age=3600`;
  document.cookie = `email=${email}; max-age=3600`;
  document.cookie = `dob=${dob}; max-age=3600`;
  document.cookie = `birthplace=${birthplace}; max-age=3600`;
  document.cookie = `hobby=${hobby}; max-age=3600`;
}

function loadCookie() {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});

  if (cookies.name) document.getElementById('name').value = cookies.name;
  if (cookies.email) document.getElementById('email').value = cookies.email;
  if (cookies.dob) document.getElementById('dob').value = cookies.dob;
  if (cookies.birthplace) document.getElementById('birthplace').value = cookies.birthplace;
  if (cookies.hobby) document.getElementById('hobby').value = cookies.hobby;
}

function clearCookie() {
  document.cookie = "name=; max-age=0";
  document.cookie = "email=; max-age=0";
  document.cookie = "dob=; max-age=0";
  document.cookie = "birthplace=; max-age=0";
  document.cookie = "hobby=; max-age=0";
}

// LocalStorage Functions
function saveLocalStorage() {
  localStorage.setItem('name', document.getElementById('local-name').value);
  localStorage.setItem('email', document.getElementById('local-email').value);
}

function loadLocalStorage() {
  document.getElementById('local-name').value = localStorage.getItem('name') || '';
  document.getElementById('local-email').value = localStorage.getItem('email') || '';
}

function clearLocalStorage() {
  localStorage.clear();
}

// Загрузить каталог при загрузке страницы
document.addEventListener('DOMContentLoaded', loadCatalog);
document.addEventListener('DOMContentLoaded', loadCookie);