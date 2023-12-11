import React, { useEffect, useState } from "react";
import '../Css/Address_Card.css';
import solarpanelImage from '../Images/solarpanel-login.jpeg';
import { 
    MDBCard,
    MDBCardImage,
    MDBCol,
    MDBRow,
    MDBContainer
} from "mdb-react-ui-kit";

const Address_Cards = ({ item }) => {

    useEffect(() => {
    }, [item]);

    return (
        <MDBContainer className="address-card-container">
            <MDBCard className="parent-address card-address">
                <div className="div1-address">
                    <MDBCardImage src={solarpanelImage} alt="login form" className='div1-address rounded-start w-100'/>
                </div>
                <div className="div2-address">
                    <h4>Nome: Casa do Luis</h4>
                </div>
                <div className='div3-address'>
                    <p>Classificação: Residencial</p>
                    <p>Capacidade FV: 2.10 kW</p>
                    <p>Endereço: Rua da alegria 120, 3800-025</p>
                </div>
            </MDBCard>
        </MDBContainer>
    );
};

export default Address_Cards;