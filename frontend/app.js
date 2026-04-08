console.log("APP JS LOADED");

const API_URL = "http://localhost:3000";

function loadDashboard() {
  fetch(`${API_URL}/batches`)
    .then((res) => res.json())
    .then((data) => {
      // ---- STATS ----
      const total = data.length;
      const Recalled = data.filter((b) => b.status === "RECALLED").length;
      const safe = total - Recalled;

      document.getElementById("totalCount").innerText = total;
      document.getElementById("safeCount").innerText = safe;
      document.getElementById("recalledCount").innerText = Recalled;

      // ---- RECENT 10 ----
      const recent = data.slice(-10).reverse();

      const table = document.getElementById("recentTable");
      table.innerHTML = "";

      recent.forEach((batch) => {
        const row = document.createElement("tr");

        if (batch.status === "RECALLED") {
          row.style.color = "red";
        }

        row.innerHTML = `
          <td>${batch.id}</td>
          <td>${batch.collections.join(", ")}</td>
          <td>${batch.status === "RECALLED"
              ? '<span class="badge recalled-badge">Recalled</span>'
              : '<span class="badge safe-badge">Safe</span>'}
          </td>
        `;

        table.appendChild(row);
      });
    });
}

// Navigation buttons
function goToBatches() {
  window.location.href = "batches.html";
}

function addBatch() {
  alert("We will add batch form next");
}

function logout() {
  window.location.href = "login.html";
}

function loadBatchesPage() {
  fetch("http://localhost:3000/batches")
    .then(res => res.json())
    .then(data => {

      const table = document.getElementById("batchTable");
      table.innerHTML = "";

      data.forEach(batch => {
        const row = document.createElement("tr");

        const statusBadge =
          batch.status === "RECALLED"
            ? '<span class="badge recalled">Recalled</span>'
            : '<span class="badge safe">Safe</span>';

        const recallButton =
          batch.status === "RECALLED"
            ? "Already Recalled"
            : `<button class="recall-btn" onclick="recallBatch(${batch.id})">Recall</button>`;

        row.innerHTML = `
          <td>${batch.id}</td>
          <td>${batch.collections.join(", ")}</td>
          <td>${statusBadge}</td>
          <td>${recallButton}</td>
        `;

        table.appendChild(row);
      });
    });
}

function recallBatch(id) {
  fetch(`http://localhost:3000/batches/recall/${id}`, {
    method: "PUT"
  })
    .then(res => res.json())
    .then(() => {
      alert("Batch Recalled!");
      loadBatchesPage(); // refresh table
    });
}

function goDashboard() {
  window.location.href = "dashboard.html";
}