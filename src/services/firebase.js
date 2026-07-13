import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuración genérica de Firebase.
// Completar los valores correspondientes en el archivo .env utilizando el prefijo VITE_
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'TU_API_KEY_AQUI',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'TU_AUTH_DOMAIN_AQUI',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'TU_PROJECT_ID_AQUI',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'TU_STORAGE_BUCKET_AQUI',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'TU_MESSAGING_SENDER_ID_AQUI',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'TU_APP_ID_AQUI',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios y exportarlos
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
