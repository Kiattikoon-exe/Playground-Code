# 🧪 ตัวอย่าง Test Scripts ที่ถูกต้องสำหรับแต่ละภาษา

## 📌 หลักการสำคัญ

1. **ไม่ต้อง import โค้ดผู้ใช้** - โค้ดจะถูกรวมเข้ามาแล้วโดย `handleFunctionTest()`
2. **ต้อง print JSON array** - เพื่อให้ backend parse ได้
3. **ใช้ try-catch** - เพื่อจับ error ที่อาจเกิดขึ้น
4. **ทดสอบหลาย cases** - ครอบคลุมทั้ง normal, edge, และ error cases

---

## 🐍 Python Test Script Template

### แบบพื้นฐาน (Single Function)

```python
# Test Script
import json

test_results = []

# Test Case 1
try:
    result = myFunction(input1)
    expected = expected_output1
    test_results.append({
        "passed": result == expected,
        "expected": expected,
        "actual": result,
        "description": "Test case description"
    })
except Exception as e:
    test_results.append({
        "passed": False,
        "error": str(e),
        "description": "Test case description"
    })

# Test Case 2
try:
    result = myFunction(input2)
    expected = expected_output2
    test_results.append({
        "passed": result == expected,
        "expected": expected,
        "actual": result,
        "description": "Test case 2 description"
    })
except Exception as e:
    test_results.append({
        "passed": False,
        "error": str(e),
        "description": "Test case 2 description"
    })

print(json.dumps(test_results))
```

### แบบใช้ Loop (Multiple Test Cases)

```python
# Test Script
import json

test_cases = [
    {"input": 5, "expected": 120, "desc": "factorial(5) = 120"},
    {"input": 0, "expected": 1, "desc": "factorial(0) = 1"},
    {"input": 1, "expected": 1, "desc": "factorial(1) = 1"},
    {"input": 10, "expected": 3628800, "desc": "factorial(10) = 3628800"}
]

results = []
for test in test_cases:
    try:
        result = factorial(test["input"])
        results.append({
            "passed": result == test["expected"],
            "expected": test["expected"],
            "actual": result,
            "description": test["desc"]
        })
    except Exception as e:
        results.append({
            "passed": False,
            "error": str(e),
            "description": test["desc"]
        })

print(json.dumps(results))
```

### แบบทดสอบ List/Array

```python
# Test Script
import json

test_cases = [
    {"input": [1, 5, 3, 9, 2], "expected": 9, "desc": "findMax([1,5,3,9,2]) = 9"},
    {"input": [-1, -5, -2], "expected": -1, "desc": "negative numbers"},
    {"input": [42], "expected": 42, "desc": "single element"}
]

results = []
for test in test_cases:
    try:
        result = findMax(test["input"])
        results.append({
            "passed": result == test["expected"],
            "expected": test["expected"],
            "actual": result,
            "description": test["desc"]
        })
    except Exception as e:
        results.append({
            "passed": False,
            "error": str(e),
            "description": test["desc"]
        })

print(json.dumps(results))
```

---

## 🟨 JavaScript Test Script Template

### แบบพื้นฐาน

```javascript
// Test Script
const testCases = [
  { args: [2, 3], expected: 5, desc: "add(2, 3) = 5" },
  { args: [-1, 1], expected: 0, desc: "add(-1, 1) = 0" },
  { args: [0, 0], expected: 0, desc: "add(0, 0) = 0" }
];

const results = [];
testCases.forEach(test => {
  try {
    const result = add(...test.args);
    results.push({
      passed: result === test.expected,
      expected: test.expected,
      actual: result,
      description: test.desc
    });
  } catch (e) {
    results.push({
      passed: false,
      error: e.message,
      description: test.desc
    });
  }
});

console.log(JSON.stringify(results));
```

### แบบทดสอบ Array

```javascript
// Test Script
const testCases = [
  {
    input: 5,
    expected: ["1", "2", "Fizz", "4", "Buzz"],
    desc: "fizzBuzz(5)"
  },
  {
    input: 15,
    expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"],
    desc: "fizzBuzz(15)"
  }
];

const results = [];
testCases.forEach(test => {
  try {
    const result = fizzBuzz(test.input);
    // ใช้ JSON.stringify เพื่อเปรียบเทียบ array
    const passed = JSON.stringify(result) === JSON.stringify(test.expected);
    results.push({
      passed,
      expected: test.expected,
      actual: result,
      description: test.desc
    });
  } catch (e) {
    results.push({
      passed: false,
      error: e.message,
      description: test.desc
    });
  }
});

console.log(JSON.stringify(results));
```

### แบบทดสอบ String

```javascript
// Test Script
const testCases = [
  { input: "hello", expected: "olleh", desc: "reverse 'hello'" },
  { input: "world", expected: "dlrow", desc: "reverse 'world'" },
  { input: "a", expected: "a", desc: "single character" }
];

const results = [];
testCases.forEach(test => {
  try {
    const result = reverseString(test.input);
    results.push({
      passed: result === test.expected,
      expected: test.expected,
      actual: result,
      description: test.desc
    });
  } catch (e) {
    results.push({
      passed: false,
      error: e.message,
      description: test.desc
    });
  }
});

console.log(JSON.stringify(results));
```

