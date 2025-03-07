import React, { useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import "./Form.css";

const Register_nurse = () => {
  const years = Array.from({ length: 2024 - 1950 + 1 }, (_, i) => 1950 + i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  // Initialize state for the form data
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dobYear: "",
    dobMonth: "",
    dobDate: "",
    specialization: "",
    licenseNumber: "",
    experience: "",
    email: "",
    phone: "",
    address: "",
    username: "",
    password: "",
    confirmPassword: "",
    document: null,
    availableDays: [],
    agreeTerms: false,
  });
  
  // Loading state for submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generic handler for text, select, and radio inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name !== "availableDays") {
      setFormData({ ...formData, [name]: checked });
    } else if (name !== "document" && name !== "availableDays") {
      setFormData({ ...formData, [name]: value });
    }
  };

  // File input handler for uploading documents
  const handleFileChange = (e) => {
    setFormData({ ...formData, document: e.target.files[0] });
  };

  // Handler for available days checkboxes
  const handleAvailableDays = (e) => {
    const { value, checked } = e.target;
    let updatedDays = [...formData.availableDays];
    if (checked) {
      updatedDays.push(value);
    } else {
      updatedDays = updatedDays.filter((day) => day !== value);
    }
    setFormData({ ...formData, availableDays: updatedDays });
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation: check if passwords match
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    
    // Check if terms are agreed
    if (!formData.agreeTerms) {
      Swal.fire({
        title: "Error!",
        text: "You must agree to the terms and conditions",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a proper date format from the selections - make sure it aligns with LocalDate in Java
      const month = months.indexOf(formData.dobMonth) + 1;
      const formattedMonth = month < 10 ? `0${month}` : month.toString();
      const formattedDate = formData.dobDate < 10 ? `0${formData.dobDate}` : formData.dobDate.toString();
      const formattedDOB = `${formData.dobYear}-${formattedMonth}-${formattedDate}`;
      
      // Prepare form data for submission, including file upload
      const submissionData = new FormData();
      
      // Add all text fields to FormData - match backend field names exactly
      submissionData.append("fullName", formData.fullName);
      submissionData.append("gender", formData.gender);
      submissionData.append("dateOfBirth", formattedDOB);  // Match the Nurse model property name
      submissionData.append("specialization", formData.specialization);
      submissionData.append("medicalLicenseNumber", formData.licenseNumber);  // Match the Nurse model property name
      submissionData.append("yearsOfExperience", formData.experience);  // Match the Nurse model property name
      submissionData.append("email", formData.email);
      submissionData.append("phoneNumber", formData.phone);  // Match the Nurse model property name
      submissionData.append("address", formData.address);
      submissionData.append("username", formData.username);
      submissionData.append("password", formData.password);
      
      // Handle array data properly
      formData.availableDays.forEach((day, index) => {
        submissionData.append(`availableDays[${index}]`, day);
      });
      
      // Handle file data - must match the backend field
      if (formData.document) {
        submissionData.append("certificationFile", formData.document);  // Assuming this is the expected field name in your controller
      }
      
      // Log the data being sent (for debugging)
      console.log("Sending form data:", {
        fullName: formData.fullName,
        gender: formData.gender,
        dateOfBirth: formattedDOB,
        specialization: formData.specialization,
        medicalLicenseNumber: formData.licenseNumber,
        yearsOfExperience: formData.experience,
        email: formData.email,
        phoneNumber: formData.phone,
        // Not logging password for security
        document: formData.document ? formData.document.name : null,
        availableDays: formData.availableDays
      });

      // Send data to backend API
      const response = await axios.post(
        "http://localhost:8080/api/nurses",
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // Add withCredentials if CORS is an issue
          withCredentials: true
        }
      );
      
      console.log("Registration success:", response.data);
      
      // Show success alert
      Swal.fire({
        title: "Registration Successful!",
        text: "Your nurse profile has been registered successfully",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          // Optional: Redirect to login or dashboard
          // window.location.href = "/login";
        }
      });
      
      // Reset form after successful submission
      setFormData({
        fullName: "",
        gender: "",
        dobYear: "",
        dobMonth: "",
        dobDate: "",
        specialization: "",
        licenseNumber: "",
        experience: "",
        email: "",
        phone: "",
        address: "",
        username: "",
        password: "",
        confirmPassword: "",
        document: null,
        availableDays: [],
        agreeTerms: false,
      });
      
    } catch (error) {
      console.error("Registration error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Status code:", error.response?.status);
      
      // Show error alert with specific message if available
      Swal.fire({
        title: "Registration Failed!",
        text: error.response?.data?.message || "There was a problem with your registration. Please try again.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for clearing the form
  const handleClearForm = () => {
    setFormData({
      fullName: "",
      gender: "",
      dobYear: "",
      dobMonth: "",
      dobDate: "",
      specialization: "",
      licenseNumber: "",
      experience: "",
      email: "",
      phone: "",
      address: "",
      username: "",
      password: "",
      confirmPassword: "",
      document: null,
      availableDays: [],
      agreeTerms: false,
    });
  };

  return (
    <Container
      className="my-6"
      style={{
        backgroundColor: "#bcc7e8",
        padding: "30px 40px 20px 40px",
        borderRadius: "0 0 10px 10px",
      }}
    >
      <h2
        className="text-center mb-4"
        style={{
          backgroundColor: "#a8acba",
          padding: "15px",
          borderRadius: "10px",
          border: "0.25px black solid",
        }}
      >
        <b>Nurse Registration Form</b>
      </h2>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Personal Information Section */}
        <section className="mb-4">
          <h4>Personal Information</h4>
          <Form.Group className="mb-3">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
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
                onChange={handleChange}
                required
              />
              <Form.Check
                inline
                label="Female"
                name="gender"
                type="radio"
                id="female"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Other"
                name="gender"
                type="radio"
                id="other"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Birth:</Form.Label>
            <Row>
              <Col>
                <Form.Select
                  name="dobYear"
                  value={formData.dobYear}
                  onChange={handleChange}
                  required
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  name="dobMonth"
                  value={formData.dobMonth}
                  onChange={handleChange}
                  required
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  name="dobDate"
                  value={formData.dobDate}
                  onChange={handleChange}
                  required
                >
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
            <Form.Select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            >
              <option value="">Select Specialization</option>
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
            <Form.Control
              type="text"
              placeholder="License number"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Years of Experience:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter years of experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
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
              placeholder="example@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter your address"
              name="address"
              value={formData.address}
              onChange={handleChange}
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
              placeholder="Choose a username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter a password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </section>

        {/* Additional Documents Section */}
        <section className="mb-4">
          <h4>Additional Documents</h4>
          <Form.Group className="mb-3">
            <Form.Label>Upload Certification/License:</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              name="document"
              onChange={handleFileChange}
              required
            />
          </Form.Group>
        </section>

        {/* Availability Section */}
        <section className="mb-4">
          <h4>Availability</h4>
          <Form.Group className="mb-3">
            <Form.Label>Available Days:</Form.Label>
            <Row>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <Col md={4} key={day}>
                  <Form.Check
                    type="checkbox"
                    label={day}
                    value={day}
                    checked={formData.availableDays.includes(day)}
                    onChange={handleAvailableDays}
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>
        </section>

        {/* Terms & Conditions and Submit Button */}
        <section className="mb-4">
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="agreeTerms"
              label={
                <>
                  I agree to the{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/tc"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and certify the information provided is accurate.
                </>
              }
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button 
              className="btn01" 
              variant="danger" 
              type="button" 
              onClick={handleClearForm}
              disabled={isSubmitting}
            >
              Clear Form
            </Button>
            <Button 
              className="btn02" 
              variant="primary" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </section>
      </Form>
    </Container>
  );
};

export default Register_nurse;