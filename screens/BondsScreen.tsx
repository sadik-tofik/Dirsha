import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import PriceChart from '../components/PriceChart';

const FilterBar = () => {
    const { t } = useAppContext();
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <select className="w-full bg-gray-800 border border-purple-600 rounded-md p-2 text-white focus:ring-2 focus:ring-brand-green focus:border-transparent">
                <option>{t('filter_crop')}</option>
                <option>{t('crop_teff')}</option>
                <option>{t('crop_coffee')}</option>
            </select>
            <select className="w-full bg-gray-800 border border-purple-600 rounded-md p-2 text-white focus:ring-2 focus:ring-brand-green focus:border-transparent">
                <option>{t('filter_location')}</option>
                <option>{t('location_adama')}</option>
                <option>{t('location_addis')}</option>
            </select>
            <select className="w-full bg-gray-800 border border-purple-600 rounded-md p-2 text-white focus:ring-2 focus:ring-brand-green focus:border-transparent">
                <option>{t('filter_payment')}</option>
                <option>{t('payment_upfront')}</option>
                <option>{t('payment_on_delivery')}</option>
            </select>
        </div>
    );
};

const ContractCard: React.FC<{ buyerKey: string; rating: number; termsKey: string; deliveryKey: string }> = ({ buyerKey, rating, termsKey, deliveryKey }) => {
    const { t } = useAppContext();
    return (
        <div className="bg-gray-800/50 border border-purple-800 rounded-lg p-5 flex flex-col justify-between shadow-lg hover:shadow-purple-500/20 transition-shadow">
            <div>
                <div className="flex items-center mb-4">
                    <img src={`https://picsum.photos/seed/${buyerKey}/50/50`} alt={t(buyerKey)} className="w-12 h-12 rounded-full mr-4 border-2 border-brand-green" />
                    <div>
                        <h4 className="font-bold text-white">{t(buyerKey)}</h4>
                        <p className="text-yellow-400">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</p>
                    </div>
                </div>
                <p className="text-gray-300 mb-2 font-semibold"> • "{t(termsKey)}"</p>
                <p className="text-gray-400 text-sm mb-4"> • {t(deliveryKey)}</p>
            </div>
            <button className="w-full mt-2 bg-gradient-to-r from-green-500 to-teal-500 text-black font-bold py-2 px-4 rounded-lg transition-transform hover:scale-105">
                {t('bid_with_offer')}
            </button>
        </div>
    );
};


const BondsScreen: React.FC = () => {
    const { t } = useAppContext();
    return (
        <div className="p-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">{t('bonds_title')}</h1>
                <p className="text-gray-400 mt-1">{t('bonds_desc')}</p>
            </div>

            <FilterBar />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ContractCard 
                    buyerKey="buyer_global_grain"
                    rating={5}
                    termsKey="terms_global_grain"
                    deliveryKey="delivery_global_grain"
                />
                 <ContractCard 
                    buyerKey="buyer_ethio_exports"
                    rating={4}
                    termsKey="terms_ethio_exports"
                    deliveryKey="delivery_ethio_exports"
                />
                <div className="md:col-span-2 lg:col-span-1 bg-gray-800/50 border border-purple-800 rounded-lg p-5 shadow-lg">
                    <PriceChart />
                     <p className="text-center text-xs text-gray-500 mt-2">{t('blockchain_verified')}</p>
                </div>
            </div>
        </div>
    );
};

export default BondsScreen;