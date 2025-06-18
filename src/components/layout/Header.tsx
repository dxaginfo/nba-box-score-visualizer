import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-nbaBlue text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold font-heading flex items-center">
              <span className="mr-2">🏀</span>
              <span>NBA Box Score Visualizer</span>
            </Link>
          </div>
          <nav className="flex space-x-6">
            <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <Link to="/player-comparison" className="hover:text-gray-300 transition-colors">Player Comparison</Link>
            <Link to="/team-comparison" className="hover:text-gray-300 transition-colors">Team Comparison</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
