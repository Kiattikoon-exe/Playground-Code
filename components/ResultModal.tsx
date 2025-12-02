'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    isCorrect: boolean;
    onNext: () => void;
    message?: string;
}

const ResultModal = ({ isOpen, onClose, isCorrect, onNext, message }: ResultModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

                    {/* 1. Background Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* 2. Modal Card */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.5, opacity: 0, y: 50 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center overflow-hidden z-10"
                    >

                        {/* Header Background */}
                        {/* <div className={`absolute top-0 left-0 right-0 h-32 ${
              isCorrect ? 'bg-gradient-to-b from-teal-400/20 to-transparent' : 'bg-gradient-to-b from-red-400/20 to-transparent'
            }`} /> */}

                        <div className="relative z-10">
                            {/* หัวข้อ */}
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                {isCorrect ? 'เยี่ยมมาก! คุณทำสำเร็จแล้ว!' : 'เกือบถูกแล้ว! ลองอีกนิดนะ'}
                            </h2>

                            {/* รูปภาพ Mascot */}
                            <div className="my-6 flex justify-center">
                                <img
                                    src={isCorrect
                                        ? "cat_success.png" // แมวฉลอง
                                        : "dog_success.png" // หมามั้ง
                                    }
                                    alt="Mascot"
                                    className="w-120 h-50 object-contain drop-shadow-lg"
                                />
                            </div>

                            {/* ข้อความ */}
                            <p className="text-gray-800 mb-8 text-lg">
                                {isCorrect
                                    ? '"โค้ดของคุณทำงานได้อย่างสมบูรณ์แบบ!"'
                                    : `"${message || 'ลองตรวจสอบ Syntax หรือ Logic ดูอีกครั้งนะ'}"`
                                }
                            </p>

                            {/* ปุ่มกด */}
                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2.5 rounded-lg border-2 border-gray-300 text-gray-800 font-semibold hover:bg-gray-600 transition-colors"
                                >
                                    กลับหน้าหลัก
                                </button>

                                {isCorrect ? (
                                    <button
                                        onClick={onNext}
                                        className="px-6 py-2.5 rounded-lg bg-gradient-to-b from-teal-700 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                                    >
                                        ไปต่อข้อถัดไป
                                    </button>
                                ) : (
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-2.5 rounded-lg bg-red-500 text-white font-bold shadow-lg hover:bg-red-600 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                                    >
                                        ลองใหม่อีกครั้ง
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ResultModal;