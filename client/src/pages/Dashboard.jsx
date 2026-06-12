import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import VoiceInput from '../components/VoiceInput';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAppContext();
    const navigate = useNavigate();
    const [transcription, setTranscription] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div style={{ marginTop: '5vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Dashboard</h2>
                <button className="btn-primary" style={{ backgroundColor: 'transparent', border: '1px solid #EF4444', color: '#EF4444' }} onClick={handleLogout}>Logout</button>
            </div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Welcome back, <strong>{user?.name}</strong>!</p>
            
            <div className="glass-card" style={{ marginTop: '2rem' }}>
                <h3>Submit New Evidence</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Record your statement. Our Whisper AI will automatically transcribe and process it.
                </p>
                <VoiceInput onUploadSuccess={(text) => setTranscription(text)} />
                
                {transcription && (
                    <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--white)', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                        <h4 style={{ color: 'var(--primary)', margin: '0 0 0.5rem 0' }}>Transcription Result:</h4>
                        <p style={{ fontStyle: 'italic', color: 'var(--text-main)', lineHeight: '1.5' }}>"{transcription}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
