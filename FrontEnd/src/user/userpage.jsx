import { useState, useEffect } from 'react';
import './userpage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';


function UserPage() {
    const [orderId] = useState(1504);
    const [status, setStatus] = useState('');
    const [statusHistory, setStatusHistory] = useState([]);

    const handleCreateStatus = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/status', { orderId, status });
            console.log('Status created:', response.data);
            fetchStatusHistory();
        } catch (error) {
            console.error('Error creating status:', error);
        }
    };

    const handleUpdateStatus = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/status/${id}`, { status });
            console.log('Status updated:', response.data);
            fetchStatusHistory();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const fetchStatusHistory = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/status/${orderId}`);
            setStatusHistory(response.data);
        } catch (error) {
            console.error('Error fetching status history:', error);
        }
    };

    useEffect(() => {
        fetchStatusHistory();
        axios.get(`http://localhost:5000/api/status/${orderId}`) // Adjust the API endpoint as per your backend setup
      .then(response => {
        orderId(response.data.orderId); // Assuming response.data contains orderId
      })
      .catch(error => {
        console.error('Error fetching orderId:', error);
      });
    }, );

    return (
    
        <div className="main_container">
                       <Header/>

            <div className="container padding-bottom-3x mb-1">
          
                <div className="card mb-3">
                    <div className="p-4 text-center text-white text-lg bg-dark rounded-top">
                        <span className="text-uppercase">Tracking Order No - </span>
                        <span className="text-medium">{orderId}</span>
                        <span className="text-uppercase"> Picked date - </span>
                        <span className="text-medium">16/07/2024</span>
                    </div>
                    <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
                        <div className="w-100 text-center py-1 px-2">
                            <span className="text-medium">Shipped Via:</span> Truck Mate
                        </div>
                        <div className="w-100 text-center py-1 px-2">
                            <span className="text-medium">Status:</span>
                            <span className="text-medium-status">Delivered</span>
                        </div>
                        <div className="w-100 text-center py-1 px-2">
                            <span className="text-medium">Expected Date:</span> 22/07/2024
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                            <div className="step completed">
                                <div className="step-icon-wrap">
                                    <div className="step-icon">
                                        <i className="pe-7s-cart"></i>
                                    </div>
                                </div>
                                <h4 className="step-title">Confirmed Order</h4>
                            </div>
                            <div className="step completed">
                                <div className="step-icon-wrap">
                                    <div className="step-icon">
                                        <i className="pe-7s-config"></i>
                                    </div>
                                </div>
                                <h4 className="step-title">Processing Order</h4>
                            </div>
                            <div className="step completed">
                                <div className="step-icon-wrap">
                                    <div className="step-icon">
                                        <i className="fas fa-truck"></i> {/* FontAwesome Icon */}
                                    </div>
                                </div>
                                <h4 className="step-title">On the Way</h4> {/* Updated Step */}
                            </div>
                            <div className="step completed">
                                <div className="step-icon-wrap">
                                    <div className="step-icon">
                                        <i className="pe-7s-car"></i>
                                    </div>
                                </div>
                                <h4 className="step-title">Product Dispatched</h4>
                            </div>
                            <div className="step completed">
                                <div className="step-icon-wrap">
                                    <div className="step-icon">
                                        <i className="pe-7s-home"></i>
                                    </div>
                                </div>
                                <h4 className="step-title">Product Delivered</h4>
                            </div>
                        </div>    <Link to="/reviews">
            <button className="rebt">
                Add review
            </button>
        </Link>
                    </div>
                </div>
                <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
                    <div className="mr-3">
                    
                    </div>
                </div>
                <hr/>
                {/* <Link to="/reviews">
            <button className="btn btn-outline-primary btn-rounded btn-sm">
                Add review
            </button>
        </Link> */}
            </div>
        </div>
    );
}

export default UserPage;
