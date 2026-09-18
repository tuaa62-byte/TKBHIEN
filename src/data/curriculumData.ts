/**
 * NGÂN HÀNG PHÂN PHỐI CHƯƠNG TRÌNH CHI TIẾT THEO CHUẨN GDPT 2018
 * Bộ sách: Kết nối tri thức với cuộc sống (Học kì 1: Tuần 1 đến Tuần 18+)
 * Đã chuẩn hóa: Loại bỏ hoàn toàn tiền tố "Lớp X", "Khối X" và từ thừa "Bài học / bài học"
 */

export interface SubjectCurriculumItem {
  week: number;
  period: number;
  title: string;
  ppct: number;
  subType?: string;
}

// =========================================================================
// 1. KHỐI 4 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (Chi tiết từng tuần 1 -> 18+)
// =========================================================================

// --- TIẾNG VIỆT 4 (7 tiết/tuần: Đọc 2, Viết 2, LTVC 1, Đọc mở rộng/Góc sáng tạo 1, Nói và nghe 1) ---
export const GRADE_4_TIENG_VIET: Record<number, string[]> = {
  1: [
    'Bài 1: Điều kì diệu (Tiết 1 - Đọc)',
    'Bài 1: Tìm hiểu đoạn văn và bài văn (Viết)',
    'Bài 1: Danh từ (Luyện từ và câu)',
    'Bài 2: Thi nhạc (Tiết 1 - Đọc)',
    'Bài 2: Tìm ý cho đoạn văn nêu ý kiến (Viết)',
    'Đọc mở rộng: Đọc sách báo về thiếu nhi',
    'Nói và nghe: Tôi và các bạn',
  ],
  2: [
    'Bài 3: Anh em sinh đôi (Tiết 1 - Đọc)',
    'Bài 3: Tìm ý cho đoạn văn nêu ý kiến (tiếp theo)',
    'Bài 3: Danh từ chung, danh từ riêng (LTVC)',
    'Bài 4: Bầu trời trong quả trứng (Tiết 1 - Đọc)',
    'Bài 4: Viết đoạn văn nêu ý kiến',
    'Đọc mở rộng: Đọc truyện về tình bạn, tình thân',
    'Nói và nghe: Kể chuyện về lòng nhân ái',
  ],
  3: [
    'Bài 5: Tiếng nói của cỏ cây (Tiết 1 - Đọc)',
    'Bài 5: Tìm hiểu cách viết bài văn kể lại một sự việc (Viết)',
    'Bài 5: Luyện tập về danh từ chung, danh từ riêng (LTVC)',
    'Bài 6: Tập làm bác sĩ (Tiết 1 - Đọc)',
    'Bài 6: Lập dàn ý cho bài văn kể lại một sự việc (Viết)',
    'Đọc mở rộng: Sinh hoạt câu lạc bộ đọc sách',
    'Nói và nghe: Kể lại một trải nghiệm đáng nhớ',
  ],
  4: [
    'Bài 7: Đò Lèn (Tiết 1 - Đọc)',
    'Bài 7: Viết đoạn văn cho bài văn kể lại một sự việc (Viết)',
    'Bài 7: Luyện tập về danh từ (LTVC)',
    'Bài 8: Búp bê Man-đa-la (Tiết 1 - Đọc)',
    'Bài 8: Viết bài văn kể lại một sự việc',
    'Đọc mở rộng: Đọc sách báo về tuổi thơ và ước mơ',
    'Nói và nghe: Trao đổi về một nhân vật trong truyện',
  ],
  5: [
    'Bài 9: Ánh sáng của yêu thương (Tiết 1 - Đọc)',
    'Bài 9: Trả bài văn kể lại một sự việc (Viết)',
    'Bài 9: Động từ (LTVC)',
    'Bài 10: Đồng cỏ nở hoa (Tiết 1 - Đọc)',
    'Bài 10: Tìm hiểu cách viết bài văn thuật lại một sự việc (Viết)',
    'Đọc mở rộng: Đọc câu chuyện về tình yêu thương',
    'Nói và nghe: Việc làm thể hiện sự quan tâm, chăm sóc',
  ],
  6: [
    'Bài 11: Thanh âm của núi (Tiết 1 - Đọc)',
    'Bài 11: Lập dàn ý bài văn thuật lại một sự việc (Viết)',
    'Bài 11: Luyện tập về động từ (LTVC)',
    'Bài 12: Bầu trời mùa thu (Tiết 1 - Đọc)',
    'Bài 12: Viết đoạn văn cho bài văn thuật lại một sự việc',
    'Đọc mở rộng: Đọc thơ về thiên nhiên, đất nước',
    'Nói và nghe: Kể lại một hoạt động tập thể em đã tham gia',
  ],
  7: [
    'Bài 13: Hạt lúa hào phóng (Tiết 1 - Đọc)',
    'Bài 13: Viết bài văn thuật lại một sự việc (Viết)',
    'Bài 13: Luyện tập về động từ (tiếp theo) (LTVC)',
    'Bài 14: Cuộc họp của những con số (Tiết 1 - Đọc)',
    'Bài 14: Tìm hiểu cách viết bài văn kể lại câu chuyện cổ tích',
    'Đọc mở rộng: Đọc truyện ngụ ngôn, truyện cổ tích',
    'Nói và nghe: Trao đổi về câu chuyện cổ tích em yêu thích',
  ],
  8: [
    'Bài 15: Con muốn làm một cái cây (Tiết 1 - Đọc)',
    'Bài 15: Lập dàn ý bài văn kể lại câu chuyện cổ tích (Viết)',
    'Bài 15: Quy tắc viết tên cơ quan, tổ chức (LTVC)',
    'Bài 16: Trên khóm tre đầu ngõ (Tiết 1 - Đọc)',
    'Bài 16: Viết bài văn kể lại câu chuyện cổ tích',
    'Đọc mở rộng: Sinh hoạt câu lạc bộ đọc sách',
    'Nói và nghe: Đóng vai kể lại câu chuyện cổ tích',
  ],
  9: [
    'Ôn tập giữa học kì 1 (Tiết 1 - Đọc và trả lời câu hỏi)',
    'Ôn tập giữa học kì 1 (Tiết 2 - Ôn luyện viết)',
    'Ôn tập giữa học kì 1 (Tiết 3 - Ôn tập Luyện từ và câu)',
    'Ôn tập giữa học kì 1 (Tiết 4 - Đánh giá kĩ năng đọc hiểu)',
    'Ôn tập giữa học kì 1 (Tiết 5 - Đánh giá kĩ năng viết)',
    'Kiểm tra định kì giữa học kì 1 (Phần Đọc)',
    'Kiểm tra định kì giữa học kì 1 (Phần Viết)',
  ],
  10: [
    'Bài 17: Vẽ màu (Tiết 1 - Đọc)',
    'Bài 17: Trả bài văn kể lại câu chuyện cổ tích (Viết)',
    'Bài 17: Tính từ (LTVC)',
    'Bài 18: Đồng hào có ma (Tiết 1 - Đọc)',
    'Bài 18: Tìm hiểu cách viết đoạn văn tưởng tượng (Viết)',
    'Đọc mở rộng: Đọc truyện khoa học viễn tưởng',
    'Nói và nghe: Ước mơ của em về tương lai',
  ],
  11: [
    'Bài 19: Khi trang sách mở ra (Tiết 1 - Đọc)',
    'Bài 19: Tìm ý cho đoạn văn tưởng tượng (Viết)',
    'Bài 19: Luyện tập về tính từ (LTVC)',
    'Bài 20: Bạn muốn làm gì? (Tiết 1 - Đọc)',
    'Bài 20: Viết đoạn văn tưởng tượng',
    'Đọc mở rộng: Đọc sách báo về sáng tạo khoa học',
    'Nói và nghe: Giới thiệu phát minh, sáng chế của thiếu nhi',
  ],
  12: [
    'Bài 21: Chiều biên cương (Tiết 1 - Đọc)',
    'Bài 21: Luyện tập viết đoạn văn tưởng tượng (Viết)',
    'Bài 21: Luyện tập về tính từ (tiếp theo) (LTVC)',
    'Bài 22: Mưa trên đảo Sinh Tồn (Tiết 1 - Đọc)',
    'Bài 22: Tìm hiểu cách viết bài văn miêu tả cây cối (Viết)',
    'Đọc mở rộng: Đọc thơ, bài văn về biển đảo quê hương',
    'Nói và nghe: Vẻ đẹp non sông đất nước',
  ],
  13: [
    'Bài 23: Vườn cây của ba (Tiết 1 - Đọc)',
    'Bài 23: Quan sát cây cối quanh em (Viết)',
    'Bài 23: Dấu gạch ngang (LTVC)',
    'Bài 24: Trong ánh chớp (Tiết 1 - Đọc)',
    'Bài 24: Lập dàn ý bài văn miêu tả cây cối (Viết)',
    'Đọc mở rộng: Đọc bài viết về thế giới thực vật',
    'Nói và nghe: Giới thiệu loài cây em yêu quý',
  ],
  14: [
    'Bài 25: Tiếng gà trưa (Tiết 1 - Đọc)',
    'Bài 25: Viết đoạn văn miêu tả cây cối (Viết)',
    'Bài 25: Luyện tập về dấu gạch ngang (LTVC)',
    'Bài 26: Người tìm đường lên các vì sao (Tiết 1 - Đọc)',
    'Bài 26: Luyện tập viết đoạn văn miêu tả cây cối (tiếp theo)',
    'Đọc mở rộng: Đọc sách danh nhân khoa học',
    'Nói và nghe: Kể câu chuyện về một tấm gương sáng tạo',
  ],
  15: [
    'Bài 27: Bay cùng cánh diều (Tiết 1 - Đọc)',
    'Bài 27: Viết bài văn miêu tả cây cối (Viết)',
    'Bài 27: Biện pháp nhân hóa (LTVC)',
    'Bài 28: Khám phá thế giới kì thú (Tiết 1 - Đọc)',
    'Bài 28: Tìm hiểu cách viết thư thăm hỏi (Viết)',
    'Đọc mở rộng: Sinh hoạt câu lạc bộ đọc sách',
    'Nói và nghe: Hành tinh xanh của chúng ta',
  ],
  16: [
    'Bài 29: Trăng sáng trên đầm sen (Tiết 1 - Đọc)',
    'Bài 29: Lập dàn ý và viết một bức thư (Viết)',
    'Bài 29: Luyện tập về biện pháp nhân hóa (LTVC)',
    'Bài 30: Cánh buồm (Tiết 1 - Đọc)',
    'Bài 30: Trả bài văn miêu tả cây cối (Viết)',
    'Đọc mở rộng: Đọc tác phẩm văn học về tình bạn',
    'Nói và nghe: Giao lưu và chia sẻ cảm nghĩ',
  ],
  17: [
    'Bài 31: Khúc ca ban mai (Tiết 1 - Đọc)',
    'Bài 31: Luyện tập viết thư (Viết)',
    'Bài 31: Ôn tập từ loại: Danh từ, Động từ, Tính từ (LTVC)',
    'Bài 32: Đất nước ngàn năm (Tiết 1 - Đọc)',
    'Bài 32: Đánh giá kĩ năng viết học kì 1',
    'Đọc mở rộng: Đọc tài liệu truyền thống lịch sử',
    'Ôn tập và củng cố kiến thức cuối học kì 1',
  ],
  18: [
    'Ôn tập cuối học kì 1 (Tiết 1 - Ôn luyện đọc thành tiếng)',
    'Ôn tập cuối học kì 1 (Tiết 2 - Đọc hiểu và trả lời câu hỏi)',
    'Ôn tập cuối học kì 1 (Tiết 3 - Ôn tập Luyện từ và câu)',
    'Ôn tập cuối học kì 1 (Tiết 4 - Rèn luyện kĩ năng viết văn)',
    'Kiểm tra định kì cuối học kì 1 (Đọc thành tiếng)',
    'Kiểm tra định kì cuối học kì 1 (Đọc hiểu và LTVC)',
    'Kiểm tra định kì cuối học kì 1 (Chính tả và Tập làm văn)',
  ],
};

// --- TOÁN 4 (5 tiết/tuần) ---
export const GRADE_4_TOAN: Record<number, string[]> = {
  1: [
    'Bài 1: Ôn tập các số đến 100 000 (Tiết 1)',
    'Bài 1: Ôn tập các số đến 100 000 (Tiết 2)',
    'Bài 2: Ôn tập các phép tính trong phạm vi 100 000 (Tiết 1)',
    'Bài 2: Ôn tập các phép tính trong phạm vi 100 000 (Tiết 2)',
    'Bài 3: Số chẵn, số lẻ',
  ],
  2: [
    'Bài 4: Biểu thức chứa một chữ (Tiết 1)',
    'Bài 4: Biểu thức chứa một chữ (Tiết 2)',
    'Bài 5: Giải bài toán có ba bước tính (Tiết 1)',
    'Bài 5: Giải bài toán có ba bước tính (Tiết 2)',
    'Bài 6: Luyện tập chung',
  ],
  3: [
    'Bài 7: Các số có sáu chữ số (Tiết 1)',
    'Bài 7: Các số có sáu chữ số (Tiết 2)',
    'Bài 8: Hàng và lớp (Tiết 1)',
    'Bài 8: Hàng và lớp (Tiết 2)',
    'Bài 9: Luyện tập chung về hàng và lớp',
  ],
  4: [
    'Bài 10: Số có nhiều chữ số (Tiết 1)',
    'Bài 10: Số có nhiều chữ số (Tiết 2)',
    'Bài 11: Triệu và lớp triệu (Tiết 1)',
    'Bài 11: Triệu và lớp triệu (Tiết 2)',
    'Bài 12: Luyện tập chung về lớp triệu',
  ],
  5: [
    'Bài 13: Dãy số tự nhiên',
    'Bài 14: Viết số tự nhiên trong hệ thập phân',
    'Bài 15: So sánh các số có nhiều chữ số (Tiết 1)',
    'Bài 15: So sánh các số có nhiều chữ số (Tiết 2)',
    'Bài 16: Làm tròn số đến hàng trăm nghìn',
  ],
  6: [
    'Bài 17: Luyện tập chung (Tiết 1)',
    'Bài 17: Luyện tập chung (Tiết 2)',
    'Bài 18: Yến, tạ, tấn (Tiết 1)',
    'Bài 18: Yến, tạ, tấn (Tiết 2)',
    'Bài 19: Giây, thế kỉ (Tiết 1)',
  ],
  7: [
    'Bài 19: Giây, thế kỉ (Tiết 2)',
    'Bài 20: Thực hành và trải nghiệm sử dụng một số đơn vị đo đại lượng',
    'Bài 21: Luyện tập chung đơn vị đo đại lượng',
    'Bài 22: Phép cộng các số có nhiều chữ số (Tiết 1)',
    'Bài 22: Phép cộng các số có nhiều chữ số (Tiết 2)',
  ],
  8: [
    'Bài 23: Phép trừ các số có nhiều chữ số (Tiết 1)',
    'Bài 23: Phép trừ các số có nhiều chữ số (Tiết 2)',
    'Bài 24: Tính chất giao hoán và kết hợp của phép cộng (Tiết 1)',
    'Bài 24: Tính chất giao hoán và kết hợp của phép cộng (Tiết 2)',
    'Bài 25: Luyện tập chung',
  ],
  9: [
    'Bài 26: Tìm hai số khi biết tổng và hiệu của hai số đó (Tiết 1)',
    'Bài 26: Tìm hai số khi biết tổng và hiệu của hai số đó (Tiết 2)',
    'Bài 27: Luyện tập tìm hai số khi biết tổng và hiệu',
    'Bài 28: Ôn tập giữa học kì 1 (Tiết 1)',
    'Bài 28: Ôn tập giữa học kì 1 (Tiết 2)',
  ],
  10: [
    'Bài 29: Góc nhọn, góc tù, góc bẹt (Tiết 1)',
    'Bài 29: Góc nhọn, góc tù, góc bẹt (Tiết 2)',
    'Bài 30: Hai đường thẳng vuông góc (Tiết 1)',
    'Bài 30: Hai đường thẳng vuông góc (Tiết 2)',
    'Bài 31: Hai đường thẳng song song (Tiết 1)',
  ],
  11: [
    'Bài 31: Hai đường thẳng song song (Tiết 2)',
    'Bài 32: Thực hành vẽ hai đường thẳng vuông góc, song song',
    'Bài 33: Luyện tập chung về hình học',
    'Bài 34: Nhân với số có một chữ số (Tiết 1)',
    'Bài 34: Nhân với số có một chữ số (Tiết 2)',
  ],
  12: [
    'Bài 35: Tính chất giao hoán và kết hợp của phép nhân (Tiết 1)',
    'Bài 35: Tính chất giao hoán và kết hợp của phép nhân (Tiết 2)',
    'Bài 36: Nhân với 10, 100, 1000,... Chia cho 10, 100, 1000,...',
    'Bài 37: Nhân với số có tận cùng là chữ số 0',
    'Bài 38: Luyện tập chung',
  ],
  13: [
    'Bài 39: Nhân với số có hai chữ số (Tiết 1)',
    'Bài 39: Nhân với số có hai chữ số (Tiết 2)',
    'Bài 40: Luyện tập nhân với số có hai chữ số',
    'Bài 41: Chia cho số có một chữ số (Tiết 1)',
    'Bài 41: Chia cho số có một chữ số (Tiết 2)',
  ],
  14: [
    'Bài 42: Chia cho số có hai chữ số (Tiết 1)',
    'Bài 42: Chia cho số có hai chữ số (Tiết 2)',
    'Bài 43: Thương có chữ số 0 (Tiết 1)',
    'Bài 43: Thương có chữ số 0 (Tiết 2)',
    'Bài 44: Luyện tập chung phép chia',
  ],
  15: [
    'Bài 45: Thực hành ước lượng thương trong phép chia',
    'Bài 46: Luyện tập chung bốn phép tính',
    'Bài 47: Khái niệm phân số (Tiết 1)',
    'Bài 47: Khái niệm phân số (Tiết 2)',
    'Bài 48: Phân số và phép chia số tự nhiên (Tiết 1)',
  ],
  16: [
    'Bài 48: Phân số và phép chia số tự nhiên (Tiết 2)',
    'Bài 49: Tính chất cơ bản của phân số (Tiết 1)',
    'Bài 49: Tính chất cơ bản của phân số (Tiết 2)',
    'Bài 50: Rút gọn phân số (Tiết 1)',
    'Bài 50: Rút gọn phân số (Tiết 2)',
  ],
  17: [
    'Bài 51: Quy đồng mẫu số các phân số (Tiết 1)',
    'Bài 51: Quy đồng mẫu số các phân số (Tiết 2)',
    'Bài 52: So sánh hai phân số có cùng mẫu số',
    'Bài 53: So sánh hai phân số khác mẫu số',
    'Bài 54: Luyện tập chung về phân số',
  ],
  18: [
    'Bài 55: Ôn tập học kì 1 - Số tự nhiên và các phép tính (Tiết 1)',
    'Bài 55: Ôn tập học kì 1 - Số tự nhiên và các phép tính (Tiết 2)',
    'Bài 56: Ôn tập hình học và đo lường',
    'Bài 57: Ôn tập giải toán có lời văn',
    'Kiểm tra định kì cuối học kì 1 môn Toán',
  ],
};

