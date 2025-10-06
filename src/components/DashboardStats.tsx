
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onSnapshot, collection, query, where, orderBy, DocumentData } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";

// Define interfaces for our data models
interface AssessmentResult {
  depression?: number;
  stress?: number;
  anxiety?: number;
  wellbeing?: number;
  [key: string]: any;
}

interface AssessmentData extends DocumentData {
  id: string;
  user_id: string;
  completed_at: Date | { toDate: () => Date };
  score?: number;
  results?: AssessmentResult;
}

interface MindfulnessSession extends DocumentData {
  id: string;
  user_id: string;
  completed_at: Date | { toDate: () => Date };
}

interface CheckIn extends DocumentData {
  id: string;
  user_id: string;
  date: Date | { toDate: () => Date };
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, Heart, Target, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const DashboardStats = () => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m here to help you find mental health resources. How can I assist you today?' }
  ]);

  const handleTakeAssessment = () => {
    navigate('/assessment');
  };

  const handleContactCounselor = () => {
    navigate('/wellness#counselor-section');
  };

  const handleBrowseResources = () => {
    setIsChatbotOpen(true);
    // You can add logic here to fetch AI resources based on user's mental health state
  };

  const handleSendMessage = (message: string) => {
    // This is a simplified version - you'll need to integrate with an actual AI service
    const newMessages = [...chatMessages, { role: 'user', content: message }];
    setChatMessages(newMessages);
    
    // Simulate AI response
    setTimeout(() => {
      setChatMessages([...newMessages, { 
        role: 'assistant', 
        content: 'Based on your current state, I recommend checking out our guided meditation resources and connecting with a counselor for personalized support.'
      }]);
    }, 1000);
  };
  // Real-time stats state
  const { user } = useAuth();
  const [overallWellbeing, setOverallWellbeing] = useState<string>("-");
  const [wellbeingProgress, setWellbeingProgress] = useState<number>(0);
  const [weeklySessions, setWeeklySessions] = useState<number>(0);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(5);
  const [weeklyProgress, setWeeklyProgress] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [nextAssessmentDays, setNextAssessmentDays] = useState<number | null>(null);
  const [nextAssessmentProgress, setNextAssessmentProgress] = useState<number>(0);
  // Icon/color mapping for UI
  const statIcons = { wellbeing: Heart, sessions: Target, streak: TrendingUp, assessment: Calendar };
  const statColors = { wellbeing: "text-green-600", sessions: "text-blue-600", streak: "text-purple-600", assessment: "text-orange-600" };

  // Helper function to safely convert Firestore Timestamp to Date
  const toSafeDate = (dateValue: any): Date => {
    if (!dateValue) return new Date();
    if (dateValue instanceof Date) return dateValue;
    if (typeof dateValue.toDate === 'function') return dateValue.toDate();
    if (typeof dateValue === 'string' || typeof dateValue === 'number') return new Date(dateValue);
    return new Date();
  };

  // --- Real-time Firestore listeners ---
  useEffect(() => {
    if (!user) return () => {}; // Return empty cleanup function if no user

    // Store unsubscribe functions
    const cleanupFunctions: (() => void)[] = [];
    
    // Helper function to add cleanup functions
    const addCleanup = (fn: () => void) => {
      cleanupFunctions.push(fn);
      return fn;
    };

    // 1. Listen to assessment_responses
    const assessmentsQ = query(
      collection(db, "assessment_responses"),
      where("user_id", "==", user.uid),
      orderBy("completed_at", "desc")
    );
    
    const unsubAssessments = onSnapshot(assessmentsQ, (snapshot) => {
      const assessments = snapshot.docs.map(doc => {
        const data = doc.data() as AssessmentData;
        return {
          id: doc.id,
          ...data,
          completed_at: toSafeDate(data.completed_at)
        };
      });
      
      console.log('[DashboardStats] Assessment data:', assessments);
      
      if (assessments.length > 0) {
        // Get the most recent assessment
        const latest = assessments[0];
        console.log('Latest assessment:', latest);
        
        // Calculate wellbeing as 100% minus the overall risk score from latest assessment
        let wellbeingPercentage = 100; // Default to 100% if no assessment data
        
        if (latest.results) {
          const results = latest.results as AssessmentResult;
          // Use the overall score if available, otherwise calculate from individual scores
          if (typeof results.overall === 'number' && !isNaN(results.overall)) {
            wellbeingPercentage = 100 - results.overall;
          } else if (latest.score !== undefined && latest.score !== null) {
            wellbeingPercentage = 100 - latest.score;
          } else {
            // Fallback to calculating from individual scores if overall is not available
            const validScores = [
              results.depression,
              results.stress,
              results.anxiety,
              results.wellbeing
            ].filter(score => typeof score === 'number' && !isNaN(score)) as number[];
            
            if (validScores.length > 0) {
              const averageRisk = validScores.reduce((sum, val) => sum + val, 0) / validScores.length;
              wellbeingPercentage = 100 - averageRisk;
            }
          }
        }
        
        // Ensure wellbeing percentage is within 0-100 range and round to nearest whole number
        const normalizedScore = Math.round(Math.max(0, Math.min(100, wellbeingPercentage)));
        setWellbeingProgress(normalizedScore);
        setOverallWellbeing(`${normalizedScore}%`);
        
        // Calculate next assessment date (30 days after last assessment)
        const lastAssessmentDate = toSafeDate(latest.completed_at);
        const nextAssessmentDate = new Date(lastAssessmentDate);
        nextAssessmentDate.setDate(nextAssessmentDate.getDate() + 30);
        
        const today = new Date();
        const daysUntilNext = Math.ceil((nextAssessmentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        setNextAssessmentDays(daysUntilNext);
        
        // Calculate progress towards next assessment (0-100%)
        const daysSinceLast = Math.ceil((today.getTime() - lastAssessmentDate.getTime()) / (1000 * 60 * 60 * 24));
        const progress = Math.min(100, Math.round((daysSinceLast / 30) * 100));
        setNextAssessmentProgress(progress);
      } else {
        // No assessments yet
        setWellbeingProgress(0);
        setOverallWellbeing("N/A");
        setNextAssessmentDays(null);
        setNextAssessmentProgress(0);
      }
    }, (error) => {
      console.error('Error fetching assessment data:', error);
      // Set default values on error
      setWellbeingProgress(0);
      setOverallWellbeing("N/A");
      setNextAssessmentDays(null);
      setNextAssessmentProgress(0);
    });

    // 2. Listen to mindfulness_sessions for this week
    const updateWeeklySessions = (): (() => void) => {
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay()); // Start of current week (Sunday)
      startOfWeek.setHours(0, 0, 0, 0);
      
      const sessionsQ = query(
        collection(db, "mindfulness_sessions"),
        where("user_id", "==", user.uid),
        where("completed_at", ">=", startOfWeek)
      );
      
      return onSnapshot(sessionsQ, (snapshot) => {
        const sessions = snapshot.docs.map(doc => {
          const data = doc.data() as MindfulnessSession;
          return {
            id: doc.id,
            ...data,
            completed_at: toSafeDate(data.completed_at)
          };
        });
        
        console.log('[DashboardStats] Weekly sessions:', sessions.length);
        setWeeklySessions(sessions.length);
        
        // Calculate progress (0-100%)
        const progress = Math.min(100, Math.round((sessions.length / weeklyGoal) * 100));
        setWeeklyProgress(progress);
      }, (error) => {
        console.error('Error fetching weekly sessions:', error);
        setWeeklySessions(0);
        setWeeklyProgress(0);
      });
    };
    
    const unsubSessions = updateWeeklySessions();

    // 3. Listen to check_ins for streak calculation
    const checkInsQ = query(
      collection(db, "check_ins"),
      where("user_id", "==", user.uid),
      orderBy("date", "desc")
    );
    
    const unsubCheckIns = onSnapshot(checkInsQ, (snapshot) => {
      const checkins = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: toSafeDate(doc.data().date)
      }));
      
      console.log('[DashboardStats] Check-ins:', checkins.length);
      
      if (checkins.length === 0) {
        setStreak(0);
        return;
      }
        
        // Sort check-ins by date (newest first)
        const sortedCheckins = [...checkins].sort((a, b) => {
          const dateA = a.date ? toSafeDate(a.date).getTime() : 0;
          const dateB = b.date ? toSafeDate(b.date).getTime() : 0;
          return dateB - dateA;
        });
        
        // Calculate streak
        let currentStreak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let lastDate: Date | null = null;
        
        for (const entry of sortedCheckins) {
          if (!entry.date) continue;
          
          const entryDate = toSafeDate(entry.date);
          entryDate.setHours(0, 0, 0, 0);
          
          // Skip future dates
          if (entryDate > today) continue;
          
          if (!lastDate) {
            // First entry, check if it's today or yesterday
            const diffDays = Math.ceil((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays === 0 || diffDays === 1) {
              currentStreak = 1;
              lastDate = entryDate;
            } else {
              break; // No streak
            }
          } else {
            // Check if this entry is the day before the last date in the streak
            const diffDays = Math.ceil((lastDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
              currentStreak++;
              lastDate = entryDate;
            } else if (diffDays > 1) {
              break; // Streak broken
            }
          }
        }
        
        // If we have at least one check-in today, increment the streak
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        const hasCheckInToday = sortedCheckins.some(entry => {
          if (!entry.date) return false;
          const entryDate = toSafeDate(entry.date);
          entryDate.setHours(0, 0, 0, 0);
          return entryDate.getTime() === todayDate.getTime();
        });
        
        if (hasCheckInToday) {
          currentStreak = Math.max(1, currentStreak);
        }
        
        console.log('Calculated streak:', currentStreak);
        setStreak(currentStreak);
      }, (error) => {
        console.error('Error fetching check-ins:', error);
        setStreak(0);
      });
      
    // Cleanup function for all listeners
    return () => {
      if (unsubAssessments) unsubAssessments();
      if (unsubSessions) unsubSessions();
      if (unsubCheckIns) unsubCheckIns();
    };
  }, [user, weeklyGoal]);


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Dashboard</h2>
        <p className="text-gray-600">Here's how you're doing with your mental health journey</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Wellbeing */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Wellbeing</CardTitle>
            <Heart className={`h-4 w-4 ${statColors.wellbeing}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{overallWellbeing}</div>
            <p className="text-xs text-muted-foreground mb-3">Based on your recent assessments</p>
            <Progress value={wellbeingProgress} className="h-2" />
          </CardContent>
        </Card>
        {/* Weekly Progress */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
            <Target className={`h-4 w-4 ${statColors.sessions}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{weeklySessions}/{weeklyGoal}</div>
            <p className="text-xs text-muted-foreground mb-3">Mindfulness sessions completed</p>
            <Progress value={weeklyProgress} className="h-2" />
          </CardContent>
        </Card>
        {/* Streak */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <TrendingUp className={`h-4 w-4 ${statColors.streak}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{streak} days</div>
            <p className="text-xs text-muted-foreground mb-3">Consistent daily check-ins</p>
            <Progress value={Math.min(100, streak * 10)} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">{streak} day streak</p>
          </CardContent>
        </Card>
        {/* Next Assessment */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Assessment</CardTitle>
            <Calendar className={`h-4 w-4 ${statColors.assessment}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{nextAssessmentDays !== null ? `${nextAssessmentDays} days` : '-'}</div>
            <p className="text-xs text-muted-foreground mb-3">Monthly wellbeing check</p>
            <Progress value={nextAssessmentProgress} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-800">Quick Actions</CardTitle>
          <CardDescription className="text-gray-600">
            Quick access to important features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              onClick={handleTakeAssessment}
              className="flex flex-col items-center justify-center h-32 p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="bg-blue-100 p-3 rounded-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="font-medium text-gray-800">Take Assessment</span>
              <span className="text-xs text-gray-500 mt-1">Check your wellbeing</span>
            </Button>

            <Button 
              onClick={handleBrowseResources}
              className="flex flex-col items-center justify-center h-32 p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-100 hover:border-green-200 hover:shadow-md transition-all"
            >
              <div className="bg-green-100 p-3 rounded-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="font-medium text-gray-800">Resources</span>
              <span className="text-xs text-gray-500 mt-1">Browse helpful content</span>
            </Button>

            <Button 
              onClick={handleContactCounselor}
              className="flex flex-col items-center justify-center h-32 p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-100 hover:border-purple-200 hover:shadow-md transition-all"
            >
              <div className="bg-purple-100 p-3 rounded-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <span className="font-medium text-gray-800">Get Support</span>
              <span className="text-xs text-gray-500 mt-1">Talk to a counselor</span>
            </Button>

            <Button 
              onClick={() => navigate('/wellness')}
              className="flex flex-col items-center justify-center h-32 p-4 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-100 hover:border-amber-200 hover:shadow-md transition-all"
            >
              <div className="bg-amber-100 p-3 rounded-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-medium text-gray-800">Wellness Hub</span>
              <span className="text-xs text-gray-500 mt-1">Explore wellness tools</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chatbot Modal */}
      <Dialog open={isChatbotOpen} onOpenChange={setIsChatbotOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-teal-600" />
              Mental Health Assistant
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
            {chatMessages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === 'user' 
                      ? 'bg-teal-100 text-teal-900' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  handleSendMessage(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
            <Button onClick={() => {
              const input = document.querySelector('input[type="text"]') as HTMLInputElement;
              if (input?.value.trim()) {
                handleSendMessage(input.value);
                input.value = '';
              }
            }}>
              Send
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardStats;
