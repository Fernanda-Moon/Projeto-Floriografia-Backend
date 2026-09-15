const mongoose = require("mongoose");

const itemBuqueSchema = new mongoose.Schema(
    {
        flor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Flor",
            required: true
        },

        quantidade: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        _id: false
    }
);

const buqueSchema = new mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
        },

        nome: {
            type: String,
            required: true
        },

        flores: [itemBuqueSchema],

        mensagem: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Buque",
    buqueSchema
);