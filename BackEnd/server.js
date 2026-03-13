const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD || '036', // Use environment variable for password
  database: 'truck_mate'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // Exit the process if connection fails
  }
  console.log('MySQL connected...');
});















// Endpoint to fetch user data based on user ID
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT user_id, name, email, mobile_number AS mobileNumber, nic_number AS nicNumber, password FROM users WHERE user_id = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user details:', err);
      return res.status(500).send('Error fetching user details');
    }
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send('User not found');
    }
  });
});

// Endpoint to update user data based on user ID
app.put('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, mobileNumber, nicNumber, password } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ?, mobile_number = ?, nic_number = ?, password = ? WHERE user_id = ?';

  db.query(sql, [name, email, mobileNumber, nicNumber, password, userId], (err, result) => {
    if (err) {
      console.error('Error updating user details:', err);
      return res.status(500).send('Error updating user details');
    }
    res.send('User information updated successfully!');
  });
});

// Endpoint to create a new user account
app.post('/api/signup', (req, res) => {
  const { name, email, mobileNumber, nicNumber, password } = req.body;
  const sql = 'INSERT INTO users (name, email, mobile_number, nic_number, password) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [name, email, mobileNumber, nicNumber, password], (err, result) => {
    if (err) {
      console.error('Error creating user account:', err);
      return res.status(500).send('Error creating user account');
    }
    res.send({ userId: result.insertId, message: 'User account created successfully!' });
  });
});

// Endpoint for user login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT user_id, name, email, mobile_number AS mobileNumber, nic_number AS nicNumber FROM users WHERE email = ? AND password = ?';

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).send('Error during login');
    }
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// Endpoint to handle vehicle registration
app.post('/api/vehicles', (req, res) => {
  const { userId, vehicleModel, size, maxWeight, category, numberPlate, province, revenueLicense, insuranceNumber } = req.body;
  const sql = 'INSERT INTO vehicles (user_id, vehicle_model, size, max_weight, category, number_plate, province, revenue_license, insurance_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(sql, [userId, vehicleModel, size, maxWeight, category, numberPlate, province, revenueLicense, insuranceNumber], (err, result) => {
    if (err) {
      console.error('Error registering vehicle:', err);
      return res.status(500).send('Error registering vehicle');
    }
    res.send('Vehicle registration successful!');
  });
});


// Available Orders
app.get('/api/orders', (req, res) => {
  const sql = 'SELECT * FROM orders';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Failed to fetch orders' });
      return;
    }
    res.json(results);
  });
});

// Endpoint to confirm order
app.post('/api/confirmOrder', (req, res) => {
  const { id, cusname, cusaddress, cuscontact, supname, supaddress, supcontact, description, category, size, weight, type, pickup, delivery } = req.body;
  const driverEmail = req.body.driverEmail; // Assuming the driver's email is sent from the frontend

  // Use the driverEmail in your database query or processing logic
  // Example: Insert the order data into the confirmed_orders table along with the driver's email
  const sql = 'INSERT INTO confirmed_orders (order_id, cusname, cusaddress, cuscontact, supname, supaddress, supcontact, description, category, size, weight, type, pickup, delivery, driver_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [id, cusname, cusaddress, cuscontact, supname, supaddress, supcontact, description, category, size, weight, type, pickup, delivery, driverEmail], (err, result) => {
    if (err) {
      console.error('Error confirming order:', err);
      res.status(500).json({ error: 'Failed to confirm order' });
      return;
    }
    
    // Remove the confirmed order from the orders table
    const deleteSql = 'DELETE FROM orders WHERE id = ?';
    db.query(deleteSql, [id], (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.error('Error removing order from orders table:', deleteErr);
        res.status(500).json({ error: 'Failed to remove order from orders table' });
        return;
      }
      res.json({ message: 'Order confirmed successfully', orderId: id });
    });
  });
});


// Endpoint to fetch confirmed orders
app.get('/api/confirmedOrders', (req, res) => {
  const sql = 'SELECT * FROM confirmed_orders';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching confirmed orders:', err);
      res.status(500).json({ error: 'Failed to fetch confirmed orders' });
      return;
    }
    res.json(results);
  });
});

