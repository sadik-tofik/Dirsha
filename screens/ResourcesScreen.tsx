import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { getChatbotResponse } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import VoiceInput from '../components/VoiceInput';

const MessageBubble = ({ message }: { message: ChatMessage }) => {
    const isBot = message.sender === 'bot';
    return (
        <div className={`flex items-end gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-md ${isBot ? 'bg-purple-800 rounded-bl-none text-white' : 'bg-green-700 rounded-br-none text-white'}`}>
                <p className="text-base">{message.text}</p>
            </div>
        </div>
    );
};


const ResourcesScreen: React.FC = () => {
    const { t, language } = useAppContext();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const speak = useCallback((text: string, lang: Language) => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === Language.AM ? 'am-ET' : 'en-US';
        window.speechSynthesis.speak(utterance);
    }, []);
    
    useEffect(() => {
        const initialMessageText = language === Language.AM 
            ? "ሰላም! እኔ ድርሻ ነኝ፣ የእርስዎ የግብርና ረዳት። በጽሑፍ ወይም የድምጽ ቁልፉን ተጠቅመው ማንኛውንም ነገር ስለ እርሻ ይጠይቁኝ።"
            : "Hello! I am Dirsha, your agricultural assistant. Ask me anything about farming by typing or using the voice button.";
        
        setMessages([{ sender: 'bot', text: initialMessageText }]);

        return () => {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
        };
    }, [language]);
    
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.sender === 'bot') {
            // Short delay to ensure UI updates before speaking
            setTimeout(() => speak(lastMessage.text, language), 100);
        }
    }, [messages, language, speak]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }

        const userMessage: ChatMessage = { sender: 'user', text: text.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const botResponseText = await getChatbotResponse(userMessage.text, language);
        const botMessage: ChatMessage = { sender: 'bot', text: botResponseText };
        
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };
    
    const handleVoiceCommand = (command: string) => {
        // Avoid sending transcription error messages as prompts
        if (command && !command.toLowerCase().includes("could not understand")) {
            sendMessage(command);
        }
    };

    const cancelSpeech = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
    };

    return (
        <div className="p-4 flex flex-col h-full">
            <div className="text-center mb-4">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">{t('nav_chatbot')}</h1>
                <p className="text-gray-400 mt-1">Your AI farming assistant</p>
            </div>
            
            <div className="flex-grow p-1 space-y-6 overflow-y-auto min-h-[calc(100vh-25rem)]">
                {messages.map((msg, index) => <MessageBubble key={index} message={msg} />)}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-purple-800 rounded-2xl rounded-bl-none text-white px-4 py-3">
                           <div className="flex items-center justify-center gap-1.5">
                                <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-white rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                 <div ref={messagesEndRef} />
            </div>

            <div className="mt-auto pt-4">
                 <VoiceInput 
                    onTranscription={handleVoiceCommand}
                    onStartRecording={cancelSpeech} 
                 />
                 <form onSubmit={handleFormSubmit} className="flex items-center gap-2 mt-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={cancelSpeech}
                        placeholder={t('chatbot_placeholder')}
                        className="w-full bg-gray-800 border border-purple-600 rounded-full py-3 px-5 text-white focus:ring-2 focus:ring-brand-green focus:border-transparent transition"
                        disabled={isLoading}
                    />
                    <button type="submit" className="bg-gradient-to-r from-green-500 to-purple-600 text-white rounded-full p-3.5 disabled:opacity-50 disabled:cursor-not-allowed transition-transform hover:scale-110" disabled={isLoading || !input.trim()}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResourcesScreen;