import {
  FaChartBar,
  FaSearch,
  FaHistory,
  FaBell,
  FaBox,
  FaExclamationTriangle,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR - Lighter Gray with Padding */}
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
            href="#"
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
            href="#"
            className="block rounded flex items-center gap-3 hover:bg-gray-600 transition"
            style={{
              padding: "14px 18px",
              marginBottom: "8px",
              textDecoration: "none",
              color: "#486981",
            }}
          >
            <FaSearch size={18} /> Batch Search
          </a>
          <a
            href="#"
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
        {/* NAVBAR - With Padding */}
        <div
          className="bg-white flex justify-between items-center"
          style={{
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            padding: "20px 32px",
          }}
        >
          <h2 className="text-xl font-semibold">Dashboard</h2>
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

        {/* DASHBOARD CONTENT - With More Padding */}
        <main className="flex-1" style={{ padding: "40px" }}>
          <h1
            className="font-bold mb-8"
            style={{ fontSize: "32px", paddingTop: "10px" }}
          >
            Overview
          </h1>

          {/* STAT CARDS - With Gap & Padding */}
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: "16px" }}
          >
            {/* Card 1 - Blue Border */}
            <div
              style={{
                backgroundColor: "white",
                padding: "23px 24px",
                borderRadius: "8px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                borderLeft: "3px solid #3b82f6",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-gray-500 text-sm"
                    style={{ marginBottom: "6px", fontSize: "15px" }}
                  >
                    Total Batches
                  </p>
                  <p
                    className="font-bold"
                    style={{ fontSize: "22px", marginTop: "4px" }}
                  >
                    150
                  </p>
                </div>
                <FaBox size={32} color="#3b82f6" />
              </div>
            </div>

            {/* Card 2 - Red Border */}
            <div
              style={{
                backgroundColor: "white",
                padding: "23px 24px",
                borderRadius: "8px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                borderLeft: "3px solid #ef4444",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-gray-500 text-sm"
                    style={{ marginBottom: "6px", fontSize: "15px" }}
                  >
                    Active Recalls
                  </p>
                  <p
                    className="font-bold"
                    style={{ fontSize: "22px", marginTop: "4px" }}
                  >
                    3
                  </p>
                </div>
                <FaExclamationTriangle size={32} color="#ef4444" />
              </div>
            </div>

            {/* Card 3 - Green Border */}
            <div
              style={{
                backgroundColor: "white",
                padding: "23px 24px",
                borderRadius: "8px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                borderLeft: "3px solid #22c55e",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-gray-500 text-sm"
                    style={{ marginBottom: "6px", fontSize: "15px" }}
                  >
                    Safe Batches
                  </p>
                  <p
                    className="font-bold"
                    style={{ fontSize: "22px", marginTop: "4px" }}
                  >
                    147
                  </p>
                </div>
                <FaCheckCircle size={32} color="#22c55e" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
