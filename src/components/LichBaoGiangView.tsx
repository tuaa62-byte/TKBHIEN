import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Edit3,
  Plus,
  Sparkles,
  Layers,
  BookOpen,
  Eye,
  Check,
  Filter,
  User,
  Info,
} from 'lucide-react';
import { SchoolProfile, TKBEntry, KHBDLesson } from '../types';
import { exportCombinedDocx } from '../utils/docxExport';
import { calculateWeekDates, getTeacherPersonalLbgEntries } from '../utils/scheduleGenerator';
import { cleanCurriculumTitle } from '../data/curriculumData';

interface LichBaoGiangViewProps {
  profile: SchoolProfile;
  lbgEntries: TKBEntry[];
  lessons: KHBDLesson[];
  onUpdateEntry: (updatedEntry: TKBEntry) => void;
  onOpenAiModalForLesson?: (entry: TKBEntry) => void;
  onViewLessonKHBD?: (ppct: number, subject: string) => void;
  fontSizePt: 12 | 13 | 14;
}

export const LichBaoGiangView: React.FC<LichBaoGiangViewProps> = ({
  profile,
  lbgEntries,
  lessons,
  onUpdateEntry,
  onOpenAiModalForLesson,
  onViewLessonKHBD,
  fontSizePt,
}) => {
  const [filterDay, setFilterDay] = useState<number | 'all'>('all');
  const [viewScope, setViewScope] = useState<'personal' | 'class'>('personal');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<TKBEntry>>({});
  const [showSignatures, setShowSignatures] = useState<boolean>(false); // Mặc định false theo yêu cầu

  const dayNames = ['', '', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'];
  const { dayDates } = calculateWeekDates(profile.weekNumber || 1, profile.startDate);

  // Lọc danh sách tiết hiển thị theo chế độ Cá nhân giáo viên hay Toàn lớp
  const personalEntries = getTeacherPersonalLbgEntries(profile, lbgEntries);
  const displayEntries = viewScope === 'personal' ? personalEntries : lbgEntries;

  // Group entries by day (2 -> 6)
  const activeDays = filterDay === 'all' ? [2, 3, 4, 5, 6] : [filterDay];

  const groupedDays = activeDays.map((dayNum) => {
    const dayEntries = displayEntries.filter((e) => e.day === dayNum);
    // Sắp xếp sáng trước chiều, tiết 1 -> 5
    dayEntries.sort((a, b) => {
      if (a.session !== b.session) {
        return a.session === 'Sáng' ? -1 : 1;
      }
      return a.period - b.period;
    });

    const morningEntries = dayEntries.filter((e) => e.session === 'Sáng');
    const afternoonEntries = dayEntries.filter((e) => e.session === 'Chiều');

    return {
      dayNum,
      dayName: dayNames[dayNum] || `Thứ ${dayNum}`,
      dateStr: dayDates[dayNum] || '',
      entries: dayEntries,
      morningEntries,
      afternoonEntries,
    };
  }).filter((group) => group.entries.length > 0);

  const handleStartEdit = (entry: TKBEntry) => {
    setEditingId(entry.id);
    setEditForm({ ...entry });
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    onUpdateEntry(editForm as TKBEntry);
    setEditingId(null);
  };

  const handleQuickExportLBGOnly = () => {
    // Xuất đúng LBG đang xem (Cá nhân hoặc Toàn lớp)
    exportCombinedDocx(profile, displayEntries, [], {
      fontSizePt,
      includeLBG: true,
      includeKHBD: false,
      includeTKB: false,
      showSignatures,
    });
  };

  const handleExportFullBooklet = () => {
    // Xuất cả bộ: Trang 1 dùng LBG cá nhân của giáo viên để khớp 100% với các bài dạy KHBD phía sau
    exportCombinedDocx(profile, personalEntries, lessons, {
      fontSizePt,
      includeLBG: true,
      includeKHBD: true,
      includeTKB: false,
      showSignatures,
    });
  };

  return (
    <div className="space-y-6">
      {/* Official Header Document Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6">
        {/* National Emblem / School Header Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-slate-200">
          <div className="text-center md:text-left space-y-1">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {profile.departmentName}
            </h4>
            <h3 className="text-sm font-bold uppercase text-slate-900">
              {profile.schoolName}
            </h3>
            <p className="text-xs text-slate-600">
              {profile.subSchoolName} &bull; Lớp: <span className="text-blue-600 font-semibold">{profile.className}</span>
            </p>
          </div>

          <div className="text-center md:text-right space-y-1">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </h4>
            <p className="text-xs font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4">
              Độc lập - Tự do - Hạnh phúc
            </p>
            <p className="text-[11px] text-slate-500 italic">
              Tân Thạnh, ngày {profile.startDate}
            </p>
          </div>
        </div>

        {/* Big Banner Title */}
        <div className="text-center my-6">
          <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">
            LỊCH BÁO GIẢNG TUẦN {profile.weekNumber}
          </h2>
          <div className="flex items-center justify-center gap-3 text-xs text-slate-600 mt-2 flex-wrap">
            <span>
              Giáo viên: <strong className="text-slate-900">{profile.teacherName}</strong>
            </span>
            <span>&bull;</span>
            <span>
              Lớp: <strong className="text-blue-600">{profile.className}</strong>
            </span>
            <span>&bull;</span>
            <span>
              Khối: <strong>Khối {profile.grade}</strong>
            </span>
            <span>&bull;</span>
            <span>
              Năm học: <strong>{profile.schoolYear}</strong>
            </span>
          </div>
          <p className="text-xs text-slate-500 italic mt-1">
            Thời gian thực hiện: Từ ngày {profile.startDate} đến ngày {profile.endDate} (7 tiết/ngày: Sáng 4-5 tiết, Chiều 2-3 tiết)
          </p>
        </div>

        {/* Scope Switcher & Status Banner (GVCN vs GVBM Specific LBG) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg mb-4 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 shrink-0">
              Phạm vi LBG:
            </span>
            <div className="inline-flex rounded-md p-0.5 bg-slate-200 border border-slate-300 text-xs">
              <button
                type="button"
                onClick={() => setViewScope('personal')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition ${
                  viewScope === 'personal'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Cá nhân {profile.teacherName} ({personalEntries.length} tiết)</span>
              </button>
              <button
                type="button"
                onClick={() => setViewScope('class')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition ${
                  viewScope === 'class'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Toàn lớp {profile.className} ({lbgEntries.length} tiết)</span>
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-600">
            {viewScope === 'personal' ? (
              <span className="inline-flex items-center gap-1.5 text-blue-700 font-medium">
                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                {profile.role === 'GVCN'
                  ? `Đã lọc riêng ${personalEntries.length} tiết trực tiếp dạy (không gồm tiết GV chuyên Anh, Tin, GDTC, ÂN, MT).`
                  : `Đã lọc riêng ${personalEntries.length} tiết chuyên môn của ${profile.teacherName}.`}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-amber-700 font-medium">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                Hiển thị đầy đủ {lbgEntries.length} tiết/tuần của cả lớp (kèm tên các GV chuyên).
              </span>
            )}
          </div>
        </div>

        {/* Filter & Export Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 px-4 bg-slate-50 rounded-md border border-slate-200 mb-4 gap-3">
          {/* Day Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" /> Xem:
            </span>
            <button
              onClick={() => setFilterDay('all')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition shrink-0 ${
                filterDay === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Cả Tuần (Thứ 2 - 6)
            </button>
            {[2, 3, 4, 5, 6].map((dayNum) => (
              <button
                key={dayNum}
                onClick={() => setFilterDay(dayNum)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition shrink-0 ${
                  filterDay === dayNum
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {dayNames[dayNum]}
              </button>
            ))}
          </div>

          {/* Export and Signature Toggle */}
          <div className="flex items-center gap-2 flex-wrap">
            <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer mr-2">
              <input
                type="checkbox"
                checked={showSignatures}
                onChange={(e) => setShowSignatures(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Hiển thị ký duyệt cuối bảng</span>
            </label>

            <button
              onClick={handleQuickExportLBGOnly}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 text-xs font-semibold rounded-md shadow-xs transition"
              title="Tải riêng Lịch Báo Giảng sang file Word (.docx) không kèm KHBD"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải LBG Riêng (.docx)</span>
            </button>

            <button
              onClick={handleExportFullBooklet}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow-xs transition"
              title="Tải gộp cả Lịch Báo Giảng và KHBD Cả Tuần"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải Cả Bộ (LBG + KHBD)</span>
            </button>
          </div>
        </div>

        {/* Official LBG Table with Single Cell Merging for Day & Session */}
        <div className="overflow-x-auto border border-slate-200 rounded-md">
          <table className="w-full text-xs border-collapse bg-white">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold text-[11px] uppercase tracking-wider text-center border-b-2 border-slate-200">
                <th className="p-2.5 w-28 border-r border-slate-200">Thứ, ngày</th>
                <th className="p-2.5 w-16 border-r border-slate-200">Buổi</th>
                <th className="p-2.5 w-12 border-r border-slate-200">Tiết</th>
                <th className="p-2.5 w-44 text-left border-r border-slate-200">Môn học / Phân môn</th>
                <th className="p-2.5 w-16 border-r border-slate-200">Tiết PPCT</th>
                <th className="p-2.5 text-left border-r border-slate-200">Tên bài dạy / Hoạt động giáo dục</th>
                <th className="p-2.5 text-left w-52 border-r border-slate-200">Nội dung tích hợp / Ghi chú</th>
                <th className="p-2.5 w-20 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {groupedDays.map((group) => {
                const totalDayRows = group.entries.length;
                const morningCount = group.morningEntries.length;
                const afternoonCount = group.afternoonEntries.length;

                return group.entries.map((entry, indexInDay) => {
                  const isFirstOfDay = indexInDay === 0;
                  const isMorning = entry.session === 'Sáng';
                  const isFirstOfMorning = isMorning && entry === group.morningEntries[0];
                  const isFirstOfAfternoon = !isMorning && entry === group.afternoonEntries[0];

                  return (
                    <tr
                      key={entry.id}
                      className={`hover:bg-slate-50 transition border-b border-slate-200 ${
                        indexInDay === totalDayRows - 1 ? 'border-b-2 border-slate-300' : ''
                      }`}
                    >
                      {/* Cột Thứ, ngày: Chỉ xuất hiện 1 lần duy nhất cho cả ngày (gồm cả Sáng và Chiều) */}
                      {isFirstOfDay && (
                        <td
                          rowSpan={totalDayRows}
                          className="p-3 font-bold text-center text-slate-800 border-r border-slate-200 align-middle bg-slate-50/70"
                        >
                          <div className="font-bold text-slate-900 text-xs">{group.dayName}</div>
                          {group.dateStr && (
                            <div className="text-[11px] font-normal text-slate-500 mt-1">
                              {group.dateStr}
                            </div>
                          )}
                        </td>
                      )}

                      {/* Cột Buổi: Gộp buổi Sáng và buổi Chiều riêng biệt cho gọn */}
                      {isFirstOfMorning && (
                        <td
                          rowSpan={morningCount}
                          className="p-2 text-center font-semibold text-blue-700 border-r border-slate-200 align-middle bg-blue-50/25 text-[11px]"
                        >
                          Sáng
                        </td>
                      )}
                      {isFirstOfAfternoon && (
                        <td
                          rowSpan={afternoonCount}
                          className="p-2 text-center font-semibold text-amber-700 border-r border-slate-200 align-middle bg-amber-50/25 text-[11px]"
                        >
                          Chiều
                        </td>
                      )}

                      {/* Tiết */}
                      <td className="p-2 text-center font-semibold text-slate-900 border-r border-slate-200">
                        {entry.period}
                      </td>

                      {/* Môn học */}
                      <td className="p-2 font-medium text-slate-800 border-r border-slate-200">
                        {entry.subject}
                      </td>

                      {/* Tiết PPCT */}
                      <td className="p-2 text-center font-semibold text-slate-700 bg-slate-50/40 border-r border-slate-200">
                        {entry.ppctLesson || '—'}
                      </td>

                      {/* Tên bài dạy */}
                      <td className="p-2 text-slate-800 font-normal border-r border-slate-200">
                        {cleanCurriculumTitle(entry.lessonTitle) || <span className="text-slate-400 italic">Chưa nhập tên bài dạy</span>}
                        {entry.teacher && entry.isSpecialist && (
                          <span className="ml-1 text-[11px] text-blue-600 font-medium">
                            (GV: {entry.teacher})
                          </span>
                        )}
                      </td>

                      {/* Cột Nội dung tích hợp / Ghi chú */}
                      <td className="p-2 text-slate-600 text-[11px] leading-relaxed border-r border-slate-200">
                        {entry.integration ? (
                          <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block font-medium">
                            {entry.integration}
                          </span>
                        ) : (
                          // Cột nội dung tích hợp để trống theo yêu cầu của giáo viên
                          <span></span>
                        )}
                      </td>

                      {/* Thao tác */}
                      <td className="p-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleStartEdit(entry)}
                            className="p-1 rounded text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"
                            title="Chỉnh sửa nội dung tiết dạy"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {onViewLessonKHBD && (
                            <button
                              onClick={() => onViewLessonKHBD(entry.ppctLesson || 1, entry.subject)}
                              className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                              title="Xem giáo án KHBD chi tiết"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>

        {/* Optional signatures at the end of LBG */}
        {showSignatures && (
          <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 text-center text-xs text-slate-800">
            <div>
              <p className="font-semibold uppercase text-slate-900">TỔ TRƯỞNG CHUYÊN MÔN</p>
              <p className="text-[11px] text-slate-500 italic">(Ký và ghi rõ họ tên)</p>
              <div className="h-16"></div>
              <p className="text-slate-600">................................................</p>
            </div>
            <div>
              <p className="font-semibold uppercase text-slate-900">GIÁO VIÊN GIẢNG DẠY</p>
              <p className="text-[11px] text-slate-500 italic">(Ký và ghi rõ họ tên)</p>
              <div className="h-16"></div>
              <p className="font-semibold text-slate-900">{profile.teacherName}</p>
            </div>
          </div>
        )}
      </div>

      {/* Edit Entry Modal */}
      {editingId && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Chỉnh Sửa Tiết Lịch Báo Giảng: {editForm.subject} ({dayNames[editForm.day || 2]} - {editForm.session} Tiết {editForm.period})
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Môn học / Phân môn:</label>
                <input
                  type="text"
                  value={editForm.subject || ''}
                  onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Tiết PPCT:</label>
                <input
                  type="number"
                  value={editForm.ppctLesson || ''}
                  onChange={(e) => setEditForm({ ...editForm, ppctLesson: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Tên bài dạy / Hoạt động:</label>
                <input
                  type="text"
                  value={editForm.lessonTitle || ''}
                  onChange={(e) => setEditForm({ ...editForm, lessonTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Nội dung tích hợp / Ghi chú:</label>
                <textarea
                  rows={3}
                  value={editForm.integration || ''}
                  onChange={(e) => setEditForm({ ...editForm, integration: e.target.value })}
                  placeholder="Ví dụ: Tích hợp NLS; AI; QCN; KNS; GDQPAN..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs text-slate-800"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100 border border-slate-200"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md text-xs shadow-xs"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
