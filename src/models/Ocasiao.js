const mongoose = require("mongoose");

const ocasiaoSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        descricao: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Ocasiao",
    ocasiaoSchema
);