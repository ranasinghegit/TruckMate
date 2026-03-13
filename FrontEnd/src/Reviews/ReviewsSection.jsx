import React, { useState, useEffect } from 'react';
import './ReviewsSection.css';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from '../components/Header';

const App = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const response = await axios.get('http://localhost:5000/reviews');
    setReviews(response.data);
  };

  const addReview = async ({ username, rating }) => {
    const response = await axios.post('http://localhost:5000/reviews', { username, rating });
    setReviews([...reviews, response.data]);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    rating: Yup.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5').required('Rating is required'),
  });

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? '★' : '☆');
    }
    return stars.join('');
  };

  return (
    <center>
      <Header />
      <div className="containerqq">
        <h1 className="title">Reviews</h1>
        <p className="subtitle">Reviews and automatic average calculation.</p>
        <p className="subtitle">Editing, data export and anonymous reviews.</p>
        <div className="reviewsContainer">
          <div className="averageRating">
            {reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : 0} ★
          </div>
          <ul className="reviewList">
            {reviews.map((review) => (
              <li key={review.id} className="review">
                <div className="avatar" />
                <div className="reviewDetails">
                  <div className="username">{review.username}</div>
                  <div className="ratingStars">{renderStars(review.rating)}</div>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </li>
            ))}
          </ul>
          <Formik
            initialValues={{ username: '', rating: 0 }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              addReview(values);
              resetForm();
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="text" name="username" placeholder="Username" />
                <ErrorMessage name="username" component="div" className="error" />

                <Field type="number" name="rating" placeholder="Rating" min="1" max="5" />
                <ErrorMessage name="rating" component="div" className="error" />

                <button type="submit" className="addReviewButton" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding Review...' : '+ Add Review'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </center>
  );
};

export default App;
