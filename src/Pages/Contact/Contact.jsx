import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Phone, 
  Mail, 
  MapPin,
} from 'lucide-react';
import emailjs from '@emailjs/browser';

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
    
    // EmailJS configuration
    emailjs.sendForm(
      'service_8ampg1z', 
      'template_f82zhkn', 
      form.current, 
      'K91UPoVSi7SBhPsAF'
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setSubmitStatus({ success: true, message: 'Thank you for your feedback! We will get back to you soon.' });
      // Reset form after successful submission
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
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Column with Enhanced Icons */}
        <div className="col-md-5 bg-light d-flex flex-column justify-content-center p-5">
          <div className="text-center">
            <h1 className="mb-4">Contact Us</h1>
            <p>Have questions or need assistance? Our team is here to help!

Whether you need to schedule an appointment, inquire about our services, or seek medical support, feel free to reach out to us.</p>
            <div className="contact-details mt-5">
              {/* Phone Contact */}
              <div className="mb-3 d-flex align-items-center justify-content-left">
                <Phone 
                  color="#007bff" 
                  size={24} 
                  className="me-3" 
                />
                <h5 className="m-0">0915050981</h5>
              </div>
              
              {/* Email Contact */}
              <div className="mb-3 d-flex align-items-center justify-content-left">
                <Mail 
                  color="#28a745" 
                  size={24} 
                  className="me-3" 
                />
                <h5 className="m-0">medinexus.msms.0001@gmail.com</h5>
              </div>
              
              {/* Address Contact */}
              <div className="mb-3 d-flex align-items-center justify-content-left">
                <MapPin 
                  color="#dc3545" 
                  size={24} 
                  className="me-3" 
                />
                <h5 className="m-0">34 McCallum Rd, Colombo 01000</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Form) */}
        <div className="col-md-6 bg-light d-flex align-items-center justify-content-center p-8">
          <div className="w-75">
            {/* Success/Error Message */}
            {submitStatus && (
              <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'} mb-4`} role="alert">
                {submitStatus.message}
              </div>
            )}
            
            <form ref={form} onSubmit={handleSubmit}>
              <div className="row mb-5">
                <div className="col-md-6 mb-5 mb-md-0">
                  <input 
                    type="text" 
                    className="form-control rounded-pill" 
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <input 
                    type="text" 
                    className="form-control rounded-pill" 
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="mb-5">
                <input 
                  type="email" 
                  className="form-control rounded-pill" 
                  placeholder="example@email.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="mb-5">
                <input 
                  type="tel" 
                  className="form-control rounded-pill" 
                  placeholder="Phone (optional)"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-5">
                <textarea 
                  className="form-control" 
                  rows="4" 
                  placeholder="Type your message..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 rounded-pill"
                  style={{backgroundColor:'#060d24'}}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;