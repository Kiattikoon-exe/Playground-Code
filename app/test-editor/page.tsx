'use client';
import { useState, useEffect } from 'react';
import CodeEditor from '@/components/CodeEditor';
import WebEditor from '@/components/WebEditor';
import { createClient } from '@supabase/supabase-js';

export default function TestEditorPage() {
  // ============ State หลัก ============
  const [code, setCode] = useState('public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}');
  const [language, setLanguage] = useState('java');
  const [response, setResponse] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [challengeId, setChallengeId] = useState('1');

  // ============ State สำหรับ Web Mode ============
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');

  // ============ State สำหรับ Challenge Data ============
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

  const [currentTestCase, setCurrentTestCase] = useState(1);
  const [totalTestCases] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  // ============ Template โค้ดสำหรับแต่ละภาษา ============
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
    web: '', // ใช้ WebEditor
  };

  // ============ โหลดข้อมูลจาก Supabase ============
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

        // ตั้งค่าภาษาตามโจทย์
        const challengeLang = data.language || 'java';
        setLanguage(challengeLang);

        // ตั้งค่าโค้ดเริ่มต้น
        if (challengeLang === 'web') {
          setHtmlCode(data.initial_html || '<div id="app">\n  <h1>เริ่มเขียนโค้ดที่นี่</h1>\n</div>');
          setCssCode(data.initial_css || '#app {\n  padding: 20px;\n  font-family: Arial;\n}');
          setJsCode(data.initial_js || '// JavaScript Code\nconsole.log("Ready!");');
        } else {
          setCode(data.initial_code || codeTemplates[challengeLang] || '');
        }
      } else if (error) {
        console.error('Error loading challenge:', error);
      }

      setIsLoading(false);
    }

    loadChallenge();
  }, [challengeId]);

  // ============ ฟังก์ชัน Submit ============
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setResponse(null);

    try {
      const payload = language === 'web'
        ? { challengeId, language: 'web', htmlCode, cssCode, jsCode }
        : { challengeId, answer: code, language };

      const res = await fetch('/api/check-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setResponse({
        isCorrect: false,
        message: 'เกิดข้อผิดพลาดในการส่งคำตอบ',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============ ฟังก์ชัน Reboot ============
  const handleReboot = () => {
    if (language === 'web') {
      setHtmlCode('<div id="app">\n  <h1>Hello World</h1>\n</div>');
      setCssCode('#app { padding: 20px; }');
      setJsCode('console.log("Hello");');
    } else if (codeTemplates[language]) {
      setCode(codeTemplates[language]);
    }
    setResponse(null);
  };

  // ============ ฟังก์ชัน Next ============
  const handleNext = () => {
    if (currentTestCase < totalTestCases) {
      setCurrentTestCase(prev => prev + 1);
      setChallengeId(String(parseInt(challengeId) + 1));
      setResponse(null);
    }
  };

  // ============ ฟังก์ชันเปลี่ยนภาษา ============
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

  // ============ UI ============
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-teal-900 to-teal-500 bg-clip-text text-transparent">Sprouting Tech Code Camp</h1>


        </div>
        <nav className="flex-1 flex justify-center">
          <div className="p-0.5 bg-gradient-to-r from-teal-900 to-teal-500 rounded-full shadow-sm">
            <div className="flex items-center gap-8 px-8 py-2 bg-white rounded-full">
              <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">หน้าหลัก</a>
              <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">หลักสูตรทั้งหมด</a>
              <a href="#" className="text-teal-600 font-semibold">Code Camp</a>
              <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">โปรไฟล์</a>
            </div>
          </div>
        </nav>
        <div className="flex items-center gap-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-teal-500 transition-colors duration-300"></div>
            <div className="absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform duration-300 peer-checked:translate-x-5"></div>
          </label>
          <button className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full hover:from-teal-600 hover:to-teal-700 shadow-md transition-all">
            เข้าสู่ระบบ
          </button>
        </div>


      </header>

      {/* Main Content - 3 Columns */}
      <div className="grid grid-cols-12 gap-0" style={{ height: 'calc(100vh - 73px - 52px)' }}>

        {/* Left Panel - โจทย์ */}
        <div className="col-span-3 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-4 font-bold text-center shadow-md">
            📋 โจทย์
          </div>

          {isLoading ? (
            <div className="p-6 text-center text-gray-400">
              <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-3"></div>
              <p>กำลังโหลด...</p>
            </div>
          ) : (
            <div className="p-6">
              {/* Challenge Info */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">{challengeData.title}</h2>

                {/* แสดงเงื่อนไข Syntax (ถ้ามี) */}
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

                <button className="w-full py-2.5 border-2 border-teal-600 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors mb-3">
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

              {/* คำอธิบาย */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-lg">📝</span>
                  คำอธิบาย
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed border border-gray-200">
                  {challengeData.description}
                </div>
              </div>

              {/* Test Cases */}
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

        {/* Middle Panel - Code Editor */}
        <div className="col-span-6 bg-white border-r border-gray-200 flex flex-col">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-3 flex items-center justify-between shadow-md">
            <span className="font-bold uppercase tracking-wide">{language}</span>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-teal-800 text-white px-4 py-2 rounded-lg cursor-pointer font-semibold hover:bg-teal-900 transition-colors outline-none"
            >
              <option value="web">🌐 HTML/CSS/JS</option>
              <optgroup label="ภาษายอดนิยม">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </optgroup>
              <optgroup label="Web Development">
                <option value="typescript">TypeScript</option>
                <option value="php">PHP</option>
              </optgroup>
              <optgroup label="System Programming">
                <option value="c">C</option>
                <option value="rust">Rust</option>
                <option value="go">Go</option>
              </optgroup>
              <optgroup label="Mobile & Modern">
                <option value="swift">Swift</option>
                <option value="kotlin">Kotlin</option>
              </optgroup>
              <optgroup label="Enterprise">
                <option value="csharp">C#</option>
                <option value="scala">Scala</option>
              </optgroup>
              <optgroup label="Scripting">
                <option value="ruby">Ruby</option>
                <option value="perl">Perl</option>
                <option value="bash">Bash</option>
                <option value="r">R</option>
              </optgroup>
              <optgroup label="Database">
                <option value="sql">SQL</option>
              </optgroup>
            </select>
          </div>

          {language === 'web' ? (
            <>
              <WebEditor
                onCodeChange={({ htmlCode: h, cssCode: c, jsCode: j }) => {
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
              {/* ปุ่ม REBOOT และ SUBMIT สำหรับ Web Mode */}
              <div className="border-t border-gray-200 p-4 flex gap-3 justify-end bg-white">
                <button
                  onClick={handleReboot}
                  className="px-10 py-2.5 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors shadow-sm flex items-center gap-2"
                >
                  🔄 REBOOT
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-10 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 disabled:from-gray-400 disabled:to-gray-400 transition-all shadow-md flex items-center gap-2"
                >
                  {isSubmitting ? '⏳ กำลังตรวจสอบ...' : '✅ SUBMIT'}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 overflow-hidden relative bg-gray-900">
                <div className="absolute inset-0">
                  <CodeEditor
                    defaultCode={code}
                    language={language}
                    onCodeChange={setCode}
                    height="100%"
                  />
                </div>
              </div>
              <div className="border-t border-gray-200 p-4 flex gap-3 justify-end bg-white">
                <button
                  onClick={handleReboot}
                  className="px-10 py-2.5 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors shadow-sm flex items-center gap-2"
                >
                  🔄 REBOOT
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-10 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 disabled:from-gray-400 disabled:to-gray-400 transition-all shadow-md flex items-center gap-2"
                >
                  {isSubmitting ? '⏳ กำลังตรวจสอบ...' : '✅ SUBMIT'}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Panel - ผลลัพธ์ */}
        <div className="col-span-3 bg-white overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-4 font-bold text-center shadow-md">
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
                {/* สถานะ */}
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

                {/* แสดง Syntax Errors (ถ้ามี) */}
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

                {/* Output */}
                {response.actualOutput && (
                  <div>
                    <h3 className="font-bold mb-2 text-sm text-gray-700 flex items-center gap-2">
                      <span>💻</span>
                      ผลลัพธ์ของคุณ:
                    </h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs font-mono whitespace-pre-wrap border-2 border-gray-700 shadow-inner">
                      {response.actualOutput}
                    </div>
                  </div>
                )}

                {/* Expected Output (ถ้าผิด) */}
                {!response.isCorrect && response.expectedOutput && (
                  <div>
                    <h3 className="font-bold mb-2 text-sm text-blue-700 flex items-center gap-2">
                      <span>🎯</span>
                      ผลลัพธ์ที่คาดหวัง:
                    </h3>
                    <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-lg text-xs font-mono whitespace-pre-wrap shadow-sm">
                      {response.expectedOutput}
                    </div>
                  </div>
                )}

                {/* Execution Info */}
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
        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden max-w-4xl shadow-inner">
          <div
            className="bg-gradient-to-r from-teal-500 to-teal-600 h-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${(currentTestCase / totalTestCases) * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-700 font-bold whitespace-nowrap min-w-[80px]">
          {currentTestCase} / {totalTestCases}
        </span>
        <button
          onClick={handleNext}
          disabled={currentTestCase >= totalTestCases}
          className="px-8 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-lg hover:from-gray-300 hover:to-gray-400 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          ถัดไป →
        </button>
      </div>
    </div>
  );
}