const axios = require('axios').default;
const moment = require('moment');

class Locatario {
  baseUrl = 'http://localhost:3001/locatarios';

  async getLocatarios(id) {
    const url = `${this.baseUrl}/${id}`;
    const response = await axios.get(url);

    return response.data;
  }

  async cadastrarLocatario(idTelegram, nome) {
    const usuario = getLocatarios(idTelegram);
    if (!usuario.idTelegram) {
      const response = await axios.post(url, {
        idTelegram: idTelegram,
        nome: nome,
        telefone: '',
        pontosFidelidade: 0,
        dataCadastro: moment().format('YYYY-MM-DD'),
      });
      return response.data;
    }
  }
}
module.exports = { Locatario };
