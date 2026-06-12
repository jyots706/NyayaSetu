const { getLegalDraft } = require('../services/geminiService');
const Case = require('../models/Case');

const generateDraft = async (req, res) => {
    try {
        const { caseId } = req.body;
        if (!caseId) return res.status(400).json({ message: 'Case ID is required' });

        const currentCase = await Case.findById(caseId);
        if (!currentCase) return res.status(404).json({ message: 'Case not found' });

        // Call Gemini
        const draft = await getLegalDraft(currentCase);

        // Save draft to case
        currentCase.legalDraft = draft;
        await currentCase.save();

        res.json({ message: 'Legal draft generated', draft });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { generateDraft };
