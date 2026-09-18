import React from 'react';
import {
  School,
  User,
  Calendar,
  FileText,
  Download,
  Settings,
  Sparkles,
  Layers,
  GraduationCap,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileDown,
  HelpCircle,
} from 'lucide-react';
import { SchoolProfile } from '../types';

interface HeaderProps {
  profile: SchoolProfile;
  activeTab: 'lbg' | 'khbd' | 'tkb' | 'integration' | 'quiz';
  setActiveTab: (tab: 'lbg' | 'khbd' | 'tkb' | 'integration' | 'quiz') => void;
  onOpenProfileModal: () => void;
  onOpenAiModal: () => void;
  fontSizePt: 12 | 13 | 14;
  setFontSizePt: (size: 12 | 13 | 14) => void;
  onExportTkb?: () => void;
  onExportLbg?: () => void;
  onExportKhbd?: () => void;
  onExportQuiz?: () => void;
  onExportDocx: () => void;
  onWeekChange?: (newWeek: number) => void;
  exportingType?: 'tkb' | 'lbg' | 'khbd' | 'quiz' | 'all' | null;
  isExporting?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  activeTab,
  setActiveTab,
  onOpenProfileModal,
  onOpenAiModal,
  fontSizePt,
  setFontSizePt,
  onExportTkb,
  onExportLbg,
  onExportKhbd,
  onExportQuiz,
  onExportDocx,
  onWeekChange,
  exportingType = null,
  isExporting = false,
}) => {
  return (
    <header className="bg-white text-slate-800 border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Bar: School & Teacher Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 border-b border-slate-100 gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">
                  {profile.schoolName}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {profile.subSchoolName}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {profile.departmentName} &bull; Năm học: <span className="text-slate-700 font-medium">{profile.schoolYear}</span>
              </p>
            </div>
          </div>

          {/* Active Teacher & Settings Quick Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center bg-slate-50 rounded-md px-3 py-1.5 border border-slate-200 text-xs">
              <User className="w-3.5 h-3.5 text-slate-600 mr-1.5" />
              <span className="text-slate-500">GV:</span>
              <span className="font-semibold text-slate-800 ml-1 mr-2">{profile.teacherName}</span>
              <span className="bg-emerald-50 text-emerald-700 text-[11px] px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
                {profile.role === 'GVBM' ? 'GV Chuyên' : `Lớp ${profile.className}`}
              </span>
            </div>

            {/* Quick Week Switcher with Next/Prev & Dropdown */}
            <div className="flex items-center bg-blue-50/70 rounded-md px-2 py-1 border border-blue-200 text-xs">
              <button
                type="button"
                onClick={() => onWeekChange && onWeekChange(Math.max(1, (profile.weekNumber || 1) - 1))}
                disabled={(profile.weekNumber || 1) <= 1}
                className="p-1 rounded hover:bg-blue-100 text-blue-700 disabled:opacity-30 transition"
                title="Tuần trước"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center px-1 font-semibold text-blue-900">
                <span>Tuần</span>
                <select
                  value={profile.weekNumber || 1}
                  onChange={(e) => onWeekChange && onWeekChange(parseInt(e.target.value, 10) || 1)}
                  className="bg-transparent font-bold text-blue-900 focus:outline-none ml-1 cursor-pointer"
                >
                  {Array.from({ length: 35 }, (_, i) => i + 1).map((w) => (
                    <option key={w} value={w} className="text-slate-800">
                      {w} ({w === 1 ? 'Khai giảng' : `0${w}`.slice(-2)})
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => onWeekChange && onWeekChange(Math.min(35, (profile.weekNumber || 1) + 1))}
                disabled={(profile.weekNumber || 1) >= 35}
                className="p-1 rounded hover:bg-blue-100 text-blue-700 disabled:opacity-30 transition"
                title="Tuần kế tiếp"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Change Profile Button */}
            <button
              onClick={onOpenProfileModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition shadow-xs"
              title="Đổi giáo viên, lớp, phân hiệu hoặc tuần học"
            >
              <Settings className="w-3.5 h-3.5 text-slate-500" />
              <span>Đổi GV / Lớp / Trường</span>
            </button>

            {/* AI Generator Shortcut */}
            <button
              onClick={onOpenAiModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Soạn KHBD AI</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Tabs & Word Export Options */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2.5 gap-3">
          {/* Main Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('lbg')}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                activeTab === 'lbg'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>1. Lịch Báo Giảng</span>
            </button>

            <button
              onClick={() => setActiveTab('khbd')}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                activeTab === 'khbd'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>2. Kế Hoạch Bài Dạy (CV 2345)</span>
            </button>

            <button
              onClick={() => setActiveTab('tkb')}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                activeTab === 'tkb'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>3. Thời Khóa Biểu (Trường / Lớp / GV)</span>
            </button>

            <button
              onClick={() => setActiveTab('integration')}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                activeTab === 'integration'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>4. Ma Trận Tích Hợp (NLS / AI / QCN...)</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                activeTab === 'quiz'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              <span>5. Phiếu Trắc Nghiệm (Loigiaihay)</span>
            </button>
          </nav>

          {/* Quick Separate Download Controls in Header */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto flex-wrap">
            {/* Font Size Selector */}
            <div className="flex items-center bg-slate-100 rounded-md p-0.5 border border-slate-200 text-xs mr-1">
              <span className="px-1.5 text-slate-500 text-[11px] font-medium hidden md:inline">Font:</span>
              {([12, 13, 14] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSizePt(size)}
                  className={`px-1.5 py-0.5 rounded text-xs font-medium transition ${
                    fontSizePt === size
                      ? 'bg-white text-slate-900 border border-slate-200 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title={`Cỡ chữ Word ${size}pt`}
                >
                  {size}pt
                </button>
              ))}
            </div>

            {/* 1. Tải TKB Riêng */}
            {onExportTkb && (
              <button
                type="button"
                onClick={onExportTkb}
                disabled={Boolean(exportingType) || isExporting}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-semibold rounded-md shadow-2xs transition disabled:opacity-50"
                title="Tải riêng Thời Khóa Biểu lớp sang file Word (.docx)"
              >
                {exportingType === 'tkb' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                )}
                <span>Tải TKB</span>
              </button>
            )}

            {/* 2. Tải LBG Riêng */}
            {onExportLbg && (
              <button
                type="button"
                onClick={onExportLbg}
                disabled={Boolean(exportingType) || isExporting}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold rounded-md shadow-2xs transition disabled:opacity-50"
                title="Tải riêng Lịch Báo Giảng Tuần này sang file Word (.docx)"
              >
                {exportingType === 'lbg' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                )}
                <span>Tải LBG</span>
              </button>
            )}

            {/* 3. Tải KHBD Riêng */}
            {onExportKhbd && (
              <button
                type="button"
                onClick={onExportKhbd}
                disabled={Boolean(exportingType) || isExporting}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold rounded-md shadow-2xs transition disabled:opacity-50"
                title="Tải riêng Kế Hoạch Bài Dạy (CV 2345) sang file Word (.docx)"
              >
                {exportingType === 'khbd' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                )}
                <span>Tải KHBD</span>
              </button>
            )}

            {/* 4. Tải Phiếu Bài Tập Trắc Nghiệm Riêng (Loigiaihay.com) */}
            {onExportQuiz && (
              <button
                type="button"
                onClick={onExportQuiz}
                disabled={Boolean(exportingType) || isExporting}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold rounded-md shadow-2xs transition disabled:opacity-50"
                title="Tải trọn bộ Phiếu bài tập trắc nghiệm cuối tuần (Loigiaihay.com) sang file Word (.docx)"
              >
                {exportingType === 'quiz' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                )}
                <span>Tải Phiếu TN</span>
              </button>
            )}

            {/* 5. Export Full Week Word Button */}
            <button
              onClick={onExportDocx}
              disabled={Boolean(exportingType) || isExporting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-semibold rounded-md shadow-2xs transition disabled:opacity-50"
              title="Tải gộp cả Lịch Báo Giảng + KHBD Cả Tuần sang file Word"
            >
              {exportingType === 'all' || isExporting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>Tải Cả Bộ</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
