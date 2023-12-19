import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React, { useState } from 'react';
import '../Css/Register.css';
import { useAuth } from '../Context/AuthContext';
import solarpanelImage from '../Images/solarpanel-login.jpeg';
import { useContext } from "react";
import { UrlContext } from "../App";

const Register = () => {
  const { baseUrl } = useContext(UrlContext);
  const { login } = useAuth();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstname,
          lastname,
          password
        })
      });

      if (response.ok) {
        // Registro bem-sucedido, agora faça o login automaticamente
        const userId = await login({ email, password });
        // Redirecione ou faça qualquer outra ação necessária após o login
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
    <MDBContainer className="register-container">
      <MDBCard className='card'>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src={solarpanelImage} alt="registerform" className='rounded-start w-100' style={{ height: '100%' }}/>
          </MDBCol>
          <MDBCol md='6' className='text-center d-flex align-items-center'>
            <MDBCardBody className='d-flex flex-column align-items-center' style={{marginLeft: '3em', marginRight: '3em' }}>
              {/* ... */}
              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Create your account</h5>
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' label='First Name' id='First name' type='text' size="lg" value={firstname} onChange={(e) => setFirstName(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Last Name' id='Last name' type='text' size="lg" value={lastname} onChange={(e) => setLastName(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Confirm password' id='confirmPassword' type='password' size="lg" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <MDBBtn type="submit" className="mb-4 px-5" color='warning' size='lg'>Register</MDBBtn>
              </form>
              {/* ... */}
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}
    
export default Register;
