module.exports = {
    // ========== .add ==========
    add: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        const number = args[0] + '@c.us';
        await chat.addParticipants([number]);
        await message.reply(`✅ Added: ${args[0]}`);
    },

    // ========== .kick ==========
    kick: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        const number = args[0] + '@c.us';
        await chat.removeParticipants([number]);
        await message.reply(`✅ Removed: ${args[0]}`);
    },

    // ========== .kickall ==========
    kickall: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        const participants = chat.participants;
        let count = 0;
        for (let p of participants) {
            if (!p.isAdmin && !p.isSuperAdmin) {
                await chat.removeParticipants([p.id._serialized]);
                count++;
                await new Promise(r => setTimeout(r, 1000));
            }
        }
        await message.reply(`✅ Kicked ${count} members`);
    },

    // ========== .kickadmins ==========
    kickadmins: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        const participants = chat.participants;
        let count = 0;
        for (let p of participants) {
            if (p.isAdmin && !p.isSuperAdmin) {
                await chat.removeParticipants([p.id._serialized]);
                count++;
            }
        }
        await message.reply(`✅ Kicked ${count} admins`);
    },

    // ========== .promote ==========
    promote: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        const number = args[0] + '@c.us';
        await chat.promoteParticipants([number]);
        await message.reply(`✅ Promoted: ${args[0]}`);
    },

    // ========== .demote ==========
    demote: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        const number = args[0] + '@c.us';
        await chat.demoteParticipants([number]);
        await message.reply(`✅ Demoted: ${args[0]}`);
    },

    // ========== .promoteall ==========
    promoteall: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        const participants = chat.participants;
        let count = 0;
        for (let p of participants) {
            if (!p.isAdmin) {
                await chat.promoteParticipants([p.id._serialized]);
                count++;
                await new Promise(r => setTimeout(r, 1000));
            }
        }
        await message.reply(`✅ Promoted ${count} members`);
    },

    // ========== .demoteall ==========
    demoteall: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        const participants = chat.participants;
        let count = 0;
        for (let p of participants) {
            if (p.isAdmin && !p.isSuperAdmin) {
                await chat.demoteParticipants([p.id._serialized]);
                count++;
            }
        }
        await message.reply(`✅ Demoted ${count} admins`);
    },

    // ========== .tagall ==========
    tagall: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        const participants = chat.participants;
        let mentions = participants.map(p => p.id._serialized);
        let text = '📢 @everyone\n';
        text += args.join(' ') || 'Attention please!';
        await client.sendMessage(message.from, text, { mentions });
    },

    // ========== .hidetag ==========
    hidetag: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        const participants = chat.participants;
        let mentions = participants.map(p => p.id._serialized);
        await client.sendMessage(message.from, args.join(' '), { mentions });
    },

    // ========== .tag ==========
    tag: async (message, args, client) => {
        if (!message.isGroup) return;
        const number = args[0] + '@c.us';
        const text = args.slice(1).join(' ') || 'Hello!';
        await client.sendMessage(message.from, `@${args[0]} ${text}`, { mentions: [number] });
    },

    // ========== .groupjid ==========
    groupjid: async (message, args, client) => {
        if (!message.isGroup) return;
        await message.reply(`📌 Group ID: ${message.from}`);
    },

    // ========== .listadmin ==========
    listadmin: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        let admins = chat.participants.filter(p => p.isAdmin);
        let text = '👑 Admins:\n\n';
        admins.forEach((p, i) => {
            text += `${i+1}. @${p.id.user}\n`;
        });
        let mentions = admins.map(p => p.id._serialized);
        await client.sendMessage(message.from, text, { mentions });
    },

    // ========== .listonline ==========
    listonline: async (message, args, client) => {
        if (!message.isGroup) return;
        await message.reply('📊 Online members feature requires presence data');
    },

    // ========== .mute ==========
    mute: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        await chat.setMessagesAdminsOnly(true);
        await message.reply('🔇 Group muted (only admins can send)');
    },

    // ========== .unmute ==========
    unmute: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        await chat.setMessagesAdminsOnly(false);
        await message.reply('🔊 Group unmuted (all can send)');
    },

    // ========== .linkgc ==========
    linkgc: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        const link = await chat.getInviteLink();
        await message.reply(`🔗 Group Link: ${link}`);
    },

    // ========== .resetlink ==========
    resetlink: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        await chat.revokeInviteLink();
        const newLink = await chat.getInviteLink();
        await message.reply(`🔄 New Link: ${newLink}`);
    },

    // ========== .poll ==========
    poll: async (message, args, client) => {
        if (!message.isGroup) return;
        const options = args.join(' ').split('|');
        if (options.length < 2) {
            return message.reply('❌ Format: .poll Question|Option1|Option2');
        }
        const question = options[0];
        const pollOptions = options.slice(1);
        await message.reply(`📊 Poll: ${question}\n${pollOptions.map((o, i) => `${i+1}. ${o}`).join('\n')}\n\nReply with number to vote!`);
    },

    // ========== .del ==========
    del: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        const messages = await chat.fetchMessages({ limit: 2 });
        if (messages.length > 1) {
            await messages[1].delete(true);
            await message.reply('🗑️ Message deleted!');
        }
    },

    // ========== .join ==========
    join: async (message, args, client) => {
        const link = args[0];
        if (!link) return message.reply('❌ Provide group link');
        try {
            await client.acceptInvite(link.split('/').pop());
            await message.reply('✅ Joined group!');
        } catch (e) {
            await message.reply('❌ Failed to join');
        }
    },

    // ========== .leave ==========
    leave: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        await chat.leave();
        await message.reply('👋 Left group!');
    },

    // ========== .creategc ==========
    creategc: async (message, args, client) => {
        const groupName = args.join(' ');
        if (!groupName) return message.reply('❌ Provide group name');
        await client.createGroup(groupName, [message.author]);
        await message.reply(`✅ Group "${groupName}" created!`);
    },

    // ========== .antilink ==========
    antilink: async (message, args, client) => {
        if (!message.isGroup) return;
        global.antiLink = !global.antiLink;
        await message.reply(`🔗 Anti-link ${global.antiLink ? 'enabled' : 'disabled'}!`);
    },

    // ========== .antispam ==========
    antispam: async (message, args, client) => {
        if (!message.isGroup) return;
        global.antiSpam = !global.antiSpam;
        await message.reply(`🛡️ Anti-spam ${global.antiSpam ? 'enabled' : 'disabled'}!`);
    },

    // ========== .antibot ==========
    antibot: async (message, args, client) => {
        if (!message.isGroup) return;
        global.antiBot = !global.antiBot;
        await message.reply(`🤖 Anti-bot ${global.antiBot ? 'enabled' : 'disabled'}!`);
    },

    // ========== .welcome ==========
    welcome: async (message, args, client) => {
        if (!message.isGroup) return;
        global.welcomeEnabled = !global.welcomeEnabled;
        await message.reply(`👋 Welcome message ${global.welcomeEnabled ? 'enabled' : 'disabled'}!`);
    },

    // ========== .goodbye ==========
    goodbye: async (message, args, client) => {
        if (!message.isGroup) return;
        global.goodbyeEnabled = !global.goodbyeEnabled;
        await message.reply(`👋 Goodbye message ${global.goodbyeEnabled ? 'enabled' : 'disabled'}!`);
    },

    // ========== .protect ==========
    protect: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        await chat.setInfoAdminsOnly(true);
        await message.reply('🛡️ Group protected! Only admins can change group info.');
    },

    // ========== .opengroup ==========
    opengroup: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        await chat.setInfoAdminsOnly(false);
        await message.reply('🔓 Group opened!');
    },

    // ========== .closegroup ==========
    closegroup: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        await chat.setInfoAdminsOnly(true);
        await message.reply('🔒 Group closed!');
    },

    // ========== .opentime ==========
    opentime: async (message, args, client) => {
        if (!message.isGroup) return;
        const time = args[0];
        if (!time) return message.reply('❌ Provide time: .opentime 09:00');
        global.openTime = time;
        await message.reply(`✅ Group will open at ${time}`);
    },

    // ========== .closetime ==========
    closetime: async (message, args, client) => {
        if (!message.isGroup) return;
        const time = args[0];
        if (!time) return message.reply('❌ Provide time: .closetime 18:00');
        global.closeTime = time;
        await message.reply(`✅ Group will close at ${time}`);
    },

    // ========== .setdesc ==========
    setdesc: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        const desc = args.join(' ');
        if (!desc) return message.reply('❌ Provide description');
        await chat.setDescription(desc);
        await message.reply('✅ Description updated!');
    },

    // ========== .setname ==========
    setname: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        const name = args.join(' ');
        if (!name) return message.reply('❌ Provide group name');
        await chat.setName(name);
        await message.reply(`✅ Group name changed to: ${name}`);
    },

    // ========== .setppgc ==========
    setppgc: async (message, args, client) => {
        if (!message.isGroup) return;
        if (message.hasMedia) {
            const media = await message.downloadMedia();
            const chat = await message.getChat();
            await chat.setProfilePicture(media);
            await message.reply('✅ Group profile picture updated!');
        }
    },

    // ========== .warn ==========
    warn: async (message, args, client) => {
        if (!message.isGroup) return;
        const number = args[0] + '@c.us';
        if (!global.warns) global.warns = {};
        if (!global.warns[number]) global.warns[number] = 0;
        global.warns[number]++;
        await message.reply(`⚠️ @${args[0]} warned! (${global.warns[number]}/3)`, {
            mentions: [number]
        });
    },

    // ========== .resetwarn ==========
    resetwarn: async (message, args, client) => {
        if (!message.isGroup) return;
        const number = args[0] + '@c.us';
        if (global.warns) {
            delete global.warns[number];
        }
        await message.reply(`✅ Warnings reset for @${args[0]}`, {
            mentions: [number]
        });
    },

    // ========== .welcomecard ==========
    welcomecard: async (message, args, client) => {
        if (!message.isGroup) return;
        global.welcomeCard = !global.welcomeCard;
        await message.reply(`🎴 Welcome card ${global.welcomeCard ? 'enabled' : 'disabled'}!`);
    },

    // ========== .antidelete ==========
    antidelete: async (message, args, client) => {
        if (!message.isGroup) return;
        global.antiDelete = !global.antiDelete;
        await message.reply(`🛡️ Anti-delete ${global.antiDelete ? 'enabled' : 'disabled'}!`);
    },

    // ========== .antideletedm ==========
    antideletedm: async (message, args, client) => {
        if (!message.isGroup) return;
        global.antiDeleteDM = !global.antiDeleteDM;
        await message.reply(`🛡️ Anti-delete DM ${global.antiDeleteDM ? 'enabled' : 'disabled'}!`);
    },

    // ========== .chatbot ==========
    chatbot: async (message, args, client) => {
        if (!message.isGroup) return;
        global.chatBot = !global.chatBot;
        await message.reply(`🤖 Chatbot ${global.chatBot ? 'enabled' : 'disabled'}!`);
    },

    // ========== .clearchatbot ==========
    clearchatbot: async (message, args, client) => {
        if (!message.isGroup) return;
        global.chatBotHistory = {};
        await message.reply('✅ Chatbot history cleared!');
    },

    // ========== .checkadmin ==========
    checkadmin: async (message, args, client) => {
        if (!message.isGroup) return;
        const chat = await message.getChat();
        const participants = chat.participants;
        let admins = participants.filter(p => p.isAdmin);
        let text = '👑 Admin Check:\n\n';
        participants.forEach(p => {
            const isAdmin = p.isAdmin ? '✅ Admin' : '❌ Member';
            text += `@${p.id.user}: ${isAdmin}\n`;
        });
        let mentions = participants.map(p => p.id._serialized);
        await client.sendMessage(message.from, text, { mentions });
    }
};