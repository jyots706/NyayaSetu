# NyayaSetu (Legal Aid App)

## ⚠️ 3 Things to Do First (Prerequisites)

1. **MongoDB Atlas**: Create a free cluster on MongoDB Atlas, copy your connection string (URI), and paste it into `server/.env` as `MONGO_URI`.
2. **Gemini API Key**: Get your free API key from [Google AI Studio](https://aistudio.google.com/) and paste it into `server/.env` as `GEMINI_API_KEY`.
3. **Bhashini API**: Register on [bhashini.gov.in](https://bhashini.gov.in/) to get your API credentials and place them in `server/.env`.

---

## 🚀 How to Run the Servers

This application uses a microservices architecture. You will need to start three separate servers in three separate terminal windows.

### Terminal 1 — Python AI Service (Whisper + OCR)
```bash
cd python-service
source venv/bin/activate  # On Windows use: .\venv\Scripts\activate
python app.py
```
> Runs on port `8000`

### Terminal 2 — Node.js Backend
```bash
cd server
npm run dev
```
> Runs on port `5000`

### Terminal 3 — React Frontend (Vite)
```bash
cd client
npm run dev
```
> Runs on port `5173`
