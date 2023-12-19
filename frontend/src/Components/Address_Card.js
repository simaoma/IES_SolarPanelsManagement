import { MDBCard, MDBCardImage, MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import '../Css/Address_Card.css';
import solarpanelImage from '../Images/solarpanel-login.jpeg';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UrlContext } from "../App";

const AddressCard = ({ sistema }) => {
  const { baseUrl } = useContext(UrlContext);
  return (
      <MDBCard className="card-address">
      <Link to={`/stats/${sistema.id}`}>
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
      </Link>
      </MDBCard>
  );
};

export default AddressCard;
