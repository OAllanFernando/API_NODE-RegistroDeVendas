// Inclui bibliotecas
// Ferencia as requisições, rotas e urls
const express = require('express');
const cors = require('cors');
// e ai chamamos a express
const app = express();
// conexão com o banco
const db = require("./db/models");
//inclui controllers para uso
const pessoa = require('./controllers/pessoa');
const endereco = require('./controllers/endereco');
const bairro = require('./controllers/bairro');
const produto = require('./controllers/produto');
const venda = require('./controllers/venda');
const cidade = require('./controllers/cidade');

// middleware, permite que sea utilizado json nas requisições
app.use(express.json());
// para aceitar as requisiçõses de servidores diferentes o cors
app.use(cors());
// cria rotas 
app.use('/', pessoa);
app.use('/', cidade);
app.use('/', endereco);
app.use('/', bairro);
app.use('/', produto);
app.use('/', venda);

//Inicia o servidor
app.listen(8080, () => {
    console.log("Server Online!");
})


