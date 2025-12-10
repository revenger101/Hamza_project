// Auth Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    if (auth.isLoggedIn()) {
        window.location.href = 'account.html';
        return;
    }
    
    setupTabSwitching();
});

// Setup tab switching
function setupTabSwitching() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form-container');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active form
            forms.forEach(form => {
                if (form.id === `${targetTab}Form`) {
                    form.classList.add('active');
                } else {
                    form.classList.remove('active');
                }
            });
        });
    });
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Clear previous errors
    clearAllFormErrors(event.target);
    
    // Validate
    if (!validateEmail(email)) {
        showFormError(document.getElementById('loginEmail'), 'Please enter a valid email');
        return;
    }
    
    if (!validatePassword(password)) {
        showFormError(document.getElementById('loginPassword'), 'Password must be at least 6 characters');
        return;
    }
    
    // Attempt login
    const result = auth.login(email, password);
    
    if (result.success) {
        showAuthMessage('success', result.message);
        setTimeout(() => {
            window.location.href = 'account.html';
        }, 1000);
    } else {
        showAuthMessage('error', result.message);
    }
}

// Handle signup
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Clear previous errors
    clearAllFormErrors(event.target);
    
    // Validate
    if (!validateRequired(name)) {
        showFormError(document.getElementById('signupName'), 'Name is required');
        return;
    }
    
    if (!validateEmail(email)) {
        showFormError(document.getElementById('signupEmail'), 'Please enter a valid email');
        return;
    }
    
    if (!validatePassword(password)) {
        showFormError(document.getElementById('signupPassword'), 'Password must be at least 6 characters');
        return;
    }
    
    if (password !== confirmPassword) {
        showFormError(document.getElementById('signupConfirmPassword'), 'Passwords do not match');
        return;
    }
    
    // Attempt registration
    const result = auth.register({
        name: name,
        email: email,
        password: password
    });
    
    if (result.success) {
        showAuthMessage('success', result.message);
        setTimeout(() => {
            window.location.href = 'account.html';
        }, 1000);
    } else {
        showAuthMessage('error', result.message);
    }
}

// Show auth message
function showAuthMessage(type, message) {
    // Remove existing message
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of active form
    const activeForm = document.querySelector('.auth-form-container.active form');
    if (activeForm) {
        activeForm.insertBefore(messageDiv, activeForm.firstChild);
    }
}

