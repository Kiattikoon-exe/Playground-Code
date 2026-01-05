-- ========================================
-- Code Camp Academy - 10 Codewars Style Challenges
-- ========================================
-- Created: 2026-01-05
-- Purpose: All challenges use function_test mode to prevent hardcode bypass
-- ========================================

-- ลบโจทย์เก่าทั้งหมด
DELETE FROM public."submiss";
DELETE FROM public."Codecamp";

-- Reset sequence
ALTER SEQUENCE "Codecamp_id_seq" RESTART WITH 1;

-- ========================================
-- Challenge 1: Add Two Numbers (Easy)
-- ========================================
INSERT INTO public."Codecamp" (
    title,
    description,
    difficulty,
    likes,
    language,
    initial_code,
    validation_mode,
    validation_script
) VALUES (
    'Add Two Numbers',
    '## โจทย์
สร้างฟังก์ชัน `add(a, b)` ที่รับตัวเลข 2 ตัว และคืนค่าผลบวก

## ตัวอย่าง
```javascript
add(1, 2)    // → 3
add(5, 7)    // → 12
add(-3, 3)   // → 0
```

## Test Cases
- ทดสอบเลขบวก
- ทดสอบเลขลบ
- ทดสอบศูนย์',
    1,
    150,
    'javascript',
    'function add(a, b) {
  // เขียนโค้ดที่นี่
  
}',
    'function_test',
    '// Test Cases
const results = [];

try {
  const r1 = add(1, 2);
  results.push({ test: "add(1, 2)", expected: 3, actual: r1, passed: r1 === 3 });
} catch (e) {
  results.push({ test: "add(1, 2)", expected: 3, actual: "Error", passed: false });
}

try {
  const r2 = add(5, 7);
  results.push({ test: "add(5, 7)", expected: 12, actual: r2, passed: r2 === 12 });
} catch (e) {
  results.push({ test: "add(5, 7)", expected: 12, actual: "Error", passed: false });
}

try {
  const r3 = add(-3, 3);
  results.push({ test: "add(-3, 3)", expected: 0, actual: r3, passed: r3 === 0 });
} catch (e) {
  results.push({ test: "add(-3, 3)", expected: 0, actual: "Error", passed: false });
}

try {
  const r4 = add(0, 0);
  results.push({ test: "add(0, 0)", expected: 0, actual: r4, passed: r4 === 0 });
} catch (e) {
  results.push({ test: "add(0, 0)", expected: 0, actual: "Error", passed: false });
}

console.log(JSON.stringify(results));'
);

-- ========================================
-- Challenge 2: Multiply Two Numbers (Easy)
-- ========================================
INSERT INTO public."Codecamp" (
    title,
    description,
    difficulty,
    likes,
    language,
    initial_code,
    validation_mode,
    validation_script
) VALUES (
    'Multiply Two Numbers',
    '## โจทย์
สร้างฟังก์ชัน `multiply(a, b)` ที่รับตัวเลข 2 ตัว และคืนค่าผลคูณ

## ตัวอย่าง
```javascript
multiply(2, 3)   // → 6
multiply(5, 4)   // → 20
multiply(0, 10)  // → 0
```

## Test Cases
- ทดสอบเลขบวก
- ทดสอบเลขลบ
- ทดสอบศูนย์',
    1,
    135,
    'javascript',
    'function multiply(a, b) {
  // เขียนโค้ดที่นี่
  
}',
    'function_test',
    '// Test Cases
const results = [];

try {
  const r1 = multiply(2, 3);
  results.push({ test: "multiply(2, 3)", expected: 6, actual: r1, passed: r1 === 6 });
} catch (e) {
  results.push({ test: "multiply(2, 3)", expected: 6, actual: "Error", passed: false });
}

try {
  const r2 = multiply(5, 4);
  results.push({ test: "multiply(5, 4)", expected: 20, actual: r2, passed: r2 === 20 });
} catch (e) {
  results.push({ test: "multiply(5, 4)", expected: 20, actual: "Error", passed: false });
}

