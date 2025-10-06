import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import { GeminiChat } from './chat/GeminiChat';
import FloatingActionButton from './FloatingActionButton';
import { useAuth } from '@/hooks/useAuth';

export const AppLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Skip layout for auth page and teacher dashboard (since TeacherLayout handles its own navigation)
  if (location.pathname === '/auth' || location.pathname.startsWith('/teacher')) {
    return <Outlet />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Floating Chat Widget - outside of layout to persist across routes */}
      <div className="fixed bottom-6 right-6 z-50">
        <GeminiChat />
      </div>
      
      {/* Floating Action Button - Help button visible on all pages except for teachers */}
      {user?.role !== 'teacher' && <FloatingActionButton />}
    </div>
  );
};

export default AppLayout;