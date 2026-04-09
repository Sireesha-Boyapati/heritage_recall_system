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
          <td>${batch.batchID}</td>
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
    // addCollection
  window.location.href = "addBatch.html";
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
            : `<button class="recall-btn" onclick="recallBatch(${batch.batchID})">Recall</button>`;

        row.innerHTML = `
          <td>${batch.batchID}</td>
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

function createBatch() {
  const input = document.getElementById("collectionsInput").value;

  if (!input) {
    alert("Please enter collection IDs");
    return;
  }

  const collections = input.split(",").map(num => parseInt(num.trim()));

  fetch("http://localhost:3000/batches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ collections: collections })
  })
    .then(res => res.json())
    .then(data => {
      alert("Batch Created Successfully!");
      window.location.href = "dashboard.html";
    });
}

function createCollection() {
  const farmerId = document.getElementById("farmerId").value;
  const quantity = document.getElementById("quantity").value;
  const date = document.getElementById("date").value;

  fetch("http://localhost:3000/collections", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      farmerId: parseInt(farmerId),
      quantity: parseInt(quantity),
      date: date
    })
  })
    .then(res => res.json())
    .then(() => {
      alert("Collection added!");
    });
}

function loadCollectionsForBatch() {
  fetch("http://localhost:3000/collections")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("collectionList");

      data.forEach(c => {
        container.innerHTML += `
          <input type="checkbox" value="${c.id}">
          Collection ${c.id} (Farmer ${c.farmerId}, Qty ${c.quantity})
          <br>
        `;
      });
    });
}

function createBatch() {
  const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");

  const selected = [];

  checkboxes.forEach(cb => {
    selected.push(parseInt(cb.value));
  });

  if (selected.length === 0) {
    alert("Select at least one collection");
    return;
  }

  fetch("http://localhost:3000/batches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      collections: selected
    })
  })
    .then(res => res.json())
    .then(() => {
      alert("Batch created!");
      window.location.href = "dashboard.html";
    });
}

async function loadCollections() {
  const res = await fetch("http://localhost:3000/collections");
  const data = await res.json();

  const container = document.getElementById("collections");
  container.innerHTML = "";

  data.forEach(col => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <input type="checkbox" value="${col.collectionID}">
      </td>
      <td>${col.collectionID}</td>
      <td>${col.farmerId}</td>
      <td>${col.quantity}</td>
    `;

    container.appendChild(row);
  });
}

function navToDashboard() {
  window.location.href = "dashboard.html";
}
