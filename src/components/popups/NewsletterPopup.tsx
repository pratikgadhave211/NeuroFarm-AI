import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Mail, Gift, X, CheckCircle } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';
import { toast } from 'sonner@2.0.3';

interface NewsletterPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewsletterPopup({ open, onOpenChange }: NewsletterPopupProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error(t('validEmailRequired'));
      return;
    }

    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(t('newsletterSubscribed'));
    localStorage.setItem('newsletterSubscribed', 'true');
    setIsSubscribing(false);
    onOpenChange(false);
  };

  const handleSkip = () => {
    localStorage.setItem('newsletterDismissed', 'true');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-green-500" />
              {t('newsletterTitle')}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            {t('newsletterDescription')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Benefits */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Gift className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">
                  {t('exclusiveBenefits')}
                </h4>
                <ul className="space-y-1 text-sm text-green-600 dark:text-green-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3" />
                    {t('seasonalTips')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3" />
                    {t('cropAlerts')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3" />
                    {t('expertAdvice')}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleSkip}
                className="flex-1"
              >
                {t('noThanks')}
              </Button>
              <Button 
                type="submit"
                disabled={isSubscribing}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isSubscribing ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    {t('subscribing')}
                  </div>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    {t('subscribe')}
                  </>
                )}
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            {t('unsubscribeAnytime')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}