// --- KHOA HỌC 4 (2 tiết/tuần) ---
export const GRADE_4_KHOA_HOC: Record<number, string[]> = {
  1: ['Bài 1: Một số tính chất và vai trò của nước (Tiết 1)', 'Bài 1: Một số tính chất và vai trò của nước (Tiết 2)'],
  2: ['Bài 2: Sự chuyển thể của nước và vòng tuần hoàn của nước (Tiết 1)', 'Bài 2: Sự chuyển thể của nước và vòng tuần hoàn của nước (Tiết 2)'],
  3: ['Bài 3: Ô nhiễm và bảo vệ nguồn nước (Tiết 1)', 'Bài 3: Ô nhiễm và bảo vệ nguồn nước (Tiết 2)'],
  4: ['Bài 4: Không khí quanh ta (Tiết 1)', 'Bài 4: Không khí quanh ta (Tiết 2)'],
  5: ['Bài 5: Sự chuyển động của không khí và gió (Tiết 1)', 'Bài 5: Sự chuyển động của không khí và gió (Tiết 2)'],
  6: ['Bài 6: Ô nhiễm và bảo vệ môi trường không khí (Tiết 1)', 'Bài 6: Ô nhiễm và bảo vệ môi trường không khí (Tiết 2)'],
  7: ['Bài 7: Ôn tập chủ đề Chất (Tiết 1)', 'Bài 7: Ôn tập chủ đề Chất (Tiết 2)'],
  8: ['Bài 8: Ánh sáng và sự truyền ánh sáng (Tiết 1)', 'Bài 8: Ánh sáng và sự truyền ánh sáng (Tiết 2)'],
  9: ['Bài 9: Vai trò của ánh sáng đối với đời sống', 'Ôn tập đánh giá giữa học kì 1'],
  10: ['Bài 10: Âm thanh và sự lan truyền âm thanh (Tiết 1)', 'Bài 10: Âm thanh và sự lan truyền âm thanh (Tiết 2)'],
  11: ['Bài 11: Âm thanh trong cuộc sống (Tiết 1)', 'Bài 11: Âm thanh trong cuộc sống (Tiết 2)'],
  12: ['Bài 12: Nhiệt độ và sự truyền nhiệt (Tiết 1)', 'Bài 12: Nhiệt độ và sự truyền nhiệt (Tiết 2)'],
  13: ['Bài 13: Vật dẫn nhiệt tốt và vật dẫn nhiệt kém (Tiết 1)', 'Bài 13: Vật dẫn nhiệt tốt và vật dẫn nhiệt kém (Tiết 2)'],
  14: ['Bài 14: Ôn tập chủ đề Năng lượng (Tiết 1)', 'Bài 14: Ôn tập chủ đề Năng lượng (Tiết 2)'],
  15: ['Bài 15: Thực vật cần gì để sống? (Tiết 1)', 'Bài 15: Thực vật cần gì để sống? (Tiết 2)'],
  16: ['Bài 16: Động vật cần gì để sống? (Tiết 1)', 'Bài 16: Động vật cần gì để sống? (Tiết 2)'],
  17: ['Bài 17: Chăm sóc cây trồng và vật nuôi (Tiết 1)', 'Bài 17: Chăm sóc cây trồng và vật nuôi (Tiết 2)'],
  18: ['Bài 18: Ôn tập học kì 1 môn Khoa học', 'Kiểm tra, đánh giá định kì cuối học kì 1'],
};

// --- LỊCH SỬ VÀ ĐỊA LÍ 4 (2 tiết/tuần) ---
export const GRADE_4_LS_DL: Record<number, string[]> = {
  1: ['Bài 1: Làm quen với phương tiện học tập lịch sử và địa lí (Tiết 1)', 'Bài 1: Làm quen với phương tiện học tập lịch sử và địa lí (Tiết 2)'],
  2: ['Bài 2: Thiên nhiên và con người vùng Trung du và miền núi Bắc Bộ (Tiết 1)', 'Bài 2: Thiên nhiên và con người vùng Trung du và miền núi Bắc Bộ (Tiết 2)'],
  3: ['Bài 3: Lịch sử Đền Hùng và lễ giỗ Tổ Hùng Vương (Tiết 1)', 'Bài 3: Lịch sử Đền Hùng và lễ giỗ Tổ Hùng Vương (Tiết 2)'],
  4: ['Bài 4: Một số nét văn hóa ở vùng Trung du và miền núi Bắc Bộ (Tiết 1)', 'Bài 4: Một số nét văn hóa ở vùng Trung du và miền núi Bắc Bộ (Tiết 2)'],
  5: ['Bài 5: Thiên nhiên vùng Đồng bằng Bắc Bộ (Tiết 1)', 'Bài 5: Thiên nhiên vùng Đồng bằng Bắc Bộ (Tiết 2)'],
  6: ['Bài 6: Dân cư, hoạt động sản xuất và một số nét văn hóa ở vùng Đồng bằng Bắc Bộ (Tiết 1)', 'Bài 6: Dân cư, hoạt động sản xuất và một số nét văn hóa ở vùng Đồng bằng Bắc Bộ (Tiết 2)'],
  7: ['Bài 7: Sông Hồng và văn minh sông Hồng (Tiết 1)', 'Bài 7: Sông Hồng và văn minh sông Hồng (Tiết 2)'],
  8: ['Bài 8: Thăng Long – Hà Nội (Tiết 1)', 'Bài 8: Thăng Long – Hà Nội (Tiết 2)'],
  9: ['Bài 9: Văn Miếu – Quốc Tử Giám', 'Ôn tập đánh giá giữa học kì 1'],
  10: ['Bài 10: Thiên nhiên vùng Duyên hải miền Trung (Tiết 1)', 'Bài 10: Thiên nhiên vùng Duyên hải miền Trung (Tiết 2)'],
  11: ['Bài 11: Dân cư, hoạt động sản xuất và một số nét văn hóa ở vùng Duyên hải miền Trung (Tiết 1)', 'Bài 11: Dân cư, hoạt động sản xuất và một số nét văn hóa ở vùng Duyên hải miền Trung (Tiết 2)'],
  12: ['Bài 12: Cố đô Huế (Tiết 1)', 'Bài 12: Cố đô Huế (Tiết 2)'],
  13: ['Bài 13: Phố cổ Hội An (Tiết 1)', 'Bài 13: Phố cổ Hội An (Tiết 2)'],
  14: ['Bài 14: Thiên nhiên vùng Tây Nguyên (Tiết 1)', 'Bài 14: Thiên nhiên vùng Tây Nguyên (Tiết 2)'],
  15: ['Bài 15: Dân cư, hoạt động sản xuất và một số nét văn hóa ở vùng Tây Nguyên (Tiết 1)', 'Bài 15: Dân cư, hoạt động sản xuất và một số nét văn hóa ở vùng Tây Nguyên (Tiết 2)'],
  16: ['Bài 16: Lễ hội Cồng chiêng Tây Nguyên (Tiết 1)', 'Bài 16: Lễ hội Cồng chiêng Tây Nguyên (Tiết 2)'],
  17: ['Bài 17: Ôn tập học kì 1 môn Lịch sử và Địa lí (Tiết 1)', 'Bài 17: Ôn tập học kì 1 môn Lịch sử và Địa lí (Tiết 2)'],
  18: ['Kiểm tra, đánh giá định kì cuối học kì 1 (Tiết 1)', 'Kiểm tra, đánh giá định kì cuối học kì 1 (Tiết 2)'],
};

// --- ĐẠO ĐỨC 4 (1 tiết/tuần) ---
export const GRADE_4_DAO_DUC: Record<number, string> = {
  1: 'Bài 1: Biết ơn người lao động (Tiết 1)',
  2: 'Bài 1: Biết ơn người lao động (Tiết 2)',
  3: 'Bài 2: Cảm thông, giúp đỡ người gặp khó khăn (Tiết 1)',
  4: 'Bài 2: Cảm thông, giúp đỡ người gặp khó khăn (Tiết 2)',
  5: 'Bài 3: Yêu lao động (Tiết 1)',
  6: 'Bài 3: Yêu lao động (Tiết 2)',
  7: 'Bài 4: Tôn trọng tài sản của người khác (Tiết 1)',
  8: 'Bài 4: Tôn trọng tài sản của người khác (Tiết 2)',
  9: 'Đánh giá giữa học kì 1',
  10: 'Bài 5: Bảo vệ của công (Tiết 1)',
  11: 'Bài 5: Bảo vệ của công (Tiết 2)',
  12: 'Bài 6: Thiết lập và duy trì quan hệ bạn bè (Tiết 1)',
  13: 'Bài 6: Thiết lập và duy trì quan hệ bạn bè (Tiết 2)',
  14: 'Bài 7: Quý trọng đồng tiền (Tiết 1)',
  15: 'Bài 7: Quý trọng đồng tiền (Tiết 2)',
  16: 'Ôn tập chủ đề Đạo đức học kì 1',
  17: 'Thực hành rèn luyện hành vi đạo đức chuẩn mực',
  18: 'Đánh giá kết quả học tập Đạo đức cuối học kì 1',
};

// --- CÔNG NGHỆ 4 (1 tiết/tuần) ---
export const GRADE_4_CONG_NGHE: Record<number, string> = {
  1: 'Bài 1: Hoa và cây cảnh quanh em (Tiết 1)',
  2: 'Bài 1: Hoa và cây cảnh quanh em (Tiết 2)',
  3: 'Bài 2: Trồng hoa, cây cảnh trong chậu (Tiết 1)',
  4: 'Bài 2: Trồng hoa, cây cảnh trong chậu (Tiết 2)',
  5: 'Bài 3: Chăm sóc hoa, cây cảnh trong chậu (Tiết 1)',
  6: 'Bài 3: Chăm sóc hoa, cây cảnh trong chậu (Tiết 2)',
  7: 'Dự án 1: Em làm chậu hoa nhỏ xinh (Tiết 1)',
  8: 'Dự án 1: Em làm chậu hoa nhỏ xinh (Tiết 2)',
  9: 'Đánh giá quá trình học tập giữa học kì 1',
  10: 'Bài 4: Giới thiệu chi tiết và lắp ghép mô hình kĩ thuật (Tiết 1)',
  11: 'Bài 4: Giới thiệu chi tiết và lắp ghép mô hình kĩ thuật (Tiết 2)',
  12: 'Bài 5: Lắp ghép mô hình bập bênh (Tiết 1)',
  13: 'Bài 5: Lắp ghép mô hình bập bênh (Tiết 2)',
  14: 'Bài 6: Lắp ghép mô hình rô-bốt (Tiết 1)',
  15: 'Bài 6: Lắp ghép mô hình rô-bốt (Tiết 2)',
  16: 'Dự án 2: Mô hình đồ chơi em yêu',
  17: 'Ôn tập học kì 1 môn Công nghệ',
  18: 'Đánh giá cuối học kì 1 môn Công nghệ',
};

// --- TIN HỌC 4 (1 tiết/tuần) ---
export const GRADE_4_TIN_HOC: Record<number, string> = {
  1: 'Bài 1: Phần cứng và phần mềm máy tính (Tiết 1)',
  2: 'Bài 1: Phần cứng và phần mềm máy tính (Tiết 2)',
  3: 'Bài 2: Gõ bàn phím đúng cách (Tiết 1)',
  4: 'Bài 2: Gõ bàn phím đúng cách (Tiết 2)',
  5: 'Bài 3: Thông tin trên trang web (Tiết 1)',
  6: 'Bài 3: Thông tin trên trang web (Tiết 2)',
  7: 'Bài 4: Tìm kiếm thông tin trên Internet (Tiết 1)',
  8: 'Bài 4: Tìm kiếm thông tin trên Internet (Tiết 2)',
  9: 'Kiểm tra thực hành giữa học kì 1',
  10: 'Bài 5: Thao tác với thư mục và tệp (Tiết 1)',
  11: 'Bài 5: Thao tác với thư mục và tệp (Tiết 2)',
  12: 'Bài 6: Thực hành quản lí tệp và thư mục (Tiết 1)',
  13: 'Bài 6: Thực hành quản lí tệp và thư mục (Tiết 2)',
  14: 'Bài 7: Soạn thảo văn bản tiếng Việt (Tiết 1)',
  15: 'Bài 7: Soạn thảo văn bản tiếng Việt (Tiết 2)',
  16: 'Bài 8: Định dạng văn bản và chèn hình ảnh (Tiết 1)',
  17: 'Bài 8: Định dạng văn bản và chèn hình ảnh (Tiết 2)',
  18: 'Kiểm tra, đánh giá thực hành Tin học cuối học kì 1',
};

// --- HOẠT ĐỘNG TRẢI NGHIỆM 4 (3 tiết/tuần: SHDC, HĐGD, SHL) ---
export const GRADE_4_HDTN: Record<number, string[]> = {
  1: [
    'Sinh hoạt dưới cờ: Khai giảng năm học mới và phát động thi đua',
    'HĐGD theo chủ đề: Bầu ban cán sự và xây dựng nội quy lớp 4.2',
    'Sinh hoạt lớp: Sơ kết tuần 1 và phương hướng tuần 2',
  ],
  2: [
    'Sinh hoạt dưới cờ: Tự hào truyền thống trường em',
    'HĐGD theo chủ đề: Rèn luyện nền nếp học tập và kỉ luật tự giác',
    'Sinh hoạt lớp: Sơ kết tuần 2 và bình chọn gương mặt tiêu biểu',
  ],
  3: [
    'Sinh hoạt dưới cờ: An toàn giao thông cho nụ cười ngày mai',
    'HĐGD theo chủ đề: Văn hóa giao thông và kĩ năng tham gia giao thông an toàn',
    'Sinh hoạt lớp: Sơ kết tuần 3 và cam kết thực hiện cổng trường an toàn',
  ],
  4: [
    'Sinh hoạt dưới cờ: Vui Tết Trung thu sum vầy',
    'HĐGD theo chủ đề: Khéo tay làm đèn lồng và tìm hiểu phong tục Trung thu',
    'Sinh hoạt lớp: Sơ kết tuần 4 và liên hoan đón hội trăng rằm',
  ],
  5: [
    'Sinh hoạt dưới cờ: Hưởng ứng Tuần lễ học tập suốt đời',
    'HĐGD theo chủ đề: Phương pháp đọc sách hiệu quả và góc học tập của em',
    'Sinh hoạt lớp: Sơ kết tuần 5 và chia sẻ cuốn sách em yêu thích',
  ],
  6: [
    'Sinh hoạt dưới cờ: Xây dựng tình bạn đẹp - Nói không với bạo lực học đường',
    'HĐGD theo chủ đề: Kĩ năng lắng nghe và giải quyết bất đồng với bạn bè',
    'Sinh hoạt lớp: Sơ kết tuần 6 và trao đổi về tình bạn thân ái',
  ],
  7: [
    'Sinh hoạt dưới cờ: Em yêu lao động và giữ gìn trường lớp xanh - sạch - đẹp',
    'HĐGD theo chủ đề: Phân loại rác thải tại nguồn và chăm sóc bồn hoa lớp em',
    'Sinh hoạt lớp: Sơ kết tuần 7 và kế hoạch ngày Chủ nhật xanh',
  ],
  8: [
    'Sinh hoạt dưới cờ: Kính yêu người phụ nữ Việt Nam (20/10)',
    'HĐGD theo chủ đề: Làm thiệp chúc mừng gửi gắm tình cảm tới bà và mẹ',
    'Sinh hoạt lớp: Sơ kết tuần 8 và văn nghệ tôn vinh người phụ nữ',
  ],
  9: [
    'Sinh hoạt dưới cờ: Đánh giá giữa học kì 1 và biểu dương gương sáng học tập',
    'HĐGD theo chủ đề: Rèn luyện tính tự lập trong học tập và sinh hoạt hàng ngày',
    'Sinh hoạt lớp: Sơ kết giữa học kì 1 và đề ra mục tiêu nửa cuối học kì',
  ],
  10: [
    'Sinh hoạt dưới cờ: Phòng chống đuối nước và kĩ năng tự bảo vệ',
    'HĐGD theo chủ đề: Nhận diện nguy cơ mất an toàn và kĩ năng xử lí tình huống khẩn cấp',
    'Sinh hoạt lớp: Sơ kết tuần 10 và thực hành sơ cứu ban đầu',
  ],
  11: [
    'Sinh hoạt dưới cờ: Phát động phong trào thi đua Tri ân thầy cô giáo (20/11)',
    'HĐGD theo chủ đề: Hoa điểm mười dâng tặng thầy cô và làm báo tường lớp',
    'Sinh hoạt lớp: Sơ kết tuần 11 và chuẩn bị chương trình văn nghệ 20/11',
  ],
  12: [
    'Sinh hoạt dưới cờ: Mít tinh kỉ niệm Ngày Nhà giáo Việt Nam 20/11',
    'HĐGD theo chủ đề: Lễ hội tri ân và giao lưu cùng các thế hệ thầy cô giáo',
    'Sinh hoạt lớp: Sơ kết tuần 12 và gửi lời chúc tốt đẹp tới thầy cô',
  ],
  13: [
    'Sinh hoạt dưới cờ: Tiết kiệm điện, nước và bảo vệ tài nguyên',
    'HĐGD theo chủ đề: Thực hành thói quen tiêu dùng thông minh và tiết kiệm',
    'Sinh hoạt lớp: Sơ kết tuần 13 và kiểm tra việc thực hiện tiết kiệm của các tổ',
  ],
  14: [
    'Sinh hoạt dưới cờ: Giữ gìn an toàn trên không gian mạng',
    'HĐGD theo chủ đề: Quy tắc ứng xử văn minh và bảo vệ thông tin cá nhân trên mạng',
    'Sinh hoạt lớp: Sơ kết tuần 14 và thảo luận về các nguy cơ trên Internet',
  ],
  15: [
    'Sinh hoạt dưới cờ: Tự hào truyền thống Quân đội nhân dân Việt Nam (22/12)',
    'HĐGD theo chủ đề: Tìm hiểu phẩm chất anh Bộ đội Cụ Hồ và lòng yêu nước',
    'Sinh hoạt lớp: Sơ kết tuần 15 và giao lưu cùng cựu chiến binh địa phương',
  ],
  16: [
    'Sinh hoạt dưới cờ: Chuẩn bị đón chào năm mới tràn đầy hi vọng',
    'HĐGD theo chủ đề: Đặt mục tiêu cá nhân và rèn luyện thói quen tích cực',
    'Sinh hoạt lớp: Sơ kết tuần 16 và bình xét thi đua cuối năm',
  ],
  17: [
    'Sinh hoạt dưới cờ: Ôn tập nề nếp và sẵn sàng cho kì kiểm tra cuối học kì 1',
    'HĐGD theo chủ đề: Kĩ năng quản lí thời gian và ôn tập thi cử hiệu quả',
    'Sinh hoạt lớp: Sơ kết tuần 17 và động viên tinh thần trước kì thi',
  ],
  18: [
    'Sinh hoạt dưới cờ: Sơ kết công tác Đội và phong trào thiếu nhi học kì 1',
    'HĐGD theo chủ đề: Tổng kết hoạt động trải nghiệm học kì 1 và liên hoan tuyên dương',
    'Sinh hoạt lớp: Đánh giá xếp loại học kì 1 và phương hướng học kì 2',
  ],
};

