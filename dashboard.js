console.log("dashboard.js loaded");

// ==========================
// 🔥 FIREBASE IMPORTS
// ==========================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";


// ==========================
// 🔧 FIREBASE CONFIG
// ==========================
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "my-website-4375a.firebaseapp.com",
  projectId: "my-website-4375a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// ==========================
// 👤 AUTH STATE
// ==========================
let currentUser = null;
let authReady = false;

onAuthStateChanged(auth, (user) => {

  authReady = true;

  if (user) {
    currentUser = user;
    console.log("User logged in:", user.email);
  } else {
    if (authReady) {
      window.location.href = "index.html";
    }
  }

});

// ==========================
// ⏱ GLOBAL VARIABLES
// ==========================
let startTime = null;
let endTime = null;
let timerInterval = null;


// ==========================
// 🚀 DOM READY (ALL BUTTONS)
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  console.log("DOM loaded");

  // --------------------------
  // START TIMER
  // --------------------------
  const startBtn = document.getElementById("startBtn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      startTime = new Date();

      timerInterval = setInterval(() => {
        const now = new Date();
        const diff = new Date(now - startTime);

        document.getElementById("timer").innerText =
          String(diff.getUTCHours()).padStart(2, "0") + ":" +
          String(diff.getUTCMinutes()).padStart(2, "0") + ":" +
          String(diff.getUTCSeconds()).padStart(2, "0");
      }, 1000);
    });
  }


  // --------------------------
  // END TIMER
  // --------------------------
  const endBtn = document.getElementById("endBtn");
  if (endBtn) {
    endBtn.addEventListener("click", () => {
      endTime = new Date();
      clearInterval(timerInterval);
    });
  }


  // --------------------------
  // SUBMIT DATA
  // --------------------------
  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {

      if (!startTime || !endTime) {
        document.getElementById("status").innerText =
          "Please click Start and End first.";
        return;
      }

      const recordID = crypto.randomUUID();
      const customer = document.getElementById("customer").value;
      const channel = document.getElementById("channel").value;
      const queryType = document.getElementById("queryType").value;
      const remarks = document.getElementById("remarks").value;

      const handlingTime = (endTime - startTime) / 1000;

      try {
        await addDoc(collection(db, "transactions"), {
          recordID,
          userEmail: currentUser.email,
          date: new Date().toISOString(),
          startTime,
          endTime,
          handlingTimeInSeconds: handlingTime,
          customer,
          channel,
          queryType,
          remarks
        });

        document.getElementById("status").innerText =
          "Saved successfully!";

      } catch (err) {
        document.getElementById("status").innerText = err.message;
      }
    });
  }


  // --------------------------
  // LOGOUT
  // --------------------------
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth).then(() => {
        window.location.href = "index.html";
      });
    });
  }

});
