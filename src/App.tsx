import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LichBaoGiangView } from './components/LichBaoGiangView';
import { KHBDView } from './components/KHBDView';
import { TimetableView } from './components/TimetableView';
import { IntegrationMatrixView } from './components/IntegrationMatrixView';
import { SchoolProfileModal } from './components/SchoolProfileModal';
import { AIPlanGeneratorModal } from './components/AIPlanGeneratorModal';
import { SchoolProfile, TKBEntry, KHBDLesson } from './types';
import {
  DEFAULT_SCHOOL_PROFILE,
  DEFAULT_LBG_ENTRIES,
  DEFAULT_KHBD_LESSONS,
} from './data/defaultData';
import {
  calculateWeekDates,
  generateLbgEntriesForProfile,
  generateKhbdLessonsFromLbg,
  isSpecialistTeacher,
  getTeacherPersonalLbgEntries,
} from './utils/scheduleGenerator';
import {
  exportCombinedDocx,
  exportTkbDocx,
  exportLbgDocx,
  exportKhbdDocx,
} from './utils/docxExport';
import { DownloadBar } from './components/DownloadBar';
import { QuizDownloadBar } from './components/QuizDownloadBar';
import { QuizWorksheetsView } from './components/QuizWorksheetsView';
import { getWeeklyQuizWorksheets } from './data/quizData';
import { exportAllQuizzesDocx } from './utils/docxExport';

