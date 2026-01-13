import { HashRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProtocolView from './pages/ProtocolView';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/protocol/:slug" element={<ProtocolView />} />
      </Routes>
    </HashRouter>
  );
}

export default App;