import React from 'react';
import Head from 'next/head'; // If you're using Next.js, for setting the page title

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Head>
        <title>Contact Us</title>
      </Head>
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <p className="mb-4">
        If you have any questions, feedback, or would like more information about our services, please don't hesitate to reach out to us. We're here to help and look forward to hearing from you.
      </p>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Email Us</h2>
        <p>
          For general inquiries, please email us at: <a href="mailto:contact@admitted.fyi" className="text-blue-600 hover:underline">info@example.com</a>
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Follow Us</h2>
        <p>
          Stay updated by following us on our social media channels:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li><a href="https://twitter.com/yourhandle" className="text-blue-600 hover:underline">Twitter: @YourHandle</a></li>
          <li><a href="https://reddit.com/yourpage" className="text-blue-600 hover:underline">Reddit: YourPage</a></li>
          {/* Add other social media links as needed */}
        </ul>
      </div>
    </div>
  );
};

export default ContactPage;
