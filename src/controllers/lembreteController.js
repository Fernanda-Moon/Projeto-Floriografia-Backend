const Lembrete = require("../models/Lembrete");

const criarLembrete = async (req, res) => {
    try {
        const {
            titulo,
            descricao,
            data
        } = req.body;

        if (!titulo || !data) {
            return res.status(400).json({
                mensagem: "Título e data são obrigatórios."
            });
        }

        const lembrete = await Lembrete.create({
            usuario: req.usuario.id,
            titulo,
            descricao,
            data
        });

        res.status(201).json(lembrete);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao criar lembrete.",
            erro: error.message
        });
    }
};

const listarLembretes = async (req, res) => {
    try {
        const lembretes = await Lembrete.find({
            usuario: req.usuario.id
        }).sort({ data: 1 });

        res.status(200).json(lembretes);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao listar lembretes.",
            erro: error.message
        });
    }
};

const atualizarLembrete = async (req, res) => {
    try {
        const lembrete = await Lembrete.findOneAndUpdate(
            {
                _id: req.params.id,
                usuario: req.usuario.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!lembrete) {
            return res.status(404).json({
                mensagem: "Lembrete não encontrado."
            });
        }

        res.status(200).json(lembrete);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar lembrete.",
            erro: error.message
        });
    }
};

const excluirLembrete = async (req, res) => {
    try {
        const lembrete = await Lembrete.findOneAndDelete({
            _id: req.params.id,
            usuario: req.usuario.id
        });

        if (!lembrete) {
            return res.status(404).json({
                mensagem: "Lembrete não encontrado."
            });
        }

        res.status(200).json({
            mensagem: "Lembrete excluído com sucesso."
        });

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir lembrete.",
            erro: error.message
        });
    }
};

module.exports = {
    criarLembrete,
    listarLembretes,
    atualizarLembrete,
    excluirLembrete
};