// 
// Endpoint to move order from confirmed_orders to picked_orders
app.put('/api/moveToPicked/:orderId', (req, res) => {
  const orderId = req.params.orderId;

  // Check if the order exists in confirmed_orders
  const checkSql = 'SELECT * FROM confirmed_orders WHERE order_id = ?';
  db.query(checkSql, [orderId], (err, results) => {
    if (err) {
      console.error('Error checking order in confirmed_orders:', err);
      res.status(500).json({ error: 'Failed to check order' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Order not found in confirmed_orders' });
      return;
    }

    // Move the order to picked_orders table
    const moveToPickedSql = 'INSERT INTO picked_orders (order_id, cusname, cusaddress, cuscontact, supname, supaddress, supcontact, description, category, size, weight, type, pickup, delivery, driver_email) SELECT order_id, cusname, cusaddress, cuscontact, supname, supaddress, supcontact, description, category, size, weight, type, pickup, delivery, driver_email FROM confirmed_orders WHERE order_id = ?';
    db.query(moveToPickedSql, [orderId], (moveErr, moveResult) => {
      if (moveErr) {
        console.error('Error moving order to picked_orders:', moveErr);
        res.status(500).json({ error: 'Failed to move order to picked_orders' });
        return;
      }

      // Delete the order from confirmed_orders table
      const deleteFromConfirmedSql = 'DELETE FROM confirmed_orders WHERE order_id = ?';
      db.query(deleteFromConfirmedSql, [orderId], (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.error('Error deleting order from confirmed_orders:', deleteErr);
          res.status(500).json({ error: 'Failed to delete order from confirmed_orders' });
          return;
        }
        res.json({ message: 'Order moved to picked_orders successfully' });
      });
    });
  });
});



// Endpoint to move order from picked_orders to order_history
app.put('/api/moveToHistory/:orderId', (req, res) => {
  const orderId = req.params.orderId;

  // Check if the order exists in picked_orders
  const checkSql = 'SELECT * FROM picked_orders WHERE order_id = ?';
  db.query(checkSql, [orderId], (err, results) => {
    if (err) {
      console.error('Error checking order in picked_orders:', err);
      res.status(500).json({ error: 'Failed to check order' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Order not found in picked_orders' });
      return;
    }

    // Move the order to order_history table
    const moveToHistorySql = 'INSERT INTO order_history (order_id, cusname, cusaddress, cuscontact, supname, supaddress, supcontact, description, category, size, weight, type, pickup, delivery, driver_email) SELECT order_id, cusname, cusaddress, cuscontact, supname, supaddress, supcontact, description, category, size, weight, type, pickup, delivery, driver_email FROM picked_orders WHERE order_id = ?';
    db.query(moveToHistorySql, [orderId], (moveErr, moveResult) => {
      if (moveErr) {
        console.error('Error moving order to order_history:', moveErr);
        res.status(500).json({ error: 'Failed to move order to order_history' });
        return;
      }

      // Delete the order from picked_orders table
      const deleteFromPickedSql = 'DELETE FROM picked_orders WHERE order_id = ?';
      db.query(deleteFromPickedSql, [orderId], (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.error('Error deleting order from picked_orders:', deleteErr);
          res.status(500).json({ error: 'Failed to delete order from picked_orders' });
          return;
        }
        res.json({ message: 'Order moved to order_history successfully' });
      });
    });
  });
});


// Endpoint to fetch picked orders
app.get('/api/pickedOrders', (req, res) => {
  const sql = 'SELECT * FROM picked_orders';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching picked orders:', err);
      res.status(500).json({ error: 'Failed to fetch picked orders' });
      return;
    }
    res.json(results);
  });
});



// Endpoint to fetch order history
app.get('/api/orderHistory', (req, res) => {
  const sql = 'SELECT * FROM order_history';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching order history:', err);
      res.status(500).json({ error: 'Failed to fetch order history' });
      return;
    }
    res.json(results);
  });
});



// Admin 

