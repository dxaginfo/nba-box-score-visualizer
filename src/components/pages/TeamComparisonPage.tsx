import React, { useState, useEffect } from 'react';
import TeamSelector from '../ui/TeamSelector';
import RadarChart from '../visualizations/RadarChart';
import BarChart from '../visualizations/BarChart';
import TeamStatTable from '../ui/TeamStatTable';
import { fetchTeams, fetchTeamStats } from '../../services/nbaApi';
import { Team, TeamStats } from '../../types/nba';

const TeamComparisonPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [teamStats, setTeamStats] = useState<Record<string, TeamStats>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [statCategory, setStatCategory] = useState<string>('offense');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const teamsData = await fetchTeams();
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  const handleTeamSelect = async (teamId: string) => {
    if (selectedTeams.includes(teamId)) {
      // Deselect team
      setSelectedTeams(selectedTeams.filter(id => id !== teamId));
      return;
    }

    if (selectedTeams.length >= 4) {
      alert('You can only compare up to 4 teams at once');
      return;
    }

    // Add team and fetch its stats
    setLoading(true);
    try {
      const stats = await fetchTeamStats(teamId);
      setSelectedTeams([...selectedTeams, teamId]);
      setTeamStats(prev => ({
        ...prev,
        [teamId]: stats
      }));
    } catch (error) {
      console.error('Error fetching team stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatCategory(e.target.value);
  };

  const getSelectedTeamsData = () => {
    return selectedTeams.map(teamId => {
      const team = teams.find(t => t.id === teamId);
      return {
        id: teamId,
        name: team?.name || 'Unknown Team',
        stats: teamStats[teamId] || null
      };
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-darkGray mb-6">Team Comparison</h1>
      
      <div className="bg-white rounded-xl shadow-card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Teams to Compare</h2>
        <TeamSelector 
          teams={teams} 
          selectedTeams={selectedTeams} 
          onTeamSelect={handleTeamSelect} 
          loading={loading}
        />
      </div>

      {selectedTeams.length > 0 && (
        <>
          <div className="bg-white rounded-xl shadow-card p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Team Comparison</h2>
              <div>
                <label htmlFor="category-select" className="mr-2 font-medium">Category:</label>
                <select
                  id="category-select"
                  value={statCategory}
                  onChange={handleCategoryChange}
                  className="border rounded-md px-3 py-2"
                >
                  <option value="offense">Offense</option>
                  <option value="defense">Defense</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div className="h-80">
              <RadarChart 
                teams={getSelectedTeamsData()} 
                category={statCategory} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-card p-6">
              <h2 className="text-xl font-semibold mb-4">Points Per Game</h2>
              <BarChart 
                teams={getSelectedTeamsData()} 
                statKey="pointsPerGame" 
                label="Points"
              />
            </div>
            <div className="bg-white rounded-xl shadow-card p-6">
              <h2 className="text-xl font-semibold mb-4">Rebounds Per Game</h2>
              <BarChart 
                teams={getSelectedTeamsData()} 
                statKey="reboundsPerGame" 
                label="Rebounds"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-xl font-semibold mb-4">Team Statistics</h2>
            <TeamStatTable teams={getSelectedTeamsData()} />
          </div>
        </>
      )}

      {selectedTeams.length === 0 && !loading && (
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-xl font-medium mb-2">No teams selected</p>
          <p className="text-gray-600">Select teams above to begin comparison.</p>
        </div>
      )}
    </div>
  );
};

export default TeamComparisonPage;
