-- ========================================
-- FIX ALL CHALLENGES 1-10 - FINAL VERSION
-- ปัญหา: String escaping ใน validation_script ทำให้ compile error
-- วิธีแก้: ใช้ manual print แทน loop + string concatenation
-- ========================================

-- Challenge 1: Hello World (Python) ✅
UPDATE "Codecamp" SET 
    validation_script = 'import json
test_results = []
try:
    result = greet()
    expected = "Hello, World!"
    test_results.append({"passed": result == expected, "expected": expected, "actual": result, "description": "greet() should return Hello, World!"})
except Exception as e:
    test_results.append({"passed": False, "error": str(e), "description": "greet() execution failed"})
print(json.dumps(test_results))'
WHERE id = 1;

-- Challenge 2: Add (JavaScript) ✅
UPDATE "Codecamp" SET
    validation_script = 'const testCases = [
  { args: [2, 3], expected: 5, desc: "add(2, 3) = 5" },
  { args: [-1, 1], expected: 0, desc: "add(-1, 1) = 0" },
  { args: [0, 0], expected: 0, desc: "add(0, 0) = 0" },
  { args: [100, 200], expected: 300, desc: "add(100, 200) = 300" },
  { args: [-5, -3], expected: -8, desc: "add(-5, -3) = -8" }
];
const results = [];
testCases.forEach(test => {
  try {
    const result = add(...test.args);
    results.push({ passed: result === test.expected, expected: test.expected, actual: result, description: test.desc });
  } catch (e) {
    results.push({ passed: false, error: e.message, description: test.desc });
  }
});
console.log(JSON.stringify(results));'
WHERE id = 2;

-- Challenge 3: Is Even (Java) ✅ - แก้ปัญหา escape
UPDATE "Codecamp" SET
    validation_script = 'public class Main {
    public static void main(String[] args) {
        System.out.print("[");
        boolean r1 = Solution.isEven(4);
        System.out.print("{\"passed\":" + (r1 == true) + ",\"expected\":true,\"actual\":" + r1 + ",\"description\":\"4 is even\"},");
        boolean r2 = Solution.isEven(7);
        System.out.print("{\"passed\":" + (r2 == false) + ",\"expected\":false,\"actual\":" + r2 + ",\"description\":\"7 is odd\"},");
        boolean r3 = Solution.isEven(0);
        System.out.print("{\"passed\":" + (r3 == true) + ",\"expected\":true,\"actual\":" + r3 + ",\"description\":\"0 is even\"},");
        boolean r4 = Solution.isEven(1);
        System.out.print("{\"passed\":" + (r4 == false) + ",\"expected\":false,\"actual\":" + r4 + ",\"description\":\"1 is odd\"},");
        boolean r5 = Solution.isEven(100);
        System.out.print("{\"passed\":" + (r5 == true) + ",\"expected\":true,\"actual\":" + r5 + ",\"description\":\"100 is even\"}");
        System.out.println("]");
    }
}'
WHERE id = 3;

-- Challenge 4: Factorial (Python) ✅
UPDATE "Codecamp" SET
    validation_script = 'import json
test_cases = [
    {"input": 5, "expected": 120, "desc": "factorial(5) = 120"},
    {"input": 0, "expected": 1, "desc": "factorial(0) = 1"},
    {"input": 1, "expected": 1, "desc": "factorial(1) = 1"},
    {"input": 10, "expected": 3628800, "desc": "factorial(10) = 3628800"},
    {"input": 3, "expected": 6, "desc": "factorial(3) = 6"}
]
results = []
for test in test_cases:
    try:
        result = factorial(test["input"])
        results.append({"passed": result == test["expected"], "expected": test["expected"], "actual": result, "description": test["desc"]})
    except Exception as e:
        results.append({"passed": False, "error": str(e), "description": test["desc"]})
print(json.dumps(results))'
WHERE id = 4;

