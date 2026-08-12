const fs = require('fs-extra');
const path = require('path');

module.exports = {
    // ========== .s ==========
    s: async (message, args, client) => {
        if (message.hasMedia) {
            const media = await message.downloadMedia();
            await client.sendMessage(message.from, {
                sticker: media,
                mimetype: 'image/webp'
            });
        } else {
            await message.reply('❌ Send an image with caption .s');
        }
    },

    // ========== .sticker ==========
    sticker: async (message, args, client) => {
        if (message.hasMedia) {
            const media = await message.downloadMedia();
            await client.sendMessage(message.from, {
                sticker: media,
                mimetype: 'image/webp'
            });
        } else {
            await message.reply('❌ Send an image with caption .sticker');
        }
    },

    // ========== .take ==========
    take: async (message, args, client) => {
        if (message.hasMedia) {
            const media = await message.downloadMedia();
            await client.sendMessage(message.from, {
                sticker: media,
                mimetype: 'image/webp'
            });
        }
    },

    // ========== .steal ==========
    steal: async (message, args, client) => {
        if (message.hasMedia) {
            const media = await message.downloadMedia();
            await client.sendMessage(message.from, {
                sticker: media,
                mimetype: 'image/webp'
            });
        }
    },

    // ========== .toimg ==========
    toimg: async (message, args, client) => {
        if (message.hasMedia) {
            const media = await message.downloadMedia();
            await client.sendMessage(message.from, {
                image: media,
                mimetype: 'image/jpeg'
            });
        }
    },

    // ========== .emojimix ==========
    emojimix: async (message, args, client) => {
        const emojis = args.join(' ');
        if (!emojis || emojis.length < 2) {
            return message.reply('❌ Provide two emojis: .emojimix 😂🥰');
        }
        
        const emoji1 = emojis[0];
        const emoji2 = emojis[1];
        
        try {
            const response = await axios.get(`https://emojimix.app/api/mix/${emoji1}/${emoji2}`);
            const imageBuffer = Buffer.from(response.data);
            const base64 = imageBuffer.toString('base64');
            
            await client.sendMessage(message.from, {
                image: { url: `data:image/png;base64,${base64}` },
                caption: `🎨 ${emoji1} + ${emoji2}`
            });
        } catch (e) {
            await message.reply('❌ Could not mix emojis!');
        }
    },

    // ========== .smeme ==========
    smeme: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide meme text!');
        
        // Sticker meme
        await message.reply(`📸 Sticker meme: ${text}`);
    },

    // ========== .pat ==========
    pat: async (message, args, client) => {
        await message.reply('🖐️ Pat pat!');
    },

    // ========== .slap ==========
    slap: async (message, args, client) => {
        const target = args.join(' ') || 'someone';
        await message.reply(`👋 *Slap!* ${target} got slapped!`);
    },

    // ========== .hug ==========
    hug: async (message, args, client) => {
        const target = args.join(' ') || 'someone';
        await message.reply(`🤗 *Hugs* ${target}!`);
    },

    // ========== .kiss ==========
    kiss: async (message, args, client) => {
        const target = args.join(' ') || 'someone';
        await message.reply(`💋 *Kisses* ${target}!`);
    },

    // ========== .bite ==========
    bite: async (message, args, client) => {
        const target = args.join(' ') || 'someone';
        await message.reply(`🦷 ${target} got bitten!`);
    },

    // ========== .blush ==========
    blush: async (message, args, client) => {
        await message.reply('😊 *Blushes*');
    },

    // ========== .bonk ==========
    bonk: async (message, args, client) => {
        const target = args.join(' ') || 'someone';
        await message.reply(`🔨 *Bonk!* ${target} got bonked!`);
    },

    // ========== .highfive ==========
    highfive: async (message, args, client) => {
        const target = args.join(' ') || 'someone';
        await message.reply(`🖐️ High five! ${target}`);
    },

    // ========== .handhold ==========
    handhold: async (message, args, client) => {
        await message.reply('🤝 *Holds hands*');
    },

    // ========== .cuddle ==========
    cuddle: async (message, args, client) => {
        const target = args.join(' ') || 'someone';
        await message.reply(`🤗 *Cuddles* ${target}`);
    },

    // ========== .cry ==========
    cry: async (message, args, client) => {
        await message.reply('😢 *Cries*');
    },

    // ========== .dance ==========
    dance: async (message, args, client) => {
        await message.reply('💃 *Dances*');
    }
};