import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail,
  type UserCredential
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  type DocumentReference
} from "firebase/firestore";
import { auth, googleProvider, db } from "./firebase";
import type { PhysicianProfile } from "../types/medical";

// Extended user profile interface for Firestore
export interface UserProfile extends Omit<PhysicianProfile, 'preferences'> {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  emailVerified: boolean;
  createdAt: any;
  lastLoginAt: any;
  authProvider: 'email' | 'google';
  preferences?: PhysicianProfile['preferences'];
}

// Create user profile in Firestore
export const createUserProfile = async (user: User, additionalData: Partial<UserProfile> = {}): Promise<void> => {
  if (!user) return;
  
  const userDocRef: DocumentReference = doc(db, 'profiles', user.uid);
  const userDoc = await getDoc(userDocRef);
  
  if (!userDoc.exists()) {
    const { displayName, email, photoURL, emailVerified } = user;
    
    const defaultProfile: UserProfile = {
      uid: user.uid,
      id: user.uid,
      name: displayName || email?.split('@')[0] || 'Unknown User',
      displayName: displayName || email?.split('@')[0] || 'Unknown User',
      email: email || '',
      photoURL: photoURL || undefined,
      emailVerified,
      specialty: 'General Practitioner', // Default value
      institution: '', // To be filled by user
      licenseNumber: '', // To be filled by user
      authProvider: 'email',
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      preferences: {
        preferredSources: [
          "PubMed/MEDLINE",
          "Cochrane Library",
          "ClinicalTrials.gov",
        ],
        notificationSettings: true,
        defaultFilters: {
          dateRange: "last-2-years",
          studyType: "all",
          region: "all",
          publicationStatus: "peer-reviewed",
          includePreprints: false,
        },
      },
      ...additionalData
    };

    try {
      await setDoc(userDocRef, defaultProfile);
      console.log('User profile created successfully');
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  } else {
    // Update last login time
    try {
      await updateDoc(userDocRef, {
        lastLoginAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDocRef = doc(db, 'profiles', uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Update user profile in Firestore
export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>): Promise<void> => {
  try {
    const userDocRef = doc(db, 'profiles', uid);
    await updateDoc(userDocRef, {
      ...updates,
      lastLoginAt: serverTimestamp()
    });
    console.log('User profile updated successfully');
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Sign up with email and password
export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
  additionalData: Partial<UserProfile> = {}
): Promise<{ user: User; profile: UserProfile }> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update display name if provided
    if (additionalData.name || additionalData.displayName) {
      await updateProfile(user, {
        displayName: additionalData.name || additionalData.displayName
      });
    }
    
    // Create profile in Firestore
    await createUserProfile(user, { ...additionalData, authProvider: 'email' });
    
    // Get the created profile
    const profile = await getUserProfile(user.uid);
    if (!profile) {
      throw new Error('Failed to create user profile');
    }
    
    return { user, profile };
  } catch (error) {
    console.error('Error signing up with email and password:', error);
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmailAndPassword_ = async (email: string, password: string): Promise<{ user: User; profile: UserProfile }> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update or create profile
    await createUserProfile(user, { authProvider: 'email' });
    
    // Get user profile
    const profile = await getUserProfile(user.uid);
    if (!profile) {
      throw new Error('Failed to fetch user profile');
    }
    
    return { user, profile };
  } catch (error) {
    console.error('Error signing in with email and password:', error);
    throw error;
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<{ user: User; profile: UserProfile }> => {
  try {
    const userCredential: UserCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    
    // Create or update profile
    await createUserProfile(user, { authProvider: 'google' });
    
    // Get user profile
    const profile = await getUserProfile(user.uid);
    if (!profile) {
      throw new Error('Failed to fetch user profile');
    }
    
    return { user, profile };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Send password reset email
export const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

// Auth state change listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!auth.currentUser;
}; 