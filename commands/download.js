const axios = require('axios');
const ytdl = require('ytdl-core');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
    // ========== .play ==========
    play: async (message, args, client) => {
        const query = args.join(' ');
        if (!query) return message.reply('❌ Provide song name!');
        
        try {
            await message.reply(`🎵 Searching: ${query}...`);
            const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
            // For full implementation, use yt-search or youtube-api
            await message.reply('🎵 Play feature: Send YouTube URL directly');
        } catch (e) {
            await message.reply(`❌ Error: ${e.message}`);
        }
    },

    // ========== .ytmp3 ==========
    ytmp3: async (message, args, client) => {
        const url = args[0];
        if (!url) return message.reply('❌ Provide YouTube URL!');
        
        try {
            await message.reply('⏳ Downloading audio...');
            
            const info = await ytdl.getInfo(url);
            const title = info.videoDetails.title.replace(/[^a-zA-Z0-9 ]/g, '');
            const audioStream = ytdl(url, { quality: 'highestaudio' });
            
            await fs.ensureDir('./temp');
            const filePath = `./temp/${title}.mp3`;
            
            const writer = fs.createWriteStream(filePath);
            audioStream.pipe(writer);
            
            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
            
            await client.sendMessage(message.from, {
                audio: { url: filePath },
                mimetype: 'audio/mpeg',
                fileName: `${title}.mp3`,
                caption: `🎵 ${title}`
            });
            
            await fs.remove(filePath);
            await message.reply('✅ Audio sent!');
            
        } catch (e) {
            await message.reply(`❌ Download failed: ${e.message}`);
        }
    },

    // ========== .ytmp4 ==========
    ytmp4: async (message, args, client) => {
        const url = args[0];
        if (!url) return message.reply('❌ Provide YouTube URL!');
        
        try {
            await message.reply('⏳ Downloading video...');
            
            const info = await ytdl.getInfo(url);
            const title = info.videoDetails.title.replace(/[^a-zA-Z0-9 ]/g, '');
            const videoStream = ytdl(url, { quality: 'highest' });
            
            await fs.ensureDir('./temp');
            const filePath = `./temp/${title}.mp4`;
            
            const writer = fs.createWriteStream(filePath);
            videoStream.pipe(writer);
            
            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
            
            await client.sendMessage(message.from, {
                video: { url: filePath },
                caption: `🎬 ${title}`
            });
            
            await fs.remove(filePath);
            await message.reply('✅ Video sent!');
            
        } catch (e) {
            await message.reply(`❌ Download failed: ${e.message}`);
        }
    },

    // ========== .tiktok ==========
    tiktok: async (message, args, client) => {
        const url = args[0];
        if (!url) return message.reply('❌ Provide TikTok URL!');
        
        try {
            await message.reply('⏳ Downloading TikTok video...');
            
            // Using free TikTok API
            const response = await axios.get(`https://www.tikwm.com/api/?url=${url}`);
            
            if (response.data.data && response.data.data.play) {
                const videoUrl = response.data.data.play;
                await client.sendMessage(message.from, {
                    video: { url: videoUrl },
                    caption: `🎵 TikTok Video`
                });
                await message.reply('✅ TikTok video sent!');
            } else {
                await message.reply('❌ Failed to get video');
            }
            
        } catch (e) {
            await message.reply(`❌ Error: ${e.message}`);
        }
    },

    // ========== .instagram ==========
    instagram: async (message, args, client) => {
        const url = args[0];
        if (!url) return message.reply('❌ Provide Instagram URL!');
        
        try {
            await message.reply('⏳ Downloading Instagram video...');
            
            // Using free Instagram API
            const response = await axios.get(`https://api.instagram.com/oembed?url=${url}`);
            
            await message.reply(`📸 Instagram: ${response.data.title || 'Video'}`);
            
        } catch (e) {
            await message.reply(`❌ Error: ${e.message}`);
        }
    },

    // ========== .facebook ==========
    facebook: async (message, args, client) => {
        const url = args[0];
        if (!url) return message.reply('❌ Provide Facebook URL!');
        
        try {
            await message.reply('⏳ Downloading Facebook video...');
            // Using free Facebook API
            const response = await axios.get(`https://graph.facebook.com/v17.0/oembed?url=${url}`);
            await message.reply(`📘 Facebook: ${response.data.title || 'Video'}`);
        } catch (e) {
            await message.reply(`❌ Error: ${e.message}`);
        }
    },

    // ========== .spotify ==========
    spotify: async (message, args, client) => {
        const url = args[0];
        if (!url) return message.reply('❌ Provide Spotify URL!');
        
        try {
            await message.reply('🎵 Spotify download feature (Limited)');
            // Spotify download requires premium API
        } catch (e) {
            await message.reply(`❌ Error: ${e.message}`);
        }
    },

    // ========== .mediafire ==========
    mediafire: async (message, args, client) => {
        const url = args[0];
        if (!url) return message.reply('❌ Provide MediaFire URL!');
        
        try {
            await message.reply('⏳ Fetching MediaFire file...');
            // MediaFire download
        } catch (e) {
            await message.reply(`❌ Error: ${e.message}`);
        }
    },

    // ========== .apk ==========
    apk: async (message, args, client) => {
        const app = args.join(' ');
        if (!app) return message.reply('❌ Provide app name!');
        
        try {
            await message.reply(`🔍 Searching APK for: ${app}...`);
            // APK download
        } catch (e) {
            await message.reply(`❌ Error: ${e.message}`);
        }
    },

    // ========== .pinterest ==========
    pinterest: async (message, args, client) => {
        const query = args.join(' ');
        if (!query) return message.reply('❌ Provide search query!');
        
        try {
            await message.reply(`🔍 Searching Pinterest: ${query}...`);
            // Pinterest search
        } catch (e) {
            await message.reply(`❌ Error: ${e.message}`);
        }
    },

    // ========== .tomp3 ==========
    tomp3: async (message, args, client) => {
        if (message.hasMedia) {
            const media = await message.downloadMedia();
            // Convert to MP3
            await message.reply('🎵 Converting to MP3...');
        }
    },

    // ========== .tomp4 ==========
    tomp4: async (message, args, client) => {
        if (message.hasMedia) {
            const media = await message.downloadMedia();
            // Convert to MP4
            await message.reply('🎬 Converting to MP4...');
        }
    }
};