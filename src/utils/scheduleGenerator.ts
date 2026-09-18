import { SchoolProfile, TKBEntry, KHBDLesson, MasterScheduleSlot } from '../types';
import { MASTER_SCHEDULE_DATA, TEACHERS_LIST } from '../data/defaultData';
import { getCurriculumLessonInfo, cleanCurriculumTitle } from '../data/curriculumData';

/**
 * Tính toán ngày bắt đầu (Thứ Hai) và ngày kết thúc (Thứ Sáu) cho bất kỳ tuần nào trong năm học (1 -> 35).
 * Năm học 2026 - 2027 bắt đầu Tuần 1 từ Thứ Hai 07/09/2026.
 */
export function calculateWeekDates(weekNumber: number, baseYearStartStr: string = '07/09/2026'): {
  startDate: string;
  endDate: string;
  dayDates: Record<number, string>; // 2 -> Mon, 3 -> Tue, 4 -> Wed, 5 -> Thu, 6 -> Fri
} {
  const parts = baseYearStartStr.split('/');
  const day = parseInt(parts[0], 10) || 7;
  const month = (parseInt(parts[1], 10) || 9) - 1;
  const year = parseInt(parts[2], 10) || 2026;

  const baseDate = new Date(year, month, day);
  const weekOffsetDays = (Math.max(1, weekNumber) - 1) * 7;

  const mondayDate = new Date(baseDate.getTime() + weekOffsetDays * 24 * 60 * 60 * 1000);

  const formatDate = (d: Date): string => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const dayDates: Record<number, string> = {
    2: formatDate(mondayDate),
    3: formatDate(new Date(mondayDate.getTime() + 1 * 24 * 60 * 60 * 1000)),
    4: formatDate(new Date(mondayDate.getTime() + 2 * 24 * 60 * 60 * 1000)),
    5: formatDate(new Date(mondayDate.getTime() + 3 * 24 * 60 * 60 * 1000)),
    6: formatDate(new Date(mondayDate.getTime() + 4 * 24 * 60 * 60 * 1000)),
  };

  return {
    startDate: dayDates[2],
    endDate: dayDates[6],
    dayDates,
  };
}

/**
 * Phân định rõ ràng vai trò của Giáo viên chuyên môn (GVBM) và Giáo viên chủ nhiệm (GVCN)
 */
export function isSpecialistTeacher(teacherName: string, role?: 'GVCN' | 'GVBM'): {
  isSpecialist: boolean;
  subject: string;
  shortName: string;
} {
  if (role === 'GVCN') {
    return { isSpecialist: false, subject: '', shortName: '' };
  }

  const name = teacherName.toLowerCase();
  if (name.includes('duyên') || name.includes('tiếng anh') || name.includes('anh văn')) {
    return { isSpecialist: true, subject: 'Tiếng Anh', shortName: 'Duyên' };
  }
  if (name.includes('nhớ') || name.includes('tin học')) {
    return { isSpecialist: true, subject: 'Tin học', shortName: 'Nhớ' };
  }
  if (name.includes('bình') || name.includes('thể chất') || name.includes('gdtc')) {
    return { isSpecialist: true, subject: 'Giáo dục thể chất', shortName: 'Bình' };
  }
  if (name.includes('thắng') || name.includes('âm nhạc')) {
    return { isSpecialist: true, subject: 'Âm nhạc', shortName: 'Thắng' };
  }
  if (name.includes('hơn') || name.includes('chuyên hơn')) {
    return { isSpecialist: true, subject: 'Chuyên', shortName: 'Hơn' };
  }
  if (name.includes('mĩ thuật') || name.includes('mỹ thuật')) {
    return { isSpecialist: true, subject: 'Mĩ thuật', shortName: 'Chuyên MT' };
  }

  const found = TEACHERS_LIST.find((t) => t.name === teacherName);
  if (found && (found.role.includes('Chuyên') || found.role.includes('Bộ môn'))) {
    let subj = 'Chuyên';
    if (found.role.includes('Anh')) subj = 'Tiếng Anh';
    else if (found.role.includes('Tin')) subj = 'Tin học';
    else if (found.role.includes('Thể chất') || found.role.includes('GDTC')) subj = 'Giáo dục thể chất';
    else if (found.role.includes('Nhạc') || found.role.includes('Âm nhạc')) subj = 'Âm nhạc';
    else if (found.role.includes('Mĩ thuật') || found.role.includes('Mỹ thuật')) subj = 'Mĩ thuật';
    return {
      isSpecialist: true,
      subject: subj,
      shortName: teacherName.split(' ').pop() || '',
    };
  }

  return { isSpecialist: false, subject: '', shortName: '' };
}

