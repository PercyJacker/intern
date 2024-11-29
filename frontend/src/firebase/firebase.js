// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, sendSignInLinkToEmail } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDW9r5FsaTAjcQaC48yEf_yDlTNNDdjY2c",
  authDomain: "test2-172a5.firebaseapp.com",
  databaseURL: "https://test2-172a5-default-rtdb.firebaseio.com",
  projectId: "test2-172a5",
  storageBucket: "test2-172a5.appspot.com",
  messagingSenderId: "489578859973",
  appId: "1:489578859973:web:d762f8afc3ddaf689dcfac",
  measurementId: "G-5S2D14B6WP",
};
// sendSignInLinkToEmail(getAuth, email, actionCodeSettings)
//   .then(() => {
//     // The link was successfully sent. Inform the user.
//     // Save the email locally so you don't need to ask the user for it again
//     // if they open the link on the same device.
//     window.localStorage.setItem('emailForSignIn', email);
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ...
//   });
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Debugging
console.log("Firebase Auth Object:", auth);
console.log("Google Auth Provider:", provider);

export { auth, provider };
