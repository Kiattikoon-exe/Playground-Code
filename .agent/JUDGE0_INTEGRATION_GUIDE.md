# 📘 Judge0 Integration Guide

> **Branch:** `feature/integrate-judge0-api`  
> **Created:** 2026-01-05  
> **Purpose:** เปลี่ยนจาก Paiza.IO → Judge0 API

---

## 🎯 เป้าหมาย

เปลี่ยนระบบรันโค้ดจาก **Paiza.IO** มาใช้ **Judge0 API** ที่ self-hosted ที่ `http://54.162.88.144:2358`

---

## 📁 ไฟล์ที่ต้องแก้ไข

### 1. **`app/api/check-answer/route.js`** (ไฟล์หลัก)

| บรรทัด | ส่วนที่ต้องแก้ | รายละเอียด |
|--------|---------------|-----------|
| **6-27** | `LANGUAGE_MAP` | เปลี่ยน Paiza language names → Judge0 language IDs |
| **167-209** | Function Test - Language setup | ปรับ language mapping สำหรับ Function Testing |
| **230-270** | Paiza API call (Function Test) | เปลี่ยนเป็น Judge0 submission API |
| **475-530** | Paiza API call (Standard Mode) | เปลี่ยนเป็น Judge0 submission API |

---

## 🔑 ความแตกต่างหลัก: Paiza.IO vs Judge0

### **Paiza.IO API Flow**
```javascript
// 1. Create submission
POST https://api.paiza.io/runners/create
{
  "source_code": "...",
  "language": "python3",  // ใช้ชื่อภาษา (string)
  "input": "...",
  "api_key": "guest"
}

// 2. Get result (polling)
GET https://api.paiza.io/runners/get_details?id={id}&api_key=guest
```

### **Judge0 API Flow**
```javascript
// 1. Create submission
POST http://54.162.88.144:2358/submissions?base64_encoded=false&wait=true
{
  "source_code": "...",
  "language_id": 71,      // ใช้ language ID (number)
  "stdin": "...",
  "expected_output": "..."
}

// 2. Get result (หรือใช้ wait=true เพื่อรอผลลัพธ์ทันที)
GET http://54.162.88.144:2358/submissions/{token}
```

---

## 🗺️ Judge0 Language IDs Mapping

### **ภาษาที่ใช้ใน Code Camp Academy**

| ภาษา | Paiza.IO | Judge0 ID | Judge0 Name |
|------|----------|-----------|-------------|
| **JavaScript** | `"javascript"` | `63` | JavaScript (Node.js 12.14.0) |
| **Python** | `"python3"` | `71` | Python (3.8.1) |
| **Java** | `"java"` | `62` | Java (OpenJDK 13.0.1) |
| **C++** | `"cpp"` | `54` | C++ (GCC 9.2.0) |
| **C** | `"c"` | `50` | C (GCC 9.2.0) |
| **TypeScript** | `"typescript"` | `74` | TypeScript (3.7.4) |
| **PHP** | `"php"` | `68` | PHP (7.4.1) |
| **Rust** | `"rust"` | `73` | Rust (1.40.0) |
| **Go** | `"go"` | `60` | Go (1.13.5) |
| **Ruby** | `"ruby"` | `72` | Ruby (2.7.0) |
| **Bash** | `"bash"` | `46` | Bash (5.0.0) |
| **C#** | `"csharp"` | `51` | C# (Mono 6.6.0.161) |

### **ดึงรายการภาษาทั้งหมด**
```bash
curl http://54.162.88.144:2358/languages
```

---

## 📡 Judge0 API Endpoints

### **1. Create Submission (รันโค้ด)**

**Endpoint:**
```
POST http://54.162.88.144:2358/submissions?base64_encoded=false&wait=true
```

**Request Body:**
```json
{
  "source_code": "print('Hello World')",
  "language_id": 71,
  "stdin": "",
  "expected_output": "Hello World\n",
  "cpu_time_limit": 2,
  "memory_limit": 128000
}
```

**Response (wait=true):**
```json
{
  "token": "abc123...",
  "status": {
    "id": 3,
    "description": "Accepted"
  },
  "stdout": "Hello World\n",
  "stderr": null,
  "compile_output": null,
  "time": "0.001",
  "memory": 2048
}
```

### **2. Get Submission Result**

**Endpoint:**
```
GET http://54.162.88.144:2358/submissions/{token}?base64_encoded=false
```

### **3. Get Languages**

**Endpoint:**
```
GET http://54.162.88.144:2358/languages
```

---

## 🔍 Judge0 Status Codes

