import { FC } from 'react';

export interface ProtectedRange {
  startLine: number;
  endLine: number;
  startColumn?: number;
  endColumn?: number;
}

export interface EditorError {
  line: number;
  message: string;
}

export interface CodeEditorProps {
  defaultCode: string;
  language: string;
  onCodeChange?: (code: string) => void;
  height?: string | number;
  protectedRanges?: ProtectedRange[];
  onReadOnlyWarning?: () => void;
  errors?: EditorError[];
}

declare const CodeEditor: FC<CodeEditorProps>;

export default CodeEditor;
