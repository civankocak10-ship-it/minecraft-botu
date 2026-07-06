const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// --- 1. RENDER İÇİN WEB SUNUCUSU ---
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('EvimizMC Botu 7/24 Aktif!');
});
app.listen(PORT, () => {
  console.log(`Web sunucusu ${PORT} portunda çalışıyor.`);
});

// --- 2. MINECRAFT BOT AYARLARI ---
function createBot() {
  const bot = mineflayer.createBot({
    host: 'EvimizMC.aternos.me', // Görseldeki IP adresin
    port: 64144,                 // Görseldeki bağlantı noktan
    username: 'RenderBotu',      // Botun oyundan görünecek adı
    version: '1.21.1'            // Sunucu sürümün (Mineflayer için 1.21.1)
  });

  bot.on('spawn', () => {
    console.log('Bot EvimizMC sunucusuna başarıyla giriş yaptı!');
  });

  // Bot sunucudan düşerse 30 saniye sonra tekrar girmeyi dener
  bot.on('end', () => {
    console.log('Bağlantı koptu. 30 saniye sonra tekrar denenecek...');
    setTimeout(createBot, 30000);
  });

  bot.on('error', (err) => {
    console.log('Bir hata oluştu: ', err);
  });

  // Biri sohbetten "merhaba" yazarsa bot cevap verir
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase() === 'merhaba') {
      bot.chat(`Merhaba ${username}! Ben 7/24 aktif kalacak olan botum.`);
    }
  });
}

createBot();