// --- TIẾNG ANH 4 (Global Success - 4 tiết/tuần) ---
export const GRADE_4_TIENG_ANH: Record<number, string[]> = {
  1: ['Unit 1: My Friends - Lesson 1 (Tiết 1)', 'Unit 1: My Friends - Lesson 1 (Tiết 2)', 'Unit 1: My Friends - Lesson 2 (Tiết 1)', 'Unit 1: My Friends - Lesson 2 (Tiết 2)'],
  2: ['Unit 1: My Friends - Lesson 3 (Tiết 1)', 'Unit 1: My Friends - Lesson 3 (Tiết 2)', 'Unit 2: Time and Daily Routines - Lesson 1 (Tiết 1)', 'Unit 2: Time and Daily Routines - Lesson 1 (Tiết 2)'],
  3: ['Unit 2: Time and Daily Routines - Lesson 2 (Tiết 1)', 'Unit 2: Time and Daily Routines - Lesson 2 (Tiết 2)', 'Unit 2: Time and Daily Routines - Lesson 3 (Tiết 1)', 'Unit 2: Time and Daily Routines - Lesson 3 (Tiết 2)'],
  4: ['Unit 3: My Week - Lesson 1 (Tiết 1)', 'Unit 3: My Week - Lesson 1 (Tiết 2)', 'Unit 3: My Week - Lesson 2 (Tiết 1)', 'Unit 3: My Week - Lesson 2 (Tiết 2)'],
  5: ['Unit 3: My Week - Lesson 3 (Tiết 1)', 'Unit 3: My Week - Lesson 3 (Tiết 2)', 'Unit 4: My Birthday Party - Lesson 1 (Tiết 1)', 'Unit 4: My Birthday Party - Lesson 1 (Tiết 2)'],
  6: ['Unit 4: My Birthday Party - Lesson 2 (Tiết 1)', 'Unit 4: My Birthday Party - Lesson 2 (Tiết 2)', 'Unit 4: My Birthday Party - Lesson 3 (Tiết 1)', 'Unit 4: My Birthday Party - Lesson 3 (Tiết 2)'],
  7: ['Unit 5: Things We Can Do - Lesson 1 (Tiết 1)', 'Unit 5: Things We Can Do - Lesson 1 (Tiết 2)', 'Unit 5: Things We Can Do - Lesson 2 (Tiết 1)', 'Unit 5: Things We Can Do - Lesson 2 (Tiết 2)'],
  8: ['Unit 5: Things We Can Do - Lesson 3 (Tiết 1)', 'Unit 5: Things We Can Do - Lesson 3 (Tiết 2)', 'Review 1 (Tiết 1)', 'Review 1 (Tiết 2)'],
  9: ['Mid-term Review (Tiết 1)', 'Mid-term Review (Tiết 2)', 'Mid-term Test (Listening & Reading)', 'Mid-term Test (Speaking & Writing)'],
  10: ['Unit 6: Our School Rooms - Lesson 1 (Tiết 1)', 'Unit 6: Our School Rooms - Lesson 1 (Tiết 2)', 'Unit 6: Our School Rooms - Lesson 2 (Tiết 1)', 'Unit 6: Our School Rooms - Lesson 2 (Tiết 2)'],
  11: ['Unit 6: Our School Rooms - Lesson 3 (Tiết 1)', 'Unit 6: Our School Rooms - Lesson 3 (Tiết 2)', 'Unit 7: Our Timetables - Lesson 1 (Tiết 1)', 'Unit 7: Our Timetables - Lesson 1 (Tiết 2)'],
  12: ['Unit 7: Our Timetables - Lesson 2 (Tiết 1)', 'Unit 7: Our Timetables - Lesson 2 (Tiết 2)', 'Unit 7: Our Timetables - Lesson 3 (Tiết 1)', 'Unit 7: Our Timetables - Lesson 3 (Tiết 2)'],
  13: ['Unit 8: My Favourite Subject - Lesson 1 (Tiết 1)', 'Unit 8: My Favourite Subject - Lesson 1 (Tiết 2)', 'Unit 8: My Favourite Subject - Lesson 2 (Tiết 1)', 'Unit 8: My Favourite Subject - Lesson 2 (Tiết 2)'],
  14: ['Unit 8: My Favourite Subject - Lesson 3 (Tiết 1)', 'Unit 8: My Favourite Subject - Lesson 3 (Tiết 2)', 'Unit 9: Our Sports Day - Lesson 1 (Tiết 1)', 'Unit 9: Our Sports Day - Lesson 1 (Tiết 2)'],
  15: ['Unit 9: Our Sports Day - Lesson 2 (Tiết 1)', 'Unit 9: Our Sports Day - Lesson 2 (Tiết 2)', 'Unit 9: Our Sports Day - Lesson 3 (Tiết 1)', 'Unit 9: Our Sports Day - Lesson 3 (Tiết 2)'],
  16: ['Unit 10: Where Were You Yesterday? - Lesson 1 (Tiết 1)', 'Unit 10: Where Were You Yesterday? - Lesson 1 (Tiết 2)', 'Unit 10: Where Were You Yesterday? - Lesson 2 (Tiết 1)', 'Unit 10: Where Were You Yesterday? - Lesson 2 (Tiết 2)'],
  17: ['Unit 10: Where Were You Yesterday? - Lesson 3 (Tiết 1)', 'Unit 10: Where Were You Yesterday? - Lesson 3 (Tiết 2)', 'Review 2 (Tiết 1)', 'Review 2 (Tiết 2)'],
  18: ['Final Term 1 Review (Tiết 1)', 'Final Term 1 Review (Tiết 2)', 'Term 1 Speaking & Listening Test', 'Term 1 Reading & Writing Test'],
};

// --- GIÁO DỤC THỂ CHẤT 4 (2 tiết/tuần) ---
export const GRADE_4_GDTC: Record<number, string[]> = {
  1: ['Đội hình đội ngũ: Động tác quay phải, quay trái và quay sau (Tiết 1)', 'Đội hình đội ngũ: Tập hợp hàng dọc và dóng hàng (Tiết 2)'],
  2: ['Đội hình đội ngũ: Tập hợp hàng ngang và dóng hàng ngang (Tiết 1)', 'Đội hình đội ngũ: Điểm số từ 1 đến hết theo hàng ngang (Tiết 2)'],
  3: ['Đội hình đội ngũ: Biến đổi đội hình từ một hàng dọc thành hai hàng dọc (Tiết 1)', 'Trò chơi vận động: Nhảy đúng nhảy nhanh (Tiết 2)'],
  4: ['Bài thể dục: Động tác Vươn thở và Tay (Tiết 1)', 'Bài thể dục: Động tác Chân và Lưng bụng (Tiết 2)'],
  5: ['Bài thể dục: Động tác Toàn thân và Phối hợp (Tiết 1)', 'Bài thể dục: Động tác Nhảy và Điều hòa (Tiết 2)'],
  6: ['Bài thể dục: Ôn tập 8 động tác của Bài thể dục phát triển chung (Tiết 1)', 'Trò chơi: Chạy tiếp sức ném bóng trúng đích (Tiết 2)'],
  7: ['Tư thế và kĩ năng vận động cơ bản: Đi đều theo nhịp 1 - 2 (Tiết 1)', 'Tư thế và kĩ năng vận động cơ bản: Đi đều vòng phải, vòng trái (Tiết 2)'],
  8: ['Kĩ năng vận động cơ bản: Đứng lại khi đang đi đều (Tiết 1)', 'Trò chơi vận động: Kéo co đồng đội (Tiết 2)'],
  9: ['Đánh giá giữa học kì 1: Bài thể dục phát triển chung (Tiết 1)', 'Đánh giá giữa học kì 1: Kĩ năng đội hình đội ngũ (Tiết 2)'],
  10: ['Tư thế cơ bản: Bật nhảy về phía trước và tiếp đất an toàn (Tiết 1)', 'Trò chơi vận động: Lò cò tiếp sức (Tiết 2)'],
  11: ['Bật cao chạm vật chuẩn trên cao (Tiết 1)', 'Trò chơi vận động: Nhảy dây cá nhân (Tiết 2)'],
  12: ['Tập nhảy dây kiểu chụm hai chân có bước đệm (Tiết 1)', 'Tập nhảy dây kiểu chân trước chân sau (Tiết 2)'],
  13: ['Môn thể thao tự chọn - Bóng rổ / Cầu lông: Kĩ năng cầm vợt và đánh cầu (Tiết 1)', 'Di chuyển đỡ cầu cơ bản (Tiết 2)'],
  14: ['Phối hợp di chuyển và chuyền bóng / đánh cầu (Tiết 1)', 'Trò chơi vận động thể thao (Tiết 2)'],
  15: ['Luyện tập thi đấu thể thao mini trong lớp (Tiết 1)', 'Rèn luyện sức bền và tính kiên trì (Tiết 2)'],
  16: ['Ôn tập các bài tập rèn luyện tư thế và kĩ năng vận động (Tiết 1)', 'Trò chơi vận động phát triển thể lực (Tiết 2)'],
  17: ['Ôn tập tổng hợp cuối học kì 1 (Tiết 1)', 'Rèn luyện thể lực và đánh giá sức khỏe học sinh (Tiết 2)'],
  18: ['Kiểm tra, đánh giá định kì cuối học kì 1 môn GDTC (Tiết 1)', 'Kiểm tra, đánh giá định kì cuối học kì 1 môn GDTC (Tiết 2)'],
};

// --- ÂM NHẠC 4 (1 tiết/tuần) ---
export const GRADE_4_AM_NHAC: Record<number, string> = {
  1: 'Chủ đề 1: Khởi hành mùa tựu trường - Học hát: Rộn ràng ngày mới',
  2: 'Chủ đề 1: Nhạc cụ gõ và rèn luyện tiết tấu nhịp nhàng',
  3: 'Chủ đề 1: Đọc nhạc: Bài đọc nhạc số 1',
  4: 'Chủ đề 1: Thưởng thức âm nhạc: Câu chuyện Vang mãi tiếng đàn',
  5: 'Chủ đề 2: Giai điệu quê hương - Học hát: Em yêu mùa hè quê em',
  6: 'Chủ đề 2: Nhạc cụ: Thực hành gõ đệm cho bài hát',
  7: 'Chủ đề 2: Đọc nhạc: Bài đọc nhạc số 2',
  8: 'Chủ đề 2: Thưởng thức âm nhạc: Đàn Bầu - Tiếng lòng người Việt',
  9: 'Ôn tập và đánh giá chủ đề 1 & 2 giữa học kì 1',
  10: 'Chủ đề 3: Thầy cô và bạn bè - Học hát: Khúc ca người thầy',
  11: 'Chủ đề 3: Nhạc cụ: Gõ đệm vận động cơ thể (Body Percussion)',
  12: 'Chủ đề 3: Đọc nhạc: Bài đọc nhạc số 3',
  13: 'Chủ đề 3: Thưởng thức âm nhạc: Hình ảnh người thầy trong âm nhạc',
  14: 'Chủ đề 4: Ước mơ tuổi thơ - Học hát: Bay cao tiếng hát ước mơ',
  15: 'Chủ đề 4: Nhạc cụ gõ: Rèn luyện tiết tấu kết hợp múa phụ họa',
  16: 'Chủ đề 4: Đọc nhạc: Bài đọc nhạc số 4',
  17: 'Ôn tập tổng kết các chủ đề âm nhạc học kì 1',
  18: 'Đánh giá kết quả học tập Âm nhạc cuối học kì 1',
};

// --- MĨ THUẬT 4 (1 tiết/tuần) ---
export const GRADE_4_MI_THUAT: Record<number, string> = {
  1: 'Chủ đề 1: Sắc màu em yêu - Bài 1: Màu sắc trong thiên nhiên (Tiết 1)',
  2: 'Chủ đề 1: Sắc màu em yêu - Bài 1: Màu sắc trong thiên nhiên (Tiết 2)',
  3: 'Chủ đề 1: Sắc màu em yêu - Bài 2: Hòa sắc nóng và lạnh trong tranh (Tiết 1)',
  4: 'Chủ đề 1: Sắc màu em yêu - Bài 2: Hòa sắc nóng và lạnh trong tranh (Tiết 2)',
  5: 'Chủ đề 2: Ngôi trường hạnh phúc - Bài 3: Tranh vẽ phong cảnh trường em (Tiết 1)',
  6: 'Chủ đề 2: Ngôi trường hạnh phúc - Bài 3: Tranh vẽ phong cảnh trường em (Tiết 2)',
  7: 'Chủ đề 2: Ngôi trường hạnh phúc - Bài 4: Chân dung thầy cô và bạn bè (Tiết 1)',
  8: 'Chủ đề 2: Ngôi trường hạnh phúc - Bài 4: Chân dung thầy cô và bạn bè (Tiết 2)',
  9: 'Trưng bày và đánh giá sản phẩm mĩ thuật giữa học kì 1',
  10: 'Chủ đề 3: Vẻ đẹp quê hương - Bài 5: Tranh phong cảnh miền núi (Tiết 1)',
  11: 'Chủ đề 3: Vẻ đẹp quê hương - Bài 5: Tranh phong cảnh miền núi (Tiết 2)',
  12: 'Chủ đề 3: Vẻ đẹp quê hương - Bài 6: Di sản văn hóa qua nét vẽ thiếu nhi (Tiết 1)',
  13: 'Chủ đề 3: Vẻ đẹp quê hương - Bài 6: Di sản văn hóa qua nét vẽ thiếu nhi (Tiết 2)',
  14: 'Chủ đề 4: Đồ chơi dân gian - Bài 7: Tạo hình con vật từ vật liệu tái chế (Tiết 1)',
  15: 'Chủ đề 4: Đồ chơi dân gian - Bài 7: Tạo hình con vật từ vật liệu tái chế (Tiết 2)',
  16: 'Chủ đề 4: Đồ chơi dân gian - Bài 8: Thiết kế bưu thiếp chúc mừng năm mới',
  17: 'Trưng bày không gian nghệ thuật mĩ thuật học kì 1',
  18: 'Đánh giá sản phẩm và kết quả học tập Mĩ thuật cuối học kì 1',
};

// =========================================================================
// 2. TỔNG HỢP VÀ BẢO ĐẢM TẤT CẢ CÁC KHỐI LỚP 1, 2, 3, 5 TỪ TUẦN 1 -> 18+
// =========================================================================

// --- KHỐI 1 (Tuần 1 -> 18+) ---
export const GRADE_1_TIENG_VIET: Record<number, string[]> = {
  1: ['Bài 1: A, a', 'Bài 2: B, b', 'Bài 3: C, c', 'Bài 4: D, d', 'Bài 5: Đ, đ', 'Bài 6: E, e', 'Bài 7: Ê, ê', 'Bài 8: G, g', 'Bài 9: H, h', 'Bài 10: I, i', 'Bài 11: K, k', 'Bài 12: Ôn tập chữ và âm đầu'],
  2: ['Bài 13: L, l', 'Bài 14: M, m', 'Bài 15: N, n', 'Bài 16: O, o', 'Bài 17: Ô, ô', 'Bài 18: Ơ, ơ', 'Bài 19: P, p', 'Bài 20: Q, q', 'Bài 21: R, r', 'Bài 22: S, s', 'Bài 23: T, t', 'Bài 24: Ôn tập chữ cái đã học'],
  3: ['Bài 25: U, u', 'Bài 26: Ư, ư', 'Bài 27: V, v', 'Bài 28: X, x', 'Bài 29: Y, y', 'Bài 30: Ch, ch', 'Bài 31: Gh, gh', 'Bài 32: Gi, gi', 'Bài 33: Kh, kh', 'Bài 34: Nh, nh', 'Bài 35: Ph, ph', 'Bài 36: Ôn tập phụ âm ghép'],
  4: ['Bài 37: Qu, qu', 'Bài 38: Th, th', 'Bài 39: Tr, tr', 'Bài 40: Vần an, at', 'Bài 41: Vần am, ap', 'Bài 42: Vần âm, âp', 'Bài 43: Vần am, an', 'Bài 44: Vần anh, ach', 'Bài 45: Luyện đọc đoạn văn ngắn', 'Bài 46: Luyện viết chữ cỡ vừa', 'Bài 47: Kể chuyện: Bác gấu tốt bụng', 'Bài 48: Ôn tập vần có âm cuối n, t'],
  5: ['Bài 49: Vần ăng, ăc', 'Bài 50: Vần âng, âc', 'Bài 51: Vần en, et', 'Bài 52: Vần ên, êt', 'Bài 53: Vần in, it', 'Bài 54: Vần on, ot', 'Bài 55: Vần ôn, ôt', 'Bài 56: Vần ơn, ót', 'Bài 57: Vần un, ut', 'Bài 58: Đọc đoạn văn ứng dụng', 'Bài 59: Luyện viết từ ngữ ứng dụng', 'Bài 60: Kể chuyện: Đôi bạn tốt'],
  6: ['Bài 61: Vần ong, oc', 'Bài 62: Vần ông, ôc', 'Bài 63: Vần ung, uc', 'Bài 64: Vần ưng, ưc', 'Bài 65: Vần eng, ec', 'Bài 66: Vần ieng, iec', 'Bài 67: Vần uông, uôc', 'Bài 68: Vần ương, ươc', 'Bài 69: Luyện đọc hiểu', 'Bài 70: Luyện viết chữ hoa', 'Bài 71: Đọc mở rộng', 'Bài 72: Ôn tập âm vần tuần 6'],
  7: ['Bài 73: Vần ai, ay', 'Bài 74: Vần ây, eo', 'Bài 75: Vần ao, au', 'Bài 76: Vần âu, iu', 'Bài 77: Vần ưu, oi', 'Bài 78: Vần ôi, ơi', 'Bài 79: Vần ui, ưi', 'Bài 80: Vần uôi, ươi', 'Bài 81: Đọc đoạn văn: Chú mèo mướp', 'Bài 82: Luyện viết chính tả', 'Bài 83: Kể chuyện: Ba cô gái', 'Bài 84: Ôn tập vần có âm cuối i, y'],
  8: ['Bài 85: Vần oa, oe', 'Bài 86: Vần oai, oay', 'Bài 87: Vần oat, oac', 'Bài 88: Vần uê, uy', 'Bài 89: Vần uya, uyu', 'Bài 90: Vần oang, oac', 'Bài 91: Vần uân, uât', 'Bài 92: Đọc đoạn văn ứng dụng', 'Bài 93: Luyện viết từ ngữ', 'Bài 94: Nói và nghe: Đồ dùng học tập của em', 'Bài 95: Đọc mở rộng', 'Bài 96: Ôn tập chủ điểm'],
  9: ['Ôn tập giữa học kì 1 (Tiết 1: Đọc âm, vần)', 'Ôn tập giữa học kì 1 (Tiết 2: Đọc từ ngữ)', 'Ôn tập giữa học kì 1 (Tiết 3: Đọc câu văn)', 'Ôn tập giữa học kì 1 (Tiết 4: Đọc đoạn văn ngắn)', 'Ôn tập giữa học kì 1 (Tiết 5: Luyện viết âm vần)', 'Ôn tập giữa học kì 1 (Tiết 6: Luyện viết từ ngữ)', 'Ôn tập giữa học kì 1 (Tiết 7: Viết câu đơn giản)', 'Ôn tập giữa học kì 1 (Tiết 8: Kể chuyện đã học)', 'Kiểm tra Đọc giữa học kì 1 (Tiết 1)', 'Kiểm tra Đọc giữa học kì 1 (Tiết 2)', 'Kiểm tra Viết giữa học kì 1 (Tiết 1)', 'Kiểm tra Viết giữa học kì 1 (Tiết 2)'],
  10: ['Bài 97: Vần uôm, uôp', 'Bài 98: Vần oam, oap', 'Bài 99: Vần oang, oăc', 'Bài 100: Vần oanh, oach', 'Bài 101: Vần uynh, uych', 'Bài 102: Luyện đọc hiểu đoạn văn', 'Bài 103: Luyện viết từ khó', 'Bài 104: Kể chuyện: Rùa và Thỏ', 'Bài 105: Đọc mở rộng: Đọc thơ thiếu nhi', 'Bài 106: Luyện tập chính tả', 'Bài 107: Nói và nghe: Con vật nuôi', 'Bài 108: Ôn tập tuần 10'],
  11: ['Bài 109: Vần iên, iêt', 'Bài 110: Vần yên, yêt', 'Bài 111: Vần uôn, uôt', 'Bài 112: Vần ươn, ươt', 'Bài 113: Luyện đọc văn bản: Ngôi nhà thân yêu', 'Bài 114: Luyện viết chữ đẹp', 'Bài 115: Đọc hiểu văn bản', 'Bài 116: Kể chuyện theo tranh', 'Bài 117: Nói và nghe: Ngôi nhà của em', 'Bài 118: Chính tả nghe viết', 'Bài 119: Đọc mở rộng sách báo', 'Bài 120: Ôn tập tuần 11'],
  12: ['Bài 121: Vần iêng, iêc', 'Bài 122: Vần yêng, yêc', 'Bài 123: Vần uông, uôc', 'Bài 124: Vần ương, ươc', 'Bài 125: Đọc văn bản: Vườn quê', 'Bài 126: Tìm hiểu nội dung bài đọc', 'Bài 127: Luyện viết chính tả', 'Bài 128: Kể chuyện: Quả táo của ai?', 'Bài 129: Luyện nói: Em yêu cây xanh', 'Bài 130: Đọc mở rộng', 'Bài 131: Rèn luyện kĩ năng viết', 'Bài 132: Ôn tập tuần 12'],
  13: ['Bài 133: Vần iêm, iêp', 'Bài 134: Vần yêm, yêp', 'Bài 135: Vần uôm, uôp', 'Bài 136: Vần ươm, ươp', 'Bài 137: Đọc văn bản: Bác nông dân cần cù', 'Bài 138: Đọc hiểu chi tiết bài học', 'Bài 139: Viết chính tả đoạn văn', 'Bài 140: Kể chuyện theo lời nhân vật', 'Bài 141: Luyện nói: Ước mơ của em', 'Bài 142: Đọc sách tranh', 'Bài 143: Luyện tập phát âm chuẩn', 'Bài 144: Ôn tập tuần 13'],
  14: ['Bài 145: Vần oai, oay', 'Bài 146: Vần uây, uôi', 'Bài 147: Vần ươi, ươu', 'Bài 148: Vần oeo, oen', 'Bài 149: Đọc văn bản: Buổi sáng trên biển', 'Bài 150: Khám phá vẻ đẹp thiên nhiên qua văn bản', 'Bài 151: Luyện viết đoạn ngắn', 'Bài 152: Kể chuyện: Giọt nước tí xíu', 'Bài 153: Luyện nói theo chủ đề', 'Bài 154: Đọc mở rộng', 'Bài 155: Rèn chữ giữ vở', 'Bài 156: Ôn tập tuần 14'],
  15: ['Bài 157: Vần oam, oap', 'Bài 158: Vần oang, oac', 'Bài 159: Vần oăng, oăc', 'Bài 160: Vần uâng, uâc', 'Bài 161: Đọc văn bản: Mùa đông ấm áp', 'Bài 162: Luyện đọc hiểu và trả lời câu hỏi', 'Bài 163: Viết chính tả', 'Bài 164: Kể chuyện: Chiếc áo ấm', 'Bài 165: Luyện nói: Yêu thương người thân', 'Bài 166: Đọc mở rộng truyện thiếu nhi', 'Bài 167: Ôn tập từ ngữ có vần khó', 'Bài 168: Ôn tập tuần 15'],
  16: ['Bài 169: Ôn tập các vần đã học (Tiết 1)', 'Bài 169: Ôn tập các vần đã học (Tiết 2)', 'Bài 170: Luyện đọc văn bản: Tết đang đến gần', 'Bài 170: Đọc hiểu ngày Tết cổ truyền', 'Bài 171: Viết câu chúc mừng năm mới', 'Bài 172: Kể chuyện: Sự tích bánh chưng bánh giầy', 'Bài 173: Nói và nghe: Tết sum vầy', 'Bài 174: Luyện tập viết chữ số và từ ngữ', 'Bài 175: Đọc sách báo Tết', 'Bài 176: Góc sáng tạo: Làm thiệp mừng xuân', 'Bài 177: Rèn luyện đọc trôi chảy', 'Bài 178: Củng cố kiến thức tuần 16'],
  17: ['Ôn tập học kì 1: Ôn luyện đọc thành tiếng các âm vần (Tiết 1)', 'Ôn tập học kì 1: Ôn luyện đọc từ ngữ (Tiết 2)', 'Ôn tập học kì 1: Ôn luyện đọc đoạn văn (Tiết 3)', 'Ôn tập học kì 1: Rèn luyện kĩ năng đọc hiểu (Tiết 4)', 'Ôn tập học kì 1: Luyện viết âm, chữ ghi âm (Tiết 5)', 'Ôn tập học kì 1: Luyện viết vần, chữ ghi vần (Tiết 6)', 'Ôn tập học kì 1: Luyện viết từ ngữ (Tiết 7)', 'Ôn tập học kì 1: Viết câu hoàn chỉnh (Tiết 8)', 'Ôn tập học kì 1: Nghe - nói tương tác (Tiết 9)', 'Ôn tập học kì 1: Kể lại câu chuyện yêu thích (Tiết 10)', 'Ôn tập học kì 1: Đọc mở rộng (Tiết 11)', 'Đánh giá thử năng lực đọc viết học kì 1 (Tiết 12)'],
  18: ['Kiểm tra định kì cuối học kì 1: Đọc thành tiếng các âm vần', 'Kiểm tra định kì cuối học kì 1: Đọc thành tiếng các từ ngữ', 'Kiểm tra định kì cuối học kì 1: Đọc thành tiếng câu văn', 'Kiểm tra định kì cuối học kì 1: Đọc hiểu văn bản và chọn câu trả lời', 'Kiểm tra định kì cuối học kì 1: Viết chữ ghi âm, vần', 'Kiểm tra định kì cuối học kì 1: Viết từ ngữ ứng dụng', 'Kiểm tra định kì cuối học kì 1: Viết câu hoàn chỉnh theo yêu cầu', 'Kiểm tra định kì cuối học kì 1: Kể chuyện và chia sẻ', 'Đánh giá chung kết quả học tập Tiếng Việt học kì 1', 'Tuyên dương học sinh có tiến bộ vượt bậc', 'Hướng dẫn tự đọc sách trong kì nghỉ giữa năm', 'Chuẩn bị đồ dùng và tâm thế cho học kì 2'],
};

// --- KHỐI 1 TOÁN (3 tiết/tuần) ---
export const GRADE_1_TOAN: Record<number, string[]> = {
  1: ['Bài 1: Các số 0, 1, 2, 3, 4, 5 (Tiết 1)', 'Bài 1: Các số 0, 1, 2, 3, 4, 5 (Tiết 2)', 'Bài 1: Luyện tập đếm và viết các số 0 đến 5'],
  2: ['Bài 2: Các số 6, 7, 8, 9, 10 (Tiết 1)', 'Bài 2: Các số 6, 7, 8, 9, 10 (Tiết 2)', 'Bài 2: Luyện tập đếm và viết các số đến 10'],
  3: ['Bài 3: Nhiều hơn, ít hơn, bằng nhau', 'Bài 4: So sánh số: Dấu lớn, dấu bé, dấu bằng (Tiết 1)', 'Bài 4: So sánh số: Dấu lớn, dấu bé, dấu bằng (Tiết 2)'],
  4: ['Bài 5: Mấy và mấy (Tách - gộp số) (Tiết 1)', 'Bài 5: Mấy và mấy (Tách - gộp số) (Tiết 2)', 'Bài 6: Luyện tập chung các số trong phạm vi 10'],
  5: ['Bài 7: Hình vuông, hình tròn, hình tam giác, hình chữ nhật (Tiết 1)', 'Bài 7: Thực hành nhận biết và ghép hình (Tiết 2)', 'Bài 8: Khối hộp chữ nhật, khối lập phương'],
  6: ['Bài 9: Luyện tập chung về hình phẳng và hình khối', 'Bài 10: Phép cộng trong phạm vi 10 (Tiết 1)', 'Bài 10: Phép cộng trong phạm vi 10 (Tiết 2)'],
  7: ['Bài 11: Bảng cộng trong phạm vi 10 (Tiết 1)', 'Bài 11: Bảng cộng trong phạm vi 10 (Tiết 2)', 'Bài 12: Luyện tập phép cộng'],
  8: ['Bài 13: Phép trừ trong phạm vi 10 (Tiết 1)', 'Bài 13: Phép trừ trong phạm vi 10 (Tiết 2)', 'Bài 14: Bảng trừ trong phạm vi 10'],
  9: ['Bài 15: Luyện tập phép cộng, phép trừ trong phạm vi 10', 'Ôn tập giữa học kì 1 môn Toán', 'Kiểm tra đánh giá giữa học kì 1'],
  10: ['Bài 16: Số 0 trong phép cộng, phép trừ (Tiết 1)', 'Bài 16: Số 0 trong phép cộng, phép trừ (Tiết 2)', 'Bài 17: Luyện tập chung phép tính có số 0'],
  11: ['Bài 18: Các số trong phạm vi 20 (Tiết 1: Các số 11 đến 15)', 'Bài 18: Các số trong phạm vi 20 (Tiết 2: Các số 16 đến 20)', 'Bài 19: Luyện tập đọc, viết các số đến 20'],
  12: ['Bài 20: So sánh các số trong phạm vi 20 (Tiết 1)', 'Bài 20: So sánh các số trong phạm vi 20 (Tiết 2)', 'Bài 21: Phép cộng dạng 14 + 3'],
  13: ['Bài 22: Phép trừ dạng 17 - 3', 'Bài 23: Phép trừ dạng 17 - 7', 'Bài 24: Luyện tập phép cộng, phép trừ không nhớ trong phạm vi 20'],
  14: ['Bài 25: Đo độ dài. Đơn vị đo xăng-ti-mét (Tiết 1)', 'Bài 25: Đo độ dài. Đơn vị đo xăng-ti-mét (Tiết 2)', 'Bài 26: Thực hành đo độ dài đồ vật xung quanh'],
  15: ['Bài 27: Ôn tập hình học và đo lường', 'Bài 28: Luyện tập giải toán bằng hình vẽ (Tiết 1)', 'Bài 28: Luyện tập giải toán bằng hình vẽ (Tiết 2)'],
  16: ['Bài 29: Luyện tập chung bốn phép tính và hình học', 'Bài 30: Thực hành và trải nghiệm toán học', 'Bài 31: Ôn tập số và phép tính trong phạm vi 20'],
  17: ['Bài 32: Ôn tập học kì 1 môn Toán (Tiết 1: Số và phép tính)', 'Bài 32: Ôn tập học kì 1 môn Toán (Tiết 2: Hình học và đo lường)', 'Bài 32: Ôn tập học kì 1 môn Toán (Tiết 3: Giải toán thực tế)'],
  18: ['Kiểm tra định kì cuối học kì 1 môn Toán (Tiết 1: Trắc nghiệm)', 'Kiểm tra định kì cuối học kì 1 môn Toán (Tiết 2: Tự luận)', 'Sửa bài kiểm tra, tuyên dương và rút kinh nghiệm học kì 1'],
};

// --- ĐẠO ĐỨC 1 (1 tiết/tuần) ---
export const GRADE_1_DAO_DUC: Record<number, string> = {
  1: 'Bài 1: Em là học sinh lớp 1 (Tiết 1)',
  2: 'Bài 1: Em là học sinh lớp 1 (Tiết 2)',
  3: 'Bài 2: Gọn gàng, ngăn nắp (Tiết 1)',
  4: 'Bài 2: Gọn gàng, ngăn nắp (Tiết 2)',
  5: 'Bài 3: Đi học đều và đúng giờ (Tiết 1)',
  6: 'Bài 3: Đi học đều và đúng giờ (Tiết 2)',
  7: 'Bài 4: Vâng lời thầy giáo, cô giáo (Tiết 1)',
  8: 'Bài 4: Vâng lời thầy giáo, cô giáo (Tiết 2)',
  9: 'Ôn tập và đánh giá giữa học kì 1',
  10: 'Bài 5: Tự giác làm việc của mình (Tiết 1)',
  11: 'Bài 5: Tự giác làm việc của mình (Tiết 2)',
  12: 'Bài 6: Thật thà trong học tập và sinh hoạt (Tiết 1)',
  13: 'Bài 6: Thật thà trong học tập và sinh hoạt (Tiết 2)',
  14: 'Bài 7: Yêu quý bạn bè (Tiết 1)',
  15: 'Bài 7: Yêu quý bạn bè (Tiết 2)',
  16: 'Bài 8: Giúp đỡ bạn khi gặp khó khăn (Tiết 1)',
  17: 'Bài 8: Giúp đỡ bạn khi gặp khó khăn (Tiết 2)',
  18: 'Đánh giá cuối học kì 1 môn Đạo đức',
};

