import React from 'react';

interface TeamWithStats {
  id: string;
  name: string;
  stats: any | null; // Using any for simplicity, should be TeamStats in a real implementation
}

interface BarChartProps {
  teams: TeamWithStats[];
  statKey: string;
  label: string;
}

const BarChart: React.FC<BarChartProps> = ({ teams, statKey, label }) => {
  // Filter out teams without stats
  const teamsWithStats = teams.filter(team => team.stats);
  
  // Find maximum value for the selected stat among all teams
  const maxValue = Math.max(
    ...teamsWithStats.map(team => team.stats?.[statKey] || 0),
    0 // Fallback to 0 if no teams have stats
  );
  
  // Add a 10% buffer to the max value for better visualization
  const chartMaxValue = maxValue * 1.1;

  return (
    <div className="h-60">
      {teamsWithStats.length > 0 ? (
        <div className="h-full flex flex-col">
          <div className="flex-grow flex items-end">
            {teamsWithStats.map((team, index) => {
              const value = team.stats?.[statKey] || 0;
              const barHeight = `${(value / chartMaxValue) * 100}%`;
              
              return (
                <div key={team.id} className="flex flex-col items-center flex-1 px-2">
                  <div className="w-full flex justify-center mb-2">
                    <div className="text-center">
                      <span className="font-medium">{value.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="w-full relative flex-grow flex items-end">
                    <div 
                      className="w-full rounded-t-md" 
                      style={{ 
                        height: barHeight, 
                        backgroundColor: getTeamColor(index)
                      }}
                    ></div>
                  </div>
                  <div className="w-full mt-2 text-center">
                    <span className="text-xs font-medium">{team.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">Select teams to compare their statistics</p>
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

export default BarChart;