// Add this endpoint to fetch complaints
app.get('/complaints', (req, res) => {
  const query = 'SELECT * FROM complaints';
  db.query(query, (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.json(results);
  });
});

// Other routes...

app.post('/signup1', (req, res) => {
  const { name, email, mobileNumber, nicNumber, password } = req.body;
  const query = 'INSERT INTO customer (name, email, mobileNumber, nicNumber, password) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, mobileNumber, nicNumber, password], (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.send('Admin registered successfully!');
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM customer WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      if (results.length > 0) {
          res.json({ success: true });
      } else {
          res.json({ success: false });
      }
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

app.delete('/users/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  db.query('DELETE FROM users WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.send('User deleted');
    }
  });
});


app.put('/user/password', (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  const query = 'SELECT * FROM customer WHERE email = ? AND password = ?';
  db.query(query, [email, currentPassword], (err, results) => {
      if (err) {
          console.error('Error in SELECT query:', err);
          return res.status(500).send(err);
      }
      if (results.length > 0) {
          const updateQuery = 'UPDATE customer SET password = ? WHERE email = ?';
          db.query(updateQuery, [newPassword, email], (err, result) => {
              if (err) {
                  console.error('Error in UPDATE query:', err);
                  return res.status(500).send(err);
              }
              res.json({ success: true });
          });
      } else {
          console.error('Current password does not match');
          res.json({ success: false });
      }
  });
});
// Endpoint to fetch complaints
app.get('/complaints', (req, res) => {
  const query = 'SELECT * FROM complaints';
  db.query(query, (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.json(results);
  });
});

//----------------

