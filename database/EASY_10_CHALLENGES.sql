-- ========================================
-- 10 SUPER EASY CHALLENGES FOR TESTING
-- ใช้ manual print - ไม่มี loop - ทำงานได้แน่นอน
-- ========================================

DELETE FROM "Codecamp" WHERE id BETWEEN 1 AND 10;

-- ข้อ 1: Return Number (Python)
INSERT INTO "Codecamp" (
  id, title, description, language, difficulty, likes,
  initial_code, expected_output, test_cases, validation_mode,
  required_keywords, forbidden_keywords, protected_ranges, validation_script
) VALUES (
  1,
  'Return Number',
  'Write a function getNumber() that returns the number 42',
  'python',
  1,
  100,
  'def getNumber():
    # Write your code here
    pass',
  '',
  '[]'::jsonb,
  'function_test',
  '["return", "def"]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  'import json
result = getNumber()
test_results = [{"passed": result == 42, "expected": 42, "actual": result, "description": "getNumber() should return 42"}]
print(json.dumps(test_results))'
);

-- ข้อ 2: Return String (Python)
INSERT INTO "Codecamp" (
  id, title, description, language, difficulty, likes,
  initial_code, expected_output, test_cases, validation_mode,
  required_keywords, forbidden_keywords, protected_ranges, validation_script
) VALUES (
  2,
  'Return String',
  'Write a function getName() that returns "Alice"',
  'python',
  1,
  100,
  'def getName():
    # Write your code here
    pass',
  '',
  '[]'::jsonb,
  'function_test',
  '["return", "def"]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  'import json
result = getName()
test_results = [{"passed": result == "Alice", "expected": "Alice", "actual": result, "description": "getName() should return Alice"}]
print(json.dumps(test_results))'
);

-- ข้อ 3: Add Two Numbers (Python)
INSERT INTO "Codecamp" (
  id, title, description, language, difficulty, likes,
  initial_code, expected_output, test_cases, validation_mode,
  required_keywords, forbidden_keywords, protected_ranges, validation_script
) VALUES (
  3,
  'Add Two Numbers',
  'Write a function add(a, b) that returns a + b',
  'python',
  1,
  100,
  'def add(a, b):
    # Write your code here
    pass',
  '',
  '[]'::jsonb,
  'function_test',
  '["return", "def"]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  'import json
r1 = add(2, 3)
r2 = add(10, 20)
test_results = [
    {"passed": r1 == 5, "expected": 5, "actual": r1, "description": "add(2, 3) = 5"},
    {"passed": r2 == 30, "expected": 30, "actual": r2, "description": "add(10, 20) = 30"}
]
print(json.dumps(test_results))'
);

-- ข้อ 4: Return True (JavaScript)
INSERT INTO "Codecamp" (
  id, title, description, language, difficulty, likes,
  initial_code, expected_output, test_cases, validation_mode,
  required_keywords, forbidden_keywords, protected_ranges, validation_script
) VALUES (
  4,
  'Return True',
  'Write a function getTrue() that returns true',
  'javascript',
  1,
  100,
  'function getTrue() {
  // Write your code here
}',
  '',
  '[]'::jsonb,
  'function_test',
  '["return", "function"]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  'const result = getTrue();
const test_results = [{"passed": result === true, "expected": true, "actual": result, "description": "getTrue() should return true"}];
console.log(JSON.stringify(test_results));'
);

-- ข้อ 5: Multiply (JavaScript)
INSERT INTO "Codecamp" (
  id, title, description, language, difficulty, likes,
  initial_code, expected_output, test_cases, validation_mode,
  required_keywords, forbidden_keywords, protected_ranges, validation_script
) VALUES (
  5,
  'Multiply Two Numbers',
  'Write a function multiply(a, b) that returns a * b',
  'javascript',
  1,
  100,
  'function multiply(a, b) {
  // Write your code here
}',
  '',
  '[]'::jsonb,
  'function_test',
  '["return", "function"]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  'const r1 = multiply(3, 4);
const r2 = multiply(5, 6);
const test_results = [
    {"passed": r1 === 12, "expected": 12, "actual": r1, "description": "multiply(3, 4) = 12"},
    {"passed": r2 === 30, "expected": 30, "actual": r2, "description": "multiply(5, 6) = 30"}
];
console.log(JSON.stringify(test_results));'
);

