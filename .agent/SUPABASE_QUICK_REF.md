# 📋 Supabase Database - Quick Reference

> **สำหรับ:** Code Camp Academy  
> **Created:** 2026-01-05

---

## 🚀 Quick Start (5 นาที)

### **1. สร้าง Supabase Project**
```
1. ไปที่ https://supabase.com
2. Sign in → New Project
3. Project Name: code-camp-academy
4. Region: Southeast Asia (Singapore)
5. Create new project
```

### **2. รัน Schema**
```
1. SQL Editor → New query
2. Copy จาก .agent/supabase-schema.sql
3. Paste และ Run
```

### **3. อัพเดท .env.local**
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

### **4. Restart Server**
```bash
npm run dev
```

---

## 📊 Database Schema

### **Table: Codecamp** (โจทย์)
```sql
CREATE TABLE "Codecamp" (
    id BIGINT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty INTEGER (1-10),
    language TEXT,
    initial_code TEXT,
    expected_output TEXT,
    validation_mode TEXT,
    validation_script TEXT,
    required_keywords JSONB,
    forbidden_keywords JSONB,
    protected_ranges JSONB,
    test_cases JSONB
);
```

### **Table: submiss** (คำตอบ)
```sql
CREATE TABLE "submiss" (
    id BIGINT PRIMARY KEY,
    "ans-user" TEXT,
    submitted_at TIMESTAMP
);
```

---

## 🎯 Validation Modes

| Mode | Description | ใช้เมื่อ |
|------|-------------|---------|
| **output_only** | เปรียบเทียบ output | โจทย์ทั่วไป |
| **syntax_check** | ตรวจสอบ syntax | ฝึก syntax |
| **function_test** | ทดสอบฟังก์ชัน | Codewars style |

---

## 📝 ตัวอย่าง Challenge

### **Output Only Mode**
```sql
INSERT INTO "Codecamp" (
    title, description, language,
    initial_code, expected_output,
    validation_mode
) VALUES (
    'Hello World',
    'แสดงข้อความ Hello World',
    'javascript',
    'console.log("Hello World");',
    'Hello World',
    'output_only'
);
```

### **Function Test Mode**
```sql
INSERT INTO "Codecamp" (
    title, description, language,
    initial_code, validation_mode,
    validation_script
) VALUES (
    'Add Function',
    'สร้างฟังก์ชัน add(a, b)',
    'javascript',
    'function add(a, b) { }',
    'function_test',
    'const results = [];
results.push({ 
    test: "add(1,2)", 
    expected: 3, 
    actual: add(1,2), 
    passed: add(1,2) === 3 
});
console.log(JSON.stringify(results));'
);
```

### **Syntax Check Mode**
```sql
INSERT INTO "Codecamp" (
    title, description, language,
    initial_code, expected_output,
    validation_mode,
    required_keywords,
    forbidden_keywords
) VALUES (
    'If-Else Practice',
    'ใช้ if-else',
    'javascript',
    '// เขียนโค้ด',
    'Result',
    'syntax_check',
    '["if", "else"]'::jsonb,
    '["ternary"]'::jsonb
);
```

---

## 🔧 Useful Queries

### **ดูโจทย์ทั้งหมด**
```sql
SELECT id, title, language, difficulty 
FROM "Codecamp" 
ORDER BY id;
```

### **ดูโจทย์ตาม Language**
```sql
SELECT * FROM "Codecamp" 
WHERE language = 'javascript';
```

### **ดูคำตอบของ User**
```sql
SELECT c.title, s."ans-user" 
FROM "Codecamp" c
LEFT JOIN "submiss" s ON c.id = s.id
WHERE s.id IS NOT NULL;
```

### **สถิติ Challenges**
```sql
SELECT * FROM challenge_stats;
```

---

## 🗂️ ไฟล์ที่เกี่ยวข้อง

| ไฟล์ | จุดประสงค์ |
|------|-----------|
| **supabase-schema.sql** | SQL schema ทั้งหมด |
| **SUPABASE_SETUP.md** | คู่มือการตั้งค่าแบบละเอียด |
| **SUPABASE_QUICK_REF.md** | Quick reference (ไฟล์นี้) |

---

## ⚡ Quick Commands

### **Reset Database**
```sql
DROP TABLE IF EXISTS "submiss" CASCADE;
DROP TABLE IF EXISTS "Codecamp" CASCADE;
-- จากนั้นรัน schema.sql ใหม่
```

### **Clear Submissions**
```sql
DELETE FROM "submiss";
```

### **Add Sample Data**
```sql
-- ดูใน supabase-schema.sql
-- มี sample data 5 challenges
```

---

## 🔗 Links

- **Setup Guide:** `.agent/SUPABASE_SETUP.md`
- **Schema File:** `.agent/supabase-schema.sql`
- **Supabase Dashboard:** https://supabase.com/dashboard

---

**💡 Tip:** Bookmark ไฟล์นี้เพื่อใช้อ้างอิงด่วน!
