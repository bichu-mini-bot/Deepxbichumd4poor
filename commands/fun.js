const axios = require('axios');

module.exports = {
    // ========== .joke ==========
    joke: async (message, args, client) => {
        try {
            const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
            await message.reply(`😂 ${response.data.setup}\n\n${response.data.punchline}`);
        } catch (e) {
            const jokes = [
                'Why do programmers prefer dark mode? Because light attracts bugs!',
                'Why did the scarecrow win an award? Because he was outstanding in his field!',
                'What do you call a fake noodle? An impasta!'
            ];
            await message.reply(jokes[Math.floor(Math.random() * jokes.length)]);
        }
    },

    // ========== .dadjoke ==========
    dadjoke: async (message, args, client) => {
        try {
            const response = await axios.get('https://icanhazdadjoke.com/', {
                headers: { 'Accept': 'application/json' }
            });
            await message.reply(`👨‍🦳 ${response.data.joke}`);
        } catch (e) {
            await message.reply('👨‍🦳 Why don\'t eggs tell jokes? They\'d crack each other up!');
        }
    },

    // ========== .quote ==========
    quote: async (message, args, client) => {
        try {
            const response = await axios.get('https://api.quotable.io/random');
            await message.reply(`💬 "${response.data.content}"\n\n— ${response.data.author}`);
        } catch (e) {
            await message.reply('💬 "Be yourself; everyone else is already taken." — Oscar Wilde');
        }
    },

    // ========== .fact ==========
    fact: async (message, args, client) => {
        try {
            const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
            await message.reply(`🧠 ${response.data.text}`);
        } catch (e) {
            await message.reply('🧠 Did you know? Octopuses have three hearts!');
        }
    },

    // ========== .advice ==========
    advice: async (message, args, client) => {
        try {
            const response = await axios.get('https://api.adviceslip.com/advice');
            await message.reply(`💡 ${response.data.slip.advice}`);
        } catch (e) {
            await message.reply('💡 Never give up on something you really want.');
        }
    },

    // ========== .pickupline ==========
    pickupline: async (message, args, client) => {
        const lines = [
            'Are you made of copper and tellurium? Because you\'re Cu-Te!',
            'Do you have a Band-Aid? Because I just scraped my knee falling for you!',
            'Are you a camera? Because every time I look at you, I smile!',
            'Do you have a map? I keep getting lost in your eyes!'
        ];
        await message.reply(`💕 ${lines[Math.floor(Math.random() * lines.length)]}`);
    },

    // ========== .roast ==========
    roast: async (message, args, client) => {
        const roasts = [
            'You\'re like a cloud. When you disappear, it\'s a beautiful day!',
            'You bring everyone so much joy... when you leave!',
            'You\'re proof that evolution can go in reverse!',
            'You\'re not stupid; you just have bad luck thinking!'
        ];
        await message.reply(`🔥 ${roasts[Math.floor(Math.random() * roasts.length)]}`);
    },

    // ========== .meme ==========
    meme: async (message, args, client) => {
        try {
            const response = await axios.get('https://meme-api.com/gimme');
            const meme = response.data;
            await client.sendMessage(message.from, {
                image: { url: meme.url },
                caption: `🎭 ${meme.title}\n👍 ${meme.ups} | 💬 ${meme.comments}`
            });
        } catch (e) {
            await message.reply('🎭 Sorry, couldn\'t fetch a meme right now!');
        }
    },

    // ========== .ship ==========
    ship: async (message, args, client) => {
        const names = args.join(' ').split('|');
        if (names.length < 2) return message.reply('❌ Format: .ship Name1|Name2');
        
        const shipName = names[0].slice(0, 3) + names[1].slice(-3);
        const percentage = Math.floor(Math.random() * 100);
        const hearts = '❤️'.repeat(Math.floor(percentage / 10));
        
        await message.reply(`💕 ${names[0]} ❤️ ${names[1]}\n\nShip Name: ${shipName}\nMatch: ${percentage}% ${hearts}`);
    },

    // ========== .hack ==========
    hack: async (message, args, client) => {
        const target = args.join(' ') || 'someone';
        await message.reply(`🔓 Hacking ${target}...`);
        
        const steps = [
            '🔍 Finding IP address...',
            '🔐 Bypassing firewall...',
            '📡 Accessing database...',
            '📤 Extracting data...',
            '✅ Hack complete!'
        ];
        
        for (let step of steps) {
            await new Promise(r => setTimeout(r, 1000));
            await message.reply(step);
        }
        
        await message.reply(`🎉 ${target} has been hacked! (Just kidding, this is all fake!)`);
    },

    // ========== .couple ==========
    couple: async (message, args, client) => {
        const names = args.join(' ').split('|');
        if (names.length < 2) return message.reply('❌ Format: .couple Name1|Name2');
        
        await message.reply(`💕 ${names[0]} and ${names[1]} are a perfect couple! 💕`);
    },

    // ========== .flirt ==========
    flirt: async (message, args, client) => {
        const flirts = [
            'Are you a parking ticket? Because you\'ve got FINE written all over you!',
            'If you were a triangle, you\'d be acute one!',
            'I must be a snowflake because I\'ve fallen for you!'
        ];
        await message.reply(`😘 ${flirts[Math.floor(Math.random() * flirts.length)]}`);
    },

    // ========== .compliment ==========
    compliment: async (message, args, client) => {
        const compliments = [
            'You look amazing today!',
            'Your smile lights up the room!',
            'You\'re incredibly smart!',
            'You have a great sense of humor!'
        ];
        await message.reply(`💖 ${compliments[Math.floor(Math.random() * compliments.length)]}`);
    },

    // ========== .insult ==========
    insult: async (message, args, client) => {
        const insults = [
            'You\'re not stupid; you just have bad luck thinking.',
            'You\'re like a software update. Whenever I see you, I think, "Not now."',
            'You\'re the reason God created the middle finger!'
        ];
        await message.reply(`😤 ${insults[Math.floor(Math.random() * insults.length)]}`);
    },

    // ========== .whoami ==========
    whoami: async (message, args, client) => {
        const traits = ['Kind', 'Smart', 'Funny', 'Caring', 'Creative', 'Amazing', 'Awesome'];
        const trait = traits[Math.floor(Math.random() * traits.length)];
        await message.reply(`🧐 You are: ${trait}! 💖`);
    },

    // ========== .stupidcheck ==========
    stupidcheck: async (message, args, client) => {
        const percentage = Math.floor(Math.random() * 100);
        await message.reply(`🧠 You are ${percentage}% stupid! 😂`);
    },

    // ========== .uncleancheck ==========
    uncleancheck: async (message, args, client) => {
        const percentage = Math.floor(Math.random() * 100);
        await message.reply(`🧹 You are ${percentage}% unclean! 🚿`);
    },

    // ========== .hotcheck ==========
    hotcheck: async (message, args, client) => {
        const percentage = Math.floor(Math.random() * 100);
        await message.reply(`🔥 You are ${percentage}% hot! 🌶️`);
    },

    // ========== .smartcheck ==========
    smartcheck: async (message, args, client) => {
        const percentage = Math.floor(Math.random() * 100);
        await message.reply(`🧠 You are ${percentage}% smart! 📚`);
    },

    // ========== .greatcheck ==========
    greatcheck: async (message, args, client) => {
        const percentage = Math.floor(Math.random() * 100);
        await message.reply(`🌟 You are ${percentage}% great! 💫`);
    },

    // ========== .evilcheck ==========
    evilcheck: async (message, args, client) => {
        const percentage = Math.floor(Math.random() * 100);
        await message.reply(`👿 You are ${percentage}% evil! 😈`);
    },

    // ========== .dogcheck ==========
    dogcheck: async (message, args, client) => {
        const percentage = Math.floor(Math.random() * 100);
        await message.reply(`🐕 You are ${percentage}% dog! 🐶`);
    },

    // ========== .coolcheck ==========
    coolcheck: async (message, args, client) => {
        const percentage = Math.floor(Math.random() * 100);
        await message.reply(`😎 You are ${percentage}% cool! 🆒`);
    },

    // ========== .gaycheck ==========
    gaycheck: async (message, args, client) => {
        const percentage = Math.floor(Math.random() * 100);
        await message.reply(`🏳️‍🌈 You are ${percentage}% gay! 🌈`);
    },

    // ========== .waifucheck ==========
    waifucheck: async (message, args, client) => {
        const percentage = Math.floor(Math.random() * 100);
        await message.reply(`🌸 You are ${percentage}% waifu! 💕`);
    }
};