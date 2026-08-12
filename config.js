require('dotenv').config();

module.exports = {
    // Bot Info
    botName: process.env.BOT_NAME || 'BICHU MD',
    ownerNumber: process.env.OWNER_NUMBER || '923001234567@c.us',
    prefix: process.env.PREFIX || '.',
    version: process.env.VERSION || '2.0.0',
    platform: 'WhatsApp+Telegram+Web',
    
    // Pairing Config
    pairing: {
        web: process.env.PAIRING_WEB === 'true',
        telegram: process.env.PAIRING_TELEGRAM === 'true',
        whatsapp: process.env.PAIRING_WHATSAPP === 'true'
    },
    
    // FREE APIs
    apiKeys: {
        gemini: process.env.GEMINI_API_KEY,
        openai: process.env.OPENAI_API_KEY,
        huggingface: process.env.HUGGINGFACE_TOKEN,
        weather: process.env.WEATHER_API_KEY,
    },
    
    // Session
    sessionSecret: process.env.SESSION_SECRET || 'default_secret',
    
    // Limits (FREE users)
    limits: {
        aiDaily: 100,
        downloadDaily: 50,
        stickerDaily: 100,
    },
    
    // Messages
    messages: {
        welcome: `
╭━━〔 💝 FREE BOT 〕━━┈⊷
┃
┃ 🤖 *BICHU MD - FREE WhatsApp Bot*
┃
┃ ✅ *100% FREE for everyone*
┃ ✅ *No payment required*
┃ ✅ *Just WhatsApp needed*
┃
┃ 📌 *Commands:*
┃ .ai [question] - AI Chat
┃ .play [song] - Music
┃ .ytmp3 [url] - Download
┃ .sticker - Make sticker
┃ .joke - Fun
┃ .waifu - Anime
┃
┃ 💝 *Made for those who can't afford*
┃ ⚡ *Powered by BICHU MD*
┃
╰━━━━━━━━━━━━━━━━━━━━━┈⊷
        `
    }
};