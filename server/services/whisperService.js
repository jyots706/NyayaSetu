const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const transcribeAudio = async (filePath) => {
    try {
        const formData = new FormData();
        formData.append('audio', fs.createReadStream(filePath));

        const pythonUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';
        console.log(`📡 Calling Python Whisper at: ${pythonUrl}/transcribe`);
        
        const response = await axios.post(`${pythonUrl}/transcribe`, formData, {
            headers: {
                ...formData.getHeaders()
            },
            timeout: 120000 // 2 minute timeout — Whisper can be slow on first run
        });
        
        console.log('✅ Whisper response:', response.data);
        return response.data.transcript;
    } catch (error) {
        const errMsg = error.response?.data?.error || error.message;
        console.error("❌ Whisper Service Error:", errMsg);
        throw new Error("Whisper transcription failed: " + errMsg);
    }
};

module.exports = { transcribeAudio };
