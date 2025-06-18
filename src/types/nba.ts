// Team types
export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  logo?: string;
}

// Player types
export interface Player {
  id: string;
  name: string;
  position: string;
  jerseyNumber: string;
  height: string;
  weight: string;
  birthDate: string;
  age: number;
  team: string;
  teamId: string;
  image?: string;
}

export interface PlayerSeasonStats {
  playerId: string;
  season: string;
  gamesPlayed: number;
  gamesStarted: number;
  minutesPerGame: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  effectiveFieldGoalPercentage: number;
  playerEfficiencyRating: number;
  usageRate: number;
  trueShootingPercentage: number;
}

export interface PlayerStats {
  id: string;
  name: string;
  teamId: string;
  starter: boolean;
  position: string;
  minutes: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  plusMinus: number;
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  fieldGoalPercentage: number;
  threePointersMade: number;
  threePointersAttempted: number;
  threePointPercentage: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
  freeThrowPercentage: number;
}

// Game types
export interface Game {
  id: string;
  date: string;
  status: string;
  homeTeam: {
    id: string;
    name: string;
    abbreviation: string;
    logo?: string;
  };
  awayTeam: {
    id: string;
    name: string;
    abbreviation: string;
    logo?: string;
  };
  homeTeamScore: number;
  awayTeamScore: number;
  period: number;
  time?: string;
  arena?: string;
  city?: string;
}

export interface TeamGameStats {
  points: number;
  reboundsTotal: number;
  reboundsDefensive: number;
  reboundsOffensive: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  foulsPersonal: number;
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  fieldGoalPercentage: number;
  threePointersMade: number;
  threePointersAttempted: number;
  threePointPercentage: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
  freeThrowPercentage: number;
  fastBreakPoints: number;
  pointsInPaint: number;
  pointsSecondChance: number;
  pointsOffTurnovers: number;
}

export interface GameDetail extends Game {
  homeTeamStats: TeamGameStats;
  awayTeamStats: TeamGameStats;
  periodScores: {
    period: number;
    homeScore: number;
    awayScore: number;
  }[];
}

export interface ShotData {
  playerId: string;
  playerName: string;
  teamId: string;
  quarter: number;
  timeRemaining: string;
  shotType: string;
  shotDistance: number;
  shotResult: 'made' | 'missed';
  xCoordinate: number;
  yCoordinate: number;
  shotValue: number;
}

// Team stats
export interface TeamStats {
  teamId: string;
  season: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  pointsPerGame: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  stealsPerGame: number;
  blocksPerGame: number;
  turnoversPerGame: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  offensiveRating: number;
  defensiveRating: number;
  netRating: number;
  pace: number;
  trueShootingPercentage: number;
  effectiveFieldGoalPercentage: number;
}
