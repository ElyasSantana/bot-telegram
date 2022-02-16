const axios = require('axios').default;

class Imovel {
  baseUrl = 'http://localhost:3001/imoveis';

  async getAllImoveis() {
    const url = `${this.baseUrl}?_sort=id,diaria&_order=asc`;
    const response = await axios.get(url);
    return response.data;
  }

  async getImovel(id) {
    const url = `${this.baseUrl}/${id}`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  }

  async getImoveisFiltradosPorDiaria(valor) {
    const url = `${this.baseUrl}?_sort=id,diaria&_order=asc`;
    const response = await axios.get(url);
    const imoveisFiltrados = response.data.filter(
      (imovel) => imovel.diaria < valor
    );
    return imoveisFiltrados;
  }

  async cadastrarImovel(descricao, img_url, diaria, endereco) {
    const response = await axios.post(`${this.baseUrl}`, {
      descricao: descricao,
      img_url: img_url,
      diaria: diaria,
      endereco: endereco,
    });
    return response.data;
  }
}

module.exports = { Imovel };
