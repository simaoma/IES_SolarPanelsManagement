import React, { useEffect } from "react";
import "../Css/Navbar.css";
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
  const { isLoggedin, logout } = useAuth();

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
              <li><a href="/">Gestão</a></li>
              <li><a href="/">Relatórios</a></li>
              <li><button onClick={logout} className="login-button">Logout</button></li>
            </>
          ) : (
            <>
              <li><a href="/login" className="login-button">Login</a></li>
              <li><a href="/register" className="login-button2">Register</a></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
