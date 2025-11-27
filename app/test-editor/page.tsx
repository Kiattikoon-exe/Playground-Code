'use client';
import { useState, useEffect } from 'react';
import CodeEditor from '@/components/CodeEditor';

export default function TestEditorPage() {
  // State สำหรับโหมด Backend (ของเดิม)
  const [code, setCode] = useState('// เขียนโค้ด JavaScript ของคุณที่นี่\nconsole.log("hello");');
  const [language, setLanguage] = useState('javascript');
  const [response, setResponse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [challengeId, setChallengeId] = useState('1');

  // State ใหม่สำหรับโหมด Web Playground
  const [mode, setMode] = useState('backend'); // 'backend' หรือ 'web'
  const [htmlCode, setHtmlCode] = useState('<h1>My First Webpage</h1>\n<p>Hello, World!</p>');
  const [cssCode, setCssCode] = useState('body {\n  font-family: sans-serif;\n  padding: 20px;\n}');
  const [jsCode, setJsCode] = useState('console.log("Page loaded!");');
  const [webOutput, setWebOutput] = useState('');

  // ฟังก์ชันสำหรับสร้างและอัปเดตผลลัพธ์ใน iframe
  const updateWebOutput = () => {
    const combinedHtml = `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}<\/script>
        </body>
      </html>
    `;
    setWebOutput(combinedHtml);
  };

  // อัปเดตผลลัพธ์ของ Web Playground ทุกครั้งที่โค้ดเปลี่ยน
  useEffect(() => {
    if (mode === 'web') {
      const timeoutId = setTimeout(() => {
        updateWebOutput();
      }, 500);

      const handleMessage = (event) => {
        if (event.data && event.data.type === 'validation_result') {
          setResponse(event.data.payload);
          setIsSubmitting(false);
        } else if (event.data && event.data.type === 'validation_error') {
          setResponse({
            isCorrect: false,
            message: `เกิดข้อผิดพลาดใน Validation Script: ${event.data.message}`,
            actualOutput: event.data.message,
            timestamp: new Date().toISOString(),
          });
          setIsSubmitting(false);
        }
      };
      window.addEventListener('message', handleMessage);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [mode, htmlCode, cssCode, jsCode]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setResponse(null);

    console.log('=== ข้อมูลที่จะส่งไป Backend ===');
    console.log('Challenge ID:', challengeId);
    console.log('Mode:', mode);

    let payload = {
      challengeId: challengeId,
      language: mode === 'web' ? 'web' : language,
    };

    if (mode === 'web') {
      // แก้ไข: ส่งโค้ดทั้งหมดไปให้ Backend
      payload = { 
        ...payload, 
        htmlCode, 
        cssCode, 
        jsCode,
        answer: `HTML:\n${htmlCode}\n\nCSS:\n${cssCode}\n\nJS:\n${jsCode}` // เพิ่ม answer เพื่อให้บันทึกใน DB
      };
      console.log('HTML Code:', htmlCode);
      console.log('CSS Code:', cssCode);
      console.log('JS Code:', jsCode);
    } else {
      payload = { ...payload, answer: code };
      console.log('User Code:', code);
    }

    console.log('Payload:', JSON.stringify(payload, null, 2));
    console.log('================================\n');

    try {
      const res = await fetch('/api/check-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      // ถ้าเป็นโจทย์เว็บ ให้รอผลจาก iframe ผ่าน postMessage
      if (data.type === 'web_validation') {
        console.log('=== Web Validation Mode: Waiting for result from iframe... ===');
        let validationFrame = document.getElementById('validation-frame') as HTMLIFrameElement;
        if (!validationFrame) {
          validationFrame = document.createElement('iframe');
          validationFrame.id = 'validation-frame';
          validationFrame.style.display = 'none';
          document.body.appendChild(validationFrame);
        }
        
        validationFrame.srcdoc = data.html;
      } else {
        // โหมดปกติ แสดงผลทันที
        setResponse(data);
        setIsSubmitting(false);
      }

    } catch (error) {
      console.error('Error:', error);
      setResponse({
        isCorrect: false,
        message: 'เกิดข้อผิดพลาดในการส่งคำตอบ: ' + error.message,
        timestamp: new Date().toISOString(),
      });
      setIsSubmitting(false);
    }
  };

  // ตัวอย่างโค้ดสำหรับแต่ละภาษา
  const codeTemplates = {
    javascript: '// เขียนโค้ด JavaScript ของคุณที่นี่\nconsole.log("hello");',
    python: '# เขียนโค้ด Python ของคุณที่นี่\nprint("hello")',
    java: 'public class Main {\n  public static void main(String[] args) {\n    // เขียนโค้ด Java ของคุณที่นี่\n    System.out.println("hello");\n  }\n}',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n  // เขียนโค้ด C++ ของคุณที่นี่\n  cout << "hello" << endl;\n  return 0;\n}',
  };

  const moreCodeTemplates = {
    c: '#include <stdio.h>\n\nint main() {\n  // เขียนโค้ด C ของคุณที่นี่\n  printf("hello");\n  return 0;\n}',
    csharp: 'using System;\n\nclass Program {\n  static void Main() {\n    // เขียนโค้ด C# ของคุณที่นี่\n    Console.WriteLine("hello");\n  }\n}',
    go: 'package main\nimport "fmt"\n\nfunc main() {\n  // เขียนโค้ด Go ของคุณที่นี่\n  fmt.Println("hello")\n}',
    ruby: '# เขียนโค้ด Ruby ของคุณที่นี่\nputs "hello"',
    php: '<?php\n// เขียนโค้ด PHP ของคุณที่นี่\necho "hello";\n?>',
    swift: '// เขียนโค้ด Swift ของคุณที่นี่\nprint("hello")',
    kotlin: 'fun main() {\n  // เขียนโค้ด Kotlin ของคุณที่นี่\n  println("hello")\n}',
    rust: 'fn main() {\n  // เขียนโค้ด Rust ของคุณที่นี่\n  println!("hello");\n}',
    typescript: '// เขียนโค้ด TypeScript ของคุณที่นี่\nconsole.log("hello");',
    sql: '/* เขียนคำสั่ง SQL ของคุณที่นี่ */\nSELECT "hello";',
    bash: '# เขียนสคริปต์ Bash ของคุณที่นี่\necho "hello"',
  };

  const allCodeTemplates = { ...codeTemplates, ...moreCodeTemplates };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (allCodeTemplates[newLanguage]) {
      setCode(allCodeTemplates[newLanguage]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧪 Code Editor - Compile & Run</h1>

        {/* ตัวสลับโหมด */}
        <div className="mb-6 flex justify-center bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => {
              setMode('backend');
              setResponse(null);
            }}
            className={`px-6 py-2 rounded-md font-semibold w-1/2 ${mode === 'backend' ? 'bg-white shadow' : 'text-gray-600'}`}
          >
            โหมด Backend (Python, Java, etc.)
          </button>
          <button
            onClick={() => {
              setMode('web');
              setResponse(null);
            }}
            className={`px-6 py-2 rounded-md font-semibold w-1/2 ${mode === 'web' ? 'bg-white shadow' : 'text-gray-600'}`}
          >
            โหมด Web Playground (HTML/CSS/JS)
          </button>
        </div>

        {/* ส่วนเลือก Challenge ID */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-4 max-w-md mx-auto">
            <label className="font-semibold w-32 text-lg">โจทย์ข้อที่:</label>
            <input
              type="text"
              value={challengeId}
              onChange={(e) => setChallengeId(e.target.value)}
              className="border rounded px-4 py-2 flex-1 text-lg"
              placeholder="ใส่ ID โจทย์"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mode === 'backend' ? (
            <>
              {/* === โหมด Backend (ของเดิม) === */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-4 space-y-3">
                  <div className="flex items-center gap-4">
                    <label className="font-semibold w-32">ภาษา:</label>
                    <select
                      value={language}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="border rounded px-4 py-2 flex-1"
                    >
                      <option value="javascript">JavaScript (Node.js)</option>
                      <option value="python">Python 3</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                      <option value="c">C</option>
                      <option value="csharp">C#</option>
                      <option value="go">Go</option>
                      <option value="ruby">Ruby</option>
                      <option value="php">PHP</option>
                      <option value="swift">Swift</option>
                      <option value="kotlin">Kotlin</option>
                      <option value="rust">Rust</option>
                      <option value="typescript">TypeScript</option>
                      <option value="sql">SQL (MySQL)</option>
                      <option value="bash">Bash</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="font-semibold block mb-2">เขียนโค้ดของคุณ:</label>
                  <CodeEditor
                    defaultCode={code}
                    language={language}
                    onCodeChange={setCode}
                    height="400px"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 
                             text-white px-6 py-3 rounded-lg font-semibold flex-1"
                  >
                    {isSubmitting ? '⏳ กำลังส่งคำตอบ...' : '▶️ Run & Submit'}
                  </button>

                  <button
                    onClick={() => {
                      setCode(allCodeTemplates[language] || '');
                      setResponse(null);
                    }}
                    className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-lg font-semibold"
                  >
                    🔄 Reset
                  </button>
                </div>
              </div>

              {/* ฝั่งขวา: Results */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">📊 ผลลัพธ์</h2>

                {!response ? (
                  <div className="text-center text-gray-400 py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <p>เขียนโค้ดแล้วกด "Run & Submit" เพื่อดูผลลัพธ์</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* สถานะ */}
                    <div className={`p-4 rounded-lg border-2 ${response.isCorrect
                      ? 'bg-green-50 border-green-300'
                      : 'bg-red-50 border-red-300'
                      }`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">
                          {response.isCorrect ? '✅' : '❌'}
                        </span>
                        <div>
                          <p className={`font-bold text-lg ${response.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                            {response.isCorrect ? 'ถูกต้อง!' : 'ไม่ถูกต้อง'}
                          </p>
                          <p className={`text-sm ${response.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {response.message}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Output */}
                    <div>
                      <h3 className="font-semibold mb-2">ผลลัพธ์ที่ได้:</h3>
                      <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm whitespace-pre-wrap">
                        {response.actualOutput || '(ไม่มีผลลัพธ์)'}
                      </div>
                    </div>

                    {/* Expected Output (ถ้าผิด) */}
                    {!response.isCorrect && response.expectedOutput && (
                      <div>
                        <h3 className="font-semibold mb-2 text-blue-700">ผลลัพธ์ที่คาดหวัง:</h3>
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded font-mono text-sm whitespace-pre-wrap">
                          {response.expectedOutput}
                        </div>
                      </div>
                    )}

                    {/* Error Details */}
                    {response.details && (
                      <div>
                        <h3 className="font-semibold mb-2 text-red-700">รายละเอียดข้อผิดพลาด:</h3>
                        <div className="bg-red-50 border border-red-200 p-4 rounded font-mono text-sm whitespace-pre-wrap">
                          {response.details}
                        </div>
                      </div>
                    )}

                    {/* Execution Info */}
                    <div className="bg-gray-100 p-3 rounded text-sm space-y-1">
                      <div><strong>Challenge ID:</strong> {response.challengeId}</div>
                      {response.executionTime && (
                        <div><strong>เวลาที่ใช้:</strong> {response.executionTime}s</div>
                      )}
                      <div><strong>เวลา:</strong> {new Date(response.timestamp).toLocaleString('th-TH')}</div>
                    </div>

                    {/* Full JSON */}
                    <details className="text-sm">
                      <summary className="cursor-pointer font-semibold hover:text-blue-600">
                        📋 ดู JSON Response
                      </summary>
                      <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-2 text-xs">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* === โหมด Web Playground === */}
              <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <div>
                  <label className="font-semibold block mb-2 text-blue-600">HTML:</label>
                  <CodeEditor defaultCode={htmlCode} language="html" onCodeChange={setHtmlCode} height="150px" />
                </div>
                <div>
                  <label className="font-semibold block mb-2 text-green-600">CSS:</label>
                  <CodeEditor defaultCode={cssCode} language="css" onCodeChange={setCssCode} height="150px" />
                </div>
                <div>
                  <label className="font-semibold block mb-2 text-yellow-600">JavaScript:</label>
                  <CodeEditor defaultCode={jsCode} language="javascript" onCodeChange={setJsCode} height="150px" />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white w-full py-3 rounded-lg font-semibold"
                >
                  {isSubmitting ? '⏳ กำลังตรวจสอบ...' : '🚀 ตรวจสอบผลลัพธ์'}
                </button>
              </div>

              {/* ฝั่งขวา: Live Preview + Results */}
              <div className="space-y-6">
                {/* Live Preview */}
                <div className="bg-white rounded-lg shadow">
                  <h2 className="text-xl font-bold p-6 pb-2">🖥️ ผลลัพธ์หน้าเว็บ (Live Preview)</h2>
                  <iframe
                    srcDoc={webOutput}
                    title="Web Output"
                    sandbox="allow-scripts"
                    className="w-full h-[300px] border-t"
                  />
                </div>

                {/* Results */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold mb-4">📊 ผลการตรวจสอบ</h2>

                  {!response ? (
                    <div className="text-center text-gray-400 py-8">
                      <div className="text-5xl mb-3">🔍</div>
                      <p>กด "ตรวจสอบผลลัพธ์" เพื่อดูว่าโค้ดของคุณถูกต้องหรือไม่</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* สถานะ */}
                      <div className={`p-4 rounded-lg border-2 ${response.isCorrect
                        ? 'bg-green-50 border-green-300'
                        : 'bg-red-50 border-red-300'
                        }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">
                            {response.isCorrect ? '✅' : '❌'}
                          </span>
                          <div>
                            <p className={`font-bold text-lg ${response.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                              {response.isCorrect ? 'ถูกต้อง!' : 'ไม่ถูกต้อง'}
                            </p>
                            <p className={`text-sm ${response.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                              {response.message}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Output */}
                      {response.actualOutput && (
                        <div>
                          <h3 className="font-semibold mb-2">ผลลัพธ์ที่ได้:</h3>
                          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm whitespace-pre-wrap">
                            {response.actualOutput}
                          </div>
                        </div>
                      )}

                      {/* Expected Output (ถ้าผิด) */}
                      {!response.isCorrect && response.expectedOutput && (
                        <div>
                          <h3 className="font-semibold mb-2 text-blue-700">สิ่งที่โจทย์คาดหวัง:</h3>
                          <div className="bg-blue-50 border border-blue-200 p-4 rounded font-mono text-sm whitespace-pre-wrap">
                            {response.expectedOutput}
                          </div>
                        </div>
                      )}

                      {/* Execution Info */}
                      <div className="bg-gray-100 p-3 rounded text-sm space-y-1">
                        <div><strong>Challenge ID:</strong> {response.challengeId}</div>
                        {response.executionTime && (
                          <div><strong>เวลาที่ใช้:</strong> {response.executionTime}s</div>
                        )}
                        <div><strong>เวลา:</strong> {new Date(response.timestamp).toLocaleString('th-TH')}</div>
                      </div>

                      {/* Full JSON */}
                      <details className="text-sm">
                        <summary className="cursor-pointer font-semibold hover:text-blue-600">
                          📋 ดู JSON Response
                        </summary>
                        <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-2 text-xs">
                          {JSON.stringify(response, null, 2)}
                        </pre>
                      </details>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* คำอธิบายระบบ */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3">⚙️ วิธีการทำงาน:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-2">Frontend:</p>
              <ul className="space-y-1 ml-5 list-disc text-gray-700">
                <li>ใช้ Monaco Editor เขียนโค้ด</li>
                <li>ส่งโค้ดไปยัง Backend API</li>
                <li>แสดงผลลัพธ์ที่ได้</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Backend:</p>
              <ul className="space-y-1 ml-5 list-disc text-gray-700">
                <li>รับโค้ดจาก Frontend</li>
                <li>รันโค้ดด้วย Paiza.IO หรือ Validation Script</li>
                <li>เปรียบเทียบผลกับ Supabase</li>
                <li>ส่งผลลัพธ์กลับมา</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}