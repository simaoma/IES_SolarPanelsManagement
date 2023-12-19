import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useAuth } from '../Context/AuthContext';
import '../Css/Login.css';
import solarpanelImage from '../Images/solarpanel-login.jpeg';
import { useContext } from "react";
import { UrlContext } from "../App";




const Login = () => {
  const { baseUrl } = useContext(UrlContext);
  const { login } = useAuth(); // Move the destructuring inside the component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate to perform redirects


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Use the login function from useAuth
      const retorno = await login({ email, password });
            const userId = retorno[0];
      const sistemas = retorno[1];
  
      if (sistemas > 0) {
        navigate(`/addresses/${userId}`); // Navigate to the Stats page
      } else {
        navigate(`/startup/${userId}`); // Navigate to the Startup page
        return userId;
      }
  
    } catch (error) {
      setError('Invalid credentials');
      console.log('Error logging in:', error);
    }
  };
  
  return (
    console.log(baseUrl),
    <MDBContainer className="login-container">
      <MDBCard className='card'>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src={solarpanelImage} alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6' className='text-center d-flex align-items-center'>
            <MDBCardBody className='d-flex flex-column align-items-center' style={{marginLeft: '3em', marginRight: '3em' }}>
              <div className='d-flex flex-row mt-2' style={{marginBottom: '2em'}}>
                <MDBIcon fas icon="sun fa-3x me-3" style={{ color: '#f2af13' }}/>
                <span className="h1 fw-bold mb-0">SolarLink</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <MDBBtn type="submit" className="mb-4 px-5" color='warning' size='lg'>Login</MDBBtn>
              </form>

              <a className="small text-muted" href="#!">Forgot password?</a>
              <p className="mb-5 pb-lg-2" style={{color: '#ffffff'}}>Don't have an account? <a href="./register" style={{color: '#f2af13'}}>Register here</a></p>

              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
