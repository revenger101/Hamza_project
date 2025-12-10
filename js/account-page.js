// Account Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Require authentication
    if (!auth.requireAuth()) {
        return;
    }
    
    loadUserInfo();
    setupNavigation();
});

// Load user information
function loadUserInfo() {
    const user = auth.getCurrentUser();
    
    if (user) {
        // Update header
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('userAvatar').textContent = user.name.charAt(0).toUpperCase();
        
        // Update profile section
        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileEmail').textContent = user.email;
        
        // Get full user data
        const users = auth.getUsers();
        const fullUser = users.find(u => u.id === user.id);
        
        if (fullUser && fullUser.createdAt) {
            document.getElementById('profileDate').textContent = formatDate(fullUser.createdAt);
        }
    }
}

// Setup navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.account-nav-link[data-section]');
    const sections = document.querySelectorAll('.account-section-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetSection = link.dataset.section;
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Update active section
            sections.forEach(section => {
                if (section.id === `${targetSection}Section`) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to sign out?')) {
        auth.logout();
    }
}

