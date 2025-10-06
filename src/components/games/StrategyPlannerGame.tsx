import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, RotateCcw, Target, Lightbulb, Trophy } from 'lucide-react';

interface StrategyPlannerGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface Tower {
  id: number;
  disks: number[];
}

interface PuzzleConfig {
  disks: number;
  minMoves: number;
  timeLimit: number;
}

const StrategyPlannerGame: React.FC<StrategyPlannerGameProps> = ({ onComplete, onBack }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'complete'>('menu');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'expert'>('easy');
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [towers, setTowers] = useState<Tower[]>([
    { id: 1, disks: [] },
    { id: 2, disks: [] },
    { id: 3, disks: [] }
  ]);
  const [selectedTower, setSelectedTower] = useState<number | null>(null);
  const [puzzleComplete, setPuzzleComplete] = useState(false);

  const puzzleConfigs: Record<string, PuzzleConfig[]> = {
    easy: [
      { disks: 3, minMoves: 7, timeLimit: 120 },
      { disks: 4, minMoves: 15, timeLimit: 180 },
      { disks: 5, minMoves: 31, timeLimit: 240 }
    ],
    medium: [
      { disks: 4, minMoves: 15, timeLimit: 150 },
      { disks: 5, minMoves: 31, timeLimit: 200 },
      { disks: 6, minMoves: 63, timeLimit: 300 }
    ],
    expert: [
      { disks: 5, minMoves: 31, timeLimit: 180 },
      { disks: 6, minMoves: 63, timeLimit: 240 },
      { disks: 7, minMoves: 127, timeLimit: 360 }
    ]
  };

  const currentConfig = puzzleConfigs[difficulty][currentPuzzle];

  const initializeTowers = useCallback(() => {
    const initialTowers: Tower[] = [
      { id: 1, disks: Array.from({ length: currentConfig.disks }, (_, i) => currentConfig.disks - i) },
      { id: 2, disks: [] },
      { id: 3, disks: [] }
    ];
    setTowers(initialTowers);
    setMoves(0);
    setTimeLeft(currentConfig.timeLimit);
    setPuzzleComplete(false);
    setSelectedTower(null);
  }, [currentConfig]);

  const startGame = () => {
    setGameState('playing');
    setCurrentPuzzle(0);
    setScore(0);
    initializeTowers();
  };

  const canMoveDisk = (fromTower: Tower, toTower: Tower): boolean => {
    if (fromTower.disks.length === 0) return false;
    if (toTower.disks.length === 0) return true;
    return fromTower.disks[fromTower.disks.length - 1] < toTower.disks[toTower.disks.length - 1];
  };

  const moveDisk = (fromTowerId: number, toTowerId: number) => {
    const newTowers = towers.map(tower => ({ ...tower, disks: [...tower.disks] }));
    const fromTower = newTowers.find(t => t.id === fromTowerId)!;
    const toTower = newTowers.find(t => t.id === toTowerId)!;

    if (!canMoveDisk(fromTower, toTower)) return;

    const disk = fromTower.disks.pop()!;
    toTower.disks.push(disk);
    
    setTowers(newTowers);
    setMoves(prev => prev + 1);
    setSelectedTower(null);

    // Check if puzzle is complete
    const targetTower = newTowers.find(t => t.id === 3)!;
    if (targetTower.disks.length === currentConfig.disks) {
      setPuzzleComplete(true);
      calculateScore();
    }
  };

  const handleTowerClick = (towerId: number) => {
    if (puzzleComplete) return;

    if (selectedTower === null) {
      const tower = towers.find(t => t.id === towerId)!;
      if (tower.disks.length > 0) {
        setSelectedTower(towerId);
      }
    } else if (selectedTower === towerId) {
      setSelectedTower(null);
    } else {
      moveDisk(selectedTower, towerId);
    }
  };

  const calculateScore = () => {
    const efficiency = Math.max(0, (currentConfig.minMoves / moves) * 100);
    const timeBonus = Math.max(0, (timeLeft / currentConfig.timeLimit) * 50);
    const puzzleScore = Math.round(efficiency + timeBonus);
    setScore(prev => prev + puzzleScore);
  };

  const nextPuzzle = () => {
    if (currentPuzzle < puzzleConfigs[difficulty].length - 1) {
      setCurrentPuzzle(prev => prev + 1);
      initializeTowers();
    } else {
      finishGame();
    }
  };

  const resetPuzzle = () => {
    initializeTowers();
  };

  const finishGame = () => {
    setGameState('complete');
    onComplete(score);
  };

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0 && !puzzleComplete) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      finishGame();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState, puzzleComplete]);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDiskColor = (size: number, maxSize: number) => {
    const colors = [
      'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 
      'bg-blue-400', 'bg-indigo-400', 'bg-purple-400'
    ];
    return colors[maxSize - size] || 'bg-gray-400';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-20 h-20 flex items-center justify-center">
              <Target className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Strategy Planner
            </CardTitle>
            <p className="text-gray-600 text-lg mt-2">
              Master the Tower of Hanoi! Plan your moves to solve ancient puzzles.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                How to Play:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                  Move all disks from the left tower to the right tower
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                  Only move one disk at a time
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                  Never place a larger disk on top of a smaller one
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                  Complete puzzles efficiently to earn maximum points
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Choose Your Challenge:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['easy', 'medium', 'expert'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      difficulty === level
                        ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getDifficultyColor(level)}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {level === 'easy' && '3-5 disks • 2-4 min each'}
                      {level === 'medium' && '4-6 disks • 2.5-5 min each'}
                      {level === 'expert' && '5-7 disks • 3-6 min each'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                onClick={onBack} 
                variant="outline" 
                className="flex-1 h-12 text-lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Games
              </Button>
              <Button 
                onClick={startGame} 
                className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Planning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Strategy Planner</h2>
              <Badge className={getDifficultyColor(difficulty)}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{currentPuzzle + 1}</div>
                <div className="text-sm text-gray-600">Puzzle</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{score}</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{moves}</div>
                <div className="text-sm text-gray-600">Moves</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{currentConfig.minMoves}</div>
                <div className="text-sm text-gray-600">Optimal</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{formatTime(timeLeft)}</div>
                <div className="text-sm text-gray-600">Time</div>
              </div>
            </div>
            
            <Progress 
              value={((currentPuzzle + 1) / puzzleConfigs[difficulty].length) * 100} 
              className="mt-4 h-3"
            />
          </div>

          {/* Game Area */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 mb-6 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Move all disks to the rightmost tower
              </h3>
              <p className="text-gray-600">
                {puzzleComplete ? '🎉 Puzzle Complete!' : `${currentConfig.disks} disks • ${currentConfig.minMoves} optimal moves`}
              </p>
            </div>

            {/* Towers */}
            <div className="flex justify-center items-end space-x-8 mb-8" style={{ height: '300px' }}>
              {towers.map((tower) => (
                <div key={tower.id} className="flex flex-col items-center">
                  <div
                    className={`w-32 h-64 bg-gray-100 border-4 rounded-lg cursor-pointer transition-all duration-200 relative flex flex-col-reverse items-center pb-2 ${
                      selectedTower === tower.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => handleTowerClick(tower.id)}
                  >
                    {/* Tower pole */}
                    <div className="absolute bottom-0 w-2 bg-gray-400 rounded-full" style={{ height: '240px', left: '50%', transform: 'translateX(-50%)' }}></div>
                    
                    {/* Disks */}
                    <div className="relative z-10 flex flex-col-reverse items-center">
                      {tower.disks.map((disk, index) => (
                        <div
                          key={`${tower.id}-${disk}-${index}`}
                          className={`h-6 rounded border-2 border-gray-600 ${getDiskColor(disk, currentConfig.disks)} transition-all duration-200`}
                          style={{ 
                            width: `${20 + disk * 15}px`,
                            marginBottom: index === 0 ? '8px' : '2px'
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 text-sm font-medium text-gray-700">
                    Tower {tower.id}
                  </div>
                </div>
              ))}
            </div>

            {puzzleComplete && (
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center text-2xl text-green-600 mb-4">
                  <Trophy className="w-8 h-8 mr-2" />
                  Puzzle Solved!
                </div>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="font-semibold text-green-800">Your Moves</div>
                    <div className="text-green-600">{moves}</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-semibold text-blue-800">Efficiency</div>
                    <div className="text-blue-600">{Math.round((currentConfig.minMoves / moves) * 100)}%</div>
                  </div>
                </div>
                {currentPuzzle < puzzleConfigs[difficulty].length - 1 ? (
                  <Button onClick={nextPuzzle} className="bg-green-500 hover:bg-green-600">
                    Next Puzzle
                  </Button>
                ) : (
                  <Button onClick={finishGame} className="bg-blue-500 hover:bg-blue-600">
                    Complete Challenge
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <Button onClick={onBack} variant="outline" className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
            <Button onClick={resetPuzzle} variant="outline" className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Puzzle
            </Button>
            <Button onClick={finishGame} variant="destructive" className="flex-1">
              End Challenge
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default StrategyPlannerGame;