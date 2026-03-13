const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'truck_mate'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Create a new order status
app.post('/api/order/status', (req, res) => {
  const { orderId } = req.body;
  const status = 'Confirmed Order'; // Default status for new order
  const date = new Date().toLocaleString(); // Current date and time

  const query = 'INSERT INTO `order` (order_id, date, status) VALUES (?, ?, ?)';
  db.query(query, [orderId, date, status], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send('Order status created');
  });
});

// Get order history
app.get('/api/order/history', (req, res) => {
  const query = 'SELECT * FROM `order`';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

// Delete order status
app.delete('/api/order/status/:orderId', (req, res) => {
  const { orderId } = req.params;
  const query = 'DELETE FROM `order` WHERE order_id = ?';
  db.query(query, [orderId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send('Order status deleted');
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
