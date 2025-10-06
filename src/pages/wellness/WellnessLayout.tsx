import React, { ReactNode, useCallback } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItem {
  value: string;
  label: string;
  tooltip: string;
  path: string;
}

const WellnessLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'dashboard';

  // Smooth scroll to the main content section
  const scrollToJourney = useCallback(() => {
    const el = document.getElementById('wellness-journey');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const navItems: NavItem[] = [
    { value: 'dashboard', label: 'Dashboard', tooltip: 'Overview of your wellness stats', path: '/wellness/dashboard' },
    { value: 'mood', label: 'Mood', tooltip: 'Track your daily mood', path: '/wellness/mood' },
    { value: 'journal', label: 'Journal', tooltip: 'Guided journaling exercises', path: '/wellness/journal' },
    { value: 'goals', label: 'Goals', tooltip: 'Set and track wellness goals', path: '/wellness/goals' },
    { value: 'badges', label: 'Badges', tooltip: 'Earn badges for progress', path: '/wellness/badges' },
    { value: 'contact', label: 'Contact', tooltip: 'Connect with support', path: '/wellness/contact' },
    { value: 'feedback', label: 'Feedback', tooltip: 'Share your feedback', path: '/wellness/feedback' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-teal-100 to-blue-100 rounded-xl shadow mb-10 p-8 flex flex-col md:flex-row items-center justify-between overflow-hidden">
        <div className="z-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-2">Welcome to Your Wellness Journey</h2>
          <p className="text-lg text-teal-700 mb-4 max-w-xl">
            Every step counts. Track your progress, set goals, and connect with a supportive community.
          </p>
          <div className="italic text-teal-600 mb-4">
            "Taking care of your mind is the first step to unlocking your true potential."
          </div>
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded-full shadow transition-all"
            onClick={scrollToJourney}
          >
            Get Started
          </button>
        </div>
        <img
          src="/wellness-illustration.svg"
          alt="Wellness Illustration"
          className="w-48 md:w-64 lg:w-80 mt-6 md:mt-0 z-0 drop-shadow-xl"
          style={{ minWidth: 180 }}
        />
        <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-blue-200 opacity-30 blur-3xl z-0" />
      </div>

      <div id="wellness-journey" className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center gap-1">
            {navItems.map((item) => (
              <li key={item.value} className="relative group">
                <Link
                  to={item.path}
                  className={cn(
                    'block px-4 py-2 text-sm font-medium rounded-md mx-1 transition-colors duration-200',
                    currentPath === item.value 
                      ? 'text-blue-600 font-semibold bg-blue-50' 
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                  aria-label={item.tooltip}
                >
                  {item.label}
                </Link>
                <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 z-10 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity duration-200" 
                      style={{ whiteSpace: 'nowrap', bottom: '-2.5rem' }}>
                  {item.tooltip}
                </span>
              </li>
            ))}
          </ul>
        </nav>

        {/* Page Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WellnessLayout;
