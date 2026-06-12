import React, { useState, useRef } from 'react';
import api from '../services/api';

const VoiceInput = ({ caseId, onUploadSuccess }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                setAudioBlob(audioBlob);
                audioChunksRef.current = [];
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert("Please allow microphone permissions.");
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    const handleUpload = async () => {
        if (!audioBlob) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.wav');
        if (caseId) formData.append('caseId', caseId);

        try {
            const { data } = await api.post('/voice/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setAudioBlob(null);
            if (onUploadSuccess) onUploadSuccess(data.transcription);
        } catch (error) {
            console.error("Voice upload failed:", error);
            alert("Failed to transcribe audio.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div style={{ marginBottom: '1rem', padding: '1.5rem', background: 'rgba(255,255,255,0.5)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Voice Recording</h4>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!isRecording ? (
                    <button className="btn-primary" onClick={startRecording}>Start Recording</button>
                ) : (
                    <button className="btn-primary" style={{ backgroundColor: '#EF4444' }} onClick={stopRecording}>Stop Recording</button>
                )}
                {audioBlob && (
                    <button 
                        className="btn-primary" 
                        style={{ backgroundColor: 'var(--secondary)' }} 
                        onClick={handleUpload}
                        disabled={isUploading}
                    >
                        {isUploading ? 'Transcribing...' : 'Upload & Transcribe'}
                    </button>
                )}
            </div>
            {isRecording && <p style={{ color: '#EF4444', marginTop: '1rem', animation: 'pulse 1.5s infinite' }}>● Recording...</p>}
        </div>
    );
};

export default VoiceInput;
