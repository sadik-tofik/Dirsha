
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { Language } from '../types';
import { ProfileIcon, LanguageIcon } from './IconComponents';

interface TopBarProps {
    showBackButton: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ showBackButton }) => {
    const { language, setLanguage, t, setProfileOpen } = useAppContext();
    const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);

    const handleLanguageChange = (e: React.MouseEvent<HTMLAnchorElement>, lang: Language) => {
        e.preventDefault();
        setLanguage(lang);
        setLangDropdownOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-brand-dark/80 backdrop-blur-sm z-40 h-16 flex items-center px-4 shadow-lg shadow-purple-900/10">
            <div className="flex-1">
                {showBackButton && (
                    <Link to="/" className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        <span className="font-bold text-lg text-brand-green">B</span>
                    </Link>
                )}
            </div>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <button onClick={() => setLangDropdownOpen(!isLangDropdownOpen)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <LanguageIcon className="w-6 h-6 text-gray-300" />
                    </button>
                    {isLangDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-purple-700 rounded-md shadow-lg py-1">
                            <a href="#" onClick={(e) => handleLanguageChange(e, Language.EN)} className={`block px-4 py-2 text-sm ${language === Language.EN ? 'text-brand-green' : 'text-gray-300'} hover:bg-purple-800`}>English</a>
                            <a href="#" onClick={(e) => handleLanguageChange(e, Language.AM)} className={`block px-4 py-2 text-sm ${language === Language.AM ? 'text-brand-green' : 'text-gray-300'} hover:bg-purple-800`}>አማርኛ</a>
                            <a href="#" onClick={(e) => e.preventDefault()} className="block px-4 py-2 text-sm text-gray-500 cursor-not-allowed">{t('coming_soon')} (Oromic)</a>
                            <a href="#" onClick={(e) => e.preventDefault()} className="block px-4 py-2 text-sm text-gray-500 cursor-not-allowed">{t('coming_soon')} (Tigrigna)</a>
                        </div>
                    )}
                </div>
                <button onClick={() => setProfileOpen(true)} className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label={t('profile')}>
                    <ProfileIcon className="w-6 h-6 text-gray-300" />
                </button>
            </div>
        </header>
    );
};

export default TopBar;
