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
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("LOGIN CLICKED", email, password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("LOGIN SUCCESS", userCredential.user);

      document.getElementById("status").innerText = "Logged in!";

      window.location.href = "dashboard.html";
    })
    .catch((err) => {
      console.log("LOGIN ERROR:", err.message);
      document.getElementById("status").innerText = err.message;
    });
};
