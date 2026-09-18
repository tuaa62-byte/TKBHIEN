import React from 'react';
import {
  Download,
  Calendar,
  BookOpen,
  Clock,
  CheckCircle2,
  FileDown,
  Loader2,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { SchoolProfile, TKBEntry, KHBDLesson } from '../types';
import { getTeacherPersonalLbgEntries } from '../utils/scheduleGenerator';

interface DownloadBarProps {
  profile: SchoolProfile;
  lbgEntries: TKBEntry[];
  lessons: KHBDLesson[];
  fontSizePt: 12 | 13 | 14;
  setFontSizePt: (size: 12 | 13 | 14) => void;
  onExportTkb: () => void;
  onExportLbg: () => void;
  onExportKhbd: () => void;
  onExportQuiz?: () => void;
  onExportAll: () => void;
  exportingType: 'tkb' | 'lbg' | 'khbd' | 'quiz' | 'all' | null;
}

export const DownloadBar: React.FC<DownloadBarProps> = ({
  profile,
  lbgEntries,
  lessons,
  fontSizePt,
  setFontSizePt,
  onExportTkb,
  onExportLbg,
  onExportKhbd,
  onExportQuiz,
  onExportAll,
  exportingType,
}) => {
  const isExportingAny = exportingType !== null;
  const personalLbg = getTeacherPersonalLbgEntries(profile, lbgEntries);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 sm:p-5 mb-6 transition">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left info */}
        <div className="flex items-start sm:items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center shrink-0 shadow-2xs">
            <FileDown className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Thanh Tải Dữ Liệu Riêng Biệt (Word .docx)
              </h3>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Tuần {profile.weekNumber} ({profile.startDate} - {profile.endDate})
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                Lớp {profile.className} &bull; {profile.teacherName}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tải riêng từng văn bản theo mẫu chuẩn Bộ GD&ĐT &bull; Font Times New Roman &bull; Canh lề 2-2.5cm
            </p>
          </div>
        </div>

        {/* Right font size selector */}
        <div className="flex items-center gap-2 self-start lg:self-center">
          <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200 text-xs">
            <span className="px-2 text-slate-500 text-[11px] font-medium hidden sm:inline">Cỡ chữ Word:</span>
            {([12, 13, 14] as const).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setFontSizePt(size)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                  fontSizePt === size
                    ? 'bg-white text-slate-900 border border-slate-200/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title={`Cỡ chữ file Word: ${size}pt`}
              >
                {size}pt
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons: 4 Separate Downloads + 1 Combined */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4 pt-3.5 border-t border-slate-100">
        {/* 1. TẢI TKB RIÊNG */}
        <button
          type="button"
          onClick={onExportTkb}
          disabled={isExportingAny}
          className="group relative flex items-center justify-between p-3 rounded-xl border border-indigo-200/80 bg-indigo-50/40 hover:bg-indigo-50/90 text-indigo-900 transition shadow-2xs hover:shadow-xs disabled:opacity-50 text-left cursor-pointer"
          title={`Tải riêng Thời Khóa Biểu lớp ${profile.className} sang Word`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition">
              {exportingType === 'tkb' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Clock className="w-4 h-4" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                <span>Tải TKB Riêng</span>
                <span className="text-[10px] font-medium bg-indigo-100/90 text-indigo-700 px-1.5 py-0.2 rounded">
                  .docx
                </span>
              </div>
              <p className="text-[11px] text-indigo-700/80 mt-0.5 font-normal">
                Thời khóa biểu Lớp {profile.className}
              </p>
            </div>
          </div>
          <Download className="w-4 h-4 text-indigo-500 group-hover:text-indigo-800 transition shrink-0 ml-2" />
        </button>

        {/* 2. TẢI LBG RIÊNG */}
        <button
          type="button"
          onClick={onExportLbg}
          disabled={isExportingAny}
          className="group relative flex items-center justify-between p-3 rounded-xl border border-emerald-200/80 bg-emerald-50/40 hover:bg-emerald-50/90 text-emerald-900 transition shadow-2xs hover:shadow-xs disabled:opacity-50 text-left cursor-pointer"
          title={`Tải riêng Lịch Báo Giảng Tuần ${profile.weekNumber} sang Word (không kèm KHBD)`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition">
              {exportingType === 'lbg' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Calendar className="w-4 h-4" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <span>Tải LBG Riêng</span>
                <span className="text-[10px] font-medium bg-emerald-100/90 text-emerald-700 px-1.5 py-0.2 rounded">
                  .docx
                </span>
              </div>
              <p className="text-[11px] text-emerald-700/80 mt-0.5 font-normal">
                LBG cá nhân ({personalLbg.length} tiết dạy)
              </p>
            </div>
          </div>
          <Download className="w-4 h-4 text-emerald-500 group-hover:text-emerald-800 transition shrink-0 ml-2" />
        </button>

        {/* 3. TẢI KHBD RIÊNG */}
        <button
          type="button"
          onClick={onExportKhbd}
          disabled={isExportingAny}
          className="group relative flex items-center justify-between p-3 rounded-xl border border-blue-200/80 bg-blue-50/40 hover:bg-blue-50/90 text-blue-900 transition shadow-2xs hover:shadow-xs disabled:opacity-50 text-left cursor-pointer"
          title={`Tải riêng Kế Hoạch Bài Dạy Tuần ${profile.weekNumber} sang Word`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition">
              {exportingType === 'khbd' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <BookOpen className="w-4 h-4" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                <span>Tải KHBD Riêng</span>
                <span className="text-[10px] font-medium bg-blue-100/90 text-blue-700 px-1.5 py-0.2 rounded">
                  .docx
                </span>
              </div>
              <p className="text-[11px] text-blue-700/80 mt-0.5 font-normal">
                Giáo án CV 2345 ({lessons.length} bài dạy)
              </p>
            </div>
          </div>
          <Download className="w-4 h-4 text-blue-500 group-hover:text-blue-800 transition shrink-0 ml-2" />
        </button>

        {/* 4. TẢI PHIẾU TRẮC NGHIỆM RIÊNG (LOIGIAIHAY.COM) */}
        {onExportQuiz && (
          <button
            type="button"
            onClick={onExportQuiz}
            disabled={isExportingAny}
            className="group relative flex items-center justify-between p-3 rounded-xl border border-amber-200/80 bg-amber-50/40 hover:bg-amber-50/90 text-amber-900 transition shadow-2xs hover:shadow-xs disabled:opacity-50 text-left cursor-pointer"
            title={`Tải trọn bộ Phiếu bài tập trắc nghiệm cuối tuần ${profile.weekNumber} (Loigiaihay.com) cho khối ${profile.grade}`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition">
                {exportingType === 'quiz' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <HelpCircle className="w-4 h-4" />
                )}
              </div>
              <div>
                <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <span>Phiếu Trắc Nghiệm</span>
                  <span className="text-[10px] font-medium bg-amber-100/90 text-amber-700 px-1.5 py-0.2 rounded">
                    .docx
                  </span>
                </div>
                <p className="text-[11px] text-amber-700/80 mt-0.5 font-normal truncate max-w-[130px]">
                  Loigiaihay ({profile.grade <= 3 ? '5 môn' : '6 môn'})
                </p>
              </div>
            </div>
            <Download className="w-4 h-4 text-amber-500 group-hover:text-amber-800 transition shrink-0 ml-2" />
          </button>
        )}

        {/* 5. TẢI CẢ BỘ (LBG + KHBD) */}
        <button
          type="button"
          onClick={onExportAll}
          disabled={isExportingAny}
          className="group relative flex items-center justify-between p-3 rounded-xl border border-slate-300 bg-slate-900 hover:bg-slate-800 text-white transition shadow-2xs hover:shadow-xs disabled:opacity-50 text-left cursor-pointer"
          title={`Tải gộp cả Lịch Báo Giảng và Kế Hoạch Bài Dạy Tuần ${profile.weekNumber}`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/20 group-hover:scale-105 transition">
              {exportingType === 'all' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Tải Cả Bộ (Cả Tuần)</span>
                <span className="text-[10px] font-medium bg-white/20 text-slate-100 px-1.5 py-0.2 rounded">
                  Gộp
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5 font-normal">
                Trang 1: LBG &bull; Tiếp theo: KHBD
              </p>
            </div>
          </div>
          <FileDown className="w-4 h-4 text-slate-400 group-hover:text-white transition shrink-0 ml-2" />
        </button>
      </div>
    </div>
  );
};