try {
  const r3 = multiply(0, 10);
  results.push({ test: "multiply(0, 10)", expected: 0, actual: r3, passed: r3 === 0 });
} catch (e) {
  results.push({ test: "multiply(0, 10)", expected: 0, actual: "Error", passed: false });
}

try {
  const r4 = multiply(-2, 5);
  results.push({ test: "multiply(-2, 5)", expected: -10, actual: r4, passed: r4 === -10 });
} catch (e) {
  results.push({ test: "multiply(-2, 5)", expected: -10, actual: "Error", passed: false });
}

console.log(JSON.stringify(results));'
);

-- ========================================
-- Challenge 3: Check Even Number (Easy)
-- ========================================
INSERT INTO public."Codecamp" (
    title,
    description,
    difficulty,
    likes,
    language,
    initial_code,
    validation_mode,
    validation_script
) VALUES (
    'Check Even Number',
    '## โจทย์
สร้างฟังก์ชัน `isEven(n)` ที่รับตัวเลข และคืนค่า `true` ถ้าเป็นเลขคู่ หรือ `false` ถ้าเป็นเลขคี่

## ตัวอย่าง
```javascript
isEven(2)   // → true
isEven(3)   // → false
isEven(0)   // → true
isEven(-4)  // → true
```

## Test Cases
- ทดสอบเลขคู่
- ทดสอบเลขคี่
- ทดสอบศูนย์
- ทดสอบเลขลบ',
    2,
    128,
    'javascript',
    'function isEven(n) {
  // เขียนโค้ดที่นี่
  
}',
    'function_test',
    '// Test Cases
const results = [];

try {
  const r1 = isEven(2);
  results.push({ test: "isEven(2)", expected: true, actual: r1, passed: r1 === true });
} catch (e) {
  results.push({ test: "isEven(2)", expected: true, actual: "Error", passed: false });
}

try {
  const r2 = isEven(3);
  results.push({ test: "isEven(3)", expected: false, actual: r2, passed: r2 === false });
} catch (e) {
  results.push({ test: "isEven(3)", expected: false, actual: "Error", passed: false });
}

try {
  const r3 = isEven(0);
  results.push({ test: "isEven(0)", expected: true, actual: r3, passed: r3 === true });
} catch (e) {
  results.push({ test: "isEven(0)", expected: true, actual: "Error", passed: false });
}

try {
  const r4 = isEven(-4);
  results.push({ test: "isEven(-4)", expected: true, actual: r4, passed: r4 === true });
} catch (e) {
  results.push({ test: "isEven(-4)", expected: true, actual: "Error", passed: false });
}

try {
  const r5 = isEven(-5);
  results.push({ test: "isEven(-5)", expected: false, actual: r5, passed: r5 === false });
} catch (e) {
  results.push({ test: "isEven(-5)", expected: false, actual: "Error", passed: false });
}

console.log(JSON.stringify(results));'
);

-- ========================================
-- Challenge 4: Find Maximum of Two (Easy)
-- ========================================
INSERT INTO public."Codecamp" (
    title,
    description,
    difficulty,
    likes,
    language,
    initial_code,
    validation_mode,
    validation_script
) VALUES (
    'Find Maximum of Two Numbers',
    '## โจทย์
สร้างฟังก์ชัน `max(a, b)` ที่รับตัวเลข 2 ตัว และคืนค่าตัวเลขที่มากกว่า

## ตัวอย่าง
```javascript
max(5, 10)   // → 10
max(20, 15)  // → 20
max(-5, -10) // → -5
max(7, 7)    // → 7
```

## Test Cases
- ทดสอบเลขบวก
- ทดสอบเลขลบ
- ทดสอบเลขเท่ากัน',
    2,
    115,
    'javascript',
    'function max(a, b) {
  // เขียนโค้ดที่นี่
  
}',
    'function_test',
    '// Test Cases
const results = [];

try {
  const r1 = max(5, 10);
  results.push({ test: "max(5, 10)", expected: 10, actual: r1, passed: r1 === 10 });
} catch (e) {
  results.push({ test: "max(5, 10)", expected: 10, actual: "Error", passed: false });
}

