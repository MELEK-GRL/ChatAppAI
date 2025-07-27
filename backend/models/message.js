const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversationId: { type: String, required: true },  // Aynı konuşmayı gruplamak için
    sender: { type: String, enum: ['Hasta', 'Doktor AI'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
