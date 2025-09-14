import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, addOrders, clearCart } from './store';
import { buttonDiscountCalculation, totalBillCalculation, getCouponDiscount } from './discountUtils';
import emailjs from "@emailjs/browser";
import './App.css'; // Import the polished CSS
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import { orderConfirmedAlert } from "./animation";
import { useNavigate } from 'react-router-dom';

function Cart() {
//  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const [buttonDiscountPercentage, setButtonDiscountPercentage] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState({
    isValidCoupon: false,
    couponDiscountPercentage: 0,
    couponDiscountAmount: 0
  });
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("qr"); // default: qr
  const [isProcessing, setIsProcessing] = useState(false); // loading state

  let totalAmount = totalBillCalculation(cartItems);
  let discountAmount = buttonDiscountCalculation(totalAmount, buttonDiscountPercentage);
  let finalAmount = totalAmount - discountAmount - couponResult.couponDiscountAmount;

  const handleApplyCoupon = () => {
    const result = getCouponDiscount(couponCode, totalAmount);
    setCouponResult(result);

    if (result.isValidCoupon) {
      toast.success(`Coupon Applied! You saved ₹${result.couponDiscountAmount}`);
    } else {
      toast.error("Invalid Coupon Code ❌");
    }
  };

  const templateParams = {
    order_id: Date.now(),
    orders: cartItems.map(item => ({
      name: item.productName,
      price: (item.productPrice * item.quantity).toFixed(2),
      units: item.quantity
    })),
    cost: {
      shipping: 50,
      total: finalAmount.toFixed(2)
    },
    email: customerEmail
  };

  const handleCompleteDetails = () => {
    const purchaseDetails = {
      date: new Date().toLocaleString(),
      items: [...cartItems],
      totalPrice: finalAmount
    };
    dispatch(addOrders(purchaseDetails));
    dispatch(clearCart());
  };

  const handleCheckout = () => {
 
  if (!customerEmail) {
    Swal.fire({
      icon: "warning",
      title: "Email Required",
      text: "Please enter your email before confirming the order",
    });
    return;
  }

  setIsProcessing(true); // start loading

  emailjs
    .send(
      "service_dmuixzl",      // service ID
      "template_xwhbv09",     // template ID
      templateParams,
      "dse7d7B-uT-BjH-sd"     // public key
    )
    .then(() => {
      handleCompleteDetails();
      orderConfirmedAlert(customerEmail);
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Email confirmation could not be sent ❌",
      });
    })
    .finally(() => setIsProcessing(false)); // stop loading
};

  return (
    <div className="cart-page container mt-5 p-5">
      <div className="row">

        {/* Left Side: 60% */}
        <div className="col-lg-7 col-md-12 mb-4">
          <h2 className='text-info'>🛒 Cart</h2>
          {cartItems.length === 0 ? (
            <p className='fw-bold'>Your cart is empty</p>
          ) : (
            <div className="row g-2" style={{ maxHeight: "70vh", overflowY: "auto" }}>
              {cartItems.map(item => (
                <div key={item.productId} className="col-12 mb-3">
                  <div
                    className="d-flex align-items-center p-3"
                    style={{ borderBottom: "1px solid #ccc", gap: "15px" }}
                  >

                    {/* Image */}
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "contain",
                        flexShrink: 0,
                        borderRadius: "8px"
                      }}
                    />

                    {/* Details */}
                    <div className="flex-grow-1 d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="mb-2">{item.productName}</h5>
                        <p className="mb-2 fw-bold">₹{(item.productPrice * item.quantity).toFixed(2)}</p>
                      </div>

                      {/* Quantity & Remove */}
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => dispatch(increaseQuantity(item))}
                        >+</button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => dispatch(decreaseQuantity(item))}
                        >-</button>
                        <button
                          className="btn btn-sm btn-danger ms-auto"
                          onClick={() => {
                            dispatch(removeFromCart(item));
                            toast.error(`${item.productName} removed from cart`);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: 40% */}
        <div className="col-lg-5 col-md-12 position-sticky" style={{ top: "20px" }}>
          <div className="discount-panel p-3 border rounded shadow-sm">
            <h4 className="fw-bold text-primary mb-3">
              Total Amount: ₹{totalAmount.toFixed(2)}
            </h4>

            {discountApplied && (
              <h5 className="text-success fw-bold">
                Discount Applied: {buttonDiscountPercentage}%
              </h5>
            )}

            {couponResult.isValidCoupon && (
              <h5 className="text-success fw-bold">
                Coupon Applied: {couponResult.couponDiscountPercentage}%
              </h5>
            )}

            <h4 className="mt-3 fw-bold text-primary mb-3">
              Final Amount: ₹{finalAmount.toFixed(2)}
            </h4>

            {/* Discount Buttons */}
            <div className="d-flex gap-2 mt-3 flex-wrap">
              <button
                className="btn btn-success"
                onClick={() => (setButtonDiscountPercentage(10), setDiscountApplied(true))}
              ><i className="bi bi-tag-fill" title="Offer Tag"></i> 10%</button>

              <button
                className="btn btn-success"
                onClick={() => (setButtonDiscountPercentage(20), setDiscountApplied(true))}
              ><i className="bi bi-tag-fill pe-1 pt-2" title="Offer Tag"></i> 20%</button>

              <button
                className="btn btn-success"
                onClick={() => (setButtonDiscountPercentage(30), setDiscountApplied(true))}
              ><i className="bi bi-gift-fill pe-2" title="Special Offer"></i> 30%</button>

              <button
                className="btn btn-danger"
                onClick={() => (setButtonDiscountPercentage(0), setDiscountApplied(false))}
              >
                Reset
              </button>
            </div>

            {/* Coupon Input */}
            <div className="mt-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control rounded-start"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{ borderRight: "0", boxShadow: "none", outline: "none" }}
                />
                <button
                  className="btn btn-primary rounded-end"
                  type="button"
                  onClick={handleApplyCoupon}
                  style={{ boxShadow: "none", outline: "none" }}
                >
                  <i className="bi bi-ticket-perforated" title="Coupon"></i> Apply Coupon
                </button>
              </div>
            </div>

            {/* Payment Method Section */}
            {paymentMethod === "qr" && (
              <div className="text-center mb-3">
                <label className="checkout-label text-dark fw-normal mb-2">
                  Enter your Gmail before scanning QR:
                </label>
                <input
                  type="email"
                  className="form-control mb-3 no-focus"
                  placeholder="example@gmail.com"
                  value={customerEmail}
                  style={{ outline: "none", boxShadow: "none" }}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />

                <h4 className="mb-3">Scan QR to Pay ₹{finalAmount.toFixed(2)}</h4>
                <QRCode
                  value={`upi:pay?pa=7569898474@ybl&pn=NiranjanStore&am=${finalAmount.toFixed(
                    2
                  )}&cu=INR`}
                  size={200}
                />

                <button
                  className="btn btn-success mt-3 w-100"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </span>
                  ) : (
                    "✅ I Have Completed Payment"
                  )}
                </button>
              </div>
            )}

            {/* Checkout Section for Non-QR methods */}
            {paymentMethod !== "qr" && (
              <div className="checkout-box mt-3 p-3 border rounded shadow-sm">
                <label className="checkout-label text-dark fw-normal mb-2">
                  Enter your Gmail to receive order confirmation:
                </label>

                <input
                  type="email"
                  className="form-control mb-3 no-focus"
                  placeholder="example@gmail.com"
                  value={customerEmail}
                  style={{ outline: "none", boxShadow: "none" }}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />

                <button
                  type="button"
                  className="btn btn-secondary w-100 mb-2 no-focus"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </span>
                  ) : (
                    "Confirm Order"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;
