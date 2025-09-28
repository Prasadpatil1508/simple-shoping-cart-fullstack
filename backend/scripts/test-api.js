#!/usr/bin/env node

/**
 * Simple API testing script
 * Run with: node scripts/test-api.js
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

function makeRequest(path, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    const jsonBody = JSON.parse(body);
                    resolve({ status: res.statusCode, data: jsonBody });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

async function runTests() {
    console.log('🧪 Running API Tests...\n');

    try {
        // Test 1: Health check
        console.log('1. Testing health check...');
        const health = await makeRequest('/health');
        console.log(`   Status: ${health.status}`);
        console.log(`   Response: ${JSON.stringify(health.data, null, 2)}\n`);

        // Test 2: Get all products
        console.log('2. Testing get all products...');
        const products = await makeRequest('/api/products');
        console.log(`   Status: ${products.status}`);
        console.log(`   Products count: ${products.data.data?.length || 0}\n`);

        // Test 3: Get product by ID
        console.log('3. Testing get product by ID...');
        const product = await makeRequest('/api/products/1');
        console.log(`   Status: ${product.status}`);
        console.log(`   Product: ${product.data.data?.name || 'Not found'}\n`);

        // Test 4: Calculate cart total
        console.log('4. Testing calculate cart total...');
        const cartData = {
            items: [
                { productId: 1, quantity: 2 },
                { productId: 2, quantity: 1 }
            ]
        };
        const total = await makeRequest('/api/cart/calculate', 'POST', cartData);
        console.log(`   Status: ${total.status}`);
        console.log(`   Total: $${total.data.data?.total || 'Error'}\n`);

        // Test 5: Checkout
        console.log('5. Testing checkout...');
        const checkout = await makeRequest('/api/checkout', 'POST', cartData);
        console.log(`   Status: ${checkout.status}`);
        console.log(`   Order total: $${checkout.data.data?.totalAmount || 'Error'}\n`);

        console.log('✅ All tests completed!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('\n💡 Make sure the server is running with: npm run dev');
    }
}

runTests();
