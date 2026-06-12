from flask import Blueprint, request, jsonify
import pytesseract
from PIL import Image
import os

ocr_bp = Blueprint('ocr', __name__)

@ocr_bp.route('/process', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    image_file = request.files['image']
    file_path = os.path.join('uploads', image_file.filename)
    image_file.save(file_path)
    
    try:
        # Note: on Windows, Tesseract needs to be installed globally and in PATH, 
        # or you need to set pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
        print(f"Processing OCR for: {file_path}")
        text = pytesseract.image_to_string(Image.open(file_path))
        
        # Cleanup temp file
        if os.path.exists(file_path):
            os.remove(file_path)
            
        return jsonify({"extracted_text": text, "status": "success"})
    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({"error": str(e)}), 500
