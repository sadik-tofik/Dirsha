
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { ChevronUpIcon, ChevronDownIcon } from '../components/IconComponents';

const NewsScreen: React.FC = () => {
  const { t } = useAppContext();

  const priceAlerts = [
      { cropKey: 'crop_coffee', price: '210 ETB/kg', change: 5, trend: 'up'},
      { cropKey: 'crop_sesame', price: '150 ETB/kg', change: -1.2, trend: 'down'},
  ]

  return (
    <div className="p-4 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">{t('news_title')}</h1>
        <p className="text-gray-400 mt-1">{t('news_desc')}</p>
      </div>

      {/* Breaking News */}
      <div className="bg-red-900/40 border-2 border-red-500 rounded-lg p-4 shadow-lg">
        <h3 className="font-bold text-red-400 text-lg mb-2">{t('breaking_news')}</h3>
        <p className="text-white">"{t('news_breaking_content_1')}"</p>
      </div>
      
      {/* Price Alerts */}
      <div>
        <h3 className="text-2xl font-bold text-brand-green mb-4">{t('price_alerts')}</h3>
        <div className="bg-gray-800/50 border border-purple-800 rounded-lg overflow-hidden">
           <table className="w-full text-left">
              <thead className="bg-purple-900/40">
                <tr>
                  <th className="p-3 font-semibold text-gray-200">{t('crop')}</th>
                  <th className="p-3 font-semibold text-gray-200">{t('today_price')}</th>
                  <th className="p-3 font-semibold text-gray-200">{t('weekly_change')}</th>
                </tr>
              </thead>
              <tbody>
                {priceAlerts.map((item) => (
                    <tr key={item.cropKey} className="border-t border-purple-800/50">
                        <td className="p-3 font-medium text-white">{t(item.cropKey)}</td>
                        <td className="p-3 text-gray-300">{item.price}</td>
                        <td className={`p-3 font-bold flex items-center gap-1 ${item.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                            {item.trend === 'up' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            {item.change}%
                        </td>
                    </tr>
                ))}
              </tbody>
           </table>
        </div>
      </div>

      {/* Global Impact */}
      <div>
        <h3 className="text-2xl font-bold text-brand-green mb-4">{t('global_impact')}</h3>
        <div className="bg-gray-800/50 border border-purple-800 rounded-lg p-4">
          <p className="text-white">"{t('news_global_impact_content_1')}"</p>
        </div>
      </div>

    </div>
  );
};

export default NewsScreen;