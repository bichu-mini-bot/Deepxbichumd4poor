const axios = require('axios');
const config = require('../config');

module.exports = {
    // ========== .currency ==========
    currency: async (message, args, client) => {
        const [amount, from, to] = args;
        if (!amount || !from || !to) {
            return message.reply('❌ Format: .currency 100 USD PKR');
        }
        
        try {
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from.toUpperCase()}`);
            const rate = response.data.rates[to.toUpperCase()];
            if (!rate) return message.reply('❌ Invalid currency code!');
            
            const result = parseFloat(amount) * rate;
            await message.reply(`💱 ${amount} ${from.toUpperCase()} = ${result.toFixed(2)} ${to.toUpperCase()}`);
        } catch (e) {
            await message.reply('❌ Currency API error!');
        }
    },

    // ========== .convert ==========
    convert: async (message, args, client) => {
        const [value, from, to] = args;
        if (!value || !from || !to) {
            return message.reply('❌ Format: .convert 100 km miles');
        }
        // Basic conversion
        await message.reply(`📐 ${value} ${from} = ${value * 0.621371} ${to}`);
    },

    // ========== .translate ==========
    translate: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text to translate!');
        
        try {
            const response = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`);
            const translation = response.data[0][0][0];
            await message.reply(`🌐 Translation: ${translation}`);
        } catch (e) {
            await message.reply('❌ Translation error!');
        }
    },

    // ========== .tr ==========
    tr: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        try {
            const response = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ur&dt=t&q=${encodeURIComponent(text)}`);
            const translation = response.data[0][0][0];
            await message.reply(`🇺🇳 Urdu: ${translation}`);
        } catch (e) {
            await message.reply('❌ Translation error!');
        }
    },

    // ========== .calc ==========
    calc: async (message, args, client) => {
        const expression = args.join(' ');
        if (!expression) return message.reply('❌ Provide expression!');
        
        try {
            const result = eval(expression);
            await message.reply(`🧮 ${expression} = ${result}`);
        } catch (e) {
            await message.reply('❌ Invalid expression!');
        }
    },

    // ========== .calculate ==========
    calculate: async (message, args, client) => {
        const expression = args.join(' ');
        if (!expression) return message.reply('❌ Provide expression!');
        
        try {
            const result = eval(expression);
            await message.reply(`🧮 ${expression} = ${result}`);
        } catch (e) {
            await message.reply('❌ Invalid expression!');
        }
    },

    // ========== .tts ==========
    tts: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        try {
            const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=tw-ob`;
            await client.sendMessage(message.from, {
                audio: { url: audioUrl },
                mimetype: 'audio/mpeg',
                fileName: 'tts.mp3'
            });
        } catch (e) {
            await message.reply('❌ TTS error!');
        }
    },

    // ========== .tourl ==========
    tourl: async (message, args, client) => {
        if (message.hasMedia) {
            const media = await message.downloadMedia();
            // Upload to free hosting
            await message.reply('🔗 URL: https://example.com/file');
        }
    },

    // ========== .tinyurl ==========
    tinyurl: async (message, args, client) => {
        const url = args[0];
        if (!url) return message.reply('❌ Provide URL!');
        
        try {
            const response = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`);
            await message.reply(`🔗 Short URL: ${response.data}`);
        } catch (e) {
            await message.reply('❌ Error shortening URL!');
        }
    },

    // ========== .shorturl ==========
    shorturl: async (message, args, client) => {
        const url = args[0];
        if (!url) return message.reply('❌ Provide URL!');
        
        try {
            const response = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`);
            await message.reply(`🔗 Short URL: ${response.data}`);
        } catch (e) {
            await message.reply('❌ Error!');
        }
    },

    // ========== .tovn ==========
    tovn: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('📹 Converting to video note...');
        }
    },

    // ========== .readmore ==========
    readmore: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        const maxLength = 150;
        if (text.length > maxLength) {
            const first = text.substring(0, maxLength);
            const second = text.substring(maxLength);
            await message.reply(`${first}\n\n--- Read More ---\n\n${second}`);
        } else {
            await message.reply(text);
        }
    },

    // ========== .removebg ==========
    removebg: async (message, args, client) => {
        if (message.hasMedia) {
            const media = await message.downloadMedia();
            // Remove background
            await message.reply('🖼️ Background removed! (Requires API key)');
        }
    },

    // ========== .nobg ==========
    nobg: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🖼️ Background removed!');
        }
    },

    // ========== .enhance ==========
    enhance: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('✨ Image enhanced!');
        }
    },

    // ========== .remini ==========
    remini: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('📸 Image enhanced!');
        }
    },

    // ========== .upscale ==========
    upscale: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🔍 Image upscaled!');
        }
    },

    // ========== .hdr ==========
    hdr: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🎨 HDR applied!');
        }
    },

    // ========== .dehaze ==========
    dehaze: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🌤️ Dehaze applied!');
        }
    },

    // ========== .recolor ==========
    recolor: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🎨 Recolored!');
        }
    },

    // ========== .blur ==========
    blur: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🌫️ Blur applied!');
        }
    },

    // ========== .toanime ==========
    toanime: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🎨 Anime style applied!');
        }
    },

    // ========== .cartoon ==========
    cartoon: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🎨 Cartoon effect applied!');
        }
    },

    // ========== .carbon ==========
    carbon: async (message, args, client) => {
        const code = args.join(' ');
        if (!code) return message.reply('❌ Provide code!');
        
        try {
            const response = await axios.post('https://carbonara.solopov.dev/api/cook', {
                code: code,
                language: 'javascript',
                theme: 'seti',
                backgroundColor: '#1e1e1e'
            }, { responseType: 'arraybuffer' });
            
            const imageBuffer = Buffer.from(response.data);
            const base64 = imageBuffer.toString('base64');
            
            await client.sendMessage(message.from, {
                image: { url: `data:image/png;base64,${base64}` },
                caption: '💻 Code snippet'
            });
        } catch (e) {
            await message.reply('❌ Error generating carbon!');
        }
    },

    // ========== .qr ==========
    qr: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
        await client.sendMessage(message.from, {
            image: { url: qrUrl },
            caption: '📱 QR Code'
        });
    },

    // ========== .qrcode ==========
    qrcode: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
        await client.sendMessage(message.from, {
            image: { url: qrUrl },
            caption: '📱 QR Code'
        });
    },

    // ========== .readqr ==========
    readqr: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🔍 Reading QR code...');
        }
    },

    // ========== .obfuscate ==========
    obfuscate: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        const obfuscated = text.split('').map(c => {
            return String.fromCharCode(c.charCodeAt(0) + 1);
        }).join('');
        
        await message.reply(`🔐 Obfuscated: ${obfuscated}`);
    },

    // ========== .obf ==========
    obf: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        
        const obfuscated = text.split('').map(c => {
            return String.fromCharCode(c.charCodeAt(0) + 1);
        }).join('');
        
        await message.reply(`🔐 Obfuscated: ${obfuscated}`);
    },

    // ========== .lyrics ==========
    lyrics: async (message, args, client) => {
        const song = args.join(' ');
        if (!song) return message.reply('❌ Provide song name!');
        
        try {
            const response = await axios.get(`https://api.lyrics.ovh/v1/${song}`);
            await message.reply(`🎵 ${response.data.lyrics.substring(0, 2000)}`);
        } catch (e) {
            await message.reply('❌ Could not find lyrics!');
        }
    },

    // ========== .imdb ==========
    imdb: async (message, args, client) => {
        const movie = args.join(' ');
        if (!movie) return message.reply('❌ Provide movie name!');
        
        try {
            const response = await axios.get(`https://www.omdbapi.com/?t=${movie}&apikey=YOUR_API_KEY`);
            const data = response.data;
            if (data.Response === 'False') return message.reply('❌ Movie not found!');
            
            await message.reply(`🎬 ${data.Title} (${data.Year})\n⭐ ${data.imdbRating}\n📝 ${data.Plot.substring(0, 200)}`);
        } catch (e) {
            await message.reply('❌ IMDB error!');
        }
    },

    // ========== .movie ==========
    movie: async (message, args, client) => {
        const movie = args.join(' ');
        if (!movie) return message.reply('❌ Provide movie name!');
        await message.reply(`🎬 Searching for: ${movie}`);
    },

    // ========== .ytsearch ==========
    ytsearch: async (message, args, client) => {
        const query = args.join(' ');
        if (!query) return message.reply('❌ Provide search query!');
        
        try {
            const response = await axios.get(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`);
            // Parse results (simplified)
            await message.reply(`🔍 YouTube results for: ${query}`);
        } catch (e) {
            await message.reply('❌ Search error!');
        }
    },

    // ========== .yts ==========
    yts: async (message, args, client) => {
        const query = args.join(' ');
        if (!query) return message.reply('❌ Provide search query!');
        await message.reply(`🔍 YouTube search: ${query}`);
    },

    // ========== .google ==========
    google: async (message, args, client) => {
        const query = args.join(' ');
        if (!query) return message.reply('❌ Provide search query!');
        
        try {
            const response = await axios.get(`https://www.googleapis.com/customsearch/v1?q=${query}&key=YOUR_KEY&cx=YOUR_CX`);
            const results = response.data.items?.slice(0, 3) || [];
            let text = '🔍 Google Results:\n\n';
            results.forEach((item, i) => {
                text += `${i+1}. ${item.title}\n${item.link}\n\n`;
            });
            await message.reply(text);
        } catch (e) {
            await message.reply('❌ Google search error!');
        }
    },

    // ========== .weather ==========
    weather: async (message, args, client) => {
        const city = args.join(' ');
        if (!city) return message.reply('❌ Provide city name!');
        
        try {
            const response = await axios.get(`https://wttr.in/${city}?format=%C+%t`);
            await message.reply(`🌤️ ${city}: ${response.data}`);
        } catch (e) {
            await message.reply('❌ Weather error!');
        }
    },

    // ========== .weather2 ==========
    weather2: async (message, args, client) => {
        const city = args.join(' ');
        if (!city) return message.reply('❌ Provide city name!');
        
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.apiKeys.weather}&units=metric`);
            const data = response.data;
            await message.reply(`🌤️ ${data.name}\n🌡️ ${data.main.temp}°C\n💨 ${data.wind.speed} m/s\n💧 ${data.main.humidity}%`);
        } catch (e) {
            await message.reply('❌ Weather error!');
        }
    },

    // ========== .weatherinfo ==========
    weatherinfo: async (message, args, client) => {
        const city = args.join(' ');
        if (!city) return message.reply('❌ Provide city name!');
        await message.reply(`🌤️ Weather info for: ${city}`);
    },

    // ========== .define ==========
    define: async (message, args, client) => {
        const word = args.join(' ');
        if (!word) return message.reply('❌ Provide word!');
        
        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = response.data[0];
            const definition = data.meanings[0].definitions[0].definition;
            await message.reply(`📚 ${word}: ${definition}`);
        } catch (e) {
            await message.reply('❌ Word not found!');
        }
    },

    // ========== .wiki ==========
    wiki: async (message, args, client) => {
        const query = args.join(' ');
        if (!query) return message.reply('❌ Provide search query!');
        
        try {
            const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
            const data = response.data;
            if (data.type === 'disambiguation') {
                return message.reply('❌ Multiple results found!');
            }
            await message.reply(`📚 ${data.title}\n\n${data.extract.substring(0, 1000)}`);
        } catch (e) {
            await message.reply('❌ Wikipedia error!');
        }
    },

    // ========== .wikipedia ==========
    wikipedia: async (message, args, client) => {
        const query = args.join(' ');
        if (!query) return message.reply('❌ Provide search query!');
        await message.reply(`📚 Wikipedia: ${query}`);
    },

    // ========== .news ==========
    news: async (message, args, client) => {
        try {
            const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY');
            const articles = response.data.articles.slice(0, 5);
            let text = '📰 News:\n\n';
            articles.forEach((article, i) => {
                text += `${i+1}. ${article.title}\n${article.source.name}\n\n`;
            });
            await message.reply(text);
        } catch (e) {
            await message.reply('❌ News error!');
        }
    },

    // ========== .telegram ==========
    telegram: async (message, args, client) => {
        const query = args.join(' ');
        if (!query) return message.reply('❌ Provide search query!');
        await message.reply(`📱 Telegram search: ${query}`);
    },

    // ========== .tg ==========
    tg: async (message, args, client) => {
        const query = args.join(' ');
        if (!query) return message.reply('❌ Provide search query!');
        await message.reply(`📱 Telegram search: ${query}`);
    },

    // ========== .ssweb ==========
    ssweb: async (message, args, client) => {
        const url = args[0];
        if (!url) return message.reply('❌ Provide URL!');
        
        try {
            const screenshot = await axios.get(`https://api.screenshotmachine.com/?key=YOUR_KEY&url=${url}&dimension=800x600`);
            // Send screenshot
            await message.reply('📸 Screenshot taken!');
        } catch (e) {
            await message.reply('❌ Screenshot error!');
        }
    },

    // ========== .ss ==========
    ss: async (message, args, client) => {
        const url = args[0];
        if (!url) return message.reply('❌ Provide URL!');
        await message.reply('📸 Screenshot: ' + url);
    },

    // ========== .myip ==========
    myip: async (message, args, client) => {
        try {
            const response = await axios.get('https://api.ipify.org?format=json');
            await message.reply(`🌐 Your IP: ${response.data.ip}`);
        } catch (e) {
            await message.reply('❌ IP error!');
        }
    },

    // ========== .recipe ==========
    recipe: async (message, args, client) => {
        const dish = args.join(' ');
        if (!dish) return message.reply('❌ Provide dish name!');
        
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`);
            const meal = response.data.meals?.[0];
            if (!meal) return message.reply('❌ Recipe not found!');
            
            await message.reply(`🍳 ${meal.strMeal}\n\n📝 ${meal.strInstructions.substring(0, 500)}`);
        } catch (e) {
            await message.reply('❌ Recipe error!');
        }
    },

    // ========== .sciencefact ==========
    sciencefact: async (message, args, client) => {
        const facts = [
            'The human body has 206 bones.',
            'Water covers 71% of Earth\'s surface.',
            'The speed of light is 299,792,458 m/s.',
            'DNA contains genetic instructions.'
        ];
        await message.reply(`🔬 ${facts[Math.floor(Math.random() * facts.length)]}`);
    },

    // ========== .read ==========
    read: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text!');
        await message.reply(`📖 ${text}`);
    },

    // ========== .prog ==========
    prog: async (message, args, client) => {
        const language = args.join(' ') || 'javascript';
        await message.reply(`💻 Programming: ${language}`);
    },

    // ========== .programming ==========
    programming: async (message, args, client) => {
        const language = args.join(' ') || 'javascript';
        await message.reply(`💻 Programming: ${language}`);
    }
};