export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">🥛 Heritage Recall</h1>
      
      <nav className="space-y-2">
        <a href="#" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
          📊 Dashboard
        </a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
          🔍 Batch Search
        </a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
          📜 Recall History
        </a>
      </nav>
    </div>
  );
}