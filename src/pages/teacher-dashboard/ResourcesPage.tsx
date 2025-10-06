import React, { useState } from 'react';
import { ActivitiesPage } from './ActivitiesPage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BookOpen, Clock, Star, Download, Search, Eye, FileText, Video, Users, Brain, Heart, Shield } from 'lucide-react';

interface ReadingMaterial {
  id: number;
  title: string;
  category: string;
  readTime: string;
  rating: number;
  description: string;
  type: string;
  content: string;
  author: string;
  publishDate: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const readingMaterials: ReadingMaterial[] = [
  {
    id: 1,
    title: "Understanding Student Anxiety",
    category: "Mental Health",
    readTime: "15 min",
    rating: 4.8,
    description: "Comprehensive guide on identifying and supporting students with anxiety disorders.",
    type: "Guide",
    content: `# Understanding Student Anxiety

## Introduction
Student anxiety has become increasingly prevalent in today's educational environment. This comprehensive guide will help you identify, understand, and support students experiencing anxiety.

## Signs and Symptoms
### Physical Signs
- Restlessness or fidgeting
- Fatigue
- Difficulty concentrating
- Muscle tension
- Sleep disturbances

### Emotional Signs
- Excessive worry
- Irritability
- Fear of failure
- Avoidance behaviors
- Perfectionism

### Academic Signs
- Decline in performance
- Procrastination
- Difficulty participating in class
- Test anxiety
- Frequent absences

## Supporting Students with Anxiety
### Classroom Strategies
1. **Create a Safe Environment**: Establish clear routines and expectations
2. **Offer Choices**: Allow students some control over their learning
3. **Break Tasks Down**: Divide large assignments into manageable chunks
4. **Use Positive Reinforcement**: Acknowledge effort and progress
5. **Teach Coping Strategies**: Introduce breathing exercises and mindfulness

### Communication Techniques
- Listen without judgment
- Validate their feelings
- Use calm, reassuring language
- Avoid minimizing their concerns
- Collaborate on solutions

## When to Seek Additional Help
Contact school counselors or mental health professionals when:
- Anxiety significantly impacts academic performance
- Student expresses hopelessness
- Physical symptoms persist
- Family dynamics are affected
- Self-harm is mentioned or suspected`,
    author: "Dr. Sarah Chen",
    publishDate: "2024-01-15",
    tags: ["anxiety", "mental health", "classroom management", "student support"],
    difficulty: "intermediate"
  },
  {
    id: 2,
    title: "Building Classroom Resilience",
    category: "Wellbeing",
    readTime: "20 min",
    rating: 4.9,
    description: "Strategies for creating a supportive classroom environment that promotes resilience.",
    type: "Article",
    content: `# Building Classroom Resilience

## What is Resilience?
Resilience is the ability to bounce back from challenges, adapt to change, and grow stronger through adversity. In the classroom, resilient students are better equipped to handle academic stress, social challenges, and life's inevitable setbacks.

## The Resilient Classroom Framework

### 1. Emotional Safety
Creating an environment where students feel safe to express emotions and take risks:
- Establish clear behavioral expectations
- Model emotional regulation
- Address conflicts constructively
- Celebrate mistakes as learning opportunities

### 2. Positive Relationships
Building strong connections between teacher and students:
- Learn students' names and interests
- Show genuine care and concern
- Provide regular positive feedback
- Create opportunities for peer bonding

### 3. Growth Mindset Culture
Fostering belief that abilities can be developed:
- Praise effort over ability
- Teach about brain plasticity
- Emphasize learning from failures
- Set challenging but achievable goals`,
    author: "Maria Rodriguez",
    publishDate: "2024-01-12",
    tags: ["resilience", "classroom management", "emotional learning", "positive environment"],
    difficulty: "beginner"
  },
  {
    id: 3,
    title: "Crisis Intervention Protocols",
    category: "Emergency",
    readTime: "25 min",
    rating: 4.9,
    description: "Step-by-step procedures for handling student crisis situations effectively.",
    type: "Protocol",
    content: `# Crisis Intervention Protocols

## Immediate Response Framework

### Step 1: Assess the Situation
- Ensure immediate safety of all students
- Identify the type of crisis (behavioral, emotional, medical)
- Determine if emergency services are needed
- Remove other students if necessary

### Step 2: De-escalation Techniques
- Remain calm and composed
- Use a low, steady voice
- Give the student space
- Avoid arguing or reasoning during crisis
- Listen without judgment

### Step 3: Support and Stabilize
- Provide reassurance
- Help student regain control
- Use grounding techniques
- Stay with student until help arrives

## Communication Protocols

### Immediate Notifications
1. School administrator
2. School counselor/psychologist
3. Parents/guardians
4. Emergency services (if needed)

### Documentation Requirements
- Date and time of incident
- Detailed description of events
- Actions taken
- People involved/notified
- Follow-up plans`,
    author: "Crisis Response Team",
    publishDate: "2024-01-20",
    tags: ["crisis", "emergency", "safety", "protocols", "intervention"],
    difficulty: "advanced"
  },
  {
    id: 4,
    title: "Parent Communication Guide",
    category: "Communication",
    readTime: "18 min",
    rating: 4.6,
    description: "Best practices for discussing student wellbeing concerns with parents.",
    type: "Guide",
    content: `# Parent Communication Guide

## Establishing Positive Relationships

### Initial Contact
- Introduce yourself early in the year
- Share positive observations about their child
- Explain your communication style and preferences
- Provide multiple ways to reach you

### Building Trust
- Be consistent in communication
- Follow through on commitments
- Respect family values and culture
- Maintain confidentiality appropriately

## Discussing Concerns

### Preparation
- Gather specific examples and data
- Focus on observable behaviors
- Prepare potential solutions
- Choose appropriate timing and setting

### The Conversation
1. **Start Positive**: Begin with strengths
2. **Be Specific**: Use concrete examples
3. **Listen Actively**: Hear their perspective
4. **Collaborate**: Work together on solutions
5. **Plan Follow-up**: Set clear next steps`,
    author: "Lisa Thompson",
    publishDate: "2024-01-05",
    tags: ["parent communication", "family engagement", "difficult conversations", "collaboration"],
    difficulty: "intermediate"
  }
];

const ReadingMaterialsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState<ReadingMaterial | null>(null);

