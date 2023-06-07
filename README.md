<h1 align="center">Trybe Futebol Clube</h1>

Este projeto, denominado TFC (Trybe Futebol Clube), é um site informativo sobre partidas e classificações de futebol, desenvolvido por uma equipe de desenvolvedores com o objetivo de criar uma aplicação completa e funcional que atenda às necessidades dos usuários.

Neste projeto, a equipe de desenvolvimento foi responsável por desenvolver uma API (utilizando o método TDD) e também integrar as aplicações, utilizando o docker-compose, para que elas funcionem consumindo um banco de dados.

O back-end do TFC é dockerizado e utiliza a modelagem de dados do Sequelize. Durante o desenvolvimento, foram respeitadas as regras de negócio do projeto e a API foi projetada para ser consumida pelo front-end já existente.

Para adicionar uma partida, é necessário possuir um token de acesso, o que exige que o usuário esteja autenticado para fazer as alterações. Existe um relacionamento entre as tabelas de times e partidas, para que as atualizações nas partidas possam ser realizadas adequadamente.

O back-end do TFC possui regras de negócio específicas para popular a tabela disponível no front-end, a qual será exibida ao usuário final do sistema.

<h2>Stack utilizada</h2>

- **Front-End**: `React`, `Axios`.
- **Back-end**: `Javascript`, `Typescript`, `Node.js`, `POO`, `SOLID`, `Docker`, `Sequelize`
- **Testes**: `Mocha`, `chai`, `sinon`, `jest`.

### Instruções

- Para rodar o repositório localmente, realize o clone do projeto e utilize o comando a seguir para inicializar o Docker (front-end, back-end e banco de dados):

```
npm run compose:up
npm run compose:down // para parar completamente a aplicação
```

E utilize os comandos a seguir para executar os testes de integração criado:

```
npm install // para instalar as dependências
cd app/backend && npm test
```

### Endpoints

#### Login

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza o login do usuário | http://localhost:3001/login |
| `GET` | Avalia se o usuário é o administrador | http://localhost:3001/login/validate |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "email": "Nome do Usuário",
  "password": "senha_secreta"
}
```


#### Times

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna todos os times cadastrados | http://localhost:3001/teams |
| `GET` | Retorna um time específico | http://localhost:3001/teams/:id |


#### Partidas

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna todos as partidas cadastradas | http://localhost:3001/matches |
| `GET` | Retorna todos as partidas cadastradas em progresso | http://localhost:3001/matches?inProgress=true |
| `GET` | Retorna todos as partidas cadastradas finalizadas | http://localhost:3001/matches?inProgress=false |
| `POST` | Criação de uma nova partida | http://localhost:3001/matches |
| `PATCH` | Atualiza a chave 'inProgress' para finalidado de uma partida específica | http://localhost:3001/matches/:id/finish |
| `PATCH` | Atualiza os gols de uma partida específica | http://localhost:3001/matches/:id |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "homeTeam": 16, // O valor deve ser o id do time
  "awayTeam": 8, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}
```

e na requisição PATCH para atualizar os gols realizados é necessário informar o seguinte JSON:

```
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

#### Placar

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna a classificação geral dos times | http://localhost:3001/leaderboard |
| `GET` | Retorna a classificação dos times mandantes | http://localhost:3001/leaderboard/home |
| `GET` | Retorna a classificação dos times visitantes | http://localhost:3001/leaderboard/away |

Entre em contato comigo, caso queira dar sugestões, críticas, opiniões sobre esse e/ou outros projetos que estão em meu portfólio, bem como qualquer assunto de seu interesse que queira discutir comigo, fique a vontade!

Gmail: pedrosteinmuller100@gmail.com

Hotmail: pedrosteinmuller10105@hotmail.com

Linkedin: https://www.linkedin.com/in/pedrosteinmuller/
