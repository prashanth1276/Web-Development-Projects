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
            <td><button class="add-to-cart-btn" onclick="addToCart(${product.product_id}, '${product.product_name}', '${product.description}', '${product.category}', ${product.price})">Add to Cart</button></td>
        `;
        productsTable.appendChild(tr);
    });
}

function filterProducts() {
    const category = document.getElementById('categorySelect').value;
    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

function addToCart(productId, productName, description, category, price) {
    const existingProduct = cart.find(item => item.productId === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ productId, productName, description, category, price, quantity: 1 });
    }
    alert('Product added to cart!');
}

function showCartPage() {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('cartPage').style.display = 'block';
    const cartTable = document.getElementById('cartTable').querySelector('tbody');
    cartTable.innerHTML = '';
    cart.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.productId}</td>
            <td>${item.productName}</td>
            <td>${item.description}</td>
            <td>${item.category}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
        `;
        cartTable.appendChild(tr);
    });
}

function showLandingPage() {
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('receiptPage').style.display = 'none';
    document.getElementById('landingPage').style.display = 'block';
    filterProducts(); // Display products based on selected category
}

function logout() {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('receiptPage').style.display = 'none';
    document.getElementById('loginFormContainer').style.display = 'block';
    document.getElementById('loginForm').reset(); // Clear the login form fields
    document.getElementById('loginButton').style.display = 'block';
    document.getElementById('logoutButton').style.display = 'none';
    cart = [];  // Clear the cart on logout
}

function buy() {
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('receiptPage').style.display = 'block';
    const receiptContent = document.getElementById('receiptContent');
    receiptContent.innerHTML = '<h2>Receipt</h2>';
    cart.forEach(item => {
        receiptContent.innerHTML += `<p>${item.productName} (${item.quantity} x ${item.price})</p>`;
    });
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    receiptContent.innerHTML += `<h3>Total: ₹${total}</h3>`;
}

function printReceipt() {
    const receiptContent = document.getElementById('receiptContent').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Receipt</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(receiptContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

function fetchProducts() {
    displayProducts(products);
}
