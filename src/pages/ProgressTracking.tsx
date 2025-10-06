import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProfanityFilteredInput } from "@/components/ui/profanity-filtered-input";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { Download, Filter, Search } from "lucide-react";

// Import the new components
import { StudentOverviewTable } from "@/components/progress/StudentOverviewTable";
import { IndividualStudentProgress } from "@/components/progress/IndividualStudentProgress";
import { AggregateTrends } from "@/components/progress/AggregateTrends";
import { InterventionTracking } from "@/components/progress/InterventionTracking";
import { PersonalProgressChart } from "@/components/progress/PersonalProgressChart";
import { AssessmentHistory } from "@/components/progress/AssessmentHistory";
import { ProgressSidebar } from "@/components/progress/ProgressSidebar";

interface AssessmentResult {
  depression?: number;
  stress?: number;
  anxiety?: number;
  adhd?: number;
  wellbeing?: number;
  overall?: number;
}

interface AssessmentData {
  id: string;
  user_id: string;
  categories: string[];
  responses: any;
  results?: AssessmentResult;
  completed_at: string;
}

const ProgressTracking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [assessmentData, setAssessmentData] = useState<AssessmentData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const isManagement = user?.role === 'management';

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    let q;
    if (isManagement) {
      q = query(collection(db, "assessment_responses"), orderBy("completed_at", "asc"));
    } else {
      q = query(
        collection(db, "assessment_responses"),
        where("user_id", "==", user.uid),
        orderBy("completed_at", "asc")
      );
    }
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('[ProgressTracking] Firestore returned:', data);
      setAssessmentData(data || []);
      setLoading(false);
    }, (error) => {
      console.error('Error loading assessment data:', error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user, selectedPeriod, selectedCategory]);

  const getProgressData = () => {
    if (!assessmentData.length) return [];
    
    // Filter data based on selected period
    const now = new Date();
    let filteredData = assessmentData;
    
    switch (selectedPeriod) {
      case "last30":
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filteredData = assessmentData.filter(assessment => 
          new Date(assessment.completed_at) >= thirtyDaysAgo
        );
        break;
      case "last90":
        const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        filteredData = assessmentData.filter(assessment => 
          new Date(assessment.completed_at) >= ninetyDaysAgo
        );
        break;
      case "lastyear":
        const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        filteredData = assessmentData.filter(assessment => 
          new Date(assessment.completed_at) >= oneYearAgo
        );
        break;
      case "all":
      default:
        filteredData = assessmentData;
        break;
    }
    
    return filteredData.map((assessment) => ({
      date: new Date(assessment.completed_at).toLocaleDateString(),
      depression: assessment.results?.depression ?? null,
      stress: assessment.results?.stress ?? null,
      anxiety: assessment.results?.anxiety ?? null,
      wellbeing: assessment.results?.wellbeing ?? null,
      overall: assessment.results?.overall ?? null,
    }));
  };


  const getStudentList = () => {
    if (!isManagement) return [];
    // Aggregate unique students from assessmentData
    const studentsMap: Record<string, any> = {};
    assessmentData.forEach(assessment => {
      if (!studentsMap[assessment.user_id]) {
        studentsMap[assessment.user_id] = {
          id: assessment.user_id,
          name: assessment.user_id,
          class: '',
          riskLevel: 'Unknown',
          lastAssessment: assessment.completed_at,
        };
      } else {
        // Update lastAssessment if newer
        if (new Date(assessment.completed_at) > new Date(studentsMap[assessment.user_id].lastAssessment)) {
          studentsMap[assessment.user_id].lastAssessment = assessment.completed_at;
        }
      }
    });
    return Object.values(studentsMap).filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };


  const getAggregateData = () => {
    const categories = ['depression', 'stress', 'anxiety', 'adhd', 'wellbeing'];
    if (!assessmentData.length) return categories.map(category => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      percentage: 0,
      trend: 'up' as 'up',
      change: 0,
      studentCount: 0,
    }));
    return categories.map(category => {
      const scores = assessmentData
        .map(a => a.results?.[category])
        .filter(score => typeof score === 'number');
      const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
      return {
        category: category.charAt(0).toUpperCase() + category.slice(1),
        percentage: avg,
        trend: 'up' as 'up', // TODO: implement real trend logic if needed
        change: 0,   // TODO: implement real change logic if needed
        studentCount: scores.length,
      };
    });
  };


  const getRiskColor = (percentage: number) => {
    if (percentage >= 70) return "text-red-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-green-600";
  };

  const getRiskLevel = (percentage: number) => {
    if (percentage >= 70) return "High Risk";
    if (percentage >= 40) return "Moderate Risk";
    return "Low Risk";
  };

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportData = () => {
    const csvData = assessmentData.map(assessment => ({
      Date: new Date(assessment.completed_at).toLocaleDateString(),
      Categories: assessment.categories.join(', '),
      Results: JSON.stringify(assessment.results || {}),
    }));

    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Categories,Results\n"
      + csvData.map(row => `${row.Date},"${row.Categories}","${row.Results}"`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `progress_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading progress data...</p>
        </div>
      </div>
    );
  }

  const progressData = getProgressData();
  const aggregateData = getAggregateData();
  const studentList = getStudentList();

  // Show empty state if no assessment data for student view
  if (!isManagement && assessmentData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Assessments Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't completed any assessments yet. Your progress tracking will appear here after you complete your first assessment.
            </p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate('/assessment')}
            >
              Take Your First Assessment
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isManagement ? "School Progress Tracking" : "My Progress Tracking"}
            </h1>
            <p className="text-lg text-gray-600">
              {isManagement 
                ? "Monitor student mental health trends and intervention effectiveness" 
                : "Track your mental health journey and see your progress over time"
              }
            </p>
          </div>

          {/* Filters and Search */}
          <div className="mb-6 flex flex-wrap gap-4 items-center">
            <div className="flex gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="last30">Last 30 Days</SelectItem>
                  <SelectItem value="last90">Last 3 Months</SelectItem>
                  <SelectItem value="lastyear">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isManagement && (
              <div className="flex gap-2 items-center">
                <Search className="w-4 h-4 text-gray-500" />
                <ProfanityFilteredInput
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64"
                />
              </div>
            )}

            
          </div>

          {isManagement ? (
            // Management View
            <div className="space-y-8">
              <StudentOverviewTable
                studentList={studentList}
                onSelectStudent={setSelectedStudent}
                getRiskBadgeColor={getRiskBadgeColor}
              />

              {selectedStudent && (
                <IndividualStudentProgress
                  selectedStudent={selectedStudent}
                  progressData={progressData}
                />
              )}

              <AggregateTrends
                aggregateData={aggregateData}
                getRiskColor={getRiskColor}
              />

              <InterventionTracking />
            </div>
          ) : (
            // Student View
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <PersonalProgressChart 
                  progressData={progressData} 
                />
                <AssessmentHistory
                  assessmentData={assessmentData}
                  getRiskLevel={getRiskLevel}
                  getRiskBadgeColor={getRiskBadgeColor}
                />
              </div>

              <ProgressSidebar
                assessmentData={assessmentData}
                getRiskColor={getRiskColor}
                onExportData={exportData}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgressTracking;
