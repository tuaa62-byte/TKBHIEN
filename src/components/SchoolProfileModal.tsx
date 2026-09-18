import React, { useState } from 'react';
import { X, Check, School, User, Calendar, BookOpen, Layers } from 'lucide-react';
import { SchoolProfile } from '../types';
import { TEACHER_PRESETS } from '../data/defaultData';
import { calculateWeekDates, isSpecialistTeacher } from '../utils/scheduleGenerator';

interface SchoolProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: SchoolProfile;
  onSave: (updated: SchoolProfile) => void;
}

export const SchoolProfileModal: React.FC<SchoolProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState<SchoolProfile>(profile);

  React.useEffect(() => {
    if (isOpen) {
      setFormData(profile);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handlePresetSelect = (presetProfile: Partial<SchoolProfile>) => {
    const updated = {
      ...formData,
      ...presetProfile,
    };
    // Tự động tính toán ngày cho tuần
    const dates = calculateWeekDates(updated.weekNumber || 1, '07/09/2026');
    updated.startDate = dates.startDate;
    updated.endDate = dates.endDate;
    setFormData(updated);
  };

  const handleGradeChange = (gradeNum: number) => {
    setFormData((prev) => ({
      ...prev,
      grade: gradeNum,
      className: `${gradeNum}.1`,
    }));
  };

  const handleWeekChange = (w: number) => {
    const dates = calculateWeekDates(w, '07/09/2026');
    setFormData((prev) => ({
      ...prev,
      weekNumber: w,
      startDate: dates.startDate,
      endDate: dates.endDate,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 border border-slate-200 text-slate-800 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-md bg-slate-100 text-slate-700">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Thiết Lập Thông Tin Giáo Viên, Trường & Lớp
              </h3>
              <p className="text-xs text-slate-500">
                Đồng bộ tự động Lịch báo giảng & Kế hoạch bài dạy theo tuần học
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mt-4">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Chọn nhanh hồ sơ mẫu của trường (GVCN & Giáo Viên Chuyên):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {TEACHER_PRESETS.map((preset, idx) => {
              const isSelected =
                formData.teacherName === preset.profile.teacherName &&
                (preset.profile.role === 'GVBM' || formData.className === preset.profile.className);

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePresetSelect(preset.profile)}
                  className={`text-left p-2.5 rounded-md border text-xs transition flex items-center justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <span className="truncate pr-1">{preset.label}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-blue-600 shrink-0 ml-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Grade Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Khối Lớp Giảng Dạy:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleGradeChange(g)}
                  className={`py-2 px-3 rounded-md font-semibold text-xs transition border ${
                    formData.grade === g
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Khối {g}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Tên Giáo Viên:
              </label>
              <input
                type="text"
                required
                value={formData.teacherName}
                onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                placeholder="Ví dụ: Cao Thị Khánh Linh / Đặng Huỳnh Mai Nương"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Vai Trò Giảng Dạy:
              </label>
              <select
                value={formData.role || 'GVCN'}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="GVCN">Giáo Viên Chủ Nhiệm (GVCN)</option>
                <option value="GVBM">Giáo Viên Bộ Môn / Chuyên (GVBM)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Lớp Học (Chủ nhiệm / Mẫu):
              </label>
              <input
                type="text"
                required
                value={formData.className}
                onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                placeholder="Ví dụ: 2A, 2B, 3A, 5A..."
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Tuần Học Thứ (1 - 35):
              </label>
              <input
                type="number"
                min="1"
                max="35"
                value={formData.weekNumber}
                onChange={(e) => handleWeekChange(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-blue-700"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Tên Trường Tiểu Học:
              </label>
              <input
                type="text"
                required
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                placeholder="Trường Tiểu Học Tân Thạnh"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Phân Hiệu:
              </label>
              <input
                type="text"
                required
                value={formData.subSchoolName}
                onChange={(e) => setFormData({ ...formData, subSchoolName: e.target.value })}
                placeholder="Phân Hiệu Kiến Bình"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Phòng / Sở GD&ĐT:
              </label>
              <input
                type="text"
                value={formData.departmentName}
                onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
                placeholder="Phòng GD&ĐT Huyện Tân Thạnh"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Năm Học:
              </label>
              <input
                type="text"
                value={formData.schoolYear}
                onChange={(e) => setFormData({ ...formData, schoolYear: e.target.value })}
                placeholder="2026 - 2027"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Khoảng Thời Gian (Tự động cập nhật theo Tuần {formData.weekNumber}):
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  placeholder="07/09/2026"
                  className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  placeholder="11/09/2026"
                  className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md border border-slate-200 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-md shadow-xs transition"
            >
              Lưu & Đồng Bộ Toàn Hệ Thống
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
