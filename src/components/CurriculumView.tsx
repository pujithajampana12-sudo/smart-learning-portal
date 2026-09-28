import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SUBJECTS_LIST, TOPICS_DATA } from '../data/topicsData';
import { SubjectId, TopicLesson } from '../types';
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  HelpCircle, 
  Lightbulb,
  Award
} from 'lucide-react';

interface CurriculumViewProps {
  selectedSubject: SubjectId;
  onSelectSubject: (subject: SubjectId) => void;
  onOpenVideoLesson: (lessonId: string) => void;
  searchFilter?: string;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  selectedSubject,
  onSelectSubject,
  onOpenVideoLesson,
  searchFilter = '',
}) => {
  const { user, toggleCompleteTopic, saveQuizScore } = useAuth();
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(TOPICS_DATA[0]?.id || null);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  // Active quiz states: topicId -> { questionId -> selectedIndex, isSubmitted }
  const [quizAnswers, setQuizAnswers] = useState<Record<string, Record<string, number>>>({});
  const [submittedQuizTopic, setSubmittedQuizTopic] = useState<Record<string, boolean>>({});

  const filteredTopics = TOPICS_DATA.filter((topic) => {
    const matchesSubject = topic.subjectId === selectedSubject;
    if (!searchFilter) return matchesSubject;
    const query = searchFilter.toLowerCase();
    return (
      (matchesSubject || query.includes(topic.subjectId)) &&
      (topic.title.toLowerCase().includes(query) ||
        topic.summary.toLowerCase().includes(query) ||
        topic.category.toLowerCase().includes(query) ||
        topic.keyNotes.some((n) => n.toLowerCase().includes(query)))
    );
  });

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const handleSelectQuizAnswer = (topicId: string, qId: string, optIndex: number) => {
    if (submittedQuizTopic[topicId]) return; // already locked
    setQuizAnswers((prev) => ({
      ...prev,
      [topicId]: {
        ...(prev[topicId] || {}),
        [qId]: optIndex,
      },
    }));
  };

  const handleSubmitTopicQuiz = (topic: TopicLesson) => {
    const answers = quizAnswers[topic.id] || {};
    let correctCount = 0;
    topic.quiz.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / topic.quiz.length) * 100);
    setSubmittedQuizTopic((prev) => ({ ...prev, [topic.id]: true }));
    saveQuizScore(topic.id, percentage);
  };

  const currentSubjectMeta = SUBJECTS_LIST.find((s) => s.id === selectedSubject) || SUBJECTS_LIST[0];

  return (
    <div className="space-y-6 pb-16">
      {/* Subject Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-200">
        {SUBJECTS_LIST.map((subj) => {
          const isActive = selectedSubject === subj.id;
          return (
            <button
              key={subj.id}
              onClick={() => onSelectSubject(subj.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {subj.name}
            </button>
          );
        })}
      </div>

      {/* Subject Header Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold mb-1 text-slate-500">
            <span>Subject Curriculum</span>
            <span aria-hidden="true">·</span>
            <span>{currentSubjectMeta.name}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{currentSubjectMeta.tagline}</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">{currentSubjectMeta.description}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-xs text-slate-500">Total Lessons</span>
            <p className="text-lg font-bold text-slate-900 tabular-nums">
              {filteredTopics.length} Topics
            </p>
          </div>
        </div>
      </div>

      {/* Topic List */}
      <div className="space-y-4">
        {filteredTopics.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
            No lessons matching your search query in this track.
          </div>
        ) : (
          filteredTopics.map((topic, index) => {
            const isCompleted = user?.completedTopics.includes(topic.id);
            const isExpanded = expandedTopicId === topic.id;
            const quizScore = user?.quizScores[topic.id];

            return (
              <div
                key={topic.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                {/* Topic Header Summary */}
                <div
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                  onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                >
                  <div className="flex items-start gap-3.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompleteTopic(topic.id);
                      }}
                      className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-slate-300 text-transparent hover:border-indigo-500'
                      }`}
                      title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>

                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className="font-semibold text-slate-700">Lesson {index + 1}</span>
                        <span aria-hidden="true">·</span>
                        <span>{topic.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {topic.duration}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          topic.level === 'Beginner' ? 'bg-emerald-50 text-emerald-700' :
                          topic.level === 'Intermediate' ? 'bg-amber-50 text-amber-700' :
                          'bg-indigo-50 text-indigo-700'
                        }`}>
                          {topic.level}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {topic.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenVideoLesson(topic.id);
                      }}
                      className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-indigo-700" />
                      <span className="hidden sm:inline">Watch Video</span>
                    </button>

                    <div className="p-1 text-slate-400">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Lesson Deep Dive */}
                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50/40 p-5 sm:p-6 space-y-6">
                    {/* Key Core Notes */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        Core Architectural Principles &amp; Notes
                      </h4>
                      <ul className="space-y-1.5">
                        {topic.keyNotes.map((note, nIdx) => (
                          <li key={nIdx} className="text-xs text-slate-700 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Interactive Code Snippets */}
                    {topic.codeSnippets.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Syntax &amp; Implementation Snippets
                        </h4>
                        {topic.codeSnippets.map((snippet, sIdx) => {
                          const snipId = `${topic.id}-snip-${sIdx}`;
                          return (
                            <div key={sIdx} className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                              <div className="flex items-center justify-between px-4 py-2 bg-slate-100/80 border-b border-slate-200 text-xs">
                                <span className="font-semibold text-slate-800">{snippet.title}</span>
                                <button
                                  onClick={() => handleCopyCode(snipId, snippet.code)}
                                  className="flex items-center gap-1 text-[11px] text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                                >
                                  {copiedSnippetId === snipId ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span className="text-emerald-600">Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Copy Code</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <pre className="p-4 text-xs font-mono bg-slate-900 text-slate-100 overflow-x-auto leading-relaxed">
                                <code>{snippet.code}</code>
                              </pre>
                              <div className="px-4 py-2 bg-slate-50 text-[11px] text-slate-600 border-t border-slate-100">
                                <strong>Explanation:</strong> {snippet.explanation}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Interview Tips Callout */}
                    {topic.interviewTips.length > 0 && (
                      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
                        <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                          High-Yield Placement &amp; Interview Tips
                        </h4>
                        <ul className="space-y-1">
                          {topic.interviewTips.map((tip, tIdx) => (
                            <li key={tIdx} className="text-xs text-amber-800">
                              • {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Quick Checkpoint Quiz */}
                    {topic.quiz.length > 0 && (
                      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                            Lesson Checkpoint Quiz
                          </h4>
                          {quizScore !== undefined && (
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Best Score: {quizScore}%
                            </span>
                          )}
                        </div>

                        <div className="space-y-4">
                          {topic.quiz.map((q) => {
                            const selectedOpt = quizAnswers[topic.id]?.[q.id];
                            const isSubmitted = submittedQuizTopic[topic.id];

                            return (
                              <div key={q.id} className="space-y-2">
                                <p className="text-xs font-medium text-slate-800">
                                  {q.question}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {q.options.map((opt, oIdx) => {
                                    const isChosen = selectedOpt === oIdx;
                                    const isCorrect = q.correctIndex === oIdx;

                                    let optClass = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                                    if (isSubmitted) {
                                      if (isCorrect) {
                                        optClass = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
                                      } else if (isChosen && !isCorrect) {
                                        optClass = 'bg-rose-50 border-rose-400 text-rose-900';
                                      }
                                    } else if (isChosen) {
                                      optClass = 'bg-indigo-50 border-indigo-500 text-indigo-900 font-medium';
                                    }

                                    return (
                                      <button
                                        key={oIdx}
                                        type="button"
                                        onClick={() => handleSelectQuizAnswer(topic.id, q.id, oIdx)}
                                        className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${optClass}`}
                                      >
                                        <span className="mr-2 font-mono text-slate-400">{String.fromCharCode(65 + oIdx)}.</span>
                                        {opt}
                                      </button>
                                    );
                                  })}
                                </div>

                                {isSubmitted && (
                                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200 mt-1">
                                    <strong>Explanation:</strong> {q.explanation}
                                  </p>
                                )}
                              </div>
                            );
                          })}

                          <div className="pt-2 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => handleSubmitTopicQuiz(topic)}
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                            >
                              {submittedQuizTopic[topic.id] ? 'Recalculate Score' : 'Submit Checkpoint'}
                            </button>

                            <button
                              type="button"
                              onClick={() => onOpenVideoLesson(topic.id)}
                              className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              Watch Full Lecture with Timestamps
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
