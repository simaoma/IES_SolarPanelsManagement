import { default as React, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";
import "../Css/Navbar.css";


const Navbar = () => {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const {logout} = useAuth();

  useEffect(() => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
        setIsLoggedIn(true);
    }

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

  return (
    <div>
      <nav>
        <div className="logo">
          <a href="/">
            <span>SolarLink</span>
          </a>
        </div>
        <div className="hamburger">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <ul className="nav-links">
          {isLoggedin ? (
            <>
              <li><Link to="/addresses">Addresses</Link></li>
              <li><button onClick={logout} className="login-button"><Link to="/">Logout</Link></button></li>
              <li><Link to="/stats">Stats</Link></li>
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
