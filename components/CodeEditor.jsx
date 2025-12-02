import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ defaultCode, language, onCodeChange, height }) {
  const editorRef = useRef(null);

  // เมื่อ Editor โหลดเสร็จ
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

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
  }

  // เมื่อโค้ดเปลี่ยน
  function handleEditorChange(value) {
    if (onCodeChange) {
      onCodeChange(value || '');
    }
  }

  return (
    <Editor
      height={height}
      language={language}
      value={defaultCode}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        automaticLayout: true,
        suggestOnTriggerCharacters: true,
        quickSuggestions: {
          other: true,
          comments: true,
          strings: true,
        },
        parameterHints: {
          enabled: true,
        },
        tabSize: 2,
        insertSpaces: true,
        formatOnPaste: true,
        formatOnType: true,
        autoIndent: 'full',
        bracketPairColorization: {
          enabled: true,
        },
      }}
    />
  );
}