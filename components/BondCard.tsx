import React from 'react';
import { Bond } from '../types';
import { useAppContext } from '../hooks/useAppContext';

interface BondCardProps {
    bond: Bond;
    onClick: () => void;
}

const BondCard: React.FC<BondCardProps> = ({ bond, onClick }) => {
    const { t } = useAppContext();
    return (
        <div 
            className="bg-gray-800/50 border border-purple-800 rounded-lg p-5 flex flex-col justify-between shadow-lg hover:shadow-purple-500/20 hover:border-brand-green transition-all cursor-pointer transform hover:-translate-y-1"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onClick()}
            aria-label={`View details for ${t(bond.buyerKey)}`}
        >
            <div>
                <div className="flex items-center mb-4">
                    <img src={`https://picsum.photos/seed/${bond.buyerKey}/50/50`} alt={t(bond.buyerKey)} className="w-12 h-12 rounded-full mr-4 border-2 border-brand-green" />
                    <div>
                        <h4 className="font-bold text-white">{t(bond.buyerKey)}</h4>
                        <p className="text-yellow-400">{'★'.repeat(bond.rating)}{'☆'.repeat(5 - bond.rating)}</p>
                    </div>
                </div>
                <p className="text-gray-300 mb-2 font-semibold"> • "{t(bond.termsKey)}"</p>
                <p className="text-gray-400 text-sm mb-4"> • {t(bond.deliveryKey)}</p>
            </div>
            <div className="w-full mt-2 bg-gradient-to-r from-green-500 to-teal-500 text-black font-bold py-2 px-4 rounded-lg text-center">
                View Details
            </div>
        </div>
    );
};

export default BondCard;
