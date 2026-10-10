// Test script to verify admin initialization fix
// This script tests that the admin system initializes properly without JSHandle@error

console.log('🧪 Testing Admin Initialization Fix...');

// Test the dataManager initialization
async function testAdminInitialization() {
    console.log('📋 Test 1: Testing dataManager initialization...');

    try {
        // Wait for dataManager to be available
        if (typeof window.dataManager === 'undefined') {
            throw new Error('dataManager not found on window object');
        }

        console.log('✅ dataManager is available');

        // Test database initialization
        console.log('📋 Test 2: Testing database readiness...');

        // Wait for database to be ready (either IndexedDB or localStorage fallback)
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds max

        while (attempts < maxAttempts) {
            if (window.dataManager.db || window.dataManager.useLocalStorage) {
                console.log('✅ Database is ready');
                break;
            }
            attempts++;
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (attempts >= maxAttempts) {
            throw new Error('Database failed to initialize within timeout');
        }

        // Test admin initialization
        console.log('📋 Test 3: Testing admin initialization...');

        await window.dataManager.initializeDefaultAdmin();

        // Verify admin was created
        const admins = await window.dataManager.dbOperation('admins', 'getAll');

        if (admins && admins.length > 0) {
            console.log('✅ Default admin created successfully');
            console.log('📊 Admin details:', {
                name: admins[0].name,
                username: admins[0].username,
                email: admins[0].email,
                role: admins[0].role
            });
        } else {
            console.log('⚠️ No admins found - this might be expected if admin already exists');
        }

        // Test admin login
        console.log('📋 Test 4: Testing admin login...');

        const admin = await window.dataManager.loginAdmin('admin', 'admin123');

        if (admin) {
            console.log('✅ Admin login successful');
            console.log('👤 Logged in admin:', admin.name);
        } else {
            throw new Error('Admin login failed');
        }

        console.log('🎉 All tests passed! Admin initialization fix is working correctly.');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('🔍 Error details:', error);
        return false;
    }

    return true;
}

// Manual test function that can be called from browser console
window.testAdminInit = testAdminInitialization;

// Auto-run test if this script is loaded directly
if (typeof window !== 'undefined' && window.location) {
    console.log('🔄 Auto-running admin initialization test...');
    testAdminInitialization().then(success => {
        if (success) {
            console.log('🎊 Admin initialization test completed successfully!');
        } else {
            console.log('💥 Admin initialization test failed. Check the errors above.');
        }
    });
}

console.log('📝 Test script loaded. You can also run:');
console.log('   testAdminInit() - from browser console');
console.log('   window.testAdminInit() - from any script');
