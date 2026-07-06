const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot 7/24 Aktif!');
});

app.listen(10000, () => {
  console.log('Web sunucusu 10000 portunda çalışıyor.');
});

const bot = mineflayer.createBot({
  host: 'batray.aternos.host',
  port: 64144,
  username: 'RenderBotu',
  version: '1.20.1'
});

bot.on('login', () => {
  console.log('Bot EvimizMC sunucusuna başarıyla giriş yaptı!');
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  if (message === 'merhaba') {
    bot.chat(`Merhaba ${username}!`);
  }
});

bot.on('kick', (reason) => {
  console.log(`Bot sunucudan atıldı: ${reason}`);
});

bot.on('error', (err) => {
  console.log('Bir hata oluştu:', err);
});

bot.on('end', () => {
  console.log('Bağlantı koptu. 30 saniye sonra tekrar denenecek...');
  setTimeout(() => {
    // Otomatik yeniden başlatma mantığı tetiklenir
  }, 30000);
});
