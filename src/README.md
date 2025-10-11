# CropWise - AI-Powered Crop Recommendation System

A comprehensive, responsive single-page web application for crop recommendations, soil analysis, and weather insights built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation & Running Locally

1. **Clone or download this project**
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```

The application will automatically reload when you make changes to the source files.

## 📋 Features

### ✅ Implemented Core Features

#### 🌾 Crop Recommendation System
- **Smart Algorithm**: Rule-based recommendation engine that analyzes:
  - Soil pH levels (3.0-10.0 range)
  - Rainfall patterns (0-3000mm)
  - Temperature conditions (-10°C to 50°C)
  - Seasonal compatibility
- **Confidence Scoring**: Each recommendation includes a percentage confidence score
- **Detailed Results**: Shows optimal sowing months, benefits, and reasoning
- **Data Persistence**: Uses localStorage to remember your inputs and results
- **Sample Data**: Quick-load button with pre-filled realistic data
- **CSV Export**: Download your recommendations for record-keeping

#### 🧪 Soil Analysis & Fertilizer Recommendations
- **Interactive Views**: Toggle between Basic and Advanced analysis modes
- **Nutrient Analysis**: N-P-K (Nitrogen-Phosphorus-Potassium) breakdowns
- **Visual Progress Bars**: Easy-to-understand nutrient level indicators
- **Fertilizer Suggestions**: Organic and conventional options with application rates
- **Soil Improvement Tips**: Short-term and long-term enhancement strategies

#### 🌤️ Weather Insights Widget
- **Mock Weather Data**: Simulates real weather API integration
- **5-Day Forecast**: Extended weather predictions for farm planning
- **Farming Advice**: Weather-specific recommendations for irrigation and field work
- **Visual Weather Icons**: Intuitive condition indicators
- **City-Based Search**: Enter any location for weather data

#### 📱 Responsive Design & UX
- **Mobile-First**: Optimized for phones, tablets, and desktops
- **Dark/Light Themes**: Toggle between themes with system preference detection
- **Smooth Animations**: CSS-only entrance animations and transitions
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **Sticky Navigation**: Header transforms on scroll with smooth animations

#### 💾 Data Management
- **Local Storage**: Automatic saving of form inputs and results
- **Form Validation**: Real-time validation with helpful error messages
- **Export Functionality**: CSV download for recommendations
- **Sample Data**: One-click loading of realistic test data

### 🛠️ Additional Features

#### 📚 Educational Content
- **How It Works**: Interactive explanation of the recommendation algorithm
- **FAQ Section**: Comprehensive answers to common questions
- **Algorithm Details**: Technical deep-dive into scoring methodology

#### 📞 Contact & Support
- **Contact Form**: Client-side validation with success/error states
- **Footer**: Links, social media, and additional resources

#### 🌐 Internationalization (i18n)
- **Multi-Language Support**: English, Spanish, French, Hindi, and Portuguese
- **Language Persistence**: User language preference saved to localStorage
- **Browser Language Detection**: Automatically detects user's preferred language
- **Easy Translation Management**: Centralized translation system with organized key structure
- **RTL Support Ready**: Architecture prepared for right-to-left languages

## 🏗️ Architecture & Code Structure

### File Organization
```
├── App.tsx                 # Main application component
├── components/
│   ├── Header.tsx          # Sticky navigation with mobile menu
│   ├── Hero.tsx            # Landing section with CTA buttons
│   ├── CropRecommendation.tsx  # Main recommendation engine
│   ├── FertilizerRecommendation.tsx  # Soil analysis & fertilizer advice
│   ├── WeatherWidget.tsx   # Weather data and farming insights
│   ├── HowItWorks.tsx      # Algorithm explanation
│   ├── FAQ.tsx             # Frequently asked questions
│   ├── ContactForm.tsx     # Contact form with validation
│   ├── Footer.tsx          # Footer with links and info
│   ├── ThemeProvider.tsx   # Dark/light theme management
│   └── ui/                 # Reusable UI components (shadcn/ui)
├── styles/
│   └── globals.css         # Global styles and CSS variables
└── README.md               # This file
```

### Technology Stack
- **React 18** with TypeScript for type safety
- **Tailwind CSS v4** for styling with CSS variables
- **Vite** for fast development server and building
- **shadcn/ui** for consistent, accessible UI components
- **Lucide React** for icons
- **Local Storage API** for data persistence

## 🧪 Testing Guide

### Manual Testing Checklist

#### Crop Recommendation Testing
1. **Form Validation:**
   - [ ] Try submitting empty form - should show validation errors
   - [ ] Enter invalid pH (outside 3-10 range) - should show error
   - [ ] Enter invalid rainfall (negative or >3000) - should show error
   - [ ] Enter invalid temperature (outside -10 to 50) - should show error

2. **Recommendation Algorithm:**
   - [ ] Use sample data - should get 3 recommendations with confidence scores
   - [ ] Try different seasons - results should change appropriately
   - [ ] Test extreme values - should get lower confidence scores or no results

3. **Data Persistence:**
   - [ ] Fill form and refresh page - data should be restored
   - [ ] Get recommendations and refresh - results should persist
   - [ ] Check browser localStorage for saved data

4. **Export Functionality:**
   - [ ] Get recommendations and click "Export CSV"
   - [ ] Verify CSV file downloads with correct data

#### Weather Widget Testing
1. **Search Functionality:**
   - [ ] Enter city name and click "Get Weather"
   - [ ] Should show current conditions and 5-day forecast
   - [ ] Try different city names - should generate different mock data

2. **Farming Advice:**
   - [ ] Check that weather conditions generate appropriate farming advice
   - [ ] High temperature/humidity should show relevant warnings

#### Responsive Design Testing
1. **Breakpoints:**
   - [ ] Desktop (1024px+): Full layout with all features
   - [ ] Tablet (768px-1023px): Adjusted grid layouts
   - [ ] Mobile (480px-767px): Single column, mobile menu
   - [ ] Small mobile (<480px): Compact layout

2. **Theme Testing:**
   - [ ] Toggle dark/light theme button in header
   - [ ] Check system preference detection on first visit
   - [ ] Verify theme persists across page refreshes

### Performance Testing
- [ ] Check page load time (should be <3 seconds)
- [ ] Verify smooth scrolling between sections
- [ ] Test form submission delays (simulated 1.5s for recommendations)

## 🔧 Customization Guide

### Color Scheme
The application uses CSS variables defined in `styles/globals.css`. To change colors:

```css
:root {
  --color-primary: #your-color;      /* Main brand color */
  --color-secondary: #your-color;    /* Secondary accents */
  --color-background: #your-color;   /* Page backgrounds */
  /* Add custom colors as needed */
}
```

### Adding New Crops
Edit the `cropDatabase` array in `components/CropRecommendation.tsx`:

```typescript
const cropDatabase: CropData[] = [
  {
    id: 'new-crop',
    name: 'New Crop Name',
    image: 'https://your-image-url.jpg',
    description: 'Crop description',
    optimalTemp: { min: 20, max: 30 },
    optimalRainfall: { min: 400, max: 800 },
    optimalPH: { min: 6.0, max: 7.0 },
    seasons: ['summer', 'monsoon'],
    sowingMonths: ['June', 'July'],
    benefits: ['Benefit 1', 'Benefit 2']
  }
];
```

### Modifying the Algorithm
The recommendation algorithm is in `mockRecommendationAlgorithm()` function. Current weights:
- Season compatibility: 40%
- Temperature match: 25%
- Rainfall match: 25%
- Soil pH match: 10%

### Integration Points (Backend Ready)
Look for `// BACKEND:` comments throughout the code for integration points:

