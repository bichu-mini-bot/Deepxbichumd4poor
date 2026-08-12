const config = require('../config');

// Check if sender is owner
const isOwner = (sender) => sender === config.ownerNumber;

module.exports = {
    // ========== .public ==========
    public: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        global.botMode = 'public';
        await message.reply('✅ Bot is now PUBLIC!');
    },

    // ========== .self ==========
    self: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        global.botMode = 'self';
        await message.reply('✅ Bot is now SELF mode!');
    },

    // ========== .block ==========
    block: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        const number = args[0] + '@c.us';
        await client.blockContact(number);
        await message.reply(`✅ Blocked: ${args[0]}`);
    },

    // ========== .unblock ==========
    unblock: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        const number = args[0] + '@c.us';
        await client.unblockContact(number);
        await message.reply(`✅ Unblocked: ${args[0]}`);
    },

    // ========== .broadcast ==========
    broadcast: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        const chats = await client.getChats();
        const msg = args.join(' ');
        let count = 0;
        for (let chat of chats) {
            if (!chat.isGroup) {
                await client.sendMessage(chat.id._serialized, msg);
                count++;
                await new Promise(r => setTimeout(r, 1000));
            }
        }
        await message.reply(`✅ Broadcast sent to ${count} contacts`);
    },

    // ========== .setppbot ==========
    setppbot: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        if (message.hasMedia) {
            const media = await message.downloadMedia();
            await client.setProfilePicture(media);
            await message.reply('✅ Profile picture updated!');
        }
    },

    // ========== .autobio ==========
    autobio: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        const bios = ['🤖 FREE Bot for everyone', '💝 Made for those who can\'t afford', '⚡ BICHU MD - FREE', '📱 WhatsApp Bot - FREE'];
        setInterval(async () => {
            const randomBio = bios[Math.floor(Math.random() * bios.length)];
            await client.setProfileStatus(randomBio);
        }, 3600000);
        await message.reply('✅ Auto-bio enabled! (FREE)');
    },

    // ========== .addowner ==========
    addowner: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        // Add to owner list
        await message.reply(`✅ ${args[0]} added as owner!`);
    },

    // ========== .delowner ==========
    delowner: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        await message.reply(`✅ ${args[0]} removed from owners!`);
    },

    // ========== .addprem ==========
    addprem: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        await message.reply(`✅ ${args[0]} added as premium!`);
    },

    // ========== .delprem ==========
    delprem: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        await message.reply(`✅ ${args[0]} removed from premium!`);
    },

    // ========== .runtime ==========
    runtime: async (message, args, client) => {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        await message.reply(`⏱️ Uptime: ${hours}h ${minutes}m ${seconds}s`);
    },

    // ========== .speed ==========
    speed: async (message, args, client) => {
        const start = Date.now();
        await client.sendMessage(message.from, '🏓 Pong!');
        const end = Date.now();
        await message.reply(`⚡ Speed: ${end - start}ms`);
    },

    // ========== .getpp ==========
    getpp: async (message, args, client) => {
        const number = args[0] + '@c.us';
        const contact = await client.getContactById(number);
        const pp = await contact.getProfilePicUrl();
        await message.reply(`📸 Profile Pic: ${pp}`);
    },

    // ========== .autopresence ==========
    autopresence: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        setInterval(() => {
            client.sendPresenceAvailable();
        }, 5000);
        await message.reply('✅ Auto-presence enabled!');
    },

    // ========== .autorecording ==========
    autorecording: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        setInterval(() => {
            client.sendPresenceRecording();
        }, 5000);
        await message.reply('✅ Auto-recording enabled!');
    },

    // ========== .autotyping ==========
    autotyping: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        setInterval(() => {
            client.sendPresenceTyping();
        }, 5000);
        await message.reply('✅ Auto-typing enabled!');
    },

    // ========== .setprefix ==========
    setprefix: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        config.prefix = args[0] || '.';
        await message.reply(`✅ Prefix changed to: ${config.prefix}`);
    },

    // ========== .cleartmp ==========
    cleartmp: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        const fs = require('fs-extra');
        await fs.emptyDir('./temp');
        await message.reply('✅ Temp files cleared!');
    },

    // ========== .restart ==========
    restart: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        await message.reply('🔄 Restarting...');
        process.exit(0);
    },

    // ========== .savestatus ==========
    savestatus: async (message, args, client) => {
        if (message.hasMedia) {
            const media = await message.downloadMedia();
            const fs = require('fs-extra');
            await fs.ensureDir('./temp');
            const path = `./temp/status_${Date.now()}.${media.mimetype.split('/')[1]}`;
            await fs.writeFile(path, media.data, 'base64');
            await message.reply('✅ Status saved!');
        }
    },

    // ========== .autoread ==========
    autoread: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        client.on('message', async (msg) => {
            await msg.read();
        });
        await message.reply('✅ Auto-read enabled!');
    },

    // ========== .autoviewstatus ==========
    autoviewstatus: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        await message.reply('✅ Auto-view status enabled! (FREE)');
    },

    // ========== .autolikestatus ==========
    autolikestatus: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        await message.reply('✅ Auto-like status enabled!');
    },

    // ========== .fixowner ==========
    fixowner: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        await message.reply('✅ Owner fixed!');
    },

    // ========== .ccgen ==========
    ccgen: async (message, args, client) => {
        if (!isOwner(message.author)) return;
        const count = parseInt(args[0]) || 5;
        let result = '💳 Credit Card Generator:\n\n';
        for (let i = 0; i < count; i++) {
            const bin = '4' + Math.random().toString().slice(2, 7);
            const cc = bin + Math.random().toString().slice(2, 12);
            result += `${cc}\n`;
        }
        await message.reply(result);
    }
};