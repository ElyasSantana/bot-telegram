const axios = require('axios').default;


class Imovel {

    baseUrl = 'http://localhost:3000/imoveis'

    async getAllImoveis() {
        const url = `${this.baseUrl}?_sort=id,diaria&_order=asc`;
        const response = await axios.get(url);
        return response.data;
    }

    async getImoveisFiltradosPorDiaria(valor) {
        const url = `${this.baseUrl}?_sort=id,diaria&_order=asc`;
        const response = await axios.get(url);
        const imoveisFiltrados = response.data.filter(imovel => imovel.diaria < valor )
        return imoveisFiltrados
    }
} 

module.exports = { Imovel }