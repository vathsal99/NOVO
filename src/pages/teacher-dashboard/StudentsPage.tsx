import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, Download, Eye, FileText, MessageCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Student {
  id: string;
  name: string;
  uid: string;
  grade: string;
  riskLevel: 'low' | 'medium' | 'high';
  lastActivity: string;
  wellbeingScore: number;
  engagementScore: number;
  attendanceScore: number;
  progressData: Array<{
    month: string;
    wellbeing: number;
    engagement: number;
    attendance: number;
  }>;
  notes: string[];
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    uid: 'STU001',
    grade: '8A',
    riskLevel: 'low',
    lastActivity: '2 hours ago',
    wellbeingScore: 85,
    engagementScore: 92,
    attendanceScore: 98,
    progressData: [
      { month: 'Jan', wellbeing: 78, engagement: 85, attendance: 95 },
      { month: 'Feb', wellbeing: 82, engagement: 88, attendance: 97 },
      { month: 'Mar', wellbeing: 85, engagement: 92, attendance: 98 },
    ],
    notes: ['Shows excellent progress in group activities', 'Positive peer interactions'],
  },
  {
    id: '2',
    name: 'Michael Chen',
    uid: 'STU002',
    grade: '8A',
    riskLevel: 'medium',
    lastActivity: '1 day ago',
    wellbeingScore: 65,
    engagementScore: 58,
    attendanceScore: 78,
    progressData: [
      { month: 'Jan', wellbeing: 72, engagement: 65, attendance: 85 },
      { month: 'Feb', wellbeing: 68, engagement: 62, attendance: 82 },
      { month: 'Mar', wellbeing: 65, engagement: 58, attendance: 78 },
    ],
    notes: ['Requires additional support', 'Consider one-on-one sessions'],
  },
  {
    id: '3',
    name: 'Emma Davis',
    uid: 'STU003',
    grade: '8B',
    riskLevel: 'high',
    lastActivity: '3 days ago',
    wellbeingScore: 45,
    engagementScore: 32,
    attendanceScore: 65,
    progressData: [
      { month: 'Jan', wellbeing: 58, engagement: 45, attendance: 75 },
      { month: 'Feb', wellbeing: 52, engagement: 38, attendance: 70 },
      { month: 'Mar', wellbeing: 45, engagement: 32, attendance: 65 },
    ],
    notes: ['Urgent intervention needed', 'Contact counselor immediately'],
  },
];

export const StudentsPage = () => {
  const [students] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.uid.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'all' || student.grade === filterGrade;
    const matchesRisk = filterRisk === 'all' || student.riskLevel === filterRisk;
    
    return matchesSearch && matchesGrade && matchesRisk;
  });

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'destructive';
      case 'medium': return 'outline';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const handleExportPDF = () => {
    // Export functionality placeholder
    console.log('Exporting student data as PDF...');
  };

  const handleExportCSV = () => {
    // Export functionality placeholder
    console.log('Exporting student data as CSV...');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student List</h1>
          <p className="text-muted-foreground">Monitor and track your students' progress</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportPDF} variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={handleExportCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name or student ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Grades</option>
                <option value="8A">Grade 8A</option>
                <option value="8B">Grade 8B</option>
                <option value="9A">Grade 9A</option>
              </select>
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="grid gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt={student.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">ID: {student.uid} • Grade: {student.grade}</p>
                    <p className="text-xs text-muted-foreground">Last activity: {student.lastActivity}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex gap-2 mb-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Wellbeing:</span>
                        <span className="font-medium ml-1">{student.wellbeingScore}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Engagement:</span>
                        <span className="font-medium ml-1">{student.engagementScore}%</span>
                      </div>
                    </div>
                    <Badge variant={getRiskColor(student.riskLevel)}>
                      {student.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                  
                  <Button
                    onClick={() => setSelectedStudent(student)}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student Detail Modal */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedStudent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt={selectedStudent.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{selectedStudent.name}</div>
                    <div className="text-sm font-normal text-muted-foreground">
                      ID: {selectedStudent.uid} • Grade: {selectedStudent.grade}
                    </div>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  Detailed progress and wellbeing information
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Progress Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Progress Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={selectedStudent.progressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="wellbeing" stroke="#8884d8" name="Wellbeing" />
                          <Line type="monotone" dataKey="engagement" stroke="#82ca9d" name="Engagement" />
                          <Line type="monotone" dataKey="attendance" stroke="#ffc658" name="Attendance" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Scores */}
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedStudent.wellbeingScore}%</div>
                      <div className="text-sm text-muted-foreground">Wellbeing Score</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedStudent.engagementScore}%</div>
                      <div className="text-sm text-muted-foreground">Engagement Score</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">{selectedStudent.attendanceScore}%</div>
                      <div className="text-sm text-muted-foreground">Attendance Score</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Teacher Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Teacher Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedStudent.notes.map((note, index) => (
                        <div key={index} className="p-3 bg-muted rounded-md">
                          <p className="text-sm">{note}</p>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-4" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </CardContent>
                </Card>

                {/* Export Options */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button onClick={() => console.log('Export student PDF')} variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button onClick={() => console.log('Export student CSV')} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};