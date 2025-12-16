import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ 
  defaultCode, 
  language, 
  onCodeChange, 
  height, 
  protectedRanges = [],
  onReadOnlyWarning,
  errors = []
}) {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationsRef = useRef([]);
  const protectedDecorationsRef = useRef([]);
  const originalContentsRef = useRef([]);
  const isRemoteUpdate = useRef(false);
  const isSettingValue = useRef(false);

  // เมื่อ Editor โหลดเสร็จ
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;

    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      automaticLayout: true,
      tabSize: 2,
      formatOnPaste: true,
      formatOnType: true,
      glyphMargin: true,
    });

    // Disable TypeScript validation for non-TS/JS languages
    if (language !== 'javascript' && language !== 'typescript') {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });
    }

    // Listen for changes และป้องกันการแก้ไข protected ranges
    editor.onDidChangeModelContent((e) => {
       if (e.isFlush || isRemoteUpdate.current || isSettingValue.current) {
         return;
       }
       
       // ตรวจสอบว่ามี change ที่ทับกับ protected range หรือไม่
       const hasProtectedChange = e.changes.some(change => {
         const model = editor.getModel();
         
         for (const decorationId of protectedDecorationsRef.current) {
           const protectedRange = model.getDecorationRange(decorationId);
           if (!protectedRange) continue;
           
           const changeRange = change.range;
           
           // ตรวจสอบว่า change อยู่ในบรรทัดที่ protected หรือไม่
           const changeStartLine = changeRange.startLineNumber;
           const changeEndLine = changeRange.endLineNumber;
           const protectedStartLine = protectedRange.startLineNumber;
           const protectedEndLine = protectedRange.endLineNumber;
           
           // ถ้า change อยู่ในช่วงบรรทัดที่ protected ถือว่า overlap
           const overlaps = !(
             changeEndLine < protectedStartLine ||
             changeStartLine > protectedEndLine
           );
           
           if (overlaps) return true;
         }
         return false;
       });

       if (hasProtectedChange) {
         // Block ด้วยการ undo
         isRemoteUpdate.current = true;
         requestAnimationFrame(() => {
           editor.trigger('protected', 'undo', null);
           requestAnimationFrame(() => {
             isRemoteUpdate.current = false;
           });
         });
         
         // แสดง warning
         if (onReadOnlyWarning) {
           onReadOnlyWarning();
         }
       } else if (onCodeChange) {
         // ไม่มีการแก้ไข protected range
         onCodeChange(editor.getValue());
       }
    });
    
    // เพิ่ม CSS สำหรับ protected lines
    if (!document.getElementById('protected-lines-style')) {
      const style = document.createElement('style');
      style.id = 'protected-lines-style';
      style.innerHTML = `
        .protected-line-highlight {
          background: linear-gradient(90deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.05) 100%) !important;
          border-left: 3px solid #ffd700;
        }
        .protected-line-glyph {
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
          width: 4px !important;
          margin-left: 3px;
          border-radius: 2px;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Helper function to update protected decorations
  const updateProtectedDecorations = (ranges) => {
    if (!editorRef.current || !monacoRef.current) return;
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    const model = editor.getModel();
    if (!model) return;

    // ลบ Decorations เดิม
    if (protectedDecorationsRef.current.length > 0) {
      editor.deltaDecorations(protectedDecorationsRef.current, []);
      protectedDecorationsRef.current = [];
      originalContentsRef.current = [];
    }

    // สร้าง Decorations ใหม่
    if (ranges && ranges.length > 0) {
      const protectedDecorations = ranges.map(range => {
        const startLine = range.startLine;
        const endLine = range.endLine;
        
        return {
          range: new monaco.Range(startLine, 1, endLine, Number.MAX_SAFE_INTEGER),
          options: {
            isWholeLine: true,
            className: 'protected-line-highlight',
            glyphMarginClassName: 'protected-line-glyph',
            stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            hoverMessage: { value: '🔒 Protected code - Do not edit' }
          }
        };
      });

      const decorationIds = editor.deltaDecorations([], protectedDecorations);
      protectedDecorationsRef.current = decorationIds;

      originalContentsRef.current = decorationIds.map(id => {
        const range = model.getDecorationRange(id);
        return range ? model.getValueInRange(range) : '';
      });
    }
  };

  // Effect สำหรับ defaultCode เปลี่ยน (Reboot หรือเปลี่ยนโจทย์)
  useEffect(() => {
    if (!editorRef.current) return;

    const currentValue = editorRef.current.getValue();

    // ตรวจสอบว่าโค้ดเปลี่ยนจริงหรือไม่
    if (defaultCode !== currentValue) {
      // Set flags เพื่อบล็อคการ validate
      isRemoteUpdate.current = true;
      isSettingValue.current = true;

      // เคลียร์ decorations เดิม
      if (protectedDecorationsRef.current.length > 0) {
        editorRef.current.deltaDecorations(protectedDecorationsRef.current, []);
        protectedDecorationsRef.current = [];
        originalContentsRef.current = [];
      }

      // Set โค้ดใหม่
      editorRef.current.setValue(defaultCode);

      // ปลดล็อค isSettingValue ทันที
      isSettingValue.current = false;

      // Apply decorations หลังจาก set value เสร็จ
      setTimeout(() => {
        if (protectedRanges && protectedRanges.length > 0) {
          updateProtectedDecorations(protectedRanges);
          
          // รอให้ decorations ถูก apply
          let attempts = 0;
          const maxAttempts = 20;

          const checkDecorations = () => {
            attempts++;

            if (protectedDecorationsRef.current.length > 0) {
              isRemoteUpdate.current = false;
            } else if (attempts < maxAttempts) {
              setTimeout(checkDecorations, 50);
            } else {
              isRemoteUpdate.current = false;
            }
          };

          setTimeout(checkDecorations, 100);
        } else {
          isRemoteUpdate.current = false;
        }
      }, 10);
    }
  }, [defaultCode]);

  // Effect สำหรับ protectedRanges เปลี่ยน
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    
    if (protectedRanges && protectedRanges.length > 0) {
      isRemoteUpdate.current = true;
      updateProtectedDecorations(protectedRanges);
      
      setTimeout(() => {
        isRemoteUpdate.current = false;
      }, 100);
    } else {
      // ลบ decorations ทั้งหมด
      if (protectedDecorationsRef.current.length > 0) {
        editorRef.current.deltaDecorations(protectedDecorationsRef.current, []);
        protectedDecorationsRef.current = [];
        originalContentsRef.current = [];
      }
    }
  }, [protectedRanges]);

  // จัดการ errors
  useEffect(() => {
    if (editorRef.current && monacoRef.current && errors.length > 0) {
      const monaco = monacoRef.current;
      const model = editorRef.current.getModel();
      
      const markers = errors.map(error => ({
        severity: monaco.MarkerSeverity.Error,
        startLineNumber: error.line,
        startColumn: 1,
        endLineNumber: error.line,
        endColumn: model.getLineMaxColumn(error.line),
        message: error.message,
      }));
      
      monaco.editor.setModelMarkers(model, 'syntax-check', markers);
      
      const newDecorations = errors.map(error => ({
        range: new monaco.Range(error.line, 1, error.line, 1),
        options: {
          isWholeLine: true,
          className: 'error-line',
          glyphMarginClassName: 'error-glyph',
        }
      }));
      
      decorationsRef.current = editorRef.current.deltaDecorations(
        decorationsRef.current,
        newDecorations
      );
    }
  }, [errors]);

  return (
    <Editor
      height={height || '100%'}
      language={language}
      value={defaultCode}
      theme="vs-dark"
      onMount={handleEditorDidMount}
      options={{
        selectOnLineNumbers: true,
        readOnly: false,
        automaticLayout: true,
        scrollbar: {
          vertical: 'visible',
          horizontal: 'visible',
          useShadows: false,
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10,
        },
        minimap: {
          enabled: true,
          side: 'right',
        },
        fontSize: 14,
        lineNumbers: 'on',
        glyphMargin: true,
        folding: true,
        renderLineHighlight: 'all',
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        autoIndent: 'full',
        formatOnPaste: true,
        formatOnType: true,
        tabSize: 2,
        insertSpaces: true,
        bracketPairColorization: {
          enabled: true,
        },
      }}
    />
  );
}