import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Lazy init Gemini SDK
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Endpoint: Generate or Enrich KHBD lesson plan according to CV 2345
app.post('/api/generate-khbd', async (req: Request, res: Response) => {
  try {
    const {
      grade,
      subject,
      subType,
      lessonTitle,
      ppct,
      dayName,
      dateStr,
      teacherName,
      className,
      schoolName,
      subSchoolName,
      integrations, // array of integration topics e.g. ['NLS', 'AI', 'QCN', 'KNS', 'GDQPAN', 'BVMT', 'DinhDuong', 'STEM']
      userNote,
    } = req.body;

    const prompt = `Bạn là chuyên gia giáo dục tiểu học Việt Nam, nắm vững chương trình GDPT 2018, Công văn 2345/BGDĐT, khung Năng lực số (CV 3456/BGDĐT & TT 02/2025), TT 08/2024 về GDQPAN và tài liệu giáo dục từ tailieugiaoduc.edu.vn.

Hãy soạn KẾ HOẠCH BÀI DẠY (Giáo án) chi tiết theo đúng cấu trúc chuẩn Công văn 2345/BGDĐT cho tiết học sau:
- Khối lớp: Lớp ${grade || 2}
- Lớp học: ${className || '2A'}
- Giáo viên giảng dạy: ${teacherName || 'Cao Thị Khánh Linh'}
- Trường: ${schoolName || 'Trường Tiểu học Tân Thạnh'} - ${subSchoolName || 'Phân hiệu Kiến Bình'}
- Môn học: ${subject} ${subType ? `(${subType})` : ''}
- Tên bài học: ${lessonTitle}
- Tiết PPCT: ${ppct || 1}
- Thời gian: ${dayName || 'Thứ Hai'}, ngày ${dateStr || '07/09/2026'}
- Các nội dung tích hợp cần có: ${integrations ? JSON.stringify(integrations) : 'Năng lực số NLS, AI, Kỹ năng sống KNS, Quyền con người QCN, GDQPAN, Bảo vệ môi trường, GD Dinh dưỡng, Học thông qua chơi'}
- Ghi chú thêm: ${userNote || 'Soạn chi tiết bảng 2 cột: Hoạt động của giáo viên và Hoạt động của học sinh gồm đủ 4 hoạt động: Khởi động, Khám phá, Luyện tập/Thực hành, Vận dụng/Trải nghiệm'}.

YÊU CẦU:
1. Năng lực đặc thù bám sát YCCĐ bài học.
2. Năng lực chung (tự chủ & tự học, giải quyết vấn đề & sáng tạo, giao tiếp & hợp tác) và Phẩm chất (nhân ái, chăm chỉ, trung thực, trách nhiệm, yêu nước).
3. Đồ dùng dạy học cụ thể cho GV và HS.
4. Bốn hoạt động chính:
   - 1. Khởi động (Mục tiêu, Cách tiến hành cụ thể)
   - 2. Khám phá (Mục tiêu, Cách tiến hành cụ thể)
   - 3. Luyện tập / Thực hành (Mục tiêu, Cách tiến hành, có lồng ghép tích hợp phù hợp)
   - 4. Vận dụng / Trải nghiệm (Mục tiêu, Cách tiến hành gắn với thực tiễn)
5. Điều chỉnh sau bài dạy.
6. Trả về đúng định dạng JSON như schema yêu cầu.`;

    const ai = getGemini();
    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            lessonTitle: { type: Type.STRING },
            specificCompetency: { type: Type.STRING, description: 'Năng lực đặc thù của bài học' },
            generalCompetency: { type: Type.STRING, description: 'Năng lực chung (tự chủ, giao tiếp, GQVĐ)' },
            qualities: { type: Type.STRING, description: 'Phẩm chất (nhân ái, chăm chỉ, trung thực, trách nhiệm)' },
            teacherEquipments: { type: Type.STRING, description: 'Đồ dùng dạy học của GV' },
            studentEquipments: { type: Type.STRING, description: 'Đồ dùng dạy học của HS' },
            activities: {
              type: Type.OBJECT,
              properties: {
                warmup: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    objective: { type: Type.STRING },
                    teacherActivity: { type: Type.STRING },
                    studentActivity: { type: Type.STRING },
                    duration: { type: Type.STRING },
                  },
                  required: ['title', 'objective', 'teacherActivity', 'studentActivity'],
                },
                exploration: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    objective: { type: Type.STRING },
                    teacherActivity: { type: Type.STRING },
                    studentActivity: { type: Type.STRING },
                    duration: { type: Type.STRING },
                  },
                  required: ['title', 'objective', 'teacherActivity', 'studentActivity'],
                },
                practice: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    objective: { type: Type.STRING },
                    teacherActivity: { type: Type.STRING },
                    studentActivity: { type: Type.STRING },
                    duration: { type: Type.STRING },
                  },
                  required: ['title', 'objective', 'teacherActivity', 'studentActivity'],
                },
                application: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    objective: { type: Type.STRING },
                    teacherActivity: { type: Type.STRING },
                    studentActivity: { type: Type.STRING },
                    duration: { type: Type.STRING },
                  },
                  required: ['title', 'objective', 'teacherActivity', 'studentActivity'],
                },
              },
              required: ['warmup', 'exploration', 'practice', 'application'],
            },
            integrationNotes: {
              type: Type.OBJECT,
              properties: {
                nls: { type: Type.STRING },
                ai: { type: Type.STRING },
                qcn: { type: Type.STRING },
                kns: { type: Type.STRING },
                gdqpan: { type: Type.STRING },
                bvmt: { type: Type.STRING },
                dinhDuong: { type: Type.STRING },
                stem: { type: Type.STRING },
              },
            },
            afterLessonAdjustment: { type: Type.STRING },
          },
          required: [
            'lessonTitle',
            'specificCompetency',
            'generalCompetency',
            'qualities',
            'teacherEquipments',
            'studentEquipments',
            'activities',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    res.json({ success: true, lesson: parsed });
  } catch (error: any) {
    console.error('Error generating KHBD:', error);
    res.status(500).json({ success: false, error: error.message || 'Lỗi xử lý tạo bài dạy AI' });
  }
});

// Endpoint: AI-based Timetable text parser or analyzer
app.post('/api/parse-tkb', async (req: Request, res: Response) => {
  try {
    const { rawText } = req.body;
    if (!rawText) {
      return res.status(400).json({ success: false, error: 'Thiếu nội dung TKB' });
    }

    const ai = getGemini();
    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: `Hãy phân tích dữ liệu Thời khóa biểu trường tiểu học sau đây thành cấu trúc dữ liệu JSON:\n\n${rawText}`,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const result = JSON.parse(response.text?.trim() || '{}');
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error parsing TKB:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Setup Vite middleware in dev / Static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: 3000 },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
