'use client';
import { useState } from 'react';
import { SubmissionResponse } from '@/types/submission';
import { ChallengeData } from '@/types/challenge';
import { submitCode } from '@/lib/api/submissions';
import { detectHardcodedOutput } from '@/utils/codeValidation';

export function useSubmission() {
  const [response, setResponse] = useState<SubmissionResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (
    challengeId: string,
    language: string,
    code: string,
    challengeData: ChallengeData,
    htmlCode?: string,
    cssCode?: string,
    jsCode?: string
  ) => {
    setIsSubmitting(true);
    setResponse(null);
    setShowModal(false);

    // Check for hardcoded output
    const isHardcoded = detectHardcodedOutput(
      code,
      challengeData.testCases,
      language
    );

    if (isHardcoded) {
      setResponse({
        isCorrect: false,
        message: 'ตรวจพบการ Hardcode ผลลัพธ์ (กรุณาใช้การคำนวณหรือฟังก์ชัน)',
        isHardcoded: true,
      });
      setShowModal(true);
      setIsSubmitting(false);
      return;
    }

    // Submit code
    const payload = language === 'web'
      ? { challengeId, language: 'web', htmlCode, cssCode, jsCode }
      : { 
          challengeId, 
          answer: code, 
          language, 
          validation_mode: challengeData.validation_mode 
        };

    const data = await submitCode(payload);
    setResponse(data);
    setShowModal(true);
    setIsSubmitting(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const resetResponse = () => {
    setResponse(null);
  };

  return {
    response,
    isSubmitting,
    showModal,
    handleSubmit,
    closeModal,
    resetResponse,
  };
}
