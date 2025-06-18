export interface PlayerData {
  id: string;
  name: string;
  jersey: string;
  position: string;
  isStarter: boolean;
  stats: {
    points: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
    fouls: number;
    minutes: string;
    fieldGoals: {
      made: number;
      attempted: number;
      percentage: number;
    };
    threePointers: {
      made: number;
      attempted: number;
      percentage: number;
    };
    freeThrows: {
      made: number;
      attempted: number;
      percentage: number;
    };
    plusMinus: number;
  };
  shotChart?: {
    x: number;
    y: number;
    made: boolean;
    value: number;
  }[];
}

export interface TeamData {
  id: string;
  name: string;
  abbreviation: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  score: number;
  players: PlayerData[];
  stats: {
    fieldGoals: {
      made: number;
      attempted: number;
      percentage: number;
    };
    threePointers: {
      made: number;
      attempted: number;
      percentage: number;
    };
    freeThrows: {
      made: number;
      attempted: number;
      percentage: number;
    };
    rebounds: {
      offensive: number;
      defensive: number;
      total: number;
    };
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
    fouls: number;
    points: {
      fastBreak: number;
      inPaint: number;
      secondChance: number;
      offTurnovers: number;
      bench: number;
    };
    timeouts: {
      full: number;
      short: number;
    };
  };
  quarterScores: number[];
  runs?: {
    startTime: string;
    endTime: string;
    points: number;
  }[];
}

export interface GameData {
  id: string;
  date: string;
  arena: string;
  city: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  homeTeam: TeamData;
  awayTeam: TeamData;
  period: number;
  gameClock: string | null;
  leadChanges: number;
  timesTied: number;
  officials: string[];
}