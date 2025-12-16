export interface TestCase {
  input: string;
  output: string;
}

export type ValidationMode = 'output_only' | 'syntax_check' | 'function_test';

export interface ChallengeData {
  title: string;
  description: string;
  difficulty: number;
  likes: number;
  testCases: TestCase[];
  validation_mode: ValidationMode;
  required_keywords: string[];
  forbidden_keywords: string[];
}

export interface Challenge extends ChallengeData {
  id: number;
  language: string;
  initial_code: string;
  initial_html?: string;
  initial_css?: string;
  initial_js?: string;
  expected_output?: string;
  protected_ranges?: ProtectedRange[];
  validation_script?: string;
}

export interface ProtectedRange {
  startLine: number;
  endLine: number;
  startColumn?: number;
  endColumn?: number;
}
