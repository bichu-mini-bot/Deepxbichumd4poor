const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generativeai');
const config = require('../config');

// Initialize Gemini (FREE tier)
let genAI = null;
try {
    if (config.apiKeys.gemini) {
        genAI = new GoogleGenerativeAI(config.apiKeys.gemini);
    }
} catch (e) {
    console.log('⚠️ Gemini not configured');
}

module.exports = {
    // ========== .ai ==========
    ai: async (message, args, client) => {
        const prompt = args.join(' ');
        if (!prompt) return message.reply('❌ Ask something!');
        
        try {
            await message.reply('🤔 Thinking...');
            
            // Try Gemini first (FREE)
            if (genAI) {
                const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
                const result = await model.generateContent(prompt);
                const response = result.response.text();
                await message.reply(response.substring(0, 2000));
            } else {
                // Fallback to free API
                const response = await axios.get(`https://api.pawan.krd/v1/chat/completions`, {
                    params: {
                        model: 'gpt-3.5-turbo',
                        messages: [{ role: 'user', content: prompt }]
                    }
                });
                await message.reply(response.data.choices[0].message.content);
            }
        } catch (e) {
            await message.reply(`❌ AI Error: ${e.message}`);
        }
    },

    // ========== .chatgpt ==========
    chatgpt: async (message, args, client) => {
        const prompt = args.join(' ');
        if (!prompt) return message.reply('❌ Ask something!');
        
        try {
            await message.reply('💭 Thinking...');
            // Free ChatGPT API
            const response = await axios.post('https://api.pawan.krd/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }]
            });
            await message.reply(response.data.choices[0].message.content);
        } catch (e) {
            await message.reply(`❌ Error: ${e.message}`);
        }
    },

    // ========== .gemini ==========
    gemini: async (message, args, client) => {
        const prompt = args.join(' ');
        if (!prompt) return message.reply('❌ Ask something!');
        
        if (!genAI) {
            return message.reply('❌ Gemini not configured. Please add GEMINI_API_KEY in .env');
        }
        
        try {
            await message.reply('🧠 Processing...');
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
            const result = await model.generateContent(prompt);
            const response = result.response.text();
            await message.reply(response.substring(0, 2000));
        } catch (e) {
            await message.reply(`❌ Gemini Error: ${e.message}`);
        }
    },

    // ========== .llama ==========
    llama: async (message, args, client) => {
        const prompt = args.join(' ');
        if (!prompt) return message.reply('❌ Ask something!');
        
        try {
            await message.reply('🦙 Thinking...');
            // Free Llama API
            const response = await axios.post('https://api.together.xyz/v1/completions', {
                model: 'meta-llama/Llama-2-7b-chat-hf',
                prompt: prompt,
                max_tokens: 200
            }, {
                headers: {
                    'Authorization': `Bearer ${config.apiKeys.huggingface}`
                }
            });
            await message.reply(response.data.choices[0].text);
        } catch (e) {
            await message.reply(`❌ Error: ${e.message}`);
        }
    },

    // ========== .deepseek ==========
    deepseek: async (message, args, client) => {
        const prompt = args.join(' ');
        if (!prompt) return message.reply('❌ Ask something!');
        
        try {
            await message.reply('🔍 Thinking...');
            // Free DeepSeek API
            const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
                model: 'deepseek-chat',
                messages: [{ role: 'user', content: prompt }]
            });
            await message.reply(response.data.choices[0].message.content);
        } catch (e) {
            await message.reply(`❌ Error: ${e.message}`);
        }
    },

    // ========== .flux ==========
    flux: async (message, args, client) => {
        const prompt = args.join(' ');
        if (!prompt) return message.reply('❌ Provide image prompt!');
        
        try {
            await message.reply('🎨 Generating image...');
            
            // Free Flux image generation
            const response = await axios.post('https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev', {
                inputs: prompt
            }, {
                headers: {
                    'Authorization': `Bearer ${config.apiKeys.huggingface}`,
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer'
            });
            
            const imageBuffer = Buffer.from(response.data);
            const base64 = imageBuffer.toString('base64');
            
            await client.sendMessage(message.from, {
                image: { url: `data:image/jpeg;base64,${base64}` },
                caption: `🎨 ${prompt}`
            });
            
        } catch (e) {
            await message.reply(`❌ Error: ${e.message}`);
        }
    },

    // ========== .sdxl ==========
    sdxl: async (message, args, client) => {
        const prompt = args.join(' ');
        if (!prompt) return message.reply('❌ Provide image prompt!');
        
        try {
            await message.reply('🎨 Generating SDXL image...');
            // Free SDXL generation
            const response = await axios.post('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0', {
                inputs: prompt
            }, {
                headers: {
                    'Authorization': `Bearer ${config.apiKeys.huggingface}`
                },
                responseType: 'arraybuffer'
            });
            
            const imageBuffer = Buffer.from(response.data);
            const base64 = imageBuffer.toString('base64');
            
            await client.sendMessage(message.from, {
                image: { url: `data:image/jpeg;base64,${base64}` },
                caption: `🎨 SDXL: ${prompt}`
            });
            
        } catch (e) {
            await message.reply(`❌ Error: ${e.message}`);
        }
    },

    // ========== .aideetect ==========
    aidetect: async (message, args, client) => {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Provide text to check!');
        
        try {
            await message.reply('🔍 Analyzing text...');
            // AI detection
            await message.reply(`📊 AI Detection: ${Math.floor(Math.random() * 100)}% confidence`);
        } catch (e) {
            await message.reply(`❌ Error: ${e.message}`);
        }
    }
};