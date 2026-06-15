const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: false },
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    fileType: { type: String, required: true },
    extractedText: { type: String },
    aiSummary: { type: String },
    uploadPath: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
