-- ============================================
-- ลบโจทย์เก่า (id 1-10) และเพิ่มโจทย์ใหม่
-- Initial Code สั้นลง เพื่อให้ Read-Only Protection ทำงานได้
-- ============================================

-- ขั้นตอนที่ 1: ลบโจทย์เก่าทั้งหมด
DELETE FROM "Codecamp" WHERE id BETWEEN 1 AND 10;

-- ขั้นตอนที่ 2: เพิ่มโจทย์ใหม่ 10 ข้อ

-- โจทย์ที่ 1: หาผลรวมของเลขคู่ 1-20
-- Initial Code: ป้องกันเฉพาะ "let sum = 0;\nfor (let i = 1; i <= 20; i++) {\n"
INSERT INTO "Codecamp" (
  id, title, description, difficulty, likes, language, 
  initial_code, validation_mode, test_cases, required_keywords, forbidden_keywords
) VALUES (
  1,
  'หาผลรวมของเลขคู่ 1-20',
  'หาผลรวมของเลขคู่ตั้งแต่ 1 ถึง 20 (2+4+6+8+...+20) ต้องใช้ for loop และ if เพื่อตรวจสอบเลขคู่',
  2,
  0,
  'javascript',
  'let sum = 0;
for (let i = 1; i <= 20; i++) {

}
console.log(sum);',
  'test_cases',
  '[{"max": 20, "expected": "110"}, {"max": 10, "expected": "30"}, {"max": 30, "expected": "240"}]'::jsonb,
  '["for", "if", "%", "+="]'::jsonb,
  '[]'::jsonb
);

-- โจทย์ที่ 2: แปลงวันเป็นชั่วโมง
-- Initial Code: ป้องกันเฉพาะ "days = 7\n"
INSERT INTO "Codecamp" (
  id, title, description, difficulty, likes, language,
  initial_code, validation_mode, test_cases, required_keywords, forbidden_keywords
) VALUES (
  2,
  'แปลงวันเป็นชั่วโมง',
  'รับจำนวนวัน แล้วแปลงเป็นชั่วโมง (1 วัน = 24 ชั่วโมง)',
  1,
  0,
  'python',
  'days = 7

print(hours)',
  'test_cases',
  '[{"days": 7, "expected": "168"}, {"days": 1, "expected": "24"}, {"days": 30, "expected": "720"}]'::jsonb,
  '["days", "=", "*", "24"]'::jsonb,
  '[]'::jsonb
);

-- โจทย์ที่ 3: หาค่าสูงสุดใน Array
-- Initial Code: ป้องกันเฉพาะ "let numbers = [15, 42, 8, 103, 27];\nlet max = numbers[0];\n"
INSERT INTO "Codecamp" (
  id, title, description, difficulty, likes, language,
  initial_code, validation_mode, test_cases, required_keywords, forbidden_keywords
) VALUES (
  3,
  'หาค่าสูงสุดใน Array',
  'หาค่าสูงสุดใน array [15, 42, 8, 103, 27] ต้องใช้ for loop ห้ามใช้ Math.max()',
  2,
  0,
  'javascript',
  'let numbers = [15, 42, 8, 103, 27];
let max = numbers[0];

console.log(max);',
  'test_cases',
  '[{"numbers": "[15, 42, 8, 103, 27]", "expected": "103"}, {"numbers": "[5, 2, 9, 1, 7]", "expected": "9"}, {"numbers": "[100, 200, 50, 150]", "expected": "200"}]'::jsonb,
  '["for", "if", ">"]'::jsonb,
  '["Math.max"]'::jsonb
);

-- โจทย์ที่ 4: คำนวณเกรดเฉลี่ย (GPA)
-- Initial Code: ป้องกันเฉพาะ "subject1 = 85\nsubject2 = 90\nsubject3 = 78\n"
INSERT INTO "Codecamp" (
  id, title, description, difficulty, likes, language,
  initial_code, validation_mode, test_cases, required_keywords, forbidden_keywords
) VALUES (
  4,
  'คำนวณเกรดเฉลี่ย (GPA)',
  'คำนวณเกรดเฉลี่ยจากคะแนน 3 วิชา gpa = (subject1 + subject2 + subject3) / 3',
  2,
  0,
  'python',
  'subject1 = 85
subject2 = 90
subject3 = 78

print(gpa)',
  'test_cases',
  '[{"subject1": 85, "subject2": 90, "subject3": 78, "expected": "84.33333333333333"}, {"subject1": 100, "subject2": 100, "subject3": 100, "expected": "100.0"}, {"subject1": 70, "subject2": 80, "subject3": 90, "expected": "80.0"}]'::jsonb,
  '["subject1", "subject2", "subject3", "+", "/", "3"]'::jsonb,
  '[]'::jsonb
);

-- โจทย์ที่ 5: คลาส Car
-- Initial Code: ป้องกันเฉพาะ "class Car {\n"
INSERT INTO "Codecamp" (
  id, title, description, difficulty, likes, language,
  initial_code, validation_mode, test_cases, required_keywords, forbidden_keywords
) VALUES (
  5,
  'คลาส Car',
  'สร้างคลาส Car ที่มี constructor รับ brand และ speed, method accelerate() เพิ่ม speed ขึ้น 10, method getSpeed() คืนค่า speed ปัจจุบัน',
  3,
  0,
  'javascript',
  'class Car {

}

