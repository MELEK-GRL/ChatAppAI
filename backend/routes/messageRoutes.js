const express = require("express");
const router = express.Router();
const { openai } = require("../openai/openai");
require("dotenv").config();

router.post("/send", async (req, res) => {
    const { message, conversationId } = req.body;

    try {
        // 1. Kullanıcı mesajını kaydet
        await Message.create({
            conversationId,
            sender: "Hasta",
            content: message,
        });

        // 2. OpenAI'ye gönder
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", // veya gpt-4
            messages: [{ role: "user", content: message }],
        });

        const aiResponse = completion.data.choices[0].message.content;

        // 3. AI yanıtını da kaydet
        await Message.create({
            conversationId,
            sender: "Doktor AI",
            content: aiResponse,
        });

        // 4. Yanıtı geri döndür
        res.json({ response: aiResponse });

    } catch (error) {
        console.error("Mesaj gönderme hatası:", error);
        res.status(500).json({ error: "Bir hata oluştu" });
    }
});

module.exports = router;
