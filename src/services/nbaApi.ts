import axios from 'axios';
import { Game, GameDetail, Player, PlayerSeasonStats, PlayerStats, ShotData, Team, TeamStats } from '../types/nba';

// This is a mock implementation using hardcoded data
// In a real implementation, we would connect to a basketball data API

// Mock data for development
const MOCK_GAMES: Game[] = [
  {
    id: '1',
    date: '2025-06-16T19:30:00.000Z',
    status: 'Final',
    homeTeam: {
      id: '1',
      name: 'Lakers',
      abbreviation: 'LAL',
      logo: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg'
    },
    awayTeam: {
      id: '2',
      name: 'Celtics',
      abbreviation: 'BOS',
      logo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg'
    },
    homeTeamScore: 112,
    awayTeamScore: 108,
    period: 4,
    arena: 'Crypto.com Arena',
    city: 'Los Angeles, CA'
  },
  {
    id: '2',
    date: '2025-06-16T20:00:00.000Z',
    status: 'Final',
    homeTeam: {
      id: '3',
      name: 'Warriors',
      abbreviation: 'GSW',
      logo: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg'
    },
    awayTeam: {
      id: '4',
      name: 'Suns',
      abbreviation: 'PHX',
      logo: 'https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg'
    },
    homeTeamScore: 125,
    awayTeamScore: 115,
    period: 4,
    arena: 'Chase Center',
    city: 'San Francisco, CA'
  },
  {
    id: '3',
    date: '2025-06-16T18:00:00.000Z',
    status: 'Final',
    homeTeam: {
      id: '5',
      name: 'Bucks',
      abbreviation: 'MIL',
      logo: 'https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg'
    },
    awayTeam: {
      id: '6',
      name: 'Bulls',
      abbreviation: 'CHI',
      logo: 'https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg'
    },
    homeTeamScore: 98,
    awayTeamScore: 92,
    period: 4,
    arena: 'Fiserv Forum',
    city: 'Milwaukee, WI'
  }
];

// Fetch games
export const fetchGames = async (): Promise<Game[]> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_GAMES);
    }, 500);
  });
};

// Fetch game details
export const fetchGameDetails = async (gameId: string): Promise<GameDetail> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const game = MOCK_GAMES.find(g => g.id === gameId);
      if (!game) {
        throw new Error('Game not found');
      }
      
      // Add mock team stats
      const gameDetail: GameDetail = {
        ...game,
        homeTeamStats: {
          points: game.homeTeamScore,
          reboundsTotal: 45,
          reboundsDefensive: 32,
          reboundsOffensive: 13,
          assists: 25,
          steals: 8,
          blocks: 5,
          turnovers: 12,
          foulsPersonal: 18,
          fieldGoalsMade: 42,
          fieldGoalsAttempted: 87,
          fieldGoalPercentage: 48.3,
          threePointersMade: 14,
          threePointersAttempted: 32,
          threePointPercentage: 43.8,
          freeThrowsMade: 14,
          freeThrowsAttempted: 18,
          freeThrowPercentage: 77.8,
          fastBreakPoints: 15,
          pointsInPaint: 48,
          pointsSecondChance: 12,
          pointsOffTurnovers: 18
        },
        awayTeamStats: {
          points: game.awayTeamScore,
          reboundsTotal: 40,
          reboundsDefensive: 30,
          reboundsOffensive: 10,
          assists: 22,
          steals: 6,
          blocks: 3,
          turnovers: 14,
          foulsPersonal: 20,
          fieldGoalsMade: 40,
          fieldGoalsAttempted: 85,
          fieldGoalPercentage: 47.1,
          threePointersMade: 12,
          threePointersAttempted: 34,
          threePointPercentage: 35.3,
          freeThrowsMade: 16,
          freeThrowsAttempted: 20,
          freeThrowPercentage: 80.0,
          fastBreakPoints: 12,
          pointsInPaint: 42,
          pointsSecondChance: 10,
          pointsOffTurnovers: 14
        },
        periodScores: [
          { period: 1, homeScore: 28, awayScore: 25 },
          { period: 2, homeScore: 26, awayScore: 30 },
          { period: 3, homeScore: 32, awayScore: 24 },
          { period: 4, homeScore: 26, awayScore: 29 }
        ]
      };
      
      resolve(gameDetail);
    }, 500);
  });
};

