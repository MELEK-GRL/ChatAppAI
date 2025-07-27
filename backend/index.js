require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 5000;

// OpenAI ayarları (v5 uyumlu)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB bağlantısı başarılı'))
    .catch((err) => console.error('MongoDB bağlantı hatası:', err));

// Mesaj modeli
const messageSchema = new mongoose.Schema({
    conversationId: { type: String, required: true },
    sender: { type: String, enum: ['Hasta', 'Doktor AI'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model('Message', messageSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Backend çalışıyor!');
});

// Mesaj gönderme ve yanıt alma
app.post('/conversations/:conversationId/messages', async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { sender, content } = req.body;

        if (!sender || !content) {
            return res.status(400).json({ error: 'sender ve content alanları zorunludur' });
        }

        // Kullanıcı mesajı kaydet
        const userMessage = new Message({ conversationId, sender, content });
        await userMessage.save();

        let aiMessage = null;

        if (sender === 'Hasta') {
            const previousMessages = await Message.find({ conversationId }).sort({ timestamp: 1 });

            const chatHistory = previousMessages.map((msg) => ({
                role: msg.sender === 'Hasta' ? 'user' : 'assistant',
                content: msg.content,
            }));

            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'Sen bir sağlık asistanısın. Hastaların sorularına açıklayıcı, samimi ve dikkatli cevaplar ver.',
                    },
                    ...chatHistory,
                ],
            });

            const aiResponse = completion.choices[0].message.content;

            aiMessage = new Message({
                conversationId,
                sender: 'Doktor AI',
                content: aiResponse,
            });

            await aiMessage.save();
        }

        res.status(201).json({
            userMessage,
            aiMessage,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});

// Konuşma mesajlarını getir
app.get('/conversations/:conversationId/messages', async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await Message.find({ conversationId }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
