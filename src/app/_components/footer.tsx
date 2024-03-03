import Link from "next/link";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center justify-center gap-4 text-sm text-secondary p-4">
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/faq" className="hover:underline font-bold">FAQ</Link>
        <Link href="/privacy" className="hover:underline font-bold mr-2">Privacy Policy</Link>
        <Link href="/contact" className="hover:underline font-bold mr-2">Contact Us</Link>
        <Link href="/terms" className="hover:underline font-bold">Terms of Service</Link>
      </div>
      <p>{`Copyright © ${year} Admitted.fyi All rights reserved.`}</p>
    </footer>
  );
};
