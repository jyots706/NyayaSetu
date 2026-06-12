from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from routes.whisper_route import whisper_bp
from routes.ocr_route import ocr_bp

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(whisper_bp, url_prefix='/api/whisper')
app.register_blueprint(ocr_bp, url_prefix='/api/ocr')

@app.route('/', methods=['GET'])
def index():
    return {"message": "Python Microservice for Whisper and OCR is running."}

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
