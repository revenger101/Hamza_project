// Admin Page JavaScript

// State
let currentDeleteId = null;
let currentDeleteType = null;
let isEditMode = false;

// Initialize admin page
document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    loadDashboardStats();
    loadProducts();
    loadUsers();
    setupEventListeners();
});

// Check admin authentication
function checkAdminAuth() {
    const currentUser = window.auth?.getCurrentUser?.();
    
    if (!currentUser) {
        alert('Please login to access the admin panel');
        window.location.href = 'auth.html';
        return;
    }
    
    // Display admin name
    const adminUserName = document.getElementById('adminUserName');
    if (adminUserName) {
        adminUserName.textContent = currentUser.name || currentUser.email;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Product search
    const productSearch = document.getElementById('productSearch');
    if (productSearch) {
        productSearch.addEventListener('input', (e) => {
            filterProducts(e.target.value);
        });
    }
    
    // User search
    const userSearch = document.getElementById('userSearch');
    if (userSearch) {
        userSearch.addEventListener('input', (e) => {
            filterUsers(e.target.value);
        });
    }
    
    // Product form
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }
}

// Section switching
function switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    const sectionMap = {
        'dashboard': 'dashboardSection',
        'products': 'productsSection',
        'users': 'usersSection',
        'add-product': 'addProductSection'
    };
    
    const sectionId = sectionMap[sectionName];
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }
    
    // Add active class to clicked nav link
    const navLink = document.querySelector(`[data-section="${sectionName}"]`);
    if (navLink) {
        navLink.classList.add('active');
    }
    
    // Reset form if switching to add product
    if (sectionName === 'add-product' && !isEditMode) {
        resetProductForm();
    }
}

// Load dashboard stats
function loadDashboardStats() {
    const products = adminGetAllProducts();
    const users = getAllUsers();
    
    // Count categories
    const categories = new Set(products.map(p => p.category));
    
    // Count featured products
    const featured = products.filter(p => p.featured).length;
    
    // Update stats
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalCategories').textContent = categories.size;
    document.getElementById('featuredProducts').textContent = featured;
    
    // Update recent activity
    updateRecentActivity();
}

