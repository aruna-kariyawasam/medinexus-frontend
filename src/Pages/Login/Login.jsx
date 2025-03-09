import React, { useState } from 'react';
import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { assets } from '../../assets/assets.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [selectedIdentity, setSelectedIdentity] = useState('');
  const [emailLabel, setEmailLabel] = useState('Email address');
  const [emailPlaceholder, setEmailPlaceholder] = useState('Enter email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  const getRegistrationRoute = () => {
    switch (selectedIdentity) {
      case '2':
        return '/docRegi';
      case '3':
        return '/nurRegi';
      case '4':
        return '/pharmRegi';
      case '5':
        return '/patRegi';
      default:
        return null;
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!selectedIdentity) {
      setError('Please select your role');
      return;
    }
    
    if (!email.trim()) {
      setError('Please enter your ID/email');
      return;
    }
    
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }
    
    try {
      setLoading(true);
      
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        username: email, // API might expect username instead of email
        password: password,
        role: selectedIdentity // Sending role information to the backend
      });
      
      // Handle successful login
      if (response.data && response.data.token) {
        // Store token and user info in localStorage or state management system
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect based on role
        switch (selectedIdentity) {
          case '1':
            navigate('/admin-dashboard');
            break;
          case '2':
            navigate('/doctor-dashboard');
            break;
          case '3':
            navigate('/nurse-dashboard');
            break;
          case '4':
            navigate('/pharmacist-dashboard');
            break;
          case '5':
            navigate('/patient-dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 401) {
          setError('Invalid credentials. Please try again.');
        } else if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('An error occurred during login. Please try again.');
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
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
        backgroundPosition:'center',
        backgroundImage: `url(${assets.login_page_main_bg})`,
        backgroundAttachment:'scroll',
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
            <div className="logincontent">
              <div className='d-flex justify-content-center'>
                <h1 className="lgnhdr"
                style={{ 
                  fontWeight:'bold',
                  fontSize:'48px'
                }}>LOGIN</h1>
              </div>
              <br/>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Label>Identity</Form.Label> 
                <Form.Select 
                  aria-label="Select identity"  
                  style={{ border: '0.5px solid navy' }}
                  onChange={handleIdentityChange}
                  value={selectedIdentity}
                  required
                >
                  <option value="">Select your role</option>
                  <option value="1">Admin</option>
                  <option value="2">Doctor</option>
                  <option value="3">Nurse</option>
                  <option value="4">Pharmacist</option>
                  <option value="5">Patient</option>
                </Form.Select>
                <br/>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{emailLabel}</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder={emailPlaceholder} 
                    style={{ border: '0.5px solid navy' }}
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your information with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Password"  
                    style={{ border: '0.5px solid navy' }}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button  
                    variant="primary" 
                    type="submit"
                    disabled={loading}
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
                    {loading ? 'LOGGING IN...' : 'LOGIN'}
                  </Button>
                </div>
                <div className="d-flex justify-content-center">
                  <Button 
                    href={getRegistrationRoute()}
                    variant="primary" 
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
                    disabled={!getRegistrationRoute() || loading}
                  >
                    REGISTER
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;