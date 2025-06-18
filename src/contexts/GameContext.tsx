import React, { createContext, useState, useContext, ReactNode } from 'react';
import { GameData, TeamData, PlayerData } from '../interfaces/GameInterfaces';
import { sampleGameData } from '../data/sampleData';

interface GameContextType {
  selectedGame: GameData | null;
  isLoading: boolean;
  error: string | null;
  selectGame: (gameId: string) => void;
  loadGameData: (gameId: string) => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const selectGame = (gameId: string) => {
    // For now, just use the sample data
    setSelectedGame(sampleGameData);
  };

  const loadGameData = async (gameId: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, we'd fetch data from an API here
      // For demonstration, we're using sample data
      setTimeout(() => {
        setSelectedGame(sampleGameData);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load game data');
      setIsLoading(false);
    }
  };

  return (
    <GameContext.Provider value={{ 
      selectedGame, 
      isLoading, 
      error, 
      selectGame, 
      loadGameData 
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};