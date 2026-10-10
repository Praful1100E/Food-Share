// FoodShare Data Management System
// Handles all data storage and retrieval operations

class FoodShareDataManager {
    constructor() {
        this.dbName = 'foodshare_db';
        this.version = 1;
        this.db = null;
        this.initDB();
    }

    // Initialize IndexedDB database
    initDB() {
        const request = indexedDB.open(this.dbName, this.version);

        request.onerror = (event) => {
            console.error('Database error:', event.target.error);
            // Fallback to localStorage
            this.useLocalStorage = true;
        };

        request.onsuccess = (event) => {
            this.db = event.target.result;
            console.log('Database initialized successfully');
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Users store
            if (!db.objectStoreNames.contains('users')) {
                const usersStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
                usersStore.createIndex('email', 'email', { unique: true });
                usersStore.createIndex('user_type', 'user_type');
            }

            // Donations store
            if (!db.objectStoreNames.contains('donations')) {
                const donationsStore = db.createObjectStore('donations', { keyPath: 'id', autoIncrement: true });
                donationsStore.createIndex('donor_email', 'donorEmail');
                donationsStore.createIndex('status', 'status');
                donationsStore.createIndex('timestamp', 'timestamp');
            }

            // Requests store
            if (!db.objectStoreNames.contains('requests')) {
                const requestsStore = db.createObjectStore('requests', { keyPath: 'id', autoIncrement: true });
                requestsStore.createIndex('requester_email', 'requesterEmail');
                requestsStore.createIndex('status', 'status');
                requestsStore.createIndex('timestamp', 'timestamp');
            }

            // Food items store (for find food functionality)
            if (!db.objectStoreNames.contains('food_items')) {
                const foodItemsStore = db.createObjectStore('food_items', { keyPath: 'id', autoIncrement: true });
                foodItemsStore.createIndex('type', 'type');
                foodItemsStore.createIndex('location', 'location');
                foodItemsStore.createIndex('urgency', 'urgency');
            }

            // Admin store
            if (!db.objectStoreNames.contains('admins')) {
                const adminsStore = db.createObjectStore('admins', { keyPath: 'id', autoIncrement: true });
                adminsStore.createIndex('username', 'username', { unique: true });
                adminsStore.createIndex('email', 'email', { unique: true });
            }

            // NGOs store
            if (!db.objectStoreNames.contains('ngos')) {
                const ngosStore = db.createObjectStore('ngos', { keyPath: 'id', autoIncrement: true });
                ngosStore.createIndex('name', 'name');
                ngosStore.createIndex('location', 'location');
                ngosStore.createIndex('status', 'status');
            }

            // Delivery persons store
            if (!db.objectStoreNames.contains('delivery_persons')) {
                const deliveryStore = db.createObjectStore('delivery_persons', { keyPath: 'id', autoIncrement: true });
                deliveryStore.createIndex('username', 'username', { unique: true });
                deliveryStore.createIndex('email', 'email', { unique: true });
                deliveryStore.createIndex('status', 'status');
            }
        };
    }

    // Generic database operation wrapper
    async dbOperation(storeName, operation, data = null) {
        if (this.useLocalStorage || !this.db) {
            return this.localStorageOperation(storeName, operation, data);
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], operation === 'readonly' ? 'readonly' : 'readwrite');
            const store = transaction.objectStore(storeName);

            let request;
            switch (operation) {
                case 'add':
                    request = store.add(data);
                    break;
                case 'put':
                    request = store.put(data);
                    break;
                case 'get':
                    request = store.get(data);
                    break;
                case 'getAll':
                    request = store.getAll();
                    break;
                case 'delete':
                    request = store.delete(data);
                    break;
                default:
                    reject(new Error('Invalid operation'));
                    return;
            }

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // LocalStorage fallback operations
    localStorageOperation(storeName, operation, data = null) {
        const key = `foodshare_${storeName}`;
        let items = JSON.parse(localStorage.getItem(key) || '[]');

        switch (operation) {
            case 'add':
            case 'put':
                if (operation === 'add') {
                    data.id = Date.now() + Math.random();
                    items.push(data);
                } else {
                    const index = items.findIndex(item => item.id === data.id);
                    if (index !== -1) {
                        items[index] = data;
                    } else {
                        items.push(data);
                    }
                }
                localStorage.setItem(key, JSON.stringify(items));
                return Promise.resolve(data);

            case 'get':
                return Promise.resolve(items.find(item => item.id === data) || null);

            case 'getAll':
                return Promise.resolve(items);

            case 'delete':
                items = items.filter(item => item.id !== data);
                localStorage.setItem(key, JSON.stringify(items));
                return Promise.resolve(true);

            default:
                return Promise.reject(new Error('Invalid operation'));
        }
    }

