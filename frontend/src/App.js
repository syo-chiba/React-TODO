import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateEventPage from './pages/CreateEventPage';
import EditEventPage from './pages/EditEventPage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <a href="/">Home</a>
          <a href="/create">Create Event</a>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateEventPage />} />
          <Route path="/edit/:id" element={<EditEventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
