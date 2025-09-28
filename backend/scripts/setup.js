#!/usr/bin/env node

/**
 * Development setup script
 * Run with: node scripts/setup.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Simple Shopping Cart Backend...\n');

try {
    // Check if node_modules exists
    if (!fs.existsSync(path.join(__dirname, '..', 'node_modules'))) {
        console.log('📦 Installing dependencies...');
        execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
        console.log('✅ Dependencies installed successfully!\n');
    } else {
        console.log('✅ Dependencies already installed\n');
    }

    // Build the project
    console.log('🔨 Building TypeScript project...');
    execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('✅ Project built successfully!\n');

    // Run tests
    console.log('🧪 Running tests...');
    execSync('npm test', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('✅ Tests passed!\n');

    console.log('🎉 Setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Start the server: npm run dev');
    console.log('   2. Visit API docs: http://localhost:3000/api-docs');
    console.log('   3. Test the API: node scripts/test-api.js');
    console.log('\n🔗 Available endpoints:');
    console.log('   - GET  /api/products');
    console.log('   - GET  /api/products/:id');
    console.log('   - POST /api/checkout');
    console.log('   - POST /api/cart/calculate');
    console.log('   - GET  /health');

} catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
}
