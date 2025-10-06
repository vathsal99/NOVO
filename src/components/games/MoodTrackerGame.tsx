import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Play, Heart, Brain, Lightbulb, Calendar } from 'lucide-react';

interface MoodTrackerGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface MoodEntry {
  emotion: string;
  intensity: number;
  trigger?: string;
  reflection?: string;
}

const MoodTrackerGame: React.FC<MoodTrackerGameProps> = ({ onComplete, onBack }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'complete'>('menu');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'expert'>('easy');
  const [currentDay, setCurrentDay] = useState(1);
  const [score, setScore] = useState(0);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [reflection, setReflection] = useState('');
  const [currentScenario, setCurrentScenario] = useState<any>(null);

  const emotions = [
    { name: 'Happy', color: 'bg-yellow-400', emoji: '😊' },
    { name: 'Sad', color: 'bg-blue-400', emoji: '😢' },
    { name: 'Angry', color: 'bg-red-400', emoji: '😠' },
    { name: 'Anxious', color: 'bg-purple-400', emoji: '😰' },
    { name: 'Excited', color: 'bg-orange-400', emoji: '🤩' },
    { name: 'Calm', color: 'bg-green-400', emoji: '😌' },
    { name: 'Frustrated', color: 'bg-red-500', emoji: '😤' },
    { name: 'Grateful', color: 'bg-pink-400', emoji: '🙏' }
  ];

  const scenarios = {
    easy: [
      {
        title: "A Great Day at School",
        prompt: "You got a good grade on your test and your friends complimented your new haircut. How do you feel?",
        suggestedEmotions: ['Happy', 'Excited', 'Grateful']
      },
      {
        title: "Missing Your Pet",
        prompt: "Your family pet is staying at the vet overnight and you miss them. How are you feeling?",
        suggestedEmotions: ['Sad', 'Anxious', 'Worried']
      },
      {
        title: "Before a Big Presentation",
        prompt: "You have to present your project in front of the whole class tomorrow. What emotions are you experiencing?",
        suggestedEmotions: ['Anxious', 'Excited', 'Nervous']
      }
    ],
    medium: [
      {
        title: "Friend Conflict",
        prompt: "Your best friend shared something you told them in confidence with other people. You feel betrayed but also don't want to lose the friendship. Describe your complex emotions.",
        suggestedEmotions: ['Angry', 'Sad', 'Confused']
      },
      {
        title: "Academic Pressure",
        prompt: "You have three big assignments due this week, plus family expectations to do well. You're trying to balance everything but feeling overwhelmed. What emotions are present?",
        suggestedEmotions: ['Anxious', 'Frustrated', 'Overwhelmed']
      },
      {
        title: "Social Situation",
        prompt: "You want to join a group activity but feel like you might not fit in. You're excited about the activity but worried about being accepted. How do you feel?",
        suggestedEmotions: ['Excited', 'Anxious', 'Hopeful']
      }
    ],
    expert: [
      {
        title: "Identity and Belonging",
        prompt: "You're exploring who you are and where you belong. Sometimes you feel confident about your uniqueness, other times you wish you could fit in better. Reflect on this emotional journey.",
        suggestedEmotions: ['Confused', 'Proud', 'Lonely']
      },
      {
        title: "Family Dynamics",
        prompt: "Your parents are getting divorced. You understand it's for the best, but you're still dealing with the changes. You feel relief, sadness, and uncertainty all at once. Process these feelings.",
        suggestedEmotions: ['Sad', 'Relieved', 'Uncertain']
      },
      {
        title: "Future Anxiety",
        prompt: "You're thinking about your future - college, career, relationships. You feel excited about possibilities but also overwhelmed by choices and pressure to succeed. Explore these emotions deeply.",
        suggestedEmotions: ['Anxious', 'Excited', 'Overwhelmed']
      }
    ]
  };

  const difficultySettings = {
    easy: { days: 3, promptType: 'simple', reflectionRequired: false },
    medium: { days: 5, promptType: 'scenario', reflectionRequired: true },
    expert: { days: 7, promptType: 'deep', reflectionRequired: true }
  };

  const startGame = () => {
    setGameState('playing');
    setCurrentDay(1);
    setScore(0);
    setMoodEntries([]);
    loadNextScenario();
  };

  const loadNextScenario = () => {
    const dayScenarios = scenarios[difficulty];
    const scenarioIndex = (currentDay - 1) % dayScenarios.length;
    const scenario = dayScenarios[scenarioIndex];
    setCurrentScenario(scenario);
    setCurrentPrompt(scenario.prompt);
    setSelectedEmotion('');
    setIntensity(5);
    setReflection('');
  };

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
  };

  const handleEntrySubmit = () => {
    if (!selectedEmotion) return;

    const entry: MoodEntry = {
      emotion: selectedEmotion,
      intensity,
      trigger: currentScenario.title,
      reflection: reflection.trim() || undefined
    };

    setMoodEntries(prev => [...prev, entry]);
    
    // Calculate points
    let points = 20; // Base points for completion
    
    // Bonus for appropriate emotion selection
    if (currentScenario.suggestedEmotions.includes(selectedEmotion)) {
      points += 10;
    }
    
    // Bonus for reflection (medium/expert)
    if (difficultySettings[difficulty].reflectionRequired && reflection.trim().length > 20) {
      points += 15;
    }
    
    // Intensity awareness bonus
    if (intensity >= 1 && intensity <= 10) {
      points += 5;
    }

    setScore(prev => prev + points);

    if (currentDay < difficultySettings[difficulty].days) {
      setCurrentDay(prev => prev + 1);
      loadNextScenario();
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setGameState('complete');
    onComplete(score);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full w-20 h-20 flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Mood Diary Adventure
            </CardTitle>
            <p className="text-gray-600 text-lg mt-2">
              Track your feelings like a scientist! Build emotional self-awareness through guided reflection.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-100">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                How to Play:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                  Read different emotional scenarios
                </li>
                <li className="flex items-start">
                  <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                  Identify and select the emotions you'd feel
                </li>
                <li className="flex items-start">
                  <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                  Rate the intensity of your emotions
                </li>
                <li className="flex items-start">
                  <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                  Reflect on your emotional responses and patterns
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Choose Your Journey:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['easy', 'medium', 'expert'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      difficulty === level
                        ? 'border-pink-500 bg-pink-50 shadow-md scale-105'
                        : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getDifficultyColor(level)}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {level === 'easy' && '3 days • Simple prompts • Basic emotions'}
                      {level === 'medium' && '5 days • Scenarios • Guided reflection'}
                      {level === 'expert' && '7 days • Complex situations • Deep reflection'}
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
                className="flex-1 h-12 text-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Journey
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Mood Diary Adventure</h2>
              <Badge className={getDifficultyColor(difficulty)}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-pink-600">{currentDay}</div>
                <div className="text-sm text-gray-600">Day</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{score}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-600">{moodEntries.length}</div>
                <div className="text-sm text-gray-600">Entries</div>
              </div>
            </div>
            
            <Progress 
              value={(currentDay / difficultySettings[difficulty].days) * 100} 
              className="mt-4 h-3"
            />
          </div>

          {/* Scenario */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-pink-500 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">
                Day {currentDay}: {currentScenario?.title}
              </h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {currentPrompt}
            </p>

            {/* Emotion Selection */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">How would you feel?</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.name}
                    onClick={() => handleEmotionSelect(emotion.name)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedEmotion === emotion.name
                        ? 'border-pink-500 bg-pink-50 shadow-md scale-105'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{emotion.emoji}</div>
                    <div className="text-sm font-medium text-gray-700">{emotion.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity Slider */}
            {selectedEmotion && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  How intense is this feeling? ({intensity}/10)
                </h4>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Very Mild</span>
                  <span>Extremely Strong</span>
                </div>
              </div>
            )}

            {/* Reflection */}
            {difficultySettings[difficulty].reflectionRequired && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Reflect on this experience:
                </h4>
                <Textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="What thoughts come to mind? How might you handle this situation? What did you learn about yourself?"
                  className="min-h-[100px]"
                />
              </div>
            )}

            <Button
              onClick={handleEntrySubmit}
              disabled={!selectedEmotion}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              {currentDay < difficultySettings[difficulty].days ? 'Next Day' : 'Complete Journey'}
            </Button>
          </div>

          {/* Previous Entries */}
          {moodEntries.length > 0 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-500" />
                Your Emotional Journey
              </h3>
              <div className="space-y-3">
                {moodEntries.slice(-3).map((entry, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">{entry.emotion}</span>
                      <span className="text-sm text-gray-600">Intensity: {entry.intensity}/10</span>
                    </div>
                    {entry.reflection && (
                      <p className="text-sm text-gray-600 italic">"{entry.reflection}"</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-4">
            <Button onClick={onBack} variant="outline" className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
            <Button onClick={finishGame} variant="destructive" className="flex-1">
              End Journey
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MoodTrackerGame;