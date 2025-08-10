import React, { useState } from 'react';
import { Bond } from '../types';
import { CloseIcon } from './IconComponents';

interface ContactFormModalProps {
  bond: Bond;
  onClose: () => void;
  onSubmit: (formData: { name: string; email: string; subject: string; message: string }) => void;
}

const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}> = ({ label, name, value, onChange, type = 'text', placeholder, required, className, disabled = false }) => (
    <div className={className}>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} disabled={disabled} className="w-full bg-gray-800 border border-purple-600 rounded-md p-2 text-white focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-700 disabled:text-gray-400"/>
    </div>
);

const ContactFormModal: React.FC<ContactFormModalProps> = ({ bond, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: `Contract Inquiry: ${bond.title}`,
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="contact-form-title">
            <div className="bg-brand-dark rounded-xl shadow-2xl shadow-purple-900/50 w-full max-w-2xl max-h-[90vh] flex flex-col border-2 border-brand-green/50" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-purple-800/50">
                    <h2 id="contact-form-title" className="text-2xl font-bold text-white">Make an Inquiry</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close form">
                        <CloseIcon />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex flex-col flex-grow">
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="flex-1" />
                            <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className="flex-1" />
                        </div>
                        <InputField label="Subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this about?" required disabled />
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message / Counter-offer (Optional)</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full bg-gray-800 border border-purple-600 rounded-md p-2 text-white focus:ring-2 focus:ring-brand-green focus:border-transparent" placeholder="You can include questions or a counter-offer here..."></textarea>
                        </div>
                    </div>
                    <div className="mt-auto pt-4 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition">Cancel</button>
                        <button type="submit" className="px-8 py-3 font-semibold text-black bg-gradient-to-r from-green-500 to-teal-500 rounded-lg hover:scale-105 transform transition-transform duration-300">Send Inquiry</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactFormModal;
