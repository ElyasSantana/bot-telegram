const { Telegraf } = require('telegraf');
const { Imovel } = require('../agenda/imoveisServices.js');

const bot = new Telegraf('5179273894:AAE5hMtVbJAXKrxQJrldvaA8R9ltVrJzliE');
const imovel = new Imovel()


const dados = {
    "casas": [
        {
            "id": 1,
            "name": "casa verde",
            "locId": 1,
            "bairro": "coroa do meio",
            "diaria": 200,
            "detalhes": `
            Uma casa muito aconchegante, perto da praia, shooping e centro.
            
            O que tem na casa:
            - ar-condicionado
            - piscina`
        },
        {
            "id": 2,
            "name": "casa azul",
            "locId": 2,
            "bairro": "treze de julho",
            "diaria": 400,
        }
    ]
}



bot.start(ctx => {
    ctx.reply(`oi ${ctx.from.first_name} voce iniciou o bot com o comando ${ctx.message.text}`);
    bot.telegram.sendMessage(ctx.chat.id, "Selecione a opção abaixo",
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Menu", callback_data: "menu" },
                    ]
                ]
            }
        })
})
bot.action("menu", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, "Escolha uma das opções",
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Verificar imóveis", callback_data: "verificarImoveis" },
                        { text: "Solicitações", callback_data: "solicitacoes" }
                    ]
                ]
            }
        })
})

bot.action("verificarImoveis", async (ctx) => {

    const imoveis = await imovel.getAllImoveis()
    console.log(imoveis[0].descricao)
    const imoveisFiltrados = await imovel.getImoveisFiltradosPorDiaria

    imoveis.forEach(async (imovel) => {

        await bot.telegram.sendPhoto(ctx.chat.id, imovel.img_url, caption = imovel.descricao)
    })

    await bot.telegram.sendMessage(ctx.chat.id, `Opções de casas`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: `${imoveis[0].descricao}`, callback_data: `${imoveis[0].id}` },
                        { text: `${imoveis[1].descricao}`, callback_data: `${imoveis[1].id}` },
                    ]
                ]
            }
        }
    )

    await bot.action(`${imoveis[0].id}`, ctx => {
        bot.telegram.sendMessage(ctx.chat.id, `O valor da diária é R$ ${imoveis[0].diaria}
        Detalhes:
        ${imoveis[0].descricao}`)
    })

    await bot.action(`${imoveis[1].id}`, ctx => {
        bot.telegram.sendMessage(ctx.chat.id, `O valor da diária é R$ ${imoveis[1].diaria}
        Detalhes:
        ${imoveis[1].descricao}`)
    })
})

bot.action(`${dados.casas[0].name}`, ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `O valor da diária é R$ ${dados.casas[0].diaria}
    Detalhes:
    ${dados.casas[0].detalhes}`)
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


bot.action("clicou", ctx => {
    ctx.reply("voce clicou no botão")
})

bot.launch();