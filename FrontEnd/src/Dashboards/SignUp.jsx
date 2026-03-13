import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function SignUp() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    nicNumber: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errors.name = "Name can only contain letters and spaces";
    }

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    // Mobile number validation
    if (!formData.mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = "Mobile number must be 10 digits";
    }

    // NIC number validation
    if (!formData.nicNumber) {
      errors.nicNumber = "NIC number is required";
    } else if (!/^[A-Za-z0-9]{9,12}$/.test(formData.nicNumber)) {
      errors.nicNumber = "NIC number is invalid";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    axios.post('http://localhost:5000/api/signup', formData)
      .then(response => {
        const userId = response.data.userId; // Assuming the server responds with the userId
        swal({
          title: "Success",
        text: "ADDED PERSONAL DETAILS",
          icon: "success",
          button: "OK",
        })
        navigate('/VehicleRegistration', { state: { userId } });

        setFormData({
          name: '',
          email: '',
          mobileNumber: '',
          nicNumber: '',
          password: ''
        });
      })
      .catch(error => {
        console.error('There was an error creating the account!', error);
      });
  };

  return (
    <div className="signup">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>
        <label>
          Mobile Number:
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
          {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
        </label>
        <label>
          NIC Number:
          <input
            type="text"
            name="nicNumber"
            value={formData.nicNumber}
            onChange={handleChange}
            required
          />
          {errors.nicNumber && <p className="error">{errors.nicNumber}</p>}
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
