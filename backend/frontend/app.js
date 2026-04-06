const API_URL = "http://localhost:3000";

// Load batches
function loadBatches() {
  fetch(`${API_URL}/batches`)
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("batchTable");
      table.innerHTML = "";

      data.forEach(batch => {
        const row = document.createElement("tr");

        // highlight blocked batches
        if (batch.status === "BLOCKED") {
          row.style.color = "red";
        }

        row.innerHTML = `
          <td>${batch.id}</td>
          <td>${batch.collections.join(", ")}</td>
          <td>${batch.status}</td>
          <td>
            <button onclick="recallBatch(${batch.id})">Recall</button>
          </td>
        `;

        table.appendChild(row);
      });
    });
}

// Recall batch
function recallBatch(id) {
  fetch(`${API_URL}/batches/recall/${id}`, {
    method: "PUT"
  })
  .then(() => {
    alert("Batch Recalled");
    loadBatches();
  });
}