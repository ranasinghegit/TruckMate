const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'Kavindu',
    password: process.env.DB_PASSWORD || 'Kavi083#',
    database: process.env.DB_NAME || 'truck_mate'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database');
});

// Create reviews table if not exists
const createTableQuery = `
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

db.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Reviews table ready');
});

// Endpoint to get all reviews
app.get('/reviews', (req, res) => {
    const query = 'SELECT * FROM reviews';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving reviews:', err);
            res.status(500).send({ status: 'Error retrieving reviews', error: err });
        } else {
            res.send(results);
        }
    });
});

// Endpoint to add a new review
app.post('/reviews', (req, res) => {
    const { username, rating } = req.body;
    const query = 'INSERT INTO reviews (username, rating) VALUES (?, ?)';
    db.query(query, [username, rating], (err, result) => {
        if (err) {
            console.error('Error saving review:', err);
            res.status(500).send({ status: 'Error saving review', error: err });
        } else {
            res.send({ id: result.insertId, username, rating, date: new Date() });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
