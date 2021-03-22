# pebmed-backend
Para desenvolver a aplicação foi utilizado alguns princípios do SOLID e clean Architecture utilizando o typeORM e banco de dados Postgres

# Padrão de commit do Git Semantic Commit Messages usado no repositório:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

# TEST - Challenge pebmed backend

## Instalando

Obs.: É necessário antes de instalar este projeto, ter instalado e rodando node.js: 
* Nodejs (https://nodejs.org/en/)

para fazer a instalação das dependências do projeto você pode utilizar o yarn ou utilizar npm

Para instalá-lo em sua máquina faça os comandos a seguir:

``` bash
  git clone https://github.com/Wil-g2/pebmed-backend.git
  cd pebmed-backend 
```

## Baixando dependências
acesse a pasta backend e execute o comando:

``` bash   
  yarn ou npm install
```

## Executando o projeto
Após baixar as dependências vamos precisar de um postgres para rodar as migrations do projeto se tiver docker instalado na máquina pode criar um banco de dados ou pode usar o docker usando o comando abaixo para subir um postgres usando o docker:

``` bash
  docker run --name postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres    
```

copiar o arquivo .env.example para um .env e alterar as variáveis de ambiente

``` bash 
  cp .env.example .env
```

Para rodar as migrations pode usar o comando abaixo

``` bash
  yarn migrations ou npm run migrations
```

### Testes 

No backend tem alguns arquivos com a extensão .spec.ts onde se encontra alguns testes de unitários da API

Para executá-los os testes basta executar o comando:

```bash
  yarn test ou npm run test
```
se quiser rodar com coverage

```bash
  yarn test-cover ou npm run test-cover 
```

### Backend Ferramentas e Bibliotecas 

### Padrão de Código
- ESLint
- Prettier 
- Lint-staged
- Husky
- git-commit-msg-linter (para manter padrão nas mensagens de commmit)

### Gerenciando variáveis ambiente
- Dotenv

### Documentação da API
- Postman
- Isomnia JSON
- HAR

### Teste da Aplicação
-Jest
-Supertest
-faker

### Container
-Docker

### Backend
-Node.js
-Express
-TypeORM
-Celebrate (para validação)
-ts-node-dev 
-Cors
-Helmet (para segurança da aplicação)
-bcryptjs
-express-async-errors
-jsonwebtoken
-date-fns
-pg

### Frontend
-ReactJS
-styled-components

### Aplicação
Alguns prints da aplicação

### Teste Insomnia 
![image](https://user-images.githubusercontent.com/26700193/111925430-9df18000-8a87-11eb-85cd-f1b5b0d6f860.png)

![image](https://user-images.githubusercontent.com/26700193/111925447-b19ce680-8a87-11eb-8963-c2dca98f34c0.png)

![image](https://user-images.githubusercontent.com/26700193/111925477-c6797a00-8a87-11eb-8082-e38f787b37e7.png)

![image](https://user-images.githubusercontent.com/26700193/111925498-da24e080-8a87-11eb-93ee-e60fa10d587e.png)

![image](https://user-images.githubusercontent.com/26700193/111925513-ead55680-8a87-11eb-9050-fd0af5a57674.png)

![image](https://user-images.githubusercontent.com/26700193/111925523-f9237280-8a87-11eb-86bb-fc11c9b27ad9.png)

![image](https://user-images.githubusercontent.com/26700193/111925536-0a6c7f00-8a88-11eb-82bb-d92a4827288d.png)

![image](https://user-images.githubusercontent.com/26700193/111925542-0fc9c980-8a88-11eb-854d-0e6a23afc47e.png)

![image](https://user-images.githubusercontent.com/26700193/111925579-3a1b8700-8a88-11eb-8f0f-1e133b468614.png)

![image](https://user-images.githubusercontent.com/26700193/111925589-47d10c80-8a88-11eb-896f-105780b2ec1d.png)

Quando o paciente é excluído o agendamento ainda fica no banco de dados porém o paciente está com NULL
![image](https://user-images.githubusercontent.com/26700193/111925634-78b14180-8a88-11eb-8b08-dcf8f9fc5425.png)

Diagram do banco de dados da aplicação
https://dbdiagram.io/d/60515987ecb54e10c33bc672

![image](https://user-images.githubusercontent.com/26700193/111925782-02f9a580-8a89-11eb-987e-2a920097db7f.png)



### Cobertura de Testes

![image](https://user-images.githubusercontent.com/26700193/111926077-1e18e500-8a8a-11eb-8885-6dd97bd7d539.png)
![image](https://user-images.githubusercontent.com/26700193/111926132-6506da80-8a8a-11eb-8716-7da8cce005a7.png)
![image](https://user-images.githubusercontent.com/26700193/111926150-7223c980-8a8a-11eb-903f-089f309b49ea.png)
![image](https://user-images.githubusercontent.com/26700193/111926186-92538880-8a8a-11eb-8f91-f14325456d27.png)
![image](https://user-images.githubusercontent.com/26700193/111926195-98e20000-8a8a-11eb-953e-7fa6e0029823.png)


### CI Github Actions
![image](https://user-images.githubusercontent.com/26700193/111926216-b2834780-8a8a-11eb-9132-d301d478ea3b.png)


### Backend hospedado no Heroku
https://pebmed.herokuapp.com/

### Frontend
  
## Autor
Willian Gaudencio de Rezende
Email: <wil-g2@hotmail.com>
Linkedin: <https://www.linkedin.com/in/willian-gaudencio-38864312b/>