-- Challenge 5: FizzBuzz (JavaScript) ✅
UPDATE "Codecamp" SET
    validation_script = 'const testCases = [
  { input: 5, expected: ["1", "2", "Fizz", "4", "Buzz"], desc: "fizzBuzz(5)" },
  { input: 15, expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"], desc: "fizzBuzz(15)" },
  { input: 3, expected: ["1", "2", "Fizz"], desc: "fizzBuzz(3)" }
];
const results = [];
testCases.forEach(test => {
  try {
    const result = fizzBuzz(test.input);
    const passed = JSON.stringify(result) === JSON.stringify(test.expected);
    results.push({ passed, expected: test.expected, actual: result, description: test.desc });
  } catch (e) {
    results.push({ passed: false, error: e.message, description: test.desc });
  }
});
console.log(JSON.stringify(results));'
WHERE id = 5;

-- Challenge 6: Reverse String (C++) ✅
UPDATE "Codecamp" SET
    validation_script = '#include <iostream>
#include <string>
using namespace std;
int main() {
    cout << "[";
    string r1 = reverseString("hello");
    cout << "{\"passed\":" << (r1 == "olleh" ? "true" : "false") << ",\"expected\":\"olleh\",\"actual\":\"" << r1 << "\",\"description\":\"reverse hello\"},";
    string r2 = reverseString("world");
    cout << "{\"passed\":" << (r2 == "dlrow" ? "true" : "false") << ",\"expected\":\"dlrow\",\"actual\":\"" << r2 << "\",\"description\":\"reverse world\"},";
    string r3 = reverseString("12345");
    cout << "{\"passed\":" << (r3 == "54321" ? "true" : "false") << ",\"expected\":\"54321\",\"actual\":\"" << r3 << "\",\"description\":\"reverse numbers\"},";
    string r4 = reverseString("a");
    cout << "{\"passed\":" << (r4 == "a" ? "true" : "false") << ",\"expected\":\"a\",\"actual\":\"" << r4 << "\",\"description\":\"single char\"},";
    string r5 = reverseString("racecar");
    cout << "{\"passed\":" << (r5 == "racecar" ? "true" : "false") << ",\"expected\":\"racecar\",\"actual\":\"" << r5 << "\",\"description\":\"palindrome\"}";
    cout << "]" << endl;
    return 0;
}'
WHERE id = 6;

-- Challenge 7: Find Max (Python) ✅
UPDATE "Codecamp" SET
    validation_script = 'import json
test_cases = [
    {"input": [1, 5, 3, 9, 2], "expected": 9, "desc": "findMax([1,5,3,9,2]) = 9"},
    {"input": [-1, -5, -2], "expected": -1, "desc": "negative numbers"},
    {"input": [42], "expected": 42, "desc": "single element"},
    {"input": [100, 200, 50, 75], "expected": 200, "desc": "max in middle"},
    {"input": [5, 5, 5, 5], "expected": 5, "desc": "all same"}
]
results = []
for test in test_cases:
    try:
        result = findMax(test["input"])
        results.append({"passed": result == test["expected"], "expected": test["expected"], "actual": result, "description": test["desc"]})
    except Exception as e:
        results.append({"passed": False, "error": str(e), "description": test["desc"]})
print(json.dumps(results))'
WHERE id = 7;

