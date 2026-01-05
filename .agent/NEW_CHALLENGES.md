# 🎯 10 โจทย์ใหม่ - Code Camp Academy

> **Created:** 2026-01-05  
> **Purpose:** โจทย์หลากหลายครอบคลุม 3 validation modes

---

## 📋 สารบัญโจทย์

| ID | Title | Language | Mode | Difficulty |
|----|-------|----------|------|------------|
| 1 | Hello World | JavaScript | output_only | ⭐ |
| 2 | Add Two Numbers | JavaScript | function_test | ⭐⭐ |
| 3 | Python: Sum Calculator | Python | output_only | ⭐ |
| 4 | If-Else: Check Positive/Negative | JavaScript | syntax_check | ⭐⭐⭐ |
| 5 | Multiply Two Numbers | JavaScript | function_test | ⭐⭐ |
| 6 | For Loop: Print Numbers 1-5 | JavaScript | syntax_check | ⭐⭐⭐ |
| 7 | Java: Hello World | Java | output_only | ⭐⭐ |
| 8 | Check Even Number | JavaScript | function_test | ⭐⭐⭐ |
| 9 | Python: FizzBuzz (1-15) | Python | output_only | ⭐⭐⭐⭐ |
| 10 | Find Maximum of Three Numbers | JavaScript | function_test | ⭐⭐⭐ |

---

## 🚀 วิธีใช้งาน

### **ขั้นตอนที่ 1: รัน SQL**

1. เปิด Supabase Dashboard
2. ไปที่ **SQL Editor**
3. Copy โค้ดจาก `.agent/new-challenges.sql`
4. Paste และกด **Run**

### **ขั้นตอนที่ 2: Refresh Frontend**

1. เปิด http://localhost:3000/test-editor
2. Refresh หน้า (F5)
3. คุณจะเห็นโจทย์ใหม่ทั้ง 10 ข้อ

---

## 📝 รายละเอียดโจทย์

### **1. Hello World** ⭐
**Mode:** Output Only  
**Language:** JavaScript

**โจทย์:** แสดงข้อความ "Hello, World!"

**Initial Code:**
```javascript
console.log("Hello, World!");
```

**Expected Output:**
```
Hello, World!
```

---

### **2. Add Two Numbers** ⭐⭐
**Mode:** Function Test  
**Language:** JavaScript

**โจทย์:** สร้างฟังก์ชัน `add(a, b)` ที่รับตัวเลข 2 ตัว และคืนค่าผลบวก

**Initial Code:**
```javascript
function add(a, b) {
  // เขียนโค้ดที่นี่
  
}
```

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

### **3. Python: Sum Calculator** ⭐
**Mode:** Output Only  
**Language:** Python

**โจทย์:** คำนวณผลบวกของ 10 + 20 + 30

**Initial Code:**
```python
a = 10
b = 20
c = 30

# คำนวณและแสดงผล
```

**Expected Output:**
```
60
```

**คำตอบ:**
```python
a = 10
b = 20
c = 30

print(a + b + c)
```

---

### **4. If-Else: Check Positive or Negative** ⭐⭐⭐
**Mode:** Syntax Check  
**Language:** JavaScript

**โจทย์:** ใช้ if-else ตรวจสอบว่าตัวเลขเป็นบวกหรือลบ

**เงื่อนไข:**
- ✅ ต้องใช้ `if` และ `else`
- ❌ ห้ามใช้ ternary operator (`? :`)

**Initial Code:**
```javascript
const number = 5;

// เขียนโค้ดที่นี่
```

**Expected Output:**
```
Positive
```

**คำตอบ:**
```javascript
const number = 5;

if (number > 0) {
  console.log("Positive");
} else {
  console.log("Negative");
}
```

---

### **5. Multiply Two Numbers** ⭐⭐
**Mode:** Function Test  
**Language:** JavaScript

**โจทย์:** สร้างฟังก์ชัน `multiply(a, b)` ที่คืนค่าผลคูณ

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

### **6. For Loop: Print Numbers 1-5** ⭐⭐⭐
**Mode:** Syntax Check  
**Language:** JavaScript

