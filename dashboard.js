import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "my-website-4375a.firebaseapp.com",
  projectId: "my-website-4375a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;

// 🔐 CHECK LOGIN SESSION
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    console.log("User logged in:", user.email);
  } else {
    // Not logged in → redirect back
    window.location.href = "index.html";
  }
});


// ⏱ TIMER LOGIC
let startTime = null;
let endTime = null;
let timerInterval = null;

// START
document.getElementById("startBtn").addEventListener("click", () => {
  startTime = new Date();

  timerInterval = setInterval(() => {
    let now = new Date();
    let diff = new Date(now - startTime);

    document.getElementById("timer").innerText =
      diff.getUTCHours().toString().padStart(2, "0") + ":" +
      diff.getUTCMinutes().toString().padStart(2, "0") + ":" +
      diff.getUTCSeconds().toString().padStart(2, "0");
  }, 1000);
});

// END
document.getElementById("endBtn").addEventListener("click", () => {
  endTime = new Date();
  clearInterval(timerInterval);
});

// 💾 SUBMIT
document.getElementById("submitBtn").addEventListener("click", async () => {

  if (!startTime || !endTime) {
    document.getElementById("status").innerText = "Please click Start and End first.";
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

    document.getElementById("status").innerText = "Saved successfully!";

  } catch (err) {
    document.getElementById("status").innerText = err.message;
  }
});


// 🔓 OPTIONAL LOGOUT (if you add button later)
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  });
}
