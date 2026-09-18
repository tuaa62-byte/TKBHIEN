import { SchoolProfile, TeacherAssignment, KHBDLesson, IntegrationTopic, TKBEntry } from '../types';

export const DEFAULT_SCHOOL_PROFILE: SchoolProfile = {
  schoolName: 'Trường Tiểu Học Mỹ Lạc',
  subSchoolName: '',
  departmentName: 'Phòng GD&ĐT Huyện Thủ Thừa',
  teacherName: 'Phạm Thị Hiền',
  role: 'GVCN',
  grade: 4,
  className: '4.2',
  weekNumber: 1,
  schoolYear: '2026 - 2027',
  startDate: '07/09/2026',
  endDate: '11/09/2026',
};

export const TEACHER_PRESETS: { label: string; profile: Partial<SchoolProfile> }[] = [
  {
    label: 'Cô Phạm Thị Hiền (GVCN Lớp 4.2 - Trường Tiểu Học Mỹ Lạc)',
    profile: {
      teacherName: 'Phạm Thị Hiền',
      grade: 4,
      className: '4.2',
      role: 'GVCN',
      schoolName: 'Trường Tiểu Học Mỹ Lạc',
      subSchoolName: '',
      departmentName: 'Phòng GD&ĐT Huyện Thủ Thừa',
      weekNumber: 1,
      schoolYear: '2026 - 2027',
      startDate: '07/09/2026',
      endDate: '11/09/2026',
    },
  },
  {
    label: 'Thầy Bình (GV Chuyên Giáo dục thể chất)',
    profile: {
      teacherName: 'Bình',
      grade: 4,
      className: '4.2',
      role: 'GVBM',
      specialistSubject: 'Giáo dục thể chất',
      schoolName: 'Trường Tiểu Học Mỹ Lạc',
      subSchoolName: '',
      departmentName: 'Phòng GD&ĐT Huyện Thủ Thừa',
      weekNumber: 1,
      schoolYear: '2026 - 2027',
      startDate: '07/09/2026',
      endDate: '11/09/2026',
    },
  },
  {
    label: 'Thầy Toàn (GV Chuyên GDTC & Kiêm nhiệm)',
    profile: {
      teacherName: 'Toàn',
      grade: 4,
      className: '4.3',
      role: 'GVBM',
      specialistSubject: 'Giáo dục thể chất',
      schoolName: 'Trường Tiểu Học Mỹ Lạc',
      subSchoolName: '',
      departmentName: 'Phòng GD&ĐT Huyện Thủ Thừa',
      weekNumber: 1,
      schoolYear: '2026 - 2027',
      startDate: '07/09/2026',
      endDate: '11/09/2026',
    },
  },
  {
    label: 'Thầy Thắng (GV Chuyên Âm nhạc)',
    profile: {
      teacherName: 'Thắng',
      grade: 4,
      className: '4.2',
      role: 'GVBM',
      specialistSubject: 'Âm nhạc',
      schoolName: 'Trường Tiểu Học Mỹ Lạc',
      subSchoolName: '',
      departmentName: 'Phòng GD&ĐT Huyện Thủ Thừa',
      weekNumber: 1,
      schoolYear: '2026 - 2027',
      startDate: '07/09/2026',
      endDate: '11/09/2026',
    },
  },
  {
    label: 'Cô Trinh (GV Chuyên Âm nhạc)',
    profile: {
      teacherName: 'Trinh',
      grade: 3,
      className: '3.1',
      role: 'GVBM',
      specialistSubject: 'Âm nhạc',
      schoolName: 'Trường Tiểu Học Mỹ Lạc',
      subSchoolName: '',
      departmentName: 'Phòng GD&ĐT Huyện Thủ Thừa',
      weekNumber: 1,
      schoolYear: '2026 - 2027',
      startDate: '07/09/2026',
      endDate: '11/09/2026',
    },
  },
  {
    label: 'Cô Duyên (GV Chuyên Tiếng Anh - Lớp 4.2, 4.1, 4.3...)',
    profile: {
      teacherName: 'Duyên',
      grade: 4,
      className: '4.2',
      role: 'GVBM',
      specialistSubject: 'Tiếng Anh',
      schoolName: 'Trường Tiểu Học Mỹ Lạc',
      subSchoolName: '',
      departmentName: 'Phòng GD&ĐT Huyện Thủ Thừa',
      weekNumber: 1,
      schoolYear: '2026 - 2027',
      startDate: '07/09/2026',
      endDate: '11/09/2026',
    },
  },
  {
    label: 'Cô Hảo (GV Chuyên Tiếng Anh)',
    profile: {
      teacherName: 'Hảo',
      grade: 4,
      className: '4.4',
      role: 'GVBM',
      specialistSubject: 'Tiếng Anh',
      schoolName: 'Trường Tiểu Học Mỹ Lạc',
      subSchoolName: '',
      departmentName: 'Phòng GD&ĐT Huyện Thủ Thừa',
      weekNumber: 1,
      schoolYear: '2026 - 2027',
      startDate: '07/09/2026',
      endDate: '11/09/2026',
    },
  },
  {
    label: 'Cô Chi (GV Chuyên Tiếng Anh)',
    profile: {
      teacherName: 'Chi',
      grade: 5,
      className: '5.1',
      role: 'GVBM',
      specialistSubject: 'Tiếng Anh',
      schoolName: 'Trường Tiểu Học Mỹ Lạc',
      subSchoolName: '',
      departmentName: 'Phòng GD&ĐT Huyện Thủ Thừa',
      weekNumber: 1,
      schoolYear: '2026 - 2027',
      startDate: '07/09/2026',
      endDate: '11/09/2026',
    },
  },
  {
    label: 'Thầy Nhớ (GV Chuyên Tin học & Công nghệ - Lớp 4.2...)',
    profile: {
      teacherName: 'Nhớ',
      grade: 4,
      className: '4.2',
      role: 'GVBM',
      specialistSubject: 'Tin học & Công nghệ',
      schoolName: 'Trường Tiểu Học Mỹ Lạc',
      subSchoolName: '',
      departmentName: 'Phòng GD&ĐT Huyện Thủ Thừa',
      weekNumber: 1,
      schoolYear: '2026 - 2027',
      startDate: '07/09/2026',
      endDate: '11/09/2026',
    },
  },
  {
    label: 'Cô Chương (GV Chuyên Tin học & Công nghệ)',
    profile: {
      teacherName: 'Chương',
      grade: 3,
      className: '3.2',
      role: 'GVBM',
      specialistSubject: 'Tin học & Công nghệ',
      schoolName: 'Trường Tiểu Học Mỹ Lạc',
      subSchoolName: '',
      departmentName: 'Phòng GD&ĐT Huyện Thủ Thừa',
      weekNumber: 1,
      schoolYear: '2026 - 2027',
      startDate: '07/09/2026',
      endDate: '11/09/2026',
    },
  },
  {
    label: 'Thầy Hơn (GV Chuyên Môn)',
    profile: {
      teacherName: 'Hơn',
      grade: 2,
      className: '2.1',
      role: 'GVBM',
      specialistSubject: 'Chuyên môn',
      schoolName: 'Trường Tiểu Học Mỹ Lạc',
      subSchoolName: '',
      departmentName: 'Phòng GD&ĐT Huyện Thủ Thừa',
      weekNumber: 1,
      schoolYear: '2026 - 2027',
      startDate: '07/09/2026',
      endDate: '11/09/2026',
    },
  },
  {
    label: 'Cô GVCN Lớp 4.1 (Khối 4)',
    profile: {
      teacherName: 'GVCN Lớp 4.1',
      grade: 4,
      className: '4.1',
      role: 'GVCN',
      schoolName: 'Trường Tiểu Học Mỹ Lạc',
      subSchoolName: '',
      departmentName: 'Phòng GD&ĐT Huyện Thủ Thừa',
      weekNumber: 1,
      schoolYear: '2026 - 2027',
      startDate: '07/09/2026',
      endDate: '11/09/2026',
    },
  },
];

export const TEACHERS_LIST: TeacherAssignment[] = [
  { id: 't-hien', name: 'Phạm Thị Hiền', role: 'GVCN Lớp 4.2', assignedClass: '4.2', weeklyPeriods: 20, concurrentPeriods: 3, totalPeriods: 23, deltaPeriods: 0 },
  { id: 't-binh', name: 'Bình', role: 'GV Chuyên Giáo dục thể chất', weeklyPeriods: 20, concurrentPeriods: 2, totalPeriods: 22, deltaPeriods: -1 },
  { id: 't-toan', name: 'Toàn', role: 'GV Chuyên GDTC & Kiêm nhiệm', weeklyPeriods: 22, concurrentPeriods: 2, totalPeriods: 24, deltaPeriods: 1 },
  { id: 't-thang', name: 'Thắng', role: 'GV Chuyên Âm nhạc', weeklyPeriods: 19, concurrentPeriods: 2, totalPeriods: 21, deltaPeriods: -2 },
  { id: 't-trinh', name: 'Trinh', role: 'GV Chuyên Âm nhạc', weeklyPeriods: 20, concurrentPeriods: 2, totalPeriods: 22, deltaPeriods: -1 },
  { id: 't-duyen', name: 'Duyên', role: 'GV Chuyên Tiếng Anh (Khối 3, 4)', weeklyPeriods: 22, concurrentPeriods: 1, totalPeriods: 23, deltaPeriods: 0 },
  { id: 't-hao', name: 'Hảo', role: 'GV Chuyên Tiếng Anh (Khối 4, 5)', weeklyPeriods: 21, concurrentPeriods: 2, totalPeriods: 23, deltaPeriods: 0 },
  { id: 't-chi', name: 'Chi', role: 'GV Chuyên Tiếng Anh (Khối 1, 2, 5)', weeklyPeriods: 22, concurrentPeriods: 1, totalPeriods: 23, deltaPeriods: 0 },
  { id: 't-nho', name: 'Nhớ', role: 'GV Chuyên Tin học & Công nghệ', weeklyPeriods: 21, concurrentPeriods: 2, totalPeriods: 23, deltaPeriods: 0 },
  { id: 't-chuong', name: 'Chương', role: 'GV Chuyên Tin học & Công nghệ', weeklyPeriods: 22, concurrentPeriods: 1, totalPeriods: 23, deltaPeriods: 0 },
  { id: 't-hon', name: 'Hơn', role: 'GV Chuyên Môn', weeklyPeriods: 16, concurrentPeriods: 4, totalPeriods: 20, deltaPeriods: -3 },
  { id: 't-gvcn-41', name: 'Nguyễn Thị Loan', role: 'GVCN Lớp 4.1', assignedClass: '4.1', weeklyPeriods: 20, concurrentPeriods: 3, totalPeriods: 23, deltaPeriods: 0 },
  { id: 't-gvcn-43', name: 'Trần Thị Mai', role: 'GVCN Lớp 4.3', assignedClass: '4.3', weeklyPeriods: 20, concurrentPeriods: 3, totalPeriods: 23, deltaPeriods: 0 },
  { id: 't-gvcn-44', name: 'Lê Hoàng Nam', role: 'GVCN Lớp 4.4', assignedClass: '4.4', weeklyPeriods: 20, concurrentPeriods: 3, totalPeriods: 23, deltaPeriods: 0 },
  { id: 't-gvcn-45', name: 'Võ Thị Bích', role: 'GVCN Lớp 4.5', assignedClass: '4.5', weeklyPeriods: 20, concurrentPeriods: 3, totalPeriods: 23, deltaPeriods: 0 },
];