**โจทย์:** ใช้ for loop แสดงเลข 1-5

**เงื่อนไข:**
- ✅ ต้องใช้ `for` loop
- ❌ ห้ามใช้ `while` loop

**Expected Output:**
```
1
2
3
4
5
```

**คำตอบ:**
```javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

---

### **7. Java: Hello World** ⭐⭐
**Mode:** Output Only  
**Language:** Java

**โจทย์:** แสดงข้อความ "Hello, Java!"

**Initial Code:**
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

**Expected Output:**
```
Hello, Java!
```

---

### **8. Check Even Number** ⭐⭐⭐
**Mode:** Function Test  
**Language:** JavaScript

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

### **9. Python: FizzBuzz (1-15)** ⭐⭐⭐⭐
**Mode:** Output Only  
**Language:** Python

**โจทย์:** FizzBuzz สำหรับเลข 1-15
- หาร 3 ลงตัว → "Fizz"
- หาร 5 ลงตัว → "Buzz"
- หาร 3 และ 5 ลงตัว → "FizzBuzz"
- ไม่ใช่ → แสดงตัวเลข

**Expected Output:**
```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```

**คำตอบ:**
```python
for i in range(1, 16):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
```

---

### **10. Find Maximum of Three Numbers** ⭐⭐⭐
**Mode:** Function Test  
**Language:** JavaScript

**โจทย์:** สร้างฟังก์ชัน `max(a, b, c)` ที่คืนค่าตัวเลขที่มากที่สุด

**Test Cases:**
- `max(1, 2, 3)` → `3`
- `max(5, 2, 8)` → `8`
- `max(-1, -5, -3)` → `-1`
- `max(7, 7, 7)` → `7`
- `max(10, 3, 5)` → `10`

**คำตอบ:**
```javascript
function max(a, b, c) {
  return Math.max(a, b, c);
}

// หรือ
function max(a, b, c) {
  if (a >= b && a >= c) return a;
  if (b >= a && b >= c) return b;
  return c;
}
```

---

## 📊 สถิติโจทย์

### **ตาม Validation Mode**
- **Output Only:** 4 ข้อ (1, 3, 7, 9)
- **Function Test:** 4 ข้อ (2, 5, 8, 10)
- **Syntax Check:** 2 ข้อ (4, 6)

### **ตาม Language**
- **JavaScript:** 7 ข้อ
- **Python:** 2 ข้อ
- **Java:** 1 ข้อ

### **ตาม Difficulty**
- **⭐ (Easy):** 2 ข้อ
- **⭐⭐ (Medium):** 3 ข้อ
- **⭐⭐⭐ (Hard):** 4 ข้อ
- **⭐⭐⭐⭐ (Very Hard):** 1 ข้อ

---

## 🎯 Learning Path

### **สำหรับผู้เริ่มต้น**
1. Challenge 1: Hello World
2. Challenge 3: Python Sum Calculator
3. Challenge 7: Java Hello World

### **สำหรับระดับกลาง**
4. Challenge 2: Add Two Numbers
5. Challenge 5: Multiply Two Numbers
6. Challenge 4: If-Else Statement

### **สำหรับระดับสูง**
7. Challenge 6: For Loop
8. Challenge 8: Check Even Number
9. Challenge 10: Find Maximum
10. Challenge 9: FizzBuzz

---

## ✅ Checklist

- [ ] รัน SQL ใน Supabase
- [ ] Refresh frontend
- [ ] ทดสอบโจทย์ที่ 1 (Hello World)
- [ ] ทดสอบโจทย์ที่ 2 (Function Test)
- [ ] ทดสอบโจทย์ที่ 4 (Syntax Check)
- [ ] ทดสอบโจทย์ที่ 9 (FizzBuzz)

---

## 🔗 Files

- **SQL File:** `.agent/new-challenges.sql`
- **This Guide:** `.agent/NEW_CHALLENGES.md`

---

**🎉 พร้อมใช้งานแล้ว! ลองทำโจทย์กันเลย!**
