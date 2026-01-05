# 🗄️ Supabase Database Setup Guide

> **สำหรับ:** Code Camp Academy Project  
> **Created:** 2026-01-05  
> **Purpose:** คู่มือการสร้าง Supabase database ใหม่

---

## 📋 สารบัญ

1. [สร้าง Supabase Project](#1-สร้าง-supabase-project)
2. [รัน Database Schema](#2-รัน-database-schema)
3. [ตั้งค่า Environment Variables](#3-ตั้งค่า-environment-variables)
4. [ทดสอบการเชื่อมต่อ](#4-ทดสอบการเชื่อมต่อ)
5. [เพิ่มข้อมูลตัวอย่าง](#5-เพิ่มข้อมูลตัวอย่าง)

---

## 1. สร้าง Supabase Project

### **ขั้นตอนที่ 1.1: เข้า Supabase Dashboard**

1. ไปที่ https://supabase.com
2. Sign in ด้วย GitHub account
3. คลิก **"New Project"**

### **ขั้นตอนที่ 1.2: กรอกข้อมูล Project**

```
Project Name: code-camp-academy
Database Password: [สร้าง password ที่แข็งแรง]
Region: Southeast Asia (Singapore) - ap-southeast-1
Pricing Plan: Free
```

4. คลิก **"Create new project"**
5. รอ 2-3 นาทีให้ project สร้างเสร็จ

---

## 2. รัน Database Schema

### **ขั้นตอนที่ 2.1: เปิด SQL Editor**

1. ใน Supabase Dashboard ไปที่ **SQL Editor** (เมนูซ้าย)
2. คลิก **"New query"**

### **ขั้นตอนที่ 2.2: Copy Schema**

1. เปิดไฟล์ `.agent/supabase-schema.sql`
2. Copy โค้ดทั้งหมด
3. Paste ใน SQL Editor

### **ขั้นตอนที่ 2.3: รัน SQL**

1. คลิก **"Run"** (หรือกด Ctrl+Enter)
2. รอให้รันเสร็จ (ประมาณ 5-10 วินาที)
3. ตรวจสอบว่าไม่มี error

**ผลลัพธ์ที่คาดหวัง:**
```
Success. No rows returned
```

---

## 3. ตั้งค่า Environment Variables

### **ขั้นตอนที่ 3.1: หา API Keys**

1. ใน Supabase Dashboard ไปที่ **Settings** → **API**
2. คุณจะเห็น:
   - **Project URL** (เช่น `https://xxxxx.supabase.co`)
   - **anon public** key (ยาวมาก)

### **ขั้นตอนที่ 3.2: อัพเดท .env.local**

1. เปิดไฟล์ `.env.local` ในโปรเจกต์
2. แก้ไขค่าเหล่านี้:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

**ตัวอย่าง:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Save ไฟล์**

### **ขั้นตอนที่ 3.3: Restart Development Server**

```bash
# หยุด server (Ctrl+C)
# เริ่มใหม่
npm run dev
```

---

## 4. ทดสอบการเชื่อมต่อ

### **ขั้นตอนที่ 4.1: ตรวจสอบ Tables**

1. ใน Supabase Dashboard ไปที่ **Table Editor**
2. คุณควรเห็น 2 tables:
   - ✅ `Codecamp` (5 rows)
   - ✅ `submiss` (0 rows)

### **ขั้นตอนที่ 4.2: ทดสอบ Query**

ใน SQL Editor ลอง query:

```sql
SELECT id, title, language FROM "Codecamp" ORDER BY id;
```

**ผลลัพธ์ที่คาดหวัง:**
```
id | title                        | language
---+------------------------------+----------
1  | Hello World                  | javascript
2  | Function: Add Two Numbers    | javascript
3  | Python: Hello World          | python
4  | Java: Hello World            | java
5  | JavaScript: If-Else Statement| javascript
```

### **ขั้นตอนที่ 4.3: ทดสอบจาก Frontend**

1. เปิด http://localhost:3000/test-editor
2. คุณควรเห็น:
   - ✅ โจทย์แสดงขึ้นมา
   - ✅ Code editor มี initial code
   - ✅ ไม่มี console errors

---

## 5. เพิ่มข้อมูลตัวอย่าง

### **ตัวอย่างที่ 1: Challenge แบบ Output Only**

```sql
INSERT INTO public."Codecamp" (
    title,
    description,
    difficulty,
    likes,
    language,
    initial_code,
    expected_output,
    validation_mode
) VALUES (
    'Calculate Sum',
    'เขียนโปรแกรมที่คำนวณผลบวกของ 10 + 20',
    1,
    50,
    'javascript',
    'const a = 10;
const b = 20;
// เขียนโค้ดคำนวณและแสดงผล',
    '30',
    'output_only'
);
```

### **ตัวอย่างที่ 2: Challenge แบบ Function Test**

```sql
INSERT INTO public."Codecamp" (
    title,
    description,
    difficulty,
    likes,
    language,
    initial_code,
    validation_mode,
    validation_script
) VALUES (
    'Multiply Function',
    'สร้างฟังก์ชัน multiply(a, b) ที่คืนค่าผลคูณ',
    2,
    45,
    'javascript',
    'function multiply(a, b) {
  // เขียนโค้ดที่นี่
}',
    'function_test',
    'const results = [];

try {
  const r1 = multiply(2, 3);
  results.push({ test: "multiply(2, 3)", expected: 6, actual: r1, passed: r1 === 6 });
} catch (e) {
  results.push({ test: "multiply(2, 3)", expected: 6, actual: "Error", passed: false });
}

try {
  const r2 = multiply(5, 4);
  results.push({ test: "multiply(5, 4)", expected: 20, actual: r2, passed: r2 === 20 });
} catch (e) {
  results.push({ test: "multiply(5, 4)", expected: 20, actual: "Error", passed: false });
}

console.log(JSON.stringify(results));'
);
```

### **ตัวอย่างที่ 3: Challenge แบบ Syntax Check**

```sql
INSERT INTO public."Codecamp" (
    title,
    description,
    difficulty,
    likes,
    language,
    initial_code,
    expected_output,
    validation_mode,
    required_keywords,
    forbidden_keywords
) VALUES (
    'For Loop Practice',
    'เขียนโปรแกรมที่ใช้ for loop แสดงเลข 1-5',
    3,
    40,
    'javascript',
    '// เขียนโค้ดที่นี่',
    '1
2
3
4
5',
    'syntax_check',
    '["for"]'::jsonb,
    '["while"]'::jsonb
);
```

---

## 📊 โครงสร้าง Database

### **Table: Codecamp**

| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGINT | Primary key (auto-increment) |
| `title` | TEXT | ชื่อโจทย์ |
| `description` | TEXT | คำอธิบายโจทย์ |
| `difficulty` | INTEGER | ระดับความยาก (1-10) |
| `likes` | INTEGER | จำนวน likes |
| `language` | TEXT | ภาษาโปรแกรม (javascript, python, java, etc.) |
| `initial_code` | TEXT | โค้ดเริ่มต้น |
| `expected_output` | TEXT | ผลลัพธ์ที่คาดหวัง |
| `validation_mode` | TEXT | โหมดการตรวจสอบ (output_only, syntax_check, function_test) |
| `validation_script` | TEXT | Script สำหรับ function_test mode |
| `required_keywords` | JSONB | คำสั่งที่ต้องมี (สำหรับ syntax_check) |
| `forbidden_keywords` | JSONB | คำสั่งที่ห้ามใช้ (สำหรับ syntax_check) |
| `protected_ranges` | JSONB | ช่วงโค้ดที่ห้ามแก้ไข |
| `test_cases` | JSONB | Test cases (array of {input, output}) |
| `initial_html` | TEXT | HTML เริ่มต้น (สำหรับ web mode) |
| `initial_css` | TEXT | CSS เริ่มต้น (สำหรับ web mode) |
| `initial_js` | TEXT | JavaScript เริ่มต้น (สำหรับ web mode) |
| `created_at` | TIMESTAMP | วันที่สร้าง |
| `updated_at` | TIMESTAMP | วันที่แก้ไขล่าสุด |

### **Table: submiss**

| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGINT | Primary key (same as challenge id) |
| `ans-user` | TEXT | คำตอบของ user |
| `submitted_at` | TIMESTAMP | วันที่ส่งครั้งแรก |
| `updated_at` | TIMESTAMP | วันที่แก้ไขล่าสุด |

---

## 🔒 Row Level Security (RLS)

Database มี RLS policies ที่อนุญาตให้:
- ✅ **Public read** - ทุกคนอ่านได้
- ✅ **Public write** - ทุกคนเขียนได้ (สำหรับ development)

**⚠️ สำหรับ Production:**
ควรเปลี่ยน policies ให้เข้มงวดกว่านี้ (เช่น ต้อง login ก่อน)

---

## 🧪 การทดสอบ

### **Test 1: ดึงโจทย์ทั้งหมด**
```sql
SELECT id, title, language, difficulty FROM "Codecamp" ORDER BY id;
```

### **Test 2: ดึงโจทย์ตาม ID**
```sql
SELECT * FROM "Codecamp" WHERE id = 1;
```

### **Test 3: เพิ่มคำตอบ**
```sql
INSERT INTO "submiss" (id, "ans-user") 
VALUES (1, 'console.log("My Answer");')
ON CONFLICT (id) DO UPDATE SET "ans-user" = EXCLUDED."ans-user";
```

### **Test 4: ดูสถิติ**
```sql
SELECT * FROM challenge_stats;
```

---

## ❓ Troubleshooting

### **ปัญหา: ไม่สามารถเชื่อมต่อ Supabase**

**แก้ไข:**
1. ตรวจสอบ `.env.local` ว่ามี URL และ Key ถูกต้อง
2. Restart development server
3. ตรวจสอบ internet connection

### **ปัญหา: Tables ไม่ปรากฏ**

**แก้ไข:**
1. รัน schema.sql อีกครั้ง
2. ตรวจสอบ SQL errors ใน console
3. Refresh Table Editor page

### **ปัญหา: RLS Policy Error**

**แก้ไข:**
1. ตรวจสอบว่า RLS policies ถูกสร้างแล้ว
2. ลอง disable RLS ชั่วคราว:
```sql
ALTER TABLE "Codecamp" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "submiss" DISABLE ROW LEVEL SECURITY;
```

---

## 📚 Resources

- **Supabase Docs:** https://supabase.com/docs
- **SQL Editor:** https://supabase.com/dashboard/project/_/sql
- **Table Editor:** https://supabase.com/dashboard/project/_/editor
- **API Docs:** https://supabase.com/dashboard/project/_/api

---

## ✅ Checklist

- [ ] สร้าง Supabase project
- [ ] รัน schema.sql
- [ ] อัพเดท .env.local
- [ ] Restart dev server
- [ ] ทดสอบการเชื่อมต่อ
- [ ] เพิ่มข้อมูลตัวอย่าง
- [ ] ทดสอบ frontend

---

**🎉 เสร็จแล้ว! Database พร้อมใช้งาน**
