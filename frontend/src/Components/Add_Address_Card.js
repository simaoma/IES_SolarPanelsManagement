import { MDBCard, MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import '../Css/Add_Address_Card.css';
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useContext } from "react";
import { UrlContext } from "../App";

const AddAddressCard = () => {
  const { baseUrl } = useContext(UrlContext);
  const { isLoggedin, user, logout } = useAuth();
  return (
    <MDBContainer className="add-address-card-container">
      <MDBCard className="add-card-address">
        <Link to={`/startup/${user.id}`}>
          <div className="add-parent-address">
            <h1 className="mais">+</h1>
          </div>
        </Link>
      </MDBCard>
    </MDBContainer>
  );
};

export default AddAddressCard;
