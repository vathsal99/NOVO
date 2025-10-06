import React, { useState, useEffect, useMemo } from "react";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  Filter, 
  Download, 
  AlertTriangle, 
  Users, 
  TrendingUp, 
  BookOpen,
  Calendar,
  MessageSquare,
  Heart,
  FileText,
  Plus,
  Eye,
  Phone
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format } from "date-fns";
import StudentDetailView from "@/components/teacher-dashboard/StudentDetailView";
import { 
  fetchTeacherAnalytics, 
  fetchTeacherStudents, 
  type TeacherAnalytics,
  type TeacherStudent 
} from "@/services/teacherDataService";

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State management
  const [analytics, setAnalytics] = useState<TeacherAnalytics | null>(null);
  const [students, setStudents] = useState<TeacherStudent[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<TeacherStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<TeacherStudent | null>(null);
  const [selectedClass, setSelectedClass] = useState('all');
  const [currentView, setCurrentView] = useState('dashboard');

  // Teacher data
  const [teacherInfo, setTeacherInfo] = useState({
    name: user?.demographics?.name || "Teacher",
    classes: [] as string[],
    avatar: null as string | null,
    schoolId: ""
  });

  // Load teacher data and then load student data
  useEffect(() => {
    const loadTeacherData = async () => {
      if (!user?.uid) return;
      
      try {
        setLoading(true);
        // Fetch teacher data from Firestore
        const teacherDoc = await getDoc(doc(db, 'teachers', user.uid));
        if (teacherDoc.exists()) {
          const teacherData = teacherDoc.data();
          const updatedTeacherInfo = {
            name: teacherData.name || user.demographics?.name || "Teacher",
            classes: teacherData.classes || [],
            avatar: teacherData.avatar || null,
            schoolId: teacherData.schoolId || ""
          };
          setTeacherInfo(updatedTeacherInfo);
          
          // Load student data after getting teacher info
          if (updatedTeacherInfo.schoolId && updatedTeacherInfo.classes.length > 0) {
            const [analyticsData, studentsData] = await Promise.all([
              fetchTeacherAnalytics(updatedTeacherInfo.classes, updatedTeacherInfo.schoolId),
              fetchTeacherStudents(updatedTeacherInfo.classes, updatedTeacherInfo.schoolId)
            ]);
            
            setAnalytics(analyticsData);
            setStudents(studentsData);
            setFilteredStudents(studentsData);
          }
        } else {
          toast({
            title: 'Error',
            description: 'Teacher profile not found',
            variant: 'destructive'
          });
        }
      } catch (error) {
        console.error('Error loading teacher data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadTeacherData();
  }, [toast]);

  // Filter students based on search and filters
  useEffect(() => {
    let result = [...students];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(student => 
        student.name.toLowerCase().includes(term) || 
        student.uid.toLowerCase().includes(term)
      );
    }
    
    if (classFilter !== 'all') {
      result = result.filter(student => student.class === classFilter);
    }
    
    if (riskFilter !== 'all') {
      result = result.filter(student => student.riskLevel === riskFilter);
    }
    
    setFilteredStudents(result);
  }, [searchTerm, classFilter, riskFilter, students]);

  // Get high-risk students
  const highRiskStudents = useMemo(() => 
    students.filter(student => student.riskLevel === 'high'),
    [students]
  );

  // Export data to CSV
  const exportToCSV = () => {
    if (filteredStudents.length === 0) {
      toast({
        title: 'No data to export',
        description: 'There are no students to export',
        variant: 'destructive',
      });
      return;
    }

    const headers = ['UID', 'Name', 'Class', 'Risk Level', 'Wellbeing Score', 'Last Activity'];
    const csvContent = [
      headers.join(','),
      ...filteredStudents.map(student => [
        student.uid,
        `"${student.name}"`,
        student.class,
        student.riskLevel,
        student.wellbeingScore,
        format(new Date(student.lastActivity), 'MMM d, yyyy'),
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `class_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Export successful',
      description: `Exported ${filteredStudents.length} students to CSV`,
    });
  };

  const handleStudentDetails = (student: TeacherStudent) => {
    setSelectedStudent(student);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
        <main className="bg-gray-50 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">

          <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="mb-6">
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                    Good morning, {teacherInfo.name}!
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Here's an overview of your students' wellbeing and engagement today.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden sm:inline">Classes:</span>
                  <div className="flex flex-wrap gap-2">
                    {teacherInfo.classes.map((cls) => (
                      <Badge key={cls} variant="secondary" className="text-xs sm:text-sm">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
              {/* Class Performance Chart */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg sm:text-xl">Class Performance Overview</CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                          Wellbeing and engagement trends over time
                        </CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Select value={selectedClass} onValueChange={setSelectedClass}>
                          <SelectTrigger className="w-full sm:w-[140px]">
                            <SelectValue placeholder="All Classes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Classes</SelectItem>
                            {teacherInfo.classes.map((cls) => (
                              <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button size="sm" variant="outline" className="w-full sm:w-auto">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analytics?.performanceData || []}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="wellbeingScore" 
                            stroke="hsl(var(--chart-1))" 
                            strokeWidth={2}
                            name="Wellbeing Score"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="engagementScore" 
                            stroke="hsl(var(--chart-2))" 
                            strokeWidth={2}
                            name="Engagement Score"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* High Risk Alert */}
              <div className="lg:col-span-2">
                {highRiskStudents.length > 0 && (
                  <Card className="border-destructive/50 bg-destructive/5 h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <CardTitle className="text-destructive">
                          Immediate Attention
                        </CardTitle>
                        <Badge variant="destructive">{highRiskStudents.length} students</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {highRiskStudents.slice(0, 3).map((student) => (
                        <div key={student.uid} className="flex items-center justify-between p-3 bg-background rounded-lg">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {student.reason}
                            </p>
                          </div>
                          <Button size="sm" variant="outline" className="bg-white hover:bg-gray-50" onClick={() => handleStudentDetails(student)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="pt-2">
                        <p className="text-sm text-muted-foreground">
                          Review and take action.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Wellbeing</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.averageWellbeing || 0}%</div>
                  <Progress value={analytics?.averageWellbeing || 0} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">High Risk</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{highRiskStudents.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Require immediate attention
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Student List */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg sm:text-xl">Student List</CardTitle>
                      <CardDescription className="text-sm sm:text-base">
                        {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
                      </CardDescription>
                    </div>
                    <div className="relative w-full sm:w-auto">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search students..."
                        className="pl-9 w-full sm:w-[200px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <Select value={classFilter} onValueChange={setClassFilter}>
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        {Array.from(new Set(students.map(s => s.class))).map(cls => (
                          <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={riskFilter} onValueChange={setRiskFilter}>
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Risk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Risk Levels</SelectItem>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={exportToCSV}>
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredStudents.slice(0, 3).map((student) => (
                    <div key={student.uid} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {student.uid} • {student.class}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{student.wellbeingScore}%</p>
                          <p className="text-xs text-muted-foreground">Wellbeing</p>
                        </div>
                        <Badge 
                          variant={
                            student.riskLevel === 'high' ? 'destructive' :
                            student.riskLevel === 'medium' ? 'default' : 'secondary'
                          }
                        >
                          {student.riskLevel} risk
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStudentDetails(student)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {filteredStudents.length > 3 && (
                  <div className="text-center mt-4">
                    <Button variant="outline" onClick={() => navigate('/teacher/students')}>
                      View More
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Plan Activity
                  </CardTitle>
                  <CardDescription>
                    Create new wellness or educational activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Schedule Session
                  </CardTitle>
                  <CardDescription>
                    Book counselling or support sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailView student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}

    </div>
  );
};

export default TeacherDashboard;