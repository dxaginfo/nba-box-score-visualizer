import React from 'react';
import { GameDetail } from '../../types/nba';

interface GameSummaryProps {
  game: GameDetail;
}

const GameSummary: React.FC<GameSummaryProps> = ({ game }) => {
  // Format date for display
  const gameDate = new Date(game.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Format time for display
  const gameTime = new Date(game.date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white rounded-xl shadow-card p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">{game.homeTeam.name} vs {game.awayTeam.name}</h1>
          <p className="text-gray-600">{gameDate} • {gameTime}</p>
          <p className="text-gray-600">{game.arena}, {game.city}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${game.status === 'Final' ? 'bg-gray-200 text-gray-800' : 'bg-green-100 text-green-800'}`}>
            {game.status}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center py-6">
        <div className="flex flex-col items-center">
          <img 
            src={game.homeTeam.logo || 'https://via.placeholder.com/80'} 
            alt={game.homeTeam.name} 
            className="w-20 h-20 mb-2"
          />
          <span className="text-lg font-medium">{game.homeTeam.name}</span>
          <span className="text-4xl font-bold mt-1">{game.homeTeamScore}</span>
        </div>
        
        <div className="mx-6 md:mx-12">
          <div className="text-2xl font-bold text-gray-400">vs</div>
        </div>
        
        <div className="flex flex-col items-center">
          <img 
            src={game.awayTeam.logo || 'https://via.placeholder.com/80'} 
            alt={game.awayTeam.name} 
            className="w-20 h-20 mb-2"
          />
          <span className="text-lg font-medium">{game.awayTeam.name}</span>
          <span className="text-4xl font-bold mt-1">{game.awayTeamScore}</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-3">Game Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Field Goals</p>
            <div className="flex justify-between">
              <span className="font-medium">{game.homeTeamStats.fieldGoalsMade}-{game.homeTeamStats.fieldGoalsAttempted}</span>
              <span className="font-medium">{game.awayTeamStats.fieldGoalsMade}-{game.awayTeamStats.fieldGoalsAttempted}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{game.homeTeamStats.fieldGoalPercentage}%</span>
              <span>{game.awayTeamStats.fieldGoalPercentage}%</span>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">3-Pointers</p>
            <div className="flex justify-between">
              <span className="font-medium">{game.homeTeamStats.threePointersMade}-{game.homeTeamStats.threePointersAttempted}</span>
              <span className="font-medium">{game.awayTeamStats.threePointersMade}-{game.awayTeamStats.threePointersAttempted}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{game.homeTeamStats.threePointPercentage}%</span>
              <span>{game.awayTeamStats.threePointPercentage}%</span>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Free Throws</p>
            <div className="flex justify-between">
              <span className="font-medium">{game.homeTeamStats.freeThrowsMade}-{game.homeTeamStats.freeThrowsAttempted}</span>
              <span className="font-medium">{game.awayTeamStats.freeThrowsMade}-{game.awayTeamStats.freeThrowsAttempted}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{game.homeTeamStats.freeThrowPercentage}%</span>
              <span>{game.awayTeamStats.freeThrowPercentage}%</span>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Rebounds</p>
            <div className="flex justify-between">
              <span className="font-medium">{game.homeTeamStats.reboundsTotal}</span>
              <span className="font-medium">{game.awayTeamStats.reboundsTotal}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{game.homeTeamStats.reboundsOffensive} OFF</span>
              <span>{game.awayTeamStats.reboundsOffensive} OFF</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 text-center">
        <p className="text-gray-500 text-sm italic">
          Select a tab below to view detailed box score, shot chart, or team comparison.
        </p>
      </div>
    </div>
  );
};

export default GameSummary;
