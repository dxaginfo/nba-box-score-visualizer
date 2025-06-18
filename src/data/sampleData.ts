import { GameData } from '../interfaces/GameInterfaces';

export const sampleGameData: GameData = {
  id: 'game12345',
  date: '2025-06-18T19:30:00Z',
  arena: 'Madison Square Garden',
  city: 'New York, NY',
  status: 'completed',
  homeTeam: {
    id: 'team1',
    name: 'New York Knicks',
    abbreviation: 'NYK',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg',
    primaryColor: '#006BB6',
    secondaryColor: '#F58426',
    score: 105,
    players: [
      {
        id: 'player1',
        name: 'Julius Randle',
        jersey: '30',
        position: 'PF',
        isStarter: true,
        stats: {
          points: 24,
          rebounds: 12,
          assists: 5,
          steals: 1,
          blocks: 0,
          turnovers: 3,
          fouls: 2,
          minutes: '36:42',
          fieldGoals: {
            made: 9,
            attempted: 18,
            percentage: 50.0
          },
          threePointers: {
            made: 2,
            attempted: 5,
            percentage: 40.0
          },
          freeThrows: {
            made: 4,
            attempted: 5,
            percentage: 80.0
          },
          plusMinus: +8
        }
      },
      {
        id: 'player2',
        name: 'RJ Barrett',
        jersey: '9',
        position: 'SF',
        isStarter: true,
        stats: {
          points: 22,
          rebounds: 6,
          assists: 4,
          steals: 2,
          blocks: 1,
          turnovers: 2,
          fouls: 3,
          minutes: '34:18',
          fieldGoals: {
            made: 8,
            attempted: 15,
            percentage: 53.3
          },
          threePointers: {
            made: 3,
            attempted: 6,
            percentage: 50.0
          },
          freeThrows: {
            made: 3,
            attempted: 4,
            percentage: 75.0
          },
          plusMinus: +5
        }
      },
      {
        id: 'player3',
        name: 'Mitchell Robinson',
        jersey: '23',
        position: 'C',
        isStarter: true,
        stats: {
          points: 8,
          rebounds: 14,
          assists: 1,
          steals: 0,
          blocks: 3,
          turnovers: 1,
          fouls: 4,
          minutes: '28:54',
          fieldGoals: {
            made: 4,
            attempted: 5,
            percentage: 80.0
          },
          threePointers: {
            made: 0,
            attempted: 0,
            percentage: 0.0
          },
          freeThrows: {
            made: 0,
            attempted: 2,
            percentage: 0.0
          },
          plusMinus: +6
        }
      },
      {
        id: 'player4',
        name: 'Jalen Brunson',
        jersey: '11',
        position: 'PG',
        isStarter: true,
        stats: {
          points: 18,
          rebounds: 3,
          assists: 9,
          steals: 1,
          blocks: 0,
          turnovers: 2,
          fouls: 1,
          minutes: '32:15',
          fieldGoals: {
            made: 7,
            attempted: 14,
            percentage: 50.0
          },
          threePointers: {
            made: 2,
            attempted: 4,
            percentage: 50.0
          },
          freeThrows: {
            made: 2,
            attempted: 2,
            percentage: 100.0
          },
          plusMinus: +9
        }
      },
      {
        id: 'player5',
        name: 'Donte DiVincenzo',
        jersey: '0',
        position: 'SG',
        isStarter: true,
        stats: {
          points: 15,
          rebounds: 4,
          assists: 3,
          steals: 2,
          blocks: 0,
          turnovers: 1,
          fouls: 2,
          minutes: '30:42',
          fieldGoals: {
            made: 5,
            attempted: 12,
            percentage: 41.7
          },
          threePointers: {
            made: 3,
            attempted: 8,
            percentage: 37.5
          },
          freeThrows: {
            made: 2,
            attempted: 2,
            percentage: 100.0
          },
          plusMinus: +4
        }
      },
      {
        id: 'player6',
        name: 'Immanuel Quickley',
        jersey: '5',
        position: 'PG',
        isStarter: false,
        stats: {
          points: 12,
          rebounds: 3,
          assists: 5,
          steals: 1,
          blocks: 0,
          turnovers: 1,
          fouls: 2,
          minutes: '24:36',
          fieldGoals: {
            made: 4,
            attempted: 10,
            percentage: 40.0
          },
          threePointers: {
            made: 2,
            attempted: 6,
            percentage: 33.3
          },
          freeThrows: {
            made: 2,
            attempted: 2,
            percentage: 100.0
          },
          plusMinus: -2
        }
      },
      {
        id: 'player7',
        name: 'Josh Hart',
        jersey: '3',
        position: 'SF',
        isStarter: false,
        stats: {
          points: 6,
          rebounds: 9,
          assists: 2,
          steals: 1,
          blocks: 0,
          turnovers: 0,
          fouls: 1,
          minutes: '26:18',
          fieldGoals: {
            made: 3,
            attempted: 6,
            percentage: 50.0
          },
          threePointers: {
            made: 0,
            attempted: 2,
            percentage: 0.0
          },
          freeThrows: {
            made: 0,
            attempted: 0,
            percentage: 0.0
          },
          plusMinus: +3
        }
      }
    ],
    stats: {
      fieldGoals: {
        made: 40,
        attempted: 80,
        percentage: 50.0
      },
      threePointers: {
        made: 12,
        attempted: 31,
        percentage: 38.7
      },
      freeThrows: {
        made: 13,
        attempted: 17,
        percentage: 76.5
      },
      rebounds: {
        offensive: 11,
        defensive: 31,
        total: 42
      },
      assists: 29,
      steals: 8,
      blocks: 4,
      turnovers: 10,
      fouls: 15,
      points: {
        fastBreak: 12,
        inPaint: 42,
        secondChance: 14,
        offTurnovers: 18,
        bench: 18
      },
      timeouts: {
        full: 2,
        short: 1
      }
    },
    quarterScores: [28, 24, 31, 22]
  },
  awayTeam: {
    id: 'team2',
    name: 'Boston Celtics',
    abbreviation: 'BOS',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
    primaryColor: '#007A33',
    secondaryColor: '#FFFFFF',
    score: 98,
    players: [
      {
        id: 'player8',
        name: 'Jayson Tatum',
        jersey: '0',
        position: 'SF',
        isStarter: true,
        stats: {
          points: 30,
          rebounds: 8,
          assists: 5,
          steals: 1,
          blocks: 2,
          turnovers: 4,
          fouls: 3,
          minutes: '38:24',
          fieldGoals: {
            made: 11,
            attempted: 22,
            percentage: 50.0
          },
          threePointers: {
            made: 3,
            attempted: 9,
            percentage: 33.3
          },
          freeThrows: {
            made: 5,
            attempted: 6,
            percentage: 83.3
          },
          plusMinus: -4
        }
      },
      {
        id: 'player9',
        name: 'Jaylen Brown',
        jersey: '7',
        position: 'SG',
        isStarter: true,
        stats: {
          points: 24,
          rebounds: 6,
          assists: 3,
          steals: 2,
          blocks: 0,
          turnovers: 3,
          fouls: 4,
          minutes: '36:12',
          fieldGoals: {
            made: 9,
            attempted: 19,
            percentage: 47.4
          },
          threePointers: {
            made: 2,
            attempted: 6,
            percentage: 33.3
          },
          freeThrows: {
            made: 4,
            attempted: 5,
            percentage: 80.0
          },
          plusMinus: -6
        }
      },
      {
        id: 'player10',
        name: 'Kristaps Porzingis',
        jersey: '8',
        position: 'C',
        isStarter: true,
        stats: {
          points: 15,
          rebounds: 10,
          assists: 2,
          steals: 0,
          blocks: 3,
          turnovers: 2,
          fouls: 3,
          minutes: '28:36',
          fieldGoals: {
            made: 6,
            attempted: 14,
            percentage: 42.9
          },
          threePointers: {
            made: 1,
            attempted: 4,
            percentage: 25.0
          },
          freeThrows: {
            made: 2,
            attempted: 2,
            percentage: 100.0
          },
          plusMinus: -5
        }
      },
      {
        id: 'player11',
        name: 'Jrue Holiday',
        jersey: '4',
        position: 'PG',
        isStarter: true,
        stats: {
          points: 12,
          rebounds: 5,
          assists: 7,
          steals: 2,
          blocks: 1,
          turnovers: 1,
          fouls: 2,
          minutes: '34:18',
          fieldGoals: {
            made: 5,
            attempted: 12,
            percentage: 41.7
          },
          threePointers: {
            made: 2,
            attempted: 5,
            percentage: 40.0
          },
          freeThrows: {
            made: 0,
            attempted: 0,
            percentage: 0.0
          },
          plusMinus: -3
        }
      },
      {
        id: 'player12',
        name: 'Derrick White',
        jersey: '9',
        position: 'SG',
        isStarter: true,
        stats: {
          points: 8,
          rebounds: 4,
          assists: 6,
          steals: 1,
          blocks: 2,
          turnovers: 1,
          fouls: 1,
          minutes: '30:48',
          fieldGoals: {
            made: 3,
            attempted: 9,
            percentage: 33.3
          },
          threePointers: {
            made: 2,
            attempted: 6,
            percentage: 33.3
          },
          freeThrows: {
            made: 0,
            attempted: 0,
            percentage: 0.0
          },
          plusMinus: -2
        }
      },
      {
        id: 'player13',
        name: 'Al Horford',
        jersey: '42',
        position: 'PF',
        isStarter: false,
        stats: {
          points: 5,
          rebounds: 7,
          assists: 2,
          steals: 0,
          blocks: 1,
          turnovers: 0,
          fouls: 2,
          minutes: '22:36',
          fieldGoals: {
            made: 2,
            attempted: 5,
            percentage: 40.0
          },
          threePointers: {
            made: 1,
            attempted: 3,
            percentage: 33.3
          },
          freeThrows: {
            made: 0,
            attempted: 0,
            percentage: 0.0
          },
          plusMinus: -1
        }
      },
      {
        id: 'player14',
        name: 'Payton Pritchard',
        jersey: '11',
        position: 'PG',
        isStarter: false,
        stats: {
          points: 4,
          rebounds: 2,
          assists: 3,
          steals: 0,
          blocks: 0,
          turnovers: 1,
          fouls: 2,
          minutes: '18:48',
          fieldGoals: {
            made: 2,
            attempted: 6,
            percentage: 33.3
          },
          threePointers: {
            made: 0,
            attempted: 3,
            percentage: 0.0
          },
          freeThrows: {
            made: 0,
            attempted: 0,
            percentage: 0.0
          },
          plusMinus: -2
        }
      }
    ],
    stats: {
      fieldGoals: {
        made: 38,
        attempted: 87,
        percentage: 43.7
      },
      threePointers: {
        made: 11,
        attempted: 36,
        percentage: 30.6
      },
      freeThrows: {
        made: 11,
        attempted: 13,
        percentage: 84.6
      },
      rebounds: {
        offensive: 9,
        defensive: 33,
        total: 42
      },
      assists: 28,
      steals: 6,
      blocks: 9,
      turnovers: 12,
      fouls: 17,
      points: {
        fastBreak: 9,
        inPaint: 36,
        secondChance: 10,
        offTurnovers: 16,
        bench: 9
      },
      timeouts: {
        full: 1,
        short: 2
      }
    },
    quarterScores: [22, 26, 28, 22]
  },
  period: 4,
  gameClock: null,
  leadChanges: 8,
  timesTied: 6,
  officials: ['John Smith', 'Jane Johnson', 'Robert Williams']
};