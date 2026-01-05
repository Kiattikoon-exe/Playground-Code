# 📚 Judge0 Integration Documentation

> **Branch:** `feature/integrate-judge0-api`  
> **Created:** 2026-01-05  
> **Purpose:** เปลี่ยนจาก Paiza.IO → Judge0 API

---

## 📖 เอกสารทั้งหมด

| ไฟล์ | ขนาด | จุดประสงค์ | ควรอ่าน |
|------|------|-----------|---------|
| **[QUICK_START.md](./QUICK_START.md)** | 9.9 KB | 🚀 เริ่มต้นที่นี่! แนวทางการเขียนทีละขั้นตอน | ⭐⭐⭐ |
| **[JUDGE0_INTEGRATION_GUIDE.md](./JUDGE0_INTEGRATION_GUIDE.md)** | 9.8 KB | 📘 คู่มือหลัก - API docs, language mapping, examples | ⭐⭐⭐ |
| **[PAIZA_VS_JUDGE0.md](./PAIZA_VS_JUDGE0.md)** | 8.7 KB | 🔄 เปรียบเทียบ Paiza.IO vs Judge0 แบบละเอียด | ⭐⭐⭐ |
| **[judge0-api-examples.js](./judge0-api-examples.js)** | 8.8 KB | 🧪 ตัวอย่างโค้ดทดสอบ Judge0 API (8 scenarios) | ⭐⭐ |

---

## 🎯 แนะนำให้อ่านตามลำดับ

### **1. เริ่มต้น (5 นาที)**
อ่าน **[QUICK_START.md](./QUICK_START.md)** เพื่อเข้าใจภาพรวมและแนวทางการทำงาน

### **2. ทำความเข้าใจ API (10 นาที)**
อ่าน **[JUDGE0_INTEGRATION_GUIDE.md](./JUDGE0_INTEGRATION_GUIDE.md)** เพื่อเข้าใจ:
- Judge0 API endpoints
- Language IDs mapping
- Status codes
- Request/Response format

### **3. เปรียบเทียบความแตกต่าง (10 นาที)**
อ่าน **[PAIZA_VS_JUDGE0.md](./PAIZA_VS_JUDGE0.md)** เพื่อเข้าใจ:
- ความแตกต่างระหว่าง Paiza.IO และ Judge0
- ตัวอย่างการ migrate โค้ด
- Best practices

### **4. ทดสอบ API (5 นาที)**
รัน **[judge0-api-examples.js](./judge0-api-examples.js)** เพื่อทดสอบ Judge0 API:
```bash
node .agent/judge0-api-examples.js
```

---

## 🔧 ไฟล์ที่ต้องแก้ไข

### **ไฟล์หลัก**
- **`app/api/check-answer/route.js`** (637 บรรทัด)
  - บรรทัด 6-27: Language mapping
  - บรรทัด 155-348: Function Test Mode
  - บรรทัด 475-543: Standard Mode

---

## 📊 สรุปการเปลี่ยนแปลง

### **ก่อน (Paiza.IO)**
```javascript
// Language: String
language: "python3"

// API: Polling required
POST https://api.paiza.io/runners/create
GET https://api.paiza.io/runners/get_details?id={id}

// Status: Custom format
status: "completed"
build_result: "success"
exit_code: 0
```

### **หลัง (Judge0)**
```javascript
// Language: Number
language_id: 71

// API: Wait mode (no polling)
POST http://54.162.88.144:2358/submissions?wait=true

// Status: Standard format
status: {
  id: 3,
  description: "Accepted"
}
```

---

## ✅ Checklist

### **เตรียมความพร้อม**
- [x] สร้าง branch: `feature/integrate-judge0-api`
- [x] อ่านเอกสารทั้งหมด
- [ ] ทดสอบ Judge0 API ด้วย curl/Postman
- [ ] ทดสอบด้วย `judge0-api-examples.js`

### **แก้ไขโค้ด**
- [ ] แก้ `LANGUAGE_MAP` (บรรทัด 6-27)
- [ ] แก้ Function Test Mode (บรรทัด 155-348)
- [ ] แก้ Standard Mode (บรรทัด 475-543)
- [ ] แก้ Error Handling
- [ ] ลบโค้ด Paiza.IO

### **ทดสอบ**
- [ ] ทดสอบ Standard Mode (ทุกภาษา)
- [ ] ทดสอบ Function Test Mode
- [ ] ทดสอบ Syntax Check Mode
- [ ] ทดสอบ Error Cases

### **Cleanup**
- [ ] ลบ `PAIZA_API_KEY` จาก environment
- [ ] อัพเดท comments
- [ ] Commit และ Push

---

## 🔗 Quick Links

- **Judge0 API Docs:** http://54.162.88.144:2358/docs
- **Judge0 Dummy Client:** http://54.162.88.144:2358/dummy-client.html
- **Judge0 GitHub:** https://github.com/judge0/judge0
- **Current API Route:** `app/api/check-answer/route.js`

---

## 💡 Tips

1. **อ่านเอกสารก่อนเขียนโค้ด** - จะช่วยให้เข้าใจภาพรวม
2. **ทดสอบ API ก่อน** - ใช้ curl หรือ Postman
3. **แก้ทีละส่วน** - อย่าแก้ทั้งหมดพร้อมกัน
4. **ทดสอบบ่อยๆ** - หลังจากแก้แต่ละส่วน
5. **เก็บ log ไว้** - console.log เพื่อ debug

---

## 🎉 พร้อมแล้ว!

เริ่มต้นได้เลยจาก **[QUICK_START.md](./QUICK_START.md)**

**Good luck! 🚀**
