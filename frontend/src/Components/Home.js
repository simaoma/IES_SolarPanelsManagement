import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Home = () => {
  const navigate = useNavigate();  // useNavigate for react-router-dom version 6
  const { isLoggedin } = useAuth();

  useEffect(() => {
    // Use the navigate function to redirect based on login status
    if (isLoggedin) {
      navigate('/stats');
    } else {
      navigate('/login');
    }
  }, [isLoggedin, navigate]);

  // Render an empty div, or you can customize this to show loading content
  return <div></div>;
};

export default Home;