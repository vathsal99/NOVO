/** @jsxImportSource react */
import * as React from 'react';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Add proper type for JSX elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
import usePageTitle from "@/hooks/usePageTitle";
import { useAuthFirebase } from "@/hooks/useAuthFirebase";
import Footer from "@/components/Footer";
import GameContainer from "@/components/games/GameContainer";
import GameResults from "@/components/games/GameResults";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Target,
  Heart,
  BrainCircuit,
  ArrowRight,
  ArrowLeft,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  Trophy,
  Layers,
  Zap,
  TrendingUp,
  Award,
  RefreshCw
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { getUserStats, updateGameCompletion, getTodaysCognitiveMinutes } from "@/services/userStatsService";

// Define types for our task categories
type Task = {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  points: number;
  premium: boolean;
  benefits: string;
  image: string;
};

type Category = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  textColor: string;
  cardBg: string;
  borderColor: string;
  description: string;
  tasks: Task[];
};

// Define the category keys as a const array to ensure type safety
const CATEGORY_KEYS = ['cognitive', 'attention', 'emotional', 'challenge'] as const;
type CategoryKey = typeof CATEGORY_KEYS[number];

// Define task categories outside the component to avoid recreation on each render
const taskCategories: Record<CategoryKey, Category> = {
  cognitive: {
    title: "Memory & Processing Skills",
    icon: Brain,
    color: "from-blue-50 to-blue-100",
    textColor: "text-blue-800",
    cardBg: "bg-blue-50 hover:bg-blue-100/80",
    borderColor: "border-blue-200 hover:border-blue-300",
    description: "Boost your brain power with games that strengthen memory, attention, and thinking skills - essential for academic success!",
    tasks: [
      {
        id: "digit",
        title: "Number Memory Challenge",
        description: "Test how many digits you can remember in sequence, with increasing difficulty and time pressure.",
        duration: "4-6 min",
        difficulty: "Medium",
        points: 40,
        premium: false,
        benefits: "Strengthens short-term memory and improves focus under timed conditions.",
        image: "/cognitive%20task%20images/Number%20Memory%20Challenge.png"
      },
      {
        id: "pattern",
        title: "Pattern Detective",
        description: "Spot and recall patterns in colored grids, advancing to complex, multi-dimensional puzzles.",
        duration: "5-8 min",
        difficulty: "Medium",
        points: 50,
        premium: false,
        benefits: "Enhances visual-spatial memory and boosts pattern recognition skills.",
        image: "/cognitive%20task%20images/Pattern%20Detective.png"
      },
      {
        id: "word",
        title: "Word Memory Sprint",
        description: "Memorize and recall word lists within time limits, from short sequences to advanced vocabulary challenges.",
        duration: "5-8 min",
        difficulty: "Medium",
        points: 50,
        premium: false,
        benefits: "Improves language processing, working memory, and verbal recall speed.",
        image: "/cognitive%20task%20images/Word%20Memory%20Sprint.png"
      },
      {
        id: "sequence-story",
        title: "Sequence Story Builder",
        description: "Reconstruct story events in the correct order while managing distractions.",
        duration: "6-10 min",
        difficulty: "Hard",
        points: 60,
        premium: false,
        benefits: "Strengthens sequential memory, logical thinking, and attention to detail.",
        image: "/cognitive%20task%20images/Sequence%20Story%20Builder.png"
      }
    ]
  },
  attention: {
    title: "Focus & Attention Control",
    icon: Target,
    color: "from-orange-50 to-orange-100",
    textColor: "text-orange-800",
    cardBg: "bg-orange-50 hover:bg-orange-100/80",
    borderColor: "border-orange-200 hover:border-orange-300",
    description: "Sharpen your focus and attention with these challenging games.",
    tasks: [
      {
        id: "stroop",
        title: "Color Mind Trick (Stroop Test)",
        description: "Match colors and words under increasing levels of conflicting information and distractions.",
        duration: "4-6 min",
        difficulty: "Medium",
        points: 40,
        premium: false,
        benefits: "Builds focus, attention control, and reduces susceptibility to distractions.",
        image: "/cognitive%20task%20images/Color%20Mind%20Trick%20(Stroop%20Test).png"
      },
      {
        id: "reaction",
        title: "Lightning Reflexes",
        description: "Tap fast-moving targets, progressing to multiple and multitasking challenges.",
        duration: "3-5 min",
        difficulty: "Medium",
        points: 40,
        premium: false,
        benefits: "Enhances reaction speed, hand-eye coordination, and divided attention.",
        image: "/cognitive%20task%20images/Lightning%20Reflexes.PNG"
      },
      {
        id: "focus-marathon",
        title: "Focus Marathon",
        description: "Track moving objects over extended sessions, with increasing duration and distractions.",
        duration: "6-10 min",
        difficulty: "Hard",
        points: 60,
        premium: false,
        benefits: "Strengthens sustained attention, focus endurance, and mental stamina.",
        image: "/cognitive%20task%20images/Focus%20Marathon.png"
      }
    ]
  },
  emotional: {
    title: "Social & Emotional Skills",
    icon: Heart,
    color: "from-pink-50 to-pink-100",
    textColor: "text-pink-800",
    cardBg: "bg-pink-50 hover:bg-pink-100/80",
    borderColor: "border-pink-200 hover:border-pink-300",
    description: "Develop your emotional intelligence and social skills with these interactive exercises.",
    tasks: [
      {
        id: "emotion",
        title: "Emotion Detective",
        description: "Identify emotional cues from faces and scenarios, progressing to complex social interactions.",
        duration: "4-6 min",
        difficulty: "Medium",
        points: 45,
        premium: false,
        benefits: "Improves emotional intelligence, empathy, and social awareness.",
        image: "/cognitive%20task%20images/Emotion%20Detective.png"
      },
      {
        id: "breathing",
        title: "Calm Bubble Breathing",
        description: "Practice paced breathing with guided, semi-guided, and unguided exercises.",
        duration: "3-5 min",
        difficulty: "Easy",
        points: 35,
        premium: false,
        benefits: "Reduces stress, improves self-regulation, and supports mental clarity.",
        image: "/cognitive%20task%20images/Calm%20Bubble%20Breathing.png"
      },
      {
        id: "mood-tracker",
        title: "Mood Diary Adventure",
        description: "Reflect on your mood through journaling prompts, scenarios, and deep self-reflection tasks.",
        duration: "5-8 min",
        difficulty: "Medium",
        points: 50,
        premium: false,
        benefits: "Encourages emotional awareness, resilience, and healthy coping strategies.",
        image: "/cognitive%20task%20images/Mood%20Diary%20Adventure.png"
      },
      {
        id: "empathy-roleplay",
        title: "Empathy Role-Play",
        description: "Practice empathy by stepping into others' shoes in real-life scenarios.",
        duration: "5-8 min",
        difficulty: "Medium",
        points: 45,
        premium: false,
        benefits: "Builds empathy, perspective-taking, and social understanding.",
        image: "/cognitive%20task%20images/Empathy%20Role-Play.png"
      }
    ]
  },
  challenge: {
    title: "Advanced Brain Challenges",
    icon: BrainCircuit,
    color: "from-[#E3F3EA] to-[#E3F3EA]/90",
    textColor: "text-[#083B2B]",
    cardBg: "bg-[#E3F3EA] hover:bg-[#E3F3EA]/90",
    borderColor: "border-green-200 hover:border-green-300",
    description: "Push your cognitive abilities to the limit with these challenging exercises.",
    tasks: [
      {
        id: "multi-task",
        title: "Multi-Task Master",
        description: "Switch between tasks of varying complexity, from two at once to rapid multitasking under pressure.",
        duration: "10-15 min",
        difficulty: "Expert",
        points: 100,
        premium: true,
        benefits: "Trains task-switching, adaptability, and cognitive flexibility.",
        image: "/cognitive%20task%20images/Multi-Task%20Master.PNG"
      },
      {
        id: "logic-puzzle",
        title: "Logic Puzzle Quest",
        description: "Tackle riddles, grid puzzles, and multi-step deduction challenges.",
        duration: "6-10 min",
        difficulty: "Hard",
        points: 75,
        premium: false,
        benefits: "Strengthens logical reasoning, deduction, and critical thinking.",
        image: "/cognitive%20task%20images/Logic%20Puzzle%20Quest.PNG"
      },
      {
        id: "spatial-puzzle",
        title: "Spatial Puzzle Explorer",
        description: "Solve tangram puzzles that grow in complexity, advancing to challenging 3D shapes.",
        duration: "8-12 min",
        difficulty: "Hard",
        points: 80,
        premium: false,
        benefits: "Improves spatial reasoning, visualization, and geometry skills.",
        image: "/cognitive%20task%20images/Spatial%20Puzzle%20Explorer.PNG"
      },
      {
        id: "strategy-planner",
        title: "Strategy Planner",
        description: "Solve progressively complex puzzles, from towers and paths to multi-step real-world scenarios.",
        duration: "6-10 min",
        difficulty: "Hard",
        points: 75,
        premium: false,
        benefits: "Builds strategic thinking, planning skills, and problem-solving ability.",
        image: "/cognitive%20task%20images/Strategy%20Planner.png"
      }
    ]
  }
};