export const MY_LAC_CLASSES = [
  '1.1', '1.2', '1.3', '1.4',
  '2.1', '2.2', '2.3', '2.4',
  '3.1', '3.2', '3.3', '3.4',
  '4.1', '4.2', '4.3', '4.4', '4.5',
  '5.1', '5.2', '5.3', '5.4', '5.5'
];

export interface SpecialistMatrixRow {
  subjectKey: string;
  subjectTitle: string;
  teacherName: string;
  roleDescription: string;
  colorClass: string;
  schedule: Record<string, string[]>; // key: '2-S', '2-C', '3-S', '3-C', '4-S', '4-C', '5-S', '5-C', '6-S' -> array of 4 periods
}

export const SPECIALIST_MATRIX_DATA: SpecialistMatrixRow[] = [
  {
    subjectKey: 'MT',
    subjectTitle: 'Mĩ thuật',
    teacherName: 'GV Mĩ thuật',
    roleDescription: 'Phụ trách môn Mĩ thuật toàn trường',
    colorClass: 'bg-pink-50 border-pink-200 text-pink-900',
    schedule: {
      '2-S': ['—', '—', '—', '—'],
      '2-C': ['—', '—', '—', '—'],
      '3-S': ['—', '—', '—', '—'],
      '3-C': ['—', '—', '4.3', '—'],
      '4-S': ['4.4', '4.5', '—', '—'],
      '4-C': ['4.2', '—', '4.1', '—'],
      '5-S': ['—', '—', '—', '—'],
      '5-C': ['—', '—', '—', '—'],
      '6-S': ['—', '—', '—', '—'],
    },
  },
  {
    subjectKey: 'TD-Binh',
    subjectTitle: 'Thể dục',
    teacherName: 'Thầy Bình',
    roleDescription: 'Phụ trách GDTC Khối 1, 3, 4, 5',
    colorClass: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    schedule: {
      '2-S': ['—', '—', '—', '—'],
      '2-C': ['4.5', '3.4', '1.4', '—'],
      '3-S': ['4.1', '4.2', '—', '—'],
      '3-C': ['5.1', '1.1', '5.4', '—'],
      '4-S': ['4.1', '—', '4.2', '—'],
      '4-C': ['—', '—', '—', '—'],
      '5-S': ['—', '4.4', '—', '—'],
      '5-C': ['2.4', '5.5', '5.5', '—'],
      '6-S': ['—', '—', '4.5', '—'],
    },
  },
  {
    subjectKey: 'TD-Toan',
    subjectTitle: 'Thể dục & Chuyên',
    teacherName: 'Thầy Toàn',
    roleDescription: 'Phụ trách GDTC Khối 1, 2, 3, 4, 5',
    colorClass: 'bg-teal-50 border-teal-200 text-teal-900',
    schedule: {
      '2-S': ['—', '—', '—', '—'],
      '2-C': ['4.3', '3.2', '3.3', '—'],
      '3-S': ['—', '—', '—', '—'],
      '3-C': ['2.1', '4.3', '5.3', '—'],
      '4-S': ['—', '—', '—', '—'],
      '4-C': ['2.3', '5.2', '3.1', '—'],
      '5-S': ['—', '—', '—', '—'],
      '5-C': ['2.2', '1.2', '1.3', '—'],
      '6-S': ['5.5', '1.4', '3.4', '2.4'],
    },
  },
  {
    subjectKey: 'AN-Thang',
    subjectTitle: 'Âm nhạc',
    teacherName: 'Thầy Thắng',
    roleDescription: 'Phụ trách Âm nhạc Khối 1, 2, 4',
    colorClass: 'bg-purple-50 border-purple-200 text-purple-900',
    schedule: {
      '2-S': ['—', '—', '—', '—'],
      '2-C': ['2.1', '4.3', '4.3', '—'],
      '3-S': ['—', '2.3', '2.2', '—'],
      '3-C': ['4.1', '1.2', '1.2', '—'],
      '4-S': ['—', '4.1', '—', '4.2'],
      '4-C': ['1.4', '2.4', '4.4', '—'],
      '5-S': ['—', '—', '4.2', '4.2'],
      '5-C': ['—', '—', '—', '—'],
      '6-S': ['4.5', '4.5', '4.4', '—'],
    },
  },
  {
    subjectKey: 'AN-Trinh',
    subjectTitle: 'Âm nhạc',
    teacherName: 'Cô Trinh',
    roleDescription: 'Phụ trách Âm nhạc Khối 1, 3, 5',
    colorClass: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-900',
    schedule: {
      '2-S': ['—', '—', '—', '—'],
      '2-C': ['3.1', '5.2', '3.4', '—'],
      '3-S': ['5.5', '5.4', '5.3', '—'],
      '3-C': ['3.3', '1.3', '1.3', '—'],
      '4-S': ['3.2', '5.1', '1.1', '—'],
      '4-C': ['5.1', '1.1', '5.4', '—'],
      '5-S': ['5.5', '3.4', '3.3', '3.2'],
      '5-C': ['5.3', '3.1', '5.2', '—'],
      '6-S': ['—', '—', '—', '—'],
    },
  },
  {
    subjectKey: 'TA-Hao',
    subjectTitle: 'Tiếng Anh',
    teacherName: 'Cô Hảo',
    roleDescription: 'Phụ trách Tiếng Anh Khối 3, 4, 5',
    colorClass: 'bg-blue-50 border-blue-200 text-blue-900',
    schedule: {
      '2-S': ['—', '—', '—', '—'],
      '2-C': ['—', '—', '—', '—'],
      '3-S': ['4.5', '4.5', '—', '—'],
      '3-C': ['4.4', '4.4', '—', '—'],
      '4-S': ['—', '—', '4.5', '4.5'],
      '4-C': ['3.4', '3.4', '5.4', '—'],
      '5-S': ['5.2', '5.2', '3.1', '3.1'],
      '5-C': ['5.5', '5.5', '2.4', '—'],
      '6-S': ['4.4', '4.4', '5.4', '3.4'],
    },
  },
  {
    subjectKey: 'TA-Chi',
    subjectTitle: 'Tiếng Anh',
    teacherName: 'Cô Chi',
    roleDescription: 'Phụ trách Tiếng Anh Khối 1, 2, 3, 5',
    colorClass: 'bg-sky-50 border-sky-200 text-sky-900',
    schedule: {
      '2-S': ['—', '—', '—', '—'],
      '2-C': ['5.3', '5.3', '—', '—'],
      '3-S': ['5.1', '5.1', '—', '—'],
      '3-C': ['2.1', '2.1', '3.1', '—'],
      '4-S': ['2.2', '2.2', '5.3', '5.3'],
      '4-C': ['1.1', '1.1', '2.3', '—'],
      '5-S': ['5.1', '5.1', '—', '—'],
      '5-C': ['5.2', '5.2', '2.3', '—'],
      '6-S': ['1.4', '1.4', '3.1', '3.1'],
    },
  },
  {
    subjectKey: 'TA-Duyen',
    subjectTitle: 'Tiếng Anh',
    teacherName: 'Cô Duyên',
    roleDescription: 'Phụ trách Tiếng Anh Khối 1, 3, 4 (Bao gồm Lớp 4.2)',
    colorClass: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    schedule: {
      '2-S': ['—', '—', '—', '—'],
      '2-C': ['3.3', '3.3', '—', '—'],
      '3-S': ['—', '—', '4.2', '4.2'],
      '3-C': ['1.3', '1.3', '4.1', '—'],
      '4-S': ['3.2', '3.2', '—', '—'],
      '4-C': ['—', '4.2', '4.2', '—'],
      '5-S': ['4.1', '4.1', '4.3', '4.3'],
      '5-C': ['1.2', '1.2', '3.3', '—'],
      '6-S': ['4.3', '4.3', '3.2', '3.2'],
    },
  },
  {
    subjectKey: 'TH-Nho',
    subjectTitle: 'Tin học & Công nghệ',
    teacherName: 'Thầy Nhớ',
    roleDescription: 'Phụ trách Tin học & Công nghệ Khối 1, 4, 5',
    colorClass: 'bg-amber-50 border-amber-200 text-amber-900',
    schedule: {
      '2-S': ['—', '—', '—', '—'],
      '2-C': ['—', '4.5', '4.5', '—'],
      '3-S': ['4.2', '4.1', '—', '—'],
      '3-C': ['1.1', '5.1', '4.3', '—'],
      '4-S': ['—', '4.2', '4.1', '—'],
      '4-C': ['4.4', '4.4', '1.3', '—'],
      '5-S': ['5.2', '5.2', '—', '—'],
      '5-C': ['5.1', '4.3', '—', '—'],
      '6-S': ['1.2', '1.2', '1.4', '1.4'],
    },
  },
  {
    subjectKey: 'TH-Chuong',
    subjectTitle: 'Tin học & Công nghệ',
    teacherName: 'Cô Chương',
    roleDescription: 'Phụ trách Tin học & Công nghệ Khối 1, 2, 3, 5',
    colorClass: 'bg-orange-50 border-orange-200 text-orange-900',
    schedule: {
      '2-S': ['—', '—', '—', '—'],
      '2-C': ['2.3', '1.2', '1.2', '—'],
      '3-S': ['3.2', '5.3', '5.4', '—'],
      '3-C': ['3.4', '2.4', '2.4', '—'],
      '4-S': ['5.5', '5.5', '—', '—'],
      '4-C': ['3.1', '3.3', '5.3', '—'],
      '5-S': ['2.1', '2.2', '—', '—'],
      '5-C': ['5.4', '5.4', '5.5', '—'],
      '6-S': ['3.1', '3.3', '3.2', '3.4'],
    },
  },
  {
    subjectKey: 'CHUYEN-Hon',
    subjectTitle: 'Chuyên Môn',
    teacherName: 'Thầy Hơn',
    roleDescription: 'Phụ trách Chuyên môn Khối 1, 2',
    colorClass: 'bg-rose-50 border-rose-200 text-rose-900',
    schedule: {
      '2-S': ['—', '—', '—', '—'],
      '2-C': ['2.2', '2.2', '—', '—'],
      '3-S': ['2.3', '—', '—', '—'],
      '3-C': ['—', '1.1', '1.1', '—'],
      '4-S': ['2.4', '2.4', '—', '—'],
      '4-C': ['—', '1.4', '1.4', '—'],
      '5-S': ['—', '2.1', '2.1', '—'],
      '5-C': ['1.3', '1.3', '—', '—'],
      '6-S': ['—', '—', '1.2', '1.2'],
    },
  },
];

export interface MasterScheduleSlot {
  day: number; // 2 -> 6
  session: 'Sáng' | 'Chiều';
  period: number; // 1 -> 4
  classes: Record<string, string>; // classId -> "Môn (GV)"
}

