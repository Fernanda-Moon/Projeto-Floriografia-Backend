const Flor = require("../models/Flor");
const Significado = require("../models/Significado");
const Ocasiao = require("../models/Ocasiao");

const resolvers = {
    Query: {
        flores: async () => {
            return await Flor.find()
                .populate("significados")
                .populate("ocasioes");
        },
        flor: async (_, { id }) => {
            return await Flor.findById(id)
                .populate("significados")
                .populate("ocasioes");
        },
        floresPorCor: async (_, { cor }) => {
            return await Flor.find({
                cor: { $regex: cor, $options: "i" }
            });
        },
        floresPorSignificado: async (_, { significado }) => {
            const significadoEncontrado = await Significado.findOne({
                nome: { $regex: significado, $options: "i" }
            });
            if (!significadoEncontrado) return [];
            return await Flor.find({
                significados: significadoEncontrado._id
            }).populate("significados");
        },
        significados: async () => {
            return await Significado.find();
        },
        ocasioes: async () => {
            return await Ocasiao.find();
        }
    },

    Mutation: {
        cadastrarFlor: async (_, args, context) => {
            if (!context.usuario) {
                throw new Error("Usuário não autenticado.");
            }
            if (context.usuario.perfil !== "admin") {
                throw new Error("Permissão negada. Apenas administradores podem criar flores.");
            }
            return await Flor.create({
                nome: args.nome,
                especie: args.especie,
                cor: args.cor,
                descricao: args.descricao,
                preco: args.preco,
                estoque: args.estoque
            });
        },

        cadastrarSignificado: async (_, args, context) => {
            if (!context.usuario) {
                throw new Error("Usuário não autenticado.");
            }
            if (context.usuario.perfil !== "admin") {
                throw new Error("Permissão negada. Apenas administradores podem criar significados.");
            }
            return await Significado.create({
                nome: args.nome,
                descricao: args.descricao
            });
        },

        cadastrarOcasiao: async (_, args, context) => {
            if (!context.usuario) {
                throw new Error("Usuário não autenticado.");
            }
            if (context.usuario.perfil !== "admin") {
                throw new Error("Permissão negada. Apenas administradores podem criar ocasiões.");
            }
            return await Ocasiao.create({
                nome: args.nome,
                descricao: args.descricao
            });
        }
    }
};

module.exports = resolvers;