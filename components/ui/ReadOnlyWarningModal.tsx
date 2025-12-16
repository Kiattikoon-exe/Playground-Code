'use client';

interface ReadOnlyWarningModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ReadOnlyWarningModal({ isOpen, onClose }: ReadOnlyWarningModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                        ไม่สามารถแก้ไขโจทย์ได้
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        คุณไม่สามารถแก้ไขหรือลบโค้ดที่เป็นส่วนของโจทย์ได้<br />
                        กรุณาเพิ่มโค้ดของคุณในช่องว่างที่เตรียมไว้ให้
                    </p>
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-gradient-to-r from-teal-900 to-teal-500 text-white rounded-lg font-semibold hover:from-teal-800 hover:to-teal-400 transition-all shadow-md"
                    >
                        เข้าใจแล้ว
                    </button>
                </div>
            </div>
        </div>
    );
}
