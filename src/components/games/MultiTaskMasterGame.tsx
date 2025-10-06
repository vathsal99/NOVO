import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Volume2, Square, Circle, Triangle, ArrowLeft, Play, Pause, Brain, Lightbulb, VolumeX } from 'lucide-react';

interface MultiTaskMasterGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const MultiTaskMasterGame: React.FC<MultiTaskMasterGameProps> = ({ onComplete, onBack }) => {
  // Game state
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'complete'>('menu');
  const [currentStimulus, setCurrentStimulus] = useState<{visual: string, audio: string} | null>(null);
  const [phase, setPhase] = useState<'presentation' | 'response'>('presentation');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [sequence, setSequence] = useState<Array<{visual: string, audio: string}>>([]);
  const [userResponses, setUserResponses] = useState<Array<{visual: string, audio: string}>>([]);
  const [showStimulus, setShowStimulus] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'expert'>('easy');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);

  // Audio context and oscillator refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const difficultySettings = {
    easy: { levels: 3, timePerLevel: 2000, responseTime: 30 },
    medium: { levels: 5, timePerLevel: 1500, responseTime: 25 },
    expert: { levels: 8, timePerLevel: 1000, responseTime: 20 }
  };

  const visualStimuli = ['square', 'circle', 'triangle'];
  const audioStimuli = ['low', 'medium', 'high'];
  
  // Audio frequencies for different tones
  const audioFrequencies = {
    low: 220,    // A3
    medium: 440,  // A4
    high: 880     // A5
  };
  
  // Initialize audio context
  useEffect(() => {
    // Create audio context on component mount
    const initAudio = () => {
      if (!audioContextRef.current) {
        try {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          audioContextRef.current = new AudioContext();
          gainNodeRef.current = audioContextRef.current.createGain();
          gainNodeRef.current.gain.value = 0.5; // Set volume to 50%
          gainNodeRef.current.connect(audioContextRef.current.destination);
          console.log('Audio context initialized');
          return true;
        } catch (error) {
          console.error('Error initializing audio context:', error);
          return false;
        }
      }
      return true;
    };

    // Initialize audio on user interaction (required by autoplay policies)
    const handleFirstInteraction = async () => {
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      } else if (!audioContextRef.current) {
        initAudio();
      }
      // Only remove listeners if we successfully initialized audio
      if (audioContextRef.current) {
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      }
    };
    
    // Try to initialize audio immediately
    if (!initAudio()) {
      // If that fails, set up interaction-based initialization
      document.addEventListener('click', handleFirstInteraction, { once: true });
      document.addEventListener('keydown', handleFirstInteraction, { once: true });
    }
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      // Don't close the audio context here as it might be needed again
    };
  }, []);
  
  // Play audio tone
  const playTone = async (tone: string) => {
    if (!audioContextRef.current || !gainNodeRef.current) {
      console.warn('Audio context not ready');
      // Try to initialize audio context if it doesn't exist
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.gain.value = 0.5;
        gainNodeRef.current.connect(audioContextRef.current.destination);
      }
      
      // If still not ready, give up
      if (!audioContextRef.current) return;
    }
    
    try {
      // Resume audio context if it's suspended
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      // Stop any currently playing tone
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      
      const frequency = audioFrequencies[tone as keyof typeof audioFrequencies] || 440;
      
      // Create new oscillator with better timing
      const now = audioContextRef.current.currentTime;
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, now);
      
      // Configure gain envelope for smoother sound
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.5, now + 0.01); // Quick fade in
      gainNode.gain.setValueAtTime(0.5, now + 0.39);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.4); // Quick fade out
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(gainNodeRef.current);
      
      // Start and stop with precise timing
      oscillator.start(now);
      oscillator.stop(now + 0.4);
      
      // Store reference to the oscillator
      oscillatorRef.current = oscillator;
      
      // Clean up after playback completes
      oscillator.onended = () => {
        if (oscillatorRef.current === oscillator) {
          oscillatorRef.current = null;
        }
      };
      
    } catch (error) {
      console.error('Error playing tone:', error);
    }
  };
  
  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleResponse = (visual: string, audio: string) => {
    if (phase !== 'response') return;
    
    const newResponse = { visual, audio };
    const newResponses = [...userResponses, newResponse];
    setUserResponses(newResponses);

    if (newResponses.length === sequence.length) {
      // Check accuracy
      let correct = 0;
      for (let i = 0; i < sequence.length; i++) {
        if (sequence[i].visual === newResponses[i].visual && sequence[i].audio === newResponses[i].audio) {
          correct++;
        }
      }
      
      const accuracy = (correct / sequence.length) * 100;
      const levelScore = Math.round(accuracy * currentLevel);
      setScore(prev => prev + levelScore);

      if (accuracy >= 50 && currentLevel < difficultySettings[difficulty].levels) {
        // Next level
        setCurrentLevel(prev => prev + 1);
        setPhase('presentation');
        generateSequence();
      } else {
        // Game complete
        finishGame();
      }
    }
  };

  const generateSequence = useCallback(() => {
    const sequenceLength = currentLevel + 1;
    const newSequence = [];
    for (let i = 0; i < sequenceLength; i++) {
      newSequence.push({
        visual: visualStimuli[Math.floor(Math.random() * visualStimuli.length)],
        audio: audioStimuli[Math.floor(Math.random() * audioStimuli.length)]
      });
    }
    setSequence(newSequence);
    setUserResponses([]);
    setCurrentPosition(0);
    setShowStimulus(false);
  }, [currentLevel]);

  const startGame = () => {
    setGameState('playing');
    setCurrentLevel(1);
    setScore(0);
    setPhase('presentation');
    setIsPlaying(true);
    generateSequence();
  };

  const presentSequence = useCallback(async () => {
    if (currentPosition < sequence.length) {
      const currentItem = sequence[currentPosition];
      setCurrentStimulus(currentItem);
      setShowStimulus(true);
      
      // Play the audio tone with a small delay to ensure the visual is shown
      if (currentItem) {
        // Small delay to ensure visual is rendered before audio plays
        await new Promise(resolve => setTimeout(resolve, 50));
        await playTone(currentItem.audio);
      }
      
      // Calculate display time (slightly longer than audio for better UX)
      const displayTime = Math.max(500, difficultySettings[difficulty].timePerLevel - 100);
      
      setTimeout(() => {
        setShowStimulus(false);
        // Small delay between stimuli for better perception
        setTimeout(() => {
          setCurrentPosition(prev => prev + 1);
        }, 100);
      }, displayTime);
    } else {
      // Start response phase
      setPhase('response');
      setTimeLeft(difficultySettings[difficulty].responseTime);
      setCurrentPosition(0);
      setCurrentStimulus(null);
    }
  }, [currentPosition, sequence, difficulty]);

  const finishGame = () => {
    setGameState('complete');
    setIsPlaying(false);
    onComplete(score);
  };

  // Timer for response phase
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === 'response' && timeLeft > 0 && isPlaying) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && phase === 'response') {
      finishGame();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, phase, isPlaying]);

  // Presentation sequence effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === 'presentation' && isPlaying) {
      timer = setTimeout(presentSequence, 500);
    }
    return () => clearTimeout(timer);
  }, [phase, presentSequence, isPlaying]);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderVisualStimulus = (visual: string) => {
    const baseClasses = "w-20 h-20 mx-auto transition-all duration-300";
    switch (visual) {
      case 'square':
        return <Square className={`${baseClasses} text-blue-500`} fill="currentColor" />;
      case 'circle':
        return <Circle className={`${baseClasses} text-red-500`} fill="currentColor" />;
      case 'triangle':
        return <Triangle className={`${baseClasses} text-green-500`} fill="currentColor" />;
      default:
        return null;
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-20 h-20 flex items-center justify-center">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Multi-Task Master
            </CardTitle>
            <p className="text-gray-600 text-lg mt-2">
              The ultimate dual N-back challenge! Track both visual and audio patterns simultaneously.
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
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                  Watch sequences of shapes and listen to different tones
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                  Remember both visual and audio patterns that appeared N steps back
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                  Click matching combinations when they repeat
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                  Progress through levels as your working memory improves
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
                        ? 'border-purple-500 bg-purple-50 shadow-md scale-105'
                        : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getDifficultyColor(level)}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {level === 'easy' && '3 levels • 2s timing • 30s response'}
                      {level === 'medium' && '5 levels • 1.5s timing • 25s response'}
                      {level === 'expert' && '8 levels • 1s timing • 20s response'}
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
                className="flex-1 h-12 text-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Challenge
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Multi-Task Master</h2>
              <Badge className={getDifficultyColor(difficulty)}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">{currentLevel}</div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-600">{score}</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{sequence.length}</div>
                <div className="text-sm text-gray-600">Sequence</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{timeLeft}s</div>
                <div className="text-sm text-gray-600">Time Left</div>
              </div>
            </div>
            
            <Progress 
              value={(currentLevel / difficultySettings[difficulty].levels) * 100} 
              className="mt-4 h-3"
            />
          </div>

          {/* Game Area */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 mb-6 shadow-lg">
            {phase === 'presentation' ? (
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                  Memorize the sequence
                </h3>
                <div className="h-40 flex items-center justify-center">
                  {showStimulus && currentStimulus ? (
                    <div className="space-y-4">
                      {renderVisualStimulus(currentStimulus.visual)}
                      <div className="flex items-center justify-center space-x-2">
                        <Volume2 className="w-6 h-6 text-gray-500" />
                        <span className="text-lg font-medium text-gray-700">
                          {currentStimulus.audio.charAt(0).toUpperCase() + currentStimulus.audio.slice(1)} Tone
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-lg">Get ready...</div>
                  )}
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  Position {currentPosition + 1} of {sequence.length}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                  Select the matching combinations
                </h3>
                
                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-6">
                  {visualStimuli.map(visual => (
                    <div key={visual} className="space-y-2">
                      <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                        {renderVisualStimulus(visual)}
                      </div>
                      <div className="space-y-2">
                        {audioStimuli.map(audio => (
                          <Button
                            key={`${visual}-${audio}`}
                            variant="outline"
                            size="sm"
                            onClick={() => handleResponse(visual, audio)}
                            className="w-full text-xs"
                          >
                            {audio.charAt(0).toUpperCase() + audio.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-sm text-gray-600">
                  Selected: {userResponses.length} of {sequence.length}
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <Button onClick={onBack} variant="outline" className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
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

export default MultiTaskMasterGame;