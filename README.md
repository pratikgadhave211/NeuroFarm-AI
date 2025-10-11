
  # NeuroFarm AI - Crop Recommendation System

This is an AI-powered crop recommendation system that provides personalized farming insights and recommendations based on soil and climate analysis.

## Features

- Crop Recommendation based on soil and climate data
- Weather forecasting integration
- Fertilizer recommendations
- Interactive UI with modern design
- Multi-language support

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment on Netlify

1. Build the project locally:
   ```bash
   npm run build
   ```

2. Configure Netlify Settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 16 (or your project's version)

3. Environment Variables:
   - Add any required environment variables in Netlify's dashboard
   - Ensure API endpoints are properly configured

## Troubleshooting Deployment

If you encounter a white screen:
1. Check the console for errors
2. Verify all environment variables are set
3. Ensure build command completes successfully
4. Check if the `dist` folder contains the built files
5. Verify the Netlify redirects are working properly
  