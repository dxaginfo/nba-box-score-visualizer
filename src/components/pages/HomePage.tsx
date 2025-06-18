import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GameCard from '../ui/GameCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import { fetchGames } from '../../services/nbaApi';
import { Game } from '../../types/nba';

const HomePage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        // In a real implementation, date would be used to fetch games for that date
        const gamesData = await fetchGames();
        setGames(gamesData);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, [date]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div>
      <section className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-darkGray mb-4 md:mb-0">NBA Game Visualizer</h1>
          <div className="flex items-center">
            <label htmlFor="date-picker" className="mr-2 font-medium">Select Date:</label>
            <input
              id="date-picker"
              type="date"
              value={date}
              onChange={handleDateChange}
              className="border rounded-md px-3 py-2"
            />
          </div>
        </div>
        <p className="text-lg text-gray-600 mb-4">
          Select a game below to view detailed box score visualizations and insights.
        </p>
      </section>

      <section>
        <h2 className="section-title">Games</h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Link to={`/game/${game.id}`} key={game.id}>
                <GameCard game={game} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-xl font-medium mb-2">No games found for this date</p>
            <p className="text-gray-600">Try selecting a different date or check back later.</p>
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="section-title">Compare Players and Teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-card p-6 hover:shadow-elevated transition-shadow">
            <h3 className="text-xl font-bold mb-2">Player Comparison</h3>
            <p className="text-gray-600 mb-4">Compare stats between two or more NBA players with interactive visualizations.</p>
            <Link to="/player-comparison" className="btn-primary inline-block">
              Compare Players
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-card p-6 hover:shadow-elevated transition-shadow">
            <h3 className="text-xl font-bold mb-2">Team Comparison</h3>
            <p className="text-gray-600 mb-4">Analyze and compare team performance across different statistical categories.</p>
            <Link to="/team-comparison" className="btn-primary inline-block">
              Compare Teams
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