// Master Schedule cho 22 lớp của Trường Tiểu Học Mỹ Lạc
export const MASTER_SCHEDULE_DATA: MasterScheduleSlot[] = [
  // ==================== THỨ HAI - SÁNG ====================
  {
    day: 2, session: 'Sáng', period: 1,
    classes: { ...Object.fromEntries(MY_LAC_CLASSES.map((c) => [c, 'HĐTN (CC)'])), '4.2': 'HĐTN' }
  },
  {
    day: 2, session: 'Sáng', period: 2,
    classes: { ...Object.fromEntries(MY_LAC_CLASSES.map((c) => [c, 'Tiếng Việt'])), '4.2': 'Toán' }
  },
  {
    day: 2, session: 'Sáng', period: 3,
    classes: { ...Object.fromEntries(MY_LAC_CLASSES.map((c) => [c, 'Tiếng Việt'])), '4.2': 'Tiếng Việt' }
  },
  {
    day: 2, session: 'Sáng', period: 4,
    classes: { ...Object.fromEntries(MY_LAC_CLASSES.map((c) => [c, 'Toán'])), '4.2': 'Tiếng Việt' }
  },

  // ==================== THỨ HAI - CHIỀU ====================
  {
    day: 2, session: 'Chiều', period: 1,
    classes: {
      '1.1': 'Tiếng Việt', '1.2': 'Tiếng Việt', '1.3': 'Tiếng Việt', '1.4': 'Tiếng Việt',
      '2.1': 'ÂN (Thắng)', '2.2': 'Chuyên (Hơn)', '2.3': 'TH (Chương)', '2.4': 'Tiếng Việt',
      '3.1': 'ÂN (Trinh)', '3.2': 'Tiếng Việt', '3.3': 'TA (Duyên)', '3.4': 'Toán',
      '4.1': 'Tiếng Việt', '4.2': 'Khoa học', '4.3': 'TD (Toàn)', '4.4': 'Khoa học', '4.5': 'TD (Bình)',
      '5.1': 'Khoa học', '5.2': 'Khoa học', '5.3': 'TA (Chi)', '5.4': 'Tiếng Việt', '5.5': 'Toán'
    }
  },
  {
    day: 2, session: 'Chiều', period: 2,
    classes: {
      '1.1': 'Toán', '1.2': 'TH (Chương)', '1.3': 'Toán', '1.4': 'Tiếng Việt',
      '2.1': 'Tiếng Việt', '2.2': 'Chuyên (Hơn)', '2.3': 'Tiếng Việt', '2.4': 'Toán',
      '3.1': 'Toán', '3.2': 'TD (Toàn)', '3.3': 'TA (Duyên)', '3.4': 'TD (Bình)',
      '4.1': 'Toán', '4.2': 'Lịch sử & ĐL', '4.3': 'ÂN (Thắng)', '4.4': 'Lịch sử & ĐL', '4.5': 'TH (Nhớ)',
      '5.1': 'Tiếng Việt', '5.2': 'ÂN (Trinh)', '5.3': 'TA (Chi)', '5.4': 'Toán', '5.5': 'Khoa học'
    }
  },
  {
    day: 2, session: 'Chiều', period: 3,
    classes: {
      '1.1': 'TNXH', '1.2': 'TH (Chương)', '1.3': 'Đạo đức', '1.4': 'TD (Bình)',
      '2.1': 'Đạo đức', '2.2': 'Toán', '2.3': 'Đạo đức', '2.4': 'HĐTN',
      '3.1': 'Tin học', '3.2': 'TD (Toàn)', '3.3': 'Đạo đức', '3.4': 'ÂN (Trinh)',
      '4.1': 'Đạo đức', '4.2': 'Tiếng Việt', '4.3': 'ÂN (Thắng)', '4.4': 'Đạo đức', '4.5': 'TH (Nhớ)',
      '5.1': 'Lịch sử & ĐL', '5.2': 'Đạo đức', '5.3': 'Lịch sử & ĐL', '5.4': 'HĐTN', '5.5': 'Đạo đức'
    }
  },

  // ==================== THỨ BA - SÁNG ====================
  {
    day: 3, session: 'Sáng', period: 1,
    classes: {
      '1.1': 'Toán', '1.2': 'Toán', '1.3': 'Tiếng Việt', '1.4': 'Toán',
      '2.1': 'Toán', '2.2': 'Tiếng Việt', '2.3': 'Chuyên (Hơn)', '2.4': 'Toán',
      '3.1': 'Tiếng Việt', '3.2': 'TH (Chương)', '3.3': 'Toán', '3.4': 'Tiếng Việt',
      '4.1': 'TD (Bình)', '4.2': 'Tin học (Nhớ)', '4.3': 'Toán', '4.4': 'Tiếng Việt', '4.5': 'TA (Hảo)',
      '5.1': 'TA (Chi)', '5.2': 'Toán', '5.3': 'Tiếng Việt', '5.4': 'Toán', '5.5': 'ÂN (Trinh)'
    }
  },
  {
    day: 3, session: 'Sáng', period: 2,
    classes: {
      '1.1': 'Tiếng Việt', '1.2': 'Tiếng Việt', '1.3': 'Toán', '1.4': 'Tiếng Việt',
      '2.1': 'Tiếng Việt', '2.2': 'Toán', '2.3': 'ÂN (Thắng)', '2.4': 'Tiếng Việt',
      '3.1': 'Toán', '3.2': 'Tiếng Việt', '3.3': 'Tiếng Việt', '3.4': 'Toán',
      '4.1': 'TH (Nhớ)', '4.2': 'GDTC (Bình)', '4.3': 'Tiếng Việt', '4.4': 'Toán', '4.5': 'TA (Hảo)',
      '5.1': 'TA (Chi)', '5.2': 'Tiếng Việt', '5.3': 'TH (Chương)', '5.4': 'ÂN (Trinh)', '5.5': 'Toán'
    }
  },
  {
    day: 3, session: 'Sáng', period: 3,
    classes: {
      '1.1': 'Tiếng Việt', '1.2': 'Toán', '1.3': 'Tiếng Việt', '1.4': 'Tiếng Việt',
      '2.1': 'Toán', '2.2': 'ÂN (Thắng)', '2.3': 'Tiếng Việt', '2.4': 'Tiếng Việt',
      '3.1': 'Tiếng Việt', '3.2': 'Toán', '3.3': 'Tiếng Việt', '3.4': 'Tiếng Việt',
      '4.1': 'Tiếng Việt', '4.2': 'TA (Duyên)', '4.3': 'Toán', '4.4': 'Khoa học', '4.5': 'Toán',
      '5.1': 'Toán', '5.2': 'Khoa học', '5.3': 'ÂN (Trinh)', '5.4': 'TH (Chương)', '5.5': 'Tiếng Việt'
    }
  },
  {
    day: 3, session: 'Sáng', period: 4,
    classes: {
      '1.1': 'HĐTN', '1.2': 'HĐTN', '1.3': 'HĐTN', '1.4': 'HĐTN',
      '2.1': 'HĐTN', '2.2': 'HĐTN', '2.3': 'HĐTN', '2.4': 'HĐTN',
      '3.1': 'HĐTN', '3.2': 'HĐTN', '3.3': 'HĐTN', '3.4': 'HĐTN',
      '4.1': 'Toán', '4.2': 'TA (Duyên)', '4.3': 'Khoa học', '4.4': 'Tiếng Việt', '4.5': 'Khoa học',
      '5.1': 'Tiếng Việt', '5.2': 'Toán', '5.3': 'Toán', '5.4': 'Tiếng Việt', '5.5': 'Lịch sử & ĐL'
    }
  },

  // ==================== THỨ BA - CHIỀU ====================
  {
    day: 3, session: 'Chiều', period: 1,
    classes: {
      '1.1': 'TH (Nhớ)', '1.2': 'Tiếng Việt', '1.3': 'TA (Duyên)', '1.4': 'Tiếng Việt',
      '2.1': 'TD (Toàn)', '2.2': 'Tiếng Việt', '2.3': 'Toán', '2.4': 'Tiếng Việt',
      '3.1': 'Tiếng Việt', '3.2': 'Toán', '3.3': 'ÂN (Trinh)', '3.4': 'TH (Chương)',
      '4.1': 'ÂN (Thắng)', '4.2': 'Tiếng Việt', '4.3': 'TH (Nhớ)', '4.4': 'TA (Hảo)', '4.5': 'Tiếng Việt',
      '5.1': 'TD (Bình)', '5.2': 'Tiếng Việt', '5.3': 'Toán', '5.4': 'Tiếng Việt', '5.5': 'Khoa học'
    }
  },
  {
    day: 3, session: 'Chiều', period: 2,
    classes: {
      '1.1': 'Chuyên (Hơn)', '1.2': 'ÂN (Thắng)', '1.3': 'TA (Duyên)', '1.4': 'Toán',
      '2.1': 'TA (Chi)', '2.2': 'Toán', '2.3': 'Tiếng Việt', '2.4': 'TH (Chương)',
      '3.1': 'Toán', '3.2': 'Tiếng Việt', '3.3': 'Tiếng Việt', '3.4': 'Tiếng Việt',
      '4.1': 'Toán', '4.2': 'Toán', '4.3': 'TD (Toàn)', '4.4': 'TA (Hảo)', '4.5': 'Toán',
      '5.1': 'TH (Nhớ)', '5.2': 'Toán', '5.3': 'Tiếng Việt', '5.4': 'Tiếng Việt', '5.5': 'Tiếng Việt'
    }
  },
  {
    day: 3, session: 'Chiều', period: 3,
    classes: {
      '1.1': 'Chuyên (Hơn)', '1.2': 'ÂN (Thắng)', '1.3': 'ÂN (Trinh)', '1.4': 'HĐTN',
      '2.1': 'TA (Chi)', '2.2': 'HĐTN', '2.3': 'HĐTN', '2.4': 'TH (Chương)',
      '3.1': 'TA (Chi)', '3.2': 'HĐTN', '3.3': 'ÂN (Trinh)', '3.4': 'HĐTN',
      '4.1': 'TA (Duyên)', '4.2': 'Khoa học', '4.3': 'MT (Chuyên)', '4.4': 'TD (Bình)', '4.5': 'HĐTN',
      '5.1': 'HĐTN', '5.2': 'HĐTN', '5.3': 'TD (Toàn)', '5.4': 'TD (Bình)', '5.5': 'HĐTN'
    }
  },

  // ==================== THỨ TƯ - SÁNG ====================
  {
    day: 4, session: 'Sáng', period: 1,
    classes: {
      '1.1': 'Tiếng Việt', '1.2': 'Tiếng Việt', '1.3': 'Toán', '1.4': 'Toán',
      '2.1': 'Toán', '2.2': 'TA (Chi)', '2.3': 'Toán', '2.4': 'Chuyên (Hơn)',
      '3.1': 'Toán', '3.2': 'TA (Duyên)', '3.3': 'Toán', '3.4': 'Tiếng Việt',
      '4.1': 'TD (Bình)', '4.2': 'Tiếng Việt', '4.3': 'Tiếng Việt', '4.4': 'MT (Chuyên)', '4.5': 'Tiếng Việt',
      '5.1': 'Toán', '5.2': 'Tiếng Việt', '5.3': 'Toán', '5.4': 'Tiếng Việt', '5.5': 'TH (Chương)'
    }
  },
  {
    day: 4, session: 'Sáng', period: 2,
    classes: {
      '1.1': 'Tiếng Việt', '1.2': 'Toán', '1.3': 'Tiếng Việt', '1.4': 'Tiếng Việt',
      '2.1': 'Tiếng Việt', '2.2': 'TA (Chi)', '2.3': 'Tiếng Việt', '2.4': 'Chuyên (Hơn)',
      '3.1': 'Tiếng Việt', '3.2': 'TA (Duyên)', '3.3': 'Tiếng Việt', '3.4': 'Toán',
      '4.1': 'ÂN (Thắng)', '4.2': 'Toán', '4.3': 'Toán', '4.4': 'Toán', '4.5': 'MT (Chuyên)',
      '5.1': 'ÂN (Trinh)', '5.2': 'Toán', '5.3': 'Tiếng Việt', '5.4': 'Toán', '5.5': 'TH (Chương)'
    }
  },
  {
    day: 4, session: 'Sáng', period: 3,
    classes: {
      '1.1': 'ÂN (Trinh)', '1.2': 'Tiếng Việt', '1.3': 'Tiếng Việt', '1.4': 'Tiếng Việt',
      '2.1': 'Toán', '2.2': 'Tiếng Việt', '2.3': 'Toán', '2.4': 'Tiếng Việt',
      '3.1': 'Tiếng Việt', '3.2': 'Tiếng Việt', '3.3': 'Toán', '3.4': 'Tiếng Việt',
      '4.1': 'TH (Nhớ)', '4.2': 'GDTC (Bình)', '4.3': 'ÂN (Thắng)', '4.4': 'Tiếng Việt', '4.5': 'TA (Hảo)',
      '5.1': 'Tiếng Việt', '5.2': 'Khoa học', '5.3': 'TA (Chi)', '5.4': 'Khoa học', '5.5': 'Toán'
    }
  },
  {
    day: 4, session: 'Sáng', period: 4,
    classes: {
      '1.1': 'Toán', '1.2': 'Tiếng Việt', '1.3': 'Toán', '1.4': 'Toán',
      '2.1': 'Tiếng Việt', '2.2': 'Toán', '2.3': 'Tiếng Việt', '2.4': 'Toán',
      '3.1': 'Toán', '3.2': 'Tiếng Việt', '3.3': 'Tiếng Việt', '3.4': 'Toán',
      '4.1': 'Toán', '4.2': 'Công nghệ (Nhớ)', '4.3': 'TH (Nhớ)', '4.4': 'Toán', '4.5': 'TA (Hảo)',
      '5.1': 'Khoa học', '5.2': 'Tiếng Việt', '5.3': 'TA (Chi)', '5.4': 'Lịch sử & ĐL', '5.5': 'Tiếng Việt'
    }
  },

  // ==================== THỨ TƯ - CHIỀU ====================
  {
    day: 4, session: 'Chiều', period: 1,
    classes: {
      '1.1': 'TA (Chi)', '1.2': 'Tiếng Việt', '1.3': 'Toán', '1.4': 'ÂN (Thắng)',
      '2.1': 'Tiếng Việt', '2.2': 'Toán', '2.3': 'TD (Toàn)', '2.4': 'Tiếng Việt',
      '3.1': 'TH (Chương)', '3.2': 'Tiếng Việt', '3.3': 'Toán', '3.4': 'TA (Hảo)',
      '4.1': 'Tiếng Việt', '4.2': 'MT (Chuyên)', '4.3': 'Tiếng Việt', '4.4': 'TH (Nhớ)', '4.5': 'Tiếng Việt',
      '5.1': 'ÂN (Trinh)', '5.2': 'Toán', '5.3': 'Tiếng Việt', '5.4': 'Toán', '5.5': 'Tiếng Việt'
    }
  },
  {
    day: 4, session: 'Chiều', period: 2,
    classes: {
      '1.1': 'TA (Chi)', '1.2': 'Toán', '1.3': 'Tiếng Việt', '1.4': 'Chuyên (Hơn)',
      '2.1': 'Toán', '2.2': 'Tiếng Việt', '2.3': 'Tiếng Việt', '2.4': 'ÂN (Thắng)',
      '3.1': 'Tiếng Việt', '3.2': 'Toán', '3.3': 'TH (Chương)', '3.4': 'TA (Hảo)',
      '4.1': 'Toán', '4.2': 'TA (Duyên)', '4.3': 'Toán', '4.4': 'TH (Nhớ)', '4.5': 'Toán',
      '5.1': 'Tiếng Việt', '5.2': 'TD (Toàn)', '5.3': 'Toán', '5.4': 'Tiếng Việt', '5.5': 'Lịch sử & ĐL'
    }
  },
  {
    day: 4, session: 'Chiều', period: 3,
    classes: {
      '1.1': 'TNXH', '1.2': 'HĐTN', '1.3': 'TH (Nhớ)', '1.4': 'Chuyên (Hơn)',
      '2.1': 'HĐTN', '2.2': 'Đạo đức', '2.3': 'TA (Chi)', '2.4': 'Đạo đức',
      '3.1': 'TD (Toàn)', '3.2': 'Đạo đức', '3.3': 'Đạo đức', '3.4': 'HĐTN',
      '4.1': 'MT (Chuyên)', '4.2': 'TA (Duyên)', '4.3': 'Đạo đức', '4.4': 'ÂN (Thắng)', '4.5': 'Đạo đức',
      '5.1': 'Đạo đức', '5.2': 'Đạo đức', '5.3': 'TH (Chương)', '5.4': 'TA (Hảo)', '5.5': 'HĐTN'
    }
  },

  // ==================== THỨ NĂM - SÁNG ====================
  {
    day: 5, session: 'Sáng', period: 1,
    classes: {
      '1.1': 'Tiếng Việt', '1.2': 'Tiếng Việt', '1.3': 'Toán', '1.4': 'Toán',
      '2.1': 'TH (Chương)', '2.2': 'Toán', '2.3': 'Tiếng Việt', '2.4': 'Toán',
      '3.1': 'Toán', '3.2': 'Tiếng Việt', '3.3': 'Toán', '3.4': 'Tiếng Việt',
      '4.1': 'TA (Duyên)', '4.2': 'Toán', '4.3': 'Tiếng Việt', '4.4': 'Toán', '4.5': 'Tiếng Việt',
      '5.1': 'TA (Chi)', '5.2': 'TA (Hảo)', '5.3': 'Tiếng Việt', '5.4': 'Toán', '5.5': 'ÂN (Trinh)'
    }
  },
  {
    day: 5, session: 'Sáng', period: 2,
    classes: {
      '1.1': 'Tiếng Việt', '1.2': 'Toán', '1.3': 'Tiếng Việt', '1.4': 'Tiếng Việt',
      '2.1': 'Chuyên (Hơn)', '2.2': 'TH (Chương)', '2.3': 'Toán', '2.4': 'Tiếng Việt',
      '3.1': 'Tiếng Việt', '3.2': 'Toán', '3.3': 'Tiếng Việt', '3.4': 'ÂN (Trinh)',
      '4.1': 'TA (Duyên)', '4.2': 'Đạo đức (Chuyên)', '4.3': 'Toán', '4.4': 'TD (Bình)', '4.5': 'Toán',
      '5.1': 'TA (Chi)', '5.2': 'TA (Hảo)', '5.3': 'Toán', '5.4': 'Tiếng Việt', '5.5': 'Khoa học'
    }
  },
  {
    day: 5, session: 'Sáng', period: 3,
    classes: {
      '1.1': 'Toán', '1.2': 'Tiếng Việt', '1.3': 'Tiếng Việt', '1.4': 'Tiếng Việt',
      '2.1': 'Chuyên (Hơn)', '2.2': 'Tiếng Việt', '2.3': 'Tiếng Việt', '2.4': 'Toán',
      '3.1': 'TA (Hảo)', '3.2': 'Tiếng Việt', '3.3': 'ÂN (Trinh)', '3.4': 'Toán',
      '4.1': 'Toán', '4.2': 'ÂN (Thắng)', '4.3': 'TA (Duyên)', '4.4': 'Tiếng Việt', '4.5': 'Khoa học',
      '5.1': 'Khoa học', '5.2': 'TH (Nhớ)', '5.3': 'Khoa học', '5.4': 'Khoa học', '5.5': 'Tiếng Việt'
    }
  },
  {
    day: 5, session: 'Sáng', period: 4,
    classes: {
      '1.1': 'Toán', '1.2': 'Toán', '1.3': 'HĐTN', '1.4': 'HĐTN',
      '2.1': 'HĐTN', '2.2': 'HĐTN', '2.3': 'HĐTN', '2.4': 'HĐTN',
      '3.1': 'TA (Hảo)', '3.2': 'ÂN (Trinh)', '3.3': 'Tiếng Việt', '3.4': 'Tiếng Việt',
      '4.1': 'Tiếng Việt', '4.2': 'ÂN (Thắng)', '4.3': 'TA (Duyên)', '4.4': 'Khoa học', '4.5': 'Tiếng Việt',
      '5.1': 'Toán', '5.2': 'TH (Nhớ)', '5.3': 'Tiếng Việt', '5.4': 'Toán', '5.5': 'Lịch sử & ĐL'
    }
  },

  // ==================== THỨ NĂM - CHIỀU ====================
  {
    day: 5, session: 'Chiều', period: 1,
    classes: {
      '1.1': 'Tiếng Việt', '1.2': 'TA (Duyên)', '1.3': 'Chuyên (Hơn)', '1.4': 'Tiếng Việt',
      '2.1': 'Toán', '2.2': 'TD (Toàn)', '2.3': 'Tiếng Việt', '2.4': 'TD (Bình)',
      '3.1': 'Tiếng Việt', '3.2': 'Toán', '3.3': 'Tiếng Việt', '3.4': 'Tiếng Việt',
      '4.1': 'LS&ĐL', '4.2': 'Tiếng Việt', '4.3': 'Khoa học', '4.4': 'Tiếng Việt', '4.5': 'Tiếng Việt',
      '5.1': 'TH (Nhớ)', '5.2': 'TA (Chi)', '5.3': 'ÂN (Trinh)', '5.4': 'TH (Chương)', '5.5': 'TA (Hảo)'
    }
  },
  {
    day: 5, session: 'Chiều', period: 2,
    classes: {
      '1.1': 'Toán', '1.2': 'TA (Duyên)', '1.3': 'Chuyên (Hơn)', '1.4': 'Toán',
      '2.1': 'Tiếng Việt', '2.2': 'Toán', '2.3': 'Toán', '2.4': 'Tiếng Việt',
      '3.1': 'ÂN (Trinh)', '3.2': 'Tiếng Việt', '3.3': 'Toán', '3.4': 'Toán',
      '4.1': 'Đạo đức', '4.2': 'Tiếng Việt', '4.3': 'TH (Nhớ)', '4.4': 'Toán', '4.5': 'LS&ĐL',
      '5.1': 'Tiếng Việt', '5.2': 'TA (Chi)', '5.3': 'Tiếng Việt', '5.4': 'TH (Chương)', '5.5': 'TA (Hảo)'
    }
  },
  {
    day: 5, session: 'Chiều', period: 3,
    classes: {
      '1.1': 'HĐTN', '1.2': 'TD (Toàn)', '1.3': 'TD (Toàn)', '1.4': 'HĐTN',
      '2.1': 'Đạo đức', '2.2': 'HĐTN', '2.3': 'TA (Chi)', '2.4': 'TA (Hảo)',
      '3.1': 'HĐTN', '3.2': 'HĐTN', '3.3': 'TA (Duyên)', '3.4': 'HĐTN',
      '4.1': 'Khoa học', '4.2': 'HĐTN', '4.3': 'HĐTN', '4.4': 'HĐTN', '4.5': 'HĐTN',
      '5.1': 'HĐTN', '5.2': 'ÂN (Trinh)', '5.3': 'HĐTN', '5.4': 'HĐTN', '5.5': 'TH (Chương)'
    }
  },

  // ==================== THỨ SÁU - SÁNG ====================
  {
    day: 6, session: 'Sáng', period: 1,
    classes: {
      '1.1': 'Tiếng Việt', '1.2': 'TH (Nhớ)', '1.3': 'Tiếng Việt', '1.4': 'TA (Chi)',
      '2.1': 'Tiếng Việt', '2.2': 'Toán', '2.3': 'Tiếng Việt', '2.4': 'Tiếng Việt',
      '3.1': 'TH (Chương)', '3.2': 'Tiếng Việt', '3.3': 'Toán', '3.4': 'Tiếng Việt',
      '4.1': 'Tiếng Việt', '4.2': 'Toán', '4.3': 'TA (Duyên)', '4.4': 'TA (Hảo)', '4.5': 'ÂN (Thắng)',
      '5.1': 'Toán', '5.2': 'Tiếng Việt', '5.3': 'Toán', '5.4': 'Tiếng Việt', '5.5': 'TD (Toàn)'
    }
  },
  {
    day: 6, session: 'Sáng', period: 2,
    classes: {
      '1.1': 'Toán', '1.2': 'TH (Nhớ)', '1.3': 'Toán', '1.4': 'TA (Chi)',
      '2.1': 'Toán', '2.2': 'Tiếng Việt', '2.3': 'Toán', '2.4': 'Toán',
      '3.1': 'Toán', '3.2': 'Tiếng Việt', '3.3': 'TH (Chương)', '3.4': 'Toán',
      '4.1': 'Toán', '4.2': 'Lịch sử & ĐL', '4.3': 'TA (Duyên)', '4.4': 'TA (Hảo)', '4.5': 'ÂN (Thắng)',
      '5.1': 'Tiếng Việt', '5.2': 'Toán', '5.3': 'Tiếng Việt', '5.4': 'Toán', '5.5': 'Tiếng Việt'
    }
  },
  {
    day: 6, session: 'Sáng', period: 3,
    classes: {
      '1.1': 'Tiếng Việt', '1.2': 'Chuyên (Hơn)', '1.3': 'Tiếng Việt', '1.4': 'TH (Nhớ)',
      '2.1': 'Tiếng Việt', '2.2': 'Tiếng Việt', '2.3': 'Tiếng Việt', '2.4': 'TD (Toàn)',
      '3.1': 'TA (Chi)', '3.2': 'TH (Chương)', '3.3': 'Tiếng Việt', '3.4': 'TD (Toàn)',
      '4.1': 'Tiếng Việt', '4.2': 'HĐTN (SHL)', '4.3': 'LS&ĐL', '4.4': 'ÂN (Thắng)', '4.5': 'TD (Bình)',
      '5.1': 'Tiếng Việt', '5.2': 'Tiếng Việt', '5.3': 'Tiếng Việt', '5.4': 'TA (Hảo)', '5.5': 'Tiếng Việt'
    }
  },
  {
    day: 6, session: 'Sáng', period: 4,
    classes: {
      '1.1': 'HĐTN (SHL)', '1.2': 'Chuyên (Hơn)', '1.3': 'HĐTN (SHL)', '1.4': 'TH (Nhớ)',
      '2.1': 'HĐTN (SHL)', '2.2': 'HĐTN (SHL)', '2.3': 'HĐTN (SHL)', '2.4': 'HĐTN (SHL)',
      '3.1': 'TA (Chi)', '3.2': 'TA (Duyên)', '3.3': 'HĐTN (SHL)', '3.4': 'TH (Chương)',
      '4.1': 'HĐTN (SHL)', '4.2': '', '4.3': 'HĐTN (SHL)', '4.4': 'HĐTN (SHL)', '4.5': 'HĐTN (SHL)',
      '5.1': 'HĐTN (SHL)', '5.2': 'HĐTN (SHL)', '5.3': 'HĐTN (SHL)', '5.4': 'HĐTN (SHL)', '5.5': 'HĐTN (SHL)'
    }
  },
];

