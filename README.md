# NBA Box Score Visualizer

A modern, interactive basketball statistics visualization platform built with React, TypeScript, and D3.js.

## Overview

The NBA Box Score Visualizer is a web application designed to transform traditional basketball box scores into interactive, engaging visualizations. The app helps basketball fans, analysts, and coaches to quickly understand game dynamics and player performance through intuitive charts and graphs.

## Features

- **Game Summary Dashboard**: Visualizes team statistics, scoring runs, and game flow
- **Player Performance Cards**: Interactive player stat cards with shooting charts and efficiency metrics
- **Team Comparison Visualizations**: Side-by-side team statistical breakdowns
- **Filtering & Customization**: Adjust time periods, player groups, and visualization styles
- **Responsive Design**: Optimized for both desktop and mobile viewing

## Technologies Used

- **Frontend**: React with TypeScript for type safety
- **State Management**: React Context API and hooks
- **Visualization**: D3.js for custom data visualizations
- **Styling**: Tailwind CSS for responsive design
- **Data Handling**: Custom fetch hooks with TypeScript interfaces

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/dxaginfo/nba-box-score-visualizer.git

# Navigate to the project directory
cd nba-box-score-visualizer

# Install dependencies
npm install

# Start the development server
npm start
```

## Application Structure

```
├── public/               # Static files
├── src/                  # Source code
│   ├── components/       # React components
│   │   ├── BoxScore/     # Box score related components
│   │   ├── Charts/       # Visualization components
│   │   ├── Players/      # Player related components
│   │   ├── Teams/        # Team related components
│   │   └── UI/           # Reusable UI components
│   ├── contexts/         # React contexts for state management
│   ├── hooks/            # Custom React hooks
│   ├── interfaces/       # TypeScript interfaces
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main App component
│   └── index.tsx         # Application entry point
└── tsconfig.json         # TypeScript configuration
```

## Usage Examples

### Viewing Game Statistics

1. Select a game from the available fixtures
2. View the game summary dashboard for high-level insights
3. Drill down into individual player performances
4. Toggle between different visualization types
5. Filter statistics by quarters or time periods

## Development Roadmap

- **Phase 1**: Core visualization components and game summary dashboard ✅
- **Phase 2**: Player performance cards and shooting charts
- **Phase 3**: Advanced filtering options and team comparison tools
- **Phase 4**: User accounts and saved preferences
- **Phase 5**: Historical data integration and trend analysis

## License

MIT License

## Acknowledgments

- NBA data sources and APIs
- Open-source visualization libraries and tools
- Basketball analytics community