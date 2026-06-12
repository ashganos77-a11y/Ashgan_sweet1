// ===== PRODUCTS DATA =====
const products = [
    {
        id: 1,
        name: "كب كيك الفراولة",
        category: "cakes",
        price: 25,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop",
        description: "كب كيك لذيذ برائحة الفراولة الطازة"
    },
    {
        id: 2,
        name: "دونات الشوكولاتة",
        category: "cookies",
        price: 18,
        image: "https://images.unsplash.com/photo-1639599810694-08e5bbc87dc3?w=300&h=200&fit=crop",
        description: "دونات طرية مغطاة بالشوكولاتة الفاخرة"
    },
    {
        id: 3,
        name: "كوكيز كلاسيك",
        category: "cookies",
        price: 15,
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop",
        description: "كوكيز بقطع الشوكولاتة الشهيرة"
    },
    {
        id: 4,
        name: "كيك الفانيليا الفاخر",
        category: "cakes",
        price: 35,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop",
        description: "كيك فاخر بنكهة الفانيليا الحقيقية"
    },
    {
        id: 5,
        name: "براونيز الشوكولاتة",
        category: "cookies",
        price: 20,
        image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=200&fit=crop",
        description: "براونيز غني وفاخر بنكهة الشوكولاتة الداكنة"
    },
    {
        id: 6,
        name: "الكريم كراميل",
        category: "traditional",
        price: 22,
        image: "https://images.unsplash.com/photo-1488477181946-85a2fda002c5?w=300&h=200&fit=crop",
        description: "حلوى كريمية كلاسيكية بطعم الكراميل اللذيذ"
    },
    {
        id: 7,
        name: "تارت الفاكهة",
        category: "cakes",
        price: 28,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop",
        description: "تارت شهية مغطاة بفواكه طازة ملونة"
    },
    {
        id: 8,
        name: "تشيز كيك",
        category: "cakes",
        price: 32,
        image: "https://images.unsplash.com/photo-1533134242443-742a65dde356?w=300&h=200&fit=crop",
        description: "تشيز كيك كريمي بطعم مميز وغني"
    },
    {
        id: 9,
        name: "البقلاوة الذهبية",
        category: "traditional",
        price: 24,
        image: "https://images.unsplash.com/photo-1599599810694-08e5bbc87dc3?w=300&h=200&fit=crop",
        description: "بقلاوة تقليدية بحشوة الفستق الغريب"
    },
    {
        id: 10,
        name: "حلويات مشكلة",
        category: "traditional",
        price: 40,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop",
        description: "مشكلة حلويات متنوعة لمحبي التنوع"
    }
];

// ===== STATE MANAGEMENT =====
let cart = [];
let filteredProducts = [...products];

// ===== DOM ELEMENTS =====
const productsGrid = document.getElementById('productsGrid');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const themeToggle = document.getElementById('themeToggle');
const checkoutBtn = document.getElementById('checkoutBtn');
const continueShopping = document.getElementById('continueShopping');
const contactForm = document.getElementById('contactForm');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
    loadCartFromStorage();
    updateCartUI();
});

// ===== SETUP EVENT LISTENERS =====
function setupEventListeners() {
    // Hamburger Menu
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close menu when clicking on nav link
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // Theme Toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Search
    searchInput.addEventListener('input', handleSearch);

    // Filter
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });

    // Checkout
    checkoutBtn.addEventListener('click', checkout);

    // Continue Shopping
    continueShopping.addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });

    // Contact Form
    contactForm.addEventListener('submit', handleFormSubmit);
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
    productsGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">لا توجد منتجات متطابقة</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <p class="product-category">${getCategoryName(product.category)}</p>
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">${product.price} ريال</p>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">
                أضف للسلة 🛒
            </button>
        `;
        productsGrid.appendChild(productCard);
    });
}

// ===== GET CATEGORY NAME =====
function getCategoryName(category) {
    const categories = {
        cakes: '🎂 كيك وكب كيك',
        cookies: '🍪 بسكويت ودونات',
        traditional: '🍮 حلويات تقليدية'
    };
    return categories[category] || category;
}

// ===== ADD TO CART =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();
    saveCartToStorage();

    // Show notification
    showNotification(`تمت إضافة ${product.name} إلى السلة`);
}

// ===== REMOVE FROM CART =====
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
}

// ===== UPDATE QUANTITY =====
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
            saveCartToStorage();
        }
    }
}

// ===== UPDATE CART UI =====
function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">السلة فارغة حالياً. ابدأ بإضافة المنتجات!</p>';
        updateCartSummary();
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-details">
                <p class="item-name">${item.name}</p>
                <p class="item-price">${item.price} ريال</p>
            </div>
            <div class="item-quantity">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="item-total">${item.price * item.quantity} ريال</div>
            <button class="btn btn-danger" onclick="removeFromCart(${item.id})">حذف ❌</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateCartSummary();
}

// ===== UPDATE CART SUMMARY =====
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    document.getElementById('summaryTotal').textContent = `${subtotal} ريال`;
    document.getElementById('summaryTax').textContent = `${tax.toFixed(2)} ريال`;
    document.getElementById('summaryGrandTotal').textContent = `${total.toFixed(2)} ريال`;
    cartTotal.textContent = `${total.toFixed(2)} ريال`;
}

// ===== SEARCH HANDLER =====
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredProducts = products.filter(product =>
        product.name.includes(searchTerm) ||
        product.description.includes(searchTerm)
    );
    renderProducts();
}

// ===== FILTER HANDLER =====
function handleFilter(e) {
    const selectedFilter = e.target.dataset.filter;

    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    if (selectedFilter === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(p => p.category === selectedFilter);
    }

    renderProducts();
}

// ===== TOGGLE THEME =====
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
}

// Load theme from storage
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

// ===== CHECKOUT =====
function checkout() {
    if (cart.length === 0) {
        alert('السلة فارغة! يرجى إضافة المنتجات أولاً.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = total * 0.15;
    const grandTotal = total + tax;

    const message = `
شكراً لطلبك! 🎉

تفاصيل الطلب:
${cart.map(item => `- ${item.name} x${item.quantity} = ${item.price * item.quantity} ريال`).join('\n')}

المجموع: ${total} ريال
الضريبة: ${tax.toFixed(2)} ريال
الإجمالي النهائي: ${grandTotal.toFixed(2)} ريال

سيتم التوصيل في غضون 24 ساعة 📦
شكراً لاختيارك متجرنا! 💝
    `;

    alert(message);
    cart = [];
    updateCartUI();
    saveCartToStorage();
}

// ===== FORM VALIDATION & SUBMISSION =====
function handleFormSubmit(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Validate
    let isValid = true;

    // Name validation
    if (name.trim().length < 3) {
        showError('nameError', 'الاسم يجب أن يكون 3 أحرف على الأقل');
        isValid = false;
    } else {
        clearError('nameError');
    }

    // Email validation
    if (!isValidEmail(email)) {
        showError('emailError', 'البريد الإلكتروني غير صحيح');
        isValid = false;
    } else {
        clearError('emailError');
    }

    // Phone validation
    if (!isValidPhone(phone)) {
        showError('phoneError', 'رقم الهاتف غير صحيح');
        isValid = false;
    } else {
        clearError('phoneError');
    }

    // Message validation
    if (message.trim().length < 10) {
        showError('messageError', 'الرسالة يجب أن تكون 10 أحرف على الأقل');
        isValid = false;
    } else {
        clearError('messageError');
    }

    if (isValid) {
        showNotification('تم إرسال الرسالة بنجاح! شكراً لتواصلك معنا 📧');
        contactForm.reset();
    }
}

// ===== VALIDATION HELPERS =====
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^\d{10,}$/.test(phone.replace(/\D/g, ''));
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    const inputId = elementId.replace('Error', '');
    document.getElementById(inputId).classList.add('error');
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = '';
    const inputId = elementId.replace('Error', '');
    document.getElementById(inputId).classList.remove('error');
}

// ===== NOTIFICATION =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 2000;
        animation: slideInFromTop 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInFromTop 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== LOCAL STORAGE =====
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}
