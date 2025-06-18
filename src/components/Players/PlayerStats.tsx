import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext';
import { PlayerData } from '../../interfaces/GameInterfaces';
import ShootingChart from '../Charts/ShootingChart';

const PlayerStats: React.FC = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const { selectedGame } = useGame();
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [teamName, setTeamName] = useState<string>('');
  const [teamColor, setTeamColor] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');

  useEffect(() => {
    if (!selectedGame || !playerId) return;

    // Find player in home team
    let foundPlayer = selectedGame.homeTeam.players.find(p => p.id === playerId);
    if (foundPlayer) {
      setPlayer(foundPlayer);
      setTeamName(selectedGame.homeTeam.name);
      setTeamColor(selectedGame.homeTeam.primaryColor);
      setGameId(selectedGame.id);
      return;
    }

    // Find player in away team
    foundPlayer = selectedGame.awayTeam.players.find(p => p.id === playerId);
    if (foundPlayer) {
      setPlayer(foundPlayer);
      setTeamName(selectedGame.awayTeam.name);
      setTeamColor(selectedGame.awayTeam.primaryColor);
      setGameId(selectedGame.id);
    }
  }, [selectedGame, playerId]);

  if (!player) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
        <strong className="font-bold">No data:</strong>
        <span className="block sm:inline"> Player not found</span>
      </div>
    );
  }

  return (
    <div>
      <Link to={`/game/${gameId}`} className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to Game
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b" style={{ backgroundColor: teamColor, color: 'white' }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{player.name}</h1>
              <p className="text-xl">{teamName} | #{player.jersey} | {player.position}</p>
            </div>
            <div className="mt-4 md:mt-0 text-center">
              <div className="text-4xl font-bold">{player.stats.points}</div>
              <div className="text-xl">Points</div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{player.stats.rebounds}</div>
              <div className="text-gray-600">Rebounds</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{player.stats.assists}</div>
              <div className="text-gray-600">Assists</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{player.stats.steals}</div>
              <div className="text-gray-600">Steals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{player.stats.blocks}</div>
              <div className="text-gray-600">Blocks</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Shooting Stats</h3>
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 text-left">Shot Type</th>
                    <th className="py-2 px-4 text-center">Made-Att</th>
                    <th className="py-2 px-4 text-center">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">Field Goals</td>
                    <td className="py-2 px-4 text-center">{player.stats.fieldGoals.made}-{player.stats.fieldGoals.attempted}</td>
                    <td className="py-2 px-4 text-center">{player.stats.fieldGoals.percentage.toFixed(1)}%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">3-Pointers</td>
                    <td className="py-2 px-4 text-center">{player.stats.threePointers.made}-{player.stats.threePointers.attempted}</td>
                    <td className="py-2 px-4 text-center">{player.stats.threePointers.percentage.toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Free Throws</td>
                    <td className="py-2 px-4 text-center">{player.stats.freeThrows.made}-{player.stats.freeThrows.attempted}</td>
                    <td className="py-2 px-4 text-center">{player.stats.freeThrows.percentage.toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Game Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold">{player.stats.plusMinus > 0 ? `+${player.stats.plusMinus}` : player.stats.plusMinus}</div>
                  <div className="text-gray-600">Plus/Minus</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold">{player.stats.minutes}</div>
                  <div className="text-gray-600">Minutes Played</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Shot Chart</h3>
              <ShootingChart player={player} />
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Turnovers</span>
                    <span className="font-bold">{player.stats.turnovers}</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fouls</span>
                    <span className="font-bold">{player.stats.fouls}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;