| Status ID | Description | ความหมาย |
|-----------|-------------|---------|
| 1 | In Queue | รอคิว |
| 2 | Processing | กำลังรัน |
| 3 | **Accepted** | ✅ ผ่าน (ถูกต้อง) |
| 4 | Wrong Answer | ❌ ผลลัพธ์ไม่ตรงกับที่คาดหวัง |
| 5 | Time Limit Exceeded | ⏱️ ใช้เวลานานเกินไป |
| 6 | Compilation Error | 🔨 คอมไพล์ไม่ผ่าน |
| 7 | Runtime Error (SIGSEGV) | 💥 Error ตอนรัน |
| 8 | Runtime Error (SIGXFSZ) | 💥 Error ตอนรัน |
| 9 | Runtime Error (SIGFPE) | 💥 Error ตอนรัน |
| 10 | Runtime Error (SIGABRT) | 💥 Error ตอนรัน |
| 11 | Runtime Error (NZEC) | 💥 Error ตอนรัน |
| 12 | Runtime Error (Other) | 💥 Error ตอนรัน |
| 13 | Internal Error | ⚠️ ระบบ Judge0 มีปัญหา |
| 14 | Exec Format Error | ⚠️ Format ไม่ถูกต้อง |

---

## 📝 ตัวอย่างการใช้งาน

### **ตัวอย่าง 1: รัน Python Code**

```javascript
const response = await fetch('http://54.162.88.144:2358/submissions?base64_encoded=false&wait=true', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    source_code: 'print("Hello, Judge0!")',
    language_id: 71, // Python 3.8.1
    stdin: '',
  }),
});

const result = await response.json();
console.log(result.stdout); // "Hello, Judge0!\n"
```

### **ตัวอย่าง 2: รัน JavaScript Code พร้อม Input**

```javascript
const response = await fetch('http://54.162.88.144:2358/submissions?base64_encoded=false&wait=true', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    source_code: `
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      rl.on('line', (line) => {
        console.log('You entered: ' + line);
        rl.close();
      });
    `,
    language_id: 63, // JavaScript (Node.js)
    stdin: 'Hello World',
  }),
});

const result = await response.json();
console.log(result.stdout); // "You entered: Hello World\n"
```

### **ตัวอย่าง 3: Function Testing (Codewars Style)**

```javascript
// User Code
const userCode = `
function add(a, b) {
  return a + b;
}
`;

// Validation Script (Test Cases)
const validationScript = `
console.log(add(1, 2)); // Expected: 3
console.log(add(5, 7)); // Expected: 12
`;

// รวมโค้ด
const fullCode = userCode + '\n' + validationScript;

const response = await fetch('http://54.162.88.144:2358/submissions?base64_encoded=false&wait=true', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    source_code: fullCode,
    language_id: 63,
    expected_output: '3\n12\n',
  }),
});

const result = await response.json();
if (result.status.id === 3) {
  console.log('✅ All test cases passed!');
} else {
  console.log('❌ Test failed:', result.status.description);
}
```

---

## 🛠️ สิ่งที่ต้องทำ (Checklist)

### **Phase 1: เตรียมความพร้อม** ✅
- [x] สร้าง branch ใหม่: `feature/integrate-judge0-api`
- [x] ศึกษา Judge0 API Documentation
- [x] ทดสอบ Judge0 API ด้วย curl/Postman

### **Phase 2: แก้ไขโค้ด**
- [ ] แก้ `LANGUAGE_MAP` ให้ใช้ Judge0 language IDs
- [ ] แก้ฟังก์ชัน `handleFunctionTest` ให้ใช้ Judge0 API
- [ ] แก้ส่วน Standard Mode (POST handler) ให้ใช้ Judge0 API
- [ ] จัดการ Error Handling ให้รองรับ Judge0 status codes
- [ ] ปรับ Response Format ให้ตรงกับ Frontend

### **Phase 3: ทดสอบ**
- [ ] ทดสอบ Function Testing Mode
- [ ] ทดสอบ Standard Mode
- [ ] ทดสอบทุกภาษาที่รองรับ
- [ ] ทดสอบ Edge Cases (Timeout, Memory Limit, Compilation Error)

### **Phase 4: Cleanup**
- [ ] ลบโค้ดที่เกี่ยวกับ Paiza.IO
- [ ] ลบ environment variable `PAIZA_API_KEY`
- [ ] อัพเดท documentation
- [ ] Commit และ Push

---

## 🔗 Resources

- **Judge0 API Docs:** http://54.162.88.144:2358/docs
- **Judge0 GitHub:** https://github.com/judge0/judge0
- **Judge0 Dummy Client:** http://54.162.88.144:2358/dummy-client.html
- **Current API Route:** `app/api/check-answer/route.js`

---

## 💡 Tips

1. **ใช้ `wait=true`** ใน query parameter เพื่อรอผลลัพธ์ทันที (ไม่ต้อง polling)
2. **ใช้ `base64_encoded=false`** เพื่อส่งโค้ดเป็น plain text (ง่ายกว่า)
3. **ตั้งค่า `cpu_time_limit`** และ `memory_limit` ให้เหมาะสม
4. **ตรวจสอบ `status.id`** เพื่อดูผลลัพธ์ (3 = Accepted)
5. **ใช้ `expected_output`** เพื่อให้ Judge0 เปรียบเทียบผลลัพธ์อัตโนมัติ

---

## 🚀 Next Steps

1. ทดสอบ Judge0 API ด้วย curl หรือ Postman ก่อน
2. ศึกษาโค้ดใน `app/api/check-answer/route.js` ให้เข้าใจ
3. เริ่มเขียนโค้ดแก้ไขทีละส่วน
4. ทดสอบหลังจากแก้ไขแต่ละส่วน

---

**Good luck! 🎉**
