import React from 'react';
import { TeamStats } from '../../types/nba';

interface TeamWithStats {
  id: string;
  name: string;
  stats: TeamStats | null;
}

interface RadarChartProps {
  teams: TeamWithStats[];
  category: string;
}

const RadarChart: React.FC<RadarChartProps> = ({ teams, category }) => {
  // Define the stats to display based on the selected category
  const getStatsForCategory = (): { key: keyof TeamStats; label: string; }[] => {
    switch (category) {
      case 'offense':
        return [
          { key: 'pointsPerGame', label: 'Points' },
          { key: 'fieldGoalPercentage', label: 'FG%' },
          { key: 'threePointPercentage', label: '3PT%' },
          { key: 'freeThrowPercentage', label: 'FT%' },
          { key: 'assistsPerGame', label: 'Assists' },
        ];
      case 'defense':
        return [
          { key: 'reboundsPerGame', label: 'Rebounds' },
          { key: 'stealsPerGame', label: 'Steals' },
          { key: 'blocksPerGame', label: 'Blocks' },
          { key: 'defensiveRating', label: 'Def Rating' },
        ];
      case 'advanced':
        return [
          { key: 'offensiveRating', label: 'Off Rating' },
          { key: 'defensiveRating', label: 'Def Rating' },
          { key: 'pace', label: 'Pace' },
          { key: 'trueShootingPercentage', label: 'TS%' },
          { key: 'effectiveFieldGoalPercentage', label: 'eFG%' },
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForCategory();
  const teamsWithStats = teams.filter(team => team.stats);

  // Since we can't actually implement D3.js here, we'll create a placeholder
  // In a real implementation, this would be a radar chart using D3 or a chart library
  return (
    <div className="h-full flex flex-col items-center justify-center">
      {teamsWithStats.length > 0 ? (
        <div className="w-full h-full relative">
          {/* This is a placeholder for the radar chart */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 text-lg">
              [Radar Chart Visualization Would Appear Here]
            </div>
          </div>
          
          {/* Team legend */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-6 p-4">
            {teamsWithStats.map((team, index) => (
              <div key={team.id} className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: getTeamColor(index) }}
                ></div>
                <span className="text-sm font-medium">{team.name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-center p-8">
          <p>Select teams to view their statistical comparison.</p>
        </div>
      )}
    </div>
  );
};

// Helper function to get a color for each team
function getTeamColor(index: number): string {
  const colors = [
    '#17408B', // NBA blue
    '#C9082A', // NBA red
    '#006BB6', // Another blue
    '#CE1141', // Another red
    '#552583', // Lakers purple
    '#007A33', // Celtics green
  ];
  
  return colors[index % colors.length];
}

export default RadarChart;
