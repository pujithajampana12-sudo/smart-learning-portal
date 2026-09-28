import React, { useState } from 'react';
import { SUBJECTS_LIST, TOPICS_DATA } from '../data/topicsData';
import { SubjectId } from '../types';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Search, 
  BookOpen, 
  Terminal, 
  Code,
  Bookmark,
  Share2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const NotesCheatsheetsView: React.FC = () => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('python');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const subjectLessons = TOPICS_DATA.filter((t) => t.subjectId === selectedSubject);

  const filteredLessons = subjectLessons.filter((lesson) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      lesson.title.toLowerCase().includes(q) ||
      lesson.category.toLowerCase().includes(q) ||
      lesson.keyNotes.some((n) => n.toLowerCase().includes(q)) ||
      lesson.codeSnippets.some((s) => s.title.toLowerCase().includes(q) || s.code.toLowerCase().includes(q))
    );
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadAllNotes = () => {
    const subjectName = SUBJECTS_LIST.find((s) => s.id === selectedSubject)?.name || selectedSubject;
    let markdown = `# ${subjectName} Revision Cheatsheet & Notes\nGenerated from Smart Learning Portal\nDate: ${new Date().toLocaleDateString()}\n\n---\n\n`;

    subjectLessons.forEach((lesson, idx) => {
      markdown += `## ${idx + 1}. ${lesson.title}\n`;
      markdown += `**Category:** ${lesson.category} | **Level:** ${lesson.level}\n\n`;
      markdown += `### Core Concepts:\n`;
      lesson.keyNotes.forEach((n) => {
        markdown += `- ${n}\n`;
      });
      markdown += `\n### Code Snippets:\n`;
      lesson.codeSnippets.forEach((s) => {
        markdown += `#### ${s.title}\n\`\`\`${s.language}\n${s.code}\n\`\`\`\n*${s.explanation}*\n\n`;
      });
      if (lesson.interviewTips.length > 0) {
        markdown += `### Interview Tips:\n`;
        lesson.interviewTips.forEach((tip) => {
          markdown += `- ${tip}\n`;
        });
      }
      markdown += `\n---\n\n`;
    });

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedSubject}_cheatsheet_notes.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Subject Filter & Download Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {SUBJECTS_LIST.map((subj) => (
            <button
              key={subj.id}
              onClick={() => setSelectedSubject(subj.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedSubject === subj.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {subj.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleDownloadAllNotes}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          Export {SUBJECTS_LIST.find((s) => s.id === selectedSubject)?.name} Notes (.md)
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter notes by keyword, syntax, method..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* Notes Grid */}
      <div className="space-y-6">
        {filteredLessons.map((lesson, idx) => (
          <div
            key={lesson.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  Chapter {idx + 1} · {lesson.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {lesson.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(lesson.id, lesson.keyNotes.join('\n'))}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === lesson.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Notes</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Key Notes */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Essential Points to Memorize
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {lesson.keyNotes.map((note, nIdx) => (
                  <div
                    key={nIdx}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Cheatsheet Snippets */}
            {lesson.codeSnippets.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Syntax Reference
                </h4>
                {lesson.codeSnippets.map((snip, sIdx) => {
                  const sId = `${lesson.id}-cheat-${sIdx}`;
                  return (
                    <div key={sIdx} className="rounded-lg border border-slate-200 overflow-hidden">
                      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100 border-b border-slate-200 text-[11px]">
                        <span className="font-semibold text-slate-800">{snip.title}</span>
                        <button
                          onClick={() => handleCopy(sId, snip.code)}
                          className="text-indigo-600 hover:underline flex items-center gap-1 font-medium cursor-pointer"
                        >
                          {copiedId === sId ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <pre className="p-3 text-xs font-mono bg-slate-900 text-slate-100 overflow-x-auto leading-relaxed">
                        <code>{snip.code}</code>
                      </pre>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
