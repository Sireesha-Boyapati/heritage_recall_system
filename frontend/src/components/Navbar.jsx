// Top bar with alerts and user profile
export default function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 hover:bg-gray-100 rounded">
          🔔
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            SB
          </div>
          <span className="text-sm font-medium">Sireesha</span>
        </div>
      </div>
    </div>
  );
}