-- ข้อ 6: Return Zero (Java)
INSERT INTO "Codecamp" (
  id, title, description, language, difficulty, likes,
  initial_code, expected_output, test_cases, validation_mode,
  required_keywords, forbidden_keywords, protected_ranges, validation_script
) VALUES (
  6,
  'Return Zero',
  'Write a function getZero() that returns 0',
  'java',
  1,
  100,
  'public class Solution {
    public static int getZero() {
        // Write your code here
        return -1;
    }
}',
  '',
  '[]'::jsonb,
  'function_test',
  '["return"]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  'public class Main {
    public static void main(String[] args) {
        int result = Solution.getZero();
        System.out.print("[{\"passed\":" + (result == 0) + ",\"expected\":0,\"actual\":" + result + ",\"description\":\"getZero() should return 0\"}]");
    }
}'
);

-- ข้อ 7: Subtract (Java)
INSERT INTO "Codecamp" (
  id, title, description, language, difficulty, likes,
  initial_code, expected_output, test_cases, validation_mode,
  required_keywords, forbidden_keywords, protected_ranges, validation_script
) VALUES (
  7,
  'Subtract Two Numbers',
  'Write a function subtract(a, b) that returns a - b',
  'java',
  1,
  100,
  'public class Solution {
    public static int subtract(int a, int b) {
        // Write your code here
        return 0;
    }
}',
  '',
  '[]'::jsonb,
  'function_test',
  '["return"]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  'public class Main {
    public static void main(String[] args) {
        int r1 = Solution.subtract(10, 5);
        int r2 = Solution.subtract(20, 8);
        System.out.print("[");
        System.out.print("{\"passed\":" + (r1 == 5) + ",\"expected\":5,\"actual\":" + r1 + ",\"description\":\"subtract(10, 5) = 5\"},");
        System.out.print("{\"passed\":" + (r2 == 12) + ",\"expected\":12,\"actual\":" + r2 + ",\"description\":\"subtract(20, 8) = 12\"}");
        System.out.println("]");
    }
}'
);

-- ข้อ 8: Return Empty String (C++)
INSERT INTO "Codecamp" (
  id, title, description, language, difficulty, likes,
  initial_code, expected_output, test_cases, validation_mode,
  required_keywords, forbidden_keywords, protected_ranges, validation_script
) VALUES (
  8,
  'Return Empty String',
  'Write a function getEmpty() that returns an empty string',
  'cpp',
  1,
  100,
  '#include <string>
using namespace std;

string getEmpty() {
    // Write your code here
}',
  '',
  '[]'::jsonb,
  'function_test',
  '["return"]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  '#include <iostream>
#include <string>
using namespace std;
int main() {
    string result = getEmpty();
    cout << "[{\"passed\":" << (result == "" ? "true" : "false") << ",\"expected\":\"\",\"actual\":\"" << result << "\",\"description\":\"getEmpty() should return empty string\"}]" << endl;
    return 0;
}'
);

-- ข้อ 9: Double Number (C++)
INSERT INTO "Codecamp" (
  id, title, description, language, difficulty, likes,
  initial_code, expected_output, test_cases, validation_mode,
  required_keywords, forbidden_keywords, protected_ranges, validation_script
) VALUES (
  9,
  'Double a Number',
  'Write a function doubleNum(n) that returns n * 2',
  'cpp',
  1,
  100,
  'int doubleNum(int n) {
    // Write your code here
}',
  '',
  '[]'::jsonb,
  'function_test',
  '["return"]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  '#include <iostream>
using namespace std;
int main() {
    int r1 = doubleNum(5);
    int r2 = doubleNum(10);
    cout << "[";
    cout << "{\"passed\":" << (r1 == 10 ? "true" : "false") << ",\"expected\":10,\"actual\":" << r1 << ",\"description\":\"doubleNum(5) = 10\"},";
    cout << "{\"passed\":" << (r2 == 20 ? "true" : "false") << ",\"expected\":20,\"actual\":" << r2 << ",\"description\":\"doubleNum(10) = 20\"}";
    cout << "]" << endl;
    return 0;
}'
);

-- ข้อ 10: Return Hello (Python)
INSERT INTO "Codecamp" (
  id, title, description, language, difficulty, likes,
  initial_code, expected_output, test_cases, validation_mode,
  required_keywords, forbidden_keywords, protected_ranges, validation_script
) VALUES (
  10,
  'Return Hello',
  'Write a function sayHello() that returns "Hello"',
  'python',
  1,
  100,
  'def sayHello():
    # Write your code here
    pass',
  '',
  '[]'::jsonb,
  'function_test',
  '["return", "def"]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  'import json
result = sayHello()
test_results = [{"passed": result == "Hello", "expected": "Hello", "actual": result, "description": "sayHello() should return Hello"}]
print(json.dumps(test_results))'
);

-- ========================================
-- Verify
-- ========================================
SELECT 
    id, 
    title, 
    language,
    validation_mode,
    LENGTH(validation_script) as script_length
FROM "Codecamp"
WHERE id BETWEEN 1 AND 10
ORDER BY id;