-- Challenge 8: Palindrome (Java) ✅
UPDATE "Codecamp" SET
    validation_script = 'public class Main {
    public static void main(String[] args) {
        System.out.print("[");
        boolean r1 = Solution.isPalindrome("racecar");
        System.out.print("{\"passed\":" + (r1 == true) + ",\"expected\":true,\"actual\":" + r1 + ",\"description\":\"racecar is palindrome\"},");
        boolean r2 = Solution.isPalindrome("hello");
        System.out.print("{\"passed\":" + (r2 == false) + ",\"expected\":false,\"actual\":" + r2 + ",\"description\":\"hello is not palindrome\"},");
        boolean r3 = Solution.isPalindrome("madam");
        System.out.print("{\"passed\":" + (r3 == true) + ",\"expected\":true,\"actual\":" + r3 + ",\"description\":\"madam is palindrome\"},");
        boolean r4 = Solution.isPalindrome("noon");
        System.out.print("{\"passed\":" + (r4 == true) + ",\"expected\":true,\"actual\":" + r4 + ",\"description\":\"noon is palindrome\"},");
        boolean r5 = Solution.isPalindrome("a");
        System.out.print("{\"passed\":" + (r5 == true) + ",\"expected\":true,\"actual\":" + r5 + ",\"description\":\"single char is palindrome\"}");
        System.out.println("]");
    }
}'
WHERE id = 8;

-- Challenge 9: Fibonacci (Python) ✅
UPDATE "Codecamp" SET
    validation_script = 'import json
test_cases = [
    {"input": 8, "expected": [0,1,1,2,3,5,8,13], "desc": "fibonacci(8)"},
    {"input": 5, "expected": [0,1,1,2,3], "desc": "fibonacci(5)"},
    {"input": 1, "expected": [0], "desc": "fibonacci(1)"},
    {"input": 2, "expected": [0,1], "desc": "fibonacci(2)"},
    {"input": 10, "expected": [0,1,1,2,3,5,8,13,21,34], "desc": "fibonacci(10)"}
]
results = []
for test in test_cases:
    try:
        result = fibonacci(test["input"])
        results.append({"passed": result == test["expected"], "expected": test["expected"], "actual": result, "description": test["desc"]})
    except Exception as e:
        results.append({"passed": False, "error": str(e), "description": test["desc"]})
print(json.dumps(results))'
WHERE id = 9;

-- Challenge 10: Prime (C++) ✅
UPDATE "Codecamp" SET
    validation_script = '#include <iostream>
using namespace std;
int main() {
    cout << "[";
    bool r1 = isPrime(7);
    cout << "{\"passed\":" << (r1 == true ? "true" : "false") << ",\"expected\":true,\"actual\":" << (r1 ? "true" : "false") << ",\"description\":\"7 is prime\"},";
    bool r2 = isPrime(4);
    cout << "{\"passed\":" << (r2 == false ? "true" : "false") << ",\"expected\":false,\"actual\":" << (r2 ? "true" : "false") << ",\"description\":\"4 is not prime\"},";
    bool r3 = isPrime(1);
    cout << "{\"passed\":" << (r3 == false ? "true" : "false") << ",\"expected\":false,\"actual\":" << (r3 ? "true" : "false") << ",\"description\":\"1 is not prime\"},";
    bool r4 = isPrime(2);
    cout << "{\"passed\":" << (r4 == true ? "true" : "false") << ",\"expected\":true,\"actual\":" << (r4 ? "true" : "false") << ",\"description\":\"2 is prime\"},";
    bool r5 = isPrime(29);
    cout << "{\"passed\":" << (r5 == true ? "true" : "false") << ",\"expected\":true,\"actual\":" << (r5 ? "true" : "false") << ",\"description\":\"29 is prime\"},";
    bool r6 = isPrime(100);
    cout << "{\"passed\":" << (r6 == false ? "true" : "false") << ",\"expected\":false,\"actual\":" << (r6 ? "true" : "false") << ",\"description\":\"100 is not prime\"}";
    cout << "]" << endl;
    return 0;
}'
WHERE id = 10;

-- ========================================
-- Verify all updates
-- ========================================
SELECT 
    id, 
    title, 
    language,
    validation_mode,
    LENGTH(validation_script) as script_length,
    CASE 
        WHEN LENGTH(validation_script) > 0 THEN '✅ OK'
        ELSE '❌ MISSING'
    END as status
FROM "Codecamp"
WHERE id BETWEEN 1 AND 10
ORDER BY id;
