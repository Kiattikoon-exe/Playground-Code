# 🔄 Paiza.IO vs Judge0 API Comparison

## 📊 API Comparison Table

| Feature | Paiza.IO | Judge0 |
|---------|----------|--------|
| **Base URL** | `https://api.paiza.io` | `http://54.162.88.144:2358` |
| **Authentication** | API Key (guest mode available) | None (self-hosted) |
| **Language Format** | String names (`"python3"`, `"javascript"`) | Numeric IDs (`71`, `63`) |
| **Encoding** | Plain text | Plain text or Base64 |
| **Async Support** | Polling required | `wait=true` or polling |
| **Response Format** | Custom | Standard Judge0 format |

---

## 🔀 API Endpoint Mapping

### **1. Create Submission**

#### Paiza.IO
```javascript
POST https://api.paiza.io/runners/create
Content-Type: application/json

{
  "source_code": "print('Hello')",
  "language": "python3",
  "input": "",
  "api_key": "guest"
}

// Response
{
  "id": "abc123",
  "status": "running"
}
```

#### Judge0
```javascript
POST http://54.162.88.144:2358/submissions?base64_encoded=false&wait=true
Content-Type: application/json

{
  "source_code": "print('Hello')",
  "language_id": 71,
  "stdin": ""
}

// Response (with wait=true)
{
  "token": "xyz789",
  "status": {
    "id": 3,
    "description": "Accepted"
  },
  "stdout": "Hello\n",
  "time": "0.001",
  "memory": 2048
}
```

---

### **2. Get Submission Result**

#### Paiza.IO
```javascript
GET https://api.paiza.io/runners/get_details?id={id}&api_key=guest

// Response
{
  "id": "abc123",
  "status": "completed",
  "build_result": "success",
  "stdout": "Hello\n",
  "stderr": "",
  "build_stdout": "",
  "build_stderr": "",
  "build_exit_code": 0,
  "exit_code": 0,
  "time": "0.01"
}
```

#### Judge0
```javascript
GET http://54.162.88.144:2358/submissions/{token}?base64_encoded=false

// Response
{
  "token": "xyz789",
  "status": {
    "id": 3,
    "description": "Accepted"
  },
  "stdout": "Hello\n",
  "stderr": null,
  "compile_output": null,
  "time": "0.001",
  "memory": 2048,
  "exit_code": 0
}
```

---

## 🗺️ Language Mapping

| Language | Paiza.IO | Judge0 ID | Notes |
|----------|----------|-----------|-------|
| JavaScript | `"javascript"` | `63` | Node.js 12.14.0 |
| Python 3 | `"python3"` | `71` | Python 3.8.1 |
| Java | `"java"` | `62` | OpenJDK 13.0.1 |
| C++ | `"cpp"` | `54` | GCC 9.2.0 |
| C | `"c"` | `50` | GCC 9.2.0 |
| TypeScript | `"typescript"` | `74` | TypeScript 3.7.4 |
| PHP | `"php"` | `68` | PHP 7.4.1 |
| Rust | `"rust"` | `73` | Rust 1.40.0 |
| Go | `"go"` | `60` | Go 1.13.5 |
| Ruby | `"ruby"` | `72` | Ruby 2.7.0 |
| Bash | `"bash"` | `46` | Bash 5.0.0 |
| C# | `"csharp"` | `51` | Mono 6.6.0.161 |

---

## 📝 Status Code Mapping

### Paiza.IO Status
```javascript
{
  "status": "completed",
  "build_result": "success" | "failure",
  "exit_code": 0 | 1
}
```

### Judge0 Status
```javascript
{
  "status": {
    "id": 3,
    "description": "Accepted"
  }
}
```

| Paiza.IO | Judge0 ID | Judge0 Description | Meaning |
|----------|-----------|-------------------|---------|
| `status: "running"` | `1` or `2` | In Queue / Processing | กำลังรัน |
| `status: "completed"` + `exit_code: 0` | `3` | Accepted | ✅ สำเร็จ |
| `status: "completed"` + `exit_code: 1` | `4` | Wrong Answer | ❌ ผลลัพธ์ผิด |
| `build_result: "failure"` | `6` | Compilation Error | 🔨 Compile ไม่ผ่าน |
| `exit_code: 1` (runtime) | `7-12` | Runtime Error | 💥 Error ตอนรัน |
| Timeout | `5` | Time Limit Exceeded | ⏱️ Timeout |

---

## 🔧 Code Migration Examples

### **Example 1: Simple Code Execution**

