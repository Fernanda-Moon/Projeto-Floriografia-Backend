const Buque = require("../models/Buque");

const criarBuque = async (req, res) => {
    try {
        const {
            nome,
            flores,
            mensagem
        } = req.body;

        if (!nome || !flores || flores.length === 0) {
            return res.status(400).json({
                mensagem:
                    "Nome e pelo menos uma flor são obrigatórios."
            });
        }

        const buque = await Buque.create({
            usuario: req.usuario.id,
            nome,
            flores,
            mensagem
        });

        const resultado = await Buque.findById(
            buque._id
        ).populate("flores.flor");

        res.status(201).json(resultado);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao criar buquê.",
            erro: error.message
        });
    }
};

const listarBuques = async (req, res) => {
    try {
        const buques = await Buque.find({
            usuario: req.usuario.id
        }).populate("flores.flor");

        res.status(200).json(buques);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao listar buquês.",
            erro: error.message
        });
    }
};

const buscarBuque = async (req, res) => {
    try {
        const buque = await Buque.findOne({
            _id: req.params.id,
            usuario: req.usuario.id
        }).populate("flores.flor");

        if (!buque) {
            return res.status(404).json({
                mensagem: "Buquê não encontrado."
            });
        }

        res.status(200).json(buque);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar buquê.",
            erro: error.message
        });
    }
};

module.exports = {
    criarBuque,
    listarBuques,
    buscarBuque
};