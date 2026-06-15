const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getLegalGuidance = async (userQuery, language) => {
    try {
        const systemInstruction = `You are a legal aid assistant for India, answer in ${language || 'English'} based on user language, provide rights, steps, and legal draft templates.`;
        
        const model = genAI.getGenerativeModel({ 
            model: 'gemini-1.5-pro',
            systemInstruction: systemInstruction 
        });

        const result = await model.generateContent(userQuery);
        return result.response.text();
    } catch (error) {
        console.error("Gemini AI Error:", error);
        throw new Error("Failed to get legal guidance.");
    }
};

const generateDocumentSummary = async (documentText) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
        const prompt = `Please provide a concise legal summary of the following document text:\n\n${documentText}`;
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Gemini Summary Error:", error);
        throw new Error("Failed to generate document summary.");
    }
};

module.exports = { getLegalGuidance, generateDocumentSummary };
