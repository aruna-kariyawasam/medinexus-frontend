import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Phone, Mail, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const ContactForm = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    emailjs.sendForm(
      'service_8ampg1z', 
      'template_f82zhkn', 
      form.current, 
      'K91UPoVSi7SBhPsAF'
    )
    .then((result) => {
      Swal.fire({
        title: "Email Sent!",
        text: "Thank you for your feedback! We will get back to you soon.",
        icon: "success",
        confirmButtonColor: '#060d24',
        showConfirmButton: true,
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    })
    .catch((error) => {
      console.error('Email sending failed:', error);
      setSubmitStatus({ success: false, message: 'Failed to send your message. Please try again later.' });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh',marginTop:'38px' }}>
      <div className="row justify-content-center">
        {/* Contact Information Section */}
        <div className="col-lg-4 col-md-5 p-5 text-white" style={{ backgroundColor: '#060d24' }}>
          <h2 className="mb-4 border-bottom pb-3" style={{ borderColor: '#1e3a8a' }}>Get in Touch</h2>
          <p className="mb-5"  style={{ color: '#6c757d' }}>Have questions or need assistance? Our team is here to help!</p>
          
          <div className="contact-info">
            <div className="d-flex mb-4">
              <div className="me-3" style={{ color: '#3b82f6' }}>
                <Phone size={28} />
              </div>
              <div>
                <h5 style={{ color: '#3b82f6' }}>Phone</h5>
                <p className="mb-0 text-white-50">0915050981</p>
              </div>
            </div>

            <div className="d-flex mb-4">
              <div className="me-3" style={{ color: '#3b82f6' }}>
                <Mail size={28} />
              </div>
              <div>
                <h5 style={{ color: '#3b82f6' }}>Email</h5>
                <p className="mb-0 text-white-50">medinexus.msms.0001@gmail.com</p>
              </div>
            </div>

            <div className="d-flex">
              <div className="me-3" style={{ color: '#3b82f6' }}>
                <MapPin size={28} />
              </div>
              <div>
                <h5 style={{ color: '#3b82f6' }}>Address</h5>
                <p className="mb-0 text-white-50">34 McCallum Rd, Colombo 01000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="col-lg-6 col-md-7 p-5 bg-white">
          <div className="section-header mb-5">
            <h2 className="text-dark mb-3">Send Us a Message</h2>
            <p className="text-muted">We'll get back to you within 24 hours</p>
          </div>
          
          <form ref={form} onSubmit={handleSubmit}>
            {submitStatus && (
              <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'} mb-4`} role="alert">
                {submitStatus.message}
              </div>
            )}

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <input 
                  type="text"
                  className="form-control border-2 py-3"
                  placeholder="First Name"
                  name="firstName"
                  style={{ borderColor: '#e2e8f0' }}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input 
                  type="text"
                  className="form-control border-2 py-3"
                  placeholder="Last Name"
                  name="lastName"
                  style={{ borderColor: '#e2e8f0' }}
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <input 
                type="email"
                className="form-control border-2 py-3"
                placeholder="Email Address"
                name="email"
                style={{ borderColor: '#e2e8f0' }}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <input 
                type="tel"
                className="form-control border-2 py-3"
                placeholder="Phone Number (optional)"
                name="phone"
                style={{ borderColor: '#e2e8f0' }}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <textarea
                className="form-control border-2 py-3"
                rows="5"
                placeholder="Your Message"
                name="message"
                style={{ borderColor: '#e2e8f0' }}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn w-100 py-3 text-white"
              style={{ 
                backgroundColor: '#060d24',
                transition: 'all 0.3s ease',
                border: '2px solid #060d24'
              }}
              disabled={isSubmitting}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#1e3a8a')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#060d24')}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;