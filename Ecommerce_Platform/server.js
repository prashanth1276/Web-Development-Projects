const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sanji_#655', // NOTE: Change the Password
    database: 'ecommerce_db'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

// Fetch all products
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Add to cart endpoint
app.post('/add-to-cart', (req, res) => {
    const { productId } = req.body;
    // Assuming user_id is 1 for demonstration. You should manage user sessions to get the correct user_id.
    const userId = 1;
    db.query('INSERT INTO cart (user_id, product_id) VALUES (?, ?)', [userId, productId], (err, result) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

// Create tables if they don't exist
db.query(`
    CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    )
`);

db.query(`
    CREATE TABLE IF NOT EXISTS products (
        product_id INT AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2),
        stock INT
    )
`);

db.query(`
    CREATE TABLE IF NOT EXISTS cart (
        cart_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        product_id INT,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    )
`);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});