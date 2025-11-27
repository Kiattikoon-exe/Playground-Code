'use client';
import { Editor } from '@monaco-editor/react';
import { useState } from 'react';

export default function CodeEditor({ 
  defaultCode = '', 
  language = 'javascript',
  onCodeChange,
  height = '500px'
}) {
  const [code, setCode] = useState(defaultCode);

  const handleEditorChange = (value) => {
    setCode(value);
    if (onCodeChange) {
      onCodeChange(value);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Editor
        height={height}
        defaultLanguage={language}
        defaultValue={defaultCode}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}