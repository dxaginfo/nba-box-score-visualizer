import React, { useState, useEffect } from 'react';
import TrendAnalysis from '../visualizations/TrendAnalysis';
import { getPlayerStats, getRecentGames } from '../../services/nbaApi';
import { Player } from '../../types/nba';

const PerformanceTrendsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [selectedStat, setSelectedStat] = useState<string>('points');
  const [timeRange, setTimeRange] = useState<string>('10');
  const [trendData, setTrendData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const stats = [
    { value: 'points', label: 'Points' },
    { value: 'assists', label: 'Assists' },
    { value: 'rebounds', label: 'Rebounds' },
    { value: 'steals', label: 'Steals' },
    { value: 'blocks', label: 'Blocks' },
    { value: 'fgPct', label: 'FG%' },
    { value: 'fg3Pct', label: 'FG3%' },
    { value: 'ftPct', label: 'FT%' },
    { value: 'minutes', label: 'Minutes Played' },
    { value: 'plusMinus', label: 'Plus/Minus' }
  ];

  const playerColors = [
    '#4361EE', '#3A0CA3', '#F72585', '#4CC9F0', '#F77F00', 
    '#7209B7', '#2A9D8F', '#E76F51', '#6A994E', '#386641'
  ];

  // Fetch players data
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // This would normally call an API, but we'll use mock data for now
        const mockPlayers: Player[] = [
          { id: '1', firstName: 'LeBron', lastName: 'James', teamId: '1', teamName: 'Los Angeles Lakers', position: 'SF' },
          { id: '2', firstName: 'Stephen', lastName: 'Curry', teamId: '2', teamName: 'Golden State Warriors', position: 'PG' },
          { id: '3', firstName: 'Giannis', lastName: 'Antetokounmpo', teamId: '3', teamName: 'Milwaukee Bucks', position: 'PF' },
          { id: '4', firstName: 'Kevin', lastName: 'Durant', teamId: '4', teamName: 'Phoenix Suns', position: 'SF' },
          { id: '5', firstName: 'Luka', lastName: 'Dončić', teamId: '5', teamName: 'Dallas Mavericks', position: 'PG' },
          { id: '6', firstName: 'Nikola', lastName: 'Jokić', teamId: '6', teamName: 'Denver Nuggets', position: 'C' },
          { id: '7', firstName: 'Joel', lastName: 'Embiid', teamId: '7', teamName: 'Philadelphia 76ers', position: 'C' },
          { id: '8', firstName: 'Jayson', lastName: 'Tatum', teamId: '8', teamName: 'Boston Celtics', position: 'SF' },
          { id: '9', firstName: 'Ja', lastName: 'Morant', teamId: '9', teamName: 'Memphis Grizzlies', position: 'PG' },
          { id: '10', firstName: 'Devin', lastName: 'Booker', teamId: '4', teamName: 'Phoenix Suns', position: 'SG' },
        ];
        
        setPlayers(mockPlayers);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching players:', error);
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Generate trend data when selection changes
  useEffect(() => {
    if (selectedPlayers.length === 0) {
      setTrendData(null);
      return;
    }

    const generateMockTrendData = () => {
      const dates = [];
      const now = new Date();
      const gameCount = parseInt(timeRange);
      
      // Generate dates for the last X games
      for (let i = gameCount; i > 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - (i * 2)); // Games every 2 days
        dates.push(date.toISOString().split('T')[0]);
      }
      
      // Generate datasets for each selected player
      const datasets = selectedPlayers.map((playerId, index) => {
        const player = players.find(p => p.id === playerId);
        
        if (!player) return null;
        
        // Generate random but slightly trending performance data
        const data = [];
        let baseValue = 0;
        
        // Set base value according to the selected stat
        switch (selectedStat) {
          case 'points':
            baseValue = 20;
            break;
          case 'assists':
            baseValue = 5;
            break;
          case 'rebounds':
            baseValue = 7;
            break;
          case 'steals':
          case 'blocks':
            baseValue = 1;
            break;
          case 'fgPct':
          case 'fg3Pct':
          case 'ftPct':
            baseValue = 0.5;
            break;
          case 'minutes':
            baseValue = 30;
            break;
          case 'plusMinus':
            baseValue = 5;
            break;
          default:
            baseValue = 10;
        }
        
        // Generate slightly trending data
        let trend = Math.random() * 2 - 1; // Random trend between -1 and 1
        let value = baseValue;
        
        for (let i = 0; i < gameCount; i++) {
          // Add some randomness around the trend
          value += trend * 0.2 + (Math.random() * 2 - 1);
          
          // Ensure values make sense for the stat type
          if (selectedStat === 'fgPct' || selectedStat === 'fg3Pct' || selectedStat === 'ftPct') {
            value = Math.max(0.1, Math.min(1.0, value));
            data.push(parseFloat(value.toFixed(3)));
          } else {
            value = Math.max(0, value);
            data.push(parseFloat(value.toFixed(1)));
          }
        }
        
        return {
          label: `${player.firstName} ${player.lastName}`,
          data,
          color: playerColors[index % playerColors.length]
        };
      }).filter(Boolean);
      
      return {
        dates,
        datasets
      };
    };
    
    setTrendData(generateMockTrendData());
  }, [selectedPlayers, selectedStat, timeRange, players]);

  const filteredPlayers = players.filter(player => {
    const fullName = `${player.firstName} ${player.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handlePlayerToggle = (playerId: string) => {
    setSelectedPlayers(prev => {
      if (prev.includes(playerId)) {
        return prev.filter(id => id !== playerId);
      } else {
        // Limit to max 5 players for readability
        if (prev.length >= 5) return prev;
        return [...prev, playerId];
      }
    });
  };

  // Format stat label for display
  const getStatLabel = () => {
    const stat = stats.find(s => s.value === selectedStat);
    return stat ? stat.label : selectedStat;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg font-semibold">Loading player data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Performance Trends Analysis</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Customize Chart</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Statistic
              </label>
              <select
                value={selectedStat}
                onChange={(e) => setSelectedStat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {stats.map(stat => (
                  <option key={stat.value} value={stat.value}>{stat.label}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Range (Games)
              </label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="5">Last 5 Games</option>
                <option value="10">Last 10 Games</option>
                <option value="15">Last 15 Games</option>
                <option value="20">Last 20 Games</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Players
              </label>
              <input
                type="text"
                placeholder="Enter player name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Players (max 5)
              </label>
              <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-md">
                {filteredPlayers.length === 0 ? (
                  <div className="p-4 text-gray-500 text-center">No players found</div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {filteredPlayers.map(player => (
                      <li key={player.id} className="p-3 hover:bg-gray-50">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedPlayers.includes(player.id)}
                            onChange={() => handlePlayerToggle(player.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 block text-sm font-medium text-gray-700">
                            {player.firstName} {player.lastName}
                            <span className="text-xs text-gray-500 ml-1">({player.teamName})</span>
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {selectedPlayers.length}/5 players selected
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {trendData ? (
            <TrendAnalysis 
              data={trendData} 
              title={`${getStatLabel()} Performance Trend - Last ${timeRange} Games`}
              yAxisLabel={getStatLabel()}
              height={500}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 flex justify-center items-center h-96">
              <div className="text-center text-gray-500">
                <p className="text-xl font-semibold mb-2">No Data to Display</p>
                <p>Select at least one player to view performance trends</p>
              </div>
            </div>
          )}
          
          {trendData && (
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Trend Analysis Insights</h3>
              <div className="prose max-w-none">
                <p>
                  This visualization shows the performance trend of selected players in terms of {getStatLabel().toLowerCase()} 
                  over their last {timeRange} games. The chart helps identify consistency, improvement patterns, 
                  or potential slumps in player performance.
                </p>
                <p className="mt-3">
                  <strong>How to use this chart:</strong>
                </p>
                <ul>
                  <li>Compare multiple players to see who has been more consistent</li>
                  <li>Identify players on upward or downward trajectories</li>
                  <li>Use the time range selector to focus on recent performance or longer trends</li>
                  <li>Switch between different statistics to evaluate various aspects of player performance</li>
                </ul>
                <p className="mt-3 text-sm text-gray-500">
                  Note: This visualization uses mock data for demonstration purposes. In a production environment, 
                  it would fetch real NBA statistics from official data sources.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceTrendsPage;