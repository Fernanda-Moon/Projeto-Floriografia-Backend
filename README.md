# 🌸 API Floriografia

API REST + GraphQL para gerenciamento de flores, buquês, favoritos, lembretes, significados e ocasiões, com autenticação JWT.

---

<img width="361" height="269" alt="buque_exemplo" src="https://github.com/user-attachments/assets/f4931193-65ce-48a9-b135-001e399c6d7d" />

<br>
<br>

---

## 🧰 Tecnologias

- Node.js
- Express 5
- MongoDB + Mongoose
- Apollo Server (GraphQL)
- JWT (autenticação)
- Bcrypt (hash de senha)

<br>

---

## ✅ Pré-requisitos

- Node.js 18+
- MongoDB local **ou** MongoDB Atlas

---

<br>

## ⚙️ Instalação

```bash
git clone <url-do-repositorio>
cd floriografia
npm install
```

---

<br>

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/floriografia
JWT_SECRET=sua_chave_secreta_super_segura
```

| Variável     | Descrição                                          |
|--------------|----------------------------------------------------|
| `PORT`       | Porta do servidor HTTP (padrão: 3000)              |
| `MONGO_URI`  | String de conexão do MongoDB                       |
| `JWT_SECRET` | Chave usada para assinar/validar os tokens JWT     |

---

<br>

## ▶️ Executando

```bash
# desenvolvimento (se estiver usando nodemon)
npm run dev

# produção
npm start
```

Saída esperada:

```
MongoDB conectado com sucesso!
Servidor rodando na porta 3000
GraphQL disponível em http://localhost:3000/graphql
```

---

<br>

## 🌐 Endpoints REST

### Autenticação
| Método | Rota             | Protegida | Descrição                      |
|--------|------------------|-----------|--------------------------------|
| POST   | `/auth/register` | Não       | Cadastra um novo usuário       |
| POST   | `/auth/login`    | Não       | Realiza login e retorna o JWT  |
| GET    | `/auth/me`       | Sim       | Retorna dados do usuário atual |

### Flores
| Método | Rota           | Protegida       | Descrição            |
|--------|----------------|-----------------|----------------------|
| GET    | `/flores`      | Não             | Lista todas as flores |
| GET    | `/flores/:id`  | Não             | Busca flor por ID    |
| POST   | `/flores`      | Sim (admin)     | Cria flor            |
| PUT    | `/flores/:id`  | Sim (admin)     | Atualiza flor        |
| DELETE | `/flores/:id`  | Sim (admin)     | Remove flor          |

<br>

---

### Significados / Ocasiões
- `GET /significados` · `POST /significados` (admin)
- `GET /ocasioes` · `POST /ocasioes` (admin)

---

### Favoritos (usuário autenticado)
- `GET /favoritos`
- `POST /favoritos`
- `DELETE /favoritos/:florId`

---

### Buquês (usuário autenticado)
- `GET /buques`
- `GET /buques/:id`
- `POST /buques`

---

### Lembretes (usuário autenticado)
- `GET /lembretes`
- `POST /lembretes`
- `PUT /lembretes/:id`
- `DELETE /lembretes/:id`

---

### Usuários
- `GET /usuarios` (admin)
- `GET /usuarios/:id` (próprio ou admin)
- `PUT /usuarios/:id` (próprio ou admin)
- `DELETE /usuarios/:id` (admin)

---

<br>

## 🚀 GraphQL

Acesse o playground em:

```
http://localhost:3000/graphql
```

Para requisições autenticadas, envie o header:

```
Authorization: Bearer <seu_token_jwt>
```

### Exemplos

**Query — listar flores**
```graphql
query {
  flores {
    id
    nome
    cor
    preco
    significados { nome }
  }
}
```

**Mutation — cadastrar flor (admin)**
```graphql
mutation {
  cadastrarFlor(
    nome: "Rosa Vermelha"
    especie: "Rosa"
    cor: "Vermelho"
    preco: 25.9
    estoque: 10
  ) {
    id
    nome
  }
}
```

---

<br>

## 📂 Estrutura do projeto

```
.
├── controllers/         # Lógica das rotas REST
├── graphql/
│   ├── typeDefs.js      # Schema SDL do GraphQL
│   ├── resolvers.js     # Resolvers (com os models importados)
│   └── schema.js        # Agrega typeDefs + resolvers
├── middlewares/
│   └── authMiddleware.js
├── models/              # Schemas do Mongoose
├── routes/              # Rotas Express
├── .env.example
├── database.js
├── server.js
└── README.md
```

---

<br>

## 🪻 Enjoy!

Divirta-se com essa primeira parte do Projeto Floriografia!
