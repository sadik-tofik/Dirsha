import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import PriceChart from '../components/PriceChart';
import { bonds } from '../data/bonds';
import { Bond } from '../types';
import BondCard from '../components/BondCard';
import BondDetailModal from '../components/BondDetailModal';
import ContactFormModal from '../components/ContactFormModal';


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

const BondsScreen: React.FC = () => {
    const { t } = useAppContext();
    const [selectedBond, setSelectedBond] = useState<Bond | null>(null);
    const [isContactFormOpen, setContactFormOpen] = useState(false);

    const handleShowDetails = (bond: Bond) => {
        setSelectedBond(bond);
    };

    const handleTakeContract = () => {
        setContactFormOpen(true);
    };

    const handleCloseAllModals = () => {
        setContactFormOpen(false);
        setSelectedBond(null);
    };

    const handleInquirySubmit = (formData: { name: string; email: string; subject: string; message: string; }) => {
        console.log('Inquiry submitted:', formData);
        alert(`Your inquiry for "${selectedBond?.title}" has been sent. The buyer will contact you at ${formData.email}.`);
        handleCloseAllModals();
    };
    
    return (
        <>
            <div className="p-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">{t('bonds_title')}</h1>
                    <p className="text-gray-400 mt-1">{t('bonds_desc')}</p>
                </div>

                <FilterBar />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bonds.map(bond => (
                       <BondCard 
                            key={bond.id}
                            bond={bond}
                            onClick={() => handleShowDetails(bond)}
                       />
                    ))}
                    
                    <div className="md:col-span-2 lg:col-span-1 bg-gray-800/50 border border-purple-800 rounded-lg p-5 shadow-lg">
                        <PriceChart />
                        <p className="text-center text-xs text-gray-500 mt-2">{t('blockchain_verified')}</p>
                    </div>
                </div>
            </div>
            
            {selectedBond && !isContactFormOpen && (
                <BondDetailModal 
                    bond={selectedBond}
                    onClose={handleCloseAllModals}
                    onTakeContract={handleTakeContract}
                />
            )}

            {selectedBond && isContactFormOpen && (
                 <ContactFormModal
                    bond={selectedBond}
                    onClose={handleCloseAllModals}
                    onSubmit={handleInquirySubmit}
                />
            )}
        </>
    );
};

export default BondsScreen;