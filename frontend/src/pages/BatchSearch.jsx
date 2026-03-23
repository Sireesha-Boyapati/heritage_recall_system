import { useState } from "react";
import {
  FaChartBar,
  FaSearch,
  FaHistory,
  FaBell,
  FaBox,
  FaShieldAlt,
  FaClipboardList,
} from "react-icons/fa";
import { mockBatches } from "../data/mockData";

export default function BatchSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");

  // Filter batches based on search
  const filteredBatches = mockBatches.filter((batch) => {
    const search = searchTerm.toLowerCase();
    if (searchType === "all") {
      return (
        batch.id.toLowerCase().includes(search) ||
        batch.farmerId.toLowerCase().includes(search) ||
        batch.farmerName.toLowerCase().includes(search) ||
        batch.date.includes(search)
      );
    } else if (searchType === "batchId") {
      return batch.id.toLowerCase().includes(search);
    } else if (searchType === "farmerId") {
      return batch.farmerId.toLowerCase().includes(search);
    } else if (searchType === "date") {
      return batch.date.includes(search);
    }
    return true;
  });

  // Get status color
  const getStatusColor = (status) => {
    return status === "Safe" ? "#22c55e" : "#ef4444";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <div
        className="text-white min-h-screen"
        style={{
          backgroundColor: "#cddaed",
          width: "230px",
          padding: "24px",
        }}
      >
        <h2
          className="text-2xl font-bold mb-8 flex items-center gap-2"
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          <FaShieldAlt size={24} /> Heritage Recall
        </h2>
        <nav className="space-y-3">
          <a
            href="/"
            className="block rounded flex items-center gap-3 hover:bg-gray-600 transition"
            style={{
              padding: "14px 18px",
              marginBottom: "8px",
              textDecoration: "none",
              color: "#486981",
            }}
          >
            <FaChartBar size={18} /> Dashboard
          </a>
          <a
            href="/batch-search"
            className="block rounded flex items-center gap-3 hover:bg-gray-600 transition"
            style={{
              padding: "14px 18px",
              marginBottom: "8px",
              textDecoration: "none",
              color: "#486981",
              backgroundColor: "#b8c9dc",
            }}
          >
            <FaClipboardList size={18} /> Batch Search
          </a>
          <a
            href="/recall-history"
            className="block rounded flex items-center gap-3 hover:bg-gray-600 transition"
            style={{
              padding: "14px 18px",
              marginBottom: "8px",
              textDecoration: "none",
              color: "#486981",
            }}
          >
            <FaHistory size={18} /> Recall History
          </a>
        </nav>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <div
          className="bg-white flex justify-between items-center"
          style={{
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            padding: "20px 32px",
          }}
        >
          <h2 className="text-xl font-semibold">Batch Search</h2>
          <div className="flex items-center space-x-6">
            <button
              className="rounded hover:bg-gray-100 transition"
              style={{ padding: "10px", position: "relative" }}
            >
              <FaBell size={18} />
              <span
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#ef4444",
                  borderRadius: "50%",
                }}
              ></span>
            </button>
            <div className="flex items-center space-x-3">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#173a73",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                SB
              </div>
              <span
                className="text-sm font-medium"
                style={{ paddingRight: "10px" }}
              >
                Sireesha
              </span>
            </div>
          </div>
        </div>

        {/* SEARCH & TABLE CONTENT */}
        <main className="flex-1" style={{ padding: "40px" }}>
          <h1
            className="font-bold mb-8"
            style={{ fontSize: "32px", paddingTop: "10px" }}
          >
            Search Batches
          </h1>

          {/* SEARCH BAR */}
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-end", flexWrap: "nowrap" }}>
              {/* Search Type Dropdown */}
              <div style={{ flex: "0 0 200px" }}>
                <label
                  style={{ display: "block", marginBottom: "6px", color: "#486981", fontSize: "13px", fontWeight: "600" }}
                >
                  Search By
                </label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "#486981",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="all">All Fields</option>
                  <option value="batchId">Batch ID</option>
                  <option value="farmerId">Farmer ID</option>
                  <option value="date">Date</option>
                </select>
              </div>

              {/* Search Input */}
              <div style={{ flex: "1", minWidth: "0" }}>
                <label
                  style={{ display: "block", marginBottom: "6px", color: "#486981", fontSize: "13px", fontWeight: "600" }}
                >
                  Search Term
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter batch ID, farmer ID, or date..."
                    style={{
                      width: "85%",
                      padding: "9px 10px 9px 38px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                      backgroundColor: "white",
                      color: "#486981",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "11px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                      pointerEvents: "none",
                    }}
                  >
                    <FaSearch size={15} />
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div style={{ flex: "0 0 110px" }}>
                <label
                  style={{ display: "block", marginBottom: "6px", color: "#486981", fontSize: "13px", fontWeight: "600", visibility: "Visible" }}
                >
                  Results
                </label>
                <div
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{ fontSize: "22px", color: "#173a73", fontWeight: "bold", lineHeight: "1" }}
                  >
                    {filteredBatches.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DATA TABLE */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f8fafc",
                    borderBottom: "2px solid #e5e7eb",
                  }}
                >
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#486981",
                    }}
                  >
                    Batch ID
                  </th>
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#486981",
                    }}
                  >
                    Farmer ID
                  </th>
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#486981",
                    }}
                  >
                    Farmer Name
                  </th>
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#486981",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#486981",
                    }}
                  >
                    Quantity (L)
                  </th>
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#486981",
                    }}
                  >
                    Quality
                  </th>
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#486981",
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBatches.map((batch, index) => (
                  <tr
                    key={batch.id}
                    style={{
                      borderBottom:
                        index < filteredBatches.length - 1
                          ? "1px solid #e5e7eb"
                          : "none",
                      backgroundColor: index % 2 === 0 ? "white" : "#fafafa",
                    }}
                  >
                    <td
                      style={{
                        padding: "14px 16px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {batch.id}
                    </td>
                    <td
                      style={{ padding: "14px 16px", fontSize: "14px" }}
                    >
                      {batch.farmerId}
                    </td>
                    <td
                      style={{ padding: "14px 16px", fontSize: "14px" }}
                    >
                      {batch.farmerName}
                    </td>
                    <td
                      style={{ padding: "14px 16px", fontSize: "14px" }}
                    >
                      {batch.date}
                    </td>
                    <td
                      style={{ padding: "14px 16px", fontSize: "14px" }}
                    >
                      {batch.quantity}
                    </td>
                    <td
                      style={{ padding: "14px 16px", fontSize: "14px" }}
                    >
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "600",
                          backgroundColor:
                            batch.quality === "A+"
                              ? "#dbeafe"
                              : batch.quality === "A"
                              ? "#e0f2fe"
                              : "#fef3c7",
                          color:
                            batch.quality === "A+"
                              ? "#1e40af"
                              : batch.quality === "A"
                              ? "#0369a1"
                              : "#92400e",
                        }}
                      >
                        {batch.quality}
                      </span>
                    </td>
                    <td
                      style={{ padding: "14px 16px", fontSize: "14px" }}
                    >
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "600",
                          backgroundColor:
                            getStatusColor(batch.status) + "20",
                          color: getStatusColor(batch.status),
                        }}
                      >
                        {batch.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredBatches.length === 0 && (
              <div
                style={{ padding: "60px 20px", textAlign: "center" }}
              >
                <FaBox
                  size={48}
                  color="#9ca3af"
                  style={{ margin: "0 auto 16px" }}
                />
                <p
                  style={{ fontSize: "16px", color: "#486981" }}
                >
                  No batches found matching your search
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}