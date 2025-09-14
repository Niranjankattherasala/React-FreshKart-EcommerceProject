import React from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function Orders() {
  const orders = useSelector((state) => state.orders);

  return (
  <div className="orders-page container mt-5 pt-5 d-flex flex-column align-items-center">
  <h1 className="orders-title mb-4 text-center">🧾 Orders History</h1>

  {orders.length === 0 ? (
    <p className="text-muted text-center">No orders placed</p>
  ) : (
    <div className="orders-list w-100 d-flex flex-column align-items-center">
      {orders.map((purchase, index) => (
        <div
          key={index}
          className="card mb-4 shadow-sm p-3"
          style={{
            width: "60%",
            borderLeft: "6px solid #007bff",
            background: "#f9faff",
            transition: "all 0.2s ease-in-out",
          }}
          // Optional: subtle hover effect
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)"}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)"}
        >
          {/* Bill Header */}
          <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
            <div className="fw-bold fs-5 text-primary">Order #{index + 1}</div>
            <div className="text-muted">📅 {purchase.date}</div>
          </div>

          {/* Items Table */}
          <div className="order-items mb-3">
            {purchase.items.map((item, idx) => (
              <div
                key={idx}
                className="d-flex justify-content-between align-items-center mb-2"
                style={{ borderBottom: "1px dashed #ddd", paddingBottom: "5px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "contain",
                      borderRadius: "6px",
                      marginRight: "10px",
                      border: "1px solid #ddd",
                      padding: "2px",
                      background: "#fff"
                    }}
                  />
                  <div>
                    <div className="fw-medium">{item.productName}</div>
                    <div className="text-muted small">
                      ₹{item.productPrice} × {item.quantity}
                    </div>
                  </div>
                </div>
                <div className="fw-bold">₹{(item.productPrice * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Discounts & Coupon */}
          <div className="mb-2 d-flex justify-content-between">
            {purchase.discount > 0 && (
              <span className="badge bg-warning text-dark">Discount: {purchase.discount}%</span>
            )}
            {purchase.couponDiscount > 0 && (
              <span className="badge bg-success">Coupon: ₹{purchase.couponDiscount.toFixed(2)}</span>
            )}
          </div>

          {/* Bill Footer */}
          <div className="d-flex justify-content-between border-top pt-2 mt-2">
            <div className="fw-bold">Total:</div>
            <div className="fw-bold text-success fs-5">
              ₹{purchase.totalPrice.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>



  );
}

export default Orders;
