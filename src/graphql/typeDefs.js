const typeDefs = `#graphql
    type Significado {
        id: ID!
        nome: String!
        descricao: String!
    }

    type Ocasiao {
        id: ID!
        nome: String!
        descricao: String
    }

    type Flor {
        id: ID!
        nome: String!
        especie: String!
        cor: String!
        descricao: String
        preco: Float!
        estoque: Int!
        significados: [Significado]
        ocasioes: [Ocasiao]
    }

    type Query {
        flores: [Flor]
        flor(id: ID!): Flor
        floresPorCor(cor: String!): [Flor]
        floresPorSignificado(significado: String!): [Flor]
        significados: [Significado]
        ocasioes: [Ocasiao]
    }

    type Mutation {
        cadastrarFlor(
            nome: String!
            especie: String!
            cor: String!
            descricao: String
            preco: Float!
            estoque: Int!
        ): Flor

        cadastrarSignificado(
            nome: String!
            descricao: String!
        ): Significado

        cadastrarOcasiao(
            nome: String!
            descricao: String
        ): Ocasiao
    }
`;

module.exports = typeDefs;