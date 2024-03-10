import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Musicians from './Musicians';
import MusicianDetail from './MusicianDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Musicians />} />
          <Route path="/musicians/:id" element={<MusicianDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
