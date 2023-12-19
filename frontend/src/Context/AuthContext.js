// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UrlContext } from "../App";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { baseUrl } = useContext(UrlContext);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    const fetchUserById = async (userId) => {
      try {
        const response = await fetch(`${baseUrl}/api/users/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      if (parsedUser && parsedUser.id) { // Check if parsedUser and parsedUser.id exist
        const { id } = parsedUser;
        setIsLoggedin(true);
        setUser(parsedUser);
        fetchUserById(id); // Fetch additional user data based on ID
      }
    } 

  }, []);

const login = async (loginData) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const userData = await response.json();
      console.log('userData:', userData); // Adiciona este log para verificar o que `userData` contém

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userId', userData.id);
      setIsLoggedin(true);
      setUser(userData);

      const sistemas = userData.sistemas;
      return [userData.id, sistemas];
    } else {
      console.error('Login failed. Status:', response.status);
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Propaga o erro para a função chamadora (handleSubmit)
  }
};


  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedin(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
