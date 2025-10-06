import React from 'react';
import { Outlet } from 'react-router-dom';
import TeacherNavigation from './TeacherNavigation';
import { GeminiChat } from '../chat/GeminiChat';

const TeacherLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <TeacherNavigation />
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
      
      {/* Floating Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <GeminiChat />
      </div>
    </div>
  );
};

export default TeacherLayout;