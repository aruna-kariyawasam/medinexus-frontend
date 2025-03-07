import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaCreditCard, FaLock, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';

const PaymentGateway = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Format card number with spaces after every 4 digits
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Handle card number change
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus({
        success: true,
        message: 'Payment processed successfully!'
      });
      
      // Reset form after successful payment
      setTimeout(() => {
        setPaymentStatus(null);
        setCardNumber('');
        setCardName('');
        setExpiryDate('');
        setCvv('');
      }, 3000);
    }, 2000);
  };

  // Detect card type based on first digits
  const getCardType = () => {
    const firstDigit = cardNumber.charAt(0);
    const firstTwoDigits = cardNumber.substring(0, 2);
    
    if (firstDigit === '4') return 'Visa';
    if (['51', '52', '53', '54', '55'].includes(firstTwoDigits)) return 'MasterCard';
    if (firstTwoDigits === '34' || firstTwoDigits === '37') return 'American Express';
    if (firstTwoDigits === '35') return 'JCB';
    if (firstTwoDigits === '30' || firstTwoDigits === '36' || firstTwoDigits === '38') return 'Diners Club';
    
    return '';
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white py-3">
              <h4 className="mb-0 d-flex align-items-center">
                <FaLock className="me-2" /> Secure Payment Gateway
              </h4>
            </Card.Header>
            
            <Card.Body className="p-4">
              {paymentStatus && (
                <Alert variant={paymentStatus.success ? 'success' : 'danger'}>
                  {paymentStatus.message}
                </Alert>
              )}
              
              <div className="mb-4">
                <h5>Payment Amount</h5>
                <h2 className="text-primary">$99.99</h2>
                <p className="text-muted">Premium Package - Annual Subscription</p>
              </div>
              
              <div className="payment-methods mb-4">
                <h5 className="mb-3">Select Payment Method</h5>
                <div className="d-flex gap-3">
                  <Button 
                    variant={paymentMethod === 'card' ? 'primary' : 'outline-secondary'} 
                    className="d-flex align-items-center justify-content-center"
                    onClick={() => setPaymentMethod('card')}
                  >
                    <FaCreditCard className="me-2" /> Credit Card
                  </Button>
                  <Button 
                    variant={paymentMethod === 'paypal' ? 'primary' : 'outline-secondary'} 
                    className="d-flex align-items-center justify-content-center"
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <FaPaypal className="me-2" /> PayPal
                  </Button>
                  <Button 
                    variant={paymentMethod === 'google' ? 'primary' : 'outline-secondary'} 
                    className="d-flex align-items-center justify-content-center"
                    onClick={() => setPaymentMethod('google')}
                  >
                    <FaGooglePay />
                  </Button>
                  <Button 
                    variant={paymentMethod === 'apple' ? 'primary' : 'outline-secondary'} 
                    className="d-flex align-items-center justify-content-center"
                    onClick={() => setPaymentMethod('apple')}
                  >
                    <FaApplePay />
                  </Button>
                </div>
              </div>
              
              {paymentMethod === 'card' ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Card Number</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        required
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        className="border-end-0"
                      />
                      <span className="input-group-text bg-white">
                        {getCardType() ? getCardType() : <FaCreditCard />}
                      </span>
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Name on Card</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </Form.Group>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="MM/YY"
                          required
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          maxLength={5}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="***"
                          required
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          maxLength={4}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <div className="d-grid gap-2 mt-4">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      type="submit"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing...
                        </>
                      ) : (
                        'Pay $99.99'
                      )}
                    </Button>
                  </div>
                  
                  <div className="text-center mt-3">
                    <small className="text-muted d-flex align-items-center justify-content-center">
                      <FaLock className="me-1" /> Your payment information is secure and encrypted
                    </small>
                  </div>
                </Form>
              ) : (
                <div className="alternative-payment">
                  <Alert variant="info">
                    {paymentMethod === 'paypal' && "You'll be redirected to PayPal to complete your payment."}
                    {paymentMethod === 'google' && "You'll be redirected to Google Pay to complete your payment."}
                    {paymentMethod === 'apple' && "You'll be redirected to Apple Pay to complete your payment."}
                  </Alert>
                  
                  <div className="d-grid gap-2 mt-4">
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={handleSubmit}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing...
                        </>
                      ) : (
                        `Continue to ${
                          paymentMethod === 'paypal' ? 'PayPal' : 
                          paymentMethod === 'google' ? 'Google Pay' : 'Apple Pay'
                        }`
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Card.Body>
            
            <Card.Footer className="bg-light py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">
                    <FaLock className="me-1" /> 256-bit SSL Encrypted
                  </small>
                </div>
                <div className="payment-icons">
                  <img src="https://via.placeholder.com/40x25" alt="Visa" className="me-1" />
                  <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="me-1" />
                  <img src="https://via.placeholder.com/40x25" alt="American Express" className="me-1" />
                  <img src="https://via.placeholder.com/40x25" alt="Discover" />
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentGateway;