const env = require('../.env');
const Telegraf = require('telegraf');

/*
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const moment = require('moment');
*/
const session = require('telegraf/session');

const { Imovel } = require('./imovel');
const { Bairro } = require('./bairro');

const bot = new Telegraf(env.token);

bot.use(session());

bot.start(async (context) => {
  const name = context.update.message.from.first_name;
  context.session.imovel = new Imovel();
  context.session.bairro = new Bairro();

  await context.reply(`
  Seja bem-vindo, ${name}!
  Eu sou o Luidi 🤖.
  `);
  bot.telegram.sendMessage(
    context.chat.id,
    `Vou te ajudar a encontrar o imóvel que você quer alugar 😄`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Buscar imóveis', callback_data: 'buscarImoveis' },
            { text: 'Ajuda', callback_data: 'help' },
          ],
        ],
      },
    }
  );
});

// ------- Comandos do Bot

/** Recomendar imóveis */
bot.action('buscarImoveis', async (context) => {
  console.log('Aqui');
  if (context.session.imovel) {
    console.log(context.session.imovel);
    const imoveis = await context.session.imovel.getAllImoveis();
    imoveis.forEach((imovel) => {
      bot.telegram.sendPhoto(context.chat.id, imovel.img_url);
      bot.telegram.sendMessage(context.chat.id, imovel.descricao);
    });
  }
});

/** O que o bot pode fazer */
bot.action('help', (context) => {
  context.replyWithHTML(`
    <b> O que eu posso fazer?</b>
    ◾️ Posso recomendar imóveis
    ◾️ Solicitar agendamento de temporada
    ◾️ Cancelar agendamentos
    ◾️ Verificar pontos de fidelidades
    ◾️ Listar de favoritos
  `);
});

//------- Actions do bot

bot.action(/mostrar (.+)/, async (context) => {
  await exibirTarefa(context, context.match[1]);
});

bot.startPolling();