// Define the type for game results
interface GameResultsType {
  score: number;
  gameType: string;
  timeSpent: number;
  points?: number;
  taskTitle?: string;
  taskBenefits?: string;
}

const CognitiveTasks: React.FC = () => {
  usePageTitle("Cognitive Tasks");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthFirebase();
  const { toast } = useToast();
  
  // State declarations with proper types
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('cognitive');
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [gameResults, setGameResults] = useState<GameResultsType | null>(null);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [cognitiveMinutesToday, setCognitiveMinutesToday] = useState<number>(0);
  const [gamesCompleted, setGamesCompleted] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<string>('Beginner');
  const [cognitiveLocked, setCognitiveLocked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Refs
  const prevPathRef = React.useRef<string>('');
  
  // Calculate total tasks and progress percentage
  const totalTasks = useMemo(() => 
    Object.values(taskCategories).reduce(
      (sum, category) => sum + category.tasks.length, 
      0
    ), []);
  
  const progressPercentage = useMemo(() => 
    totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0, 
    [completedTasks.length, totalTasks]
  );

  // Scroll to top when the route changes
  useEffect(() => {
    // Only scroll if the path has changed (not just a hash change)
    if (location.pathname !== prevPathRef.current) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname]);

  // Load user stats from Firebase
  const loadUserStats = useCallback(async () => {
    if (!user?.uid) return;
    
    try {
      setIsLoading(true);
      // Get user stats
      const stats = await getUserStats(user.uid);
      setCompletedTasks(stats.completedTasks || []);
      setGamesCompleted(stats.gamesCompleted || 0);
      setCurrentLevel(stats.currentLevel || 'Beginner');
      
      // Get today's cognitive minutes
      const minutes = await getTodaysCognitiveMinutes(user.uid);
      setCognitiveMinutesToday(minutes);
      setCognitiveLocked(minutes >= 20);
    } catch (error) {
      console.error('Error loading user stats:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your stats. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid, toast]);

  // Load stats when component mounts or when user changes
  useEffect(() => {
    loadUserStats();
  }, [loadUserStats]);

  // Scroll to categories section
  const scrollToCategories = useCallback(() => {
    const categoriesSection = document.getElementById('categories-section');
    if (categoriesSection) {
      // Add a small delay to ensure any state updates complete first
      setTimeout(() => {
        categoriesSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }, 50);
    }
  }, []);

  // Handle starting a new task
  const handleStartTask = useCallback((taskId: string) => {
    if (cognitiveLocked) {
      toast({
        title: 'Daily Limit Reached',
        description: 'You have reached your daily training limit. Please come back tomorrow!',
        variant: 'destructive',
      });
      return;
    }
    setGameStartTime(Date.now());
    setCurrentGame(taskId);
    // Scroll to categories section when starting a new game
    scrollToCategories();
    
    // Update URL to reflect the current game
    navigate(`#${taskId}`, { replace: true });
  }, [cognitiveLocked, toast, navigate]);

  const handleGameComplete = async (score: number, timeSpentSeconds: number) => {
    if (!currentGame || !user?.uid) return;
    
    try {
      setIsLoading(true);
      const durationMinutes = Math.ceil(timeSpentSeconds / 60);
      
      // Find the current task to get points and other details
      const currentTask = Object.values(taskCategories)
        .flatMap(category => category.tasks)
        .find(task => task.id === currentGame);
      
      if (!currentTask) return;
      
      // Calculate points based on score and task difficulty
      const pointsEarned = Math.ceil((score / 100) * currentTask.points);
      
      // Update game completion in Firebase
      const updatedStats = await updateGameCompletion(
        user.uid,
        currentGame,
        durationMinutes
      );
      
      // Update user points separately if needed
      if (pointsEarned > 0) {
        // Add your points update logic here if needed
      }
      
      // Update local state
      setCompletedTasks(prev => [...new Set([...prev, currentGame])]);
      setGamesCompleted(updatedStats.gamesCompleted);
      setCurrentLevel(updatedStats.currentLevel);
      
      // Update cognitive minutes
      const minutes = await getTodaysCognitiveMinutes(user.uid);
      setCognitiveMinutesToday(minutes);
      setCognitiveLocked(minutes >= 20);
      
      // Show results with a small delay for better UX
      setTimeout(() => {
        setGameResults({
          score,
          gameType: currentGame,
          timeSpent: timeSpentSeconds,
          points: pointsEarned,
          taskTitle: currentTask.title,
          taskBenefits: currentTask.benefits
        });
        
        // Scroll to top to show results
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 500);
      
      toast({
        title: 'Great job!',
        description: `You've earned ${pointsEarned} points!`,
        duration: 2000
      });
    } catch (error) {
      console.error('Error updating game completion:', error);
      toast({
        title: 'Error',
        description: 'Failed to update your stats. Your progress may not be saved.',
        variant: 'destructive',
      });
    } finally {
      setGameStartTime(null);
      setIsLoading(false);
    }
  };

  const handleBackToTasks = useCallback(() => {
    setCurrentGame(null);
    setGameResults(null);
    // Scroll to top when going back to tasks
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handlePlayAgain = useCallback(() => {
    if (!currentGame) return;
    // Reset the current game to force a remount of the game component
    const gameToRestart = currentGame;
    setCurrentGame(null);
    setGameResults(null);
    
    // Small delay to ensure state updates before restarting
    setTimeout(() => {
      setCurrentGame(gameToRestart);
    }, 100);
  }, [currentGame]);

  const handleSelectAnotherGame = useCallback(() => {
    setGameResults(null);
    setCurrentGame(null);
    // Scroll to top when selecting another game
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // Memoize the game results component
  const resultsComponent = useMemo<React.ReactNode>(() => {
    if (!gameResults || !currentGame) return null;
    
    const performanceLevel = gameResults.score >= 80 ? 'Excellent' : 
                           gameResults.score >= 60 ? 'Good' : 'Keep Practicing';
    const performanceColor = gameResults.score >= 80 ? 'text-green-600' : 
                           gameResults.score >= 60 ? 'text-blue-600' : 'text-yellow-600';
    
    return (
      <div className="fixed inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {gameResults.taskTitle || 'Game Complete!'}
              </h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${performanceColor} bg-opacity-20 ${performanceColor.replace('text-', 'bg-')}`}>
                {performanceLevel}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <p className="text-sm text-gray-500 dark:text-gray-400">Score</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{gameResults.score}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <p className="text-sm text-gray-500 dark:text-gray-400">Time Spent</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {Math.floor(gameResults.timeSpent / 60)}:{String(gameResults.timeSpent % 60).padStart(2, '0')}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <p className="text-sm text-gray-500 dark:text-gray-400">Points Earned</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {gameResults.points || 0}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {Math.min(100, Math.max(0, gameResults.score))}%
                </p>
              </div>
            </div>

            {gameResults.taskBenefits && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  <Award className="inline-block w-5 h-5 mr-2" />
                  Benefits
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {gameResults.taskBenefits}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button 
                onClick={handlePlayAgain}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-base"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Play Again
              </Button>
              <Button 
                onClick={handleSelectAnotherGame}
                variant="outline"
                className="flex-1 py-3 text-base"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Choose Another Game
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [gameResults, handlePlayAgain, handleSelectAnotherGame]);

  // Memoize the game container to prevent unnecessary re-renders
  const gameContainer = useMemo<React.ReactNode>(() => {
    if (!currentGame) return null;
    
    // Don't render game container if we're showing results
    if (gameResults) return null;
    
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-auto">
        <GameContainer 
          gameType={currentGame} 
          onComplete={handleGameComplete} 
          onBack={() => setCurrentGame(null)} 
        />
      </div>
    );
  }, [currentGame, gameResults]);
  
  // Reset game results when starting a new game or going back
  useEffect(() => {
    if (currentGame) {
      setGameResults(null);
    }
  }, [currentGame]);

  const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert') => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-orange-100 text-orange-800";
      case "Expert": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };



  // Memoize the tasks grid to prevent unnecessary re-renders
  // ...existing code...

  // Main render
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative">
      {resultsComponent}
      {gameContainer}
      {/* Compact Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Cognitive Training</h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Boost your brain power with fun, science-based games that improve memory, focus, and mental agility.
            </p>
            <button 
              onClick={scrollToCategories}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
            >
              Start Training
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Games Completed */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Trophy className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Games Completed</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{gamesCompleted}</p>
              </div>
            </div>
          </div>

          {/* Current Level */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Level</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{currentLevel}</p>
              </div>
            </div>
          </div>

          {/* Minutes Trained */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                <Clock className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Minutes Trained</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{cognitiveMinutesToday}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section Anchor */}
      <div id="categories-section" className="relative -top-24"></div>
      
      {/* Tabs and Games Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
        <Tabs 
          value={activeCategory} 
          onValueChange={(value) => setActiveCategory(value as CategoryKey)} 
          className="w-full"
        >
          <div className="mb-10 w-full overflow-x-auto pb-2">
            <TabsList className="inline-flex w-auto min-w-full p-1.5 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl">
              {Object.entries(taskCategories).map(([key, category]) => {
                const isActive = activeCategory === key;
                return (
                  <TabsTrigger 
                    key={key} 
                    value={key} 
                    className={`flex-1 whitespace-nowrap min-w-[150px] sm:min-w-[180px] text-sm sm:text-base font-medium transition-all duration-200 ${
                      isActive 
                        ? `shadow-md ${
                            key === 'cognitive' ? 'bg-blue-100 text-blue-800' : 
                            key === 'attention' ? 'bg-orange-100 text-orange-800' :
                            key === 'emotional' ? 'bg-pink-100 text-pink-800' :
                            'bg-green-100 text-green-800'
                          }` 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700/30'
                    } rounded-lg py-2 px-3 sm:py-2.5 sm:px-5 hover:scale-[1.02]`}
                    style={{
                      '--active-text-color': 
                        key === 'cognitive' ? '#1e40af' : // blue-800
                        key === 'attention' ? '#9a3412' : // orange-800
                        key === 'emotional' ? '#9d174d' : // pink-800
                        '#166534' // green-800
                    } as React.CSSProperties}
                  >
                    <span className="flex items-center justify-center gap-2 sm:gap-2.5">
                      <category.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'opacity-100' : 'opacity-70'} ${
                        isActive ? (
                          key === 'cognitive' ? 'text-blue-800' : 
                          key === 'attention' ? 'text-orange-800' :
                          key === 'emotional' ? 'text-pink-800' :
                          'text-green-800'
                        ) : ''
                      }`} />
                      <span className={`text-sm sm:text-base ${isActive ? 'font-semibold' : 'font-medium text-gray-500 dark:text-gray-400'}`}
                            style={isActive ? { color: `var(--active-text-color)` } : {}}>
                        {category.title}
                      </span>
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
          {Object.entries(taskCategories).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {category.tasks.map((task) => (
                  <Card key={task.id} className={`flex flex-col h-full transition-all duration-200 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md overflow-hidden ${category.borderColor}`}>
                    <div className={`w-full h-[180px] flex items-center justify-center overflow-hidden ${category.color} border-b ${key === 'cognitive' ? 'border-blue-200' : key === 'attention' ? 'border-orange-200' : key === 'emotional' ? 'border-pink-200' : 'border-green-200'}`}>
                      <img src={task.image} alt={task.title} className="object-cover w-full h-full" />
                    </div>
                    <CardContent className="flex-1 flex flex-col justify-between p-6 bg-white dark:bg-gray-800">
                      <div>
                        <h3 className={`font-bold text-lg mb-3 ${category.textColor}`}>{task.title}</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{task.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className={`inline-block px-3 py-1 text-xs rounded-full ${category.cardBg} ${category.textColor} font-medium`}>
                            {task.difficulty}
                          </span>
                          <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {task.duration}
                          </span>
                          <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Star className="w-3.5 h-3.5 mr-1 text-yellow-500" />
                            {task.points} pts
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">{task.benefits}</p>
                      </div>
                      <Button 
                        onClick={() => handleStartTask(task.id)} 
                        className={`mt-2 w-full ${key === 'cognitive' ? 'bg-blue-600 hover:bg-blue-700' : key === 'attention' ? 'bg-orange-500 hover:bg-orange-600' : key === 'emotional' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-green-600 hover:bg-green-700'} text-white transition-all`}
                      >
                        {completedTasks.includes(task.id) ? 'Play Again' : 'Start'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}

export default CognitiveTasks;