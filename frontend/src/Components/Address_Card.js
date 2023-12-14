import React from "react";
import solarpanelImage from '../Images/solarpanel-login.jpeg';
import { MDBCard, MDBCardImage, MDBContainer } from "mdb-react-ui-kit";
import '../Css/Address_Card.css';

const AddressCard = ({ sistema }) => {
  return (
    <MDBContainer className="address-card-container">
      <MDBCard className="card-address">
        <div className="parent-address">
          <div className="div1-address">
            <MDBCardImage src={solarpanelImage} alt="login form" className='div1-address rounded-start w-100'/>
          </div>
          <div className="div2-address">
            <h4>{sistema.morada}</h4>
          </div>
          <div className='div3-address'>
            <p>Potência: {sistema.potencia} kW</p>
            <p>Produced Energy: {sistema.producedEnergy} kWh</p>
            <p>Consumed Energy: {sistema.consumedEnergy} kWh</p>
          </div>
        </div>
      </MDBCard>
    </MDBContainer>
  );
};

export default AddressCard;
