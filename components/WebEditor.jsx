'use client';
import { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';

export default function WebEditor({ 
  onCodeChange, 
  onSubmit, 
  isSubmitting,
  initialHtml = '<div id="app">\n  <h1>Hello World</h1>\n</div>',
  initialCss = '#app {\n  padding: 20px;\n  font-family: Arial;\n  text-align: center;\n}',
  initialJs = '// JavaScript Code\nconsole.log("Hello World");'
}) {
  const [activeTab, setActiveTab] = useState('html');
  const [htmlCode, setHtmlCode] = useState(initialHtml);
  const [cssCode, setCssCode] = useState(initialCss);
  const [jsCode, setJsCode] = useState(initialJs);
  const [showPreview, setShowPreview] = useState(false);

  // Sync กับ parent เมื่อโค้ดเปลี่ยน
  useEffect(() => {
    onCodeChange({ htmlCode, cssCode, jsCode });
  }, [htmlCode, cssCode, jsCode]);

  const handleCodeChange = (code) => {
    if (activeTab === 'html') setHtmlCode(code);
    if (activeTab === 'css') setCssCode(code);
    if (activeTab === 'js') setJsCode(code);
  };

  const handleReboot = () => {
    setHtmlCode(initialHtml);
    setCssCode(initialCss);
    setJsCode(initialJs);
    setShowPreview(false);
  };

  const tabs = [
    { id: 'html', label: 'HTML', language: 'html', icon: '📄' },
    { id: 'css', label: 'CSS', language: 'css', icon: '🎨' },
    { id: 'js', label: 'JavaScript', language: 'javascript', icon: '⚡' },
  ];

  const currentCode = 
    activeTab === 'html' ? htmlCode : 
    activeTab === 'css' ? cssCode : 
    jsCode;

  const currentLanguage = tabs.find(t => t.id === activeTab)?.language || 'html';

  // สร้าง preview HTML
  const previewHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script>${jsCode}<\/script>
      </body>
    </html>
  `;

  return (
    <div className="flex flex-col h-full">
      {/* Tabs with Preview Toggle */}
      <div className="bg-gray-800 flex items-center justify-between border-b border-gray-700">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-teal-400 border-b-2 border-teal-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Preview Toggle */}
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="mr-4 px-4 py-1.5 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 transition-colors flex items-center gap-2"
        >
          <span>{showPreview ? '👁️' : '👁️‍🗨️'}</span>
          {showPreview ? 'ซ่อน Preview' : 'แสดง Preview'}
        </button>
      </div>

      {/* Editor + Preview Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor */}
        <div className={`${showPreview ? 'w-1/2 border-r border-gray-700' : 'w-full'} relative bg-gray-900`}>
          <CodeEditor
            defaultCode={currentCode}
            language={currentLanguage}
            onCodeChange={handleCodeChange}
            height="100%"
          />
        </div>

        {/* Live Preview */}
        {showPreview && (
          <div className="w-1/2 bg-white overflow-auto">
            <div className="sticky top-0 bg-gray-100 border-b border-gray-300 px-4 py-2 text-sm text-gray-600 font-semibold">
              🖥️ Live Preview
            </div>
            <iframe
              srcDoc={previewHtml}
              title="Live Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts"
            />
          </div>
        )}
      </div>
    </div>
  );
}