// pages/instruction.js
import Link from 'next/link';

export default function Instruction() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Instructions</h1>
      <p className="mt-4">Please follow the instructions carefully.</p>
      <Link href="/check-permission">
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">Start</button>
      </Link>
    </div>
  );
}