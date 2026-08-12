const axios = require('axios');

module.exports = {
    // ========== .waifu ==========
    waifu: async (message, args, client) => {
        try {
            const response = await axios.get('https://api.waifu.pics/sfw/waifu');
            await client.sendMessage(message.from, {
                image: { url: response.data.url },
                caption: '🌸 Waifu'
            });
        } catch (e) {
            await message.reply('❌ Could not fetch waifu!');
        }
    },

    // ========== .nwaifu ==========
    nwaifu: async (message, args, client) => {
        try {
            const response = await axios.get('https://api.waifu.pics/nsfw/waifu');
            await client.sendMessage(message.from, {
                image: { url: response.data.url },
                caption: '🔥 NSFW Waifu'
            });
        } catch (e) {
            await message.reply('❌ Could not fetch!');
        }
    },

    // ========== .rwaifu ==========
    rwaifu: async (message, args, client) => {
        try {
            const response = await axios.get('https://api.waifu.pics/sfw/waifu');
            await client.sendMessage(message.from, {
                image: { url: response.data.url },
                caption: '🌸 Random Waifu'
            });
        } catch (e) {
            await message.reply('❌ Error!');
        }
    },

    // ========== .neko ==========
    neko: async (message, args, client) => {
        try {
            const response = await axios.get('https://nekos.life/api/v2/img/neko');
            await client.sendMessage(message.from, {
                image: { url: response.data.url },
                caption: '🐱 Neko'
            });
        } catch (e) {
            await message.reply('❌ Could not fetch neko!');
        }
    },

    // ========== .neko2 ==========
    neko2: async (message, args, client) => {
        try {
            const response = await axios.get('https://nekos.life/api/v2/img/neko');
            await client.sendMessage(message.from, {
                image: { url: response.data.url },
                caption: '🐱 Neko'
            });
        } catch (e) {
            await message.reply('❌ Error!');
        }
    },

    // ========== .animesearch ==========
    animesearch: async (message, args, client) => {
        const query = args.join(' ');
        if (!query) return message.reply('❌ Provide anime name!');
        
        try {
            const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}&limit=1`);
            const anime = response.data.data[0];
            
            if (!anime) return message.reply('❌ No anime found!');
            
            await message.reply(`📺 ${anime.title}\n\n⭐ Score: ${anime.score}\n📅 Year: ${anime.year || 'N/A'}\n📝 Episodes: ${anime.episodes || 'N/A'}\n\n${anime.synopsis?.substring(0, 200) || 'No synopsis'}`);
        } catch (e) {
            await message.reply('❌ Error searching anime!');
        }
    },

    // ========== .animekill ==========
    animekill: async (message, args, client) => {
        await message.reply('💀 *Anime kill!*');
    },

    // ========== .animekick ==========
    animekick: async (message, args, client) => {
        await message.reply('🦵 *Anime kick!*');
    },

    // ========== .animebite ==========
    animebite: async (message, args, client) => {
        await message.reply('🦷 *Anime bite!*');
    },

    // ========== .animewave ==========
    animewave: async (message, args, client) => {
        await message.reply('👋 *Anime wave!*');
    },

    // ========== .animesmile ==========
    animesmile: async (message, args, client) => {
        await message.reply('😊 *Anime smile!*');
    },

    // ========== .animepoke ==========
    animepoke: async (message, args, client) => {
        const target = args.join(' ') || 'someone';
        await message.reply(`👉 *Pokes* ${target}`);
    },

    // ========== .animewink ==========
    animewink: async (message, args, client) => {
        await message.reply('😉 *Anime wink!*');
    },

    // ========== .animebonk ==========
    animebonk: async (message, args, client) => {
        await message.reply('🔨 *Anime bonk!*');
    },

    // ========== .animebully ==========
    animebully: async (message, args, client) => {
        const target = args.join(' ') || 'someone';
        await message.reply(`😤 *Bullies* ${target}`);
    },

    // ========== .animeyeet ==========
    animeyeet: async (message, args, client) => {
        await message.reply('🚀 *YEET!*');
    },

    // ========== .akiyama ==========
    akiyama: async (message, args, client) => {
        try {
            const response = await axios.get('https://api.waifu.pics/sfw/waifu');
            await client.sendMessage(message.from, {
                image: { url: response.data.url },
                caption: '🌸 Akiyama'
            });
        } catch (e) {}
    },

    // ========== .ana ==========
    ana: async (message, args, client) => {
        await message.reply('🌸 Ana');
    },

    // ========== .art ==========
    art: async (message, args, client) => {
        await message.reply('🎨 Anime art');
    },

    // ========== .asuna ==========
    asuna: async (message, args, client) => {
        await message.reply('⚔️ Asuna');
    },

    // ========== .ayuzawa ==========
    ayuzawa: async (message, args, client) => {
        await message.reply('🌸 Ayuzawa');
    },

    // ========== .boruto ==========
    boruto: async (message, args, client) => {
        await message.reply('🍥 Boruto');
    },

    // ========== .chino ==========
    chino: async (message, args, client) => {
        await message.reply('🐰 Chino');
    },

    // ========== .cosplay ==========
    cosplay: async (message, args, client) => {
        try {
            const response = await axios.get('https://api.waifu.pics/sfw/cosplay');
            await client.sendMessage(message.from, {
                image: { url: response.data.url },
                caption: '🎭 Cosplay'
            });
        } catch (e) {}
    },

    // ========== .deidara ==========
    deidara: async (message, args, client) => {
        await message.reply('💣 Deidara');
    },

    // ========== .doraemon ==========
    doraemon: async (message, args, client) => {
        await message.reply('🤖 Doraemon');
    },

    // ========== .elaina ==========
    elaina: async (message, args, client) => {
        await message.reply('🧙 Elaina');
    },

    // ========== .emilia ==========
    emilia: async (message, args, client) => {
        await message.reply('❄️ Emilia');
    },

    // ========== .erza ==========
    erza: async (message, args, client) => {
        await message.reply('⚔️ Erza');
    },

    // ========== .gremory ==========
    gremory: async (message, args, client) => {
        await message.reply('👿 Gremory');
    },

    // ========== .hestia ==========
    hestia: async (message, args, client) => {
        await message.reply('🔥 Hestia');
    },

    // ========== .husbu ==========
    husbu: async (message, args, client) => {
        await message.reply('💕 Husbu');
    },

    // ========== .inori ==========
    inori: async (message, args, client) => {
        await message.reply('🎵 Inori');
    },

    // ========== .isuzu ==========
    isuzu: async (message, args, client) => {
        await message.reply('🚗 Isuzu');
    },

    // ========== .itachi ==========
    itachi: async (message, args, client) => {
        await message.reply('🕶️ Itachi');
    },

    // ========== .itori ==========
    itori: async (message, args, client) => {
        await message.reply('🌸 Itori');
    },

    // ========== .kaga ==========
    kaga: async (message, args, client) => {
        await message.reply('⚓ Kaga');
    },

    // ========== .kagura ==========
    kagura: async (message, args, client) => {
        await message.reply('🌸 Kagura');
    },

    // ========== .kakashi ==========
    kakashi: async (message, args, client) => {
        await message.reply('📖 Kakashi');
    },

    // ========== .kaori ==========
    kaori: async (message, args, client) => {
        await message.reply('🎻 Kaori');
    },

    // ========== .keneki ==========
    keneki: async (message, args, client) => {
        await message.reply('🍕 Keneki');
    },

    // ========== .kotori ==========
    kotori: async (message, args, client) => {
        await message.reply('🎤 Kotori');
    },

    // ========== .kurumi ==========
    kurumi: async (message, args, client) => {
        await message.reply('🕰️ Kurumi');
    },

    // ========== .loli ==========
    loli: async (message, args, client) => {
        await message.reply('🌸 Loli');
    },

    // ========== .madara ==========
    madara: async (message, args, client) => {
        await message.reply('🌀 Madara');
    },

    // ========== .maid ==========
    maid: async (message, args, client) => {
        try {
            const response = await axios.get('https://api.waifu.pics/sfw/maid');
            await client.sendMessage(message.from, {
                image: { url: response.data.url },
                caption: '🧹 Maid'
            });
        } catch (e) {}
    },

    // ========== .megumin ==========
    megumin: async (message, args, client) => {
        await message.reply('💥 Megumin');
    },

    // ========== .mikasa ==========
    mikasa: async (message, args, client) => {
        await message.reply('⚔️ Mikasa');
    },

    // ========== .miku ==========
    miku: async (message, args, client) => {
        await message.reply('🎤 Miku');
    },

    // ========== .minato ==========
    minato: async (message, args, client) => {
        await message.reply('⚡ Minato');
    },

    // ========== .naruto ==========
    naruto: async (message, args, client) => {
        await message.reply('🍥 Naruto');
    },

    // ========== .nekonime ==========
    nekonime: async (message, args, client) => {
        await message.reply('🐱 Neko anime');
    },

    // ========== .nezuko ==========
    nezuko: async (message, args, client) => {
        await message.reply('🦋 Nezuko');
    },

    // ========== .onepiece ==========
    onepiece: async (message, args, client) => {
        await message.reply('🏴‍☠️ One Piece');
    },

    // ========== .rize ==========
    rize: async (message, args, client) => {
        await message.reply('☕ Rize');
    },

    // ========== .sagiri ==========
    sagiri: async (message, args, client) => {
        await message.reply('🌸 Sagiri');
    },

    // ========== .sakura ==========
    sakura: async (message, args, client) => {
        await message.reply('🌸 Sakura');
    },

    // ========== .sasuke ==========
    sasuke: async (message, args, client) => {
        await message.reply('🌀 Sasuke');
    },

    // ========== .tsunade ==========
    tsunade: async (message, args, client) => {
        await message.reply('💪 Tsunade');
    },

    // ========== .yotsuba ==========
    yotsuba: async (message, args, client) => {
        await message.reply('🍀 Yotsuba');
    },

    // ========== .yuki ==========
    yuki: async (message, args, client) => {
        await message.reply('❄️ Yuki');
    },

    // ========== .yumeko ==========
    yumeko: async (message, args, client) => {
        await message.reply('🃏 Yumeko');
    }
};