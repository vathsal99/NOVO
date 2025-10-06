import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment, 
  serverTimestamp, 
  collection, 
  query, 
  where, 
  getDocs,
  addDoc,
  Timestamp
} from 'firebase/firestore';
import { auth, db } from '@/integrations/firebase';

interface UserStats {
  gamesCompleted: number;
  totalMinutesTrained: number;
  lastTrained?: Date;
  currentLevel: string;
  completedTasks: string[];
}

export const getUserStats = async (userId: string): Promise<UserStats> => {
  try {
    const statsRef = doc(db, 'userStats', userId);
    const statsSnap = await getDoc(statsRef);
    
    if (statsSnap.exists()) {
      return statsSnap.data() as UserStats;
    } else {
      // Initialize with default values if no stats exist
      const defaultStats: UserStats = {
        gamesCompleted: 0,
        totalMinutesTrained: 0,
        currentLevel: 'Beginner',
        completedTasks: []
      };
      await setDoc(statsRef, defaultStats);
      return defaultStats;
    }
  } catch (error) {
    console.error('Error getting user stats:', error);
    throw error;
  }
};

export const updateGameCompletion = async (userId: string, gameId: string, minutesTrained: number) => {
  try {
    const statsRef = doc(db, 'userStats', userId);
    const statsSnap = await getDoc(statsRef);
    
    let currentLevel = 'Beginner';
    let gamesCompleted = 1;
    let completedTasks: string[] = [gameId];
    
    if (statsSnap.exists()) {
      const currentStats = statsSnap.data() as UserStats;
      gamesCompleted = currentStats.gamesCompleted + 1;
      completedTasks = [...new Set([...currentStats.completedTasks, gameId])];
      
      // Calculate level based on games completed
      if (gamesCompleted >= 15) currentLevel = 'Expert';
      else if (gamesCompleted >= 8) currentLevel = 'Advanced';
      else if (gamesCompleted >= 3) currentLevel = 'Intermediate';
      else currentLevel = 'Beginner';
    }
    
    // Update user stats
    await setDoc(statsRef, {
      gamesCompleted,
      totalMinutesTrained: increment(minutesTrained),
      currentLevel,
      completedTasks,
      lastTrained: serverTimestamp()
    }, { merge: true });
    
    // Create a new cognitive session record
    const sessionData = {
      userId,
      gameId,
      minutesTrained,
      startTime: Timestamp.fromMillis(Date.now() - (minutesTrained * 60000)),
      endTime: serverTimestamp()
    };
    
    // Add the session to the cognitiveSessions collection
    const sessionsRef = collection(db, 'cognitiveSessions');
    await addDoc(sessionsRef, sessionData);
    
    return { 
      gamesCompleted, 
      currentLevel, 
      totalMinutesTrained: minutesTrained 
    };
  } catch (error) {
    console.error('Error updating game completion:', error);
    throw error;
  }
};

export const getTodaysCognitiveMinutes = async (userId: string): Promise<number> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const sessionsRef = collection(db, 'cognitiveSessions');
    const q = query(
      sessionsRef,
      where('userId', '==', userId),
      where('startTime', '>=', Timestamp.fromDate(today))
    );
    
    const querySnapshot = await getDocs(q);
    let totalMinutes = 0;
    
    querySnapshot.forEach((doc) => {
      const session = doc.data();
      if (session.startTime && session.endTime) {
        const startTime = session.startTime.toDate ? session.startTime.toDate() : new Date(session.startTime);
        const endTime = session.endTime.toDate ? session.endTime.toDate() : new Date(session.endTime);
        const durationMs = endTime.getTime() - startTime.getTime();
        totalMinutes += Math.floor(durationMs / 60000); // Convert ms to minutes
      }
    });
    
    return totalMinutes;
  } catch (error) {
    console.error('Error getting today\'s cognitive minutes:', error);
    return 0;
  }
};
