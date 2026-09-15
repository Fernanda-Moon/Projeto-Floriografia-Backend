const mongoose = require("mongoose");

const lembreteSchema = new mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
        },

        titulo: {
            type: String,
            required: true
        },

        descricao: {
            type: String,
            default: ""
        },

        data: {
            type: Date,
            required: true
        },

        concluido: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Lembrete",
    lembreteSchema
);