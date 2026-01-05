import { SubmissionPayload, SubmissionResponse } from '@/types/submission';

/**
 * Submit code for validation
 * @param payload - Submission data including code and challenge info
 * @returns Submission response with validation results
 */
export async function submitCode(payload: SubmissionPayload): Promise<SubmissionResponse> {
  try {
    const res = await fetch('/api/check-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Submission error:', error);
    return {
      isCorrect: false,
      message: 'เกิดข้อผิดพลาดในการส่งคำตอบ',
      syntaxErrors: [{ line: 1, message: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้' }],
    };
  }
}
