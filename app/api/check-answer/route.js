import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ใช้ language codes ที่ Paiza.IO รองรับ
const LANGUAGE_MAP = {
  javascript: "javascript",
  python: "python3",
  java: "java",
  cpp: "cpp",
  c: "c",
  csharp: "csharp",
  go: "go",
  ruby: "ruby",
  php: "php",
  swift: "swift",
  kotlin: "kotlin",
  rust: "rust",
  typescript: "typescript",
  sql: "mysql",
  bash: "bash",
};

export async function POST(request) {
  const {
    challengeId,
    answer,
    language,
    htmlCode,
    cssCode,
    jsCode,
  } = await request.json();

  console.log("=== Backend Received ===");
  console.log("Challenge ID:", challengeId);
  console.log("Language:", language);
  console.log("User Answer:", answer);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  try {
    const { data: challengeData, error: dbError } = await supabase
      .from("Codecamp")
      .select("expected_output, validation_script")
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

    // ==================================================
    //  BRANCH: ตรวจสอบโจทย์ประเภท Web (HTML/CSS/JS)
    // ==================================================
    if (language === "web") {
      if (!challengeData.validation_script) {
        return NextResponse.json({
          isCorrect: false,
          message: "โจทย์ข้อนี้ไม่มีสคริปต์สำหรับตรวจคำตอบ (Web Mode)",
          timestamp: new Date().toISOString(),
        });
      }

      console.log("=== Web Validation Mode ===");
      console.log("HTML Code:", htmlCode);
      console.log("CSS Code:", cssCode);
      console.log("JS Code:", jsCode);
      console.log("Validation Script:", challengeData.validation_script);

      // บันทึกคำตอบลง DB ก่อน (ใช้ upsert แทน insert เพื่อแก้ปัญหา duplicate key)
      const { error: insertError } = await supabase.from("submiss").upsert({
        id: parseInt(challengeId),
        "ans-user": answer || `HTML:\n${htmlCode}\n\nCSS:\n${cssCode}\n\nJS:\n${jsCode}`,
      }, {
        onConflict: 'id' // ถ้า id ซ้ำให้ update แทน
      });

      if (insertError) {
        console.error("Failed to insert submission:", insertError.message);
      }

      // ประกอบร่างโค้ดทั้งหมดเพื่อส่งกลับไปให้ Frontend รันใน iframe
      const fullHtml = `
        <html>
          <head>
            <style>${cssCode || ""}</style>
          </head>
          <body>
            ${htmlCode || ""}
            <script>${jsCode || ""}<\/script>

            <!-- Injected Validation Script -->
            <script>
              try {
                // รอให้ DOM โหลดเสร็จก่อน
                window.addEventListener('DOMContentLoaded', function() {
                  // เรียกใช้ validation script จาก DB
                  ${challengeData.validation_script}
                });
              } catch (e) {
                // ส่ง Error กลับไปถ้าสคริปต์ตรวจพัง
                window.parent.postMessage({ 
                  type: 'validation_error', 
                  message: e.message 
                }, '*');
              }
            <\/script>
          </body>
        </html>
      `;
      
      return NextResponse.json({ type: "web_validation", html: fullHtml });
    }

    // ==================================================
    //  BRANCH: ตรวจสอบโจทย์ประเภท Backend (ของเดิม)
    // ==================================================
    const expectedOutput = (challengeData.expected_output || "").trim();
    console.log("Expected Output:", expectedOutput);

    const paizaLanguage = LANGUAGE_MAP[language] || "javascript";
    console.log("Sending to Paiza - Language:", paizaLanguage);

    // สร้าง request body
    const requestBody = {
      source_code: answer,
      language: paizaLanguage,
      input: "",
      api_key: process.env.PAIZA_API_KEY || "guest",
    };

    console.log("Request Body:", JSON.stringify(requestBody, null, 2));

    // ส่งไปรันที่ Paiza.IO
    const createResponse = await fetch("https://api.paiza.io/runners/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const createResult = await createResponse.json();
    console.log("Create Result:", JSON.stringify(createResult, null, 2));

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

    console.log("Final Result:", JSON.stringify(result, null, 2));

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
    const actualOutput = (result.stdout || "").trim();
    const isCorrect = actualOutput === expectedOutput;

    console.log("Expected:", expectedOutput);
    console.log("Actual:", actualOutput);
    console.log("Is Correct:", isCorrect);

    // บันทึกคำตอบ (ใช้ upsert แทน insert เพื่อแก้ปัญหา duplicate key)
    const { error: insertError } = await supabase.from("submiss").upsert({
      id: parseInt(challengeId),
      "ans-user": answer,
    }, {
      onConflict: 'id' // ถ้า id ซ้ำให้ update แทน
    });

    if (insertError) {
      console.error("Failed to insert submission:", insertError.message);
    }

    return NextResponse.json({
      isCorrect: isCorrect,
      message: isCorrect ? "ถูกต้อง! 🎉" : "ผลลัพธ์ไม่ตรงกับที่คาดหวัง",
      actualOutput: actualOutput,
      expectedOutput: isCorrect ? null : expectedOutput,
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