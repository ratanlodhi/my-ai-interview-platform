'use client';

import React, { useState, useRef, useEffect } from 'react';

type Question = {
  id: number;
  text: string;
  audioUrl?: string;
};

const questions: Question[] = [
  { id: 1, text: 'Tell us about yourself.', audioUrl: '/audio/question1.mp3' },
  { id: 2, text: 'Why are you interested in this position?', audioUrl: '/audio/question2.mp3' },
  { id: 3, text: 'What is your biggest strength?', audioUrl: '/audio/question3.mp3' },
];

export default function Home() {
  const [step, setStep] = useState<'instructions' | 'permissions' | 'question' | 'recording' | 'loader' | 'completion'>('instructions');
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const checkPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      await navigator.mediaDevices.getDisplayMedia();
      setPermissionsGranted(true);
      setStep('question');
    } catch (error) {
      console.error('Error checking permissions:', error);
      alert('Permission Denied. Please enable camera, mic, and screen sharing.');
    }
  };

  const startRecording = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (isRecording) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      setStep('loader');
    }
  };

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const renderContent = () => {
    switch (step) {
      case 'instructions':
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-purple-400">
            <h1 className="text-3xl font-bold">AI Interview Instructions</h1>
            <ul className="mt-4 text-lg">
              <li>1. Ensure you are in a quiet environment.</li>
              <li>2. Allow access to your camera, microphone, and screen sharing.</li>
              <li>3. Answer questions clearly within the given time.</li>
            </ul>
            <button
              className="px-4 py-2 mt-6 text-white bg-blue-500 rounded"
              onClick={() => setStep('permissions')}
            >
              Start Test
            </button>
          </div>
        );

      case 'permissions':
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-purple-400">
            <h1 className="text-2xl font-bold">Check Permissions</h1>
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
              onClick={checkPermissions}
            >
              Allow Permissions
            </button>
            {permissionsGranted && <p className="mt-4 text-green-500">Permissions Granted!</p>}
          </div>
        );

      case 'question':
        if (currentQuestionIndex >= questions.length) {
          // Handle the case where we've reached the end of the questions
          return <div>Sorry, no more questions!</div>;
        }
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-purple-400">
            <h1 className="text-2xl font-bold">Question {currentQuestionIndex + 1}</h1>
            <p className="mt-4 text-lg">{questions[currentQuestionIndex].text}</p>
            {questions[currentQuestionIndex].audioUrl && (
              <audio ref={audioRef} src={questions[currentQuestionIndex].audioUrl} controls className="mt-4" />
            )}
            <button
              className="px-4 py-2 mt-6 text-white bg-blue-500 rounded"
              onClick={() => setStep('recording')}
            >
              Start Recording Answer
            </button>
          </div>
        );

      case 'recording':
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-purple-400">
            <h1 className="text-2xl font-bold">Record Your Answer</h1>
            <video
              ref={videoRef}
              autoPlay
              className="mt-4 border-2 border-gray-500 rounded"
              style={{ width: '320px', height: '240px' }}
            ></video>
            <div className="flex gap-4 mt-4">
              <button
                className={`px-4 py-2 text-white ${isRecording ? 'bg-red-500' : 'bg-green-500'} rounded`}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
            </div>
          </div>
        );

      case 'loader':
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-purple-400">
            <h1 className="text-2xl font-bold">Processing...</h1>
            <div className="w-10 h-10 mt-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
              onClick={() => setStep('completion')}
            >
              Complete Test
            </button>
          </div>
        );

      case 'completion':
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-purple-400">
            <h1 className="text-3xl font-bold">Test Completed!</h1>
            <p className="mt-4 text-lg">Thank you for participating in the AI Interview.</p>
          </div>
        );

      default:
        return <div>Unknown Step</div>;
    }
  };

  return <>{renderContent()}</>;
}
