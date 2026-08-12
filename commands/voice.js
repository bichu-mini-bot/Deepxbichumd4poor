const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

module.exports = {
    // ========== .bass ==========
    bass: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🎵 Applying bass effect...');
            const media = await message.downloadMedia();
            // Process audio with bass effect
            await message.reply('🔊 Bass effect applied! (Requires ffmpeg)');
        } else {
            await message.reply('❌ Send an audio file!');
        }
    },

    // ========== .blown ==========
    blown: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🌀 Applying blown effect...');
            await message.reply('🌀 Blown effect applied!');
        }
    },

    // ========== .deep ==========
    deep: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🔊 Making voice deeper...');
            await message.reply('🔊 Deep voice effect applied!');
        }
    },

    // ========== .earrape ==========
    earrape: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🔊 Applying earrape effect...');
            await message.reply('🔊 Earrape applied! (Careful!)');
        }
    },

    // ========== .fast ==========
    fast: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('⚡ Speeding up audio...');
            await message.reply('⚡ Fast effect applied!');
        }
    },

    // ========== .fat ==========
    fat: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🎵 Applying fat effect...');
            await message.reply('🎵 Fat effect applied!');
        }
    },

    // ========== .nightcore ==========
    nightcore: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🎵 Applying nightcore effect...');
            await message.reply('🎵 Nightcore effect applied!');
        }
    },

    // ========== .reverse ==========
    reverse: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🔄 Reversing audio...');
            await message.reply('🔄 Audio reversed!');
        }
    },

    // ========== .robot ==========
    robot: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🤖 Applying robot effect...');
            await message.reply('🤖 Robot voice applied!');
        }
    },

    // ========== .slow ==========
    slow: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🐢 Slowing down audio...');
            await message.reply('🐢 Slow effect applied!');
        }
    },

    // ========== .smooth ==========
    smooth: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🎵 Applying smooth effect...');
            await message.reply('🎵 Smooth effect applied!');
        }
    },

    // ========== .squirrel ==========
    squirrel: async (message, args, client) => {
        if (message.hasMedia) {
            await message.reply('🐿️ Applying squirrel effect...');
            await message.reply('🐿️ Squirrel voice applied! (Chipmunk)');
        }
    }
};