// LBG chuẩn 31 tiết/tuần cho Lớp 4.2 - Trường Tiểu Học Mỹ Lạc (Tuần 1: 07/09/2026 - 11/09/2026)
// GVCN (Cô Phạm Thị Hiền): 19 tiết (Toán, Tiếng Việt, Khoa học, Lịch sử & ĐL, HĐTN)
// GV Chuyên biệt: 12 tiết (Tin học, GDTC, Tiếng Anh, Công nghệ, Mĩ thuật, Đạo đức, Âm nhạc)
export const DEFAULT_LBG_ENTRIES: TKBEntry[] = [
  // THỨ HAI (07/09/2026)
  { id: 'lbg-2-1', day: 2, session: 'Sáng', period: 1, subject: 'Hoạt động trải nghiệm', ppctLesson: 1, lessonTitle: 'Sinh hoạt dưới cờ: Khai giảng năm học mới', integration: '' },
  { id: 'lbg-2-2', day: 2, session: 'Sáng', period: 2, subject: 'Toán', ppctLesson: 1, lessonTitle: 'Bài 1: Ôn tập các số đến 100 000 (Tiết 1)', integration: '' },
  { id: 'lbg-2-3', day: 2, session: 'Sáng', period: 3, subject: 'Tiếng Việt (Đọc)', ppctLesson: 1, lessonTitle: 'Bài 1: Chân trời tuổi thơ (Tuổi Ngựa - Tiết 1)', integration: '' },
  { id: 'lbg-2-4', day: 2, session: 'Sáng', period: 4, subject: 'Tiếng Việt (Viết)', ppctLesson: 2, lessonTitle: 'Bài 1: Lập dàn ý cho bài văn kể chuyện', integration: '' },
  { id: 'lbg-2-5', day: 2, session: 'Chiều', period: 1, subject: 'Khoa học', ppctLesson: 1, lessonTitle: 'Bài 1: Một số tính chất và vai trò của nước (Tiết 1)', integration: '' },
  { id: 'lbg-2-6', day: 2, session: 'Chiều', period: 2, subject: 'Lịch sử và Địa lí', ppctLesson: 1, lessonTitle: 'Bài 1: Làm quen với phương tiện học tập lịch sử và địa lí (Tiết 1)', integration: '' },
  { id: 'lbg-2-7', day: 2, session: 'Chiều', period: 3, subject: 'Tiếng Việt (LTVC)', ppctLesson: 3, lessonTitle: 'Bài 1: Danh từ (Tiết 1)', integration: '' },

  // THỨ BA (08/09/2026)
  { id: 'lbg-3-1', day: 3, session: 'Sáng', period: 1, subject: 'Tin học', ppctLesson: 1, lessonTitle: 'Bài 1: Phần cứng và phần mềm máy tính (Tiết 1)', teacher: 'Nhớ', isSpecialist: true, integration: '' },
  { id: 'lbg-3-2', day: 3, session: 'Sáng', period: 2, subject: 'Giáo dục thể chất', ppctLesson: 1, lessonTitle: 'Bài 1: Đội hình đội ngũ - Động tác quay và dóng hàng', teacher: 'Bình', isSpecialist: true, integration: '' },
  { id: 'lbg-3-3', day: 3, session: 'Sáng', period: 3, subject: 'Tiếng Anh', ppctLesson: 1, lessonTitle: 'Unit 1: My Friends - Lesson 1', teacher: 'Duyên', isSpecialist: true, integration: '' },
  { id: 'lbg-3-4', day: 3, session: 'Sáng', period: 4, subject: 'Tiếng Anh', ppctLesson: 2, lessonTitle: 'Unit 1: My Friends - Lesson 2', teacher: 'Duyên', isSpecialist: true, integration: '' },
  { id: 'lbg-3-5', day: 3, session: 'Chiều', period: 1, subject: 'Tiếng Việt (Đọc)', ppctLesson: 4, lessonTitle: 'Bài 2: Sáng tháng Năm (Tiết 1)', integration: '' },
  { id: 'lbg-3-6', day: 3, session: 'Chiều', period: 2, subject: 'Toán', ppctLesson: 2, lessonTitle: 'Bài 1: Ôn tập các số đến 100 000 (Tiết 2)', integration: '' },
  { id: 'lbg-3-7', day: 3, session: 'Chiều', period: 3, subject: 'Khoa học', ppctLesson: 2, lessonTitle: 'Bài 1: Một số tính chất và vai trò của nước (Tiết 2)', integration: '' },

  // THỨ TƯ (09/09/2026)
  { id: 'lbg-4-1', day: 4, session: 'Sáng', period: 1, subject: 'Tiếng Việt (Viết)', ppctLesson: 5, lessonTitle: 'Bài 2: Viết đoạn văn cho bài văn kể chuyện', integration: '' },
  { id: 'lbg-4-2', day: 4, session: 'Sáng', period: 2, subject: 'Toán', ppctLesson: 3, lessonTitle: 'Bài 2: Ôn tập các phép tính trong phạm vi 100 000 (Tiết 1)', integration: '' },
  { id: 'lbg-4-3', day: 4, session: 'Sáng', period: 3, subject: 'Giáo dục thể chất', ppctLesson: 2, lessonTitle: 'Bài 1: Đội hình đội ngũ - Tập hợp hàng dọc và dóng hàng', teacher: 'Bình', isSpecialist: true, integration: '' },
  { id: 'lbg-4-4', day: 4, session: 'Sáng', period: 4, subject: 'Công nghệ', ppctLesson: 1, lessonTitle: 'Bài 1: Hoa và cây cảnh quanh em (Tiết 1)', teacher: 'Nhớ', isSpecialist: true, integration: '' },
  { id: 'lbg-4-5', day: 4, session: 'Chiều', period: 1, subject: 'Mĩ thuật', ppctLesson: 1, lessonTitle: 'Chủ đề 1: Sắc màu em yêu - Bài 1: Màu sắc trong thiên nhiên', isSpecialist: true, integration: '' },
  { id: 'lbg-4-6', day: 4, session: 'Chiều', period: 2, subject: 'Tiếng Anh', ppctLesson: 3, lessonTitle: 'Unit 1: My Friends - Lesson 3', teacher: 'Duyên', isSpecialist: true, integration: '' },
  { id: 'lbg-4-7', day: 4, session: 'Chiều', period: 3, subject: 'Tiếng Anh', ppctLesson: 4, lessonTitle: 'Unit 1: My Friends - Lesson 4', teacher: 'Duyên', isSpecialist: true, integration: '' },

  // THỨ NĂM (10/09/2026)
  { id: 'lbg-5-1', day: 5, session: 'Sáng', period: 1, subject: 'Toán', ppctLesson: 4, lessonTitle: 'Bài 2: Ôn tập các phép tính trong phạm vi 100 000 (Tiết 2)', integration: '' },
  { id: 'lbg-5-2', day: 5, session: 'Sáng', period: 2, subject: 'Đạo đức', ppctLesson: 1, lessonTitle: 'Bài 1: Biết ơn người lao động (Tiết 1)', teacher: 'Chuyên', isSpecialist: true, integration: '' },
  { id: 'lbg-5-3', day: 5, session: 'Sáng', period: 3, subject: 'Âm nhạc', ppctLesson: 1, lessonTitle: 'Chủ đề 1: Khởi hành mùa tựu trường - Học hát', teacher: 'Thắng', isSpecialist: true, integration: '' },
  { id: 'lbg-5-4', day: 5, session: 'Sáng', period: 4, subject: 'Âm nhạc', ppctLesson: 2, lessonTitle: 'Chủ đề 1: Nhạc cụ gõ và rèn luyện tiết tấu', teacher: 'Thắng', isSpecialist: true, integration: '' },
  { id: 'lbg-5-5', day: 5, session: 'Chiều', period: 1, subject: 'Tiếng Việt (LTVC)', ppctLesson: 6, lessonTitle: 'Bài 2: Danh từ chung, danh từ riêng', integration: '' },
  { id: 'lbg-5-6', day: 5, session: 'Chiều', period: 2, subject: 'Tiếng Việt (Đọc mở rộng)', ppctLesson: 7, lessonTitle: 'Bài 2: Sinh hoạt câu lạc bộ đọc sách', integration: '' },
  { id: 'lbg-5-7', day: 5, session: 'Chiều', period: 3, subject: 'Hoạt động trải nghiệm', ppctLesson: 2, lessonTitle: 'Hoạt động giáo dục: Bầu ban cán sự và xây dựng nội quy lớp 4.2', integration: '' },

  // THỨ SÁU (11/09/2026)
  { id: 'lbg-6-1', day: 6, session: 'Sáng', period: 1, subject: 'Toán', ppctLesson: 5, lessonTitle: 'Bài 3: Luyện tập chung (Tiết 1)', integration: '' },
  { id: 'lbg-6-2', day: 6, session: 'Sáng', period: 2, subject: 'Lịch sử và Địa lí', ppctLesson: 2, lessonTitle: 'Bài 1: Làm quen với phương tiện học tập lịch sử và địa lí (Tiết 2)', integration: '' },
  { id: 'lbg-6-3', day: 6, session: 'Sáng', period: 3, subject: 'Hoạt động trải nghiệm', ppctLesson: 3, lessonTitle: 'Sinh hoạt lớp: Sơ kết tuần 1 và phương hướng tuần 2', integration: '' },
];

