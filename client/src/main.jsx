import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Pastikan path ini benar
import './index.css'; // Jika Anda menggunakan file CSS tambahan

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
