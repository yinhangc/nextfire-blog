import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAiGC7HQmumgMNEFQkISUrWelhIlgUyquw',
  authDomain: 'nextfire-blog-cb855.firebaseapp.com',
  projectId: 'nextfire-blog-cb855',
  storageBucket: 'nextfire-blog-cb855.appspot.com',
  messagingSenderId: '843031565901',
  appId: '1:843031565901:web:579f64c95c9a9c78ba2e04',
};

// Initialize firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
