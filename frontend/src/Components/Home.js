import React from "react";
import "../Css/Home.css";
import {
  MDBIcon,
}
from 'mdb-react-ui-kit';

const Home = () => {

  return (
    <div className="home">
        <div className="welcome-text">
          <div className='d-flex flex-row mt-2' style={{display: "flex", justifyContent: "center", marginBottom: "5em"}}>
            <h1><MDBIcon fas icon="sun" style={{ color: '#f2af13' }}/> SolarLink</h1>
          </div>
          
          <div className="button-container">
            <button className="custom-button" onClick={() => window.location.href = '/'}>See My Stats</button>
          </div>
        </div>
    </div>
  );
};

export default Home;