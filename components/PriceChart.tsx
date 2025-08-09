import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../hooks/useAppContext';

const data = [
  { name: 'Jan', price: 180 },
  { name: 'Feb', price: 185 },
  { name: 'Mar', price: 200 },
  { name: 'Apr', price: 195 },
  { name: 'May', price: 210 },
  { name: 'Jun', price: 215 },
];

const PriceChart: React.FC = () => {
  const { t } = useAppContext();
  
  return (
    <div className="w-full h-64 mt-4">
      <h4 className="text-lg font-semibold text-center mb-2 text-gray-300">{t('price_history')} ({t('crop_teff')})</h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(138, 43, 226, 0.3)" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: '1px solid #8A2BE2' 
            }} 
            labelStyle={{ color: '#d1d5db' }}
          />
          <Legend wrapperStyle={{color: '#d1d5db'}}/>
          <Line type="monotone" dataKey="price" stroke="#39FF14" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;