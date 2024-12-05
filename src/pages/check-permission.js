// pages/check-permission.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CheckPermission() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setPermissionGranted(true);
    } catch (error) {
      console.error("Permission denied", error);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Check Permissions</h1>
      {permissionGranted ? (
        <Link href="/question">
          <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded">Proceed to Questions</button>
        </Link>
      ) : (
        <p className="mt-4">Waiting for permissions...</p>
      )}
    </div>
  );
}