try {
  const r2 = max(20, 15);
  results.push({ test: "max(20, 15)", expected: 20, actual: r2, passed: r2 === 20 });
} catch (e) {
  results.push({ test: "max(20, 15)", expected: 20, actual: "Error", passed: false });
}

try {
  const r3 = max(-5, -10);
  results.push({ test: "max(-5, -10)", expected: -5, actual: r3, passed: r3 === -5 });
} catch (e) {
  results.push({ test: "max(-5, -10)", expected: -5, actual: "Error", passed: false });
}

try {
  const r4 = max(7, 7);
  results.push({ test: "max(7, 7)", expected: 7, actual: r4, passed: r4 === 7 });
} catch (e) {
  results.push({ test: "max(7, 7)", expected: 7, actual: "Error", passed: false });
}

try {
  const r5 = max(0, -1);
  results.push({ test: "max(0, -1)", expected: 0, actual: r5, passed: r5 === 0 });
} catch (e) {
  results.push({ test: "max(0, -1)", expected: 0, actual: "Error", passed: false });
}

console.log(JSON.stringify(results));'
);

-- ========================================
-- Challenge 5: Absolute Value (Medium)
-- ========================================
INSERT INTO public."Codecamp" (
    title,
    description,
    difficulty,
    likes,
    language,
    initial_code,
    validation_mode,
    validation_script
) VALUES (
    'Absolute Value',
    '## โจทย์
สร้างฟังก์ชัน `abs(n)` ที่รับตัวเลข และคืนค่าสัมบูรณ์ (absolute value)

**ห้ามใช้ Math.abs()**

## ตัวอย่าง
```javascript
abs(5)    // → 5
abs(-5)   // → 5
abs(0)    // → 0
abs(-100) // → 100
```

## Test Cases
- ทดสอบเลขบวก
- ทดสอบเลขลบ
- ทดสอบศูนย์',
    3,
    105,
    'javascript',
    'function abs(n) {
  // เขียนโค้ดที่นี่ (ห้ามใช้ Math.abs)
  
}',
    'function_test',
    '// Test Cases
const results = [];

try {
  const r1 = abs(5);
  results.push({ test: "abs(5)", expected: 5, actual: r1, passed: r1 === 5 });
} catch (e) {
  results.push({ test: "abs(5)", expected: 5, actual: "Error", passed: false });
}

try {
  const r2 = abs(-5);
  results.push({ test: "abs(-5)", expected: 5, actual: r2, passed: r2 === 5 });
} catch (e) {
  results.push({ test: "abs(-5)", expected: 5, actual: "Error", passed: false });
}

try {
  const r3 = abs(0);
  results.push({ test: "abs(0)", expected: 0, actual: r3, passed: r3 === 0 });
} catch (e) {
  results.push({ test: "abs(0)", expected: 0, actual: "Error", passed: false });
}

try {
  const r4 = abs(-100);
  results.push({ test: "abs(-100)", expected: 100, actual: r4, passed: r4 === 100 });
} catch (e) {
  results.push({ test: "abs(-100)", expected: 100, actual: "Error", passed: false });
}

try {
  const r5 = abs(42);
  results.push({ test: "abs(42)", expected: 42, actual: r5, passed: r5 === 42 });
} catch (e) {
  results.push({ test: "abs(42)", expected: 42, actual: "Error", passed: false });
}

console.log(JSON.stringify(results));'
);

-- ========================================
-- Challenge 6: Sum of Array (Medium)
-- ========================================
INSERT INTO public."Codecamp" (
    title,
    description,
    difficulty,
    likes,
    language,
    initial_code,
    validation_mode,
    validation_script
) VALUES (
    'Sum of Array',
    '## โจทย์
สร้างฟังก์ชัน `sum(arr)` ที่รับ array ของตัวเลข และคืนค่าผลรวมทั้งหมด

## ตัวอย่าง
```javascript
sum([1, 2, 3])       // → 6
sum([10, 20, 30])    // → 60
sum([])              // → 0
sum([-1, 1])         // → 0
```

## Test Cases
- ทดสอบ array ปกติ
- ทดสอบ array ว่าง
- ทดสอบเลขลบ',
    3,
    98,
    'javascript',
    'function sum(arr) {
  // เขียนโค้ดที่นี่
  
}',
    'function_test',
    '// Test Cases
