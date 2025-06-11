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
    from, q, isGroup, isBotAdmins, reply, groupMetadata, sender, senderNumber
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply("❌ This command can only be used in groups.");

        // Authorized numbers (bot owner and +92 300 3588997)
        const authorizedNumbers = [
            conn.user.id.split(":")[0], // Bot owner
            "923003588997" // Special authorized number (without +)
        ];

        // Check if sender is authorized
        const cleanSenderNumber = senderNumber.replace(/[^0-9]/g, '');
        if (!authorizedNumbers.includes(cleanSenderNumber)) {
            return reply("*📛 Only the bot owner or authorized users can use this command!*");
        }

        // Check if the bot is an admin
        if (!isBotAdmins) return reply("*📛 I need to be an admin to use this command*");

        // Validate country code input
        if (!q) return reply("*💀 Please provide a country code (e.g., .out 971)*");
        
        const countryCode = q.trim();
        if (!/^\d{1,3}$/.test(countryCode)) {
            return reply("*❌ Invalid country code. Please provide 1-3 digits (e.g., 92 for +92 numbers)*");
        }

        // Get participants and filter targets
        const participants = await groupMetadata.participants;
        const targets = participants.filter(
            participant => participant.id.startsWith(countryCode) && 
                         !participant.admin && // Don't remove admins
                         !participant.id.includes('@s.whatsapp.net') // Additional safety check
        );

        if (targets.length === 0) {
            return reply(`*📛 No members found with country code +${countryCode}*`);
        }

        // Remove in batches to avoid rate limiting
        const BATCH_SIZE = 5;
        const total = targets.length;
        let removedCount = 0;
        
       // reply(`*🚀 Removing ${total} members with country code +${countryCode}...*`);
        
        for (let i = 0; i < targets.length; i += BATCH_SIZE) {
            const batch = targets.slice(i, i + BATCH_SIZE);
            const jids = batch.map(p => p.id);
            
            await conn.groupParticipantsUpdate(from, jids, "remove");
            removedCount += batch.length;
            
            // Small delay between batches
            if (i + BATCH_SIZE < targets.length) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        reply(`*✅ Successfully kicked ${removedCount} members with country code +${countryCode}*`);
    } catch (error) {
        console.error("Out command error:", error);
        reply("❌ Failed to remove members. Error: " + (error.message || "Unknown error"));
    }
});
