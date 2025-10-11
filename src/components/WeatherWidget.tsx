import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Thermometer, Droplets, Wind, Eye, Sun, Cloud, CloudRain, CloudSnow, Zap, MapPin, Loader2, Leaf, AlertTriangle, ThermometerSun, CheckCircle2, Info } from 'lucide-react';
import { toast } from 'sonner';

// Interfaces for API responses
interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  weatherCode: number;
  uvIndex: number;
  precipitation: number;
}

interface DailyForecast {
    date: string;
    weatherCode: number;
    tempMax: number;
    tempMin: number;
}

interface FullWeatherData extends WeatherData {
    forecast: DailyForecast[];
}

interface LocationSearchResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

// Helper to get weather description
const getWeatherDescription = (code: number): string => {
    const descriptions: { [key: number]: string } = {
        0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
        45: 'Fog', 48: 'Depositing rime fog',
        51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
        56: 'Light freezing drizzle', 57: 'Dense freezing drizzle',
        61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
        66: 'Light freezing rain', 67: 'Heavy freezing rain',
        71: 'Slight snow fall', 73: 'Moderate snow fall', 75: 'Heavy snow fall',
        77: 'Snow grains',
        80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
        85: 'Slight snow showers', 86: 'Heavy snow showers',
        95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
    };
    return descriptions[code] || 'Unknown';
};

const WeatherIcon = ({ code, size }: { code: number; size: number }) => {
    if (code >= 0 && code <= 1) return <Sun size={size} />;
    if (code >= 2 && code <= 3) return <Cloud size={size} />;
    if (code >= 51 && code <= 67) return <CloudRain size={size} />;
    if (code >= 71 && code <= 77) return <CloudSnow size={size} />;
    if (code >= 95 && code <= 99) return <Zap size={size} />;
    return <Cloud size={size} />;
};

// Farming Recommendations Logic
type RecommendationType = 'danger' | 'warning' | 'info' | 'success';

interface FarmingRecommendation {
    title: string;
    description: string;
    type: RecommendationType;
    icon: React.ReactNode;
}

const getFarmingRecommendations = (weather: WeatherData): FarmingRecommendation[] => {
    const recommendations: FarmingRecommendation[] = [];
    const { temperature, precipitation, windSpeed, uvIndex, humidity } = weather;

    // Danger conditions (Red)
    if (precipitation > 15 && windSpeed > 25) {
        recommendations.push({
            title: "Severe Storm Alert",
            description: "Dangerous conditions. Avoid fieldwork. Secure all equipment and structures immediately. Monitor for flooding.",
            type: 'danger',
            icon: <AlertTriangle className="text-red-400" />
        });
    }
    if (temperature > 38) {
        recommendations.push({
            title: "Extreme Heatwave",
            description: "Critical stress on crops and livestock. Irrigate heavily during cooler hours (early morning/late evening). Provide shade. Postpone planting.",
            type: 'danger',
            icon: <ThermometerSun className="text-red-400" />
        });
    }

    // Warning conditions (Yellow)
    if (precipitation > 8) {
        recommendations.push({
            title: "Heavy Rainfall Expected",
            description: "Avoid irrigation and ensure proper drainage to prevent waterlogging. Risk of soil erosion on slopes.",
            type: 'warning',
            icon: <CloudRain className="text-yellow-400" />
        });
    }
    if (windSpeed > 20) {
        recommendations.push({
            title: "Strong Winds Alert",
            description: "Protect young or fragile plants. Check and secure structures like greenhouses or trellises. Risk of soil dehydration.",
            type: 'warning',
            icon: <Wind className="text-yellow-400" />
        });
    }
    if (uvIndex > 8) {
        recommendations.push({
            title: "High UV Index",
            description: "Risk of sun scorch on sensitive crops. Ensure adequate hydration and consider applying protective sprays if available.",
            type: 'warning',
            icon: <Sun className="text-yellow-400" />
        });
    }
    if (humidity < 30 && temperature > 25) {
        recommendations.push({
            title: "Low Humidity & Warm",
            description: "Increased water evaporation. Monitor soil moisture closely and apply mulch to conserve water. Watch for signs of plant stress.",
            type: 'warning',
            icon: <Droplets className="text-yellow-400" />
        });
    }

    // Favorable conditions (Green)
    if (recommendations.length === 0) {
        recommendations.push({
            title: "Favorable Conditions",
            description: "Current weather is ideal for most farming activities. A great time for planting, transplanting, or applying fertilizer.",
            type: 'success',
            icon: <CheckCircle2 className="text-green-400" />
        });
    }
    return recommendations;
};

