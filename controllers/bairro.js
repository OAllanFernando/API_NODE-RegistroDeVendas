// Inclui bibliotecas
// gerencia as requisições, rotas e urls
const express = require('express');
//conexão com banco
const db = require('./../db/models');
// chama a função do express, permite modularizar o projeto com os controllers, tornando esses metodos acessiveis
const router = express.Router();

//rota de cadastro 
router.post("/bairro", async (req, res) => {
    var dados = req.body;
    console.log(dados);
    // salva no banco
    await db.Bairro.create(dados).then((dadosUsuario) => {
        return res.json({
            mensagem: "Bairro cadastrado com sucesso!",
            dadosUsuario
        });
    }).catch(() => {
        return res.status(400).json({
            mensagem: "Bairro não cadastrado erro no processo!",
        });
    });

});

//lista os dados
router.get("/bairro", async (req, res) => {
    
    const bairros = await db.Bairro.findAll({
        //Indica quais colunas quero, caso necessário
        //attributes:['id','codigo','nome', 'telefone', 'email'],

        // ordena decrecentemente pelo id
        order: [['id', 'DESC']],
        include: [{
            model: db.Cidade,
            attributes: ['nome']
        }]
    });
    if (bairros) {
        return res.json({
            bairros
        });
    } else {
        //Se der erro..
        return res.status(400).json({
            mensagem: "Erro: Não foi possível listar os registros"
        });

    }
});

//rota de edição
router.put("/bairro", async (req, res) => {
    //recebo os dados
    var dados = req.body;
    console.log(dados);

    await db.Bairro.update(dados, {where: {id: dados.id}})
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
router.delete("/bairro/:id", async (req, res) => {

    //pega o dado da url
    const { id } = req.params;

    //pega o id e com o where indica qual o id a ser excluido no banco
    await db.Bairro.destroy({
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



/// busca o bairro conforme a cidade
router.get("/bairro/:id", async (req, res) => {
    const cidadeId = req.params.id;
  
    try {
      const bairros = await db.Bairro.findAll({
        
        attributes: ["id","nome"],
        where: { cidadeId }
      });
  
      if (bairros.length > 0) {
        return res.json({ bairros });
      } else {
        return res.status(404).json({
          mensagem: "Nenhum bairro encontrado"
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        mensagem: "Erro: Não foi possível listar os bairros"
      });
    }
  });


  /// busca o o maior id
router.get("/bairromaior", async (req, res) => {
    
    try {
       const maiorId = await db.Bairro.findOne({
        // passa a coluna e depois ordem decrecente 
        order:[['id', 'DESC']]
        
      });
      if(maiorId === null){
        console.log('nulo')
       return res.json({maiorId: 0 });
        
      }

        return res.json({   maiorId: maiorId.id  });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        mensagem: "Erro: Não foi possível encontrar o maior"
      });
    }
  });


// exporta a router para usar no app
module.exports = router;