const { cmd } = require('../command');

cmd({
    pattern: "out",
    alias: ["ck", "🦶"],
    desc: "Removes all members with specific country code from the group",
    category: "admin",
    react: "💦",
    filename: __filename
},
async (conn, mek, m, {
    from, q, isGroup, isBotAdmins, ,isCreator ,reply, groupMetadata, senderNumber
}) => {
    // Check if the command is used in a group
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    // Get the bot owner's number dynamically from conn.user.id
    
    if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    // Check if the bot is an admin
    if (!isBotAdmins) return reply("*📛 ɪ ɴᴇᴇᴅ ᴛᴏ ʙᴇ ᴀɴ ᴀᴅᴍɪɴ ᴛᴏ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ*");

    if (!q) return reply("*💀 ρʀσνι∂є α ¢συɴтʀу ¢σ∂є єχαмρℓє .συт 𝟿𝟽𝟷*");
    

    const countryCode = q.trim();
    if (!/^\d+$/.test(countryCode)) {
        return reply("*❌ ɪɴᴠᴀʟɪᴅ ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ. ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴏɴʟʏ ɴᴜᴍʙᴇʀs (ᴇ.ɢ., 𝟿𝟸 ғᴏʀ +𝟿𝟸 ɴᴜᴍʙᴇʀs*");
    }

    try {
        const participants = await groupMetadata.participants;
        const targets = participants.filter(
            participant => participant.id.startsWith(countryCode) && 
                         !participant.admin // Don't remove admins
        );

        if (targets.length === 0) {
            return reply(`*📛 ɴᴏ ᴍᴇᴍʙᴇʀs ғᴏᴜɴᴅ ᴡɪᴛʜ ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ +${countryCode}*`);
        }

        const jids = targets.map(p => p.id);
        await conn.groupParticipantsUpdate(from, jids, "remove");
        
        reply(`*ѕυᴄᴄєѕѕfυℓℓу кι¢кє∂ ${targets.length} мємвєʀѕ ωιтн ¢συɴтʀʏ ¢σ∂є +${countryCode}*`);
    } catch (error) {
        console.error("Out command error:", error);
        reply("❌ Failed to remove members. Error: " + error.message);
    }
});
