import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  AlignmentType,
  WidthType,
  BorderStyle,
  Header,
  Footer,
  PageNumber,
} from 'docx';
import { saveAs } from 'file-saver';
import { SchoolProfile, KHBDLesson, TKBEntry, WeeklyQuizWorksheet } from '../types';
import { calculateWeekDates } from './scheduleGenerator';
import { cleanCurriculumTitle } from '../data/curriculumData';

export interface DocxExportOptions {
  fontSizePt: 12 | 13 | 14;
  includeLBG: boolean;
  includeKHBD: boolean;
  includeTKB: boolean;
  showSignatures: boolean; // Mặc định false theo yêu cầu "bỏ hết các phần ký duyệt cuối cùng của LBG"
}

export async function exportCombinedDocx(
  profile: SchoolProfile,
  lbgEntries: TKBEntry[],
  lessons: KHBDLesson[],
  options: DocxExportOptions
) {
  const fontPt = options.fontSizePt || 13;
  const fontHalfPt = fontPt * 2; // docx uses half-points (24 = 12pt, 26 = 13pt, 28 = 14pt)
  const fontTitleHalfPt = (fontPt + 2) * 2;
  const fontMainTitleHalfPt = (fontPt + 3) * 2;
  const FONT_FAMILY = 'Times New Roman';

  const sections: any[] = [];

  // ==================== 1. LỊCH BÁO GIẢNG (NẾU ĐƯỢC CHỌN - THƯỜNG Ở TRANG 1) ====================
  const lbgChildren: any[] = [];

  if (options.includeLBG) {
    // Header block
    lbgChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({ text: profile.departmentName.toUpperCase(), font: FONT_FAMILY, size: fontHalfPt - 2, bold: true }),
                    ],
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({ text: profile.schoolName.toUpperCase(), font: FONT_FAMILY, size: fontHalfPt - 2, bold: true }),
                    ],
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({ text: profile.subSchoolName, font: FONT_FAMILY, size: fontHalfPt - 2, italics: true }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({ text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', font: FONT_FAMILY, size: fontHalfPt - 2, bold: true }),
                    ],
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({ text: 'Độc lập - Tự do - Hạnh phúc', font: FONT_FAMILY, size: fontHalfPt - 2, bold: true, underline: {} }),
                    ],
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: `${profile.schoolName?.toLowerCase().includes('mỹ lạc') ? 'Mỹ Lạc' : (profile.schoolName?.replace(/Trường Tiểu [Hh]ọc/g, '').trim() || 'Mỹ Lạc')}, ngày ${profile.startDate}`,
                        font: FONT_FAMILY,
                        size: fontHalfPt - 4,
                        italics: true,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );

    lbgChildren.push(new Paragraph({ text: '', spacing: { before: 150, after: 150 } }));

    // Main Title
    lbgChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 100, after: 60 },
        children: [
          new TextRun({
            text: `LỊCH BÁO GIẢNG TUẦN ${profile.weekNumber}`,
            font: FONT_FAMILY,
            size: fontMainTitleHalfPt,
            bold: true,
            color: '003366',
          }),
        ],
      })
    );

    // Subtitle Info
    lbgChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 160 },
        children: [
          new TextRun({ text: `Giáo viên: ${profile.teacherName}`, font: FONT_FAMILY, size: fontHalfPt, bold: true }),
          new TextRun({ text: `  |  Lớp: ${profile.className}`, font: FONT_FAMILY, size: fontHalfPt, bold: true }),
          new TextRun({ text: `  |  ${profile.schoolName} - ${profile.subSchoolName}`, font: FONT_FAMILY, size: fontHalfPt }),
          new TextRun({ text: `\nThời gian thực hiện: Từ ngày ${profile.startDate} đến ngày ${profile.endDate} (Năm học ${profile.schoolYear})`, font: FONT_FAMILY, size: fontHalfPt - 2, italics: true }),
        ],
      })
    );

    // LBG Table
    const lbgTableRows: TableRow[] = [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({ width: { size: 14, type: WidthType.PERCENTAGE }, shading: { fill: '003366' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thứ, ngày', color: 'FFFFFF', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })] })] }),
          new TableCell({ width: { size: 9, type: WidthType.PERCENTAGE }, shading: { fill: '003366' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Buổi', color: 'FFFFFF', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })] })] }),
          new TableCell({ width: { size: 7, type: WidthType.PERCENTAGE }, shading: { fill: '003366' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Tiết', color: 'FFFFFF', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })] })] }),
          new TableCell({ width: { size: 18, type: WidthType.PERCENTAGE }, shading: { fill: '003366' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Môn học', color: 'FFFFFF', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })] })] }),
          new TableCell({ width: { size: 8, type: WidthType.PERCENTAGE }, shading: { fill: '003366' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'PPCT', color: 'FFFFFF', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })] })] }),
          new TableCell({ width: { size: 26, type: WidthType.PERCENTAGE }, shading: { fill: '003366' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Tên bài dạy / Hoạt động', color: 'FFFFFF', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })] })] }),
          new TableCell({ width: { size: 18, type: WidthType.PERCENTAGE }, shading: { fill: '003366' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nội dung tích hợp / Ghi chú', color: 'FFFFFF', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })] })] }),
        ],
      }),
    ];

    const { dayDates } = calculateWeekDates(profile.weekNumber || 1, profile.startDate);
    const dayNames = ['', '', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'];

    // Group entries by day 2 -> 6
    const daysList = [2, 3, 4, 5, 6];
    daysList.forEach((dayNum) => {
      const dayEntries = lbgEntries.filter((e) => e.day === dayNum);
      if (dayEntries.length === 0) return;

      dayEntries.sort((a, b) => {
        if (a.session !== b.session) {
          return a.session === 'Sáng' ? -1 : 1;
        }
        return a.period - b.period;
      });

      const morningEntries = dayEntries.filter((e) => e.session === 'Sáng');
      const afternoonEntries = dayEntries.filter((e) => e.session === 'Chiều');
      const totalDayCount = dayEntries.length;

      dayEntries.forEach((entry, indexInDay) => {
        const isFirstOfDay = indexInDay === 0;
        const isMorning = entry.session === 'Sáng';
        const isFirstOfMorning = isMorning && entry === morningEntries[0];
        const isFirstOfAfternoon = !isMorning && entry === afternoonEntries[0];

        const rowCells: TableCell[] = [];

        // 1. Cột Thứ, ngày: Chỉ xuất hiện 1 ô duy nhất cho cả ngày
        if (isFirstOfDay) {
          rowCells.push(
            new TableCell({
              rowSpan: totalDayCount,
              width: { size: 14, type: WidthType.PERCENTAGE },
              shading: { fill: 'F4F6F9' },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({ text: dayNames[dayNum] || `Thứ ${dayNum}`, bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 }),
                    ...(dayDates[dayNum] ? [new TextRun({ text: `\n${dayDates[dayNum]}`, font: FONT_FAMILY, size: fontHalfPt - 4, color: '555555' })] : []),
                  ],
                }),
              ],
            })
          );
        }

        // 2. Cột Buổi: Gộp buổi Sáng và Chiều riêng biệt
        if (isFirstOfMorning) {
          rowCells.push(
            new TableCell({
              rowSpan: morningEntries.length,
              width: { size: 9, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: 'Sáng', font: FONT_FAMILY, size: fontHalfPt - 2, bold: true })],
                }),
              ],
            })
          );
        } else if (isFirstOfAfternoon) {
          rowCells.push(
            new TableCell({
              rowSpan: afternoonEntries.length,
              width: { size: 9, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: 'Chiều', font: FONT_FAMILY, size: fontHalfPt - 2, bold: true })],
                }),
              ],
            })
          );
        }

        // 3. Tiết
        rowCells.push(
          new TableCell({
            width: { size: 7, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: `${entry.period}`, bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })],
              }),
            ],
          })
        );

        // 4. Môn học
        rowCells.push(
          new TableCell({
            width: { size: 18, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                children: [new TextRun({ text: entry.subject, bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })],
              }),
            ],
          })
        );

        // 5. Tiết PPCT
        rowCells.push(
          new TableCell({
            width: { size: 8, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: entry.ppctLesson ? `${entry.ppctLesson}` : '—', font: FONT_FAMILY, size: fontHalfPt - 2 })],
              }),
            ],
          })
        );

        // 6. Tên bài dạy
        rowCells.push(
          new TableCell({
            width: { size: 26, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: cleanCurriculumTitle(entry.lessonTitle || ''), font: FONT_FAMILY, size: fontHalfPt - 2 }),
                  ...(entry.teacher && entry.isSpecialist ? [new TextRun({ text: ` (GV: ${entry.teacher})`, font: FONT_FAMILY, size: fontHalfPt - 3, color: '003366' })] : []),
                ],
              }),
            ],
          })
        );

        // 7. Nội dung tích hợp / Ghi chú (để trống nếu không có)
        rowCells.push(
          new TableCell({
            width: { size: 18, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: entry.integration || '', italics: true, font: FONT_FAMILY, size: fontHalfPt - 3 }),
                ],
              }),
            ],
          })
        );

        lbgTableRows.push(new TableRow({ children: rowCells }));
      });
    });

    lbgChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: lbgTableRows,
      })
    );

    // Optional signatures if requested
    if (options.showSignatures) {
      lbgChildren.push(
        new Paragraph({ text: '', spacing: { before: 200 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
            insideHorizontal: { style: BorderStyle.NONE },
            insideVertical: { style: BorderStyle.NONE },
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: 'TỔ TRƯỞNG CHUYÊN MÔN', font: FONT_FAMILY, size: fontHalfPt - 2, bold: true }),
                        new TextRun({ text: '\n(Ký và ghi rõ họ tên)', font: FONT_FAMILY, size: fontHalfPt - 4, italics: true }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: 'GIÁO VIÊN GIẢNG DẠY', font: FONT_FAMILY, size: fontHalfPt - 2, bold: true }),
                        new TextRun({ text: '\n(Ký và ghi rõ họ tên)', font: FONT_FAMILY, size: fontHalfPt - 4, italics: true }),
                        new TextRun({ text: `\n\n\n\n${profile.teacherName}`, font: FONT_FAMILY, size: fontHalfPt, bold: true }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      );
    }

    // Page break before KHBD if both are selected
    if (options.includeKHBD && lessons.length > 0) {
      lbgChildren.push(new Paragraph({ pageBreakBefore: true, text: '' }));
    }
  }

  // ==================== 2. KẾ HOẠCH BÀI DẠY (KHBD) CHUẨN CV 2345 ====================
  const khbdChildren: any[] = [];

  if (options.includeKHBD) {
    lessons.forEach((lesson, index) => {
      // Header of each lesson
      khbdChildren.push(
        new Paragraph({
          spacing: { before: index > 0 ? 300 : 100, after: 60 },
          children: [
            new TextRun({
              text: `★ ${lesson.dayName.toUpperCase()}, NGÀY ${lesson.dateStr}`,
              font: FONT_FAMILY,
              size: fontTitleHalfPt,
              bold: true,
              color: '8B0000',
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: `MÔN: ${lesson.subject.toUpperCase()} ${lesson.subType ? `(${lesson.subType.toUpperCase()})` : ''} (Tiết ${lesson.period}) - TIẾT PPCT ${lesson.ppct}`,
              font: FONT_FAMILY,
              size: fontMainTitleHalfPt - 2,
              bold: true,
              color: '003366',
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: `${cleanCurriculumTitle(lesson.lessonTitle).toUpperCase()}`,
              font: FONT_FAMILY,
              size: fontTitleHalfPt,
              bold: true,
            }),
            new TextRun({
              text: `\nGiáo viên: ${profile.teacherName} | Lớp: ${profile.className} | ${profile.schoolName} - ${profile.subSchoolName} | Mẫu Công văn 2345/BGDĐT`,
              font: FONT_FAMILY,
              size: fontHalfPt - 2,
              italics: true,
              color: '555555',
            }),
          ],
        })
      );

      // Section I: YÊU CẦU CẦN ĐẠT
      khbdChildren.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [new TextRun({ text: 'I. YÊU CẦU CẦN ĐẠT:', font: FONT_FAMILY, size: fontTitleHalfPt - 2, bold: true, underline: {} })],
        }),
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: '1. Năng lực đặc thù: ', font: FONT_FAMILY, size: fontHalfPt, bold: true }),
            new TextRun({ text: lesson.specificCompetency, font: FONT_FAMILY, size: fontHalfPt }),
          ],
        }),
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: '2. Năng lực chung: ', font: FONT_FAMILY, size: fontHalfPt, bold: true }),
            new TextRun({ text: lesson.generalCompetency, font: FONT_FAMILY, size: fontHalfPt }),
          ],
        }),
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({ text: '3. Phẩm chất: ', font: FONT_FAMILY, size: fontHalfPt, bold: true }),
            new TextRun({ text: lesson.qualities, font: FONT_FAMILY, size: fontHalfPt }),
          ],
        })
      );

      // Section II: ĐỒ DÙNG DẠY HỌC
      khbdChildren.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [new TextRun({ text: 'II. ĐỒ DÙNG DẠY HỌC VÀ HỌC LIỆU:', font: FONT_FAMILY, size: fontTitleHalfPt - 2, bold: true, underline: {} })],
        }),
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: '- Giáo viên: ', font: FONT_FAMILY, size: fontHalfPt, bold: true }),
            new TextRun({ text: lesson.teacherEquipments, font: FONT_FAMILY, size: fontHalfPt }),
          ],
        }),
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({ text: '- Học sinh: ', font: FONT_FAMILY, size: fontHalfPt, bold: true }),
            new TextRun({ text: lesson.studentEquipments, font: FONT_FAMILY, size: fontHalfPt }),
          ],
        })
      );

      // Section III: TIẾN TRÌNH HOẠT ĐỘNG (2-COLUMN TABLE)
      khbdChildren.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [new TextRun({ text: 'III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU:', font: FONT_FAMILY, size: fontTitleHalfPt - 2, bold: true, underline: {} })],
        })
      );

      const makeActivityRow = (step: any, stepIndex: number, stepLabel: string) => {
        return [
          // Sub-header for the step
          new TableRow({
            children: [
              new TableCell({
                columnSpan: 2,
                shading: { fill: 'EAF2F8' },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: `★ ${step.title || stepLabel} ${step.duration ? `(${step.duration})` : ''}`, bold: true, font: FONT_FAMILY, size: fontHalfPt, color: '003366' }),
                      new TextRun({ text: `\n- Mục tiêu: `, bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 }),
                      new TextRun({ text: step.objective, font: FONT_FAMILY, size: fontHalfPt - 2 }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          // Two column action row
          new TableRow({
            children: [
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: 'HOẠT ĐỘNG CỦA GIÁO VIÊN', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2, color: '003366' }),
                    ],
                  }),
                  ...step.teacherActivity.split('\n').map((line: string) =>
                    new Paragraph({
                      spacing: { before: 30, after: 30 },
                      children: [new TextRun({ text: line, font: FONT_FAMILY, size: fontHalfPt })],
                    })
                  ),
                ],
              }),
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: 'HOẠT ĐỘNG CỦA HỌC SINH', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2, color: '003366' }),
                    ],
                  }),
                  ...step.studentActivity.split('\n').map((line: string) =>
                    new Paragraph({
                      spacing: { before: 30, after: 30 },
                      children: [new TextRun({ text: line, font: FONT_FAMILY, size: fontHalfPt })],
                    })
                  ),
                ],
              }),
            ],
          }),
        ];
      };

      const tableRows: TableRow[] = [
        new TableRow({
          tableHeader: true,
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              shading: { fill: '003366' },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: 'HOẠT ĐỘNG CỦA GIÁO VIÊN', color: 'FFFFFF', bold: true, font: FONT_FAMILY, size: fontHalfPt })],
                }),
              ],
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              shading: { fill: '003366' },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: 'HOẠT ĐỘNG CỦA HỌC SINH', color: 'FFFFFF', bold: true, font: FONT_FAMILY, size: fontHalfPt })],
                }),
              ],
            }),
          ],
        }),
        ...makeActivityRow(lesson.activities.warmup, 1, '1. Hoạt động Khởi động'),
        ...makeActivityRow(lesson.activities.exploration, 2, '2. Hoạt động Khám phá kiến thức mới'),
        ...makeActivityRow(lesson.activities.practice, 3, '3. Hoạt động Luyện tập - Thực hành'),
        ...makeActivityRow(lesson.activities.application, 4, '4. Hoạt động Vận dụng, trải nghiệm'),
      ];

      khbdChildren.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: tableRows,
        })
      );

      // Section IV: ĐIỀU CHỈNH SAU BÀI DẠY
      khbdChildren.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [new TextRun({ text: 'IV. ĐIỀU CHỈNH SAU BÀI DẠY (NẾU CÓ):', font: FONT_FAMILY, size: fontTitleHalfPt - 2, bold: true, underline: {} })],
        }),
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: lesson.afterLessonAdjustment || '........................................................................................................................................................................................................',
              font: FONT_FAMILY,
              size: fontHalfPt,
              italics: true,
              color: '777777',
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: '— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —',
              font: FONT_FAMILY,
              size: fontHalfPt - 4,
              color: 'CCCCCC',
            }),
          ],
        })
      );
    });
  }

  // Combine into single doc
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134, // 2 cm
              bottom: 1134, // 2 cm
              left: 1417, // 2.5 cm
              right: 1134, // 2 cm
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `${profile.schoolName} - ${profile.subSchoolName} | Tuần ${profile.weekNumber}`,
                    font: FONT_FAMILY,
                    size: 18,
                    italics: true,
                    color: '888888',
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Trang ', font: FONT_FAMILY, size: 18 }),
                  new TextRun({ children: [PageNumber.CURRENT], font: FONT_FAMILY, size: 18 }),
                  new TextRun({ text: ' / ', font: FONT_FAMILY, size: 18 }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT_FAMILY, size: 18 }),
                ],
              }),
            ],
          }),
        },
        children: [...lbgChildren, ...khbdChildren],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  let fileName = `Bo_Giao_An_Tuan_${profile.weekNumber}_${profile.className}_${profile.teacherName.replace(/\s+/g, '_')}_Font${fontPt}.docx`;
  if (options.includeLBG && !options.includeKHBD) {
    fileName = `Lich_Bao_Giang_Tuan_${profile.weekNumber}_${profile.className}_${profile.teacherName.replace(/\s+/g, '_')}_Font${fontPt}.docx`;
  } else if (!options.includeLBG && options.includeKHBD) {
    fileName = `KHBD_Tuan_${profile.weekNumber}_${profile.className}_${profile.teacherName.replace(/\s+/g, '_')}_Font${fontPt}.docx`;
  }
  saveAs(blob, fileName);
}

