import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function DriverList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (user_id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${user_id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <h1 style={h1Style}>Driver List</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>User ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>ID Number</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Mobile Number</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr 
                key={user.user_id}
                style={{ backgroundColor: user.user_id % 2 === 0 ? evenRowStyle.backgroundColor : 'transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverRowStyle.backgroundColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = user.user_id % 2 === 0 ? evenRowStyle.backgroundColor : 'transparent'}
              >
                <td style={thTdStyle}>{user.user_id}</td>
                <td style={thTdStyle}>{user.name}</td>
                <td style={thTdStyle}>{user.nic_number}</td>
                <td style={thTdStyle}>{user.email}</td>
                <td style={thTdStyle}>{user.mobile_number}</td>
                <td style={thTdStyle}>
                  <button
                    style={buttonStyle}
                    onClick={() => handleDelete(user.user_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const tableStyle = {
  width: '90%',
  borderCollapse: 'collapse',
  margin: '20px auto',
  fontSize: '16px',
  border: '1px solid #ddd',
};

const thTdStyle = {
  padding: '12px 15px',
  textAlign: 'center',
  border: '1px solid #ddd',
};

const thStyle = {
  ...thTdStyle,
  backgroundColor: '#8fd3f4',
};

const evenRowStyle = {
  backgroundColor: '#f9f9f9',
};

const hoverRowStyle = {
  backgroundColor: '#f1f1f1',
};

const h1Style = {
  textAlign: 'center',
  marginTop: '100px',
  color: 'black',
  padding: '20px',
  fontWeight: 'bold',
  backgroundImage: 'linear-gradient(120deg, #318FE7 0%, #318FE7 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
};

const buttonStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '10px 20px',
  margin: '10px',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  textDecoration: 'none',
};

export default DriverList;
