import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { MarketIcon, BondsIcon, NewsIcon, ChatbotIcon } from './IconComponents';

const BottomNav: React.FC = () => {
    const { t } = useAppContext();

    const navItems = [
        { path: '/market', label: t('nav_market'), icon: MarketIcon },
        { path: '/bonds', label: t('nav_bonds'), icon: BondsIcon },
        { path: '/news', label: t('nav_news'), icon: NewsIcon },
        { path: '/resources', label: t('nav_chatbot'), icon: ChatbotIcon },
    ];

    const activeLinkClass = 'text-brand-green';
    const inactiveLinkClass = 'text-gray-400';

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-brand-dark/80 backdrop-blur-sm border-t border-purple-800/50 z-40">
            <div className="flex justify-around items-center h-full max-w-2xl mx-auto">
                {navItems.map(({ path, label, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end
                        className={({ isActive }) => 
                            `flex flex-col items-center justify-center w-1/4 transition-colors duration-200 ${isActive ? activeLinkClass : inactiveLinkClass} hover:text-brand-green`
                        }
                    >
                        <Icon className="w-7 h-7 mb-1" />
                        <span className="text-xs font-medium">{label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;