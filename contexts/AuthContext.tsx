"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  signInWithEmailAndPassword_,
  signUpWithEmailAndPassword,
  signInWithGoogle,
  signOutUser,
  sendPasswordReset,
  onAuthStateChange,
  getUserProfile,
  updateUserProfile,
  type UserProfile
} from '../lib/auth';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ user: User; profile: UserProfile }>;
  signUp: (email: string, password: string, additionalData?: Partial<UserProfile>) => Promise<{ user: User; profile: UserProfile }>;
  signInWithGoogle: () => Promise<{ user: User; profile: UserProfile }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword_(email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, additionalData: Partial<UserProfile> = {}) => {
    setLoading(true);
    try {
      const result = await signUpWithEmailAndPassword(email, password, additionalData);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogleHandler = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOutUser();
      setCurrentUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    await sendPasswordReset(email);
  };

  // Update user profile
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }
    
    await updateUserProfile(currentUser.uid, updates);
    
    // Refresh user profile
    const updatedProfile = await getUserProfile(currentUser.uid);
    if (updatedProfile) {
      setUserProfile(updatedProfile);
    }
  };

  // Load user profile when user changes
  const loadUserProfile = async (user: User | null) => {
    if (user) {
      try {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } catch (error) {
        console.error('Error loading user profile:', error);
        setUserProfile(null);
      }
    } else {
      setUserProfile(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setCurrentUser(user);
      await loadUserProfile(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle: signInWithGoogleHandler,
    logout,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 