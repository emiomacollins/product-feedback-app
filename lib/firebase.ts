// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
	apiKey: 'AIzaSyBLttaqkr1nQ3BsU1g5xZtXyZNkwiO_4iA',
	authDomain: 'feedback-app-b3cdb.firebaseapp.com',
	projectId: 'feedback-app-b3cdb',
	storageBucket: 'feedback-app-b3cdb.appspot.com',
	messagingSenderId: '971000003498',
	appId: '1:971000003498:web:f9ab0f2c1da56121a189d3',
	measurementId: 'G-ZEKP1WRC5S',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// export const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
export const functions = getFunctions(app);
