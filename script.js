// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyArtxIcDqSn1ZyKr6EVV3PCZen6EeakeSI",
  authDomain: "my-website-4375a.firebaseapp.com",
  projectId: "my-website-4375a",
};

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login
window.login = function() {
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");

  if (!emailEl || !passwordEl) {
    document.getElementById("status").innerText = "Missing input fields!";
    return;
  }

  const email = emailEl.value;
  const password = passwordEl.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("status").innerText = "Logged in!";
    })
    .catch(err => {
      document.getElementById("status").innerText = err.message;
    });
};

// Signup
window.signup = function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("status").innerText = "Account created!";
    })
    .catch(err => {
      document.getElementById("status").innerText = err.message;
    });
};
