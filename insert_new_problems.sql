-- ============================================================================
-- SQL INSERT Statements สำหรับโจทย์ใหม่ 10 ข้อ (เริ่มที่ ID 1)
-- ตาราง: Codecamp
-- สร้างเมื่อ: 2025-12-03
-- ============================================================================

-- ⚠️ คำเตือน: ล้างข้อมูลเก่าทั้งหมดก่อนเพิ่มโจทย์ใหม่
DELETE FROM "Codecamp";

-- โจทย์ที่ 1: คำนวณพื้นที่สี่เหลี่ยม
INSERT INTO "Codecamp" (id, title, description, language, difficulty, expected_output, initial_code, validation_mode, likes)
VALUES (
  1,
  'คำนวณพื้นที่สี่เหลี่ยม',
  'สร้างตัวแปร width = 5 และ height = 10 แล้วคำนวณพื้นที่ (area = width * height) และแสดงผลเป็น "50"',
  'javascript',
  1,
  '50',
  'let width = 5;
let height = 10;
// เขียนโค้ดคำนวณพื้นที่และแสดงผล',
  'output_only',
  0
);

-- โจทย์ที่ 2: แปลงอุณหภูมิ Celsius เป็น Fahrenheit
INSERT INTO "Codecamp" (id, title, description, language, difficulty, expected_output, initial_code, validation_mode, likes)
VALUES (
  2,
  'แปลงอุณหภูมิ Celsius เป็น Fahrenheit',
  'สร้างตัวแปร celsius = 25 และแปลงเป็น Fahrenheit โดยใช้สูตร fahrenheit = (celsius * 9/5) + 32 แล้วแสดงผลเป็น "77.0"',
  'python',
  2,
  '77.0',
  'celsius = 25
# เขียนโค้ดแปลงอุณหภูมิและแสดงผล',
  'output_only',
  0
);

-- โจทย์ที่ 3: คำนวณค่าเฉลี่ยของตัวเลข 3 ตัว
INSERT INTO "Codecamp" (id, title, description, language, difficulty, expected_output, initial_code, validation_mode, likes)
VALUES (
  3,
  'คำนวณค่าเฉลี่ยของตัวเลข 3 ตัว',
  'สร้างตัวแปร a = 10, b = 20, c = 30 และคำนวณค่าเฉลี่ย average = (a + b + c) / 3 แล้วแสดงผลเป็น "20"',
  'javascript',
  1,
  '20',
  'let a = 10;
let b = 20;
let c = 30;
// เขียนโค้ดคำนวณค่าเฉลี่ยและแสดงผล',
  'output_only',
  0
);

-- โจทย์ที่ 4: คลาส Rectangle พื้นฐาน
INSERT INTO "Codecamp" (id, title, description, language, difficulty, expected_output, initial_code, validation_mode, likes)
VALUES (
  4,
  'คลาส Rectangle พื้นฐาน',
  'สร้างคลาส Rectangle ที่มี constructor รับค่า width และ height และมี method area() ที่คืนค่าพื้นที่ สร้าง object rect = Rectangle(4, 5) แล้วแสดงผล rect.area() ซึ่งควรได้ "20"',
  'python',
  3,
  '20',
  'class Rectangle:
    # เขียนโค้ดที่นี่
    pass

rect = Rectangle(4, 5)
print(rect.area())',
  'output_only',
  0
);

-- โจทย์ที่ 5: คลาส Circle คำนวณเส้นรอบวง
INSERT INTO "Codecamp" (id, title, description, language, difficulty, expected_output, initial_code, validation_mode, likes)
VALUES (
  5,
  'คลาส Circle คำนวณเส้นรอบวง',
  'สร้างคลาส Circle ที่มี constructor รับค่า radius และมี method circumference() ที่คืนค่าเส้นรอบวง (2 * Math.PI * radius) สร้าง object circle = new Circle(7) แล้วแสดงผล circle.circumference() ซึ่งควรได้ประมาณ "43.982297150257104"',
  'javascript',
  3,
  '43.982297150257104',
  'class Circle {
    // เขียนโค้ดที่นี่
}

