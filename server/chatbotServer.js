const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const api = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: api });

app.post('/api/chat', async (req, res) => {
    try {
        const userInput = req.body.message;
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: userInput,
        });
        res.json({ reply: response.text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get a response" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
