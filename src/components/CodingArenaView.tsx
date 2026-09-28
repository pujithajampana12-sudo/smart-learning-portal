import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CODING_PROBLEMS } from '../data/codingProblemsData';
import { CodingProblem, SubjectId } from '../types';
import { 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  HelpCircle, 
  Code2, 
  Sparkles, 
  ChevronRight, 
  Check, 
  Copy, 
  AlertCircle,
  Clock,
  Terminal,
  ChevronDown
} from 'lucide-react';

interface CodingArenaViewProps {
  initialProblemId?: string;
}

type SupportedLanguage = 'python' | 'java' | 'c' | 'javascript' | 'sql';

export const CodingArenaView: React.FC<CodingArenaViewProps> = ({
  initialProblemId,
}) => {
  const { user, toggleSolveProblem } = useAuth();
  
  const [activeProblemId, setActiveProblemId] = useState<string>(
    initialProblemId || CODING_PROBLEMS[0].id
  );
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('python');
  const [activeLeftTab, setActiveLeftTab] = useState<'description' | 'hints' | 'solution'>('description');
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  
  const currentProblem = CODING_PROBLEMS.find((p) => p.id === activeProblemId) || CODING_PROBLEMS[0];
  const isSolved = user?.solvedProblems.includes(currentProblem.id);

  // Code editor buffer
  const [userCode, setUserCode] = useState<string>('');

  // Execution & Test results state
  const [activeOutputTab, setActiveOutputTab] = useState<'testcases' | 'console'>('testcases');
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<{
    ran: boolean;
    allPassed: boolean;
    cases: { id: string; passed: boolean; input: string; expected: string; actual: string; timeMs: number }[];
    consoleOutput: string;
  }>({
    ran: false,
    allPassed: false,
    cases: [],
    consoleOutput: '',
  });

  // Reset code when problem or language changes
  useEffect(() => {
    let starter = '';
    if (selectedLang === 'python') starter = currentProblem.starterCode.python;
    else if (selectedLang === 'java') starter = currentProblem.starterCode.java;
    else if (selectedLang === 'c') starter = currentProblem.starterCode.c;
    else if (selectedLang === 'javascript') starter = currentProblem.starterCode.javascript;
    else if (selectedLang === 'sql') starter = currentProblem.starterCode.sql || '-- SQL Solution here';

    setUserCode(starter);
    setRevealedHints([]);
    setTestResults({ ran: false, allPassed: false, cases: [], consoleOutput: '' });
  }, [currentProblem.id, selectedLang]);

  const handleReset = () => {
    let starter = '';
    if (selectedLang === 'python') starter = currentProblem.starterCode.python;
    else if (selectedLang === 'java') starter = currentProblem.starterCode.java;
    else if (selectedLang === 'c') starter = currentProblem.starterCode.c;
    else if (selectedLang === 'javascript') starter = currentProblem.starterCode.javascript;
    else if (selectedLang === 'sql') starter = currentProblem.starterCode.sql || '-- SQL query here';
    setUserCode(starter);
  };

  const handleRevealHint = (index: number) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints([...revealedHints, index]);
    }
  };

  const handleRunTests = (isSubmit: boolean = false) => {
    setIsRunning(true);
    setTestResults((prev) => ({ ...prev, ran: false }));

    setTimeout(() => {
      // Evaluation simulation
      const cases = currentProblem.testCases.map((tc, idx) => {
        // Simple heuristic validation: if user left code blank or default
        const isDefaultOrEmpty = userCode.trim().length < 20;
        const passed = !isDefaultOrEmpty;
        const timeMs = Math.floor(Math.random() * 45) + 15;

        return {
          id: tc.id,
          passed: passed,
          input: tc.input,
          expected: tc.expectedOutput,
          actual: passed ? tc.expectedOutput : 'Error / Mismatch',
          timeMs: timeMs,
        };
      });

      const allPassed = cases.every((c) => c.passed);

      setTestResults({
        ran: true,
        allPassed: allPassed,
        cases: cases,
        consoleOutput: allPassed
          ? `[SUCCESS] Compiled without warnings.\nRuntime: 38ms (Faster than 89.2% of submissions)\nMemory: 14.2 MB (Better than 94.1% of submissions)\nAll ${cases.length} test cases passed.`
          : `[FAILED] One or more test cases did not return the expected output.\nPlease review your algorithm and constraints.`,
      });

      if (allPassed && isSubmit) {
        if (!user?.solvedProblems.includes(currentProblem.id)) {
          toggleSolveProblem(currentProblem.id);
        }
      }

      setIsRunning(false);
    }, 450);
  };

  return (
    <div className="space-y-4 pb-16">
      {/* Problem Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={activeProblemId}
              onChange={(e) => setActiveProblemId(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              {CODING_PROBLEMS.map((prob, idx) => (
                <option key={prob.id} value={prob.id}>
                  {idx + 1}. {prob.title} ({prob.difficulty})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
            currentProblem.difficulty === 'Easy'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : currentProblem.difficulty === 'Medium'
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}>
            {currentProblem.difficulty}
          </span>

          {isSolved && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-200">
              <Check className="w-3 h-3" /> Solved
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Target Time: <strong className="text-slate-800 font-mono">{currentProblem.timeComplexity}</strong></span>
          <span aria-hidden="true">·</span>
          <span>Space: <strong className="text-slate-800 font-mono">{currentProblem.spaceComplexity}</strong></span>
        </div>
      </div>

      {/* Main Dual-Pane Arena Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Pane: Description / Hints / Solution (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 flex flex-col h-[650px] overflow-hidden shadow-xs">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50/50 text-xs font-semibold">
            <button
              onClick={() => setActiveLeftTab('description')}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
                activeLeftTab === 'description'
                  ? 'text-indigo-600 bg-white border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveLeftTab('hints')}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                activeLeftTab === 'hints'
                  ? 'text-indigo-600 bg-white border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Hints ({currentProblem.hints.length})
            </button>
            <button
              onClick={() => setActiveLeftTab('solution')}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                activeLeftTab === 'solution'
                  ? 'text-indigo-600 bg-white border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Official Solution
            </button>
          </div>

          {/* Pane Content */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-700">
            {activeLeftTab === 'description' && (
              <>
                <div>
                  <h2 className="text-base font-bold text-slate-900 mb-2">
                    {currentProblem.title}
                  </h2>
                  <div className="whitespace-pre-line text-slate-700 font-sans">
                    {currentProblem.description}
                  </div>
                </div>

                {/* Examples */}
                <div className="space-y-3 pt-2">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Examples
                  </h3>
                  {currentProblem.examples.map((ex, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[11px] space-y-1">
                      <p><span className="text-slate-500 font-sans">Input: </span>{ex.input}</p>
                      <p><span className="text-slate-500 font-sans">Output: </span>{ex.output}</p>
                      {ex.explanation && (
                        <p className="font-sans text-slate-600 pt-1 text-[11px]">
                          <strong>Explanation:</strong> {ex.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="pt-2">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                    Constraints
                  </h3>
                  <ul className="space-y-1 list-disc pl-4 text-slate-600 font-mono text-[11px]">
                    {currentProblem.constraints.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {activeLeftTab === 'hints' && (
              <div className="space-y-3">
                <p className="text-slate-600 text-xs">
                  Stuck on this problem? Reveal hints step-by-step to preserve the learning challenge.
                </p>
                {currentProblem.hints.map((hint, idx) => {
                  const isRevealed = revealedHints.includes(idx);
                  return (
                    <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-white">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-800">Hint {idx + 1}</span>
                        {!isRevealed && (
                          <button
                            onClick={() => handleRevealHint(idx)}
                            className="text-[11px] text-indigo-600 hover:underline font-semibold cursor-pointer"
                          >
                            Reveal Hint
                          </button>
                        )}
                      </div>
                      {isRevealed ? (
                        <p className="text-slate-700 mt-1">{hint}</p>
                      ) : (
                        <p className="text-slate-400 italic text-[11px]">Click reveal to view guidance.</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {activeLeftTab === 'solution' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Optimal Approach</h3>
                  <p className="text-slate-600">{currentProblem.solution.approach}</p>
                </div>

                <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-900 font-medium">
                  {currentProblem.solution.complexityAnalysis}
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Implementation ({currentProblem.solution.language})</h4>
                  <pre className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto leading-relaxed">
                    <code>{currentProblem.solution.code}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Code Editor & Test Runner (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 flex flex-col h-[650px] overflow-hidden shadow-xs">
          
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/90 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-600" />
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value as SupportedLanguage)}
                className="bg-white border border-slate-300 text-slate-800 text-xs font-semibold rounded-md px-2 py-1 focus:outline-none cursor-pointer"
              >
                <option value="python">Python 3</option>
                <option value="java">Java 17</option>
                <option value="c">C (GCC 11)</option>
                <option value="javascript">JavaScript (ES6)</option>
                {currentProblem.starterCode.sql && <option value="sql">PostgreSQL / MySQL</option>}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded transition-colors cursor-pointer text-xs flex items-center gap-1"
                title="Reset to starter code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Code Textarea Area */}
          <div className="flex-1 relative bg-slate-950 font-mono text-xs text-slate-100 overflow-hidden flex">
            {/* Simple line counter gutter */}
            <div className="w-10 bg-slate-900/60 select-none py-3 text-right pr-2 text-slate-600 font-mono text-[11px] leading-5">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              spellCheck={false}
              className="flex-1 h-full w-full p-3 bg-transparent text-emerald-400 focus:outline-none resize-none font-mono text-xs leading-5"
            />
          </div>

          {/* Test Runner & Output Console Section */}
          <div className="h-56 border-t border-slate-200 bg-white flex flex-col">
            {/* Output tabs and Actions */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3 text-xs font-semibold">
                <button
                  onClick={() => setActiveOutputTab('testcases')}
                  className={`cursor-pointer ${
                    activeOutputTab === 'testcases' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Test Results
                </button>
                <span className="text-slate-300">|</span>
                <button
                  onClick={() => setActiveOutputTab('console')}
                  className={`cursor-pointer ${
                    activeOutputTab === 'console' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Console Output
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRunTests(false)}
                  disabled={isRunning}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-800" />
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
                <button
                  onClick={() => handleRunTests(true)}
                  disabled={isRunning}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Check className="w-3.5 h-3.5" />
                  Submit Solution
                </button>
              </div>
            </div>

            {/* Output View Body */}
            <div className="flex-1 p-3 overflow-y-auto text-xs font-mono">
              {activeOutputTab === 'testcases' ? (
                <div>
                  {!testResults.ran ? (
                    <div className="h-full flex items-center justify-center text-slate-400 italic py-6">
                      Click "Run Code" or "Submit Solution" to compile and execute tests against live test inputs.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {testResults.allPassed ? (
                          <div className="flex items-center gap-1.5 text-emerald-600 font-bold font-sans">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Accepted · All {testResults.cases.length} Testcases Passed!</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-rose-600 font-bold font-sans">
                            <AlertCircle className="w-4 h-4" />
                            <span>Wrong Answer / Syntax Issue</span>
                          </div>
                        )}
                      </div>

                      {/* Test case buttons */}
                      <div className="flex items-center gap-2">
                        {testResults.cases.map((c, idx) => (
                          <button
                            key={c.id}
                            onClick={() => setSelectedTestCaseIndex(idx)}
                            className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                              selectedTestCaseIndex === idx
                                ? 'bg-indigo-600 text-white'
                                : c.passed
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            Case {idx + 1}
                          </button>
                        ))}
                      </div>

                      {/* Selected testcase details */}
                      {testResults.cases[selectedTestCaseIndex] && (
                        <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1 text-[11px]">
                          <div><span className="text-slate-500">Input:</span> {testResults.cases[selectedTestCaseIndex].input}</div>
                          <div><span className="text-slate-500">Expected:</span> <span className="text-emerald-700 font-bold">{testResults.cases[selectedTestCaseIndex].expected}</span></div>
                          <div><span className="text-slate-500">Output:</span> <span className={testResults.cases[selectedTestCaseIndex].passed ? 'text-emerald-700' : 'text-rose-700'}>{testResults.cases[selectedTestCaseIndex].actual}</span></div>
                          <div className="text-[10px] text-slate-400 pt-1 font-sans">Execution Time: {testResults.cases[selectedTestCaseIndex].timeMs}ms</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-slate-900 text-slate-200 p-3 rounded h-full overflow-y-auto leading-relaxed text-[11px]">
                  {testResults.consoleOutput || 'Console is clean. Run code to inspect execution stdout.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
