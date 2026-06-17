const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTION = `You are NyayaSetu, an AI friendly legal assistant for Indian citizens. Act as a helpful chatbot and answer general questions.

CRITICAL LANGUAGE RULE: You MUST always reply in the EXACT SAME LANGUAGE as the user's query. If the user asks in Hindi, reply in pure Hindi. If the user asks in English, reply in English.

CRITICAL FORMAT RULE: Your answers MUST be extremely short, concise, and straight to the point. Do not write long paragraphs. Use brief bullet points (1-2 sentences max per point).

For legal queries, always structure your response strictly with these short sections:
1) Your Rights
2) Steps to Take
3) Relevant Laws/IPC Sections
4) Draft Template (if needed, keep it very short)
5) Important Warning

Keep answers extremely brief. Always end with a short disclaimer advising the user to consult a lawyer.`;

// List of fallback models to try if one is experiencing high demand (503) or quota issues (429)
const MODELS_TO_TRY = [
    'gemini-2.5-flash',
    'gemini-flash-latest',
    'gemini-2.0-flash-lite',
    'gemini-2.5-pro'
];

const getLegalGuidance = async (query, language) => {
    let lastError;
    
    for (const modelName of MODELS_TO_TRY) {
        try {
            const model = genAI.getGenerativeModel({ 
                model: modelName,
                systemInstruction: SYSTEM_INSTRUCTION
            });

            const prompt = `User Query: ${query}`;
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.error(`[Gemini API] Failed with model ${modelName}:`, error.message);
            lastError = error;
            // Continue to the next model in the list
        }
    }
    
    // If all models fail, throw the last error
    throw new Error(lastError?.message || "Failed to get legal guidance after trying multiple models.");
};

const generateDocumentSummary = async (text) => {
    let lastError;
    
    for (const modelName of MODELS_TO_TRY) {
        try {
            const model = genAI.getGenerativeModel({ 
                model: modelName,
                systemInstruction: SYSTEM_INSTRUCTION
            });

            const prompt = `Please provide a concise legal summary of the following document text:\n\n${text}`;
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.error(`[Gemini API] Summary failed with model ${modelName}:`, error.message);
            lastError = error;
        }
    }
    
    throw new Error("Failed to generate document summary after trying multiple models.");
};

module.exports = { getLegalGuidance, generateDocumentSummary };
