import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../lib/theme-context';
import { Button } from '../components/ui/button';
import {
  BookOpen,
  Brain,
  Clock,
  GraduationCap,
  LineChart,
  Shield,
  Sparkles,
  Target,
  Calendar,
  Beaker,
  Users,
} from 'lucide-react';
import { LaunchAnnouncement } from '../components/launch-announcement';

export function HomePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update date/time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleStartPractice = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = '/exams';
  };

  const features = [
    {
      name: 'Engineering',
      description: 'Comprehensive practice tests for engineering entrance exams',
      icon: Brain,
    },
    {
      name: 'Pharmacy',
      description: 'Specialized tests for pharmacy entrance examinations',
      icon: Beaker,
    },
    {
      name: 'Expert Content',
      description: 'Questions designed by subject matter experts',
      icon: GraduationCap,
    },
    {
      name: 'Community',
      description: 'Join thousands of students preparing together',
      icon: Users,
    },
  ];

  return (
    <div className="relative">
      {/* Current Date/Time Display */}
      <div className={`fixed top-20 right-4 p-4 rounded-lg shadow-lg backdrop-blur-sm ${
        isDark ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-gray-900'
      }`}>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-violet-600" />
          <span className="font-medium">
            {currentDateTime.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Clock className="h-5 w-5 text-violet-600" />
          <span className="font-medium">
            {currentDateTime.toLocaleTimeString('en-US')}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            {/* Launch Announcement */}
            <div className={`mb-8 p-4 rounded-lg ${
              isDark 
                ? 'bg-violet-900/90 ring-2 ring-violet-500' 
                : 'bg-violet-600'
            }`}>
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-white animate-pulse" />
                <p className="font-bold text-white text-lg">
                  Platform Launch: March 15, 2025
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2 text-violet-100">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Get ready for an enhanced learning experience!</span>
              </div>
            </div>

            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="/exams" className="inline-flex space-x-6">
                <span className={`rounded-full px-3 py-1 text-sm font-semibold leading-6 ${
                  isDark 
                    ? 'bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20' 
                    : 'bg-violet-600/10 text-violet-600 ring-1 ring-violet-600/20'
                }`}>
                  Coming Soon
                </span>
                <span className={`inline-flex items-center space-x-2 text-sm font-medium leading-6 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <span>Launch date: March 15, 2025</span>
                </span>
              </a>
            </div>
            <h1 className={`mt-10 text-4xl font-bold tracking-tight sm:text-6xl ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Prepare for your future with our practice tests
            </h1>
            <p className={`mt-6 text-lg leading-8 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Get ready for your entrance exams with our comprehensive practice tests. 
              Choose from engineering or pharmacy streams and start your preparation journey.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="/exams"
                className={`rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isDark 
                    ? 'bg-violet-500 hover:bg-violet-400 focus-visible:outline-violet-500' 
                    : 'bg-violet-600 hover:bg-violet-500 focus-visible:outline-violet-600'
                }`}
              >
                Browse Tests
              </a>
              <a href="/about" className={`text-sm font-semibold leading-6 ${
                isDark ? 'text-gray-300' : 'text-gray-900'
              }`}>
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={`text-base font-semibold leading-7 ${
            isDark ? 'text-violet-400' : 'text-violet-600'
          }`}>Everything you need</h2>
          <p className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Comprehensive Test Platform
          </p>
          <p className={`mt-6 text-lg leading-8 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Our platform offers a wide range of features to help you prepare effectively for your entrance exams.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className={`flex flex-col ${
                isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
              } rounded-lg p-4 transition-colors`}>
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon className={`h-5 w-5 flex-none ${
                    isDark ? 'text-violet-400' : 'text-violet-600'
                  }`} />
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{feature.name}</span>
                </dt>
                <dd className={`mt-4 flex flex-auto flex-col text-base leading-7 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Launch Announcement */}
      <LaunchAnnouncement />
    </div>
  );
}