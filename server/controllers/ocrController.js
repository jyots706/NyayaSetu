const { processImage } = require('../services/ocrService');
const Document = require('../models/Document');

const handleOcrProcess = async (req, res) => {
    try {
        const { documentId } = req.body;
        if (!documentId) return res.status(400).json({ message: 'Document ID is required' });

        const document = await Document.findById(documentId);
        if (!document) return res.status(404).json({ message: 'Document not found' });

        // Process OCR
        const extractedText = await processImage(document.fileUrl);

        // Save extracted text
        document.extractedText = extractedText;
        await document.save();

        res.json({ message: 'OCR processed successfully', extractedText });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { handleOcrProcess };
