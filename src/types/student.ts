export interface Student {
  uid: string;
  name: string;
  email?: string;
  class: string;
  avatar?: string;
  phone?: string;
  emergencyContact?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentWellbeing {
  studentId: string;
  score: number;
  date: Date;
  notes?: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface StudentWithWellbeing extends Student {
  wellbeingScore: number;
  lastActivity: Date;
  riskLevel: 'low' | 'medium' | 'high';
  wellbeingHistory?: Array<{
    date: Date;
    score: number;
    notes?: string;
  }>;
}
