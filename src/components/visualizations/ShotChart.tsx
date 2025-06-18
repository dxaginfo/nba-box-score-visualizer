import React, { useState } from 'react';
import { ShotData, GameDetail } from '../../types/nba';

interface ShotChartProps {
  shotData: ShotData[];
  gameDetails: GameDetail;
}

const ShotChart: React.FC<ShotChartProps> = ({ shotData, gameDetails }) => {
  const [activeTeam, setActiveTeam] = useState<'home' | 'away'>('home');
  const [activeQuarter, setActiveQuarter] = useState<number | null>(null);
  
  const handleTeamToggle = (team: 'home' | 'away') => {
    setActiveTeam(team);
  };

  const handleQuarterFilter = (quarter: number | null) => {
    setActiveQuarter(quarter);
  };

  // Filter shots based on active team and quarter
  const filteredShots = shotData.filter(shot => {
    const isActiveTeam = activeTeam === 'home' 
      ? shot.teamId === gameDetails.homeTeam.id 
      : shot.teamId === gameDetails.awayTeam.id;
    
    const isActiveQuarter = activeQuarter === null || shot.quarter === activeQuarter;
    
    return isActiveTeam && isActiveQuarter;
  });

  // Calculate shooting percentages
  const madeShots = filteredShots.filter(shot => shot.shotResult === 'made').length;
  const totalShots = filteredShots.length;
  const shootingPercentage = totalShots > 0 ? ((madeShots / totalShots) * 100).toFixed(1) : '0.0';

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
      
      <div className="flex mb-4 space-x-2">
        <button
          className={`px-3 py-1 text-sm font-medium rounded ${activeQuarter === null ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handleQuarterFilter(null)}
        >
          All Quarters
        </button>
        {[1, 2, 3, 4].map(quarter => (
          <button
            key={quarter}
            className={`px-3 py-1 text-sm font-medium rounded ${activeQuarter === quarter ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleQuarterFilter(quarter)}
          >
            Q{quarter}
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {activeTeam === 'home' ? gameDetails.homeTeam.name : gameDetails.awayTeam.name} Shot Chart
          </h3>
          <div className="text-sm">
            <span className="font-medium">{madeShots}/{totalShots}</span> ({shootingPercentage}%)
          </div>
        </div>
        
        <div className="relative w-full" style={{ height: '480px' }}>
          {/* Basketball court background */}
          <div className="absolute inset-0 bg-gray-100 rounded-lg">
            {/* Court markings would go here in a real implementation */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-gray-400"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-24 border-2 border-gray-400 rounded-t-lg"></div>
          </div>
          
          {/* Shot markers */}
          {filteredShots.map((shot, index) => (
            <div
              key={index}
              className={`absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${shot.shotResult === 'made' ? 'bg-green-500' : 'bg-red-500'}`}
              style={{
                left: `${50 + (shot.xCoordinate / 250) * 50}%`,
                top: `${50 + (shot.yCoordinate / 250) * 50}%`,
              }}
              title={`${shot.playerName}: ${shot.shotType} (${shot.shotResult})`}
            ></div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <div className="flex items-center mr-6">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Made</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm">Missed</span>
          </div>
        </div>
      </div>
      
      {filteredShots.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No shot data available for the selected filters.
        </div>
      )}
    </div>
  );
};

export default ShotChart;
