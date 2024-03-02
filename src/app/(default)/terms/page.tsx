import React from 'react';
import Head from 'next/head'; // If you're using Next.js

const TermsOfServicePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Head>
        <title>Terms of Service</title>
      </Head>
      <h1 className="text-3xl font-semibold mb-4">Terms of Service</h1>
      <p className="mb-4">
        Last updated: 3/1/2024
      </p>
      <p className="mb-4">
        Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the "Admitted.fyi" website (the "Service") operated by Admitted.fyi ("us", "we", or "our").
      </p>
      <h2 className="text-2xl font-semibold mb-3">1. Terms</h2>
      <p className="mb-4">
        By accessing the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
      </p>
      <h2 className="text-2xl font-semibold mb-3">2. Use License</h2>
      <p className="mb-4">
        Permission is granted to temporarily download one copy of the materials (information or software) on "Admitted.fyi"'s website for personal, non-commercial transitory viewing only.
      </p>
      {/* Include other sections like "Disclaimer", "Limitations", "Accuracy of materials", etc. */}
      <h2 className="text-2xl font-semibold mb-3">3. Disclaimer</h2>
      <p className="mb-4">
        The materials on Admitted.fyi's website are provided on an 'as is' basis. Admitted.fyi makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      </p>
      <h2 className="text-2xl font-semibold mb-3">4. Limitations</h2>
      <p className="mb-4">
        In no event shall Admitted.fyi or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Admitted.fyi's website, even if Admitted.fyi or a Admitted.fyi authorized representative has been notified orally or in writing of the possibility of such damage.
      </p>
      <h2 className="text-2xl font-semibold mb-3">5. Accuracy of Materials</h2>
      <p className="mb-4">
        The materials appearing on Admitted.fyi's website could include technical, typographical, or photographic errors. Admitted.fyi does not warrant that any of the materials on its website are accurate, complete or current. Admitted.fyi may make changes to the materials contained on its website at any time without notice. However, Admitted.fyi does not make any commitment to update the materials.
      </p>
      {/* Add more sections as necessary */}
      <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us.
      </p>
    </div>
  );
};

export default TermsOfServicePage;
