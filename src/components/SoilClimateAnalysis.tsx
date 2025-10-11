import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Leaf, Thermometer, Droplets, Beaker, CloudRain } from 'lucide-react';

interface SoilClimateAnalysisProps {
  data: {
    n: string;
    p: string;
    k: string;
    temperature: string;
    humidity: string;
    ph: string;
    rainfall: string;
  };
}

const AnalysisItem = ({ icon, label, value, unit, status }: { icon: React.ReactNode; label: string; value: number; unit: string; status: 'Low' | 'Moderate' | 'Optimal' | 'High' }) => {
  const statusColors = {
    Optimal: 'text-green-600 dark:text-green-400',
    Moderate: 'text-yellow-600 dark:text-yellow-400',
    Low: 'text-red-600 dark:text-red-400',
    High: 'text-red-600 dark:text-red-400',
  };

  const colorClass = statusColors[status];

  return (
    <div className="relative p-4">
      <div className="flex justify-between items-center">
        <div className={`flex items-center gap-2 ${colorClass}`}>
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        <div className={`text-sm font-semibold ${colorClass}`}>
          {status}
        </div>
      </div>
      <div className="text-center mt-2">
        <p className={`text-5xl font-bold ${colorClass}`}>
          {value.toFixed(1)}
          <span className="text-2xl font-medium align-baseline">{unit ? ` ${unit}` : ''}</span>
        </p>
      </div>
    </div>
  );
};

const getStatus = (value: number, low: number, moderate: number, optimal: number): 'Low' | 'Moderate' | 'Optimal' | 'High' => {
  if (value < low) return 'Low';
  if (value >= low && value < moderate) return 'Moderate';
  if (value >= moderate && value <= optimal) return 'Optimal';
  return 'High';
};


export const SoilClimateAnalysis: React.FC<SoilClimateAnalysisProps> = ({ data }) => {
  const n = parseFloat(data.n) || 0;
  const p = parseFloat(data.p) || 0;
  const k = parseFloat(data.k) || 0;
  const temperature = parseFloat(data.temperature) || 0;
  const humidity = parseFloat(data.humidity) || 0;
  const ph = parseFloat(data.ph) || 0;
  const rainfall = parseFloat(data.rainfall) || 0;

  return (
    <Card className="shadow-lg bg-white dark:bg-gray-800">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">Soil & Climate Analysis</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">Based on the provided data.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnalysisItem icon={<Leaf size={20} />} label="Nitrogen" value={n} unit="kg/ha" status={getStatus(n, 20, 50, 100)} />
        <AnalysisItem icon={<Leaf size={20} />} label="Phosphorus" value={p} unit="kg/ha" status={getStatus(p, 30, 60, 100)} />
        <AnalysisItem icon={<Leaf size={20} />} label="Potassium" value={k} unit="kg/ha" status={getStatus(k, 40, 80, 150)} />
        <AnalysisItem icon={<Beaker size={20} />} label="Soil pH" value={ph} unit="" status={getStatus(ph, 6, 6.5, 7.5)} />
        <AnalysisItem icon={<Thermometer size={20} />} label="Temperature" value={temperature} unit="°C" status={getStatus(temperature, 18, 25, 32)} />
        <AnalysisItem icon={<Droplets size={20} />} label="Humidity" value={humidity} unit="%" status={getStatus(humidity, 60, 75, 90)} />
        <div className="md:col-span-2">
            <AnalysisItem icon={<CloudRain size={20} />} label="Rainfall" value={rainfall} unit="mm" status={getStatus(rainfall, 100, 150, 250)} />
        </div>
      </CardContent>
    </Card>
  );
};
