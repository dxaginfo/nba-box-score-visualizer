import React, { useState } from 'react';
import { GameData, PlayerData } from '../../interfaces/GameInterfaces';

interface BoxScoreProps {
  game: GameData;
}

const BoxScore: React.FC<BoxScoreProps> = ({ game }) => {
  const [activeTeam, setActiveTeam] = useState<'home' | 'away'>('away');

  const renderPlayerRow = (player: PlayerData) => (
    <tr key={player.id} className="border-b hover:bg-gray-50">
      <td className="py-3 px-4">
        <div className="flex items-center">
          <span className="font-medium">{player.name}</span>
          {player.isStarter && <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-1 rounded">S</span>}
        </div>
        <div className="text-xs text-gray-500">{player.position} #{player.jersey}</div>
      </td>
      <td className="py-3 px-4 text-center">{player.stats.minutes}</td>
      <td className="py-3 px-4 text-center font-medium">{player.stats.points}</td>
      <td className="py-3 px-4 text-center">{player.stats.fieldGoals.made}-{player.stats.fieldGoals.attempted}</td>
      <td className="py-3 px-4 text-center">{player.stats.threePointers.made}-{player.stats.threePointers.attempted}</td>
      <td className="py-3 px-4 text-center">{player.stats.freeThrows.made}-{player.stats.freeThrows.attempted}</td>
      <td className="py-3 px-4 text-center">{player.stats.rebounds}</td>
      <td className="py-3 px-4 text-center">{player.stats.assists}</td>
      <td className="py-3 px-4 text-center">{player.stats.steals}</td>
      <td className="py-3 px-4 text-center">{player.stats.blocks}</td>
      <td className="py-3 px-4 text-center">{player.stats.turnovers}</td>
      <td className="py-3 px-4 text-center">{player.stats.fouls}</td>
      <td className="py-3 px-4 text-center">
        <span className={`${player.stats.plusMinus > 0 ? 'text-green-600' : player.stats.plusMinus < 0 ? 'text-red-600' : ''}`}>
          {player.stats.plusMinus > 0 ? `+${player.stats.plusMinus}` : player.stats.plusMinus}
        </span>
      </td>
    </tr>
  );

  const currentTeam = activeTeam === 'home' ? game.homeTeam : game.awayTeam;
  const sortedPlayers = [...currentTeam.players].sort((a, b) => {
    // Sort by starter status first
    if (a.isStarter && !b.isStarter) return -1;
    if (!a.isStarter && b.isStarter) return 1;
    
    // Then by points scored
    return b.stats.points - a.stats.points;
  });

  return (
    <div>
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 font-medium ${activeTeam === 'away' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTeam('away')}
        >
          {game.awayTeam.name}
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTeam === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTeam('home')}
        >
          {game.homeTeam.name}
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left">Player</th>
              <th className="py-3 px-4 text-center">MIN</th>
              <th className="py-3 px-4 text-center">PTS</th>
              <th className="py-3 px-4 text-center">FG</th>
              <th className="py-3 px-4 text-center">3PT</th>
              <th className="py-3 px-4 text-center">FT</th>
              <th className="py-3 px-4 text-center">REB</th>
              <th className="py-3 px-4 text-center">AST</th>
              <th className="py-3 px-4 text-center">STL</th>
              <th className="py-3 px-4 text-center">BLK</th>
              <th className="py-3 px-4 text-center">TO</th>
              <th className="py-3 px-4 text-center">PF</th>
              <th className="py-3 px-4 text-center">+/-</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map(renderPlayerRow)}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-medium">
              <td className="py-3 px-4">Totals</td>
              <td className="py-3 px-4 text-center">240:00</td>
              <td className="py-3 px-4 text-center">{currentTeam.score}</td>
              <td className="py-3 px-4 text-center">{currentTeam.stats.fieldGoals.made}-{currentTeam.stats.fieldGoals.attempted}</td>
              <td className="py-3 px-4 text-center">{currentTeam.stats.threePointers.made}-{currentTeam.stats.threePointers.attempted}</td>
              <td className="py-3 px-4 text-center">{currentTeam.stats.freeThrows.made}-{currentTeam.stats.freeThrows.attempted}</td>
              <td className="py-3 px-4 text-center">{currentTeam.stats.rebounds.total}</td>
              <td className="py-3 px-4 text-center">{currentTeam.stats.assists}</td>
              <td className="py-3 px-4 text-center">{currentTeam.stats.steals}</td>
              <td className="py-3 px-4 text-center">{currentTeam.stats.blocks}</td>
              <td className="py-3 px-4 text-center">{currentTeam.stats.turnovers}</td>
              <td className="py-3 px-4 text-center">{currentTeam.stats.fouls}</td>
              <td className="py-3 px-4 text-center"></td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-gray-700 font-medium mb-2">Shooting</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Field Goals</span>
              <span className="font-medium">{currentTeam.stats.fieldGoals.percentage.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">3 Pointers</span>
              <span className="font-medium">{currentTeam.stats.threePointers.percentage.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Free Throws</span>
              <span className="font-medium">{currentTeam.stats.freeThrows.percentage.toFixed(1)}%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-gray-700 font-medium mb-2">Rebounds</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Offensive</span>
              <span className="font-medium">{currentTeam.stats.rebounds.offensive}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Defensive</span>
              <span className="font-medium">{currentTeam.stats.rebounds.defensive}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total</span>
              <span className="font-medium">{currentTeam.stats.rebounds.total}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-gray-700 font-medium mb-2">Points</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">In Paint</span>
              <span className="font-medium">{currentTeam.stats.points.inPaint}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fast Break</span>
              <span className="font-medium">{currentTeam.stats.points.fastBreak}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Second Chance</span>
              <span className="font-medium">{currentTeam.stats.points.secondChance}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-gray-700 font-medium mb-2">Other</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Assists</span>
              <span className="font-medium">{currentTeam.stats.assists}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Steals</span>
              <span className="font-medium">{currentTeam.stats.steals}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Blocks</span>
              <span className="font-medium">{currentTeam.stats.blocks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxScore;