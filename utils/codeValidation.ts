import { TestCase } from '@/types/challenge';

/**
 * Detect if code contains hardcoded output values
 * @param code - The code to check
 * @param testCases - Test cases with expected outputs
 * @param language - Programming language
 * @returns true if hardcoded values are detected
 */
export function detectHardcodedOutput(
  code: string,
  testCases: TestCase[],
  language: string
): boolean {
  if (language === 'web') return false;

  const expectedOutputs = testCases
    .map((tc) => tc.output)
    .filter(Boolean);

  if (expectedOutputs.length === 0) return false;

  for (const output of expectedOutputs) {
    // Escape special regex characters
    const escapedOutput = output.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Regex to match: print("OUTPUT") or print('OUTPUT') or print(OUTPUT) for numbers
    // Covers: console.log, print, println, System.out.println, fmt.Println, etc.
    const regex = new RegExp(
      `(console\\.log|print|println|fmt\\.Println|System\\.out\\.println)\\s*\\(\\s*(["\`'\\]?)${escapedOutput}\\2\\s*\\)`,
      'i'
    );

    if (regex.test(code)) {
      return true;
    }
  }

  return false;
}
