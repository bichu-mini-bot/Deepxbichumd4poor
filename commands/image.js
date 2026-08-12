const axios = require('axios');

module.exports = {
    // ========== .blackpink ==========
    blackpink: async (message, args, client) => {
        try {
            const response = await axios.get('https://api.waifu.pics/sfw/waifu');
            await client.sendMessage(message.from, {
                image: { url: response.data.url },
                caption: '🖤💗 Blackpink'
            });
        } catch (e) {
            await message.reply('❌ Error fetching image!');
        }
    },

    // ========== .randblackpink ==========
    randblackpink: async (message, args, client) => {
        try {
            const response = await axios.get('https://api.waifu.pics/sfw/waifu');
            await client.sendMessage(message.from, {
                image: { url: response.data.url },
                caption: '🖤💗 Random Blackpink'
            });
        } catch (e) {
            await message.reply('❌ Error!');
        }
    },

    // ========== .jennie ==========
    jennie: async (message, args, client) => {
        await message.reply('🖤💗 Jennie');
    },

    // ========== .jisoo ==========
    jisoo: async (message, args, client) => {
        await message.reply('🖤💗 Jisoo');
    },

    // ========== .jennie1 ==========
    jennie1: async (message, args, client) => {
        await message.reply('🖤💗 Jennie');
    },

    // ========== .rosee ==========
    rosee: async (message, args, client) => {
        await message.reply('🖤💗 Rosé');
    },

    // ========== .rose ==========
    rose: async (message, args, client) => {
        await message.reply('🖤💗 Rosé');
    },

    // ========== .ryujin ==========
    ryujin: async (message, args, client) => {
        await message.reply('🖤💗 Ryujin');
    },

    // ========== .bts ==========
    bts: async (message, args, client) => {
        await message.reply('💜 BTS');
    },

    // ========== .exo ==========
    exo: async (message, args, client) => {
        await message.reply('💛 EXO');
    },

    // ========== .cecan ==========
    cecan: async (message, args, client) => {
        try {
            const response = await axios.get('https://api.waifu.pics/sfw/waifu');
            await client.sendMessage(message.from, {
                image: { url: response.data.url },
                caption: '👤 Cecan'
            });
        } catch (e) {}
    },

    // ========== .cewek ==========
    cewek: async (message, args, client) => {
        try {
            const response = await axios.get('https://api.waifu.pics/sfw/waifu');
            await client.sendMessage(message.from, {
                image: { url: response.data.url },
                caption: '👤 Cewek'
            });
        } catch (e) {}
    },

    // ========== .china ==========
    china: async (message, args, client) => {
        await message.reply('🇨🇳 China');
    },

    // ========== .chinese ==========
    chinese: async (message, args, client) => {
        await message.reply('🇨🇳 Chinese');
    },

    // ========== .hijab ==========
    hijab: async (message, args, client) => {
        await message.reply('🧕 Hijab');
    },

    // ========== .indonesia ==========
    indonesia: async (message, args, client) => {
        await message.reply('🇮🇩 Indonesia');
    },

    // ========== .indonesian ==========
    indonesian: async (message, args, client) => {
        await message.reply('🇮🇩 Indonesian');
    },

    // ========== .japanese ==========
    japanese: async (message, args, client) => {
        await message.reply('🇯🇵 Japanese');
    },

    // ========== .japan ==========
    japan: async (message, args, client) => {
        await message.reply('🇯🇵 Japan');
    },

    // ========== .korean ==========
    korean: async (message, args, client) => {
        await message.reply('🇰🇷 Korean');
    },

    // ========== .korea ==========
    korea: async (message, args, client) => {
        await message.reply('🇰🇷 Korea');
    },

    // ========== .malaysia ==========
    malaysia: async (message, args, client) => {
        await message.reply('🇲🇾 Malaysia');
    },

    // ========== .malaysian ==========
    malaysian: async (message, args, client) => {
        await message.reply('🇲🇾 Malaysian');
    },

    // ========== .thailand ==========
    thailand: async (message, args, client) => {
        await message.reply('🇹🇭 Thailand');
    },

    // ========== .thai ==========
    thai: async (message, args, client) => {
        await message.reply('🇹🇭 Thai');
    },

    // ========== .vietnam ==========
    vietnam: async (message, args, client) => {
        await message.reply('🇻🇳 Vietnam');
    },

    // ========== .vietnamese ==========
    vietnamese: async (message, args, client) => {
        await message.reply('🇻🇳 Vietnamese');
    },

    // ========== .cyber ==========
    cyber: async (message, args, client) => {
        await message.reply('💻 Cyber');
    },

    // ========== .cyberpunk ==========
    cyberpunk: async (message, args, client) => {
        await message.reply('💻 Cyberpunk');
    },

    // ========== .cybergirl ==========
    cybergirl: async (message, args, client) => {
        await message.reply('💻 Cyber Girl');
    },

    // ========== .hacker ==========
    hacker: async (message, args, client) => {
        await message.reply('💻 Hacker');
    },

    // ========== .hackerwall ==========
    hackerwall: async (message, args, client) => {
        await message.reply('💻 Hacker Wallpaper');
    },

    // ========== .technology ==========
    technology: async (message, args, client) => {
        await message.reply('💻 Technology');
    },

    // ========== .tech ==========
    tech: async (message, args, client) => {
        await message.reply('💻 Tech');
    },

    // ========== .mountain ==========
    mountain: async (message, args, client) => {
        await message.reply('🏔️ Mountain');
    },

    // ========== .mountains ==========
    mountains: async (message, args, client) => {
        await message.reply('🏔️ Mountains');
    },

    // ========== .spacewall ==========
    spacewall: async (message, args, client) => {
        await message.reply('🚀 Space Wallpaper');
    },

    // ========== .islamic ==========
    islamic: async (message, args, client) => {
        await message.reply('🕌 Islamic');
    },

    // ========== .islamicwall ==========
    islamicwall: async (message, args, client) => {
        await message.reply('🕌 Islamic Wallpaper');
    },

    // ========== .quran ==========
    quran: async (message, args, client) => {
        await message.reply('📖 Quran');
    },

    // ========== .quranwall ==========
    quranwall: async (message, args, client) => {
        await message.reply('📖 Quran Wallpaper');
    },

    // ========== .freefire ==========
    freefire: async (message, args, client) => {
        await message.reply('🎮 Free Fire');
    },

    // ========== .ff ==========
    ff: async (message, args, client) => {
        await message.reply('🎮 FF');
    },

    // ========== .gamewallpaper ==========
    gamewallpaper: async (message, args, client) => {
        await message.reply('🎮 Game Wallpaper');
    },

    // ========== .gamewall ==========
    gamewall: async (message, args, client) => {
        await message.reply('🎮 Game Wall');
    },

    // ========== .pubg ==========
    pubg: async (message, args, client) => {
        await message.reply('🎮 PUBG');
    },

    // ========== .pubgwall ==========
    pubgwall: async (message, args, client) => {
        await message.reply('🎮 PUBG Wallpaper');
    },

    // ========== .wallhp ==========
    wallhp: async (message, args, client) => {
        await message.reply('📱 Wallpaper HP');
    },

    // ========== .phonewallpaper ==========
    phonewallpaper: async (message, args, client) => {
        await message.reply('📱 Phone Wallpaper');
    },

    // ========== .wallml ==========
    wallml: async (message, args, client) => {
        await message.reply('🎮 Mobile Legends Wallpaper');
    },

    // ========== .mobilelegends ==========
    mobilelegends: async (message, args, client) => {
        await message.reply('🎮 Mobile Legends');
    },

    // ========== .wallmlnime ==========
    wallmlnime: async (message, args, client) => {
        await message.reply('🎮 ML Anime Wallpaper');
    },

    // ========== .mlnime ==========
    mlnime: async (message, args, client) => {
        await message.reply('🎮 ML Anime');
    }
};