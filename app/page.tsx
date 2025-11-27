import { redirect } from 'next/navigation';

export default function HomePage() {
  // สั่งให้ Redirect ไปที่หน้านั้นทันที
  // หมายเหตุ: ใส่ ID ของโจทย์สักข้อนึง เช่น '1' หรือไอดีที่มีใน database
  redirect('/test-editor/'); 
}