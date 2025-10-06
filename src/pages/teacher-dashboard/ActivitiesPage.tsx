import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Users, Plus, Search, PlayCircle, Pause, Edit, Copy } from 'lucide-react';
import { format, parseISO, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  title: string;
  type: 'mindfulness' | 'group-discussion' | 'assessment' | 'workshop' | 'counseling';
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  description: string;
  scheduledDate: string;
  duration: number; // in minutes
  participants: string[];
  materials: string[];
  objectives: string[];
  facilitator: string;
  location: string;
  notes?: string;
}

interface Session {
  id: string;
  title: string;
  type: 'individual' | 'group' | 'parent-conference' | 'staff-meeting';
  scheduledDate: string;
  duration: number;
  participants: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  agenda: string[];
  outcome?: string;
  nextSteps?: string[];
}

const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Mindfulness & Stress Relief Session',
    type: 'mindfulness',
    status: 'scheduled',
    description: 'Guided meditation and breathing exercises to help students manage academic stress.',
    scheduledDate: '2024-01-16T10:00:00',
    duration: 45,
    participants: ['STU001', 'STU002', 'STU003', 'STU004'],
    materials: ['Yoga mats', 'Meditation music', 'Breathing exercise sheets'],
    objectives: ['Teach stress management techniques', 'Improve emotional regulation', 'Build mindfulness skills'],
    facilitator: 'Ms. Johnson',
    location: 'Room 201',
  },
  {
    id: '2',
    title: 'Wellbeing Check-in Circle',
    type: 'group-discussion',
    status: 'completed',
    description: 'Weekly group discussion for students to share feelings and support each other.',
    scheduledDate: '2024-01-12T14:00:00',
    duration: 60,
    participants: ['STU001', 'STU005', 'STU006', 'STU007', 'STU008'],
    materials: ['Discussion cards', 'Feelings chart'],
    objectives: ['Foster peer support', 'Improve communication skills', 'Monitor student wellbeing'],
    facilitator: 'Ms. Johnson',
    location: 'Counseling Room',
    notes: 'Great participation from all students. Emma showed significant improvement in expressing her feelings.',
  },
];

const mockSessions: Session[] = [
  {
    id: '1',
    title: 'Individual Counseling - Michael Chen',
    type: 'individual',
    scheduledDate: '2024-01-16T15:00:00',
    duration: 30,
    participants: ['STU002'],
    status: 'scheduled',
    agenda: ['Review academic progress', 'Discuss social interactions', 'Set weekly goals'],
  },
  {
    id: '2',
    title: 'Parent Conference - Davis Family',
    type: 'parent-conference',
    scheduledDate: '2024-01-15T16:00:00',
    duration: 45,
    participants: ['STU003', 'Parent: Mrs. Davis', 'Parent: Mr. Davis'],
    status: 'completed',
    agenda: ['Discuss Emma\'s recent behavioral changes', 'Review support strategies', 'Plan next steps'],
    outcome: 'Parents agreed to seek additional counseling support. School will provide weekly check-ins.',
    nextSteps: ['Schedule counseling sessions', 'Weekly progress reports', 'Follow-up meeting in 2 weeks'],
  },
];

