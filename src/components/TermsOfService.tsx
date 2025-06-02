import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const TermsOfService: FC = () => {
  return (
    <div className="container mt-5 mb-5" style={{ backgroundColor: "#fff9e6", minHeight: "100vh", padding: "2rem" }}>
      <h2 className="mb-4 text-center">Terms of Service</h2>
      <p className="lead">
        Welcome to NutriWise! By accessing or using our service, you agree to follow these Terms of Service.
        Please take your time to read them carefully.
      </p>

      <h4 className="mt-4">1. Acceptance of Terms</h4>
      <p>
        By using NutriWise , you are confirming that you accept and agree to these Terms of Service.
      </p>

      <h4 className="mt-4">2. What NutriWise Does</h4>
      <p>
       NutriWise helps you to track nutrition, calculate calories, manage food lists, and explore recipes.
       The information we provide is for general information only, not medical advice.
      </p>

      <h4 className="mt-4">3. User Responsibilities</h4>
      <ul>
        <li>Keep your account and password safe.</li>
        <li>Provide accurate information during registration process.</li>
        <li>Dont use NutriWise for anything legal and harmful</li>
      </ul>

      <h4 className="mt-4">4. Privacy Policy</h4>
      <p>
        Our <Link to="/privacy" className="text-decoration-none text-primary">Privacy Policy</Link> explains how we handle your personal data.
      </p>

      <h4 className="mt-4">5. Changes to Terms</h4>
      <p>
       We may update these terms from time to time. By continuing to use NutriWise after updates, you are agreeing to the new updated terms.
      </p>

      <h4 className="mt-4">6. Account suspension</h4>
      <p>
       We have the rights to suspend your account if we detect violations, so make sure to follow the rules and terms.
      </p>

      <h4 className="mt-4">7. Disclaimer of Warranties</h4>
      <p>
        We provide NutriWise “as is” - that means we don’t make any guarantees about its performance.
      </p>

      <h4 className="mt-4">8. Limitation of Liability</h4>
      <p>
        In no event shall NutriWise, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for
        any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits,
        data, use, goodwill, or other intangible losses, resulting from <br /> (i) your access to or use of or inability to access
        or use the service; <br /> (ii) any conduct or content of any third party on the service; <br /> (iii) any content obtained from
        the service; and <br /> (iv) unauthorized access, use or alteration of your transmissions or content, whether based on
        warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of
        the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
      </p>

      <h4 className="mt-4">9. Governing Law</h4>
      <p>
        These terms follow the laws of [Your Country/State], without regard to
        its conflict of law provisions.
      </p>

      <h4 className="mt-4">10. Need help?</h4>
      <p>
        Contact us at support@nutriwise.com
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
