const { FAISS } = require('@langchain/community/vectorstores/faiss');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const { RecursiveCharacterTextSplitter } = require('@langchain/textsplitters');

let vectorStore = null;

const getEmbeddings = () => {
    return new GoogleGenerativeAIEmbeddings({
        modelName: "embedding-001",
        apiKey: process.env.GEMINI_API_KEY
    });
};

const indexDocument = async (text, documentId) => {
    try {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const docs = await splitter.createDocuments([text], [{ documentId }]);
        const embeddings = getEmbeddings();

        if (!vectorStore) {
            vectorStore = await FAISS.fromDocuments(docs, embeddings);
        } else {
            await vectorStore.addDocuments(docs);
        }
        
        return true;
    } catch (error) {
        console.error("RAG Indexing Error:", error.message);
        throw new Error("Failed to index document");
    }
};

const searchRelevantDocs = async (query) => {
    try {
        if (!vectorStore) {
            return [];
        }
        const results = await vectorStore.similaritySearch(query, 3);
        return results;
    } catch (error) {
        console.error("RAG Search Error:", error.message);
        throw new Error("Failed to search relevant documents");
    }
};

module.exports = { indexDocument, searchRelevantDocs };
