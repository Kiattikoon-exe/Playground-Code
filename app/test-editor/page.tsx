'use client';
import { useState, useEffect } from 'react';
import CodeEditor from '@/components/CodeEditor';
import WebEditor from '@/components/WebEditor';
import ResultModal from '@/components/ResultModal';
import { createClient } from '@supabase/supabase-js';
import { useTheme } from 'next-themes';

// ============ 1. ข้อมูลตัวเลือกภาษา ============
const languageOptions = [
  {
    category: "HTML/CSS/JS",
    isSpecial: true,
    items: [{ value: "web", label: "HTML/CSS/JS" }]
  },
  {
    category: "ภาษายอดนิยม",
    items: [
      { value: "javascript", label: "JAVASCRIPT" },
      { value: "python", label: "PYTHON" },
      { value: "java", label: "JAVA" },
      { value: "cpp", label: "C++" },
      { value: "c", label: "C" }
    ]
  },
  {
    category: "WEB DEVELOPMENT",
    items: [
      { value: "typescript", label: "TYPESCRIPT" },
      { value: "php", label: "PHP" }
    ]
  },
  {
    category: "SYSTEM PROGRAMMING",
    items: [
      { value: "rust", label: "RUST" },
      { value: "go", label: "GO" }
    ]
  },
  {
    category: "MOBILE & MODERN",
    items: [
      { value: "swift", label: "SWIFT" },
      { value: "kotlin", label: "KOTLIN" }
    ]
  },
  {
    category: "ENTERPRISE",
    items: [
      { value: "csharp", label: "C#" },
      { value: "scala", label: "SCALA" }
    ]
  },
  {
    category: "SCRIPTING",
    items: [
      { value: "ruby", label: "RUBY" },
      { value: "perl", label: "PERL" },
      { value: "bash", label: "BASH" }
    ]
  },
  {
    category: "DATABASE",
    items: [
      { value: "sql", label: "SQL" }
    ]
  }
];

