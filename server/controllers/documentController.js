const Document = require('../models/Document');
const Case = require('../models/Case');

const uploadDocument = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
        
        const { caseId } = req.body;
        
        const newDoc = await Document.create({
            caseId,
            user: req.user.id,
            fileName: req.file.originalname,
            fileUrl: req.file.path
        });

        res.status(201).json({ message: 'Document uploaded', document: newDoc });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCaseDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ caseId: req.params.caseId });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { uploadDocument, getCaseDocuments };
