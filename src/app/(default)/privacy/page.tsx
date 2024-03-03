import React from 'react';
import Head from 'next/head'; // Import Head for setting the page title if you're using Next.js

const PrivacyPage = () => {
  return (
    <>
    <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Privacy Policy for Admitted.fyi" />
      </Head>

  <main className="max-w-4xl mx-auto p-4">
  
  <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>
  <p className="mb-2">
    Effective date: 3/1/2024
  </p>
  <p className="mb-4">
    Admitted.fyi ("us", "we", or "our") operates the "Admitted.fyi" website (hereinafter referred to as the "Service").
  </p>
  <p className="mb-4">
    This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
  </p>
  <h2 className="text-2xl font-semibold mb-3">Information Collection And Use</h2>
  <p className="mb-4">
    We collect several different types of information for various purposes to provide and improve our Service to you.
  </p>
  {/* Add more sections as necessary */}
  <h2 className="text-2xl font-semibold mb-3">Types of Data Collected</h2>
  <h3 className="text-xl font-semibold mb-2">Personal Data</h3>
  <p className="mb-4">
    While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally, identifiable information may include, but is not limited to:
  </p>
  <ul className="list-disc pl-6 mb-4">
    <li>Email address</li>
    <li>First name and last name</li>
    <li>Phone number</li>
    <li>Address, State, Province, ZIP/Postal code, City</li>
    <li>Cookies and Usage Data</li>
  </ul>
  {/* Continue listing other types of data collected as necessary */}
  
  {/* Ensure you include sections on how you use the data, how it's shared, user rights, etc. */}
  
  <h2 className="text-2xl font-semibold mb-3">Changes To This Privacy Policy</h2>
  <p className="mb-4">
    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
  </p>
  <p className="mb-4">
    We will let you know via email and/or a prominent notice on our Service, before the change becoming effective and update the "effective date" at the top of this Privacy Policy.
  </p>
  <p className="mb-4">
    You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
  </p>
  <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
  <p>
    If you have any questions about this Privacy Policy, please contact us:
  </p>
  <ul className="list-disc pl-6 mb-4">
    <li>By email: <a href="mailto:contact@admitted.fyi" className="text-blue-600 hover:underline">contact@admitted.fyi</a></li>
  </ul>
</main>
    </>
  );
};

export default PrivacyPage;
