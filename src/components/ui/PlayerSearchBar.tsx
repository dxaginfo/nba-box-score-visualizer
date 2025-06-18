import React, { useState, useEffect } from 'react';
import { searchPlayers } from '../../services/nbaApi';
import { Player } from '../../types/nba';

interface PlayerSearchBarProps {
  onPlayerSelect: (player: Player) => void;
  disabled?: boolean;
}

const PlayerSearchBar: React.FC<PlayerSearchBarProps> = ({ onPlayerSelect, disabled = false }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length >= 2) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchPlayers(searchTerm);
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching players:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePlayerClick = (player: Player) => {
    onPlayerSelect(player);
    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
        <input
          type="text"
          placeholder="Search for a player..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchResults.length > 0 && setShowResults(true)}
          className="flex-grow px-4 py-2 focus:outline-none"
          disabled={disabled}
        />
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-3"></div>
        )}
      </div>
      
      {showResults && searchResults.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg">
          <ul>
            {searchResults.map(player => (
              <li 
                key={player.id} 
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handlePlayerClick(player)}
              >
                <div className="flex items-center">
                  <img 
                    src={player.image || 'https://via.placeholder.com/30'} 
                    alt={player.name} 
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{player.name}</p>
                    <p className="text-xs text-gray-500">{player.team}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {showResults && searchTerm.length >= 2 && searchResults.length === 0 && !loading && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg p-4 text-center">
          <p className="text-gray-500">No players found</p>
        </div>
      )}
    </div>
  );
};

export default PlayerSearchBar;
