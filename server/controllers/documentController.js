const { extractTextFromPDF } = require('../services/pdfService');
const { indexDocument } = require('../services/ragService');
const { generateDocumentSummary } = require('../services/geminiService');
const Document = require('../models/Document');

const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { caseId } = req.body; // caseId is now optional

        // 1. Extract text based on file type
        let extractedText = "";
        const mimetype = req.file.mimetype;

        if (mimetype === 'application/pdf') {
            extractedText = await extractTextFromPDF(req.file.path);
        } else if (mimetype.startsWith('image/')) {
            // Use Tesseract.js for image OCR
            const Tesseract = require('tesseract.js');
            const { data: { text } } = await Tesseract.recognize(req.file.path, 'eng+hin');
            extractedText = text;
        } else {
            return res.status(400).json({ error: 'Only PDF and Image files are supported' });
        }

        if (!extractedText || extractedText.trim().length === 0) {
            return res.status(422).json({ error: 'Could not extract text from the uploaded file.' });
        }

        // 2. Create the Document entry
        const newDoc = new Document({
            userId: req.user._id,
            caseId: caseId || null, // caseId is optional
            filename: req.file.filename,
            originalName: req.file.originalname,
            fileType: mimetype,
            extractedText: extractedText,
            uploadPath: req.file.path
        });
        
        // 3. Index in FAISS
        try {
            await indexDocument(extractedText, newDoc._id.toString());
        } catch (ragErr) {
            console.warn("RAG indexing skipped:", ragErr.message);
        }

        // 4. Generate AI Summary
        const summary = await generateDocumentSummary(extractedText);
        newDoc.aiSummary = summary;

        // 5. Save to model
        await newDoc.save();

        res.status(201).json({
            message: 'Document processed successfully',
            summary: summary,
            extractedText: extractedText.slice(0, 2000), // Return a snippet
            documentId: newDoc._id
        });
    } catch (error) {
        console.error("Document Upload Error:", error);
        res.status(500).json({ error: 'Server error during document upload: ' + error.message });
    }
};

const getDocumentSummary = async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) {
            return res.status(404).json({ error: 'Document not found' });
        }
        res.json({ summary: doc.aiSummary });
    } catch (error) {
        console.error("Get Summary Error:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { uploadDocument, getDocumentSummary };