---

## ☕ Java Test Script Template

### แบบไม่ใช้ Gson (Manual JSON Building)

```java
// Test Script
public class Main {
    public static void main(String[] args) {
        // Test cases
        int[][] tests = {
            {4, 1},    // isEven(4) = true (1 = true, 0 = false)
            {7, 0},    // isEven(7) = false
            {0, 1},    // isEven(0) = true
            {1, 0},    // isEven(1) = false
            {100, 1}   // isEven(100) = true
        };
        String[] descs = {
            "4 should be even",
            "7 should be odd",
            "0 should be even",
            "1 should be odd",
            "100 should be even"
        };
        
        System.out.print("[");
        for (int i = 0; i < tests.length; i++) {
            boolean result = Solution.isEven(tests[i][0]);
            boolean expected = tests[i][1] == 1;
            boolean passed = result == expected;
            
            if (i > 0) System.out.print(",");
            System.out.print("{\"passed\":" + passed + 
                           ",\"expected\":" + expected + 
                           ",\"actual\":" + result + 
                           ",\"description\":\"" + descs[i] + "\"}");
        }
        System.out.println("]");
    }
}
```

### แบบใช้ Gson (ถ้า Paiza.IO รองรับ)

```java
// Test Script
import com.google.gson.Gson;
import java.util.*;

class TestResult {
    boolean passed;
    String description;
    Object expected;
    Object actual;
    String error;
}

public class Main {
    public static void main(String[] args) {
        List<TestResult> results = new ArrayList<>();
        
        // Test cases
        int[][] tests = {{4, 1}, {7, 0}, {0, 1}};
        String[] descs = {"4 should be even", "7 should be odd", "0 should be even"};
        
        for (int i = 0; i < tests.length; i++) {
            TestResult tr = new TestResult();
            tr.description = descs[i];
            try {
                boolean result = Solution.isEven(tests[i][0]);
                boolean expected = tests[i][1] == 1;
                tr.passed = result == expected;
                tr.expected = expected;
                tr.actual = result;
            } catch (Exception e) {
                tr.passed = false;
                tr.error = e.getMessage();
            }
            results.add(tr);
        }
        
        System.out.println(new Gson().toJson(results));
    }
}
```

### แบบทดสอบ String

```java
// Test Script
public class Main {
    public static void main(String[] args) {
        String[][] tests = {
            {"racecar", "true", "racecar is palindrome"},
            {"hello", "false", "hello is not palindrome"},
            {"madam", "true", "madam is palindrome"}
        };
        
        System.out.print("[");
        for (int i = 0; i < tests.length; i++) {
            boolean result = Solution.isPalindrome(tests[i][0]);
            boolean expected = Boolean.parseBoolean(tests[i][1]);
            boolean passed = result == expected;
            
            if (i > 0) System.out.print(",");
            System.out.print("{\"passed\":" + passed + 
                           ",\"expected\":" + expected + 
                           ",\"actual\":" + result + 
                           ",\"description\":\"" + tests[i][2] + "\"}");
        }
        System.out.println("]");
    }
}
```

---

## 🔷 C++ Test Script Template

### แบบพื้นฐาน

```cpp
// Test Script
#include <iostream>
#include <string>
using namespace std;

struct TestCase {
    int input;
    bool expected;
    string desc;
};

int main() {
    TestCase tests[] = {
        {7, true, "7 is prime"},
        {4, false, "4 is not prime"},
        {1, false, "1 is not prime"},
        {2, true, "2 is prime"}
    };
    
    cout << "[";
    for (int i = 0; i < 4; i++) {
        bool result = isPrime(tests[i].input);
        bool passed = result == tests[i].expected;
        
        if (i > 0) cout << ",";
        cout << "{\"passed\":" << (passed ? "true" : "false")
             << ",\"expected\":" << (tests[i].expected ? "true" : "false")
             << ",\"actual\":" << (result ? "true" : "false")
             << ",\"description\":\"" << tests[i].desc << "\"}";
    }
    cout << "]" << endl;
    
    return 0;
}
```

### แบบทดสอบ String

```cpp
// Test Script
#include <iostream>
#include <string>
using namespace std;

struct TestCase {
    string input;
    string expected;
    string desc;
};

int main() {
    TestCase tests[] = {
        {"hello", "olleh", "reverse hello"},
        {"world", "dlrow", "reverse world"},
        {"12345", "54321", "reverse numbers"},
        {"a", "a", "single character"}
    };
    
    cout << "[";
    for (int i = 0; i < 4; i++) {
        string result = reverseString(tests[i].input);
        bool passed = result == tests[i].expected;
        
        if (i > 0) cout << ",";
        cout << "{\"passed\":" << (passed ? "true" : "false")
             << ",\"expected\":\"" << tests[i].expected << "\""
             << ",\"actual\":\"" << result << "\""
             << ",\"description\":\"" << tests[i].desc << "\"}";
    }
    cout << "]" << endl;
    
    return 0;
}
```

