const { getLegalGuidance } = require('../services/geminiService');

const askLegalQuestion = async (req, res) => {
    try {
        const { query, language } = req.body;
        const result = await getLegalGuidance(query, language);
        return res.json({ success: true, response: result });
    } catch (error) {
        console.error("Error in askLegalQuestion:", error);
        return res.status(500).json({ success: false, error: error.message || 'Server error' });
    }
};

module.exports = { askLegalQuestion };
