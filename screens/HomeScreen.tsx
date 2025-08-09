
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import VoiceInput from '../components/VoiceInput';

const FeatureCard: React.FC<{ title: string; description: string; }> = ({ title, description }) => (
    <div className="bg-gray-800/50 border border-purple-800 rounded-lg p-6 backdrop-blur-sm transition-transform hover:scale-105 hover:border-brand-green">
        <h3 className="text-xl font-bold text-brand-green mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </div>
);


const HomeScreen: React.FC = () => {
    const { t } = useAppContext();
    const navigate = useNavigate();

    const handleVoiceCommand = (command: string) => {
        if (command && !command.toLowerCase().includes("could not understand")) {
            navigate('/resources', { state: { command } });
        }
    }

    return (
        <div className="p-4 space-y-8 animate-fade-in">
            <div className="text-center py-8">
                <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">
                    {t('home_title')}
                </h1>
                <p className="mt-2 text-lg text-gray-300">{t('home_subtitle')}</p>
            </div>

            <VoiceInput onTranscription={handleVoiceCommand} />

            <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard title={t('feature_1_title')} description={t('feature_1_desc')} />
                <FeatureCard title={t('feature_2_title')} description={t('feature_2_desc')} />
                <FeatureCard title={t('feature_3_title')} description={t('feature_3_desc')} />
            </div>
        </div>
    );
};

export default HomeScreen;