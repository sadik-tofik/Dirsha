
import React, { useState, useCallback } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { getAIFeedback } from '../services/geminiService';
import { CloseIcon } from './IconComponents';

const ProfileModal: React.FC = () => {
    const { t, setProfileOpen } = useAppContext();
    const [farmSize, setFarmSize] = useState('5');
    const [soilType, setSoilType] = useState('Loam');
    const [aiFeedback, setAiFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGetFeedback = useCallback(async () => {
        setIsLoading(true);
        setAiFeedback('');
        const farmData = `Farm size: ${farmSize} hectares, Soil type: ${soilType}.`;
        const feedback = await getAIFeedback(farmData);
        setAiFeedback(feedback);
        setIsLoading(false);
    }, [farmSize, soilType]);

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setProfileOpen(false)}>
            <div className="bg-brand-dark border-2 border-purple-700 rounded-2xl shadow-2xl shadow-purple-900/50 w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setProfileOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <CloseIcon />
                </button>
                <h2 className="text-2xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">{t('profile_title')}</h2>
                <p className="text-center text-sm font-semibold text-brand-green mb-6">{t('profile_incentive')}</p>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="farmSize" className="block text-sm font-medium text-gray-300 mb-1">{t('farm_size')}</label>
                        <input type="number" id="farmSize" value={farmSize} onChange={e => setFarmSize(e.target.value)} className="w-full bg-gray-800 border border-purple-600 rounded-md p-2 text-white focus:ring-2 focus:ring-brand-green focus:border-transparent" />
                    </div>
                    <div>
                        <label htmlFor="soilType" className="block text-sm font-medium text-gray-300 mb-1">{t('soil_type')}</label>
                        <input type="text" id="soilType" value={soilType} onChange={e => setSoilType(e.target.value)} className="w-full bg-gray-800 border border-purple-600 rounded-md p-2 text-white focus:ring-2 focus:ring-brand-green focus:border-transparent" />
                    </div>
                     <div>
                        <label htmlFor="irrigation" className="block text-sm font-medium text-gray-300 mb-1">{t('irrigation_access')}</label>
                        <select id="irrigation" className="w-full bg-gray-800 border border-purple-600 rounded-md p-2 text-white focus:ring-2 focus:ring-brand-green focus:border-transparent">
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="labor" className="block text-sm font-medium text-gray-300 mb-1">{t('family_labor')}</label>
                        <input type="number" id="labor" className="w-full bg-gray-800 border border-purple-600 rounded-md p-2 text-white focus:ring-2 focus:ring-brand-green focus:border-transparent" placeholder="e.g., 3" />
                    </div>
                     <div className="p-4 border-2 border-dashed border-purple-600 rounded-lg text-center">
                        <p className="text-gray-400 mb-2">{t('upload_photos')}</p>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors">
                            Upload
                        </button>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                       <p className="text-gray-300">{t('yield_history')}</p>
                    </div>
                    
                    <div className="pt-4">
                       <button onClick={handleGetFeedback} disabled={isLoading} className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-black font-bold py-3 px-4 rounded-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? 'Thinking...' : t('ai_feedback_button')}
                       </button>
                       <div className="mt-4 p-4 bg-gray-800 border-l-4 border-brand-green rounded-r-lg min-h-[60px]">
                            <p className="text-white italic">
                                {aiFeedback || t('ai_feedback_placeholder')}
                            </p>
                       </div>
                    </div>
                </div>

                <div className="mt-6">
                    <button onClick={() => setProfileOpen(false)} className="w-full bg-brand-purple hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                        {t('save_profile')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
