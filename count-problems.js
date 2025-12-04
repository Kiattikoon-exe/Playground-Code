// สคริปต์สำหรับนับจำนวนโจทย์ในระบบ
import { createClient } from '@supabase/supabase-js';

// ใช้ค่าจาก environment variables (ต้องตั้งค่าไว้ใน .env.local)
const SUPABASE_URL = 'https://aqvxdxqnqvbvfcwgkqjt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdnhkeHFucXZidmZjd2drcWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1MTU4NTUsImV4cCI6MjA0ODA5MTg1NX0.Fy0_WrC_iFqMZdYRmNqWWFjWXjJlJMPzpXBnFYlLvxc';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function countProblems() {
  try {
    console.log('🔍 กำลังตรวจสอบจำนวนโจทย์ในระบบ...\n');

    // นับจำนวนโจทย์ทั้งหมด
    const { count, error } = await supabase
      .from('Codecamp')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('❌ เกิดข้อผิดพลาด:', error.message);
      return;
    }

    console.log('📊 ผลลัพธ์:');
    console.log('━'.repeat(50));
    console.log(`📝 จำนวนโจทย์ทั้งหมดในระบบ: ${count} ข้อ`);
    console.log('━'.repeat(50));

    // ดึงข้อมูลโจทย์ทั้งหมดเพื่อแสดงรายละเอียด
    const { data: problems, error: fetchError } = await supabase
      .from('Codecamp')
      .select('id, title, language, difficulty')
      .order('id', { ascending: true });

    if (fetchError) {
      console.error('❌ เกิดข้อผิดพลาดในการดึงข้อมูล:', fetchError.message);
      return;
    }

    if (problems && problems.length > 0) {
      console.log('\n📋 รายการโจทย์ทั้งหมด:\n');
      problems.forEach((problem, index) => {
        const stars = '⭐'.repeat(problem.difficulty || 0);
        console.log(`${index + 1}. [ID: ${problem.id}] ${problem.title}`);
        console.log(`   ภาษา: ${problem.language || 'N/A'} | ความยาก: ${stars} (${problem.difficulty}/5)`);
        console.log('');
      });
    }

  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาดที่ไม่คาดคิด:', err);
  }
}

countProblems();