/**
 * Xuất RIÊNG Lịch Báo Giảng sang file Word (.docx)
 */
export async function exportLbgDocx(
  profile: SchoolProfile,
  lbgEntries: TKBEntry[],
  fontSizePt: 12 | 13 | 14 = 13
) {
  return exportCombinedDocx(profile, lbgEntries, [], {
    fontSizePt,
    includeLBG: true,
    includeKHBD: false,
    includeTKB: false,
    showSignatures: false,
  });
}

/**
 * Xuất RIÊNG Kế Hoạch Bài Dạy (CV 2345) sang file Word (.docx)
 */
export async function exportKhbdDocx(
  profile: SchoolProfile,
  lessons: KHBDLesson[],
  fontSizePt: 12 | 13 | 14 = 13
) {
  return exportCombinedDocx(profile, [], lessons, {
    fontSizePt,
    includeLBG: false,
    includeKHBD: true,
    includeTKB: false,
    showSignatures: false,
  });
}

/**
 * Xuất RIÊNG Thời Khóa Biểu (TKB) sang file Word (.docx)
 */
export async function exportTkbDocx(
  profile: SchoolProfile,
  lbgEntries: TKBEntry[],
  options?: {
    fontSizePt?: 12 | 13 | 14;
    className?: string;
    teacherName?: string;
  }
) {
  const fontPt = options?.fontSizePt || 13;
  const fontHalfPt = fontPt * 2;
  const FONT_FAMILY = 'Times New Roman';
  const targetClass = options?.className || profile.className;
  const targetTeacher = options?.teacherName || profile.teacherName;

  const dayNames = ['', '', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'];

  const tableRows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({
          width: { size: 14, type: WidthType.PERCENTAGE },
          shading: { fill: '0B2545' },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: 'THỨ', bold: true, color: 'FFFFFF', font: FONT_FAMILY, size: fontHalfPt - 2 })],
            }),
          ],
        }),
        new TableCell({
          width: { size: 12, type: WidthType.PERCENTAGE },
          shading: { fill: '0B2545' },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: 'BUỔI', bold: true, color: 'FFFFFF', font: FONT_FAMILY, size: fontHalfPt - 2 })],
            }),
          ],
        }),
        new TableCell({
          width: { size: 10, type: WidthType.PERCENTAGE },
          shading: { fill: '0B2545' },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: 'TIẾT', bold: true, color: 'FFFFFF', font: FONT_FAMILY, size: fontHalfPt - 2 })],
            }),
          ],
        }),
        new TableCell({
          width: { size: 38, type: WidthType.PERCENTAGE },
          shading: { fill: '0B2545' },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: 'MÔN HỌC', bold: true, color: 'FFFFFF', font: FONT_FAMILY, size: fontHalfPt - 2 })],
            }),
          ],
        }),
        new TableCell({
          width: { size: 26, type: WidthType.PERCENTAGE },
          shading: { fill: '0B2545' },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: 'GIÁO VIÊN / GHI CHÚ', bold: true, color: 'FFFFFF', font: FONT_FAMILY, size: fontHalfPt - 2 })],
            }),
          ],
        }),
      ],
    }),
  ];

  [2, 3, 4, 5, 6].forEach((dayNum) => {
    const dayEntries = lbgEntries
      .filter((e) => e.day === dayNum)
      .sort((a, b) => (a.session === b.session ? a.period - b.period : a.session === 'Sáng' ? -1 : 1));

    if (dayEntries.length === 0) return;

    const morning = dayEntries.filter((e) => e.session === 'Sáng');
    const afternoon = dayEntries.filter((e) => e.session === 'Chiều');

    dayEntries.forEach((entry, idx) => {
      const isFirstOfDay = idx === 0;
      const isFirstOfMorning = entry.session === 'Sáng' && morning.indexOf(entry) === 0;
      const isFirstOfAfternoon = entry.session === 'Chiều' && afternoon.indexOf(entry) === 0;

      const cells: TableCell[] = [];

      // 1. Thứ (Gộp ngày)
      if (isFirstOfDay) {
        cells.push(
          new TableCell({
            rowSpan: dayEntries.length,
            width: { size: 14, type: WidthType.PERCENTAGE },
            shading: { fill: 'F8FAFC' },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: dayNames[dayNum], bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })],
              }),
            ],
          })
        );
      }

      // 2. Buổi (Gộp buổi)
      if (isFirstOfMorning) {
        cells.push(
          new TableCell({
            rowSpan: morning.length,
            width: { size: 12, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Sáng', font: FONT_FAMILY, size: fontHalfPt - 2, bold: true })],
              }),
            ],
          })
        );
      } else if (isFirstOfAfternoon) {
        cells.push(
          new TableCell({
            rowSpan: afternoon.length,
            width: { size: 12, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Chiều', font: FONT_FAMILY, size: fontHalfPt - 2, bold: true })],
              }),
            ],
          })
        );
      }

      // 3. Tiết
      cells.push(
        new TableCell({
          width: { size: 10, type: WidthType.PERCENTAGE },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: `${entry.period}`, bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })],
            }),
          ],
        })
      );

      // 4. Môn học
      cells.push(
        new TableCell({
          width: { size: 38, type: WidthType.PERCENTAGE },
          children: [
            new Paragraph({
              children: [new TextRun({ text: entry.subject || '—', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })],
            }),
          ],
        })
      );

      // 5. Giáo viên / Ghi chú
      const teacherNote = entry.teacher && entry.isSpecialist ? `GV: ${entry.teacher}` : targetTeacher;
      cells.push(
        new TableCell({
          width: { size: 26, type: WidthType.PERCENTAGE },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: teacherNote,
                  font: FONT_FAMILY,
                  size: fontHalfPt - 3,
                  color: entry.isSpecialist ? '003366' : '333333',
                  bold: entry.isSpecialist,
                }),
              ],
            }),
          ],
        })
      );

      tableRows.push(new TableRow({ children: cells }));
    });
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1134, bottom: 1134, left: 1417, right: 1134 },
          },
        },
        children: [
          // Quốc hiệu & Tên trường
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: profile.departmentName.toUpperCase(), font: FONT_FAMILY, size: fontHalfPt - 2, bold: true })],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: profile.schoolName.toUpperCase(), font: FONT_FAMILY, size: fontHalfPt - 2, bold: true })],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: profile.subSchoolName || '', font: FONT_FAMILY, size: fontHalfPt - 2, italics: true })],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', font: FONT_FAMILY, size: fontHalfPt - 2, bold: true })],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: 'Độc lập - Tự do - Hạnh phúc', font: FONT_FAMILY, size: fontHalfPt - 2, bold: true, underline: {} })],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: `Mỹ Lạc, ngày ${profile.startDate}`, font: FONT_FAMILY, size: fontHalfPt - 4, italics: true })],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({ text: '', spacing: { after: 200 } }),
          // Tiêu đề TKB
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `THỜI KHÓA BIỂU HỌC TẬP - LỚP ${targetClass.toUpperCase()}`,
                bold: true,
                font: FONT_FAMILY,
                size: (fontPt + 3) * 2,
                color: '002B49',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 260 },
            children: [
              new TextRun({
                text: `Năm học: ${profile.schoolYear} | GVCN: ${targetTeacher} | Áp dụng từ Tuần ${profile.weekNumber} (${profile.startDate} - ${profile.endDate})`,
                font: FONT_FAMILY,
                size: fontHalfPt - 2,
                italics: true,
              }),
            ],
          }),
          // Bảng TKB
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: tableRows,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `Thoi_Khoa_Bieu_Lop_${targetClass}_${targetTeacher.replace(/\s+/g, '_')}_Font${fontPt}.docx`;
  saveAs(blob, fileName);
}

