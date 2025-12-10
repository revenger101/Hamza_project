// Home Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
});

// Load featured products
function loadFeaturedProducts() {
    const grid = document.getElementById('featuredProductsGrid');
    if (!grid) return;

    const featuredProducts = getFeaturedProducts();
    
    grid.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
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

// Add to cart function
function addToCart(productId) {
    const product = getProductById(productId);
    if (product && window.cart) {
        window.cart.addItem(product);
    }
}

// Add these functions to your existing home.js

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current > target) {
                counter.textContent = target + (target >= 1000 ? '+' : '+');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Add search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
}

// Parallax effect for floating cards
function initParallax() {
    const cards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 20 - 10;
        const y = (e.clientY / window.innerHeight) * 20 - 10;
        
        cards.forEach((card, index) => {
            const multiplier = index % 2 === 0 ? 1 : -1;
            card.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;
        });
    });
}

// Update DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    animateCounters();
    initSearch();
    initParallax();
    
    // Add video play functionality
    const playBtn = document.querySelector('.play-video-btn');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            // You can add a modal for video here
            alert('Video feature coming soon!');
        });
    }
});

