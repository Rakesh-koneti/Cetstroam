import { useState, useEffect } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { useTheme } from '../lib/theme-context';

export function LaunchAnnouncement() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showBanner, setShowBanner] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const bannerDismissed = localStorage.getItem('launchBannerDismissed');
    const lastDismissed = localStorage.getItem('launchBannerLastDismissed');

    if (bannerDismissed && lastDismissed) {
      // Show banner again after 12 hours
      const hoursSinceDismissed = (Date.now() - parseInt(lastDismissed)) / (1000 * 60 * 60);
      if (hoursSinceDismissed >= 12) {
        localStorage.removeItem('launchBannerDismissed');
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  // Update countdown every minute
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const launchDate = new Date('2025-03-15T00:00:00');
      const now = new Date();
      const remaining = launchDate.getTime() - now.getTime();
      
      setTimeRemaining({
        days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
        hours: Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
      });
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('launchBannerDismissed', 'true');
    localStorage.setItem('launchBannerLastDismissed', Date.now().toString());
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className={`rounded-lg p-2 shadow-lg sm:p-3 ${
          isDark 
            ? 'bg-violet-900/90 backdrop-blur-sm ring-1 ring-violet-500/50' 
            : 'bg-violet-600'
        }`}>
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex w-0 flex-1 items-center">
              <Calendar className="h-6 w-6 text-white" />
              <p className="ml-3 truncate font-medium text-white">
                <span className="inline-block align-middle">
                  <span className="md:hidden">Launching March 15, 2025!</span>
                  <span className="hidden md:inline">
                    Get ready! Our platform launches on March 15, 2025
                  </span>
                </span>
              </p>
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto order-3 sm:order-2 mt-2 sm:mt-0">
              <div className={`flex items-center justify-center rounded-md px-4 py-2 ${
                isDark ? 'bg-violet-800' : 'bg-violet-500'
              }`}>
                <Clock className="h-5 w-5 text-violet-100" />
                <div className="ml-2 text-white">
                  <span className="font-bold">{timeRemaining.days}d </span>
                  <span className="font-bold">{timeRemaining.hours}h </span>
                  <span className="font-bold">{timeRemaining.minutes}m</span>
                  <span className="ml-1 text-violet-100">remaining</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 order-2 sm:order-3 sm:ml-2">
              <button
                type="button"
                className={`-mr-1 flex rounded-md p-2 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-white ${
                  isDark ? 'hover:bg-violet-800' : ''
                }`}
                onClick={handleDismiss}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 