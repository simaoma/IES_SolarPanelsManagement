import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';

import Address_Card from './Components/Address_Card';
import Addresses from './Components/Addresses';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Startup from './Components/Startup';
import Stats from './Components/Stats';
import { useAuth } from './Context/AuthContext'; // Import useAuth from your authentication context


function App() {
  return (
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
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;