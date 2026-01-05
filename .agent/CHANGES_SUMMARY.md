# 📝 Judge0 Integration - สรุปการเปลี่ยนแปลง

> **Branch:** `feature/integrate-judge0-api`  
> **Date:** 2026-01-05  
> **Status:** ✅ เสร็จสมบูรณ์

---

## 🎯 สิ่งที่เปลี่ยนแปลง

### **1. Language Mapping (บรรทัด 4-18)**

#### ก่อน (Paiza.IO)
```javascript
const LANGUAGE_MAP = {
  javascript: "javascript",  // String
  python: "python3",
  java: "java",
  cpp: "cpp",
  // ...
};
```

#### หลัง (Judge0)
```javascript
const LANGUAGE_MAP = {
  javascript: 63,  // Number (Judge0 Language ID)
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

**อธิบาย:**
- เปลี่ยนจาก **string** (ชื่อภาษา) เป็น **number** (Judge0 Language ID)
- Judge0 ใช้ ID แทนชื่อเพื่อความแม่นยำ
- ดูรายการ Language IDs ทั้งหมดได้ที่: `http://54.162.88.144:2358/languages`

---

### **2. Function Test Mode (บรรทัด 145-323)**

#### การเปลี่ยนแปลงหลัก:

**A. ลบ Polling Logic**
```javascript
// ❌ ก่อน: ต้อง polling (รอผลลัพธ์ทีละครั้ง)
const createResponse = await fetch("https://api.paiza.io/runners/create", {...});
const submissionId = createResult.id;

// Polling loop
while (attempts < maxAttempts) {
  await sleep(1000);
  const statusUrl = `https://api.paiza.io/runners/get_details?id=${submissionId}`;
  const result = await fetch(statusUrl);
  if (result.status === "completed") break;
}

// ✅ หลัง: ใช้ wait=true (รอผลลัพธ์ทันที)
const response = await fetch(
  "http://54.162.88.144:2358/submissions?wait=true",
  {...}
);
const result = await response.json(); // ได้ผลลัพธ์เลย!
```

**อธิบาย:**
- Judge0 รองรับ `wait=true` parameter
- ไม่ต้องเขียน polling loop (ง่ายกว่า)
- ประหยัดเวลาและ network requests

---

**B. เปลี่ยน Request Format**
```javascript
// ❌ ก่อน (Paiza.IO)
{
  source_code: fullCode,
  language: "python3",        // String
  input: "",
  api_key: "guest"
}

// ✅ หลัง (Judge0)
{
  source_code: fullCode,
  language_id: 71,            // Number
  stdin: ""
  // ไม่ต้องใช้ api_key (self-hosted)
}
```

**อธิบาย:**
- `language` → `language_id` (และเป็น number)
- `input` → `stdin` (ชื่อที่ชัดเจนกว่า)
- ไม่ต้องใช้ `api_key` เพราะเป็น self-hosted

---

**C. เพิ่ม Error Handling ที่ละเอียด**
```javascript
// ✅ ตรวจสอบ Error แบบละเอียด
if (result.status?.id === 6) {
  // Compilation Error
}
if (result.status?.id >= 7 && result.status?.id <= 12) {
  // Runtime Error
}
if (result.status?.id === 5) {
  // Time Limit Exceeded
}
if (result.status?.id === 13) {
  // Internal Error
}
```

**อธิบาย:**
- Judge0 ให้ status codes ที่ละเอียดกว่า (1-14)
- แยก error types ได้ชัดเจน (compile, runtime, timeout, etc.)
- ดู status codes ทั้งหมดได้ใน `.agent/JUDGE0_INTEGRATION_GUIDE.md`

---

### **3. Standard Mode (บรรทัด 450-611)**

#### การเปลี่ยนแปลงหลัก:

**A. ใช้ `expected_output` Field**
```javascript
// ✅ ให้ Judge0 เปรียบเทียบให้
{
  source_code: answer,
  language_id: languageId,
  stdin: "",
  expected_output: expectedOutputTrimmed  // ← ใหม่!
}

// ตรวจสอบผลลัพธ์
const isCorrect = result.status?.id === 3; // 3 = Accepted
```

**อธิบาย:**
- Judge0 เปรียบเทียบ output ให้อัตโนมัติ
- ถ้า output ตรงกับ `expected_output` → status.id = 3 (Accepted)
- ไม่ต้องเขียน string comparison เอง (แม่นยำกว่า)

---

**B. ลบ Polling Logic (เหมือน Function Test)**
```javascript
// ❌ ก่อน: ~70 บรรทัด (create + polling loop)
const createResponse = await fetch("https://api.paiza.io/runners/create", {...});
// ... polling logic ...

// ✅ หลัง: ~15 บรรทัด (create with wait=true)
const response = await fetch(
  "http://54.162.88.144:2358/submissions?wait=true",
  {...}
);
const result = await response.json();
```

**อธิบาย:**
- ลดโค้ดจาก ~70 บรรทัด → ~15 บรรทัด
- อ่านง่ายขึ้น
- ไม่มี race conditions

---

**C. Error Handling ที่ดีขึ้น**
```javascript
// ❌ ก่อน (Paiza.IO)
if (result.build_result === "failure") {
  // Compilation error
}
// ไม่มีการจัดการ runtime errors อื่นๆ

