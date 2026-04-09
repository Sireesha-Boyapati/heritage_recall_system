console.log("APP JS LOADED");

const API_URL = "http://localhost:3000";

function loadDashboard() {
  fetch(`${API_URL}/batches`)
    .then((res) => res.json())
    .then((data) => {
    
      const total = data.length;
      const Recalled = data.filter((b) => b.status === "RECALLED").length;
      const safe = total - Recalled;

      document.getElementById("totalCount").innerText = total;
      document.getElementById("safeCount").innerText = safe;
      document.getElementById("recalledCount").innerText = Recalled;

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
          <input type="checkbox" value="${c.collectionID }">
          Collection ${c.collectionID } (Farmer ${c.farmerId}, Qty ${c.quantity})
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

      //  RELOAD COLLECTIONS 
      loadCollections();
    });
}


async function loadCollections() {

  const colRes = await fetch("http://localhost:3000/collections");
  const collections = await colRes.json();

  const farmerRes = await fetch("http://localhost:3000/farmers");
  const farmers = await farmerRes.json();

  const farmerMap = {};

  farmers.forEach(f => {
    farmerMap[f.id] = f.name;
  });

  const container = document.getElementById("collections");
  container.innerHTML = "";

  collections.forEach(col => {
    const row = document.createElement("tr");

    const farmerName = farmerMap[col.farmerId] || "Unknown";

    row.innerHTML = `
      <td>
        <input type="checkbox" value="${col.collectionID}">
      </td>
      <td>${col.collectionID}</td>
      <td>${col.farmerId}</td>
      <td>${farmerName}</td>
      <td>${col.quantity}</td>
    `;

    container.appendChild(row);
  });
}

function navToDashboard() {
  window.location.href = "dashboard.html";
}

function addBatch() {
  window.location.href = "addBatch.html";
}

// used to set collectionID and load farmers details into the create collection form 
function addCollection() {
  loadFarmers();
  setCollectionID();
}

// load and displays the farmer name and location based on id
function loadFarmers() {
  fetch("http://localhost:3000/farmers")
    .then(res => res.json())
    .then(data => {
      const dropdown = document.getElementById("farmerId");

      dropdown.innerHTML = `<option value="">Select Farmer</option>`;

      data.forEach(farmer => {
        const option = document.createElement("option");
        option.value = farmer.id;
        option.textContent = `${farmer.name} (ID: ${farmer.id})`;
        option.setAttribute("data-name", farmer.name);

        dropdown.appendChild(option);
      });
    });
}

function onFarmerChange() {
  const dropdown = document.getElementById("farmerId");
  const selectedOption = dropdown.options[dropdown.selectedIndex];

  const farmerName = selectedOption.getAttribute("data-name");

  document.getElementById("farmerName").value = farmerName || "";
}

// displays the collections id
function setCollectionID() {
  fetch("http://localhost:3000/collections")
    .then(res => res.json())
    .then(data => {

      let nextID = 1;

      if (data.length > 0) {
        nextID = data[data.length - 1].collectionID + 1;
      }

      document.getElementById("collectionID").value = nextID;
    });
}

function submitCollection(e) {
  e.preventDefault();

  const farmerId = document.getElementById("farmerId").value;
  const quantity = document.getElementById("quantity").value;
  const date = document.getElementById("date").value;

  if (!farmerId) {
    alert("Please select a farmer");
    return;
  }

  if (quantity === "" || quantity < 0) {
    alert("Quantity cannot be empty or negative!");
    return;
  }

  fetch("http://localhost:3000/collections", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      farmerId: parseInt(farmerId),
      quantity: parseFloat(quantity),
      date: date
    })
  })
    .then(res => res.json())
    .then(() => {
      alert("Collection added!");

      setCollectionID();

      document.getElementById("quantity").value = "";
      document.getElementById("date").value = "";
      document.getElementById("farmerName").value = "";
      document.getElementById("farmerId").value = "";
    });
}