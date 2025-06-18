import React from 'react';
import { GameDetail } from '../../types/nba';

interface StatComparisonProps {
  gameDetails: GameDetail;
}

const StatComparison: React.FC<StatComparisonProps> = ({ gameDetails }) => {
  const { homeTeam, awayTeam, homeTeamStats, awayTeamStats } = gameDetails;
  
  // Define stat categories to display
  const statCategories = [
    { key: 'fieldGoalPercentage', label: 'FG%' },
    { key: 'threePointPercentage', label: '3PT%' },
    { key: 'freeThrowPercentage', label: 'FT%' },
    { key: 'reboundsTotal', label: 'Rebounds' },
    { key: 'assists', label: 'Assists' },
    { key: 'steals', label: 'Steals' },
    { key: 'blocks', label: 'Blocks' },
    { key: 'turnovers', label: 'Turnovers' },
    { key: 'pointsInPaint', label: 'Points in Paint' },
    { key: 'fastBreakPoints', label: 'Fast Break Points' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <h3 className="text-lg font-semibold mb-6">Team Statistics Comparison</h3>
      
      <div className="space-y-4">
        {statCategories.map((category) => {
          const homeValue = homeTeamStats[category.key as keyof typeof homeTeamStats];
          const awayValue = awayTeamStats[category.key as keyof typeof awayTeamStats];
          
          // For percentage stats, format as percentage
          const isPercentage = category.key.includes('Percentage');
          const formattedHomeValue = isPercentage ? `${homeValue}%` : homeValue;
          const formattedAwayValue = isPercentage ? `${awayValue}%` : awayValue;
          
          // Calculate percentage for bar width
          const total = homeValue + awayValue;
          const homePercentage = total > 0 ? (homeValue / total) * 100 : 50;
          const awayPercentage = total > 0 ? (awayValue / total) * 100 : 50;
          
          return (
            <div key={category.key} className="w-full">
              <div className="flex justify-between mb-1">
                <div className="flex items-center">
                  <span className="inline-block w-8 h-8 mr-2 rounded-full bg-nbaBlue"></span>
                  <span className="font-medium">{formattedHomeValue}</span>
                </div>
                <span className="text-gray-700">{category.label}</span>
                <div className="flex items-center">
                  <span className="font-medium">{formattedAwayValue}</span>
                  <span className="inline-block w-8 h-8 ml-2 rounded-full bg-nbaRed"></span>
                </div>
              </div>
              
              <div className="flex h-4 rounded-full overflow-hidden bg-gray-200">
                <div 
                  className="bg-nbaBlue" 
                  style={{ width: `${homePercentage}%` }}
                ></div>
                <div 
                  className="bg-nbaRed" 
                  style={{ width: `${awayPercentage}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{homeTeam.name}</span>
                <span>{awayTeam.name}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Scoring by Quarter</h4>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-600">
                <th className="py-2"></th>
                <th className="py-2">Q1</th>
                <th className="py-2">Q2</th>
                <th className="py-2">Q3</th>
                <th className="py-2">Q4</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 font-medium">{homeTeam.name}</td>
                {gameDetails.periodScores.map((period, index) => (
                  <td key={index} className="py-2 text-center">{period.homeScore}</td>
                ))}
                <td className="py-2 text-center font-bold">{homeTeamStats.points}</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">{awayTeam.name}</td>
                {gameDetails.periodScores.map((period, index) => (
                  <td key={index} className="py-2 text-center">{period.awayScore}</td>
                ))}
                <td className="py-2 text-center font-bold">{awayTeamStats.points}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Additional Stats</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Fouls</p>
              <div className="flex justify-between">
                <span>{homeTeamStats.foulsPersonal}</span>
                <span>{awayTeamStats.foulsPersonal}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Points Off Turnovers</p>
              <div className="flex justify-between">
                <span>{homeTeamStats.pointsOffTurnovers}</span>
                <span>{awayTeamStats.pointsOffTurnovers}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Second Chance Points</p>
              <div className="flex justify-between">
                <span>{homeTeamStats.pointsSecondChance}</span>
                <span>{awayTeamStats.pointsSecondChance}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Biggest Lead</p>
              <div className="flex justify-between">
                <span>14</span>
                <span>8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatComparison;
