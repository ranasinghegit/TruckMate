// search-app-client/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './communication.css';
import Header from '../components/Header';

function Comm() {
  const [showPopup, setShowPopup] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [orderId, setOrderId] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [editOrderId, setEditOrderId] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/complaints');
      setComplaints(response.data.complaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (orderId && isNaN(orderId)) newErrors.orderId = 'Order ID must be a number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axios.post('http://localhost:5000/api/complaints', { username, message, orderId });
      setComplaints([...complaints, response.data.complaint]);
      setUsername('');
      setMessage('');
      setOrderId('');
      setErrors({});
      setShowPopup(false);
    } catch (error) {
      console.error('Error saving complaint:', error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      await axios.put(`http://localhost:5000/api/complaints/${editingId}`, { 
        message: editMessage, 
        orderId: editOrderId 
      });
      fetchComplaints();
      setEditingId(null);
      setEditUsername('');
      setEditMessage('');
      setEditOrderId('');
      setErrors({});
      setShowPopup(false);
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
};

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/complaints/${id}`);
    fetchComplaints();
  } catch (error) {
    console.error('Error deleting complaint:', error);
  }
};


  const handleEdit = (id, currentUsername, currentMessage, currentOrderId) => {
    setEditingId(id);
    setEditUsername(currentUsername);
    setEditMessage(currentMessage);
    setEditOrderId(currentOrderId);
    setShowPopup(true);
  };

  return (
    <div>
      <Header />
      <div className="background-image">
        <div className="container">
          <div className="image-container">
            <img src="./buisnesman.jpg" alt="businessman" className="buisnesman-image" />
          </div>
          <div className="content">
            <h1>Build Your Brand</h1>
            <h1>Connecting With Customers</h1>
            <h3>Fast & secure messages and elegance interface</h3>
            <button className="get-started" onClick={() => setShowPopup(true)}>
              Get Started
            </button>
            <ul>
              {complaints.map((complaint) => (
                <li key={complaint.id}>
                  {complaint.username} (Order ID: {complaint.orderId}): {complaint.message}
                  <div>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(complaint.id, complaint.username, complaint.message, complaint.orderId)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(complaint.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {showPopup && (
            <div className="side-popup">
              <div className="popup-content">
                <span className="close-button" onClick={() => setShowPopup(false)}>
                  &times;
                </span>
                {editingId ? (
                  <form onSubmit={handleUpdate}>
                    <input
                      type="text"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      placeholder="Edit your username"
                      disabled
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                    <input
                      type="text"
                      value={editOrderId}
                      onChange={(e) => setEditOrderId(e.target.value)}
                      placeholder="Edit your order ID"
                    />
                    {errors.orderId && <p className="error">{errors.orderId}</p>}
                    <input
                      type="text"
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      placeholder="Edit your complaint"
                    />
                    <button type="submit" className="create-room">Update</button>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                    <input
                      type="text"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="Enter your order ID"
                    />
                    {errors.orderId && <p className="error">{errors.orderId}</p>}
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter your complaint"
                    />
                    <button type="submit" className="create-room">Submit</button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comm;