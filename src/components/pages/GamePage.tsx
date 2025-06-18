import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BoxScore from '../visualizations/BoxScore';
import ShotChart from '../visualizations/ShotChart';
import StatComparison from '../visualizations/StatComparison';
import GameSummary from '../visualizations/GameSummary';
import LoadingSpinner from '../ui/LoadingSpinner';
import { fetchGameDetails, fetchGameStats, fetchGameShots } from '../../services/nbaApi';
import { GameDetail, PlayerStats, ShotData } from '../../types/nba';

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [gameDetails, setGameDetails] = useState<GameDetail | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  const [shotData, setShotData] = useState<ShotData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('boxscore');

  useEffect(() => {
    const loadGameData = async () => {
      if (!gameId) return;
      
      setLoading(true);
      try {
        const [details, stats, shots] = await Promise.all([
          fetchGameDetails(gameId),
          fetchGameStats(gameId),
          fetchGameShots(gameId)
        ]);
        
        setGameDetails(details);
        setPlayerStats(stats);
        setShotData(shots);
      } catch (error) {
        console.error('Error fetching game data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGameData();
  }, [gameId]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (!gameDetails) {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <p className="text-xl font-medium mb-2">Game not found</p>
        <p className="text-gray-600">The game you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div>
      <GameSummary game={gameDetails} />

      <div className="my-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'boxscore' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => handleTabChange('boxscore')}
          >
            Box Score
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'shotchart' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => handleTabChange('shotchart')}
          >
            Shot Chart
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'comparison' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => handleTabChange('comparison')}
          >
            Team Comparison
          </button>
        </div>

        <div className="mt-6">
          {activeTab === 'boxscore' && <BoxScore gameDetails={gameDetails} playerStats={playerStats} />}
          {activeTab === 'shotchart' && <ShotChart shotData={shotData} gameDetails={gameDetails} />}
          {activeTab === 'comparison' && <StatComparison gameDetails={gameDetails} />}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
