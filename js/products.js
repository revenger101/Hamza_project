// Product Data and Management

const STORAGE_KEYS = {
    products: 'products'
};

const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        description: "High-quality wireless headphones with noise cancellation",
        featured: true
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        price: 399.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        description: "Advanced smartwatch with health tracking features",
        featured: true
    },
    {
        id: 3,
        name: "Designer Backpack",
        price: 89.99,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
        description: "Stylish and functional backpack for everyday use",
        featured: false
    },
    {
        id: 4,
        name: "Minimalist Wallet",
        price: 49.99,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop",
        description: "Sleek leather wallet with RFID protection",
        featured: true
    },
    {
        id: 5,
        name: "Portable Bluetooth Speaker",
        price: 129.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
        description: "Waterproof speaker with 360° sound",
        featured: false
    },
    {
        id: 6,
        name: "Fitness Tracker Band",
        price: 79.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop",
        description: "Track your fitness goals with precision",
        featured: false
    },
    {
        id: 7,
        name: "Sunglasses Classic",
        price: 159.99,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
        description: "UV protection with timeless style",
        featured: true
    },
    {
        id: 8,
        name: "Laptop Stand Aluminum",
        price: 59.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
        description: "Ergonomic laptop stand for better posture",
        featured: false
    },
    {
        id: 9,
        name: "Wireless Mouse",
        price: 39.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
        description: "Precision wireless mouse with ergonomic design",
        featured: false
    },
    {
        id: 10,
        name: "USB-C Hub Multi-Port",
        price: 69.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
        description: "7-in-1 USB-C hub for all your connectivity needs",
        featured: false
    },
    {
        id: 11,
        name: "Mechanical Keyboard",
        price: 149.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
        description: "RGB mechanical keyboard with tactile switches",
        featured: true
    },
    {
        id: 12,
        name: "Phone Case Premium",
        price: 29.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop",
        description: "Protective case with elegant design",
        featured: false
    }
];

function safeJsonParse(value, fallback) {
    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
}

function normalizeProduct(raw) {
    if (!raw || typeof raw !== 'object') return null;

    const id = Number(raw.id);
    const price = Number(raw.price);

    return {
        id: Number.isFinite(id) ? id : Date.now(),
        name: String(raw.name ?? '').trim(),
        price: Number.isFinite(price) ? price : 0,
        category: String(raw.category ?? '').trim(),
        image: String(raw.image ?? '').trim(),
        description: String(raw.description ?? '').trim(),
        featured: Boolean(raw.featured)
    };
}

function loadProductsFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEYS.products);
    if (!raw) return null;

    const parsed = safeJsonParse(raw, null);
    if (!Array.isArray(parsed)) return null;

    const normalized = parsed.map(normalizeProduct).filter(Boolean);
    return normalized;
}

function saveProductsToStorage(list) {
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(list));
}

function seedProductsIfEmpty() {
    const existing = loadProductsFromStorage();
    if (existing && existing.length >= 0) return;
    saveProductsToStorage([...DEFAULT_PRODUCTS]);
}

seedProductsIfEmpty();

let products = loadProductsFromStorage() || [...DEFAULT_PRODUCTS];

function syncGlobalProductsReference() {
    window.products = products;
}

syncGlobalProductsReference();

// Public: get all products (live from storage)
function getAllProducts() {
    products = loadProductsFromStorage() || products;
    syncGlobalProductsReference();
    return products;
}

// Public: replace all products
function setAllProducts(nextProducts) {
    products = Array.isArray(nextProducts) ? nextProducts.map(normalizeProduct).filter(Boolean) : [];
    saveProductsToStorage(products);
    syncGlobalProductsReference();
    return products;
}

// Public: create product
function createProduct(productData) {
    const all = getAllProducts();
    const maxId = all.length > 0 ? Math.max(...all.map(p => Number(p.id) || 0)) : 0;
    const newProduct = normalizeProduct({
        id: maxId + 1,
        ...productData
    });
    const next = [...all, newProduct];
    setAllProducts(next);
    return newProduct;
}

// Public: update product
function updateProduct(id, productData) {
    const targetId = Number(id);
    const all = getAllProducts();
    const next = all.map(p => (p.id === targetId ? normalizeProduct({ ...p, ...productData, id: p.id }) : p));
    setAllProducts(next);
    return next.find(p => p.id === targetId) || null;
}

// Public: delete product
function removeProduct(id) {
    const targetId = Number(id);
    const all = getAllProducts();
    const next = all.filter(p => p.id !== targetId);
    setAllProducts(next);
    return next.length !== all.length;
}

// Get product by ID
function getProductById(id) {
    return getAllProducts().find(product => product.id === parseInt(id));
}

// Get featured products
function getFeaturedProducts() {
    return getAllProducts().filter(product => product.featured);
}

// Get products by category
function getProductsByCategory(category) {
    const all = getAllProducts();
    if (category === 'all') return all;
    return all.filter(product => product.category === category);
}

// Get all categories
function getCategories() {
    const categories = [...new Set(getAllProducts().map(product => product.category))];
    return ['all', ...categories];
}

// Format price
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Make products available globally
window.products = products;
window.getAllProducts = getAllProducts;
window.setAllProducts = setAllProducts;
window.createProduct = createProduct;
window.updateProduct = updateProduct;
window.removeProduct = removeProduct;
window.getProductById = getProductById;
window.getFeaturedProducts = getFeaturedProducts;
window.getProductsByCategory = getProductsByCategory;
window.getCategories = getCategories;
window.formatPrice = formatPrice;

