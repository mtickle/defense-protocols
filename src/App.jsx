import { HashRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProtocolView from './pages/ProtocolView';
import About from './pages/About';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/protocol/:slug" element={<ProtocolView />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}

export default App;