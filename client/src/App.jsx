import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
