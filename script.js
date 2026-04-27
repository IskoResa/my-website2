import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "my-website-4375a.firebaseapp.com",
  projectId: "my-website-4375a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("LOGIN CLICKED", email, password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("LOGIN SUCCESS", userCredential.user);
      document.getElementById("status").innerText = "Logged in!";

      // TEMPORARILY REMOVE THIS IF NO DASHBOARD
      // window.location.href = "dashboard.html";
    })
    .catch((err) => {
      console.log("LOGIN ERROR:", err.message);
      document.getElementById("status").innerText = err.message;
    });
}

document.getElementById("loginBtn").addEventListener("click", login);
