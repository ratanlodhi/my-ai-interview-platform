// pages/question.js
import Link from 'next/link';

export default function Question() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Question</h1>
      <audio controls>
        <source src="/path/to/question-audio.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <Link href="/answer-recording">
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">Record Answer</button>
      </Link>
    </div>
  );
}