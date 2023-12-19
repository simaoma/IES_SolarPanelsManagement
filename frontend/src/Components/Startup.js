import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Css/Startup.css';
import { useContext } from "react";
import { UrlContext } from "../App";

const Startup = () => {
  const { baseUrl } = useContext(UrlContext);
  const { userId } = useParams();
  const [morada, setAddress] = useState('');
  const [potencia, setPower] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(userId);
      const response = await fetch(`${baseUrl}/api/users/${userId}/new_sistema`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          morada,
          potencia
        })
      });

      if (response.ok) {
        // Redirecionar para a página de addresses após adicionar um novo sistema
        window.location.href = `/`;
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      setError('Registration failed');
      console.error('Error registering:', error);
    }
  };
  
  return (
    <MDBContainer className="startup-container">
      <MDBCard className='card-startup'>
        <MDBRow className='g-0'>
          <MDBCol md='12' className='text-center d-flex align-items-center'>
            <MDBCardBody className='d-flex flex-column align-items-center' style={{marginLeft: '3em', marginRight: '3em' }}>
              <div className='d-flex flex-row mt-2' style={{marginBottom: '2em'}}>
                  <MDBIcon fas icon="sun fa-3x me-3" style={{ color: '#f2af13' }}/>
                  <span className="h1 fw-bold mb-0">SolarLink</span>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Add your Solar System</h5>
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' label='Address' id='Address' type='text' size="lg" value={morada} onChange={(e) => setAddress(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Power' id='Power' type='text' size="lg" value={potencia} onChange={(e) => setPower(e.target.value)}/>
                <MDBBtn type="submit" className="mb-4 px-5" color='warning' size='lg'>Add</MDBBtn>
              </form>
              {/* ... */}
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}
    
export default Startup;
