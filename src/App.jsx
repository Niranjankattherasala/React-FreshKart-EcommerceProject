// src/App.jsx
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Home from "./Home";
import Veg from "./Veg";
import Drinks from "./Drinks";
import Chocolate from "./Chocolate";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import Orders from "./Orders";
import Nonveg from "./Nonveg";
import PageNotFound from "./PageNotFound";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Logo from "./Logo";
import Login from "./Login";
import SignUp from "./SignUp";
import { logoutUser } from "./store";

function App() {
  
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const { isAuthenticated, currentUser } = useSelector(
    (state) => state.registerUser
  );

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

     
        {/* Navbar */}
       
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top navbar-gradient nav">
          <div className="container-fluid flex-column">

            {/* Row 1: Navbar Links */}
            <div className="navbar-nav d-flex flex-row gap-2 p-4">
              <Link to="/" className="btn nav-link">🏠 Home</Link>
              <Link to="/Veg" className="btn nav-link">🥕 Veg</Link>              <Link to="/Nonveg" className="btn nav-link">🍗 NonVeg</Link>
              <Link to="/Drinks" className="btn nav-link">🍹 Drinks</Link>
              <Link to="/Chocolates" className="btn nav-link">🍫 Chocolates</Link>
              <Link to="/Orders" className="btn nav-link">🧾 Orders</Link>
              <Link to="/AboutUs" className="btn nav-link">ℹ️ AboutUs</Link>

              <div className="cart-login-contact  d-flex align-items-center gap-3 ">
                <Link to="/Contactus" className="position-relative fs-3 text-bold">
                  <i className="fa-solid fa-phone text-warning ps-5"></i>
                </Link>

                <Link to="/Cart" className="position-relative fs-0">
                  <i className="bi bi-cart fs-2"></i>
                 <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                    </span>
                </Link>

                {isAuthenticated ? (
                  <>
                    <span className="text"></span>
                    <button onClick={handleLogout} className="btn btn-danger btn-sm">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/Login" className="text-warning fs-5">Login</Link>
                )}

                <Link to="/SignUp" className="text-success fs-5 ps-1">SignUp</Link>
              </div>
            </div>

            {/* Row 2: Logo + Search */}
            <div className="d-flex justify-content-center align-items-center w-100 pb-2 gap-3">
              <Link to="/" className="d-flex align-items-center text-decoration-none">
                <Logo/>
              </Link>
              <div className="w-25">
                <SearchBar />
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <div className="main" style={{ paddingTop: "0px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Veg" element={<Veg />} />
            <Route path="/Nonveg" element={<Nonveg />} />
            <Route path="/Drinks" element={<Drinks />} />
            <Route path="/Chocolates" element={<Chocolate />} />
            <Route path="/Contactus" element={<ContactUs />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </div>
     
    </>
  );
}

export default App;
