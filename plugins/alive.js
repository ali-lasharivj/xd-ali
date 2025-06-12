const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions');

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
╭──❍ *${config.BOT_NAME}* ❍─┉┈◊
│ ✨ *𝐇𝐄𝐋𝐋𝐎!* 👋
│ 🏷️ *𝐁𝐎𝐓-𝐔𝐒𝐄𝐑 :* ${m.pushName || 'No Name'}*
┗─┬────❍
╭─┴❍ *🧃 𝐁𝐎𝐓 𝐒𝐘𝐒𝐓𝐄𝐌* ❍─┉┈◊
│ *⏳️𝐔𝐏𝐓𝐈𝐌𝐄* : *${runtime(process.uptime())}*
│ *📟𝐑𝐀𝐌-𝐔𝐒𝐀𝐆𝐄* : *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}𝐌𝐁 / ${Math.round(require('os').totalmem / 1024 / 1024)}𝐌𝐁*
│ *🍁𝐇𝐎𝐒𝐓-𝐍𝐀𝐌𝐄* : *${os.hostname()}*
┗─────┉───────┉──┈⊷
`;
await conn.sendMessage(from, { 
                        audio: { url: `https://files.catbox.moe/6kvcfg.mp4` }, 
                        mimetype: "audio/mpeg" ,
                        ptt: "true" ,
                        contextInfo: {
                            externalAdReply: {
                                title: config.BOT_NAME || "ALI-MD",
                                body: "ᴘσωєʀє∂ ву αℓι м∂⎯꯭̽🐍",
                                mediaType: 1,
                                sourceUrl: "https://wa.me/message/TAMAX6V3VD2RG1",
                                thumbnailUrl: "https://files.catbox.moe/33hd05.jpg", // This should match the image URL provided above
                                renderLargerThumbnail: true,
                                showAdAttribution: true
                            }
                        }
                    
                    }, { quoted: mek });
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/33hd05.jpg`}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: cap,
         contextInfo: {
                mentionedJid: ['923003588997@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: false,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363318387454868@newsletter',
                    newsletterName: "𝐀ɭīī 𝐌Ɗ 𝐒ʊ̊𝐏𝐏๏፝֟ɼʈ⎯꯭̽💀🚩",
                    serverMessageId: 999 
                }
            }
     }, {quoted: mek});

     
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
