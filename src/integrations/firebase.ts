// Firebase initialization and export
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBSUNQp9PrtrBwLNH0R_8DUM_msdUwrr08",
  authDomain: "novo-wellness-9b522.firebaseapp.com",
  projectId: "novo-wellness-9b522",
  storageBucket: "novo-wellness-9b522.firebasestorage.app",
  messagingSenderId: "494347442970",
  appId: "1:494347442970:web:4f8ad8b5cc6e6b3c4feaa3",
  measurementId: "G-LQ510H41EF"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to submit feedback
const submitFeedback = async (feedbackData: {
  name: string;
  email: string;
  message: string;
  rating: number;
  pageUrl?: string;
}) => {
  try {
    const feedbackRef = collection(db, 'feedback');
    const docRef = await addDoc(feedbackRef, {
      ...feedbackData,
      createdAt: serverTimestamp(),
      status: 'new',
      userId: auth.currentUser?.uid || 'anonymous',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : null
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting feedback: ", error);
    return { success: false, error };
  }
};

export { app, auth, db, submitFeedback };
