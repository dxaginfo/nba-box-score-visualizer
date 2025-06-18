# NBA Box Score Visualizer - Setup Guide

This guide will walk you through the process of setting up the NBA Box Score Visualizer application for local development and deployment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn** (v1.22.0 or higher)
- Git

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/dxaginfo/nba-box-score-visualizer.git
cd nba-box-score-visualizer
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_BASE_URL=https://your-basketball-api-url.com/api
REACT_APP_API_KEY=your_api_key_here
```

For development without an API key, the application will use mock data.

### 4. Start the Development Server

Using npm:
```bash
npm start
```

Using yarn:
```bash
yarn start
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- **start**: Runs the app in development mode
- **build**: Builds the app for production
- **test**: Runs the test suite
- **eject**: Ejects from Create React App configuration

```bash
# Example
npm run build
```

## API Integration

The application is designed to work with basketball data APIs. By default, it uses mock data for development.

To connect to a real basketball data API:

1. Update the `src/services/nbaApi.ts` file to use real API endpoints instead of mock data
2. Ensure your API calls match the expected data structures defined in `src/types/nba.ts`
3. Update the `.env` file with your API credentials

Example implementation for a real API call:

```typescript
export const fetchGames = async (): Promise<Game[]> => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/games`, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};
```

## Building for Production

To create a production build:

```bash
npm run build
```

This will generate optimized files in the `build` directory. You can then serve these files using any static file server.

Example using serve:

```bash
npm install -g serve
serve -s build
```

## Deployment

### Option 1: Netlify

1. Create a new site on Netlify
2. Connect to your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Add environment variables in the Netlify dashboard

### Option 2: Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project directory and follow the prompts
3. For subsequent deployments, run `vercel --prod`

### Option 3: GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/nba-box-score-visualizer",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run `npm run deploy`

## Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the design by modifying:

- `tailwind.config.js`: Update theme colors, fonts, and other design tokens
- CSS classes in component files

### Adding New Features

To add new features:

1. Create new components in the appropriate directories
2. Update the router in `App.tsx` if adding new pages
3. Extend types in `src/types` as needed
4. Add new API service functions in `src/services`

## Troubleshooting

### Common Issues

1. **API Connection Issues**:
   - Check if your API key is valid
   - Verify the API base URL
   - Ensure the API endpoints match the expected formats

2. **Build Errors**:
   - Clear the `node_modules` directory and reinstall dependencies
   - Ensure all TypeScript types are correctly defined

3. **Visualization Rendering Issues**:
   - Check browser console for errors
   - Verify that data is being correctly passed to visualization components

If you encounter persistent issues, please [open an issue](https://github.com/dxaginfo/nba-box-score-visualizer/issues) on GitHub.