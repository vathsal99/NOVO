import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Heart, Users, MessageCircle } from 'lucide-react';

interface EmpathyRoleplayGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const EmpathyRoleplayGame: React.FC<EmpathyRoleplayGameProps> = ({ onComplete, onBack }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'complete'>('menu');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'expert'>('easy');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedResponse, setSelectedResponse] = useState<string>('');
  const [score, setScore] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);

  const scenarios = {
    easy: [
      {
        title: "Friend is Sad",
        situation: "Your friend Alex just found out they didn't make the soccer team. They look really disappointed and are sitting alone at lunch.",
        emotion: "😢 Disappointed",
        responses: [
          { text: "That's too bad. Maybe try another sport?", score: 2, feedback: "Shows some support but could be more empathetic" },
          { text: "I'm really sorry Alex. I know how much that meant to you. Do you want to talk about it?", score: 5, feedback: "Perfect! Shows empathy and offers support" },
          { text: "Don't worry about it. It's just a game.", score: 1, feedback: "Dismissive of their feelings" },
          { text: "At least you tried! Want to sit with me and my friends?", score: 4, feedback: "Positive and inclusive, good empathy" }
        ]
      },
      {
        title: "New Student",
        situation: "There's a new student in class who looks nervous and doesn't know anyone. It's lunchtime and they're sitting by themselves.",
        emotion: "😰 Nervous",
        responses: [
          { text: "Hi! I'm [name]. Would you like to sit with me and my friends?", score: 5, feedback: "Excellent! Welcoming and inclusive" },
          { text: "Are you the new kid? This school is pretty cool.", score: 3, feedback: "Friendly but could be more welcoming" },
          { text: "*Just watch them but don't approach*", score: 1, feedback: "Missing an opportunity to help someone feel included" },
          { text: "Hey, I remember being new too. Want me to show you around?", score: 4, feedback: "Great empathy by sharing similar experience" }
        ]
      }
    ],
    medium: [
      {
        title: "Family Argument",
        situation: "Your friend Jamie seems upset and mentions their parents had a big fight last night. They're trying to act normal but you can tell they're bothered.",
        emotion: "😟 Worried",
        responses: [
          { text: "That sounds really tough. I'm here if you want to talk about it or just need a distraction.", score: 5, feedback: "Perfect balance of support and giving them choice" },
          { text: "My parents fight sometimes too. It usually blows over.", score: 3, feedback: "Relates but might minimize their feelings" },
          { text: "Do you want to tell me what the fight was about?", score: 2, feedback: "Well-intentioned but might be too pushy" },
          { text: "That's rough. Want to hang out after school to take your mind off it?", score: 4, feedback: "Good support by offering distraction" }
        ]
      },
      {
        title: "Test Anxiety",
        situation: "Your classmate Sam is really stressed about tomorrow's big test. They've been studying for weeks but keep saying they're going to fail.",
        emotion: "😰 Anxious",
        responses: [
          { text: "You've studied so hard! Remember, you know this stuff. Take deep breaths.", score: 4, feedback: "Encouraging and gives practical advice" },
          { text: "I'm nervous too, but we've prepared well. We'll get through this together.", score: 5, feedback: "Shows empathy and solidarity" },
          { text: "Don't worry, it's just one test. It won't matter in a few years.", score: 2, feedback: "Dismissive of their current stress" },
          { text: "If you're that worried, maybe you should study more tonight.", score: 1, feedback: "Increases their anxiety rather than helping" }
        ]
      }
    ],
    expert: [
      {
        title: "Group Dynamics",
        situation: "During a group project, one member (Jordan) keeps getting their ideas shot down by others. You notice they've become quiet and withdrawn.",
        emotion: "😔 Excluded",
        responses: [
          { text: "*Address the group* 'Wait, I think Jordan had a good point. Can we hear them out?'", score: 5, feedback: "Excellent advocacy and inclusion" },
          { text: "*Privately to Jordan* 'Don't let them get to you. Your ideas are good.'", score: 3, feedback: "Supportive but doesn't address the group issue" },
          { text: "*Say nothing but include Jordan's ideas in your own suggestions*", score: 2, feedback: "Helpful but doesn't give Jordan credit" },
          { text: "Jordan, what do you think about this approach? I value your input.", score: 4, feedback: "Good inclusion and validation" }
        ]
      },
      {
        title: "Conflict Resolution",
        situation: "Two of your friends, Maya and Chris, are in a heated argument about something that happened yesterday. Both are asking you to take sides.",
        emotion: "😡 Conflicted",
        responses: [
          { text: "I care about both of you. Can we talk through what happened without taking sides?", score: 5, feedback: "Perfect neutral mediation approach" },
          { text: "*Choose Maya's side* 'I think Maya is right about this one, Chris.'", score: 1, feedback: "Taking sides can damage friendships" },
          { text: "This is between you two. I don't want to get involved.", score: 2, feedback: "Avoids the issue when friends need help" },
          { text: "Maybe you both have valid points? Can we find a compromise?", score: 4, feedback: "Good diplomatic approach" }
        ]
      }
    ]
  };

  const startGame = () => {
    setCurrentScenario(0);
    setScore(0);
    setResponses([]);
    setSelectedResponse('');
    setGameState('playing');
  };

  const handleResponseSelect = (response: string, responseScore: number) => {
    setSelectedResponse(response);
    setScore(prev => prev + responseScore);
    setResponses(prev => [...prev, response]);
    
    setTimeout(() => {
      if (currentScenario < scenarios[difficulty].length - 1) {
        setCurrentScenario(prev => prev + 1);
        setSelectedResponse('');
      } else {
        finishGame();
      }
    }, 2000);
  };

  const finishGame = () => {
    setGameState('complete');
    const maxPossibleScore = scenarios[difficulty].length * 5;
    const finalScore = Math.round((score / maxPossibleScore) * 100);
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
              <Heart className="w-6 h-6 mr-2 text-primary" />
              Empathy Role-Play
            </CardTitle>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🤝</div>
            <p className="text-lg text-muted-foreground mb-6">
              Practice understanding others and responding with empathy through interactive social scenarios!
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Choose Difficulty:</h3>
            <div className="grid grid-cols-1 gap-3">
              {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((diff) => (
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
                        {scenarios[diff].length} scenarios • 
                        {diff === 'easy' && ' Basic social responses'}
                        {diff === 'medium' && ' Complex emotions'}
                        {diff === 'expert' && ' Group dynamics & conflict'}
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

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Users className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-semibold text-blue-800">Skills You'll Practice:</span>
            </div>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Reading emotional cues and body language</li>
              <li>• Choosing appropriate responses to different situations</li>
              <li>• Understanding others' perspectives and feelings</li>
              <li>• Building stronger social connections</li>
            </ul>
          </div>

          <Button onClick={startGame} className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Start Role-Play
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'playing') {
    const scenario = scenarios[difficulty][currentScenario];
    const selectedResponseData = selectedResponse ? 
      scenario.responses.find(r => r.text === selectedResponse) : null;

    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <MessageCircle className="w-6 h-6 mr-2 text-primary" />
              {scenario.title}
            </CardTitle>
            <Badge variant="outline" className={getDifficultyColor(difficulty)}>
              {currentScenario + 1}/{scenarios[difficulty].length}
            </Badge>
          </div>
          <Progress value={((currentScenario + 1) / scenarios[difficulty].length) * 100} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/5 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-3">{scenario.emotion.split(' ')[0]}</div>
              <div>
                <h3 className="font-semibold text-lg">Situation</h3>
                <p className="text-sm text-muted-foreground">{scenario.emotion}</p>
              </div>
            </div>
            <p className="text-base leading-relaxed">{scenario.situation}</p>
          </div>

          {selectedResponseData && (
            <div className={`p-4 rounded-lg border-2 ${
              selectedResponseData.score >= 4 ? 'bg-green-50 border-green-300' : 
              selectedResponseData.score >= 3 ? 'bg-yellow-50 border-yellow-300' : 
              'bg-red-50 border-red-300'
            }`}>
              <div className="flex items-center mb-2">
                <span className="font-semibold">Your Response:</span>
                <span className="ml-2 text-sm">
                  {selectedResponseData.score}/5 points
                </span>
              </div>
              <p className="text-sm italic mb-2">"{selectedResponseData.text}"</p>
              <p className="text-sm">{selectedResponseData.feedback}</p>
            </div>
          )}

          {!selectedResponse && (
            <div className="space-y-4">
              <h3 className="font-semibold">How would you respond?</h3>
              <div className="grid grid-cols-1 gap-3">
                {scenario.responses.map((response, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleResponseSelect(response.text, response.score)}
                    className="h-auto p-4 text-left justify-start whitespace-normal"
                  >
                    <div className="text-sm leading-relaxed">
                      "{response.text}"
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Score: {score} points</span>
            <span>
              {selectedResponse ? 'Moving to next scenario...' : 'Choose your response'}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default EmpathyRoleplayGame;