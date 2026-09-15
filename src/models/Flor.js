const mongoose = require("mongoose");

const florSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            trim: true
        },

        especie: {
            type: String,
            required: true,
            trim: true
        },

        cor: {
            type: String,
            required: true,
            trim: true
        },

        descricao: {
            type: String,
            default: ""
        },

        preco: {
            type: Number,
            required: true,
            min: 0
        },

        estoque: {
            type: Number,
            required: true,
            min: 0
        },

        significados: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Significado"
            }
        ],

        ocasioes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Ocasiao"
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Flor", florSchema);