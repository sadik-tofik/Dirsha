import React, { useState, useRef } from 'react';
import { MicrophoneIcon, StopIcon } from './IconComponents';
import { transcribeVoice } from '../services/geminiService';

interface VoiceInputProps {
    onTranscription: (text: string) => void;
    onStartRecording?: () => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscription, onStartRecording }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [status, setStatus] = useState('idle');
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const handleStartRecording = async () => {
        if (isRecording) {
            handleStopRecording();
            return;
        }

        if (onStartRecording) {
            onStartRecording();
        }

        setStatus('recording');
        setIsRecording(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const options = { mimeType: 'audio/webm' };
            mediaRecorderRef.current = new MediaRecorder(stream, MediaRecorder.isTypeSupported(options.mimeType) ? options : undefined);

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = async () => {
                setStatus('transcribing');
                const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorderRef.current?.mimeType || 'audio/webm' });
                const transcript = await transcribeVoice(audioBlob);
                onTranscription(transcript);
                audioChunksRef.current = [];
                // Stop the tracks to turn off the mic indicator in the browser
                stream.getTracks().forEach(track => track.stop());
                setStatus('idle');
            };
            mediaRecorderRef.current.start();
        } catch (err) {
            console.error("Error accessing microphone:", err);
            setStatus('error');
            setIsRecording(false);
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    };

    const getButtonContent = () => {
        switch (status) {
            case 'recording': return <><StopIcon className="w-6 h-6" /> Stop</>;
            case 'transcribing': return 'Processing...';
            case 'error': return 'Error';
            default: return <><MicrophoneIcon className="w-6 h-6" /> Voice</>;
        }
    }

    return (
        <div className="flex justify-center my-4">
            <button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                disabled={status === 'transcribing'}
                className={`flex items-center gap-2 px-6 py-3 font-bold rounded-full transition-all duration-300 ${isRecording ? 'bg-red-500' : 'bg-gradient-to-r from-green-500 to-purple-600'} text-white shadow-lg disabled:opacity-70 disabled:cursor-wait`}
            >
                {getButtonContent()}
            </button>
        </div>
    );
};

export default VoiceInput;