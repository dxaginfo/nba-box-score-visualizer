import React from 'react';

interface TeamWithStats {
  id: string;
  name: string;
  stats: any | null; // Using any for simplicity, should be TeamStats in a real implementation
}

interface TeamStatTableProps {
  teams: TeamWithStats[];
}

const TeamStatTable: React.FC<TeamStatTableProps> = ({ teams }) => {
  // Filter teams that have stats
  const teamsWithStats = teams.filter(team => team.stats);
  
  if (teamsWithStats.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No team statistics available.
      </div>
    );
  }

  // Stats to display in the table
  const statsToDisplay = [
    { key: 'gamesPlayed', label: 'Games' },
    { key: 'wins', label: 'Wins' },
    { key: 'losses', label: 'Losses' },
    { key: 'pointsPerGame', label: 'PPG' },
    { key: 'reboundsPerGame', label: 'RPG' },
    { key: 'assistsPerGame', label: 'APG' },
    { key: 'stealsPerGame', label: 'SPG' },
    { key: 'blocksPerGame', label: 'BPG' },
    { key: 'turnoversPerGame', label: 'TOPG' },
    { key: 'fieldGoalPercentage', label: 'FG%', isPercentage: true },
    { key: 'threePointPercentage', label: '3P%', isPercentage: true },
    { key: 'freeThrowPercentage', label: 'FT%', isPercentage: true },
    { key: 'offensiveRating', label: 'ORtg' },
    { key: 'defensiveRating', label: 'DRtg' },
    { key: 'pace', label: 'Pace' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2">Team</th>
            {statsToDisplay.map(stat => (
              <th key={stat.key} className="px-3 py-2">{stat.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teamsWithStats.map((team, index) => (
            <tr key={team.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: getTeamColor(index) }}
                  ></div>
                  <span className="font-medium">{team.name}</span>
                </div>
              </td>
              {statsToDisplay.map(stat => {
                const value = team.stats?.[stat.key] || 0;
                return (
                  <td key={stat.key} className="px-3 py-2 text-center">
                    {stat.isPercentage ? `${value.toFixed(1)}%` : value.toFixed(1)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
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

export default TeamStatTable;
