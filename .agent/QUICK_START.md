# 📋 Quick Start Guide - Judge0 Integration

## ✅ สิ่งที่เตรียมไว้ให้แล้ว

### 1. **Git Branch**
- ✅ สร้าง branch ใหม่: `feature/integrate-judge0-api`
- ✅ แยกออกจาก branch เดิม (ไม่กระทบของเดิม)

### 2. **เอกสารที่ควรอ่าน**

| ไฟล์ | จุดประสงค์ | ควรอ่าน |
|------|-----------|---------|
| **`JUDGE0_INTEGRATION_GUIDE.md`** | คู่มือหลัก - API docs, language mapping, examples | ⭐⭐⭐ |
| **`PAIZA_VS_JUDGE0.md`** | เปรียบเทียบ Paiza.IO vs Judge0 แบบละเอียด | ⭐⭐⭐ |
| **`judge0-api-examples.js`** | ตัวอย่างโค้ดทดสอบ Judge0 API (8 scenarios) | ⭐⭐ |

---

## 🎯 ส่วนที่ต้องแก้ในโค้ด

### **ไฟล์หลัก: `app/api/check-answer/route.js`**

#### **1. Language Mapping (บรรทัด 6-27)**
```javascript
// ❌ เดิม (Paiza.IO)
const LANGUAGE_MAP = {
  javascript: "javascript",
  python: "python3",
  java: "java",
  cpp: "cpp",
  // ...
};

// ✅ ใหม่ (Judge0)
const LANGUAGE_MAP = {
  javascript: 63,  // JavaScript (Node.js 12.14.0)
  python: 71,      // Python (3.8.1)
  java: 62,        // Java (OpenJDK 13.0.1)
  cpp: 54,         // C++ (GCC 9.2.0)
  c: 50,           // C (GCC 9.2.0)
  typescript: 74,  // TypeScript (3.7.4)
  php: 68,         // PHP (7.4.1)
  rust: 73,        // Rust (1.40.0)
  go: 60,          // Go (1.13.5)
  ruby: 72,        // Ruby (2.7.0)
  bash: 46,        // Bash (5.0.0)
  csharp: 51,      // C# (Mono 6.6.0.161)
};
```

---

#### **2. Function Test Mode (บรรทัด 155-348)**

**ส่วนที่ต้องแก้:**
- บรรทัด 167: เปลี่ยน `paizaLang` เป็น `languageId`
- บรรทัด 173, 185, 197, 209: เปลี่ยนจาก string → number
- บรรทัด 232-274: เปลี่ยน API call จาก Paiza → Judge0

**ตัวอย่างการแก้:**
```javascript
// ❌ เดิม (บรรทัด 232-274)
const createResponse = await fetch("https://api.paiza.io/runners/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    source_code: fullCode,
    language: paizaLang,  // string
    input: "",
    api_key: process.env.PAIZA_API_KEY || "guest",
  }),
});

// ... polling logic ...

// ✅ ใหม่ (Judge0)
const response = await fetch(
  "http://54.162.88.144:2358/submissions?base64_encoded=false&wait=true",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source_code: fullCode,
      language_id: languageId,  // number
      stdin: "",
    }),
  }
);

const result = await response.json();
// ไม่ต้อง polling! (เพราะใช้ wait=true)
```

---

#### **3. Standard Mode (บรรทัด 475-543)**

**ส่วนที่ต้องแก้:**
- บรรทัด 481-489: เปลี่ยน request body
- บรรทัด 492-533: เปลี่ยน API call และ polling logic
- บรรทัด 547-555: เปลี่ยนการตรวจสอบ compilation error

**ตัวอย่างการแก้:**
```javascript
// ❌ เดิม (บรรทัด 492-533)
const createResponse = await fetch("https://api.paiza.io/runners/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    source_code: answer,
    language: paizaLanguage,
    input: "",
    api_key: process.env.PAIZA_API_KEY || "guest",
  }),
});

// ... polling logic ...

// ✅ ใหม่ (Judge0)
const response = await fetch(
  "http://54.162.88.144:2358/submissions?base64_encoded=false&wait=true",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source_code: answer,
      language_id: LANGUAGE_MAP[language],
      stdin: "",
      expected_output: expectedOutputTrimmed,  // ให้ Judge0 เปรียบเทียบให้
    }),
  }
);

const result = await response.json();

// ตรวจสอบผลลัพธ์
if (result.status.id === 6) {
  // Compilation Error
  return NextResponse.json({
    isCorrect: false,
    message: "เกิดข้อผิดพลาดในการ Compile",
    details: result.compile_output,
    actualOutput: "",
    timestamp: new Date().toISOString(),
  });
}

const isCorrect = result.status.id === 3; // 3 = Accepted
```

---

#### **4. Status Checking (บรรทัด 547-555, 590-598)**

**เปลี่ยนจาก:**
```javascript
// ❌ Paiza.IO
if (result.build_result === "failure") {
  // Compilation error
}

const isCorrect = actualOutput === expectedOutputTrimmed;
```