export function App() {
  const [profile, setProfile] = useState<SchoolProfile>(DEFAULT_SCHOOL_PROFILE);
  const [activeTab, setActiveTab] = useState<'lbg' | 'khbd' | 'tkb' | 'integration' | 'quiz'>('lbg');
  const [fontSizePt, setFontSizePt] = useState<12 | 13 | 14>(13);
  const [lbgEntries, setLbgEntries] = useState<TKBEntry[]>(() =>
    generateLbgEntriesForProfile(DEFAULT_SCHOOL_PROFILE)
  );
  const [lessons, setLessons] = useState<KHBDLesson[]>(() => {
    const initialLbg = generateLbgEntriesForProfile(DEFAULT_SCHOOL_PROFILE);
    return generateKhbdLessonsFromLbg(DEFAULT_SCHOOL_PROFILE, initialLbg);
  });

  // Modals state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiPrefill, setAiPrefill] = useState<Partial<KHBDLesson> | undefined>(undefined);
  const [exportingType, setExportingType] = useState<'tkb' | 'lbg' | 'khbd' | 'quiz' | 'all' | null>(null);

  /**
   * Đồng bộ toàn diện dữ liệu LBG và KHBD theo hồ sơ giáo viên & tuần học
   */
  const syncScheduleAndLessons = (targetProfile: SchoolProfile) => {
    const newLbg = generateLbgEntriesForProfile(targetProfile);
    const newLessons = generateKhbdLessonsFromLbg(targetProfile, newLbg);
    setLbgEntries(newLbg);
    setLessons(newLessons);
  };

  /**
   * Xử lý khi thay đổi tuần học: Tự động tính ngày Thứ 2 -> Thứ 6 và đồng bộ LBG + KHBD
   */
  const handleWeekChange = (newWeek: number) => {
    const dates = calculateWeekDates(newWeek, '07/09/2026');
    const updatedProfile: SchoolProfile = {
      ...profile,
      weekNumber: newWeek,
      startDate: dates.startDate,
      endDate: dates.endDate,
    };
    setProfile(updatedProfile);
    syncScheduleAndLessons(updatedProfile);
  };

  /**
   * Xử lý khi cập nhật Profile từ Modal hoặc chọn Giáo viên/Lớp
   */
  const handleProfileUpdate = (updated: SchoolProfile) => {
    const dates = calculateWeekDates(updated.weekNumber || 1, updated.startDate || '07/09/2026');
    const fullProfile: SchoolProfile = {
      ...updated,
      startDate: dates.startDate,
      endDate: dates.endDate,
    };
    setProfile(fullProfile);
    syncScheduleAndLessons(fullProfile);
  };

  // Handlers for LBG
  const handleUpdateLbgEntry = (updated: TKBEntry) => {
    setLbgEntries((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  // Handlers for KHBD
  const handleUpdateLesson = (updated: KHBDLesson) => {
    setLessons((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const handleAddLesson = (newLesson: KHBDLesson) => {
    setLessons((prev) => [newLesson, ...prev]);
  };

  const handleDeleteLesson = (id: string) => {
    setLessons((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenAiGenerator = (prefill?: Partial<KHBDLesson>) => {
    setAiPrefill(prefill);
    setIsAiModalOpen(true);
  };

  // Switch to KHBD and filter/scroll
  const handleViewLessonKHBD = (ppct: number, subject: string) => {
    setActiveTab('khbd');
  };

  // 1. Tải RIÊNG Thời Khóa Biểu (TKB)
  const handleExportTkb = async () => {
    try {
      setExportingType('tkb');
      await exportTkbDocx(profile, lbgEntries, { fontSizePt });
    } catch (err) {
      console.error('Lỗi khi tải TKB:', err);
      alert('Có lỗi xảy ra khi tạo file Thời khóa biểu Word. Vui lòng thử lại!');
    } finally {
      setExportingType(null);
    }
  };

  // 2. Tải RIÊNG Lịch Báo Giảng (LBG) CÁ NHÂN GIÁO VIÊN
  const handleExportLbg = async () => {
    try {
      setExportingType('lbg');
      const personalLbg = getTeacherPersonalLbgEntries(profile, lbgEntries);
      await exportLbgDocx(profile, personalLbg, fontSizePt);
    } catch (err) {
      console.error('Lỗi khi tải LBG:', err);
      alert('Có lỗi xảy ra khi tạo file Lịch báo giảng Word. Vui lòng thử lại!');
    } finally {
      setExportingType(null);
    }
  };

  // 3. Tải RIÊNG Kế Hoạch Bài Dạy (KHBD) CÁ NHÂN GIÁO VIÊN
  const handleExportKhbd = async () => {
    try {
      setExportingType('khbd');
      await exportKhbdDocx(profile, lessons, fontSizePt);
    } catch (err) {
      console.error('Lỗi khi tải KHBD:', err);
      alert('Có lỗi xảy ra khi tạo file Kế hoạch bài dạy Word. Vui lòng thử lại!');
    } finally {
      setExportingType(null);
    }
  };

  // 4. Tải CẢ BỘ Tuần (Trang 1: LBG Cá Nhân + Toàn Bộ KHBD)
  const handleExportFullWeekDocx = async () => {
    try {
      setExportingType('all');
      const personalLbg = getTeacherPersonalLbgEntries(profile, lbgEntries);
      await exportCombinedDocx(profile, personalLbg, lessons, {
        fontSizePt,
        includeLBG: true,
        includeKHBD: true,
        includeTKB: false,
        showSignatures: false, // Bỏ phần ký duyệt cuối LBG theo yêu cầu
      });
    } catch (err) {
      console.error('Lỗi khi tạo tài liệu Word:', err);
      alert('Có lỗi xảy ra khi tạo file Word. Vui lòng kiểm tra lại!');
    } finally {
      setExportingType(null);
    }
  };

  // 5. Tải Trọn Bộ Phiếu Bài Tập Trắc Nghiệm Cuối Tuần (Loigiaihay.com)
  const handleExportQuiz = async () => {
    try {
      setExportingType('quiz');
      const worksheets = getWeeklyQuizWorksheets(profile.grade, profile.weekNumber || 1, lbgEntries, lessons);
      await exportAllQuizzesDocx(profile, worksheets, fontSizePt);
    } catch (err) {
      console.error('Lỗi khi tạo file Phiếu trắc nghiệm Word:', err);
      alert('Có lỗi xảy ra khi tạo file Phiếu bài tập trắc nghiệm Word. Vui lòng thử lại!');
    } finally {
      setExportingType(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Main Navigation & Quick Action Header */}
      <Header
        profile={profile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenAiModal={() => handleOpenAiGenerator()}
        fontSizePt={fontSizePt}
        setFontSizePt={setFontSizePt}
        onExportTkb={handleExportTkb}
        onExportLbg={handleExportLbg}
        onExportKhbd={handleExportKhbd}
        onExportQuiz={handleExportQuiz}
        onExportDocx={handleExportFullWeekDocx}
        onWeekChange={handleWeekChange}
        exportingType={exportingType}
        isExporting={exportingType !== null}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Thanh tải dữ liệu TKB, LBG, KHBD riêng biệt */}
        <DownloadBar
          profile={profile}
          lbgEntries={lbgEntries}
          lessons={lessons}
          fontSizePt={fontSizePt}
          setFontSizePt={setFontSizePt}
          onExportTkb={handleExportTkb}
          onExportLbg={handleExportLbg}
          onExportKhbd={handleExportKhbd}
          onExportQuiz={handleExportQuiz}
          onExportAll={handleExportFullWeekDocx}
          exportingType={exportingType}
        />

        {/* Thanh tải các phiếu bài tập trắc nghiệm tương ứng theo Lịch báo giảng KHBD của từng tuần theo khối lớp */}
        <QuizDownloadBar
          profile={profile}
          lbgEntries={lbgEntries}
          lessons={lessons}
          fontSizePt={fontSizePt}
        />

        {activeTab === 'lbg' && (
          <LichBaoGiangView
            profile={profile}
            lbgEntries={lbgEntries}
            lessons={lessons}
            onUpdateEntry={handleUpdateLbgEntry}
            onViewLessonKHBD={handleViewLessonKHBD}
            fontSizePt={fontSizePt}
          />
        )}

        {activeTab === 'khbd' && (
          <KHBDView
            profile={profile}
            lessons={lessons}
            lbgEntries={lbgEntries}
            onUpdateLesson={handleUpdateLesson}
            onAddLesson={handleAddLesson}
            onDeleteLesson={handleDeleteLesson}
            onOpenAiGenerator={handleOpenAiGenerator}
            fontSizePt={fontSizePt}
          />
        )}

        {activeTab === 'tkb' && (
          <TimetableView
            profile={profile}
            onSelectClass={(cls) => {
              const gradeNum = parseInt(cls.charAt(0), 10) || profile.grade;
              handleProfileUpdate({ ...profile, className: cls, grade: gradeNum, role: 'GVCN' });
            }}
            onSelectTeacher={(name) => {
              const spec = isSpecialistTeacher(name);
              handleProfileUpdate({
                ...profile,
                teacherName: name,
                role: spec.isSpecialist ? 'GVBM' : 'GVCN',
                specialistSubject: spec.isSpecialist ? spec.subject : undefined,
              });
            }}
          />
        )}

        {activeTab === 'integration' && (
          <IntegrationMatrixView profile={profile} />
        )}

        {activeTab === 'quiz' && (
          <QuizWorksheetsView
            profile={profile}
            lbgEntries={lbgEntries}
            lessons={lessons}
            fontSizePt={fontSizePt}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white text-slate-500 py-6 border-t border-slate-200 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <p className="font-semibold text-slate-800">
              {profile.schoolName} &bull; {profile.subSchoolName}
            </p>
            <p className="text-[11px] text-slate-500">
              Hệ thống quản lý Thời khóa biểu, Lịch báo giảng & Kế hoạch bài dạy chuẩn Công văn 2345/BGDĐT.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Khung Năng Lực Số (CV 3456)</span>
            <span>&bull;</span>
            <span>Khung AI Tiểu Học (TT 02/2025)</span>
            <span>&bull;</span>
            <span>GDQPAN (TT 08/2024)</span>
          </div>
        </div>
      </footer>

      {/* Profile & Settings Modal */}
      <SchoolProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSave={handleProfileUpdate}
      />

      {/* AI Lesson Plan Generator Modal */}
      <AIPlanGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        profile={profile}
        onLessonGenerated={(lesson) => {
          handleAddLesson(lesson);
          setActiveTab('khbd');
        }}
        initialData={aiPrefill}
      />
    </div>
  );
}

export default App;
