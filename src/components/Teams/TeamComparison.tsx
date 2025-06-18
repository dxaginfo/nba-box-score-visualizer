import React from 'react';
import { useParams } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext';
import TeamStats from './TeamStats';

const TeamComparison: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { selectedGame, isLoading, error, loadGameData } = useGame();

  React.useEffect(() => {
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

  if (error || !selectedGame) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error || 'Game not found'}</span>
      </div>
    );
  }

  const { homeTeam, awayTeam } = selectedGame;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Team Comparison</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <img 
              src={awayTeam.logoUrl} 
              alt={awayTeam.name} 
              className="w-16 h-16 mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">{awayTeam.name}</h2>
              <p className="text-gray-600">{awayTeam.score} pts</p>
            </div>
          </div>
          
          <div className="text-center">
            <span className="text-2xl font-bold">vs</span>
          </div>
          
          <div className="flex items-center">
            <div className="text-right mr-4">
              <h2 className="text-xl font-bold">{homeTeam.name}</h2>
              <p className="text-gray-600">{homeTeam.score} pts</p>
            </div>
            <img 
              src={homeTeam.logoUrl} 
              alt={homeTeam.name} 
              className="w-16 h-16"
            />
          </div>
        </div>
        
        <TeamStats homeTeam={homeTeam} awayTeam={awayTeam} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Shooting Comparison</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Shooting</th>
                  <th className="py-2 px-4 text-center">{awayTeam.abbreviation}</th>
                  <th className="py-2 px-4 text-center">{homeTeam.abbreviation}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4">Field Goals</td>
                  <td className="py-2 px-4 text-center">{awayTeam.stats.fieldGoals.made}-{awayTeam.stats.fieldGoals.attempted} ({awayTeam.stats.fieldGoals.percentage.toFixed(1)}%)</td>
                  <td className="py-2 px-4 text-center">{homeTeam.stats.fieldGoals.made}-{homeTeam.stats.fieldGoals.attempted} ({homeTeam.stats.fieldGoals.percentage.toFixed(1)}%)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">3-Pointers</td>
                  <td className="py-2 px-4 text-center">{awayTeam.stats.threePointers.made}-{awayTeam.stats.threePointers.attempted} ({awayTeam.stats.threePointers.percentage.toFixed(1)}%)</td>
                  <td className="py-2 px-4 text-center">{homeTeam.stats.threePointers.made}-{homeTeam.stats.threePointers.attempted} ({homeTeam.stats.threePointers.percentage.toFixed(1)}%)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Free Throws</td>
                  <td className="py-2 px-4 text-center">{awayTeam.stats.freeThrows.made}-{awayTeam.stats.freeThrows.attempted} ({awayTeam.stats.freeThrows.percentage.toFixed(1)}%)</td>
                  <td className="py-2 px-4 text-center">{homeTeam.stats.freeThrows.made}-{homeTeam.stats.freeThrows.attempted} ({homeTeam.stats.freeThrows.percentage.toFixed(1)}%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Other Stats</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-center">{awayTeam.abbreviation}</th>
                  <th className="py-2 px-4 text-center">{homeTeam.abbreviation}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4">Rebounds</td>
                  <td className="py-2 px-4 text-center">{awayTeam.stats.rebounds.total} (O: {awayTeam.stats.rebounds.offensive}, D: {awayTeam.stats.rebounds.defensive})</td>
                  <td className="py-2 px-4 text-center">{homeTeam.stats.rebounds.total} (O: {homeTeam.stats.rebounds.offensive}, D: {homeTeam.stats.rebounds.defensive})</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Assists</td>
                  <td className="py-2 px-4 text-center">{awayTeam.stats.assists}</td>
                  <td className="py-2 px-4 text-center">{homeTeam.stats.assists}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Steals</td>
                  <td className="py-2 px-4 text-center">{awayTeam.stats.steals}</td>
                  <td className="py-2 px-4 text-center">{homeTeam.stats.steals}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Blocks</td>
                  <td className="py-2 px-4 text-center">{awayTeam.stats.blocks}</td>
                  <td className="py-2 px-4 text-center">{homeTeam.stats.blocks}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Turnovers</td>
                  <td className="py-2 px-4 text-center">{awayTeam.stats.turnovers}</td>
                  <td className="py-2 px-4 text-center">{homeTeam.stats.turnovers}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Fouls</td>
                  <td className="py-2 px-4 text-center">{awayTeam.stats.fouls}</td>
                  <td className="py-2 px-4 text-center">{homeTeam.stats.fouls}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamComparison;