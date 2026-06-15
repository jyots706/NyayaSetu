const { transcribeAudio } = require('../services/whisperService');
const { getLegalGuidance } = require('../services/geminiService');

const handleVoiceUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No audio file uploaded' });
        }

        // Call whisperService to transcribe
        const transcript = await transcribeAudio(req.file.path);

        // Call geminiService for legal guidance on transcript
        const language = req.body.language || 'English';
        const legalResponse = await getLegalGuidance(transcript, language);

        // Return both transcript and legal response as JSON
        res.json({
            transcription: transcript,
            transcript: transcript, // backward compat
            legalResponse: legalResponse
        });

    } catch (error) {
        console.error("Voice Controller Error:", error);
        res.status(500).json({ error: 'Server error during voice processing' });
    }
};

module.exports = { handleVoiceUpload };
