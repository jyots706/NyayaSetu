from flask import Blueprint, request, jsonify
import whisper
import os

whisper_bp = Blueprint('whisper', __name__)

# Load model lazily to avoid heavy startup
model = None

@whisper_bp.route('/transcribe', methods=['POST'])
def transcribe_audio():
    global model
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    
    audio_file = request.files['audio']
    file_path = os.path.join('uploads', audio_file.filename)
    audio_file.save(file_path)
    
    try:
        if model is None:
            print("Loading Whisper model...")
            model = whisper.load_model("base")
        
        print(f"Transcribing audio: {file_path}")
        result = model.transcribe(file_path)
        
        # Cleanup temp file
        if os.path.exists(file_path):
            os.remove(file_path)
            
        return jsonify({"transcription": result["text"], "status": "success"})
    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({"error": str(e)}), 500