/**
 * Kiểm tra xem một môn học có thuộc diện môn chuyên hay không
 */
export function isSpecialistSubject(subject: string): boolean {
  const norm = subject.toLowerCase().trim();
  return (
    norm.includes('tiếng anh') ||
    norm.includes('anh văn') ||
    norm.includes('tin học') ||
    norm.includes('tcth') ||
    norm.includes('giáo dục thể chất') ||
    norm.includes('gdtc') ||
    norm.includes('thể dục') ||
    norm.includes('âm nhạc') ||
    norm.includes('mĩ thuật') ||
    norm.includes('mỹ thuật') ||
    norm.includes('chuyên') ||
    norm.includes('nhớ') ||
    norm.includes('duyên') ||
    norm.includes('bình') ||
    norm.includes('thắng')
  );
}

/**
 * Lọc danh sách LBG cá nhân của Giáo viên đang đăng nhập:
 * - Nếu là GVCN: Lấy tất cả các tiết GVCN dạy lớp mình (loại bỏ tiết GV chuyên dạy).
 * - Nếu là GVBM: Lấy tất cả các tiết GVBM dạy trên toàn trường (tất cả các lớp).
 */
export function getTeacherPersonalLbgEntries(
  profile: SchoolProfile,
  allEntries: TKBEntry[]
): TKBEntry[] {
  if (profile.role === 'GVCN') {
    return allEntries.filter((entry) => {
      if (entry.isSpecialist) return false;
      if (isSpecialistSubject(entry.subject)) return false;
      if (
        entry.teacher &&
        entry.teacher !== profile.teacherName &&
        entry.teacher !== 'GVCN' &&
        entry.teacher !== ''
      ) {
        return false;
      }
      return true;
    });
  } else {
    const specialistInfo = isSpecialistTeacher(profile.teacherName, profile.role);
    return allEntries.filter((entry) => {
      const isTeacherMatch =
        entry.teacher === profile.teacherName ||
        (entry.teacher &&
          specialistInfo.shortName &&
          entry.teacher.toLowerCase().includes(specialistInfo.shortName.toLowerCase()));
      const isSubjectMatch =
        specialistInfo.subject &&
        entry.subject.toLowerCase().includes(specialistInfo.subject.toLowerCase());
      return isTeacherMatch || isSubjectMatch;
    });
  }
}

/**
 * Ngân hàng chương trình bài học theo tuần và khối lớp chuẩn GDPT 2018 (Kết nối tri thức với cuộc sống)
 * Ủy thác toàn bộ cho getCurriculumLessonInfo và cleanCurriculumTitle từ src/data/curriculumData.ts
 */
export const CURRICULUM_DATABASE: Record<
  number, // Grade 1..5
  Record<
    string, // Subject
    (week: number, periodInWeek: number) => { title: string; ppct: number; subType?: string }
  >
> = new Proxy({} as any, {
  get: (_, gradeKey) => {
    const grade = parseInt(String(gradeKey), 10) || 4;
    return new Proxy({} as any, {
      get: (_, subjectKey) => {
        return (week: number, periodInWeek: number) => {
          const res = getCurriculumLessonInfo(grade, String(subjectKey), week, periodInWeek);
          return {
            title: cleanCurriculumTitle(res.title),
            ppct: res.ppct,
            subType: res.subType,
          };
        };
      },
    });
  },
});

