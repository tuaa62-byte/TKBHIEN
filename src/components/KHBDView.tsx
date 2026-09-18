import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Download,
  Edit3,
  Plus,
  Sparkles,
  Layers,
  Search,
  CheckCircle2,
  Trash2,
  FileText,
  Clock,
  Printer,
} from 'lucide-react';
import { SchoolProfile, KHBDLesson, TKBEntry } from '../types';
import { exportCombinedDocx } from '../utils/docxExport';
import { getTeacherPersonalLbgEntries } from '../utils/scheduleGenerator';
import { cleanCurriculumTitle } from '../data/curriculumData';

interface KHBDViewProps {
  profile: SchoolProfile;
  lessons: KHBDLesson[];
  lbgEntries: TKBEntry[];
  onUpdateLesson: (lesson: KHBDLesson) => void;
  onAddLesson: (lesson: KHBDLesson) => void;
  onDeleteLesson: (id: string) => void;
  onOpenAiGenerator: (prefill?: Partial<KHBDLesson>) => void;
  fontSizePt: 12 | 13 | 14;
}

export const KHBDView: React.FC<KHBDViewProps> = ({
  profile,
  lessons,
  lbgEntries,
  onUpdateLesson,
  onAddLesson,
  onDeleteLesson,
  onOpenAiGenerator,
  fontSizePt,
}) => {
  const [filterDay, setFilterDay] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<KHBDLesson | null>(null);

  const dayList = ['all', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'];

  const filteredLessons = lessons.filter((l) => {
    const matchDay = filterDay === 'all' || l.dayName === filterDay;
    const matchSearch =
      !searchQuery ||
      l.lessonTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDay && matchSearch;
  });

  const handleStartEdit = (lesson: KHBDLesson) => {
    setEditingLessonId(lesson.id);
    setEditFormData(JSON.parse(JSON.stringify(lesson)));
  };

  const handleSaveEdit = () => {
    if (editFormData) {
      onUpdateLesson(editFormData);
      setEditingLessonId(null);
      setEditFormData(null);
    }
  };

  const handleExportDocx = (singleLesson?: KHBDLesson) => {
    const exportList = singleLesson ? [singleLesson] : lessons;
    const personalLbg = getTeacherPersonalLbgEntries(profile, lbgEntries);
    exportCombinedDocx(profile, personalLbg, exportList, {
      fontSizePt,
      includeLBG: !singleLesson, // Trang 1 kèm LBG cá nhân khớp bài dạy nếu xuất cả tuần
      includeKHBD: true,
      includeTKB: false,
      showSignatures: false,
    });
  };

  const handleExportKhbdOnly = () => {
    exportCombinedDocx(profile, [], lessons, {
      fontSizePt,
      includeLBG: false,
      includeKHBD: true,
      includeTKB: false,
      showSignatures: false,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Kế Hoạch Bài Dạy (KHBD) Chuẩn Công Văn 2345/BGDĐT
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {profile.role === 'GVBM' ? 'GV Chuyên' : `Lớp ${profile.className}`} &bull; {profile.teacherName}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Cấu trúc 4 giai đoạn chuẩn (Khởi động &bull; Khám phá &bull; Luyện tập &bull; Vận dụng), bảng 2 cột GV - HS, tích hợp NLS, AI, QCN, KNS, GDQPAN.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onOpenAiGenerator()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold rounded-md shadow-xs transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Soạn Bài Dạy AI Mới</span>
          </button>

          <button
            onClick={handleExportKhbdOnly}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs transition"
            title="Tải riêng Kế hoạch bài dạy sang Word (.docx)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải KHBD Riêng ({lessons.length} bài)</span>
          </button>

          <button
            onClick={() => handleExportDocx()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-md shadow-xs transition"
            title="Tải toàn bộ Kế hoạch bài dạy từ Thứ 2 đến Thứ 6 kèm Trang 1 Lịch báo giảng"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải Cả Bộ (Font {fontSizePt})</span>
          </button>
        </div>
      </div>

      {/* Teacher Role Filter Notification Banner */}
      <div className="flex items-center gap-2.5 p-3.5 bg-blue-50/80 border border-blue-200 rounded-lg text-xs text-blue-900 shadow-xs">
        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
        <div className="leading-relaxed">
          <strong>Kế hoạch bài dạy cá nhân:</strong> Giáo viên <strong>{profile.teacherName}</strong> ({profile.role === 'GVBM' ? 'GV Chuyên' : `GVCN Lớp ${profile.className}`}) &bull; Đang có <strong>{lessons.length} bài dạy</strong> trực tiếp giảng dạy trong Tuần {profile.weekNumber}.
          {profile.role === 'GVCN' && (
            <span className="text-blue-700 font-medium ml-1">
              Hệ thống tự động loại bỏ các tiết của GV chuyên Tiếng Anh, Tin học, GDTC, Âm nhạc, Mĩ thuật theo phân công chuyên môn.
            </span>
          )}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs gap-3">
        {/* Day Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {dayList.map((d) => (
            <button
              key={d}
              onClick={() => setFilterDay(d)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition shrink-0 ${
                filterDay === d
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {d === 'all' ? 'Tất Cả Các Ngày' : d}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm kiếm bài học, môn học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Lesson Plans List */}
      <div className="space-y-6">
        {filteredLessons.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600">Không tìm thấy bài dạy nào phù hợp.</p>
            <p className="text-xs text-slate-400 mt-1">
              Bạn có thể nhấp vào "Soạn Bài Dạy AI Mới" để tạo kế hoạch bài dạy chuẩn cho khối {profile.grade}.
            </p>
          </div>
        ) : (
          filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden transition"
            >
              {/* Header Box */}
              <div className="p-4 bg-slate-900 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-600 text-white tracking-wide">
                      ★ {lesson.dayName.toUpperCase()} ({lesson.dateStr})
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-200 border border-slate-700">
                      {lesson.session} - Tiết {lesson.period} (PPCT: {lesson.ppct})
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-200 border border-slate-700">
                      Lớp {lesson.className || profile.className}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold mt-2 text-white tracking-tight">
                    {lesson.subject.toUpperCase()} {lesson.subType ? `(${lesson.subType.toUpperCase()})` : ''}: {cleanCurriculumTitle(lesson.lessonTitle)}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Giáo viên: <strong className="text-slate-200">{lesson.teacherName || profile.teacherName}</strong> &bull; {profile.schoolName} - {profile.subSchoolName}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 self-start md:self-center">
                  <button
                    onClick={() => handleStartEdit(lesson)}
                    className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
                    title="Chỉnh sửa nội dung giáo án"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Sửa</span>
                  </button>

                  <button
                    onClick={() => onOpenAiGenerator(lesson)}
                    className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
                    title="Dùng Gemini AI nâng cấp / tối ưu hoá giáo án này"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tối Ưu AI</span>
                  </button>

                  <button
                    onClick={() => handleExportDocx(lesson)}
                    className="px-2.5 py-1.5 rounded bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
                    title="Tải riêng giáo án tiết này sang Word"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-700" />
                    <span>Word</span>
                  </button>
                </div>
              </div>

              {/* Lesson Body Content */}
              <div className="p-6 space-y-6 text-xs text-slate-800">
                {/* I. YÊU CẦU CẦN ĐẠT */}
                <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    I. YÊU CẦU CẦN ĐẠT
                  </h4>
                  <div className="space-y-1.5 leading-relaxed">
                    <p>
                      <strong className="text-slate-900">1. Năng lực đặc thù:</strong> {lesson.specificCompetency}
                    </p>
                    <p>
                      <strong className="text-slate-900">2. Năng lực chung:</strong> {lesson.generalCompetency}
                    </p>
                    <p>
                      <strong className="text-slate-900">3. Phẩm chất:</strong> {lesson.qualities}
                    </p>
                  </div>
                </div>

                {/* II. ĐỒ DÙNG DẠY HỌC */}
                <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-600" />
                    II. ĐỒ DÙNG DẠY HỌC VÀ HỌC LIỆU
                  </h4>
                  <div className="space-y-1 leading-relaxed">
                    <p>
                      <strong className="text-slate-900">- Giáo viên:</strong> {lesson.teacherEquipments}
                    </p>
                    <p>
                      <strong className="text-slate-900">- Học sinh:</strong> {lesson.studentEquipments}
                    </p>
                  </div>
                </div>

                {/* III. CÁC HOẠT ĐỘNG DẠY HỌC (2-COLUMN TABLE) */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-600" />
                    III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU
                  </h4>

                  <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-600 font-semibold text-[11px] uppercase tracking-wider border-b-2 border-slate-200">
                          <th className="p-2.5 w-1/2 text-left border-r border-slate-200">HOẠT ĐỘNG CỦA GIÁO VIÊN</th>
                          <th className="p-2.5 w-1/2 text-left">HOẠT ĐỘNG CỦA HỌC SINH</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { key: 'warmup', label: '1. Hoạt động Khởi động', step: lesson.activities.warmup },
                          { key: 'exploration', label: '2. Hoạt động Khám phá kiến thức mới', step: lesson.activities.exploration },
                          { key: 'practice', label: '3. Hoạt động Luyện tập - Thực hành', step: lesson.activities.practice },
                          { key: 'application', label: '4. Hoạt động Vận dụng, trải nghiệm', step: lesson.activities.application },
                        ].map((act) => (
                          <React.Fragment key={act.key}>
                            {/* Step Header */}
                            <tr className="bg-slate-50 border-t border-b border-slate-200">
                              <td colSpan={2} className="p-2.5 font-semibold text-slate-900">
                                <div className="flex items-center justify-between">
                                  <span>★ {act.step.title || act.label} {act.step.duration ? `(${act.step.duration})` : ''}</span>
                                </div>
                                <p className="text-[11px] font-normal text-slate-500 mt-0.5">
                                  <strong>Mục tiêu:</strong> {act.step.objective}
                                </p>
                              </td>
                            </tr>
                            {/* 2-Column Activities */}
                            <tr className="align-top border-b border-slate-200">
                              <td className="border-r border-slate-200 p-3 leading-relaxed bg-white">
                                {act.step.teacherActivity.split('\n').map((line, lIdx) => (
                                  <p key={lIdx} className="mb-1 text-slate-800">
                                    {line}
                                  </p>
                                ))}
                              </td>
                              <td className="p-3 leading-relaxed bg-slate-50/40">
                                {act.step.studentActivity.split('\n').map((line, lIdx) => (
                                  <p key={lIdx} className="mb-1 text-slate-800">
                                    {line}
                                  </p>
                                ))}
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* IV. ĐIỀU CHỈNH SAU BÀI DẠY */}
                <div className="bg-slate-50 p-3.5 rounded-md border border-slate-200 text-xs">
                  <span className="font-bold text-slate-800 block mb-1">
                    IV. ĐIỀU CHỈNH SAU BÀI DẠY (NẾU CÓ):
                  </span>
                  <p className="text-slate-500 italic">
                    {lesson.afterLessonAdjustment || '....................................................................................................................................................................................................................'}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Lesson Modal */}
      {editingLessonId && editFormData && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200">
              Chỉnh Sửa Kế Hoạch Bài Dạy: {editFormData.lessonTitle}
            </h3>

            <div className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Môn học:</label>
                  <input
                    type="text"
                    value={editFormData.subject}
                    onChange={(e) => setEditFormData({ ...editFormData, subject: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Phân môn / Thể loại:</label>
                  <input
                    type="text"
                    value={editFormData.subType || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, subType: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Tiết PPCT:</label>
                  <input
                    type="number"
                    value={editFormData.ppct}
                    onChange={(e) => setEditFormData({ ...editFormData, ppct: parseInt(e.target.value) || 1 })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Tên bài học:</label>
                <input
                  type="text"
                  value={editFormData.lessonTitle}
                  onChange={(e) => setEditFormData({ ...editFormData, lessonTitle: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">1. Năng lực đặc thù:</label>
                <textarea
                  rows={2}
                  value={editFormData.specificCompetency}
                  onChange={(e) => setEditFormData({ ...editFormData, specificCompetency: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">2. Năng lực chung:</label>
                <textarea
                  rows={2}
                  value={editFormData.generalCompetency}
                  onChange={(e) => setEditFormData({ ...editFormData, generalCompetency: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">3. Phẩm chất:</label>
                <textarea
                  rows={2}
                  value={editFormData.qualities}
                  onChange={(e) => setEditFormData({ ...editFormData, qualities: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* 4 Activities */}
              {(['warmup', 'exploration', 'practice', 'application'] as const).map((stepKey) => (
                <div key={stepKey} className="p-3 bg-slate-50 rounded-md border border-slate-200">
                  <h5 className="font-semibold text-slate-900 uppercase text-xs mb-2">
                    {editFormData.activities[stepKey].title}
                  </h5>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600">Mục tiêu hoạt động:</label>
                      <input
                        type="text"
                        value={editFormData.activities[stepKey].objective}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            activities: {
                              ...editFormData.activities,
                              [stepKey]: { ...editFormData.activities[stepKey], objective: e.target.value },
                            },
                          })
                        }
                        className="w-full p-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600">Hoạt động của giáo viên:</label>
                        <textarea
                          rows={4}
                          value={editFormData.activities[stepKey].teacherActivity}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              activities: {
                                ...editFormData.activities,
                                [stepKey]: { ...editFormData.activities[stepKey], teacherActivity: e.target.value },
                              },
                            })
                          }
                          className="w-full p-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600">Hoạt động của học sinh:</label>
                        <textarea
                          rows={4}
                          value={editFormData.activities[stepKey].studentActivity}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              activities: {
                                ...editFormData.activities,
                                [stepKey]: { ...editFormData.activities[stepKey], studentActivity: e.target.value },
                              },
                            })
                          }
                          className="w-full p-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end space-x-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setEditingLessonId(null)}
                className="px-3.5 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100 border border-slate-200"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md text-xs shadow-xs"
              >
                Lưu Kế Hoạch Bài Dạy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
