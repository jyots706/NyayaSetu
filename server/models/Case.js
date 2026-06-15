const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['RTI', 'Consumer', 'Labour', 'Family', 'Property', 'Criminal'] 
    },
    status: { 
        type: String, 
        enum: ['open', 'in-progress', 'closed'], 
        default: 'open' 
    },
    aiSummary: { type: String },
    language: { type: String },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
