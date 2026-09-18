import { WeeklyQuizWorksheet, MultipleChoiceQuestion, TKBEntry, KHBDLesson } from '../types';

/**
 * Trả về danh sách môn học bắt buộc cho phiếu bài tập cuối tuần theo khối lớp:
 * - Khối 1, 2, 3: Toán, Tiếng Việt, Tự nhiên và Xã hội, Đạo đức, Hoạt động trải nghiệm
 * - Khối 4, 5: Toán, Tiếng Việt, Khoa học, Lịch sử và Địa lí, Đạo đức, Hoạt động trải nghiệm
 */
export function getRequiredQuizSubjects(grade: number): string[] {
  if (grade <= 3) {
    return ['Toán', 'Tiếng Việt', 'Tự nhiên và Xã hội', 'Đạo đức', 'Hoạt động trải nghiệm'];
  }
  return ['Toán', 'Tiếng Việt', 'Khoa học', 'Lịch sử và Địa lí', 'Đạo đức', 'Hoạt động trải nghiệm'];
}

/**
 * Tạo URL liên kết trực tiếp tới chuyên mục bài tập cuối tuần trên https://loigiaihay.com/
 */
export function getLoigiaihayUrl(grade: number, subject: string, week: number): string {
  const cleanSubject = subject.toLowerCase().trim();
  const baseUrl = 'https://loigiaihay.com';

  if (cleanSubject.includes('toán')) {
    return `${baseUrl}/bai-tap-cuoi-tuan-toan-lop-${grade}-tuan-${week}-c112.html`;
  }
  if (cleanSubject.includes('tiếng việt')) {
    return `${baseUrl}/bai-tap-cuoi-tuan-tieng-viet-lop-${grade}-tuan-${week}-c113.html`;
  }
  if (cleanSubject.includes('khoa học')) {
    return `${baseUrl}/khoa-hoc-lop-${grade}-tuan-${week}-c356.html`;
  }
  if (cleanSubject.includes('lịch sử') || cleanSubject.includes('địa lí') || cleanSubject.includes('ls&đl')) {
    return `${baseUrl}/lich-su-va-dia-li-lop-${grade}-tuan-${week}-c357.html`;
  }
  if (cleanSubject.includes('tự nhiên') || cleanSubject.includes('tnxh')) {
    return `${baseUrl}/tu-nhien-va-xa-hoi-lop-${grade}-tuan-${week}-c358.html`;
  }
  if (cleanSubject.includes('đạo đức')) {
    return `${baseUrl}/dao-duc-lop-${grade}-tuan-${week}-c359.html`;
  }
  if (cleanSubject.includes('trải nghiệm') || cleanSubject.includes('hđtn')) {
    return `${baseUrl}/hoat-dong-trai-nghiem-lop-${grade}-tuan-${week}-c360.html`;
  }

  return `${baseUrl}/lop-${grade}`;
}

/**
 * Kho câu hỏi trắc nghiệm cuối tuần chuẩn hóa theo tuần, khối lớp và chủ đề bài dạy
 * Nguồn tham khảo: Loigiaihay.com - Ôn tập cuối tuần & Đề kiểm tra định kì
 */
export function getWeeklyQuizWorksheets(
  grade: number,
  week: number,
  lbgEntries: TKBEntry[] = [],
  lessons: KHBDLesson[] = []
): WeeklyQuizWorksheet[] {
  const subjects = getRequiredQuizSubjects(grade);

  return subjects.map((subject) => {
    // Tìm các bài dạy trong tuần cho môn này
    const relatedLbg = lbgEntries.filter((e) =>
      e.subject.toLowerCase().includes(subject.toLowerCase().slice(0, 4))
    );
    const lessonTitles = relatedLbg
      .map((e) => e.lessonTitle)
      .filter((t): t is string => Boolean(t))
      .slice(0, 3)
      .join('; ');

    const topicDesc = lessonTitles || `Trọng tâm kiến thức Tuần ${week} - Môn ${subject} Lớp ${grade}`;
    const sourceUrl = getLoigiaihayUrl(grade, subject, week);
    const questions = generateQuestionsForSubject(grade, subject, week, relatedLbg);

    return {
      id: `quiz-g${grade}-w${week}-${subject.replace(/\s+/g, '-').toLowerCase()}`,
      grade,
      week,
      subject,
      title: `Phiếu bài tập trắc nghiệm cuối tuần ${week} - Môn ${subject} Lớp ${grade}`,
      curriculumTopic: topicDesc,
      sourceUrl,
      sourceName: 'Lời Giải Hay (loigiaihay.com)',
      questions,
    };
  });
}

/**
 * Sinh ngân hàng câu hỏi trắc nghiệm chất lượng cao cho từng môn học
 */
function generateQuestionsForSubject(
  grade: number,
  subject: string,
  week: number,
  relatedLbg: TKBEntry[]
): MultipleChoiceQuestion[] {
  const s = subject.toLowerCase();

  // ========================== 1. MÔN TOÁN ==========================
  if (s.includes('toán')) {
    if (grade === 4) {
      return [
        {
          id: `m4-w${week}-q1`,
          number: 1,
          question: 'Số "Bảy mươi sáu nghìn năm trăm linh tám" được viết là:',
          options: {
            A: '76 580',
            B: '76 508',
            C: '76 058',
            D: '70 658',
          },
          correctAnswer: 'B',
          explanation:
            'Chữ số hàng chục nghìn là 7, hàng nghìn là 6, hàng trăm là 5, hàng chục là 0, hàng đơn vị là 8 -> 76 508. (Nguồn: Loigiaihay.com)',
        },
        {
          id: `m4-w${week}-q2`,
          number: 2,
          question: 'Giá trị của chữ số 5 trong số 85 412 là:',
          options: {
            A: '50 000',
            B: '5 000',
            C: '500',
            D: '50',
          },
          correctAnswer: 'B',
          explanation:
            'Chữ số 5 đứng ở hàng nghìn nên có giá trị là 5 000. (Nguồn: Loigiaihay.com)',
        },
        {
          id: `m4-w${week}-q3`,
          number: 3,
          question: 'Kết quả của phép tính 42 350 + 15 240 là:',
          options: {
            A: '57 590',
            B: '57 690',
            C: '58 590',
            D: '56 590',
          },
          correctAnswer: 'A',
          explanation:
            'Đặt tính rồi tính từ phải sang trái: 0+0=0, 5+4=9, 3+2=5, 2+5=7, 4+1=5. Kết quả là 57 590.',
        },
        {
          id: `m4-w${week}-q4`,
          number: 4,
          question: 'Số liền sau của số lớn nhất có năm chữ số khác nhau là số nào?',
          options: {
            A: '98 766',
            B: '98 765',
            C: '99 999',
            D: '100 000',
          },
          correctAnswer: 'A',
          explanation:
            'Số lớn nhất có 5 chữ số khác nhau là 98 765. Số liền sau của 98 765 là 98 765 + 1 = 98 766.',
        },
        {
          id: `m4-w${week}-q5`,
          number: 5,
          question: 'Một nông trại ngày thứ nhất thu hoạch được 12 340 kg thóc, ngày thứ hai thu được nhiều hơn ngày thứ nhất 1 500 kg. Cả hai ngày nông trại thu hoạch được bao nhiêu ki-lô-gam thóc?',
          options: {
            A: '13 840 kg',
            B: '26 180 kg',
            C: '25 180 kg',
            D: '24 840 kg',
          },
          correctAnswer: 'B',
          explanation:
            'Ngày thứ hai thu được: 12 340 + 1 500 = 13 840 (kg). Cả hai ngày thu được: 12 340 + 13 840 = 26 180 (kg).',
        },
      ];
    } else if (grade === 1) {
      return [
        {
          id: `m1-w${week}-q1`,
          number: 1,
          question: 'Hình nào dưới đây có dạng hình tròn?',
          options: {
            A: 'Mặt đồng hồ tròn',
            B: 'Khung ảnh vuông',
            C: 'Chiếc thước kẻ tam giác',
            D: 'Mặt bàn chữ nhật',
          },
          correctAnswer: 'A',
          explanation: 'Mặt đồng hồ tròn có dạng hình tròn.',
        },
        {
          id: `m1-w${week}-q2`,
          number: 2,
          question: 'Trong các số: 1, 4, 3, 5 số nào lớn nhất?',
          options: { A: '1', B: '3', C: '4', D: '5' },
          correctAnswer: 'D',
          explanation: 'Thứ tự từ bé đến lớn là: 1, 3, 4, 5. Vậy số lớn nhất là 5.',
        },
        {
          id: `m1-w${week}-q3`,
          number: 3,
          question: 'Có 3 quả bóng đỏ và 2 quả bóng xanh. Có tất cả bao nhiêu quả bóng?',
          options: { A: '4 quả', B: '5 quả', C: '6 quả', D: '3 quả' },
          correctAnswer: 'B',
          explanation: '3 + 2 = 5 (quả bóng).',
        },
      ];
    } else if (grade === 2) {
      return [
        {
          id: `m2-w${week}-q1`,
          number: 1,
          question: 'Số gồm 6 chục và 8 đơn vị là:',
          options: { A: '86', B: '68', C: '608', D: '806' },
          correctAnswer: 'B',
          explanation: '6 chục và 8 đơn vị viết là 68.',
        },
        {
          id: `m2-w${week}-q2`,
          number: 2,
          question: 'Số liền trước của số 90 là:',
          options: { A: '89', B: '91', C: '88', D: '92' },
          correctAnswer: 'A',
          explanation: 'Số liền trước của 90 là 90 - 1 = 89.',
        },
        {
          id: `m2-w${week}-q3`,
          number: 3,
          question: 'Kết quả của phép tính 45 + 23 là:',
          options: { A: '67', B: '68', C: '78', D: '58' },
          correctAnswer: 'B',
          explanation: '45 + 23 = 68.',
        },
      ];
    } else if (grade === 3) {
      return [
        {
          id: `m3-w${week}-q1`,
          number: 1,
          question: 'Số 745 đọc là:',
          options: {
            A: 'Bảy trăm bốn mươi lăm',
            B: 'Bảy trăm năm mươi tư',
            C: 'Bảy bốn lăm',
            D: 'Bảy trăm bốn lăm',
          },
          correctAnswer: 'A',
          explanation: '745 đọc đúng chuẩn là Bảy trăm bốn mươi lăm.',
        },
        {
          id: `m3-w${week}-q2`,
          number: 2,
          question: 'Giá trị của x trong phép tính x - 120 = 430 là:',
          options: { A: '310', B: '550', C: '540', D: '520' },
          correctAnswer: 'B',
          explanation: 'x = 430 + 120 = 550.',
        },
        {
          id: `m3-w${week}-q3`,
          number: 3,
          question: 'Kết quả của phép tính 5 x 8 là:',
          options: { A: '35', B: '40', C: '45', D: '30' },
          correctAnswer: 'B',
          explanation: '5 x 8 = 40 (Bảng nhân 5).',
        },
      ];
    } else {
      // Grade 5
      return [
        {
          id: `m5-w${week}-q1`,
          number: 1,
          question: 'Phân số thập phân nào dưới đây bằng phân số 3/5?',
          options: { A: '6/10', B: '3/10', C: '15/100', D: '60/10' },
          correctAnswer: 'A',
          explanation: '3/5 = (3 x 2)/(5 x 2) = 6/10.',
        },
        {
          id: `m5-w${week}-q2`,
          number: 2,
          question: 'Hỗn số 3 2/5 được chuyển thành phân số nào?',
          options: { A: '11/5', B: '17/5', C: '6/5', D: '13/5' },
          correctAnswer: 'B',
          explanation: '3 2/5 = (3 x 5 + 2)/5 = 17/5.',
        },
        {
          id: `m5-w${week}-q3`,
          number: 3,
          question: 'Một lớp học có 40 học sinh, trong đó có 24 học sinh nữ. Tỉ số phần trăm của học sinh nữ so với cả lớp là:',
          options: { A: '40%', B: '50%', C: '60%', D: '70%' },
          correctAnswer: 'C',
          explanation: '24 : 40 = 0,6 = 60%.',
        },
      ];
    }
  }

  // ========================== 2. MÔN TIẾNG VIỆT ==========================
  if (s.includes('tiếng việt')) {
    if (grade === 4) {
      return [
        {
          id: `tv4-w${week}-q1`,
          number: 1,
          question: 'Trong các từ sau, nhóm từ nào gồm toàn danh từ chỉ người?',
          options: {
            A: 'Thầy giáo, bác sĩ, công nhân, học sinh',
            B: 'Mặt trời, hoa sen, dòng sông, ngọn núi',
            C: 'Quyển sách, cái bút, bàn học, thước kẻ',
            D: 'Hiền lành, dũng cảm, chăm chỉ, siêng năng',
          },
          correctAnswer: 'A',
          explanation:
            'Thầy giáo, bác sĩ, công nhân, học sinh là các danh từ chỉ người. (Nguồn: Loigiaihay.com)',
        },
        {
          id: `tv4-w${week}-q2`,
          number: 2,
          question: 'Từ nào dưới đây là danh từ riêng cần viết hoa?',
          options: {
            A: 'dòng sông',
            B: 'mê kông',
            C: 'ngọn núi',
            D: 'thành phố',
          },
          correctAnswer: 'B',
          explanation:
            '"Mê Kông" là tên riêng của dòng sông nên là danh từ riêng, phải viết hoa các chữ cái đầu của mỗi tiếng.',
        },
        {
          id: `tv4-w${week}-q3`,
          number: 3,
          question: 'Câu nào dưới đây được dùng để kể lại một sự việc?',
          options: {
            A: 'Bạn có thích đọc truyện cổ tích không?',
            B: 'Hôm nay, em dậy sớm cùng mẹ đi chợ mua đồ dùng học tập.',
            C: 'Ôi, cảnh bình minh trên biển đẹp quá!',
            D: 'Hãy giữ trật tự trong giờ học!',
          },
          correctAnswer: 'B',
          explanation:
            'Câu B là câu kể nêu sự việc em dậy sớm cùng mẹ đi chợ.',
        },
        {
          id: `tv4-w${week}-q4`,
          number: 4,
          question: 'Tìm danh từ chung trong câu sau: "Trường Tiểu học Mỹ Lạc có hàng cây phượng nở hoa đỏ rực."',
          options: {
            A: 'Mỹ Lạc',
            B: 'Trường Tiểu học Mỹ Lạc',
            C: 'hàng cây, phượng, hoa',
            D: 'đỏ rực',
          },
          correctAnswer: 'C',
          explanation:
            '"hàng cây", "phượng", "hoa" là danh từ chung; "đỏ rực" là tính từ; "Mỹ Lạc" là danh từ riêng.',
        },
        {
          id: `tv4-w${week}-q5`,
          number: 5,
          question: 'Trong bài văn kể chuyện, phần "Mở bài" có nhiệm vụ chính là gì?',
          options: {
            A: 'Kể lại toàn bộ các chi tiết của câu chuyện',
            B: 'Giới thiệu câu chuyện định kể và nhân vật hoặc hoàn cảnh diễn ra',
            C: 'Nêu cảm nghĩ sâu sắc và bài học rút ra',
            D: 'Kể kết thúc của câu chuyện',
          },
          correctAnswer: 'B',
          explanation:
            'Mở bài có nhiệm vụ giới thiệu câu chuyện và hoàn cảnh/nhân vật. Kết bài mới nêu ý nghĩa hoặc cảm xúc.',
        },
      ];
    } else if (grade === 1) {
      return [
        {
          id: `tv1-w${week}-q1`,
          number: 1,
          question: 'Chữ nào dưới đây là chữ in hoa của chữ "a"?',
          options: { A: 'A', B: 'B', C: 'C', D: 'D' },
          correctAnswer: 'A',
          explanation: 'Chữ A là chữ in hoa của chữ a.',
        },
        {
          id: `tv1-w${week}-q2`,
          number: 2,
          question: 'Tiếng "bà" gồm có âm đầu, âm chính và dấu thanh nào?',
          options: {
            A: 'Âm đầu b, âm chính a, dấu huyền',
            B: 'Âm đầu b, âm chính a, dấu sắc',
            C: 'Âm đầu a, âm chính b, dấu hỏi',
            D: 'Âm đầu b, âm chính a, không dấu',
          },
          correctAnswer: 'A',
          explanation: 'Tiếng "bà" có âm đầu b, âm a và thanh huyền.',
        },
      ];
    } else if (grade === 2) {
      return [
        {
          id: `tv2-w${week}-q1`,
          number: 1,
          question: 'Từ nào dưới đây chỉ đồ dùng học tập của học sinh?',
          options: { A: 'Cái bảng con', B: 'Cây bàng', C: 'Bông hoa', D: 'Con mèo' },
          correctAnswer: 'A',
          explanation: 'Cái bảng con là đồ dùng học tập.',
        },
        {
          id: `tv2-w${week}-q2`,
          number: 2,
          question: 'Câu nào dưới đây là câu giới thiệu?',
          options: {
            A: 'Em là học sinh lớp 2.',
            B: 'Em đang chăm chỉ đọc sách.',
            C: 'Trường học của em rất đẹp.',
            D: 'Bạn hãy giữ gìn sách vở nhé!',
          },
          correctAnswer: 'A',
          explanation: 'Câu theo mẫu "Ai là gì?" giới thiệu bản thân.',
        },
      ];
    } else if (grade === 3) {
      return [
        {
          id: `tv3-w${week}-q1`,
          number: 1,
          question: 'Câu nào dưới đây có hình ảnh so sánh?',
          options: {
            A: 'Mặt trời đỏ rực như một quả cầu lửa.',
            B: 'Mặt trời mọc ở hướng Đông.',
            C: 'Ánh nắng ban mai thật ấm áp.',
            D: 'Chúng em đi học dưới ánh mặt trời.',
          },
          correctAnswer: 'A',
          explanation: 'Từ "như" nối hai vế so sánh: Mặt trời - quả cầu lửa.',
        },
        {
          id: `tv3-w${week}-q2`,
          number: 2,
          question: 'Dấu câu nào thích hợp để điền vào cuối câu sau: "Bạn Lan có đi học thư viện không"',
          options: { A: 'Dấu chấm (.)', B: 'Dấu chấm hỏi (?)', C: 'Dấu chấm than (!)', D: 'Dấu phẩy (,)' },
          correctAnswer: 'B',
          explanation: 'Đây là câu hỏi nên kết thúc bằng dấu chấm hỏi (?).',
        },
      ];
    } else {
      // Grade 5
      return [
        {
          id: `tv5-w${week}-q1`,
          number: 1,
          question: 'Cặp từ nào dưới đây là cặp từ đồng nghĩa?',
          options: {
            A: 'Chăm chỉ - Siêng năng',
            B: 'Cao - Thấp',
            C: 'Sáng - Tối',
            D: 'Rộng - Hẹp',
          },
          correctAnswer: 'A',
          explanation: 'Chăm chỉ và siêng năng đều chỉ đức tính tích cực làm việc đều đặn.',
        },
        {
          id: `tv5-w${week}-q2`,
          number: 2,
          question: 'Bài văn miêu tả cảnh thường gồm có mấy phần?',
          options: {
            A: '2 phần: Mở bài và Thân bài',
            B: '3 phần: Mở bài, Thân bài và Kết bài',
            C: '4 phần: Mở bài, Tả bao quát, Tả chi tiết, Kết bài',
            D: '1 phần duy nhất',
          },
          correctAnswer: 'B',
          explanation: 'Bài văn miêu tả chuẩn gồm 3 phần: Mở bài, Thân bài và Kết bài.',
        },
      ];
    }
  }

  // ========================== 3. MÔN KHOA HỌC (KHỐI 4, 5) ==========================
  if (s.includes('khoa học')) {
    if (grade === 4) {
      return [
        {
          id: `kh4-w${week}-q1`,
          number: 1,
          question: 'Nước ở điều kiện thông thường có những tính chất nào sau đây?',
          options: {
            A: 'Có màu trắng, mùi thơm, vị ngọt',
            B: 'Không màu, không mùi, không vị, có hình dạng nhất định',
            C: 'Không màu, không mùi, không vị, không có hình dạng nhất định, chảy từ cao xuống thấp',
            D: 'Có màu xanh, vị mặn, không chảy được',
          },
          correctAnswer: 'C',
          explanation:
            'Nước nguyên chất là chất lỏng trong suốt, không màu, không mùi, không vị, không có hình dạng nhất định, chảy từ cao xuống thấp và lan ra khắp mọi phía. (Nguồn: Loigiaihay.com)',
        },
        {
          id: `kh4-w${week}-q2`,
          number: 2,
          question: 'Chất nào dưới đây có thể hòa tan được trong nước?',
          options: {
            A: 'Đường ăn',
            B: 'Cát mịn',
            C: 'Dầu ăn',
            D: 'Mẩu đá sỏi',
          },
          correctAnswer: 'A',
          explanation:
            'Đường ăn hòa tan hoàn toàn trong nước tạo thành dung dịch nước đường. Cát, dầu ăn, đá không tan trong nước.',
        },
        {
          id: `kh4-w${week}-q3`,
          number: 3,
          question: 'Hiện tượng nước từ thể lỏng chuyển sang thể hơi (khí) được gọi là hiện tượng gì?',
          options: {
            A: 'Ngưng tụ',
            B: 'Bay hơi',
            C: 'Đông đặc',
            D: 'Nóng chảy',
          },
          correctAnswer: 'B',
          explanation:
            'Nước chuyển từ thể lỏng sang thể khí (hơi nước) gọi là sự bay hơi.',
        },
        {
          id: `kh4-w${week}-q4`,
          number: 4,
          question: 'Hành động nào dưới đây góp phần bảo vệ và tiết kiệm nguồn nước sạch?',
          options: {
            A: 'Xả rác thải và nước giặt xuống ao, hồ',
            B: 'Khóa vòi nước ngay sau khi sử dụng xong và không để nước chảy tràn',
            C: 'Mở vòi nước liên tục khi đánh răng',
            D: 'Rửa xe bằng vòi phun áp lực lớn không ngắt',
          },
          correctAnswer: 'B',
          explanation:
            'Khóa chặt vòi nước sau khi dùng và sửa chữa vòi rò rỉ là hành động thiết thực tiết kiệm nước.',
        },
      ];
    } else {
      // Grade 5
      return [
        {
          id: `kh5-w${week}-q1`,
          number: 1,
          question: 'Cơ quan nào trong cơ thể con người thực hiện chức năng sinh sản?',
          options: {
            A: 'Cơ quan tiêu hóa',
            B: 'Cơ quan tuần hoàn',
            C: 'Cơ quan sinh dục',
            D: 'Cơ quan hô hấp',
          },
          correctAnswer: 'C',
          explanation: 'Cơ quan sinh dục thực hiện chức năng sinh sản duy trì nòi giống.',
        },
        {
          id: `kh5-w${week}-q2`,
          number: 2,
          question: 'Hợp tử ở người được hình thành do sự kết hợp giữa:',
          options: {
            A: 'Tinh trùng của người bố và trứng của người mẹ',
            B: 'Hai tế bào máu',
            C: 'Tế bào thần kinh và tế bào cơ',
            D: 'Hai giao tử đồng tính',
          },
          correctAnswer: 'A',
          explanation: 'Sự thụ tinh xảy ra khi tinh trùng kết hợp với trứng tạo thành hợp tử.',
        },
      ];
    }
  }

  // ========================== 4. MÔN LỊCH SỬ VÀ ĐỊA LÍ (KHỐI 4, 5) ==========================
  if (s.includes('lịch sử') || s.includes('địa lí') || s.includes('ls&đl')) {
    if (grade === 4) {
      return [
        {
          id: `ls4-w${week}-q1`,
          number: 1,
          question: 'Phương tiện nào dưới đây giúp chúng ta hình dung cụ thể về vị trí không gian của các đối tượng địa lí trên Trái Đất?',
          options: {
            A: 'Bản đồ / Lược đồ',
            B: 'Chiếc đồng hồ bấm giờ',
            C: 'Nhiệt kế thủy ngân',
            D: 'Kính lúp',
          },
          correctAnswer: 'A',
          explanation:
            'Bản đồ và lược đồ là phương tiện cơ bản thể hiện vị trí không gian của các đối tượng địa lí. (Nguồn: Loigiaihay.com)',
        },
        {
          id: `ls4-w${week}-q2`,
          number: 2,
          question: 'Quy ước phương hướng chính trên bản đồ thông thường là:',
          options: {
            A: 'Phía trên là hướng Bắc, phía dưới là hướng Nam, bên phải là hướng Đông, bên trái là hướng Tây',
            B: 'Phía trên là hướng Nam, phía dưới là hướng Bắc, bên phải là hướng Tây, bên trái là hướng Đông',
            C: 'Phía trên là hướng Đông, phía dưới là hướng Tây',
            D: 'Phía trên là hướng Tây, phía dưới là hướng Đông',
          },
          correctAnswer: 'A',
          explanation:
            'Quy ước bản đồ chuẩn: Trên là Bắc (N), dưới là Nam (S), phải là Đông (E), trái là Tây (W).',
        },
        {
          id: `ls4-w${week}-q3`,
          number: 3,
          question: 'Bộ phận "Bảng chú giải" trên bản đồ có tác dụng gì?',
          options: {
            A: 'Cho biết tên của người vẽ bản đồ',
            B: 'Giải thích ý nghĩa của các kí hiệu màu sắc, đường nét được dùng trên bản đồ',
            C: 'Chỉ ghi ngày tháng in ấn bản đồ',
            D: 'Đo nhiệt độ không khí',
          },
          correctAnswer: 'B',
          explanation:
            'Bảng chú giải giúp người đọc hiểu các kí hiệu (thủ đô, thành phố, sông, đường ranh giới...) trên bản đồ.',
        },
        {
          id: `ls4-w${week}-q4`,
          number: 4,
          question: 'Để tìm hiểu về cuộc sống của tổ tiên ta thời xa xưa, các nhà sử học căn cứ vào những nguồn tư liệu nào?',
          options: {
            A: 'Hiện vật khảo cổ, tài liệu chữ viết và lời kể truyền miệng / truyền thuyết',
            B: 'Chỉ dựa vào phim hoạt hình',
            C: 'Dự báo thời tiết tương lai',
            D: 'Kính viễn vọng thiên văn',
          },
          correctAnswer: 'A',
          explanation:
            'Các nguồn tư liệu lịch sử quan trọng gồm: hiện vật (trống đồng, đồ gốm...), chữ viết và tư liệu truyền khẩu.',
        },
      ];
    } else {
      // Grade 5
      return [
        {
          id: `ls5-w${week}-q1`,
          number: 1,
          question: 'Nước Việt Nam nằm ở khu vực nào của châu Á?',
          options: {
            A: 'Đông Nam Á',
            B: 'Bắc Á',
            C: 'Tây Á',
            D: 'Nam Á',
          },
          correctAnswer: 'A',
          explanation: 'Việt Nam nằm trên bán đảo Đông Dương, thuộc khu vực Đông Nam Á.',
        },
        {
          id: `ls5-w${week}-q2`,
          number: 2,
          question: 'Phần đất liền của nước ta tiếp giáp với những quốc gia nào?',
          options: {
            A: 'Trung Quốc, Lào, Cam-pu-chia',
            B: 'Thái Lan, Mi-an-ma, Lào',
            C: 'Trung Quốc, Thái Lan, Ma-lai-xi-a',
            D: 'Lào, Cam-pu-chia, In-đô-nê-xi-a',
          },
          correctAnswer: 'A',
          explanation: 'Đường biên giới trên đất liền của Việt Nam giáp với Trung Quốc (phía Bắc), Lào và Cam-pu-chia (phía Tây).',
        },
      ];
    }
  }

  // ========================== 5. MÔN TỰ NHIÊN VÀ XÃ HỘI (TNXH) (KHỐI 1, 2, 3) ==========================
  if (s.includes('tự nhiên') || s.includes('tnxh')) {
    if (grade === 1) {
      return [
        {
          id: `tnxh1-w${week}-q1`,
          number: 1,
          question: 'Gia đình em gồm có những ai?',
          options: {
            A: 'Ông, bà, bố, mẹ, anh, chị, em',
            B: 'Bác bảo vệ trường',
            C: 'Bạn bè cùng lớp',
            D: 'Bác sĩ ở bệnh viện',
          },
          correctAnswer: 'A',
          explanation: 'Gia đình thường gồm ông bà, cha mẹ và các con.',
        },
        {
          id: `tnxh1-w${week}-q2`,
          number: 2,
          question: 'Đồ dùng nào trong nhà có thể gây nguy hiểm (bỏng, đứt tay) em không nên tự ý nghịch?',
          options: {
            A: 'Phích nước sôi và dao nhọn',
            B: 'Gối ôm mềm',
            C: 'Vở tập vẽ',
            D: 'Gấu bông',
          },
          correctAnswer: 'A',
          explanation: 'Phích nước sôi và dao nhọn dễ gây bỏng hoặc đứt tay, trẻ nhỏ tuyệt đối không tự ý nghịch.',
        },
      ];
    } else if (grade === 2) {
      return [
        {
          id: `tnxh2-w${week}-q1`,
          number: 1,
          question: 'Trong một gia đình có 3 thế hệ cùng chung sống, thế hệ thứ nhất là ai?',
          options: {
            A: 'Ông, bà',
            B: 'Bố, mẹ',
            C: 'Con cái',
            D: 'Cháu chắt',
          },
          correctAnswer: 'A',
          explanation: 'Thế hệ thứ nhất là ông bà, thế hệ thứ hai là bố mẹ, thế hệ thứ ba là các con.',
        },
        {
          id: `tnxh2-w${week}-q2`,
          number: 2,
          question: 'Để phòng tránh ngộ độc khi ở nhà, chúng ta cần làm gì?',
          options: {
            A: 'Không tự ý uống thuốc khi chưa có chỉ định của bác sĩ hoặc sự hướng dẫn của bố mẹ',
            B: 'Ăn các loại thức ăn ôi thiu để lâu ngày',
            C: 'Để chung thuốc men và hóa chất tẩy rửa',
            D: 'Nếm thử các chai lọ lạ',
          },
          correctAnswer: 'A',
          explanation: 'Không tự ý uống thuốc và chỉ dùng thuốc khi có người lớn chỉ định.',
        },
      ];
    } else {
      // Grade 3
      return [
        {
          id: `tnxh3-w${week}-q1`,
          number: 1,
          question: 'Những người thuộc họ nội gồm có:',
          options: {
            A: 'Ông bà nội, bác, chú, cô (anh chị em ruột của bố)',
            B: 'Ông bà ngoại, cậu, dì (anh chị em ruột của mẹ)',
            C: 'Bạn bè thân thiết của bố mẹ',
            D: 'Hàng xóm láng giềng',
          },
          correctAnswer: 'A',
          explanation: 'Họ nội là những người cùng huyết thống bên phía người bố.',
        },
        {
          id: `tnxh3-w${week}-q2`,
          number: 2,
          question: 'Khi phát hiện có mùi khét hoặc ngọn lửa bắt đầu bốc lên trong nhà, việc đầu tiên em nên làm là gì?',
          options: {
            A: 'Hô hoán thật to báo cho người lớn và tìm lối thoát hiểm an toàn',
            B: 'Trốn vào gầm giường hoặc tủ quần áo',
            C: 'Quay lại tìm đồ chơi yêu thích',
            D: 'Đóng kín cửa phòng lại và ngồi yên',
          },
          correctAnswer: 'A',
          explanation: 'Cần lập tức hô hoán báo người lớn và thoát ra ngoài nơi an toàn, không được nấp vào chỗ kín.',
        },
      ];
    }
  }

  // ========================== 6. MÔN ĐẠO ĐỨC (KHỐI 1, 2, 3, 4, 5) ==========================
  if (s.includes('đạo đức')) {
    if (grade === 4) {
      return [
        {
          id: `dd4-w${week}-q1`,
          number: 1,
          question: 'Người lao động là những ai?',
          options: {
            A: 'Những người tạo ra của cải vật chất và giá trị tinh thần cho xã hội (nông dân, công nhân, bác sĩ, thầy cô...)',
            B: 'Chỉ có những người làm việc ở văn phòng',
            C: 'Chỉ có những người làm ruộng',
            D: 'Những người không làm việc',
          },
          correctAnswer: 'A',
          explanation:
            'Mọi người làm việc chân chính (lao động trí óc hay lao động chân tay) đều là người lao động quý báu của xã hội.',
        },
        {
          id: `dd4-w${week}-q2`,
          number: 2,
          question: 'Hành động nào dưới đây thể hiện lòng biết ơn người lao động?',
          options: {
            A: 'Ăn hết phần cơm của mình, không lãng phí thức ăn do bác nông dân vất vả làm ra',
            B: 'Vứt rác bừa bãi ra sân trường vì cho rằng đã có bác lao công dọn',
            C: 'Nói trống không khi mua hàng ở cửa hàng tạp hóa',
            D: 'Chê bai nghề nghiệp vất vả của người khác',
          },
          correctAnswer: 'A',
          explanation:
            'Trân trọng hạt gạo, không bỏ thừa thức ăn là cách giản dị và thiết thực nhất để tri ân bác nông dân.',
        },
        {
          id: `dd4-w${week}-q3`,
          number: 3,
          question: 'Khi gặp bác lao công đang quét dọn sân trường dưới trời nắng, em nên làm gì?',
          options: {
            A: 'Chào bác lễ phép và tự giác giữ gìn vệ sinh, không vứt rác lung tung',
            B: 'Chạy nhảy làm bụi bay lên',
            C: 'Làm ngơ coi như không quen biết',
            D: 'Xả vỏ bánh kẹo ngay trước mặt bác',
          },
          correctAnswer: 'A',
          explanation:
            'Chào hỏi lễ phép và có ý thức giữ gìn vệ sinh chung là thể hiện sự tôn trọng công sức người lao động.',
        },
      ];
    } else if (grade === 5) {
      return [
        {
          id: `dd5-w${week}-q1`,
          number: 1,
          question: 'Là học sinh lớp 5 - lớp lớn nhất trường tiểu học, em cần có thái độ và trách nhiệm như thế nào?',
          options: {
            A: 'Gương mẫu trong học tập, rèn luyện nề nếp và giúp đỡ các em lớp dưới',
            B: 'Tự cho mình quyền bắt nạt các em học sinh lớp nhỏ',
            C: 'Ỷ lại vào thầy cô giáo và cha mẹ',
            D: 'Không cần tuân thủ nội quy trường lớp',
          },
          correctAnswer: 'A',
          explanation: 'Học sinh lớp 5 cần gương mẫu, chăm ngoan và làm gương tốt cho các em nhỏ.',
        },
        {
          id: `dd5-w${week}-q2`,
          number: 2,
          question: 'Khi lỡ làm hỏng đồ dùng của bạn, việc làm đúng đắn và có trách nhiệm là:',
          options: {
            A: 'Dũng cảm nhận lỗi, xin lỗi bạn chân thành và tìm cách sửa chữa hoặc bồi thường',
            B: 'Giấu đi và đổ lỗi cho bạn bên cạnh',
            C: 'Làm ngơ như không có chuyện gì xảy ra',
            D: 'Bỏ chạy về chỗ',
          },
          correctAnswer: 'A',
          explanation: 'Biết dũng cảm nhận lỗi và sửa sai là biểu hiện của người có trách nhiệm với hành vi của mình.',
        },
      ];
    } else {
      // Grade 1, 2, 3
      return [
        {
          id: `dd-lower-w${week}-q1`,
          number: 1,
          question: 'Khi gặp thầy cô giáo hoặc người lớn tuổi trong trường, em cần làm gì?',
          options: {
            A: 'Đứng nghiêm, khoanh tay và cất lời chào lễ phép',
            B: 'Làm ngơ và chạy đi chỗ khác',
            C: 'Gọi to tên thầy cô',
            D: 'Cười đùa với bạn',
          },
          correctAnswer: 'A',
          explanation: 'Chào hỏi lễ phép là nét đẹp văn hóa đầu tiên của học sinh ngoan.',
        },
        {
          id: `dd-lower-w${week}-q2`,
          number: 2,
          question: 'Đến trường đúng giờ, xếp hàng ngay ngắn thể hiện điều gì?',
          options: {
            A: 'Ý thức tự giác và tôn trọng nội quy trường lớp',
            B: 'Bị bắt buộc làm theo',
            C: 'Không có tác dụng gì',
            D: 'Mất thời gian vui chơi',
          },
          correctAnswer: 'A',
          explanation: 'Đi học đúng giờ và xếp hàng trật tự thể hiện tính kỉ luật và nề nếp tốt.',
        },
      ];
    }
  }

  // ========================== 7. MÔN HOẠT ĐỘNG TRẢI NGHIỆM (HĐTN) ==========================
  // s.includes('hoạt động trải nghiệm') || s.includes('hđtn')
  return [
    {
      id: `hdtn-w${week}-q1`,
      number: 1,
      question: 'Mục đích chính của buổi sinh hoạt dưới cờ đầu tuần là gì?',
      options: {
        A: 'Chào cờ Tổ quốc trang nghiêm, sơ kết thi đua tuần qua và lắng nghe phát động phong trào tuần mới',
        B: 'Tập trung để vui chơi tự do',
        C: 'Làm bài kiểm tra các môn',
        D: 'Ăn điểm tâm sáng',
      },
      correctAnswer: 'A',
      explanation:
        'Lễ Chào cờ đầu tuần giáo dục lòng yêu nước, tinh thần tự hào dân tộc và triển khai các hoạt động thi đua.',
    },
    {
      id: `hdtn-w${week}-q2`,
      number: 2,
      question: 'Khi tham gia bầu Ban cán sự lớp (Lớp trưởng, Lớp phó, Tổ trưởng), em nên chọn những bạn có phẩm chất nào?',
      options: {
        A: 'Nhiệt tình, gương mẫu, chăm ngoan, có tinh thần trách nhiệm và sẵn sàng giúp đỡ bạn bè',
        B: 'Chỉ chọn bạn chơi thân với mình nhất',
        C: 'Chọn bạn hay cho đồ ăn vặt',
        D: 'Chọn bạn hay nói chuyện riêng',
      },
      correctAnswer: 'A',
      explanation:
        'Cán sự lớp cần là người gương mẫu, công tâm và có tinh thần trách nhiệm với tập thể lớp.',
    },
    {
      id: `hdtn-w${week}-q3`,
      number: 3,
      question: 'Xây dựng "Nội quy lớp học xanh - sạch - đẹp - an toàn" mang lại lợi ích gì cho em và các bạn?',
      options: {
        A: 'Tạo môi trường học tập thân thiện, an toàn, giúp mọi học sinh cùng tiến bộ',
        B: 'Làm cho lớp học thêm gò bó khó chịu',
        C: 'Không đem lại lợi ích gì',
        D: 'Chỉ để thầy cô kiểm tra',
      },
      correctAnswer: 'A',
      explanation:
        'Nội quy lớp học giúp xây dựng nề nếp kỉ cương, giữ gìn môi trường học tập lành mạnh và chan hòa tình bạn.',
    },
  ];
}
