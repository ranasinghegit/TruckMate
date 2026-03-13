import React from 'react'

const Orderhistory = () => {
  return (
   
  <div className="order-history mt-4">
    <h4>Order History</h4>
    <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <span>{item.status}</span>
            <br />
            <small className="text-muted">{item.timestamp}</small>
          </div>
          <button className="btn btn-danger btn-sm" >
            <i className="pe-7s-trash"></i>
          </button>
        </li>
    </ul>
      <div className="mt-3">
        <button className="btn btn-secondary btn-sm" >
          Undo Delete
        </button>
      </div>
      </div>
  );
}

export default Orderhistory
