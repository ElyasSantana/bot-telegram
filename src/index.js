const env = require('../.env');
const Telegraf = require('telegraf');

/*
const Extra = require('telegraf/extra');
*/
// const Markup = require('telegraf/markup');
const moment = require('moment');

const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const { Imovel } = require('./imovel');
const { Aluguel } = require('./aluguel');
// const { Locatario } = require('./locatario');

const bot = new Telegraf(env.token);
// Scene da reserva
const reservaScene = new Scene('reserva');
reservaScene.enter((context) => {
  context.session.idImovel = context.match[1];
  context.reply(`
  Digite a data de entrada e depois a data de saída?
  Ex: entrada: 0000-00-00 e depois entrada: 0000-00-00
  `);
});
const stage = new Stage([reservaScene]);

bot.use(session());
bot.use(stage.middleware());

// ------- Comandos do Bot
reservaScene.hears(/entrada: (\d{4}\-\d{2}\-\d{2})/g, async (context) => {
  const data = moment(context.match[1], 'YYYY-MM-DD');
  context.session.dataEntrada = data;
});

reservaScene.hears(/saida: (\d{4}\-\d{2}\-\d{2})/g, async (context) => {
  if (context.session.dataEntrada) {
    const imoveis = new Imovel();
    const idLocatario = context.update.message.from.id;
    const idImovel = context.session.idImovel;
    const imovel = imoveis.getImovel(idImovel);
    console.log(imovel);
    context.session.imovelDiaria = imovel.diaria;

    const dataEntrada = context.session.dataEntrada.format('YYYY-MM-DD');
    const dataSaida = moment(context.match[1], 'YYYY-MM-DD').format(
      'YYYY-MM-DD'
    );

    context.session.dataSaida = dataSaida;
    context.session.aluguel.solicitarAgendamento(
      dataEntrada,
      dataSaida,
      context.session.imovelDiaria,
      idImovel,
      idLocatario
    );
  }
  context.reply(`Solicitação de reserva enviada!`, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Mais imóveis', callback_data: 'buscarImoveis' },
          { text: 'Ajuda', callback_data: 'help' },
        ],
      ],
    },
  });
});

bot.start(async (context) => {
  const nome = context.update.message.from.first_name;
  context.session.imovel = new Imovel();
  context.session.aluguel = new Aluguel();

  await context.reply(`
  Seja bem-vindo, ${nome}!
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

bot.action(/reservar (.+)/, Stage.enter('reserva'));

/** Recomendar imóveis */
bot.action('buscarImoveis', async (context) => {
  if (context.session.imovel) {
    // console.log(context.session.imovel);
    const imoveis = await context.session.imovel.getAllImoveis();
    imoveis.forEach((imovel) => {
      bot.telegram.sendPhoto(context.chat.id, imovel.img_url);
      bot.telegram.sendMessage(context.chat.id, imovel.descricao, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Solicitar Reservar',
                callback_data: `reservar ${imovel.id}`,
              },
              { text: 'mais Imóveis', callback_data: 'buscarImoveis' },
            ],
          ],
        },
      });
    });
  }
});

/** O que o bot pode fazer */
bot.action('help', (context) => {
  context.replyWithHTML(`
    <b> O que eu posso fazer?</b>
    ◾️ Posso recomendar imóveis
    ◾️ Solicitar reserva de temporada
    ◾️ Listar de imóveis reservados
    ◾️ Cancelar reserva
    ◾️ Verificar pontos de fidelidades
  `);
});

//------- Actions do bot

// bot.action(/reservar (.+)/, (context) => {
//   console.log(context.match[1]);
// });

bot.startPolling();
