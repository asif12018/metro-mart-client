// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.APIKEY,
//   authDomain: import.meta.env.AUTHDOMAIN,
//   projectId: import.meta.env.PROJECTID,
//   storageBucket: import.meta.env.STORAGEBUCKET,
//   messagingSenderId: import.meta.env.MESSAGINGSENDERID,
//   appId: import.meta.env.APPID
// };

const firebaseConfig = {
  apiKey: 'AIzaSyB-y5TxGF_0Q-0ds7Nd5eeOCKSDT3Kzg0M',
  authDomain: 'metro-mart-9b1b2.firebaseapp.com',
  projectId: 'metro-mart-9b1b2',
  storageBucket: 'metro-mart-9b1b2.appspot.com',
  messagingSenderId: '193282521234',
  appId: '1:193282521234:web:7b036d40fb7df264fb8e4b'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;