import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import BoxScore from './BoxScore/BoxScore';
import GameSummary from './BoxScore/GameSummary';
import TeamStats from './Teams/TeamStats';
import QuarterByQuarter from './Charts/QuarterByQuarter';
import ShootingChart from './Charts/ShootingChart';

const GameDetails: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { selectedGame, isLoading, error, loadGameData } = useGame();

  useEffect(() => {
    if (gameId) {
      loadGameData(gameId);
    }
  }, [gameId, loadGameData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!selectedGame) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
        <strong className="font-bold">No data:</strong>
        <span className="block sm:inline"> Game not found</span>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex flex-col items-center mr-8">
              <img 
                src={selectedGame.awayTeam.logoUrl} 
                alt={selectedGame.awayTeam.name} 
                className="w-16 h-16"
              />
              <h2 className="font-bold text-xl mt-2">{selectedGame.awayTeam.abbreviation}</h2>
              <p className="text-3xl font-bold">{selectedGame.awayTeam.score}</p>
            </div>
            
            <div className="text-center mx-4">
              <span className="text-gray-500 text-lg">@</span>
            </div>
            
            <div className="flex flex-col items-center ml-8">
              <img 
                src={selectedGame.homeTeam.logoUrl} 
                alt={selectedGame.homeTeam.name} 
                className="w-16 h-16"
              />
              <h2 className="font-bold text-xl mt-2">{selectedGame.homeTeam.abbreviation}</h2>
              <p className="text-3xl font-bold">{selectedGame.homeTeam.score}</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg">{selectedGame.arena}, {selectedGame.city}</p>
            <p className="text-gray-600">{new Date(selectedGame.date).toLocaleDateString()} - {new Date(selectedGame.date).toLocaleTimeString()}</p>
            <div className="mt-2">
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${selectedGame.status === 'completed' ? 'bg-gray-200 text-gray-800' : 'bg-red-500 text-white'}`}>
                {selectedGame.status === 'completed' ? 'Final' : `Q${selectedGame.period} ${selectedGame.gameClock}`}
              </span>
            </div>
          </div>
        </div>
        
        <GameSummary game={selectedGame} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Quarter by Quarter</h3>
          <QuarterByQuarter game={selectedGame} />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Team Comparison</h3>
          <TeamStats homeTeam={selectedGame.homeTeam} awayTeam={selectedGame.awayTeam} />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">Box Score</h3>
        <BoxScore game={selectedGame} />
      </div>
    </div>
  );
};

export default GameDetails;