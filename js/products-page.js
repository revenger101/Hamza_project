// Products Page JavaScript

let currentCategory = 'all';
let currentMaxPrice = 500;
let currentSort = 'default';

document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    loadProducts();
    setupEventListeners();
});

// Initialize filters
function initializeFilters() {
    const categories = getCategories();
    const categoryFilters = document.getElementById('categoryFilters');
    
    if (categoryFilters) {
        categoryFilters.innerHTML = categories.map((category, index) => `
            <div class="filter-option">
                <input type="radio" 
                       id="category-${category}" 
                       name="category" 
                       value="${category}"
                       ${index === 0 ? 'checked' : ''}>
                <label for="category-${category}">
                    ${category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
            </div>
        `).join('');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Category filter
    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentCategory = e.target.value;
            loadProducts();
        });
    });
    
    // Price range
    const priceRange = document.getElementById('priceRange');
    const maxPriceDisplay = document.getElementById('maxPrice');
    
    if (priceRange) {
        priceRange.addEventListener('input', (e) => {
            currentMaxPrice = parseInt(e.target.value);
            maxPriceDisplay.textContent = `$${currentMaxPrice}`;
            loadProducts();
        });
    }
    
    // Sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            loadProducts();
        });
    }
}

// Load and display products
function loadProducts() {
    let filteredProducts = getProductsByCategory(currentCategory);
    
    // Filter by price
    filteredProducts = filteredProducts.filter(product => product.price <= currentMaxPrice);
    
    // Sort products
    filteredProducts = sortProducts(filteredProducts, currentSort);
    
    // Update product count
    const productCount = document.getElementById('productCount');
    if (productCount) {
        productCount.textContent = filteredProducts.length;
    }
    
    // Display products
    const grid = document.getElementById('productsGrid');
    const noProducts = document.getElementById('noProducts');
    
    if (filteredProducts.length === 0) {
        grid.style.display = 'none';
        noProducts.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        noProducts.style.display = 'none';
        
        grid.innerHTML = filteredProducts.map((product, index) => `
            <div class="product-card" style="animation-delay: ${index * 0.1}s">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">${formatPrice(product.price)}</span>
                        <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Sort products
function sortProducts(products, sortType) {
    const sorted = [...products];
    
    switch (sortType) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return sorted;
    }
}

// Reset filters
function resetFilters() {
    currentCategory = 'all';
    currentMaxPrice = 500;
    currentSort = 'default';
    
    document.getElementById('category-all').checked = true;
    document.getElementById('priceRange').value = 500;
    document.getElementById('maxPrice').textContent = '$500';
    document.getElementById('sortSelect').value = 'default';
    
    loadProducts();
}

// Add to cart
function addToCart(productId) {
    const product = getProductById(productId);
    if (product && window.cart) {
        window.cart.addItem(product);
    }
}

