import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // นับจำนวนโจทย์ทั้งหมด
    const { count, error: countError } = await supabase
      .from('Codecamp')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      return NextResponse.json(
        { error: countError.message },
        { status: 500 }
      );
    }

    // ดึงข้อมูลโจทย์ทั้งหมด
    const { data: problems, error: fetchError } = await supabase
      .from('Codecamp')
      .select('id, title, language, difficulty, description')
      .order('id', { ascending: true });

    if (fetchError) {
      return NextResponse.json(
        { error: fetchError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      total: count,
      problems: problems || [],
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
