import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  User, 
  Heart, 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  MessageSquare, 
  Phone, 
  FileText, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Target,
  Activity,
  BookOpen,
  Users,
  Shield,
  Plus,
  X
} from "lucide-react";
import { format } from "date-fns";
import { TeacherStudent } from "@/services/teacherDataService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StudentDetailViewProps {
  student: TeacherStudent;
  onClose: () => void;
}

interface Note {
  id: string;
  content: string;
  type: 'observation' | 'intervention' | 'communication' | 'achievement';
  timestamp: Date;
  author: string;
}

const StudentDetailView: React.FC<StudentDetailViewProps> = ({ student, onClose }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [noteType, setNoteType] = useState<Note['type']>("observation");

  // Mock data for detailed view
  const studentDetails = {
    ...student,
    fullProfile: {
      grade: "7A",
      age: 13,
      parentContact: "+91 98765 43210",
      parentEmail: "sharma.family@email.com",
      emergencyContact: "+91 98765 12345 (Mother)",
      address: "Flat 302, Shanti Apartments, 24th Main Road, HSR Layout, Bengaluru, Karnataka 560102",
      medicalInfo: "Mild dust allergy, carries inhaler",
      accommodations: ["Extra time on tests", "Preferential seating near front"]
    },
    assessmentHistory: [
      { date: "2024-01-15", type: "Wellbeing Check", score: 85, notes: "Student seems engaged and happy" },
      { date: "2024-01-08", type: "Mental Health Screening", score: 78, notes: "Some stress noted around exam time" },
      { date: "2024-01-01", type: "Behavioral Assessment", score: 90, notes: "Positive classroom behavior" }
    ],
    interventions: [
      { 
        id: "1", 
        type: "Academic Support", 
        description: "Extra tutoring sessions",
        status: "active",
        startDate: "2024-01-10",
        frequency: "2x per week"
      },
      { 
        id: "2", 
        type: "Social Skills", 
        description: "Peer interaction coaching",
        status: "completed",
        startDate: "2023-12-15",
        frequency: "1x per week"
      }
    ],
    progressData: [
      { month: "Sep", wellbeing: 75, academic: 80, social: 70 },
      { month: "Oct", wellbeing: 78, academic: 82, social: 75 },
      { month: "Nov", wellbeing: 80, academic: 85, social: 78 },
      { month: "Dec", wellbeing: 85, academic: 88, social: 82 },
      { month: "Jan", wellbeing: student.wellbeingScore, academic: 90, social: 85 }
    ],
    recentNotes: [
      {
        id: "1",
        content: "Student showed great improvement in group activities today.",
        type: "observation" as const,
        timestamp: new Date("2024-01-15T10:30:00"),
        author: "Sarah Johnson"
      },
      {
        id: "2", 
        content: "Parent meeting scheduled to discuss accommodation needs.",
        type: "communication" as const,
        timestamp: new Date("2024-01-14T14:00:00"),
        author: "Sarah Johnson"
      }
    ]
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (score >= 60) return <Activity className="h-4 w-4 text-yellow-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getNoteIcon = (type: Note['type']) => {
    switch (type) {
      case 'observation': return <User className="h-4 w-4" />;
      case 'intervention': return <Target className="h-4 w-4" />;
      case 'communication': return <MessageSquare className="h-4 w-4" />;
      case 'achievement': return <Star className="h-4 w-4" />;
    }
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      content: newNote,
      type: noteType,
      timestamp: new Date(),
      author: "Sarah Johnson"
    };

    // In real app, this would save to backend
    toast({
      title: "Note Added",
      description: "Student note has been saved successfully.",
    });

    setNewNote("");
    setShowAddNote(false);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-2xl font-bold">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl font-bold">{student.name}</DialogTitle>
                <p className="text-muted-foreground">
                  {student.uid} • {student.class} • Age {studentDetails.fullProfile.age}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={`border ${getRiskLevelColor(student.riskLevel)}`}>
                    {student.riskLevel} risk
                  </Badge>
                  <Badge variant="outline">
                    Active Student
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right mr-4">
                <p className="text-sm text-muted-foreground">Class Teacher</p>
                <p className="text-base font-semibold">Mrs. Rao</p>
              </div>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="interventions" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Interventions
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wellbeing Score */}
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Heart className="h-5 w-5" />
                    Wellbeing Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold text-blue-600">
                      {student.wellbeingScore}%
                    </div>
                    {getScoreIcon(student.wellbeingScore)}
                  </div>
                  <Progress value={student.wellbeingScore} className="mt-3 bg-blue-100" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Above average for grade level
                  </p>
                </CardContent>
              </Card>

              {/* Academic Performance */}
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <BookOpen className="h-5 w-5" />
                    Academic Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold text-green-600">90%</div>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <Progress value={90} className="mt-3 bg-green-100" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Excellent performance
                  </p>
                </CardContent>
              </Card>

            </div>

            {/* Recent Assessments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Assessments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentDetails.assessmentHistory.map((assessment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{assessment.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(assessment.date), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getScoreColor(assessment.score)}`}>
                          {assessment.score}%
                        </div>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </TabsContent>

          <TabsContent value="progress" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Monitor student development across key areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {studentDetails.progressData.map((data, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">Month</p>
                        <p className="text-lg font-bold">{data.month}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Wellbeing: {data.wellbeing}%</p>
                        <Progress value={data.wellbeing} className="bg-blue-100" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Academic: {data.academic}%</p>
                        <Progress value={data.academic} className="bg-green-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interventions" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Current Interventions
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Intervention
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentDetails.interventions.map((intervention) => (
                    <Card key={intervention.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{intervention.type}</h4>
                              <Badge variant={intervention.status === 'active' ? 'default' : 'secondary'}>
                                {intervention.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {intervention.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Started: {format(new Date(intervention.startDate), 'MMM d, yyyy')}</span>
                              <span>Frequency: {intervention.frequency}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Student Notes</CardTitle>
                  <Button size="sm" onClick={() => setShowAddNote(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentDetails.recentNotes.map((note) => (
                    <div key={note.id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        {getNoteIcon(note.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {note.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {format(note.timestamp, 'MMM d, yyyy HH:mm')}
                          </span>
                        </div>
                        <p className="text-sm">{note.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">by {note.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {showAddNote && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Note</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Note Type</label>
                    <select 
                      value={noteType} 
                      onChange={(e) => setNoteType(e.target.value as Note['type'])}
                      className="w-full mt-1 p-2 border rounded-md bg-background"
                    >
                      <option value="observation">Observation</option>
                      <option value="intervention">Intervention</option>
                      <option value="communication">Communication</option>
                      <option value="achievement">Achievement</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Note Content</label>
                    <Textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Enter your note here..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddNote}>Save Note</Button>
                    <Button variant="outline" onClick={() => setShowAddNote(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="contact" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Parent/Guardian Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{studentDetails.fullProfile.parentContact}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{studentDetails.fullProfile.parentEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Emergency Contact</p>
                    <p className="text-sm text-muted-foreground">{studentDetails.fullProfile.emergencyContact}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Parent
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{studentDetails.fullProfile.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Medical Information</p>
                    <p className="text-sm text-muted-foreground">{studentDetails.fullProfile.medicalInfo}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailView;