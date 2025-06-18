import React from 'react';
import { Team } from '../../types/nba';

interface TeamSelectorProps {
  teams: Team[];
  selectedTeams: string[];
  onTeamSelect: (teamId: string) => void;
  loading: boolean;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ teams, selectedTeams, onTeamSelect, loading }) => {
  // Group teams by conference
  const easternTeams = teams.filter(team => team.conference === 'Eastern');
  const westernTeams = teams.filter(team => team.conference === 'Western');

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 text-gray-600">Loading teams...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Eastern Conference</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {easternTeams.map(team => (
            <TeamCard 
              key={team.id}
              team={team}
              isSelected={selectedTeams.includes(team.id)}
              onSelect={() => onTeamSelect(team.id)}
            />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Western Conference</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {westernTeams.map(team => (
            <TeamCard 
              key={team.id}
              team={team}
              isSelected={selectedTeams.includes(team.id)}
              onSelect={() => onTeamSelect(team.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface TeamCardProps {
  team: Team;
  isSelected: boolean;
  onSelect: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, isSelected, onSelect }) => {
  return (
    <div 
      className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-primary bg-opacity-10 border-2 border-primary' : 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent'}`}
      onClick={onSelect}
    >
      <img 
        src={team.logo || 'https://via.placeholder.com/60'} 
        alt={team.name} 
        className="w-12 h-12 mb-2"
      />
      <span className="text-sm font-medium text-center">{team.name}</span>
      <span className="text-xs text-gray-500">{team.city}</span>
    </div>
  );
};

export default TeamSelector;
