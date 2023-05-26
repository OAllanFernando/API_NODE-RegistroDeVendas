// Inclui bibliotecas
// gerencia as requisições, rotas e urls
const express = require('express');
//conexão com banco
const db = require('./../db/models');
// chama a função do express, permite modularizar o projeto com os controllers, tornando esses metodos acessiveis
const router = express.Router();

//rota de cadastro 
router.post("/pessoa", async (req, res) => {
    var dados = req.body;
    console.log(dados);
    // salva no banco
    await db.Pessoa.create(dados).then((dadosUsuario) => {
        return res.json({
            mensagem: "Cliente cadastrado com sucesso!",
            dadosUsuario
        });
    }).catch(() => {
        return res.status(400).json({
            mensagem: "Cliente não cadastrado erro no processo!",
        });
    });

});
/*
router.get("/pessoa", async (req, res) => {
    //lista os dados
    const pessoas = await db.Pessoa.findAll({
        //Indica quais colunas quero, caso necessário
        //attributes:['id','codigo','nome', 'telefone', 'email'],

        // ordena decrecentemente pelo id
        order: [['id', 'DESC']]
    });
    if (pessoas) {
        return res.json({
            pessoas
        });
    } else {
        //Se der erro..
        return res.status(400).json({
            mensagem: "Erro: Não foi possível listar os registros"
        });

    }
});*/
router.get("/pessoa", async (req, res) => {
    try {
        const pessoas = await db.Pessoa.findAll({
            // como preciso relacioar a cidade na listagem uso o include para trzer os valores
            //https://www.youtube.com/watch?v=JYFe7jlOA8E
             order: [['id', 'DESC']],
            include: [
                {
                    model: db.Endereco,
                    include: [{
                        model: db.Bairro,
                        include: [{
                            model: db.Cidade,
                            attributes: ['nome']
                        }]
                    }]
                }
            ],
           
            
        });

        if (pessoas) {
            console.log(pessoas);
            return res.json({
                pessoas
            });
        } else {
            return res.status(400).json({
                mensagem: "Erro: Não foi possível listar os registros"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensagem: "Erro: Ocorreu um erro ao listar os registros"
        });
    }
});

//rota de edição
router.put("/pessoa", async (req, res) => {
    //recebo os dados
    var dados = req.body;
    console.log(dados);

    await db.Pessoa.update(dados, {where: {id: dados.id}})
    .then(()=>{
        return res.json({
            mensagem: "Registro editado!"
        });
    }).catch(()=>{
        return res.json({
        mensagem: "Erro: Não foi possível editar o registro"
    });
    })
    
} );

//rota de exclusão
router.delete("/pessoa/:id", async (req, res) => {

    //pega o dado da url
    const { id } = req.params;

    //pega o id e com o where indica qual o id a ser excluido no banco
    await db.Pessoa.destroy({
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