// pages/completion.js
import Link from 'next/link';

export default function Completion() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Test Completed!</h1>
      <p className="mt-4">Thank you for participating.</p>
      <Link href="/">
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">Go to Home</button>
      </Link>
    </div>
  );
}