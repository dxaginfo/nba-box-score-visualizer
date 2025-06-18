import React from 'react';
import { GameData } from '../../interfaces/GameInterfaces';

interface GameSummaryProps {
  game: GameData;
}

const GameSummary: React.FC<GameSummaryProps> = ({ game }) => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-gray-600 text-sm">Lead Changes</p>
          <p className="text-2xl font-bold">{game.leadChanges}</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-gray-600 text-sm">Times Tied</p>
          <p className="text-2xl font-bold">{game.timesTied}</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-gray-600 text-sm">Largest Lead</p>
          <p className="text-2xl font-bold">
            {Math.max(
              game.homeTeam.score - game.awayTeam.score,
              game.awayTeam.score - game.homeTeam.score
            )}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-gray-600 text-sm">Total Points</p>
          <p className="text-2xl font-bold">{game.homeTeam.score + game.awayTeam.score}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium text-gray-700 mb-2">Game Officials</h3>
        <div className="flex flex-wrap gap-2">
          {game.officials.map((official, index) => (
            <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {official}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameSummary;