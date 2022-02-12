const env = require('../../.env');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const moment = require('moment');
const { getAgenda, getTarefa } = require('./agendaServices');
const bot = new Telegraf(env.token);

bot.start(async (context) => {
  const name = context.update.message.from.first_name;
  await context.reply(`Seja bem-vindo, ${name}`);
});

const formatarData = (data) => {
  data ? moment(data).format('DD-MM-YYYY') : '';
};

const exibirTarefa = async (context, tarefaId, novaMsg = false) => {
  const tarefa = await getTarefa(tarefaId);
  const conclusao = tarefa.dt_conclusao
    ? `\n<b>Concluída em:</b> ${formatarData(tarefa.dt_conclusao)}`
    : '';
  const msg = `
  <b>${tarefa.descricao}</b>
  <b>Previsão:</b>${formatarData(tarefa.dt_previsao)}${conclusao}
  <b>Observações:</b>\n${tarefa.observacao || ''}
  `;
  if (novaMsg) {
    context.reply(msg, botoesTarefa(tarefaId));
  } else {
    context.editMessageText(msg, botoesTarefa(tarefaId));
  }
};

const botoesAgenda = (tarefas) => {
  const botoes = tarefas.map((item) => {
    const data = item.dt_previsao
      ? moment(item.dt_previsao).format('DD-MM-YYYY')
      : '';
    return [
      Markup.callbackButton(`${data}${item.descricao}`, `mostrar ${item.id}`),
    ];
  });
  return Extra.markup(Markup.inlineKeyboard(botoes, { columns: 1 }));
};

const botoesTarefa = (idTarefa) => {
  Extra.HTML().markup(
    Markup.inlineKeyboard(
      [
        Markup.callbackButton('✅', `concluir ${idTarefa}`),
        Markup.callbackButton('📅', `setData ${idTarefa}`),
        Markup.callbackButton('💬', `addData ${idTarefa}`),
        Markup.callbackButton('❌', `excluir ${idTarefa}`),
      ],
      { columns: 4 }
    )
  );
};

// ------- Comandos do Bot

bot.command('dia', async (context) => {
  console.log(moment());
  const tarefas = await getAgenda(moment());
  context.reply(`Aqui está a sua agenda do dia`, botoesAgenda(tarefas));
});

//------- Actions do bot

bot.action(/mostrar (.+)/, async (context) => {
  await exibirTarefa(context, context.match[1]);
});

bot.startPolling();
