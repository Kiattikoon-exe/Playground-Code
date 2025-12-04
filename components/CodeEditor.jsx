import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

/**
 * @param {Object} props
 * @param {string} props.defaultCode
 * @param {string} props.language
 * @param {function} props.onCodeChange
 * @param {string} props.height
 * @param {any[]} [props.protectedRanges]
 * @param {function} [props.onReadOnlyWarning]
 * @param {any[]} [props.errors]
 */
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

  // เมื่อ Editor โหลดเสร็จ
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // ตั้งค่า Editor Options
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      automaticLayout: true,
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
      tabSize: 2,
      formatOnPaste: true,
      formatOnType: true,
      glyphMargin: true,
    });

    // เพิ่ม IntelliSense สำหรับ JavaScript/TypeScript
    if (language === 'javascript' || language === 'typescript') {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });

      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        esModuleInterop: true,
        allowJs: true,
      });
    }

    // เพิ่ม IntelliSense สำหรับ Python
    if (language === 'python') {
      monaco.languages.registerCompletionItemProvider('python', {
        provideCompletionItems: (model, position) => {
          const suggestions = [
            {
              label: 'print',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'print(${1:value})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Print to console',
            },
            {
              label: 'def',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'def ${1:function_name}(${2:params}):\n\t${3:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Define a function',
            },
            {
              label: 'class',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'class ${1:ClassName}:\n\tdef __init__(self${2:, params}):\n\t\t${3:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Define a class',
            },
            {
              label: 'if',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'if ${1:condition}:\n\t${2:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'If statement',
            },
            {
              label: 'for',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'for ${1:item} in ${2:iterable}:\n\t${3:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'For loop',
            },
          ];
          return { suggestions };
        },
      });
    }

    // เพิ่ม IntelliSense สำหรับ Java
    if (language === 'java') {
      monaco.languages.registerCompletionItemProvider('java', {
        provideCompletionItems: () => {
          const suggestions = [
            {
              label: 'sout',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'System.out.println(${1:value});',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Print to console',
            },
            {
              label: 'psvm',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'public static void main(String[] args) {\n\t${1}\n}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Main method',
            },
            {
              label: 'class',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'public class ${1:ClassName} {\n\t${2}\n}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Class definition',
            },
          ];
          return { suggestions };
        },
      });
    }

    // Listen for changes
    editor.onDidChangeModelContent((e) => {
       validateAndRevert(e.changes);
    });
    
    // เพิ่ม CSS
    const style = document.createElement('style');
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
      .protected-line-decoration {
        background-color: #ffd700;
        width: 5px !important;
      }
    `;
    if (!document.getElementById('protected-lines-style')) {
      style.id = 'protected-lines-style';
      document.head.appendChild(style);
    }
  }

  // ฟังก์ชันตรวจสอบและป้องกันการแก้ไข
  const validateAndRevert = (changes) => {
    if (!editorRef.current || !monacoRef.current) return;
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    const currentModel = editor.getModel();
    let shouldRevert = false;

    // A. ตรวจสอบว่า Change ทับกับ Protected Range หรือไม่
    for (const change of changes) {
      const changeRange = change.range;
      
      for (const id of protectedDecorationsRef.current) {
        const protectedRange = currentModel.getDecorationRange(id);
        if (!protectedRange) continue;

        // ตรวจสอบการ Intersect
        const intersection = monaco.Range.intersectRanges(changeRange, protectedRange);
        
        if (intersection && !intersection.isEmpty()) {
          // ถ้ามีการทับซ้อน (กินเนื้อหา) -> ห้าม
          shouldRevert = true;
          break;
        }
      }
      if (shouldRevert) break;
    }

    // B. ตรวจสอบ Integrity (กันเหนียว กรณีลบขอบหรืออื่นๆ)
    if (!shouldRevert) {
      protectedDecorationsRef.current.forEach((id, index) => {
        const range = currentModel.getDecorationRange(id);
        if (range) {
          const currentContent = currentModel.getValueInRange(range);
          if (currentContent !== originalContentsRef.current[index]) {
            shouldRevert = true;
          }
        }
      });
    }

    if (shouldRevert) {
      // แจ้งเตือน
      if (onReadOnlyWarning) onReadOnlyWarning();
      
      // Undo โดยใช้ setTimeout เพื่อให้แน่ใจว่าทำงานหลัง event loop ปัจจุบัน
      setTimeout(() => {
         editor.trigger('keyboard', 'undo', null);
      }, 0);
    } else {
       // Valid change -> trigger callback
       if (onCodeChange) onCodeChange(editor.getValue());
    }
  };

  // Effect สำหรับ Protected Ranges (ทำงานเมื่อ protectedRanges เปลี่ยน)
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    const editor = editorRef.current;
    const monaco = monacoRef.current;

    // 1. ลบ Decorations เดิม
    if (protectedDecorationsRef.current.length > 0) {
      editor.deltaDecorations(protectedDecorationsRef.current, []);
      protectedDecorationsRef.current = [];
      originalContentsRef.current = [];
    }

    // 2. สร้าง Decorations ใหม่
    if (protectedRanges.length > 0) {
      console.log('Applying protected ranges:', protectedRanges);
      
      const protectedDecorations = protectedRanges.map(range => ({
        range: new monaco.Range(
          range.startLine,
          range.startColumn || 1,
          range.endLine,
          range.endColumn || Number.MAX_SAFE_INTEGER
        ),
        options: {
          isWholeLine: false,
          className: 'protected-line-highlight',
          glyphMarginClassName: 'protected-line-glyph',
          linesDecorationsClassName: 'protected-line-decoration',
          stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
          hoverMessage: { value: '🔒 ส่วนนี้เป็นโจทย์ ห้ามแก้ไข' }
        }
      }));

      // Apply decorations
      const decorationIds = editor.deltaDecorations([], protectedDecorations);
      protectedDecorationsRef.current = decorationIds;

      // 3. เก็บเนื้อหาต้นฉบับ (เพื่อตรวจสอบ Integrity)
      const model = editor.getModel();
      originalContentsRef.current = decorationIds.map(id => {
        const range = model.getDecorationRange(id);
        return model.getValueInRange(range);
      });
    }
  }, [protectedRanges, defaultCode]); // เพิ่ม defaultCode เพื่อให้มั่นใจว่าทำงานหลังจากโค้ดเปลี่ยน

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

  // จัดการการเปลี่ยนแปลงโค้ด (สำหรับกรณีไม่มี protected ranges)
  function handleEditorChange(value) {
    if (protectedRanges.length === 0 && onCodeChange) {
      onCodeChange(value);
    }
  }

  return (
    <>
      <Editor
        height={height || '100%'}
        language={language}
        value={defaultCode} // ใช้ value เพื่อให้เป็น Controlled Component (หรืออย่างน้อย update ตาม prop)
        theme="vs-dark"
        onMount={handleEditorDidMount}
        // onChange={handleEditorChange} // ไม่ต้องใช้ onChange ของ Editor โดยตรง เพราะเราใช้ onDidChangeModelContent แล้ว
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          automaticLayout: true,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
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
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          renderLineHighlight: 'all',
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          wrappingIndent: 'indent',
          autoIndent: 'full',
          formatOnPaste: true,
          formatOnType: true,
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnCommitCharacter: true,
          acceptSuggestionOnEnter: 'on',
          snippetSuggestions: 'top',
          tabCompletion: 'on',
          wordBasedSuggestions: true,
          parameterHints: {
            enabled: true,
          },
          tabSize: 2,
          insertSpaces: true,
          bracketPairColorization: {
            enabled: true,
          },
        }}
      />
    </>
  );
}
