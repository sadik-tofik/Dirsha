import React from 'react';
import { Bond } from '../types';
import { CloseIcon } from './IconComponents';

interface BondDetailsModalProps {
  bond: Bond;
  onClose: () => void;
  onTakeContract: () => void;
}

const DetailItem: React.FC<{ label: string; value: React.ReactNode; className?: string }> = ({ label, value, className }) => (
    <div className={className}>
        <p className="text-sm font-medium text-gray-400">{label}</p>
        <p className="text-lg text-white">{value}</p>
    </div>
);

const BondDetailsModal: React.FC<BondDetailsModalProps> = ({ bond, onClose, onTakeContract }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="bond-title">
      <div className="bg-brand-dark rounded-xl shadow-2xl shadow-purple-900/50 w-full max-w-lg max-h-[90vh] flex flex-col border-2 border-brand-green/50" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b border-purple-800/50">
          <h2 id="bond-title" className="text-2xl font-bold text-white line-clamp-1">{bond.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
            <CloseIcon />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-6">
            <p className="text-gray-300">{bond.description}</p>
            
            <div>
                <h3 className="text-lg font-semibold text-brand-green mb-2">Requirements</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{bond.requirements}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-900/50 p-4 rounded-lg">
                <DetailItem label="Contract Value" value={`ETB ${bond.price.toLocaleString()}`} />
                <DetailItem label="Price per Ton" value={`ETB ${bond.itemPrice.toLocaleString()}`} />
                <DetailItem label="Execution By" value={new Date(bond.executionTime).toLocaleDateString()} />
                <DetailItem label="Expires On" value={new Date(bond.expires).toLocaleDateString()} />
            </div>

            <div>
                <h3 className="text-lg font-semibold text-brand-green mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {bond.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-800 border border-purple-700 text-xs text-brand-green rounded-full">{tag}</span>
                    ))}
                </div>
            </div>
             <p className="text-xs text-gray-500 pt-4 border-t border-purple-800/20">Created by: {bond.creator}</p>
        </div>
        <div className="mt-auto p-5 border-t border-purple-800/50 flex justify-end">
          <button onClick={onTakeContract} className="px-8 py-3 font-semibold text-black bg-gradient-to-r from-green-500 to-teal-500 rounded-lg hover:scale-105 transform transition-transform duration-300">
            Take Contract
          </button>
        </div>
      </div>
    </div>
  );
};

export default BondDetailsModal;