/**
 * Tạo danh sách Lịch Báo Giảng (LBG) hoàn chỉnh cho giáo viên (cả GVCN và Giáo Viên Chuyên)
 * Yêu cầu: Cột nội dung tích hợp để TRỐNG ("") theo chỉ đạo của người dùng.
 */
export function generateLbgEntriesForProfile(
  profile: SchoolProfile,
  masterSchedule: MasterScheduleSlot[] = MASTER_SCHEDULE_DATA
): TKBEntry[] {
  const teacherInfo = isSpecialistTeacher(profile.teacherName, profile.role);
  const weekNum = profile.weekNumber || 1;
  const entries: TKBEntry[] = [];

  // Theo dõi số tiết đã gặp của từng môn/lớp trong tuần để tính PPCT chính xác
  const subjectPeriodCounters: Record<string, number> = {};

  if (teacherInfo.isSpecialist) {
    // =========================================================================
    // 1. SẮP XẾP CHO GIÁO VIÊN CHUYÊN (GVBM): Quét tất cả các lớp GV này dạy trong TKB
    // =========================================================================
    masterSchedule.forEach((slot) => {
      Object.entries(slot.classes).forEach(([classId, cellText]) => {
        if (!cellText || cellText === '—') return;

        const matchesTeacher =
          cellText.toLowerCase().includes(teacherInfo.shortName.toLowerCase()) ||
          cellText.toLowerCase().includes(teacherInfo.subject.toLowerCase()) ||
          (teacherInfo.subject === 'Tiếng Anh' && (cellText.startsWith('TA') || cellText.startsWith('Anh văn')));

        if (matchesTeacher) {
          const grade = parseInt(classId.charAt(0), 10) || 1;
          const key = `${classId}-${teacherInfo.subject}`;
          subjectPeriodCounters[key] = (subjectPeriodCounters[key] || 0) + 1;
          const periodInWeek = subjectPeriodCounters[key];

          const lessonInfo = getCurriculumLessonInfo(grade, teacherInfo.subject, weekNum, periodInWeek);
          const lessonTitle = cleanCurriculumTitle(lessonInfo.title);
          const ppctLesson = lessonInfo.ppct;

          entries.push({
            id: `lbg-${profile.teacherName}-w${weekNum}-d${slot.day}-${slot.session}-${slot.period}-${classId}`,
            day: slot.day,
            session: slot.session,
            period: slot.period,
            subject: `${teacherInfo.subject} (Lớp ${classId})`,
            targetClass: classId,
            teacher: profile.teacherName,
            isSpecialist: true,
            ppctLesson,
            lessonTitle,
            integration: '', // Cột nội dung tích hợp để TRỐNG theo yêu cầu
          });
        }
      });
    });
  } else {
    // =========================================================================
    // 2. SẮP XẾP CHO GIÁO VIÊN CHỦ NHIỆM (GVCN): Quét thời khóa biểu của Lớp chủ nhiệm
    // =========================================================================
    const className = profile.className || '4.2';
    const grade = profile.grade || parseInt(className.charAt(0), 10) || 4;

    masterSchedule.forEach((slot) => {
      const rawSubject = slot.classes[className] || '—';
      if (rawSubject === '—') {
        return; // Bỏ qua tiết trống
      }

      // Phân tách tên môn và tên giáo viên chuyên (nếu có trong ngoặc đơn)
      let cleanSubject = rawSubject;
      let specialistTeacherName: string | undefined = undefined;
      let isSpecialistSlot = false;

      if (rawSubject.includes('(')) {
        const parts = rawSubject.split('(');
        cleanSubject = parts[0].trim();
        const teacherPart = parts[1].replace(')', '').trim();
        if (teacherPart !== 'CC' && teacherPart !== 'SHL') {
          specialistTeacherName = teacherPart;
          isSpecialistSlot = true;
        }
      }

      // Chuẩn hóa tên môn học
      if (cleanSubject === 'HĐTN' || cleanSubject === 'HĐTT') cleanSubject = 'Hoạt động trải nghiệm';
      if (cleanSubject === 'TA' || cleanSubject === 'Anh văn') cleanSubject = 'Tiếng Anh';
      if (cleanSubject === 'MT' || cleanSubject === 'BDMT') cleanSubject = 'Mĩ thuật';
      if (cleanSubject === 'AN' || cleanSubject === 'ÂN' || cleanSubject === 'BDAN') cleanSubject = 'Âm nhạc';
      if (cleanSubject === 'GDTC' || cleanSubject === 'TD') cleanSubject = 'Giáo dục thể chất';
      if (cleanSubject === 'TH' || cleanSubject === 'TCTH') cleanSubject = 'Tin học';
      if (cleanSubject === 'TNXH') cleanSubject = 'Tự nhiên và Xã hội';
      if (cleanSubject === 'LS&ĐL' || cleanSubject === 'LS & ĐL' || cleanSubject === 'Lịch sử & ĐL') cleanSubject = 'Lịch sử và Địa lí';
      if (cleanSubject === 'CN') cleanSubject = 'Công nghệ';
      if (cleanSubject === 'KH') cleanSubject = 'Khoa học';
      if (cleanSubject === 'ĐĐ') cleanSubject = 'Đạo đức';
      if (cleanSubject === 'TV') cleanSubject = 'Tiếng Việt';
      if (cleanSubject === 'T.cường TV' || cleanSubject === 'Tăng cường TV') cleanSubject = 'Tăng cường Tiếng Việt';
      if (cleanSubject === 'T.cường T' || cleanSubject === 'Tăng cường Toán') cleanSubject = 'Tăng cường Toán';

      // Kiểm tra xem môn học có thuộc diện GV chuyên (GVBM) phụ trách hay không
      if (isSpecialistSubject(cleanSubject) || isSpecialistSubject(rawSubject)) {
        isSpecialistSlot = true;
        if (!specialistTeacherName) {
          if (cleanSubject.includes('Tiếng Anh')) specialistTeacherName = 'Duyên';
          else if (cleanSubject.includes('Tin học')) specialistTeacherName = 'Nhớ';
          else if (cleanSubject.includes('Giáo dục thể chất')) specialistTeacherName = 'Bình';
          else if (cleanSubject.includes('Âm nhạc')) specialistTeacherName = 'Thắng';
          else if (cleanSubject.includes('Mĩ thuật')) specialistTeacherName = 'Chuyên MT';
          else if (cleanSubject.includes('Chuyên')) specialistTeacherName = 'Hơn';
          else specialistTeacherName = 'GVBM';
        }
      }

      // Môn Công nghệ nếu ghi Thầy Nhớ hoặc GVBM cũng là tiết chuyên
      if (cleanSubject === 'Công nghệ' && (specialistTeacherName || rawSubject.includes('Nhớ'))) {
        isSpecialistSlot = true;
        if (!specialistTeacherName) specialistTeacherName = 'Nhớ';
      }

      const counterKey = cleanSubject;
      subjectPeriodCounters[counterKey] = (subjectPeriodCounters[counterKey] || 0) + 1;
      const periodInWeek = subjectPeriodCounters[counterKey];

      // Tra cứu phân phối chương trình và tên bài học chuẩn GDPT 2018
      const lessonInfo = getCurriculumLessonInfo(grade, cleanSubject, weekNum, periodInWeek);
      const ppctLesson = lessonInfo.ppct;
      const lessonTitle = cleanCurriculumTitle(lessonInfo.title);

      entries.push({
        id: `lbg-${className}-w${weekNum}-d${slot.day}-${slot.session}-${slot.period}`,
        day: slot.day,
        session: slot.session,
        period: slot.period,
        subject: cleanSubject,
        targetClass: className,
        teacher: isSpecialistSlot ? (specialistTeacherName || 'GVBM') : profile.teacherName,
        isSpecialist: isSpecialistSlot,
        ppctLesson,
        lessonTitle,
        integration: '', // Cột nội dung tích hợp để TRỐNG theo yêu cầu
      });
    });
  }

  // Sắp xếp thứ tự LBG theo: Thứ (2 -> 6) -> Buổi (Sáng trước Chiều) -> Tiết (1 -> 5)
  entries.sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    if (a.session !== b.session) {
      return a.session === 'Sáng' ? -1 : 1;
    }
    return a.period - b.period;
  });

  return entries;
}

