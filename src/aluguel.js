const axios = require('axios').default;
const moment = require('moment');

class Aluguel {
  baseUrl = 'http://localhost:3001/alugueis';

  calcularAluguel(dataEntrada, dataSaida, diaria) {
    const inicio = moment(dataEntrada);
    const final = moment(dataSaida);
    const duracao = moment.duration(final.diff(inicio));
    const valorTotal = duracao.asDays() * diaria;
    return valorTotal;
  }

  async solicitarAgendamento(
    dataEntrada,
    dataSaida,
    diaria,
    idImovel,
    idLocatario
  ) {
    const valorAluguel = this.calcularAluguel(dataEntrada, dataSaida, diaria);
    const response = await axios.post(`${this.baseUrl}`, {
      data_entrada: dataEntrada,
      data_saida: dataSaida,
      disponivel: true,
      alugado: false,
      valorAluguel: valorAluguel,
      imoveis_idImovel: idImovel,
      idLocatario: idLocatario,
    });
    return response.data;
  }

  async getAllAlugueisById(idLocatario) {
    const resposta = await axios.post(`${this.baseUrl}`, {
      idLocatario,
      alugado: true,
    });

    return resposta.data;
  }
}

module.exports = { Aluguel };

/* Teste da Classe
const teste = new Aluguel();
const r = teste.calcularAluguel('2022-02-10', '2022-02-17', 250);
console.log(r);

const t = teste.solicitarAgendamento(
  '2022-02-10',
  '2022-02-17',
  250,
  2,
  483492585
);

console.log(t);
 */
