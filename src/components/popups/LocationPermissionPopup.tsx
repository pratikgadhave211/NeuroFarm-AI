import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { MapPin, CloudRain, Thermometer, AlertCircle } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';
import { toast } from 'sonner@2.0.3';

interface LocationPermissionPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LocationPermissionPopup({ open, onOpenChange }: LocationPermissionPopupProps) {
  const { t } = useLanguage();

  const handleAllowLocation = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      toast.success(t('locationAccessGranted'));
      localStorage.setItem('locationPermission', 'granted');
      onOpenChange(false);
    } catch (error) {
      toast.error(t('locationAccessDenied'));
    }
  };

  const handleSkip = () => {
    localStorage.setItem('locationPermission', 'denied');
    onOpenChange(false);
  };

  const benefits = [
    {
      icon: CloudRain,
      title: t('accurateWeather'),
      description: t('locationBenefit1')
    },
    {
      icon: Thermometer,
      title: t('localConditions'),
      description: t('locationBenefit2')
    },
    {
      icon: MapPin,
      title: t('nearbyResources'),
      description: t('locationBenefit3')
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            {t('locationPermissionTitle')}
          </DialogTitle>
          <DialogDescription>
            {t('locationPermissionDescription')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {t('locationPrivacyNote')}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-800/40">
                    <Icon className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{benefit.title}</h4>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="flex-1"
          >
            {t('skipForNow')}
          </Button>
          <Button 
            onClick={handleAllowLocation}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <MapPin className="h-4 w-4 mr-2" />
            {t('allowLocation')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}