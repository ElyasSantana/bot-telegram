const axios = require('axios').default;

class Imovel {
  baseUrl = 'http://localhost:3001/imoveis';

  constructor(baseUrl = 'http://localhost:3001/imoveis') {
    this.baseUrl = baseUrl;
  }

  async getAllImoveis() {
    const url = `${this.baseUrl}?_sort=id,diaria&_order=asc`;
    const response = await axios.get(url);
    return response.data;
  }
}

module.exports = { Imovel };
