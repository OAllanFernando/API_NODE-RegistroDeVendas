Para rodar o projeto:

### 1° npm install 
Instala as dependencias para o projeto

### 2° create database banco_vendas character set utf8mb4 collate utf8mb4_unicode_ci;
Cria o banco, server sql instalado. Utilizei o workbensh para o gerenciamento

 3° Altera as credenciais no arquivo ".env"

https://www.youtube.com/watch?v=z_131ICWWl0&list=PLmY5AEiqDWwDZ4q3MK6tZ3-bCB4dpP4d9&index=10
### npm install sequelize 
Facilita o gerenciamento do bancode dados


###  npm install --save mysql2
Driver do banco

### npm install --save-dev sequelize-cli 
Permite a utilização de linhas de comando para o desenvolvimento

### npx sequelize-cli init
Cria os arquivos de configuração

### node app.js
rodar o projeto

### npm install --save dotenv
Manipula as variaveis de ambiente

### npx sequelize-cli migration:generate --name create-pessoa
Cria a migration, cria o arquivo de configuração para que seja inserido as caracteristicas

###  4° npx sequelize-cli db:migrate
Executa as migrations, criando as tabales com base nos arquivos de configuração


### npx sequelize-cli migration:generate --name alter-pessoa
Comando para alterar tabelas, cria a migration de alteração, nesse caso na tabela pessoa - comando de versionamento

### npx sequelize-cli db:migrate:undo --name *nome_da_migration
comando de rollback, desfaz a migration que foi atualizada - comando de versionamento



Criando as models
## npx sequelize-cli model:generate --name Pessoa --attributes nome:string,codigo:number,telefone:string,email:string,enderecoId:number