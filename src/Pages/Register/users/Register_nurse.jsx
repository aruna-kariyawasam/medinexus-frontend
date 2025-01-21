import React from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import './Form.css'

const Register_nurse = () => {
  const years = Array.from({ length: 2024 - 1950 + 1 }, (_, i) => 1950 + i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Container className="my-6"
    style={{ 
      backgroundColor:'#bcc7e8',
      padding:'30px 40px 20px 40px',
      borderRadius:'0 0 10px 10px'
     }}>
      <h2 className="text-center mb-4"
      style={{ backgroundColor:'#a8acba',
        padding:'15px',
        borderRadius:'10px',
        border:'0.25px black solid'
      }}><b>Nurse Registration Form</b></h2>

      <Form>
        <section className="mb-4">
          <h4>Personal Information</h4>
          <Form.Group className="mb-3">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter your full name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender:</Form.Label>
            <div>
              <Form.Check
                inline
                label="Male"
                name="gender"
                type="radio"
                id="male"
              />
              <Form.Check
                inline
                label="Female"
                name="gender"
                type="radio"
                id="female"
              />
              <Form.Check
                inline
                label="Other"
                name="gender"
                type="radio"
                id="other"
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Birth:</Form.Label>
            <Row>
              <Col>
                <Form.Select>
                  <option>Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select>
                  <option>Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select>
                  <option>Date</option>
                  {dates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        </section>

        <section className="mb-4">
          <h4>Professional Details</h4>
          <Form.Group className="mb-3">
            <Form.Label>Specialization:</Form.Label>
            <Form.Select>
              <option>Select Specialization</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="surgery">Surgery</option>
              <option value="emergency">Emergency Care</option>
              <option value="oncology">Oncology</option>
              <option value="geriatrics">Geriatrics</option>
              <option value="cardiology">Cardiology</option>
              <option value="psychiatry">Psychiatry</option>
              <option value="neurology">Neurology</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Medical License Number:</Form.Label>
            <Form.Control type="text" placeholder="License number" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Years of Experience:</Form.Label>
            <Form.Control type="number" placeholder="Enter years of experience" />
          </Form.Group>
        </section>

        <section className="mb-4">
          <h4>Contact Information</h4>
          <Form.Group className="mb-3">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control type="email" placeholder="example@example.com" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone number" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address:</Form.Label>
            <Form.Control as="textarea" placeholder="Enter your address" />
          </Form.Group>
        </section>

        <section className="mb-4">
          <h4>Account Details</h4>
          <Form.Group className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Choose a username" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter a password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control type="password" placeholder="Re-enter password" />
          </Form.Group>
        </section>

        <section className="mb-4">
          <h4>Additional Documents</h4>
          <Form.Group className="mb-3">
            <Form.Label>Upload Certification/License:</Form.Label>
            <Form.Control type="file" accept=".pdf,.jpg,.jpeg,.png" />
          </Form.Group>
        </section>

        <section className="mb-4">
          <h4>Availability</h4>
          <Form.Group className="mb-3">
            <Form.Label>Available Days:</Form.Label>
            <Row>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                (day) => (
                  <Col md={4} key={day}>
                    <Form.Check type="checkbox" label={day} />
                  </Col>
                )
              )}
            </Row>
          </Form.Group>
        </section>

        <section className="mb-4">
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label={
                <>
                  I agree to the <a target="_blank" href="/tc">Terms and Conditions</a> and certify the information provided is accurate.
                </>
              }
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button className="btn01" variant="danger" type="reset">
              Clear Form
            </Button>
            <Button className="btn02" variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </section>
      </Form>
    </Container>
  );
};

export default Register_nurse;
