import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, BookOpen, Check, X } from 'lucide-react';

interface WordMemoryGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const WordMemoryGame: React.FC<WordMemoryGameProps> = ({ onComplete, onBack }) => {
  const [gameState, setGameState] = useState<'menu' | 'instructions' | 'study' | 'recall' | 'complete'>('menu');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'expert'>('easy');
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [studyIndex, setStudyIndex] = useState(0);
  const [recallInput, setRecallInput] = useState('');
  const [recalledWords, setRecalledWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const wordLists = {
    easy: ['apple', 'house', 'water', 'happy', 'green', 'music'],
    medium: ['elephant', 'pyramid', 'mystery', 'freedom', 'journey', 'courage', 'harmony', 'balance', 'wisdom'],
    expert: ['magnificent', 'architecture', 'philosophy', 'extraordinary', 'consciousness', 'revelation', 'magnificent', 'perseverance', 'unprecedented', 'transformation', 'imagination', 'celebration']
  };

  const difficultySettings = {
    easy: { wordCount: 4, studyTime: 3, recallTime: 60 },
    medium: { wordCount: 7, studyTime: 2, recallTime: 90 },
    expert: { wordCount: 10, studyTime: 1, recallTime: 120 }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      if (gameState === 'study') {
        nextWord();
      } else if (gameState === 'recall') {
        finishGame();
      }
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, gameState]);

  const startGame = () => {
    const settings = difficultySettings[difficulty];
    const availableWords = wordLists[difficulty];
    const selectedWords = availableWords
      .sort(() => Math.random() - 0.5)
      .slice(0, settings.wordCount);
    
    setCurrentWords(selectedWords);
    setStudyIndex(0);
    setRecalledWords([]);
    setScore(0);
    setTimeLeft(settings.studyTime);
    setIsTimerActive(true);
    setGameState('study');
  };

  const nextWord = () => {
    if (studyIndex < currentWords.length - 1) {
      setStudyIndex(prev => prev + 1);
      setTimeLeft(difficultySettings[difficulty].studyTime);
    } else {
      setGameState('recall');
      setTimeLeft(difficultySettings[difficulty].recallTime);
      setRecallInput('');
    }
  };

  const handleRecallSubmit = () => {
    const word = recallInput.trim().toLowerCase();
    if (word && !recalledWords.includes(word)) {
      setRecalledWords(prev => [...prev, word]);
      if (currentWords.map(w => w.toLowerCase()).includes(word)) {
        setScore(prev => prev + 1);
      }
    }
    setRecallInput('');
  };

  const finishGame = () => {
    setIsTimerActive(false);
    setGameState('complete');
    const finalScore = Math.round((score / currentWords.length) * 100);
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
              <BookOpen className="w-6 h-6 mr-2 text-primary" />
              Word Memory Sprint
            </CardTitle>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-lg text-muted-foreground mb-6">
              Test your word memory! Study words briefly, then recall as many as you can.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Choose Difficulty:</h3>
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
                        {difficultySettings[diff].wordCount} words • {difficultySettings[diff].studyTime}s each • {difficultySettings[diff].recallTime}s recall
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

          <Button onClick={startGame} className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Start Game
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'study') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Study Phase</CardTitle>
            <Badge variant="outline" className={getDifficultyColor(difficulty)}>
              {difficulty}
            </Badge>
          </div>
          <Progress value={((studyIndex + 1) / currentWords.length) * 100} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center">
            <div className="text-lg text-muted-foreground mb-4">
              Word {studyIndex + 1} of {currentWords.length}
            </div>
            <div className="text-5xl font-bold text-primary mb-6">
              {currentWords[studyIndex]}
            </div>
            <div className="text-2xl font-mono">
              {timeLeft}s
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={nextWord} variant="outline">
              Next Word
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'recall') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recall Phase</CardTitle>
            <div className="text-2xl font-mono text-primary">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          </div>
          <Progress value={((difficultySettings[difficulty].recallTime - timeLeft) / difficultySettings[difficulty].recallTime) * 100} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-lg mb-4">Type the words you remember:</p>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={recallInput}
                onChange={(e) => setRecallInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleRecallSubmit()}
                placeholder="Type a word..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <Button onClick={handleRecallSubmit} disabled={!recallInput.trim()}>
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Recalled Words:</span>
              <span className="text-sm text-muted-foreground">
                {recalledWords.length} words
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {recalledWords.map((word, index) => {
                const isCorrect = currentWords.map(w => w.toLowerCase()).includes(word.toLowerCase());
                return (
                  <div
                    key={index}
                    className={`flex items-center p-2 rounded-lg ${
                      isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}
                  >
                    {isCorrect ? <Check className="w-4 h-4 mr-2" /> : <X className="w-4 h-4 mr-2" />}
                    <span className="capitalize">{word}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <Button onClick={finishGame} variant="outline" className="w-full">
            Finish Early
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default WordMemoryGame;