  const filteredMaterials = readingMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || material.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mental Health': return <Heart className="h-4 w-4" />;
      case 'Wellbeing': return <Brain className="h-4 w-4" />;
      case 'Emergency': return <Shield className="h-4 w-4" />;
      case 'Teaching Strategy': return <BookOpen className="h-4 w-4" />;
      case 'Communication': return <Users className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video': return <Video className="h-4 w-4" />;
      case 'Guide': return <BookOpen className="h-4 w-4" />;
      case 'Article': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search reading materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Categories</option>
            <option value="Mental Health">Mental Health</option>
            <option value="Wellbeing">Wellbeing</option>
            <option value="Emergency">Emergency</option>
            <option value="Teaching Strategy">Teaching Strategy</option>
            <option value="Communication">Communication</option>
          </select>
        </div>
      </div>

      {/* Reading Materials Grid */}
      <div className="grid gap-4">
        {filteredMaterials.map((material) => (
          <Card key={material.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="flex items-center gap-3">
                    {getTypeIcon(material.type)}
                    {material.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {material.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {material.rating}
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getCategoryIcon(material.category)}
                      {material.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getDifficultyColor(material.difficulty)}>
                    {material.difficulty}
                  </Badge>
                </div>
              </div>
              <CardDescription>{material.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 mb-4">
                {material.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => setSelectedMaterial(material)}
                  className="flex-1 text-white"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Read Material
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reading Material Dialog */}
      <Dialog open={!!selectedMaterial} onOpenChange={() => setSelectedMaterial(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedMaterial && getTypeIcon(selectedMaterial.type)}
              {selectedMaterial?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedMaterial && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>By {selectedMaterial.author}</span>
                <span>•</span>
                <span>{selectedMaterial.publishDate}</span>
                <span>•</span>
                <span>{selectedMaterial.readTime}</span>
              </div>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap">{selectedMaterial.content}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const ResourcesPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resources</h1>
          <p className="text-muted-foreground">Educational materials, activities, and reading resources for student wellbeing</p>
        </div>
      </div>

      <div className="w-full">
        {/* Chrome-style Tabs */}
        <Tabs defaultValue="activities" className="w-full">
          <div className="relative">
            <TabsList className="h-auto p-0 bg-transparent border-b-0 justify-start">
              <TabsTrigger 
                value="activities" 
                className="relative h-10 rounded-t-lg border-l border-t border-r border-b-0 
                         data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:z-10 data-[state=active]:border-b-background
                         data-[state=inactive]:bg-muted/30 data-[state=inactive]:text-muted-foreground data-[state=inactive]:border-border
                         px-6 font-medium text-sm transition-all duration-200
                         hover:bg-background/50 hover:text-foreground
                         before:absolute before:bottom-0 before:left-0 before:right-0 before:h-px before:bg-border
                         data-[state=active]:before:bg-background"
              >
                Activities & Sessions
              </TabsTrigger>
              <TabsTrigger 
                value="materials" 
                className="relative h-10 rounded-t-lg border-l border-t border-r border-b-0 
                         data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:z-10 data-[state=active]:border-b-background
                         data-[state=inactive]:bg-muted/30 data-[state=inactive]:text-muted-foreground data-[state=inactive]:border-border
                         px-6 font-medium text-sm transition-all duration-200
                         hover:bg-background/50 hover:text-foreground
                         before:absolute before:bottom-0 before:left-0 before:right-0 before:h-px before:bg-border
                         data-[state=active]:before:bg-background"
              >
                Reading Materials
              </TabsTrigger>
            </TabsList>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-border -z-10"></div>
          </div>
          
          <div className="bg-background border border-t-0 rounded-b-lg min-h-[400px]">
            <TabsContent value="activities" className="p-6 m-0">
              <ActivitiesPage />
            </TabsContent>
            
            <TabsContent value="materials" className="p-6 m-0">
              <ReadingMaterialsTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};