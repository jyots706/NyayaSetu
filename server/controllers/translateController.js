const bhashiniService = require('../services/bhashiniService');

const translateText = async (req, res) => {
    try {
        const { text, sourceLang, targetLang } = req.body;
        
        if (!text || !targetLang) {
            return res.status(400).json({ message: 'Text and targetLang are required' });
        }

        const translatedText = await bhashiniService.translateText(text, sourceLang || 'English', targetLang);
        
        res.json({ message: 'Translation successful', translatedText });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { translateText };
