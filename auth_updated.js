// Updated Authentication System with Sign In and Login differentiation

// Sign In Form Handler (Simple authentication)
function handleSignIn(e) {
    e.preventDefault();

    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Basic validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Simple authentication logic (in a real app, this would call an API)
    const users = JSON.parse(localStorage.getItem('foodshare_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Store user session
        const sessionData = {
            user: user,
            loginTime: new Date().toISOString(),
            rememberMe: rememberMe
        };

        if (rememberMe) {
            localStorage.setItem('foodshare_session', JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem('foodshare_session', JSON.stringify(sessionData));
        }

        // Update UI
        updateUserInterface(user);
        showNotification(`Welcome back, ${user.name}!`, 'success');

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('signinModal'));
        modal.hide();

    } else {
        showNotification('Invalid email or password', 'error');
    }
}

// Login Form Handler (Comprehensive authentication)
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const userType = document.querySelector('input[name="userType"]:checked').value;
    const stayLoggedIn = document.getElementById('stayLoggedIn').checked;

    // Validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Enhanced authentication logic
    const users = JSON.parse(localStorage.getItem('foodshare_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Verify user type matches
        if (user.userType !== userType) {
            showNotification(`Please login as a ${user.userType}`, 'warning');
            return;
        }

        // Store comprehensive session data
        const sessionData = {
            user: user,
            loginTime: new Date().toISOString(),
            stayLoggedIn: stayLoggedIn,
            userType: userType,
            lastActivity: new Date().toISOString()
        };

        if (stayLoggedIn) {
            localStorage.setItem('foodshare_session', JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem('foodshare_session', JSON.stringify(sessionData));
        }

        // Update UI with enhanced features
        updateUserInterface(user, true);
        showNotification(`Successfully logged in as ${user.name}!`, 'success');

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();

    } else {
        showNotification('Invalid credentials or user type mismatch', 'error');
    }
}

// Register Form Handler (unchanged)
function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const phone = document.getElementById('registerPhone').value;
    const location = document.getElementById('registerLocation').value;
    const userType = document.querySelector('input[name="userType"]:checked').value;

    // Validation
    if (!name || !email || !password || !phone || !location) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('foodshare_users') || '[]');
    if (users.find(u => u.email === email)) {
        showNotification('User with this email already exists', 'warning');
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password, // In a real app, this would be hashed
        phone: phone,
        location: location,
        userType: userType,
        createdAt: new Date().toISOString(),
        isActive: true
    };

    users.push(newUser);
    localStorage.setItem('foodshare_users', JSON.stringify(users));

    // Auto-login after registration
    const sessionData = {
        user: newUser,
        loginTime: new Date().toISOString(),
        rememberMe: true
    };

    localStorage.setItem('foodshare_session', JSON.stringify(sessionData));

    // Update UI
    updateUserInterface(newUser);
    showNotification(`Welcome to FoodShare, ${name}!`, 'success');

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    modal.hide();
}

// Admin Login Handler
function handleAdminLogin(e) {
    e.preventDefault();

    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    // Simple admin authentication (in a real app, this would be more secure)
    if (username === 'admin' && password === 'admin123') {
        const adminSession = {
            user: {
                name: 'Administrator',
                email: 'admin@foodshare.com',
                userType: 'admin',
                role: 'administrator'
            },
            loginTime: new Date().toISOString(),
            isAdmin: true
        };

        localStorage.setItem('foodshare_session', JSON.stringify(adminSession));
        updateUserInterface(adminSession.user, false, true);
        showNotification('Admin login successful!', 'success');

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('adminLoginModal'));
        modal.hide();

        // Redirect to admin dashboard if available
        if (window.location.pathname.includes('index')) {
            window.location.href = 'admin_dashboard.html';
        }
    } else {
        showNotification('Invalid admin credentials', 'error');
    }
}

// Enhanced UI Update Function
function updateUserInterface(user, isComprehensive = false, isAdmin = false) {
    const currentUser = getCurrentUser();

    if (currentUser) {
        // Update navigation
        const authButtons = document.querySelector('.d-flex');
        if (authButtons) {
            authButtons.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i class="fas fa-user me-1"></i>Welcome, ${user.name}
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"><i class="fas fa-user me-2"></i>Profile</a></li>
                        <li><a class="dropdown-item" href="#"><i class="fas fa-cog me-2"></i>Settings</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                    </ul>
                </div>
            `;
        }

        // Update user-specific content
        if (user.userType === 'donor') {
            showDonorFeatures();
        } else if (user.userType === 'receiver') {
            showReceiverFeatures();
        }

        if (isAdmin) {
            showAdminFeatures();
        }

        // Update stats and other dynamic content
        updateDashboardStats();
    }
}

// Logout Function
function logout() {
    localStorage.removeItem('foodshare_session');
    sessionStorage.removeItem('foodshare_session');
    location.reload();
}

// Utility Functions
function getCurrentUser() {
    const sessionData = localStorage.getItem('foodshare_session') || sessionStorage.getItem('foodshare_session');
    return sessionData ? JSON.parse(sessionData) : null;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function showDonorFeatures() {
    // Show donor-specific UI elements
    console.log('Donor features activated');
}

function showReceiverFeatures() {
    // Show receiver-specific UI elements
    console.log('Receiver features activated');
}

function showAdminFeatures() {
    // Show admin-specific UI elements
    console.log('Admin features activated');
}

function updateDashboardStats() {
    // Update dashboard statistics
    console.log('Dashboard stats updated');
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Sign In form
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', handleSignIn);
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Admin login form
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }

    // Check for existing session on page load
    const currentUser = getCurrentUser();
    if (currentUser) {
        updateUserInterface(currentUser.user, currentUser.stayLoggedIn, currentUser.isAdmin);
    }
});
