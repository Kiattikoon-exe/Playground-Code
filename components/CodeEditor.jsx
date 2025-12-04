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
  const isRemoteUpdate = useRef(false);

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
       // ถ้าเป็นการ Flush หรือ Remote Update (เช่น Reboot) ให้ข้ามการตรวจสอบ
       if (e.isFlush || isRemoteUpdate.current) {
         isRemoteUpdate.current = false;
         return;
       }
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
    const currentModel = editor.getModel();
    let shouldRevert = false;

    // ตรวจสอบ Integrity
    protectedDecorationsRef.current.forEach((id, index) => {
      const range = currentModel.getDecorationRange(id);
      if (range) {
        const currentContent = currentModel.getValueInRange(range);
        const originalContent = originalContentsRef.current[index];
        
        // ถ้าเนื้อหาไม่ตรงกับต้นฉบับ
        if (currentContent !== originalContent) {
          // อนุญาตให้มี Newline ต่อท้ายได้ (กรณี Enter ที่ท้ายบรรทัด)
          // ตรวจสอบว่าเนื้อหาเดิมยังอยู่ครบถ้วน และส่วนที่เกินมาเป็นแค่ Whitespace/Newline
          if (currentContent.startsWith(originalContent) && !originalContent.includes('\n')) {
             const diff = currentContent.substring(originalContent.length);
             if (!diff.trim()) {
               // ถ้าส่วนที่เกินมาเป็นแค่ whitespace (เช่น \n) ถือว่ายอมรับได้
               return; 
             }
          }
          
          shouldRevert = true;
        }
      }
    });

    if (shouldRevert) {
      if (onReadOnlyWarning) onReadOnlyWarning();
      setTimeout(() => {
         editor.trigger('keyboard', 'undo', null);
      }, 0);
    } else {
       if (onCodeChange) onCodeChange(editor.getValue());
    }
  };

  // Effect สำหรับ Protected Ranges
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    const model = editor.getModel();

    // Mark as remote update to skip validation during setup
    isRemoteUpdate.current = true;

    // 1. ลบ Decorations เดิม
    if (protectedDecorationsRef.current.length > 0) {
      editor.deltaDecorations(protectedDecorationsRef.current, []);
      protectedDecorationsRef.current = [];
      originalContentsRef.current = [];
    }

    // 2. สร้าง Decorations ใหม่
    if (protectedRanges.length > 0) {
      console.log('Applying protected ranges:', protectedRanges);
      
      const protectedDecorations = protectedRanges.map(range => {
        const maxCol = model.getLineMaxColumn(range.startLine);
        
        return {
          range: new monaco.Range(
            range.startLine,
            range.startColumn || 1,
            range.endLine,
            range.endColumn || maxCol
          ),
          options: {
            isWholeLine: false,
            className: 'protected-line-highlight',
            glyphMarginClassName: 'protected-line-glyph',
            linesDecorationsClassName: 'protected-line-decoration',
            stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            hoverMessage: { value: '🔒 ส่วนนี้เป็นโจทย์ ห้ามแก้ไข' }
          }
        };
      });

      const decorationIds = editor.deltaDecorations([], protectedDecorations);
      protectedDecorationsRef.current = decorationIds;

      originalContentsRef.current = decorationIds.map(id => {
        const range = model.getDecorationRange(id);
        return model.getValueInRange(range);
      });
    }
  }, [protectedRanges, defaultCode]);

  // Effect to handle external code updates (e.g. Reboot)
  useEffect(() => {
    if (editorRef.current && defaultCode !== editorRef.current.getValue()) {
       isRemoteUpdate.current = true;
       editorRef.current.setValue(defaultCode);
    }
  }, [defaultCode]);

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
    <>
      <Editor
        height={height || '100%'}
        language={language}
        value={defaultCode}
        theme="vs-dark"
        onMount={handleEditorDidMount}
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
