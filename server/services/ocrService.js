const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const extractTextFromImage = async (filePath) => {
    try {
        const formData = new FormData();
        formData.append('image', fs.createReadStream(filePath));

        // Call Python Flask OCR service
        const response = await axios.post(`${process.env.PYTHON_SERVICE_URL}/ocr`, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });
        
        return response.data.extracted_text;
    } catch (error) {
        console.error("OCR Service Error:", error.message);
        throw new Error("Failed to extract text from image");
    }
};

module.exports = { extractTextFromImage };
