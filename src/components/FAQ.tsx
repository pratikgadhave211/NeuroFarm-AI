import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const faqItems: FAQItem[] = [
    {
      question: "How accurate are the crop recommendations?",
      answer: "Our crop recommendation system uses a comprehensive algorithm that considers multiple factors including soil pH, rainfall, temperature, and seasonal patterns. In real-world applications, this system would achieve approximately 85-95% accuracy when combined with machine learning models trained on extensive agricultural data. The current demo uses a simplified rule-based system for demonstration purposes."
    },
    {
      question: "What data do I need to provide for accurate recommendations?",
      answer: "For the best recommendations, you'll need: (1) Your farm location or region, (2) Current soil pH level, (3) Expected or historical rainfall data, (4) Average temperature for your area, and (5) The growing season you're planning for. More detailed soil analysis data like N-P-K levels can further improve accuracy."
    },
    {
      question: "Can I use this system for organic farming?",
      answer: "Yes! The system includes recommendations for organic fertilizers, compost applications, and sustainable farming practices. The fertilizer recommendation section provides both organic and conventional options, with detailed guidance on application rates and timing for organic materials."
    },
    {
      question: "How often should I update my soil data?",
      answer: "We recommend updating your soil pH and nutrient data at least once per growing season, or ideally every 6 months. Soil conditions can change based on previous crops, weather patterns, and fertilizer applications. Regular testing ensures more accurate recommendations."
    },
    {
      question: "Does the weather widget use real data?",
      answer: "The current weather widget uses mock data for demonstration purposes. In a production environment, it would integrate with real weather APIs like OpenWeatherMap, AccuWeather, or local meteorological services to provide accurate, real-time weather data and forecasts."
    },
    {
      question: "Can I export my recommendations and data?",
      answer: "Yes! You can export your crop recommendations as CSV files for record-keeping and sharing with agricultural advisors. The exported data includes crop names, confidence scores, sowing months, and key benefits. Your input data is also automatically saved locally for future reference."
    },
    {
      question: "What crops are included in the database?",
      answer: "The current demo includes major crops like wheat, corn (maize), rice, and soybean. A full production system would include hundreds of crop varieties covering cereals, legumes, vegetables, fruits, and cash crops, each with detailed growing requirements and regional adaptations."
    },
    {
      question: "How do I interpret the confidence scores?",
      answer: "Confidence scores range from 0-100% and indicate how well your conditions match each crop's optimal requirements. Scores above 80% indicate excellent matches, 60-80% are good options with minor adjustments needed, and 40-60% are possible but may require additional inputs or care."
    },
    {
      question: "Can this system help with crop rotation planning?",
      answer: "While the current version focuses on individual crop recommendations, the underlying data includes information about soil improvement benefits (like nitrogen fixation from legumes) that can inform rotation decisions. A full system would include specific rotation planning features."
    },
    {
      question: "Is there support for different regional conditions?",
      answer: "The system is designed to accommodate different climate zones and regional conditions through the location, temperature, and rainfall inputs. In production, it would include region-specific crop varieties, local pest and disease considerations, and market price data."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our crop recommendation system, 
            soil analysis tools, and weather insights.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-green-600" />
                Common Questions
              </CardTitle>
              <CardDescription>
                Click on any question below to see the detailed answer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};