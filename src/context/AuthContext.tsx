import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string, role?: string, institution?: string) => Promise<{ success: boolean; message?: string }>;
  quickDemoLogin: (role?: 'student' | 'fresher') => void;
  logout: () => void;
  toggleCompleteTopic: (topicId: string) => void;
  toggleCompleteVideo: (videoId: string) => void;
  toggleSolveProblem: (problemId: string) => void;
  toggleBookmarkQuestion: (questionId: string) => void;
  saveQuizScore: (quizId: string, percentage: number) => void;
}

const STORAGE_KEY = 'smart_learn_current_user';
const USERS_DB_KEY = 'smart_learn_registered_users';

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr-demo-01',
  name: 'Pujitha Jampana',
  email: 'pujithajampana12@gmail.com',
  role: 'Aspiring Software Engineer',
  institution: 'University School of Computer Science',
  joinedDate: 'September 2026',
  streakDays: 5,
  completedTopics: ['py-01', 'java-01', 'dbms-01'],
  completedVideos: ['_uQrJ0TkZlc', 'grEKMHGYyns'],
  solvedProblems: ['prob-01', 'prob-02'],
  bookmarkedQuestions: ['iq-py-01', 'iq-dbms-01', 'iq-hr-01'],
  savedNotes: ['py-01', 'dbms-01'],
  quizScores: {
    'py-01': 100,
    'java-01': 80,
    'dbms-01': 100,
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return DEFAULT_DEMO_USER; // Default to demo user so portal is immediately interactive
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    // Basic verification against stored accounts or demo
    if (!email || !password) {
      return { success: false, message: 'Please provide both email and password.' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    try {
      const allUsersStr = localStorage.getItem(USERS_DB_KEY);
      const allUsers = allUsersStr ? JSON.parse(allUsersStr) : [];
      const matched = allUsers.find((u: { email: string; passwordHash: string }) => u.email.toLowerCase() === email.toLowerCase());

      if (matched) {
        const loggedUser: UserProfile = {
          id: matched.id,
          name: matched.name,
          email: matched.email,
          role: matched.role || 'Computer Science Student',
          institution: matched.institution || 'Tech Academy',
          joinedDate: matched.joinedDate || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          streakDays: matched.streakDays || 1,
          completedTopics: matched.completedTopics || [],
          completedVideos: matched.completedVideos || [],
          solvedProblems: matched.solvedProblems || [],
          bookmarkedQuestions: matched.bookmarkedQuestions || [],
          savedNotes: matched.savedNotes || [],
          quizScores: matched.quizScores || {},
        };
        setUser(loggedUser);
        return { success: true };
      }
    } catch {
      // ignore
    }

    // If it's the demo account
    if (email.toLowerCase().includes('demo') || email.toLowerCase() === 'pujithajampana12@gmail.com') {
      setUser(DEFAULT_DEMO_USER);
      return { success: true };
    }

    // Auto-create session for valid demo test drives
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0],
      email: email,
      role: 'Student Developer',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      streakDays: 1,
      completedTopics: [],
      completedVideos: [],
      solvedProblems: [],
      bookmarkedQuestions: [],
      savedNotes: [],
      quizScores: {},
    };
    setUser(newUser);
    return { success: true };
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: string = 'Software Engineer Candidate',
    institution: string = 'State University'
  ): Promise<{ success: boolean; message?: string }> => {
    if (!name.trim()) return { success: false, message: 'Full name is required.' };
    if (!email.includes('@') || !email.includes('.')) return { success: false, message: 'Valid email address required.' };
    if (password.length < 8) return { success: false, message: 'Password must be at least 8 characters long.' };

    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: role.trim() || 'Software Engineer Candidate',
      institution: institution.trim() || 'State University',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      streakDays: 1,
      completedTopics: [],
      completedVideos: [],
      solvedProblems: [],
      bookmarkedQuestions: [],
      savedNotes: [],
      quizScores: {},
    };

    try {
      const allUsersStr = localStorage.getItem(USERS_DB_KEY);
      const allUsers = allUsersStr ? JSON.parse(allUsersStr) : [];
      allUsers.push({
        ...newUser,
        passwordHash: btoa(password), // simulated safe hash representation
      });
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(allUsers));
    } catch {
      // ignore
    }

    setUser(newUser);
    return { success: true };
  };

  const quickDemoLogin = (role: 'student' | 'fresher' = 'student') => {
    if (role === 'student') {
      setUser(DEFAULT_DEMO_USER);
    } else {
      setUser({
        id: 'usr-fresher-02',
        name: 'Alex Rivera',
        email: 'alex.rivera@techhire.dev',
        role: 'Placement Candidate 2026',
        institution: 'Institute of Technology',
        joinedDate: 'August 2026',
        streakDays: 12,
        completedTopics: ['py-01', 'py-02', 'c-01', 'dbms-01', 'html-01'],
        completedVideos: ['_uQrJ0TkZlc', 'grEKMHGYyns', 'KJgsSFOSQv0'],
        solvedProblems: ['prob-01', 'prob-02', 'prob-03', 'prob-04'],
        bookmarkedQuestions: ['iq-py-01', 'iq-py-02', 'iq-java-01', 'iq-c-01'],
        savedNotes: ['py-01', 'java-01', 'c-01'],
        quizScores: {
          'py-01': 100,
          'py-02': 100,
          'java-01': 100,
          'dbms-01': 90,
        },
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const toggleCompleteTopic = (topicId: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const exists = prev.completedTopics.includes(topicId);
      const updated = exists
        ? prev.completedTopics.filter((id) => id !== topicId)
        : [...prev.completedTopics, topicId];
      return { ...prev, completedTopics: updated };
    });
  };

  const toggleCompleteVideo = (videoId: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const exists = prev.completedVideos.includes(videoId);
      const updated = exists
        ? prev.completedVideos.filter((id) => id !== videoId)
        : [...prev.completedVideos, videoId];
      return { ...prev, completedVideos: updated };
    });
  };

  const toggleSolveProblem = (problemId: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const exists = prev.solvedProblems.includes(problemId);
      const updated = exists
        ? prev.solvedProblems.filter((id) => id !== problemId)
        : [...prev.solvedProblems, problemId];
      return { ...prev, solvedProblems: updated };
    });
  };

  const toggleBookmarkQuestion = (questionId: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const exists = prev.bookmarkedQuestions.includes(questionId);
      const updated = exists
        ? prev.bookmarkedQuestions.filter((id) => id !== questionId)
        : [...prev.bookmarkedQuestions, questionId];
      return { ...prev, bookmarkedQuestions: updated };
    });
  };

  const saveQuizScore = (quizId: string, percentage: number) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [quizId]: Math.max(percentage, prev.quizScores[quizId] || 0),
        },
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        quickDemoLogin,
        logout,
        toggleCompleteTopic,
        toggleCompleteVideo,
        toggleSolveProblem,
        toggleBookmarkQuestion,
        saveQuizScore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
