import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blogpessoal-cart.onrender.com'
});

export const cadastrarUsuario = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const login = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);

  localStorage.setItem('usuario', JSON.stringify(resposta.data));
  localStorage.setItem('token', JSON.stringify(resposta.data.token));
  console.log(localStorage.getItem('usuario'));
};

export const buscar = async (url: string, setDados: Function, header: object) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

export const cadastrar = async (
  url: string,
  dados: object,
  setDados: Function,
  header: object
) => {
  console.log(url);
  console.log(dados);
  console.log(setDados);
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: object,
  setDados: Function,
  header: object
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

export const deletar = async (url: string, header: object) => {
  await api.delete(url, header);
};