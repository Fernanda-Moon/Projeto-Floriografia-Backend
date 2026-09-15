const mongoose = require("mongoose");

const significadoSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        descricao: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Significado",
    significadoSchema
);