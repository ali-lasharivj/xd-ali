const { cmd, commands } = require('../command');
const os = require("os");
const {runtime} = require('../functions');

cmd({
    pattern: "alive",
    desc: "Bot online test",
    react: "🌸",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
let cap = `
◉┏━┫ *⚬Lααɾα-ᴍᴅ-ᴀʟɪᴠᴇ⚬* ┣━✾
◉┃            *ᴸ  ͣ  ͣ  ͬ  ͣ  ✻  ᴸ  ͣ  ͣ  ͬ  ͣ*
┏┻━━━━━━━━━
┃ *ʜɪ Lααɾα-ᴍᴅ ᴀʟɪᴠᴇ ✻*
┗┳━━━━━━━━━
◉┃ *ɪᴍ ʟᴀʀᴀ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ*
◉┃ *ꜱɪᴍᴘᴀʟᴇ ᴊᴀᴠᴀ ꜱᴄʀɪᴘᴛ ʙᴏᴛ*
◉┃ *ꜱᴀᴅᴇᴇꜱʜᴀ ɪꜱ ᴍʏ ᴄʀᴇᴀᴛᴏʀ*
◉┃ *ɢᴇᴛ ᴍʏ ᴄᴏᴍᴍᴀɴᴅ ʟɪꜱᴛ ᴛᴏ ᴜꜱᴇ*
◉┃             *.ᴍᴇɴᴜ*
◉┗━━━━━━━━━━━━━━
━━┬┬┬┬┬┬┬┬┬┬┬━━
       *Lααɾα-ᴍᴅ ꜱʏꜱᴛᴇᴍ ɪɴꜰᴏ*
━━┴┴┴┴┴┴┴┴┴┴┴━━
┏━━━━━━━━━━━━━━
❍ *ʀᴜɴ ᴛɪᴍᴇ :* ${runtime(process.uptime())}
❍ *ʀᴀᴍ ᴜꜱᴇ :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
❍ *ᴘʟᴀᴛꜰᴏʀᴍ :* ${os.hostname()}
❍ *ᴏᴡɴᴇʀ :* ꜱᴀᴅᴇᴇꜱʜᴀ ᴛʜᴀʀᴜᴍɪɴ
┗━━━━━━━━━━━━━━
`;
await conn.sendMessage(from, { 
                        audio: { url: `https://github.com/manpakaya/Lara_Data_Base/raw/refs/heads/main/Lara_V3.5.mp3` }, 
                        mimetype: "audio/mpeg" ,
                        ptt: "true" ,
                        contextInfo: {
                            externalAdReply: {
                                title: "Lara-MD",
                                body: "ꜱᴀᴅᴇᴇꜱʜᴀ ᴛʜᴀʀᴜᴍɪɴ",
                                mediaType: 1,
                                sourceUrl: "https://github.com/sadiyamin",
                                thumbnailUrl: "https://github.com/manpakaya/Lara_Data_Base/raw/refs/heads/main/20250224_162020.jpg", // This should match the image URL provided above
                                renderLargerThumbnail: true,
                                showAdAttribution: true
                            }
                        }
                    
                    }, { quoted: mek });
await conn.sendMessage(from, {
            image: { url: `https://i.ibb.co/TD5qh4JJ/20250224-022914.jpg`}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: cap,
         contextInfo: {
                mentionedJid: ['94779062397@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363192254044294@newsletter',
                    newsletterName: "Lααɾα-ᴍᴅ ✻",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'LARA MD',
                    body: 'ꜱᴀᴅᴇᴇꜱʜᴀ ᴛʜᴀʀᴜᴍɪɴ',
                    mediaType: 1,
                    sourceUrl: "https://github.com/sadiyamin",
                    thumbnailUrl: 'https://github.com/manpakaya/Lara_Data_Base/raw/refs/heads/main/20250224_162020.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
     }, {quoted: mek});
     
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
