import React from 'react';
import { useAuth } from '../context/AuthContext';
import { SUBJECTS_LIST, TOPICS_DATA } from '../data/topicsData';
import { CODING_PROBLEMS } from '../data/codingProblemsData';
import { INTERVIEW_QUESTIONS } from '../data/interviewQuestionsData';
import { NavTab } from './Navbar';
import { 
  Flame, 
  CheckCircle2, 
  Code2, 
  Award, 
  ArrowRight, 
  Play, 
  BookOpen, 
  Layers, 
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';
import { SubjectId } from '../types';

interface DashboardViewProps {
  onNavigateTab: (tab: NavTab) => void;
  onSelectSubject: (subjectId: SubjectId) => void;
  onOpenVideo: (lessonId: string) => void;
  onOpenCodingProblem: (problemId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateTab,
  onSelectSubject,
  onOpenVideo,
  onOpenCodingProblem,
}) => {
  const { user } = useAuth();

  const totalTopics = TOPICS_DATA.length;
  const completedTopicsCount = user?.completedTopics.length || 0;
  const progressPercent = Math.min(100, Math.round((completedTopicsCount / totalTopics) * 100));

  const totalProblems = CODING_PROBLEMS.length;
  const solvedProblemsCount = user?.solvedProblems.length || 0;

  const totalBookmarks = user?.bookmarkedQuestions.length || 0;

  // Next recommended topic to study
  const nextTopic = TOPICS_DATA.find((t) => !user?.completedTopics.includes(t.id)) || TOPICS_DATA[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold mb-2">
            <span>Student Learning Portal</span>
            <span aria-hidden="true">·</span>
            <span>Placement &amp; Exam Readiness</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2">
            Welcome back, {user ? user.name.split(' ')[0] : 'Engineer'}!
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Master Python, Java, C, DBMS, HTML, Quantitative Aptitude, and HR interviews. Track your code execution, video progress, and mock placement drills.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectSubject(nextTopic.subjectId)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              Resume: {nextTopic.title.slice(0, 32)}...
            </button>
            <button
              onClick={() => onNavigateTab('coding')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg text-xs sm:text-sm flex items-center gap-2 transition-colors border border-white/10 cursor-pointer"
            >
              <Code2 className="w-4 h-4" />
              Practice Coding Arena
            </button>
          </div>
        </div>

        {/* Decorative subtle ambient pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <Layers className="w-64 h-64 text-indigo-400" />
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Daily Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
            {user?.streakDays || 1} <span className="text-xs font-normal text-slate-500">Days</span>
          </div>
          <p className="text-slate-500 text-[11px] mt-1">Keep learning daily to boost retention</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Curriculum Progress</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
            {progressPercent}%
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Problems Solved</span>
            <Code2 className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
            {solvedProblemsCount} <span className="text-xs font-normal text-slate-500">/ {totalProblems}</span>
          </div>
          <p className="text-slate-500 text-[11px] mt-1">Real-time testcase verified</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Saved Questions</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
            {totalBookmarks} <span className="text-xs font-normal text-slate-500">Saved</span>
          </div>
          <p className="text-slate-500 text-[11px] mt-1">Ready for high-yield interview review</p>
        </div>
      </div>

      {/* Main Learning Tracks Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Core Subjects &amp; Placement Tracks</h2>
            <p className="text-xs text-slate-500">Explore comprehensive video lessons, curated notes, cheatsheets, and quizzes.</p>
          </div>
          <button
            onClick={() => onNavigateTab('curriculum')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
          >
            View All Curriculum
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SUBJECTS_LIST.map((subject) => {
            const subjectTopics = TOPICS_DATA.filter((t) => t.subjectId === subject.id);
            const completedCount = subjectTopics.filter((t) => user?.completedTopics.includes(t.id)).length;
            const subProgress = subjectTopics.length > 0 ? Math.round((completedCount / subjectTopics.length) * 100) : 0;

            return (
              <div
                key={subject.id}
                onClick={() => onSelectSubject(subject.id)}
                className="bg-white rounded-xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${subject.badgeColor}`}>
                      {subject.topicsCount} Topics
                    </span>
                    <span className="text-xs font-medium text-slate-400 group-hover:text-indigo-600 transition-colors">
                      {subProgress}% done
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {subject.description}
                  </p>
                </div>

                <div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-3">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all"
                      style={{ width: `${subProgress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-indigo-600 font-medium">
                    <span>Start Learning</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Launchpad & Recommended Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recommended Coding Challenges */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-600" />
                Featured Coding Challenges
              </h3>
              <p className="text-xs text-slate-500">Run code in-browser against live test cases</p>
            </div>
            <button
              onClick={() => onNavigateTab('coding')}
              className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
            >
              Open Arena
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {CODING_PROBLEMS.slice(0, 4).map((prob) => {
              const isSolved = user?.solvedProblems.includes(prob.id);
              return (
                <div
                  key={prob.id}
                  onClick={() => onOpenCodingProblem(prob.id)}
                  className="py-3 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-lg transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      isSolved 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'border border-slate-300 text-slate-400'
                    }`}>
                      {isSolved ? '✓' : ''}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {prob.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="capitalize">{prob.subjectId}</span>
                        <span aria-hidden="true">·</span>
                        <span>{prob.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      prob.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : prob.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {prob.difficulty}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* HR Interview & Placement Drill Quick Card */}
        <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus &amp; Off-Campus Placement Drill</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              HR &amp; Technical Interview Prep
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Practice behavioral questions using the structured STAR framework (Situation, Task, Action, Result) with interactive answer builder.
            </p>

            <div className="space-y-2 mb-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>"Tell me about yourself" Elevator pitch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Conflict resolution &amp; technical trade-offs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Aptitude speed math shortcuts</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => onNavigateTab('aptitude-hr')}
              className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Open HR STAR Answer Builder
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('interview')}
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors text-center cursor-pointer"
            >
              Browse 40+ Technical Interview Q&amp;A
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
