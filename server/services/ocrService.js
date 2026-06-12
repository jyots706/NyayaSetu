const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const processImage = async (filePath) => {
    try {
        const formData = new FormData();
        formData.append('image', fs.createReadStream(filePath));

        const response = await axios.post(`${process.env.PYTHON_SERVICE_URL}/api/ocr/process`, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });
        
        return response.data.extracted_text;
    } catch (error) {
        console.error("OCR Service Error:", error.message);
        throw new Error("Failed to process image OCR.");
    }
};

module.exports = { processImage };