export const INITIAL_KHBD_DATABASE: KHBDLesson[] = [
  // LỚP 2A - TUẦN 1 (Cô Cao Thị Khánh Linh)
  {
    id: 'khbd-2a-t1-hdtn1',
    dayName: 'Thứ Hai',
    dateStr: '07/09/2026',
    session: 'Sáng',
    period: 1,
    subject: 'Hoạt động trải nghiệm',
    subType: 'Sinh hoạt dưới cờ',
    ppct: 1,
    lessonTitle: 'Sinh hoạt dưới cờ: LỄ KHAI GIẢNG NĂM HỌC MỚI',
    grade: 2,
    teacherName: 'Cao Thị Khánh Linh',
    className: '2A',
    specificCompetency: 'Học sinh nghiêm túc tham gia Lễ Khai giảng năm học mới, cảm nhận không khí trang nghiêm, phấn khởi bước vào năm học mới.',
    generalCompetency: 'Năng lực tự chủ, tự quản lí bản thân; năng lực giao tiếp và hợp tác tập thể trong ngày hội trường.',
    qualities: 'Nhân ái, trách nhiệm, lòng tự hào về mái trường mến yêu Tân Thạnh.',
    teacherEquipments: 'Loa đài, cờ Tổ quốc, hoa chúc mừng, thiết bị trình chiếu.',
    studentEquipments: 'Ghế ngồi cá nhân, trang phục chỉnh tề, cờ hoa cầm tay.',
    activities: {
      warmup: {
        title: '1. Khởi động',
        objective: 'Tập trung học sinh ngăn nắp, tạo tâm thế sẵn sàng cho buổi lễ.',
        teacherActivity: 'Tổ chức tập hợp học sinh lớp 2A xếp hàng dọc ngay ngắn.\nNhắc nhở HS chỉnh đốn trang phục, kiểm tra sĩ số lớp.',
        studentActivity: 'Di chuyển ra sân trường, xếp hàng thẳng thắn theo vị trí lớp 2A.\nChỉnh đốn trang phục, mũ nón nghiêm túc.',
        duration: '5 phút',
      },
      exploration: {
        title: '2. Khám phá',
        objective: 'Thực hiện nghi lễ chào cờ trang nghiêm và lắng nghe thư Chủ tịch nước.',
        teacherActivity: 'Điều hành nghi lễ Chào cờ, hát Quốc ca trang trọng.\nGiới thiệu đại biểu và Ban giám hiệu đọc thư của Chủ tịch nước.',
        studentActivity: 'Đứng trang nghiêm hướng về Quốc kỳ, hát vang bài Quốc ca tự hào.\nChăm chú lắng nghe đọc thư của Chủ tịch nước.',
        duration: '12 phút',
      },
      practice: {
        title: '3. Luyện tập',
        objective: 'Tham gia các hoạt động chào mừng và văn nghệ tập thể.',
        teacherActivity: 'Hướng dẫn HS nồng nhiệt cổ vũ các tiết mục văn nghệ chào mừng.\nTổ chức đón các em học sinh lớp 1 vào trường.\nTích hợp QCN: Tôn trọng quyền học tập, quyền được yêu thương của trẻ em.',
        studentActivity: 'Vỗ tay, reo hò cổ vũ các tiết mục của thầy cô và bạn bè.\nNhiệt tình vẫy cờ hoa chào đón các em học sinh lớp 1 vào năm học mới.',
        duration: '15 phút',
      },
      application: {
        title: '4. Vận dụng',
        objective: 'Khắc sâu quyết tâm học tập tốt năm học mới.',
        teacherActivity: 'Phát động phong trào thi đua tuần 1: \'Học sinh gương mẫu, chăm ngoan\'.\nDặn dò nề nếp xếp hàng và giữ vệ sinh sân trường.',
        studentActivity: 'Hô vang khẩu hiệu thể hiện sự quyết tâm thực hiện tốt thi đua.\nThu dọn ghế ngồi ngăn nắp, nhặt rác xung quanh vị trí ngồi.',
        duration: '5 phút',
      },
    },
    integrationNotes: {
      qcn: 'Quyền trẻ em: Quyền và nghĩa vụ học tập, rèn luyện tập thể.',
      kns: 'KNS: Kĩ năng tự quản lí, xếp hàng ngay ngắn, giữ nề nếp kỷ luật.',
    },
  },
  {
    id: 'khbd-2a-t1-tv1',
    dayName: 'Thứ Hai',
    dateStr: '07/09/2026',
    session: 'Sáng',
    period: 2,
    subject: 'Tiếng Việt',
    subType: 'Đọc (Tiết 1)',
    ppct: 1,
    lessonTitle: 'Đọc: TÔI LÀ HỌC SINH LỚP 2 (Tiết 1)',
    grade: 2,
    teacherName: 'Cao Thị Khánh Linh',
    className: '2A',
    specificCompetency: 'Đọc trôi chảy toàn bài, ngắt nghỉ hơi đúng dấu câu; hiểu nội dung bài đọc nói về niềm vui và sự tự tin của học sinh khi bước lên lớp 2.',
    generalCompetency: 'Năng lực tự chủ và tự học; năng lực giao tiếp ngôn ngữ rõ ràng, rành mạch khi chia sẻ cảm xúc.',
    qualities: 'Chăm chỉ học tập, bồi dưỡng tình cảm bạn bè thân ái, yêu trường mến lớp.',
    teacherEquipments: 'Sách giáo khoa Tiếng Việt 2, tranh minh họa bài đọc, slide câu dài cần ngắt nhịp.',
    studentEquipments: 'Sách giáo khoa Tiếng Việt 2, vở ghi chép.',
    activities: {
      warmup: {
        title: '1. Khởi động',
        objective: 'Tạo không khí vui tươi, kết nối niềm vui ngày đầu năm học mới.',
        teacherActivity: 'GV mở bài hát vui tươi \'Ngày đầu tiên đi học\'.\nHỏi: \'Hôm nay bước vào lớp 2, các em cảm thấy thế nào so với lớp 1?\' Dẫn dắt bài mới.',
        studentActivity: 'Hát và vỗ tay theo nhịp bài hát.\nHào hứng trả lời: Thấy mình lớn hơn, vui vẻ gặp lại thầy cô, bạn bè.',
        duration: '5 phút',
      },
      exploration: {
        title: '2. Khám phá',
        objective: 'Đọc đúng toàn bài, sửa lỗi phát âm và ngắt nghỉ câu dài chính xác.',
        teacherActivity: 'Đọc mẫu toàn bài dõng dạc, diễn cảm.\nHướng dẫn ngắt nghỉ hơi đúng dấu câu và các câu dài.\nHướng dẫn luyện đọc từ khó: khai trường, ngạc nhiên, tự tin, rụt rè.',
        studentActivity: 'Lắng nghe cô đọc mẫu, dùng tay dò từng dòng chữ trong SGK.\nNối tiếp nhau đọc từng câu, sửa phát âm từ khó theo hướng dẫn của GV.',
        duration: '15 phút',
      },
      practice: {
        title: '3. Luyện tập',
        objective: 'Luyện đọc đoạn trong nhóm và đọc hiểu nội dung cơ bản.',
        teacherActivity: 'Chia bài đọc thành 3 đoạn, tổ chức cho HS đọc nối tiếp đoạn theo nhóm đôi.\nTích hợp KNS: Giáo dục học sinh tình cảm quý mến bạn bè khi đến trường; biết chào hỏi, nói lời thân thiện, chúc bạn vui vẻ trong năm học mới.\nTổ chức trò chơi \'Tặng lời chúc cho bạn\', HS viết/nói lời chúc và đáp lại bằng lời cảm ơn.',
        studentActivity: 'Luyện đọc đoạn trong nhóm đôi, lắng nghe và góp ý sửa lỗi cho bạn.\nTham gia trò chơi tặng lời chúc thân thiện với bạn cùng bàn.',
        duration: '12 phút',
      },
      application: {
        title: '4. Vận dụng',
        objective: 'Khắc sâu niềm tự hào khi là học sinh lớp 2.',
        teacherActivity: 'Khuyến khích học sinh về nhà đọc diễn cảm bài đọc cho bố mẹ nghe.\nDặn dò chuẩn bị Tiết 2.',
        studentActivity: 'Ghi nhớ nhiệm vụ về nhà tự đọc bài trôi chảy.',
        duration: '3 phút',
      },
    },
    integrationNotes: {
      kns: 'Tích hợp KNS: Trò chơi giao tiếp, nói lời chào thân thiện trong năm học mới.',
    },
  },
  {
    id: 'khbd-2a-t1-toan1',
    dayName: 'Thứ Hai',
    dateStr: '07/09/2026',
    session: 'Sáng',
    period: 4,
    subject: 'Toán',
    subType: 'Luyện tập',
    ppct: 1,
    lessonTitle: 'Bài 1: ÔN TẬP CÁC SỐ ĐẾN 100 (TIẾT 1)',
    grade: 2,
    teacherName: 'Cao Thị Khánh Linh',
    className: '2A',
    specificCompetency: 'Học sinh đọc, viết, đếm và so sánh thành thạo các số trong phạm vi 100; nhận biết số liền trước, số liền sau.',
    generalCompetency: 'Năng lực tư duy logic và lập luận toán học; năng lực giải quyết vấn đề toán học thực tế.',
    qualities: 'Chăm chỉ, cẩn thận, yêu thích môn Toán.',
    teacherEquipments: 'Bảng số từ 1 đến 100, các thẻ số, bảng phụ trò chơi toán học.',
    studentEquipments: 'Bảng con, phấn, vở bài tập Toán 2.',
    activities: {
      warmup: {
        title: '1. Khởi động',
        objective: 'Tái hiện nhanh kĩ năng đếm số từ 1 đến 100.',
        teacherActivity: 'Tổ chức trò chơi \'Bắn tên đếm số\': GV hô bắn tên 1 bạn đếm tiếp từ 20 đến 30, bạn tiếp theo đếm tiếp...',
        studentActivity: 'Học sinh hào hứng tham gia đếm số tiếp sức to, rõ ràng.',
        duration: '5 phút',
      },
      exploration: {
        title: '2. Khám phá',
        objective: 'Hệ thống hóa cấu trúc số có hai chữ số trong phạm vi 100.',
        teacherActivity: 'Treo bảng số từ 1 đến 100 lên bảng lớp.\nHỏi: \'Các số ở cột cuối cùng có đặc điểm gì chung?\' (Số tròn chục).\nChỉ định một số và yêu cầu HS phân tích số chục, số đơn vị.',
        studentActivity: 'Quan sát bảng số, phát biểu: Các số tròn chục có chữ số tận cùng là 0.\nPhân tích ví dụ: Số 45 gồm 4 chục và 5 đơn vị.',
        duration: '10 phút',
      },
      practice: {
        title: '3. Luyện tập',
        objective: 'Thực hành làm các bài tập SGK về đọc viết và so sánh số.',
        teacherActivity: 'Hướng dẫn HS làm Bài 1, Bài 2, Bài 3 trong SGK vào vở.\nTích hợp học thông qua chơi (Bộ phận): Tổ chức trò chơi \'Tìm bạn mang số liền sau\' trên bảng tương tác.\nTích hợp NLS (1.3.CB1a): Nhận biết bảng số là nơi sắp xếp dữ liệu có cấu trúc.',
        studentActivity: 'Độc lập làm bài tập vào vở cá nhân.\nTham gia trò chơi chọn thẻ số gài bảng theo hiệu lệnh.',
        duration: '15 phút',
      },
      application: {
        title: '4. Vận dụng',
        objective: 'Ứng dụng số đếm vào cuộc sống hằng ngày.',
        teacherActivity: 'Giao tình huống: Đếm số học sinh trong tổ mình và so sánh tổ nào nhiều hơn.\nNhận xét, tuyên dương.',
        studentActivity: 'Đếm nhanh số lượng bạn và đưa ra câu so sánh chính xác.',
        duration: '5 phút',
      },
    },
    integrationNotes: {
      nls: 'Tích hợp NLS 1.3.CB1a: Nhận biết bảng số là cấu trúc dữ liệu cơ bản.',
      kns: 'Học thông qua chơi (Bộ phận): Củng cố đọc, viết và so sánh số tự nhiên.',
    },
  },
  // LỚP 5A - TUẦN 1 (Thầy Nguyễn Hoàng Tuấn)
  {
    id: 'khbd-5a-t1-toan1',
    dayName: 'Thứ Hai',
    dateStr: '07/09/2026',
    session: 'Sáng',
    period: 4,
    subject: 'Toán',
    subType: 'Ôn tập',
    ppct: 1,
    lessonTitle: 'Bài 1: ÔN TẬP SỐ TỰ NHIÊN (TIẾT 1)',
    grade: 5,
    teacherName: 'Nguyễn Hoàng Tuấn',
    className: '5A',
    specificCompetency: 'HS đọc, viết được số tự nhiên; Viết được số tự nhiên thành tổng các số hạng theo hàng. Vận dụng giải quyết tình huống thực tế.',
    generalCompetency: 'Năng lực tự chủ, giải quyết vấn đề toán học và năng lực giao tiếp toán học dõng dạc.',
    qualities: 'Trách nhiệm, chăm chỉ học tập nghiêm túc, cẩn thận trong tính toán.',
    teacherEquipments: 'Bộ đồ dùng dạy học Toán 5, bảng phụ vẽ bảng lớp cấu trúc hàng đơn vị.',
    studentEquipments: 'Bảng con, phấn, vở ghi chép Toán 5.',
    activities: {
      warmup: {
        title: '1. Khởi động',
        objective: 'Tạo không khí rực rỡ và kiểm tra kiến thức cũ của học sinh.',
        teacherActivity: 'Tổ chức trò chơi \'Đố bạn\': Một bạn viết số có nhiều chữ số lên bảng lớp, bạn khác đọc to và phân tích cấu trúc hàng của số đó.',
        studentActivity: 'HS sôi nổi tham gia chơi. Ví dụ: Viết số 52 814, bạn khác đọc: Năm mươi hai nghìn tám trăm mười bốn.',
        duration: '5 phút',
      },
      exploration: {
        title: '2. Khám phá',
        objective: 'Ôn tập lại cấu trúc hệ thập phân và giá trị của từng chữ số theo hàng.',
        teacherActivity: 'Cho học sinh quan sát bảng hệ thập phân trong SGK.\nHỏi về giá trị của chữ số 5 trong số 52 814 nằm ở hàng nào?',
        studentActivity: 'Quan sát bảng số, phát biểu: Chữ số 5 nằm ở hàng chục nghìn, có giá trị là 50 000.',
        duration: '10 phút',
      },
      practice: {
        title: '3. Luyện tập',
        objective: 'Hoàn thành các bài tập thực hành đọc viết và viết số thành tổng hàng.',
        teacherActivity: 'Tổ chức cho HS làm Bài 1, Bài 2 trong SGK vào vở cá nhân.\nTích hợp học thông qua chơi (Bộ phận): Giao phiếu học tập trò chơi nhóm tìm số thích hợp điền vào ô trống.',
        studentActivity: 'Hoàn thành nhanh chóng các bài tập đặt tính và so sánh số vào vở.\nTham gia thảo luận nhóm gài thẻ chữ số thích hợp vào bảng số.',
        duration: '15 phút',
      },
      application: {
        title: '4. Vận dụng',
        objective: 'Vận dụng làm tròn số và đọc số liệu thực tế đời sống.',
        teacherActivity: 'Đưa thông tin độ cao ngọn núi trong SGK (Đỉnh núi Bà Đen cao 986 m), yêu cầu học sinh làm tròn số đến hàng trăm.',
        studentActivity: 'Thực hiện làm tròn số 986 thành 1 000 m và hào hứng giải thích kết quả làm tròn của mình.',
        duration: '5 phút',
      },
    },
    integrationNotes: {
      nls: 'Tích hợp NLS: Tra cứu số liệu thực tế qua bảng số điện tử.',
      kns: 'Học thông qua chơi (Bộ phận): Đọc viết số tự nhiên.',
    },
  },
  {
    id: 'khbd-5a-t1-khoahoc1',
    dayName: 'Thứ Hai',
    dateStr: '07/09/2026',
    session: 'Chiều',
    period: 1,
    subject: 'Khoa học',
    subType: 'Khám phá',
    ppct: 1,
    lessonTitle: 'Bài 1: THÀNH PHẦN VÀ VAI TRÒ CỦA ĐẤT ĐỐI VỚI CÂY TRỒNG (TIẾT 1)',
    grade: 5,
    teacherName: 'Nguyễn Hoàng Tuấn',
    className: '5A',
    specificCompetency: 'Học sinh bước đầu nhận biết được các thành phần chính có trong đất trồng như chất khoáng, mùn, nước, không khí và các sinh vật đất.',
    generalCompetency: 'Năng lực tự khám phá thế giới tự nhiên; năng lực quan sát, thực nghiệm trực quan và rút ra kết luận khoa học.',
    qualities: 'Chăm chỉ chăm sóc cây cối, có trách nhiệm bảo vệ đất trồng sạch đẹp.',
    teacherEquipments: 'Một cốc thủy tinh đựng mẫu đất khô, nước sạch, thìa khuấy, tranh ảnh thành phần của đất.',
    studentEquipments: 'Sách giáo khoa Khoa học 5, bút ghi chép thực nghiệm.',
    activities: {
      warmup: {
        title: '1. Khởi động',
        objective: 'Khơi gợi trí tò mò của học sinh về đất trồng xung quanh mình.',
        teacherActivity: 'GV hỏi: \'Để cây xanh phát triển khỏe mạnh, rễ cây bám vào đâu? Đất có những gì trong đó?\' Dẫn dắt bài mới.',
        studentActivity: 'Hăng hái giơ tay trả lời: Rễ bám vào đất. Trong đất có cát, mùn, nước, giun đất...',
        duration: '5 phút',
      },
      exploration: {
        title: '2. Khám phá',
        objective: 'Thực hiện thí nghiệm trực quan phát hiện nước và không khí trong đất.',
        teacherActivity: 'Thả một cục đất khô vào cốc nước sạch. Yêu cầu HS quan sát hiện tượng sủi bọt khí.\nGiải thích: Bọt khí thoát ra chứng tỏ trong đất có không khí.',
        studentActivity: 'Chăm chú theo dõi thí nghiệm của giáo viên.\nPhát hiện hiện tượng sủi bọt và rút ra kết luận: Đất có chứa không khí bên trong.',
        duration: '12 phút',
      },
      practice: {
        title: '3. Luyện tập',
        objective: 'Tìm hiểu vai trò của chất mùn và chất khoáng đối với sự sống của cây.',
        teacherActivity: 'Cho học sinh thảo luận nhóm đôi tìm hiểu chất mùn được hình thành từ đâu? Nó giúp ích gì cho rễ cây hấp thụ?\nTích hợp Bảo vệ môi trường: Nâng cao ý thức không vứt rác thải nhựa bừa bãi làm hỏng kết cấu đất.',
        studentActivity: 'Thảo luận nhóm, xác định chất mùn hình thành từ xác động thực vật phân hủy, cung cấp dinh dưỡng cho cây.\nCam kết bỏ rác đúng nơi quy định để bảo vệ đất sạch.',
        duration: '13 phút',
      },
      application: {
        title: '4. Vận dụng',
        objective: 'Vận dụng thực tế bảo quản chậu cây trang trí lớp học sạch sẽ.',
        teacherActivity: 'Hướng dẫn học sinh cách xới đất chậu cây hoa của lớp nhẹ nhàng để không khí dễ luồn vào rễ cây nuôi dưỡng tốt hơn.',
        studentActivity: 'Tự giác phân công xới đất, tưới nước cho các chậu cây cảnh ở góc thiên nhiên lớp 5A ngăn nắp.',
        duration: '5 phút',
      },
    },
    integrationNotes: {
      bvmt: 'Tích hợp bảo vệ môi trường đất: Ý thức không xả rác thải nhựa làm chai sạn đất đai.',
    },
  },
  // LỚP 3A - TUẦN 1 (Thầy Nguyễn Văn Sang)
  {
    id: 'khbd-3a-t1-toan1',
    dayName: 'Thứ Hai',
    dateStr: '07/09/2026',
    session: 'Sáng',
    period: 4,
    subject: 'Toán',
    subType: 'Ôn tập',
    ppct: 1,
    lessonTitle: 'Bài 1: ÔN TẬP CÁC SỐ ĐẾN 1000 (TIẾT 1)',
    grade: 3,
    teacherName: 'Nguyễn Văn Sang',
    className: '3A',
    specificCompetency: 'Đọc, viết, so sánh và sắp xếp thứ tự các số trong phạm vi 1000; cấu tạo thập phân của số có 3 chữ số.',
    generalCompetency: 'Năng lực tư duy logic, tự chủ giải quyết bài tập toán độc lập và hợp tác nhóm đôi.',
    qualities: 'Chăm chỉ làm bài, cẩn thận, yêu thích học tập.',
    teacherEquipments: 'Bảng phụ ghi các số có ba chữ số, que tính mô hình trăm chục đơn vị.',
    studentEquipments: 'Bảng con, phấn, vở bài tập Toán 3.',
    activities: {
      warmup: {
        title: '1. Khởi động',
        objective: 'Khởi động phản xạ đếm số tròn trăm.',
        teacherActivity: 'Tổ chức trò chơi truyền điện: Đếm số tròn trăm từ 100 đến 1000.',
        studentActivity: 'HS nối tiếp nhau đọc to: 100, 200, 300, ... 1000.',
        duration: '5 phút',
      },
      exploration: {
        title: '2. Khám phá',
        objective: 'Ôn lại cách đọc, viết và phân tích số có 3 chữ số.',
        teacherActivity: 'Viết số 354 lên bảng: Yêu cầu học sinh đọc và nêu rõ chữ số hàng trăm, hàng chục, hàng đơn vị.',
        studentActivity: 'Đọc: Ba trăm năm mươi tư. Gồm 3 trăm, 5 chục và 4 đơn vị.',
        duration: '10 phút',
      },
      practice: {
        title: '3. Luyện tập',
        objective: 'Hoàn thành các bài tập SGK về viết số thành tổng các trăm, chục, đơn vị.',
        teacherActivity: 'Giao bài tập 1, 2, 3 SGK. Quan sát uốn nắn học sinh làm bài.\nTích hợp học thông qua chơi: Trò chơi ghép thẻ số tương ứng.',
        studentActivity: 'Làm bài cá nhân vào vở, đổi chéo vở kiểm tra đáp án với bạn.',
        duration: '15 phút',
      },
      application: {
        title: '4. Vận dụng',
        objective: 'Vận dụng viết số tiền thực tế trong đời sống.',
        teacherActivity: 'Đưa tình huống: Mua một cuốn sổ tay giá 850 đồng / nghìn đồng. Hướng dẫn học sinh đọc và viết.',
        studentActivity: 'Hào hứng viết số và giải thích giá trị từng chữ số.',
        duration: '5 phút',
      },
    },
    integrationNotes: {
      nls: 'Tích hợp NLS: Sử dụng bảng số điện tử kiểm tra kết quả nhanh.',
      kns: 'Học thông qua chơi: Trò chơi ghép thẻ số thông minh.',
    },
  },
];

