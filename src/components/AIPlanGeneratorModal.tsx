import React, { useState } from 'react';
import { Sparkles, X, Loader2, Check, BookOpen, Layers, Bot } from 'lucide-react';
import { SchoolProfile, KHBDLesson } from '../types';

interface AIPlanGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: SchoolProfile;
  onLessonGenerated: (lesson: KHBDLesson) => void;
  initialData?: Partial<KHBDLesson>;
}

export const AIPlanGeneratorModal: React.FC<AIPlanGeneratorModalProps> = ({
  isOpen,
  onClose,
  profile,
  onLessonGenerated,
  initialData,
}) => {
  const [subject, setSubject] = useState<string>(initialData?.subject || 'Toán');
  const [subType, setSubType] = useState<string>(initialData?.subType || '');
  const [lessonTitle, setLessonTitle] = useState<string>(initialData?.lessonTitle || 'Ôn tập các số đến 100');
  const [ppct, setPpct] = useState<number>(initialData?.ppct || 1);
  const [dayName, setDayName] = useState<string>(initialData?.dayName || 'Thứ Hai');
  const [dateStr, setDateStr] = useState<string>(initialData?.dateStr || profile.startDate);
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([
    'NLS (Năng lực số)',
    'AI (Trí tuệ nhân tạo)',
    'KNS (Kỹ năng sống)',
    'Học thông qua chơi',
  ]);
  const [userNote, setUserNote] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const integrationOptions = [
    'NLS (Năng lực số CV 3456)',
    'AI (Trí tuệ nhân tạo TT 02/2025)',
    'QCN (Quyền con người)',
    'KNS (Kỹ năng sống)',
    'GDQPAN (Giáo dục Quốc phòng An ninh TT 08/2024)',
    'BVMT (Bảo vệ môi trường & Biến đổi khí hậu)',
    'GD Dinh dưỡng (Dinh dưỡng học đường)',
    'Học thông qua chơi (Bộ phận)',
    'Giáo dục STEM',
    'GDĐP (Giáo dục địa phương Long An / Tân Thạnh)',
  ];

  const toggleIntegration = (item: string) => {
    setSelectedIntegrations((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/generate-khbd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: profile.grade,
          className: profile.className,
          teacherName: profile.teacherName,
          schoolName: profile.schoolName,
          subSchoolName: profile.subSchoolName,
          subject,
          subType,
          lessonTitle,
          ppct,
          dayName,
          dateStr,
          integrations: selectedIntegrations,
          userNote,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Lỗi khi tạo bài dạy từ máy chủ');
      }

      const generated = data.lesson;
      const fullLesson: KHBDLesson = {
        id: `khbd-ai-${Date.now()}`,
        dayName,
        dateStr,
        session: 'Sáng',
        period: 1,
        subject,
        subType,
        ppct,
        lessonTitle: generated.lessonTitle || lessonTitle,
        grade: profile.grade,
        teacherName: profile.teacherName,
        className: profile.className,
        specificCompetency: generated.specificCompetency || '',
        generalCompetency: generated.generalCompetency || '',
        qualities: generated.qualities || '',
        teacherEquipments: generated.teacherEquipments || '',
        studentEquipments: generated.studentEquipments || '',
        activities: generated.activities,
        integrationNotes: generated.integrationNotes,
        afterLessonAdjustment: generated.afterLessonAdjustment,
      };

      onLessonGenerated(fullLesson);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Có lỗi xảy ra khi tạo kế hoạch bài dạy.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 border border-slate-200 max-h-[90vh] overflow-y-auto text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Trợ Lý Soạn Kế Hoạch Bài Dạy AI
              </h3>
              <p className="text-xs text-slate-500">
                Chuẩn Công văn 2345/BGDĐT &bull; Khối {profile.grade} ({profile.className}) &bull; Cấu trúc 2 cột GV - HS
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-3 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleGenerate} className="mt-4 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Môn học:</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Tiếng Việt">Tiếng Việt</option>
                <option value="Toán">Toán</option>
                <option value="Đạo đức">Đạo đức</option>
                <option value="Tự nhiên và Xã hội">Tự nhiên và Xã hội</option>
                <option value="Khoa học">Khoa học</option>
                <option value="Lịch sử và Địa lí">Lịch sử và Địa lí</option>
                <option value="Hoạt động trải nghiệm">Hoạt động trải nghiệm</option>
                <option value="Công nghệ">Công nghệ</option>
                <option value="Tin học">Tin học</option>
                <option value="Tiếng Anh">Tiếng Anh</option>
                <option value="Mĩ thuật">Mĩ thuật</option>
                <option value="Âm nhạc">Âm nhạc</option>
                <option value="Giáo dục thể chất">Giáo dục thể chất</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phân môn (nếu có):</label>
              <input
                type="text"
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                placeholder="Đọc, Viết, LTVC, Luyện tập..."
                className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tiết PPCT:</label>
              <input
                type="number"
                value={ppct}
                onChange={(e) => setPpct(parseInt(e.target.value) || 1)}
                className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Tên bài dạy / Hoạt động:</label>
            <input
              type="text"
              required
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              placeholder="Ví dụ: Ôn tập các phép tính với số tự nhiên, Làm việc thật là vui..."
              className="w-full p-2.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Thứ:</label>
              <select
                value={dayName}
                onChange={(e) => setDayName(e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Thứ Hai">Thứ Hai</option>
                <option value="Thứ Ba">Thứ Ba</option>
                <option value="Thứ Tư">Thứ Tư</option>
                <option value="Thứ Năm">Thứ Năm</option>
                <option value="Thứ Sáu">Thứ Sáu</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Ngày dạy:</label>
              <input
                type="text"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                placeholder="07/09/2026"
                className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Integration options checkboxes */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Chọn các nội dung tích hợp liên môn phù hợp với bài dạy:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-1.5">
              {integrationOptions.map((opt) => {
                const isSelected = selectedIntegrations.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleIntegration(opt)}
                    className={`text-left p-2 rounded-md border text-xs transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-50 text-blue-900 border-blue-400 font-semibold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Yêu cầu hoặc ghi chú đặc biệt cho AI (tùy chọn):
            </label>
            <textarea
              rows={2}
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="Ví dụ: Trò chơi khởi động đố vui, tích hợp ChatGPT gợi ý dàn ý, liên hệ thực tế huyện Tân Thạnh..."
              className="w-full p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs text-slate-800"
            />
          </div>

          <div className="mt-5 flex justify-end space-x-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-3.5 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100 border border-slate-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md text-xs shadow-xs transition disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>AI đang soạn giáo án CV 2345...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bắt Đầu Soạn Giáo Án</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
