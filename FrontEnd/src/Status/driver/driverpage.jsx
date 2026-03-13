import { useState, useEffect } from 'react';
import './OrderStatusUpdateCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import '@fortawesome/fontawesome-free/css/all.min.css';  // Import FontAwesome CSS

const Status = ({ order_id }) => {
  const [step, setStep] = useState(1);
  const [statusUpdated, setStatusUpdated] = useState(false);
  const [orderHistoryVisible, setOrderHistoryVisible] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [hasDeletedHistory, setHasDeletedHistory] = useState(false);
  const [deletedHistory, setDeletedHistory] = useState(null);
  const [orderId, setOrderId] = useState('');
  const [pickedDate, setPickedDate] = useState('');

  useEffect(() => {
    fetchOrderDetails(order_id);
  }, [order_id]);

  const fetchOrderDetails = async (order_id) => {
    try {
      const response = await fetch(`/api/picked_orders/${order_id}`);
      const data = await response.json();
      if (data.success) {
        setOrderId(data.orderId);
        setPickedDate(data.pickedDate);
        setStep(data.step);
        setOrderHistory(data.orderHistory);
      } else {
        console.error('Failed to fetch order details:', data.error);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleUpdateStatusClick = () => {
    if (step === 1) {
      setStep(2);
      addToHistory('Processing Order');
    } else {
      setStep(1);
      addToHistory('Confirmed Order');
    }
  };

  const handleUpdateNextStepClick = () => {
    if (step < 5) {
      const newStep = step + 1;
      setStep(newStep);
      const stepTitle = getStepTitle(newStep);
      addToHistory(stepTitle);
      updateOrderStatusInBackend(orderId, stepTitle);
    }
  };

  const handleMakeOrderStatusClick = () => {
    setStatusUpdated(true);
    addToHistory('Confirmed Order');
  };

  const handleViewOrderHistoryClick = () => {
    setOrderHistoryVisible(!orderHistoryVisible);
  };

  const handleDeleteStatus = (status) => {
    const newHistory = orderHistory.filter(item => item.status !== status);
    setDeletedHistory(orderHistory.find(item => item.status === status));
    setOrderHistory(newHistory);
    setHasDeletedHistory(true);
    // Optionally, update backend to reflect deleted status
  };

  const handleUndoDelete = () => {
    if (deletedHistory) {
      setOrderHistory([...orderHistory, deletedHistory]);
      setDeletedHistory(null);
      setHasDeletedHistory(false);
    }
  };

  const addToHistory = (status) => {
    setOrderHistory([...orderHistory, { status, timestamp: new Date().toLocaleString() }]);
  };

  const getStepTitle = (step) => {
    switch (step) {
      case 1:
        return 'Confirmed Order';
      case 2:
        return 'Processing Order';
      case 3:
        return 'On the Way';
      case 4:
        return 'Product Dispatched';
      case 5:
        return 'Product Delivered';
      default:
        return '';
    }
  };

  const updateOrderStatusInBackend = async (orderId, status) => {
    try {
      await fetch('/api/update-order-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderId, status })
      });
    } catch (error) {
      console.error('Error updating order status in backend:', error);
    }
  };

  return (
    <div className="main_container">
      <Header />
      <div className="container padding-bottom-3x mb-1">
        <div className="card mb-3">
          <div className="p-4 text-center text-white text-lg bg-dark rounded-top">
            <span className="text-uppercase" style={{ fontSize: '28px', fontWeight: 'bold' }}>Your Picked Order</span>
            <hr />
            <br />
            <div style={{ textAlign: 'left', fontSize: '20px' }}>
              <span className="text-medium1">Order ID - </span>
              <span className="orderId">{orderId}</span>
            </div>
            <div className="w-100 py-1 px-2 white-text" style={{ textAlign: 'left' }}>
              <span className="text-medium">Picked date:</span> {pickedDate}
              <div className="d-flex justify-content-end w-100 py-1 px-2 white-text">
                <button className="btn btn-primary ml-auto" onClick={handleMakeOrderStatusClick}>
                  Make Order Status
                </button>
              </div>
            </div>
          </div>
          {statusUpdated && (
            <>
              <div className="card-body">
                <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                  <div className={`step ${step > 0 ? 'completed text-primary' : ''}`}>
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className="pe-7s-cart"></i>
                      </div>
                    </div>
                    <h4 className="step-title">Confirmed Order</h4>
                  </div>
                  <div className={`step ${step > 1 ? 'completed text-primary' : ''}`}>
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className="pe-7s-config"></i>
                      </div>
                    </div>
                    <h4 className="step-title">Processing Order</h4>
                  </div>
                  <div className={`step ${step > 2 ? 'completed text-primary' : ''}`}>
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className="fas fa-truck"></i>
                      </div>
                    </div>
                    <h4 className="step-title">On the Way</h4>
                  </div>
                  <div className={`step ${step > 3 ? 'completed text-primary' : ''}`}>
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className="pe-7s-car"></i>
                      </div>
                    </div>
                    <h4 className="step-title">Product Dispatched</h4>
                  </div>
                  <div className={`step ${step > 4 ? 'completed text-primary' : ''}`}>
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className="pe-7s-home"></i>
                      </div>
                    </div>
                    <h4 className="step-title">Product Delivered</h4>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center custom-buttons">
                <div className="mr-3">
                  <button className="btn btn-primary" onClick={handleUpdateStatusClick} style={{ marginLeft: '10px' }}>
                    {step === 1 ? 'Update Status' : 'Cancel Update'}
                  </button>
                  {step > 1 && step < 5 && (
                    <button className="btn btn-secondary ml-2" onClick={handleUpdateNextStepClick} style={{ marginLeft: '10px' }}>
                      Update Next Step
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="text-left text-sm-right">
          <button className="btn btn-outline-primary btn-rounded btn-sm" onClick={handleViewOrderHistoryClick}>
            View Order History
          </button>
        </div>
        {orderHistoryVisible && (
          <div className="order-history mt-4">
            <h4>Order History</h4>
            <ul className="list-group">
              {orderHistory.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <span>{item.status}</span>
                    <br />
                    <small className="text-muted">{item.timestamp}</small>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteStatus(item.status)}>
                    <i className="pe-7s-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;
