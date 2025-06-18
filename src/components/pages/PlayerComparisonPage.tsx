import React, { useState } from 'react';
import PlayerSearchBar from '../ui/PlayerSearchBar';
import ComparisonChart from '../visualizations/ComparisonChart';
import StatTable from '../ui/StatTable';
import { searchPlayers, fetchPlayerStats } from '../../services/nbaApi';
import { Player, PlayerSeasonStats } from '../../types/nba';

const PlayerComparisonPage: React.FC = () => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [playerStats, setPlayerStats] = useState<Record<string, PlayerSeasonStats>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedStat, setSelectedStat] = useState<string>('points');

  const handleAddPlayer = async (player: Player) => {
    if (selectedPlayers.some(p => p.id === player.id)) return;
    
    setLoading(true);
    try {
      const stats = await fetchPlayerStats(player.id);
      setSelectedPlayers([...selectedPlayers, player]);
      setPlayerStats(prev => ({
        ...prev,
        [player.id]: stats
      }));
    } catch (error) {
      console.error('Error fetching player stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePlayer = (playerId: string) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.id !== playerId));
    const updatedStats = { ...playerStats };
    delete updatedStats[playerId];
    setPlayerStats(updatedStats);
  };

  const handleStatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStat(e.target.value);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-darkGray mb-6">Player Comparison</h1>
      
      <div className="bg-white rounded-xl shadow-card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Players to Compare</h2>
        <PlayerSearchBar onPlayerSelect={handleAddPlayer} disabled={selectedPlayers.length >= 4} />
        
        {selectedPlayers.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Selected Players:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedPlayers.map(player => (
                <div key={player.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <span className="mr-2">{player.name}</span>
                  <button 
                    onClick={() => handleRemovePlayer(player.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedPlayers.length > 0 && (
        <>
          <div className="bg-white rounded-xl shadow-card p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Statistical Comparison</h2>
              <div>
                <label htmlFor="stat-select" className="mr-2 font-medium">Select Stat:</label>
                <select
                  id="stat-select"
                  value={selectedStat}
                  onChange={handleStatChange}
                  className="border rounded-md px-3 py-2"
                >
                  <option value="points">Points</option>
                  <option value="rebounds">Rebounds</option>
                  <option value="assists">Assists</option>
                  <option value="steals">Steals</option>
                  <option value="blocks">Blocks</option>
                  <option value="fieldGoalPercentage">FG%</option>
                  <option value="threePointPercentage">3P%</option>
                </select>
              </div>
            </div>
            <ComparisonChart 
              players={selectedPlayers}
              playerStats={playerStats}
              statType={selectedStat}
            />
          </div>

          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-xl font-semibold mb-4">Season Averages</h2>
            <StatTable 
              players={selectedPlayers}
              playerStats={playerStats}
            />
          </div>
        </>
      )}

      {selectedPlayers.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-xl font-medium mb-2">No players selected</p>
          <p className="text-gray-600">Search and select players above to begin comparison.</p>
        </div>
      )}
    </div>
  );
};

export default PlayerComparisonPage;
