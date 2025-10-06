import React from 'react';
import MoodTracker from '@/components/mood/MoodTracker';

export default function MoodPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mood Tracker</h1>
      <MoodTracker />
    </div>
  );
}
