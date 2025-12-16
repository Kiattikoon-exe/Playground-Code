'use client';
import { useState, useEffect } from 'react';
import { ChallengeData } from '@/types/challenge';
import { fetchAllChallengeIds, fetchChallengeById } from '@/lib/api/challenges';
import { codeTemplates } from '@/constants/codeTemplates';

export function useChallenges(initialChallengeId: string = '1') {
  const [challengeIds, setChallengeIds] = useState<string[]>([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challengeId, setChallengeId] = useState(initialChallengeId);
  const [isLoading, setIsLoading] = useState(true);
  
  const [challengeData, setChallengeData] = useState<ChallengeData>({
    title: 'โจทย์',
    description: 'คำอธิบาย',
    difficulty: 5,
    likes: 127,
    testCases: [],
    validation_mode: 'output_only',
    required_keywords: [],
    forbidden_keywords: [],
  });

  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [initialCode, setInitialCode] = useState('');
  const [protectedRanges, setProtectedRanges] = useState<any[]>([]);

  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');

  // Load all challenge IDs
  useEffect(() => {
    async function loadAllChallengeIds() {
      const ids = await fetchAllChallengeIds();
      if (ids.length > 0) {
        setChallengeIds(ids);
        const initialId = ids.includes(challengeId) ? challengeId : ids[0];
        setChallengeId(initialId);
        setCurrentChallengeIndex(ids.indexOf(initialId));
      }
    }
    loadAllChallengeIds();
  }, []);

  // Load challenge data when challengeId changes
  useEffect(() => {
    async function loadChallenge() {
      if (!challengeId) return;
      
      setIsLoading(true);
      const data = await fetchChallengeById(challengeId);

      if (data) {
        setChallengeData({
          title: data.title || 'โจทย์',
          description: data.description || 'คำอธิบาย',
          difficulty: data.difficulty || 5,
          likes: data.likes || 127,
          testCases: data.testCases || [],
          validation_mode: data.validation_mode || 'output_only',
          required_keywords: data.required_keywords || [],
          forbidden_keywords: data.forbidden_keywords || [],
        });

        const challengeLang = data.language || 'java';
        setLanguage(challengeLang);

        if (challengeLang === 'web') {
          setHtmlCode(data.initial_html || '<div id="app">\n  <h1>เริ่มเขียนโค้ดที่นี่</h1>\n</div>');
          setCssCode(data.initial_css || '#app {\n  padding: 20px;\n  font-family: Arial;\n}');
          setJsCode(data.initial_js || '// JavaScript Code\nconsole.log("Ready!");');
        } else {
          const initialCodeFromDB = data.initial_code || codeTemplates[challengeLang] || '';
          setCode(initialCodeFromDB);
          setInitialCode(initialCodeFromDB);

          if (data.protected_ranges && data.protected_ranges.length > 0) {
            setProtectedRanges(data.protected_ranges);
          } else {
            setProtectedRanges([]);
          }
        }
      }

      setIsLoading(false);
    }

    loadChallenge();
  }, [challengeId]);

  const handleNext = () => {
    if (currentChallengeIndex < challengeIds.length - 1) {
      const newIndex = currentChallengeIndex + 1;
      setCurrentChallengeIndex(newIndex);
      setTimeout(() => {
        setChallengeId(challengeIds[newIndex]);
      }, 0);
    }
  };

  const handleBack = () => {
    if (currentChallengeIndex > 0) {
      const newIndex = currentChallengeIndex - 1;
      setCurrentChallengeIndex(newIndex);
      setTimeout(() => {
        setChallengeId(challengeIds[newIndex]);
      }, 0);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    if (newLanguage === 'web') {
      setHtmlCode('<div id="app">\n  <h1>Hello World</h1>\n</div>');
      setCssCode('#app { padding: 20px; }');
      setJsCode('console.log("Hello");');
    } else if (codeTemplates[newLanguage]) {
      setCode(codeTemplates[newLanguage]);
    }
  };

  const handleReboot = () => {
    if (language === 'web') {
      window.location.reload();
    } else {
      setCode(initialCode);
    }
  };

  return {
    // Challenge data
    challengeData,
    challengeId,
    challengeIds,
    currentChallengeIndex,
    totalChallenges: challengeIds.length,
    isLoading,

    // Code state
    language,
    code,
    setCode,
    initialCode,
    protectedRanges,

    // Web editor state
    htmlCode,
    setHtmlCode,
    cssCode,
    setCssCode,
    jsCode,
    setJsCode,

    // Actions
    handleNext,
    handleBack,
    handleLanguageChange,
    handleReboot,
  };
}
