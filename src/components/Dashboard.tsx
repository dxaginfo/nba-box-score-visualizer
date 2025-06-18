import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sampleGameData } from '../data/sampleData';

const Dashboard: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading games data
    const loadGames = () => {
      setTimeout(() => {
        // For demo purposes, create multiple games from the sample data
        const multipleGames = [
          sampleGameData,
          {
            ...sampleGameData,
            id: 'game12346',
            homeTeam: {
              ...sampleGameData.homeTeam,
              name: 'Brooklyn Nets',
              abbreviation: 'BKN',
              logoUrl: 'https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg',
              score: 110
            },
            awayTeam: {
              ...sampleGameData.awayTeam,
              name: 'Philadelphia 76ers',
              abbreviation: 'PHI',
              logoUrl: 'https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg',
              score: 102
            }
          },
          {
            ...sampleGameData,
            id: 'game12347',
            status: 'in-progress',
            gameClock: '3:24',
            period: 3,
            homeTeam: {
              ...sampleGameData.homeTeam,
              name: 'Los Angeles Lakers',
              abbreviation: 'LAL',
              logoUrl: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg',
              score: 78
            },
            awayTeam: {
              ...sampleGameData.awayTeam,
              name: 'Golden State Warriors',
              abbreviation: 'GSW',
              logoUrl: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg',
              score: 76
            }
          }
        ];
        setGames(multipleGames);
        setIsLoading(false);
      }, 1000);
    };

    loadGames();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Today's Games</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link 
            to={`/game/${game.id}`} 
            key={game.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-lg"
          >
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{new Date(game.date).toLocaleDateString()}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${game.status === 'completed' ? 'bg-gray-200 text-gray-800' : 'bg-red-500 text-white'}`}>
                  {game.status === 'completed' ? 'Final' : `Q${game.period} ${game.gameClock}`}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img 
                    src={game.awayTeam.logoUrl} 
                    alt={game.awayTeam.name} 
                    className="w-12 h-12 mr-3"
                  />
                  <div>
                    <p className="font-bold">{game.awayTeam.abbreviation}</p>
                    <p className="text-sm text-gray-600">{game.awayTeam.name}</p>
                  </div>
                </div>
                <div className="font-bold text-2xl">{game.awayTeam.score}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={game.homeTeam.logoUrl} 
                    alt={game.homeTeam.name} 
                    className="w-12 h-12 mr-3"
                  />
                  <div>
                    <p className="font-bold">{game.homeTeam.abbreviation}</p>
                    <p className="text-sm text-gray-600">{game.homeTeam.name}</p>
                  </div>
                </div>
                <div className="font-bold text-2xl">{game.homeTeam.score}</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 text-center">
              <span className="text-blue-600 font-medium">View Box Score</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;