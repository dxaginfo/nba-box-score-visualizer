import React, { useState } from 'react';
import { GameDetail, PlayerStats } from '../../types/nba';

interface BoxScoreProps {
  gameDetails: GameDetail;
  playerStats: PlayerStats[];
}

const BoxScore: React.FC<BoxScoreProps> = ({ gameDetails, playerStats }) => {
  const [activeTeam, setActiveTeam] = useState<'home' | 'away'>('home');
  
  const homeTeamStats = playerStats.filter(player => player.teamId === gameDetails.homeTeam.id);
  const awayTeamStats = playerStats.filter(player => player.teamId === gameDetails.awayTeam.id);

  const handleTeamToggle = (team: 'home' | 'away') => {
    setActiveTeam(team);
  };

  return (
    <div>
      <div className="flex mb-6">
        <button
          className={`flex-1 py-3 font-medium ${activeTeam === 'home' ? 'bg-nbaBlue text-white' : 'bg-gray-100 text-gray-700'} rounded-l-lg`}
          onClick={() => handleTeamToggle('home')}
        >
          {gameDetails.homeTeam.name}
        </button>
        <button
          className={`flex-1 py-3 font-medium ${activeTeam === 'away' ? 'bg-nbaRed text-white' : 'bg-gray-100 text-gray-700'} rounded-r-lg`}
          onClick={() => handleTeamToggle('away')}
        >
          {gameDetails.awayTeam.name}
        </button>
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-3">Player</th>
                <th className="px-4 py-3">MIN</th>
                <th className="px-4 py-3">PTS</th>
                <th className="px-4 py-3">REB</th>
                <th className="px-4 py-3">AST</th>
                <th className="px-4 py-3">STL</th>
                <th className="px-4 py-3">BLK</th>
                <th className="px-4 py-3">FG</th>
                <th className="px-4 py-3">3PT</th>
                <th className="px-4 py-3">FT</th>
                <th className="px-4 py-3">TO</th>
                <th className="px-4 py-3">PF</th>
                <th className="px-4 py-3">+/-</th>
              </tr>
            </thead>
            <tbody>
              {(activeTeam === 'home' ? homeTeamStats : awayTeamStats).map((player, index) => (
                <tr 
                  key={player.id} 
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {player.starter && <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>}
                      <span className="font-medium">{player.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">{player.minutes}</td>
                  <td className="px-4 py-3 text-center font-medium">{player.points}</td>
                  <td className="px-4 py-3 text-center">{player.rebounds}</td>
                  <td className="px-4 py-3 text-center">{player.assists}</td>
                  <td className="px-4 py-3 text-center">{player.steals}</td>
                  <td className="px-4 py-3 text-center">{player.blocks}</td>
                  <td className="px-4 py-3 text-center">{player.fieldGoalsMade}-{player.fieldGoalsAttempted}</td>
                  <td className="px-4 py-3 text-center">{player.threePointersMade}-{player.threePointersAttempted}</td>
                  <td className="px-4 py-3 text-center">{player.freeThrowsMade}-{player.freeThrowsAttempted}</td>
                  <td className="px-4 py-3 text-center">{player.turnovers}</td>
                  <td className="px-4 py-3 text-center">{player.fouls}</td>
                  <td className={`px-4 py-3 text-center ${player.plusMinus > 0 ? 'text-green-600' : player.plusMinus < 0 ? 'text-red-600' : ''}`}>
                    {player.plusMinus > 0 ? `+${player.plusMinus}` : player.plusMinus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Team Totals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600 mb-1">Field Goals</p>
            <p className="font-medium">
              {activeTeam === 'home' ? gameDetails.homeTeamStats.fieldGoalsMade : gameDetails.awayTeamStats.fieldGoalsMade}-
              {activeTeam === 'home' ? gameDetails.homeTeamStats.fieldGoalsAttempted : gameDetails.awayTeamStats.fieldGoalsAttempted}
              ({activeTeam === 'home' ? gameDetails.homeTeamStats.fieldGoalPercentage : gameDetails.awayTeamStats.fieldGoalPercentage}%)
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Three Pointers</p>
            <p className="font-medium">
              {activeTeam === 'home' ? gameDetails.homeTeamStats.threePointersMade : gameDetails.awayTeamStats.threePointersMade}-
              {activeTeam === 'home' ? gameDetails.homeTeamStats.threePointersAttempted : gameDetails.awayTeamStats.threePointersAttempted}
              ({activeTeam === 'home' ? gameDetails.homeTeamStats.threePointPercentage : gameDetails.awayTeamStats.threePointPercentage}%)
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Free Throws</p>
            <p className="font-medium">
              {activeTeam === 'home' ? gameDetails.homeTeamStats.freeThrowsMade : gameDetails.awayTeamStats.freeThrowsMade}-
              {activeTeam === 'home' ? gameDetails.homeTeamStats.freeThrowsAttempted : gameDetails.awayTeamStats.freeThrowsAttempted}
              ({activeTeam === 'home' ? gameDetails.homeTeamStats.freeThrowPercentage : gameDetails.awayTeamStats.freeThrowPercentage}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxScore;