// --- HOẠT ĐỘNG TRẢI NGHIỆM 1 (3 tiết/tuần) ---
export const GRADE_1_HDTN: Record<number, string[]> = {
  1: ['Sinh hoạt dưới cờ: Chào đón năm học mới', 'HĐGD theo chủ đề: Làm quen với trường lớp và bạn mới', 'Sinh hoạt lớp: Nội quy lớp học'],
  2: ['Sinh hoạt dưới cờ: Nền nếp học sinh', 'HĐGD theo chủ đề: Đồ dùng học tập của em', 'Sinh hoạt lớp: Bầu ban cán sự lớp'],
  3: ['Sinh hoạt dưới cờ: Cổng trường an toàn giao thông', 'HĐGD theo chủ đề: Đi bộ an toàn đến trường', 'Sinh hoạt lớp: Sơ kết tuần 3'],
  4: ['Sinh hoạt dưới cờ: Đón Tết Trung thu', 'HĐGD theo chủ đề: Rước đèn Trung thu và vui phá cỗ', 'Sinh hoạt lớp: Sinh hoạt Trung thu sum vầy'],
  5: ['Sinh hoạt dưới cờ: Tuần lễ đọc sách', 'HĐGD theo chủ đề: Giữ gìn sách vở sạch đẹp', 'Sinh hoạt lớp: Sơ kết tuần 5'],
  6: ['Sinh hoạt dưới cờ: Tình bạn thân ái', 'HĐGD theo chủ đề: Nói lời hay, làm việc tốt', 'Sinh hoạt lớp: Sơ kết tuần 6'],
  7: ['Sinh hoạt dưới cờ: Vệ sinh trường lớp', 'HĐGD theo chủ đề: Rửa tay đúng cách và giữ vệ sinh cá nhân', 'Sinh hoạt lớp: Sơ kết tuần 7'],
  8: ['Sinh hoạt dưới cờ: Yêu thương mẹ và cô giáo', 'HĐGD theo chủ đề: Làm thiệp tặng người phụ nữ em yêu quý', 'Sinh hoạt lớp: Sơ kết tuần 8'],
  9: ['Sinh hoạt dưới cờ: Đánh giá giữa học kì 1', 'HĐGD theo chủ đề: Tự phục vụ bản thân trong sinh hoạt', 'Sinh hoạt lớp: Sơ kết tuần 9'],
  10: ['Sinh hoạt dưới cờ: An toàn trong trường học', 'HĐGD theo chủ đề: Phòng tránh tai nạn thương tích tại trường', 'Sinh hoạt lớp: Sơ kết tuần 10'],
  11: ['Sinh hoạt dưới cờ: Phát động phong trào Tri ân thầy cô', 'HĐGD theo chủ đề: Kính yêu thầy cô giáo', 'Sinh hoạt lớp: Sơ kết tuần 11'],
  12: ['Sinh hoạt dưới cờ: Mừng ngày Nhà giáo Việt Nam 20/11', 'HĐGD theo chủ đề: Văn nghệ chào mừng 20/11', 'Sinh hoạt lớp: Sơ kết tuần 12'],
  13: ['Sinh hoạt dưới cờ: Tiết kiệm đồ dùng học tập', 'HĐGD theo chủ đề: Bảo quản sách vở cẩn thận', 'Sinh hoạt lớp: Sơ kết tuần 13'],
  14: ['Sinh hoạt dưới cờ: Ứng xử lịch sự nơi công cộng', 'HĐGD theo chủ đề: Chào hỏi lễ phép', 'Sinh hoạt lớp: Sơ kết tuần 14'],
  15: ['Sinh hoạt dưới cờ: Em yêu chú bộ đội', 'HĐGD theo chủ đề: Tìm hiểu về chú bộ đội', 'Sinh hoạt lớp: Sơ kết tuần 15'],
  16: ['Sinh hoạt dưới cờ: Đón mừng năm mới', 'HĐGD theo chủ đề: Chuẩn bị trang trí đón Tết', 'Sinh hoạt lớp: Sơ kết tuần 16'],
  17: ['Sinh hoạt dưới cờ: Ôn tập nề nếp cuối học kì 1', 'HĐGD theo chủ đề: Tự đánh giá bản thân qua một học kì', 'Sinh hoạt lớp: Sơ kết tuần 17'],
  18: ['Sinh hoạt dưới cờ: Sơ kết học kì 1', 'HĐGD theo chủ đề: Tổng kết hoạt động trải nghiệm học kì 1', 'Sinh hoạt lớp: Đánh giá học kì 1'],
};

// --- TỰ NHIÊN VÀ XÃ HỘI (Khối 1, 2, 3 - 2 tiết/tuần) ---
export const GRADE_1_TNXH: Record<number, string[]> = {
  1: ['Bài 1: Gia đình của em (Tiết 1)', 'Bài 1: Gia đình của em (Tiết 2)'],
  2: ['Bài 2: Ngôi nhà của em (Tiết 1)', 'Bài 2: Ngôi nhà của em (Tiết 2)'],
  3: ['Bài 3: Giữ gìn nhà ở sạch sẽ (Tiết 1)', 'Bài 3: Giữ gìn nhà ở sạch sẽ (Tiết 2)'],
  4: ['Bài 4: An toàn khi ở nhà (Tiết 1)', 'Bài 4: An toàn khi ở nhà (Tiết 2)'],
  5: ['Bài 5: Ôn tập chủ đề Gia đình (Tiết 1)', 'Bài 5: Ôn tập chủ đề Gia đình (Tiết 2)'],
  6: ['Bài 6: Lớp học của em (Tiết 1)', 'Bài 6: Lớp học của em (Tiết 2)'],
  7: ['Bài 7: Các hoạt động ở lớp học (Tiết 1)', 'Bài 7: Các hoạt động ở lớp học (Tiết 2)'],
  8: ['Bài 8: An toàn khi ở trường (Tiết 1)', 'Bài 8: An toàn khi ở trường (Tiết 2)'],
  9: ['Bài 9: Ôn tập chủ đề Trường học (Tiết 1)', 'Đánh giá giữa học kì 1 môn TNXH (Tiết 2)'],
  10: ['Bài 10: Hoạt động cộng đồng nơi em sống (Tiết 1)', 'Bài 10: Hoạt động cộng đồng nơi em sống (Tiết 2)'],
  11: ['Bài 11: An toàn trên đường đến trường (Tiết 1)', 'Bài 11: An toàn trên đường đến trường (Tiết 2)'],
  12: ['Bài 12: Giữ gìn vệ sinh nơi công cộng (Tiết 1)', 'Bài 12: Giữ gìn vệ sinh nơi công cộng (Tiết 2)'],
  13: ['Bài 13: Cây xung quanh em (Tiết 1)', 'Bài 13: Cây xung quanh em (Tiết 2)'],
  14: ['Bài 14: Con vật quanh em (Tiết 1)', 'Bài 14: Con vật quanh em (Tiết 2)'],
  15: ['Bài 15: Chăm sóc và bảo vệ cây trồng, vật nuôi (Tiết 1)', 'Bài 15: Chăm sóc và bảo vệ cây trồng, vật nuôi (Tiết 2)'],
  16: ['Bài 16: Ôn tập chủ đề Thực vật và Động vật (Tiết 1)', 'Bài 16: Ôn tập chủ đề Thực vật và Động vật (Tiết 2)'],
  17: ['Bài 17: Ôn tập học kì 1 môn Tự nhiên và Xã hội (Tiết 1)', 'Bài 17: Ôn tập học kì 1 môn Tự nhiên và Xã hội (Tiết 2)'],
  18: ['Kiểm tra, đánh giá định kì cuối học kì 1 môn TNXH (Tiết 1)', 'Tổng kết kiến thức và liên hoan tuyên dương (Tiết 2)'],
};

export const GRADE_2_TNXH: Record<number, string[]> = {
  1: ['Bài 1: Các thế hệ trong gia đình (Tiết 1)', 'Bài 1: Các thế hệ trong gia đình (Tiết 2)'],
  2: ['Bài 2: Nghề nghiệp của người lớn trong gia đình (Tiết 1)', 'Bài 2: Nghề nghiệp của người lớn trong gia đình (Tiết 2)'],
  3: ['Bài 3: Phòng tránh ngộ độc khi ở nhà (Tiết 1)', 'Bài 3: Phòng tránh ngộ độc khi ở nhà (Tiết 2)'],
  4: ['Bài 4: Giữ gìn vệ sinh nhà ở (Tiết 1)', 'Bài 4: Giữ gìn vệ sinh nhà ở (Tiết 2)'],
  5: ['Bài 5: Ôn tập chủ đề Gia đình (Tiết 1)', 'Bài 5: Ôn tập chủ đề Gia đình (Tiết 2)'],
  6: ['Bài 6: Ngày hội trường em (Tiết 1)', 'Bài 6: Ngày hội trường em (Tiết 2)'],
  7: ['Bài 7: An toàn và giữ vệ sinh ở trường (Tiết 1)', 'Bài 7: An toàn và giữ vệ sinh ở trường (Tiết 2)'],
  8: ['Bài 8: Ôn tập chủ đề Trường học (Tiết 1)', 'Bài 8: Ôn tập chủ đề Trường học (Tiết 2)'],
  9: ['Đánh giá quá trình học tập giữa kì (Tiết 1)', 'Bài 9: Các mùa trong năm (Tiết 2)'],
  10: ['Bài 10: Hoạt động sản xuất nông nghiệp (Tiết 1)', 'Bài 10: Hoạt động sản xuất nông nghiệp (Tiết 2)'],
  11: ['Bài 11: Hoạt động sản xuất công nghiệp và thủ công (Tiết 1)', 'Bài 11: Hoạt động sản xuất công nghiệp và thủ công (Tiết 2)'],
  12: ['Bài 12: Hoạt động mua bán hàng hóa (Tiết 1)', 'Bài 12: Hoạt động mua bán hàng hóa (Tiết 2)'],
  13: ['Bài 13: Thực vật và động vật quanh em (Tiết 1)', 'Bài 13: Thực vật và động vật quanh em (Tiết 2)'],
  14: ['Bài 14: Nơi sống của thực vật (Tiết 1)', 'Bài 14: Nơi sống của thực vật (Tiết 2)'],
  15: ['Bài 15: Nơi sống của động vật (Tiết 1)', 'Bài 15: Nơi sống của động vật (Tiết 2)'],
  16: ['Bài 16: Bảo vệ nơi sống của thực vật và động vật (Tiết 1)', 'Bài 16: Bảo vệ nơi sống của thực vật và động vật (Tiết 2)'],
  17: ['Bài 17: Ôn tập học kì 1 môn Tự nhiên và Xã hội (Tiết 1)', 'Bài 17: Ôn tập học kì 1 môn Tự nhiên và Xã hội (Tiết 2)'],
  18: ['Đánh giá định kì cuối học kì 1 (Tiết 1)', 'Đánh giá định kì cuối học kì 1 (Tiết 2)'],
};

export const GRADE_3_TNXH: Record<number, string[]> = {
  1: ['Bài 1: Họ hàng nội, ngoại (Tiết 1)', 'Bài 1: Họ hàng nội, ngoại (Tiết 2)'],
  2: ['Bài 2: Phòng tránh hỏa hoạn khi ở nhà (Tiết 1)', 'Bài 2: Phòng tránh hỏa hoạn khi ở nhà (Tiết 2)'],
  3: ['Bài 3: Vệ sinh xung quanh nhà ở (Tiết 1)', 'Bài 3: Vệ sinh xung quanh nhà ở (Tiết 2)'],
  4: ['Bài 4: Ôn tập chủ đề Gia đình (Tiết 1)', 'Bài 4: Ôn tập chủ đề Gia đình (Tiết 2)'],
  5: ['Bài 5: Một số hoạt động kết nối trường học với xã hội (Tiết 1)', 'Bài 5: Một số hoạt động kết nối trường học với xã hội (Tiết 2)'],
  6: ['Bài 6: Truyền thống nhà trường (Tiết 1)', 'Bài 6: Truyền thống nhà trường (Tiết 2)'],
  7: ['Bài 7: Giữ an toàn và vệ sinh ở trường (Tiết 1)', 'Bài 7: Giữ an toàn và vệ sinh ở trường (Tiết 2)'],
  8: ['Bài 8: Ôn tập chủ đề Trường học (Tiết 1)', 'Bài 8: Ôn tập chủ đề Trường học (Tiết 2)'],
  9: ['Đánh giá giữa học kì 1 (Tiết 1)', 'Bài 9: Hoạt động sản xuất nông nghiệp ở địa phương (Tiết 2)'],
  10: ['Bài 10: Hoạt động sản xuất công nghiệp và thủ công truyền thống (Tiết 1)', 'Bài 10: Hoạt động sản xuất công nghiệp và thủ công truyền thống (Tiết 2)'],
  11: ['Bài 11: Hoạt động thương mại và dịch vụ (Tiết 1)', 'Bài 11: Hoạt động thương mại và dịch vụ (Tiết 2)'],
  12: ['Bài 12: Các cơ quan trong cơ thể người: Cơ quan tuần hoàn (Tiết 1)', 'Bài 12: Các cơ quan trong cơ thể người: Cơ quan tuần hoàn (Tiết 2)'],
  13: ['Bài 13: Cơ quan thần kinh (Tiết 1)', 'Bài 13: Cơ quan thần kinh (Tiết 2)'],
  14: ['Bài 14: Chăm sóc và bảo vệ các cơ quan trong cơ thể (Tiết 1)', 'Bài 14: Chăm sóc và bảo vệ các cơ quan trong cơ thể (Tiết 2)'],
  15: ['Bài 15: Thực vật và động vật quanh em (Tiết 1)', 'Bài 15: Thực vật và động vật quanh em (Tiết 2)'],
  16: ['Bài 16: Sử dụng hợp lí thực vật và động vật (Tiết 1)', 'Bài 16: Sử dụng hợp lí thực vật và động vật (Tiết 2)'],
  17: ['Bài 17: Ôn tập học kì 1 môn Tự nhiên và Xã hội (Tiết 1)', 'Bài 17: Ôn tập học kì 1 môn Tự nhiên và Xã hội (Tiết 2)'],
  18: ['Kiểm tra, đánh giá định kì cuối học kì 1 (Tiết 1)', 'Kiểm tra, đánh giá định kì cuối học kì 1 (Tiết 2)'],
};

