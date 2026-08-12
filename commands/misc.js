const config = require('../config');
const fs = require('fs-extra');

module.exports = {
    // ========== .allmenu ==========
    allmenu: async (message, args, client) => {
        const menu = `
╭━━〔 ☠️ ALL COMMANDS ☠️ 〕━━┈⊷
┃
┃ 👑 OWNER: .public .self .block .unblock
┃ 👥 GROUP: .add .kick .tagall .mute
┃ 📥 DOWNLOAD: .play .ytmp3 .ytmp4 .tiktok
┃ 🤖 AI: .ai .chatgpt .gemini .llama
┃ 🛠️ TOOLS: .translate .calc .weather .qr
┃ 🎮 FUN: .joke .meme .truth .dare
┃ 🎲 GAMES: .tictactoe .guess .rps
┃ 🎨 STICKER: .s .sticker .take .emojimix
┃ 🎤 VOICE: .bass .deep .robot
┃ 📱 MISC: .repo .test .save
┃
┃ 💝 *100% FREE for everyone!*
┃ ⚡ *Powered by BICHU MD*
┃
╰━━━━━━━━━━━━━━━━━━━━━┈⊷
        `;
        await message.reply(menu);
    },

    // ========== .ownermenu ==========
    ownermenu: async (message, args, client) => {
        const menu = `
╭━━〔 👑 OWNER MENU 〕━━┈⊷
┃
┃ .public - Make bot public
┃ .self - Self mode
┃ .block [number] - Block user
┃ .unblock [number] - Unblock user
┃ .broadcast [msg] - Broadcast
┃ .setppbot - Set bot PP
┃ .autobio - Auto bio
┃ .addowner [number] - Add owner
┃ .delowner [number] - Remove owner
┃ .runtime - Uptime
┃ .restart - Restart bot
┃ .ccgen - Credit card gen
┃
╰━━━━━━━━━━━━━━━━━━━━━┈⊷
        `;
        await message.reply(menu);
    },

    // ========== .groupmenu ==========
    groupmenu: async (message, args, client) => {
        const menu = `
╭━━〔 👥 GROUP MENU 〕━━┈⊷
┃
┃ .add [number] - Add member
┃ .kick [number] - Remove member
┃ .kickall - Remove all non-admins
┃ .promote [number] - Make admin
┃ .demote [number] - Remove admin
┃ .tagall - Tag everyone
┃ .hidetag [msg] - Hidden tag
┃ .mute - Group mute
┃ .unmute - Group unmute
┃ .linkgc - Get group link
┃ .poll - Create poll
┃ .welcome - Enable welcome
┃
╰━━━━━━━━━━━━━━━━━━━━━┈⊷
        `;
        await message.reply(menu);
    },

    // ========== .downloadmenu ==========
    downloadmenu: async (message, args, client) => {
        const menu = `
╭━━〔 📥 DOWNLOAD MENU 〕━━┈⊷
┃
┃ .play [song] - Play audio
┃ .ytmp3 [url] - YouTube audio
┃ .ytmp4 [url] - YouTube video
┃ .tiktok [url] - TikTok video
┃ .instagram [url] - IG video
┃ .facebook [url] - FB video
┃ .spotify [url] - Spotify
┃
╰━━━━━━━━━━━━━━━━━━━━━┈⊷
        `;
        await message.reply(menu);
    },

    // ========== .aimenu ==========
    aimenu: async (message, args, client) => {
        const menu = `
╭━━〔 🤖 AI MENU 〕━━┈⊷
┃
┃ .ai [prompt] - AI assistant
┃ .chatgpt [prompt] - ChatGPT
┃ .gemini [prompt] - Gemini AI
┃ .llama [prompt] - Llama AI
┃ .deepseek [prompt] - DeepSeek
┃ .flux [prompt] - Image generate
┃ .sdxl [prompt] - SDXL image
┃
┃ 💝 *FREE AI for everyone!*
┃
╰━━━━━━━━━━━━━━━━━━━━━┈⊷
        `;
        await message.reply(menu);
    },

    // ========== .funmenu ==========
    funmenu: async (message, args, client) => {
        const menu = `
╭━━〔 🎮 FUN MENU 〕━━┈⊷
┃
┃ .joke - Random joke
┃ .meme - Random meme
┃ .quote - Quote
┃ .fact - Fact
┃ .advice - Advice
┃ .roast - Roast someone
┃ .ship - Ship two people
┃ .hack - Fake hack
┃ .flirt - Flirt
┃ .compliment - Compliment
┃
╰━━━━━━━━━━━━━━━━━━━━━┈⊷
        `;
        await message.reply(menu);
    },

    // ========== .gamemenu ==========
    gamemenu: async (message, args, client) => {
        const menu = `
╭━━〔 🎲 GAME MENU 〕━━┈⊷
┃
┃ .tictactoe - Play Tic-Tac-Toe
┃ .truth - Truth question
┃ .dare - Dare challenge
┃ .8ball - Magic 8 Ball
┃ .flip - Coin flip
┃ .dice - Roll dice
┃ .rps - Rock Paper Scissors
┃ .guess - Guess number
┃ .math - Math solver
┃
╰━━━━━━━━━━━━━━━━━━━━━┈⊷
        `;
        await message.reply(menu);
    },

    // ========== .stickermenu ==========
    stickermenu: async (message, args, client) => {
        const menu = `
╭━━〔 🎨 STICKER MENU 〕━━┈⊷
┃
┃ .s - Image to sticker
┃ .sticker - Image to sticker
┃ .take - Take sticker
┃ .steal - Steal sticker
┃ .toimg - Sticker to image
┃ .emojimix - Mix emojis
┃ .smeme - Sticker meme
┃ .pat - Pat someone
┃ .hug - Hug someone
┃ .kiss - Kiss someone
┃
╰━━━━━━━━━━━━━━━━━━━━━┈⊷
        `;
        await message.reply(menu);
    },

    // ========== .animenenu ==========
    animemenu: async (message, args, client) => {
        const menu = `
╭━━〔 🎭 ANIME MENU 〕━━┈⊷
┃
┃ .waifu - Random waifu
┃ .neko - Random neko
┃ .animesearch [name] - Search anime
┃ .cosplay - Cosplay images
┃ .maid - Maid images
┃ .naruto - Naruto
┃ .sasuke - Sasuke
┃ .itachi - Itachi
┃ .kakashi - Kakashi
┃ .nezuko - Nezuko
┃
╰━━━━━━━━━━━━━━━━━━━━━┈⊷
        `;
        await message.reply(menu);
    },

    // ========== .repo ==========
    repo: async (message, args, client) => {
        await message.reply(`
📦 *BICHU MD - FREE WhatsApp Bot*

🔗 *Repository:* https://github.com/your-repo

💝 *FREE for everyone!*
⚡ *Features:*
- AI Chat
- Downloads
- Stickers
- Games
- Anime
- Tools

🌟 *Star this repo!*
        `);
    },

    // ========== .script ==========
    script: async (message, args, client) => {
        await message.reply(`
📜 *Bot Script*

💝 *FREE WhatsApp Bot*
🤖 *BICHU MD*

📌 *Commands: 200+*
⚡ *Platform: WhatsApp*
💡 *Made for FREE users*

*Type .allmenu for full list!*
        `);
    },

    // ========== .test ==========
    test: async (message, args, client) => {
        await message.reply('✅ Bot is working perfectly! 💝');
    },

    // ========== .save ==========
    save: async (message, args, client) => {
        if (message.hasMedia) {
            const media = await message.downloadMedia();
            await fs.ensureDir('./temp');
            const filePath = `./temp/saved_${Date.now()}.${media.mimetype.split('/')[1]}`;
            await fs.writeFile(filePath, media.data, 'base64');
            await message.reply('✅ File saved!');
        }
    },

    // ========== .download ==========
    download: async (message, args, client) => {
        const url = args[0];
        if (!url) return message.reply('❌ Provide URL!');
        await message.reply('⏳ Downloading...');
    },

    // ========== .afk ==========
    afk: async (message, args, client) => {
        const reason = args.join(' ') || 'AFK';
        global.afk = {
            user: message.author,
            reason: reason,
            time: Date.now()
        };
        await message.reply(`💤 AFK: ${reason}`);
    },

    // ========== .reminder ==========
    reminder: async (message, args, client) => {
        const [time, ...text] = args;
        if (!time || !text.length) {
            return message.reply('❌ Format: .reminder 5m Hello');
        }
        const minutes = parseInt(time);
        if (isNaN(minutes)) return message.reply('❌ Invalid time!');
        
        setTimeout(async () => {
            await message.reply(`⏰ Reminder: ${text.join(' ')}`);
        }, minutes * 60000);
        
        await message.reply(`⏰ Reminder set for ${minutes} minutes!`);
    },

    // ========== .setmood ==========
    setmood: async (message, args, client) => {
        const mood = args.join(' ') || 'happy';
        global.mood = {
            user: message.author,
            mood: mood,
            time: Date.now()
        };
        await message.reply(`😊 Mood set to: ${mood}`);
    },

    // ========== .mymood ==========
    mymood: async (message, args, client) => {
        if (global.mood && global.mood.user === message.author) {
            await message.reply(`😊 Your mood: ${global.mood.mood}`);
        } else {
            await message.reply('😊 You haven\'t set your mood yet!');
        }
    },

    // ========== .warmgpt ==========
    warmgpt: async (message, args, client) => {
        await message.reply('🔥 WarmGPT feature (AI warmup)');
    },

    // ========== .vv ==========
    vv: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('📹 View once message');
        }
    },

    // ========== .vv2 ==========
    vv2: async (message, args, client) => {
        await message.reply('📹 View once feature');
    },

    // ========== .tiktokstalk ==========
    tiktokstalk: async (message, args, client) => {
        const username = args[0];
        if (!username) return message.reply('❌ Provide TikTok username!');
        await message.reply(`🔍 Stalking TikTok: ${username}`);
    },

    // ========== .igstalk ==========
    igstalk: async (message, args, client) => {
        const username = args[0];
        if (!username) return message.reply('❌ Provide Instagram username!');
        await message.reply(`🔍 Stalking Instagram: ${username}`);
    },

    // ========== .ffstalk ==========
    ffstalk: async (message, args, client) => {
        const id = args[0];
        if (!id) return message.reply('❌ Provide FreeFire ID!');
        await message.reply(`🔍 Stalking FreeFire: ${id}`);
    },

    // ========== .checkidch ==========
    checkidch: async (message, args, client) => {
        await message.reply('✅ ID check');
    },

    // ========== .reactch ==========
    reactch: async (message, args, client) => {
        const emoji = args[0] || '❤️';
        // React to message
        await message.reply(`✅ Reacted with ${emoji}`);
    },

    // ========== .fakereact ==========
    fakereact: async (message, args, client) => {
        await message.reply('✅ Fake reaction');
    },

    // ========== .autoreact ==========
    autoreact: async (message, args, client) => {
        global.autoReact = !global.autoReact;
        await message.reply(`🤖 Auto-react ${global.autoReact ? 'enabled' : 'disabled'}!`);
    },

    // ========== .enc ==========
    enc: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text to encrypt!');
        
        const encrypted = Buffer.from(text).toString('base64');
        await message.reply(`🔐 Encrypted: ${encrypted}`);
    },

    // ========== .dec ==========
    dec: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text to decrypt!');
        
        try {
            const decrypted = Buffer.from(text, 'base64').toString('utf-8');
            await message.reply(`🔓 Decrypted: ${decrypted}`);
        } catch (e) {
            await message.reply('❌ Invalid encrypted text!');
        }
    }
};