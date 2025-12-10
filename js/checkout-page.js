// Checkout Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    setupCardFormatting();
});

// Load cart items
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cart.items.length === 0) {
        cartItemsContainer.style.display = 'none';
        emptyCart.style.display = 'block';
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.5';
        checkoutBtn.style.cursor = 'not-allowed';
    } else {
        cartItemsContainer.style.display = 'flex';
        emptyCart.style.display = 'none';
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.cursor = 'pointer';
        
        cartItemsContainer.innerHTML = cart.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
                    <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
    }
    
    updateSummary();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    cart.updateQuantity(productId, newQuantity);
    loadCartItems();
}

// Remove item
function removeItem(productId) {
    cart.removeItem(productId);
    loadCartItems();
}

// Clear cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart.clearCart();
        loadCartItems();
    }
}

// Update summary
function updateSummary() {
    const subtotal = cart.getTotal();
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
    document.getElementById('tax').textContent = formatPrice(tax);
    document.getElementById('total').textContent = formatPrice(total);
}

// Setup card formatting
function setupCardFormatting() {
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCVV = document.getElementById('cardCVV');
    
    // Format card number
    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
    
    // Format expiry date
    cardExpiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
    
    // Only allow numbers in CVV
    cardCVV.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

// Handle payment
function handlePayment(event) {
    event.preventDefault();
    
    if (cart.items.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Validate form
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCVV = document.getElementById('cardCVV').value;
    
    if (!cardName || !cardNumber || !cardExpiry || !cardCVV) {
        alert('Please fill in all payment details');
        return;
    }
    
    if (cardNumber.length !== 16) {
        alert('Please enter a valid card number');
        return;
    }
    
    if (cardCVV.length !== 3) {
        alert('Please enter a valid CVV');
        return;
    }
    
    // Simulate payment processing
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.textContent = 'Processing...';
    checkoutBtn.disabled = true;
    
    setTimeout(() => {
        showSuccessModal();
        cart.clearCart();
        document.getElementById('paymentForm').reset();
        checkoutBtn.textContent = 'Complete Purchase';
        checkoutBtn.disabled = false;
    }, 2000);
}

// Show success modal
function showSuccessModal() {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-icon">✅</div>
            <h2>Payment Successful!</h2>
            <p>Thank you for your purchase. Your order has been confirmed.</p>
            <button class="btn btn-primary" onclick="closeSuccessModal()">Continue Shopping</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

// Close success modal
function closeSuccessModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            window.location.href = 'products.html';
        }, 300);
    }
}

