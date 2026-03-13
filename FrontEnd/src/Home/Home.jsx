import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [searchId, setSearchId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchResult, setSearchResult] = useState(null); // State for search results

  const handleSearch = async () => {
    if (!searchId) {
      setErrorMessage('Please enter an Order ID');
      setSearchResult(null);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/order_history/${searchId}`);
      setSearchResult(response.data);
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Order not found');
      } else {
        setErrorMessage('Error fetching order details');
      }
      setSearchResult(null);
    }
  };

  return (
    <div className="homepage">
      <Header />
      <main>
        <section className="hero">
          <div>
            <p>Pick Up Your Package With Trusted partner</p>
            <h1>Reserve Your Delivery </h1>
            <h1 className='h11'>Fast and Secure</h1>
            <p>Enter postcode to see what happen your deliver</p>
            <br />
            <div className="subscription-inputt">
              <input
                className='pls'
                type="text"
                placeholder="eg:1234"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <Link to = "/Userpage" className='serbutt' onClick={handleSearch}>Search</Link>
            </div>
            <a href="/complaintss">
              <img src="compl.png" className='compl' alt="Complaints" />
            </a>
          </div>
          <div>
            <img className='manimg' src='./manman.png' alt="Delivery Man" />
          </div>
        </section>

        
        {/* Error Message Display */}
        {errorMessage && (
          <section className="error-message">
            <p>{errorMessage}</p>
          </section>
        )}

        {/* Other sections */}
        <section className='popcato'>
          {/* Remaining sections */}
        </section>

        <div>
          <img className='homepart2' src="homepart2.png" alt="" />
        </div>

        <div>
          <img className='homepart2' src="homepart3.png" alt="" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
