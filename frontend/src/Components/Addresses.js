import React, { useEffect, useState } from "react";
import AddressCard from "./Address_Card";
import AddAddressCard from "./Add_Address_Card";
import axios from "axios";
import { useParams } from "react-router-dom"; // Importe o hook useParams
import '../Css/Addresses.css';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { UrlContext } from "../App";

const Addresses = () => {
  const { baseUrl } = useContext(UrlContext);
  const { userId } = useParams(); // Obtenha o userId da URL
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/users/${userId}/sistemas`);

            if (response.headers.get("Content-Type").includes("application/json")) {
            const data = await response.json();
            setAddresses(data);
            } else {
            console.error("Did not receive JSON, check the server.");
            }
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      };
      
  
    fetchAddresses();
  }, [userId]);
  
  const additionalCard = {
    id: "additional-card",
    name: "New System",
    color: "yellow",
  };

  return (
    console.log(baseUrl),
    <div>
      <h2 style={{marginBottom: "5rem"}}> .</h2>
      <h2 className="all-systems-tittle" style={{marginTop: "5rem"}}> All your Systems</h2>
      <div className="addresses-container">
        {addresses.map((address) => (
          <AddressCard key={address.id} sistema={address} />
        ))}
        <AddAddressCard />
      </div>
    </div>
  );
};

export default Addresses;