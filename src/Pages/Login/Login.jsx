import React from 'react'
import './Login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  return (
    <div className="Medinexus-login" 
    style={{
      justifyContent: 'center',
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor:'rgb(5, 9, 41)',
    }}>
         <div className="container"         
            style={{
              display:'flex',
              justifyContent: 'center', 
              alignItems: 'center'
            }}
              >
                <div className="box_container"
                style={{ 
                  width:'33%',
                  maxHeight:'auto',
                  paddingTop:'20px',
                  paddingBottom:'40px',
                  backgroundColor:'#889fe3',
                  borderRadius:'30px 30px 30px 30px',
                  paddingRight:'25px',
                  paddingLeft:'25px',
                  marginTop:'40px',
                  justifyContent:'center',
                  alignItems:'center',
                  backgroundRepeat: 'no-repeat',
                  border:'1px solid navy'
                 }}
                >
                  <div className='d-flex justify-content-center'><h1 className="lgnhdr">Login</h1></div>
                  <br/>
                  <Form.Label>Identity</Form.Label> 
                  <Form.Select aria-label="Default select example"  
                        style={{ border:'0.5px solid navy' }}>
                                           
                        <option value="1">Admin</option>
                        <option value="2">Doctor</option>
                        <option value="3">Nurse</option>
                        <option value="4">Pharmacist</option>
                        <option value="5">Patient</option>
                  </Form.Select>
                  <br/>
                  <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" 
                        style={{ border:'0.5px solid navy' }}/>
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"  
                        style={{ border:'0.5px solid navy' }}/>
                      </Form.Group>

                      <div className="d-flex justify-content-center">
                      <Button  variant="primary" type="submit"
                        style={{ 
                            marginTop:'10px',
                            backgroundColor:'navy',
                            width:'235px',
                            height:'auto',
                            borderRadius:'15px',
                            color:'lightgray'
                        }}
                      >Login</Button>
                      </div>
                      <div className="d-flex justify-content-center">
                      <Button href="/register" variant="primary" type="submit"
                        style={{ 
                            marginTop:'15px',
                            backgroundColor:'darkgreen',
                            width:'235px',
                            height:'auto',
                            borderRadius:'15px',
                            color:'lightgray'
                        }}
                      >Register</Button>
                      </div>
                  </Form>
              </div>
         </div>
    </div>
  )
}

export default Login;
