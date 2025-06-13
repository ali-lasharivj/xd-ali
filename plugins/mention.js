const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');

cmd({
  on: "body"
}, async (conn, m, { isGroup }) => {
  try {
    if (config.MENTION_REPLY !== 'true' || !isGroup) return;
    if (!m.mentionedJid || m.mentionedJid.length === 0) return;

    const voiceClips = [
      "https://files.catbox.moe/brusa6.mp4",
      "https://files.catbox.moe/3j1zy4.mp4",
      "https://files.catbox.moe/4g3dwj.mp4",
      "https://files.catbox.moe/su4wyp.mp4",
      "https://files.catbox.moe/8cuz5m.mp4",
      "https://files.catbox.moe/pdjieu.mp4",
      "https://files.catbox.moe/esixn9.mp4",
      "https://files.catbox.moe/dqj2fq.mp4",
      "https://files.catbox.moe/dnyop2.mp4"
    ];

    const randomClip = voiceClips[Math.floor(Math.random() * voiceClips.length)];
    const botNumber = conn.user.id.split(":")[0] + '@s.whatsapp.net';

    if (m.mentionedJid.includes(botNumber)) {
      const thumbnailRes = await axios.get(config.ALIVE_IMG || "https://files.catbox.moe/vgrxe0.jpg", {
        responseType: 'arraybuffer'
      });
      const thumbnailBuffer = Buffer.from(thumbnailRes.data, 'binary');

      await conn.sendMessage(m.chat, {
        audio: { url: randomClip },
        mimetype: 'audio/mp4',
        ptt: true,
        waveform: [99,80,50,0,50,80,99],
        contextInfo: {
          forwardingScore: 5,
          isForwarded: true,
          externalAdReply: {
            title: config.BOT_NAME || "ALI-MD",
            body: config.DESCRIPTION || "?σω???? ву α?ι м?????",
            mediaType: 1,
            renderLargerThumbnail: false,
            thumbnail: thumbnailBuffer,
            mediaUrl: "https://files.catbox.moe/vgrxe0.jpg", // Static image URL
            sourceUrl: "https://wa.me/message/TAMAX6V3VD2RG1",
            showAdAttribution: true
          }
        }
      }, { quoted: m });
    }
  } catch (e) {
    console.error(e);
    const ownerJid = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    await conn.sendMessage(ownerJid, {
      text: `*Bot Error in Mention Handler:*\n${e.message}`
    });
  }
});