**เป็น:**
```javascript
// ✅ Judge0
if (result.status.id === 6) {
  // Compilation error
}

if (result.status.id === 5) {
  // Time Limit Exceeded
}

if (result.status.id >= 7 && result.status.id <= 12) {
  // Runtime Error
}

const isCorrect = result.status.id === 3; // Accepted
```

---

## 🧪 วิธีทดสอบก่อนเริ่มเขียน

### **1. ทดสอบ Judge0 API ด้วย curl**

```bash
# ทดสอบ Python
curl -X POST "http://54.162.88.144:2358/submissions?base64_encoded=false&wait=true" \
  -H "Content-Type: application/json" \
  -d '{
    "source_code": "print(\"Hello Judge0\")",
    "language_id": 71
  }'

# ทดสอบ JavaScript
curl -X POST "http://54.162.88.144:2358/submissions?base64_encoded=false&wait=true" \
  -H "Content-Type: application/json" \
  -d '{
    "source_code": "console.log(\"Hello Judge0\")",
    "language_id": 63
  }'

# ดูรายการภาษาทั้งหมด
curl http://54.162.88.144:2358/languages
```

### **2. ทดสอบด้วย Node.js**

```bash
# รันไฟล์ตัวอย่าง
node .agent/judge0-api-examples.js
```

---

## 📝 Checklist ก่อนเริ่มเขียน

- [ ] อ่าน `JUDGE0_INTEGRATION_GUIDE.md` จบ
- [ ] อ่าน `PAIZA_VS_JUDGE0.md` เพื่อเข้าใจความแตกต่าง
- [ ] ทดสอบ Judge0 API ด้วย curl หรือ Postman
- [ ] ศึกษาโครงสร้างโค้ดใน `app/api/check-answer/route.js`
- [ ] เข้าใจ 3 modes: `function_test`, `syntax_check`, `output_only`
- [ ] เข้าใจ Judge0 status codes (1-14)
- [ ] เข้าใจ Judge0 language IDs

---

## 🚀 แนวทางการเขียน (แนะนำ)

### **Phase 1: เริ่มจาก Language Mapping**
1. แก้ `LANGUAGE_MAP` ให้ใช้ Judge0 language IDs
2. ทดสอบว่า mapping ถูกต้อง

### **Phase 2: แก้ Standard Mode ก่อน**
1. แก้บรรทัด 475-543 (Standard Mode)
2. ทดสอบด้วยโจทย์ง่ายๆ (เช่น "Hello World")
3. ทดสอบทุกภาษา (JavaScript, Python, Java, C++)

### **Phase 3: แก้ Function Test Mode**
1. แก้บรรทัด 155-348 (Function Test)
2. ทดสอบด้วยโจทย์ที่มี `validation_mode = "function_test"`
3. ตรวจสอบว่า test cases ผ่านหมด

### **Phase 4: Error Handling**
1. จัดการ Compilation Error (status.id = 6)
2. จัดการ Runtime Error (status.id = 7-12)
3. จัดการ Time Limit Exceeded (status.id = 5)
4. จัดการ Internal Error (status.id = 13)

### **Phase 5: Cleanup**
1. ลบโค้ดที่เกี่ยวกับ Paiza.IO
2. ลบ `PAIZA_API_KEY` จาก environment variables
3. อัพเดท comments ในโค้ด
4. ทดสอบทุกอย่างอีกครั้ง

---

## 💡 Tips สำหรับการเขียน

1. **ใช้ `wait=true`** เพื่อไม่ต้อง polling (ง่ายกว่า)
2. **ใช้ `expected_output`** ให้ Judge0 เปรียบเทียบให้ (แม่นยำกว่า)
3. **ตรวจสอบ `status.id`** แทน `build_result` และ `exit_code`
4. **ลบ `api_key`** ออกจาก request (ไม่ต้องใช้สำหรับ self-hosted)
5. **ทดสอบทีละส่วน** อย่าแก้ทั้งหมดพร้อมกัน
6. **เก็บ log** ไว้ดู (console.log) เพื่อ debug

---

## 🔗 Resources

- **Judge0 API Docs:** http://54.162.88.144:2358/docs
- **Judge0 Dummy Client:** http://54.162.88.144:2358/dummy-client.html
- **Current API Route:** `app/api/check-answer/route.js`
- **Integration Guide:** `.agent/JUDGE0_INTEGRATION_GUIDE.md`
- **Comparison Guide:** `.agent/PAIZA_VS_JUDGE0.md`
- **Examples:** `.agent/judge0-api-examples.js`

---

## 🎉 พร้อมแล้ว!

คุณมีทุกอย่างที่ต้องการแล้ว:
- ✅ Branch ใหม่ที่ไม่กระทบของเดิม
- ✅ เอกสารครบถ้วน
- ✅ ตัวอย่างโค้ด
- ✅ แนวทางการเขียน

**ขอให้โชคดีกับการเขียนโค้ด! 🚀**

หากติดปัญหาตรงไหน สามารถถามได้เลยครับ
