import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Users, FileText, Plus, Search, Filter, BarChart3 } from 'lucide-react';

interface Assessment {
  id: string;
  title: string;
  type: 'wellbeing' | 'cognitive' | 'behavioral';
  status: 'draft' | 'active' | 'completed';
  studentsAssigned: number;
  studentsCompleted: number;
  createdDate: string;
  dueDate: string;
  description: string;
}

const mockAssessments: Assessment[] = [
  {
    id: '1',
    title: 'Monthly Wellbeing Check',
    type: 'wellbeing',
    status: 'active',
    studentsAssigned: 28,
    studentsCompleted: 15,
    createdDate: '2024-01-15',
    dueDate: '2024-01-31',
    description: 'Comprehensive mental health and wellbeing assessment for all students.',
  },
  {
    id: '2',
    title: 'Cognitive Skills Assessment',
    type: 'cognitive',
    status: 'completed',
    studentsAssigned: 28,
    studentsCompleted: 28,
    createdDate: '2024-01-01',
    dueDate: '2024-01-15',
    description: 'Assessment of attention, memory, and processing speed.',
  },
  {
    id: '3',
    title: 'Behavioral Observation',
    type: 'behavioral',
    status: 'draft',
    studentsAssigned: 0,
    studentsCompleted: 0,
    createdDate: '2024-01-20',
    dueDate: '2024-02-15',
    description: 'Structured behavioral assessment for classroom interactions.',
  },
];

export const AssessmentsPage = () => {
  const [assessments] = useState<Assessment[]>(mockAssessments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || assessment.type === filterType;
    const matchesStatus = filterStatus === 'all' || assessment.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'draft': return 'outline';
      default: return 'outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'wellbeing': return 'bg-blue-100 text-blue-800';
      case 'cognitive': return 'bg-green-100 text-green-800';
      case 'behavioral': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompletionRate = (completed: number, assigned: number) => {
    if (assigned === 0) return 0;
    return Math.round((completed / assigned) * 100);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assessments</h1>
          <p className="text-muted-foreground">Create and manage student assessments</p>
        </div>
        <Button className="text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Assessment
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search assessments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Types</option>
                <option value="wellbeing">Wellbeing</option>
                <option value="cognitive">Cognitive</option>
                
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Assessments</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredAssessments.map((assessment) => (
              <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center gap-3">
                        {assessment.title}
                        <Badge variant={getStatusColor(assessment.status)}>
                          {assessment.status.toUpperCase()}
                        </Badge>
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Created: {new Date(assessment.createdDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Due: {new Date(assessment.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(assessment.type)}`}>
                      {assessment.type}
                    </span>
                  </div>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                          <Users className="h-4 w-4" />
                          Assigned
                        </div>
                        <div className="text-2xl font-bold">{assessment.studentsAssigned}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                          <BarChart3 className="h-4 w-4" />
                          Completed
                        </div>
                        <div className="text-2xl font-bold text-green-600">{assessment.studentsCompleted}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">Completion Rate</div>
                        <div className="text-2xl font-bold text-blue-600">
                          {getCompletionRate(assessment.studentsCompleted, assessment.studentsAssigned)}%
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {assessment.studentsAssigned > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{assessment.studentsCompleted}/{assessment.studentsAssigned}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${getCompletionRate(assessment.studentsCompleted, assessment.studentsAssigned)}%` 
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t">
                      {/* <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </Button> */}
                      {assessment.status === 'draft' && (
                        <Button size="sm" className="text-white">
                          Launch Assessment
                        </Button>
                      )}
                      {assessment.status === 'active' && (
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Results
                        </Button>
                      )}
                      {assessment.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Full Report
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="grid gap-4">
            {filteredAssessments.filter(a => a.status === 'active').map((assessment) => (
              <Card key={assessment.id}>
                <CardHeader>
                  <CardTitle>{assessment.title}</CardTitle>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {assessment.studentsCompleted}/{assessment.studentsAssigned} completed
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="draft">
          <div className="grid gap-4">
            {filteredAssessments.filter(a => a.status === 'draft').map((assessment) => (
              <Card key={assessment.id}>
                <CardHeader>
                  <CardTitle>{assessment.title}</CardTitle>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" className="text-white">Launch Assessment</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid gap-4">
            {filteredAssessments.filter(a => a.status === 'completed').map((assessment) => (
              <Card key={assessment.id}>
                <CardHeader>
                  <CardTitle>{assessment.title}</CardTitle>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Full Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};