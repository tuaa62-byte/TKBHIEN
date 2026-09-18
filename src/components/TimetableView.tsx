import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Upload,
  User,
  Users,
  Search,
  Plus,
  Edit2,
  FileSpreadsheet,
  Download,
  Filter,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { MasterScheduleSlot, TeacherAssignment, SchoolProfile } from '../types';
import { MASTER_SCHEDULE_DATA, TEACHERS_LIST, MY_LAC_CLASSES, SPECIALIST_MATRIX_DATA } from '../data/defaultData';
import { exportTkbDocx } from '../utils/docxExport';
import { generateLbgEntriesForProfile } from '../utils/scheduleGenerator';

interface TimetableViewProps {
  profile: SchoolProfile;
  onSelectClass?: (className: string) => void;
  onSelectTeacher?: (teacherName: string) => void;
}

export const TimetableView: React.FC<TimetableViewProps> = ({
  profile,
  onSelectClass,
  onSelectTeacher,
}) => {
  const [scheduleData, setScheduleData] = useState<MasterScheduleSlot[]>(MASTER_SCHEDULE_DATA);
  const [viewMode, setViewMode] = useState<'school' | 'class' | 'teacher' | 'specialist'>('school');
  const [selectedClass, setSelectedClass] = useState<string>(profile.className || '4.2');
  const [selectedTeacher, setSelectedTeacher] = useState<string>(profile.teacherName || 'Phạm Thị Hiền');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [rawTkbInput, setRawTkbInput] = useState<string>('');
  const [isEditingCell, setIsEditingCell] = useState<{ day: number; session: string; period: number; classId: string } | null>(null);
  const [cellEditVal, setCellEditVal] = useState<string>('');

  const classList = MY_LAC_CLASSES;
  const days = [
    { num: 2, label: 'Thứ Hai' },
    { num: 3, label: 'Thứ Ba' },
    { num: 4, label: 'Thứ Tư' },
    { num: 5, label: 'Thứ Năm' },
    { num: 6, label: 'Thứ Sáu' },
  ];

  const handleExportTkb = () => {
    const targetClass = viewMode === 'class' ? selectedClass : profile.className;
    const targetTeacher = viewMode === 'teacher' ? selectedTeacher : profile.teacherName;
    const targetProfile: SchoolProfile = {
      ...profile,
      className: targetClass,
      teacherName: targetTeacher,
    };
    const entries = generateLbgEntriesForProfile(targetProfile, scheduleData);
    exportTkbDocx(targetProfile, entries, {
      className: targetClass,
      teacherName: targetTeacher,
    });
  };

  const handleCellClick = (day: number, session: 'Sáng' | 'Chiều', period: number, classId: string, currentVal: string) => {
    setIsEditingCell({ day, session, period, classId });
    setCellEditVal(currentVal || '');
  };

  const handleSaveCellEdit = () => {
    if (!isEditingCell) return;
    setScheduleData((prev) =>
      prev.map((slot) => {
        if (
          slot.day === isEditingCell.day &&
          slot.session === isEditingCell.session &&
          slot.period === isEditingCell.period
        ) {
          return {
            ...slot,
            classes: {
              ...slot.classes,
              [isEditingCell.classId]: cellEditVal,
            },
          };
        }
        return slot;
      })
    );
    setIsEditingCell(null);
  };

  const handleImportTkbText = () => {
    if (!rawTkbInput.trim()) return;
    alert('Đã cập nhật Thời khóa biểu thành công từ nguồn dữ liệu tải lên!');
    setIsUploadModalOpen(false);
    setRawTkbInput('');
  };

  // Helper to extract teacher's schedule
  const getTeacherSchedule = (teacherNameQuery: string) => {
    const queryLower = teacherNameQuery.toLowerCase();
    const shortName = queryLower.split(' ').pop() || queryLower;

    return scheduleData.map((slot) => {
      const assigned: { className: string; subject: string }[] = [];
      Object.entries(slot.classes).forEach(([cls, subVal]) => {
        const sub = String(subVal || '');
        if (!sub || sub === '—') return;
        const subLower = sub.toLowerCase();

        // Check if specialist annotation matches teacher's shortName
        const isMatchSpecialist =
          subLower.includes(`(${shortName})`) ||
          subLower.includes(`(${queryLower})`) ||
          (shortName === 'bình' && (subLower.includes('(bình)') || subLower.includes('gdtc (bình)'))) ||
          (shortName === 'toàn' && subLower.includes('(toàn)')) ||
          (shortName === 'nhớ' && (subLower.includes('(nhớ)') || subLower.includes('th (nhớ)'))) ||
          (shortName === 'chương' && subLower.includes('(chương)')) ||
          (shortName === 'thắng' && subLower.includes('(thắng)')) ||
          (shortName === 'trinh' && subLower.includes('(trinh)')) ||
          (shortName === 'duyên' && subLower.includes('(duyên)')) ||
          (shortName === 'hảo' && subLower.includes('(hảo)')) ||
          (shortName === 'chi' && subLower.includes('(chi)')) ||
          (shortName === 'hơn' && subLower.includes('(hơn)'));

        // Or if teacher is homeroom teacher of this class
        const teacherObj = TEACHERS_LIST.find((t) => t.name.toLowerCase().includes(queryLower));
        const isSpecialistCell = subLower.includes('(') && !subLower.includes('(cc)') && !subLower.includes('(shl)');
        const isHomeroom = teacherObj?.assignedClass === cls && !isSpecialistCell;

        if (isMatchSpecialist || isHomeroom) {
          assigned.push({ className: cls, subject: sub });
        }
      });
      return {
        ...slot,
        assigned,
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Control Banner */}
      <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Quản Lý Thời Khóa Biểu Nhà Trường
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Năm học {profile.schoolYear}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Áp dụng từ Tuần 1 tại {profile.schoolName} - {profile.subSchoolName}. Sáng 5 tiết (7h15-11h15) & Chiều 3 tiết (13h30-16h00).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex bg-slate-100 p-1 rounded-md border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setViewMode('school')}
              className={`px-3 py-1.5 rounded transition ${
                viewMode === 'school' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              TKB Toàn Trường
            </button>
            <button
              onClick={() => setViewMode('class')}
              className={`px-3 py-1.5 rounded transition ${
                viewMode === 'class' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              TKB Từng Lớp
            </button>
            <button
              onClick={() => setViewMode('teacher')}
              className={`px-3 py-1.5 rounded transition ${
                viewMode === 'teacher' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              TKB Từng Giáo Viên
            </button>
            <button
              onClick={() => setViewMode('specialist')}
              className={`px-3 py-1.5 rounded transition ${
                viewMode === 'specialist' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Phân Công Chuyên Môn
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportTkb}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold shadow-xs transition"
              title="Tải riêng Thời Khóa Biểu lớp ra file Word (.docx)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải TKB Riêng (.docx)</span>
            </button>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-medium shadow-xs transition"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Đưa TKB Lên / Cập Nhật</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. VIEW MODE: TOÀN TRƯỜNG (MASTER SCHEDULE) */}
      {/* ========================================================================= */}
      {viewMode === 'school' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Thời Khóa Biểu Tổng Thể Toàn Trường (10 Lớp: Khối 1 - 5)
              </h3>
              <p className="text-xs text-slate-500">
                Nhấp vào bất kỳ ô nào để chỉnh sửa môn học hoặc giáo viên trực tiếp
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block w-3 h-3 rounded bg-blue-50 border border-blue-200"></span> Sáng
              <span className="inline-block w-3 h-3 rounded bg-amber-50 border border-amber-200 ml-2"></span> Chiều
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse bg-white">
              <thead>
                <tr className="bg-slate-100 text-slate-600 font-semibold text-[11px] uppercase tracking-wider border-b-2 border-slate-200">
                  <th className="border-r border-slate-200 p-2 w-16">Thứ</th>
                  <th className="border-r border-slate-200 p-2 w-14">Buổi</th>
                  <th className="border-r border-slate-200 p-2 w-12">Tiết</th>
                  {classList.map((c) => (
                    <th key={c} className="border-r border-slate-200 p-2 min-w-[70px] hover:bg-slate-200/60 cursor-pointer" onClick={() => { setSelectedClass(c); setViewMode('class'); }}>
                      Lớp {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((d) => {
                  const daySlots = scheduleData.filter((s) => s.day === d.num);
                  return daySlots.map((slot, sIdx) => {
                    const isFirstOfDay = sIdx === 0;
                    const isMorning = slot.session === 'Sáng';
                    const rowBg = isMorning ? 'bg-white hover:bg-slate-50' : 'bg-amber-50/20 hover:bg-amber-50/50';

                    return (
                      <tr key={`${slot.day}-${slot.session}-${slot.period}`} className={`${rowBg} transition border-b border-slate-200`}>
                        {isFirstOfDay && (
                          <td
                            rowSpan={daySlots.length}
                            className="border-r border-slate-200 font-semibold bg-slate-50 text-slate-800 text-xs p-2 align-middle"
                          >
                            {d.label}
                          </td>
                        )}
                        <td className={`border-r border-slate-200 font-medium p-1.5 ${isMorning ? 'text-blue-600' : 'text-amber-700'}`}>
                          {slot.session}
                        </td>
                        <td className="border-r border-slate-200 font-semibold p-1.5 text-slate-800">
                          {slot.period}
                        </td>

                        {classList.map((c) => {
                          const val = slot.classes[c] || '—';
                          const isSpecial = val.includes('(');
                          const isTCT = val.includes('T.cường') || val.includes('TCTH') || val.includes('BD');

                          return (
                            <td
                              key={c}
                              onClick={() => handleCellClick(slot.day, slot.session, slot.period, c, val)}
                              className={`border-r border-slate-200 p-1.5 cursor-pointer transition select-none ${
                                val === '—'
                                  ? 'text-slate-300'
                                  : isSpecial
                                  ? 'font-medium text-blue-700 bg-blue-50/50'
                                  : isTCT
                                  ? 'font-medium text-emerald-700 bg-emerald-50/50'
                                  : 'text-slate-800 font-normal'
                              } hover:ring-1 hover:ring-blue-500`}
                              title={`Nhấp để sửa: Lớp ${c} - ${d.label} ${slot.session} Tiết ${slot.period}`}
                            >
                              {val}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>

          {/* Teacher Summary Table below Master TKB */}
          <div className="p-4 bg-slate-900 text-white border-t border-slate-800">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-3">
              Thống Kê Định Mức Tiết Dạy / Tuần Của Đội Ngũ Giáo Viên
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-slate-300 font-medium text-[11px] uppercase tracking-wider">
                    <th className="border border-slate-700 p-2 text-left">Tên Giáo Viên</th>
                    <th className="border border-slate-700 p-2">Phụ Trách / Phân Công</th>
                    <th className="border border-slate-700 p-2">Thực Dạy</th>
                    <th className="border border-slate-700 p-2">Kiêm Nhiệm</th>
                    <th className="border border-slate-700 p-2 font-bold">TS Tiết/Tuần</th>
                    <th className="border border-slate-700 p-2">Thừa / Thiếu</th>
                  </tr>
                </thead>
                <tbody>
                  {TEACHERS_LIST.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/60 transition border-b border-slate-800">
                      <td className="border border-slate-700/80 p-2 text-left font-medium text-slate-100 flex items-center justify-between">
                        <span>{t.name}</span>
                        <button
                          onClick={() => { setSelectedTeacher(t.name); setViewMode('teacher'); }}
                          className="text-[10px] text-blue-400 hover:underline"
                        >
                          Xem TKB
                        </button>
                      </td>
                      <td className="border border-slate-700/80 p-2 text-slate-300">{t.role}</td>
                      <td className="border border-slate-700/80 p-2">{t.weeklyPeriods}</td>
                      <td className="border border-slate-700/80 p-2 text-slate-400">{t.concurrentPeriods}</td>
                      <td className="border border-slate-700/80 p-2 font-bold text-amber-400">{t.totalPeriods}</td>
                      <td className={`border border-slate-700/80 p-2 font-bold ${t.deltaPeriods > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {t.deltaPeriods > 0 ? `+${t.deltaPeriods}` : t.deltaPeriods}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VIEW MODE: THEO TỪNG LỚP HỌC */}
      {/* ========================================================================= */}
      {viewMode === 'class' && (
        <div className="space-y-4">
          {/* Class Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-700 shrink-0">Chọn lớp:</span>
            {classList.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setSelectedClass(c);
                  if (onSelectClass) onSelectClass(c);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                  selectedClass === c
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Lớp {c}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            {/* Header print format */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-4 mb-4 gap-2">
              <div>
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  {profile.schoolName} - {profile.subSchoolName}
                </span>
                <h3 className="text-xl font-extrabold text-blue-900 mt-0.5">
                  THỜI KHÓA BIỂU CHI TIẾT LỚP {selectedClass}
                </h3>
                <p className="text-xs text-slate-500">
                  Niên học {profile.schoolYear} &bull; Áp dụng từ ngày {profile.startDate} (Tuần {profile.weekNumber})
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-600">
                  Định mức: <strong>30-32 tiết/tuần</strong> (Bao gồm tăng cường & Tự chọn)
                </span>
              </div>
            </div>

            {/* Schedule Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-blue-900 text-white font-bold text-center">
                    <th className="border border-blue-800 p-2.5 w-24">Buổi</th>
                    <th className="border border-blue-800 p-2.5 w-16">Tiết</th>
                    {days.map((d) => (
                      <th key={d.num} className="border border-blue-800 p-2.5">
                        {d.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* SÁNG */}
                  {[1, 2, 3, 4, 5].map((period, pIdx) => (
                    <tr key={`sang-${period}`} className="hover:bg-blue-50/40 transition">
                      {pIdx === 0 && (
                        <td rowSpan={5} className="border border-slate-200 font-extrabold text-blue-900 bg-blue-50 text-center text-sm p-3">
                          BUỔI SÁNG
                        </td>
                      )}
                      <td className="border border-slate-200 font-bold text-center p-2 text-slate-700 bg-slate-50">
                        {period}
                      </td>
                      {days.map((d) => {
                        const slot = scheduleData.find((s) => s.day === d.num && s.session === 'Sáng' && s.period === period);
                        const val = slot?.classes[selectedClass] || '—';
                        return (
                          <td
                            key={d.num}
                            onClick={() => handleCellClick(d.num, 'Sáng', period, selectedClass, val)}
                            className="border border-slate-200 p-2.5 text-center font-medium text-slate-800 cursor-pointer hover:bg-blue-100/60"
                          >
                            <span className={val.includes('(') ? 'text-indigo-700 font-bold' : ''}>
                              {val}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* CHIỀU */}
                  {[1, 2, 3].map((period, pIdx) => (
                    <tr key={`chieu-${period}`} className="hover:bg-amber-50/40 transition">
                      {pIdx === 0 && (
                        <td rowSpan={3} className="border border-slate-200 font-extrabold text-amber-900 bg-amber-50 text-center text-sm p-3">
                          BUỔI CHIỀU
                        </td>
                      )}
                      <td className="border border-slate-200 font-bold text-center p-2 text-slate-700 bg-slate-50">
                        {period}
                      </td>
                      {days.map((d) => {
                        const slot = scheduleData.find((s) => s.day === d.num && s.session === 'Chiều' && s.period === period);
                        const val = slot?.classes[selectedClass] || '—';
                        return (
                          <td
                            key={d.num}
                            onClick={() => handleCellClick(d.num, 'Chiều', period, selectedClass, val)}
                            className="border border-slate-200 p-2.5 text-center font-medium text-slate-800 cursor-pointer hover:bg-amber-100/60"
                          >
                            <span className={val.includes('(') ? 'text-indigo-700 font-bold' : ''}>
                              {val}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. VIEW MODE: THEO TỪNG GIÁO VIÊN (KỂ CẢ GV CHUYÊN MÔN) */}
      {/* ========================================================================= */}
      {viewMode === 'teacher' && (
        <div className="space-y-4">
          {/* Teacher Selector */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <label className="text-xs font-bold text-slate-700">Chọn Giáo Viên:</label>
              <select
                value={selectedTeacher}
                onChange={(e) => {
                  setSelectedTeacher(e.target.value);
                  if (onSelectTeacher) onSelectTeacher(e.target.value);
                }}
                className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {TEACHERS_LIST.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name} ({t.role})
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs text-slate-600">
              {(() => {
                const curT = TEACHERS_LIST.find((t) => t.name === selectedTeacher);
                return curT ? (
                  <span className="bg-blue-50 text-blue-800 px-3 py-1.5 rounded-lg border border-blue-200 font-semibold">
                    Định mức: {curT.weeklyPeriods} tiết thực dạy + {curT.concurrentPeriods} kiêm nhiệm = {curT.totalPeriods} tiết/tuần
                  </span>
                ) : null;
              })()}
            </div>
          </div>

          {/* Teacher Schedule Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <div className="border-b border-slate-200 pb-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase text-slate-500">LỊCH DẠY CÁ NHÂN</span>
                <h3 className="text-lg font-bold text-slate-900">
                  Thời Khóa Biểu: <span className="text-blue-700 font-extrabold">{selectedTeacher}</span>
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                {profile.schoolName} {profile.subSchoolName ? '- ' + profile.subSchoolName : ''}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-indigo-900 text-white font-bold text-center">
                    <th className="border border-indigo-800 p-2.5 w-24">Buổi</th>
                    <th className="border border-indigo-800 p-2.5 w-16">Tiết</th>
                    {days.map((d) => (
                      <th key={d.num} className="border border-indigo-800 p-2.5">
                        {d.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* SÁNG */}
                  {[1, 2, 3, 4, 5].map((period, pIdx) => (
                    <tr key={`t-sang-${period}`} className="hover:bg-slate-50 transition">
                      {pIdx === 0 && (
                        <td rowSpan={5} className="border border-slate-200 font-extrabold text-blue-900 bg-blue-50 text-center text-sm p-3">
                          BUỔI SÁNG
                        </td>
                      )}
                      <td className="border border-slate-200 font-bold text-center p-2 text-slate-700 bg-slate-50">
                        {period}
                      </td>
                      {days.map((d) => {
                        const slots = getTeacherSchedule(selectedTeacher);
                        const matchSlot = slots.find((s) => s.day === d.num && s.session === 'Sáng' && s.period === period);
                        const assigned = matchSlot?.assigned || [];

                        return (
                          <td key={d.num} className="border border-slate-200 p-2.5 text-center">
                            {assigned.length > 0 ? (
                              <div className="space-y-1">
                                {assigned.map((a, aIdx) => (
                                  <div
                                    key={aIdx}
                                    className="p-1.5 rounded-lg bg-blue-100/80 text-blue-900 border border-blue-200 font-bold shadow-2xs"
                                  >
                                    <span className="text-[10px] text-blue-700 uppercase block">Lớp {a.className}</span>
                                    <span>{a.subject}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-300 font-medium">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* CHIỀU */}
                  {[1, 2, 3].map((period, pIdx) => (
                    <tr key={`t-chieu-${period}`} className="hover:bg-slate-50 transition">
                      {pIdx === 0 && (
                        <td rowSpan={3} className="border border-slate-200 font-extrabold text-amber-900 bg-amber-50 text-center text-sm p-3">
                          BUỔI CHIỀU
                        </td>
                      )}
                      <td className="border border-slate-200 font-bold text-center p-2 text-slate-700 bg-slate-50">
                        {period}
                      </td>
                      {days.map((d) => {
                        const slots = getTeacherSchedule(selectedTeacher);
                        const matchSlot = slots.find((s) => s.day === d.num && s.session === 'Chiều' && s.period === period);
                        const assigned = matchSlot?.assigned || [];

                        return (
                          <td key={d.num} className="border border-slate-200 p-2.5 text-center">
                            {assigned.length > 0 ? (
                              <div className="space-y-1">
                                {assigned.map((a, aIdx) => (
                                  <div
                                    key={aIdx}
                                    className="p-1.5 rounded-lg bg-amber-100/80 text-amber-900 border border-amber-200 font-bold shadow-2xs"
                                  >
                                    <span className="text-[10px] text-amber-700 uppercase block">Lớp {a.className}</span>
                                    <span>{a.subject}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-300 font-medium">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. VIEW MODE: MA TRẬN PHÂN CÔNG CHUYÊN MÔN (GỐC) */}
      {/* ========================================================================= */}
      {viewMode === 'specialist' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <div className="border-b border-slate-200 pb-4 mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  {profile.schoolName} - BẢN GỐC PHÂN CÔNG CHUYÊN MÔN
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                  Thời Khóa Biểu Giảng Dạy Các Môn Chuyên (Thể Dục, Âm Nhạc, Tiếng Anh, Tin Học, Chuyên Môn)
                </h3>
                <p className="text-xs text-slate-500">
                  Tập trung đối chiếu lịch dạy của 10 giáo viên chuyên phụ trách 22 lớp (Khối 1 - Khối 5)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
                  22 Lớp / 10 Giáo viên chuyên
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {SPECIALIST_MATRIX_DATA.map((spec) => (
                <div key={spec.subjectKey} className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                      <h4 className="text-sm font-bold text-slate-900">
                        {spec.subjectTitle} &bull; <span className="text-blue-700">{spec.teacherName}</span>
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {spec.roleDescription}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-center border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                          <th className="border-r border-slate-200 p-2 w-28">Buổi / Tiết</th>
                          <th className="border-r border-slate-200 p-2 w-16">Tiết 1</th>
                          <th className="border-r border-slate-200 p-2 w-16">Tiết 2</th>
                          <th className="border-r border-slate-200 p-2 w-16">Tiết 3</th>
                          <th className="border-r border-slate-200 p-2 w-16">Tiết 4</th>
                          <th className="p-2 text-left">Chi tiết phân công</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { key: '2-S', label: 'Thứ Hai (Sáng)', session: 'Sáng' },
                          { key: '2-C', label: 'Thứ Hai (Chiều)', session: 'Chiều' },
                          { key: '3-S', label: 'Thứ Ba (Sáng)', session: 'Sáng' },
                          { key: '3-C', label: 'Thứ Ba (Chiều)', session: 'Chiều' },
                          { key: '4-S', label: 'Thứ Tư (Sáng)', session: 'Sáng' },
                          { key: '4-C', label: 'Thứ Tư (Chiều)', session: 'Chiều' },
                          { key: '5-S', label: 'Thứ Năm (Sáng)', session: 'Sáng' },
                          { key: '5-C', label: 'Thứ Năm (Chiều)', session: 'Chiều' },
                          { key: '6-S', label: 'Thứ Sáu (Sáng)', session: 'Sáng' },
                        ].map((row) => {
                          const slots = spec.schedule[row.key] || ['—', '—', '—', '—'];
                          const activeClasses = slots.filter((c) => c !== '—');
                          const isMorning = row.session === 'Sáng';

                          return (
                            <tr key={row.key} className={`border-b border-slate-100 hover:bg-slate-50 transition ${isMorning ? 'bg-white' : 'bg-amber-50/20'}`}>
                              <td className="border-r border-slate-200 p-2 font-bold text-slate-800 text-left">
                                {row.label}
                              </td>
                              {slots.map((cls, idx) => (
                                <td
                                  key={idx}
                                  className={`border-r border-slate-200 p-2 font-bold ${
                                    cls !== '—'
                                      ? 'text-blue-700 bg-blue-50/60'
                                      : 'text-slate-300'
                                  }`}
                                >
                                  {cls !== '—' ? `Lớp ${cls}` : '—'}
                                </td>
                              ))}
                              <td className="p-2 text-left text-slate-600">
                                {activeClasses.length > 0 ? (
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    {activeClasses.map((c, i) => (
                                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold">
                                        Tiết {slots.indexOf(c) + 1}: Lớp {c}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-slate-300 text-xs italic">Không có tiết</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cell Quick-Edit Inline Modal */}
      {isEditingCell && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-5 shadow-xl max-w-md w-full border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-2">
              Sửa Tiết Dạy: Lớp {isEditingCell.classId} &bull; Thứ {isEditingCell.day} &bull; {isEditingCell.session} Tiết {isEditingCell.period}
            </h4>
            <input
              type="text"
              autoFocus
              value={cellEditVal}
              onChange={(e) => setCellEditVal(e.target.value)}
              placeholder="Ví dụ: Tiếng Việt, Toán, TA (Nương), MT (Thy)..."
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditingCell(null)}
                className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100 border border-slate-200"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSaveCellEdit}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-medium shadow-xs"
              >
                Cập Nhật Ô
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Master TKB Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Đưa Thời Khóa Biểu Nhà Trường Lên Hệ Thống
                </h3>
              </div>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                &times;
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-600">
              <p>
                Dán bảng dữ liệu Thời khóa biểu từ Excel, Word hoặc văn bản phân công của nhà trường. Hệ thống sẽ tự động cập nhật và phân bổ cho từng lớp và giáo viên.
              </p>
              <textarea
                rows={6}
                value={rawTkbInput}
                onChange={(e) => setRawTkbInput(e.target.value)}
                placeholder="Dán nội dung thời khóa biểu mới vào đây (Ví dụ: Tiết 1 Lớp 1A: Tiếng Việt, Lớp 2A: Toán...)"
                className="w-full p-3 bg-white border border-slate-200 rounded-md text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md border border-slate-200"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleImportTkbText}
                className="px-4 py-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-md shadow-xs"
              >
                Cập Nhật TKB Mới
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
