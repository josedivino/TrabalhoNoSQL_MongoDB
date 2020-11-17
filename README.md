# CRUD com MongoDB

Trabalho CRUD para manipulação de Dados no Banco MongoDB com NodeJS
## Requirements
 - Node ^12 (= or >)
 - MongoDB 
### Instalar dependências de Desenvolvimento

Esse processo se faz necessário caso já não tenha em seu sistema operacional NodeJs ^12. Comandos feitos para distro Ubuntu

```sh
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
# para esse ultimo comando, deve visualizar a versão instalada do Node
node -v
# v14...
```
MongoDB no Docker (não obrigatório)

Foi utilizado Docker (https://docs.docker.com/engine/install/ubuntu/)
```sh
docker pull mongo
docker run --name mongodb -p 27017:27017 mongo
```

#### Executar o projeto
```sh
npm i
npm start
```

#### 
Projeto no localhost:5000