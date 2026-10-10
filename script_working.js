// FoodShare - Working JavaScript with Donation Functionality
// Global variables
let currentUser = null;
let foodLocations = [];

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeAdminSystem();
});

// Main initialization function
function initializeApp() {
    console.log('FoodShare app initializing...');

    // Initialize counters
    initializeCounters();

    // Initialize forms
    initializeForms();

    // Initialize animations
    initializeAnimations();

    // Load sample data
    loadSampleData();
}

// Counter animations
function initializeCounters() {
    const counters = [
        { id: 'mealsSaved', target: 1247, duration: 2000 },
        { id: 'totalDonations', target: 89, duration: 1500 },
        { id: 'mealsServed', target: 3421, duration: 2500 },
        { id: 'co2Saved', target: 567, duration: 1800 },
        { id: 'activeUsers', target: 234, duration: 1200 }
    ];

    counters.forEach(counter => {
        animateCounter(counter.id, counter.target, counter.duration);
    });
}

function animateCounter(elementId, target, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(start).toLocaleString();
    }, 16);
}

// Form initialization and handling
function initializeForms() {
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

    // Add form validation
    addFormValidation();
}

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const userType = document.querySelector('input[name="userType"]:checked').value;

    // Simple validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Demo login - accept any email/password
    currentUser = {
        name: email.split('@')[0],
        email: email,
        user_type: userType,
        id: Date.now()
    };

    // Save to localStorage
    localStorage.setItem('foodshare_user', JSON.stringify(currentUser));

    // Update UI
    updateUIForLoggedInUser(currentUser);

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    modal.hide();

    showNotification(`Welcome back, ${currentUser.name}!`, 'success');
}

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

    // Demo registration - accept any data
    currentUser = {
        name: name,
        email: email,
        phone: phone,
        location: location,
        user_type: userType,
        id: Date.now()
    };

    // Save to localStorage
    localStorage.setItem('foodshare_user', JSON.stringify(currentUser));

    // Update UI
    updateUIForLoggedInUser(currentUser);

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    modal.hide();

    showNotification(`Welcome to FoodShare, ${currentUser.name}!`, 'success');
}

