
import React, { useState } from 'react';
import NBackGame from './NBackGame';
import StroopGame from './StroopGame';
import EmotionRecognitionGame from './EmotionRecognitionGame';
import BubbleBreathingGame from './BubbleBreathingGame';
import DigitSpanGame from './DigitSpanGame';
import ReactionTimeGame from './ReactionTimeGame';
import PatternMemoryGame from './PatternMemoryGame';
import MoodTrackerGame from './MoodTrackerGame';
import SequenceStoryGame from './SequenceStoryGame';
import SpatialPuzzleGame from './SpatialPuzzleGame';
import StrategyPlannerGame from './StrategyPlannerGame';
import EmpathyRoleplayGame from './EmpathyRoleplayGame';
import FocusMarathonGame from './FocusMarathonGame';
import LogicPuzzleGame from './LogicPuzzleGame';
import WordMemoryGame from './WordMemoryGame';
import MultiTaskMasterGame from './MultiTaskMasterGame';

interface GameContainerProps {
  gameType: string;
  onComplete: (score: number, timeSpent: number) => void;
  onBack: () => void;
}

const GameContainer: React.FC<GameContainerProps> = ({ gameType, onComplete, onBack }) => {
  const [startTime] = useState<number>(Date.now());
  
  const handleGameComplete = (score: number) => {
    const endTime = Date.now();
    const timeSpent = Math.round((endTime - startTime) / 1000); // in seconds
    onComplete(score, timeSpent);
  };
  const renderGame = () => {
    switch (gameType) {
      case 'nback':
        return <NBackGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'stroop':
        return <StroopGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'emotion':
        return <EmotionRecognitionGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'breathing':
        return <BubbleBreathingGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'digit':
        return <DigitSpanGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'reaction':
        return <ReactionTimeGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'pattern':
        return <PatternMemoryGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'mood-tracker':
        return <MoodTrackerGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'sequence-story':
        return <SequenceStoryGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'spatial-puzzle':
        return <SpatialPuzzleGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'strategy-planner':
        return <StrategyPlannerGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'empathy-roleplay':
        return <EmpathyRoleplayGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'focus-marathon':
        return <FocusMarathonGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'logic-puzzle':
        return <LogicPuzzleGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'word':
        return <WordMemoryGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'multi-task':
        return <MultiTaskMasterGame onComplete={handleGameComplete} onBack={onBack} />;
      case 'sustained-attention':
      case 'dual-nback':
      case 'task-switching':
      case 'planning-tower':
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Coming Soon!</h2>
              <p className="text-gray-600 mb-6">This awesome game is being developed! Check back soon for more brain training fun!</p>
              <button 
                onClick={onBack} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Games
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
              <div className="text-6xl mb-4">🎮</div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Game Not Found</h2>
              <p className="text-gray-600 mb-6">Oops! This game doesn't exist yet.</p>
              <button 
                onClick={onBack} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Games
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {renderGame()}
      </div>
    </div>
  );
};

export default GameContainer;
