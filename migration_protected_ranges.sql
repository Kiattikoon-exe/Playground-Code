-- ============================================
-- Migration: เพิ่ม protected_ranges column
-- ============================================

-- Step 1: เพิ่ม column ใหม่
ALTER TABLE "Codecamp" 
ADD COLUMN IF NOT EXISTS protected_ranges JSONB;

-- Step 2: ตั้งค่า protected_ranges สำหรับโจทย์ทั้ง 10 ข้อ

-- โจทย์ที่ 1: หาผลรวมของเลขคู่ 1-20
-- ป้องกัน: บรรทัด 1-2 (let sum = 0; และ for)
-- ป้องกัน: บรรทัด 4 (}) และ บรรทัด 5 (console.log)
UPDATE "Codecamp"
SET protected_ranges = '[
  {"startLine": 1, "endLine": 2},
  {"startLine": 4, "endLine": 5}
]'::jsonb
WHERE id = 1;

-- โจทย์ที่ 2: แปลงวันเป็นชั่วโมง
-- ป้องกัน: บรรทัด 1 (days = 7)
-- ป้องกัน: บรรทัด 3 (print(hours))
UPDATE "Codecamp"
SET protected_ranges = '[
  {"startLine": 1, "endLine": 1},
  {"startLine": 3, "endLine": 3}
]'::jsonb
WHERE id = 2;

-- โจทย์ที่ 3: หาค่าสูงสุดใน Array
-- ป้องกัน: บรรทัด 1-2 (let numbers และ let max)
-- ป้องกัน: บรรทัด 4 (console.log)
UPDATE "Codecamp"
SET protected_ranges = '[
  {"startLine": 1, "endLine": 2},
  {"startLine": 4, "endLine": 4}
]'::jsonb
WHERE id = 3;

-- โจทย์ที่ 4: คำนวณเกรดเฉลี่ย (GPA)
-- ป้องกัน: บรรทัด 1-3 (subject1, subject2, subject3)
-- ป้องกัน: บรรทัด 5 (print(gpa))
UPDATE "Codecamp"
SET protected_ranges = '[
  {"startLine": 1, "endLine": 3},
  {"startLine": 5, "endLine": 5}
]'::jsonb
WHERE id = 4;

-- โจทย์ที่ 5: คลาส Car
-- ป้องกัน: บรรทัด 1 (class Car {)
-- ป้องกัน: บรรทัด 3-7 (ปิด class และ test code)
UPDATE "Codecamp"
SET protected_ranges = '[
  {"startLine": 1, "endLine": 1},
  {"startLine": 3, "endLine": 7}
]'::jsonb
WHERE id = 5;

-- โจทย์ที่ 6: ตรวจสอบเลขคี่/คู่
-- ป้องกัน: บรรทัด 1 (def isEven)
-- ป้องกัน: บรรทัด 3-5 (pass, result, print)
UPDATE "Codecamp"
SET protected_ranges = '[
  {"startLine": 1, "endLine": 1},
  {"startLine": 3, "endLine": 5}
]'::jsonb
WHERE id = 6;

-- โจทย์ที่ 7: คลาส Book
-- ป้องกัน: บรรทัด 1 (class Book)
-- ป้องกัน: บรรทัด 3-8 (ปิด class และ Main class)
UPDATE "Codecamp"
SET protected_ranges = '[
  {"startLine": 1, "endLine": 1},
  {"startLine": 3, "endLine": 8}
]'::jsonb
WHERE id = 7;

-- โจทย์ที่ 8: หาตัวประกอบของเลข
-- ป้องกัน: บรรทัด 1-2 (let number และ let sum)
-- ป้องกัน: บรรทัด 4 (console.log)
UPDATE "Codecamp"
SET protected_ranges = '[
  {"startLine": 1, "endLine": 2},
  {"startLine": 4, "endLine": 4}
]'::jsonb
WHERE id = 8;

-- โจทย์ที่ 9: คลาส Temperature
-- ป้องกัน: บรรทัด 1 (class Temperature)
-- ป้องกัน: บรรทัด 3-5 (pass, temp, print)
UPDATE "Codecamp"
SET protected_ranges = '[
  {"startLine": 1, "endLine": 1},
  {"startLine": 3, "endLine": 5}
]'::jsonb
WHERE id = 9;

-- โจทย์ที่ 10: คำนวณ BMI + ประเมินผล
-- ป้องกัน: บรรทัด 1-2 (let weight และ let height)
-- ป้องกัน: บรรทัด 4 (console.log)
UPDATE "Codecamp"
SET protected_ranges = '[
  {"startLine": 1, "endLine": 2},
  {"startLine": 4, "endLine": 4}
]'::jsonb
WHERE id = 10;

-- ตรวจสอบผลลัพธ์
SELECT id, title, protected_ranges 
FROM "Codecamp" 
WHERE id BETWEEN 1 AND 10
ORDER BY id;