const RecommendationAlert = ({ rec }: { rec: FarmingRecommendation }) => {
    const baseClasses = "relative border rounded-lg p-4 flex items-start gap-4 transition-all duration-300 overflow-hidden backdrop-blur-sm";
    const themeClasses = {
        danger: "bg-gradient-to-r from-red-950/80 via-red-900/70 to-red-950/80 border-red-500 text-red-100 hover:bg-red-900/80 shadow-[inset_0_0_20px_rgba(220,38,38,0.2)]",
        warning: "bg-gradient-to-r from-amber-950/80 via-yellow-900/70 to-amber-950/80 border-yellow-500 text-yellow-100 hover:bg-yellow-900/80 shadow-[inset_0_0_20px_rgba(245,158,11,0.2)]",
        info: "bg-gradient-to-r from-blue-950/80 via-sky-900/70 to-blue-950/80 border-blue-500 text-blue-100 hover:bg-blue-900/80 shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]",
        success: "bg-gradient-to-r from-emerald-950/70 via-green-900/60 to-emerald-950/70 border-green-400 text-green-100 hover:from-emerald-900/70 hover:via-green-800/60 hover:to-emerald-900/70 shadow-lg hover:shadow-xl hover:border-green-300 hover:scale-[1.02] cursor-pointer shadow-[inset_0_0_30px_rgba(16,185,129,0.3)]",
    };

    const accentClasses = {
        danger: "absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-rose-500 via-red-600 to-rose-500 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)]",
        warning: "absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]",
        info: "absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-sky-400 via-blue-500 to-sky-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]",
        success: "absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-emerald-300 via-green-400 to-emerald-300 animate-glow shadow-[0_0_20px_rgba(16,185,129,0.6)]",
    };

    const statusBadgeClasses = {
        danger: "px-3 py-1 bg-gradient-to-r from-red-500/30 to-rose-500/30 rounded-full text-xs border border-red-400/50 text-red-100 shadow-[0_0_10px_rgba(220,38,38,0.3)]",
        warning: "px-3 py-1 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 rounded-full text-xs border border-yellow-400/50 text-yellow-100 shadow-[0_0_10px_rgba(245,158,11,0.3)]",
        info: "px-3 py-1 bg-gradient-to-r from-blue-500/30 to-sky-500/30 rounded-full text-xs border border-blue-400/50 text-blue-100 shadow-[0_0_10px_rgba(59,130,246,0.3)]",
        success: "px-3 py-1 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full text-xs border border-green-400/50 text-green-100 shadow-[0_0_10px_rgba(16,185,129,0.3)]",
    };

    const statusLabels = {
        danger: "Severe Alert",
        warning: "Warning",
        info: "Information",
        success: "Perfect Weather",
    };

    const iconClasses = {
        danger: "text-rose-300 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]",
        warning: "text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]",
        info: "text-sky-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]",
        success: "text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    };

    const titleClasses = {
        danger: "text-rose-100 text-lg drop-shadow-[0_0_2px_rgba(220,38,38,0.5)]",
        warning: "text-amber-100 text-lg drop-shadow-[0_0_2px_rgba(245,158,11,0.5)]",
        info: "text-sky-100 text-lg drop-shadow-[0_0_2px_rgba(59,130,246,0.5)]",
        success: "text-emerald-100 text-lg drop-shadow-[0_0_2px_rgba(16,185,129,0.5)]",
    };

    return (
        <div className={`${baseClasses} ${themeClasses[rec.type]} ${rec.type === 'success' ? 'animate-pulse-slow' : ''}`}>
            <div className={accentClasses[rec.type]} />
            <div className={`mt-1 ml-2 ${iconClasses[rec.type]} ${rec.type === 'success' ? 'animate-bounce-slow' : ''}`}>
                {rec.icon}
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-bold ${titleClasses[rec.type]} flex items-center gap-2`}>
                        {rec.title}
                    </h4>
                    <span className={`${statusBadgeClasses[rec.type]} font-medium`}>
                        {statusLabels[rec.type]}
                    </span>
                </div>
                <p className={`${rec.type === 'success' ? 'text-emerald-100/90' : 'text-sm opacity-90'} leading-relaxed`}>
                    {rec.description}
                </p>
            </div>
        </div>
    );
};


const WeatherMetricCard = ({ icon, value, label, unit, colorClass }: { icon: React.ReactNode; value: string; label: string; unit: string; colorClass: string }) => (
    <Card className={`${colorClass} text-white flex-1 min-w-[150px]`}>
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            {icon}
            <p className="text-3xl font-bold mt-2">{value}</p>
            <p className="text-sm">{label}</p>
            <p className="text-xs opacity-80">{unit}</p>
        </CardContent>
    </Card>
);

const ForecastDayCard = ({ forecast }: { forecast: DailyForecast }) => {
    const date = new Date(forecast.date);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });

    return (
        <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-gray-700 flex-1 text-center min-w-[80px]">
            <p className="font-semibold text-sm">{dayOfWeek}</p>
            <div className="text-yellow-400">
                <WeatherIcon code={forecast.weatherCode} size={24} />
            </div>
            <p className="text-sm font-bold">{forecast.tempMax.toFixed(0)}°</p>
            <p className="text-xs text-gray-400">{forecast.tempMin.toFixed(0)}°</p>
        </div>
    );
};

export const WeatherWidget: React.FC = () => {
  const [city, setCity] = useState('Pune');
  const [weather, setWeather] = useState<FullWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationName, setLocationName] = useState('Pune');

  const fetchCityNameFromCoords = async (lat: number, lon: number): Promise<string> => {
    try {
        // Nominatim API requires a custom User-Agent header for requests.
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, {
            headers: {
                'User-Agent': 'CropRecommendationWebApp/1.0 (https://github.com/your-repo)' // Replace with your app's info
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Reverse geocoding failed:", response.status, errorText);
            return 'Your Current Area';
        }
        const data = await response.json();
        // Prioritize more specific location types: road, suburb, then fall back to city/town.
        return data.address.road || data.address.suburb || data.address.city || data.address.town || data.address.village || 'Your Current Area';
    } catch (error) {
        console.error("Reverse geocoding failed:", error);
        return 'Your Current Area';
    }
  };

  const fetchGeocode = async (cityName: string): Promise<LocationSearchResult | null> => {
    if (!cityName) return null;
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`);
        if (!response.ok) throw new Error('Failed to find location.');
        const data = await response.json();
        if (!data.results || data.results.length === 0) throw new Error(`Could not find location: ${cityName}`);
        return data.results[0];
    } catch (err: any) {
        setError(err.message);
        toast.error(err.message);
        return null;
    }
  };

  const fetchWeather = useCallback(async (lat: number, lon: number, name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&forecast_days=6&timezone=auto`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch weather data.');
      const data = await response.json();

      const forecastData: DailyForecast[] = data.daily.time.slice(1).map((date: string, index: number) => ({
          date,
          weatherCode: data.daily.weather_code[index + 1],
          tempMax: data.daily.temperature_2m_max[index + 1],
          tempMin: data.daily.temperature_2m_min[index + 1],
      }));
      
      setWeather({
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        visibility: data.current.visibility / 1000, // convert to km
        weatherCode: data.current.weather_code,
        uvIndex: data.daily.uv_index_max[0],
        precipitation: data.current.precipitation,
        forecast: forecastData,
      });
      setLocationName(name);
      toast.success(`Weather updated for ${name}`);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = async () => {
    const location = await fetchGeocode(city);
    if (location) {
      fetchWeather(location.latitude, location.longitude, `${location.name}, ${location.country}`);
    }
  };
  
  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const cityName = await fetchCityNameFromCoords(latitude, longitude);
          fetchWeather(latitude, longitude, cityName);
        },
        (err) => {
          toast.error("Geolocation access denied.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const initialSearch = async () => {
        const location = await fetchGeocode(city);
        if (location) {
            fetchWeather(location.latitude, location.longitude, `${location.name}, ${location.country}`);
        }
    };
    initialSearch();
    
    // Auto-refresh every 30 minutes
    const intervalId = setInterval(() => {
        // Re-fetch with the last known city or location
        handleSearch();
    }, 1800000); // 30 * 60 * 1000 ms

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []); // This effect runs only once on mount

  const farmingRecs = weather ? getFarmingRecommendations(weather) : [];

  return (
        <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader>
                    <CardTitle className="flex items-center"><MapPin className="mr-2 text-green-400" /> Local Weather</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>Enter your city to get current weather conditions and a 5-day forecast.</p>
                    <div className="flex gap-2">
                        <Input 
                            type="text" 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter city name..."
                            className="bg-gray-700 border-gray-600 text-white"
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Get Weather'}
                        </Button>
                        <Button onClick={handleGeoLocation} variant="outline" className="bg-transparent border-green-500 text-green-400 hover:bg-green-900 hover:text-white" title="Use my current location">
                            <MapPin size={16} />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {isLoading && !weather && (
                <div className="flex justify-center items-center p-8">
                    <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
                </div>
            )}

            {error && !weather && (
                 <Alert variant="destructive">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {weather && (
                <>
                    <Card className="bg-gray-800 border-gray-700 text-white">
                        <CardHeader>
                            <CardTitle>Current Weather - {locationName}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-4 justify-center">
                                <WeatherMetricCard icon={<Thermometer />} value={`${weather.temperature.toFixed(0)}°C`} label="Temperature" unit="" colorClass="bg-blue-600" />
                                <WeatherMetricCard icon={<Droplets />} value={`${weather.humidity}%`} label="Humidity" unit="" colorClass="bg-green-600" />
                                <WeatherMetricCard icon={<Wind />} value={`${weather.windSpeed.toFixed(0)}`} label="Wind" unit="km/h" colorClass="bg-purple-600" />
                                <WeatherMetricCard icon={<Eye />} value={`${weather.visibility.toFixed(1)}`} label="Visibility" unit="km" colorClass="bg-orange-600" />
                            </div>
                            <div className="flex justify-between items-center text-sm pt-4">
                                <span className="bg-gray-700 px-3 py-1 rounded-full">{getWeatherDescription(weather.weatherCode)}</span>
                                <div className="flex gap-4">
                                    <span>UV Index: {weather.uvIndex.toFixed(0)}</span>
                                    <span>Precipitation: {weather.precipitation.toFixed(1)}mm</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700 text-white">
                        <CardHeader>
                            <CardTitle>5-Day Forecast</CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-2 justify-between">
                            {weather.forecast.map(day => (
                                <ForecastDayCard key={day.date} forecast={day} />
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center"><Leaf className="mr-2 text-green-400" /> Farming Recommendations</CardTitle>
                            <p className="text-sm text-gray-400">Weather-based advice for your farming activities</p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {farmingRecs.map((rec, index) => (
                                <RecommendationAlert key={index} rec={rec} />
                            ))}
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
};