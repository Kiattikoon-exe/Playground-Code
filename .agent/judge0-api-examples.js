/**
 * Judge0 API Examples
 * ตัวอย่างการใช้งาน Judge0 API สำหรับทดสอบก่อนเริ่ม integrate
 */

const JUDGE0_URL = 'http://54.162.88.144:2358';

// ========================================
// ตัวอย่าง 1: รัน Python Code (Simple)
// ========================================
async function example1_SimplePython() {
  console.log('\n=== Example 1: Simple Python ===');
  
  const response = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source_code: 'print("Hello from Judge0!")',
      language_id: 71, // Python 3.8.1
    }),
  });

  const result = await response.json();
  console.log('Status:', result.status.description);
  console.log('Output:', result.stdout);
  console.log('Time:', result.time, 'seconds');
  console.log('Memory:', result.memory, 'KB');
}

// ========================================
// ตัวอย่าง 2: รัน JavaScript พร้อม Input
// ========================================
async function example2_JavaScriptWithInput() {
  console.log('\n=== Example 2: JavaScript with Input ===');
  
  const code = `
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  console.log('You entered: ' + line);
  rl.close();
});
  `.trim();

  const response = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source_code: code,
      language_id: 63, // JavaScript (Node.js)
      stdin: 'Hello Judge0',
    }),
  });

  const result = await response.json();
  console.log('Status:', result.status.description);
  console.log('Output:', result.stdout);
}

// ========================================
// ตัวอย่าง 3: Function Testing (Codewars Style)
// ========================================
async function example3_FunctionTesting() {
  console.log('\n=== Example 3: Function Testing ===');
  
  // User's code
  const userCode = `
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}
  `.trim();

  // Test cases
  const testCases = `
console.log(add(1, 2));
console.log(add(5, 7));
console.log(multiply(3, 4));
console.log(multiply(10, 5));
  `.trim();

  const fullCode = userCode + '\n\n' + testCases;
  const expectedOutput = '3\n12\n12\n50\n';

  const response = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source_code: fullCode,
      language_id: 63, // JavaScript
      expected_output: expectedOutput,
    }),
  });

  const result = await response.json();
  console.log('Status:', result.status.description);
  console.log('Expected:', expectedOutput.replace(/\n/g, '\\n'));
  console.log('Got:', result.stdout?.replace(/\n/g, '\\n'));
  console.log('Match:', result.status.id === 3 ? '✅ PASS' : '❌ FAIL');
}

// ========================================
// ตัวอย่าง 4: Compilation Error
// ========================================
async function example4_CompilationError() {
  console.log('\n=== Example 4: Compilation Error ===');
  
  const code = `
public class Main {
  public static void main(String[] args) {
    System.out.println("Missing semicolon")  // Error here!
  }
}
  `.trim();

  const response = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source_code: code,
      language_id: 62, // Java
    }),
  });

  const result = await response.json();
  console.log('Status:', result.status.description);
  console.log('Compile Output:', result.compile_output);
}

// ========================================
// ตัวอย่าง 5: Runtime Error
// ========================================
async function example5_RuntimeError() {
  console.log('\n=== Example 5: Runtime Error ===');
  
  const code = `
def divide(a, b):
    return a / b

print(divide(10, 0))  # Division by zero!
  `.trim();

  const response = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source_code: code,
      language_id: 71, // Python
    }),
  });

  const result = await response.json();
  console.log('Status:', result.status.description);
  console.log('Stderr:', result.stderr);
}

// ========================================
// ตัวอย่าง 6: Time Limit Exceeded
// ========================================
async function example6_TimeLimit() {
  console.log('\n=== Example 6: Time Limit Exceeded ===');
  
  const code = `
import time
while True:
    time.sleep(1)
  `.trim();

  const response = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source_code: code,
      language_id: 71, // Python
      cpu_time_limit: 1, // 1 second limit
    }),
  });

  const result = await response.json();
  console.log('Status:', result.status.description);
  console.log('Time:', result.time, 'seconds');
}

// ========================================
// ตัวอย่าง 7: Get All Languages
// ========================================
async function example7_GetLanguages() {
  console.log('\n=== Example 7: Get All Languages ===');
  
  const response = await fetch(`${JUDGE0_URL}/languages`);
  const languages = await response.json();
  
  console.log('Total languages:', languages.length);
  console.log('\nLanguages used in Code Camp Academy:');
  
  const usedLanguages = [63, 71, 62, 54, 50, 74, 68, 73, 60, 72, 46, 51];
  const filtered = languages.filter(lang => usedLanguages.includes(lang.id));
  
  filtered.forEach(lang => {
    console.log(`  ${lang.id}: ${lang.name}`);
  });
}

// ========================================
// ตัวอย่าง 8: Async Submission (Without wait=true)
// ========================================
async function example8_AsyncSubmission() {
  console.log('\n=== Example 8: Async Submission ===');
  
  // Step 1: Create submission
  const createResponse = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source_code: 'print("Async test")',
      language_id: 71,
    }),
  });

  const createResult = await createResponse.json();
  console.log('Submission token:', createResult.token);

  // Step 2: Poll for result
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms
    
    const getResponse = await fetch(`${JUDGE0_URL}/submissions/${createResult.token}?base64_encoded=false`);
    const result = await getResponse.json();
    
    console.log(`Attempt ${attempts + 1}: Status = ${result.status.description}`);
    
    if (result.status.id > 2) { // Not in queue or processing
      console.log('Final output:', result.stdout);
      break;
    }
    
    attempts++;
  }
}

// ========================================
// Main: Run all examples
// ========================================
async function runAllExamples() {
  try {
    await example1_SimplePython();
    await example2_JavaScriptWithInput();
    await example3_FunctionTesting();
    await example4_CompilationError();
    await example5_RuntimeError();
    await example6_TimeLimit();
    await example7_GetLanguages();
    await example8_AsyncSubmission();
    
    console.log('\n✅ All examples completed!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run if executed directly
if (typeof window === 'undefined') {
  runAllExamples();
}

// Export for use in other files
module.exports = {
  example1_SimplePython,
  example2_JavaScriptWithInput,
  example3_FunctionTesting,
  example4_CompilationError,
  example5_RuntimeError,
  example6_TimeLimit,
  example7_GetLanguages,
  example8_AsyncSubmission,
};
