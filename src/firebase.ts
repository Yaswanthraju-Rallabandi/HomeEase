import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

console.log("[v0] Initializing Firebase with config:", firebaseConfig);

try {
  const app = initializeApp(firebaseConfig);
  console.log("[v0] Firebase app initialized");
  export const auth = getAuth(app);
  console.log("[v0] Firebase auth initialized");
  
  const dbOptions: any = {};
  if (firebaseConfig.firestoreDatabaseId) {
    dbOptions.databaseId = firebaseConfig.firestoreDatabaseId;
  }
  export const db = getFirestore(app, dbOptions.databaseId);
  console.log("[v0] Firebase Firestore initialized");
} catch (error) {
  console.error("[v0] Firebase initialization failed:", error);
  throw new Error("Firebase initialization failed: " + (error instanceof Error ? error.message : String(error)));
}
