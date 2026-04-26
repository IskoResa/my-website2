import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyArtxIcDqSn1ZyKr6EVV3PCZen6EeakeSI",
  authDomain: "my-website-4375a.firebaseapp.com",
  projectId: "my-website-4375a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// TIMER LOGIC
let startTime = null;
let timerInterval = null;

// START BUTTON
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

// END BUTTON
let endTime = null;

document.getElementById("endBtn").addEventListener("click", () => {
  endTime = new Date();
  clearInterval(timerInterval);
});

// SUBMIT DATA
document.getElementById("submitBtn").addEventListener("click", async () => {

  const recordID = crypto.randomUUID(); // UNIQUE ID
  const customer = document.getElementById("customer").value;
  const channel = document.getElementById("channel").value;
  const queryType = document.getElementById("queryType").value;
  const remarks = document.getElementById("remarks").value;

  const handlingTime =
    endTime && startTime ? (endTime - startTime) / 1000 : null;

  const user = auth.currentUser;

  try {
    await addDoc(collection(db, "transactions"), {
      recordID: recordID,
      userEmail: user?.email || "unknown",
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
