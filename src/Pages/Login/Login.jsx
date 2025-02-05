import React, { useState } from 'react';
import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { assets } from '../../assets/assets.js';

const Login = () => {
  const [selectedIdentity, setSelectedIdentity] = useState('');
  const [emailLabel, setEmailLabel] = useState('Email address');
  const [emailPlaceholder, setEmailPlaceholder] = useState('Enter email');

  const handleIdentityChange = (event) => {
    const identity = event.target.value;
    setSelectedIdentity(identity);

    switch (identity) {
      case '1':
        setEmailLabel('Admin ID');
        setEmailPlaceholder('Enter Admin ID');
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
        height: '140vh',
        width:'100%',
        backgroundSize: 'cover',
        backgroundPosition:'',
        backgroundImage: `url(${assets.login_page_main_bg})`,
        backgroundAttachment:'scroll',
        backgroundSize:'cover'
      }}
    >
      <div 
        className="container"         
        style={{
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',
          height: '100%'
        }}
      >
        <div 
          className="box_container"
          style={{ 
            width: '38%',
            maxHeight: 'auto',
            paddingTop: '20px',
            paddingBottom: '30px',
            borderRadius: '30px',
            paddingRight: '25px',
            paddingLeft: '25px',
            marginTop: '15px',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid navy',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'transparent'
          }}
        >
          {/* Blurred Background */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${assets.login_box_bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(2px)',
              zIndex: 1
            }}
          />

          {/* Content Container */}
          <div 
            style={{
              position: 'relative',
              zIndex: 2,
              borderRadius: '30px',
            }}
          >
            <div className='d-flex justify-content-center'>
              <h1 className="lgnhdr"
              style={{ 
                fontWeight:'bold',
                fontSize:'48px'
               }}>LOGIN</h1>
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
                    marginTop: '20px',
                    backgroundColor: 'navy',
                    width: '300px',
                    height: 'auto',
                    borderRadius: '25px',
                    color: 'lightgray',
                    fontSize:'20px',
                    fontWeight:'bold',
                    letterSpacing:'1.5px',
                  }}
                >
                  LOGIN
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
                    width: '300px',
                    height: 'auto',
                    borderRadius: '25px',
                    color: 'lightgray',
                    fontSize:'20px',
                    fontWeight:'bold',
                    letterSpacing:'1.5px',
                  }}
                >
                  REGISTER
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;