import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const PrivacyPolicy: FC = () => {
  return (
    <div className="container mt-5 mb-5" style={{ backgroundColor: "#fff9e6", minHeight: "100vh", padding: "2rem" }}>
      <h2 className="mb-4 text-center">Privacy Policy</h2>
      <p className="lead">
        Your privacy matters to us. This Privacy Policy explains what information we collect, uses and how we use it.
      </p>

      <h4 className="mt-4">1. Information We Collect</h4>
      <p>
        We collect information to make NutriWise work better. The types of information we collect include:
      </p>
      <ul>
        <li><strong>Personal Information:</strong>  name, email address, and password provided during registration.</li>
        <li><strong>Usage Data:</strong> such as food you log, recipes you view, and tools you use.</li>
        <li><strong>Device Data:</strong> such as your IP address, browser type, and operating system.</li>
      </ul>

      <h4 className="mt-4">2. How We Use your infrmation</h4>
      <p>
        We use the collected information to:
      </p>
      <ul>
        <li>Maintain our service</li>
        <li>Let you know about updates and changes</li>
        <li>Provide customer support.</li>
        <li>To gather analysis or valuable information so that we can improve our service.</li>
        <li>To monitor the usage of our service.</li>
        <li>To detect, prevent and address technical issues.</li>
        <li>To fulfill any other purpose for which you provide it.</li>
      </ul>

      <h4 className="mt-4">3. Data Retention</h4>
      <p>
        We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy.
        We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example,
        if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements
        and policies.
      </p>

      <h4 className="mt-4">4. Disclosure of Data</h4>
      <p>
        We may disclose your Personal Data in the good faith belief that such action is necessary to:
      </p>
      <ul>
        <li>To comply with a legal obligation.</li>
        <li>To protect and defend the rights or property of NutriWise.</li>
        <li>To prevent or investigate possible wrongdoing in connection with the Service.</li>
        <li>To protect the personal safety of users of the Service or the public.</li>
        <li>To protect against legal liability.</li>
      </ul>

      <h4 className="mt-4">5. Security of Data</h4>
      <p>
        The security of your data is important to us, but remember that no method of transmission over the Internet, or method
        of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data,
        we cannot guarantee its absolute security.
      </p>

      <h4 className="mt-4">6. Your Data Protection Rights</h4>
      <p>
        Depending on your location, you may have the following data protection rights:
      </p>
      <ul>
        <li>The right to access, update or to delete the information we have on you.</li>
        <li>The right of rectification.</li>
        <li>The right to object.</li>
        <li>The right of restriction.</li>
        <li>The right to data portability.</li>
        <li>The right to withdraw consent.</li>
      </ul>

      <h4 className="mt-4">7. Links to Other Sites</h4>
      <p>
        Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will
        be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
      </p>

      <h4 className="mt-4">8. Changes to Privacy Policy</h4>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy
        on this page.
      </p>

      <h4 className="mt-4">9. Need help?</h4>
      <p>
        Contact us at privacy@nutriwise.com
      </p>

      <div className="text-center mt-5">
        <Link to="/register" className="btn btn-warning">
          Back to Register
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
