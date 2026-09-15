const Significado = require("../models/Significado");

const listarSignificados = async (req, res) => {
    try {
        const dados = await Significado.find();

        res.status(200).json(dados);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao listar significados.",
            erro: error.message
        });
    }
};

const criarSignificado = async (req, res) => {
    try {
        const { nome, descricao } = req.body;

        if (!nome || !descricao) {
            return res.status(400).json({
                mensagem: "Nome e descrição são obrigatórios."
            });
        }

        const significado = await Significado.create({
            nome,
            descricao
        });

        res.status(201).json(significado);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao criar significado.",
            erro: error.message
        });
    }
};

module.exports = {
    listarSignificados,
    criarSignificado
};