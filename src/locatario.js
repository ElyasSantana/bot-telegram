const axios = require('axios').default;
const moment = require('moment');

class Locatario {
  baseUrl = 'http://localhost:3001/locatarios';

  async getLocatarios(id) {
    const url = `${this.baseUrl}/${id}`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error.status);
    }
  }

  async cadastrarLocatario(idTelegram, nome) {
    const usuario = await this.getLocatarios(idTelegram);
    console.log(usuario);
    if (usuario !== []) {
      const response = await axios.post(`${this.baseUrl}`, {
        id: idTelegram,
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
