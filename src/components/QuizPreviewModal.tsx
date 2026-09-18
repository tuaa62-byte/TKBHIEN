import React, { useState } from 'react';
import {
  X,
  FileDown,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Printer,
  Sparkles,
} from 'lucide-react';
import { WeeklyQuizWorksheet, SchoolProfile } from '../types';
import { exportQuizWorksheetDocx } from '../utils/docxExport';

interface QuizPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  worksheet: WeeklyQuizWorksheet | null;
  profile: SchoolProfile;
  fontSizePt: 12 | 13 | 14;
}

export const QuizPreviewModal: React.FC<QuizPreviewModalProps> = ({
  isOpen,
  onClose,
  worksheet,
  profile,
  fontSizePt,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!isOpen || !worksheet) return null;

  const handleSelectOption = (qNum: number, opt: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => ({ ...prev, [qNum]: opt }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowAnswers(false);
  };

  const handleExportWord = async () => {
    try {
      setIsExporting(true);
      await exportQuizWorksheetDocx(profile, worksheet, fontSizePt);
    } catch (err) {
      console.error('Lỗi khi xuất file Word:', err);
      alert('Có lỗi xảy ra khi tạo file Word. Vui lòng thử lại!');
    } finally {
      setIsExporting(false);
    }
  };

  const correctCount = worksheet.questions.filter(
    (q) => userAnswers[q.number] === q.correctAnswer
  ).length;

  return (
    <div
      id="quiz-preview-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150"
    >
      <div
        id="quiz-preview-modal-container"
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-slate-900">
                  {worksheet.title}
                </h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  Lớp {profile.className} &bull; Tuần {worksheet.week}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {worksheet.subject}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Nội dung trọng tâm: <span className="text-slate-700 font-medium">{worksheet.curriculumTopic}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="px-5 py-2.5 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAnswers(!showAnswers)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition border ${
                showAnswers
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{showAnswers ? 'Ẩn Đáp Án & Lời Giải' : 'Hiện Đáp Án & Lời Giải Chi Tiết'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetQuiz}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition font-medium"
              title="Làm lại từ đầu"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Làm lại</span>
            </button>

            {Object.keys(userAnswers).length > 0 && (
              <span className="text-slate-600 text-xs px-2 py-1 bg-slate-100 rounded-md font-medium">
                Đã chọn: {Object.keys(userAnswers).length}/{worksheet.questions.length} câu &bull;{' '}
                <strong className="text-emerald-700">{correctCount} đúng</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Link directly to loigiaihay.com */}
            <a
              href={worksheet.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 font-semibold transition"
              title="Mở chuyên mục bài tập tương ứng tại loigiaihay.com"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Nguồn: Loigiaihay.com</span>
            </a>

            {/* Export Word Button */}
            <button
              type="button"
              onClick={handleExportWord}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white bg-slate-900 hover:bg-slate-800 font-semibold shadow-2xs transition disabled:opacity-50"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Đang tạo Word...' : 'Tải Phiếu Word (.docx)'}</span>
            </button>
          </div>
        </div>

        {/* Modal Body: Printable / Interactive Quiz Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-slate-800 bg-slate-50/50">
          {/* Header Preview Paper */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                {profile.departmentName} &bull; {profile.schoolName}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
                PHIẾU BÀI TẬP TRẮC NGHIỆM CUỐI TUẦN {worksheet.week}
              </h2>
              <p className="text-sm font-bold text-blue-700">
                MÔN: {worksheet.subject.toUpperCase()} &bull; LỚP {profile.className}
              </p>
              <p className="text-xs text-slate-500 italic">
                Thời gian thực hiện: Từ ngày {profile.startDate} đến ngày {profile.endDate} (Tuần {worksheet.week})
              </p>
            </div>

            {/* Student Info Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
              <div>
                <span className="font-semibold text-slate-500">Họ và tên học sinh:</span>
                <p className="font-medium text-slate-800 border-b border-dashed border-slate-300 pb-0.5 mt-0.5">
                  ....................................................................
                </p>
              </div>
              <div>
                <span className="font-semibold text-slate-500">Lớp & GVCN:</span>
                <p className="font-medium text-slate-800 border-b border-dashed border-slate-300 pb-0.5 mt-0.5">
                  Lớp {profile.className} &bull; {profile.teacherName}
                </p>
              </div>
              <div>
                <span className="font-semibold text-slate-500">Điểm số & Lời phê:</span>
                <p className="font-medium text-slate-800 border-b border-dashed border-slate-300 pb-0.5 mt-0.5">
                  ....... / 10 điểm &bull; ...................................
                </p>
              </div>
            </div>
          </div>

          {/* List of Questions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                I. Phần Câu Hỏi Trắc Nghiệm ({worksheet.questions.length} câu)
              </h4>
              <span className="text-[11px] text-slate-400 italic">
                (Khoanh tròn vào chữ cái A, B, C hoặc D trước phương án đúng)
              </span>
            </div>

            {worksheet.questions.map((q) => {
              const selected = userAnswers[q.number];
              const isCorrect = selected === q.correctAnswer;
              const hasAnswered = selected !== undefined;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-xl border p-4 sm:p-5 transition shadow-2xs ${
                    showAnswers
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : hasAnswered
                        ? 'border-rose-300 bg-rose-50/20'
                        : 'border-slate-200'
                      : selected
                      ? 'border-blue-300 bg-blue-50/20'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-900 text-white text-xs font-bold shrink-0 mt-0.5">
                      {q.number}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900 leading-snug">
                        {q.question}
                      </p>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                        {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                          const isOptionCorrect = q.correctAnswer === opt;
                          const isThisSelected = selected === opt;

                          let optionClass =
                            'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                          if (showAnswers) {
                            if (isOptionCorrect) {
                              optionClass =
                                'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500';
                            } else if (isThisSelected) {
                              optionClass =
                                'border-rose-400 bg-rose-50 text-rose-900 line-through opacity-80';
                            }
                          } else if (isThisSelected) {
                            optionClass =
                              'border-blue-500 bg-blue-50 text-blue-950 font-semibold ring-1 ring-blue-500';
                          }

                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleSelectOption(q.number, opt)}
                              className={`flex items-start text-left p-2.5 rounded-lg border text-xs transition cursor-pointer ${optionClass}`}
                            >
                              <span className="font-bold mr-2 text-slate-500 shrink-0">
                                {opt}.
                              </span>
                              <span className="flex-1">{q.options[opt]}</span>
                              {showAnswers && isOptionCorrect && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-1.5 shrink-0 self-center" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation box if enabled */}
                      {showAnswers && (
                        <div className="mt-3 p-3 bg-emerald-50/80 rounded-lg border border-emerald-200 text-xs text-emerald-950 space-y-1 animate-in fade-in">
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
          </div>

          {/* Answer Key Summary Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Bảng Đáp Án Nhanh & Tra Cứu</span>
              </h4>
              <span className="text-[11px] text-slate-400">
                Nguồn: https://loigiaihay.com/
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse border border-slate-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-emerald-700 text-white font-bold">
                    <th className="p-2 border border-emerald-600 w-20">Câu</th>
                    {worksheet.questions.map((q) => (
                      <th key={q.number} className="p-2 border border-emerald-600">
                        {q.number}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-slate-50 font-bold text-emerald-700">
                    <td className="p-2 border border-slate-200 text-slate-600">Đáp án</td>
                    {worksheet.questions.map((q) => (
                      <td key={q.number} className="p-2 border border-slate-200 text-sm">
                        {showAnswers ? q.correctAnswer : userAnswers[q.number] || '-'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>Tham khảo thêm lời giải SGK, VBT & đề kiểm tra tại:</span>
            <a
              href="https://loigiaihay.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:underline"
            >
              loigiaihay.com
            </a>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg font-medium transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
