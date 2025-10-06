import { db, auth } from '../firebase';
import { collection, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';

export interface ApiStudent {
  uid: string;
  name: string;
  class: string;
  wellbeingScore: number;
  lastActivity: string;
  riskLevel: 'low' | 'medium' | 'high';
  avatar?: string;
  email?: string;
  phone?: string;
  emergencyContact?: string;
  wellbeingHistory?: Array<{
    date: string;
    score: number;
    notes?: string;
  }>;
}

export const fetchStudentsByClass = async (classNames: string[], schoolId: string): Promise<ApiStudent[]> => {
  try {
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const studentsRef = collection(db, 'students');
    const q = query(
      studentsRef, 
      where('class', 'in', classNames),
      where('schoolId', '==', schoolId),
      orderBy('name')
    );
    
    const querySnapshot = await getDocs(q);
    const students: ApiStudent[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const lastActivity = data.lastActivity?.toDate ? data.lastActivity.toDate() : new Date();
      
      students.push({
        uid: doc.id,
        name: data.name || 'Unknown Student',
        class: data.class || 'Unknown Class',
        wellbeingScore: data.wellbeingScore || 0,
        lastActivity: lastActivity.toISOString(),
        riskLevel: calculateRiskLevel(data.wellbeingScore || 0),
        avatar: data.avatar || '',
        email: data.email || '',
        phone: data.phone || '',
        emergencyContact: data.emergencyContact || '',
        wellbeingHistory: data.wellbeingHistory || []
      });
    });

    return students;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

const calculateRiskLevel = (score: number): 'low' | 'medium' | 'high' => {
  if (score < 40) return 'high';
  if (score < 70) return 'medium';
  return 'low';
};

export const fetchStudentWellbeingHistory = async (studentId: string): Promise<Array<{
  date: string;
  score: number;
  notes?: string;
}>> => {
  try {
    const wellbeingRef = collection(db, `students/${studentId}/wellbeing`);
    const q = query(wellbeingRef, orderBy('date', 'desc'), limit(30));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      const date = data.date?.toDate ? data.date.toDate() : new Date();
      
      return {
        date: date.toISOString(),
        score: data.score || 0,
        notes: data.notes
      };
    });
  } catch (error) {
    console.error('Error fetching wellbeing history:', error);
    return [];
  }
};
