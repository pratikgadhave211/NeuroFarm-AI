import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Beaker, Leaf, TrendingUp, Info, BarChart3 } from 'lucide-react';

interface SoilAnalysis {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  ph: number;
}

interface FertilizerRecommendation {
  type: string;
  amount: string;
  timing: string;
  benefits: string[];
  npkRatio: string;
}

export const FertilizerRecommendation: React.FC = () => {
  const [currentView, setCurrentView] = useState<'basic' | 'advanced'>('basic');
  
  // Mock soil analysis data - BACKEND: Replace with real soil test results
  const soilAnalysis: SoilAnalysis = {
    nitrogen: 65,
    phosphorus: 45,
    potassium: 75,
    organicMatter: 3.2,
    ph: 6.5,
  };

  // Mock fertilizer recommendations - BACKEND: Replace with ML-based recommendations
  const fertilizerRecommendations: FertilizerRecommendation[] = [
    {
      type: 'Organic Compost',
      amount: '2-3 tons per hectare',
      timing: 'Before sowing',
      benefits: ['Improves soil structure', 'Increases water retention', 'Adds beneficial microorganisms'],
      npkRatio: '2-1-1',
    },
    {
      type: 'NPK Balanced',
      amount: '150 kg per hectare',
      timing: 'At sowing + 30 days after',
      benefits: ['Balanced nutrition', 'Quick nutrient availability', 'Supports healthy growth'],
      npkRatio: '10-10-10',
    },
    {
      type: 'Phosphorus Booster',
      amount: '50 kg per hectare',
      timing: 'Root development stage',
      benefits: ['Enhanced root growth', 'Better flowering', 'Improved yield quality'],
      npkRatio: '0-20-0',
    },
  ];

  const getNutrientStatus = (value: number): { status: string; color: string; message: string } => {
    if (value >= 70) return { status: 'High', color: 'text-green-600', message: 'Optimal levels' };
    if (value >= 40) return { status: 'Medium', color: 'text-yellow-600', message: 'Adequate levels' };
    return { status: 'Low', color: 'text-red-600', message: 'Needs improvement' };
  };

  const nutrients = [
    { name: 'Nitrogen (N)', value: soilAnalysis.nitrogen, icon: Leaf, description: 'Essential for leaf growth and chlorophyll production' },
    { name: 'Phosphorus (P)', value: soilAnalysis.phosphorus, icon: TrendingUp, description: 'Critical for root development and flowering' },
    { name: 'Potassium (K)', value: soilAnalysis.potassium, icon: Beaker, description: 'Important for disease resistance and fruit quality' },
  ];

  return (
    <section id="fertilizer-recommendation" className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Soil Analysis & Fertilizer Recommendations
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get detailed insights into your soil health and personalized fertilizer recommendations 
            to optimize crop nutrition and maximize yields.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as 'basic' | 'advanced')}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="basic">Basic View</TabsTrigger>
                <TabsTrigger value="advanced">Advanced View</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="basic" className="space-y-8">
              {/* Soil Health Overview */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Soil Health Overview
                  </CardTitle>
                  <CardDescription>
                    Current nutrient levels in your soil based on recent analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {nutrients.map((nutrient) => {
                      const status = getNutrientStatus(nutrient.value);
                      const Icon = nutrient.icon;
                      
                      return (
                        <div key={nutrient.name} className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-gray-600" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {nutrient.name}
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {nutrient.value}%
                              </span>
                              <Badge variant={status.status === 'High' ? 'default' : status.status === 'Medium' ? 'secondary' : 'destructive'}>
                                {status.status}
                              </Badge>
                            </div>
                            <Progress value={nutrient.value} className="h-2" />
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {status.message}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Alert className="mt-6">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Soil pH: {soilAnalysis.ph} | Organic Matter: {soilAnalysis.organicMatter}% 
                      - Your soil conditions are generally favorable for most crops.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Basic Recommendations */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fertilizerRecommendations.map((recommendation, index) => (
                  <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{recommendation.type}</CardTitle>
                      <CardDescription>{recommendation.timing}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {recommendation.amount}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Recommended dosage
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900 dark:text-white">Key Benefits:</h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          {recommendation.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-8">
              {/* Detailed Nutrient Analysis */}
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Detailed Nutrient Analysis</CardTitle>
                    <CardDescription>
                      Comprehensive breakdown of soil nutrient composition
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {nutrients.map((nutrient) => {
                      const status = getNutrientStatus(nutrient.value);
                      const Icon = nutrient.icon;
                      
                      return (
                        <div key={nutrient.name} className="space-y-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className="h-5 w-5 text-gray-600" />
                              <span className="font-medium text-gray-900 dark:text-white">
                                {nutrient.name}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {nutrient.value}%
                              </div>
                              <Badge variant={status.status === 'High' ? 'default' : status.status === 'Medium' ? 'secondary' : 'destructive'}>
                                {status.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <Progress value={nutrient.value} className="h-3" />
                          
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {nutrient.description}
                            </p>
                            <p className={`text-sm font-medium ${status.color}`}>
                              {status.message}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h5 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                        Additional Soil Properties
                      </h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">pH Level:</span>
                          <span className="ml-2 font-medium text-gray-900 dark:text-white">
                            {soilAnalysis.ph} (Slightly Acidic)
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Organic Matter:</span>
                          <span className="ml-2 font-medium text-gray-900 dark:text-white">
                            {soilAnalysis.organicMatter}% (Good)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Advanced Fertilizer Recommendations */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>N-P-K Recommendations</CardTitle>
                    <CardDescription>
                      Specific nutrient requirements and application rates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {fertilizerRecommendations.map((recommendation, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">
                              {recommendation.type}
                            </h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              NPK Ratio: {recommendation.npkRatio}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {recommendation.amount}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                            <div className="text-sm font-medium text-green-700 dark:text-green-400">N</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {recommendation.npkRatio.split('-')[0]}%
                            </div>
                          </div>
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                            <div className="text-sm font-medium text-blue-700 dark:text-blue-400">P</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {recommendation.npkRatio.split('-')[1]}%
                            </div>
                          </div>
                          <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                            <div className="text-sm font-medium text-orange-700 dark:text-orange-400">K</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {recommendation.npkRatio.split('-')[2]}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <span className="font-medium text-gray-900 dark:text-white">Timing: </span>
                          <span className="text-gray-600 dark:text-gray-300">{recommendation.timing}</span>
                        </div>
                      </div>
                    ))}

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        These recommendations are based on current soil analysis. 
                        Consult with a local agricultural expert for field-specific advice.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>

              {/* Soil Improvement Tips */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Soil Improvement Recommendations</CardTitle>
                  <CardDescription>
                    Long-term strategies to enhance soil health and productivity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h5 className="font-medium text-gray-900 dark:text-white">Short-term Actions (1-3 months)</h5>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          Apply recommended fertilizers at proper timing
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          Improve soil drainage if waterlogging occurs
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          Consider lime application to adjust pH if needed
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h5 className="font-medium text-gray-900 dark:text-white">Long-term Strategies (6-12 months)</h5>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          Implement crop rotation with legumes
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          Increase organic matter through compost
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          Use cover crops during fallow periods
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};