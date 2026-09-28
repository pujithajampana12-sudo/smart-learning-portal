/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar, NavTab } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { DashboardView } from './components/DashboardView';
import { CurriculumView } from './components/CurriculumView';
import { VideoHubView } from './components/VideoHubView';
import { CodingArenaView } from './components/CodingArenaView';
import { NotesCheatsheetsView } from './components/NotesCheatsheetsView';
import { InterviewBankView } from './components/InterviewBankView';
import { AptitudeHrView } from './components/AptitudeHrView';
import { SubjectId } from './types';
import { BookOpen, GraduationCap, Github } from 'lucide-react';

const MainContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('python');
  const [activeVideoLessonId, setActiveVideoLessonId] = useState<string>('py-01');
  const [activeProblemId, setActiveProblemId] = useState<string>('prob-01');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  const handleSelectSubjectFromDashboard = (subjectId: SubjectId) => {
    setSelectedSubject(subjectId);
    setCurrentTab('curriculum');
  };

  const handleOpenVideoLesson = (lessonId: string) => {
    setActiveVideoLessonId(lessonId);
    setCurrentTab('videos');
  };

  const handleOpenCodingProblem = (problemId: string) => {
    setActiveProblemId(problemId);
    setCurrentTab('coding');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Contract (3 zones) */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAuth={() => setAuthModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentTab === 'dashboard' && (
          <DashboardView
            onNavigateTab={setCurrentTab}
            onSelectSubject={handleSelectSubjectFromDashboard}
            onOpenVideo={handleOpenVideoLesson}
            onOpenCodingProblem={handleOpenCodingProblem}
          />
        )}

        {currentTab === 'curriculum' && (
          <CurriculumView
            selectedSubject={selectedSubject}
            onSelectSubject={setSelectedSubject}
            onOpenVideoLesson={handleOpenVideoLesson}
            searchFilter={searchQuery}
          />
        )}

        {currentTab === 'videos' && (
          <VideoHubView
            initialLessonId={activeVideoLessonId}
            onSelectCodingArena={() => setCurrentTab('coding')}
          />
        )}

        {currentTab === 'coding' && (
          <CodingArenaView initialProblemId={activeProblemId} />
        )}

        {currentTab === 'notes' && <NotesCheatsheetsView />}

        {currentTab === 'interview' && <InterviewBankView />}

        {currentTab === 'aptitude-hr' && <AptitudeHrView />}
      </main>

      {/* Auth Modal for Login & Register */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Quiet, Clean Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
              SL
            </div>
            <span className="font-semibold text-slate-700">Smart Learning Portal</span>
            <span aria-hidden="true">·</span>
            <span>Technical Curriculum &amp; Placement Readiness</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <span>Python</span>
            <span aria-hidden="true">·</span>
            <span>Java</span>
            <span aria-hidden="true">·</span>
            <span>C</span>
            <span aria-hidden="true">·</span>
            <span>DBMS</span>
            <span aria-hidden="true">·</span>
            <span>HTML</span>
            <span aria-hidden="true">·</span>
            <span>Aptitude</span>
            <span aria-hidden="true">·</span>
            <span>HR Prep</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
