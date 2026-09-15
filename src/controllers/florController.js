const Flor = require("../models/Flor");

const listarFlores = async (req, res) => {
    try {
        const flores = await Flor.find()
            .populate("significados")
            .populate("ocasioes");

        res.status(200).json(flores);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao listar flores.",
            erro: error.message
        });
    }
};

const buscarFlor = async (req, res) => {
    try {
        const flor = await Flor.findById(req.params.id)
            .populate("significados")
            .populate("ocasioes");

        if (!flor) {
            return res.status(404).json({
                mensagem: "Flor não encontrada."
            });
        }

        res.status(200).json(flor);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar flor.",
            erro: error.message
        });
    }
};

const criarFlor = async (req, res) => {
    try {
        const {
            nome,
            especie,
            cor,
            descricao,
            preco,
            estoque,
            significados,
            ocasioes
        } = req.body;

        if (
            !nome ||
            !especie ||
            !cor ||
            preco === undefined ||
            estoque === undefined
        ) {
            return res.status(400).json({
                mensagem:
                    "Nome, espécie, cor, preço e estoque são obrigatórios."
            });
        }

        const flor = await Flor.create({
            nome,
            especie,
            cor,
            descricao,
            preco,
            estoque,
            significados,
            ocasioes
        });

        res.status(201).json(flor);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao criar flor.",
            erro: error.message
        });
    }
};

const atualizarFlor = async (req, res) => {
    try {
        const flor = await Flor.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!flor) {
            return res.status(404).json({
                mensagem: "Flor não encontrada."
            });
        }

        res.status(200).json(flor);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar flor.",
            erro: error.message
        });
    }
};

const excluirFlor = async (req, res) => {
    try {
        const flor = await Flor.findByIdAndDelete(
            req.params.id
        );

        if (!flor) {
            return res.status(404).json({
                mensagem: "Flor não encontrada."
            });
        }

        res.status(200).json({
            mensagem: "Flor excluída com sucesso."
        });

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir flor.",
            erro: error.message
        });
    }
};

module.exports = {
    listarFlores,
    buscarFlor,
    criarFlor,
    atualizarFlor,
    excluirFlor
};