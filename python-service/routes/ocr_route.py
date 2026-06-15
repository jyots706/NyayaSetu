from flask import Blueprint, request, jsonify
import pytesseract
from PIL import Image
import os

ocr_route = Blueprint('ocr_route', __name__)

@ocr_route.route('/ocr', methods=['POST'])
def ocr():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
        
    image_file = request.files['image']
    temp_path = f"temp_{image_file.filename}"
    image_file.save(temp_path)
    
    try:
        # Support Hindi and English languages
        text = pytesseract.image_to_string(Image.open(temp_path), lang='eng+hin')
        os.remove(temp_path)
        return jsonify({"extracted_text": text})
    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return jsonify({"error": str(e)}), 500
