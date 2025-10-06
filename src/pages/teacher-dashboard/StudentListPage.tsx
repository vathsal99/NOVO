import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
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
  Eye,
  Phone,
  MessageSquare,
  FileText
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StudentDetailView from "@/components/teacher-dashboard/StudentDetailView";
import { format } from "date-fns";
import { 
  fetchTeacherStudents, 
  type TeacherStudent 
} from "@/services/teacherDataService";

const StudentListPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [students, setStudents] = useState<TeacherStudent[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<TeacherStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<TeacherStudent | null>(null);

  const teacherInfo = {
    name: user?.demographics?.name || "Sarah Johnson",
    classes: ["Grade 7A", "Grade 7B", "Grade 8A"],
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const studentsData = await fetchTeacherStudents(teacherInfo.classes);
        setStudents(studentsData);
        setFilteredStudents(studentsData);
      } catch (error) {
        console.error('Error loading student data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load student data. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [toast]);

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
    link.setAttribute('download', `student_list_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Export successful',
      description: `Exported ${filteredStudents.length} students to CSV`,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading student data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 lg:p-24">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle>Student List</CardTitle>
              <CardDescription>
                {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
              </CardDescription>
            </div>
            <div className="grid grid-cols-1 sm:flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-9 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {teacherInfo.classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-full">
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
              <Button size="sm" variant="outline" className="w-full sm:w-auto" onClick={exportToCSV}>
                <Download className="h-4 w-4 mr-1" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredStudents.map((student) => (
              <div key={student.uid} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg hover:bg-muted/50 gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.uid} • {student.class}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
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
                    onClick={() => setSelectedStudent(student)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedStudent && (
        <StudentDetailView 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
        />
      )}
    </div>
  );
};

export default StudentListPage;