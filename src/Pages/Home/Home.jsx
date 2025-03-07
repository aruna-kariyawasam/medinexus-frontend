import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Header from '../../Components/Header/Header';
import HomeMidLayer from '../../Components/HomeMidLayer';
import { Container, Row, Col, Card, Button, Carousel, Badge, Collapse, Form } from 'react-bootstrap';
import { 
  FaUserMd, FaCalendarCheck, FaHospital, FaHeartbeat, FaAmbulance, 
  FaFileMedical, FaPhoneAlt, FaStar, FaShieldAlt, FaHandHoldingMedical, 
  FaNotesMedical, FaNewspaper, FaClinicMedical, FaLanguage,
  FaCreditCard, FaIdCard, FaHandshake, FaMedkit, FaBriefcaseMedical,
  FaStethoscope, FaWheelchair, FaLungs, FaTablets, FaDna,
  FaPills, FaBrain, FaAllergies, FaEye, FaTooth
} from 'react-icons/fa';
import { FaTimes, FaEdit } from 'react-icons/fa';

const chunkArray = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
  
};

const Home = () => {
  const [showAllServices, setShowAllServices] = useState(false);
  const [expandedArticles, setExpandedArticles] = useState({
    article1: false,
    article2: false,
    article3: false
  });

  // Review system state
  const [reviews, setReviews] = useState([
    {
      id: 1,
      text: "ඉතාමත් යෝග්ය සේවාවක්. වෛද්යවරුන්ගේ ප්රතිචාර වේගවත් හා ප්රයෝජනවත් විය.",
      name: "නිමලී පෙරේරා",
      email: "nimalee@e123mple.com",
      date: "2024-03-15",
      language: "si",
      rating: 5
    },
    {
      id: 2,
      text: "Excellent service! Got immediate consultation for my mother's diabetes management.",
      name: "Rajiv Fernando",
      email: "rajiv@141421.com",
      date: "2024-03-14",
      language: "en",
      rating: 5
    },
    {
      id: 3,
      text: "Excellent service!",
      name: "Navod Ravishan",
      email: "nav24@gmail.com",
      date: "2025-03-14",
      language: "en",
      rating: 5
    },
    {
      id: 4,
      text: "What a good Experience.",
      name: "Geenath Pasindu",
      email: "geenath24@.com",
      date: "2023-08-24",
      language: "en",
      rating: 5
    },
    {
      id: 5,
      text: "ඉතා ප්රශංසනීය සේවයක්. ඔබගේ ඩිජිටල් පද්ධතිය මගින් ලබා දුන් පහසුව අගය කරමි. Excellent digital platform!",
      name: "සංජීවනී පෙරේරා",
      email: "sanjivani24@gmail.com",
      date: "2024-02-15",
      language: "si",
      rating: 5
    },
    {
      id: 6,
      text: "The mobile app is incredibly user-friendly. පරිශීලකයෙකු ලෙස මට ඉතා පහසුවෙන් සියලු සේවාවන් භාවිතා කිරීමට හැකි විය.",
      name: "Amanda Silva",
      email: "amanda.s@yahoo.com",
      date: "2024-03-02",
      language: "en",
      rating: 4
    },
    {
      id: 7,
      text: "වෛද්ය උපදෙස් ඉතා විනාඩි කිහිපයකින් ලබා ගත හැකි වීම අතිශයින්ම ප්රයෝජනවත් විය. Saved me hours of waiting!",
      name: "රවින්ද්ර ගුණසේකර",
      email: "ravindra88@hotmail.com",
      date: "2024-01-18",
      language: "si",
      rating: 5
    },
    {
      id: 8,
      text: "ප්රතිකාර සැලසුම් සඳහා ස්තූතියි! The personalized care approach made all the difference in my recovery.",
      name: "Nadeesha Jayawardena",
      email: "nadeesha.j@outlook.com",
      date: "2024-04-05",
      language: "si",
      rating: 5
    },
    {
      id: 9,
      text: "සරල රස්තියාදු ක්රමයක් සහ කාර්යක්ෂම සේවාවක්. Appointments were handled seamlessly through the online portal.",
      name: "දිලාන් ප්රනාන්දු",
      email: "dilan.pr@protonmail.com",
      date: "2024-03-22",
      language: "si",
      rating: 4
    }
  ]);

  const [newReview, setNewReview] = useState({
    text: '',
    name: '',
    email: '',
    rating: 5,
    language: 'en'
  });

  const handleDeleteReview = (reviewId) => {
    const userEmail = localStorage.getItem('medinexusUserEmail');
    const updatedReviews = reviews.filter(review => {
      return !(review.id === reviewId && review.email === userEmail);
    });
    setReviews(updatedReviews);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.text.trim() && newReview.name.trim() && newReview.email.trim()) {
      const reviewToAdd = {
        ...newReview,
        id: Date.now(),
        date: new Date().toISOString()
      };
      
      setReviews([...reviews, reviewToAdd]);
      setNewReview({
        text: '',
        name: '',
        email: '',
        rating: 5,
        language: 'en'
      });
    }
  };

  return (
    <div className="Medinexus-Home">
      <Header />
      <HomeMidLayer />
      
      {/* Why Choose Us Section */}
      <section className="py-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
        <Container>
          <h2 className="text-center mb-5 fw-bold" style={{ color: '#000080' }}>Why Choose Medinexus?</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <FaUserMd style={{ color: '#000080' }} size={48} />
                  </div>
                  <Card.Title>Expert Medical Team</Card.Title>
                  <Card.Text>
                    Access to board-certified specialists and experienced healthcare professionals.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <FaCalendarCheck style={{ color: '#000080' }} size={48} />
                  </div>
                  <Card.Title>Easy Scheduling</Card.Title>
                  <Card.Text>
                    Convenient online booking system for in-person and virtual appointments.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <FaHeartbeat style={{ color: '#000080' }} size={48} />
                  </div>
                  <Card.Title>Personalized Care</Card.Title>
                  <Card.Text>
                    Customized treatment plans tailored to your specific medical needs.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Services Section (Expanded) */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold" style={{ color: '#000080' }}>Our Complete Services</h2>
          <Row className="g-4">
            <Col lg={3} md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(0, 0, 128, 0.1)' }}>
                    <FaHospital style={{ color: '#000080' }} size={40} />
                  </div>
                  <Card.Title>Specialist Referrals</Card.Title>
                  <Card.Text>
                    Seamless connections to specialized healthcare providers.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(0, 0, 128, 0.1)' }}>
                    <FaFileMedical style={{ color: '#000080' }} size={40} />
                  </div>
                  <Card.Title>Medical Records</Card.Title>
                  <Card.Text>
                    Secure storage and easy access to your complete health history.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(0, 0, 128, 0.1)' }}>
                    <FaAmbulance style={{ color: '#000080' }} size={40} />
                  </div>
                  <Card.Title>Emergency Support</Card.Title>
                  <Card.Text>
                    24/7 emergency assistance and coordination services.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(0, 0, 128, 0.1)' }}>
                    <FaHeartbeat style={{ color: '#000080' }} size={40} />
                  </div>
                  <Card.Title>Wellness Programs</Card.Title>
                  <Card.Text>
                    Preventive care and health maintenance programs.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Additional Services (Collapsible) */}
          <Collapse in={showAllServices}>
            <div>
              <Row className="g-4 mt-2">
                <Col lg={3} md={6}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="text-center p-4">
                      <div className="rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(0, 0, 128, 0.1)' }}>
                        <FaWheelchair style={{ color: '#000080' }} size={40} />
                      </div>
                      <Card.Title>Mobility Assistance</Card.Title>
                      <Card.Text>
                        Support services for patients with mobility challenges.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={3} md={6}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="text-center p-4">
                      <div className="rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(0, 0, 128, 0.1)' }}>
                        <FaLungs style={{ color: '#000080' }} size={40} />
                      </div>
                      <Card.Title>Respiratory Care</Card.Title>
                      <Card.Text>
                        Specialized treatment for respiratory conditions and disorders.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={3} md={6}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="text-center p-4">
                      <div className="rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(0, 0, 128, 0.1)' }}>
                        <FaTablets style={{ color: '#000080' }} size={40} />
                      </div>
                      <Card.Title>Medication Management</Card.Title>
                      <Card.Text>
                        Comprehensive oversight of prescriptions and treatments.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={3} md={6}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="text-center p-4">
                      <div className="rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(0, 0, 128, 0.1)' }}>
                        <FaDna style={{ color: '#000080' }} size={40} />
                      </div>
                      <Card.Title>Genetic Counseling</Card.Title>
                      <Card.Text>
                        Expert guidance on genetic factors affecting health.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={3} md={6}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="text-center p-4">
                      <div className="rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(0, 0, 128, 0.1)' }}>
                        <FaPills style={{ color: '#000080' }} size={40} />
                      </div>
                      <Card.Title>Chronic Disease Management</Card.Title>
                      <Card.Text>
                        Long-term care planning for ongoing health conditions.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={3} md={6}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="text-center p-4">
                      <div className="rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(0, 0, 128, 0.1)' }}>
                        <FaBrain style={{ color: '#000080' }} size={40} />
                      </div>
                      <Card.Title>Mental Health Services</Card.Title>
                      <Card.Text>
                        Comprehensive support for psychological wellbeing.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={3} md={6}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="text-center p-4">
                      <div className="rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(0, 0, 128, 0.1)' }}>
                        <FaAllergies style={{ color: '#000080' }} size={40} />
                      </div>
                      <Card.Title>Allergy Management</Card.Title>
                      <Card.Text>
                        Testing, treatment, and prevention strategies for allergies.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={3} md={6}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="text-center p-4">
                      <div className="rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(0, 0, 128, 0.1)' }}>
                        <FaEye style={{ color: '#000080' }} size={40} />
                      </div>
                      <Card.Title>Vision Care</Card.Title>
                      <Card.Text>
                        Eye health services and vision management.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Collapse>
          
          <div className="text-center mt-5">
            <Button 
              variant="outline-primary" 
              size="lg" 
              onClick={() => setShowAllServices(!showAllServices)}
              style={{ backgroundColor: showAllServices ? 'rgba(0, 0, 128, 0.1)' : 'white', borderColor: '#000080', color: '#000080' }}
            >
              {showAllServices ? 'Hide Additional Services' : 'View All Services'}
            </Button>
          </div>
        </Container>
      </section>
      
            {/* Testimonials Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <h2 className="text-center mb-5 fw-bold" style={{ color: '#001233' }}>
            What Our Patients Say
          </h2>

          <Carousel indicators interval={5000} className="testimonial-carousel">
            {chunkArray(reviews, 3).map((chunk, index) => (
              <Carousel.Item key={index}>
                <Row className="g-4">
                  {chunk.map((review) => {
                    const isOwner = localStorage.getItem('medinexusUserEmail') === review.email;
                    return (
                      <Col md={4} key={review.id}>
                        <Card className="h-100 border-0 shadow-lg position-relative" 
                              style={{ backgroundColor: '#001233', color: 'white' }}>
                          {isOwner && (
                            <Button 
                              variant="danger" 
                              size="sm" 
                              className="position-absolute top-0 end-0 m-2 rounded-circle"
                              onClick={() => handleDeleteReview(review.id)}
                              style={{ width: '32px', height: '32px' }}
                            >
                              <FaTimes />
                            </Button>
                          )}
                          <Card.Body className="p-4">
                            <div className="mb-3">
                              {[...Array(review.rating)].map((_, i) => (
                                <FaStar key={i} className="text-warning me-1" size={24} />
                              ))}
                            </div>
                            <p className="fs-5 mb-4 testimonial-text">
                              {review.text}
                            </p>
                            <h5 className="mb-1 fw-bold text-teal">{review.name}</h5>
                            <p className="text-muted mb-0">
                              {new Date(review.date).toLocaleDateString('en-LK', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                  })}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
          <br/>
          {/* Review Form */}
          <Card className="mt-5 border-0 shadow-lg" style={{ backgroundColor: '#d8e1e8' }}>
            <Card.Body className="p-4">
              <Form onSubmit={handleReviewSubmit}>
                <Row className="g-3">
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      placeholder="Your Name"
                      value={newReview.name}
                      onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                      required
                      style={{ backgroundColor: 'white', color: 'black', border: 'none' }}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="email"
                      placeholder="Your Email"
                      value={newReview.email}
                      onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                      required
                      style={{ backgroundColor: 'white', color: 'black', border: 'none' }}
                    />
                  </Col>
                  <Col md={4}>
                    <div className="d-flex align-items-center h-100">
                      <div className="btn-group w-100">
                        <Button
                          variant={newReview.language === 'en' ? 'primary' : 'outline-primary'}
                          onClick={() => setNewReview({...newReview, language: 'en'})}
                          className="language-btn"
                        >
                          English
                        </Button>
                        <Button
                          variant={newReview.language === 'si' ? 'primary' : 'outline-primary'}
                          onClick={() => setNewReview({...newReview, language: 'si'})}
                          className="language-btn"
                        >
                          සිංහල
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Form.Group className="my-4">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newReview.text}
                    onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                    placeholder={newReview.language === 'si' 
                      ? 'ඔබගේ අදහස් මෙතැන ඇතුලත් කරන්න...' 
                      : 'Write your review here...'}
                    required
                    style={{ 
                      backgroundColor: 'white',
                      color: 'black',
                      border: 'none',
                      fontSize: '1.1rem'
                    }}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className="cursor-pointer"
                        color={index < newReview.rating ? "#ffc107" : "#e4e5e9"}
                        size={28}
                        onClick={() => setNewReview({...newReview, rating: index + 1})}
                      />
                    ))}
                  </div>

                  <Button 
                    variant="primary" 
                    type="submit"
                    className="submit-review-btn"
                  >
                    {newReview.language === 'si' ? 'අදහස් යොමු කරන්න' : 'Submit Review'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </section>
      
      {/* Stats Section */}
      <section className="py-5" style={{ backgroundColor: '#000080', color: 'white' }}>
        <Container>
          <Row className="text-center g-4">
            <Col md={3}>
              <h2 className="fw-bold">5,000+</h2>
              <p className="mb-0">Patients Served</p>
            </Col>
            <Col md={3}>
              <h2 className="fw-bold">50+</h2>
              <p className="mb-0">Specialist Doctors</p>
            </Col>
            <Col md={3}>
              <h2 className="fw-bold">98%</h2>
              <p className="mb-0">Satisfaction Rate</p>
            </Col>
            <Col md={3}>
              <h2 className="fw-bold">24/7</h2>
              <p className="mb-0">Support Available</p>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Latest Health Updates/News Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold" style={{ color: '#000080' }}>Health Updates & Resources</h2>
          <Row className="g-4">
            <Col lg={4} md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <div className="text-center pt-4">
                  <FaNotesMedical style={{ color: '#000080' }} size={60} />
                </div>
                <Card.Body>
                  <div className="mb-2">
                    <Badge bg="primary">Health Tips</Badge>
                  </div>
                  <Card.Title>5 Ways to Boost Your Immune System</Card.Title>
                  <Card.Text>
                    Simple lifestyle changes that can help strengthen your body's natural defenses.
                  </Card.Text>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => toggleArticle('article1')}
                    style={{ borderColor: '#000080', color: '#000080' }}
                  >
                    {expandedArticles.article1 ? 'Show Less' : 'Read More'}
                  </Button>
                  
                  <Collapse in={expandedArticles.article1}>
                    <div className="mt-3">
                      <h5>1. Prioritize Sleep</h5>
                      <p>Aim for 7-8 hours of quality sleep each night. During sleep, your immune system releases proteins called cytokines that help fight infection and inflammation.</p>
                      
                      <h5>2. Eat a Nutrient-Rich Diet</h5>
                      <p>Focus on fruits, vegetables, whole grains, lean protein, and healthy fats. Key nutrients include vitamin C (citrus fruits), vitamin E (nuts and seeds), and zinc (seafood, meat).</p>
                      
                      <h5>3. Stay Physically Active</h5>
                      <p>Regular moderate exercise helps promote good circulation, allowing immune cells to move through your body more efficiently.</p>
                      
                      <h5>4. Manage Stress</h5>
                      <p>Chronic stress suppresses immune function. Incorporate stress-reduction techniques like meditation, deep breathing, or yoga into your daily routine.</p>
                      
                      <h5>5. Stay Hydrated</h5>
                      <p>Proper hydration supports all of your body's functions, including your immune system. Aim for 8-10 glasses of water daily.</p>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <div className="text-center pt-4">
                  <FaNewspaper style={{ color: '#000080' }} size={60} />
                </div>
                <Card.Body>
                  <div className="mb-2">
                    <Badge style={{ backgroundColor: '#000080' }}>Medical News</Badge>
                  </div>
                  <Card.Title>New Telemedicine Features Available</Card.Title>
                  <Card.Text>
                    Learn about our enhanced virtual consultation capabilities for better remote care.
                  </Card.Text>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => toggleArticle('article2')}
                    style={{ borderColor: '#000080', color: '#000080' }}
                  >
                    {expandedArticles.article2 ? 'Show Less' : 'Read More'}
                  </Button>
                  
                  <Collapse in={expandedArticles.article2}>
                    <div className="mt-3">
                      <h5>Advanced Video Consultation</h5>
                      <p>Our upgraded platform now features HD video quality with reduced latency, ensuring clear communication between you and your healthcare provider.</p>
                      
                      <h5>Integrated Vital Monitoring</h5>
                      <p>Connect compatible health devices to share real-time data with your doctor during virtual appointments, including heart rate, blood pressure, and glucose readings.</p>
                      
                      <h5>Secure Document Sharing</h5>
                      <p>Easily and securely share medical documents, test results, and images with your healthcare provider before or during your consultation.</p>
                      
                      <h5>Multi-participant Sessions</h5>
                      <p>Invite family members or additional healthcare providers to join your consultation when needed for more comprehensive care discussions.</p>
                      
                      <h5>How to Access</h5>
                      <p>These features are now available through our mobile app and web platform. Existing patients can access them immediately after updating to the latest version.</p>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={12}>
              <Card className="h-100 border-0 shadow-sm">
                <div className="text-center pt-4">
                  <FaClinicMedical style={{ color: '#000080' }} size={60} />
                </div>
                <Card.Body>
                  <div className="mb-2">
                    <Badge style={{ backgroundColor: '#1a1a1a' }}>Community</Badge>
                  </div>
                  <Card.Title>Upcoming Health Screenings Event</Card.Title>
                  <Card.Text>
                    Join us for free preventive screenings and health consultations next month.
                  </Card.Text>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => toggleArticle('article3')}
                    style={{ borderColor: '#000080', color: '#000080' }}
                  >
                    {expandedArticles.article3 ? 'Show Less' : 'Read More'}
                  </Button>
                  
                  <Collapse in={expandedArticles.article3}>
                    <div className="mt-3">
                      <h5>Event Details</h5>
                      <p><strong>Date:</strong> April 15, 2025<br />
                      <strong>Time:</strong> 9:00 AM - 4:00 PM<br />
                      <strong>Location:</strong> Medinexus Main Center, 123 Healthcare Ave</p>
                      
                      <h5>Free Screenings Available</h5>
                      <ul className="mb-3">
                        <li>Blood pressure checks</li>
                        <li>Cholesterol screening</li>
                        <li>Blood glucose testing</li>
                        <li>BMI assessment</li>
                        <li>Vision screening</li>
                      </ul>
                      
                      <h5>Additional Services</h5>
                      <p>Our healthcare professionals will be available for brief consultations and to answer health-related questions. Nutritionists will provide dietary guidance and personalized recommendations.</p>
                      
                      <h5>Registration</h5>
                      <p>Pre-registration is recommended but not required. To secure your spot, please call (555) 123-4567 or register through our patient portal.</p>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={7} className="mb-4 mb-lg-0">
              <h2 className="fw-bold mb-3" style={{ color: '#000080' }}>Ready to Experience Better Healthcare?</h2>
              <p className="lead mb-4">Schedule your first appointment today and discover how Medinexus can transform your healthcare experience.</p>
              <div className="d-flex flex-wrap gap-2">
                <Link to="/register">
                  <Button 
                    variant="primary" 
                    size="lg"
                    style={{ backgroundColor: '#000080', borderColor: '#000080' }}
                  >
                    Register Now
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    variant="outline-primary" 
                    size="lg"
                    style={{ borderColor: '#000080', color: '#000080' }}
                  >
                    <FaPhoneAlt className="me-2" /> Contact Us
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg={5} className="text-center">
              <div className="p-4 bg-white rounded shadow">
                <FaHandHoldingMedical style={{ color: '#000080' }} size={120} />
                <h4 className="mt-3">Compassionate Care</h4>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Insurance Partners */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold" style={{ color: '#000080' }}>Our Insurance Partners</h2>
          <Row className="align-items-center justify-content-center">
            <Col xs={6} md={2} className="text-center mb-4">
              <FaIdCard style={{ color: '#1a1a1a' }} size={50} />
              <p className="mt-2 mb-0">Aetna</p>
            </Col>
            <Col xs={6} md={2} className="text-center mb-4">
              <FaShieldAlt style={{ color: '#1a1a1a' }} size={50} />
              <p className="mt-2 mb-0">Blue Cross</p>
            </Col>
            <Col xs={6} md={2} className="text-center mb-4">
              <FaHandshake style={{ color: '#1a1a1a' }} size={50} />
              <p className="mt-2 mb-0">Cigna</p>
            </Col>
            <Col xs={6} md={2} className="text-center mb-4">
              <FaCreditCard style={{ color: '#1a1a1a' }} size={50} />
              <p className="mt-2 mb-0">UnitedHealth</p>
            </Col>
            <Col xs={6} md={2} className="text-center mb-4">
              <FaBriefcaseMedical style={{ color: '#1a1a1a' }} size={50} />
              <p className="mt-2 mb-0">Humana</p>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Download Mobile App Section */}
      <section className="py-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h2 className="fw-bold mb-3" style={{ color: '#000080' }}>Download Our Mobile App</h2>
              <p className="mb-4">Get instant access to your medical records, schedule appointments, and connect with healthcare providers from your smartphone.</p>
              <div className="d-flex gap-3">
                <Button variant="dark" className="d-flex align-items-center">
                  <i className="bi bi-apple me-2"></i>
                  <div>
                    <small>Download on the</small>
                    <div className="fw-bold">App Store</div>
                  </div>
                </Button>
                <Button variant="dark" className="d-flex align-items-center">
                  <i className="bi bi-google-play me-2"></i>
                  <div>
                    <small>Get it on</small>
                    <div className="fw-bold">Google Play</div>
                  </div>
                </Button>
              </div>
            </Col>
            <Col md={6} className="text-center">
              <div className="d-inline-block position-relative">
                <div className="rounded-circle p-4 d-inline-block" style={{ backgroundColor: '#000080' }}>
                  <FaMedkit className="text-white" size={100} />
                </div>
                <div className="position-absolute" style={{ bottom: '-20px', right: '-20px' }}>
                  <div className="bg-dark rounded-circle p-3">
                    <FaStethoscope className="text-white" size={40} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;