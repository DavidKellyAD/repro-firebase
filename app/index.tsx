import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

// Firebase config (use your own dummy/test credentials here)
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
};

const app = initializeApp(firebaseConfig);

// This will crash in Expo Go due to missing native module support
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default function App() {
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    // Just show that Firebase Auth is "available"
    if (auth) {
      setStatus('Firebase Auth initialized successfully');
    } else {
      setStatus('Firebase Auth failed');
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{status}</Text>
    </View>
  );
}
