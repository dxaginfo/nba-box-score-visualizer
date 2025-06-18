import React from 'react';
import { Player, PlayerSeasonStats } from '../../types/nba';

interface ComparisonChartProps {
  players: Player[];
  playerStats: Record<string, PlayerSeasonStats>;
  statType: string;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ players, playerStats, statType }) => {
  // Map of stat types to their labels
  const statLabels: Record<string, string> = {
    points: 'Points Per Game',
    rebounds: 'Rebounds Per Game',
    assists: 'Assists Per Game',
    steals: 'Steals Per Game',
    blocks: 'Blocks Per Game',
    fieldGoalPercentage: 'Field Goal %',
    threePointPercentage: '3-Point %',
    freeThrowPercentage: 'Free Throw %',
    playerEfficiencyRating: 'PER',
    usageRate: 'Usage Rate',
    trueShootingPercentage: 'True Shooting %'
  };

  // Get selected players with stats
  const playersWithStats = players.filter(player => playerStats[player.id]);

  // Find maximum value for the selected stat among all players
  const maxValue = Math.max(
    ...playersWithStats.map(player => {
      const stats = playerStats[player.id];
      return stats ? stats[statType as keyof PlayerSeasonStats] as number : 0;
    }),
    0 // Fallback to 0 if no players have stats
  );

  // Add a 10% buffer to the max value for better visualization
  const chartMaxValue = maxValue * 1.1;

  // Team colors for bars
  const colors = ['#17408B', '#C9082A', '#1D428A', '#CE1141', '#006BB6'];

  return (
    <div className="h-80">
      {playersWithStats.length > 0 ? (
        <div className="h-full flex flex-col">
          <h3 className="text-lg font-semibold mb-4">{statLabels[statType] || statType}</h3>
          
          <div className="flex-grow flex items-end">
            {playersWithStats.map((player, index) => {
              const stats = playerStats[player.id];
              const value = stats ? stats[statType as keyof PlayerSeasonStats] as number : 0;
              const barHeight = `${(value / chartMaxValue) * 100}%`;
              
              return (
                <div key={player.id} className="flex flex-col items-center flex-1 px-2">
                  <div className="w-full flex justify-center mb-2">
                    <div className="text-center">
                      <span className="font-medium">{value.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="w-full relative flex-grow flex items-end">
                    <div 
                      className="w-full rounded-t-md" 
                      style={{ height: barHeight, backgroundColor: colors[index % colors.length] }}
                    ></div>
                  </div>
                  <div className="w-full mt-2 text-center">
                    <img 
                      src={player.image || 'https://via.placeholder.com/40'} 
                      alt={player.name} 
                      className="w-8 h-8 rounded-full mx-auto mb-1"
                    />
                    <span className="text-xs font-medium">{player.name.split(' ')[1]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">Select players to compare their statistics</p>
        </div>
      )}
    </div>
  );
};

export default ComparisonChart;