export const DEFAULT_KHBD_LESSONS: KHBDLesson[] = INITIAL_KHBD_DATABASE;

export const INTEGRATION_LOOKUP_TABLE: IntegrationTopic[] = [
  // LỚP 1
  {
    id: 'int-l1-1',
    category: 'NLS',
    code: 'NLS 1.1.CB1a',
    grade: 1,
    subject: 'Tiếng Việt',
    lessonName: 'Bài 19: Thiên nhiên tươi đẹp',
    week: 8,
    targetRequirement: 'Xác định nhu cầu thông tin, tìm kiếm đơn giản trong môi trường số dưới sự hướng dẫn.',
    suggestedActivity: 'HS tìm hình ảnh hoặc thông tin đơn giản về chim biển từ đường dẫn hoặc từ khóa GV cung cấp.',
  },
  {
    id: 'int-l1-2',
    category: 'AI',
    code: 'AI 1.A2.1',
    grade: 1,
    subject: 'Toán',
    lessonName: 'Bài 34: Xem giờ đúng trên đồng hồ',
    week: 30,
    targetRequirement: 'Nhận biết một số thiết bị sử dụng AI (như loa thông minh, trợ lý ảo) hỗ trợ con người xem giờ và quản lý thời gian.',
    suggestedActivity: 'GV dùng điện thoại hỏi trợ lý ảo: "Bây giờ là mấy giờ?" để HS thấy AI hỗ trợ việc xem giờ như thế nào.',
  },
  {
    id: 'int-l1-3',
    category: 'QCN',
    code: 'QCN',
    grade: 1,
    subject: 'Hoạt động trải nghiệm',
    lessonName: 'Bài 1: Làm quen với bạn mới',
    week: 1,
    targetRequirement: 'Quyền được tự do biểu đạt cảm xúc, ý kiến; tôn trọng sự khác biệt của bạn bè.',
    suggestedActivity: 'HS thảo luận nhóm chia sẻ sở thích cá nhân, lắng nghe và không chê bai bạn.',
  },
  // LỚP 2
  {
    id: 'int-l2-1',
    category: 'AI',
    code: 'AI 2.A1.1',
    grade: 2,
    subject: 'Tiếng Việt',
    lessonName: 'Bài 3: Niềm vui của Bi và Bống',
    week: 2,
    targetRequirement: 'Nhận biết AI có thể hỗ trợ gợi ý lời nói trong giao tiếp nhưng con người cần dùng cảm xúc chân thật.',
    suggestedActivity: 'GV đóng vai trợ lý ảo đưa câu chúc mừng soạn sẵn, HS nhận xét và sửa lại bằng cảm xúc chân thành của mình.',
  },
  {
    id: 'int-l2-2',
    category: 'AI',
    code: 'AI 2.C3.1',
    grade: 2,
    subject: 'Hoạt động trải nghiệm',
    lessonName: 'Bài 2: Nụ cười thân thiện',
    week: 2,
    targetRequirement: 'So sánh được cách AI phân loại cảm xúc qua camera với cách con người cảm nhận thực tế.',
    suggestedActivity: 'Trải nghiệm app nhận diện nụ cười trên máy tính bảng và thảo luận khi máy nhận diện sai.',
  },
  {
    id: 'int-l2-3',
    category: 'GDQPAN',
    code: 'GDQPAN',
    grade: 2,
    subject: 'Đạo đức',
    lessonName: 'Bài 1: Vẻ đẹp quê hương em',
    week: 1,
    targetRequirement: 'Tìm hiểu danh lam thắng cảnh, di tích lịch sử địa phương Tân Thạnh và ý thức giữ gìn bảo vệ quê hương.',
    suggestedActivity: 'Quan sát tranh ảnh di tích lịch sử địa phương Tân Thạnh, thảo luận cách ứng xử bảo vệ di tích sạch đẹp.',
  },
  {
    id: 'int-l2-4',
    category: 'DinhDuong',
    code: 'GD Dinh dưỡng',
    grade: 2,
    subject: 'Toán',
    lessonName: 'Bài 4: Hơn, kém nhau bao nhiêu',
    week: 2,
    targetRequirement: 'Ăn uống đầy đủ, đúng chất dinh dưỡng để cơ thể phát triển tốt.',
    suggestedActivity: 'Lồng ghép bài toán so sánh khẩu phần ăn dinh dưỡng lành mạnh của học sinh tiểu học.',
  },
  // LỚP 3
  {
    id: 'int-l3-1',
    category: 'NLS',
    code: 'NLS 2.3.CB1a',
    grade: 3,
    subject: 'Tiếng Việt',
    lessonName: 'Bài 4: Gửi tin nhắn lịch sự qua thiết bị số',
    week: 3,
    targetRequirement: 'Giao tiếp, trao đổi ý kiến lịch sự trong môi trường số, không chia sẻ thông tin riêng tư.',
    suggestedActivity: 'Sắm vai gửi tin nhắn chúc mừng thầy cô, bạn bè qua ứng dụng liên lạc giả định.',
  },
  {
    id: 'int-l3-2',
    category: 'AI',
    code: 'AI 3.A1.2',
    grade: 3,
    subject: 'Toán',
    lessonName: 'Bài 10: Khám phá sản phẩm AI tạo sinh',
    week: 10,
    targetRequirement: 'Nhận thức AI hỗ trợ giải toán nhanh nhưng con người phải kiểm tra lại các bước thực hiện.',
    suggestedActivity: 'HS thi đấu giải toán với gợi ý của chatbot và phát hiện lỗi sai trong phép tính thử nghiệm.',
  },
  // LỚP 4
  {
    id: 'int-l4-1',
    category: 'AI',
    code: 'AI 4.A1.1',
    grade: 4,
    subject: 'Toán',
    lessonName: 'Bài 1: Ôn tập các số đến 100 000',
    week: 1,
    targetRequirement: 'HS nhận biết AI hỗ trợ xử lý và sắp xếp lượng dữ liệu số khổng lồ nhanh hơn con người.',
    suggestedActivity: 'So sánh tốc độ sắp xếp 10 số (người làm) và AI sắp xếp 100.000 số trong 1 giây.',
  },
  {
    id: 'int-l4-2',
    category: 'QCN',
    code: 'QCN',
    grade: 4,
    subject: 'Tiếng Việt',
    lessonName: 'Bài 1: Điều kì diệu',
    week: 1,
    targetRequirement: 'HS nhận biết mỗi người có đặc điểm, khả năng và giá trị riêng; biết tôn trọng sự khác biệt, không trêu chọc.',
    suggestedActivity: 'Thảo luận nhóm về các thế mạnh riêng của từng bạn trong lớp, tuyên dương nét độc đáo.',
  },
  // LỚP 5
  {
    id: 'int-l5-1',
    category: 'AI',
    code: 'AI 5.A1.1',
    grade: 5,
    subject: 'Tiếng Việt',
    lessonName: 'Bài 1: Khám phá thế giới thông tin qua ChatGPT',
    week: 1,
    targetRequirement: 'Nhận biết AI có thể hỗ trợ con người tìm hiểu thông tin nhưng cảm xúc và quyết định thật sự thuộc về con người.',
    suggestedActivity: 'HS thảo luận về vai trò của ChatGPT trong việc gợi ý dàn ý bài văn kể chuyện sáng tạo.',
  },
  {
    id: 'int-l5-2',
    category: 'GDQPAN',
    code: 'GDQPAN TT08/2024',
    grade: 5,
    subject: 'Lịch sử & Địa lí',
    lessonName: 'Bài 1: Vị trí địa lí, lãnh thổ, Quốc kì, Quốc huy, Quốc ca',
    week: 1,
    targetRequirement: 'Khẳng định chủ quyền biển, đảo của Việt Nam; xác định vị trí hai quần đảo Hoàng Sa và Trường Sa trên bản đồ.',
    suggestedActivity: 'HS thực hành quan sát bản đồ số, chỉ rõ phạm vi lãnh thổ và vẽ biểu tượng cờ Tổ quốc.',
  },
];
