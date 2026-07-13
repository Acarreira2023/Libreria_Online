import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuracion generica de Firebase.
// Completar los valores correspondientes en .env utilizando el prefijo VITE_.
const env = import.meta.env ?? (typeof process !== 'undefined' ? process.env : {});

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'TU_API_KEY_AQUI',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'TU_AUTH_DOMAIN_AQUI',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'TU_PROJECT_ID_AQUI',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'TU_STORAGE_BUCKET_AQUI',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'TU_MESSAGING_SENDER_ID_AQUI',
  appId: env.VITE_FIREBASE_APP_ID || 'TU_APP_ID_AQUI',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