    // User Management
    async registerUser(userData) {
        try {
            // Check if user already exists
            const existingUser = await this.dbOperation('users', 'getAll');
            const userExists = existingUser.find(user => user.email === userData.email);

            if (userExists) {
                throw new Error('User with this email already exists');
            }

            const user = {
                ...userData,
                id: Date.now(),
                created_at: new Date().toISOString(),
                status: 'active'
            };

            await this.dbOperation('users', 'add', user);
            return user;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }

    async loginUser(email, password) {
        try {
            const users = await this.dbOperation('users', 'getAll');
            const user = users.find(u => u.email === email);

            if (!user) {
                throw new Error('User not found');
            }

            // In a real app, you'd verify the password hash
            // For demo purposes, we'll accept any password
            return user;
        } catch (error) {
            console.error('Error logging in user:', error);
            throw error;
        }
    }

    // Donation Management
    async addDonation(donationData) {
        try {
            const donation = {
                ...donationData,
                id: Date.now(),
                status: 'active',
                created_at: new Date().toISOString(),
                views: 0,
                requests: 0
            };

            await this.dbOperation('donations', 'add', donation);
            return donation;
        } catch (error) {
            console.error('Error adding donation:', error);
            throw error;
        }
    }

    async getAllDonations() {
        try {
            return await this.dbOperation('donations', 'getAll');
        } catch (error) {
            console.error('Error getting donations:', error);
            return [];
        }
    }

    async getDonationsByUser(email) {
        try {
            const donations = await this.dbOperation('donations', 'getAll');
            return donations.filter(donation => donation.donorEmail === email);
        } catch (error) {
            console.error('Error getting user donations:', error);
            return [];
        }
    }

    // Food Items Management (for Find Food page)
    async addFoodItem(foodItemData) {
        try {
            const foodItem = {
                ...foodItemData,
                id: Date.now(),
                created_at: new Date().toISOString(),
                is_available: true
            };

            await this.dbOperation('food_items', 'add', foodItem);
            return foodItem;
        } catch (error) {
            console.error('Error adding food item:', error);
            throw error;
        }
    }

    async getAllFoodItems() {
        try {
            const items = await this.dbOperation('food_items', 'getAll');
            return items.filter(item => item.is_available);
        } catch (error) {
            console.error('Error getting food items:', error);
            return [];
        }
    }

    async getFoodItemsByFilters(filters = {}) {
        try {
            const items = await this.getAllFoodItems();
            return items.filter(item => {
                if (filters.type && item.type !== filters.type) return false;
                if (filters.location && !item.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
                if (filters.urgency && item.urgency !== filters.urgency) return false;
                return true;
            });
        } catch (error) {
            console.error('Error filtering food items:', error);
            return [];
        }
    }

    // Request Management
    async addRequest(requestData) {
        try {
            const request = {
                ...requestData,
                id: Date.now(),
                status: 'pending',
                created_at: new Date().toISOString()
            };

            await this.dbOperation('requests', 'add', request);
            return request;
        } catch (error) {
            console.error('Error adding request:', error);
            throw error;
        }
    }

    async getRequestsByUser(email) {
        try {
            const requests = await this.dbOperation('requests', 'getAll');
            return requests.filter(request => request.requesterEmail === email);
        } catch (error) {
            console.error('Error getting user requests:', error);
            return [];
        }
    }

    async updateRequestStatus(requestId, status) {
        try {
            const requests = await this.dbOperation('requests', 'getAll');
            const requestIndex = requests.findIndex(r => r.id === requestId);

            if (requestIndex !== -1) {
                requests[requestIndex].status = status;
                requests[requestIndex].updated_at = new Date().toISOString();

                await this.dbOperation('requests', 'put', requests[requestIndex]);
                return requests[requestIndex];
            }

            throw new Error('Request not found');
        } catch (error) {
            console.error('Error updating request status:', error);
            throw error;
        }
    }

    // Statistics
    async getStatistics() {
        try {
            const [donations, requests, users] = await Promise.all([
                this.dbOperation('donations', 'getAll'),
                this.dbOperation('requests', 'getAll'),
                this.dbOperation('users', 'getAll')
            ]);

            const today = new Date().toDateString();
            const todayDonations = donations.filter(d =>
                new Date(d.created_at).toDateString() === today
            );

            const urgentItems = donations.filter(d => {
                const daysDiff = Math.ceil((new Date(d.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
                return daysDiff <= 1;
            });

            return {
                totalDonations: donations.length,
                todayDonations: todayDonations.length,
                totalRequests: requests.length,
                totalUsers: users.length,
                urgentItems: urgentItems.length,
                activeDonations: donations.filter(d => d.status === 'active').length
            };
        } catch (error) {
            console.error('Error getting statistics:', error);
            return {
                totalDonations: 0,
                todayDonations: 0,
                totalRequests: 0,
                totalUsers: 0,
                urgentItems: 0,
                activeDonations: 0
            };
        }
    }

    // Utility functions
    async clearAllData() {
        try {
            if (this.db) {
                const stores = ['users', 'donations', 'requests', 'food_items'];
                for (const storeName of stores) {
                    const transaction = this.db.transaction([storeName], 'readwrite');
                    const store = transaction.objectStore(storeName);
                    store.clear();
                }
            } else {
                const keys = ['foodshare_users', 'foodshare_donations', 'foodshare_requests', 'foodshare_food_items'];
                keys.forEach(key => localStorage.removeItem(key));
            }
            console.log('All data cleared');
        } catch (error) {
            console.error('Error clearing data:', error);
        }
    }

    // Admin Management
    async createAdmin(adminData) {
        try {
            // Check if admin already exists
            const existingAdmins = await this.dbOperation('admins', 'getAll');
            const adminExists = existingAdmins.find(admin =>
                admin.username === adminData.username || admin.email === adminData.email
            );

            if (adminExists) {
                throw new Error('Admin with this username or email already exists');
            }

            const admin = {
                ...adminData,
                id: Date.now(),
                created_at: new Date().toISOString(),
                status: 'active',
                last_login: null
            };

            await this.dbOperation('admins', 'add', admin);
            return admin;
        } catch (error) {
            console.error('Error creating admin:', error);
            throw error;
        }
    }

    async loginAdmin(username, password) {
        try {
            const admins = await this.dbOperation('admins', 'getAll');
            const admin = admins.find(a => a.username === username);

            if (!admin) {
                throw new Error('Admin not found');
            }

            // In a real app, you'd verify the password hash
            // For demo purposes, we'll accept any password
            if (admin.status !== 'active') {
                throw new Error('Admin account is inactive');
            }

            // Update last login
            admin.last_login = new Date().toISOString();
            await this.dbOperation('admins', 'put', admin);

            return admin;
        } catch (error) {
            console.error('Error logging in admin:', error);
            throw error;
        }
    }

    // NGO Management
    async addNGO(ngoData) {
        try {
            const ngo = {
                ...ngoData,
                id: Date.now(),
                created_at: new Date().toISOString(),
                status: 'active',
                total_deliveries: 0,
                rating: 0,
                verified: false
            };

            await this.dbOperation('ngos', 'add', ngo);
            return ngo;
        } catch (error) {
            console.error('Error adding NGO:', error);
            throw error;
        }
    }

    async getAllNGOs() {
        try {
            return await this.dbOperation('ngos', 'getAll');
        } catch (error) {
            console.error('Error getting NGOs:', error);
            return [];
        }
    }

    async getNGOById(id) {
        try {
            return await this.dbOperation('ngos', 'get', id);
        } catch (error) {
            console.error('Error getting NGO:', error);
            return null;
        }
    }

    async updateNGO(id, ngoData) {
        try {
            const ngo = await this.getNGOById(id);
            if (!ngo) {
                throw new Error('NGO not found');
            }

            const updatedNGO = {
                ...ngo,
                ...ngoData,
                updated_at: new Date().toISOString()
            };

            await this.dbOperation('ngos', 'put', updatedNGO);
            return updatedNGO;
        } catch (error) {
            console.error('Error updating NGO:', error);
            throw error;
        }
    }

    async deleteNGO(id) {
        try {
            await this.dbOperation('ngos', 'delete', id);
            return true;
        } catch (error) {
            console.error('Error deleting NGO:', error);
            throw error;
        }
    }

    // Delivery Person Management
    async addDeliveryPerson(deliveryPersonData) {
        try {
            // Generate unique username and password
            const username = this.generateUniqueUsername(deliveryPersonData.name);
            const password = this.generateRandomPassword();

            const deliveryPerson = {
                ...deliveryPersonData,
                id: Date.now(),
                username: username,
                password: password, // In real app, this would be hashed
                created_at: new Date().toISOString(),
                status: 'active',
                total_deliveries: 0,
                rating: 0,
                verified: false,
                last_active: null
            };

            await this.dbOperation('delivery_persons', 'add', deliveryPerson);
            return deliveryPerson;
        } catch (error) {
            console.error('Error adding delivery person:', error);
            throw error;
        }
    }

    async getAllDeliveryPersons() {
        try {
            return await this.dbOperation('delivery_persons', 'getAll');
        } catch (error) {
            console.error('Error getting delivery persons:', error);
            return [];
        }
    }

    async getDeliveryPersonById(id) {
        try {
            return await this.dbOperation('delivery_persons', 'get', id);
        } catch (error) {
            console.error('Error getting delivery person:', error);
            return null;
        }
    }

    async updateDeliveryPerson(id, deliveryPersonData) {
        try {
            const deliveryPerson = await this.getDeliveryPersonById(id);
            if (!deliveryPerson) {
                throw new Error('Delivery person not found');
            }

            const updatedDeliveryPerson = {
                ...deliveryPerson,
                ...deliveryPersonData,
                updated_at: new Date().toISOString()
            };

            await this.dbOperation('delivery_persons', 'put', updatedDeliveryPerson);
            return updatedDeliveryPerson;
        } catch (error) {
            console.error('Error updating delivery person:', error);
            throw error;
        }
    }

    async deleteDeliveryPerson(id) {
        try {
            await this.dbOperation('delivery_persons', 'delete', id);
            return true;
        } catch (error) {
            console.error('Error deleting delivery person:', error);
            throw error;
        }
    }

    // Utility functions for generating credentials
    generateUniqueUsername(name) {
        const baseUsername = name.toLowerCase().replace(/\s+/g, '').substring(0, 8);
        const randomSuffix = Math.floor(Math.random() * 1000);
        return `${baseUsername}${randomSuffix}`;
    }

    generateRandomPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 10; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    // Sample data loading
    async loadSampleData() {
        try {
            const sampleFoodItems = [
                {
                    name: "Fresh Vegetables Mix",
                    type: "vegetables",
                    quantity: "25 kg",
                    description: "Assorted fresh vegetables including tomatoes, onions, potatoes, and leafy greens. Perfect for cooking meals.",
                    location: "Shimla, Himachal Pradesh",
                    donor: "Green Valley Restaurant",
                    donorEmail: "greenvalley@example.com",
                    donorPhone: "+91 98765 43210",
                    urgency: "medium",
                    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
                    pickupTime: "10:00 AM - 6:00 PM",
                    image: "🥬"
                },
                {
                    name: "Bakery Items",
                    type: "bakery",
                    quantity: "50 pieces",
                    description: "Fresh bread, muffins, and pastries from morning bake. Still fresh and perfect for immediate consumption.",
                    location: "Manali, Himachal Pradesh",
                    donor: "Mountain View Bakery",
                    donorEmail: "mountainview@example.com",
                    donorPhone: "+91 98765 43211",
                    urgency: "high",
                    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
                    pickupTime: "9:00 AM - 5:00 PM",
                    image: "🍞"
                },
                {
                    name: "Prepared Meals",
                    type: "prepared",
                    quantity: "30 servings",
                    description: "Home-cooked meals including dal, rice, and vegetables. Nutritious and ready to serve.",
                    location: "Dharamshala, Himachal Pradesh",
                    donor: "Community Kitchen",
                    donorEmail: "communitykitchen@example.com",
                    donorPhone: "+91 98765 43212",
                    urgency: "low",
                    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
                    pickupTime: "11:00 AM - 7:00 PM",
                    image: "🍽️"
                }
            ];

            for (const item of sampleFoodItems) {
                await this.addFoodItem(item);
            }

            console.log('Sample data loaded successfully');
        } catch (error) {
            console.error('Error loading sample data:', error);
        }
    }

    // Initialize default admin
    async initializeDefaultAdmin() {
        try {
            // Wait for database to be ready
            if (!this.db && !this.useLocalStorage) {
                await new Promise((resolve, reject) => {
                    const checkDB = () => {
                        if (this.db || this.useLocalStorage) {
                            resolve();
                        } else {
                            setTimeout(checkDB, 100);
                        }
                    };
                    checkDB();
                });
            }

            const admins = await this.dbOperation('admins', 'getAll');
            if (admins.length === 0) {
                await this.createAdmin({
                    name: 'System Administrator',
                    username: 'admin',
                    email: 'admin@foodshare.com',
                    password: 'admin123', // In real app, this would be hashed
                    role: 'super_admin'
                });
                console.log('Default admin created successfully');
            }
        } catch (error) {
            console.error('Error initializing default admin:', error);
            throw error; // Re-throw to allow caller to handle
        }
    }
}

// Create global instance
const dataManager = new FoodShareDataManager();

// Make available globally
window.dataManager = dataManager;