export const ActivitiesPage = () => {
  const [activities] = useState<Activity[]>(mockActivities);
  const [sessions] = useState<Session[]>(mockSessions);
  const [showActions, setShowActions] = useState(false);
  const [newActivityOpen, setNewActivityOpen] = useState(false);
  const [newSessionOpen, setNewSessionOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'default';
      case 'active': 
      case 'in-progress': return 'default';
      case 'completed': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mindfulness': return 'bg-purple-100 text-purple-800';
      case 'group-discussion': return 'bg-blue-100 text-blue-800';
      case 'assessment': return 'bg-green-100 text-green-800';
      case 'workshop': return 'bg-orange-100 text-orange-800';
      case 'counseling': return 'bg-red-100 text-red-800';
      case 'individual': return 'bg-blue-100 text-blue-800';
      case 'group': return 'bg-green-100 text-green-800';
      case 'parent-conference': return 'bg-purple-100 text-purple-800';
      case 'staff-meeting': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activities & Sessions</h1>
          <p className="text-muted-foreground">Plan and manage student activities and counseling sessions</p>
        </div>
        <div className="relative">
          <Button 
            className="text-white"
            onClick={() => setShowActions(!showActions)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Activities / Sessions
          </Button>
          
          {showActions && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1">
                <button
                  onClick={() => {
                    setNewActivityOpen(true);
                    setShowActions(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Plan Activity
                </button>
                <button
                  onClick={() => {
                    setNewSessionOpen(true);
                    setShowActions(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Schedule Session
                </button>
              </div>
            </div>
          )}

          <Dialog open={newActivityOpen} onOpenChange={setNewActivityOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Plan New Activity</DialogTitle>
                <DialogDescription>
                  Create a new wellbeing or educational activity
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Activity Title</label>
                  <Input placeholder="e.g., Mindfulness Session" className="mt-1" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Activity Type</label>
                    <select className="w-full mt-1 px-3 py-2 border rounded-md bg-background">
                      <option value="mindfulness">Mindfulness</option>
                      <option value="group-discussion">Group Discussion</option>
                      <option value="assessment">Assessment</option>
                      <option value="workshop">Workshop</option>
                      <option value="counseling">Counseling</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Duration (minutes)</label>
                    <Input type="number" placeholder="45" className="mt-1" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <Input type="date" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Time</label>
                    <Input type="time" className="mt-1" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="e.g., Room 201" className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    placeholder="Describe the activity and its purpose..."
                    className="mt-1 h-24"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Participants (Student IDs)</label>
                  <Input placeholder="e.g., STU001, STU002, STU003" className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium">Materials Needed</label>
                  <Textarea 
                    placeholder="List materials and resources needed..."
                    className="mt-1 h-20"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Learning Objectives</label>
                  <Textarea 
                    placeholder="What should students gain from this activity..."
                    className="mt-1 h-20"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 text-white">Create Activity</Button>
                  <Button variant="outline" onClick={() => setNewActivityOpen(false)}>Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={newSessionOpen} onOpenChange={setNewSessionOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Session</DialogTitle>
                <DialogDescription>
                  Schedule a counseling session or meeting
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Session Title</label>
                  <Input placeholder="e.g., Individual Counseling - Student Name" className="mt-1" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Session Type</label>
                    <select className="w-full mt-1 px-3 py-2 border rounded-md bg-background">
                      <option value="individual">Individual</option>
                      <option value="group">Group</option>
                      <option value="parent-conference">Parent Conference</option>
                      <option value="staff-meeting">Staff Meeting</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Duration (minutes)</label>
                    <Input type="number" placeholder="30" className="mt-1" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <Input type="date" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Time</label>
                    <Input type="time" className="mt-1" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Participants</label>
                  <Input placeholder="Student IDs, parent names, etc." className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium">Agenda</label>
                  <Textarea 
                    placeholder="Key topics to discuss..."
                    className="mt-1 h-24"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Schedule Session</Button>
                  <Button variant="outline" onClick={() => setNewSessionOpen(false)}>Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="activities" className="space-y-6">
        <TabsList>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        {activity.title}
                        <Badge variant={getStatusColor(activity.status)}>
                          {activity.status.toUpperCase()}
                        </Badge>
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(activity.scheduledDate).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {activity.participants.length} participants
                        </div>
                        <span>{activity.duration} minutes</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(activity.type)}`}>
                        {activity.type.replace('-', ' ')}
                      </span>
                      <span className="text-sm text-muted-foreground">{activity.location}</span>
                    </div>
                  </div>
                  <CardDescription>{activity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Objectives */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Objectives:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {activity.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Materials */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Materials:</h4>
                      <div className="flex flex-wrap gap-1">
                        {activity.materials.map((material, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {activity.notes && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Notes:</h4>
                        <p className="text-sm text-muted-foreground">{activity.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t">
                      {activity.status === 'scheduled' && (
                        <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Start Activity
                        </Button>
                      )}
                      {activity.status === 'active' && (
                        <Button size="sm" variant="outline">
                          <Pause className="h-4 w-4 mr-2" />
                          Complete Activity
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <div className="space-y-4">
            {sessions.map((session) => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-green-500" />
                        {session.title}
                        <Badge variant={getStatusColor(session.status)}>
                          {session.status.toUpperCase()}
                        </Badge>
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(session.scheduledDate).toLocaleString()}
                        </div>
                        <span>{session.duration} minutes</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(session.type)}`}>
                      {session.type.replace('-', ' ')}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Participants */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Participants:</h4>
                      <div className="flex flex-wrap gap-1">
                        {session.participants.map((participant, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {participant}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Agenda */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Agenda:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {session.agenda.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};