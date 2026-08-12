require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const { Telegraf } = require('telegraf');
const fs = require('fs-extra');
const path = require('path');
const QRCode = require('qrcode');

// ========== MOCK CONFIG (Agar config.js nahi hai toh yeh use hoga) ==========
let config = {};
try {
    config = require('./config');
} catch (e) {
    console.log('⚠️ config.js not found, using default env variables');
    config = {
        ownerNumber: process.env.OWNER_NUMBER || '923001234567',
        botName: process.env.BOT_NAME || 'BICHU MD',
        platform: 'Railway',
        version: '2.0.0',
        prefix: process.env.PREFIX || '!'
    };
}

// ========== LOAD COMMANDS (Try-Catch ke saath) ==========
let commands = {};
try {
    commands = {
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
} catch (e) {
    console.log('⚠️ Some command folders missing, starting with empty commands.');
}

// ========== EXPRESS APP ==========
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ========== WHATSAPP CLIENT VARIABLES ==========
let client = null;
let isAuthenticated = false;
let pairingCode = null;

// ========== CLIENT INITIALIZATION FUNCTION ==========
function initializeClient() {
    console.log('🚀 Initializing WhatsApp Client...');
    
    const newClient = new Client({
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

    // === EVENTS SETUP ===
    newClient.on('qr', (qr) => {
        console.log('🔑 Scan QR Code:');
        qrcode.generate(qr, { small: true });
        
        // Save QR as image for web
        const qrImagePath = path.join(__dirname, 'public', 'qr.png');
        QRCode.toFile(qrImagePath, qr, {
            color: { dark: '#000000', light: '#ffffff' }
        }).catch(err => console.log('QR Save error:', err.message));
    });

    newClient.on('authenticated', () => {
        console.log('✅ Authenticated successfully!');
        isAuthenticated = true;
        pairingCode = null;
    });

    newClient.on('ready', () => {
        console.log('✅ Bot is ready!');
        console.log(`👑 Owner: ${config.ownerNumber}`);
        console.log(`📦 Bot Name: ${config.botName}`);
        console.log(`⚡ Platform: ${config.platform}`);
        console.log(`📌 Total Commands: ${Object.keys(commands).length}`);
        console.log('💝 Made for FREE users!');
    });

    newClient.on('auth_failure', (error) => {
        console.error('❌ Auth Failed:', error);
        isAuthenticated = false;
    });

    newClient.on('disconnected', (reason) => {
        console.log('⚠️ Disconnected:', reason);
        isAuthenticated = false;
        
        setTimeout(() => {
            console.log('🔄 Reconnecting...');
            if (client) {
                client.destroy();
            }
            client = initializeClient();
            client.initialize();
        }, 5000);
    });

    // === MESSAGE HANDLER ===
    newClient.on('message', async (message) => {
        if (message.body && message.body.startsWith(config.prefix)) {
            const args = message.body.slice(1).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            const sender = message.author || message.from;
            
            // Check if command exists
            if (commands[command]) {
                try {
                    console.log(`📩 Command: ${command} from ${sender}`);
                    await commands[command](message, args, newClient);
                } catch (error) {
                    console.error(`❌ Error in ${command}:`, error);
                    await message.reply(`❌ Error: ${error.message}`);
                }
            }
        }
    });

    return newClient;
}

// ========== SETUP PAIRING METHODS ==========

// 1. Web Pairing
app.get('/', (req, res) => {
    const pairFilePath = path.join(__dirname, 'public', 'pair.html');
    if (fs.existsSync(pairFilePath)) {
        res.sendFile(pairFilePath);
    } else {
        res.send('<h1>BICHU MD Bot is Running!</h1><p>Upload pair.html in public folder to enable pairing.</p>');
    }
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
        if (!client) throw new Error('Client not initialized');
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
        if (!client) throw new Error('Client not initialized');
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
            if (!client) throw new Error('Client not initialized');
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

// ========== START SERVER & BOT ==========
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🌐 Web server running on port ${PORT}`);
    console.log(`🔗 Web Pairing URL: http://localhost:${PORT}`);
});

console.log('🚀 Starting BICHU MD Bot...');
console.log('💝 Made for FREE users!');

// Initialize client safely
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