const API_URL = "http://localhost:3000";

function loadDashboard() {
  fetch(`${API_URL}/batches`)
    .then((res) => res.json())
    .then((data) => {
      // ---- STATS ----
      const total = data.length;
      const blocked = data.filter((b) => b.status === "BLOCKED").length;
      const safe = total - blocked;

      document.getElementById("totalCount").innerText = total;
      document.getElementById("safeCount").innerText = safe;
      document.getElementById("blockedCount").innerText = blocked;

      // ---- RECENT 10 ----
      const recent = data.slice(-10).reverse();

      const table = document.getElementById("recentTable");
      table.innerHTML = "";

      recent.forEach((batch) => {
        const row = document.createElement("tr");

        if (batch.status === "BLOCKED") {
          row.style.color = "red";
        }

        row.innerHTML = `
          <td>${batch.id}</td>
          <td>${batch.collections.join(", ")}</td>
          <td>${batch.status === "BLOCKED"
              ? '<span class="badge blocked-badge">Blocked</span>'
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
