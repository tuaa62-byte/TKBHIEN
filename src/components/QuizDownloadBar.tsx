import React, { useState } from 'react';
import {
  FileDown,
  Download,
  ExternalLink,
  BookOpen,
  Calculator,
  Compass,
  HeartHandshake,
  GraduationCap,
  Sparkles,
  Loader2,
  CheckCircle2,
  Globe,
  HelpCircle,
  Eye,
} from 'lucide-react';
import { SchoolProfile, TKBEntry, KHBDLesson, WeeklyQuizWorksheet } from '../types';
import { getWeeklyQuizWorksheets, getRequiredQuizSubjects } from '../data/quizData';
import { exportQuizWorksheetDocx, exportAllQuizzesDocx } from '../utils/docxExport';
import { QuizPreviewModal } from './QuizPreviewModal';

interface QuizDownloadBarProps {
  profile: SchoolProfile;
  lbgEntries: TKBEntry[];
  lessons: KHBDLesson[];
  fontSizePt: 12 | 13 | 14;
}

export const QuizDownloadBar: React.FC<QuizDownloadBarProps> = ({
  profile,
  lbgEntries,
  lessons,
  fontSizePt,
}) => {
  const [downloadingSubject, setDownloadingSubject] = useState<string | null>(null);
  const [isDownloadingAll, setIsDownloadingAll] = useState<boolean>(false);
  const [selectedWorksheet, setSelectedWorksheet] = useState<WeeklyQuizWorksheet | null>(null);

  const worksheets = getWeeklyQuizWorksheets(
    profile.grade,
    profile.weekNumber || 1,
    lbgEntries,
    lessons
  );

  const requiredSubjects = getRequiredQuizSubjects(profile.grade);

  // Icon mapping cho các môn học
  const getSubjectIcon = (subjectName: string) => {
    const s = subjectName.toLowerCase();
    if (s.includes('toán')) return <Calculator className="w-4 h-4 text-blue-600" />;
    if (s.includes('tiếng việt')) return <BookOpen className="w-4 h-4 text-emerald-600" />;
    if (s.includes('khoa học')) return <Sparkles className="w-4 h-4 text-amber-600" />;
    if (s.includes('lịch sử') || s.includes('địa lí')) return <Compass className="w-4 h-4 text-purple-600" />;
    if (s.includes('tự nhiên') || s.includes('tnxh')) return <Globe className="w-4 h-4 text-teal-600" />;
    if (s.includes('đạo đức')) return <HeartHandshake className="w-4 h-4 text-rose-600" />;
    return <GraduationCap className="w-4 h-4 text-indigo-600" />;
  };

  // Badge màu nền tương ứng
  const getSubjectColorStyles = (subjectName: string) => {
    const s = subjectName.toLowerCase();
    if (s.includes('toán')) {
      return {
        cardBg: 'bg-blue-50/50 hover:bg-blue-50/90 border-blue-200/90',
        badgeBg: 'bg-blue-100 text-blue-800',
        btnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
      };
    }
    if (s.includes('tiếng việt')) {
      return {
        cardBg: 'bg-emerald-50/50 hover:bg-emerald-50/90 border-emerald-200/90',
        badgeBg: 'bg-emerald-100 text-emerald-800',
        btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      };
    }
    if (s.includes('khoa học')) {
      return {
        cardBg: 'bg-amber-50/50 hover:bg-amber-50/90 border-amber-200/90',
        badgeBg: 'bg-amber-100 text-amber-800',
        btnBg: 'bg-amber-600 hover:bg-amber-700 text-white',
      };
    }
    if (s.includes('lịch sử') || s.includes('địa lí')) {
      return {
        cardBg: 'bg-purple-50/50 hover:bg-purple-50/90 border-purple-200/90',
        badgeBg: 'bg-purple-100 text-purple-800',
        btnBg: 'bg-purple-600 hover:bg-purple-700 text-white',
      };
    }
    if (s.includes('tự nhiên') || s.includes('tnxh')) {
      return {
        cardBg: 'bg-teal-50/50 hover:bg-teal-50/90 border-teal-200/90',
        badgeBg: 'bg-teal-100 text-teal-800',
        btnBg: 'bg-teal-600 hover:bg-teal-700 text-white',
      };
    }
    if (s.includes('đạo đức')) {
      return {
        cardBg: 'bg-rose-50/50 hover:bg-rose-50/90 border-rose-200/90',
        badgeBg: 'bg-rose-100 text-rose-800',
        btnBg: 'bg-rose-600 hover:bg-rose-700 text-white',
      };
    }
    return {
      cardBg: 'bg-indigo-50/50 hover:bg-indigo-50/90 border-indigo-200/90',
      badgeBg: 'bg-indigo-100 text-indigo-800',
      btnBg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    };
  };

  // Tải phiếu bài tập cho 1 môn
  const handleExportSingle = async (worksheet: WeeklyQuizWorksheet) => {
    try {
      setDownloadingSubject(worksheet.subject);
      await exportQuizWorksheetDocx(profile, worksheet, fontSizePt);
    } catch (err) {
      console.error('Lỗi khi tải phiếu:', err);
      alert(`Có lỗi xảy ra khi tạo phiếu bài tập môn ${worksheet.subject}. Vui lòng thử lại!`);
    } finally {
      setDownloadingSubject(null);
    }
  };

  // Tải trọn bộ tất cả các môn của tuần này
  const handleExportAll = async () => {
    try {
      setIsDownloadingAll(true);
      await exportAllQuizzesDocx(profile, worksheets, fontSizePt);
    } catch (err) {
      console.error('Lỗi khi tải trọn bộ phiếu:', err);
      alert('Có lỗi xảy ra khi tạo trọn bộ phiếu bài tập. Vui lòng thử lại!');
    } finally {
      setIsDownloadingAll(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 sm:p-5 mb-6 transition">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-3 border-b border-slate-100">
        <div className="flex items-start sm:items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Thanh Tải Phiếu Bài Tập Trắc Nghiệm Cuối Tuần (Theo LBG & KHBD)
              </h3>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Tuần {profile.weekNumber} &bull; Lớp {profile.className}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                Khối {profile.grade} ({profile.grade <= 3 ? 'Gồm TNXH' : 'Gồm LS&ĐL + Khoa Học'})
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
              <span>Đồng bộ theo Lịch báo giảng & KHBD tuần {profile.weekNumber}</span>
              <span>&bull;</span>
              <span>Nguồn bài tập & hướng dẫn giải chi tiết:</span>
              <a
                href="https://loigiaihay.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-0.5"
              >
                <span>loigiaihay.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>

        {/* Action Controls Top-Right */}
        <div className="flex items-center gap-2 self-start lg:self-center flex-wrap">
          {/* External link to loigiaihay.com */}
          <a
            href={`https://loigiaihay.com/lop-${profile.grade}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition"
            title="Mở thư viện bài tập lớp trên Loigiaihay.com"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mở Kho</span>
            <span>Loigiaihay.com</span>
          </a>

          {/* Download ALL subjects button */}
          <button
            type="button"
            onClick={handleExportAll}
            disabled={isDownloadingAll || downloadingSubject !== null}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 transition shadow-2xs disabled:opacity-50 cursor-pointer"
            title={`Tải trọn bộ tất cả các môn Tuần ${profile.weekNumber} (${worksheets.length} môn) vào 1 file Word`}
          >
            {isDownloadingAll ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>Tải Trọn Bộ Tất Cả Môn (.docx)</span>
          </button>
        </div>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
        {worksheets.map((ws) => {
          const styles = getSubjectColorStyles(ws.subject);
          const isThisDownloading = downloadingSubject === ws.subject;

          return (
            <div
              key={ws.id}
              className={`p-3.5 rounded-xl border transition shadow-2xs flex flex-col justify-between ${styles.cardBg}`}
            >
              <div>
                {/* Subject badge & Source Link */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-white shadow-2xs border border-slate-200/80">
                      {getSubjectIcon(ws.subject)}
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      Môn {ws.subject}
                    </span>
                  </div>
                  <a
                    href={ws.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 hover:text-blue-900 bg-white/80 hover:bg-white px-2 py-0.5 rounded border border-blue-200 transition"
                    title="Xem chi tiết tại loigiaihay.com"
                  >
                    <span>loigiaihay.com</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                {/* Lesson alignment */}
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  <span className="font-semibold text-slate-700">Trọng tâm:</span> {ws.curriculumTopic}
                </p>
              </div>

              {/* Action Buttons: Preview & Download */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60 mt-auto">
                {/* Preview Button */}
                <button
                  type="button"
                  onClick={() => setSelectedWorksheet(ws)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition shadow-2xs cursor-pointer"
                  title="Xem trước đề bài và làm thử trực tuyến"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Xem & Làm thử</span>
                </button>

                {/* Download Word Button */}
                <button
                  type="button"
                  onClick={() => handleExportSingle(ws)}
                  disabled={isThisDownloading || isDownloadingAll}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition shadow-2xs cursor-pointer disabled:opacity-50 ${styles.btnBg}`}
                  title={`Tải phiếu bài tập môn ${ws.subject} sang file Word (.docx)`}
                >
                  {isThisDownloading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <FileDown className="w-3.5 h-3.5" />
                  )}
                  <span>Tải Word (.docx)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note under the grid */}
      <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-slate-700">Quy chuẩn môn học theo khối lớp:</span>
          <span>Khối 1, 2, 3: Toán, Tiếng Việt, TNXH, Đạo đức, HĐTN</span>
          <span>&bull;</span>
          <span>Khối 4, 5: Toán, Tiếng Việt, Khoa học, Lịch sử và Địa lí, Đạo đức, HĐTN</span>
        </div>
        <div className="text-slate-400 italic">
          Định dạng xuất Word chuẩn Times New Roman &bull; Cỡ chữ {fontSizePt}pt
        </div>
      </div>

      {/* Quiz Preview & Interactive Modal */}
      <QuizPreviewModal
        isOpen={selectedWorksheet !== null}
        onClose={() => setSelectedWorksheet(null)}
        worksheet={selectedWorksheet}
        profile={profile}
        fontSizePt={fontSizePt}
      />
    </div>
  );
};
