const env = require('../../.env');
const Telegraf = require('telegraf');

/* const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const moment = require('moment'); */

const { Imovel } = require('./imvoveisServices');

const bot = new Telegraf(env.token);

bot.start(async (context) => {
  const name = context.update.message.from.first_name;
  await context.reply(`
  Seja bem-vindo, ${name}!
  Eu sou o Luidi 🤖.`);
  await context.reply(
    `Vou te ajudar a encontrar o imóvel que você quer alugar 😄`
  );
});

// ------- Comandos do Bot

bot.command('dia', async (context) => {
  const teste = new Imovel();
  const imoveis = await teste.getAllImoveis();
  imoveis.forEach((imovel) => {
    context.sendPhoto();
  });
});

//------- Actions do bot

bot.action(/mostrar (.+)/, async (context) => {
  await exibirTarefa(context, context.match[1]);
});

bot.startPolling();
