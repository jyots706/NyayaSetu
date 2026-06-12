const { transcribeAudio } = require('../services/whisperService');
const Case = require('../models/Case');

const handleVoiceUpload = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No audio file uploaded' });

        // Call the Python Microservice to transcribe
        const transcription = await transcribeAudio(req.file.path);

        // Optionally associate with a case if caseId is provided
        const { caseId } = req.body;
        if (caseId) {
            const currentCase = await Case.findById(caseId);
            if (currentCase) {
                currentCase.transcription = currentCase.transcription 
                    ? currentCase.transcription + '\n' + transcription 
                    : transcription;
                await currentCase.save();
            }
        }

        res.json({ message: 'Transcription successful', transcription });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { handleVoiceUpload };
