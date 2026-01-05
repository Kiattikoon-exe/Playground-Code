'use client';
import { ChallengeData, TestCase } from '@/types/challenge';

interface ChallengePanelProps {
    challengeData: ChallengeData;
    isLoading: boolean;
}

export default function ChallengePanel({ challengeData, isLoading }: ChallengePanelProps) {
    return (
        <div className="col-span-3 bg-card border border-card rounded-xl overflow-hidden shadow-sm flex flex-col transition-colors">
            <div className="sticky top-0 bg-gradient-to-b from-teal-900 to-teal-500 text-white px-6 py-4 font-bold text-center rounded-t-xl">
                📋 โจทย์
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 73px - 52px - 60px)' }}>
                {isLoading ? (
                    <div className="p-6 text-center text-gray-400">
                        <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                        <p>กำลังโหลด...</p>
                    </div>
                ) : (
                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-3 ">{challengeData.title}</h2>
                            {challengeData.validation_mode === 'syntax_check' && (
                                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-r p-4 mb-4 shadow-sm">
                                    <p className="text-sm font-bold text-yellow-800 mb-2 flex items-center gap-2">
                                        <span className="text-xl">⚠️</span>
                                        เงื่อนไขพิเศษ
                                    </p>
                                    {challengeData.required_keywords.length > 0 && (
                                        <div className="mb-2">
                                            <p className="text-xs text-yellow-700 font-semibold mb-1">✅ ต้องใช้คำสั่ง:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {challengeData.required_keywords.map((keyword: string, i: number) => (
                                                    <span key={i} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-mono">
                                                        {keyword}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {challengeData.forbidden_keywords.length > 0 && (
                                        <div>
                                            <p className="text-xs text-yellow-700 font-semibold mb-1">❌ ห้ามใช้คำสั่ง:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {challengeData.forbidden_keywords.map((keyword: string, i: number) => (
                                                    <span key={i} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded font-mono">
                                                        {keyword}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                <span className="flex items-center gap-1">
                                    ❤️ <strong>{challengeData.likes}</strong>
                                </span>
                                <span className="flex items-center gap-1">
                                    🏆 <strong>1</strong>
                                </span>
                            </div>
                            <button className="w-30 py-1 border-2 border-teal-600 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors mb-3">
                                + บันทึกโจทย์
                            </button>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`text-xl ${i < challengeData.difficulty ? 'text-yellow-400' : 'text-gray-300'}`}>
                                        ★
                                    </span>
                                ))}
                                <span className="ml-2 text-sm text-gray-600">({challengeData.difficulty}/5)</span>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <span className="text-lg">📝</span>
                                คำอธิบาย
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed border border-gray-200">
                                {challengeData.description}
                            </div>
                        </div>
                        {challengeData.testCases.map((testCase: TestCase, index: number) => (
                            <div key={index} className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                                <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                                    <span className="text-lg">🧪</span>
                                    ตัวอย่าง {index + 1}
                                </h3>
                                <div className="mb-3">
                                    <label className="text-xs text-blue-700 font-semibold mb-1 block">📥 ข้อมูลเข้า</label>
                                    <div className="bg-white rounded p-3 text-sm text-gray-800 border border-blue-200 font-mono">
                                        {testCase.input || 'ไม่มี'}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-blue-700 font-semibold mb-1 block">📤 ข้อมูลออก</label>
                                    <div className="bg-white rounded p-3 text-sm text-gray-800 border border-blue-200 font-mono">
                                        {testCase.output || 'ไม่มี'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
