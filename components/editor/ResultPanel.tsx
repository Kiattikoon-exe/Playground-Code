'use client';
import { SubmissionResponse } from '@/types/submission';

interface ResultPanelProps {
    response: SubmissionResponse | null;
}

export default function ResultPanel({ response }: ResultPanelProps) {
    return (
        <div className="col-span-4 bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="sticky top-0 bg-gradient-to-b from-teal-900 to-teal-500 text-white px-6 py-4 font-bold text-center shadow-md">
                📊 ผลลัพธ์
            </div>

            <div className="p-6">
                {!response ? (
                    <div className="text-center text-gray-400 py-16">
                        <div className="text-6xl mb-4">📝</div>
                        <p className="text-sm font-medium">กด SUBMIT เพื่อดูผลลัพธ์</p>
                        <p className="text-xs text-gray-400 mt-2">ระบบจะตรวจสอบโค้ดของคุณ</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className={`p-5 rounded-xl border-2 shadow-lg ${response.isCorrect
                            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400'
                            : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-400'
                            }`}>
                            <div className="flex items-center gap-3">
                                <span className="text-4xl">
                                    {response.isCorrect ? '✅' : '❌'}
                                </span>
                                <div>
                                    <p className={`font-bold text-lg ${response.isCorrect ? 'text-green-800' : 'text-red-800'
                                        }`}>
                                        {response.isCorrect ? 'ถูกต้อง!' : 'ไม่ถูกต้อง'}
                                    </p>
                                    <p className={`text-sm ${response.isCorrect ? 'text-green-700' : 'text-red-700'
                                        }`}>
                                        {response.message}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {response.isHardcoded && (
                            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-r p-4 shadow-md">
                                <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                                    <span className="text-xl">🤔</span>
                                    คำแนะนำ
                                </h3>
                                <p className="text-sm text-yellow-900">
                                    ดูเหมือนว่าคุณอาจจะใส่ผลลัพธ์ลงไปในโค้ดโดยตรง (Hardcode)
                                    <br />
                                    เป้าหมายของโจทย์คือการเขียนโปรแกรมเพื่อสร้างผลลัพธ์นั้นขึ้นมา
                                    ลองใช้วิธีการแก้ปัญหาตามหลักการเขียนโปรแกรมดูนะครับ
                                </p>
                            </div>
                        )}

                        {response.syntaxErrors && response.syntaxErrors.length > 0 && (
                            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-r p-4 shadow-md">
                                <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                                    <span className="text-xl">⚠️</span>
                                    ข้อผิดพลาด Syntax
                                </h3>
                                <ul className="space-y-2">
                                    {response.syntaxErrors.map((err: string | { line: number; message: string }, i: number) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-yellow-800">
                                            <span className="text-red-500 font-bold">•</span>
                                            <span>{typeof err === 'string' ? err : err.message}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {response.actualOutput && (
                            <div>
                                <h3 className="font-bold mb-2 text-sm text-gray-700 flex items-center gap-2">
                                    ผลลัพธ์ของคุณ:
                                </h3>
                                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs font-mono whitespace-pre-wrap border-2 border-gray-700 shadow-inner">
                                    {response.actualOutput}
                                </div>
                            </div>
                        )}

                        {!response.isCorrect && response.expectedOutput && (
                            <div>
                                <h3 className="font-bold mb-2 text-sm text-blue-700 flex items-center gap-2">
                                    ผลลัพธ์ที่คาดหวัง:
                                </h3>
                                <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-lg text-xs font-mono whitespace-pre-wrap shadow-sm">
                                    {response.expectedOutput}
                                </div>
                            </div>
                        )}

                        {response.executionTime && (
                            <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-4 rounded-lg text-xs space-y-2 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">⏱️ เวลาที่ใช้:</span>
                                    <strong className="text-gray-800">{response.executionTime}s</strong>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">🆔 Challenge ID:</span>
                                    <strong className="text-gray-800">#{response.challengeId}</strong>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
