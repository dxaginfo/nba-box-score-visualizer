import React from 'react';
import { Player, PlayerSeasonStats } from '../../types/nba';

interface StatTableProps {
  players: Player[];
  playerStats: Record<string, PlayerSeasonStats>;
}

const StatTable: React.FC<StatTableProps> = ({ players, playerStats }) => {
  // Filter players that have stats
  const playersWithStats = players.filter(player => playerStats[player.id]);
  
  if (playersWithStats.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No player statistics available.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2">Player</th>
            <th className="px-3 py-2">GP</th>
            <th className="px-3 py-2">MIN</th>
            <th className="px-3 py-2">PTS</th>
            <th className="px-3 py-2">REB</th>
            <th className="px-3 py-2">AST</th>
            <th className="px-3 py-2">STL</th>
            <th className="px-3 py-2">BLK</th>
            <th className="px-3 py-2">TO</th>
            <th className="px-3 py-2">FG%</th>
            <th className="px-3 py-2">3P%</th>
            <th className="px-3 py-2">FT%</th>
            <th className="px-3 py-2">PER</th>
          </tr>
        </thead>
        <tbody>
          {playersWithStats.map((player, index) => {
            const stats = playerStats[player.id];
            return (
              <tr key={player.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <img 
                      src={player.image || 'https://via.placeholder.com/30'} 
                      alt={player.name} 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-xs text-gray-500">{player.team}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2 text-center">{stats?.gamesPlayed}</td>
                <td className="px-3 py-2 text-center">{stats?.minutesPerGame.toFixed(1)}</td>
                <td className="px-3 py-2 text-center font-medium">{stats?.points.toFixed(1)}</td>
                <td className="px-3 py-2 text-center">{stats?.rebounds.toFixed(1)}</td>
                <td className="px-3 py-2 text-center">{stats?.assists.toFixed(1)}</td>
                <td className="px-3 py-2 text-center">{stats?.steals.toFixed(1)}</td>
                <td className="px-3 py-2 text-center">{stats?.blocks.toFixed(1)}</td>
                <td className="px-3 py-2 text-center">{stats?.turnovers.toFixed(1)}</td>
                <td className="px-3 py-2 text-center">{stats?.fieldGoalPercentage.toFixed(1)}%</td>
                <td className="px-3 py-2 text-center">{stats?.threePointPercentage.toFixed(1)}%</td>
                <td className="px-3 py-2 text-center">{stats?.freeThrowPercentage.toFixed(1)}%</td>
                <td className="px-3 py-2 text-center">{stats?.playerEfficiencyRating.toFixed(1)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StatTable;
