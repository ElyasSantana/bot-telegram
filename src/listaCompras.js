const env = require('../.env');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const session = require('telegraf/session');
const bot = new Telegraf(env.token);

const botoes = (lista = []) =>
  Extra.markup(
    Markup.inlineKeyboard(
      lista.map((item) => Markup.callbackButton(item, `delete ${item}`)),
      { columns: 3 }
    )
  );

//inicia uma sessão
bot.use(session());

const verificarUsuario = (context, next) => {
  const mesmoIDMsg =
    context.update.message && context.update.message.from.id === env.UserID;
  const mesmoIDCallback =
    context.update.callback_query &&
    context.update.message.from.id === env.UserID;

  if (mesmoIDMsg || mesmoIDCallback) {
    next();
  } else {
    context.reply(`Desculpe, não fui autorizado a conversar com você...`);
  }
};

bot.start(verificarUsuario, async (context) => {
  const name = context.update.message.from.first_name;
  await context.reply(`Seja bem-vindo, ${name}`);
  await context.reply(`Escreva os itens que você deseja adicionar...`);
  context.session.lista = [];
});

bot.on('text', verificarUsuario, (context) => {
  let msg = context.update.message.text;
  if (context.session.lista) {
    context.session.lista.push(msg);
  }
  context.reply(
    `${context.update.message.text} adicionado!`,
    botoes(context.session.lista)
  );
});

bot.action(/delete (.+)/, verificarUsuario, (context) => {
  if (context.session.lista) {
    context.session.lista = context.session.lista.filter(
      (item) => item !== context.match[1]
    );
  }
  context.reply(`${context.match[1]} deetado!`, botoes(context.session.lista));
});

bot.startPolling();
