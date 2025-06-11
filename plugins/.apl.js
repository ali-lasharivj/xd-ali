const fetch = require("node-fetch");
const config = require('../config');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const { getConfig, setConfig } = require('../lib/configdb');
const axios = require("axios");
const { fetchJson } = require("../lib/functions");
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const { facebook } = require("@mrnima/facebook-downloader");
const cheerio = require("cheerio");
const { igdl } = require("ruhend-scraper");
const { cmd, commands } = require('../command');
const yts = require('yt-search');

function getNewsletterContext(senderJid) {
    return {
        mentionedJid: [senderJid],
        forwardingScore: 999,
        isForwarded: false,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363333589936873@newsletter',
            newsletterName: "ALI INXIDE",
            serverMessageId: 143
        }
    };
}

cmd({
  pattern: "pla",
  react: "🎶",
  desc: "Download YouTube song",
  category: "download",
  use: '.play <query>',
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) return reply("🎵 Please provide a song name or YouTube link.", null, {
      contextInfo: getNewsletterContext(m.sender)
    });

    const yt = await ytsearch(q);
    if (!yt.results.length) return reply("❌ No results found!", null, {
      contextInfo: getNewsletterContext(m.sender)
    });

    const song = yt.results[0];
    const cacheKey = `song:${song.title.toLowerCase()}`;
    const cachedData = getConfig(cacheKey);
    let downloadUrl = null;

    if (!cachedData) {
      const apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(song.url)}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (!data?.result?.downloadUrl) return reply("⛔ Download failed.", null, {
        contextInfo: getNewsletterContext(m.sender)
      });

      downloadUrl = data.result.downloadUrl;

      setConfig(cacheKey, JSON.stringify({
        url: downloadUrl,
        title: song.title,
        thumb: song.thumbnail,
        artist: song.author.name,
        duration: song.timestamp,
        views: song.views,
        yt: song.url,
        ago: song.ago
      }));
    } else {
      const parsed = JSON.parse(cachedData);
      downloadUrl = parsed.url;
    }

    const caption = `*✦ ALI MD DOWNLOADER ✦*
╭───────────────◆
│⿻ *Title:* ${song.title}
│⿻ *Quality:* mp3/audio (128kbps)
│⿻ *Duration:* ${song.timestamp}
│⿻ *Viewers:* ${song.views}
│⿻ *Uploaded:* ${song.ago}
│⿻ *Artist:* ${song.author.name}
╰────────────────◆
⦿ *Direct Yt Link:* ${song.url}

╭────────────────◆
│ *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ALI MD*
╰─────────────────◆`;

    // Send the audio directly
    await conn.sendMessage(from, {
      audio: { url: downloadUrl },
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: getNewsletterContext(m.sender)
    }, { quoted: mek });

    // Optional: Send song info as caption with thumbnail
    await conn.sendMessage(from, {
      image: { url: song.thumbnail },
      caption: caption,
      contextInfo: getNewsletterContext(m.sender)
    }, { quoted: mek });

  } catch (err) {
    console.error(err);
    reply("🚫 An error occurred.", null, {
      contextInfo: getNewsletterContext(m.sender)
    });
  }
});
