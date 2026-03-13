import React, { useState } from 'react';
import './Interface1.css';
import axios from 'axios';
import Header from '../components/Header';

const Interface1 = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    name1: '',
    address1: '',
    contact1: '',
    description: '',
    category: '',
    package_size: '',
    weight: '',
    package: '',
    pickup: '',
    delivery: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    const letterRegex = /^[A-Za-z]*$/;
    const numberRegex = /^[0-9]{0,10}$/;

    if ((name === 'name' || name === 'name1') && !letterRegex.test(value)) {
      return;
    }

    if ((name === 'contact' || name === 'contact1') && !numberRegex.test(value)) {
      return;
    }

    if ((name === 'pickup' || name === 'delivery') && new Date(value) < new Date()) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/submitorder', formData);
      setResponseMessage(response.data);
      window.location.href = '/Interface2'; 
    } catch (error) {
      console.log('Error submitting form:', error); // Log the error for debugging
      setResponseMessage('Error submitting form');
    }
  };

  return (
    <div>
    <Header/>

    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h3 style={{marginBottom:'40px'}}>Customer Details</h3>
          <label style={{marginBottom:'40px'}} htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label style={{marginBottom:'40px'}} htmlFor="address">
            Address
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label style={{marginBottom:'40px'}} htmlFor="contact">
            Contact
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <h3 style={{marginBottom:'40px'}}>Supplier Details</h3>
          <label style={{marginBottom:'40px'}} htmlFor="name1">
            Name
            <input
              type="text"
              id="name1"
              name="name1"
              value={formData.name1}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label style={{marginBottom:'40px'}} htmlFor="address1">
            Address
            <input
              type="text"
              id="address1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label style={{marginBottom:'40px'}} htmlFor="contact1">
            Contact
            <input
              type="tel"
              id="contact1"
              name="contact1"
              value={formData.contact1}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <h3 style={{marginBottom:'40px'}}>Package Details</h3>
          <label style={{marginBottom:'50px'}} htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label style={{marginBottom:'40px'}} htmlFor="dropdown">
            Category
            <select
              id="dropdown"
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
          </label>
        </div>

        <div className="form-group">
          <label style={{marginBottom:'40px'}} htmlFor="package_size">
            Package Size
            <input
              type="text"
              id="package_size"
              name="package_size"
              placeholder="Enter in square feet"
              value={formData.package_size}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label style={{marginBottom:'40px'}} htmlFor="weight">
            Weight
            <input
              type="text"
              id="weight"
              name="weight"
              placeholder="Enter in Kg"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </label>
        </div>   

        <div style={{display:'flex'}} className="radiobtn">
          <div>
            <label style={{marginBottom:'40px', marginRight:'80px'}}>
              <input
                type="radio"
                name="package"
                value="package"
                checked={formData.package === 'package'}
                onChange={handleChange}
              /> Package
            </label>
          </div>
          <div>
            <label style={{marginBottom:'40px'}}>
              <input
                type="radio"
                name="package"
                value="unpackage"
                checked={formData.package === 'unpackage'}
                onChange={handleChange}
              /> Unpackage
            </label>
          </div>
        </div>

        <div className="form-group">
          <label style={{marginBottom:'40px'}} htmlFor="pickup">
            Pickup:
            <input
              type="datetime-local"
              id="pickup"
              name="pickup"
              value={formData.pickup}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label style={{marginBottom:'40px'}} htmlFor="delivery">
            Delivery:
            <input
              type="datetime-local"
              id="delivery"
              name="delivery"
              value={formData.delivery}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <button className="button2" type="submit">Confirm Order</button>
        </div>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
    </div>
  );
};

export default Interface1;