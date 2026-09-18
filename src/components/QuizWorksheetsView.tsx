import React, { useState } from 'react';
import {
  HelpCircle,
  Download,
  FileDown,
  ExternalLink,
  CheckCircle2,
  BookOpen,
  Calculator,
  Compass,
  HeartHandshake,
  GraduationCap,
  Globe,
  Sparkles,
  RotateCcw,
  Eye,
  Filter,
  Printer,
  Loader2,
} from 'lucide-react';
import { SchoolProfile, TKBEntry, KHBDLesson, WeeklyQuizWorksheet } from '../types';
import { getWeeklyQuizWorksheets, getRequiredQuizSubjects } from '../data/quizData';
import { exportQuizWorksheetDocx, exportAllQuizzesDocx } from '../utils/docxExport';
import { QuizPreviewModal } from './QuizPreviewModal';

interface QuizWorksheetsViewProps {
  profile: SchoolProfile;
  lbgEntries: TKBEntry[];
  lessons: KHBDLesson[];
  fontSizePt: 12 | 13 | 14;
}

export const QuizWorksheetsView: React.FC<QuizWorksheetsViewProps> = ({
  profile,
  lbgEntries,
  lessons,
  fontSizePt,
}) => {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [showAnswersMap, setShowAnswersMap] = useState<Record<string, boolean>>({});
  const [userAnswersMap, setUserAnswersMap] = useState<Record<string, Record<number, 'A' | 'B' | 'C' | 'D'>>>({});
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [isDownloadingAll, setIsDownloadingAll] = useState<boolean>(false);
  const [modalWorksheet, setModalWorksheet] = useState<WeeklyQuizWorksheet | null>(null);

  const worksheets = getWeeklyQuizWorksheets(
    profile.grade,
    profile.weekNumber || 1,
    lbgEntries,
    lessons
  );

  const requiredSubjects = getRequiredQuizSubjects(profile.grade);

  const filteredWorksheets =
    selectedSubjectFilter === 'all'
      ? worksheets
      : worksheets.filter((ws) => ws.subject === selectedSubjectFilter);

  const toggleShowAnswers = (wsId: string) => {
    setShowAnswersMap((prev) => ({ ...prev, [wsId]: !prev[wsId] }));
  };

  const handleSelectOption = (wsId: string, qNum: number, opt: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswersMap((prev) => ({
      ...prev,
      [wsId]: {
        ...(prev[wsId] || {}),
        [qNum]: opt,
      },
    }));
  };

  const handleResetQuiz = (wsId: string) => {
    setUserAnswersMap((prev) => {
      const copy = { ...prev };
      delete copy[wsId];
      return copy;
    });
    setShowAnswersMap((prev) => ({ ...prev, [wsId]: false }));
  };

  const handleExportSingle = async (ws: WeeklyQuizWorksheet) => {
    try {
      setDownloadingId(ws.id);
      await exportQuizWorksheetDocx(profile, ws, fontSizePt);
    } catch (err) {
      console.error('Lỗi khi tải phiếu:', err);
      alert(`Có lỗi xảy ra khi tải phiếu môn ${ws.subject}. Vui lòng thử lại!`);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleExportAll = async () => {
    try {
      setIsDownloadingAll(true);
      await exportAllQuizzesDocx(profile, worksheets, fontSizePt);
    } catch (err) {
      console.error('Lỗi khi tải trọn bộ phiếu:', err);
      alert('Có lỗi xảy ra khi tạo trọn bộ file Word. Vui lòng thử lại!');
    } finally {
      setIsDownloadingAll(false);
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Top Banner & Instructions */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 transition">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Kho Phiếu Bài Tập Trắc Nghiệm Cuối Tuần Chuẩn CV 2345
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Tuần {profile.weekNumber} &bull; Lớp {profile.className}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  Khối {profile.grade}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 flex-wrap">
                <span>Nội dung trắc nghiệm bám sát Lịch báo giảng & KHBD tuần này</span>
                <span>&bull;</span>
                <span>Tham khảo ngân hàng đề & giải chi tiết từ:</span>
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

          {/* Master Export Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={`https://loigiaihay.com/lop-${profile.grade}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition"
              title="Mở thư viện bài tập lớp trên Loigiaihay.com"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Mở Kho Loigiaihay.com</span>
            </a>

            <button
              type="button"
              onClick={handleExportAll}
              disabled={isDownloadingAll}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 transition shadow-2xs cursor-pointer disabled:opacity-50"
            >
              {isDownloadingAll ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <FileDown className="w-3.5 h-3.5" />
              )}
              <span>Tải Trọn Bộ Tất Cả Môn (Word .docx)</span>
            </button>
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 mt-4 border-t border-slate-100 scrollbar-none">
          <span className="text-xs font-semibold text-slate-500 mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Bộ môn:</span>
          </span>
          <button
            type="button"
            onClick={() => setSelectedSubjectFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
              selectedSubjectFilter === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Tất cả các môn ({worksheets.length})
          </button>

          {requiredSubjects.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setSelectedSubjectFilter(sub)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
                selectedSubjectFilter === sub
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {getSubjectIcon(sub)}
              <span>{sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Worksheets List */}
      <div className="space-y-6">
        {filteredWorksheets.map((ws) => {
          const isShowAnswers = Boolean(showAnswersMap[ws.id]);
          const userAnswers = userAnswersMap[ws.id] || {};
          const isDownloadingThis = downloadingId === ws.id;

          const correctCount = ws.questions.filter(
            (q) => userAnswers[q.number] === q.correctAnswer
          ).length;

          return (
            <div
              key={ws.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition"
            >
              {/* Card Header */}
              <div className="px-5 py-4 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                    {getSubjectIcon(ws.subject)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {ws.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {ws.questions.length} câu trắc nghiệm
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Trọng tâm: <span className="text-slate-700 font-medium">{ws.curriculumTopic}</span>
                    </p>
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Link loigiaihay */}
                  <a
                    href={ws.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition"
                    title="Xem chi tiết lời giải tại loigiaihay.com"
                  >
                    <span>loigiaihay.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {/* Toggle answers */}
                  <button
                    type="button"
                    onClick={() => toggleShowAnswers(ws.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition border cursor-pointer ${
                      isShowAnswers
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isShowAnswers ? 'Ẩn Đáp Án' : 'Hiện Đáp Án & Lời Giải'}</span>
                  </button>

                  {/* Reset */}
                  {Object.keys(userAnswers).length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleResetQuiz(ws.id)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                      title="Làm lại đề này"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Download Word */}
                  <button
                    type="button"
                    onClick={() => handleExportSingle(ws)}
                    disabled={isDownloadingThis}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition shadow-2xs cursor-pointer disabled:opacity-50"
                    title={`Tải phiếu bài tập môn ${ws.subject} sang Word (.docx)`}
                  >
                    {isDownloadingThis ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <FileDown className="w-3.5 h-3.5" />
                    )}
                    <span>Tải Word (.docx)</span>
                  </button>
                </div>
              </div>

              {/* Status bar if user answered */}
              {Object.keys(userAnswers).length > 0 && (
                <div className="px-5 py-2 bg-slate-100/70 border-b border-slate-200 text-xs flex items-center justify-between text-slate-600">
                  <span>
                    Tiến độ làm bài: <strong>{Object.keys(userAnswers).length}/{ws.questions.length}</strong> câu
                  </span>
                  <span>
                    Kết quả tạm tính:{' '}
                    <strong className="text-emerald-700">
                      {correctCount}/{ws.questions.length} đúng ({Math.round((correctCount / ws.questions.length) * 10)} điểm)
                    </strong>
                  </span>
                </div>
              )}

              {/* Questions list */}
              <div className="p-5 space-y-4">
                {ws.questions.map((q) => {
                  const selected = userAnswers[q.number];
                  const isCorrect = selected === q.correctAnswer;
                  const hasAnswered = selected !== undefined;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border transition ${
                        isShowAnswers
                          ? isCorrect
                            ? 'border-emerald-300 bg-emerald-50/20'
                            : hasAnswered
                            ? 'border-rose-300 bg-rose-50/20'
                            : 'border-slate-200 bg-white'
                          : selected
                          ? 'border-blue-300 bg-blue-50/20'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-md bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {q.number}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">
                            {q.question}
                          </p>

                          {/* Options grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                            {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                              const isOptionCorrect = q.correctAnswer === opt;
                              const isThisSelected = selected === opt;

                              let optClass =
                                'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                              if (isShowAnswers) {
                                if (isOptionCorrect) {
                                  optClass =
                                    'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500';
                                } else if (isThisSelected) {
                                  optClass =
                                    'border-rose-300 bg-rose-50 text-rose-900 line-through opacity-80';
                                }
                              } else if (isThisSelected) {
                                optClass =
                                  'border-blue-500 bg-blue-50 text-blue-950 font-semibold ring-1 ring-blue-500';
                              }

                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleSelectOption(ws.id, q.number, opt)}
                                  className={`flex items-start text-left p-2.5 rounded-lg border text-xs transition cursor-pointer ${optClass}`}
                                >
                                  <span className="font-bold mr-2 text-slate-500 shrink-0">
                                    {opt}.
                                  </span>
                                  <span className="flex-1">{q.options[opt]}</span>
                                  {isShowAnswers && isOptionCorrect && (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-1.5 shrink-0 self-center" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Explanation if enabled */}
                          {isShowAnswers && (
                            <div className="mt-3 p-3 bg-emerald-50/80 rounded-lg border border-emerald-200 text-xs text-emerald-950 space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Hướng dẫn giải chi tiết (Loigiaihay.com):</span>
                              </div>
                              <p className="italic text-emerald-900 pl-5">
                                {q.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Quick Answer Matrix */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Đáp án nhanh:</span>
                    <div className="flex items-center gap-1">
                      {ws.questions.map((q) => (
                        <span
                          key={q.number}
                          className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-bold text-slate-800"
                        >
                          C{q.number}: {isShowAnswers ? q.correctAnswer : '?'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setModalWorksheet(ws)}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Mở màn hình làm bài độc lập</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      <QuizPreviewModal
        isOpen={modalWorksheet !== null}
        onClose={() => setModalWorksheet(null)}
        worksheet={modalWorksheet}
        profile={profile}
        fontSizePt={fontSizePt}
      />
    </div>
  );
};
