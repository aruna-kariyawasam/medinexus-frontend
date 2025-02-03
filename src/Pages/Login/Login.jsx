import React, { useState } from 'react';
import './Login.css'; // Ensure you have this CSS file for custom styles
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const [selectedIdentity, setSelectedIdentity] = useState('Admin');
  const [emailLabel, setEmailLabel] = useState('Email address');
  const [emailPlaceholder, setEmailPlaceholder] = useState('Enter email');

  const handleIdentityChange = (event) => {
    const identity = event.target.value;
    setSelectedIdentity(identity);

    switch (identity) {
      case '1':
        setEmailLabel('Email address');
        setEmailPlaceholder('Enter email');
        break;
      case '2': 
        setEmailLabel('Doctor ID');
        setEmailPlaceholder('Enter Doctor ID');
        break;
      case '3': 
        setEmailLabel('Nurse ID');
        setEmailPlaceholder('Enter Nurse ID');
        break;
      case '4': 
        setEmailLabel('Pharmacist ID');
        setEmailPlaceholder('Enter Pharmacist ID');
        break;
      case '5':
        setEmailLabel('Patient ID');
        setEmailPlaceholder('Enter Patient ID');
        break;
      default:
        setEmailLabel('Email address');
        setEmailPlaceholder('Enter email');
    }
  };

  return (
    <div 
      className="Medinexus-login" 
      style={{
        justifyContent: 'center',
        alignItems: 'center', 
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgb(5, 9, 41)'
      }}
    >
      <div 
        className="container"         
        style={{
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',
          height: '100%',
        }}
      >
        <div 
          className="box_container"
          style={{ 
            width: '33%',
            maxHeight: 'auto',
            paddingTop: '20px',
            paddingBottom: '40px',
            backgroundColor: '#889fe3',
            borderRadius: '30px',
            paddingRight: '25px',
            paddingLeft: '25px',
            marginTop: '40px',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid navy'
          }}
        >
          <div className='d-flex justify-content-center'>
            <h1 className="lgnhdr">Login</h1>
          </div>
          <br/>
          <Form.Label>Identity</Form.Label> 
          <Form.Select 
            aria-label="Default select example"  
            style={{ border: '0.5px solid navy' }}
            onChange={handleIdentityChange}
            value={selectedIdentity}
          >
            <option value="1">Admin</option>
            <option value="2">Doctor</option>
            <option value="3">Nurse</option>
            <option value="4">Pharmacist</option>
            <option value="5">Patient</option>
          </Form.Select>
          <br/>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{emailLabel}</Form.Label>
              <Form.Control 
                type="email" 
                placeholder={emailPlaceholder} 
                style={{ border: '0.5px solid navy' }}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password"  
                style={{ border: '0.5px solid navy' }}
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button  
                variant="primary" 
                type="submit"
                style={{ 
                  marginTop: '10px',
                  backgroundColor: 'navy',
                  width: '235px',
                  height: 'auto',
                  borderRadius: '15px',
                  color: 'lightgray',
                }}
              >
                Login
              </Button>
            </div>
            <div className="d-flex justify-content-center">
              <Button 
                href="/register" 
                variant="primary" 
                type="submit"
                style={{ 
                  marginTop: '15px',
                  backgroundColor: 'darkgreen',
                  width: '235px',
                  height: 'auto',
                  borderRadius: '15px',
                  color: 'lightgray',
                }}
              >
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
