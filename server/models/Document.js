const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    extractedText: { type: String }, // From OCR
    summary: { type: String } // From Gemini
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
