import React from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { LanguageProvider } from './components/LanguageProvider';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CropRecommendation } from './components/CropRecommendation';
import { FertilizerRecommendation } from './components/FertilizerRecommendation';
import { WeatherWidget } from './components/WeatherWidget';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { PopupManager } from './components/PopupManager';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <Header />
          
          {/* Main Content */}
          <main>
            {/* Hero Section */}
            <Hero />
            
            {/* Crop Recommendation Section */}
            <CropRecommendation />
            
            {/* Fertilizer/Soil Analysis Section */}
            <FertilizerRecommendation />
            
            {/* Weather Widget Section */}
            <section id="weather-widget" className="py-16 px-4">
              <div className="container mx-auto">
                <WeatherWidget />
              </div>
            </section>
            
            {/* FAQ Section */}
            <FAQ />
            
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* Popup System */}
          <PopupManager />
          
          {/* Toast Notifications */}
          <Toaster 
            position="bottom-right"
            expand={false}
            richColors
            closeButton
          />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}