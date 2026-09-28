export type SubjectId = 'python' | 'java' | 'c' | 'dbms' | 'html' | 'aptitude' | 'reasoning' | 'hr';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  institution?: string;
  joinedDate: string;
  streakDays: number;
  completedTopics: string[]; // topic IDs
  completedVideos: string[]; // video IDs
  solvedProblems: string[]; // problem IDs
  bookmarkedQuestions: string[]; // question IDs
  savedNotes: string[]; // note IDs
  quizScores: Record<string, number>; // quizId -> score percentage
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TopicLesson {
  id: string;
  subjectId: SubjectId;
  title: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  videoId: string; // YouTube video ID
  videoChannel: string;
  videoTitle: string;
  timestamps: { title: string; time: string; seconds: number }[];
  keyNotes: string[];
  codeSnippets: { title: string; language: string; code: string; explanation: string }[];
  interviewTips: string[];
  quiz: QuizQuestion[];
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  subjectId: SubjectId;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: {
    python: string;
    java: string;
    c: string;
    sql?: string;
    javascript: string;
  };
  solution: {
    language: string;
    code: string;
    approach: string;
    complexityAnalysis: string;
  };
  hints: string[];
  testCases: TestCase[];
}

export interface InterviewQuestion {
  id: string;
  subjectId: SubjectId;
  category: string;
  question: string;
  difficulty: 'Fresher' | 'Intermediate' | 'Senior';
  answer: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  keyTakeaways: string[];
  commonMistakes: string;
  frequency: 'High' | 'Very High' | 'Medium';
}

export interface AptitudeQuestion {
  id: string;
  category: 'Quantitative' | 'Logical Reasoning' | 'Verbal Ability';
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  formula?: string;
  shortcutTrick?: string;
  stepByStepSolution: string;
}

export interface HRQuestion {
  id: string;
  category: 'Behavioral' | 'Company Fit' | 'Situation Handling' | 'Career Goals';
  question: string;
  intent: string;
  sampleAnswer: string;
  starFramework: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  dos: string[];
  donts: string[];
  followUpQuestions: string[];
}
