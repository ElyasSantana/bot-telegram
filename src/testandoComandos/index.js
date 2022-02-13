const { Telegraf } = require('telegraf');

const bot = new Telegraf('5179273894:AAE5hMtVbJAXKrxQJrldvaA8R9ltVrJzliE');




bot.start((ctx, next) => {
    ctx.reply(`oi ${ctx.from.first_name} voce iniciou o bot com o comando ${ctx.message.text}`);
    bot.telegram.sendMessage(ctx.chat.id, "Selecione a opção abaixo",
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Menu", callback_data: "menu"},
                ]
            ]
        }
    })
})
bot.action("menu", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Qual dos dois perfis se encaixa com voce?",
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Locador", callback_data: "locador"},
                    {text: "Locatário", callback_data: "locatario"}
                ]
            ]
        }
    })
})

bot.action("locatario", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Escolha uma das opções",
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Verificar imóveis", callback_data: "verificarImoveis"},
                    {text: "Solicitações", callback_data: "solicitacoes"}
                ]
            ]
        }
    },

    bot.action("verificarImoveis", ctx => {
        bot.telegram.sendMessage(ctx.chat.id, "casa 1")
        bot.telegram.sendPhoto(ctx.chat.id, "https://www.decorfacil.com/wp-content/uploads/2017/03/20171011fachada-casa-simples-pequena-99.jpg")
        
    })

    )
})
bot.help(ctx => {
    ctx.reply("Voce entrou no help");
});

bot.settings(ctx => {
    ctx.reply("Voce entrou no settings");
});

bot.command(["test", "Test"], ctx => {
    ctx.reply("Hello World")
})


bot.hears("cat", ctx => {
    ctx.reply("Meow");
});

bot.on("photo", ctx => {
    ctx.reply("this is a text message");
});



bot.command("verificar", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "imoveil 1, 2, 3")
})

bot.command("botao", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "bem vindo dasdsadsa",
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Locador", callback_data: "locador"},
                    {text: "Locatário", callback_data: "locatario"}
                ]
            ]
        }
    })
})

bot.action("clicou", ctx => {
    ctx.reply("voce clicou no botão")
})

bot.launch();