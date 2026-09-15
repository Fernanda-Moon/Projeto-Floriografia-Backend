const Favorito = require("../models/Favorito");

const listarFavoritos = async (req, res) => {
    try {
        const favoritos = await Favorito.find({
            usuario: req.usuario.id
        }).populate("flor");

        res.status(200).json(favoritos);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao listar favoritos.",
            erro: error.message
        });
    }
};

const adicionarFavorito = async (req, res) => {
    try {
        const { flor } = req.body;

        if (!flor) {
            return res.status(400).json({
                mensagem: "O ID da flor é obrigatório."
            });
        }

        const existente = await Favorito.findOne({
            usuario: req.usuario.id,
            flor
        });

        if (existente) {
            return res.status(400).json({
                mensagem: "Esta flor já está nos favoritos."
            });
        }

        const favorito = await Favorito.create({
            usuario: req.usuario.id,
            flor
        });

        res.status(201).json(favorito);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao adicionar favorito.",
            erro: error.message
        });
    }
};

const removerFavorito = async (req, res) => {
    try {
        const favorito = await Favorito.findOneAndDelete({
            usuario: req.usuario.id,
            flor: req.params.florId
        });

        if (!favorito) {
            return res.status(404).json({
                mensagem: "Favorito não encontrado."
            });
        }

        res.status(200).json({
            mensagem: "Favorito removido com sucesso."
        });

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao remover favorito.",
            erro: error.message
        });
    }
};

module.exports = {
    listarFavoritos,
    adicionarFavorito,
    removerFavorito
};