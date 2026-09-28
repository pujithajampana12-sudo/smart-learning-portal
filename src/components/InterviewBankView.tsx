import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { INTERVIEW_QUESTIONS } from '../data/interviewQuestionsData';
import { SUBJECTS_LIST } from '../data/topicsData';
import { SubjectId, InterviewQuestion } from '../types';
import { 
  HelpCircle, 
  Bookmark, 
  ChevronDown, 
  ChevronRight, 
  Sparkles, 
  RotateCw, 
  Search, 
  Check, 
  Lightbulb,
  Award,
  Layers
} from 'lucide-react';

export const InterviewBankView: React.FC = () => {
  const { user, toggleBookmarkQuestion } = useAuth();
  
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modes: 'list' | 'flashcard' | 'drill'
  const [viewMode, setViewMode] = useState<'list' | 'flashcard' | 'drill'>('list');
  const [expandedQId, setExpandedQId] = useState<string | null>(INTERVIEW_QUESTIONS[0]?.id || null);

  // Flashcard mode state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Drill mode state
  const [drillActive, setDrillActive] = useState(false);
  const [drillAnswers, setDrillAnswers] = useState<Record<string, 'confident' | 'unsure' | 'unknown'>>({});

  const filteredQuestions = INTERVIEW_QUESTIONS.filter((q) => {
    const matchSubj = selectedSubject === 'all' || q.subjectId === selectedSubject;
    const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    if (!matchSubj || !matchDiff) return false;
    if (!searchQuery) return true;
    const search = searchQuery.toLowerCase();
    return (
      q.question.toLowerCase().includes(search) ||
      q.answer.toLowerCase().includes(search) ||
      q.category.toLowerCase().includes(search)
    );
  });

  const currentFlashcard = filteredQuestions[cardIndex] || filteredQuestions[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Controls: Mode Switcher & Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Mode Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Question Bank
          </button>
          <button
            onClick={() => { setViewMode('flashcard'); setIsFlipped(false); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              viewMode === 'flashcard'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <RotateCw className="w-3 h-3" />
            Flashcard Mode
          </button>
          <button
            onClick={() => { setViewMode('drill'); setDrillActive(true); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              viewMode === 'drill'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3 h-3" />
            Mock Interview Drill
          </button>
        </div>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedSubject}
            onChange={(e) => { setSelectedSubject(e.target.value as SubjectId | 'all'); setCardIndex(0); }}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">All Subjects</option>
            {SUBJECTS_LIST.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => { setSelectedDifficulty(e.target.value); setCardIndex(0); }}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">All Difficulties</option>
            <option value="Fresher">Fresher / Entry</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Senior">Senior / Advanced</option>
          </select>

          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Q&A..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none w-36 sm:w-48"
            />
          </div>
        </div>
      </div>

      {/* MODE 1: Standard Question Bank List */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredQuestions.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
              No interview questions match your filter.
            </div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const isExpanded = expandedQId === q.id;
              const isBookmarked = user?.bookmarkedQuestions.includes(q.id);

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all"
                >
                  <div
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/70"
                    onClick={() => setExpandedQId(isExpanded ? null : q.id)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-mono font-bold text-slate-400 mt-0.5">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <span className="font-semibold text-indigo-600 capitalize">{q.subjectId}</span>
                          <span aria-hidden="true">·</span>
                          <span>{q.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                            q.difficulty === 'Fresher' ? 'bg-emerald-50 text-emerald-700' :
                            q.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700' :
                            'bg-rose-50 text-rose-700'
                          }`}>
                            {q.difficulty}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          {q.question}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmarkQuestion(q.id);
                        }}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          isBookmarked
                            ? 'bg-amber-50 text-amber-600 border-amber-300'
                            : 'text-slate-400 border-slate-200 hover:text-slate-700'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                      >
                        <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
                      </button>

                      <div className="p-1 text-slate-400">
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-4 text-xs">
                      <div>
                        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1.5">
                          Standard Answer &amp; Architectural Reasoning
                        </h4>
                        <div className="whitespace-pre-line text-slate-700 leading-relaxed font-sans bg-white p-4 rounded-lg border border-slate-200">
                          {q.answer}
                        </div>
                      </div>

                      {q.codeSnippet && (
                        <div>
                          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1.5">
                            Code Example ({q.codeSnippet.language})
                          </h4>
                          <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed">
                            <code>{q.codeSnippet.code}</code>
                          </pre>
                        </div>
                      )}

                      {q.keyTakeaways.length > 0 && (
                        <div>
                          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                            Key Speaking Points to Hit
                          </h4>
                          <ul className="space-y-1">
                            {q.keyTakeaways.map((point, pIdx) => (
                              <li key={pIdx} className="text-slate-700 flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {q.commonMistakes && (
                        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800">
                          <strong>Common Interviewee Pitfall:</strong> {q.commonMistakes}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* MODE 2: Flashcard Self-Drill */}
      {viewMode === 'flashcard' && currentFlashcard && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Card {cardIndex + 1} of {filteredQuestions.length}</span>
            <span className="capitalize font-semibold text-indigo-600">{currentFlashcard.subjectId}</span>
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[320px] bg-white rounded-2xl border-2 border-indigo-200 hover:border-indigo-400 p-8 shadow-md flex flex-col justify-between cursor-pointer transition-all relative select-none"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                  currentFlashcard.difficulty === 'Fresher' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {currentFlashcard.difficulty}
                </span>
                <span className="text-[11px] text-indigo-600 font-semibold flex items-center gap-1">
                  <RotateCw className="w-3 h-3" />
                  Click card to {isFlipped ? 'view Question' : 'reveal Answer'}
                </span>
              </div>

              {!isFlipped ? (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {currentFlashcard.question}
                  </h3>
                  <p className="text-xs text-slate-400 mt-4">
                    Think through your verbal explanation, then click the card to check against the canonical model answer.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    Model Answer
                  </span>
                  <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto pr-2">
                    {currentFlashcard.answer}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{currentFlashcard.category}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmarkQuestion(currentFlashcard.id);
                }}
                className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Bookmark className="w-3.5 h-3.5" />
                {user?.bookmarkedQuestions.includes(currentFlashcard.id) ? 'Saved' : 'Bookmark Card'}
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrevCard}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Previous Card
            </button>
            <button
              onClick={handleNextCard}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 cursor-pointer shadow-xs"
            >
              Next Card
            </button>
          </div>
        </div>
      )}

      {/* MODE 3: Mock Interview Drill */}
      {viewMode === 'drill' && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              Mock Interview Readiness Drill
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Rate your confidence on 5 randomized interview questions to evaluate technical fluency.
            </p>
          </div>

          <div className="space-y-4">
            {INTERVIEW_QUESTIONS.slice(0, 5).map((q, idx) => {
              const rating = drillAnswers[q.id];
              return (
                <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      Q{idx + 1}. {q.question}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                      {q.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setDrillAnswers((prev) => ({ ...prev, [q.id]: 'confident' }))}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        rating === 'confident'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ✓ Can Explain Confidently
                    </button>
                    <button
                      onClick={() => setDrillAnswers((prev) => ({ ...prev, [q.id]: 'unsure' }))}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        rating === 'unsure'
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ~ Need Brief Review
                    </button>
                    <button
                      onClick={() => setDrillAnswers((prev) => ({ ...prev, [q.id]: 'unknown' }))}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        rating === 'unknown'
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ✗ Need to Learn
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Assessed: {Object.keys(drillAnswers).length} / 5
            </span>
            <button
              onClick={() => {
                alert(`Drill completed! High confidence on ${Object.values(drillAnswers).filter((v) => v === 'confident').length} out of 5 questions.`);
              }}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
            >
              Finish Drill Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
