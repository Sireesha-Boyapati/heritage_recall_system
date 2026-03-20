// A reusable card to display a number + label (like "150 Total Batches")
export default function StatCard({ title, value, icon, color }) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
}