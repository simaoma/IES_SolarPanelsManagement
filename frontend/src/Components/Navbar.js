import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";
import "../Css/Navbar.css";
import { useContext } from "react";
import { UrlContext } from "../App";

const Navbar = () => {
  const { baseUrl } = useContext(UrlContext);
  const { isLoggedin, user, logout } = useAuth();

  useEffect(() => {
    console.log("Navbar - isLoggedin:", isLoggedin);
  }, [isLoggedin]);

  useEffect(() => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");

    if (hamburger) {
      const handleClick = () => {
        // Animate Links
        navLinks.classList.toggle("open");
        links.forEach(link => {
          link.classList.toggle("fade");
        });

        // Hamburger Animation
        hamburger.classList.toggle("toggle");
      };

      hamburger.addEventListener("click", handleClick);

      return () => {
        // Remove the event listener when the component unmounts
        hamburger.removeEventListener("click", handleClick);
      };
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault(); 
    logout(); 
    window.location.href = "/";
  };

  return (
    <div>
      <nav>
        <div className="logo">
            <span>SolarLink</span>
        </div>
        <div className="hamburger">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <ul className="nav-links">
          {isLoggedin ? (
            <>
              <li><Link to={`/addresses/${user.id}`}>Addresses</Link></li>
              <li><Link to={`/startup/${user.id}`}>Add address</Link></li>
              <li><button onClick={handleLogout} className="login-button">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="login-button">Login</Link></li>
              <li><Link to="/register" className="login-button2">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
