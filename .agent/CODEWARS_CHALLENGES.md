# 🎯 10 โจทย์ Codewars Style - ป้องกัน Hardcode Bypass

> **Created:** 2026-01-05  
> **Mode:** Function Test ทั้งหมด (ป้องกัน console.log bypass)

---

## 🛡️ **ทำไมต้องใช้ Function Test?**

### **ปัญหาของ Output Only Mode:**
```javascript
// ❌ User สามารถ bypass ได้ด้วย hardcode
console.log("60");  // แทนที่จะคำนวณจริง
```

### **ข้อดีของ Function Test Mode:**
```javascript
// ✅ ต้องเขียนฟังก์ชันจริงๆ ไม่สามารถ hardcode ได้
function add(a, b) {
  return a + b;  // ต้องคำนวณจริง
}
// ระบบจะทดสอบด้วย test cases หลายๆ ตัว
```

---

## 📋 สารบัญโจทย์ทั้ง 10 ข้อ

| ID | Title | Difficulty | Test Cases |
|----|-------|------------|------------|
| 1 | Add Two Numbers | ⭐ Easy | 4 cases |
| 2 | Multiply Two Numbers | ⭐ Easy | 4 cases |
| 3 | Check Even Number | ⭐⭐ Easy-Medium | 5 cases |
| 4 | Find Maximum of Two | ⭐⭐ Easy-Medium | 5 cases |
| 5 | Absolute Value | ⭐⭐⭐ Medium | 5 cases |
| 6 | Sum of Array | ⭐⭐⭐ Medium | 5 cases |
| 7 | Reverse String | ⭐⭐⭐ Medium | 5 cases |
| 8 | Count Vowels | ⭐⭐⭐⭐ Medium-Hard | 5 cases |
| 9 | Factorial | ⭐⭐⭐⭐⭐ Hard | 5 cases |
| 10 | FizzBuzz Function | ⭐⭐⭐⭐⭐ Hard | 6 cases |

---

## 📝 โจทย์และคำตอบ

### **1. Add Two Numbers** ⭐

**โจทย์:** สร้างฟังก์ชัน `add(a, b)` ที่รับตัวเลข 2 ตัว และคืนค่าผลบวก

**Test Cases:**
- `add(1, 2)` → `3`
- `add(5, 7)` → `12`
- `add(-3, 3)` → `0`
- `add(0, 0)` → `0`

**คำตอบ:**
```javascript
function add(a, b) {
  return a + b;
}
```

---

### **2. Multiply Two Numbers** ⭐

**โจทย์:** สร้างฟังก์ชัน `multiply(a, b)` ที่รับตัวเลข 2 ตัว และคืนค่าผลคูณ

**Test Cases:**
- `multiply(2, 3)` → `6`
- `multiply(5, 4)` → `20`
- `multiply(0, 10)` → `0`
- `multiply(-2, 5)` → `-10`

**คำตอบ:**
```javascript
function multiply(a, b) {
  return a * b;
}
```

---

### **3. Check Even Number** ⭐⭐

**โจทย์:** สร้างฟังก์ชัน `isEven(n)` ที่คืนค่า `true` ถ้าเป็นเลขคู่

**Test Cases:**
- `isEven(2)` → `true`
- `isEven(3)` → `false`
- `isEven(0)` → `true`
- `isEven(-4)` → `true`
- `isEven(-5)` → `false`

**คำตอบ:**
```javascript
function isEven(n) {
  return n % 2 === 0;
}
```

---

### **4. Find Maximum of Two** ⭐⭐

**โจทย์:** สร้างฟังก์ชัน `max(a, b)` ที่คืนค่าตัวเลขที่มากกว่า

**Test Cases:**
- `max(5, 10)` → `10`
- `max(20, 15)` → `20`
- `max(-5, -10)` → `-5`
- `max(7, 7)` → `7`
- `max(0, -1)` → `0`

**คำตอบ:**
```javascript
function max(a, b) {
  return a > b ? a : b;
}

// หรือ
function max(a, b) {
  if (a > b) return a;
  return b;
}
```

---

### **5. Absolute Value** ⭐⭐⭐

**โจทย์:** สร้างฟังก์ชัน `abs(n)` ที่คืนค่าสัมบูรณ์ (ห้ามใช้ Math.abs)

**Test Cases:**
- `abs(5)` → `5`
- `abs(-5)` → `5`
- `abs(0)` → `0`
- `abs(-100)` → `100`
- `abs(42)` → `42`

**คำตอบ:**
```javascript
function abs(n) {
  return n < 0 ? -n : n;
}

// หรือ
function abs(n) {
  if (n < 0) return -n;
  return n;
}
```

---

### **6. Sum of Array** ⭐⭐⭐

**โจทย์:** สร้างฟังก์ชัน `sum(arr)` ที่คืนค่าผลรวมของ array

**Test Cases:**
- `sum([1, 2, 3])` → `6`
- `sum([10, 20, 30])` → `60`
- `sum([])` → `0`
- `sum([-1, 1])` → `0`
- `sum([5, 5, 5, 5])` → `20`

**คำตอบ:**
```javascript
function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

// หรือใช้ reduce
function sum(arr) {
  return arr.reduce((acc, num) => acc + num, 0);
}
```

---

### **7. Reverse String** ⭐⭐⭐

**โจทย์:** สร้างฟังก์ชัน `reverse(str)` ที่คืนค่า string ที่กลับหลัง

