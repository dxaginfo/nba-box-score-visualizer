import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import Dashboard from './components/Dashboard';
import GameDetails from './components/GameDetails';
import PlayerStats from './components/Players/PlayerStats';
import TeamComparison from './components/Teams/TeamComparison';
import { GameProvider } from './contexts/GameContext';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/game/:gameId" element={<GameDetails />} />
              <Route path="/player/:playerId" element={<PlayerStats />} />
              <Route path="/team-comparison/:gameId" element={<TeamComparison />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;