/**
 * Đồng bộ danh sách Kế Hoạch Bài Dạy (KHBD) theo Lịch Báo Giảng và Tuần học
 * ĐẶC BIỆT: LẬP RIÊNG CHO TỪNG GIÁO VIÊN!
 * - GVCN: Tuyệt đối KHÔNG lập KHBD cho các môn của GV chuyên (Tiếng Anh, Tin học, GDTC, Âm nhạc, Mĩ thuật...)!
 * - GVBM: Chỉ lập KHBD cho môn chuyên mà mình phụ trách!
 */
export function generateKhbdLessonsFromLbg(
  profile: SchoolProfile,
  lbgEntries: TKBEntry[]
): KHBDLesson[] {
  const weekNum = profile.weekNumber || 1;
  const { dayDates } = calculateWeekDates(weekNum, profile.startDate);
  const dayNameMap: Record<number, string> = {
    2: 'Thứ Hai',
    3: 'Thứ Ba',
    4: 'Thứ Tư',
    5: 'Thứ Năm',
    6: 'Thứ Sáu',
  };

  const lessons: KHBDLesson[] = [];

  lbgEntries.forEach((entry) => {
    // Không tạo giáo án cho tiết trống hoặc tiết không hợp lệ
    if (!entry.lessonTitle || entry.subject === '—') return;

    // 1. Đối với Giáo viên chủ nhiệm (GVCN):
    // GVCN KHÔNG soạn Kế hoạch bài dạy cho các tiết của Giáo viên chuyên môn phụ trách
    // (Anh văn / Tiếng Anh, Tin học, Giáo dục thể chất, Âm nhạc, Mĩ thuật, Công nghệ, Đạo đức do GV chuyên dạy...)
    if (profile.role === 'GVCN') {
      if (
        entry.isSpecialist ||
        isSpecialistSubject(entry.subject) ||
        (entry.teacher &&
          entry.teacher !== profile.teacherName &&
          entry.teacher !== 'GVCN' &&
          entry.teacher !== '')
      ) {
        return; // BỎ QUA TIẾT CỦA GV CHUYÊN MÔN THEO YÊU CẦU!
      }
    }

    // 2. Đối với Giáo viên bộ môn (GVBM - GV chuyên):
    // Chỉ soạn KHBD cho các tiết chuyên môn mà mình trực tiếp phụ trách
    if (profile.role === 'GVBM') {
      const specialistInfo = isSpecialistTeacher(profile.teacherName, profile.role);
      const isMySlot =
        (entry.teacher &&
          (entry.teacher === profile.teacherName ||
            (specialistInfo.shortName &&
              entry.teacher.toLowerCase().includes(specialistInfo.shortName.toLowerCase())))) ||
        (specialistInfo.subject &&
          entry.subject.toLowerCase().includes(specialistInfo.subject.toLowerCase()));
      if (!isMySlot) {
        return; // BỎ QUA TIẾT KHÔNG THUỘC CHUYÊN MÔN CỦA MÌNH!
      }
    }

    const dayName = dayNameMap[entry.day] || 'Thứ Hai';
    const dateStr = dayDates[entry.day] || profile.startDate;
    const targetClass = entry.targetClass || profile.className;
    const grade = parseInt(targetClass.charAt(0), 10) || profile.grade || 2;
    const cleanedLessonTitle = cleanCurriculumTitle(entry.lessonTitle);

    lessons.push({
      id: `khbd-w${weekNum}-d${entry.day}-${entry.session}-${entry.period}-${entry.subject}`,
      dayName,
      dateStr,
      session: entry.session,
      period: entry.period,
      subject: entry.subject,
      subType: entry.subject.includes('(') ? entry.subject.split('(')[1].replace(')', '') : undefined,
      ppct: entry.ppctLesson || 1,
      lessonTitle: cleanedLessonTitle,
      grade,
      teacherName: entry.teacher || profile.teacherName,
      className: targetClass,
      // I. YCCĐ chuẩn CV 2345
      specificCompetency: `Học sinh nắm vững kiến thức trọng tâm của bài: ${cleanedLessonTitle}; biết vận dụng kĩ năng vào giải quyết các bài tập và tình huống thực tế trong đời sống.`,
      generalCompetency: 'Năng lực tự chủ và tự học; năng lực giao tiếp và hợp tác nhóm; năng lực giải quyết vấn đề sáng tạo.',
      qualities: 'Chăm chỉ, trung thực, trách nhiệm, có ý thức giữ gìn vệ sinh và yêu thương mọi người.',
      // II. Đồ dùng dạy học
      teacherEquipments: 'Kế hoạch bài dạy, bài giảng điện tử trình chiếu, thẻ số / đồ dùng trực quan, phiếu học tập.',
      studentEquipments: 'Sách giáo khoa, vở ghi bài, bút, thước kẻ, bảng con và đồ dùng học tập cá nhân.',
      // III. Tiến trình 4 giai đoạn chuẩn
      activities: {
        warmup: {
          title: '1. Hoạt động Khởi động',
          objective: 'Tạo không khí vui tươi, kích thích hứng thú và kết nối học sinh vào bài học mới.',
          teacherActivity: `Tổ chức cho học sinh tham gia trò chơi khởi động ngắn liên quan đến môn ${entry.subject}.\nNêu câu hỏi dẫn dắt vào bài mới: ${cleanedLessonTitle}.`,
          studentActivity: 'Hào hứng tham gia trò chơi cùng cả lớp.\nLắng nghe và trả lời câu hỏi của giáo viên để sẵn sàng vào bài học.',
          duration: '5 phút',
        },
        exploration: {
          title: '2. Hoạt động Khám phá kiến thức mới',
          objective: 'Giúp học sinh tự khám phá, hình thành kiến thức và kĩ năng mới.',
          teacherActivity: `Hướng dẫn học sinh quan sát tranh ảnh / mô hình trực quan trong SGK.\nGiao nhiệm vụ thảo luận nhóm đôi để tìm hiểu nội dung bài: ${cleanedLessonTitle}.\nQuan sát, hỗ trợ các nhóm học sinh gặp khó khăn.`,
          studentActivity: 'Làm việc cá nhân kết hợp thảo luận nhóm đôi.\nĐại diện nhóm đứng dậy trình bày kết quả quan sát và rút ra nhận xét ban đầu.',
          duration: '12 phút',
        },
        practice: {
          title: '3. Hoạt động Luyện tập - Thực hành',
          objective: 'Củng cố kiến thức vừa học qua các bài tập và hoạt động thực hành.',
          teacherActivity: `Hướng dẫn học sinh làm bài tập trong SGK / vở bài tập.\nTổ chức sửa bài, nhận xét và tuyên dương học sinh có câu trả lời sáng tạo, chính xác.`,
          studentActivity: 'Làm bài cá nhân vào vở, đổi chéo vở kiểm tra bài làm của bạn bên cạnh.\nLên bảng trình bày kết quả bài làm khi được giáo viên gọi.',
          duration: '13 phút',
        },
        application: {
          title: '4. Hoạt động Vận dụng, trải nghiệm',
          objective: 'Vận dụng kiến thức bài học vào đời sống thực tế gia đình và nhà trường.',
          teacherActivity: `Nêu tình huống thực tế liên quan đến bài học để học sinh liên hệ bản thân.\nDặn dò học sinh chuẩn bị bài cho tiết học tiếp theo.`,
          studentActivity: 'Tự liên hệ bản thân, chia sẻ câu chuyện hoặc cách làm của mình với thầy cô và các bạn.\nGhi nhớ lời dặn của giáo viên.',
          duration: '5 phút',
        },
      },
      afterLessonAdjustment: '',
    });
  });

  return lessons;
}
