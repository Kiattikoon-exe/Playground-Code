'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="bg-card border-b border-card px-6 py-4 flex items-center justify-between shadow-sm transition-colors">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-teal rounded-lg flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-900 to-teal-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-teal-600">
                    Sprouting Tech Code Camp
                </h1>
            </div>

            <nav className="flex-1 flex justify-center">
                <div className="p-0.5 gradient-teal rounded-full shadow-sm">
                    <div className="flex items-center gap-8 px-8 py-2 bg-card rounded-full">
                        <a href="#" className=" text-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">หน้าหลัก</a>
                        <a href="#" className=" text-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">หลักสูตรทั้งหมด</a>
                        <a href="#" className="text-teal-600 dark:text-teal-400 font-semibold">Code Camp</a>
                        <a href="#" className=" text-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">โปรไฟล์</a>
                    </div>
                </div>
            </nav>

            <div className="flex items-center gap-4">
                {mounted && (
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={theme === 'dark'}
                            onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        />
                        <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-teal-500 transition-colors duration-300 relative">
                            <svg
                                className={`absolute left-1 top-1 w-4 h-4 text-yellow-500 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                            <svg
                                className={`absolute right-1 top-1 w-4 h-4 text-slate-200 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        </div>
                        <div className="absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform duration-300 peer-checked:translate-x-5 shadow-md"></div>
                    </label>
                )}

                <button className="px-6 py-2 gradient-teal text-white rounded-full hover:opacity-90 shadow-md transition-all">
                    เข้าสู่ระบบ
                </button>
            </div>
        </header>
    );
}
