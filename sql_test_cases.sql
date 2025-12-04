-- ============================================
-- SQL สำหรับตั้งค่า Validation + Test Cases
-- ============================================

-- โจทย์ที่ 1: คำนวณพื้นที่สี่เหลี่ยม
UPDATE "Codecamp"
SET 
  validation_mode = 'test_cases',
  forbidden_keywords = '[]'::jsonb,
  required_keywords = '["let", "=", "*"]'::jsonb,
  test_cases = '[
    {"width": 5, "height": 10, "expected": "50"},
    {"width": 7, "height": 3, "expected": "21"},
    {"width": 12, "height": 8, "expected": "96"}
  ]'::jsonb
WHERE id = 1;

-- โจทย์ที่ 2: แปลงอุณหภูมิ
UPDATE "Codecamp"
SET 
  validation_mode = 'test_cases',
  forbidden_keywords = '[]'::jsonb,
  required_keywords = '["=", "*", "/", "+"]'::jsonb,
  test_cases = '[
    {"celsius": 25, "expected": "77.0"},
    {"celsius": 0, "expected": "32.0"},
    {"celsius": 100, "expected": "212.0"}
  ]'::jsonb
WHERE id = 2;

-- โจทย์ที่ 3: คำนวณค่าเฉลี่ย
UPDATE "Codecamp"
SET 
  validation_mode = 'test_cases',
  forbidden_keywords = '[]'::jsonb,
  required_keywords = '["let", "=", "+", "/"]'::jsonb,
  test_cases = '[
    {"a": 10, "b": 20, "c": 30, "expected": "20"},
    {"a": 5, "b": 10, "c": 15, "expected": "10"},
    {"a": 100, "b": 200, "c": 300, "expected": "200"}
  ]'::jsonb
WHERE id = 3;

-- โจทย์ที่ 4: คลาส Rectangle
UPDATE "Codecamp"
SET 
  validation_mode = 'test_cases',
  forbidden_keywords = '[]'::jsonb,
  required_keywords = '["class", "def", "return", "*"]'::jsonb,
  test_cases = '[
    {"width": 4, "height": 5, "expected": "20"},
    {"width": 10, "height": 10, "expected": "100"},
    {"width": 7, "height": 3, "expected": "21"}
  ]'::jsonb
WHERE id = 4;

-- โจทย์ที่ 5: คลาส Circle
UPDATE "Codecamp"
SET 
  validation_mode = 'test_cases',
  forbidden_keywords = '[]'::jsonb,
  required_keywords = '["class", "constructor", "return", "Math.PI", "*"]'::jsonb,
  test_cases = '[
    {"radius": 7, "expected": "43.982297150257104"},
    {"radius": 10, "expected": "62.83185307179586"},
    {"radius": 5, "expected": "31.41592653589793"}
  ]'::jsonb
WHERE id = 5;

-- โจทย์ที่ 6: คลาส Counter
UPDATE "Codecamp"
SET 
  validation_mode = 'test_cases',
  forbidden_keywords = '[]'::jsonb,
  required_keywords = '["class", "++", "return"]'::jsonb,
  test_cases = '[
    {"increments": 3, "expected": "3"},
    {"increments": 5, "expected": "5"},
    {"increments": 10, "expected": "10"}
  ]'::jsonb
WHERE id = 6;

-- โจทย์ที่ 7: คำนวณดอกเบี้ยทบต้น
UPDATE "Codecamp"
SET 
  validation_mode = 'test_cases',
  forbidden_keywords = '[]'::jsonb,
  required_keywords = '["=", "**", "*", "+"]'::jsonb,
  test_cases = '[
    {"principal": 1000, "rate": 0.05, "time": 2, "expected": "1102.5"},
    {"principal": 2000, "rate": 0.1, "time": 3, "expected": "2662.0"},
    {"principal": 5000, "rate": 0.03, "time": 5, "expected": "5796.371087812499"}
  ]'::jsonb
WHERE id = 7;

-- โจทย์ที่ 8: คลาส Student
UPDATE "Codecamp"
SET 
  validation_mode = 'test_cases',
  forbidden_keywords = '[]'::jsonb,
  required_keywords = '["class", "constructor", "if", "return"]'::jsonb,
  test_cases = '[
    {"name": "John", "score": 85, "expected": "A"},
    {"name": "Jane", "score": 75, "expected": "B"},
    {"name": "Bob", "score": 65, "expected": "C"},
    {"name": "Alice", "score": 50, "expected": "F"}
  ]'::jsonb
WHERE id = 8;

-- โจทย์ที่ 9: คลาส BankAccount
UPDATE "Codecamp"
SET 
  validation_mode = 'test_cases',
  forbidden_keywords = '[]'::jsonb,
  required_keywords = '["class", "def", "+=", "-=", "return"]'::jsonb,
  test_cases = '[
    {"deposit": 1000, "withdraw": 300, "expected": "700"},
    {"deposit": 5000, "withdraw": 2000, "expected": "3000"},
    {"deposit": 100, "withdraw": 50, "expected": "50"}
  ]'::jsonb
WHERE id = 9;

-- โจทย์ที่ 10: คำนวณ BMI
UPDATE "Codecamp"
SET 
  validation_mode = 'test_cases',
  forbidden_keywords = '[]'::jsonb,
  required_keywords = '["let", "=", "/", "*"]'::jsonb,
  test_cases = '[
    {"weight": 70, "height": 1.75, "expected": "22.857142857142858"},
    {"weight": 80, "height": 1.8, "expected": "24.691358024691358"},
    {"weight": 60, "height": 1.65, "expected": "22.03856749311295"}
  ]'::jsonb
WHERE id = 10;