function updateUIForLoggedInUser(user) {
    // Update navigation
    const navButtons = document.querySelector('.d-flex');
    if (navButtons) {
        navButtons.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <i class="fas fa-user me-1"></i>${user.name}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#dashboard"><i class="fas fa-tachometer-alt me-2"></i>Dashboard</a></li>
                    <li><a class="dropdown-item" href="#profile"><i class="fas fa-user-edit me-2"></i>Profile</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                </ul>
            </div>
        `;
    }

    // Update hero buttons based on user type
    const heroButtons = document.querySelector('.hero-section .d-flex');
    if (heroButtons) {
        if (user.user_type === 'donor') {
            heroButtons.innerHTML = `
                <button class="btn btn-warning btn-lg px-4" onclick="showDonateForm()">
                    <i class="fas fa-plus me-2"></i>Donate Food
                </button>
                <button class="btn btn-outline-light btn-lg px-4" onclick="showDashboard()">
                    <i class="fas fa-tachometer-alt me-2"></i>Dashboard
                </button>
            `;
        } else {
            heroButtons.innerHTML = `
                <button class="btn btn-warning btn-lg px-4" onclick="showFindFood()">
                    <i class="fas fa-search me-2"></i>Find Food
                </button>
                <button class="btn btn-outline-light btn-lg px-4" onclick="showDashboard()">
                    <i class="fas fa-tachometer-alt me-2"></i>Dashboard
                </button>
            `;
        }
    }
}

function logout() {
    localStorage.removeItem('foodshare_user');
    currentUser = null;
    location.reload();
}

// Load sample data
function loadSampleData() {
    foodLocations = [
        {
            id: 1,
            name: "Shimla Community Kitchen",
            address: "Mall Road, Shimla, Himachal Pradesh",
            lat: 31.1048,
            lng: 77.1734,
            food: "Fresh vegetables and traditional food",
            quantity: "45 servings",
            expiry: "2024-01-15",
            donor: "Community Kitchen Shimla",
            distance: "0 km"
        },
        {
            id: 2,
            name: "Manali Food Bank",
            address: "Old Manali, Manali, Himachal Pradesh",
            lat: 32.2396,
            lng: 77.1887,
            food: "Fruits, dairy products and bread",
            quantity: "30 servings",
            expiry: "2024-01-16",
            donor: "Manali Food Bank",
            distance: "115 km"
        },
        {
            id: 3,
            name: "Dharamshala NGO Center",
            address: "McLeod Ganj, Dharamshala, Himachal Pradesh",
            lat: 32.2190,
            lng: 76.3234,
            food: "Prepared meals and snacks",
            quantity: "25 servings",
            expiry: "2024-01-14",
            donor: "Dharamshala NGO",
            distance: "85 km"
        }
    ];
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function addFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') && this.value.trim() !== '') {
                    this.classList.remove('is-invalid');
                }
            });
        });
    });
}

// Page navigation functions
function showDonateForm() {
    if (!currentUser) {
        showNotification('Please login to donate food', 'error');
        return;
    }

    // Create and show donate modal
    showDonateModal();
}

function showFindFood() {
    // Scroll to map section
    document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });
}

function showDashboard() {
    if (!currentUser) {
        showNotification('Please login to access dashboard', 'error');
        return;
    }

    // Create and show dashboard
    showDashboardModal();
}

// Modal creation functions
function showDonateModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-plus me-2"></i>Donate Food
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="donateForm">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Food Name/Type *</label>
                                <input type="text" class="form-control" id="foodName" placeholder="e.g., Fresh Vegetables" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Quantity *</label>
                                <input type="text" class="form-control" id="foodQuantity" placeholder="e.g., 50 servings" required>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Description *</label>
                            <textarea class="form-control" id="foodDescription" rows="3" placeholder="Describe the food items, their condition, etc." required></textarea>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Expiry Date *</label>
                                <input type="date" class="form-control" id="foodExpiry" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Pickup Location *</label>
                                <input type="text" class="form-control" id="foodLocation" placeholder="Full address for pickup" required>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Food Type</label>
                            <select class="form-select" id="foodType">
                                <option value="vegetables">Fresh Vegetables</option>
                                <option value="fruits">Fresh Fruits</option>
                                <option value="dairy">Dairy Products</option>
                                <option value="bakery">Bakery Items</option>
                                <option value="prepared">Prepared Meals</option>
                                <option value="canned">Canned Goods</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Additional Notes</label>
                            <textarea class="form-control" id="additionalNotes" rows="2" placeholder="Any special instructions for pickup, handling, etc."></textarea>
                        </div>

                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            <strong>Note:</strong> By submitting this form, you agree to make the donated food available for pickup by verified recipients.
                        </div>

                        <div class="d-grid">
                            <button type="submit" class="btn btn-success btn-lg">
                                <i class="fas fa-paper-plane me-2"></i>Submit Donation
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Set default expiry date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('foodExpiry').value = tomorrow.toISOString().split('T')[0];

    // Handle form submission
    document.getElementById('donateForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const donationData = {
            foodName: document.getElementById('foodName').value,
            quantity: document.getElementById('foodQuantity').value,
            description: document.getElementById('foodDescription').value,
            expiryDate: document.getElementById('foodExpiry').value,
            location: document.getElementById('foodLocation').value,
            foodType: document.getElementById('foodType').value,
            additionalNotes: document.getElementById('additionalNotes').value,
            donorName: currentUser.name,
            donorEmail: currentUser.email,
            timestamp: new Date().toISOString()
        };

        // Validate required fields
        if (!donationData.foodName || !donationData.quantity || !donationData.description ||
            !donationData.expiryDate || !donationData.location) {
            showNotification('Please fill in all required fields marked with *', 'error');
            return;
        }

        // Show success message
        showDonationSuccessModal(donationData, bsModal);
    });
}

function showDonationSuccessModal(donationData, bsModal) {
    const successModal = document.createElement('div');
    successModal.className = 'modal fade';
    successModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-check-circle me-2"></i>Donation Submitted Successfully!
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-4">
                        <i class="fas fa-heart fa-4x text-success mb-3"></i>
                        <h4>Thank you for your generous donation!</h4>
                        <p class="text-muted">Your donation will help feed people in need in your community.</p>
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
                            <strong>Food:</strong><br>
                            ${donationData.foodName}
                        </div>
                        <div class="col-sm-6">
                            <strong>Quantity:</strong><br>
                            ${donationData.quantity}
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-sm-6">
                            <strong>Location:</strong><br>
                            ${donationData.location}
                        </div>
                        <div class="col-sm-6">
                            <strong>Pickup By:</strong><br>
                            ${new Date(donationData.expiryDate).toLocaleDateString()}
                        </div>
                    </div>

                    <div class="alert alert-success mt-3">
                        <i class="fas fa-info-circle me-2"></i>
                        A notification has been sent to nearby recipients. You should receive pickup requests soon!
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" onclick="shareDonation()">
                        <i class="fas fa-share me-2"></i>Share
                    </button>
                    <button type="button" class="btn btn-primary" onclick="makeAnotherDonation()">
                        <i class="fas fa-plus me-2"></i>Donate More
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(successModal);
    const bsSuccessModal = new bootstrap.Modal(successModal);
    bsSuccessModal.show();

    // Store donation in localStorage for demo purposes
    storeDonation(donationData);

    // Close the original modal
    bsModal.hide();
}

function storeDonation(donationData) {
    // Get existing donations
    let donations = JSON.parse(localStorage.getItem('foodshare_donations') || '[]');

    // Add new donation
    donations.push(donationData);

    // Keep only last 10 donations
    if (donations.length > 10) {
        donations = donations.slice(-10);
    }

    // Save back to localStorage
    localStorage.setItem('foodshare_donations', JSON.stringify(donations));

    // Update counters
    updateCounters();
}

function updateCounters() {
    const donations = JSON.parse(localStorage.getItem('foodshare_donations') || '[]');
    const totalDonations = donations.length;
    const mealsSaved = totalDonations * 15; // Estimate 15 meals per donation

    // Update counters with animation
    animateCounter('totalDonations', totalDonations, 1000);
    animateCounter('mealsSaved', mealsSaved, 1500);
}

function shareDonation() {
    if (navigator.share) {
        navigator.share({
            title: 'FoodShare Donation',
            text: 'I just donated food through FoodShare! Join the movement to reduce food waste.',
            url: window.location.origin
        });
    } else {
        // Fallback - copy to clipboard
        const text = `I just donated food through FoodShare! Join the movement to reduce food waste. ${window.location.origin}`;
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Donation details copied to clipboard!', 'success');
        });
    }
}

function makeAnotherDonation() {
    // Close modal and reset form
    const modal = document.querySelector('.modal.show');
    const bsModal = bootstrap.Modal.getInstance(modal);
    bsModal.hide();

    // Show donate form again
    setTimeout(() => {
        showDonateForm();
    }, 500);
}

function showDashboardModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Dashboard</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div id="dashboardContent">
                        <div class="text-center">
                            <div class="loading-spinner"></div>
                            <p>Loading dashboard...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Load dashboard data
    loadDashboardData();
}

function loadDashboardData() {
    const dashboardContent = document.getElementById('dashboardContent');

    if (currentUser.user_type === 'donor') {
        const donations = JSON.parse(localStorage.getItem('foodshare_donations') || '[]');
        const userDonations = donations.filter(d => d.donorEmail === currentUser.email);

        dashboardContent.innerHTML = `
            <div class="row">
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">${userDonations.length}</div>
                        <div class="stat-label">Total Donations</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">${userDonations.length}</div>
                        <div class="stat-label">Active</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">0</div>
                        <div class="stat-label">Claimed</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">0</div>
                        <div class="stat-label">Completed</div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <h6>Your Recent Donations</h6>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Food Item</th>
                                    <th>Quantity</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${userDonations.slice(-5).map(donation => `
                                    <tr>
                                        <td>${donation.foodName}</td>
                                        <td>${donation.quantity}</td>
                                        <td>${new Date(donation.timestamp).toLocaleDateString()}</td>
                                        <td><span class="badge bg-success">Active</span></td>
                                    </tr>
                                `).join('') || '<tr><td colspan="4" class="text-center">No donations yet</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    } else {
        dashboardContent.innerHTML = `
            <div class="row">
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">0</div>
                        <div class="stat-label">Total Requests</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">0</div>
                        <div class="stat-label">Pending</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">0</div>
                        <div class="stat-label">Accepted</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">0</div>
                        <div class="stat-label">Completed</div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <h6>Available Food Near You</h6>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Food Item</th>
                                    <th>Donor</th>
                                    <th>Location</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${foodLocations.slice(0, 3).map(location => `
                                    <tr>
                                        <td>${location.food}</td>
                                        <td>${location.donor}</td>
                                        <td>${location.address}</td>
                                        <td>
                                            <button class="btn btn-sm btn-success" onclick="requestFood(${location.id})">Request</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
}

function requestFood(foodId) {
    if (!currentUser) {
        showNotification('Please login to request food', 'error');
        return;
    }

    const food = foodLocations.find(f => f.id === foodId);
    if (!food) {
        showNotification('Food item not found', 'error');
        return;
    }

    showNotification(`Request sent for ${food.food}! The donor will contact you soon.`, 'success');
}

// Initialize animations
function initializeAnimations() {
    // Add smooth scrolling to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .card').forEach(card => {
        observer.observe(card);
    });
}

