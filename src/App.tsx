import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import GamePage from './components/pages/GamePage';
import PlayerComparisonPage from './components/pages/PlayerComparisonPage';
import TeamComparisonPage from './components/pages/TeamComparisonPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-lightGray">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:gameId" element={<GamePage />} />
            <Route path="/player-comparison" element={<PlayerComparisonPage />} />
            <Route path="/team-comparison" element={<TeamComparisonPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