/**
 * Xuất 1 Phiếu bài tập trắc nghiệm cuối tuần cho 1 môn học sang file Word (.docx)
 * Nguồn bài tập: https://loigiaihay.com/
 */
export async function exportQuizWorksheetDocx(
  profile: SchoolProfile,
  worksheet: WeeklyQuizWorksheet,
  fontSizePt: 12 | 13 | 14 = 13
) {
  const fontPt = fontSizePt;
  const fontHalfPt = fontPt * 2;
  const FONT_FAMILY = 'Times New Roman';

  const children: any[] = [];

  // 1. Tiêu đề trường & Quốc hiệu
  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 55, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({ text: profile.departmentName.toUpperCase(), font: FONT_FAMILY, size: fontHalfPt - 2, bold: true }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({ text: profile.schoolName.toUpperCase(), font: FONT_FAMILY, size: fontHalfPt - 2, bold: true }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({ text: profile.subSchoolName, font: FONT_FAMILY, size: fontHalfPt - 2, italics: true }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 45, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({ text: 'PHIẾU ÔN TẬP CUỐI TUẦN', font: FONT_FAMILY, size: fontHalfPt - 2, bold: true }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({ text: `NĂM HỌC: ${profile.schoolYear}`, font: FONT_FAMILY, size: fontHalfPt - 2, bold: true }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({ text: 'Nguồn: loigiaihay.com', font: FONT_FAMILY, size: fontHalfPt - 4, italics: true, color: '1D4ED8' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );

  children.push(new Paragraph({ text: '', spacing: { after: 120 } }));

  // 2. Tiêu đề chính của Phiếu bài tập
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 80, after: 40 },
      children: [
        new TextRun({
          text: `PHIẾU BÀI TẬP TRẮC NGHIỆM CUỐI TUẦN ${worksheet.week}`,
          font: FONT_FAMILY,
          size: (fontPt + 3) * 2,
          bold: true,
          color: '003366',
        }),
      ],
    })
  );

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: `MÔN: ${worksheet.subject.toUpperCase()} - KHỐI LỚP ${profile.grade} (${profile.className})`,
          font: FONT_FAMILY,
          size: (fontPt + 1) * 2,
          bold: true,
          color: '1E3A8A',
        }),
      ],
    })
  );

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: `(Bài học trọng tâm theo LBG & KHBD: ${worksheet.curriculumTopic})`,
          font: FONT_FAMILY,
          size: fontHalfPt - 2,
          italics: true,
          color: '475569',
        }),
      ],
    })
  );

  // 3. Khung thông tin học sinh & Đánh giá
  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 65, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Họ và tên học sinh: .....................................................................', font: FONT_FAMILY, size: fontHalfPt }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({ text: `Lớp: ${profile.className}       Giáo viên phụ trách: ${profile.teacherName}`, font: FONT_FAMILY, size: fontHalfPt }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({ text: `Thời gian làm bài: Từ ngày ${profile.startDate} đến ngày ${profile.endDate}`, font: FONT_FAMILY, size: fontHalfPt - 2, italics: true }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 35, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({ text: 'ĐIỂM SỐ & NHẬN XÉT', font: FONT_FAMILY, size: fontHalfPt - 1, bold: true }),
                  ],
                }),
                new Paragraph({
                  spacing: { before: 80, after: 80 },
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({ text: 'Điểm: ............ / 10', font: FONT_FAMILY, size: fontHalfPt, bold: true }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Lời phê: ...........................................', font: FONT_FAMILY, size: fontHalfPt - 2, italics: true }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );

  children.push(new Paragraph({ text: '', spacing: { after: 150 } }));

  // 4. Phần I: Câu hỏi trắc nghiệm
  children.push(
    new Paragraph({
      spacing: { before: 100, after: 80 },
      children: [
        new TextRun({
          text: 'I. PHẦN CÂU HỎI TRẮC NGHIỆM',
          font: FONT_FAMILY,
          size: fontHalfPt + 1,
          bold: true,
          color: '0F172A',
        }),
        new TextRun({
          text: ' (Khoanh tròn hoặc đánh dấu X vào chữ cái A, B, C hoặc D trước câu trả lời đúng nhất)',
          font: FONT_FAMILY,
          size: fontHalfPt - 2,
          italics: true,
        }),
      ],
    })
  );

  worksheet.questions.forEach((q) => {
    // Câu hỏi
    children.push(
      new Paragraph({
        spacing: { before: 100, after: 40 },
        children: [
          new TextRun({
            text: `Câu ${q.number}: `,
            font: FONT_FAMILY,
            size: fontHalfPt,
            bold: true,
          }),
          new TextRun({
            text: q.question,
            font: FONT_FAMILY,
            size: fontHalfPt,
          }),
        ],
      })
    );

    // Bảng 4 đáp án A B C D (2 hàng 2 cột)
    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: `[   ] A. ${q.options.A}`, font: FONT_FAMILY, size: fontHalfPt }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: `[   ] B. ${q.options.B}`, font: FONT_FAMILY, size: fontHalfPt }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: `[   ] C. ${q.options.C}`, font: FONT_FAMILY, size: fontHalfPt }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: `[   ] D. ${q.options.D}`, font: FONT_FAMILY, size: fontHalfPt }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
  });

  children.push(new Paragraph({ text: '', spacing: { after: 200 } }));

  // 5. Phần II: Đáp án & Hướng dẫn giải chuẩn Loigiaihay.com
  children.push(
    new Paragraph({
      spacing: { before: 120, after: 60 },
      children: [
        new TextRun({
          text: 'II. ĐÁP ÁN & HƯỚNG DẪN GIẢI CHI TIẾT (NGUỒN: LOIGIAIHAY.COM)',
          font: FONT_FAMILY,
          size: fontHalfPt + 1,
          bold: true,
          color: '047857',
        }),
      ],
    })
  );

  // Bảng tra nhanh đáp án
  const answerHeaderCells = [
    new TableCell({
      width: { size: 15, type: WidthType.PERCENTAGE },
      shading: { fill: '047857' },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Câu số', color: 'FFFFFF', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })] })],
    }),
  ];
  const answerRowCells = [
    new TableCell({
      width: { size: 15, type: WidthType.PERCENTAGE },
      shading: { fill: 'F1F5F9' },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Đáp án', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })] })],
    }),
  ];

  const colWidth = Math.floor(85 / worksheet.questions.length);
  worksheet.questions.forEach((q) => {
    answerHeaderCells.push(
      new TableCell({
        width: { size: colWidth, type: WidthType.PERCENTAGE },
        shading: { fill: '047857' },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${q.number}`, color: 'FFFFFF', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })] })],
      })
    );
    answerRowCells.push(
      new TableCell({
        width: { size: colWidth, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: q.correctAnswer, bold: true, color: '047857', font: FONT_FAMILY, size: fontHalfPt })] })],
      })
    );
  });

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ children: answerHeaderCells }),
        new TableRow({ children: answerRowCells }),
      ],
    })
  );

  children.push(new Paragraph({ text: '', spacing: { after: 100 } }));

  // Giải thích chi tiết từng câu
  worksheet.questions.forEach((q) => {
    children.push(
      new Paragraph({
        spacing: { before: 60, after: 40 },
        children: [
          new TextRun({
            text: `Câu ${q.number} (Đáp án ${q.correctAnswer}): `,
            font: FONT_FAMILY,
            size: fontHalfPt - 1,
            bold: true,
            color: '065F46',
          }),
          new TextRun({
            text: q.explanation,
            font: FONT_FAMILY,
            size: fontHalfPt - 1,
            italics: true,
          }),
        ],
      })
    );
  });

  // Chân trang ghi nguồn loigiaihay.com
  children.push(new Paragraph({ text: '', spacing: { after: 120 } }));
  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({
          text: `Tra cứu thêm lời giải và đề ôn tập tại: ${worksheet.sourceUrl}`,
          font: FONT_FAMILY,
          size: fontHalfPt - 4,
          italics: true,
          color: '2563EB',
        }),
      ],
    })
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134, // 2 cm
              bottom: 1134,
              left: 1418, // 2.5 cm
              right: 1134,
            },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const safeSubject = worksheet.subject.replace(/[\s&/]+/g, '_');
  const fileName = `Phieu_Trac_Nghiem_Tuan_${worksheet.week}_Mon_${safeSubject}_Lop_${profile.className || profile.grade}_Loigiaihay.docx`;
  saveAs(blob, fileName);
}

/**
 * Xuất trọn bộ tất cả các phiếu trắc nghiệm của tuần học vào 1 file Word (.docx) duy nhất
 * - Khối 1, 2, 3: Toán, Tiếng Việt, TNXH, Đạo đức, HĐTN
 * - Khối 4, 5: Toán, Tiếng Việt, Khoa học, LS&ĐL, Đạo đức, HĐTN
 */
export async function exportAllQuizzesDocx(
  profile: SchoolProfile,
  worksheets: WeeklyQuizWorksheet[],
  fontSizePt: 12 | 13 | 14 = 13
) {
  const fontPt = fontSizePt;
  const fontHalfPt = fontPt * 2;
  const FONT_FAMILY = 'Times New Roman';

  // Mỗi môn học thành 1 Section riêng biệt trong tài liệu Word
  const sections = worksheets.map((worksheet, idx) => {
    const children: any[] = [];

    // Header bảng tên trường
    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 55, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: profile.departmentName.toUpperCase(), font: FONT_FAMILY, size: fontHalfPt - 2, bold: true })],
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: profile.schoolName.toUpperCase(), font: FONT_FAMILY, size: fontHalfPt - 2, bold: true })],
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: profile.subSchoolName, font: FONT_FAMILY, size: fontHalfPt - 2, italics: true })],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 45, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: `BỘ ĐỀ ÔN TẬP TUẦN ${worksheet.week}`, font: FONT_FAMILY, size: fontHalfPt - 2, bold: true })],
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: `MÔN SỐ ${idx + 1}/${worksheets.length}`, font: FONT_FAMILY, size: fontHalfPt - 2, bold: true, color: '1D4ED8' })],
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: 'Nguồn: https://loigiaihay.com/', font: FONT_FAMILY, size: fontHalfPt - 4, italics: true, color: '2563EB' })],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );

    children.push(new Paragraph({ text: '', spacing: { after: 120 } }));

    // Tiêu đề phiếu
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 40 },
        children: [
          new TextRun({
            text: `PHIẾU BÀI TẬP TRẮC NGHIỆM CUỐI TUẦN ${worksheet.week}`,
            font: FONT_FAMILY,
            size: (fontPt + 3) * 2,
            bold: true,
            color: '003366',
          }),
        ],
      })
    );

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: `MÔN: ${worksheet.subject.toUpperCase()} - KHỐI LỚP ${profile.grade} (${profile.className})`,
            font: FONT_FAMILY,
            size: (fontPt + 1) * 2,
            bold: true,
            color: '1E3A8A',
          }),
        ],
      })
    );

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: `(Nội dung trọng tâm: ${worksheet.curriculumTopic})`,
            font: FONT_FAMILY,
            size: fontHalfPt - 2,
            italics: true,
            color: '475569',
          }),
        ],
      })
    );

    // Khung học sinh
    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 65, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: 'Họ và tên học sinh: .....................................................................', font: FONT_FAMILY, size: fontHalfPt })],
                  }),
                  new Paragraph({
                    children: [new TextRun({ text: `Lớp: ${profile.className}       GV: ${profile.teacherName}`, font: FONT_FAMILY, size: fontHalfPt })],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 35, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: 'Điểm số: .............. / 10', font: FONT_FAMILY, size: fontHalfPt, bold: true })],
                  }),
                  new Paragraph({
                    children: [new TextRun({ text: 'Lời phê: ...........................................', font: FONT_FAMILY, size: fontHalfPt - 2, italics: true })],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );

    children.push(new Paragraph({ text: '', spacing: { after: 140 } }));

    // Câu hỏi
    children.push(
      new Paragraph({
        spacing: { before: 80, after: 60 },
        children: [
          new TextRun({ text: 'I. CÂU HỎI TRẮC NGHIỆM', font: FONT_FAMILY, size: fontHalfPt + 1, bold: true, color: '0F172A' }),
        ],
      })
    );

    worksheet.questions.forEach((q) => {
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({ text: `Câu ${q.number}: `, font: FONT_FAMILY, size: fontHalfPt, bold: true }),
            new TextRun({ text: q.question, font: FONT_FAMILY, size: fontHalfPt }),
          ],
        })
      );

      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
            insideHorizontal: { style: BorderStyle.NONE },
            insideVertical: { style: BorderStyle.NONE },
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: `[   ] A. ${q.options.A}`, font: FONT_FAMILY, size: fontHalfPt })] })] }),
                new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: `[   ] B. ${q.options.B}`, font: FONT_FAMILY, size: fontHalfPt })] })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: `[   ] C. ${q.options.C}`, font: FONT_FAMILY, size: fontHalfPt })] })] }),
                new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: `[   ] D. ${q.options.D}`, font: FONT_FAMILY, size: fontHalfPt })] })] }),
              ],
            }),
          ],
        })
      );
    });

    children.push(new Paragraph({ text: '', spacing: { after: 150 } }));

    // Đáp án & Lời giải
    children.push(
      new Paragraph({
        spacing: { before: 100, after: 60 },
        children: [
          new TextRun({ text: 'II. ĐÁP ÁN & LỜI GIẢI CHI TIẾT (LOIGIAIHAY.COM)', font: FONT_FAMILY, size: fontHalfPt + 1, bold: true, color: '047857' }),
        ],
      })
    );

    // Bảng đáp án
    const headerCells = [
      new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, shading: { fill: '047857' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Câu số', color: 'FFFFFF', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })] })] }),
    ];
    const dataCells = [
      new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Đáp án', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })] })] }),
    ];
    const cWidth = Math.floor(85 / worksheet.questions.length);
    worksheet.questions.forEach((q) => {
      headerCells.push(
        new TableCell({ width: { size: cWidth, type: WidthType.PERCENTAGE }, shading: { fill: '047857' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${q.number}`, color: 'FFFFFF', bold: true, font: FONT_FAMILY, size: fontHalfPt - 2 })] })] })
      );
      dataCells.push(
        new TableCell({ width: { size: cWidth, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: q.correctAnswer, bold: true, color: '047857', font: FONT_FAMILY, size: fontHalfPt })] })] })
      );
    });

    children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [new TableRow({ children: headerCells }), new TableRow({ children: dataCells })] }));

    children.push(new Paragraph({ text: '', spacing: { after: 80 } }));

    worksheet.questions.forEach((q) => {
      children.push(
        new Paragraph({
          spacing: { before: 40, after: 30 },
          children: [
            new TextRun({ text: `Câu ${q.number} (Đáp án ${q.correctAnswer}): `, font: FONT_FAMILY, size: fontHalfPt - 1, bold: true, color: '065F46' }),
            new TextRun({ text: q.explanation, font: FONT_FAMILY, size: fontHalfPt - 1, italics: true }),
          ],
        })
      );
    });

    return {
      properties: {
        page: {
          margin: { top: 1134, bottom: 1134, left: 1418, right: 1134 },
        },
      },
      children,
    };
  });

  const doc = new Document({ sections });
  const blob = await Packer.toBlob(doc);
  const fileName = `Tron_Bo_Phieu_Trac_Nghiem_Tuan_${profile.weekNumber}_Khoi_${profile.grade}_Lop_${profile.className}_Loigiaihay.docx`;
  saveAs(blob, fileName);
}

