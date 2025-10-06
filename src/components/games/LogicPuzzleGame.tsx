import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Lightbulb, CheckCircle, XCircle } from 'lucide-react';

interface LogicPuzzleGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const LogicPuzzleGame: React.FC<LogicPuzzleGameProps> = ({ onComplete, onBack }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'complete'>('menu');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'expert'>('easy');
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const puzzles = {
    easy: [
      {
        question: "If all cats are animals, and Fluffy is a cat, what can we conclude?",
        options: ["Fluffy is an animal", "All animals are cats", "Fluffy is not an animal", "We can't conclude anything"],
        correct: 0,
        explanation: "Since all cats are animals and Fluffy is a cat, Fluffy must be an animal."
      },
      {
        question: "Tom is taller than Jerry. Jerry is taller than Spike. Who is the shortest?",
        options: ["Tom", "Jerry", "Spike", "They are all the same height"],
        correct: 2,
        explanation: "If Tom > Jerry > Spike, then Spike is the shortest."
      },
      {
        question: "If it's raining, then the ground is wet. The ground is wet. What can we conclude?",
        options: ["It is raining", "It is not raining", "It might be raining", "The ground is dry"],
        correct: 2,
        explanation: "The ground could be wet for other reasons (sprinkler, etc.), so we can't be certain it's raining."
      }
    ],
    medium: [
      {
        question: "In a class of 30 students, 18 like pizza, 12 like burgers, and 8 like both. How many like neither?",
        options: ["8", "10", "12", "6"],
        correct: 0,
        explanation: "Pizza only: 10, Burger only: 4, Both: 8. Total who like either: 22. Neither: 30-22 = 8."
      },
      {
        question: "Five friends sit in a row. Alice is not next to Bob. Charlie is between Alice and Dave. Bob is at one end. Where is Eve?",
        options: ["Next to Alice", "Next to Charlie", "At the other end", "Between Dave and Bob"],
        correct: 2,
        explanation: "If Bob is at one end and Alice can't be next to him, the arrangement works with Eve at the other end."
      },
      {
        question: "A bat and ball cost $1.10 total. The bat costs $1 more than the ball. How much does the ball cost?",
        options: ["10 cents", "5 cents", "15 cents", "1 cent"],
        correct: 1,
        explanation: "If ball = x, then bat = x + $1. So x + (x + $1) = $1.10, meaning 2x = $0.10, so x = $0.05."
      }
    ],
    expert: [
      {
        question: "Four people need to cross a bridge at night with one flashlight. It takes them 1, 2, 5, and 10 minutes respectively. Only two can cross at once. What's the minimum time?",
        options: ["17 minutes", "19 minutes", "15 minutes", "21 minutes"],
        correct: 0,
        explanation: "1&2 go (2min), 1 returns (1min), 5&10 go (10min), 2 returns (2min), 1&2 go (2min). Total: 17min."
      },
      {
        question: "You have 12 balls, one weighs different. Using a balance scale only 3 times, how do you find the odd ball?",
        options: ["Impossible with 3 weighings", "Compare 4 vs 4, then narrow down", "Compare 6 vs 6 first", "Weigh them all individually"],
        correct: 1,
        explanation: "Divide into 3 groups of 4. First weighing tells you which group. Second weighing within that group, third confirms."
      },
      {
        question: "A prisoner can see the hats of two others but not his own. There are 3 white hats and 2 black hats total. If he can't determine his hat color after observing, what color hats do the others wear?",
        options: ["Both white", "Both black", "One white, one black", "Not enough information"],
        correct: 0,
        explanation: "If either wore black, he'd know his was white (since only 2 black total). Since he can't tell, both others wear white."
      }
    ]
  };

  const startGame = () => {
    setCurrentPuzzle(0);
    setScore(0);
    setSelectedAnswer('');
    setShowResult(false);
    setGameState('playing');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const puzzle = puzzles[difficulty][currentPuzzle];
    setSelectedAnswer(answerIndex.toString());
    
    if (answerIndex === puzzle.correct) {
      setScore(prev => prev + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentPuzzle < puzzles[difficulty].length - 1) {
        setCurrentPuzzle(prev => prev + 1);
        setSelectedAnswer('');
        setShowResult(false);
      } else {
        finishGame();
      }
    }, 3000);
  };

  const finishGame = () => {
    setGameState('complete');
    const finalScore = Math.round((score / puzzles[difficulty].length) * 100);
    onComplete(finalScore);
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
              <Lightbulb className="w-6 h-6 mr-2 text-primary" />
              Logic Puzzle Quest
            </CardTitle>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🧩</div>
            <p className="text-lg text-muted-foreground mb-6">
              Challenge your logical thinking with puzzles ranging from simple riddles to complex deductive reasoning!
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Choose Difficulty:</h3>
            <div className="grid grid-cols-1 gap-3">
              {(Object.keys(puzzles) as Array<keyof typeof puzzles>).map((diff) => (
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
                        {puzzles[diff].length} puzzles • 
                        {diff === 'easy' && ' Basic logic & reasoning'}
                        {diff === 'medium' && ' Math logic & patterns'}
                        {diff === 'expert' && ' Complex deduction puzzles'}
                      </div>
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(diff)}>
                      {diff}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Lightbulb className="w-5 h-5 text-purple-600 mr-2" />
              <span className="font-semibold text-purple-800">Skills You'll Develop:</span>
            </div>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Logical reasoning and deductive thinking</li>
              <li>• Problem-solving strategies</li>
              <li>• Pattern recognition and analysis</li>
              <li>• Critical thinking and attention to detail</li>
            </ul>
          </div>

          <Button onClick={startGame} className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Start Quest
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'playing') {
    const puzzle = puzzles[difficulty][currentPuzzle];
    const isCorrect = selectedAnswer && parseInt(selectedAnswer) === puzzle.correct;

    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Lightbulb className="w-6 h-6 mr-2 text-primary" />
              Logic Puzzle {currentPuzzle + 1}
            </CardTitle>
            <Badge variant="outline" className={getDifficultyColor(difficulty)}>
              {currentPuzzle + 1}/{puzzles[difficulty].length}
            </Badge>
          </div>
          <Progress value={((currentPuzzle + 1) / puzzles[difficulty].length) * 100} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/5 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Question:</h3>
            <p className="text-lg leading-relaxed">{puzzle.question}</p>
          </div>

          {showResult && (
            <div className={`p-4 rounded-lg border-2 ${
              isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
            }`}>
              <div className="flex items-center mb-2">
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 mr-2" />
                )}
                <span className="font-semibold">
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-sm mb-2">
                <strong>Explanation:</strong> {puzzle.explanation}
              </p>
              {!isCorrect && (
                <p className="text-sm">
                  <strong>Correct answer:</strong> {puzzle.options[puzzle.correct]}
                </p>
              )}
            </div>
          )}

          {!showResult && (
            <div className="space-y-4">
              <h3 className="font-semibold">Choose your answer:</h3>
              <div className="grid grid-cols-1 gap-3">
                {puzzle.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleAnswerSelect(index)}
                    className="h-auto p-4 text-left justify-start whitespace-normal"
                  >
                    <div className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-sm leading-relaxed">{option}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Score: {score}/{puzzles[difficulty].length}</span>
            <span>
              {showResult ? 'Moving to next puzzle...' : 'Take your time to think'}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default LogicPuzzleGame;