const results = [];

try {
  const r1 = sum([1, 2, 3]);
  results.push({ test: "sum([1, 2, 3])", expected: 6, actual: r1, passed: r1 === 6 });
} catch (e) {
  results.push({ test: "sum([1, 2, 3])", expected: 6, actual: "Error", passed: false });
}

try {
  const r2 = sum([10, 20, 30]);
  results.push({ test: "sum([10, 20, 30])", expected: 60, actual: r2, passed: r2 === 60 });
} catch (e) {
  results.push({ test: "sum([10, 20, 30])", expected: 60, actual: "Error", passed: false });
}

try {
  const r3 = sum([]);
  results.push({ test: "sum([])", expected: 0, actual: r3, passed: r3 === 0 });
} catch (e) {
  results.push({ test: "sum([])", expected: 0, actual: "Error", passed: false });
}

try {
  const r4 = sum([-1, 1]);
  results.push({ test: "sum([-1, 1])", expected: 0, actual: r4, passed: r4 === 0 });
} catch (e) {
  results.push({ test: "sum([-1, 1])", expected: 0, actual: "Error", passed: false });
}

try {
  const r5 = sum([5, 5, 5, 5]);
  results.push({ test: "sum([5, 5, 5, 5])", expected: 20, actual: r5, passed: r5 === 20 });
} catch (e) {
  results.push({ test: "sum([5, 5, 5, 5])", expected: 20, actual: "Error", passed: false });
}

console.log(JSON.stringify(results));'
);

-- ========================================
-- Challenge 7: Reverse String (Medium)
-- ========================================
INSERT INTO public."Codecamp" (
    title,
    description,
    difficulty,
    likes,
    language,
    initial_code,
    validation_mode,
    validation_script
) VALUES (
    'Reverse String',
    '## โจทย์
สร้างฟังก์ชัน `reverse(str)` ที่รับ string และคืนค่า string ที่กลับหลัง

## ตัวอย่าง
```javascript
reverse("hello")  // → "olleh"
reverse("abc")    // → "cba"
reverse("12345")  // → "54321"
reverse("")       // → ""
```

## Test Cases
- ทดสอบ string ปกติ
- ทดสอบ string ว่าง
- ทดสอบตัวเลข',
    3,
    112,
    'javascript',
    'function reverse(str) {
  // เขียนโค้ดที่นี่
  
}',
    'function_test',
    '// Test Cases
const results = [];

try {
  const r1 = reverse("hello");
  results.push({ test: "reverse(\"hello\")", expected: "olleh", actual: r1, passed: r1 === "olleh" });
} catch (e) {
  results.push({ test: "reverse(\"hello\")", expected: "olleh", actual: "Error", passed: false });
}

try {
  const r2 = reverse("abc");
  results.push({ test: "reverse(\"abc\")", expected: "cba", actual: r2, passed: r2 === "cba" });
} catch (e) {
  results.push({ test: "reverse(\"abc\")", expected: "cba", actual: "Error", passed: false });
}

try {
  const r3 = reverse("12345");
  results.push({ test: "reverse(\"12345\")", expected: "54321", actual: r3, passed: r3 === "54321" });
} catch (e) {
  results.push({ test: "reverse(\"12345\")", expected: "54321", actual: "Error", passed: false });
}

try {
  const r4 = reverse("");
  results.push({ test: "reverse(\"\")", expected: "", actual: r4, passed: r4 === "" });
} catch (e) {
  results.push({ test: "reverse(\"\")", expected: "", actual: "Error", passed: false });
}

try {
  const r5 = reverse("a");
  results.push({ test: "reverse(\"a\")", expected: "a", actual: r5, passed: r5 === "a" });
} catch (e) {
  results.push({ test: "reverse(\"a\")", expected: "a", actual: "Error", passed: false });
}

console.log(JSON.stringify(results));'
);

