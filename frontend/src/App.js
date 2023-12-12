import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';

import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Stats from './Components/Stats';
import Startup from './Components/Startup';
import Addresses from './Components/Addresses';
import Address_Card from './Components/Address_Card';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/startup" element={<Startup />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/address_card" element={<Address_Card />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;