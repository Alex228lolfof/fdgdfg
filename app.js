const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();
tg.setHeaderColor('#0f0f0f');
tg.setBackgroundColor('#0f0f0f');

// ===== Данные (те же товары, что в боте) =====
const categories = [
  { id: 'all', name: 'Все', emoji: '✨' },
  { id: 1, name: 'Новинки', emoji: '✨' },
  { id: 2, name: 'Женское', emoji: '👗' },
  { id: 3, name: 'Мужское', emoji: '👔' },
  { id: 4, name: 'Обувь', emoji: '👟' },
  { id: 5, name: 'Аксессуары', emoji: '👜' },
  { id: 6, name: 'Sale', emoji: '🔥' },
];

const products = [
  { id: 1, cat: 1, name: 'Платье «Aurora»', price: 8990, emoji: '👗', desc: 'Элегантное платье миди из премиального шёлка.\nЦвет: чёрный / молочный\nРазмеры: XS–XL\nСостав: 95% шёлк, 5% эластан' },
  { id: 2, cat: 1, name: 'Худи «Cloud» oversize', price: 4990, emoji: '👕', desc: 'Мягкое оверсайз-худи из плотного футера.\nЦвет: серый меланж / чёрный\nРазмеры: S–XXL\nУнисекс.' },
  { id: 3, cat: 1, name: 'Куртка-бомбер «Night»', price: 12990, emoji: '🧥', desc: 'Стильный бомбер с атласным блеском.\nЦвет: чёрный\nРазмеры: S–L\nПодходит на весну/осень.' },
  { id: 4, cat: 2, name: 'Блуза «Silk Touch»', price: 4590, emoji: '👚', desc: 'Лёгкая блуза с объёмными рукавами.\nЦвет: белый / пудровый\nРазмеры: XS–L' },
  { id: 5, cat: 2, name: 'Джинсы Wide Leg', price: 6790, emoji: '👖', desc: 'Широкие джинсы с высокой посадкой.\nЦвет: синий / чёрный\nРазмеры: 34–42' },
  { id: 6, cat: 2, name: 'Юбка-плиссе «Moon»', price: 3990, emoji: '👗', desc: 'Миди-юбка в складку.\nЦвет: чёрный / бежевый\nРазмеры: XS–L' },
  { id: 7, cat: 2, name: 'Топ «Basic Soft»', price: 2290, emoji: '👕', desc: 'Базовый топ из мягкого трикотажа.\nЦвет: белый / чёрный / бежевый\nРазмеры: XS–XL' },
  { id: 8, cat: 3, name: 'Футболка «Essential»', price: 2990, emoji: '👕', desc: 'Премиальная футболка прямого кроя.\nЦвет: белый / чёрный / графит\nРазмеры: S–XXL' },
  { id: 9, cat: 3, name: 'Рубашка Oxford', price: 5490, emoji: '👔', desc: 'Классическая рубашка из оксфорда.\nЦвет: голубой / белый\nРазмеры: S–XL' },
  { id: 10, cat: 3, name: 'Чиносы Slim Fit', price: 5990, emoji: '👖', desc: 'Удобные брюки чинос.\nЦвет: бежевый / олива / чёрный\nРазмеры: 30–38' },
  { id: 11, cat: 3, name: 'Свитер «Nord»', price: 7490, emoji: '🧥', desc: 'Тёплый свитер крупной вязки.\nЦвет: серый / тёмно-синий\nРазмеры: S–XL' },
  { id: 12, cat: 4, name: 'Кроссовки «Urban Run»', price: 8990, emoji: '👟', desc: 'Лёгкие кроссовки на каждый день.\nЦвет: белый / чёрный\nРазмеры: 36–45' },
  { id: 13, cat: 4, name: 'Челси «Classic»', price: 11990, emoji: '👢', desc: 'Классические ботинки челси из натуральной кожи.\nЦвет: чёрный / коричневый\nРазмеры: 39–45' },
  { id: 14, cat: 4, name: 'Сапоги «Winter Soft»', price: 9990, emoji: '🥾', desc: 'Утеплённые сапоги на молнии.\nЦвет: чёрный\nРазмеры: 36–41' },
  { id: 15, cat: 5, name: 'Сумка «Mini Soft»', price: 4490, emoji: '👜', desc: 'Компактная сумка через плечо.\nЦвет: чёрный / бежевый / бордо\nМатериал: эко-кожа' },
  { id: 16, cat: 5, name: 'Ремень «Leather Classic»', price: 3490, emoji: '👔', desc: 'Классический ремень из натуральной кожи.\nЦвет: чёрный / коричневый' },
  { id: 17, cat: 5, name: 'Шарф «Cashmere Soft»', price: 3990, emoji: '🧣', desc: 'Мягкий шарф из кашемировой смеси.\nЦвет: серый / бежевый / бордо' },
  { id: 18, cat: 6, name: 'Футболка «Old Collection»', price: 1790, oldPrice: 2990, emoji: '👕', desc: 'Футболка из прошлой коллекции.\nСкидка −40%\nКоличество ограничено!' },
  { id: 19, cat: 6, name: 'Джинсы Classic Fit', price: 4490, oldPrice: 6900, emoji: '👖', desc: 'Классические джинсы.\nСкидка −35%' },
  { id: 20, cat: 6, name: 'Худи «Archive»', price: 2490, oldPrice: 4990, emoji: '🧥', desc: 'Худи из архивной коллекции.\nСкидка −50%' },
];

