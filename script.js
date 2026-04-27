// Import Firebase (correct CDN for browser)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyArtxIcDqSn1ZyKr6EVV3PCZen6EeakeSI",
  authDomain: "my-website-4375a.firebaseapp.com",
  projectId: "my-website-4375a",
  storageBucket: "my-website-4375a.firebasestorage.app",
  messagingSenderId: "1089958353371",
  appId: "1:1089958353371:web:51badc1157b615d1e16ffe",
  measurementId: "G-N9JHWX411H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// LOGIN FUNCTION
function login() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const status = document.getElementById("status");

  const email = emailInput.value;
  const password = passwordInput.value;

  console.log("LOGIN CLICKED:", email);

  if (!email || !password) {
    status.innerText = "Please enter email and password.";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("LOGIN SUCCESS:", userCredential.user);
      status.innerText = "Login successful!";

      // OPTIONAL: redirect if you already have dashboard.html
      // window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.log("LOGIN ERROR:", error.message);
      status.innerText = error.message;
    });
}

// WAIT until HTML is fully loaded (fixes null error)
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", login);
  } else {
    console.error("Login button not found!");
  }
});
