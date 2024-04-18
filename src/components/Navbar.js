import React, { useEffect } from "react";
import { NavLink, useLocation  } from "react-router-dom";

const Navbar = () => {
  let  location = useLocation();
  const handlelogout = ()=>{
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  useEffect(() =>{
    console.log(location);
  },[location]);
  return (
    <div>
      <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Navbar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={`nav-link ${location.pathname==='/'?"active" : "" }`} to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={`nav-link ${location.pathname==='/about'?"active" : "" }`} to="/about">
                  About
                </NavLink>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" role="search">

            <a className="btn btn-primary mx-2" href="/Login" role="button">Login</a>
            <a className="btn btn-primary mx-2" href="/Signup" role="button">SignUp</a>
            </form>: <button className="btn btn-primary" onClick={handlelogout}>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
