import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, BookOpen, Move } from 'lucide-react';

interface SequenceStoryGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const SequenceStoryGame: React.FC<SequenceStoryGameProps> = ({ onComplete, onBack }) => {
  const [gameState, setGameState] = useState<'menu' | 'study' | 'test' | 'complete'>('menu');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'expert'>('easy');
  const [currentStory, setCurrentStory] = useState<string[]>([]);
  const [studyIndex, setStudyIndex] = useState(0);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [shuffledEvents, setShuffledEvents] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showDistraction, setShowDistraction] = useState(false);

  const storyTemplates = {
    easy: {
      count: 3,
      studyTime: 4,
      stories: [
        ["A cat woke up", "The cat ate breakfast", "The cat played outside"],
        ["Sarah packed her bag", "Sarah walked to school", "Sarah met her friends"],
        ["The sun started to rise", "Birds began to sing", "People woke up"],
        ["Tom found a treasure map", "Tom dug a hole", "Tom discovered gold"],
        ["The flower was planted", "The flower grew tall", "The flower bloomed"]
      ]
    },
    medium: {
      count: 5,
      studyTime: 3,
      stories: [
        ["Alex heard strange music", "Alex followed the sound", "Alex discovered a hidden door", "Alex entered a magical room", "Alex found a dancing fairy"],
        ["The storm clouds gathered", "Rain started to fall", "Lightning struck a tree", "The power went out", "Candles were lit for light"],
        ["Maya opened an old book", "Mysterious words appeared", "The room began to glow", "Maya felt herself floating", "Maya arrived in another world"],
        ["The robot was assembled", "Scientists programmed its mind", "The robot powered on", "It spoke its first words", "The robot learned to dance"]
      ]
    },
    expert: {
      count: 7,
      studyTime: 2,
      stories: [
        ["Dr. Chen received an urgent message", "She gathered her research team", "They analyzed the strange signal", "The team decoded an alien language", "They built a communication device", "Contact was established", "Humanity's first alien conversation began"],
        ["The archaeologist found ancient symbols", "She photographed every detail carefully", "Back at the lab analysis began", "The symbols revealed a hidden chamber", "The team excavated the secret room", "Inside lay a mysterious artifact", "The artifact changed human history forever"],
        ["Young Leo discovered his grandfather's journal", "The pages described a hidden formula", "Leo gathered the required ingredients", "He followed the instructions precisely", "A strange reaction began to occur", "The mixture glowed with inner light", "Leo had recreated an alchemical miracle"]
      ]
    }
  };

  const distractionItems = [
    "🎵 Music playing...", "📱 Phone notification", "🚗 Car honking", 
    "💡 Light flickering", "🔔 Bell ringing", "⚡ Thunder rumbling"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      if (gameState === 'study') {
        nextEvent();
      }
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, gameState]);

  useEffect(() => {
    if (gameState === 'study' && difficulty === 'expert') {
      const distractionTimer = setTimeout(() => {
        setShowDistraction(true);
        setTimeout(() => setShowDistraction(false), 1000);
      }, Math.random() * 2000 + 1000);
      return () => clearTimeout(distractionTimer);
    }
  }, [studyIndex, gameState, difficulty]);

  const startGame = () => {
    const template = storyTemplates[difficulty];
    const randomStory = template.stories[Math.floor(Math.random() * template.stories.length)];
    
    setCurrentStory(randomStory);
    setStudyIndex(0);
    setUserSequence([]);
    setScore(0);
    setTimeLeft(template.studyTime);
    setIsTimerActive(true);
    setGameState('study');
    setShowDistraction(false);
  };

  const nextEvent = () => {
    if (studyIndex < currentStory.length - 1) {
      setStudyIndex(prev => prev + 1);
      setTimeLeft(storyTemplates[difficulty].studyTime);
    } else {
      // Start test phase
      const shuffled = [...currentStory].sort(() => Math.random() - 0.5);
      setShuffledEvents(shuffled);
      setIsTimerActive(false);
      setGameState('test');
    }
  };

  const handleEventSelect = (event: string) => {
    if (!userSequence.includes(event)) {
      setUserSequence(prev => [...prev, event]);
    }
  };

  const removeFromSequence = (index: number) => {
    setUserSequence(prev => prev.filter((_, i) => i !== index));
  };

  const finishGame = () => {
    let correctCount = 0;
    userSequence.forEach((event, index) => {
      if (currentStory[index] === event) {
        correctCount++;
      }
    });
    
    const finalScore = Math.round((correctCount / currentStory.length) * 100);
    setScore(finalScore);
    setGameState('complete');
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
              Sequence Story Builder
            </CardTitle>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">📖</div>
            <p className="text-lg text-muted-foreground mb-6">
              Remember the sequence of story events, then put them back in the correct order!
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Choose Difficulty:</h3>
            <div className="grid grid-cols-1 gap-3">
              {(Object.keys(storyTemplates) as Array<keyof typeof storyTemplates>).map((diff) => (
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
                        {storyTemplates[diff].count} events • {storyTemplates[diff].studyTime}s each
                        {diff === 'expert' && ' • With distractions'}
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
            Start Story
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
            <CardTitle>Study the Story</CardTitle>
            <Badge variant="outline" className={getDifficultyColor(difficulty)}>
              {difficulty}
            </Badge>
          </div>
          <Progress value={((studyIndex + 1) / currentStory.length) * 100} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center">
            <div className="text-lg text-muted-foreground mb-4">
              Event {studyIndex + 1} of {currentStory.length}
            </div>
            <div className="text-3xl font-bold text-primary mb-6 min-h-[120px] flex items-center justify-center p-4 bg-primary/5 rounded-lg">
              {currentStory[studyIndex]}
            </div>
            <div className="text-2xl font-mono text-primary">
              {timeLeft}s
            </div>
          </div>
          
          {showDistraction && (
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg animate-pulse">
              <div className="text-2xl">
                {distractionItems[Math.floor(Math.random() * distractionItems.length)]}
              </div>
            </div>
          )}
          
          <div className="flex justify-center">
            <Button onClick={nextEvent} variant="outline">
              Next Event
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'test') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Arrange the Story</CardTitle>
          <p className="text-sm text-muted-foreground">
            Click the events in the correct order to rebuild the story
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Your Story Sequence:</h3>
            <div className="min-h-[120px] p-4 bg-primary/5 rounded-lg border-2 border-dashed border-primary/20">
              {userSequence.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  Click events below to build your story...
                </div>
              ) : (
                <div className="space-y-2">
                  {userSequence.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border cursor-pointer hover:bg-red-50"
                      onClick={() => removeFromSequence(index)}
                    >
                      <span className="flex items-center">
                        <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                          {index + 1}
                        </span>
                        {event}
                      </span>
                      <Move className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Available Events:</h3>
            <div className="grid grid-cols-1 gap-2">
              {shuffledEvents.map((event, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleEventSelect(event)}
                  disabled={userSequence.includes(event)}
                  className={`p-4 h-auto text-left justify-start ${
                    userSequence.includes(event) ? 'opacity-50' : ''
                  }`}
                >
                  {event}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            onClick={finishGame} 
            className="w-full"
            disabled={userSequence.length !== currentStory.length}
          >
            Submit Story
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default SequenceStoryGame;