// =========================================================================
// 3. KHỐI 2 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (Tuần 1 -> 18+)
// =========================================================================
export const GRADE_2_TIENG_VIET: Record<number, string[]> = {
  1: [
    'Bài 1: Tôi là học sinh lớp 2 (Tiết 1 - Đọc)',
    'Bài 1: Tôi là học sinh lớp 2 (Tiết 2 - Đọc hiểu)',
    'Bài 1: Viết chữ hoa A',
    'Bài 1: Từ chỉ sự vật, câu nêu đặc điểm (LTVC)',
    'Bài 2: Ngày hôm qua đâu rồi? (Tiết 1 - Đọc)',
    'Bài 2: Viết đoạn văn tự giới thiệu bản thân',
    'Nói và nghe: Chào hỏi và làm quen',
    'Đọc mở rộng: Đọc sách báo về tuổi thơ',
    'Luyện viết chữ đẹp và củng cố bài học',
  ],
  2: [
    'Bài 3: Niềm vui của Bi và Bống (Tiết 1 - Đọc)',
    'Bài 3: Niềm vui của Bi và Bống (Tiết 2 - Đọc hiểu)',
    'Bài 3: Viết chữ hoa B',
    'Bài 3: Từ ngữ chỉ người, chỉ vật (LTVC)',
    'Bài 4: Làm việc thật là vui (Tiết 1 - Đọc)',
    'Bài 4: Viết đoạn văn kể về việc em đã làm',
    'Nói và nghe: Kể chuyện theo tranh',
    'Đọc mở rộng: Đọc truyện ngắn về thiếu nhi',
    'Ôn tập và củng cố tuần 2',
  ],
  3: [
    'Bài 5: Em học vẽ (Tiết 1 - Đọc)',
    'Bài 5: Em học vẽ (Tiết 2 - Đọc hiểu)',
    'Bài 5: Viết chữ hoa C',
    'Bài 5: Từ chỉ đặc điểm, dấu chấm, dấu chấm hỏi (LTVC)',
    'Bài 6: Cuốn sách của em (Tiết 1 - Đọc)',
    'Bài 6: Viết đoạn văn giới thiệu cuốn sách',
    'Nói và nghe: Giới thiệu đồ vật em thích',
    'Đọc mở rộng: Đọc truyện tranh bổ ích',
    'Ôn tập và củng cố tuần 3',
  ],
  4: [
    'Bài 7: Cô giáo lớp em (Tiết 1 - Đọc)',
    'Bài 7: Cô giáo lớp em (Tiết 2 - Đọc hiểu)',
    'Bài 7: Viết chữ hoa D, Đ',
    'Bài 7: Từ chỉ hoạt động, câu nêu hoạt động (LTVC)',
    'Bài 8: Thời khóa biểu (Tiết 1 - Đọc)',
    'Bài 8: Lập thời khóa biểu và thời gian biểu',
    'Nói và nghe: Kể về thầy cô giáo của em',
    'Đọc mở rộng: Sinh hoạt đọc sách',
    'Ôn tập và củng cố tuần 4',
  ],
  5: [
    'Bài 9: Em có xinh không? (Tiết 1 - Đọc)',
    'Bài 9: Em có xinh không? (Tiết 2 - Đọc hiểu)',
    'Bài 9: Viết chữ hoa E, Ê',
    'Bài 9: Từ chỉ đặc điểm của người và vật (LTVC)',
    'Bài 10: Nụ cười của Bo (Tiết 1 - Đọc)',
    'Bài 10: Viết đoạn văn kể về một kỉ niệm vui',
    'Nói và nghe: Chia sẻ cảm xúc vui vẻ',
    'Đọc mở rộng: Đọc truyện thiếu nhi',
    'Ôn tập tuần 5',
  ],
  6: [
    'Bài 11: Cái trống trường em (Tiết 1 - Đọc)',
    'Bài 11: Cái trống trường em (Tiết 2 - Đọc hiểu)',
    'Bài 11: Viết chữ hoa G',
    'Bài 11: Từ ngữ về trường học (LTVC)',
    'Bài 12: Danh sách học sinh (Tiết 1 - Đọc)',
    'Bài 12: Viết thông báo ngắn',
    'Nói và nghe: Nói lời cảm ơn, xin lỗi',
    'Đọc mở rộng: Đọc báo Nhi Đồng',
    'Ôn tập tuần 6',
  ],
  7: [
    'Bài 13: Yêu lắm trường ơi! (Tiết 1 - Đọc)',
    'Bài 13: Yêu lắm trường ơi! (Tiết 2 - Đọc hiểu)',
    'Bài 13: Viết chữ hoa H',
    'Bài 13: Mở rộng vốn từ Trường học (LTVC)',
    'Bài 14: Em học bài (Tiết 1 - Đọc)',
    'Bài 14: Viết đoạn văn tả đồ dùng học tập',
    'Nói và nghe: Trao đổi về đồ dùng yêu thích',
    'Đọc mở rộng: Đọc sách tại thư viện',
    'Ôn tập tuần 7',
  ],
  8: [
    'Bài 15: Cuốn sách kì diệu (Tiết 1 - Đọc)',
    'Bài 15: Cuốn sách kì diệu (Tiết 2 - Đọc hiểu)',
    'Bài 15: Viết chữ hoa I, K',
    'Bài 15: Dấu chấm, dấu phẩy trong câu (LTVC)',
    'Bài 16: Khi trang sách mở ra (Tiết 1 - Đọc)',
    'Bài 16: Viết tin nhắn cho bạn',
    'Nói và nghe: Đọc truyện và kể lại',
    'Đọc mở rộng: Đọc truyện ngụ ngôn',
    'Ôn tập tuần 8',
  ],
  9: [
    'Ôn tập giữa học kì 1 (Tiết 1 - Đọc thành tiếng)',
    'Ôn tập giữa học kì 1 (Tiết 2 - Đọc hiểu văn bản)',
    'Ôn tập giữa học kì 1 (Tiết 3 - Viết chính tả)',
    'Ôn tập giữa học kì 1 (Tiết 4 - Luyện từ và câu)',
    'Ôn tập giữa học kì 1 (Tiết 5 - Viết đoạn văn ngắn)',
    'Kiểm tra định kì giữa học kì 1 (Phần Đọc)',
    'Kiểm tra định kì giữa học kì 1 (Phần Viết)',
    'Tổng kết đánh giá giữa học kì 1',
    'Rút kinh nghiệm và định hướng nửa cuối kì 1',
  ],
  10: [
    'Bài 17: Mẹ (Tiết 1 - Đọc)',
    'Bài 17: Mẹ (Tiết 2 - Đọc hiểu)',
    'Bài 17: Viết chữ hoa L',
    'Bài 17: Mở rộng vốn từ Gia đình (LTVC)',
    'Bài 18: Gọi bạn (Tiết 1 - Đọc)',
    'Bài 18: Viết đoạn văn thể hiện tình cảm với người thân',
    'Nói và nghe: Kể chuyện về mẹ',
    'Đọc mở rộng: Đọc thơ về mẹ và bà',
    'Ôn tập tuần 10',
  ],
  11: [
    'Bài 19: Bàn tay mẹ (Tiết 1 - Đọc)',
    'Bài 19: Bàn tay mẹ (Tiết 2 - Đọc hiểu)',
    'Bài 19: Viết chữ hoa M',
    'Bài 19: Từ chỉ tình cảm gia đình (LTVC)',
    'Bài 20: Chú đỗ con (Tiết 1 - Đọc)',
    'Bài 20: Viết đoạn văn ngắn kể về việc chăm sóc cây',
    'Nói và nghe: Cây con lớn lên thế nào?',
    'Đọc mở rộng: Đọc sách khoa học thường thức',
    'Ôn tập tuần 11',
  ],
  12: [
    'Bài 21: Bà nội, bà ngoại (Tiết 1 - Đọc)',
    'Bài 21: Bà nội, bà ngoại (Tiết 2 - Đọc hiểu)',
    'Bài 21: Viết chữ hoa N',
    'Bài 21: Mở rộng vốn từ Tình cảm (LTVC)',
    'Bài 22: Thư thăm bà (Tiết 1 - Đọc)',
    'Bài 22: Viết bưu thiếp chúc mừng sinh nhật',
    'Nói và nghe: Tình cảm với ông bà',
    'Đọc mở rộng: Đọc truyện ngắn cảm động',
    'Ôn tập tuần 12',
  ],
  13: [
    'Bài 23: Cây khế (Tiết 1 - Đọc)',
    'Bài 23: Cây khế (Tiết 2 - Đọc hiểu)',
    'Bài 23: Viết chữ hoa O, Ô, Ơ',
    'Bài 23: Từ chỉ tính nết tốt (LTVC)',
    'Bài 24: Sự tích cây vú sữa (Tiết 1 - Đọc)',
    'Bài 24: Viết đoạn văn kể về lòng hiếu thảo',
    'Nói và nghe: Kể lại đoạn truyện Sự tích cây vú sữa',
    'Đọc mở rộng: Đọc truyện cổ tích Việt Nam',
    'Ôn tập tuần 13',
  ],
  14: [
    'Bài 25: Chuyện của thước kẻ (Tiết 1 - Đọc)',
    'Bài 25: Chuyện của thước kẻ (Tiết 2 - Đọc hiểu)',
    'Bài 25: Viết chữ hoa P',
    'Bài 25: Dấu chấm than, câu cảm (LTVC)',
    'Bài 26: Bạn mới (Tiết 1 - Đọc)',
    'Bài 26: Viết đoạn văn giới thiệu người bạn mới quen',
    'Nói và nghe: Giúp đỡ bạn cùng tiến',
    'Đọc mở rộng: Đọc sách về tình bạn',
    'Ôn tập tuần 14',
  ],
  15: [
    'Bài 27: Mẹ vắng nhà ngày bão (Tiết 1 - Đọc)',
    'Bài 27: Mẹ vắng nhà ngày bão (Tiết 2 - Đọc hiểu)',
    'Bài 27: Viết chữ hoa Q',
    'Bài 27: Câu nêu hoạt động (Ai làm gì?) (LTVC)',
    'Bài 28: Con đường làng (Tiết 1 - Đọc)',
    'Bài 28: Viết đoạn văn tả con đường quen thuộc',
    'Nói và nghe: Con đường từ nhà đến trường',
    'Đọc mở rộng: Đọc thơ về quê hương',
    'Ôn tập tuần 15',
  ],
  16: [
    'Bài 29: Hạt thóc (Tiết 1 - Đọc)',
    'Bài 29: Hạt thóc (Tiết 2 - Đọc hiểu)',
    'Bài 29: Viết chữ hoa R',
    'Bài 29: Mở rộng vốn từ Nghề nghiệp (LTVC)',
    'Bài 30: Bé làm họa sĩ (Tiết 1 - Đọc)',
    'Bài 30: Viết đoạn văn kể về ước mơ nghề nghiệp',
    'Nói và nghe: Em muốn làm nghề gì sau này?',
    'Đọc mở rộng: Đọc sách gương người tốt việc tốt',
    'Ôn tập tuần 16',
  ],
  17: [
    'Ôn tập học kì 1: Ôn luyện kĩ năng đọc thành tiếng (Tiết 1)',
    'Ôn tập học kì 1: Đọc hiểu văn bản và trả lời câu hỏi (Tiết 2)',
    'Ôn tập học kì 1: Ôn tập từ ngữ và câu (Tiết 3)',
    'Ôn tập học kì 1: Viết chính tả nghe - viết (Tiết 4)',
    'Ôn tập học kì 1: Rèn luyện kĩ năng viết đoạn văn (Tiết 5)',
    'Ôn tập học kì 1: Đọc mở rộng và củng cố kiến thức (Tiết 6)',
    'Ôn tập học kì 1: Nói và nghe - Giao tiếp tự tin (Tiết 7)',
    'Luyện tập đề kiểm tra thử học kì 1 (Tiết 8)',
    'Rà soát và củng cố kĩ năng cho học sinh',
  ],
  18: [
    'Kiểm tra định kì cuối học kì 1: Đọc thành tiếng',
    'Kiểm tra định kì cuối học kì 1: Đọc hiểu và kiến thức tiếng Việt',
    'Kiểm tra định kì cuối học kì 1: Chính tả nghe - viết',
    'Kiểm tra định kì cuối học kì 1: Tập làm văn',
    'Đánh giá kết quả kiểm tra học kì 1',
    'Tuyên dương khen thưởng học sinh đạt thành tích tốt',
    'Tự đánh giá và xây dựng kế hoạch học tập kì 2',
    'Sinh hoạt tổng kết học kì 1 môn Tiếng Việt',
    'Chuẩn bị sách vở học kì 2',
  ],
};

export const GRADE_2_TOAN: Record<number, string[]> = {
  1: ['Bài 1: Ôn tập các số đến 100 (Tiết 1)', 'Bài 1: Ôn tập các số đến 100 (Tiết 2)', 'Bài 2: Tia số. Số liền trước, số liền sau (Tiết 1)', 'Bài 2: Tia số. Số liền trước, số liền sau (Tiết 2)', 'Bài 3: Các thành phần của phép cộng, phép trừ (Tiết 1)'],
  2: ['Bài 3: Các thành phần của phép cộng, phép trừ (Tiết 2)', 'Bài 4: Hơn, kém nhau bao nhiêu (Tiết 1)', 'Bài 4: Hơn, kém nhau bao nhiêu (Tiết 2)', 'Bài 5: Ôn tập phép cộng, phép trừ (không nhớ) trong phạm vi 100 (Tiết 1)', 'Bài 5: Ôn tập phép cộng, phép trừ (không nhớ) trong phạm vi 100 (Tiết 2)'],
  3: ['Bài 6: Luyện tập chung (Tiết 1)', 'Bài 6: Luyện tập chung (Tiết 2)', 'Bài 7: Điểm, đoạn thẳng (Tiết 1)', 'Bài 7: Điểm, đoạn thẳng (Tiết 2)', 'Bài 8: Độ dài đoạn thẳng. Đơn vị đề-xi-mét (Tiết 1)'],
  4: ['Bài 8: Độ dài đoạn thẳng. Đơn vị đề-xi-mét (Tiết 2)', 'Bài 9: Luyện tập chung về đo độ dài', 'Bài 10: Phép cộng (có nhớ) trong phạm vi 20 (Tiết 1)', 'Bài 10: Phép cộng (có nhớ) trong phạm vi 20 (Tiết 2)', 'Bài 11: Bảng cộng (qua 10) (Tiết 1)'],
  5: ['Bài 11: Bảng cộng (qua 10) (Tiết 2)', 'Bài 12: Bảng trừ (qua 10) (Tiết 1)', 'Bài 12: Bảng trừ (qua 10) (Tiết 2)', 'Bài 13: Luyện tập bảng cộng, bảng trừ (qua 10) (Tiết 1)', 'Bài 13: Luyện tập bảng cộng, bảng trừ (qua 10) (Tiết 2)'],
  6: ['Bài 14: Luyện tập chung (Tiết 1)', 'Bài 14: Luyện tập chung (Tiết 2)', 'Bài 15: Ki-lô-gam (Tiết 1)', 'Bài 15: Ki-lô-gam (Tiết 2)', 'Bài 16: Lít (Tiết 1)'],
  7: ['Bài 16: Lít (Tiết 2)', 'Bài 17: Thực hành và trải nghiệm với ki-lô-gam, lít', 'Bài 18: Luyện tập chung', 'Bài 19: Phép cộng (có nhớ) số có hai chữ số với số có một chữ số (Tiết 1)', 'Bài 19: Phép cộng (có nhớ) số có hai chữ số với số có một chữ số (Tiết 2)'],
  8: ['Bài 20: Phép cộng (có nhớ) số có hai chữ số với số có hai chữ số (Tiết 1)', 'Bài 20: Phép cộng (có nhớ) số có hai chữ số với số có hai chữ số (Tiết 2)', 'Bài 21: Luyện tập phép cộng có nhớ (Tiết 1)', 'Bài 21: Luyện tập phép cộng có nhớ (Tiết 2)', 'Bài 22: Luyện tập chung'],
  9: ['Bài 23: Phép trừ (có nhớ) số có hai chữ số cho số có một chữ số (Tiết 1)', 'Bài 23: Phép trừ (có nhớ) số có hai chữ số cho số có một chữ số (Tiết 2)', 'Ôn tập giữa học kì 1 môn Toán (Tiết 1)', 'Ôn tập giữa học kì 1 môn Toán (Tiết 2)', 'Kiểm tra đánh giá giữa học kì 1'],
  10: ['Bài 24: Phép trừ (có nhớ) số có hai chữ số cho số có hai chữ số (Tiết 1)', 'Bài 24: Phép trừ (có nhớ) số có hai chữ số cho số có hai chữ số (Tiết 2)', 'Bài 25: Luyện tập phép trừ có nhớ (Tiết 1)', 'Bài 25: Luyện tập phép trừ có nhớ (Tiết 2)', 'Bài 26: Đường gấp khúc. Độ dài đường gấp khúc (Tiết 1)'],
  11: ['Bài 26: Đường gấp khúc. Độ dài đường gấp khúc (Tiết 2)', 'Bài 27: Hình tứ giác (Tiết 1)', 'Bài 27: Hình tứ giác (Tiết 2)', 'Bài 28: Luyện tập chung về hình học (Tiết 1)', 'Bài 28: Luyện tập chung về hình học (Tiết 2)'],
  12: ['Bài 29: Ngày - giờ, giờ - phút (Tiết 1)', 'Bài 29: Ngày - giờ, giờ - phút (Tiết 2)', 'Bài 30: Ngày - tháng (Tiết 1)', 'Bài 30: Ngày - tháng (Tiết 2)', 'Bài 31: Thực hành xem đồng hồ, xem lịch'],
  13: ['Bài 32: Luyện tập chung thời gian', 'Bài 33: Ôn tập phép cộng, phép trừ trong phạm vi 100 (Tiết 1)', 'Bài 33: Ôn tập phép cộng, phép trừ trong phạm vi 100 (Tiết 2)', 'Bài 34: Ôn tập hình học và đo lường (Tiết 1)', 'Bài 34: Ôn tập hình học và đo lường (Tiết 2)'],
  14: ['Bài 35: Làm quen với phép nhân (Tiết 1)', 'Bài 35: Làm quen với phép nhân (Tiết 2)', 'Bài 36: Thừa số, tích (Tiết 1)', 'Bài 36: Thừa số, tích (Tiết 2)', 'Bài 37: Bảng nhân 2 (Tiết 1)'],
  15: ['Bài 37: Bảng nhân 2 (Tiết 2)', 'Bài 38: Bảng nhân 5 (Tiết 1)', 'Bài 38: Bảng nhân 5 (Tiết 2)', 'Bài 39: Luyện tập bảng nhân 2 và 5 (Tiết 1)', 'Bài 39: Luyện tập bảng nhân 2 và 5 (Tiết 2)'],
  16: ['Bài 40: Làm quen với phép chia (Tiết 1)', 'Bài 40: Làm quen với phép chia (Tiết 2)', 'Bài 41: Số bị chia, số chia, thương (Tiết 1)', 'Bài 41: Số bị chia, số chia, thương (Tiết 2)', 'Bài 42: Bảng chia 2'],
  17: ['Bài 43: Bảng chia 5', 'Bài 44: Ôn tập học kì 1 - Số và phép tính (Tiết 1)', 'Bài 44: Ôn tập học kì 1 - Số và phép tính (Tiết 2)', 'Bài 45: Ôn tập học kì 1 - Hình học và đo lường (Tiết 1)', 'Bài 45: Ôn tập học kì 1 - Giải toán có lời văn (Tiết 2)'],
  18: ['Bài 46: Luyện tập tổng hợp cuối học kì 1 (Tiết 1)', 'Bài 46: Luyện tập tổng hợp cuối học kì 1 (Tiết 2)', 'Kiểm tra định kì cuối học kì 1 môn Toán', 'Chữa bài kiểm tra và củng cố kiến thức', 'Tổng kết học tập môn Toán học kì 1'],
};

// =========================================================================
// 4. KHỐI 3 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (Tuần 1 -> 18+)
// =========================================================================
export const GRADE_3_TOAN: Record<number, string[]> = {
  1: ['Bài 1: Ôn tập các số đến 1000 (Tiết 1)', 'Bài 1: Ôn tập các số đến 1000 (Tiết 2)', 'Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 1000 (Tiết 1)', 'Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 1000 (Tiết 2)', 'Bài 3: Tìm thành phần trong phép cộng, phép trừ'],
  2: ['Bài 4: Ôn tập bảng nhân 2, bảng nhân 5 (Tiết 1)', 'Bài 4: Ôn tập bảng chia 2, bảng chia 5 (Tiết 2)', 'Bài 5: Bảng nhân 3, bảng chia 3 (Tiết 1)', 'Bài 5: Bảng nhân 3, bảng chia 3 (Tiết 2)', 'Bài 6: Bảng nhân 4, bảng chia 4 (Tiết 1)'],
  3: ['Bài 6: Bảng nhân 4, bảng chia 4 (Tiết 2)', 'Bài 7: Ôn tập hình học và đo lường (Tiết 1)', 'Bài 7: Ôn tập hình học và đo lường (Tiết 2)', 'Bài 8: Luyện tập chung (Tiết 1)', 'Bài 8: Luyện tập chung (Tiết 2)'],
  4: ['Bài 9: Bảng nhân 6, bảng chia 6 (Tiết 1)', 'Bài 9: Bảng nhân 6, bảng chia 6 (Tiết 2)', 'Bài 10: Bảng nhân 7, bảng chia 7 (Tiết 1)', 'Bài 10: Bảng nhân 7, bảng chia 7 (Tiết 2)', 'Bài 11: Luyện tập bảng nhân, bảng chia 6 và 7'],
  5: ['Bài 12: Bảng nhân 8, bảng chia 8 (Tiết 1)', 'Bài 12: Bảng nhân 8, bảng chia 8 (Tiết 2)', 'Bài 13: Bảng nhân 9, bảng chia 9 (Tiết 1)', 'Bài 13: Bảng nhân 9, bảng chia 9 (Tiết 2)', 'Bài 14: Luyện tập chung các bảng nhân, chia'],
  6: ['Bài 15: Tìm một trong các phần bằng nhau của một số (Tiết 1)', 'Bài 15: Tìm một trong các phần bằng nhau của một số (Tiết 2)', 'Bài 16: Điểm ở giữa. Trung điểm của đoạn thẳng (Tiết 1)', 'Bài 16: Điểm ở giữa. Trung điểm của đoạn thẳng (Tiết 2)', 'Bài 17: Hình tròn. Tâm, bán kính, đường kính của hình tròn'],
  7: ['Bài 18: Góc vuông, góc không vuông (Tiết 1)', 'Bài 18: Góc vuông, góc không vuông (Tiết 2)', 'Bài 19: Thực hành nhận biết và vẽ góc vuông bằng ê ke', 'Bài 20: Mi-li-mét (Tiết 1)', 'Bài 20: Mi-li-mét (Tiết 2)'],
  8: ['Bài 21: Gam (Tiết 1)', 'Bài 21: Gam (Tiết 2)', 'Bài 22: Mi-li-lít (Tiết 1)', 'Bài 22: Mi-li-lít (Tiết 2)', 'Bài 23: Luyện tập chung về đại lượng'],
  9: ['Bài 24: Nhiệt độ. Đo nhiệt độ (Tiết 1)', 'Bài 24: Nhiệt độ. Đo nhiệt độ (Tiết 2)', 'Ôn tập giữa học kì 1 môn Toán (Tiết 1)', 'Ôn tập giữa học kì 1 môn Toán (Tiết 2)', 'Kiểm tra đánh giá giữa học kì 1'],
  10: ['Bài 25: Phép nhân số có hai chữ số với số có một chữ số (có nhớ) (Tiết 1)', 'Bài 25: Phép nhân số có hai chữ số với số có một chữ số (có nhớ) (Tiết 2)', 'Bài 26: Phép chia số có hai chữ số cho số có một chữ số (Tiết 1)', 'Bài 26: Phép chia số có hai chữ số cho số có một chữ số (Tiết 2)', 'Bài 27: Phép chia hết và phép chia có dư'],
  11: ['Bài 28: Luyện tập phép nhân và phép chia (Tiết 1)', 'Bài 28: Luyện tập phép nhân và phép chia (Tiết 2)', 'Bài 29: Nhân số có ba chữ số với số có một chữ số (Tiết 1)', 'Bài 29: Nhân số có ba chữ số với số có một chữ số (Tiết 2)', 'Bài 30: Chia số có ba chữ số cho số có một chữ số (Tiết 1)'],
  12: ['Bài 30: Chia số có ba chữ số cho số có một chữ số (Tiết 2)', 'Bài 31: So sánh số lớn gấp mấy lần số bé (Tiết 1)', 'Bài 31: So sánh số lớn gấp mấy lần số bé (Tiết 2)', 'Bài 32: So sánh số bé bằng một phần mấy số lớn (Tiết 1)', 'Bài 32: So sánh số bé bằng một phần mấy số lớn (Tiết 2)'],
  13: ['Bài 33: Giải bài toán bằng hai bước tính (Tiết 1)', 'Bài 33: Giải bài toán bằng hai bước tính (Tiết 2)', 'Bài 34: Luyện tập giải toán bằng hai bước tính (Tiết 1)', 'Bài 34: Luyện tập giải toán bằng hai bước tính (Tiết 2)', 'Bài 35: Luyện tập chung'],
  14: ['Bài 36: Chu vi hình tam giác, hình tứ giác (Tiết 1)', 'Bài 36: Chu vi hình tam giác, hình tứ giác (Tiết 2)', 'Bài 37: Chu vi hình chữ nhật (Tiết 1)', 'Bài 37: Chu vi hình chữ nhật (Tiết 2)', 'Bài 38: Chu vi hình vuông (Tiết 1)'],
  15: ['Bài 38: Chu vi hình vuông (Tiết 2)', 'Bài 39: Luyện tập chung về chu vi (Tiết 1)', 'Bài 39: Luyện tập chung về chu vi (Tiết 2)', 'Bài 40: Làm quen với biểu thức (Tiết 1)', 'Bài 40: Làm quen với biểu thức (Tiết 2)'],
  16: ['Bài 41: Tính giá trị của biểu thức (Tiết 1)', 'Bài 41: Tính giá trị của biểu thức (Tiết 2)', 'Bài 42: Tính giá trị của biểu thức (tiếp theo) (Tiết 1)', 'Bài 42: Tính giá trị của biểu thức (tiếp theo) (Tiết 2)', 'Bài 43: Luyện tập chung tính giá trị biểu thức'],
  17: ['Bài 44: Ôn tập học kì 1 - Số và phép tính trong phạm vi 1000 (Tiết 1)', 'Bài 44: Ôn tập học kì 1 - Số và phép tính trong phạm vi 1000 (Tiết 2)', 'Bài 45: Ôn tập hình học và đo lường (Tiết 1)', 'Bài 45: Ôn tập hình học và đo lường (Tiết 2)', 'Bài 46: Ôn tập giải bài toán có lời văn'],
  18: ['Bài 47: Luyện tập kiểm tra cuối học kì 1 (Tiết 1)', 'Bài 47: Luyện tập kiểm tra cuối học kì 1 (Tiết 2)', 'Kiểm tra định kì cuối học kì 1 môn Toán', 'Chữa bài kiểm tra, tuyên dương học sinh', 'Tổng kết môn Toán học kì 1'],
};

