const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

const getLegalDraft = async (caseDetails) => {
    try {
        const model = new ChatGoogleGenerativeAI({
            modelName: "gemini-1.5-pro-latest", // using a modern gemini model
            maxOutputTokens: 2048,
            apiKey: process.env.GEMINI_API_KEY
        });
        
        const prompt = `You are an expert Indian lawyer. Please draft a legal summary and action plan for the following case:\n\nTitle: ${caseDetails.title}\nDescription: ${caseDetails.description}\nTranscribed Evidence: ${caseDetails.transcription || 'None'}`;
        
        const response = await model.invoke(prompt);
        return response.content;
    } catch (error) {
        console.error("Gemini AI Error:", error);
        throw new Error("Failed to generate legal draft.");
    }
};

module.exports = { getLegalDraft };