// Fetch player stats for a game
export const fetchGameStats = async (gameId: string): Promise<PlayerStats[]> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would normally come from an API
      const playerStats: PlayerStats[] = [
        // Home team players
        {
          id: 'p1',
          name: 'LeBron James',
          teamId: '1', // Lakers
          starter: true,
          position: 'F',
          minutes: '36:24',
          points: 28,
          rebounds: 8,
          assists: 12,
          steals: 2,
          blocks: 1,
          turnovers: 3,
          fouls: 2,
          plusMinus: 12,
          fieldGoalsMade: 10,
          fieldGoalsAttempted: 18,
          fieldGoalPercentage: 55.6,
          threePointersMade: 3,
          threePointersAttempted: 7,
          threePointPercentage: 42.9,
          freeThrowsMade: 5,
          freeThrowsAttempted: 6,
          freeThrowPercentage: 83.3
        },
        // More home team players...
        
        // Away team players
        {
          id: 'p6',
          name: 'Jayson Tatum',
          teamId: '2', // Celtics
          starter: true,
          position: 'F',
          minutes: '38:12',
          points: 30,
          rebounds: 9,
          assists: 4,
          steals: 1,
          blocks: 0,
          turnovers: 4,
          fouls: 3,
          plusMinus: -6,
          fieldGoalsMade: 11,
          fieldGoalsAttempted: 22,
          fieldGoalPercentage: 50.0,
          threePointersMade: 4,
          threePointersAttempted: 10,
          threePointPercentage: 40.0,
          freeThrowsMade: 4,
          freeThrowsAttempted: 4,
          freeThrowPercentage: 100.0
        },
        // More away team players...
      ];
      
      resolve(playerStats);
    }, 500);
  });
};

// Fetch shot data for a game
export const fetchGameShots = async (gameId: string): Promise<ShotData[]> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would normally come from an API
      const shotData: ShotData[] = [
        // Mock shot data
        {
          playerId: 'p1',
          playerName: 'LeBron James',
          teamId: '1', // Lakers
          quarter: 1,
          timeRemaining: '10:24',
          shotType: '3PT Jump Shot',
          shotDistance: 25,
          shotResult: 'made',
          xCoordinate: -150,
          yCoordinate: 150,
          shotValue: 3
        },
        // More shot data...
      ];
      
      resolve(shotData);
    }, 500);
  });
};

// Search players
export const searchPlayers = async (query: string): Promise<Player[]> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would normally come from an API with a search endpoint
      const mockPlayers: Player[] = [
        {
          id: 'p1',
          name: 'LeBron James',
          position: 'F',
          jerseyNumber: '23',
          height: '6-9',
          weight: '250',
          birthDate: '1984-12-30',
          age: 39,
          team: 'Los Angeles Lakers',
          teamId: '1',
          image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png'
        },
        // More players...
      ];
      
      // Filter based on query
      const results = mockPlayers.filter(player => 
        player.name.toLowerCase().includes(query.toLowerCase())
      );
      
      resolve(results);
    }, 300);
  });
};

// Fetch player stats
export const fetchPlayerStats = async (playerId: string): Promise<PlayerSeasonStats> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would normally come from an API
      const playerStats: PlayerSeasonStats = {
        playerId,
        season: '2024-25',
        gamesPlayed: 70,
        gamesStarted: 70,
        minutesPerGame: 35.7,
        points: 27.2,
        rebounds: 7.5,
        assists: 8.3,
        steals: 1.2,
        blocks: 0.8,
        turnovers: 3.5,
        fieldGoalPercentage: 52.3,
        threePointPercentage: 37.8,
        freeThrowPercentage: 73.8,
        effectiveFieldGoalPercentage: 58.6,
        playerEfficiencyRating: 25.6,
        usageRate: 31.2,
        trueShootingPercentage: 60.5
      };
      
      resolve(playerStats);
    }, 500);
  });
};

// Fetch teams
export const fetchTeams = async (): Promise<Team[]> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would normally come from an API
      const teams: Team[] = [
        {
          id: '1',
          name: 'Lakers',
          abbreviation: 'LAL',
          city: 'Los Angeles',
          conference: 'Western',
          division: 'Pacific',
          logo: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg'
        },
        {
          id: '2',
          name: 'Celtics',
          abbreviation: 'BOS',
          city: 'Boston',
          conference: 'Eastern',
          division: 'Atlantic',
          logo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg'
        },
        // More teams...
      ];
      
      resolve(teams);
    }, 500);
  });
};

// Fetch team stats
export const fetchTeamStats = async (teamId: string): Promise<TeamStats> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would normally come from an API
      const teamStats: TeamStats = {
        teamId,
        season: '2024-25',
        gamesPlayed: 82,
        wins: 52,
        losses: 30,
        pointsPerGame: 116.3,
        reboundsPerGame: 44.5,
        assistsPerGame: 25.8,
        stealsPerGame: 7.2,
        blocksPerGame: 4.8,
        turnoversPerGame: 13.5,
        fieldGoalPercentage: 48.2,
        threePointPercentage: 37.8,
        freeThrowPercentage: 76.5,
        offensiveRating: 115.2,
        defensiveRating: 110.5,
        netRating: 4.7,
        pace: 98.5,
        trueShootingPercentage: 58.7,
        effectiveFieldGoalPercentage: 54.3
      };
      
      resolve(teamStats);
    }, 500);
  });
};