// ============ 2. Component Dropdown ============
const CustomDropdown = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  let currentLabel = "SELECT LANGUAGE";
  languageOptions.forEach(group => {
    const found = group.items.find(item => item.value === value);
    if (found) currentLabel = found.label;
  });

  return (
    <div className="relative w-full text-left z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full relative flex items-center justify-center text-white font-bold uppercase tracking-wide cursor-pointer outline-none hover:text-teal-100 transition-colors py-2 rounded"
      >
        <span>{currentLabel}</span>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <svg className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
      )}

      {isOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-full bg-white rounded-lg shadow-xl overflow-hidden z-50 max-h-[60vh] overflow-y-auto border border-gray-200 custom-scrollbar">
          <div className="py-2">
            {languageOptions.map((group, groupIndex) => (
              <div key={groupIndex}>
                {!group.isSpecial && (
                  <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase bg-gray-50 border-b border-gray-100 mt-1 first:mt-0">
                    {group.category}
                  </div>
                )}

                {group.items.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      onChange(item.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 border-l-4 transition-all
                      ${value === item.value
                        ? 'bg-blue-600 text-white border-blue-800 font-semibold shadow-inner'
                        : 'text-gray-700 border-transparent hover:bg-blue-50 hover:border-blue-300'
                      }
                    `}
                  >
                    {group.isSpecial && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9-9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    )}
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============ 3. Main Page Component ============
export default function TestEditorPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ============ State ============
  const [code, setCode] = useState('public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}');
  const [language, setLanguage] = useState('java');
  const [response, setResponse] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [challengeId, setChallengeId] = useState('1');

  const [showModal, setShowModal] = useState(false);
  const [showReadOnlyWarning, setShowReadOnlyWarning] = useState(false);
  const [protectedRanges, setProtectedRanges] = useState<any[]>([]);
  const [initialCode, setInitialCode] = useState('');

  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');

  const [challengeData, setChallengeData] = useState<any>({
    title: 'โจทย์',
    description: 'คำอธิบาย',
    difficulty: 5,
    likes: 127,
    testCases: [],
    validation_mode: 'output_only',
    required_keywords: [],
    forbidden_keywords: []
  });

  const [challengeIds, setChallengeIds] = useState<string[]>([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const totalChallenges = challengeIds.length;
  const [isLoading, setIsLoading] = useState(true);

  // ============ Template โค้ด ============
  const codeTemplates: Record<string, string> = {
    javascript: '// เขียนโค้ด JavaScript\nconsole.log("Hello, World!");',
    typescript: '// เขียนโค้ด TypeScript\nconst message: string = "Hello, World!";\nconsole.log(message);',
    python: '# เขียนโค้ด Python\nprint("Hello, World!")',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    csharp: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
    go: 'package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
    ruby: '# เขียนโค้ด Ruby\nputs "Hello, World!"',
    php: '<?php\necho "Hello, World!";\n?>',
    swift: '// เขียนโค้ด Swift\nprint("Hello, World!")',
    kotlin: 'fun main() {\n    println("Hello, World!")\n}',
    rust: 'fn main() {\n    println!("Hello, World!");\n}',
    sql: '-- เขียนคำสั่ง SQL\nSELECT "Hello, World!";',
    bash: '#!/bin/bash\necho "Hello, World!"',
    r: '# เขียนโค้ด R\nprint("Hello, World!")',
    scala: 'object Main extends App {\n  println("Hello, World!")\n}',
    perl: '#!/usr/bin/perl\nprint "Hello, World!\\n";',
    web: '',
  };

  // ============ Load IDs ============
  useEffect(() => {
    async function loadAllChallengeIds() {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data, error } = await supabase
        .from('Codecamp')
        .select('id')
        .order('id', { ascending: true });

      if (data) {
        const ids = data.map(c => String(c.id));
        setChallengeIds(ids);
        const initialId = ids.includes(challengeId) ? challengeId : ids[0] || '1';
        setChallengeId(initialId);
        setCurrentChallengeIndex(ids.indexOf(initialId));
      } else {
        console.error("Error loading challenge IDs:", error);
      }
    }
    loadAllChallengeIds();
  }, []);

  // ============ Load Challenge ============
  useEffect(() => {
    async function loadChallenge() {
      setIsLoading(true);
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from('Codecamp')
        .select('*')
        .eq('id', challengeId)
        .single();

      if (data) {
        setChallengeData({
          title: data.title || 'โจทย์',
          description: data.description || 'คำอธิบาย',
          difficulty: data.difficulty || 5,
          likes: data.likes || 127,
          testCases: data.test_cases || [],
          validation_mode: data.validation_mode || 'output_only',
          required_keywords: data.required_keywords || [],
          forbidden_keywords: data.forbidden_keywords || []
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
      } else if (error) {
        console.error('Error loading challenge:', error);
      }

      setIsLoading(false);
    }

    if (challengeId) {
      loadChallenge();
    }
  }, [challengeId]);

  // ============ Submit ============
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setResponse(null);
    setShowModal(false);

    // --- Enhanced Hardcode Detection ---
    const expectedOutputs = challengeData.testCases.map((tc: any) => tc.output).filter(Boolean);
    let isHardcoded = false;

    if (language !== 'web' && expectedOutputs.length > 0) {
      // Check for literal print statements of the answer
      // Regex looks for: print/log/println followed by optional whitespace, parens, quotes, and the EXACT output
      for (const output of expectedOutputs) {
        // Escape special regex chars in output
        const escapedOutput = output.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // Regex to match: print("OUTPUT") or print('OUTPUT') or print(OUTPUT) for numbers
        // Covers: console.log, print, System.out.println, fmt.Println, etc.
        const regex = new RegExp(`(console\\.log|print|println|fmt\\.Println|System\\.out\\.println)\\s*\\(\\s*(["'\`]?)${escapedOutput}\\2\\s*\\)`, 'i');

        if (regex.test(code)) {
          isHardcoded = true;
          break;
        }
      }
    }

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
    // --- End Hardcode Detection ---

    try {
      const payload = language === 'web'
        ? { challengeId, language: 'web', htmlCode, cssCode, jsCode }
        : { challengeId, answer: code, language, validation_mode: challengeData.validation_mode };

      const res = await fetch('/api/check-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      setResponse(data);
      setShowModal(true);

    } catch (error) {
      console.error('Error:', error);
      setResponse({
        isCorrect: false,
        message: 'เกิดข้อผิดพลาดในการส่งคำตอบ',
        syntaxErrors: [{ line: 1, message: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้" }]
      });
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReboot = () => {
    if (language === 'web') {
      window.location.reload();
    } else {
      setCode(initialCode);
    }
    setResponse(null);
  };

  const handleBack = () => {
    setShowModal(false);
    if (currentChallengeIndex > 0) {
      const newIndex = currentChallengeIndex - 1;
      setCurrentChallengeIndex(newIndex);
      setChallengeId(challengeIds[newIndex]);
      setResponse(null);
    }
  };

  const handleNext = () => {
    setShowModal(false);
    if (currentChallengeIndex < totalChallenges - 1) {
      const newIndex = currentChallengeIndex + 1;
      setCurrentChallengeIndex(newIndex);
      setChallengeId(challengeIds[newIndex]);
      setResponse(null);
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
    setResponse(null);
  };

  return (
    <div className="min-h-screen bg-background relative">

      {/* Modal */}
      <ResultModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isCorrect={response?.isCorrect}
        message={response?.message}
        onNext={handleNext}
      />

      {/* Read-Only Warning Modal */}
      {showReadOnlyWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowReadOnlyWarning(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">ไม่สามารถแก้ไขโจทย์ได้</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                คุณไม่สามารถแก้ไขหรือลบโค้ดที่เป็นส่วนของโจทย์ได้<br />
                กรุณาเพิ่มโค้ดของคุณในช่องว่างที่เตรียมไว้ให้
              </p>
              <button
                onClick={() => setShowReadOnlyWarning(false)}
                className="px-8 py-3 bg-gradient-to-r from-teal-900 to-teal-500 text-white rounded-lg font-semibold hover:from-teal-800 hover:to-teal-400 transition-all shadow-md"
              >
                เข้าใจแล้ว
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-card border-b border-card px-6 py-4 flex items-center justify-between shadow-sm transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-teal rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-teal-900 to-teal-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-teal-600">
            Sprouting Tech Code Camp
          </h1>
        </div>

        <nav className="flex-1 flex justify-center">
          <div className="p-0.5 gradient-teal rounded-full shadow-sm">
            <div className="flex items-center gap-8 px-8 py-2 bg-card rounded-full">
              <a href="#" className=" text-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">หน้าหลัก</a>
              <a href="#" className=" text-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">หลักสูตรทั้งหมด</a>
              <a href="#" className="text-teal-600 dark:text-teal-400 font-semibold">Code Camp</a>
              <a href="#" className=" text-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">โปรไฟล์</a>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          {mounted && (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={theme === 'dark'}
                onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              />
              <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-teal-500 transition-colors duration-300 relative">
                <svg
                  className={`absolute left-1 top-1 w-4 h-4 text-yellow-500 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
                <svg
                  className={`absolute right-1 top-1 w-4 h-4 text-slate-200 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </div>
              <div className="absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform duration-300 peer-checked:translate-x-5 shadow-md"></div>
            </label>
          )}

          <button className="px-6 py-2 gradient-teal text-white rounded-full hover:opacity-90 shadow-md transition-all">
            เข้าสู่ระบบ
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-4 px-4 py-4" style={{ height: 'calc(100vh - 73px - 52px)' }}>

        {/* Left Panel */}
        <div className="col-span-3 bg-card border border-card rounded-xl overflow-hidden shadow-sm flex flex-col transition-colors">
          <div className="sticky top-0 bg-gradient-to-b from-teal-900 to-teal-500 text-white px-6 py-4 font-bold text-center rounded-t-xl">
            📋 โจทย์
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 73px - 52px - 60px)' }}>
            {isLoading ? (
              <div className="p-6 text-center text-gray-400">
                <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                <p>กำลังโหลด...</p>
              </div>
            ) : (
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 ">{challengeData.title}</h2>
                  {challengeData.validation_mode === 'syntax_check' && (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-r p-4 mb-4 shadow-sm">
                      <p className="text-sm font-bold text-yellow-800 mb-2 flex items-center gap-2">
                        <span className="text-xl">⚠️</span>
                        เงื่อนไขพิเศษ
                      </p>
                      {challengeData.required_keywords.length > 0 && (
                        <div className="mb-2">
                          <p className="text-xs text-yellow-700 font-semibold mb-1">✅ ต้องใช้คำสั่ง:</p>
                          <div className="flex flex-wrap gap-1">
                            {challengeData.required_keywords.map((keyword: string, i: number) => (
                              <span key={i} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-mono">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {challengeData.forbidden_keywords.length > 0 && (
                        <div>
                          <p className="text-xs text-yellow-700 font-semibold mb-1">❌ ห้ามใช้คำสั่ง:</p>
                          <div className="flex flex-wrap gap-1">
                            {challengeData.forbidden_keywords.map((keyword: string, i: number) => (
                              <span key={i} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded font-mono">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      ❤️ <strong>{challengeData.likes}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      🏆 <strong>1</strong>
                    </span>
                  </div>
                  <button className="w-30 py-1 border-2 border-teal-600 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors mb-3">
                    + บันทึกโจทย์
                  </button>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xl ${i < challengeData.difficulty ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({challengeData.difficulty}/5)</span>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    คำอธิบาย
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed border border-gray-200">
                    {challengeData.description}
                  </div>
                </div>
                {challengeData.testCases.map((testCase: any, index: number) => (
                  <div key={index} className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                      <span className="text-lg">🧪</span>
                      ตัวอย่าง {index + 1}
                    </h3>
                    <div className="mb-3">
                      <label className="text-xs text-blue-700 font-semibold mb-1 block">📥 ข้อมูลเข้า</label>
                      <div className="bg-white rounded p-3 text-sm text-gray-800 border border-blue-200 font-mono">
                        {testCase.input || 'ไม่มี'}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-blue-700 font-semibold mb-1 block">📤 ข้อมูลออก</label>
                      <div className="bg-white rounded p-3 text-sm text-gray-800 border border-blue-200 font-mono">
                        {testCase.output || 'ไม่มี'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Middle Panel - Code Editor */}
        <div className="col-span-5 bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm flex flex-col relative z-20">
          <div className="bg-gradient-to-b from-teal-900 to-teal-500 text-white px-6 py-2 flex items-center justify-center rounded-t-xl relative z-10">
            <CustomDropdown
              value={language}
              onChange={handleLanguageChange}
            />
          </div>

          {language === 'web' ? (
            <WebEditor
              onCodeChange={({ htmlCode: h, cssCode: c, jsCode: j }: { htmlCode: string, cssCode: string, jsCode: string }) => {
                setHtmlCode(h);
                setCssCode(c);
                setJsCode(j);
              }}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              initialHtml={htmlCode}
              initialCss={cssCode}
              initialJs={jsCode}
            />
          ) : (
            <>
              <div className="flex-1 overflow-hidden relative bg-gray-900">
                <div className="absolute inset-0">
                  <CodeEditor
                    defaultCode={code}
                    language={language}
                    onCodeChange={setCode}
                    height="100%"
                    protectedRanges={protectedRanges}
                    onReadOnlyWarning={() => setShowReadOnlyWarning(true)}
                    errors={response?.syntaxErrors?.map((msg: string, i: number) => ({
                      line: i + 1,
                      message: msg
                    })) || []}
                  />
                </div>
              </div>
              <div className="border-t border-gray-200 p-4 flex gap-3 justify-end bg-white">
                <button
                  onClick={handleReboot}
                  className="px-10 py-2.5 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors shadow-sm"
                >
                  REBOOT
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-10 py-2.5 bg-gradient-to-b from-teal-900 to-teal-500 text-white rounded-lg font-semibold hover:from-teal-800 hover:to-teal-400 disabled:from-gray-400 disabled:to-gray-400 transition-all shadow-md"
                >
                  {isSubmitting ? 'กำลังตรวจสอบ...' : 'SUBMIT'}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Panel - ผลลัพธ์ */}
        <div className="col-span-4 bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="sticky top-0 bg-gradient-to-b from-teal-900 to-teal-500 text-white px-6 py-4 font-bold text-center shadow-md">
            📊 ผลลัพธ์
          </div>

          <div className="p-6">
            {!response ? (
              <div className="text-center text-gray-400 py-16">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-sm font-medium">กด SUBMIT เพื่อดูผลลัพธ์</p>
                <p className="text-xs text-gray-400 mt-2">ระบบจะตรวจสอบโค้ดของคุณ</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`p-5 rounded-xl border-2 shadow-lg ${response.isCorrect
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400'
                  : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-400'
                  }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">
                      {response.isCorrect ? '✅' : '❌'}
                    </span>
                    <div>
                      <p className={`font-bold text-lg ${response.isCorrect ? 'text-green-800' : 'text-red-800'
                        }`}>
                        {response.isCorrect ? 'ถูกต้อง!' : 'ไม่ถูกต้อง'}
                      </p>
                      <p className={`text-sm ${response.isCorrect ? 'text-green-700' : 'text-red-700'
                        }`}>
                        {response.message}
                      </p>
                    </div>
                  </div>
                </div>

                {response.isHardcoded && (
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-r p-4 shadow-md">
                    <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                      <span className="text-xl">🤔</span>
                      คำแนะนำ
                    </h3>
                    <p className="text-sm text-yellow-900">
                      ดูเหมือนว่าคุณอาจจะใส่ผลลัพธ์ลงไปในโค้ดโดยตรง (Hardcode)
                      <br />
                      เป้าหมายของโจทย์คือการเขียนโปรแกรมเพื่อสร้างผลลัพธ์นั้นขึ้นมา
                      ลองใช้วิธีการแก้ปัญหาตามหลักการเขียนโปรแกรมดูนะครับ
                    </p>
                  </div>
                )}

                {response.syntaxErrors && response.syntaxErrors.length > 0 && (
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-r p-4 shadow-md">
                    <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                      <span className="text-xl">⚠️</span>
                      ข้อผิดพลาด Syntax
                    </h3>
                    <ul className="space-y-2">
                      {response.syntaxErrors.map((err: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-yellow-800">
                          <span className="text-red-500 font-bold">•</span>
                          <span>{err}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {response.actualOutput && (
                  <div>
                    <h3 className="font-bold mb-2 text-sm text-gray-700 flex items-center gap-2">
                      ผลลัพธ์ของคุณ:
                    </h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs font-mono whitespace-pre-wrap border-2 border-gray-700 shadow-inner">
                      {response.actualOutput}
                    </div>
                  </div>
                )}

                {!response.isCorrect && response.expectedOutput && (
                  <div>
                    <h3 className="font-bold mb-2 text-sm text-blue-700 flex items-center gap-2">
                      ผลลัพธ์ที่คาดหวัง:
                    </h3>
                    <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-lg text-xs font-mono whitespace-pre-wrap shadow-sm">
                      {response.expectedOutput}
                    </div>
                  </div>
                )}

                {response.executionTime && (
                  <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-4 rounded-lg text-xs space-y-2 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">⏱️ เวลาที่ใช้:</span>
                      <strong className="text-gray-800">{response.executionTime}s</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">🆔 Challenge ID:</span>
                      <strong className="text-gray-800">#{response.challengeId}</strong>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 px-6 py-3 flex items-center gap-4 shadow-lg">
        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden max-w-md shadow-inner">
          <div
            className="bg-gradient-to-r from-teal-900 to-teal-500 h-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: totalChallenges > 0 ? `${((currentChallengeIndex + 1) / totalChallenges) * 100}%` : '0%' }}
          />
        </div>
        <span className="text-sm text-gray-700 font-bold whitespace-nowrap min-w-[80px]">
          {currentChallengeIndex + 1} / {totalChallenges}
        </span>

        <button
          onClick={handleBack}
          disabled={currentChallengeIndex <= 0}
          className="px-8 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          ← กลับ
        </button>
      </div>
    </div>
  );
}