// Initialize Firebase (compat style)
const firebaseConfig = {
  apiKey: "AIzaSyCVkFphFr4NVq8OD1ENGTH-9ANJwTFm-uI",
  authDomain: "markahstemrace.firebaseapp.com",
  projectId: "markahstemrace",
  storageBucket: "markahstemrace.firebasestorage.app",
  messagingSenderId: "976891700750",
  appId: "1:976891700750:web:e84d0fc7114e755fe13e5f"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let groups = Array.from({length: 15}, (_, i) => `Player ${i+1}`);
let scores = Array(15).fill(0);
let isAdmin = false;

document.getElementById("myH1").textContent = `STEMRace: Jejak Maklumat Digital`;
document.getElementById("myP").textContent = `Kumplan dan markah pemain dalam aktiviti STEMRace.`;

function renderTable() {
    for (let i = 1; i <= 15; i++) {
        const groupCell = document.getElementById(`group${i}`);
        const scoreCell = document.getElementById(`score${i}`);
        if (groupCell && scoreCell) {
            if (isAdmin) {
                groupCell.innerHTML = `<input type="text" id="groupInput${i}" value="${groups[i-1]}" style="width:100px;">`;
                scoreCell.innerHTML = `<input type="number" id="scoreInput${i}" value="${scores[i-1]}" style="width:60px;">`;
            } else {
                groupCell.textContent = groups[i-1];
                scoreCell.textContent = scores[i-1];
            }
        }
    }
    // Show/hide Save All button
    let saveAllBtn = document.getElementById("saveAllBtn");
    if (!saveAllBtn) {
        saveAllBtn = document.createElement("button");
        saveAllBtn.id = "saveAllBtn";
        saveAllBtn.textContent = "Save All";
        saveAllBtn.style.margin = "10px";
        saveAllBtn.onclick = saveAll;
        document.querySelector("div").appendChild(saveAllBtn);
    }
    saveAllBtn.style.display = isAdmin ? "inline-block" : "none";
}

function saveAll() {
    for (let i = 1; i <= 15; i++) {
        const groupInput = document.getElementById(`groupInput${i}`);
        const scoreInput = document.getElementById(`scoreInput${i}`);
        if (groupInput) groups[i-1] = groupInput.value;
        if (scoreInput) scores[i-1] = parseInt(scoreInput.value) || 0;
    }
    db.collection("scoreboard").doc("main").set({
        groups: groups,
        scores: scores
    }).then(() => {
        alert("All groups and scores saved!");
    });
}

// Listen for live updates and load on reload
db.collection("scoreboard").doc("main").onSnapshot((doc) => {
    if (doc.exists) {
        const data = doc.data();
        groups = data.groups;
        scores = data.scores;
        renderTable();
    }
});

// Admin login
document.getElementById("adminBtn").onclick = function() {
    const pwd = prompt("Enter admin password:");
    if (pwd === "adminfasipss") { // Change this password as needed
        isAdmin = true;
        renderTable();
        alert("Admin mode enabled.");
    } else {
        alert("Incorrect password.");
    }
};

renderTable();

// This is a comment

/* 
    This
    is 
    a
    comment
*/