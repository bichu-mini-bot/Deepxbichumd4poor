const axios = require('axios');

module.exports = {
    // ========== .textimg ==========
    textimg: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        try {
            const url = `https://api.textise.xyz/?text=${encodeURIComponent(text)}`;
            await client.sendMessage(message.from, {
                image: { url: url },
                caption: `📝 ${text}`
            });
        } catch (e) {
            await message.reply('❌ Error generating image!');
        }
    },

    // ========== .txt2img ==========
    txt2img: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        try {
            const url = `https://api.textise.xyz/?text=${encodeURIComponent(text)}`;
            await client.sendMessage(message.from, {
                image: { url: url },
                caption: `📝 ${text}`
            });
        } catch (e) {
            await message.reply('❌ Error!');
        }
    },

    // ========== .text2img ==========
    text2img: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        try {
            const url = `https://api.textise.xyz/?text=${encodeURIComponent(text)}`;
            await client.sendMessage(message.from, {
                image: { url: url },
                caption: `📝 ${text}`
            });
        } catch (e) {
            await message.reply('❌ Error!');
        }
    },

    // ========== .aitext ==========
    aitext: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        await message.reply(`🤖 AI Text: ${text}`);
    },

    // ========== .logo ==========
    logo: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        const url = `https://api.textise.xyz/logo?text=${encodeURIComponent(text)}`;
        await client.sendMessage(message.from, {
            image: { url: url },
            caption: `🎨 Logo: ${text}`
        });
    },

    // ========== .logo2 ==========
    logo2: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        const url = `https://api.textise.xyz/logo?style=2&text=${encodeURIComponent(text)}`;
        await client.sendMessage(message.from, {
            image: { url: url },
            caption: `🎨 Logo: ${text}`
        });
    },

    // ========== .makelogo2 ==========
    makelogo2: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        const url = `https://api.textise.xyz/logo?style=2&text=${encodeURIComponent(text)}`;
        await client.sendMessage(message.from, {
            image: { url: url },
            caption: `🎨 Logo: ${text}`
        });
    },

    // ========== .gaming ==========
    gaming: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        const url = `https://api.textise.xyz/gaming?text=${encodeURIComponent(text)}`;
        await client.sendMessage(message.from, {
            image: { url: url },
            caption: `🎮 Gaming Logo: ${text}`
        });
    },

    // ========== .gaminglogo ==========
    gaminglogo: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        const url = `https://api.textise.xyz/gaming?text=${encodeURIComponent(text)}`;
        await client.sendMessage(message.from, {
            image: { url: url },
            caption: `🎮 Gaming Logo: ${text}`
        });
    },

    // ========== .gfx1 to .gfx12 ==========
    gfx1: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 GFX1: ${text}`);
    },
    gfx2: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 GFX2: ${text}`);
    },
    gfx3: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 GFX3: ${text}`);
    },
    gfx4: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 GFX4: ${text}`);
    },
    gfx5: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 GFX5: ${text}`);
    },
    gfx6: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 GFX6: ${text}`);
    },
    gfx7: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 GFX7: ${text}`);
    },
    gfx8: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 GFX8: ${text}`);
    },
    gfx9: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 GFX9: ${text}`);
    },
    gfx10: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 GFX10: ${text}`);
    },
    gfx11: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 GFX11: ${text}`);
    },
    gfx12: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 GFX12: ${text}`);
    },

    // ========== .brat ==========
    brat: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 Brat style: ${text}`);
    },

    // ========== .furbrat ==========
    furbrat: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 Furbrat style: ${text}`);
    },

    // ========== .neon ==========
    neon: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`💡 Neon: ${text}`);
    },

    // ========== .neontext ==========
    neontext: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`💡 Neon Text: ${text}`);
    },

    // ========== .glitch ==========
    glitch: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`📺 Glitch: ${text}`);
    },

    // ========== .glitchtext ==========
    glitchtext: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`📺 Glitch Text: ${text}`);
    },

    // ========== .3dtext ==========
    '3dtext': async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 3D Text: ${text}`);
    },

    // ========== .text3d ==========
    text3d: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 3D Text: ${text}`);
    },

    // ========== .chrome ==========
    chrome: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 Chrome: ${text}`);
    },

    // ========== .metal ==========
    metal: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🔩 Metal: ${text}`);
    },

    // ========== .luxurygold ==========
    luxurygold: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`💎 Luxury Gold: ${text}`);
    },

    // ========== .goldtext ==========
    goldtext: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`💎 Gold Text: ${text}`);
    },

    // ========== .rainbow ==========
    rainbow: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🌈 Rainbow: ${text}`);
    },

    // ========== .rainbowtext ==========
    rainbowtext: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🌈 Rainbow Text: ${text}`);
    },

    // ========== .gradient ==========
    gradient: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 Gradient: ${text}`);
    },

    // ========== .gradienttext ==========
    gradienttext: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 Gradient Text: ${text}`);
    },

    // ========== .firetext ==========
    firetext: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🔥 Fire Text: ${text}`);
    },

    // ========== .lightning ==========
    lightning: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`⚡ Lightning: ${text}`);
    },

    // ========== .thunder ==========
    thunder: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`⚡ Thunder: ${text}`);
    },

    // ========== .watertext ==========
    watertext: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`💧 Water Text: ${text}`);
    },

    // ========== .ice ==========
    ice: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`❄️ Ice: ${text}`);
    },

    // ========== .frozen ==========
    frozen: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`❄️ Frozen: ${text}`);
    },

    // ========== .galaxy ==========
    galaxy: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🌌 Galaxy: ${text}`);
    },

    // ========== .space ==========
    space: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🚀 Space: ${text}`);
    },

    // ========== .animetext ==========
    animetext: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 Anime Text: ${text}`);
    },

    // ========== .graffiti ==========
    graffiti: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 Graffiti: ${text}`);
    },

    // ========== .graffititext ==========
    graffititext: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🎨 Graffiti Text: ${text}`);
    },

    // ========== .floral ==========
    floral: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🌸 Floral: ${text}`);
    },

    // ========== .flowers ==========
    flowers: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`🌸 Flowers: ${text}`);
    },

    // ========== .retro ==========
    retro: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`📼 Retro: ${text}`);
    },

    // ========== .retrotext ==========
    retrotext: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`📼 Retro Text: ${text}`);
    },

    // ========== .horror ==========
    horror: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`👻 Horror: ${text}`);
    },

    // ========== .scary ==========
    scary: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`👻 Scary: ${text}`);
    }
};