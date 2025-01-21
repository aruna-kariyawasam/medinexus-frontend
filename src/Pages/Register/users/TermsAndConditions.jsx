import React from "react"
import { Modal, Button, Container } from "react-bootstrap"

const TermsAndConditions = ({ show, handleClose }) => {
  return (
    <>
        <Container style={{ 
          marginTop: 50
         }}>
          <p>
            Welcome to our Pharmacist Registration Service! By using this
            service, you agree to comply with the following terms and
            conditions. Please read these terms carefully before submitting your
            information. If you do not agree with any part of these terms, you
            must refrain from using this service.
          </p>

          <h5>1. Acceptance of Terms</h5>
          <p>
            By accessing and using the Pharmacist Registration Form on our
            platform, you agree to the terms and conditions outlined in this
            document. These terms apply to all users registering as pharmacists
            through our system.
          </p>

          <h5>2. Eligibility</h5>
          <p>
            To use this service, you must meet the following eligibility
            criteria:
            <ul>
              <li>Be at least 18 years old.</li>
              <li>Hold a valid pharmacist license issued by an authorized regulatory body.</li>
              <li>Provide accurate and truthful information during registration.</li>
            </ul>
            By submitting your details, you confirm that you meet these
            requirements.
          </p>

          <h5>3. Accuracy of Information</h5>
          <p>
            You are responsible for ensuring that all the information provided
            during registration is accurate, complete, and up-to-date.
            Submitting false or misleading information may result in the
            rejection of your registration or termination of your account. We
            reserve the right to verify the authenticity of the information
            provided.
          </p>

          <h5>4. Confidentiality of Account</h5>
          <p>
            After registration, you will be provided with an account that
            includes a username and password. It is your responsibility to
            maintain the confidentiality of these credentials. Any activity
            performed under your account will be deemed as your own. Notify us
            immediately in case of unauthorized access or a breach of security.
          </p>

          <h5>5. Use of Personal Data</h5>
          <p>
            The personal and professional information provided during
            registration will be used to verify your credentials and facilitate
            your registration as a pharmacist. We are committed to protecting
            your data under applicable data protection laws. For more
            information, refer to our <a href="#privacy-policy">Privacy Policy</a>.
          </p>

          <h5>6. Document Submission</h5>
          <p>
            You are required to upload valid documents such as your pharmacist
            license and other certifications. These documents will be reviewed
            by our team for verification purposes. Submitted documents must be
            clear and legible. Tampered or fraudulent documents will result in
            immediate disqualification.
          </p>

          <h5>7. Prohibited Activities</h5>
          <p>
            You agree not to engage in any activity that:
            <ul>
              <li>Violates any applicable laws or regulations.</li>
              <li>Involves submitting false or fraudulent information.</li>
              <li>Compromises the security of our system.</li>
            </ul>
          </p>

          <h5>8. Termination of Service</h5>
          <p>
            We reserve the right to terminate or suspend your registration if
            you:
            <ul>
              <li>Violate these terms and conditions.</li>
              <li>Provide false or inaccurate information.</li>
              <li>Fail to comply with our verification requests.</li>
            </ul>
            Termination may be immediate, without prior notice.
          </p>

          <h5>9. Limitation of Liability</h5>
          <p>
            We are not liable for any direct, indirect, incidental, or
            consequential damages arising from the use of this service. This
            includes any loss resulting from technical errors, unauthorized
            access, or misuse of the platform.
          </p>

          <h5>10. Governing Law</h5>
          <p>
            These terms and conditions are governed by the laws of [Your
            Country/Region]. Any disputes arising from the use of this service
            shall be subject to the exclusive jurisdiction of the courts in
            [Your Jurisdiction].
          </p>

          <h5>11. Changes to Terms</h5>
          <p>
            We reserve the right to modify these terms and conditions at any
            time. Changes will be communicated via our platform or email.
            Continued use of the service after changes indicates acceptance of
            the revised terms.
          </p>

          <h5>12. Contact Us</h5>
          <p>
            If you have any questions or concerns about these terms and
            conditions, please contact us at:
            <br />
            <strong>Email:</strong> support@medinexus.com
            <br />
            <strong>Phone:</strong> [Insert Phone Number]
          </p>
        </Container>
    </>
  );
};

export default TermsAndConditions
