import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { ChevronUpIcon, ChevronDownIcon } from '../components/IconComponents';

const marketData = [
  { cropKey: 'crop_teff', price: '185 ETB/kg', change: 2.5, trend: 'up' },
  { cropKey: 'crop_coffee', price: '210 ETB/kg', change: 5.0, trend: 'up' },
  { cropKey: 'crop_sesame', price: '150 ETB/kg', change: -1.2, trend: 'down' },
  { cropKey: 'crop_maize', price: '45 ETB/kg', change: 0.5, trend: 'up' },
  { cropKey: 'crop_wheat', price: '60 ETB/kg', change: -0.8, trend: 'down' },
];

const MarketScreen: React.FC = () => {
  const { t } = useAppContext();
  return (
    <div className="p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">{t('market_title')}</h1>
        <p className="text-gray-400 mt-1">{t('market_desc')}</p>
      </div>

      <div className="bg-gray-800/50 border border-purple-800 rounded-lg overflow-hidden shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-purple-900/40">
            <tr>
              <th className="p-4 font-semibold text-gray-200">{t('crop')}</th>
              <th className="p-4 font-semibold text-gray-200">{t('today_price')}</th>
              <th className="p-4 font-semibold text-gray-200">{t('weekly_change')}</th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((item, index) => (
              <tr key={index} className="border-t border-purple-800/50 hover:bg-purple-900/20">
                <td className="p-4 font-medium text-white">{t(item.cropKey)}</td>
                <td className="p-4 text-gray-300">{item.price}</td>
                <td className={`p-4 font-bold flex items-center gap-1 ${item.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {item.trend === 'up' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  {item.change}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketScreen;