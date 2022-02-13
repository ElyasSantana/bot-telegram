const moment = require('moment');
const axios = require('axios').default;

const baseUrl = 'http://localhost:3001/tarefas';

const getAgenda = async (date) => {
  const url = `${baseUrl}?_sort=dt_previsao,descricao&_order=asc`;
  const response = await axios.get(url);
  const pendente = (item) =>
    item.dt_conclusao === null && moment(item.dt_previsao).isSameOrBefore(date);

  // console.log(response.data);
  return response.data;
};

const getTarefa = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

module.exports = { getAgenda, getTarefa };
