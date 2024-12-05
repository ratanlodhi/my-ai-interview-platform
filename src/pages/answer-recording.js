// pages/answer-recording.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AnswerRecording() {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setChunks((prev) => [...prev, event.data]);
      }
    };
    recorder.onstop = () => {
      // Handle sending chunks to API
      console.log("Recording stopped", chunks);
    };
    recorder.start();
    setMediaRecorder(recorder);
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaRecorder]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Answer Recording</h1>
      <div className="mt-4">
        {recording ? (
          <button onClick={stopRecording} className="px-4 py-2 bg-red-500 text-white rounded">Stop Recording</button>
        ) : (
          <button onClick={startRecording} className="px-4 py-2 bg-green-500 text-white rounded">Start Recording</button>
        )}
      </div>
      <Link href="/loader">
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">Next</button>
      </Link>
    </div>
  );
}