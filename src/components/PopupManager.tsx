import React, { useState, useEffect } from 'react';
import { WelcomePopup } from './popups/WelcomePopup';
import { AgriTipsPopup } from './popups/AgriTipsPopup';
import { LocationPermissionPopup } from './popups/LocationPermissionPopup';
import { NewsletterPopup } from './popups/NewsletterPopup';

export function PopupManager() {
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  useEffect(() => {
    // Show welcome popup for first-time visitors
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
      setTimeout(() => setWelcomeOpen(true), 1000);
    }

    // Show location permission popup after welcome popup
    const locationPermission = localStorage.getItem('locationPermission');
    if (!locationPermission && navigator.geolocation) {
      setTimeout(() => setLocationOpen(true), hasVisited ? 2000 : 8000);
    }

    // Show newsletter popup for returning users
    const newsletterSubscribed = localStorage.getItem('newsletterSubscribed');
    const newsletterDismissed = localStorage.getItem('newsletterDismissed');
    if (hasVisited && !newsletterSubscribed && !newsletterDismissed) {
      setTimeout(() => setNewsletterOpen(true), 15000); // After 15 seconds
    }

    // Show daily tips popup
    const lastTipShown = localStorage.getItem('lastTipShown');
    const today = new Date().toDateString();
    if (hasVisited && lastTipShown !== today) {
      setTimeout(() => {
        setTipsOpen(true);
        localStorage.setItem('lastTipShown', today);
      }, 10000); // After 10 seconds
    }
  }, []);

  const handleWelcomeClose = (open: boolean) => {
    setWelcomeOpen(open);
    if (!open) {
      // After welcome popup closes, maybe show location permission
      const locationPermission = localStorage.getItem('locationPermission');
      if (!locationPermission && navigator.geolocation) {
        setTimeout(() => setLocationOpen(true), 2000);
      }
    }
  };

  return (
    <>
      <WelcomePopup
        open={welcomeOpen}
        onOpenChange={handleWelcomeClose}
      />
      
      <AgriTipsPopup
        open={tipsOpen}
        onOpenChange={setTipsOpen}
      />
      
      <LocationPermissionPopup
        open={locationOpen}
        onOpenChange={setLocationOpen}
      />
      
      <NewsletterPopup
        open={newsletterOpen}
        onOpenChange={setNewsletterOpen}
      />
    </>
  );
}