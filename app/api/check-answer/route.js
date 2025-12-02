import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// แมปภาษาทั้งหมดที่ Paiza.IO รองรับ
const LANGUAGE_MAP = {
  javascript: "javascript",
  python: "python3",
  java: "java",
  cpp: "cpp",
  c: "c",
  typescript: "typescript",
  php: "php",
  rust: "rust",
  go: "go",
  swift: "swift",
  kotlin: "kotlin",
  csharp: "csharp",
  scala: "scala",
  ruby: "ruby",
  perl: "perl",
  bash: "bash",
  r: "r",
  sql: "mysql",
  web: "web",
};

// ========================================
// ฟังก์ชันตรวจสอบ Syntax (รองรับหลายภาษา)
// ========================================
function validateSyntax(code, requiredKeywords, forbiddenKeywords, language) {
  const errors = [];

  // ถ้าไม่มีเงื่อนไข ให้ผ่านเลย
  if ((!requiredKeywords || requiredKeywords.length === 0) && 
      (!forbiddenKeywords || forbiddenKeywords.length === 0)) {
    return errors;
  }

  // ตรวจสอบคำสั่งที่ต้องมี
  if (requiredKeywords && requiredKeywords.length > 0) {
    requiredKeywords.forEach((keyword) => {
      const pattern = getSyntaxPattern(keyword, language);
      if (!pattern.test(code)) {
        errors.push(`โค้ดต้องมีคำสั่ง "${keyword}"`);
      }
    });
  }

  // ตรวจสอบคำสั่งที่ห้ามใช้
  if (forbiddenKeywords && forbiddenKeywords.length > 0) {
    forbiddenKeywords.forEach((keyword) => {
      const pattern = getSyntaxPattern(keyword, language);
      if (pattern.test(code)) {
        errors.push(`โค้ดไม่ควรใช้คำสั่ง "${keyword}"`);
      }
    });
  }

  return errors;
}

