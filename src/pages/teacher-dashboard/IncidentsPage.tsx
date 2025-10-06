import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, Clock, CheckCircle, Eye, Plus, Search, Filter } from 'lucide-react';

interface Incident {
  id: string;
  title: string;
  type: 'behavioral' | 'safety' | 'academic' | 'social' | 'mental-health';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'under-review' | 'resolved' | 'escalated';
  studentName: string;
  studentId: string;
  description: string;
  reportedDate: string;
  reportedBy: string;
  location: string;
  witnesses: string[];
  actions: string[];
  resolution?: string;
}

const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Student showing signs of distress',
    type: 'mental-health',
    severity: 'high',
    status: 'under-review',
    studentName: 'Emma Davis',
    studentId: 'STU003',
    description: 'Student appeared withdrawn during class, refused to participate in group activities, and was observed crying quietly at her desk.',
    reportedDate: '2024-01-15T14:30:00',
    reportedBy: 'Ms. Johnson',
    location: 'Classroom 8B',
    witnesses: ['John Smith', 'Sarah Wilson'],
    actions: ['Counselor contacted', 'Parent notification sent'],
  },
  {
    id: '2',
    title: 'Bullying incident reported',
    type: 'behavioral',
    severity: 'medium',
    status: 'resolved',
    studentName: 'Michael Chen',
    studentId: 'STU002',
    description: 'Student reported being verbally harassed by classmates during lunch break.',
    reportedDate: '2024-01-14T12:15:00',
    reportedBy: 'Mr. Davis',
    location: 'Cafeteria',
    witnesses: ['Amy Johnson', 'David Brown'],
    actions: ['Investigation completed', 'Peer mediation session held'],
    resolution: 'All parties participated in restorative conversation. Monitoring ongoing.',
  },
];

export const IncidentsPage = () => {
  const [incidents] = useState<Incident[]>(mockIncidents);
  const [newIncidentOpen, setNewIncidentOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || incident.type === filterType;
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reported': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'under-review': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'escalated': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mental-health': return 'bg-purple-100 text-purple-800';
      case 'behavioral': return 'bg-red-100 text-red-800';
      case 'safety': return 'bg-orange-100 text-orange-800';
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'social': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Report Incident</h1>
          <p className="text-muted-foreground">Report and track student incidents and concerns</p>
        </div>
        <Dialog open={newIncidentOpen} onOpenChange={setNewIncidentOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Report New Incident
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Report New Incident</DialogTitle>
              <DialogDescription>
                Please provide detailed information about the incident
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Incident Type</label>
                  <select className="w-full mt-1 px-3 py-2 border rounded-md bg-background">
                    <option value="behavioral">Behavioral</option>
                    <option value="safety">Safety Concern</option>
                    <option value="academic">Academic Issue</option>
                    <option value="social">Social Issue</option>
                    <option value="mental-health">Mental Health Concern</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Severity Level</label>
                  <select className="w-full mt-1 px-3 py-2 border rounded-md bg-background">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Student Name</label>
                  <Input placeholder="Student's full name" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Student ID</label>
                  <Input placeholder="Student ID" className="mt-1" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Incident Title</label>
                <Input placeholder="Brief description of the incident" className="mt-1" />
              </div>

              <div>
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="Where did this incident occur?" className="mt-1" />
              </div>

              <div>
                <label className="text-sm font-medium">Detailed Description</label>
                <Textarea 
                  placeholder="Please provide a detailed description of what happened, including context, behaviors observed, and any immediate actions taken..."
                  className="mt-1 h-32"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Witnesses (if any)</label>
                <Input placeholder="Names of any witnesses" className="mt-1" />
              </div>

              <div>
                <label className="text-sm font-medium">Immediate Actions Taken</label>
                <Textarea 
                  placeholder="Describe any immediate actions or interventions implemented..."
                  className="mt-1 h-24"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Submit Report</Button>
                <Button variant="outline" onClick={() => setNewIncidentOpen(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search incidents..."
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
                <option value="behavioral">Behavioral</option>
                <option value="safety">Safety</option>
                <option value="academic">Academic</option>
                <option value="social">Social</option>
                <option value="mental-health">Mental Health</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Statuses</option>
                <option value="reported">Reported</option>
                <option value="under-review">Under Review</option>
                <option value="resolved">Resolved</option>
                <option value="escalated">Escalated</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incidents List */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
          <Card key={incident.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-3">
                    {getStatusIcon(incident.status)}
                    {incident.title}
                    <Badge variant={getSeverityColor(incident.severity)}>
                      {incident.severity.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Student: {incident.studentName} ({incident.studentId})</span>
                    <span>Reported: {new Date(incident.reportedDate).toLocaleDateString()}</span>
                    <span>By: {incident.reportedBy}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(incident.type)}`}>
                    {incident.type.replace('-', ' ')}
                  </span>
                  <Badge variant="outline">{incident.status.replace('-', ' ')}</Badge>
                </div>
              </div>
              <CardDescription className="line-clamp-2">{incident.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Location: {incident.location}
                  {incident.witnesses.length > 0 && (
                    <span className="ml-4">Witnesses: {incident.witnesses.length}</span>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedIncident(incident)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Incident Detail Modal */}
      <Dialog open={!!selectedIncident} onOpenChange={() => setSelectedIncident(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedIncident && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {getStatusIcon(selectedIncident.status)}
                  {selectedIncident.title}
                  <Badge variant={getSeverityColor(selectedIncident.severity)}>
                    {selectedIncident.severity.toUpperCase()}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Incident #{selectedIncident.id} • {selectedIncident.type.replace('-', ' ')}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Incident Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Student:</span>
                        <p>{selectedIncident.studentName} ({selectedIncident.studentId})</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Location:</span>
                        <p>{selectedIncident.location}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Reported By:</span>
                        <p>{selectedIncident.reportedBy}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Date & Time:</span>
                        <p>{new Date(selectedIncident.reportedDate).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Description:</span>
                      <p className="mt-1">{selectedIncident.description}</p>
                    </div>

                    {selectedIncident.witnesses.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Witnesses:</span>
                        <p className="mt-1">{selectedIncident.witnesses.join(', ')}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Actions Taken */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Actions Taken</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedIncident.actions.map((action, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Resolution */}
                {selectedIncident.resolution && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Resolution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{selectedIncident.resolution}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Status Update */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Update Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <select 
                        className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                        defaultValue={selectedIncident.status}
                      >
                        <option value="reported">Reported</option>
                        <option value="under-review">Under Review</option>
                        <option value="resolved">Resolved</option>
                        <option value="escalated">Escalated</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Add Note</label>
                      <Textarea 
                        placeholder="Add a note about this incident..."
                        className="mt-1 h-24"
                      />
                    </div>
                    <Button>Update Incident</Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};