// =========================================================================
// 5. KHỐI 5 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (Tuần 1 -> 18+)
// =========================================================================
export const GRADE_5_TIENG_VIET: Record<number, string[]> = {
  1: ['Bài 1: Khung trời tuổi thơ (Tiết 1 - Đọc)', 'Bài 1: Từ đồng nghĩa (LTVC)', 'Bài 1: Tìm hiểu cách viết bài văn tả phong cảnh (Viết)', 'Bài 2: Thi nhạc (Tiết 1 - Đọc)', 'Bài 2: Tìm ý cho bài văn tả phong cảnh (Viết)', 'Đọc mở rộng: Đọc văn bản về thế giới trẻ thơ', 'Nói và nghe: Tôi và các bạn'],
  2: ['Bài 3: Bài ca Trái Đất (Tiết 1 - Đọc)', 'Bài 3: Luyện tập về từ đồng nghĩa (LTVC)', 'Bài 3: Lập dàn ý cho bài văn tả phong cảnh (Viết)', 'Bài 4: Chiều biên cương (Tiết 1 - Đọc)', 'Bài 4: Viết đoạn văn miêu tả cảnh đẹp quê hương', 'Đọc mở rộng: Đọc thơ về hòa bình', 'Nói và nghe: Bảo vệ môi trường sống'],
  3: ['Bài 5: Tiếng đàn Ba-la-lai-ca trên sông Đà (Tiết 1 - Đọc)', 'Bài 5: Từ trái nghĩa (LTVC)', 'Bài 5: Viết bài văn tả phong cảnh (Viết)', 'Bài 6: Kì diệu rừng xanh (Tiết 1 - Đọc)', 'Bài 6: Trả bài văn tả phong cảnh (Viết)', 'Đọc mở rộng: Sinh hoạt câu lạc bộ đọc sách', 'Nói và nghe: Vẻ đẹp thiên nhiên kì vĩ'],
  4: ['Bài 7: Những hạt gạo nghĩa tình (Tiết 1 - Đọc)', 'Bài 7: Luyện tập về từ trái nghĩa (LTVC)', 'Bài 7: Tìm hiểu cách viết đoạn văn giới thiệu nhân vật', 'Bài 8: Trước cổng Trời (Tiết 1 - Đọc)', 'Bài 8: Viết đoạn văn giới thiệu nhân vật trong truyện', 'Đọc mở rộng: Đọc truyện về tấm lòng nhân ái', 'Nói và nghe: Chia sẻ cảm nghĩ về người tốt'],
  5: ['Bài 9: Mùa thảo quả (Tiết 1 - Đọc)', 'Bài 9: Từ nhiều nghĩa (LTVC)', 'Bài 9: Tìm hiểu cách viết bài văn kể chuyện sáng tạo', 'Bài 10: Hành trình của bầy ong (Tiết 1 - Đọc)', 'Bài 10: Lập dàn ý bài văn kể chuyện sáng tạo', 'Đọc mở rộng: Đọc văn học thiếu nhi', 'Nói và nghe: Kể lại một chuyến đi trải nghiệm'],
  6: ['Bài 11: Người gác rừng tí hon (Tiết 1 - Đọc)', 'Bài 11: Luyện tập về từ nhiều nghĩa (LTVC)', 'Bài 11: Viết bài văn kể chuyện sáng tạo', 'Bài 12: Trồng rừng ngập mặn (Tiết 1 - Đọc)', 'Bài 12: Trả bài văn kể chuyện sáng tạo', 'Đọc mở rộng: Đọc tài liệu bảo vệ rừng', 'Nói và nghe: Trách nhiệm với thiên nhiên'],
  7: ['Bài 13: Chuỗi ngọc lam (Tiết 1 - Đọc)', 'Bài 13: Đại từ (LTVC)', 'Bài 13: Tìm hiểu cách viết đoạn văn thể hiện tình cảm', 'Bài 14: Hạt gạo làng ta (Tiết 1 - Đọc)', 'Bài 14: Viết đoạn văn thể hiện tình cảm, cảm xúc', 'Đọc mở rộng: Đọc thơ ca ngợi người lao động', 'Nói và nghe: Trao đổi về tình cảm gia đình'],
  8: ['Bài 15: Buôn Chư Lênh đón cô giáo (Tiết 1 - Đọc)', 'Bài 15: Luyện tập về đại từ (LTVC)', 'Bài 15: Ôn tập văn kể chuyện', 'Bài 16: Thầy thuốc như mẹ hiền (Tiết 1 - Đọc)', 'Bài 16: Viết đoạn văn nêu ý kiến về một hiện tượng', 'Đọc mở rộng: Sinh hoạt câu lạc bộ đọc sách', 'Nói và nghe: Tôn sư trọng đạo'],
  9: ['Ôn tập giữa học kì 1 (Tiết 1 - Đọc thành tiếng)', 'Ôn tập giữa học kì 1 (Tiết 2 - Đọc hiểu văn bản)', 'Ôn tập giữa học kì 1 (Tiết 3 - Ôn tập Luyện từ và câu)', 'Ôn tập giữa học kì 1 (Tiết 4 - Ôn tập Viết văn)', 'Kiểm tra giữa kì (Đọc hiểu)', 'Kiểm tra giữa kì (Chính tả và Làm văn)', 'Đánh giá rút kinh nghiệm giữa kì'],
  10: ['Bài 17: Thầy cúng đi bệnh viện (Tiết 1 - Đọc)', 'Bài 17: Quan hệ từ (LTVC)', 'Bài 17: Tìm hiểu cách viết bài văn tả người', 'Bài 18: Về ngôi nhà đang xây (Tiết 1 - Đọc)', 'Bài 18: Quan sát và tìm ý cho bài văn tả người', 'Đọc mở rộng: Đọc sách báo khoa học', 'Nói và nghe: Xây dựng nếp sống văn minh'],
  11: ['Bài 19: Ngu Công dời núi (Tiết 1 - Đọc)', 'Bài 19: Luyện tập về quan hệ từ (LTVC)', 'Bài 19: Lập dàn ý bài văn tả người', 'Bài 20: Tranh làng Hồ (Tiết 1 - Đọc)', 'Bài 20: Viết đoạn văn tả ngoại hình của người', 'Đọc mở rộng: Đọc di sản văn hóa Việt Nam', 'Nói và nghe: Giữ gìn nét đẹp truyền thống'],
  12: ['Bài 21: Hạt gạo nghĩa tình (Tiết 1 - Đọc)', 'Bài 21: Luyện tập về quan hệ từ (tiếp theo) (LTVC)', 'Bài 21: Viết đoạn văn tả hoạt động của người', 'Bài 22: Ca dao về lao động sản xuất (Tiết 1 - Đọc)', 'Bài 22: Viết bài văn tả người', 'Đọc mở rộng: Đọc ca dao, dân ca', 'Nói và nghe: Tình yêu quê hương qua ca dao'],
  13: ['Bài 23: Nghìn năm văn hiến (Tiết 1 - Đọc)', 'Bài 23: Ôn tập từ loại (LTVC)', 'Bài 23: Trả bài văn tả người', 'Bài 24: Sắc màu em yêu (Tiết 1 - Đọc)', 'Bài 24: Tìm hiểu cách viết bài văn tả một đồ vật', 'Đọc mở rộng: Đọc sách văn hóa lịch sử', 'Nói và nghe: Tự hào đất nước Việt Nam'],
  14: ['Bài 25: Đất nước (Tiết 1 - Đọc)', 'Bài 25: Câu ghép (LTVC)', 'Bài 25: Lập dàn ý bài văn tả đồ vật', 'Bài 26: Kì quan thế giới (Tiết 1 - Đọc)', 'Bài 26: Viết bài văn tả đồ vật', 'Đọc mở rộng: Đọc danh lam thắng cảnh', 'Nói và nghe: Kể chuyện về danh lam thắng cảnh'],
  15: ['Bài 27: Tiếng vọng rừng sâu (Tiết 1 - Đọc)', 'Bài 27: Cách nối các vế câu ghép (LTVC)', 'Bài 27: Trả bài văn tả đồ vật', 'Bài 28: Thăm đảo ngọc (Tiết 1 - Đọc)', 'Bài 28: Viết đoạn văn ngắn nêu cảm nghĩ', 'Đọc mở rộng: Sinh hoạt đọc sách', 'Nói và nghe: Em yêu biển đảo Tổ quốc'],
  16: ['Bài 29: Âm vang cồng chiêng (Tiết 1 - Đọc)', 'Bài 29: Nối các vế câu ghép bằng quan hệ từ (LTVC)', 'Bài 29: Ôn tập kĩ năng viết văn bản', 'Bài 30: Chúc mừng năm mới (Tiết 1 - Đọc)', 'Bài 30: Viết thiệp và thư chúc mừng năm mới', 'Đọc mở rộng: Đọc phong tục Tết cổ truyền', 'Nói và nghe: Tết đoàn viên sum vầy'],
  17: ['Ôn tập cuối học kì 1 (Tiết 1 - Ôn luyện đọc thành tiếng)', 'Ôn tập cuối học kì 1 (Tiết 2 - Đọc hiểu văn bản)', 'Ôn tập cuối học kì 1 (Tiết 3 - Ôn tập Luyện từ và câu: Từ loại và câu ghép)', 'Ôn tập cuối học kì 1 (Tiết 4 - Ôn tập Tập làm văn: Văn miêu tả)', 'Ôn tập cuối học kì 1 (Tiết 5 - Đánh giá kĩ năng nghe nói)', 'Đọc mở rộng: Tổng kết học kì 1', 'Đánh giá chuẩn bị kiểm tra cuối kì'],
  18: ['Kiểm tra định kì cuối học kì 1 (Đọc thành tiếng)', 'Kiểm tra định kì cuối học kì 1 (Đọc hiểu và Luyện từ và câu)', 'Kiểm tra định kì cuối học kì 1 (Chính tả nghe - viết)', 'Kiểm tra định kì cuối học kì 1 (Tập làm văn miêu tả)', 'Đánh giá, xếp loại môn Tiếng Việt học kì 1', 'Tuyên dương khen thưởng học sinh xuất sắc', 'Tổng kết học kì 1 và chuẩn bị học kì 2'],
};

export const GRADE_5_TOAN: Record<number, string[]> = {
  1: ['Bài 1: Ôn tập về phân số (Tiết 1)', 'Bài 1: Ôn tập về phân số (Tiết 2)', 'Bài 2: Phân số thập phân (Tiết 1)', 'Bài 2: Phân số thập phân (Tiết 2)', 'Bài 3: Hỗn số (Tiết 1)'],
  2: ['Bài 3: Hỗn số (Tiết 2)', 'Bài 4: Luyện tập chung về phân số và hỗn số', 'Bài 5: Khái niệm số thập phân (Tiết 1)', 'Bài 5: Khái niệm số thập phân (Tiết 2)', 'Bài 6: Hàng của số thập phân. Đọc, viết số thập phân (Tiết 1)'],
  3: ['Bài 6: Hàng của số thập phân. Đọc, viết số thập phân (Tiết 2)', 'Bài 7: Số thập phân bằng nhau', 'Bài 8: So sánh hai số thập phân (Tiết 1)', 'Bài 8: So sánh hai số thập phân (Tiết 2)', 'Bài 9: Luyện tập chung về số thập phân'],
  4: ['Bài 10: Viết các số đo độ dài dưới dạng số thập phân (Tiết 1)', 'Bài 10: Viết các số đo độ dài dưới dạng số thập phân (Tiết 2)', 'Bài 11: Viết các số đo khối lượng dưới dạng số thập phân', 'Bài 12: Viết các số đo diện tích dưới dạng số thập phân', 'Bài 13: Luyện tập chung đơn vị đo'],
  5: ['Bài 14: Phép cộng số thập phân (Tiết 1)', 'Bài 14: Phép cộng số thập phân (Tiết 2)', 'Bài 15: Tính chất giao hoán và kết hợp của phép cộng số thập phân', 'Bài 16: Luyện tập phép cộng số thập phân', 'Bài 17: Phép trừ số thập phân (Tiết 1)'],
  6: ['Bài 17: Phép trừ số thập phân (Tiết 2)', 'Bài 18: Luyện tập phép trừ số thập phân', 'Bài 19: Luyện tập chung phép cộng và phép trừ số thập phân (Tiết 1)', 'Bài 19: Luyện tập chung phép cộng và phép trừ số thập phân (Tiết 2)', 'Bài 20: Phép nhân số thập phân với số tự nhiên (Tiết 1)'],
  7: ['Bài 20: Phép nhân số thập phân với số tự nhiên (Tiết 2)', 'Bài 21: Nhân một số thập phân với 10, 100, 1000,...', 'Bài 22: Nhân một số thập phân với một số thập phân (Tiết 1)', 'Bài 22: Nhân một số thập phân với một số thập phân (Tiết 2)', 'Bài 23: Luyện tập phép nhân số thập phân'],
  8: ['Bài 24: Tính chất của phép nhân số thập phân', 'Bài 25: Luyện tập chung phép nhân số thập phân', 'Bài 26: Phép chia một số thập phân cho một số tự nhiên (Tiết 1)', 'Bài 26: Phép chia một số thập phân cho một số tự nhiên (Tiết 2)', 'Bài 27: Chia một số thập phân cho 10, 100, 1000,...'],
  9: ['Bài 28: Chia một số tự nhiên cho một số tự nhiên mà thương tìm được là một số thập phân', 'Bài 29: Luyện tập phép chia số thập phân', 'Ôn tập giữa học kì 1 môn Toán (Tiết 1)', 'Ôn tập giữa học kì 1 môn Toán (Tiết 2)', 'Kiểm tra đánh giá giữa học kì 1'],
  10: ['Bài 30: Chia một số tự nhiên cho một số thập phân (Tiết 1)', 'Bài 30: Chia một số tự nhiên cho một số thập phân (Tiết 2)', 'Bài 31: Chia một số thập phân cho một số thập phân (Tiết 1)', 'Bài 31: Chia một số thập phân cho một số thập phân (Tiết 2)', 'Bài 32: Luyện tập chung bốn phép tính với số thập phân'],
  11: ['Bài 33: Tỉ số phần trăm (Tiết 1)', 'Bài 33: Tỉ số phần trăm (Tiết 2)', 'Bài 34: Giải bài toán về tỉ số phần trăm (Tiết 1)', 'Bài 34: Giải bài toán về tỉ số phần trăm (Tiết 2)', 'Bài 35: Luyện tập tỉ số phần trăm'],
  12: ['Bài 36: Giải bài toán về tỉ số phần trăm (tiếp theo) (Tiết 1)', 'Bài 36: Giải bài toán về tỉ số phần trăm (tiếp theo) (Tiết 2)', 'Bài 37: Luyện tập chung về tỉ số phần trăm (Tiết 1)', 'Bài 37: Luyện tập chung về tỉ số phần trăm (Tiết 2)', 'Bài 38: Thực hành sử dụng máy tính bỏ túi'],
  13: ['Bài 39: Hình tam giác (Tiết 1)', 'Bài 39: Hình tam giác (Tiết 2)', 'Bài 40: Diện tích hình tam giác (Tiết 1)', 'Bài 40: Diện tích hình tam giác (Tiết 2)', 'Bài 41: Luyện tập diện tích hình tam giác'],
  14: ['Bài 42: Hình thang (Tiết 1)', 'Bài 42: Hình thang (Tiết 2)', 'Bài 43: Diện tích hình thang (Tiết 1)', 'Bài 43: Diện tích hình thang (Tiết 2)', 'Bài 44: Luyện tập diện tích hình thang'],
  15: ['Bài 45: Hình tròn. Đường tròn', 'Bài 46: Chu vi hình tròn (Tiết 1)', 'Bài 46: Chu vi hình tròn (Tiết 2)', 'Bài 47: Diện tích hình tròn (Tiết 1)', 'Bài 47: Diện tích hình tròn (Tiết 2)'],
  16: ['Bài 48: Luyện tập chung về chu vi và diện tích hình tròn', 'Bài 49: Biểu đồ hình quạt tròn (Tiết 1)', 'Bài 49: Biểu đồ hình quạt tròn (Tiết 2)', 'Bài 50: Luyện tập về biểu đồ hình quạt tròn', 'Bài 51: Luyện tập chung hình học'],
  17: ['Bài 52: Ôn tập học kì 1 - Số thập phân và các phép tính (Tiết 1)', 'Bài 52: Ôn tập học kì 1 - Số thập phân và các phép tính (Tiết 2)', 'Bài 53: Ôn tập giải toán về tỉ số phần trăm', 'Bài 54: Ôn tập hình học (Hình tam giác, hình thang, hình tròn)', 'Bài 55: Luyện tập chung chuẩn bị kiểm tra học kì 1'],
  18: ['Bài 56: Đề kiểm tra thử cuối học kì 1', 'Kiểm tra định kì cuối học kì 1 môn Toán (Phần trắc nghiệm)', 'Kiểm tra định kì cuối học kì 1 môn Toán (Phần tự luận)', 'Chữa bài kiểm tra, chấm và đánh giá học lực', 'Tổng kết môn Toán học kì 1'],
};

