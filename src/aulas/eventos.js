const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

bot.start((context) => {
  const name = context.update.message.from.first_name;
  context.reply(`Seja bem-vindo, ${name}`);
});

bot.on('text', async (context) => {
  const texto = context.update.message.text;
  await context.reply(`Texto, ${texto}, recebido com sucesso!`);
});

bot.on('location', (context) => {
  const location = context.update.message.location;
  console.log(location);
  context.reply(`Entendido, você está em
  Lat: ${location.latitude},
  Lon: ${location.longitude}!`);
});

bot.on('contact', (context) => {
  const contact = context.update.message.contact;
  console.log(contact);
  context.reply(`Vou lembrar do(a)
  ${contact.first_name} (${contact.phone_number})`);
});

bot.on('voice', (context) => {
  const voice = context.update.message.voice;
  console.log(voice);
  context.reply(`Audio recebido, ele possui ${voice.duration} segundos`);
});

bot.on('photo', (context) => {
  const photo = context.update.message.photo;
  console.log(photo);

  photo.forEach((ph, i) => {
    context.reply(`A foto ${i} tem resolução de ${ph.width}x${ph.height}`);
  });
});

bot.on('sticker', (context) => {
  const sticker = context.update.message.sticker;
  console.log(sticker);
  context.reply(`Estou vendo que você enviou
  o ${sticker.emoji} do conjunto ${sticker.set_name}`);
});

bot.startPolling();
