export interface SchoolProfile {
  schoolName: string;
  subSchoolName: string; // Phân hiệu
  departmentName: string; // Phòng / Sở GD&ĐT
  teacherName: string;
  role: 'GVCN' | 'GVBM';
  specialistSubject?: string; // Môn chuyên trách: Tiếng Anh, Mĩ thuật, Âm nhạc, GDTC, Tin học...
  grade: number; // 1 | 2 | 3 | 4 | 5
  className: string; // "1A", "2A", "3A", "4A", "5A", v.v.
  weekNumber: number; // 1, 2, 3...
  schoolYear: string; // "2025 - 2026" or "2026 - 2027"
  startDate: string; // "07/09/2026"
  endDate: string; // "11/09/2026"
}

export type SubjectType =
  | 'Tiếng Việt'
  | 'Toán'
  | 'Đạo đức'
  | 'Tự nhiên và Xã hội'
  | 'Lịch sử và Địa lí'
  | 'Khoa học'
  | 'Hoạt động trải nghiệm'
  | 'Công nghệ'
  | 'Tin học'
  | 'Tiếng Anh'
  | 'Mĩ thuật'
  | 'Âm nhạc'
  | 'Giáo dục thể chất'
  | 'Tăng cường Tiếng Việt'
  | 'Tăng cường Toán'
  | 'Kỹ năng sống'
  | 'Sinh hoạt dưới cờ'
  | 'Sinh hoạt lớp';

export interface TKBEntry {
  id: string;
  day: number; // 2 -> 6 (Thứ Hai đến Thứ Sáu)
  session: 'Sáng' | 'Chiều';
  period: number; // 1 -> 5 (Sáng), 1 -> 3 (Chiều)
  subject: string;
  targetClass?: string; // Ví dụ: "1A", "2A", "3B", "5A" (đặc biệt hữu ích cho GV chuyên)
  teacher?: string;
  room?: string;
  isSpecialist?: boolean; // Giáo viên chuyên dạy
  ppctLesson?: number; // Tiết PPCT
  lessonTitle?: string;
  integration?: string;
}

export interface TeacherAssignment {
  id: string;
  name: string;
  role: string; // "GVCN Lớp 2A", "GVCN Lớp 3A", "GVCN Lớp 5A", "GV Chuyên Tiếng Anh", "GV Chuyên Mĩ thuật", etc.
  assignedClass?: string;
  weeklyPeriods: number;
  concurrentPeriods: number; // Kiêm nhiệm
  totalPeriods: number;
  deltaPeriods: number; // Thừa/thiếu
}

export interface MasterScheduleSlot {
  day: number; // 2 -> 6
  session: 'Sáng' | 'Chiều';
  period: number; // 1 -> 5 or 1 -> 3
  classes: Record<string, string>; // classId -> "Môn (GV)"
}

export interface ActivityStep {
  title: string;
  objective: string;
  teacherActivity: string;
  studentActivity: string;
  duration?: string;
}

export interface KHBDLesson {
  id: string;
  dayName: string; // "Thứ Hai", "Thứ Ba", ...
  dateStr: string; // "07/09/2026"
  session: 'Sáng' | 'Chiều';
  period: number;
  subject: string;
  subType?: string; // Đọc, Viết, LTVC, v.v.
  ppct: number;
  lessonTitle: string;
  grade: number;
  teacherName: string;
  className: string;
  // I. YCCĐ
  specificCompetency: string; // Năng lực đặc thù
  generalCompetency: string; // Năng lực chung (Tự chủ, GQVĐ, Giao tiếp)
  qualities: string; // Phẩm chất (Nhân ái, Chăm chỉ, Trách nhiệm...)
  // II. Đồ dùng
  teacherEquipments: string;
  studentEquipments: string;
  // III. Tiến trình
  activities: {
    warmup: ActivityStep;
    exploration: ActivityStep;
    practice: ActivityStep;
    application: ActivityStep;
  };
  // Tích hợp cụ thể
  integrationNotes?: {
    nls?: string;
    ai?: string;
    qcn?: string;
    kns?: string;
    gdqpan?: string;
    bvmt?: string;
    dinhDuong?: string;
    stem?: string;
  };
  // IV. Điều chỉnh
  afterLessonAdjustment?: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  number: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface WeeklyQuizWorksheet {
  id: string;
  grade: number;
  week: number;
  subject: string;
  title: string;
  curriculumTopic: string;
  sourceUrl: string; // e.g. https://loigiaihay.com/
  sourceName: string; // "Lời Giải Hay (loigiaihay.com)"
  questions: MultipleChoiceQuestion[];
}

export interface IntegrationTopic {
  id: string;
  category: 'NLS' | 'AI' | 'QCN' | 'KNS' | 'GDQPAN' | 'BVMT' | 'DinhDuong' | 'STEM';
  code?: string;
  grade: number;
  subject: string;
  lessonName: string;
  week: number;
  targetRequirement: string;
  suggestedActivity: string;
}
