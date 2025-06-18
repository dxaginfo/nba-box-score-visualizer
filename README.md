# NBA Box Score Visualizer

![NBA Box Score Visualizer Logo](https://via.placeholder.com/800x200/0077be/ffffff?text=NBA+Box+Score+Visualizer)

## Overview

The NBA Box Score Visualizer is an interactive web application that transforms traditional box score data into insightful, customizable visualizations. This tool helps basketball fans, analysts, and coaches gain deeper insights from game statistics through intuitive charts, comparative analysis, and AI-powered statistical interpretations.

## Features

### Core Functionality

- **Game Selection**: Browse and select from recent NBA games or search for specific matchups by team, date, or season
- **Box Score Display**: View comprehensive box score statistics for teams and individual players
- **Real-time Updates**: Auto-refresh capabilities for live game data (when available)

### Data Visualization

- **Shot Charts**: Interactive shot location maps showing makes/misses and shooting percentages
- **Performance Graphs**: Visualize key statistics with customizable charts and graphs
- **Player Comparison**: Side-by-side statistical comparison between multiple players
- **Team Comparison**: Compare team performance across various statistical categories
- **Historical Context**: Place current performances in historical context with trend analysis
- **Performance Trends**: Track and analyze player statistics over time with interactive trend visualization

### Advanced Analytics

- **Efficiency Metrics**: Advanced statistics including PER, true shooting percentage, and usage rate
- **Statistical Breakdowns**: Quarter-by-quarter and clutch time performance analysis
- **AI-Generated Insights**: Natural language summaries highlighting key performances and trends
- **Anomaly Detection**: Identification of statistically significant outlier performances
- **Multi-player Trend Analysis**: Compare performance trends of up to 5 players across various statistical categories

### User Experience

- **Customizable Dashboard**: Personalize the visualization layout and metrics displayed
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Data Export**: Download visualizations and data in multiple formats (PNG, CSV, PDF)
- **Sharing Capabilities**: Share custom visualizations via direct links or social media
- **Flexible Time Ranges**: Analyze performance over custom time periods and game counts

## Technology Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Chart.js and D3.js for data visualization
- React Router for navigation

### Backend
- Node.js with Express
- API integration with basketball data providers
- OpenAI integration for natural language insights

### Data Sources
- NBA Stats API (or similar free/public basketball data API)
- Historical statistics database

## Setup and Installation

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/dxaginfo/nba-box-score-visualizer.git
   cd nba-box-score-visualizer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add necessary API keys and configuration variables

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
nba-box-score-visualizer/
├── public/             # Static files
├── src/                # Source files
│   ├── components/     # React components
│   │   ├── layout/     # Layout components
│   │   ├── pages/      # Page components
│   │   ├── ui/         # Reusable UI components
│   │   └── visualizations/ # Data visualization components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API and data services
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main App component
│   └── index.tsx       # Entry point
├── .env                # Environment variables
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## New Features in Latest Update

### Performance Trends Page
The latest addition to NBA Box Score Visualizer introduces a comprehensive Player Performance Trends analysis feature that allows users to:

- Track statistics for up to 5 players simultaneously
- Visualize performance trends over the last 5, 10, 15, or 20 games
- Compare trends across different statistical categories (points, rebounds, assists, etc.)
- Identify performance patterns, hot/cold streaks, and statistical anomalies
- Generate insights on player consistency and improvement

This powerful tool helps coaches, analysts, and fans understand player development and make data-driven predictions about future performance.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- NBA for providing the statistical data
- The open-source community for the amazing tools and libraries

---

Developed with ❤️ for basketball fans and data enthusiasts everywhere.