-- ========================================
-- Challenge 8: Count Vowels (Medium)
-- ========================================
INSERT INTO public."Codecamp" (
    title,
    description,
    difficulty,
    likes,
    language,
    initial_code,
    validation_mode,
    validation_script
) VALUES (
    'Count Vowels',
    '## โจทย์
สร้างฟังก์ชัน `countVowels(str)` ที่รับ string และคืนค่าจำนวนสระ (a, e, i, o, u)

**ไม่สนใจตัวพิมพ์เล็ก-ใหญ่**

## ตัวอย่าง
```javascript
countVowels("hello")     // → 2 (e, o)
countVowels("AEIOU")     // → 5
countVowels("xyz")       // → 0
countVowels("JavaScript")// → 3 (a, a, i)
```

## Test Cases
- ทดสอบ string ปกติ
- ทดสอบตัวพิมพ์ใหญ่
- ทดสอบไม่มีสระ',
    4,
    92,
    'javascript',
    'function countVowels(str) {
  // เขียนโค้ดที่นี่
  
}',
    'function_test',
    '// Test Cases
const results = [];

try {
  const r1 = countVowels("hello");
  results.push({ test: "countVowels(\"hello\")", expected: 2, actual: r1, passed: r1 === 2 });
} catch (e) {
  results.push({ test: "countVowels(\"hello\")", expected: 2, actual: "Error", passed: false });
}

try {
  const r2 = countVowels("AEIOU");
  results.push({ test: "countVowels(\"AEIOU\")", expected: 5, actual: r2, passed: r2 === 5 });
} catch (e) {
  results.push({ test: "countVowels(\"AEIOU\")", expected: 5, actual: "Error", passed: false });
}

try {
  const r3 = countVowels("xyz");
  results.push({ test: "countVowels(\"xyz\")", expected: 0, actual: r3, passed: r3 === 0 });
} catch (e) {
  results.push({ test: "countVowels(\"xyz\")", expected: 0, actual: "Error", passed: false });
}

try {
  const r4 = countVowels("JavaScript");
  results.push({ test: "countVowels(\"JavaScript\")", expected: 3, actual: r4, passed: r4 === 3 });
} catch (e) {
  results.push({ test: "countVowels(\"JavaScript\")", expected: 3, actual: "Error", passed: false });
}

try {
  const r5 = countVowels("");
  results.push({ test: "countVowels(\"\")", expected: 0, actual: r5, passed: r5 === 0 });
} catch (e) {
  results.push({ test: "countVowels(\"\")", expected: 0, actual: "Error", passed: false });
}

console.log(JSON.stringify(results));'
);

-- ========================================
-- Challenge 9: Factorial (Hard)
-- ========================================
INSERT INTO public."Codecamp" (
    title,
    description,
    difficulty,
    likes,
    language,
    initial_code,
    validation_mode,
    validation_script
) VALUES (
    'Factorial',
    '## โจทย์
สร้างฟังก์ชัน `factorial(n)` ที่รับตัวเลข n และคืนค่า n! (n factorial)

**สูตร:** n! = n × (n-1) × (n-2) × ... × 1

## ตัวอย่าง
```javascript
factorial(5)  // → 120 (5 × 4 × 3 × 2 × 1)
factorial(3)  // → 6 (3 × 2 × 1)
factorial(0)  // → 1
factorial(1)  // → 1
```

## Test Cases
- ทดสอบตัวเลขปกติ
- ทดสอบ 0 และ 1',
    5,
    88,
    'javascript',
    'function factorial(n) {
  // เขียนโค้ดที่นี่
  
}',
    'function_test',
    '// Test Cases
const results = [];

try {
  const r1 = factorial(5);
  results.push({ test: "factorial(5)", expected: 120, actual: r1, passed: r1 === 120 });
} catch (e) {
  results.push({ test: "factorial(5)", expected: 120, actual: "Error", passed: false });
}

try {
  const r2 = factorial(3);
  results.push({ test: "factorial(3)", expected: 6, actual: r2, passed: r2 === 6 });
} catch (e) {
  results.push({ test: "factorial(3)", expected: 6, actual: "Error", passed: false });
}

try {
  const r3 = factorial(0);
  results.push({ test: "factorial(0)", expected: 1, actual: r3, passed: r3 === 1 });
} catch (e) {
  results.push({ test: "factorial(0)", expected: 1, actual: "Error", passed: false });
}