### แบบทดสอบตัวเลข

```cpp
// Test Script
#include <iostream>
using namespace std;

struct TestCase {
    int input;
    int expected;
    string desc;
};

int main() {
    TestCase tests[] = {
        {5, 120, "factorial(5) = 120"},
        {0, 1, "factorial(0) = 1"},
        {3, 6, "factorial(3) = 6"}
    };
    
    cout << "[";
    for (int i = 0; i < 3; i++) {
        int result = factorial(tests[i].input);
        bool passed = result == tests[i].expected;
        
        if (i > 0) cout << ",";
        cout << "{\"passed\":" << (passed ? "true" : "false")
             << ",\"expected\":" << tests[i].expected
             << ",\"actual\":" << result
             << ",\"description\":\"" << tests[i].desc << "\"}";
    }
    cout << "]" << endl;
    
    return 0;
}
```

---

## 🎯 Best Practices

### 1. ครอบคลุม Test Cases

```python
# ✅ ดี - ครอบคลุมหลาย cases
test_cases = [
    {"input": 5, "expected": 120, "desc": "normal case"},
    {"input": 0, "expected": 1, "desc": "edge case: zero"},
    {"input": 1, "expected": 1, "desc": "edge case: one"},
    {"input": 10, "expected": 3628800, "desc": "large number"}
]

# ❌ ไม่ดี - ทดสอบแค่ case เดียว
test_cases = [
    {"input": 5, "expected": 120, "desc": "factorial(5)"}
]
```

### 2. ใช้ Try-Catch

```javascript
// ✅ ดี - จับ error ได้
try {
    const result = myFunction(input);
    results.push({
        passed: result === expected,
        expected: expected,
        actual: result,
        description: "test case"
    });
} catch (e) {
    results.push({
        passed: false,
        error: e.message,
        description: "test case"
    });
}

// ❌ ไม่ดี - ถ้า error จะทำให้ทั้ง script หยุด
const result = myFunction(input);
results.push({
    passed: result === expected,
    expected: expected,
    actual: result,
    description: "test case"
});
```

### 3. Description ที่ชัดเจน

```python
# ✅ ดี - อธิบายชัดเจน
"description": "add(2, 3) should return 5"

# ❌ ไม่ดี - ไม่ชัดเจน
"description": "test 1"
```

### 4. เปรียบเทียบ Array/Object

```javascript
// ✅ ดี - ใช้ JSON.stringify
const passed = JSON.stringify(result) === JSON.stringify(expected);

// ❌ ไม่ดี - เปรียบเทียบ reference
const passed = result === expected;  // จะเป็น false เสมอ
```

---

## 🚨 ข้อควรระวัง

### 1. Escape Characters ใน String

```cpp
// ✅ ดี
cout << ",\"description\":\"" << tests[i].desc << "\"";

// ❌ ไม่ดี - ลืม escape quotes
cout << ",\"description\":" << tests[i].desc;
```

### 2. JSON Format ที่ถูกต้อง

```python
# ✅ ดี - ใช้ json.dumps
print(json.dumps(test_results))

# ❌ ไม่ดี - print dict โดยตรง (format ไม่ถูกต้อง)
print(test_results)
```

### 3. Boolean Values ใน JSON

```java
// ✅ ดี - ใช้ lowercase
System.out.print("{\"passed\":" + (passed ? "true" : "false") + "}");

// ❌ ไม่ดี - ใช้ uppercase (ไม่ใช่ JSON ที่ถูกต้อง)
System.out.print("{\"passed\":" + (passed ? "True" : "False") + "}");
```

---

## 📝 Checklist สำหรับสร้าง Test Script

- [ ] ไม่มีการ import โค้ดผู้ใช้
- [ ] Print JSON array ที่ถูกต้อง
- [ ] ใช้ try-catch ครอบทุก test case
- [ ] มี test cases อย่างน้อย 3-5 cases
- [ ] ครอบคลุม normal, edge, และ error cases
- [ ] Description ชัดเจนและเข้าใจง่าย
- [ ] ทดสอบบน Paiza.IO แล้วว่าทำงานได้
- [ ] JSON format ถูกต้อง (ใช้ JSON validator ตรวจสอบ)

---

## 🎉 สรุป

ใช้ template เหล่านี้เป็นแนวทางในการสร้าง test scripts สำหรับโจทย์ใหม่ๆ โดย:

1. เลือก template ตามภาษา
2. ปรับ test cases ให้เหมาะกับโจทย์
3. ทดสอบบน Paiza.IO
4. ตรวจสอบ JSON output
5. บันทึกลง `validation_script` ใน database

**พร้อมสร้างโจทย์ใหม่แล้ว!** 🚀