1. **Crop Recommendations**: Replace `mockRecommendationAlgorithm()` with API calls
2. **Weather Data**: Replace mock data in `WeatherWidget.tsx` with real API
3. **Contact Form**: Add actual email/database submission in `ContactForm.tsx`
4. **Soil Analysis**: Connect to real soil testing services

## 🌐 Production Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

This creates a `dist/` folder with optimized files ready for deployment.

### Environment Variables
For production deployment, you'll need:
- `VITE_WEATHER_API_KEY`: Weather service API key
- `VITE_API_URL`: Backend API endpoint
- `VITE_CONTACT_FORM_ENDPOINT`: Contact form submission URL

### Recommended Hosting
- **Vercel**: Automatic deployments with GitHub integration
- **Netlify**: Easy drag-and-drop deployment
- **GitHub Pages**: Free hosting for static sites
- **AWS S3 + CloudFront**: Enterprise-grade hosting

## 📝 Development Notes

### Code Quality Standards
- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Configured for React and TypeScript best practices
- **Prettier**: Consistent code formatting
- **Component Structure**: Each component is self-contained with clear interfaces

### Browser Compatibility
- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **ES2020 Features**: Used throughout (optional chaining, nullish coalescing)
- **CSS Grid & Flexbox**: For responsive layouts
- **CSS Variables**: For dynamic theming

### Future Enhancements
- [ ] Machine learning integration for improved recommendations
- [ ] Real-time weather API integration
- [ ] User authentication and data sync
- [ ] Mobile app version (React Native)
- [ ] Offline functionality with service workers
- [ ] Multi-language support (i18n)
- [ ] Advanced data visualization charts
- [ ] Integration with IoT sensors for real-time soil data

## 🐛 Known Issues & Limitations

1. **Mock Data**: Weather and some recommendations use simulated data
2. **Image Loading**: Some crop images may load slowly from external sources
3. **Mobile Keyboard**: Form inputs may cause viewport shifts on mobile
4. **Offline Mode**: No offline functionality currently implemented

## 📞 Support & Contributing

### Getting Help
- Check the FAQ section in the application
- Review this README for common issues
- Open an issue on the project repository

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly using the testing guide above
5. Submit a pull request with detailed description

## 📄 License

This project is a demonstration application. In production, you would need to:
- Obtain proper licenses for weather data APIs
- Ensure compliance with agricultural data regulations
- Add appropriate privacy policies for user data collection

---

**Demo Disclaimer**: This is a frontend demonstration showcasing crop recommendation functionality. Production deployment would require backend integration, real data sources, and appropriate agricultural expertise validation.