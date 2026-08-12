require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const { Telegraf } = require('telegraf');
const fs = require('fs-extra');
const path = require('path');

// ========== IMPORTS ==========
const config = require('./config');
const pairingManager = require('./utils/pairing');
const webServer = require('./utils/webServer');
const telegramBot = require('./utils/telegramBot');

// ========== LOAD COMMANDS ==========
const commands = {
    ...require('./commands/owner'),
    ...require('./commands/group'),
    ...require('./commands/download'),
    ...require('./commands/ai'),
    ...require('./commands/tools'),
    ...require('./commands/fun'),
    ...require('./commands/game'),
    ...require('./commands/anime'),
    ...require('./commands/sticker'),
    ...require('./commands/voice'),
    ...require('./commands/reaction'),
    ...require('./commands/textmaker'),
    ...require('./commands/image'),
    ...require('./commands/misc')
};

// ========== EXPRESS APP ==========
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ========== WHATSAPP CLIENT ==========
let client = null;
let isAuthenticated = false;
let pairingCode = null;

function initializeClient() {
    client = new Client({
        authStrategy: new LocalAuth({
            dataPath: './session'
        }),
        puppeteer: {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ]
        },
        qrMaxRetries: 3,
        takeoverOnConflict: true,
        takeoverTimeoutMs: 60000,
    });

    return client;
}

// ========== CLIENT EVENTS ==========

client.on('qr', (qr) => {
    console.log('🔑 Scan QR Code:');
    qrcode.generate(qr, { small: true });
    
    // Save QR as image for web
    const qrImagePath = path.join(__dirname, 'public', 'qr.png');
    require('qrcode').toFile(qrImagePath, qr, {
        color: { dark: '#000000', light: '#ffffff' }
    });
});

client.on('authenticated', () => {
    console.log('✅ Authenticated successfully!');
    isAuthenticated = true;
    pairingCode = null;
});

client.on('ready', () => {
    console.log('✅ Bot is ready!');
    console.log(`👑 Owner: ${config.ownerNumber}`);
    console.log(`📦 Bot Name: ${config.botName}`);
    console.log(`⚡ Platform: ${config.platform}`);
    console.log(`📌 Total Commands: ${Object.keys(commands).length}`);
    console.log('💝 Made for FREE users!');
});

client.on('auth_failure', (error) => {
    console.error('❌ Auth Failed:', error);
    isAuthenticated = false;
});

client.on('disconnected', (reason) => {
    console.log('⚠️ Disconnected:', reason);
    isAuthenticated = false;
    
    setTimeout(() => {
        console.log('🔄 Reconnecting...');
        initializeClient();
        client.initialize();
    }, 5000);
});

// ========== MESSAGE HANDLER ==========
client.on('message', async (message) => {
    if (message.body.startsWith(config.prefix)) {
        const args = message.body.slice(1).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        const sender = message.author || message.from;
        
        // Check if command exists
        if (commands[command]) {
            try {
                console.log(`📩 Command: ${command} from ${sender}`);
                await commands[command](message, args, client);
            } catch (error) {
                console.error(`❌ Error in ${command}:`, error);
                await message.reply(`❌ Error: ${error.message}`);
            }
        }
    }
});

// ========== SETUP PAIRING METHODS ==========

// 1. Web Pairing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pair.html'));
});

app.post('/api/pair', async (req, res) => {
    const { number, password } = req.body;
    
    if (password !== process.env.WEB_PAIRING_PASSWORD) {
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid password' 
        });
    }

    try {
        const formattedNumber = number.replace(/\D/g, '');
        const code = await client.getPairingCode(formattedNumber);
        
        res.json({
            success: true,
            message: 'Pairing code generated!',
            data: {
                code: code,
                number: formattedNumber,
                instructions: 'Open WhatsApp > Linked Devices > Link with Phone Number'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.get('/api/status', async (req, res) => {
    try {
        const state = await client.getState();
        res.json({
            status: 'connected',
            authenticated: state === 'CONNECTED',
            state: state
        });
    } catch (error) {
        res.json({
            status: 'disconnected',
            authenticated: false,
            error: error.message
        });
    }
});

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        commands: Object.keys(commands).length,
        authenticated: isAuthenticated
    });
});

// 2. Telegram Pairing
if (process.env.PAIRING_TELEGRAM === 'true' && process.env.TELEGRAM_BOT_TOKEN) {
    const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
    
    bot.start((ctx) => {
        ctx.reply(`
🤖 *BICHU MD - FREE WhatsApp Bot*

📌 *FREE for everyone!*
💝 *Made for those who can't afford*

/pair [number] - Get pairing code
/status - Check bot status
/help - Show help menu
        `, { parse_mode: 'Markdown' });
    });

    bot.command('pair', async (ctx) => {
        const number = ctx.message.text.split(' ')[1];
        
        if (!number) {
            return ctx.reply('❌ Please provide number: /pair 923001234567');
        }

        try {
            const formattedNumber = number.replace(/\D/g, '');
            const code = await client.getPairingCode(formattedNumber);
            
            ctx.reply(`
🔑 *Pairing Code Generated!*

📱 Number: *${formattedNumber}*
🔐 Code: *${code}*

📌 *Instructions:*
1. Open WhatsApp
2. Settings > Linked Devices
3. Link with Phone Number
4. Enter this code

⏳ Code expires in 2 minutes
⚠️ Keep this code private!

💝 *FREE for everyone!*
            `, { parse_mode: 'Markdown' });
        } catch (error) {
            ctx.reply(`❌ Error: ${error.message}`);
        }
    });

    bot.command('status', (ctx) => {
        ctx.reply(`
📊 *Bot Status*

🔐 Authenticated: ${isAuthenticated ? '✅ Yes' : '❌ No'}
👑 Owner: ${config.ownerNumber}
🤖 Version: ${config.version}
📦 Commands: ${Object.keys(commands).length}
💝 Status: FREE for everyone
        `, { parse_mode: 'Markdown' });
    });

    bot.command('help', (ctx) => {
        ctx.reply(`
📚 *Help Menu - FREE Bot*

📌 *Commands:*
/pair [number] - Get pairing code
/status - Check bot status
/help - Show this menu

🔐 *Pairing Methods:*
1. Web: https://your-app.railway.app
2. Telegram: /pair command
3. WhatsApp: QR code

💡 *All features are FREE!*
⚡ *Powered by BICHU MD*
        `, { parse_mode: 'Markdown' });
    });

    bot.launch();
    console.log('✅ Telegram bot connected');
}

// ========== START SERVER ==========
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🌐 Web server running on port ${PORT}`);
    console.log(`🔗 Web Pairing URL: http://localhost:${PORT}`);
});

// ========== START BOT ==========
console.log('🚀 Starting BICHU MD Bot...');
console.log('💝 Made for FREE users!');
client = initializeClient();
client.initialize();

// ========== ERROR HANDLING ==========
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled Rejection:', error);
});

module.exports = { client, isAuthenticated, commands };