// ✅ หลัง (Judge0)
if (result.status?.id === 6) { /* Compilation */ }
if (result.status?.id >= 7 && result.status?.id <= 12) { /* Runtime */ }
if (result.status?.id === 5) { /* Timeout */ }
if (result.status?.id === 13) { /* Internal */ }
```

**อธิบาย:**
- แยก error types ได้ชัดเจน
- ให้ error messages ที่เหมาะสมกับแต่ละ case
- ช่วยให้ user debug ได้ง่ายขึ้น

---

## 📊 สรุปการเปลี่ยนแปลง

| ส่วน | ก่อน (Paiza.IO) | หลัง (Judge0) | ผลลัพธ์ |
|------|----------------|--------------|---------|
| **Language** | String | Number (ID) | ✅ แม่นยำกว่า |
| **API Calls** | 2+ requests (create + poll) | 1 request (wait=true) | ✅ เร็วกว่า |
| **Code Lines** | ~150 บรรทัด | ~80 บรรทัด | ✅ สั้นกว่า 47% |
| **Error Handling** | 2 types | 5+ types | ✅ ละเอียดกว่า |
| **Output Comparison** | Manual string compare | Auto compare | ✅ แม่นยำกว่า |
| **API Key** | ต้องใช้ | ไม่ต้องใช้ | ✅ ง่ายกว่า |

---

## 🔧 ฟังก์ชันที่ยังใช้ได้เหมือนเดิม

### **1. Syntax Validation**
```javascript
function validateSyntax(code, requiredKeywords, forbiddenKeywords, language)
```
- ✅ ยังใช้งานได้ปกติ
- ตรวจสอบ required/forbidden keywords
- รองรับหลายภาษา (Python, JavaScript, Java, C++, C)

### **2. Syntax Pattern Matching**
```javascript
function getSyntaxPattern(keyword, language)
```
- ✅ ยังใช้งานได้ปกติ
- สร้าง regex patterns สำหรับแต่ละภาษา
- ใช้ใน `validation_mode: "syntax_check"`

### **3. Web Validation Mode**
```javascript
if (language === "web") {
  // HTML/CSS/JS validation
}
```
- ✅ ยังใช้งานได้ปกติ
- ไม่มีการเปลี่ยนแปลง
- ใช้สำหรับโจทย์ web development

### **4. Database Operations**
```javascript
await supabase.from("submiss").upsert({...})
```
- ✅ ยังใช้งานได้ปกติ
- บันทึกคำตอบของ user
- ไม่มีการเปลี่ยนแปลง

---

## 🎯 Judge0 Status Codes (สำคัญ!)

| Status ID | Description | ความหมาย | การจัดการ |
|-----------|-------------|---------|----------|
| **1** | In Queue | รอคิว | รอต่อ |
| **2** | Processing | กำลังรัน | รอต่อ |
| **3** | ✅ Accepted | ผ่าน! | ส่ง `isCorrect: true` |
| **4** | ❌ Wrong Answer | ผลลัพธ์ผิด | ส่ง `isCorrect: false` |
| **5** | ⏱️ Time Limit Exceeded | Timeout | แสดง error message |
| **6** | 🔨 Compilation Error | Compile ไม่ผ่าน | แสดง compile_output |
| **7-12** | 💥 Runtime Error | Error ตอนรัน | แสดง stderr |
| **13** | ⚠️ Internal Error | ระบบมีปัญหา | แสดง error message |
| **14** | ⚠️ Exec Format Error | Format ผิด | แสดง error message |

---

## 🧪 วิธีทดสอบ

### **1. ทดสอบ Function Test Mode**
```bash
# ส่ง request ไปที่ API
POST /api/check-answer
{
  "challengeId": 1,
  "answer": "function add(a, b) { return a + b; }",
  "language": "javascript"
}
```

### **2. ทดสอบ Standard Mode**
```bash
# ส่ง request ไปที่ API
POST /api/check-answer
{
  "challengeId": 2,
  "answer": "print('Hello World')",
  "language": "python"
}
```

### **3. ทดสอบ Error Cases**
```bash
# Compilation Error
POST /api/check-answer
{
  "challengeId": 3,
  "answer": "print('missing quote)",
  "language": "python"
}

# Runtime Error
POST /api/check-answer
{
  "challengeId": 4,
  "answer": "print(1/0)",
  "language": "python"
}
```

---

## ✅ Checklist

- [x] เปลี่ยน `LANGUAGE_MAP` เป็น Judge0 IDs
- [x] แก้ Function Test Mode ให้ใช้ Judge0
- [x] แก้ Standard Mode ให้ใช้ Judge0
- [x] ลบ polling logic
- [x] เพิ่ม error handling
- [x] ลบ `sleep` function
- [x] ลบ `api_key` logic
- [x] ทดสอบทุก mode

---

## 🚀 ประโยชน์ที่ได้รับ

1. **โค้ดสั้นลง 47%** - จาก ~150 บรรทัด → ~80 บรรทัด
2. **เร็วขึ้น** - ไม่ต้อง polling (ลด network requests)
3. **แม่นยำกว่า** - Judge0 เปรียบเทียบ output ให้
4. **Error handling ดีขึ้น** - แยก error types ได้ละเอียด
5. **ไม่ต้องใช้ API key** - self-hosted
6. **Maintainable** - โค้ดอ่านง่ายขึ้น

---

## 📚 เอกสารเพิ่มเติม

- **Judge0 API Docs:** http://54.162.88.144:2358/docs
- **Integration Guide:** `.agent/JUDGE0_INTEGRATION_GUIDE.md`
- **Comparison Guide:** `.agent/PAIZA_VS_JUDGE0.md`
- **Quick Start:** `.agent/QUICK_START.md`

---

**🎉 Integration เสร็จสมบูรณ์!**
