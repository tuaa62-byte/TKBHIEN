import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Shield,
  Heart,
  Cpu,
  Globe,
  Apple,
  Search,
  BookOpen,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { INTEGRATION_LOOKUP_TABLE } from '../data/defaultData';
import { SchoolProfile } from '../types';

interface IntegrationMatrixViewProps {
  profile: SchoolProfile;
  onApplyToLesson?: (topic: any) => void;
}

export const IntegrationMatrixView: React.FC<IntegrationMatrixViewProps> = ({
  profile,
  onApplyToLesson,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(profile.grade || 2);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Tất Cả Nội Dung', icon: Layers },
    { id: 'NLS', label: 'Năng Lực Số (CV 3456)', icon: Globe },
    { id: 'AI', label: 'Trí Tuệ Nhân Tạo (AI TT 02)', icon: Cpu },
    { id: 'QCN', label: 'Quyền Con Người', icon: Heart },
    { id: 'KNS', label: 'Kỹ Năng Sống', icon: Sparkles },
    { id: 'GDQPAN', label: 'GD Quốc Phòng - An Ninh (TT 08)', icon: Shield },
    { id: 'DinhDuong', label: 'Giáo Dục Dinh Dưỡng', icon: Apple },
  ];

  const filteredTopics = INTEGRATION_LOOKUP_TABLE.filter((item) => {
    const matchGrade = selectedGrade === 0 || item.grade === selectedGrade;
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      !searchTerm ||
      item.lessonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.targetRequirement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.suggestedActivity.toLowerCase().includes(searchTerm.toLowerCase());
    return matchGrade && matchCategory;
  });

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-md bg-slate-100 text-slate-700">
                <Layers className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Ngân Hàng Tích Hợp Liên Môn & Địa Chỉ Giáo Dục
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Căn cứ các văn bản chỉ đạo của Bộ GD&ĐT: CV 3456/BGDĐT-GDPT (Năng lực số), TT 02/2025/TT-BGDĐT (Khung AI), TT 08/2024/TT-BGDĐT (GDQPAN), Quyền con người, KNS, Dinh dưỡng học đường và tài liệu tham khảo từ <strong className="text-slate-900">tailieugiaoduc.edu.vn</strong> & <strong className="text-slate-900">hoc10.vn</strong>.
            </p>
          </div>

          <a
            href="https://tailieugiaoduc.edu.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-md text-xs font-medium border border-slate-200 transition shrink-0 self-start md:self-auto"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>Xem tailieugiaoduc.edu.vn</span>
          </a>
        </div>

        {/* Grade Selector (1, 2, 3, 4, 5) */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-slate-700 mr-2 shrink-0">Khối Lớp:</span>
            {[1, 2, 3, 4, 5].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition shrink-0 border ${
                  selectedGrade === g
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                Khối {g}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm kiếm nội dung tích hợp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Badges */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Integration Reference Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  Khối {item.grade} &bull; {item.subject}
                </span>
                {item.code && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    {item.code}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Tuần {item.week}</span>
            </div>

            <h4 className="text-sm font-bold text-slate-900">{item.lessonName}</h4>

            <div className="text-xs text-slate-700 space-y-2 bg-slate-50 p-3 rounded-md border border-slate-200">
              <p>
                <strong className="text-slate-900">🎯 Yêu cầu cần đạt:</strong> {item.targetRequirement}
              </p>
              <p>
                <strong className="text-slate-900">💡 Gợi ý hoạt động dạy học:</strong> {item.suggestedActivity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