// ========================================
// สร้าง Pattern สำหรับแต่ละภาษา
// ========================================
function getSyntaxPattern(keyword, language) {
  const patterns = {
    python: {
      if: /\bif\b\s+.+:/,
      else: /\belse\s*:/,
      elif: /\belif\b\s+.+:/,
      for: /\bfor\b\s+\w+\s+in\s+/,
      while: /\bwhile\b\s+.+:/,
      def: /\bdef\b\s+\w+\s*\(/,
      class: /\bclass\b\s+\w+/,
      ternary: /\w+\s*=\s*.+\s+if\s+.+\s+else\s+/,
      lambda: /\blambda\b/,
      'list-comprehension': /\[.+\s+for\s+.+\s+in\s+.+\]/,
    },
    javascript: {
      if: /\bif\s*\(.+\)\s*\{/,
      else: /\belse\s*\{/,
      'else-if': /\belse\s+if\s*\(.+\)\s*\{/,
      switch: /\bswitch\s*\(.+\)\s*\{/,
      case: /\bcase\s+.+:/,
      for: /\bfor\s*\(.+\)\s*\{/,
      while: /\bwhile\s*\(.+\)\s*\{/,
      function: /\bfunction\s+\w+\s*\(/,
      arrow: /\(.*\)\s*=>/,
      ternary: /\?\s*.+\s*:/,
      const: /\bconst\b/,
      let: /\blet\b/,
      var: /\bvar\b/,
    },
    java: {
      if: /\bif\s*\(.+\)\s*\{/,
      else: /\belse\s*\{/,
      'else-if': /\belse\s+if\s*\(.+\)\s*\{/,
      switch: /\bswitch\s*\(.+\)\s*\{/,
      case: /\bcase\s+.+:/,
      for: /\bfor\s*\(.+\)\s*\{/,
      while: /\bwhile\s*\(.+\)\s*\{/,
      'for-each': /\bfor\s*\(.+:\s*.+\)\s*\{/,
      class: /\bclass\b\s+\w+/,
      public: /\bpublic\b/,
      private: /\bprivate\b/,
      static: /\bstatic\b/,
    },
    cpp: {
      if: /\bif\s*\(.+\)\s*\{/,
      else: /\belse\s*\{/,
      'else-if': /\belse\s+if\s*\(.+\)\s*\{/,
      switch: /\bswitch\s*\(.+\)\s*\{/,
      case: /\bcase\s+.+:/,
      for: /\bfor\s*\(.+\)\s*\{/,
      while: /\bwhile\s*\(.+\)\s*\{/,
      class: /\bclass\b\s+\w+/,
      struct: /\bstruct\b\s+\w+/,
      pointer: /\w+\s*\*/,
      reference: /\w+\s*&/,
    },
    c: {
      if: /\bif\s*\(.+\)\s*\{/,
      else: /\belse\s*\{/,
      'else-if': /\belse\s+if\s*\(.+\)\s*\{/,
      switch: /\bswitch\s*\(.+\)\s*\{/,
      case: /\bcase\s+.+:/,
      for: /\bfor\s*\(.+\)\s*\{/,
      while: /\bwhile\s*\(.+\)\s*\{/,
      struct: /\bstruct\b\s+\w+/,
      pointer: /\w+\s*\*/,
    },
  };

  // ใช้ pattern ของภาษานั้นๆ หรือ fallback เป็น javascript
  const langPatterns = patterns[language] || patterns["javascript"];
  
  // ถ้าไม่เจอ pattern ก็ค้นหาแบบ simple word boundary
  return langPatterns[keyword] || new RegExp(`\\b${keyword}\\b`);
}

// ========================================
// POST Handler
// ========================================
export async function POST(request) {
  const { challengeId, answer, language, htmlCode, cssCode, jsCode } =
    await request.json();

  console.log("=== Backend Received ===");
  console.log("Challenge ID:", challengeId);
  console.log("Language:", language);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  try {
    // ดึงข้อมูลโจทย์
    const { data: challengeData, error: dbError } = await supabase
      .from("Codecamp")
      .select("*")
      .eq("id", challengeId)
      .single();

    if (dbError) {
      console.error("Supabase Error:", dbError);
      throw dbError;
    }

    if (!challengeData) {
      return NextResponse.json(
        {
          isCorrect: false,
          message: "ไม่พบโจทย์นี้ในระบบ",
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    // ========================================
    // BRANCH 1: โหมด Web (HTML/CSS/JS)
    // ========================================
    if (language === "web") {
      if (!challengeData.validation_script) {
        return NextResponse.json({
          isCorrect: false,
          message: "โจทย์ข้อนี้ไม่มีสคริปต์สำหรับตรวจคำตอบ (Web Mode)",
          timestamp: new Date().toISOString(),
        });
      }

      console.log("=== Web Validation Mode ===");

      // บันทึกคำตอบลง DB
      const { error: insertError } = await supabase.from("submiss").upsert(
        {
          id: parseInt(challengeId),
          "ans-user": `HTML:\n${htmlCode || ""}\n\nCSS:\n${cssCode || ""}\n\nJS:\n${jsCode || ""}`,
        },
        { onConflict: "id" }
      );

      if (insertError) {
        console.error("Failed to insert submission:", insertError.message);
      }

      const fullHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${cssCode || ""}</style>
          </head>
          <body>
            ${htmlCode || ""}
            <script>${jsCode || ""}<\/script>
            <script>
              try {
                window.addEventListener('DOMContentLoaded', function() {
                  ${challengeData.validation_script}
                });
              } catch (e) {
                window.parent.postMessage({ 
                  type: 'validation_error', 
                  message: e.message 
                }, '*');
              }
            <\/script>
          </body>
        </html>
      `;

      return NextResponse.json({ 
        type: "web_validation", 
        html: fullHtml,
        timestamp: new Date().toISOString(),
      });
    }

    // ========================================
    // BRANCH 2: ตรวจสอบ Syntax (ถ้ามีเงื่อนไข)
    // ========================================
    const validationMode = challengeData.validation_mode || 'output_only';
    
    if (validationMode === "syntax_check") {
      const syntaxErrors = validateSyntax(
        answer,
        challengeData.required_keywords || [],
        challengeData.forbidden_keywords || [],
        language
      );

      if (syntaxErrors.length > 0) {
        // บันทึกคำตอบที่ผิด
        await supabase.from("submiss").upsert({
          id: parseInt(challengeId),
          "ans-user": answer,
        }, { onConflict: "id" });

        return NextResponse.json({
          isCorrect: false,
          message: "โค้ดไม่ตรงตามเงื่อนไขของโจทย์",
          syntaxErrors: syntaxErrors,
          actualOutput: "",
          timestamp: new Date().toISOString(),
        });
      }
    }

    // ========================================
    // BRANCH 3: ตรวจสอบภาษาที่รองรับ
    // ========================================
    if (!LANGUAGE_MAP[language]) {
      return NextResponse.json({
        isCorrect: false,
        message: `ภาษา "${language}" ยังไม่รองรับในระบบ`,
        actualOutput: "",
        timestamp: new Date().toISOString(),
      });
    }

    // ========================================
    // BRANCH 4: ตรวจสอบผลลัพธ์แบบปกติ (Paiza.IO)
    // ========================================
    const expectedOutputRaw = challengeData.expected_output || "";
    console.log("Expected Output (Raw):", expectedOutputRaw);

    const paizaLanguage = LANGUAGE_MAP[language];
    console.log("Sending to Paiza - Language:", paizaLanguage);

    const requestBody = {
      source_code: answer,
      language: paizaLanguage,
      input: "",
      api_key: process.env.PAIZA_API_KEY || "guest",
    };

    // ส่งไปรันที่ Paiza.IO
    const createResponse = await fetch("https://api.paiza.io/runners/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const createResult = await createResponse.json();
    console.log("Create Result:", createResult);

    if (createResult.error) {
      throw new Error(`Paiza API Error: ${createResult.error}`);
    }

    if (!createResult.id) {
      throw new Error(`Paiza API Error: No submission ID returned`);
    }

    const submissionId = createResult.id;
    console.log("Submission ID:", submissionId);

    // รอผลลัพธ์
    let result;
    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
      await sleep(1000);

      const statusUrl = `https://api.paiza.io/runners/get_details?id=${submissionId}&api_key=${
        process.env.PAIZA_API_KEY || "guest"
      }`;
      const detailsResponse = await fetch(statusUrl);
      result = await detailsResponse.json();

      console.log(`Attempt ${attempts + 1}: Status = ${result.status}`);

      if (result.status === "completed") {
        break;
      }

      attempts++;
    }

    if (attempts >= maxAttempts) {
      return NextResponse.json({
        isCorrect: false,
        message: "โค้ดใช้เวลารันนานเกินไป",
        details: "Timeout after 30 seconds",
        timestamp: new Date().toISOString(),
      });
    }

    console.log("Final Result:", result);

    // ตรวจสอบ Compilation Error
    if (result.build_result === "failure") {
      return NextResponse.json({
        isCorrect: false,
        message: "เกิดข้อผิดพลาดในการ Compile",
        details: result.build_stderr || "Compilation failed",
        actualOutput: "",
        timestamp: new Date().toISOString(),
      });
    }

    // ตรวจสอบ Runtime Error
    if (result.result === "failure" || result.result === "timeout") {
      return NextResponse.json({
        isCorrect: false,
        message: "เกิดข้อผิดพลาดในการรันโค้ด",
        details: result.stderr || `Execution resulted in: ${result.result}`,
        actualOutput: result.stdout || "",
        timestamp: new Date().toISOString(),
      });
    }

    // เปรียบเทียบผลลัพธ์
    const actualOutput = (result.stdout || "").trim().replace(/\r\n/g, "\n");
    const expectedOutputTrimmed = (expectedOutputRaw || "")
      .trim()
      .replace(/\r\n/g, "\n");
    const isCorrect = actualOutput === expectedOutputTrimmed;

    console.log("Expected (Trimmed):", expectedOutputTrimmed);
    console.log("Actual (Trimmed):", actualOutput);
    console.log("Is Correct:", isCorrect);

    // บันทึกคำตอบ
    const { error: insertError } = await supabase.from("submiss").upsert(
      {
        id: parseInt(challengeId),
        "ans-user": answer,
      },
      {
        onConflict: "id",
        ignoreDuplicates: false,
      }
    );

    if (insertError) {
      console.error("Failed to insert submission:", insertError.message);
    }

    return NextResponse.json({
      isCorrect: isCorrect,
      message: isCorrect ? "ถูกต้อง! 🎉" : "ผลลัพธ์ไม่ตรงกับที่คาดหวัง",
      actualOutput: actualOutput,
      expectedOutput: isCorrect ? null : expectedOutputTrimmed,
      challengeId: challengeId,
      executionTime: result.time || "N/A",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Full Error:", error);
    return NextResponse.json(
      {
        isCorrect: false,
        message: "เกิดข้อผิดพลาด: " + error.message,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}