// import Dashboard from './pages/Dashboard';

// function App() {
//   return <Dashboard />;
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BatchSearch from './pages/BatchSearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/batch-search" element={<BatchSearch />} />
      </Routes>
    </Router>
  );
}

export default App;