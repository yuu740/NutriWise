import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const TermsOfService: FC = () => {
  return (
    <div className="container mt-5 mb-5" style={{ backgroundColor: "#fff9e6", minHeight: "100vh", padding: "2rem" }}>
      <h2 className="mb-4 text-center">Terms of Service</h2>
      <p className="lead">
        Welcome to NutriWise! By accessing or using our service, you agree to be bound by these Terms of Service.
        Please read them carefully.
      </p>

      <h4 className="mt-4">1. Acceptance of Terms</h4>
      <p>
        By using the NutriWise application, you signify your acceptance of these terms and conditions. If you do not agree
        to these terms, please do not use our service.
      </p>

      <h4 className="mt-4">2. Description of Service</h4>
      <p>
        NutriWise provides tools for tracking nutrition, calculating calorie intake, managing food lists, and exploring recipes.
        The information provided by NutriWise is for general informational purposes only and does not constitute medical advice.
      </p>

      <h4 className="mt-4">3. User Responsibilities</h4>
      <ul>
        <li>You are responsible for maintaining the confidentiality of your account and password.</li>
        <li>You agree to provide accurate, current, and complete information during the registration process.</li>
        <li>You agree not to use the service for any unlawful or prohibited activities.</li>
      </ul>

      <h4 className="mt-4">4. Privacy Policy</h4>
      <p>
        Your use of NutriWise is also governed by our Privacy Policy, which is incorporated into these Terms by this reference.
        Please review our <Link to="/privacy" className="text-decoration-none text-primary">Privacy Policy</Link> to understand our practices.
      </p>

      <h4 className="mt-4">5. Modifications to Terms</h4>
      <p>
        NutriWise reserves the right to modify or replace these Terms at any time. We will provide notice of any significant
        changes. Your continued use of the service after such changes constitutes your acceptance of the new Terms.
      </p>

      <h4 className="mt-4">6. Termination</h4>
      <p>
        We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability,
        under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
      </p>

      <h4 className="mt-4">7. Disclaimer of Warranties</h4>
      <p>
        The service is provided on an "AS IS" and "AS AVAILABLE" basis. NutriWise makes no warranties, expressed or implied,
        regarding the service.
      </p>

      <h4 className="mt-4">8. Limitation of Liability</h4>
      <p>
        In no event shall NutriWise, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for
        any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits,
        data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access
        or use the service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from
        the service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on
        warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of
        the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
      </p>

      <h4 className="mt-4">9. Governing Law</h4>
      <p>
        These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to
        its conflict of law provisions.
      </p>

      <h4 className="mt-4">10. Contact Us</h4>
      <p>
        If you have any questions about these Terms, please contact us at support@nutriwise.com.
      </p>

      <div className="text-center mt-5">
        <Link to="/register" className="btn btn-warning">
          Back to Register
        </Link>
      </div>
    </div>
  );
};

export default TermsOfService;
