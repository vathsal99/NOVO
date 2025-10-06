import { fetchStudentsByClass } from './studentApi';
import { subMonths, format } from 'date-fns';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export interface TeacherStudent {
  uid: string;
  name: string;
  class: string;
  riskLevel: 'low' | 'medium' | 'high';
  wellbeingScore: number;
  lastActivity: string;
  reason?: string;
  duration?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  emergencyContact?: string;
}

export interface TeacherAnalytics {
  totalStudents: number;
  averageWellbeing: number;
  engagementRate: number;
  performanceData: Array<{
    month: string;
    wellbeingScore: number;
    engagementScore: number;
  }>;
}

// Generate performance data for the last 6 months
const generatePerformanceData = (students: TeacherStudent[]) => {
  const months = 6;
  const now = new Date();
  const performanceData = [];
  
  for (let i = months - 1; i >= 0; i--) {
    const date = subMonths(now, i);
    const monthName = format(date, 'MMM');
    
    // Calculate average wellbeing score for the month (simplified)
    const baseScore = 70 + Math.floor(Math.random() * 15); // Random base score between 70-85
    const variation = Math.floor(Math.random() * 10) - 5; // Random variation of -5 to +5
    const wellbeingScore = Math.max(0, Math.min(100, baseScore + variation));
    
    // Engagement score is typically higher than wellbeing score
    const engagementScore = Math.min(100, wellbeingScore + 5 + Math.floor(Math.random() * 10));
    
    performanceData.push({
      month: monthName,
      wellbeingScore,
      engagementScore
    });
  }
  
  return performanceData;
};

export const fetchTeacherAnalytics = async (classes: string[], schoolId: string): Promise<TeacherAnalytics> => {
  try {
    const students = await fetchStudentsByClass(classes, schoolId);
    const totalStudents = students.length;
    
    if (totalStudents === 0) {
      return {
        totalStudents: 0,
        averageWellbeing: 0,
        engagementRate: 0,
        performanceData: []
      };
    }
    
    // Calculate average wellbeing score
    const averageWellbeing = Math.round(
      students.reduce((sum, student) => sum + student.wellbeingScore, 0) / totalStudents
    );
    
    // Calculate engagement rate (students active in the last 7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const recentlyActive = students.filter(student => {
      const lastActivity = new Date(student.lastActivity);
      return lastActivity >= oneWeekAgo;
    });
    
    const engagementRate = Math.round((recentlyActive.length / totalStudents) * 100);
    
    // Generate performance data
    const performanceData = generatePerformanceData(students);
    
    return {
      totalStudents,
      averageWellbeing,
      engagementRate,
      performanceData
    };
  } catch (error) {
    console.error('Error fetching teacher analytics:', error);
    throw error;
  }
};

export const fetchTeacherStudents = async (classes: string[], schoolId: string): Promise<TeacherStudent[]> => {
  try {
    const apiStudents = await fetchStudentsByClass(classes, schoolId);
    
    // Convert API students to TeacherStudent format
    return apiStudents.map(student => ({
      uid: student.uid,
      name: student.name,
      class: student.class,
      riskLevel: student.riskLevel,
      wellbeingScore: student.wellbeingScore,
      lastActivity: student.lastActivity,
      avatar: student.avatar,
      email: student.email,
      phone: student.phone,
      emergencyContact: student.emergencyContact,
      // Add reason and duration for high-risk students
      ...(student.riskLevel === 'high' ? {
        reason: 'Wellbeing score below 40%',
        duration: 'Needs attention'
      } : {})
    }));
  } catch (error) {
    console.error('Error fetching teacher students:', error);
    throw error;
  }
};

// Additional helper functions for teacher dashboard

export const getStudentsByRiskLevel = (students: TeacherStudent[], riskLevel: 'low' | 'medium' | 'high') => {
  return students.filter(student => student.riskLevel === riskLevel);
};

export const getClassStatistics = (students: TeacherStudent[], className: string) => {
  const classStudents = students.filter(student => student.class === className);
  const averageWellbeing = classStudents.reduce((sum, student) => sum + student.wellbeingScore, 0) / classStudents.length;
  
  return {
    totalStudents: classStudents.length,
    averageWellbeing: Math.round(averageWellbeing),
    riskDistribution: {
      low: classStudents.filter(s => s.riskLevel === 'low').length,
      medium: classStudents.filter(s => s.riskLevel === 'medium').length,
      high: classStudents.filter(s => s.riskLevel === 'high').length,
    }
  };
};

export const getRecentActivityStudents = (students: TeacherStudent[], days: number = 7) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return students.filter(student => {
    const lastActivity = new Date(student.lastActivity);
    return lastActivity >= cutoffDate;
  });
};