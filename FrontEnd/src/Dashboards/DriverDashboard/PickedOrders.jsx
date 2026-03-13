import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Status from '../../Status/driver/driverpage'; // Import Status component

const PickedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null); // State to store selected order ID
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios.get('http://localhost:5000/api/pickedOrders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching picked orders:', error);
      });
  }, []);

  const markAsDelivered = (orderId) => {
    axios.put(`http://localhost:5000/api/moveToHistory/${orderId}`)
      .then(response => {
        console.log('Order moved to order_history:', response.data);
        // Remove the order from the state to reflect the change in UI
        setOrders(orders.filter(order => order.order_id !== orderId));
      })
      .catch(error => {
        console.error('Error moving order to order_history:', error);
      });
  };

  const navigateLocations = (orderId, pickedDate) => {
    setSelectedOrderId(orderId); // Set selected order ID
    navigate('/driver'); // Navigate to Status page
  };

  return (
    <div>
      <h2>Picked Orders</h2>
      {orders.map(order => (
        <div className="order-card" key={order.id}>
          <h3>Order ID: {order.id}</h3>
          <p>Pickup: {order.pickup}</p>
          <p>Delivery: {order.delivery}</p>
          <p>ETA: {order.eta}</p>
          <button onClick={() => markAsDelivered(order.order_id)}>Mark as Delivered</button>
          <button onClick={() => navigateLocations(order.id, order.pickedDate)}>Update Locations</button>
        </div>
      ))}
      {selectedOrderId && <Status orderId={selectedOrderId} pickedDate={orders.find(order => order.id === selectedOrderId).pickedDate} />}
    </div>
  );
};

export default PickedOrders;
