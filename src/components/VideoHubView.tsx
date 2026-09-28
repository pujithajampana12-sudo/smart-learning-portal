import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TOPICS_DATA, SUBJECTS_LIST } from '../data/topicsData';
import { SubjectId, TopicLesson } from '../types';
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ListOrdered, 
  ExternalLink, 
  ChevronRight,
  Sparkles,
  Copy,
  Check
} from 'lucide-react';

interface VideoHubViewProps {
  initialLessonId?: string;
  onSelectCodingArena?: () => void;
}

export const VideoHubView: React.FC<VideoHubViewProps> = ({
  initialLessonId,
  onSelectCodingArena,
}) => {
  const { user, toggleCompleteVideo, toggleCompleteTopic } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('python');
  
  const [activeLessonId, setActiveLessonId] = useState<string>(
    initialLessonId || TOPICS_DATA[0].id
  );

  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const currentLesson = TOPICS_DATA.find((t) => t.id === activeLessonId) || TOPICS_DATA[0];
  const isWatched = user?.completedVideos.includes(currentLesson.videoId);

  const subjectLessons = TOPICS_DATA.filter((t) => t.subjectId === selectedSubject);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet('copied');
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Subject Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-200">
        {SUBJECTS_LIST.map((subj) => (
          <button
            key={subj.id}
            onClick={() => {
              setSelectedSubject(subj.id);
              const firstLessonOfSubj = TOPICS_DATA.find((t) => t.subjectId === subj.id);
              if (firstLessonOfSubj) setActiveLessonId(firstLessonOfSubj.id);
            }}
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

      {/* Main Video & Playlist Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Video Player & Lecture Notes Deck (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Responsive 16:9 Video Player Container */}
          <div className="bg-black rounded-2xl overflow-hidden shadow-lg border border-slate-800 aspect-video relative group">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${currentLesson.videoId}?rel=0`}
              title={currentLesson.videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Video Metadata & Watch Status */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span className="font-semibold text-indigo-600">{currentLesson.videoChannel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {currentLesson.duration}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{currentLesson.subjectId}</span>
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                  {currentLesson.title}
                </h1>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    toggleCompleteVideo(currentLesson.videoId);
                    toggleCompleteTopic(currentLesson.id);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isWatched
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isWatched ? 'Completed' : 'Mark as Watched'}
                </button>
              </div>
            </div>

            {/* Video Chapters / Timestamps */}
            {currentLesson.timestamps.length > 0 && (
              <div className="pt-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ListOrdered className="w-3.5 h-3.5 text-indigo-600" />
                  Lesson Chapters &amp; Timestamps
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentLesson.timestamps.map((ts, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                    >
                      <span className="text-slate-700 font-medium truncate pr-2">
                        {idx + 1}. {ts.title}
                      </span>
                      <span className="font-mono text-indigo-600 font-semibold shrink-0 bg-indigo-50 px-1.5 py-0.5 rounded">
                        {ts.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Synchronized Lecture Notes & Code Snippets */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Lecture Takeaways &amp; Key Architectural Notes
            </h2>

            <div className="space-y-2">
              {currentLesson.keyNotes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <span>{note}</span>
                </div>
              ))}
            </div>

            {/* Code Snippet from this video */}
            {currentLesson.codeSnippets.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">
                    Featured Code Example
                  </span>
                  <button
                    onClick={() => handleCopy(currentLesson.codeSnippets[0].code)}
                    className="flex items-center gap-1 text-[11px] text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                  >
                    {copiedSnippet ? (
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

                <pre className="p-4 text-xs font-mono bg-slate-900 text-slate-100 rounded-lg overflow-x-auto leading-relaxed">
                  <code>{currentLesson.codeSnippets[0].code}</code>
                </pre>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  {currentLesson.codeSnippets[0].explanation}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Subject Playlist & Next Up (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {selectedSubject.toUpperCase()} Playlist ({subjectLessons.length})
              </h3>
              <span className="text-[11px] text-slate-500">Curated HD Lectures</span>
            </div>

            <div className="space-y-2">
              {subjectLessons.map((lesson, idx) => {
                const isActive = lesson.id === activeLessonId;
                const isLessonDone = user?.completedVideos.includes(lesson.videoId);

                return (
                  <div
                    key={lesson.id}
                    onClick={() => setActiveLessonId(lesson.id)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                      isActive
                        ? 'bg-indigo-50/80 border-indigo-300 shadow-xs'
                        : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-[10px] font-semibold text-slate-400">
                        Lesson {idx + 1}
                      </span>
                      {isLessonDone && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                          ✓ Watched
                        </span>
                      )}
                    </div>

                    <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${
                      isActive ? 'text-indigo-900' : 'text-slate-800'
                    }`}>
                      {lesson.title}
                    </h4>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{lesson.level}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Practice CTA */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl p-5 shadow-xs">
            <h4 className="text-sm font-bold mb-1">Ready to code?</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Apply what you learned in this lecture by solving live coding challenges in the Sandbox Arena.
            </p>
            {onSelectCodingArena && (
              <button
                onClick={onSelectCodingArena}
                className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch Coding Sandbox</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
