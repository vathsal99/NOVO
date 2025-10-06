import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Target, Eye, EyeOff } from 'lucide-react';

interface FocusMarathonGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const FocusMarathonGame: React.FC<FocusMarathonGameProps> = ({ onComplete, onBack }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'complete'>('menu');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'expert'>('easy');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [score, setScore] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [isTargetVisible, setIsTargetVisible] = useState(true);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [distractions, setDistractions] = useState<string[]>([]);
  const [showDistraction, setShowDistraction] = useState(false);
  const [currentDistraction, setCurrentDistraction] = useState('');
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const difficultySettings = {
    easy: {
      duration: 5 * 60, // 5 minutes
      targetSpeed: 3000, // milliseconds between moves
      distractionFreq: 0, // no distractions
      targetSize: 60,
      label: '5 minutes'
    },
    medium: {
      duration: 15 * 60, // 15 minutes
      targetSpeed: 2000,
      distractionFreq: 30000, // every 30 seconds
      targetSize: 45,
      label: '15 minutes'
    },
    expert: {
      duration: 30 * 60, // 30 minutes
      targetSpeed: 1500,
      distractionFreq: 15000, // every 15 seconds
      targetSize: 30,
      label: '30 minutes'
    }
  };

  const distractionMessages = [
    "🔔 New notification!", "📞 Incoming call...", "💬 Message received",
    "🎵 Music playing", "🚗 Traffic noise", "👥 People talking",
    "📺 TV in background", "🌧️ Rain sounds", "⚡ Thunder rumbling"
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && gameState === 'playing') {
      finishGame();
    }
    return () => clearInterval(timer);
  }, [gameState, timeRemaining]);

  useEffect(() => {
    let targetTimer: NodeJS.Timeout;
    if (gameState === 'playing') {
      targetTimer = setInterval(() => {
        moveTarget();
      }, difficultySettings[difficulty].targetSpeed);
    }
    return () => clearInterval(targetTimer);
  }, [gameState, difficulty]);

  useEffect(() => {
    let distractionTimer: NodeJS.Timeout;
    if (gameState === 'playing' && difficultySettings[difficulty].distractionFreq > 0) {
      distractionTimer = setInterval(() => {
        showRandomDistraction();
      }, difficultySettings[difficulty].distractionFreq);
    }
    return () => clearInterval(distractionTimer);
  }, [gameState, difficulty]);

  const startGame = () => {
    const settings = difficultySettings[difficulty];
    setTotalTime(settings.duration);
    setTimeRemaining(settings.duration);
    setScore(0);
    setHits(0);
    setMisses(0);
    setDistractions([]);
    setShowDistraction(false);
    setIsTargetVisible(true);
    setGameState('playing');
    moveTarget();
  };

  const moveTarget = () => {
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect();
      const targetSize = difficultySettings[difficulty].targetSize;
      const maxX = rect.width - targetSize;
      const maxY = rect.height - targetSize;
      
      setTargetPosition({
        x: Math.random() * maxX,
        y: Math.random() * maxY
      });

      // For expert mode, occasionally hide the target
      if (difficulty === 'expert' && Math.random() < 0.3) {
        setIsTargetVisible(false);
        setTimeout(() => setIsTargetVisible(true), 1000);
      }
    }
  };

  const showRandomDistraction = () => {
    const message = distractionMessages[Math.floor(Math.random() * distractionMessages.length)];
    setCurrentDistraction(message);
    setShowDistraction(true);
    setDistractions(prev => [...prev, message]);
    
    setTimeout(() => {
      setShowDistraction(false);
    }, 2000);
  };

  const handleTargetClick = () => {
    setHits(prev => prev + 1);
    setScore(prev => prev + 10);
    moveTarget();
  };

  const handleMissClick = () => {
    setMisses(prev => prev + 1);
    setScore(prev => Math.max(0, prev - 2));
  };

  const pauseGame = () => {
    setGameState('paused');
  };

  const resumeGame = () => {
    setGameState('playing');
  };

  const finishGame = () => {
    setGameState('complete');
    const accuracy = hits + misses > 0 ? (hits / (hits + misses)) * 100 : 0;
    const timeBonus = Math.max(0, ((totalTime - timeRemaining) / totalTime) * 50);
    const finalScore = Math.round(accuracy + timeBonus);
    onComplete(finalScore);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'expert': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (gameState === 'menu') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Target className="w-6 h-6 mr-2 text-primary" />
              Focus Marathon
            </CardTitle>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-lg text-muted-foreground mb-6">
              Test your sustained attention! Track moving targets for extended periods with increasing challenges.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Choose Duration:</h3>
            <div className="grid grid-cols-1 gap-3">
              {(Object.keys(difficultySettings) as Array<keyof typeof difficultySettings>).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    difficulty === diff 
                      ? getDifficultyColor(diff) + ' border-current' 
                      : 'border-border hover:border-primary/50 bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold capitalize">{diff}</div>
                      <div className="text-sm text-muted-foreground">
                        {difficultySettings[diff].label}
                        {diff === 'medium' && ' • Some distractions'}
                        {diff === 'expert' && ' • Many distractions • Harder targets'}
                      </div>
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(diff)}>
                      {difficultySettings[diff].label}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Eye className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="font-semibold text-yellow-800">How to Play:</span>
            </div>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Click on the moving target circles</li>
              <li>• Stay focused for the entire duration</li>
              <li>• Ignore distractions (higher difficulties)</li>
              <li>• Accuracy and endurance both matter</li>
            </ul>
          </div>

          <Button onClick={startGame} className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Start Marathon
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'playing' || gameState === 'paused') {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className={getDifficultyColor(difficulty)}>
                  {difficulty} - {difficultySettings[difficulty].label}
                </Badge>
                <div className="text-2xl font-mono">
                  {formatTime(timeRemaining)}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  Score: <span className="font-bold text-primary">{score}</span>
                </div>
                <div className="text-sm">
                  Hits: <span className="text-green-600 font-bold">{hits}</span>
                </div>
                <div className="text-sm">
                  Misses: <span className="text-red-600 font-bold">{misses}</span>
                </div>
              </div>
            </div>
            <Progress value={((totalTime - timeRemaining) / totalTime) * 100} className="mt-2" />
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div
              ref={gameAreaRef}
              className="relative w-full h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg overflow-hidden cursor-crosshair"
              onClick={handleMissClick}
            >
              {gameState === 'paused' && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-4">⏸️</div>
                    <p className="text-xl mb-4">Game Paused</p>
                    <Button onClick={resumeGame} variant="secondary">
                      Resume
                    </Button>
                  </div>
                </div>
              )}

              {showDistraction && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg animate-pulse z-10">
                  {currentDistraction}
                </div>
              )}

              {isTargetVisible && gameState === 'playing' && (
                <div
                  className="absolute bg-primary rounded-full cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center"
                  style={{
                    left: targetPosition.x,
                    top: targetPosition.y,
                    width: difficultySettings[difficulty].targetSize,
                    height: difficultySettings[difficulty].targetSize,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTargetClick();
                  }}
                >
                  <Target className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center space-x-4">
          {gameState === 'playing' ? (
            <Button onClick={pauseGame} variant="outline">
              Pause Game
            </Button>
          ) : (
            <Button onClick={resumeGame}>
              Resume Game
            </Button>
          )}
          <Button onClick={finishGame} variant="destructive">
            End Marathon
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default FocusMarathonGame;