// Admin System Functions
let currentAdmin = null;

// Initialize admin system
function initializeAdminSystem() {
    console.log('Admin system initializing...');

    // Check for existing admin session
    const savedAdmin = localStorage.getItem('foodshare_admin');
    if (savedAdmin) {
        currentAdmin = JSON.parse(savedAdmin);
        updateUIForAdminLogin();
    }

    // Initialize admin login form
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }

    // Initialize default admin if none exists
    initializeDefaultAdmin().catch(error => {
        console.error('Error initializing default admin:', error);
    });
}

// Handle admin login
function handleAdminLogin(e) {
    e.preventDefault();

    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    // Validation
    if (!username || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Demo admin login - accept default credentials
    if (username === 'admin' && password === 'admin123') {
        currentAdmin = {
            name: 'System Administrator',
            username: username,
            email: 'admin@foodshare.com',
            role: 'super_admin',
            id: Date.now(),
            login_time: new Date().toISOString()
        };

        // Save admin session
        localStorage.setItem('foodshare_admin', JSON.stringify(currentAdmin));

        // Update UI
        updateUIForAdminLogin();

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('adminLoginModal'));
        modal.hide();

        showNotification('Welcome, Admin!', 'success');

        // Show admin dashboard
        showAdminDashboard();
    } else {
        showNotification('Invalid admin credentials', 'error');
    }
}