#### Before (Paiza.IO)
```javascript
// Create submission
const createResponse = await fetch("https://api.paiza.io/runners/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    source_code: userCode,
    language: "python3",
    input: inputData,
    api_key: process.env.PAIZA_API_KEY || "guest",
  }),
});

const createResult = await createResponse.json();
const submissionId = createResult.id;

// Poll for result
let attempts = 0;
while (attempts < 10) {
  await sleep(1000);
  const statusUrl = `https://api.paiza.io/runners/get_details?id=${submissionId}&api_key=guest`;
  const statusResponse = await fetch(statusUrl);
  const statusResult = await statusResponse.json();
  
  if (statusResult.status === "completed") {
    return {
      success: statusResult.exit_code === 0,
      output: statusResult.stdout,
      error: statusResult.stderr,
    };
  }
  attempts++;
}
```

#### After (Judge0)
```javascript
// Create submission with wait=true (no polling needed!)
const response = await fetch(
  "http://54.162.88.144:2358/submissions?base64_encoded=false&wait=true",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source_code: userCode,
      language_id: 71, // Python 3.8.1
      stdin: inputData,
    }),
  }
);

const result = await response.json();

return {
  success: result.status.id === 3, // 3 = Accepted
  output: result.stdout,
  error: result.stderr || result.compile_output,
  status: result.status.description,
};
```

---

### **Example 2: Function Testing**

#### Before (Paiza.IO)
```javascript
const paizaLang = "javascript";
const fullCode = userCode + "\n" + validationScript;

const createResponse = await fetch("https://api.paiza.io/runners/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    source_code: fullCode,
    language: paizaLang,
    input: "",
    api_key: process.env.PAIZA_API_KEY || "guest",
  }),
});

// ... polling logic ...

// Check if output matches expected
const passed = statusResult.stdout.trim() === expectedOutput.trim();
```

#### After (Judge0)
```javascript
const languageId = 63; // JavaScript
const fullCode = userCode + "\n" + validationScript;

const response = await fetch(
  "http://54.162.88.144:2358/submissions?base64_encoded=false&wait=true",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source_code: fullCode,
      language_id: languageId,
      stdin: "",
      expected_output: expectedOutput, // Judge0 compares automatically!
    }),
  }
);

const result = await response.json();

// Status 3 = Accepted (output matches expected_output)
const passed = result.status.id === 3;
```

---

## ⚠️ Important Differences

### 1. **Language Identification**
- **Paiza.IO:** Uses string names (case-sensitive)
- **Judge0:** Uses numeric IDs (must be exact)

### 2. **Polling vs Wait**
- **Paiza.IO:** Always requires polling
- **Judge0:** Can use `wait=true` to get result immediately

### 3. **Expected Output**
- **Paiza.IO:** Manual comparison needed
- **Judge0:** Built-in `expected_output` field with automatic comparison

### 4. **Error Handling**
- **Paiza.IO:** Check `build_result` and `exit_code`
- **Judge0:** Check `status.id` (more granular)

### 5. **Base64 Encoding**
- **Paiza.IO:** Not supported
- **Judge0:** Optional (`base64_encoded` parameter)

---

## 🎯 Migration Checklist

- [ ] Replace Paiza.IO URLs with Judge0 URL
- [ ] Convert language strings to language IDs
- [ ] Remove API key logic (not needed for self-hosted)
- [ ] Replace polling with `wait=true` (optional but recommended)
- [ ] Update status checking logic (use `status.id`)
- [ ] Use `expected_output` for automatic comparison
- [ ] Update error handling for Judge0 status codes
- [ ] Test all supported languages
- [ ] Remove `PAIZA_API_KEY` from environment variables

---

## 📚 Quick Reference

### Judge0 Language IDs (Most Used)
```javascript
const JUDGE0_LANGUAGE_MAP = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
  c: 50,
  typescript: 74,
  php: 68,
  rust: 73,
  go: 60,
  ruby: 72,
  bash: 46,
  csharp: 51,
};
```

### Judge0 Status IDs
```javascript
const JUDGE0_STATUS = {
  IN_QUEUE: 1,
  PROCESSING: 2,
  ACCEPTED: 3,
  WRONG_ANSWER: 4,
  TIME_LIMIT_EXCEEDED: 5,
  COMPILATION_ERROR: 6,
  RUNTIME_ERROR_SIGSEGV: 7,
  RUNTIME_ERROR_SIGXFSZ: 8,
  RUNTIME_ERROR_SIGFPE: 9,
  RUNTIME_ERROR_SIGABRT: 10,
  RUNTIME_ERROR_NZEC: 11,
  RUNTIME_ERROR_OTHER: 12,
  INTERNAL_ERROR: 13,
  EXEC_FORMAT_ERROR: 14,
};
```

---

**Ready to migrate? Start with the examples in `.agent/judge0-api-examples.js`! 🚀**
