const { Telegraf } = require('telegraf');

function setupTelegramBot(client) {
    if (!process.env.TELEGRAM_BOT_TOKEN) {
        console.log('⚠️ Telegram bot token not provided');
        return null;
    }

    const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
    
    // Store pairing codes
    const pairingCodes = new Map();

    // Start command
    bot.start((ctx) => {
        ctx.reply(`
🤖 *BICHU MD - FREE WhatsApp Bot*

💝 *100% FREE for everyone!*
📌 *Made for those who can't afford*

/pair [number] - Get pairing code
/status - Check bot status
/help - Show help menu

⚡ *Powered by BICHU MD*
        `, { parse_mode: 'Markdown' });
    });

    // Pair command
    bot.command('pair', async (ctx) => {
        const args = ctx.message.text.split(' ');
        const number = args[1];

        if (!number) {
            return ctx.reply('❌ Please provide number: /pair 923001234567');
        }

        try {
            const formattedNumber = number.replace(/\D/g, '');
            
            // Generate pairing code
            const code = await client.getPairingCode(formattedNumber);
            const chatId = ctx.chat.id;
            
            pairingCodes.set(chatId, {
                number: formattedNumber,
                code: code,
                timestamp: Date.now()
            });

            ctx.reply(`
🔑 *Pairing Code Generated!*

📱 Number: *${formattedNumber}*
🔐 Code: *${code}*

📌 *Instructions:*
1. Open WhatsApp on your phone
2. Go to Settings > Linked Devices
3. Tap "Link with Phone Number"
4. Enter this code

⏳ Code expires in 2 minutes
⚠️ Keep this code private!

💝 *FREE for everyone!*
            `, { parse_mode: 'Markdown' });

            // Auto expire
            setTimeout(() => {
                pairingCodes.delete(chatId);
            }, 120000);

        } catch (error) {
            ctx.reply(`❌ Error: ${error.message}`);
        }
    });

    // Status command
    bot.command('status', async (ctx) => {
        try {
            const state = await client.getState();
            ctx.reply(`
📊 *Bot Status*

🔐 Authenticated: ${state === 'CONNECTED' ? '✅ Yes' : '❌ No'}
📡 Connection: *${state}*
👑 Owner: ${process.env.OWNER_NUMBER}
🤖 Version: 2.0
💝 Status: FREE for everyone

⚡ *Powered by BICHU MD*
            `, { parse_mode: 'Markdown' });
        } catch (error) {
            ctx.reply('❌ Bot is offline');
        }
    });

    // Help command
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

💝 *Made for those who can't afford!*
        `, { parse_mode: 'Markdown' });
    });

    // Launch bot
    bot.launch()
        .then(() => console.log('✅ Telegram bot connected'))
        .catch(err => console.error('❌ Telegram bot error:', err));

    return bot;
}

module.exports = setupTelegramBot;