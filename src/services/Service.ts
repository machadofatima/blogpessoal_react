import axios from "axios";

const api = axios.create({
    baseURL: 'https://blogpessoal-b4u8.onrender.com'
})

 // método assincrono (promise) vai estar rodando a requisição em segundo plano
 
 export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}