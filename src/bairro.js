const axios = require('axios').default;

class Bairro {
  baseUrl = 'http://localhost:3001/bairros';

  async getAllBairros() {
    const url = `${this.baseUrl}?_sort=nome&_order=asc`;
    const response = await axios.get(url);
    return response.data;
  }
}
module.exports = { Bairro };