// Update UI for admin login
function updateUIForAdminLogin() {
    const navButtons = document.querySelector('.d-flex');
    if (navButtons && currentAdmin) {
        navButtons.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-outline-warning dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <i class="fas fa-user-shield me-1"></i>${currentAdmin.name}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" onclick="showAdminDashboard()">
                        <i class="fas fa-tachometer-alt me-2"></i>Admin Dashboard
                    </a></li>
                    <li><a class="dropdown-item" href="#" onclick="showNGOs()">
                        <i class="fas fa-users me-2"></i>Manage NGOs
                    </a></li>
                    <li><a class="dropdown-item" href="#" onclick="showDeliveryPersons()">
                        <i class="fas fa-truck me-2"></i>Delivery Persons
                    </a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="adminLogout()">
                        <i class="fas fa-sign-out-alt me-2"></i>Logout
                    </a></li>
                </ul>
            </div>
        `;
    }
}

// Admin logout
function adminLogout() {
    localStorage.removeItem('foodshare_admin');
    currentAdmin = null;

    // Restore regular user UI if logged in
    if (currentUser) {
        updateUIForLoggedInUser(currentUser);
    } else {
        location.reload();
    }

    showNotification('Admin logged out successfully', 'info');
}

// Initialize default admin
async function initializeDefaultAdmin() {
    try {
        await dataManager.initializeDefaultAdmin();
    } catch (error) {
        console.error('Error initializing default admin:', error);
    }
}

// Show admin dashboard
function showAdminDashboard() {
    if (!currentAdmin) {
        showNotification('Please login as admin first', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-warning">
                    <h5 class="modal-title">
                        <i class="fas fa-tachometer-alt me-2"></i>Admin Dashboard
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div id="adminDashboardContent">
                        <div class="text-center">
                            <div class="loading-spinner"></div>
                            <p>Loading admin dashboard...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Load admin dashboard data
    loadAdminDashboardData();
}

// Load admin dashboard data
async function loadAdminDashboardData() {
    const dashboardContent = document.getElementById('adminDashboardContent');

    try {
        // Wait for dataManager to be ready
        await waitForDataManager();

        const [stats, ngos, deliveryPersons] = await Promise.all([
            dataManager.getStatistics().catch(error => {
                console.warn('Error getting statistics, using fallback:', error);
                return { totalDonations: 0, totalUsers: 0, urgentItems: 0, activeDonations: 0 };
            }),
            dataManager.getAllNGOs().catch(error => {
                console.warn('Error getting NGOs, using fallback:', error);
                return [];
            }),
            dataManager.getAllDeliveryPersons().catch(error => {
                console.warn('Error getting delivery persons, using fallback:', error);
                return [];
            })
        ]);

        dashboardContent.innerHTML = `
            <div class="row mb-4">
                <div class="col-12">
                    <h4>System Overview</h4>
                    <p class="text-muted">Welcome to the FoodShare Admin Panel</p>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-md-3">
                    <div class="card bg-primary text-white">
                        <div class="card-body text-center">
                            <i class="fas fa-box fa-2x mb-2"></i>
                            <h3>${stats.totalDonations || 0}</h3>
                            <p>Total Donations</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card bg-success text-white">
                        <div class="card-body text-center">
                            <i class="fas fa-users fa-2x mb-2"></i>
                            <h3>${stats.totalUsers || 0}</h3>
                            <p>Registered Users</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card bg-info text-white">
                        <div class="card-body text-center">
                            <i class="fas fa-hands-helping fa-2x mb-2"></i>
                            <h3>${ngos.length || 0}</h3>
                            <p>Active NGOs</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card bg-warning text-white">
                        <div class="card-body text-center">
                            <i class="fas fa-truck fa-2x mb-2"></i>
                            <h3>${deliveryPersons.length || 0}</h3>
                            <p>Delivery Persons</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h6 class="mb-0">Quick Actions</h6>
                        </div>
                        <div class="card-body">
                            <button class="btn btn-primary me-2 mb-2" onclick="showNGOs()">
                                <i class="fas fa-users me-2"></i>Manage NGOs
                            </button>
                            <button class="btn btn-success me-2 mb-2" onclick="showDeliveryPersons()">
                                <i class="fas fa-truck me-2"></i>Delivery Persons
                            </button>
                            <button class="btn btn-info me-2 mb-2" onclick="showSystemStats()">
                                <i class="fas fa-chart-bar me-2"></i>View Statistics
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h6 class="mb-0">Recent Activity</h6>
                        </div>
                        <div class="card-body">
                            <div class="activity-item">
                                <i class="fas fa-plus-circle text-success me-2"></i>
                                <small class="text-muted">Admin logged in at ${new Date(currentAdmin.login_time).toLocaleString()}</small>
                            </div>
                            <hr>
                            <div class="activity-item">
                                <i class="fas fa-info-circle text-info me-2"></i>
                                <small class="text-muted">System is running normally</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading admin dashboard:', error);
        dashboardContent.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Error loading dashboard data. Please try again.
            </div>
        `;
    }
}

// Wait for dataManager to be ready
function waitForDataManager() {
    return new Promise((resolve) => {
        const checkDataManager = () => {
            if (typeof dataManager !== 'undefined' && dataManager) {
                resolve();
            } else {
                setTimeout(checkDataManager, 100);
            }
        };
        checkDataManager();
    });
}

// Show NGOs management
function showNGOs() {
    if (!currentAdmin) {
        showNotification('Please login as admin first', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-info">
                    <h5 class="modal-title">
                        <i class="fas fa-users me-2"></i>NGO Management
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div id="ngoManagementContent">
                        <div class="text-center">
                            <div class="loading-spinner"></div>
                            <p>Loading NGOs...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Load NGOs data
    loadNGOsData();
}

// Load NGOs data
async function loadNGOsData() {
    const content = document.getElementById('ngoManagementContent');

    try {
        const ngos = await dataManager.getAllNGOs();

        content.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h6>NGOs (${ngos.length})</h6>
                <button class="btn btn-success" onclick="showAddNGOForm()">
                    <i class="fas fa-plus me-2"></i>Add NGO
                </button>
            </div>

            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${ngos.map(ngo => `
                            <tr>
                                <td>${ngo.name}</td>
                                <td>${ngo.location}</td>
                                <td>${ngo.contact_person}<br><small class="text-muted">${ngo.email}</small></td>
                                <td><span class="badge bg-${ngo.status === 'active' ? 'success' : 'warning'}">${ngo.status}</span></td>
                                <td>
                                    <button class="btn btn-sm btn-primary me-1" onclick="editNGO(${ngo.id})">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-sm btn-danger" onclick="deleteNGO(${ngo.id})">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('') || '<tr><td colspan="5" class="text-center">No NGOs found</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    } catch (error) {
        console.error('Error loading NGOs:', error);
        content.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Error loading NGOs data. Please try again.
            </div>
        `;
    }
}

// Show add NGO form
function showAddNGOForm() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-success">
                    <h5 class="modal-title">
                        <i class="fas fa-plus me-2"></i>Add New NGO
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="addNGOForm">
                        <div class="mb-3">
                            <label class="form-label">NGO Name *</label>
                            <input type="text" class="form-control" id="ngoName" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Location *</label>
                            <input type="text" class="form-control" id="ngoLocation" placeholder="City, State" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Contact Person *</label>
                            <input type="text" class="form-control" id="ngoContactPerson" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email *</label>
                            <input type="email" class="form-control" id="ngoEmail" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Phone</label>
                            <input type="tel" class="form-control" id="ngoPhone">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea class="form-control" id="ngoDescription" rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-success w-100">
                            <i class="fas fa-save me-2"></i>Add NGO
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Handle form submission
    document.getElementById('addNGOForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const ngoData = {
            name: document.getElementById('ngoName').value,
            location: document.getElementById('ngoLocation').value,
            contact_person: document.getElementById('ngoContactPerson').value,
            email: document.getElementById('ngoEmail').value,
            phone: document.getElementById('ngoPhone').value,
            description: document.getElementById('ngoDescription').value
        };

        try {
            await dataManager.addNGO(ngoData);
            showNotification('NGO added successfully!', 'success');
            bsModal.hide();
            loadNGOsData(); // Refresh the list
        } catch (error) {
            showNotification('Error adding NGO: ' + error.message, 'error');
        }
    });
}

// Show delivery persons management
function showDeliveryPersons() {
    if (!currentAdmin) {
        showNotification('Please login as admin first', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-warning">
                    <h5 class="modal-title">
                        <i class="fas fa-truck me-2"></i>Delivery Person Management
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div id="deliveryPersonContent">
                        <div class="text-center">
                            <div class="loading-spinner"></div>
                            <p>Loading delivery persons...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Load delivery persons data
    loadDeliveryPersonsData();
}

// Load delivery persons data
async function loadDeliveryPersonsData() {
    const content = document.getElementById('deliveryPersonContent');

    try {
        const deliveryPersons = await dataManager.getAllDeliveryPersons();

        content.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h6>Delivery Persons (${deliveryPersons.length})</h6>
                <button class="btn btn-success" onclick="showAddDeliveryPersonForm()">
                    <i class="fas fa-plus me-2"></i>Add Delivery Person
                </button>
            </div>

            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${deliveryPersons.map(person => `
                            <tr>
                                <td>${person.name}</td>
                                <td>${person.username}</td>
                                <td>${person.email}<br><small class="text-muted">${person.phone}</small></td>
                                <td><span class="badge bg-${person.status === 'active' ? 'success' : 'warning'}">${person.status}</span></td>
                                <td>
                                    <button class="btn btn-sm btn-primary me-1" onclick="editDeliveryPerson(${person.id})">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-sm btn-danger" onclick="deleteDeliveryPerson(${person.id})">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('') || '<tr><td colspan="5" class="text-center">No delivery persons found</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    } catch (error) {
        console.error('Error loading delivery persons:', error);
        content.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Error loading delivery persons data. Please try again.
            </div>
        `;
    }
}

// Show add delivery person form
function showAddDeliveryPersonForm() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-success">
                    <h5 class="modal-title">
                        <i class="fas fa-plus me-2"></i>Add Delivery Person
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="addDeliveryPersonForm">
                        <div class="mb-3">
                            <label class="form-label">Full Name *</label>
                            <input type="text" class="form-control" id="deliveryPersonName" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email *</label>
                            <input type="email" class="form-control" id="deliveryPersonEmail" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Phone *</label>
                            <input type="tel" class="form-control" id="deliveryPersonPhone" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Location *</label>
                            <input type="text" class="form-control" id="deliveryPersonLocation" placeholder="City, State" required>
                        </div>
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            <strong>Note:</strong> Username and password will be auto-generated and displayed after creation.
                        </div>
                        <button type="submit" class="btn btn-success w-100">
                            <i class="fas fa-save me-2"></i>Add Delivery Person
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Handle form submission
    document.getElementById('addDeliveryPersonForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const deliveryPersonData = {
            name: document.getElementById('deliveryPersonName').value,
            email: document.getElementById('deliveryPersonEmail').value,
            phone: document.getElementById('deliveryPersonPhone').value,
            location: document.getElementById('deliveryPersonLocation').value
        };

        try {
            const newPerson = await dataManager.addDeliveryPerson(deliveryPersonData);
            showNotification('Delivery person added successfully!', 'success');

            // Show credentials
            showDeliveryPersonCredentials(newPerson);

            bsModal.hide();
            loadDeliveryPersonsData(); // Refresh the list
        } catch (error) {
            showNotification('Error adding delivery person: ' + error.message, 'error');
        }
    });
}

// Show delivery person credentials
function showDeliveryPersonCredentials(person) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-info">
                    <h5 class="modal-title">
                        <i class="fas fa-key me-2"></i>Delivery Person Credentials
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <div class="alert alert-success">
                        <i class="fas fa-check-circle fa-2x mb-3"></i>
                        <h5>Account Created Successfully!</h5>
                        <p>Please save these credentials and share them with the delivery person.</p>
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
                            <strong>Username:</strong><br>
                            <code class="bg-light p-2 d-block">${person.username}</code>
                        </div>
                        <div class="col-sm-6">
                            <strong>Password:</strong><br>
                            <code class="bg-light p-2 d-block">${person.password}</code>
                        </div>
                    </div>

                    <div class="mt-3">
                        <button class="btn btn-primary" onclick="copyCredentials('${person.username}', '${person.password}')">
                            <i class="fas fa-copy me-2"></i>Copy Credentials
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

// Copy credentials to clipboard
function copyCredentials(username, password) {
    const credentials = `Username: ${username}\nPassword: ${password}`;
    navigator.clipboard.writeText(credentials).then(() => {
        showNotification('Credentials copied to clipboard!', 'success');
    });
}

// NGO Management Functions
function editNGO(id) {
    // Get NGO data and show edit form
    dataManager.getNGOById(id).then(ngo => {
        if (!ngo) {
            showNotification('NGO not found', 'error');
            return;
        }

        showEditNGOForm(ngo);
    }).catch(error => {
        console.error('Error getting NGO:', error);
        showNotification('Error loading NGO data', 'error');
    });
}

function deleteNGO(id) {
    if (confirm('Are you sure you want to delete this NGO? This action cannot be undone.')) {
        dataManager.deleteNGO(id).then(() => {
            showNotification('NGO deleted successfully!', 'success');
            loadNGOsData(); // Refresh the list
        }).catch(error => {
            console.error('Error deleting NGO:', error);
            showNotification('Error deleting NGO: ' + error.message, 'error');
        });
    }
}

// Delivery Person Management Functions
function editDeliveryPerson(id) {
    // Get delivery person data and show edit form
    dataManager.getDeliveryPersonById(id).then(person => {
        if (!person) {
            showNotification('Delivery person not found', 'error');
            return;
        }

        showEditDeliveryPersonForm(person);
    }).catch(error => {
        console.error('Error getting delivery person:', error);
        showNotification('Error loading delivery person data', 'error');
    });
}

function deleteDeliveryPerson(id) {
    if (confirm('Are you sure you want to delete this delivery person? This action cannot be undone.')) {
        dataManager.deleteDeliveryPerson(id).then(() => {
            showNotification('Delivery person deleted successfully!', 'success');
            loadDeliveryPersonsData(); // Refresh the list
        }).catch(error => {
            console.error('Error deleting delivery person:', error);
            showNotification('Error deleting delivery person: ' + error.message, 'error');
        });
    }
}

// Show edit NGO form
function showEditNGOForm(ngo) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h5 class="modal-title">
                        <i class="fas fa-edit me-2"></i>Edit NGO
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="editNGOForm">
                        <input type="hidden" id="editNgoId" value="${ngo.id}">
                        <div class="mb-3">
                            <label class="form-label">NGO Name *</label>
                            <input type="text" class="form-control" id="editNgoName" value="${ngo.name}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Location *</label>
                            <input type="text" class="form-control" id="editNgoLocation" value="${ngo.location}" placeholder="City, State" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Contact Person *</label>
                            <input type="text" class="form-control" id="editNgoContactPerson" value="${ngo.contact_person}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email *</label>
                            <input type="email" class="form-control" id="editNgoEmail" value="${ngo.email}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Phone</label>
                            <input type="tel" class="form-control" id="editNgoPhone" value="${ngo.phone || ''}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea class="form-control" id="editNgoDescription" rows="3">${ngo.description || ''}</textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Status</label>
                            <select class="form-select" id="editNgoStatus">
                                <option value="active" ${ngo.status === 'active' ? 'selected' : ''}>Active</option>
                                <option value="inactive" ${ngo.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">
                            <i class="fas fa-save me-2"></i>Update NGO
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Handle form submission
    document.getElementById('editNGOForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const ngoData = {
            name: document.getElementById('editNgoName').value,
            location: document.getElementById('editNgoLocation').value,
            contact_person: document.getElementById('editNgoContactPerson').value,
            email: document.getElementById('editNgoEmail').value,
            phone: document.getElementById('editNgoPhone').value,
            description: document.getElementById('editNgoDescription').value,
            status: document.getElementById('editNgoStatus').value
        };

        try {
            await dataManager.updateNGO(ngo.id, ngoData);
            showNotification('NGO updated successfully!', 'success');
            bsModal.hide();
            loadNGOsData(); // Refresh the list
        } catch (error) {
            showNotification('Error updating NGO: ' + error.message, 'error');
        }
    });
}

// Show edit delivery person form
function showEditDeliveryPersonForm(person) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h5 class="modal-title">
                        <i class="fas fa-edit me-2"></i>Edit Delivery Person
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="editDeliveryPersonForm">
                        <input type="hidden" id="editDeliveryPersonId" value="${person.id}">
                        <div class="mb-3">
                            <label class="form-label">Full Name *</label>
                            <input type="text" class="form-control" id="editDeliveryPersonName" value="${person.name}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email *</label>
                            <input type="email" class="form-control" id="editDeliveryPersonEmail" value="${person.email}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Phone *</label>
                            <input type="tel" class="form-control" id="editDeliveryPersonPhone" value="${person.phone}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Location *</label>
                            <input type="text" class="form-control" id="editDeliveryPersonLocation" value="${person.location}" placeholder="City, State" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input type="text" class="form-control" id="editDeliveryPersonUsername" value="${person.username}" readonly>
                            <div class="form-text">Username cannot be changed</div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Status</label>
                            <select class="form-select" id="editDeliveryPersonStatus">
                                <option value="active" ${person.status === 'active' ? 'selected' : ''}>Active</option>
                                <option value="inactive" ${person.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                            </select>
                        </div>
                        <div class="alert alert-warning">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            <strong>Note:</strong> Password cannot be changed from this form. Contact the delivery person directly if they need a new password.
                        </div>
                        <button type="submit" class="btn btn-primary w-100">
                            <i class="fas fa-save me-2"></i>Update Delivery Person
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Handle form submission
    document.getElementById('editDeliveryPersonForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const deliveryPersonData = {
            name: document.getElementById('editDeliveryPersonName').value,
            email: document.getElementById('editDeliveryPersonEmail').value,
            phone: document.getElementById('editDeliveryPersonPhone').value,
            location: document.getElementById('editDeliveryPersonLocation').value,
            status: document.getElementById('editDeliveryPersonStatus').value
        };

        try {
            await dataManager.updateDeliveryPerson(person.id, deliveryPersonData);
            showNotification('Delivery person updated successfully!', 'success');
            bsModal.hide();
            loadDeliveryPersonsData(); // Refresh the list
        } catch (error) {
            showNotification('Error updating delivery person: ' + error.message, 'error');
        }
    });
}

function showSystemStats() {
    showNotification('System statistics view will be implemented in the next phase', 'info');
}

// Make functions available globally
window.showDonateForm = showDonateForm;
window.showFindFood = showFindFood;
window.showDashboard = showDashboard;
window.logout = logout;
window.requestFood = requestFood;
window.shareDonation = shareDonation;
window.makeAnotherDonation = makeAnotherDonation;

// Admin functions
window.handleAdminLogin = handleAdminLogin;
window.adminLogout = adminLogout;
window.showAdminDashboard = showAdminDashboard;
window.showNGOs = showNGOs;
window.showDeliveryPersons = showDeliveryPersons;
window.showAddNGOForm = showAddNGOForm;
window.showAddDeliveryPersonForm = showAddDeliveryPersonForm;
window.copyCredentials = copyCredentials;
window.editNGO = editNGO;
window.deleteNGO = deleteNGO;
window.editDeliveryPerson = editDeliveryPerson;
window.deleteDeliveryPerson = deleteDeliveryPerson;
window.showSystemStats = showSystemStats;
