import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container, Alert } from "react-bootstrap";
import './Form.css';
import axios from "axios";

const RegisterDoctor = () => {
  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: {
      year: "",
      month: "",
      day: ""
    },
    specialization: "",
    licenseNumber: "",
    yearsOfExperience: "",
    email: "",
    phoneNumber: "",
    address: "",
    username: "",
    password: "",
    confirmPassword: "",
    availableDays: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false
    },
    termsAgreed: false
  });

  // Files state
  const [files, setFiles] = useState({
    certification: null,
    profilePicture: null,
    otherDocuments: null
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Data for dropdown options
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      if (name === "termsAgreed") {
        setFormData({ ...formData, [name]: checked });
      } else {
        setFormData({
          ...formData,
          availableDays: {
            ...formData.availableDays,
            [name]: checked
          }
        });
      }
    } else if (name === "year" || name === "month" || name === "day") {
      setFormData({
        ...formData,
        dateOfBirth: {
          ...formData.dateOfBirth,
          [name]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles({
      ...files,
      [name]: files[0]
    });
  };

  // Format data for API submission
  const prepareDataForSubmission = () => {
    // Format date of birth as YYYY-MM-DD
    const monthIndex = months.indexOf(formData.dateOfBirth.month) + 1;
    const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex;
    const formattedDay = formData.dateOfBirth.day < 10 ? `0${formData.dateOfBirth.day}` : formData.dateOfBirth.day;
    const dob = `${formData.dateOfBirth.year}-${formattedMonth}-${formattedDay}`;
    
    // Get available days as array
    const availableDays = Object.entries(formData.availableDays)
      .filter(([_, isAvailable]) => isAvailable)
      .map(([day]) => day);
    
    return {
      fullName: formData.fullName,
      gender: formData.gender,
      dateOfBirth: dob,
      specialization: formData.specialization,
      licenseNumber: formData.licenseNumber,
      yearsOfExperience: parseInt(formData.yearsOfExperience),
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      username: formData.username,
      password: formData.password,
      availableDays: availableDays
      // File uploads would be handled separately
    };
  };

  // Submit form data to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match", type: "danger" });
      return;
    }
    
    // Validate terms
    if (!formData.termsAgreed) {
      setMessage({ text: "You must agree to the terms and conditions", type: "danger" });
      return;
    }
    
    setLoading(true);
    try {
      // Prepare data for submission
      const doctorData = prepareDataForSubmission();
      
      // Submit doctor data to API
      const response = await axios.post('/api/doctors', doctorData);
      
      // If we need to handle file uploads, we'd need to do that here
      // This would typically involve FormData and additional requests
      
      setMessage({ text: "Registration successful!", type: "success" });
      // Reset form
      resetForm();
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ 
        text: error.response?.data?.message || "Registration failed. Please try again.", 
        type: "danger" 
      });
    } finally {
      setLoading(false);
    }

    if (response.data && response.data.id) {
      try {
        await uploadDoctorFiles(response.data.id, files);
      } catch (uploadError) {
        console.error('File upload error:', uploadError);
        setMessage({ 
          text: "Doctor registered but file upload failed. Please try uploading files later.", 
          type: "warning" 
        });
      }
    }
  };

  // Reset form after submission
  const resetForm = () => {
    setFormData({
      fullName: "",
      gender: "",
      dateOfBirth: {
        year: "",
        month: "",
        day: ""
      },
      specialization: "",
      licenseNumber: "",
      yearsOfExperience: "",
      email: "",
      phoneNumber: "",
      address: "",
      username: "",
      password: "",
      confirmPassword: "",
      availableDays: {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
      },
      termsAgreed: false
    });
    
    setFiles({
      certification: null,
      profilePicture: null,
      otherDocuments: null
    });
  };

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

      {message.text && (
        <Alert variant={message.type} onClose={() => setMessage({ text: "", type: "" })} dismissible>
          {message.text}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <section className="mb-4">
          <h4>Personal Information</h4>
          <Form.Group className="mb-3">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name" 
              required
            />
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
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                label="Female"
                name="gender"
                type="radio"
                id="female"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                label="Other"
                name="gender"
                type="radio"
                id="other"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleInputChange}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Birth:</Form.Label>
            <Row>
              <Col>
                <Form.Select name="year" value={formData.dateOfBirth.year} onChange={handleInputChange}>
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select name="month" value={formData.dateOfBirth.month} onChange={handleInputChange}>
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select name="day" value={formData.dateOfBirth.day} onChange={handleInputChange}>
                  <option value="">Date</option>
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
            <Form.Select name="specialization" value={formData.specialization} onChange={handleInputChange}>
              <option value="">Select your specialization</option>
              {specializations.map((specialization, index) => (
                <option key={index} value={specialization}>
                  {specialization}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Medical License Number:</Form.Label>
            <Form.Control 
              type="text" 
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              placeholder="License number" 
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Years of Experience:</Form.Label>
            <Form.Control 
              type="number" 
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
              placeholder="Enter years of experience" 
              required
            />
          </Form.Group>
        </section>

        {/* Contact Information Section */}
        <section className="mb-4">
          <h4>Contact Information</h4>
          <Form.Group className="mb-3">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@example.com" 
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control 
              type="tel" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter phone number" 
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Clinic/Hospital Address:</Form.Label>
            <Form.Control 
              as="textarea" 
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address" 
              required
            />
          </Form.Group>
        </section>

        {/* Account Details Section */}
        <section className="mb-4">
          <h4>Account Details</h4>
          <Form.Group className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Choose a username" 
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter a password" 
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Re-enter password" 
              required
            />
          </Form.Group>
        </section>

        {/* File Upload Section */}
        <section className="mb-4">
          <h4>Additional Important Documents</h4>
          <Form.Group className="mb-3">
            <Form.Label>Upload Medical Certification/License:</Form.Label>
            <Form.Control 
              type="file" 
              name="certification"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png" 
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture:</Form.Label>
            <Form.Control 
              type="file" 
              name="profilePicture"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png" 
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Other Important Documents (if have):</Form.Label>
            <Form.Control 
              type="file" 
              name="otherDocuments"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png"
            />
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
                    <Form.Check 
                      type="checkbox" 
                      name={day}
                      checked={formData.availableDays[day]}
                      onChange={handleInputChange}
                      label={day} 
                    />
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
              name="termsAgreed"
              checked={formData.termsAgreed}
              onChange={handleInputChange}
              label={
                <>
                  I agree to the <a target="_blank" href="/tc">Terms and Conditions</a> and certify the information provided is accurate.
                </>
              }
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button className="btn01" variant="danger" type="reset" onClick={resetForm}>
              Clear Form
            </Button>
            <Button 
              className="btn02" 
              variant="primary" 
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </section>
      </Form>
    </Container>
  );
};

export default RegisterDoctor;