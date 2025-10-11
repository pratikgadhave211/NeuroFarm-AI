import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { CheckCircle, Sprout, CloudRain, BarChart3 } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

interface WelcomePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WelcomePopup({ open, onOpenChange }: WelcomePopupProps) {
  const { t } = useLanguage();

  const features = [
    {
      icon: Sprout,
      title: t('cropRecommendation'),
      description: t('welcomeFeature1')
    },
    {
      icon: CloudRain,
      title: t('weatherForecasting'),
      description: t('welcomeFeature2')
    },
    {
      icon: BarChart3,
      title: t('soilAnalysis'),
      description: t('welcomeFeature3')
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-green-600">
            {t('welcomeTitle')}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t('welcomeSubtitle')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-800/40">
                  <Icon className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center pt-4">
          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {t('getStarted')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}