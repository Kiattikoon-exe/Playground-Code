export interface SubmissionPayload {
  challengeId: string;
  language: string;
  answer?: string;
  htmlCode?: string;
  cssCode?: string;
  jsCode?: string;
  validation_mode?: string;
}

export interface SyntaxError {
  line: number;
  message: string;
}

export interface SubmissionResponse {
  isCorrect: boolean;
  message: string;
  isHardcoded?: boolean;
  syntaxErrors?: string[] | SyntaxError[];
  actualOutput?: string;
  expectedOutput?: string;
  executionTime?: string;
  challengeId?: string;
}
