import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.0.1.10:3333',
  // baseURL: 'https://api-pucar.herokuapp.com/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Content-Type': 'application/json',
  },
});

export const ibge = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
});

export const viacep = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});