**Test Cases:**
- `reverse("hello")` → `"olleh"`
- `reverse("abc")` → `"cba"`
- `reverse("12345")` → `"54321"`
- `reverse("")` → `""`
- `reverse("a")` → `"a"`

**คำตอบ:**
```javascript
function reverse(str) {
  return str.split('').reverse().join('');
}

// หรือใช้ loop
function reverse(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}
```

---

### **8. Count Vowels** ⭐⭐⭐⭐

**โจทย์:** สร้างฟังก์ชัน `countVowels(str)` ที่นับจำนวนสระ (a, e, i, o, u)

**Test Cases:**
- `countVowels("hello")` → `2`
- `countVowels("AEIOU")` → `5`
- `countVowels("xyz")` → `0`
- `countVowels("JavaScript")` → `3`
- `countVowels("")` → `0`

**คำตอบ:**
```javascript
function countVowels(str) {
  const vowels = 'aeiouAEIOU';
  let count = 0;
  for (let char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

// หรือใช้ regex
function countVowels(str) {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}
```

---

### **9. Factorial** ⭐⭐⭐⭐⭐

**โจทย์:** สร้างฟังก์ชัน `factorial(n)` ที่คืนค่า n!

**Test Cases:**
- `factorial(5)` → `120`
- `factorial(3)` → `6`
- `factorial(0)` → `1`
- `factorial(1)` → `1`
- `factorial(4)` → `24`

**คำตอบ:**
```javascript
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// หรือใช้ recursion
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}
```

---

### **10. FizzBuzz Function** ⭐⭐⭐⭐⭐

**โจทย์:** สร้างฟังก์ชัน `fizzBuzz(n)` ที่คืนค่า "FizzBuzz", "Fizz", "Buzz", หรือตัวเลข

**Test Cases:**
- `fizzBuzz(15)` → `"FizzBuzz"`
- `fizzBuzz(3)` → `"Fizz"`
- `fizzBuzz(5)` → `"Buzz"`
- `fizzBuzz(7)` → `"7"`
- `fizzBuzz(30)` → `"FizzBuzz"`
- `fizzBuzz(9)` → `"Fizz"`

**คำตอบ:**
```javascript
function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return String(n);
}

// หรือแบบสั้น
function fizzBuzz(n) {
  return (n % 15 === 0 ? "FizzBuzz" :
          n % 3 === 0 ? "Fizz" :
          n % 5 === 0 ? "Buzz" :
          String(n));
}
```

---

## 🚀 วิธีใช้งาน

### **1. รัน SQL ใน Supabase**
```sql
-- Copy จาก .agent/codewars-challenges.sql
-- Paste ใน SQL Editor
-- กด Run
```

### **2. Refresh Frontend**
```
http://localhost:3000/test-editor
กด F5
```

### **3. เริ่มทำโจทย์**
- เลือกโจทย์
- เขียนฟังก์ชัน
- กด SUBMIT
- ดูผลลัพธ์

---

## 📊 สถิติโจทย์

### **ตาม Difficulty:**
```
⭐        ████     20% (2 ข้อ)
⭐⭐      ████     20% (2 ข้อ)
⭐⭐⭐    ██████   30% (3 ข้อ)
⭐⭐⭐⭐  ██       10% (1 ข้อ)
⭐⭐⭐⭐⭐ ████     20% (2 ข้อ)
```

### **Test Cases:**
- **4 cases:** 2 ข้อ
- **5 cases:** 7 ข้อ
- **6 cases:** 1 ข้อ

---

## 🎓 Learning Path

### **Level 1: Beginner**
1. Add Two Numbers
2. Multiply Two Numbers

### **Level 2: Intermediate**
3. Check Even Number
4. Find Maximum of Two
5. Absolute Value

### **Level 3: Advanced**
6. Sum of Array
7. Reverse String
8. Count Vowels

### **Level 4: Expert**
9. Factorial
10. FizzBuzz Function

---

## ✅ ข้อดีของ Function Test Mode

1. **ป้องกัน Hardcode** - ไม่สามารถใช้ `console.log("60")` bypass ได้
2. **ทดสอบหลาย Cases** - แต่ละโจทย์มี 4-6 test cases
3. **เหมือน Codewars** - ฝึกแบบมืออาชีพ
4. **ตรวจสอบ Logic** - ต้องเขียนฟังก์ชันที่ทำงานได้จริง
5. **ไม่สามารถโกง** - ระบบจะทดสอบด้วยค่าที่ user ไม่รู้

---

## 🔒 ตัวอย่างการป้องกัน Bypass

### **❌ ก่อน (Output Only Mode):**
```javascript
// User สามารถ hardcode ได้
console.log("60");  // ผ่าน! (แต่ไม่ได้คำนวณจริง)
```

### **✅ หลัง (Function Test Mode):**
```javascript
// User ต้องเขียนฟังก์ชันจริง
function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

// ระบบจะทดสอบด้วย:
// sum([1, 2, 3])    → ต้องได้ 6
// sum([10, 20, 30]) → ต้องได้ 60
// sum([])           → ต้องได้ 0
// ไม่สามารถ hardcode ได้!
```

---

## 📁 Files

- **SQL:** `.agent/codewars-challenges.sql`
- **Guide:** `.agent/CODEWARS_CHALLENGES.md`

---

**🎉 พร้อมใช้งาน! ป้องกัน Hardcode Bypass แล้ว!**
