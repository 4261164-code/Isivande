import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';

export type UserRole = 'student' | 'admin' | null;

interface AuthContextType {
  user: User | null | { uid: string; email: string; displayName: string };
  role: UserRole;
  loading: boolean;
  logout: () => Promise<void>;
  mockLogin?: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | { uid: string; email: string; displayName: string }>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    if (isMock) return;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setRole(userDoc.data().role as UserRole);
          } else {
            // Create a new student profile by default
            const newUserData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || 'New Student',
              role: 'student',
              createdAt: new Date().toISOString()
            };
            await setDoc(userDocRef, newUserData);
            setRole('student');
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isMock]);

  const logout = async () => {
    if (isMock) {
      setIsMock(false);
      setUser(null);
      setRole(null);
      return;
    }
    await auth.signOut();
  };

  const mockLogin = (mockRole: UserRole) => {
    setIsMock(true);
    setUser({
      uid: `mock-${mockRole}-123`,
      email: `${mockRole}@example.com`,
      displayName: `Mock ${mockRole === 'admin' ? 'Admin' : 'Student'}`
    });
    setRole(mockRole);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout, mockLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