// ===== Состояние =====
let cart = JSON.parse(localStorage.getItem('luna_cart') || '{}');
let currentCat = 'all';

// ===== Утилиты =====
function formatPrice(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
}

function saveCart() {
  localStorage.setItem('luna_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = Object.values(cart).reduce((s, q) => s + q, 0);
  document.getElementById('cart-count').textContent = count;
}

function getCartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find(x => x.id == id);
    return sum + (p ? p.price * qty : 0);
  }, 0);
}

// ===== Рендер =====
function showCatalog() {
  setActiveNav(0);
  const content = document.getElementById('content');

  let html = `<div class="categories">`;
  categories.forEach(c => {
    html += `<button class="cat-btn ${currentCat == c.id ? 'active' : ''}" onclick="filterCat('${c.id}')">${c.emoji} ${c.name}</button>`;
  });
  html += `</div><div class="products">`;

  const filtered = currentCat === 'all' ? products : products.filter(p => p.cat == currentCat);

  filtered.forEach(p => {
    html += `
      <div class="product-card" onclick="showProduct(${p.id})">
        <div class="product-img">${p.emoji}</div>
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-price">
            ${formatPrice(p.price)}
            ${p.oldPrice ? `<span class="product-old-price">${formatPrice(p.oldPrice)}</span>` : ''}
          </div>
        </div>
      </div>`;
  });

  html += `</div>`;
  content.innerHTML = html;
}

function filterCat(id) {
  currentCat = id;
  showCatalog();
}

function showProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  setActiveNav(-1);
  document.getElementById('content').innerHTML = `
    <div class="detail">
      <button class="back-btn" onclick="showCatalog()">← Назад</button>
      <div class="detail-img">${p.emoji}</div>
      <div class="detail-name">${p.name}</div>
      <div class="detail-price">
        ${formatPrice(p.price)}
        ${p.oldPrice ? `<span class="product-old-price">${formatPrice(p.oldPrice)}</span>` : ''}
      </div>
      <div class="detail-desc">${p.desc}</div>
      <button class="btn btn-primary" onclick="addToCart(${p.id})">🛒 В корзину</button>
    </div>`;
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  tg.HapticFeedback.impactOccurred('light');
  tg.showPopup({
    title: 'Добавлено',
    message: 'Товар добавлен в корзину',
    buttons: [{ type: 'ok' }]
  });
}

function showCart() {
  setActiveNav(1);
  const content = document.getElementById('content');
  const entries = Object.entries(cart);

  if (entries.length === 0) {
    content.innerHTML = `
      <div class="empty-cart">
        <span>🛒</span>
        Корзина пуста<br>
        <small>Добавь что-нибудь из каталога</small>
      </div>`;
    return;
  }

  let html = '';
  entries.forEach(([id, qty]) => {
    const p = products.find(x => x.id == id);
    if (!p) return;
    html += `
      <div class="cart-item">
        <div class="cart-item-img">${p.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${formatPrice(p.price * qty)}</div>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${id}, -1)">−</button>
          <span>${qty}</span>
          <button class="qty-btn" onclick="changeQty(${id}, 1)">+</button>
        </div>
      </div>`;
  });

  html += `
    <div class="cart-total">
      <div class="cart-total-sum">Итого: ${formatPrice(getCartTotal())}</div>
      <button class="btn btn-primary" onclick="checkout()">Оформить заказ</button>
      <button class="btn btn-secondary" onclick="clearCart()">Очистить корзину</button>
    </div>`;

  content.innerHTML = html;
}

function changeQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
  showCart();
}

function clearCart() {
  cart = {};
  saveCart();
  showCart();
}

function checkout() {
  if (Object.keys(cart).length === 0) return;

  const items = Object.entries(cart).map(([id, qty]) => {
    const p = products.find(x => x.id == id);
    return `${p.name} × ${qty}`;
  }).join('\n');

  const total = formatPrice(getCartTotal());
  const data = `🛒 Заказ из Mini App\n\n${items}\n\nИтого: ${total}`;

  // Отправляем данные боту
  tg.sendData(data);

  // Можно также закрыть
  // tg.close();
}

function showInfo() {
  setActiveNav(2);
  document.getElementById('content').innerHTML = `
    <div class="info-block">
      <h3>🚚 Доставка</h3>
      <p>СДЭК / Boxberry / Почта России — от 350 ₽<br>
      Курьер по Москве и СПб — 400 ₽<br>
      Самовывоз (м. Курская) — бесплатно</p>
    </div>
    <div class="info-block">
      <h3>💳 Оплата</h3>
      <p>Картой онлайн • Наличными при получении • Перевод на карту</p>
    </div>
    <div class="info-block">
      <h3>↩️ Возврат</h3>
      <p>14 дней с момента получения. Вещь должна быть без следов носки и с бирками.</p>
    </div>
    <div class="info-block">
      <h3>📞 Контакты</h3>
      <p>Менеджер: @luna_wear_manager<br>
      Работаем ежедневно 10:00–21:00 (МСК)</p>
    </div>
    <div class="info-block">
      <h3>ℹ️ О бренде</h3>
      <p>LUNA WEAR — современная одежда, в которой удобно и красиво каждый день. Качественные ткани и продуманный крой.</p>
    </div>`;
}

function setActiveNav(index) {
  document.querySelectorAll('.nav-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
}

// Старт
updateCartCount();
showCatalog();
