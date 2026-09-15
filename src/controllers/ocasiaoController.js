const Ocasiao = require("../models/Ocasiao");

const listarOcasioes = async (req, res) => {
    try {
        const dados = await Ocasiao.find();

        res.status(200).json(dados);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao listar ocasiões.",
            erro: error.message
        });
    }
};

const criarOcasiao = async (req, res) => {
    try {
        const { nome, descricao } = req.body;

        if (!nome) {
            return res.status(400).json({
                mensagem: "Nome da ocasião é obrigatório."
            });
        }

        const ocasiao = await Ocasiao.create({
            nome,
            descricao
        });

        res.status(201).json(ocasiao);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao criar ocasião.",
            erro: error.message
        });
    }
};

module.exports = {
    listarOcasioes,
    criarOcasiao
};