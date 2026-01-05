'use client';

interface ProgressBarProps {
    currentIndex: number;
    total: number;
    onBack: () => void;
    canGoBack: boolean;
}

export default function ProgressBar({ currentIndex, total, onBack, canGoBack }: ProgressBarProps) {
    const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 px-6 py-3 flex items-center gap-4 shadow-lg">
            <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden max-w-md shadow-inner">
                <div
                    className="bg-gradient-to-r from-teal-900 to-teal-500 h-full transition-all duration-500 ease-out shadow-sm"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <span className="text-sm text-gray-700 font-bold whitespace-nowrap min-w-[80px]">
                {currentIndex + 1} / {total}
            </span>

            <button
                onClick={onBack}
                disabled={!canGoBack}
                className="px-8 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
                ← กลับ
            </button>
        </div>
    );
}
