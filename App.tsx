
import React, { useContext } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import ProfileModal from './components/ProfileModal';
import HomeScreen from './screens/HomeScreen';
import MarketScreen from './screens/MarketScreen';
import BondsScreen from './screens/BondsScreen';
import NewsScreen from './screens/NewsScreen';
import ResourcesScreen from './screens/ResourcesScreen';
import { AppContext } from './context/AppContext';

const AppContent: React.FC = () => {
    const { isProfileOpen } = useContext(AppContext);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="min-h-screen bg-brand-dark font-sans flex flex-col">
            <TopBar showBackButton={!isHomePage} />
            <main className="flex-grow pt-16 pb-20">
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/market" element={<MarketScreen />} />
                    <Route path="/bonds" element={<BondsScreen />} />
                    <Route path="/news" element={<NewsScreen />} />
                    <Route path="/resources" element={<ResourcesScreen />} />
                </Routes>
            </main>
            <BottomNav />
            {isProfileOpen && <ProfileModal />}
        </div>
    );
};


const App: React.FC = () => {
  return (
    <HashRouter>
        <AppContent />
    </HashRouter>
  );
};

export default App;
