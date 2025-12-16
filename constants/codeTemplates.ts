export type CodeTemplates = Record<string, string>;

export const codeTemplates: CodeTemplates = {
  javascript: '// เขียนโค้ด JavaScript\nconsole.log("Hello, World!");',
  typescript: '// เขียนโค้ด TypeScript\nconst message: string = "Hello, World!";\nconsole.log(message);',
  python: '# เขียนโค้ด Python\nprint("Hello, World!")',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  csharp: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  go: 'package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
  ruby: '# เขียนโค้ด Ruby\nputs "Hello, World!"',
  php: '<?php\necho "Hello, World!";\n?>',
  swift: '// เขียนโค้ด Swift\nprint("Hello, World!")',
  kotlin: 'fun main() {\n    println("Hello, World!")\n}',
  rust: 'fn main() {\n    println!("Hello, World!");\n}',
  sql: '-- เขียนคำสั่ง SQL\nSELECT "Hello, World!";',
  bash: '#!/bin/bash\necho "Hello, World!"',
  r: '# เขียนโค้ด R\nprint("Hello, World!")',
  scala: 'object Main extends App {\n  println("Hello, World!")\n}',
  perl: '#!/usr/bin/perl\nprint "Hello, World!\\n";',
  web: '',
};