// Update recent activity
function updateRecentActivity() {
    const activityList = document.getElementById('recentActivity');
    const products = adminGetAllProducts();
    const users = getAllUsers();
    
    const activities = [
        { icon: '📦', text: `${products.length} products in catalog`, time: 'Current' },
        { icon: '👥', text: `${users.length} registered users`, time: 'Current' },
        { icon: '✅', text: 'System running smoothly', time: 'Just now' }
    ];
    
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <span class="activity-icon">${activity.icon}</span>
            <span class="activity-text">${activity.text}</span>
            <span class="activity-time">${activity.time}</span>
        </div>
    `).join('');
}

// Load products into table
function loadProducts() {
    const products = adminGetAllProducts();
    const tbody = document.getElementById('productsTableBody');
    
    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">
                    <div class="empty-state-icon">📦</div>
                    <h3>No products yet</h3>
                    <p>Add your first product to get started</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" class="product-image-thumb"></td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${formatPrice(product.price)}</td>
            <td>
                ${product.featured ? '<span class="badge badge-success">Featured</span>' : '<span class="badge badge-secondary">Regular</span>'}
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon btn-edit" onclick="editProduct(${product.id})" title="Edit">✏️</button>
                    <button class="btn-icon btn-delete" onclick="deleteProduct(${product.id})" title="Delete">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Filter products
function filterProducts(searchTerm) {
    const products = adminGetAllProducts();
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = filtered.map(product => `
        <tr>
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" class="product-image-thumb"></td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${formatPrice(product.price)}</td>
            <td>
                ${product.featured ? '<span class="badge badge-success">Featured</span>' : '<span class="badge badge-secondary">Regular</span>'}
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon btn-edit" onclick="editProduct(${product.id})" title="Edit">✏️</button>
                    <button class="btn-icon btn-delete" onclick="deleteProduct(${product.id})" title="Delete">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Load users into table
function loadUsers() {
    const users = getAllUsers();
    const tbody = document.getElementById('usersTableBody');

    if (users.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="empty-state">
                    <div class="empty-state-icon">👥</div>
                    <h3>No users yet</h3>
                    <p>Users will appear here when they register</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = users.map((user, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${user.name || 'N/A'}</td>
            <td>${user.email}</td>
            <td>${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon btn-view" onclick="viewUser('${user.email}')" title="View Details">👁️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Filter users
function filterUsers(searchTerm) {
    const users = getAllUsers();
    const filtered = users.filter(user =>
        (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = filtered.map((user, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${user.name || 'N/A'}</td>
            <td>${user.email}</td>
            <td>${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon btn-view" onclick="viewUser('${user.email}')" title="View Details">👁️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// View user details
function viewUser(email) {
    const users = getAllUsers();
    const user = users.find(u => u.email === email);

    if (!user) return;

    const modalBody = document.getElementById('userModalBody');
    modalBody.innerHTML = `
        <div class="user-detail-item">
            <span class="user-detail-label">Name:</span>
            <span class="user-detail-value">${user.name || 'N/A'}</span>
        </div>
        <div class="user-detail-item">
            <span class="user-detail-label">Email:</span>
            <span class="user-detail-value">${user.email}</span>
        </div>
        <div class="user-detail-item">
            <span class="user-detail-label">Joined Date:</span>
            <span class="user-detail-value">${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
        </div>
    `;

    document.getElementById('userModal').classList.add('active');
}

// Close user modal
function closeUserModal() {
    document.getElementById('userModal').classList.remove('active');
}

// Handle product form submit
function handleProductSubmit(e) {
    e.preventDefault();

    const productId = document.getElementById('productId').value;
    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        image: document.getElementById('productImage').value,
        description: document.getElementById('productDescription').value,
        featured: document.getElementById('productFeatured').checked
    };

    if (isEditMode && productId) {
        // Update existing product
        adminUpdateProductById(parseInt(productId), productData);
        showNotification('Product updated successfully!', 'success');
    } else {
        // Add new product
        adminAddNewProduct(productData);
        showNotification('Product added successfully!', 'success');
    }

    // Reset form and reload
    resetProductForm();
    loadProducts();
    loadDashboardStats();
    switchSection('products');
}

// Edit product
function editProduct(id) {
    const products = adminGetAllProducts();
    const product = products.find(p => p.id === id);

    if (!product) return;

    // Fill form with product data
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productFeatured').checked = product.featured || false;

    // Update form title
    document.getElementById('productFormTitle').textContent = 'Edit Product';
    document.getElementById('submitButtonText').textContent = 'Update Product';

    isEditMode = true;
    switchSection('add-product');
}

// Delete product
function deleteProduct(id) {
    currentDeleteId = id;
    currentDeleteType = 'product';

    const products = adminGetAllProducts();
    const product = products.find(p => p.id === id);

    document.getElementById('deleteMessage').textContent =
        `Are you sure you want to delete "${product.name}"? This action cannot be undone.`;

    document.getElementById('deleteModal').classList.add('active');
}

// Confirm delete
function confirmDelete() {
    if (currentDeleteType === 'product' && currentDeleteId) {
        adminDeleteProductById(currentDeleteId);
        loadProducts();
        loadDashboardStats();
        showNotification('Product deleted successfully!', 'success');
    }

    closeDeleteModal();
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    currentDeleteId = null;
    currentDeleteType = null;
}

// Reset product form
function resetProductForm() {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('productFormTitle').textContent = 'Add New Product';
    document.getElementById('submitButtonText').textContent = 'Add Product';
    isEditMode = false;
}

// Cancel product form
function cancelProductForm() {
    resetProductForm();
    switchSection('products');
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        window.auth?.logout?.();
    }
}

// Helpers
function adminGetAllProducts() {
    if (typeof window.getAllProducts === 'function') {
        return window.getAllProducts();
    }
    return Array.isArray(window.products) ? window.products : [];
}

// Helper: Get all users
function getAllUsers() {
    const usersData = localStorage.getItem('users');
    return usersData ? JSON.parse(usersData) : [];
}

function adminAddNewProduct(productData) {
    if (typeof window.createProduct === 'function') {
        window.createProduct(productData);
        return;
    }

    const all = adminGetAllProducts();
    const maxId = all.length > 0 ? Math.max(...all.map(p => Number(p.id) || 0)) : 0;
    const newProduct = { id: maxId + 1, ...productData };
    localStorage.setItem('products', JSON.stringify([...all, newProduct]));
}

function adminUpdateProductById(id, productData) {
    if (typeof window.updateProduct === 'function') {
        window.updateProduct(id, productData);
        return;
    }

    const all = adminGetAllProducts();
    const targetId = Number(id);
    const next = all.map(p => (Number(p.id) === targetId ? { ...p, ...productData, id: targetId } : p));
    localStorage.setItem('products', JSON.stringify(next));
}

function adminDeleteProductById(id) {
    if (typeof window.removeProduct === 'function') {
        window.removeProduct(id);
        return;
    }

    const all = adminGetAllProducts();
    const targetId = Number(id);
    const next = all.filter(p => Number(p.id) !== targetId);
    localStorage.setItem('products', JSON.stringify(next));
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

