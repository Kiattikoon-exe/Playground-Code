# ✅ คำตอบที่ถูกต้องสำหรับทุกโจทย์

## ข้อ 101: Hello World Function (Python)

```python
def greet():
    return "Hello, World!"
```

---

## ข้อ 102: Add Function (JavaScript)

```javascript
function add(a, b) {
    return a + b;
}
```

---

## ข้อ 103: Is Even (Java)

```java
public class Solution {
    public static boolean isEven(int n) {
        return n % 2 == 0;
    }
}
```

---

## ข้อ 104: Factorial Function (Python)

### วิธีที่ 1: ใช้ Loop
```python
def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result
```

### วิธีที่ 2: ใช้ Recursion
```python
def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)
```

---

## ข้อ 105: FizzBuzz Function (JavaScript)

```javascript
function fizzBuzz(n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            result.push("FizzBuzz");
        } else if (i % 3 === 0) {
            result.push("Fizz");
        } else if (i % 5 === 0) {
            result.push("Buzz");
        } else {
            result.push(String(i));
        }
    }
    return result;
}
```

---

## ข้อ 106: Reverse String Function (C++)

### วิธีที่ 1: ใช้ Two Pointers
```cpp
#include <string>
using namespace std;

string reverseString(string s) {
    int left = 0;
    int right = s.length() - 1;
    
    while (left < right) {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
    
    return s;
}
```

### วิธีที่ 2: สร้าง String ใหม่
```cpp
#include <string>
using namespace std;

string reverseString(string s) {
    string result = "";
    for (int i = s.length() - 1; i >= 0; i--) {
        result += s[i];
    }
    return result;
}
```

---

## ข้อ 107: Find Max Function (Python)

### วิธีที่ 1: ใช้ Loop
```python
def findMax(numbers):
    max_num = numbers[0]
    for num in numbers:
        if num > max_num:
            max_num = num
    return max_num
```

### วิธีที่ 2: ใช้ Reduce (แต่ห้ามใช้ max())
```python
def findMax(numbers):
    max_num = numbers[0]
    for i in range(1, len(numbers)):
        if numbers[i] > max_num:
            max_num = numbers[i]
    return max_num
```

---

## ข้อ 108: Palindrome Checker Function (Java)

### วิธีที่ 1: Two Pointers
```java
public class Solution {
    public static boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;
        
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        
        return true;
    }
}
```

### วิธีที่ 2: Reverse และเปรียบเทียบ
```java
public class Solution {
    public static boolean isPalindrome(String s) {
        String reversed = "";
        for (int i = s.length() - 1; i >= 0; i--) {
            reversed += s.charAt(i);
        }
        return s.equals(reversed);
    }
}
```

---

## ข้อ 109: Fibonacci Function (Python)

### วิธีที่ 1: ใช้ Loop
```python
def fibonacci(n):
    if n == 0:
        return []
    if n == 1:
        return [0]
    
    result = [0, 1]
    for i in range(2, n):
        result.append(result[i-1] + result[i-2])
    
    return result
```

### วิธีที่ 2: ใช้ While Loop
```python
def fibonacci(n):
    if n == 0:
        return []
    if n == 1:
        return [0]
    
    result = [0, 1]
    while len(result) < n:
        result.append(result[-1] + result[-2])
    
    return result
```

---

## ข้อ 110: Prime Checker Function (C++)

### วิธีที่ 1: Basic Check
```cpp
#include <cmath>
using namespace std;

bool isPrime(int n) {
    if (n <= 1) {
        return false;
    }
    if (n == 2) {
        return true;
    }
    if (n % 2 == 0) {
        return false;
    }
    
    for (int i = 3; i <= sqrt(n); i += 2) {
        if (n % i == 0) {
            return false;
        }
    }
    
    return true;
}
```

### วิธีที่ 2: Optimized
```cpp
#include <cmath>
using namespace std;

bool isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) {
            return false;
        }
    }
    
    return true;
}
```

---

## 🎯 วิธีทดสอบคำตอบ

### 1. คัดลอกโค้ดไปวางใน Editor
### 2. กด Submit
### 3. ดูผลลัพธ์:

**ถ้าถูกต้อง:**
```json
{
  "isCorrect": true,
  "message": "✅ ผ่านทุก test case! (5/5)",
  "testResults": [
    {"passed": true, "description": "..."},
    ...
  ]
}
```

**ถ้าผิด:**
```json
{
  "isCorrect": false,
  "message": "❌ ผ่าน 3/5 test cases",
  "testResults": [
    {"passed": true, "description": "..."},
    {"passed": false, "expected": 5, "actual": 6, "description": "..."},
    ...
  ]
}
```

---

## 💡 Tips สำหรับแต่ละข้อ

### ข้อ 104 (Factorial):
- อย่าลืมจัดการกรณี n=0 (ต้อง return 1)
- ระวังการใช้ `math.factorial` (ห้ามใช้!)

### ข้อ 105 (FizzBuzz):
- ต้องเช็ค 15 ก่อน 3 และ 5
- ต้อง return array ของ string ทั้งหมด

### ข้อ 106 (Reverse String):
- ห้ามใช้ `reverse()` built-in
- ใช้ loop หรือ two pointers

### ข้อ 107 (Find Max):
- ห้ามใช้ `max()` built-in
- ต้องจัดการกับเลขติดลบได้

### ข้อ 108 (Palindrome):
- ต้องเช็คทีละตัวอักษรจากหน้าและหลัง
- Single character ถือเป็น palindrome

### ข้อ 109 (Fibonacci):
- F(0)=0, F(1)=1
- ถ้า n=1 ต้อง return [0]
- ถ้า n=2 ต้อง return [0, 1]

### ข้อ 110 (Prime):
- 1 ไม่ใช่จำนวนเฉพาะ
- 2 เป็นจำนวนเฉพาะเพียงตัวเดียวที่เป็นเลขคู่
- ใช้ sqrt(n) เพื่อ optimize

---

## 🚀 พร้อมใช้งาน!

คัดลอกโค้ดไปทดสอบได้เลยครับ ทุกคำตอบผ่าน test cases ทั้งหมด! ✅
