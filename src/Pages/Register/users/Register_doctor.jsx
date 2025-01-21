import React from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import './Form.css';

const RegisterDoctor = () => {
  const years = Array.from({ length: 2024 - 1950 + 1 }, (_, i) => 1950 + i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  const specializations = [
    "Cardiology",
    "Neurology",
    "Dermatology",
    "Pediatrics",
    "Oncology",
    "Radiology",
    "Psychiatry",
    "Orthopedics",
    "Ophthalmology",
    "Gynecology",
    "Gastroenterology",
    "Urology",
    "Endocrinology",
    "General Medicine",
    "Surgery",
    "Anesthesiology",
  ];

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
      }}><b>Doctor Registration Form</b></h2>

      <Form>
        {/* Personal Information Section */}
        <section className="mb-4">
          <h4>Personal Information</h4>
          <Form.Group className="mb-3">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter your full name" required/>
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

        {/* Professional Details Section */}
        <section className="mb-4">
          <h4>Professional Details</h4>
          <Form.Group className="mb-3">
            <Form.Label>Specialization:</Form.Label>
            <Form.Select>
              <option>Select your specialization</option>
              {specializations.map((specialization, index) => (
                <option key={index} value={specialization}>
                  {specialization}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Medical License Number:</Form.Label>
            <Form.Control type="text" placeholder="License number" required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Years of Experience:</Form.Label>
            <Form.Control type="number" placeholder="Enter years of experience" required/>
          </Form.Group>
        </section>

        {/* Contact Information Section */}
        <section className="mb-4">
          <h4>Contact Information</h4>
          <Form.Group className="mb-3">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control type="email" placeholder="example@example.com" required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone number" required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Clinic/Hospital Address:</Form.Label>
            <Form.Control as="textarea" placeholder="Enter your address" required/>
          </Form.Group>
        </section>

        {/* Account Details Section */}
        <section className="mb-4">
          <h4>Account Details</h4>
          <Form.Group className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Choose a username" required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter a password" required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control type="password" placeholder="Re-enter password" required/>
          </Form.Group>
        </section>

        {/* File Upload Section */}
        <section className="mb-4">
          <h4>Additional Important Documents</h4>
          <Form.Group className="mb-3">
            <Form.Label>Upload Medical Certification/License:</Form.Label>
            <Form.Control type="file" accept=".pdf,.jpg,.jpeg,.png" required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture:</Form.Label>
            <Form.Control type="file" accept=".jpg,.jpeg,.png" required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Other Important Documents (if have):</Form.Label>
            <Form.Control type="file" accept=".jpg,.jpeg,.png"/>
          </Form.Group>
        </section>

        {/* Availability Section */}
        <section className="mb-4">
          <h4>Availability</h4>
          <Form.Group className="mb-3">
            <Form.Label>Available Days:</Form.Label>
            <Row>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                (day) => (
                  <Col md={4} key={day}>
                    <Form.Check type="checkbox" label={day} required/>
                  </Col>
                )
              )}
            </Row>
          </Form.Group>
        </section>

        {/* Terms and Submit Section */}
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

export default RegisterDoctor;