app.get('/order_history', (req, res) => {
  const sqlQuery = 'SELECT * FROM order_history';
  db.query(sqlQuery, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});
//--------------------- 
// Endpoint to search for an order by order_id
app.get('/order_history/:order_id', (req, res) => {
  const { order_id } = req.params;
  const sqlQuery = 'SELECT * FROM order_history WHERE order_id = ?';
  db.query(sqlQuery, [order_id], (err, result) => {
      if (err) {
          res.status(500).send(err);
      } else if (result.length > 0) {
          res.json(result[0]);
      } else {
          res.status(404).send('Not Found           ');
      }
  });
});

// 


// Ordermng


// POST endpoint for submitting orders
app.post('/submitorder', (req, res) => {
  const {
    name,
    address,
    contact,
    name1,
    address1,
    contact1,
    description,
    category,
    package_size,
    weight,
    package,
    pickup,
    delivery,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !address ||
    !contact ||
    !name1 ||
    !address1 ||
    !contact1 ||
    !description ||
    !category ||
    !package_size ||
    !weight ||
    !package ||
    !pickup ||
    !delivery
  ) {
    return res.status(400).send('All fields are required');
  }

  const sql = `
    INSERT INTO orders (
      cusname, cusaddress, cuscontact, supname, supaddress, supcontact,
      description, category, size, weight, type, pickup, delivery
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    address,
    contact,
    name1,
    address1,
    contact1,
    description,
    category,
    package_size,
    weight,
    package,
    pickup,
    delivery,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error inserting data');
    }
    res.status(200).send('Form data saved to database');
  });
});

// GET endpoint to fetch orders
app.get('/ordersshow', (req, res) => {
  const sql = 'SELECT * FROM orders'; // Modify this query as per your table structure
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Error fetching data');
    }
    res.status(200).json(result);
  });
});

// PUT endpoint for editing orders
app.put('/editorder/:id', (req, res) => {
  const orderId = req.params.id;
  const { cusname, cusaddress, category, weight, pickup, delivery } = req.body;

  const sql = `
    UPDATE orders
    SET cusname = ?, cusaddress = ?, category = ?, weight = ?, pickup = ?, delivery = ?
    WHERE id = ?
  `;

  const values = [cusname, cusaddress, category, weight, pickup, delivery, orderId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating order:', err);
      return res.status(500).send('Error updating order');
    }
    res.status(200).send('Order updated successfully');
  });
});

// DELETE endpoint for deleting orders
app.delete('/deleteorder/:id', (req, res) => {
  const orderId = req.params.id;

  const sql = `
    DELETE FROM orders
    WHERE id = ?
  `;

  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error('Error deleting order:', err);
      return res.status(500).send('Error deleting order');
    }
    res.status(200).send('Order deleted successfully');
  });
});

// 

// Complaints


app.post('/api/complaints', (req, res) => {
  const { username, message, orderId } = req.body;
  const query = 'INSERT INTO complaints (username, message, orderId) VALUES (?, ?, ?)';
  db.query(query, [username, message, orderId], (err, results) => {
      if (err) {
          console.error('Error inserting complaint:', err);
          res.status(500).send({ status: 'Error saving complaint', error: err });
          return;
      }
      res.send({ status: 'Complaint received successfully', complaint: { id: results.insertId, username, message, orderId } });
  });
});

app.get('/api/complaints', (req, res) => {
  const query = 'SELECT * FROM complaints';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error retrieving complaints:', err);
          res.status(500).send({ status: 'Error retrieving complaints', error: err });
          return;
      }
      res.send({ complaints: results });
  });
});

app.put('/api/complaints/:id', (req, res) => {
  const { id } = req.params;
  const { message, orderId } = req.body;
  const query = 'UPDATE complaints SET message = ?, orderId = ? WHERE id = ?';
  db.query(query, [message, orderId, id], (err, results) => {
      if (err) {
          console.error('Error updating complaint:', err);
          res.status(500).send({ status: 'Error updating complaint', error: err });
          return;
      }
      if (results.affectedRows === 0) {
          res.status(404).send({ status: 'Complaint not found' });
          return;
      }
      res.send({ status: 'Complaint updated successfully', complaint: { id, message, orderId } });
  });
});

app.delete('/api/complaints/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM complaints WHERE id = ?';
  db.query(query, [id], (err, results) => {
      if (err) {
          console.error('Error deleting complaint:', err);
          res.status(500).send({ status: 'Error deleting complaint', error: err });
          return;
      }
      if (results.affectedRows === 0) {
          res.status(404).send({ status: 'Complaint not found' });
          return;
      }
      res.send({ status: 'Complaint deleted successfully' });
  });
});

// 

// Status


// Move picked order to history
app.put('/api/moveToHistory/:orderId', (req, res) => {
  const { orderId } = req.params;
  const moveToHistorySql = 'INSERT INTO order_history (order_id, status) SELECT order_id, "Delivered" FROM picked_orders WHERE order_id = ?; DELETE FROM picked_orders WHERE order_id = ?;';
  db.query(moveToHistorySql, [orderId, orderId], (err, result) => {
    if (err) throw err;
    res.send('Order moved to order_history');
  });
});



// 


// reviews

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
// 

// Endpoint to fetch picked order details
app.get('/api/picked_orders/:order_id', (req, res) => {
  const orderId = req.params.order_id;
  const query = `SELECT order_id, pickup FROM picked_orders WHERE order_id = ?`;

  connection.query(query, [orderId], (error, results, fields) => {
    if (error) {
      console.error('Error fetching picked order details:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch order details' });
    } else {
      if (results.length > 0) {
        const pickedDate = results[0].picked_date;
        const orderDetails = {
          success: true,
          orderId,
          pickedDate,
          step: 1, // Assuming initial step
          orderHistory: [] // Initial empty history
        };
        res.json(orderDetails);
      } else {
        res.status(404).json({ success: false, error: 'Order not found' });
      }
    }
  });
});

// Route to fetch order ID
app.get('/api/order_history/order_id', (req, res) => {
  // Example query to fetch order ID from order_history table
  const query = 'SELECT order_id FROM order_history LIMIT 1'; // Adjust your query as per your schema
  
  connection.query(query, (error, results, _fields) => {
    if (error) {
      console.error('Error fetching order ID:', error);
      res.status(500).json({ error: 'Error fetching order ID' });
      return;
    }

    if (results.length > 0) {
      const orderId = results[0].orderId; // Assuming orderId is a field in your table
      res.json({ orderId });
    } else {
      res.status(404).json({ error: 'Order ID not found' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