try {
  const r4 = factorial(1);
  results.push({ test: "factorial(1)", expected: 1, actual: r4, passed: r4 === 1 });
} catch (e) {
  results.push({ test: "factorial(1)", expected: 1, actual: "Error", passed: false });
}

try {
  const r5 = factorial(4);
  results.push({ test: "factorial(4)", expected: 24, actual: r5, passed: r5 === 24 });
} catch (e) {
  results.push({ test: "factorial(4)", expected: 24, actual: "Error", passed: false });
}

console.log(JSON.stringify(results));'
);

-- ========================================
-- Challenge 10: FizzBuzz (Hard)
-- ========================================
INSERT INTO public."Codecamp" (
    title,
    description,
    difficulty,
    likes,
    language,
    initial_code,
    validation_mode,
    validation_script
) VALUES (
    'FizzBuzz Function',
    '## โจทย์
สร้างฟังก์ชัน `fizzBuzz(n)` ที่รับตัวเลข n และคืนค่า:
- "FizzBuzz" ถ้า n หาร 3 และ 5 ลงตัว
- "Fizz" ถ้า n หาร 3 ลงตัว
- "Buzz" ถ้า n หาร 5 ลงตัว
- ตัวเลข n (เป็น string) ถ้าไม่ตรงเงื่อนไขใดๆ

## ตัวอย่าง
```javascript
fizzBuzz(15)  // → "FizzBuzz"
fizzBuzz(3)   // → "Fizz"
fizzBuzz(5)   // → "Buzz"
fizzBuzz(7)   // → "7"
```

## Test Cases
- ทดสอบ FizzBuzz
- ทดสอบ Fizz
- ทดสอบ Buzz
- ทดสอบตัวเลขปกติ',
    5,
    105,
    'javascript',
    'function fizzBuzz(n) {
  // เขียนโค้ดที่นี่
  
}',
    'function_test',
    '// Test Cases
const results = [];

try {
  const r1 = fizzBuzz(15);
  results.push({ test: "fizzBuzz(15)", expected: "FizzBuzz", actual: r1, passed: r1 === "FizzBuzz" });
} catch (e) {
  results.push({ test: "fizzBuzz(15)", expected: "FizzBuzz", actual: "Error", passed: false });
}

try {
  const r2 = fizzBuzz(3);
  results.push({ test: "fizzBuzz(3)", expected: "Fizz", actual: r2, passed: r2 === "Fizz" });
} catch (e) {
  results.push({ test: "fizzBuzz(3)", expected: "Fizz", actual: "Error", passed: false });
}

try {
  const r3 = fizzBuzz(5);
  results.push({ test: "fizzBuzz(5)", expected: "Buzz", actual: r3, passed: r3 === "Buzz" });
} catch (e) {
  results.push({ test: "fizzBuzz(5)", expected: "Buzz", actual: "Error", passed: false });
}

try {
  const r4 = fizzBuzz(7);
  results.push({ test: "fizzBuzz(7)", expected: "7", actual: r4, passed: r4 === "7" });
} catch (e) {
  results.push({ test: "fizzBuzz(7)", expected: "7", actual: "Error", passed: false });
}

try {
  const r5 = fizzBuzz(30);
  results.push({ test: "fizzBuzz(30)", expected: "FizzBuzz", actual: r5, passed: r5 === "FizzBuzz" });
} catch (e) {
  results.push({ test: "fizzBuzz(30)", expected: "FizzBuzz", actual: "Error", passed: false });
}

try {
  const r6 = fizzBuzz(9);
  results.push({ test: "fizzBuzz(9)", expected: "Fizz", actual: r6, passed: r6 === "Fizz" });
} catch (e) {
  results.push({ test: "fizzBuzz(9)", expected: "Fizz", actual: "Error", passed: false });
}

console.log(JSON.stringify(results));'
);

-- ========================================
-- Verify Data
-- ========================================
SELECT id, title, language, validation_mode, difficulty 
FROM public."Codecamp" 
ORDER BY id;