let car = new Car("Toyota", 50);
car.accelerate();
car.accelerate();
car.accelerate();
console.log(car.getSpeed());',
  'test_cases',
  '[{"brand": "Toyota", "initialSpeed": 50, "accelerations": 3, "expected": "80"}, {"brand": "Honda", "initialSpeed": 60, "accelerations": 2, "expected": "80"}, {"brand": "BMW", "initialSpeed": 100, "accelerations": 5, "expected": "150"}]'::jsonb,
  '["class", "Car", "constructor", "this", "accelerate", "getSpeed", "+=", "return"]'::jsonb,
  '[]'::jsonb
);

-- โจทย์ที่ 6: ตรวจสอบเลขคี่/คู่
-- Initial Code: ป้องกันเฉพาะ "def isEven(number):\n"
INSERT INTO "Codecamp" (
  id, title, description, difficulty, likes, language,
  initial_code, validation_mode, test_cases, required_keywords, forbidden_keywords
) VALUES (
  6,
  'ตรวจสอบเลขคี่/คู่',
  'สร้างฟังก์ชัน isEven(number) ที่คืน "Even" ถ้าเป็นเลขคู่ คืน "Odd" ถ้าเป็นเลขคี่',
  2,
  0,
  'python',
  'def isEven(number):

    pass

result = isEven(42)
print(result)',
  'test_cases',
  '[{"number": 42, "expected": "Even"}, {"number": 17, "expected": "Odd"}, {"number": 100, "expected": "Even"}]'::jsonb,
  '["def", "isEven", "if", "%", "return", "Even", "Odd"]'::jsonb,
  '[]'::jsonb
);

-- โจทย์ที่ 7: คลาส Book
-- Initial Code: ป้องกันเฉพาะ "class Book {\n"
INSERT INTO "Codecamp" (
  id, title, description, difficulty, likes, language,
  initial_code, validation_mode, test_cases, required_keywords, forbidden_keywords
) VALUES (
  7,
  'คลาส Book',
  'สร้างคลาส Book ที่มี attribute title, pages และ method getInfo() คืน "Title: [title], Pages: [pages]"',
  3,
  0,
  'java',
  'class Book {

}

public class Main {
    public static void main(String[] args) {
        Book book = new Book("Java Programming", 500);
        System.out.println(book.getInfo());
    }
}',
  'test_cases',
  '[{"title": "Java Programming", "pages": 500, "expected": "Title: Java Programming, Pages: 500"}, {"title": "Python Basics", "pages": 300, "expected": "Title: Python Basics, Pages: 300"}]'::jsonb,
  '["class", "Book", "private", "String", "int", "public", "getInfo", "return"]'::jsonb,
  '[]'::jsonb
);

-- โจทย์ที่ 8: หาตัวประกอบของเลข
-- Initial Code: ป้องกันเฉพาะ "let number = 12;\nlet sum = 0;\n"
INSERT INTO "Codecamp" (
  id, title, description, difficulty, likes, language,
  initial_code, validation_mode, test_cases, required_keywords, forbidden_keywords
) VALUES (
  8,
  'หาตัวประกอบของเลข',
  'หาผลรวมของตัวประกอบทั้งหมดของเลข 12 (1+2+3+4+6+12=28) ต้องใช้ for loop และ if',
  3,
  0,
  'javascript',
  'let number = 12;
let sum = 0;

console.log(sum);',
  'test_cases',
  '[{"number": 12, "expected": "28"}, {"number": 10, "expected": "18"}, {"number": 20, "expected": "42"}]'::jsonb,
  '["for", "if", "%", "+="]'::jsonb,
  '[]'::jsonb
);

-- โจทย์ที่ 9: คลาส Temperature
-- Initial Code: ป้องกันเฉพาะ "class Temperature:\n"
INSERT INTO "Codecamp" (
  id, title, description, difficulty, likes, language,
  initial_code, validation_mode, test_cases, required_keywords, forbidden_keywords
) VALUES (
  9,
  'คลาส Temperature',
  'สร้างคลาส Temperature ที่มี method toFahrenheit() และ getStatus() ที่คืน Hot/Warm/Cold ตามอุณหภูมิ',
  3,
  0,
  'python',
  'class Temperature:

    pass

temp = Temperature(25)
print(temp.getStatus())',
  'test_cases',
  '[{"celsius": 25, "expected": "Warm"}, {"celsius": 35, "expected": "Hot"}, {"celsius": 15, "expected": "Cold"}]'::jsonb,
  '["class", "Temperature", "def", "__init__", "self", "getStatus", "if", ">=", "return"]'::jsonb,
  '[]'::jsonb
);

-- โจทย์ที่ 10: คำนวณ BMI + ประเมินผล
-- Initial Code: ป้องกันเฉพาะ "let weight = 70;\nlet height = 1.75;\n"
INSERT INTO "Codecamp" (
  id, title, description, difficulty, likes, language,
  initial_code, validation_mode, test_cases, required_keywords, forbidden_keywords
) VALUES (
  10,
  'คำนวณ BMI + ประเมินผล',
  'คำนวณ BMI และประเมินผล (Underweight/Normal/Overweight/Obese) โดย BMI = weight / (height * height)',
  3,
  0,
  'javascript',
  'let weight = 70;
let height = 1.75;

console.log(status);',
  'test_cases',
  '[{"weight": 70, "height": 1.75, "expected": "Normal"}, {"weight": 50, "height": 1.70, "expected": "Underweight"}, {"weight": 90, "height": 1.75, "expected": "Overweight"}]'::jsonb,
  '["weight", "height", "bmi", "/", "*", "if", "<"]'::jsonb,
  '[]'::jsonb
);

-- เสร็จสิ้น! ตอนนี้มีโจทย์ใหม่ 10 ข้อ (id 1-10)
-- Initial Code สั้นลง User สามารถเขียนโค้ดในช่องว่างได้
