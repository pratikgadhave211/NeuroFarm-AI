import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Lightbulb, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

interface AgriTipsPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AgriTipsPopup({ open, onOpenChange }: AgriTipsPopupProps) {
  const { t } = useLanguage();
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      category: t('soilHealth'),
      title: t('tip1Title'),
      content: t('tip1Content'),
      color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    },
    {
      category: t('waterManagement'),
      title: t('tip2Title'),
      content: t('tip2Content'),
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    },
    {
      category: t('pestControl'),
      title: t('tip3Title'),
      content: t('tip3Content'),
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
    }
  ];

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const currentTipData = tips[currentTip];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              {t('dailyTip')}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <Badge className={currentTipData.color}>
            {currentTipData.category}
          </Badge>
          
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">{currentTipData.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {currentTipData.content}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTip}
              disabled={tips.length <= 1}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {t('previous')}
            </Button>
            
            <div className="flex gap-1">
              {tips.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentTip 
                      ? 'bg-green-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextTip}
              disabled={tips.length <= 1}
            >
              {t('next')}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}