import React, { useState, useRef, KeyboardEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Loader2, Download, RefreshCw, MapPin, Thermometer, CloudRain, Beaker } from 'lucide-react';
import { toast } from 'sonner';
import { SoilClimateAnalysis } from './SoilClimateAnalysis';

interface RecommendationResult {
  crop: string;
  crop_image: string;
}

interface FormData {
  n: string;
  p: string;
  k: string;
  temperature: string;
  humidity: string;
  ph: string;
  rainfall: string;
  season: string;
}

export const CropRecommendation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    n: '',
    p: '',
    k: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
    season: '',
  });
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  type InputRef = React.RefObject<HTMLInputElement>;
  type ButtonRef = React.RefObject<HTMLButtonElement>;

  const inputRefs = [
    useRef<HTMLInputElement>(null), // n
    useRef<HTMLInputElement>(null), // p
    useRef<HTMLInputElement>(null), // k
    useRef<HTMLInputElement>(null), // temperature
    useRef<HTMLInputElement>(null), // humidity
    useRef<HTMLInputElement>(null), // ph
    useRef<HTMLInputElement>(null), // rainfall
    useRef<HTMLSelectElement>(null) // season
  ] as const;

  const handleKeyDown = (e: KeyboardEvent, currentIndex: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % inputRefs.length;
      inputRefs[nextIndex].current?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + inputRefs.length) % inputRefs.length;
      inputRefs[prevIndex].current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    const form = new FormData();
    form.append('N', formData.n);
    form.append('P', formData.p);
    form.append('K', formData.k);
    form.append('temperature', formData.temperature);
    form.append('humidity', formData.humidity);
    form.append('ph', formData.ph);
    form.append('rainfall', formData.rainfall);
    form.append('season', formData.season);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      setResult(data);
      toast.success(`Recommended crop: ${data.crop}`);
    } catch (error: any) {
      // This will now catch network errors and errors thrown from the block above
      const errorMessage = error.message || 'An unexpected error occurred. Check the console and backend server for details.';
      toast.error(errorMessage);
      console.error('Prediction error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    setFormData({
      n: '90',
      p: '42',
      k: '43',
      temperature: '20.8',
      humidity: '82',
      ph: '6.5',
      rainfall: '202',
      season: 'Rabi',
    });
    setErrors({});
    toast.success('Sample data loaded');
  };

  const resetForm = () => {
    setFormData({
      n: '',
      p: '',
      k: '',
      temperature: '',
      humidity: '',
      ph: '',
      rainfall: '',
      season: '',
    });
    setResult(null);
    setErrors({});
    toast.success('Form has been reset');
    inputRefs[0].current?.focus();
  };

  const exportResults = () => {
    if (!result) {
      toast.error('No result to export');
      return;
    }

    const csvContent = [
      ['Crop Name', 'Image URL'],
      [result.crop, result.crop_image]
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crop-recommendation-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Result exported to CSV');
  };

  return (
    <section id="crop-recommendation" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Crop Recommendation System
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get personalized crop recommendations based on your local conditions. 
            Our algorithm analyzes soil pH, rainfall, temperature, and seasonal patterns 
            to suggest the most suitable crops for your farm.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                Farm Details
              </CardTitle>
              <CardDescription>
                Enter your farm's soil and weather conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="n">Nitrogen (N)</Label>
                    <Input id="n" placeholder="e.g., 90" value={formData.n} onChange={(e) => setFormData(prev => ({ ...prev, n: e.target.value }))} ref={inputRefs[0]} onKeyDown={(e) => handleKeyDown(e, 0)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="p">Phosphorus (P)</Label>
                    <Input id="p" placeholder="e.g., 42" value={formData.p} onChange={(e) => setFormData(prev => ({ ...prev, p: e.target.value }))} ref={inputRefs[1]} onKeyDown={(e) => handleKeyDown(e, 1)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="k">Potassium (K)</Label>
                    <Input id="k" placeholder="e.g., 43" value={formData.k} onChange={(e) => setFormData(prev => ({ ...prev, k: e.target.value }))} ref={inputRefs[2]} onKeyDown={(e) => handleKeyDown(e, 2)} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature" className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4" />
                      Temperature (°C)
                    </Label>
                    <Input
                      id="temperature"
                      type="number"
                      placeholder="e.g., 20.8"
                      value={formData.temperature}
                      onChange={(e) => setFormData(prev => ({ ...prev, temperature: e.target.value }))}
                      ref={inputRefs[3]} onKeyDown={(e) => handleKeyDown(e, 3)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="humidity" className="flex items-center gap-2">
                      <CloudRain className="h-4 w-4" />
                      Humidity (%)
                    </Label>
                    <Input
                      id="humidity"
                      type="number"
                      placeholder="e.g., 82"
                      value={formData.humidity}
                      onChange={(e) => setFormData(prev => ({ ...prev, humidity: e.target.value }))}
                      ref={inputRefs[4]} onKeyDown={(e) => handleKeyDown(e, 4)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ph" className="flex items-center gap-2">
                      <Beaker className="h-4 w-4" />
                      Soil pH
                    </Label>
                    <Input
                      id="ph"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 6.5"
                      value={formData.ph}
                      onChange={(e) => setFormData(prev => ({ ...prev, ph: e.target.value }))}
                      ref={inputRefs[5]} onKeyDown={(e) => handleKeyDown(e, 5)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rainfall" className="flex items-center gap-2">
                      <CloudRain className="h-4 w-4" />
                      Rainfall (mm)
                    </Label>
                    <Input
                      id="rainfall"
                      type="number"
                      placeholder="e.g., 202"
                      value={formData.rainfall}
                      onChange={(e) => setFormData(prev => ({ ...prev, rainfall: e.target.value }))}
                      ref={inputRefs[6]} onKeyDown={(e) => handleKeyDown(e, 6)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="season">Season</Label>
                  <Select
                    value={formData.season}
                    onValueChange={(value: string) => setFormData(prev => ({ ...prev, season: value }))}
                  >
                    <SelectTrigger onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => handleKeyDown(e, 7)}>
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kharif">Kharif</SelectItem>
                      <SelectItem value="Rabi">Rabi</SelectItem>
                      <SelectItem value="Zaid">Zaid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Get Recommendations'
                    )}
                  </Button>
                  {result && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      disabled={isLoading}
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Predict Again
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={loadSampleData}
                    disabled={isLoading}
                    title="Load Sample Data"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {result && !isLoading && (
              <>
                <SoilClimateAnalysis data={formData} />
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Recommended Crop
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportResults}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
                <Card className="shadow-lg overflow-hidden relative text-white">
                  <ImageWithFallback
                    src={result.crop_image}
                    alt={result.crop}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
                  <CardContent className="p-6 relative z-10 flex flex-col justify-end h-56">
                    <Badge variant="secondary" className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border-none">
                      Best for {formData.season}
                    </Badge>
                    <h4 className="text-3xl font-bold drop-shadow-lg">
                      {result.crop}
                    </h4>
                    <p className="text-sm text-gray-200 drop-shadow-md">
                      Predicted as the most suitable crop for your conditions.
                    </p>
                  </CardContent>
                </Card>
              </>
            )}

            {!result && !isLoading && (
              <Alert>
                <AlertDescription>
                  Fill in your farm details and click "Get Recommendations" to see the suitable crop for your conditions.
                </AlertDescription>
              </Alert>
            )}
            
            {isLoading && (
                <div className="flex justify-center items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};