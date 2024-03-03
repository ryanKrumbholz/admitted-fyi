import Head from 'next/head';

export default function FAQ() {
  return (
    <>
      <Head>
        <title>FAQ - Admitted.fyi</title>
        <meta name="description" content="Frequently Asked Questions about Admitted.fyi" />
      </Head>

      <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h1>

        <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Is this project Open Source?</h2>
        <p>No, but I plan on making it OS. I need to take care of some housekeeping first.</p>
        </div>

        <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">My program or school isn't listed. What can I do?</h2>
        <p>
            If your program is missing, let me know! I need the program name, link, school, and degree type, and I can update the DB later.
        </p>
        </div>

        <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Do you support schools outside of the U.S.?</h2>
        <p>Not at this time.</p>
        </div>

        <div>
        <h2 className="text-2xl font-semibold mb-2">How can I verify my submission?</h2>
        <p>
            I am performing manual verifications for the time being. Email a picture of your admission result to 
            <a href="mailto:contact@admitted.fyi" className="text-blue-600 hover:underline"> contact@admitted.fyi</a> 
            with your decision id. Your decision ID can be found by locating your decision and copying the string at the end of the URL.
        </p>
        </div>
      </main>
    </>
  );
}
