// script.js

let cart = [];
let products = [
    { product_id: 1, product_name: 'Laptop', description: 'High performance laptop', category: 'electronics', price: 1000, stock: 10 },
    { product_id: 2, product_name: 'Smartphone', description: 'Latest model smartphone', category: 'electronics', price: 800, stock: 15 },
    { product_id: 3, product_name: 'Headphones', description: 'Noise-cancelling headphones', category: 'electronics', price: 200, stock: 20 },
    { product_id: 4, product_name: 'T-Shirt', description: 'Comfortable cotton t-shirt', category: 'clothing', price: 20, stock: 30 },
    { product_id: 5, product_name: 'Jeans', description: 'Stylish denim jeans', category: 'clothing', price: 40, stock: 25 },
    { product_id: 6, product_name: 'Jacket', description: 'Warm winter jacket', category: 'clothing', price: 60, stock: 10 },
    { product_id: 7, product_name: 'Vacuum Cleaner', description: 'Powerful vacuum cleaner', category: 'home_appliances', price: 150, stock: 8 },
    { product_id: 8, product_name: 'Microwave', description: 'Compact microwave oven', category: 'home_appliances', price: 100, stock: 5 },
    { product_id: 9, product_name: 'Refrigerator', description: 'Energy-efficient refrigerator', category: 'home_appliances', price: 500, stock: 3 },
    { product_id: 10, product_name: 'Novel', description: 'Bestselling novel', category: 'books', price: 10, stock: 50 },
    { product_id: 11, product_name: 'Cookbook', description: 'Delicious recipes', category: 'books', price: 25, stock: 20 },
    { product_id: 12, product_name: 'Biography', description: 'Inspiring biography', category: 'books', price: 15, stock: 30 }
];

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('loginFormContainer').style.display = 'none';
            document.getElementById('landingPage').style.display = 'block';
            document.getElementById('loginButton').style.display = 'none';
            document.getElementById('logoutButton').style.display = 'block';
            filterProducts();  // Display products based on selected category
        } else {
            alert('Login failed!');
        }
    })
    .catch(error => console.error('Error:', error));
});

function displayProducts(products) {
    const productsTable = document.getElementById('productsTable').querySelector('tbody');
    productsTable.innerHTML = '';
    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.product_id}</td>
            <td>${product.product_name}</td>
            <td>${product.description}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td><button onclick="addToCart(${product.product_id})">Add to Cart</button></td>
        `;
        productsTable.appendChild(tr);
    });
}

function filterProducts() {
    const category = document.getElementById('categorySelect').value;
    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

function addToCart(productId) {
    const product = products.find(p => p.product_id === productId);
    const cartItem = cart.find(item => item.product_id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartTable = document.getElementById('cartTable').querySelector('tbody');
    cartTable.innerHTML = '';

    cart.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.product_id}</td>
            <td>${item.product_name}</td>
            <td>${item.description}</td>
            <td>${item.category}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
        `;
        cartTable.appendChild(tr);
    });
}

function buy() {
    alert('Thank you for your purchase!');
    cart = [];
    updateCart();
}

function logout() {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('loginFormContainer').style.display = 'block';
    document.getElementById('loginButton').style.display = 'block';
    document.getElementById('logoutButton').style.display = 'none';
    cart = [];
    updateCart();
}
