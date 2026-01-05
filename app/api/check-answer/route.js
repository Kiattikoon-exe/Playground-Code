import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ========================================
// Judge0 Language ID Mapping
// ========================================
const LANGUAGE_MAP = {
  javascript: 63,  
  python: 71,     
  java: 62,       
  cpp: 54,         
  c: 50,           
  typescript: 74,  
  php: 68,        
  rust: 73,        
  go: 60,         
  ruby: 72,        
  bash: 46,       
  csharp: 51,      
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
  
  // ถ้าเจอ pattern ที่กำหนดไว้ ให้ใช้เลย
  if (langPatterns[keyword]) {
    return langPatterns[keyword];
  }
  
  // ถ้าไม่เจอ ให้ escape special regex characters แล้วค้นหาแบบ literal
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(escapedKeyword);
}

// ========================================
// ฟังก์ชันสำหรับ Function Testing Mode (Codewars Style)
// ========================================
// ใน check-answer/route.js
// แทนที่ฟังก์ชัน handleFunctionTest เดิม

async function handleFunctionTest(userCode, language, challengeData) {
  const testScript = challengeData.validation_script;
  
  if (!testScript) {
    return NextResponse.json({
      isCorrect: false,
      message: "โจทย์นี้ยังไม่มี test script",
      timestamp: new Date().toISOString(),
    });
  }

  try {
    let fullCode, languageId;

    // ========================================
    // กำหนด Language ID และรวมโค้ด
    // ========================================
    if (language === "python") {
      languageId = 71; // Python 3.8.1
      fullCode = `${userCode}

# Test Script
${testScript}`;
    }
    else if (language === "javascript") {
      languageId = 63; // JavaScript (Node.js 12.14.0)
      fullCode = `${userCode}

// Test Script
      ${testScript}`;
    }
    else if (language === "java") {
      languageId = 62; // Java (OpenJDK 13.0.1)
      fullCode = `${userCode}

      ${testScript}`;
    }
    else if (language === "cpp") {
      languageId = 54; // ✅ แก้ไข: C++ (GCC 9.2.0)
      fullCode = `${userCode}

${testScript}`;
    }
    else {
      return NextResponse.json({
        isCorrect: false,
        message: `ภาษา ${language} ยังไม่รองรับโหมด function_test`,
        timestamp: new Date().toISOString(),
      });
    }

    console.log("=== Full Code to Execute ===");
    console.log(fullCode);
    console.log("=== End Code ===");

    // ========================================
    // ส่งไปรันที่ Judge0 (ใช้ wait=true ไม่ต้อง polling)
    // ========================================
    console.log(`Sending to Judge0 - Language ID: ${languageId}`);
    
    const createResponse = await fetch(
      "http://54.162.88.144:2358/submissions?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: fullCode,
          language_id: languageId, // ✅ แก้ไข: ใช้ language_id
          stdin: "",
        }),
      }
    );

    // ✅ แก้ไข: ใช้ createResponse.json()
    const result = await createResponse.json();
    
    console.log("=== Judge0 Result ===");
    console.log("Status:", result.status);
    console.log("stdout:", result.stdout);
    console.log("stderr:", result.stderr);
    console.log("compile_output:", result.compile_output);

    // ========================================
    // ตรวจสอบ Error จาก Judge0
    // ========================================
    
    // Compilation Error (status.id = 6)
    if (result.status?.id === 6) {
      return NextResponse.json({
        isCorrect: false,
        message: "โค้ดมีข้อผิดพลาด Syntax",
        details: result.compile_output || "Compilation failed",
        actualOutput: result.stdout || "",
        timestamp: new Date().toISOString(),
      });
    }

    // Runtime Error (status.id = 7-12)
    if (result.status?.id >= 7 && result.status?.id <= 12) {
      return NextResponse.json({
        isCorrect: false,
        message: "เกิด Runtime Error",
        details: result.stderr || result.status.description,
        actualOutput: result.stdout || "",
        timestamp: new Date().toISOString(),
      });
    }

    // Time Limit Exceeded (status.id = 5)
    if (result.status?.id === 5) {
      return NextResponse.json({
        isCorrect: false,
        message: "โค้ดใช้เวลารันนานเกินไป",
        details: "Time Limit Exceeded",
        timestamp: new Date().toISOString(),
      });
    }

    // Internal Error (status.id = 13)
    if (result.status?.id === 13) {
      return NextResponse.json({
        isCorrect: false,
        message: "เกิดข้อผิดพลาดภายในระบบ",
        details: result.status.description,
        timestamp: new Date().toISOString(),
      });
    }

    // ========================================
    // Parse ผลลัพธ์ (ต้องเป็น JSON array)
    // ========================================
    const output = (result.stdout || "").trim();
    let testResults = [];
    let allPassed = false;
    let passedCount = 0;
    
    try {
      testResults = JSON.parse(output);
      allPassed = testResults.every(t => t.passed === true);
      passedCount = testResults.filter(t => t.passed === true).length;
    } catch (e) {
      console.error("Failed to parse test results as JSON:", e);
      return NextResponse.json({
        isCorrect: false,
        message: "ไม่สามารถแปลงผลลัพธ์ได้ - กรุณาตรวจสอบโค้ด",
        details: output,
        actualOutput: output,
        timestamp: new Date().toISOString(),
      });
    }

    // ========================================
    // ส่งผลลัพธ์กลับ
    // ========================================
    return NextResponse.json({
      isCorrect: allPassed,
      message: allPassed 
        ? `✅ ผ่านทุก test case! (${passedCount}/${testResults.length})` 
        : `❌ ผ่าน ${passedCount}/${testResults.length} test cases`,
      testResults: testResults,
      actualOutput: output,
      executionTime: result.time || "N/A",
      memory: result.memory || "N/A",
      challengeId: challengeData.id,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Function Test Error:", error);
    return NextResponse.json({
      isCorrect: false,
      message: "เกิดข้อผิดพลาด: " + error.message,
      error: error.message,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    // BRANCH 0: Function Testing Mode (Codewars Style)
    // ========================================
    if (challengeData.validation_mode === "function_test") {
      console.log("=== Function Test Mode ===");
      return await handleFunctionTest(answer, language, challengeData);
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
    // BRANCH 2: ตรวจสอบภาษาที่รองรับ
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
    // BRANCH 3: รันโค้ดผ่าน Judge0
    // ========================================
    const expectedOutputRaw = challengeData.expected_output || "";
    const expectedOutputTrimmed = expectedOutputRaw.trim().replace(/\r\n/g, "\n");
    
    console.log("Expected Output (Raw):", expectedOutputRaw);

    const languageId = LANGUAGE_MAP[language];
    console.log(`Sending to Judge0 - Language ID: ${languageId}`);

    // ส่งไปรันที่ Judge0 (ใช้ wait=true ไม่ต้อง polling)
    const response = await fetch(
      "http://54.162.88.144:2358/submissions?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: answer,
          language_id: languageId,
          stdin: "",
          expected_output: expectedOutputTrimmed, // ให้ Judge0 เปรียบเทียบให้
        }),
      }
    );

    const result = await response.json();
    
    console.log("=== Judge0 Result ===");
    console.log("Status:", result.status);
    console.log("stdout:", result.stdout);
    console.log("stderr:", result.stderr);
    console.log("compile_output:", result.compile_output);

    // ========================================
    // ตรวจสอบ Error จาก Judge0
    // ========================================
    
    // Compilation Error (status.id = 6)
    if (result.status?.id === 6) {
      return NextResponse.json({
        isCorrect: false,
        message: "เกิดข้อผิดพลาดในการ Compile",
        details: result.compile_output || "Compilation failed",
        actualOutput: "",
        timestamp: new Date().toISOString(),
      });
    }

    // Runtime Error (status.id = 7-12)
    if (result.status?.id >= 7 && result.status?.id <= 12) {
      return NextResponse.json({
        isCorrect: false,
        message: "เกิด Runtime Error",
        details: result.stderr || result.status.description,
        actualOutput: result.stdout || "",
        timestamp: new Date().toISOString(),
      });
    }

    // Time Limit Exceeded (status.id = 5)
    if (result.status?.id === 5) {
      return NextResponse.json({
        isCorrect: false,
        message: "โค้ดใช้เวลารันนานเกินไป",
        details: "Time Limit Exceeded",
        actualOutput: result.stdout || "",
        timestamp: new Date().toISOString(),
      });
    }

    // Internal Error (status.id = 13)
    if (result.status?.id === 13) {
      return NextResponse.json({
        isCorrect: false,
        message: "เกิดข้อผิดพลาดภายในระบบ",
        details: result.status.description,
        timestamp: new Date().toISOString(),
      });
    }

    // ========================================
    // BRANCH 4: ตรวจสอบ Syntax หลังจาก compile สำเร็จ
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
          actualOutput: result.stdout || "",
          timestamp: new Date().toISOString(),
        });
      }
    }

    // ========================================
    // BRANCH 5: เปรียบเทียบผลลัพธ์
    // ========================================
    const actualOutput = (result.stdout || "").trim().replace(/\r\n/g, "\n");
    
    // Judge0 status.id = 3 (Accepted) หมายถึงผลลัพธ์ตรงกับ expected_output
    const isCorrect = result.status?.id === 3;

    console.log("Expected (Trimmed):", expectedOutputTrimmed);
    console.log("Actual (Trimmed):", actualOutput);
    console.log("Judge0 Status ID:", result.status?.id);
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
      actualOutput: actualOutput,
      expectedOutput: isCorrect ? null : expectedOutputTrimmed,
      challengeId: challengeId,
      executionTime: result.time || "N/A",
      memory: result.memory || "N/A",
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