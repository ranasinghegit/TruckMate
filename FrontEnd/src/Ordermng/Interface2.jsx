import React, { useState, useEffect } from 'react';
import './Interface2.css';
import axios from 'axios';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
// import GooglePayButton from '@google-pay/button-react';
import Google from '../Pay/GooglePayButton';

const Interface2 = () => {
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const [formData, setFormData] = useState({
    id: '',
    cusname: '',
    cusaddress: '',
    cuscontact: '',
    supname: '',
    supaddress: '',
    supcontact: '',
    description: '',
    category: '',
    size: '',
    weight: '',
    type: '',
    pickup: '',
    delivery: ''
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/ordersshow');
      setOrders(response.data);
    } catch (error) {
      console.log('Error fetching orders:', error);
    }
  };

  


  const handleEdit = (order) => {
    console.log('Editing order:', order);  // Debug log
    setEditOrder(order.id);
    setFormData(order);
  };

  const handleDelete = async (orderId) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/deleteorder/${orderId}`);
        fetchOrders();
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData); // Debug log
    try {
      await axios.put(`http://localhost:5000/editorder/${editOrder}`, formData);
      setEditOrder(null);
      fetchOrders();
    } catch (error) {
      console.log('Error editing order:', error);
    }
  };

  return (
    <div>
      <Header/>
    <div className="order-summary-container">
      {editOrder ? (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h3>Customer Details</h3>
            <div className="form-group">
              <label htmlFor="cusname">Name</label>
              <input
                type="text"
                id="cusname"
                name="cusname"
                value={formData.cusname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cusaddress">Address</label>
              <input
                type="text"
                id="cusaddress"
                name="cusaddress"
                value={formData.cusaddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cuscontact">Contact</label>
              <input
                type="tel"
                id="cuscontact"
                name="cuscontact"
                value={formData.cuscontact}
                onChange={handleChange}
                required
              />
            </div>
            <h3>Supplier Details</h3>
            <div className="form-group">
              <label htmlFor="supname">Name</label>
              <input
                type="text"
                id="supname"
                name="supname"
                value={formData.supname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="supaddress">Address</label>
              <input
                type="text"
                id="supaddress"
                name="supaddress"
                value={formData.supaddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="supcontact">Contact</label>
              <input
                type="tel"
                id="supcontact"
                name="supcontact"
                value={formData.supcontact}
                onChange={handleChange}
                required
              />
            </div>
            <h3>Package Details</h3>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Grocery items">Grocery items</option>
                <option value="Glass">Glass</option>
                <option value="Furniture">Furniture</option>
                <option value="Pharmacy">Pharmacy</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="size">Package Size (sq. ft.)</label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <div className="radiobtn">
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="package"
                    checked={formData.type === 'package'}
                    onChange={handleChange}
                  /> Package
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="unpackage"
                    checked={formData.type === 'unpackage'}
                    onChange={handleChange}
                  /> Unpackage
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="pickup">Pickup</label>
              <input
                type="datetime-local"
                id="pickup"
                name="pickup"
                value={formData.pickup}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="delivery">Delivery</label>
              <input
                type="datetime-local"
                id="delivery"
                name="delivery"
                value={formData.delivery}
                onChange={handleChange}
                required
              />
            </div>
            <button className="button2" type="submit">Edit</button>
            <button className="button2" type="button" onClick={() => setEditOrder(null)}>Cancel</button>
          </form>
        </div>
      ) : (
        orders.map((order) => (
          <div className="order-summary-box" key={order.id}>
            <h2>Order ID: {order.id}</h2>
            <ul>
              <li><strong>Category:</strong> {order.category}</li>
              <li>{order.cusaddress} - {order.supaddress}</li>
              <li>{order.weight} Kg</li>
              <li><strong>Pickup:</strong> {order.pickup} <strong>Delivery:</strong> {order.delivery}</li>
            </ul>
            <div className="button-containr">

              <button className="button1" onClick={() => handleEdit(order)}>Edit</button>
              <button className="button1" onClick={() => handleDelete(order.id)}>Delete</button>
              {/* <button className="button1" onClick={() => handlecONFIRM(order.id)}>Confirm</button> */}
            
            </div>
           <div><Google></Google></div>
            
          </div>
          
        ))
      )}
    </div>
    </div>
    
  );
};

export default Interface2;
