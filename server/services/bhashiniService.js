const axios = require('axios');

// Supported language codes mapped to Bhashini standard language codes
const languageMap = {
    'English': 'en',
    'Hindi': 'hi',
    'Bengali': 'bn',
    'Tamil': 'ta',
    'Telugu': 'te',
    'Marathi': 'mr'
};

const translateText = async (text, sourceLang, targetLang) => {
    const apiKey = process.env.BHASHINI_API_KEY;
    const userId = process.env.BHASHINI_USER_ID;
    
    const sourceLangCode = languageMap[sourceLang] || sourceLang;
    const targetLangCode = languageMap[targetLang] || targetLang;

    if (sourceLangCode === targetLangCode) return text;

    // Check if credentials are missing or are still the default dummy values
    if (!apiKey || !userId || apiKey === 'your_bhashini_key' || userId === 'your_bhashini_user_id') {
        console.warn("⚠️ Using Mock Translation: Bhashini API credentials not yet configured.");
        return `[Mock Translated to ${targetLang}]: ${text}`;
    }

    try {
        const response = await axios.post(
            'https://dhruva-api.bhashini.gov.in/services/inference/pipeline',
            {
                pipelineTasks: [
                    {
                        taskType: "translation",
                        config: {
                            language: {
                                sourceLanguage: sourceLangCode,
                                targetLanguage: targetLangCode
                            }
                        }
                    }
                ],
                inputData: {
                    input: [
                        {
                            source: text
                        }
                    ]
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiKey,
                    'userID': userId
                }
            }
        );

        if (response.data && response.data.pipelineResponse) {
            return response.data.pipelineResponse[0].output[0].target;
        }
        
        return `[Translated to ${targetLang}]: ${text}`;
    } catch (error) {
        console.error("Bhashini Translation Error:", error.response?.data || error.message);
        throw new Error('Failed to translate text using Bhashini service');
    }
};

module.exports = {
    translateText
};
