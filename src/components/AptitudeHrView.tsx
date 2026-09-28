import React, { useState } from 'react';
import { APTITUDE_QUESTIONS } from '../data/aptitudeQuestionsData';
import { HR_QUESTIONS } from '../data/hrQuestionsData';
import { 
  Calculator, 
  Brain, 
  Users, 
  Sparkles, 
  Check, 
  ChevronRight, 
  Lightbulb, 
  BookOpen, 
  Copy, 
  Send,
  HelpCircle,
  Clock
} from 'lucide-react';

export const AptitudeHrView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'aptitude' | 'hr' | 'star-builder'>('aptitude');
  
  // Aptitude filters & quiz states
  const [aptCategory, setAptCategory] = useState<'All' | 'Quantitative' | 'Logical Reasoning' | 'Verbal Ability'>('All');
  const [userAptAnswers, setUserAptAnswers] = useState<Record<string, number>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // STAR Builder state
  const [starPrompt, setStarPrompt] = useState('Tell me about a time you handled a tight project deadline or technical hurdle.');
  const [starSituation, setStarSituation] = useState('');
  const [starTask, setStarTask] = useState('');
  const [starAction, setStarAction] = useState('');
  const [starResult, setStarResult] = useState('');
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);

  // Aptitude filtered list
  const filteredAptitude = APTITUDE_QUESTIONS.filter((q) => {
    if (aptCategory === 'All') return true;
    return q.category === aptCategory;
  });

  const handleSelectOption = (qId: string, optIdx: number) => {
    setUserAptAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleToggleSolution = (qId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleGenerateStarScript = () => {
    if (!starSituation.trim() && !starAction.trim()) {
      alert('Please fill in at least Situation and Action to generate your speech!');
      return;
    }

    const script = `Interviewer: "${starPrompt}"

My Response:
"To answer that, during a notable milestone in my coursework/internship, ${starSituation.trim() || '[Situation]'}.

My key responsibility was to ${starTask.trim() || '[Task]'}.

To resolve this effectively, I took immediate ownership: ${starAction.trim() || '[Action]'}.

As a concrete result, ${starResult.trim() || '[Result]'}. This experience reinforced my commitment to rigorous problem-solving and calm execution under pressure."`;

    setGeneratedScript(script);
  };

  const handleCopyStar = () => {
    if (generatedScript) {
      navigator.clipboard.writeText(generatedScript);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    }
  };

  const handleLoadSampleStar = () => {
    setStarSituation('our full-stack payment gateway test suite broke 48 hours before the university placement demonstration.');
    setStarTask('diagnose the race conditions in webhook listener callbacks and prevent double-charging simulation tokens.');
    setStarAction('I implemented idempotent request IDs, added Redis locking across the worker queues, and conducted continuous load tests with Apache JMeter.');
    setStarResult('we eliminated 100% of double-charge anomalies, passed all evaluation benchmarks with sub-50ms latency, and received top honors from the judging panel.');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Sub-navigation tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveSubTab('aptitude')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'aptitude'
              ? 'text-indigo-600 border-b-2 border-indigo-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Aptitude &amp; Reasoning Practice
        </button>

        <button
          onClick={() => setActiveSubTab('hr')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'hr'
              ? 'text-indigo-600 border-b-2 border-indigo-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          HR Behavioral Bank
        </button>

        <button
          onClick={() => setActiveSubTab('star-builder')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'star-builder'
              ? 'text-indigo-600 border-b-2 border-indigo-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          STAR Answer Builder Tool
        </button>
      </div>

      {/* SUBTAB 1: Aptitude & Reasoning Practice */}
      {activeSubTab === 'aptitude' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {(['All', 'Quantitative', 'Logical Reasoning', 'Verbal Ability'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setAptCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  aptCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Question Cards */}
          <div className="space-y-4">
            {filteredAptitude.map((q, idx) => {
              const selectedOpt = userAptAnswers[q.id];
              const isRevealed = revealedSolutions[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className="font-semibold text-indigo-600">{q.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{q.topic}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {idx + 1}. {q.question}
                      </h3>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, oIdx) => {
                      const isChosen = selectedOpt === oIdx;
                      let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

                      if (isAnswered) {
                        if (oIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                        } else if (isChosen) {
                          btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer flex items-center ${btnStyle}`}
                        >
                          <span className="w-5 font-mono text-slate-400 font-semibold">{String.fromCharCode(65 + oIdx)}.</span>
                          <span className="flex-1">{opt}</span>
                          {isAnswered && oIdx === q.correctIndex && (
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      {isAnswered && (
                        <span className={`text-xs font-semibold ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {isCorrect ? '✓ Correct Answer!' : '✗ Incorrect choice'}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleToggleSolution(q.id)}
                      className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      {isRevealed ? 'Hide Solution' : 'View Formula & Shortcut'}
                    </button>
                  </div>

                  {/* Revealed Solution & Speed Trick */}
                  {isRevealed && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                      {q.formula && (
                        <div className="p-2.5 rounded bg-indigo-50 border border-indigo-100 text-indigo-900 font-medium">
                          <strong>Standard Formula:</strong> {q.formula}
                        </div>
                      )}

                      {q.shortcutTrick && (
                        <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900">
                          <strong>⚡ Speed Math Shortcut:</strong> {q.shortcutTrick}
                        </div>
                      )}

                      <div>
                        <strong className="text-slate-800">Step-by-Step Derivation:</strong>
                        <div className="whitespace-pre-line text-slate-600 mt-1 font-mono text-[11px] leading-relaxed">
                          {q.stepByStepSolution}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: HR Behavioral Bank */}
      {activeSubTab === 'hr' && (
        <div className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-xs text-indigo-900 leading-relaxed">
            <strong>HR Evaluation Strategy:</strong> Technical skills get you the interview; behavioral alignment and emotional maturity get you the offer. Every answer must highlight accountability, continuous learning, and measurable outcomes.
          </div>

          {HR_QUESTIONS.map((hr) => (
            <div key={hr.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                  {hr.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {hr.question}
                </h3>
                <p className="text-xs text-slate-500 italic mt-1">
                  <strong>Interviewer Intent:</strong> {hr.intent}
                </p>
              </div>

              {/* Sample Answer Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs leading-relaxed text-slate-800">
                <span className="font-bold text-indigo-700 block mb-1 text-[11px] uppercase tracking-wider">
                  Canonical Sample Answer
                </span>
                <p className="whitespace-pre-line">{hr.sampleAnswer}</p>
              </div>

              {/* STAR Framework Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-900">
                  <span className="font-bold block text-[10px] uppercase text-blue-700">Situation</span>
                  <p className="text-[11px] mt-0.5">{hr.starFramework.situation}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-900">
                  <span className="font-bold block text-[10px] uppercase text-indigo-700">Task</span>
                  <p className="text-[11px] mt-0.5">{hr.starFramework.task}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 text-amber-900">
                  <span className="font-bold block text-[10px] uppercase text-amber-700">Action</span>
                  <p className="text-[11px] mt-0.5">{hr.starFramework.action}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-900">
                  <span className="font-bold block text-[10px] uppercase text-emerald-700">Result</span>
                  <p className="text-[11px] mt-0.5">{hr.starFramework.result}</p>
                </div>
              </div>

              {/* Dos and Don'ts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200">
                  <span className="font-bold text-emerald-900 block mb-1">✓ Do Say</span>
                  <ul className="space-y-1 text-emerald-800 text-[11px]">
                    {hr.dos.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-rose-50/70 border border-rose-200">
                  <span className="font-bold text-rose-900 block mb-1">✗ Don't Say</span>
                  <ul className="space-y-1 text-rose-800 text-[11px]">
                    {hr.donts.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 3: Interactive STAR Answer Builder */}
      {activeSubTab === 'star-builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Builder Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Interactive STAR Response Architect
                </h3>
                <p className="text-xs text-slate-500">
                  Input your project or challenge details to generate a compelling, placement-ready answer.
                </p>
              </div>
              <button
                type="button"
                onClick={handleLoadSampleStar}
                className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
              >
                Load Sample Project
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Interview Question
              </label>
              <select
                value={starPrompt}
                onChange={(e) => setStarPrompt(e.target.value)}
                className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Tell me about a time you handled a tight project deadline or technical hurdle.">
                  Overcoming a tight project deadline or technical hurdle
                </option>
                <option value="Describe a project failure and how you remediated the situation.">
                  Remediating a system failure or outage
                </option>
                <option value="Tell me about a disagreement you had with a team member.">
                  Handling a technical disagreement with a teammate
                </option>
                <option value="What is a complex technical project you are proud of?">
                  Explaining your proudest engineering project
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                1. Situation (Context &amp; Challenge · 15%)
              </label>
              <textarea
                value={starSituation}
                onChange={(e) => setStarSituation(e.target.value)}
                placeholder="e.g. During our final year capstone, our database server crashed 72 hours before demo day..."
                rows={2}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                2. Task (Your Direct Ownership · 10%)
              </label>
              <textarea
                value={starTask}
                onChange={(e) => setStarTask(e.target.value)}
                placeholder="e.g. As backend lead, I was responsible for restoring lost tables and making schema migrations idempotent..."
                rows={2}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                3. Action (Your Concrete Technical Decisions · 60%)
              </label>
              <textarea
                value={starAction}
                onChange={(e) => setStarAction(e.target.value)}
                placeholder="e.g. I wrote a Python recovery script to replay transaction logs, established row-level locks in PostgreSQL, and ran automated stress tests..."
                rows={3}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                4. Result (Quantified Metrics &amp; Key Lessons · 15%)
              </label>
              <textarea
                value={starResult}
                onChange={(e) => setStarResult(e.target.value)}
                placeholder="e.g. We recovered 100% of data 18 hours before deadline, handled 500 demo transactions with 0 errors, and received highest grade in the department..."
                rows={2}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <button
              onClick={handleGenerateStarScript}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Generate Polished Interview Script
            </button>
          </div>

          {/* Generated Result Deck (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Interview Script Output
                </span>
                {generatedScript && (
                  <button
                    onClick={handleCopyStar}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedScript ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {generatedScript ? (
                <div className="whitespace-pre-line text-xs font-mono text-slate-200 leading-relaxed max-h-[480px] overflow-y-auto pr-2 bg-slate-950/60 p-4 rounded-lg border border-slate-800">
                  {generatedScript}
                </div>
              ) : (
                <div className="text-slate-400 text-xs text-center py-20 italic">
                  Fill in your STAR details on the left and click "Generate Polished Interview Script" to preview your 90-second verbal response.
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
              💡 <strong>Pro-Tip:</strong> Aim for a 90 to 120-second delivery pace. Speak clearly, pause between paragraphs, and emphasize your personal initiative.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
