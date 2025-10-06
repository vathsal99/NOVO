
export interface UserRole {
  id: string;
  user_id: string;
  role: 'student' | 'management' | 'teacher';
  created_at: string;
}

export interface ExtendedUser {
  uid: string;
  email: string;
  role?: 'student' | 'management' | 'teacher';
  name?: string;
  demographics?: {
    name?: string;
    [key: string]: any;
  };
  user_metadata?: {
    isAdmin?: boolean;
    role?: string;
    [key: string]: any;
  };
}
