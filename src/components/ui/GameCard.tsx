import React from 'react';
import { Game } from '../../types/nba';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  // In a real implementation, we would have proper date formatting
  const formattedDate = new Date(game.date).toLocaleDateString();
  const isGameOver = game.status === 'Final';

  return (
    <div className="bg-white rounded-xl shadow-card p-6 hover:shadow-elevated transition-shadow">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-500">{formattedDate}</span>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${isGameOver ? 'bg-gray-200 text-gray-700' : 'bg-green-100 text-green-700'}`}>
          {game.status}
        </span>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img 
            src={game.homeTeam.logo || 'https://via.placeholder.com/40'} 
            alt={game.homeTeam.name} 
            className="w-10 h-10 mr-3"
          />
          <div>
            <p className="font-bold">{game.homeTeam.name}</p>
            <p className="text-2xl font-semibold">{game.homeTeamScore}</p>
          </div>
        </div>
        <span className="text-xl font-medium mx-2">vs</span>
        <div className="flex items-center">
          <div className="text-right">
            <p className="font-bold">{game.awayTeam.name}</p>
            <p className="text-2xl font-semibold">{game.awayTeamScore}</p>
          </div>
          <img 
            src={game.awayTeam.logo || 'https://via.placeholder.com/40'} 
            alt={game.awayTeam.name} 
            className="w-10 h-10 ml-3"
          />
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full py-2 text-center text-primary font-medium hover:bg-primary hover:bg-opacity-5 rounded transition-colors">
          View Box Score
        </button>
      </div>
    </div>
  );
};

export default GameCard;