export const GRADE_5_KHOA_HOC: Record<number, string[]> = {
  1: ['Bài 1: Đất và vai trò của đất đối với cây trồng (Tiết 1)', 'Bài 1: Đất và vai trò của đất đối với cây trồng (Tiết 2)'],
  2: ['Bài 2: Ô nhiễm, xói mòn đất và bảo vệ môi trường đất (Tiết 1)', 'Bài 2: Ô nhiễm, xói mòn đất và bảo vệ môi trường đất (Tiết 2)'],
  3: ['Bài 3: Hỗn hợp và dung dịch (Tiết 1)', 'Bài 3: Hỗn hợp và dung dịch (Tiết 2)'],
  4: ['Bài 4: Sự biến đổi của chất (Tiết 1)', 'Bài 4: Sự biến đổi của chất (Tiết 2)'],
  5: ['Bài 5: Năng lượng và các nguồn năng lượng (Tiết 1)', 'Bài 5: Năng lượng và các nguồn năng lượng (Tiết 2)'],
  6: ['Bài 6: Năng lượng mặt trời, gió và nước chảy (Tiết 1)', 'Bài 6: Năng lượng mặt trời, gió và nước chảy (Tiết 2)'],
  7: ['Bài 7: Năng lượng điện (Tiết 1)', 'Bài 7: Năng lượng điện (Tiết 2)'],
  8: ['Bài 8: Sử dụng năng lượng điện an toàn và tiết kiệm (Tiết 1)', 'Bài 8: Sử dụng năng lượng điện an toàn và tiết kiệm (Tiết 2)'],
  9: ['Bài 9: Ôn tập chủ đề Chất và Năng lượng (Tiết 1)', 'Đánh giá giữa học kì 1 môn Khoa học (Tiết 2)'],
  10: ['Bài 10: Sự sinh sản của thực vật có hoa (Tiết 1)', 'Bài 10: Sự sinh sản của thực vật có hoa (Tiết 2)'],
  11: ['Bài 11: Sự sinh sản của động vật (Tiết 1)', 'Bài 11: Sự sinh sản của động vật (Tiết 2)'],
  12: ['Bài 12: Vòng đời của động vật (Tiết 1)', 'Bài 12: Vòng đời của động vật (Tiết 2)'],
  13: ['Bài 13: Môi trường sống của sinh vật (Tiết 1)', 'Bài 13: Môi trường sống của sinh vật (Tiết 2)'],
  14: ['Bài 14: Chuỗi thức ăn trong tự nhiên (Tiết 1)', 'Bài 14: Chuỗi thức ăn trong tự nhiên (Tiết 2)'],
  15: ['Bài 15: Vai trò của môi trường đối với đời sống sinh vật và con người (Tiết 1)', 'Bài 15: Vai trò của môi trường đối với đời sống sinh vật và con người (Tiết 2)'],
  16: ['Bài 16: Tác động của con người đến môi trường và giải pháp bảo vệ (Tiết 1)', 'Bài 16: Tác động của con người đến môi trường và giải pháp bảo vệ (Tiết 2)'],
  17: ['Bài 17: Ôn tập học kì 1 môn Khoa học (Tiết 1)', 'Bài 17: Ôn tập học kì 1 môn Khoa học (Tiết 2)'],
  18: ['Kiểm tra, đánh giá định kì cuối học kì 1 môn Khoa học (Tiết 1)', 'Tổng kết kết quả học tập môn Khoa học kì 1 (Tiết 2)'],
};

export const GRADE_5_LS_DL: Record<number, string[]> = {
  1: ['Bài 1: Vị trí địa lí, lãnh thổ, đơn vị hành chính, Quốc kì, Quốc huy, Quốc ca Việt Nam (Tiết 1)', 'Bài 1: Vị trí địa lí, lãnh thổ, đơn vị hành chính, Quốc kì, Quốc huy, Quốc ca Việt Nam (Tiết 2)'],
  2: ['Bài 2: Thiên nhiên Việt Nam (Tiết 1: Địa hình và khoáng sản)', 'Bài 2: Thiên nhiên Việt Nam (Tiết 2: Khí hậu và sông ngòi)'],
  3: ['Bài 3: Biển, đảo Việt Nam và chủ quyền biển đảo (Tiết 1)', 'Bài 3: Biển, đảo Việt Nam và chủ quyền biển đảo (Tiết 2)'],
  4: ['Bài 4: Dân cư và các dân tộc Việt Nam (Tiết 1)', 'Bài 4: Dân cư và các dân tộc Việt Nam (Tiết 2)'],
  5: ['Bài 5: Nước Văn Lang, Âu Lạc (Tiết 1)', 'Bài 5: Nước Văn Lang, Âu Lạc (Tiết 2)'],
  6: ['Bài 6: Đấu tranh giành độc lập thời Bắc thuộc (Tiết 1: Khởi nghĩa Hai Bà Trưng)', 'Bài 6: Đấu tranh giành độc lập thời Bắc thuộc (Tiết 2: Chiến thắng Bạch Đằng năm 938)'],
  7: ['Bài 7: Triều Lý và việc định đô ở Thăng Long (Tiết 1)', 'Bài 7: Triều Lý và việc định đô ở Thăng Long (Tiết 2)'],
  8: ['Bài 8: Triều Trần và cuộc kháng chiến chống quân Mông - Nguyên (Tiết 1)', 'Bài 8: Triều Trần và cuộc kháng chiến chống quân Mông - Nguyên (Tiết 2)'],
  9: ['Bài 9: Khởi nghĩa Lam Sơn và triều Hậu Lê (Tiết 1)', 'Đánh giá giữa học kì 1 môn Lịch sử và Địa lí (Tiết 2)'],
  10: ['Bài 10: Triều Nguyễn (Tiết 1)', 'Bài 10: Triều Nguyễn (Tiết 2)'],
  11: ['Bài 11: Cuộc kháng chiến chống thực dân Pháp xâm lược (Tiết 1: Phong trào Cần vương)', 'Bài 11: Cuộc kháng chiến chống thực dân Pháp xâm lược (Tiết 2: Khởi nghĩa Yên Thế)'],
  12: ['Bài 12: Nguyễn Tất Thành ra đi tìm đường cứu nước (Tiết 1)', 'Bài 12: Nguyễn Tất Thành ra đi tìm đường cứu nước (Tiết 2)'],
  13: ['Bài 13: Cách mạng tháng Tám năm 1945 thành công (Tiết 1)', 'Bài 13: Bác Hồ đọc Tuyên ngôn Độc lập ngày 2/9/1945 (Tiết 2)'],
  14: ['Bài 14: Chiến dịch Điện Biên Phủ lịch sử năm 1954 (Tiết 1)', 'Bài 14: Ý nghĩa lịch sử chiến thắng Điện Biên Phủ (Tiết 2)'],
  15: ['Bài 15: Chiến dịch Hồ Chí Minh lịch sử năm 1975, giải phóng hoàn toàn miền Nam (Tiết 1)', 'Bài 15: Non sông thu về một mối (Tiết 2)'],
  16: ['Bài 16: Đất nước đổi mới và hội nhập quốc tế (Tiết 1)', 'Bài 16: Đất nước đổi mới và hội nhập quốc tế (Tiết 2)'],
  17: ['Bài 17: Ôn tập học kì 1 môn Lịch sử và Địa lí (Tiết 1)', 'Bài 17: Ôn tập học kì 1 môn Lịch sử và Địa lí (Tiết 2)'],
  18: ['Kiểm tra, đánh giá định kì cuối học kì 1 (Tiết 1)', 'Kiểm tra, đánh giá định kì cuối học kì 1 (Tiết 2)'],
};

// =========================================================================
// HÀM CHUẨN HÓA TIÊU ĐỀ: LOẠI BỎ "LỚP X", "KHỐI X", "L Ồ", "BÀI HỌC"
// =========================================================================
export function cleanCurriculumTitle(title: string): string {
  if (!title) return '';
  let cleaned = title
    // Loại bỏ tiền tố "Bài học:" / "Bài học " / "bài học:" / "bài học "
    .replace(/^Bài\s*học\s*:\s*/i, '')
    .replace(/^Bài\s*học\s+/i, '')
    .replace(/^bài\s*học\s*:\s*/i, '')
    .replace(/^bài\s*học\s+/i, '')
    // Loại bỏ tiền tố / cụm từ "Bài học" đứng trước tên bài
    .replace(/\bBài\s*học\s*:\s*/gi, '')
    // Loại bỏ "L Ồ", "L Ồ 1", "L Ồ 2", "L Ồ 3", "L Ồ 4", "L Ồ 5"
    .replace(/\bL\s*Ồ\s*[1-5]?(\.[0-9])?\b/gi, '')
    .replace(/\bL\s*Ồ\b/gi, '')
    // Loại bỏ toàn bộ cụm từ "Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5" (kể cả 4.2, 4.1...)
    .replace(/\bLớp\s*[1-5](\.[0-9])?\b/gi, '')
    // Loại bỏ cụm từ "Khối 1", "Khối 2", "Khối 3", "Khối 4", "Khối 5"
    .replace(/\bKhối\s*[1-5]\b/gi, '')
    // Dọn dẹp khoảng trắng thừa và dấu hai chấm / gạch nối mồ côi ở đầu hoặc cuối
    .replace(/^\s*[-–—:]\s*/, '')
    .replace(/\s*[-–—:]\s*$/, '')
    .replace(/\(\s*[-–—:]\s*/g, '(')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return cleaned;
}

// =========================================================================
// BỘ ÁNH XẠ CHƯƠNG TRÌNH ĐẦY ĐỦ CHO TẤT CẢ CÁC KHỐI VÀ MÔN HỌC (Tuần 1 -> 18+)
// =========================================================================
function toWeekArray(record: Record<number, string | string[]>): Record<number, string[]> {
  const result: Record<number, string[]> = {};
  for (const [key, val] of Object.entries(record)) {
    result[Number(key)] = Array.isArray(val) ? val : [val];
  }
  return result;
}

export function getCurriculumListForGradeAndSubject(grade: number, rawSubject: string): Record<number, string[]> {
  const norm = (rawSubject || '').toLowerCase().trim();

  // Khối 4
  if (grade === 4) {
    if (norm.includes('tiếng việt')) return GRADE_4_TIENG_VIET;
    if (norm.includes('toán')) return GRADE_4_TOAN;
    if (norm.includes('khoa học')) return GRADE_4_KHOA_HOC;
    if (norm.includes('lịch sử') || norm.includes('địa lí') || norm.includes('địa lý') || norm.includes('ls & đl')) return GRADE_4_LS_DL;
    if (norm.includes('đạo đức')) return toWeekArray(GRADE_4_DAO_DUC);
    if (norm.includes('công nghệ')) return toWeekArray(GRADE_4_CONG_NGHE);
    if (norm.includes('tin học')) return toWeekArray(GRADE_4_TIN_HOC);
    if (norm.includes('trải nghiệm') || norm.includes('hđtn')) return GRADE_4_HDTN;
    if (norm.includes('tiếng anh') || norm.includes('anh văn')) return GRADE_4_TIENG_ANH;
    if (norm.includes('âm nhạc')) return toWeekArray(GRADE_4_AM_NHAC);
    if (norm.includes('mĩ thuật') || norm.includes('mỹ thuật')) return toWeekArray(GRADE_4_MI_THUAT);
    if (norm.includes('thể chất') || norm.includes('gdtc')) return GRADE_4_GDTC;
  }

  // Khối 1
  if (grade === 1) {
    if (norm.includes('tiếng việt')) return GRADE_1_TIENG_VIET;
    if (norm.includes('toán')) return GRADE_1_TOAN;
    if (norm.includes('đạo đức')) return toWeekArray(GRADE_1_DAO_DUC);
    if (norm.includes('tự nhiên') || norm.includes('tnxh') || norm.includes('xã hội')) return GRADE_1_TNXH;
    if (norm.includes('trải nghiệm') || norm.includes('hđtn')) return GRADE_1_HDTN;
  }

  // Khối 2
  if (grade === 2) {
    if (norm.includes('tiếng việt')) return GRADE_2_TIENG_VIET;
    if (norm.includes('toán')) return GRADE_2_TOAN;
    if (norm.includes('tự nhiên') || norm.includes('tnxh') || norm.includes('xã hội')) return GRADE_2_TNXH;
  }

  // Khối 3
  if (grade === 3) {
    if (norm.includes('toán')) return GRADE_3_TOAN;
    if (norm.includes('tự nhiên') || norm.includes('tnxh') || norm.includes('xã hội')) return GRADE_3_TNXH;
  }

  // Khối 5
  if (grade === 5) {
    if (norm.includes('tiếng việt')) return GRADE_5_TIENG_VIET;
    if (norm.includes('toán')) return GRADE_5_TOAN;
    if (norm.includes('khoa học')) return GRADE_5_KHOA_HOC;
    if (norm.includes('lịch sử') || norm.includes('địa lí') || norm.includes('địa lý') || norm.includes('ls & đl')) return GRADE_5_LS_DL;
  }

  // Fallback defaults theo môn học nếu chưa phân loại khối riêng
  if (norm.includes('đạo đức')) return toWeekArray(GRADE_4_DAO_DUC);
  if (norm.includes('khoa học')) return GRADE_4_KHOA_HOC;
  if (norm.includes('lịch sử') || norm.includes('địa lí') || norm.includes('địa lý') || norm.includes('ls & đl')) return GRADE_4_LS_DL;
  if (norm.includes('công nghệ')) return toWeekArray(GRADE_4_CONG_NGHE);
  if (norm.includes('tin học')) return toWeekArray(GRADE_4_TIN_HOC);
  if (norm.includes('trải nghiệm') || norm.includes('hđtn')) return GRADE_4_HDTN;
  if (norm.includes('tiếng anh') || norm.includes('anh văn')) return GRADE_4_TIENG_ANH;
  if (norm.includes('âm nhạc')) return toWeekArray(GRADE_4_AM_NHAC);
  if (norm.includes('mĩ thuật') || norm.includes('mỹ thuật')) return toWeekArray(GRADE_4_MI_THUAT);
  if (norm.includes('thể chất') || norm.includes('gdtc')) return GRADE_4_GDTC;
  if (norm.includes('tự nhiên') || norm.includes('tnxh') || norm.includes('xã hội')) return GRADE_1_TNXH;
  if (norm.includes('tiếng việt')) return GRADE_4_TIENG_VIET;
  if (norm.includes('toán')) return GRADE_4_TOAN;

  return {};
}

/**
 * Tra cứu chính xác bài học và tiết PPCT cho bất kỳ môn, khối, tuần nào.
 * KHÔNG BAO GIỜ hiển thị tiêu đề mặc định kiểu 'Đọc hiểu văn bản Tuần 4'.
 */
export function getCurriculumLessonInfo(
  grade: number,
  rawSubject: string,
  week: number,
  periodInWeek: number // 1-indexed
): { title: string; ppct: number; subType?: string } {
  const dataset = getCurriculumListForGradeAndSubject(grade, rawSubject);
  const normalizedWeek = week > 18 ? ((week - 1) % 18) + 1 : Math.max(1, week);

  const weekLessons = dataset[normalizedWeek] || dataset[week] || [];

  // Tính số tiết PPCT luỹ kế đến hết các tuần trước đó
  let cumulativePPCT = 0;
  for (let w = 1; w < normalizedWeek; w++) {
    cumulativePPCT += (dataset[w] || []).length;
  }
  const currentPPCT = cumulativePPCT + periodInWeek;

  let title = '';
  if (weekLessons.length > 0) {
    const lessonIdx = (periodInWeek - 1) % weekLessons.length;
    title = cleanCurriculumTitle(weekLessons[lessonIdx] || '');
  }

  // Nếu môn học không có trong dataset chuẩn, tạo tiêu đề chuẩn chỉn chu không có 'Bài học' hay 'Lớp X'
  if (!title) {
    title = `${rawSubject}: Bài học tuần ${week} (Tiết ${periodInWeek})`;
    title = cleanCurriculumTitle(title);
  }

  // Nhận diện subType nếu là Tiếng Việt
  let subType: string | undefined = undefined;
  const tLower = title.toLowerCase();
  if (tLower.includes('đọc')) subType = 'Đọc';
  else if (tLower.includes('viết') || tLower.includes('chính tả')) subType = 'Viết';
  else if (tLower.includes('ltvc') || tLower.includes('từ và câu')) subType = 'Luyện từ và câu';
  else if (tLower.includes('nói và nghe')) subType = 'Nói và nghe';
  else if (tLower.includes('đọc mở rộng')) subType = 'Đọc mở rộng';

  return {
    title,
    ppct: currentPPCT,
    subType,
  };
}


