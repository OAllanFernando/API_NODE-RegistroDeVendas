// Inclui bibliotecas
// gerencia as requisições, rotas e urls
const express = require('express');
//conexão com banco
const db = require('./../db/models');
// chama a função do express, permite modularizar o projeto com os controllers, tornando esses metodos acessiveis
const router = express.Router();

//rota de cadastro 
router.post("/cidade", async (req, res) => {
    var dados = req.body;

    console.log(dados);
    // salva no banco
    await db.Cidade.create(dados).then((dadosUsuario) => {
        return res.json({
            mensagem: "Cidade cadastrada com sucesso!",
            dadosUsuario
        });
    }).catch(() => {
        return res.status(400).json({
            mensagem: "Cidade não cadastrada erro no processo!",
        });
    });

});
//rota para listar os dados
router.get("/cidade", async (req, res) => {

    const cidades = await db.Cidade.findAll({
        //Indica quais colunas quero, caso necessário
        //attributes:['id','codigo','nome', 'telefone', 'email'],

        // ordena decrecentemente pelo id
        order: [['id', 'DESC']]
    });
    if (cidades) {
        return res.json({
            cidades
        });
    } else {
        //Se der erro..
        return res.status(400).json({
            mensagem: "Erro: Não foi possível listar os registros"
        });

    }
});


//rota de edição
router.put("/cidade", async (req, res) => {
    //recebo os dados
    var dados = req.body;
    console.log(dados);

    await db.Cidade.update(dados, { where: { id: dados.id } })
        .then(() => {
            return res.json({
                mensagem: "Registro editado!"
            });
        }).catch(() => {
            return res.status(400).json({
                mensagem: "Erro: Não foi possível editar o registro"
            });
        })

});


//rota de exclusão
router.delete("/cidade/:id", async (req, res) => {

    //pega o dado da url
    const { id } = req.params;

    //pega o id e com o where indica qual o id a ser excluido no banco
    await db.Cidade.destroy({
        where: { id }
    }).then(() => {
        return res.json({
        mensagem: "Registro apagado!"
        });

    }).catch(() => {
        return res.status(400).json({
            mensagem: "Erro: Não foi possível apagar o registro"
        });
    });

});
// exporta a router para usar no app
module.exports = router;