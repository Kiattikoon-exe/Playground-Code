export interface LanguageItem {
  value: string;
  label: string;
}

export interface LanguageGroup {
  category: string;
  isSpecial?: boolean;
  items: LanguageItem[];
}

export const languageOptions: LanguageGroup[] = [
  {
    category: "HTML/CSS/JS",
    isSpecial: true,
    items: [{ value: "web", label: "HTML/CSS/JS" }]
  },
  {
    category: "ภาษายอดนิยม",
    items: [
      { value: "javascript", label: "JAVASCRIPT" },
      { value: "python", label: "PYTHON" },
      { value: "java", label: "JAVA" },
      { value: "cpp", label: "C++" },
      { value: "c", label: "C" }
    ]
  },
  {
    category: "WEB DEVELOPMENT",
    items: [
      { value: "typescript", label: "TYPESCRIPT" },
      { value: "php", label: "PHP" }
    ]
  },
  {
    category: "SYSTEM PROGRAMMING",
    items: [
      { value: "rust", label: "RUST" },
      { value: "go", label: "GO" }
    ]
  },
  {
    category: "MOBILE & MODERN",
    items: [
      { value: "swift", label: "SWIFT" },
      { value: "kotlin", label: "KOTLIN" }
    ]
  },
  {
    category: "ENTERPRISE",
    items: [
      { value: "csharp", label: "C#" },
      { value: "scala", label: "SCALA" }
    ]
  },
  {
    category: "SCRIPTING",
    items: [
      { value: "ruby", label: "RUBY" },
      { value: "perl", label: "PERL" },
      { value: "bash", label: "BASH" }
    ]
  },
  {
    category: "DATABASE",
    items: [
      { value: "sql", label: "SQL" }
    ]
  }
];
