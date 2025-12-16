'use client';
import { useState } from 'react';
import { languageOptions } from '@/constants/languageOptions';

interface LanguageDropdownProps {
    value: string;
    onChange: (value: string) => void;
}

export default function LanguageDropdown({ value, onChange }: LanguageDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    let currentLabel = "SELECT LANGUAGE";
    languageOptions.forEach(group => {
        const found = group.items.find(item => item.value === value);
        if (found) currentLabel = found.label;
    });

    return (
        <div className="relative w-full text-left z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full relative flex items-center justify-center text-white font-bold uppercase tracking-wide cursor-pointer outline-none hover:text-teal-100 transition-colors py-2 rounded"
            >
                <span>{currentLabel}</span>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <svg className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            )}

            {isOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-full bg-white rounded-lg shadow-xl overflow-hidden z-50 max-h-[60vh] overflow-y-auto border border-gray-200 custom-scrollbar">
                    <div className="py-2">
                        {languageOptions.map((group, groupIndex) => (
                            <div key={groupIndex}>
                                {!group.isSpecial && (
                                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase bg-gray-50 border-b border-gray-100 mt-1 first:mt-0">
                                        {group.category}
                                    </div>
                                )}

                                {group.items.map((item) => (
                                    <button
                                        key={item.value}
                                        onClick={() => {
                                            onChange(item.value);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 border-l-4 transition-all
                      ${value === item.value
                                                ? 'bg-blue-600 text-white border-blue-800 font-semibold shadow-inner'
                                                : 'text-gray-700 border-transparent hover:bg-blue-50 hover:border-blue-300'
                                            }
                    `}
                                    >
                                        {group.isSpecial && (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9-9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        )}
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
