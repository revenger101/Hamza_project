// Authentication Management

class AuthManager {
    constructor() {
        this.currentUser = this.loadUser();
        this.updateAuthUI();
    }

    // Load user from localStorage
    loadUser() {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    }

    // Save user to localStorage
    saveUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;
        this.updateAuthUI();
    }

    // Register new user
    register(userData) {
        // Get existing users
        const users = this.getUsers();
        
        // Check if email already exists
        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'Email already registered' };
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
            password: userData.password, // In production, this should be hashed
            createdAt: new Date().toISOString()
        };

        // Save user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login
        this.saveUser({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        });

        return { success: true, message: 'Registration successful!' };
    }

    // Login user
    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            this.saveUser({
                id: user.id,
                name: user.name,
                email: user.email
            });
            return { success: true, message: 'Login successful!' };
        }

        return { success: false, message: 'Invalid email or password' };
    }

    // Logout user
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.updateAuthUI();
        window.location.href = 'index.html';
    }

    // Get all users
    getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Update UI based on auth state
    updateAuthUI() {
        const userIconElements = document.querySelectorAll('.user-icon');
        const authLinks = document.querySelectorAll('.auth-link');

        if (this.isLoggedIn()) {
            userIconElements.forEach(element => {
                element.textContent = this.currentUser.name.charAt(0).toUpperCase();
                element.title = this.currentUser.name;
                element.style.display = 'flex';
            });

            authLinks.forEach(link => {
                link.href = 'account.html';
                link.textContent = 'Account';
            });
        } else {
            userIconElements.forEach(element => {
                element.textContent = '?';
                element.title = 'Login';
                element.style.display = 'flex';
            });

            authLinks.forEach(link => {
                link.href = 'auth.html';
                link.textContent = 'Login';
            });
        }
    }

    // Require authentication (redirect if not logged in)
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'auth.html';
            return false;
        }
        return true;
    }
}

// Initialize auth manager
const auth = new AuthManager();

// Make auth available globally
window.auth = auth;