let circle = new Circle(7);
console.log(circle.circumference());',
  'output_only',
  0
);

-- โจทย์ที่ 6: คลาส Counter
INSERT INTO "Codecamp" (id, title, description, language, difficulty, expected_output, initial_code, validation_mode, likes)
VALUES (
  6,
  'คลาส Counter',
  'สร้างคลาส Counter ที่มี attribute count เริ่มต้นที่ 0 และมี method increment() ที่เพิ่มค่า count ขึ้น 1 และ method getValue() ที่คืนค่า count สร้าง object เรียก increment() 3 ครั้ง แล้วแสดงผล getValue() ควรได้ "3"',
  'java',
  2,
  '3',
  'class Counter {
    // เขียนโค้ดที่นี่
}

public class Main {
    public static void main(String[] args) {
        Counter counter = new Counter();
        counter.increment();
        counter.increment();
        counter.increment();
        System.out.println(counter.getValue());
    }
}',
  'output_only',
  0
);

-- โจทย์ที่ 7: คำนวณดอกเบี้ยทบต้น
INSERT INTO "Codecamp" (id, title, description, language, difficulty, expected_output, initial_code, validation_mode, likes)
VALUES (
  7,
  'คำนวณดอกเบี้ยทบต้น',
  'สร้างตัวแปร principal = 1000, rate = 0.05, time = 2 คำนวณดอกเบี้ยทบต้นด้วยสูตร amount = principal * (1 + rate) ** time แสดงผลเป็น "1102.5"',
  'python',
  2,
  '1102.5',
  'principal = 1000
rate = 0.05
time = 2
# เขียนโค้ดคำนวณดอกเบี้ยทบต้นและแสดงผล',
  'output_only',
  0
);

-- โจทย์ที่ 8: คลาส Student
INSERT INTO "Codecamp" (id, title, description, language, difficulty, expected_output, initial_code, validation_mode, likes)
VALUES (
  8,
  'คลาส Student',
  'สร้างคลาส Student ที่มี constructor รับค่า name และ score และมี method getGrade() ที่คืนค่าเกรด: score >= 80 คืน "A", score >= 70 คืน "B", score >= 60 คืน "C", อื่นๆ คืน "F" สร้าง object student = new Student("John", 85) แล้วแสดงผล student.getGrade() ควรได้ "A"',
  'javascript',
  3,
  'A',
  'class Student {
    // เขียนโค้ดที่นี่
}

let student = new Student("John", 85);
console.log(student.getGrade());',
  'output_only',
  0
);

-- โจทย์ที่ 9: คลาส BankAccount
INSERT INTO "Codecamp" (id, title, description, language, difficulty, expected_output, initial_code, validation_mode, likes)
VALUES (
  9,
  'คลาส BankAccount',
  'สร้างคลาส BankAccount ที่มี attribute balance เริ่มต้นที่ 0 มี method deposit(amount) ที่เพิ่มเงิน และ withdraw(amount) ที่ถอนเงิน และ method getBalance() ที่คืนค่ายอดเงิน สร้าง object ฝาก 1000 ถอน 300 แล้วแสดงผล getBalance() ควรได้ "700"',
  'python',
  3,
  '700',
  'class BankAccount:
    # เขียนโค้ดที่นี่
    pass

account = BankAccount()
account.deposit(1000)
account.withdraw(300)
print(account.getBalance())',
  'output_only',
  0
);

-- โจทย์ที่ 10: คำนวณ BMI
INSERT INTO "Codecamp" (id, title, description, language, difficulty, expected_output, initial_code, validation_mode, likes)
VALUES (
  10,
  'คำนวณ BMI',
  'สร้างตัวแปร weight = 70 (kg) และ height = 1.75 (m) คำนวณ BMI ด้วยสูตร bmi = weight / (height * height) แสดงผลเป็น "22.857142857142858"',
  'javascript',
  2,
  '22.857142857142858',
  'let weight = 70;
let height = 1.75;
// เขียนโค้ดคำนวณ BMI และแสดงผล',
  'output_only',
  0
);

-- ============================================================================
-- สิ้นสุด SQL Statements
-- ============================================================================
