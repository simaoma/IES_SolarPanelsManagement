import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../Css/Register.css';
import solarpanelImage from '../Images/solarpanel-login.jpeg';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';


const Register = () => {
  return (
    <MDBContainer className="register-container"> 

      <MDBCard className='card'>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src={solarpanelImage} alt="registerform" className='rounded-start w-100' style={{ height: '100%' }}/>
          </MDBCol>

          <MDBCol md='6' className='text-center d-flex align-items-center'>
              <MDBCardBody className='d-flex flex-column align-items-center' style={{marginLeft: '3em', marginRight: '3em' }}>

              <div className='d-flex flex-row mt-2' style={{marginBottom: '2em'}}>
                <MDBIcon fas icon="sun fa-3x me-3" style={{ color: '#f2af13' }}/>
                <span className="h1 fw-bold mb-0">SolarLink</span> 
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Create your account</h5>

                <MDBInput wrapperClass='mb-4' label='Name' id='formControlLg' type='name' size="lg"/>
                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>
                <MDBInput wrapperClass='mb-4' label='Confirm password' id='formControlLg' type='password' size="lg"/>

              <MDBBtn className="mb-4 px-5" color='warning' size='lg'>Register</MDBBtn>
              <p className="mb-5 pb-lg-2" style={{color: '#ffffff'}}>Already have an account? <a href="./login" style={{color: '#f2af13'}}>Login here</a></p>

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
    
export default Register;