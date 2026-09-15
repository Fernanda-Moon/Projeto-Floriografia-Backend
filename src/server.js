require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
    expressMiddleware
} = require("@as-integrations/express5");

const {
    ApolloServer
} = require("@apollo/server");

const conectarBanco = require("./database");

const authRoutes = require("./routes/authRoutes");
const florRoutes = require("./routes/florRoutes");
const significadoRoutes = require("./routes/significadoRoutes");
const ocasiaoRoutes = require("./routes/ocasiaoRoutes");
const favoritoRoutes = require("./routes/favoritoRoutes");
const buqueRoutes = require("./routes/buqueRoutes");
const lembreteRoutes = require("./routes/lembreteRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes"); 

const {
    typeDefs,
    resolvers
} = require("./graphql/schema");

const {
    autenticar
} = require("./middlewares/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

conectarBanco();

app.get("/", (req, res) => {
    res.json({
        mensagem: "API Floriografia funcionando!"
    });
});

app.use(authRoutes);
app.use(florRoutes);
app.use(significadoRoutes);
app.use(ocasiaoRoutes);
app.use(favoritoRoutes);
app.use(buqueRoutes);
app.use(lembreteRoutes);
app.use(usuarioRoutes); // <-- novo

const iniciarServidor = async () => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();

    app.use(
        "/graphql",
        expressMiddleware(apolloServer, {
            context: async ({ req }) => {
                let usuario = null;
                const authorization = req.headers.authorization;

                if (authorization) {
                    try {
                        const partes = authorization.split(" ");
                        if (partes.length === 2 && partes[0] === "Bearer") {
                            const jwt = require("jsonwebtoken");
                            usuario = jwt.verify(partes[1], process.env.JWT_SECRET);
                        }
                    } catch (error) {
                        usuario = null;
                    }
                }
                return { usuario };
            }
        })
    );

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`GraphQL disponível em http://localhost:${PORT}/graphql`);
    });
};

iniciarServidor();