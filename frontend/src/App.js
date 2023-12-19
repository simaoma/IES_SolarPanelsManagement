import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import React, { createContext, useState } from "react";

import Address_Card from './Components/Address_Card';
import Addresses from './Components/Addresses';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Startup from './Components/Startup';
import Stats from './Components/Stats';
import AddAlarm from './Components/Add_Alarm';
import { useAuth } from './Context/AuthContext';

export const UrlContext = createContext();

function App() {
  const [baseUrl, setBaseUrl] = useState('http://deti-ies-06.ua.pt:5001');

  return (
    <UrlContext.Provider value={{ baseUrl }}>
      <Router>
        <AuthProvider>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/stats/:sistemaId" element={<Stats />} />
            <Route path="/startup/:userId" component={<Startup />} element={<Startup />} />
            <Route path="/addresses/:userId" element={<Addresses />} />
            <Route path="/address_card" element={<Address_Card />} />
            <Route path="/addalarm/:sistemaId" component={<AddAlarm />} element={<AddAlarm />} />
          </Routes>
        </AuthProvider>
      </Router>
    </UrlContext.Provider>
  );
}

export default App;