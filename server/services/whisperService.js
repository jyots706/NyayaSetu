const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const transcribeAudio = async (filePath) => {
    try {
        const formData = new FormData();
        formData.append('audio', fs.createReadStream(filePath));

        const response = await axios.post(`${process.env.PYTHON_SERVICE_URL}/api/whisper/transcribe`, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });
        
        return response.data.transcription;
    } catch (error) {
        console.error("Whisper Service Error:", error.message);
        throw new Error("Failed to transcribe audio.");
    }
};

module.exports = { transcribeAudio };
